import { useState } from 'react';
import catalogue from './catalogue.json';
import { demoAssets } from './demoAssets';
import { validateItem, parseDraft, nextDraft, type ContentItem, type Draft } from './adminModel';
import './admin-demo.css';
const baseline = catalogue as ContentItem[];
const storageKey = 'fern-proposed-admin-drafts-v1';
export default function ContentAdminDemo({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(baseline[0].id);
  const [item, setItem] = useState<ContentItem>({ ...baseline[0] });
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [role, setRole] = useState('Content Editor');
  const [notice, setNotice] = useState('');
  const [preview, setPreview] = useState(false);
  const draft = drafts[selected];
  const pages = [...new Set(baseline.map((i) => i.page))];
  const [page, setPage] = useState('Home');
  const dirty = JSON.stringify(item) !== JSON.stringify(draft?.item ?? baseline.find((i) => i.id === selected));
  function select(id: string) {
    if (dirty && !window.confirm('Discard unsaved form changes? Saved drafts are retained.')) return;
    const next = drafts[id]?.item ?? baseline.find((i) => i.id === id)!;
    setSelected(id);
    setItem({ ...next });
    setPage(next.page);
    setNotice('');
  }
  function persist(next: Record<string, Draft>) {
    setDrafts(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ schema: 'fern-admin-session-v1', drafts: next }));
      setNotice('Saved in this browser. Export the draft for a portable copy.');
    } catch {
      setNotice(
        'Saved for this session only; browser storage is unavailable or full. Export your draft before closing.',
      );
    }
  }
  function save() {
    const error = validateItem(item);
    if (error) {
      setNotice(error);
      return;
    }
    persist({
      ...drafts,
      [selected]: {
        item: { ...item },
        status: 'Draft',
        revision: (draft?.revision ?? 0) + 1,
        events: [...(draft?.events ?? []), `${new Date().toISOString()} · Content Editor · Draft saved`],
      },
    });
  }
  function action(kind: 'submit' | 'approve' | 'return' | 'publish') {
    if (!draft || dirty) {
      setNotice('Save this draft before continuing.');
      return;
    }
    try {
      persist({ ...drafts, [selected]: nextDraft(draft, kind, role) });
    } catch (e) {
      setNotice((e as Error).message);
    }
  }
  function exportDraft() {
    if (!draft || dirty) {
      setNotice('Save the draft before exporting.');
      return;
    }
    const blob = new Blob([JSON.stringify({ schema: 'fern-content-draft-v1', item: draft.item }, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selected + '-draft.json';
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Draft export requested. Imports always start a new draft without approval.');
  }
  async function importDraft(file?: File) {
    if (!file) return;
    try {
      const next = parseDraft(await file.text(), baseline);
      if (dirty && !window.confirm('Replace unsaved form changes with the imported draft?')) return;
      setSelected(next.id);
      setPage(next.page);
      setItem(next);
      persist({
        ...drafts,
        [next.id]: {
          item: next,
          status: 'Draft',
          revision: (drafts[next.id]?.revision ?? 0) + 1,
          events: [`${new Date().toISOString()} · Imported as new Draft`],
        },
      });
    } catch (e) {
      setNotice((e as Error).message);
    }
  }
  function restore() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
      if (saved?.schema !== 'fern-admin-session-v1') throw new Error('No saved local drafts found.');
      const valid: Record<string, Draft> = {};
      for (const record of Object.values(saved.drafts) as Draft[]) {
        const restored = parseDraft(JSON.stringify({ schema: 'fern-content-draft-v1', item: record.item }), baseline);
        valid[restored.id] = {
          item: restored,
          status: 'Draft',
          revision: 1,
          events: ['Restored locally as Draft; review required'],
        };
      }
      setDrafts(valid);
      if (valid[selected]) setItem(valid[selected].item);
      setNotice('Saved content restored as drafts. Review again before simulating publication.');
    } catch (e) {
      setNotice((e as Error).message);
    }
  }
  async function upload(file?: File) {
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024) {
      setNotice('Choose PNG, JPEG or WebP, maximum 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setItem({ ...item, image: String(reader.result), asset: '' });
      setNotice('Image loaded into the form. Add descriptive alt text and save the draft.');
    };
    reader.readAsDataURL(file);
  }
  const editable = role === 'Content Editor';
  const image = item.image || demoAssets[item.asset];
  return (
    <main className="admin-demo">
      <header>
        <div>
          <p className="admin-kicker">Proposed content management workflow</p>
          <h1>Content administration demonstration</h1>
          <p>
            Local prototype only. Role switching, approvals and publication are simulations. This does not change the
            website or publish to Amazon.
          </p>
        </div>
        <button
          onClick={() => {
            if (!dirty || window.confirm('Leave with unsaved form changes?')) onClose();
          }}
        >
          Return to website demo
        </button>
      </header>
      <section className="admin-controls">
        <label>
          Demo role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {['Content Editor', 'Content Approver', 'Platform Administrator'].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
        <button onClick={restore}>Restore local drafts</button>
        <button onClick={exportDraft}>Export selected draft</button>
        <label className="admin-upload">
          Import draft JSON
          <input
            type="file"
            accept="application/json,.json"
            onChange={(e) => {
              importDraft(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
        </label>
      </section>
      <p role="status" className="admin-status">
        {notice || 'Choose a page and section. Edit, preview, save and submit for simulated review.'}
      </p>
      <div className="admin-layout">
        <aside>
          <h2>Choose content</h2>
          <label>
            Page
            <select value={page} onChange={(e) => select(baseline.find((i) => i.page === e.target.value)!.id)}>
              {pages.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label>
            Section
            <select value={selected} onChange={(e) => select(e.target.value)}>
              {baseline
                .filter((i) => i.page === page)
                .map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.title}
                  </option>
                ))}
            </select>
          </label>
          <p>
            {baseline.length} sample sections drawn from the current content. This demonstrates a structured editor;
            production must cover every section in the PRD inventory.
          </p>
          <p>
            Source standards are controlled documents. This demo edits the library introduction, never the authoritative
            PDF wording.
          </p>
          <p>
            <strong>Status:</strong> {draft?.status ?? 'Baseline'}
            {dirty ? ' · Unsaved form changes' : ''}
          </p>
          <p>
            <strong>Saved revision:</strong> {draft?.revision ?? 0}
          </p>
          <ol className="admin-steps">
            {['Draft', 'In review', 'Approved', 'Published locally'].map((s) => (
              <li key={s} aria-current={draft?.status === s ? 'step' : undefined}>
                {s}
              </li>
            ))}
          </ol>
        </aside>
        <section>
          <h2>Edit section</h2>
          <fieldset disabled={!editable}>
            <label>
              Title
              <input maxLength={160} value={item.title} onChange={(e) => setItem({ ...item, title: e.target.value })} />
            </label>
            <label>
              Written content
              <textarea
                rows={9}
                maxLength={24000}
                value={item.body}
                onChange={(e) => setItem({ ...item, body: e.target.value })}
              />
            </label>
            <label>
              Existing image or illustration
              <select
                value={item.asset}
                onChange={(e) => setItem({ ...item, asset: e.target.value, image: undefined })}
              >
                <option value="">No catalogue image</option>
                {Object.keys(demoAssets).map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </label>
            <label>
              Replace image from your computer
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  upload(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </label>
            <label>
              Image description for accessibility
              <input maxLength={300} value={item.alt} onChange={(e) => setItem({ ...item, alt: e.target.value })} />
            </label>
            <label>
              Optional HTTPS reference link
              <input value={item.link ?? ''} onChange={(e) => setItem({ ...item, link: e.target.value })} />
            </label>
            <label className="admin-check">
              <input
                type="checkbox"
                checked={item.visible !== false}
                onChange={(e) => setItem({ ...item, visible: e.target.checked })}
              />
              Visible in proposed preview
            </label>
          </fieldset>
          <div className="admin-actions">
            <button disabled={!editable} onClick={save}>
              Save draft
            </button>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Hide' : 'Show'} content preview</button>
            <button
              disabled={!editable || !draft || dirty || draft.status !== 'Draft'}
              onClick={() => action('submit')}
            >
              Submit for review
            </button>
          </div>
          {role === 'Content Approver' && (
            <div className="admin-actions">
              <button disabled={draft?.status !== 'In review' || dirty} onClick={() => action('return')}>
                Return to editor
              </button>
              <button disabled={draft?.status !== 'In review' || dirty} onClick={() => action('approve')}>
                Approve draft simulation
              </button>
              <button disabled={draft?.status !== 'Approved' || dirty} onClick={() => action('publish')}>
                Publish locally simulation
              </button>
            </div>
          )}
          {role === 'Platform Administrator' && (
            <p>
              Production administrators manage permissions, templates and integration settings. Those controls are
              specified in the PRD and are not connected in this prototype.
            </p>
          )}
          {preview && (
            <article className="admin-preview">
              <p className="admin-kicker">
                Content preview only · {item.visible === false ? 'Hidden in proposed page' : 'Visible in proposed page'}
              </p>
              <h2>{item.title}</h2>
              {image && <img src={image} alt={item.alt} />}
              <p style={{ whiteSpace: 'pre-wrap' }}>{item.body}</p>
              {item.link && validateItem(item) === '' && (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Open reference link
                </a>
              )}
            </article>
          )}
          <details>
            <summary>Local revision activity</summary>
            <ul>
              {draft?.events.map((event, i) => (
                <li key={i}>{event}</li>
              ))}
            </ul>
            <p>
              This local log can be changed or deleted in the browser. Production requires a server-side audit record.
            </p>
          </details>
        </section>
      </div>
    </main>
  );
}
