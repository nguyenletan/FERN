export type ContentItem = {
  id: string;
  page: string;
  title: string;
  body: string;
  asset: string;
  alt: string;
  image?: string;
  link?: string;
  visible?: boolean;
};
export type Draft = {
  item: ContentItem;
  status: 'Draft' | 'In review' | 'Approved' | 'Published locally';
  revision: number;
  events: string[];
};
export const imagePattern = /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/;
export function validateItem(item: ContentItem) {
  if (!item.title.trim() || item.title.length > 160) return 'Enter a title of 1–160 characters.';
  if (!item.body.trim() || item.body.length > 24000) return 'Enter content of 1–24,000 characters.';
  if ((item.asset || item.image) && (!item.alt.trim() || item.alt.length > 300))
    return 'Describe the image in 1–300 characters.';
  if (item.image && (!imagePattern.test(item.image) || item.image.length > 2800000))
    return 'Use a PNG, JPEG or WebP image no larger than 2 MB.';
  if (item.link) {
    try {
      const url = new URL(item.link);
      if (url.protocol !== 'https:') return 'Use an HTTPS link.';
    } catch {
      return 'Enter a valid HTTPS link.';
    }
  }
  return '';
}
export function parseDraft(raw: string, baseline: ContentItem[]): ContentItem {
  if (raw.length > 3000000) throw new Error('The draft file is too large.');
  const data = JSON.parse(raw);
  if (data.schema !== 'fern-content-draft-v1') throw new Error('This is not a FERN draft export.');
  const i = data.item;
  const original = baseline.find((b) => b.id === i?.id);
  if (
    !original ||
    i.page !== original.page ||
    !['title', 'body', 'asset', 'alt'].every((k) => typeof i[k] === 'string') ||
    (i.image !== undefined && typeof i.image !== 'string') ||
    (i.link !== undefined && typeof i.link !== 'string') ||
    (i.visible !== undefined && typeof i.visible !== 'boolean')
  )
    throw new Error('The content fields do not match an existing section.');
  if (!baseline.some((b) => b.asset === i.asset) && i.asset !== '') throw new Error('Unknown image selection.');
  const item: ContentItem = {
    id: original.id,
    page: original.page,
    title: i.title,
    body: i.body,
    asset: i.asset,
    alt: i.alt,
    image: i.image,
    link: i.link,
    visible: i.visible,
  };
  const error = validateItem(item);
  if (error) throw new Error(error);
  return item;
}
export function nextDraft(draft: Draft, action: 'submit' | 'approve' | 'return' | 'publish', role: string): Draft {
  const allowed =
    (action === 'submit' && role === 'Content Editor' && draft.status === 'Draft') ||
    (action === 'approve' && role === 'Content Approver' && draft.status === 'In review') ||
    (action === 'return' && role === 'Content Approver' && draft.status === 'In review') ||
    (action === 'publish' && role === 'Content Approver' && draft.status === 'Approved');
  if (!allowed) throw new Error('This action is not available for the selected demo role and draft status.');
  const status =
    action === 'submit'
      ? 'In review'
      : action === 'approve'
        ? 'Approved'
        : action === 'return'
          ? 'Draft'
          : 'Published locally';
  return {
    ...draft,
    status,
    events: [...draft.events, `${new Date().toISOString()} · ${role} · ${status} · simulation`],
  };
}
