# Cloudscape portal and Amazon review changes

31 October 2026 · Prepared for Amazon review; not yet approved

## Why

At the FERN review on 30 October 2026, Amazon (Kim, Guzman and Benito) asked for the following:

- Use **Cloudscape**, the design system Amazon uses as the "golden path" for internal tools.
- Remove duplicated links on the home page.
- Use one consistent name for the library.
- Add language and country selection to the main menu.
- Add an **Administration** area where the business owners add users and give them roles.

The business owner later confirmed three points:

- Guides are written by Hein first, then by Amazon staff.
- Every new guide is approved by Benito or Richard.
- Access to applications and guides is role-based.

This document records what was built in response and what remains open.

## What changed

### 1. The whole portal uses Cloudscape

Every page now uses Cloudscape components (`@cloudscape-design/components`). The wording of all guidance is unchanged: only the layout and components changed.

| Area | Before | Now |
| --- | --- | --- |
| Shell | Custom header, two sidebars, footer | `TopNavigation` (logo, search, language, country, user menu) + `AppLayout` + `SideNavigation` + breadcrumbs |
| Home | Hero image, illustrated panels | Hero `Container` (photo beside the welcome text and the Get started / What is FERN? buttons), three starting points, mission summary and application cards (each card has one link: its title) |
| Workspace topics (7) and Mission & Pillars | Custom cards and `<details>` | `Container`, `ExpandableSection`, "Expand all / Collapse all" |
| Detailed practice guides (7) | Page-specific CSS cards | `Card` (Container) and `Section` (ExpandableSection); converted with an AST codemod so the text is verbatim |
| Applications | Cards on Home only | Cards on Home plus an **Applications** page with a filter (`?page=applications`) and an introduction page per application |
| Learn, Get started, Help, About, What's new | Panels inside Home | Their own pages under **Resources** |
| Standards & Reference Library | Custom search form and result rows | `Input`, `Select` (country), `SegmentedControl` (collection), result list, `KeyValuePairs` reader, expandable source pages |
| Search | A search box on every page, listing matches below it | One header search (`Autosuggest`) suggesting topics, lessons and applications; Enter (or “Search FERN for …”) opens a search results page with every match |
| Demo sign-in | Custom form | The FERN brand panel is kept; the form uses Cloudscape `Container`, `Form` (with `errorText`), `FormField`, `Input`, a "Show password" `Checkbox` and a primary `Button`. Privacy, terms and help open a dismissible `Alert`. It is still a demonstration and will be replaced by Midway |
| Content-administration walkthrough | — | Unchanged. The CMS keeps its own editing screens (agreed: Cloudscape for the portal, not the CMS) |

The look follows Cloudscape defaults, with FERN blue for primary buttons and links. The portal uses the standard Cloudscape integration: `@cloudscape-design/global-styles` provides normalize.css and **Open Sans** (300, 400, 700 and 800, normal and italic, embedded WOFF2, about 184 KB of CSS), so there is no Google Fonts or other external font request. Tailwind is no longer used. That Open Sans covers Basic Latin and Latin-1 only: the Czech letter "Č" in ČSN standard codes (about 420 occurrences in the BBM data) and a few other Latin Extended characters display in the fallback font (Helvetica Neue / Arial), and weight 600 renders as the nearest available weight. Whether Amazon internal tools should use Amazon Ember instead is to be confirmed with Guzman.

**FERN imagery is kept inside the Cloudscape layout** (`app/visuals.tsx`):

| Image or icon | Where |
| --- | --- |
| Home hero photograph | Home, in a `Container` with side media (the image moves above the text on phones) |
| Photograph banners | Top of each Workspace topic, Mission & Pillars and Learn (original alt text kept) |
| FERN guide mascot | Help & Guidance, "Need a hand?" |
| Application icons | Application cards and "Works with" links |
| Pillar icons | Home mission summary |
| Topic icons | Home starting points, Workspace cards |

Icons are Lucide stroke icons inside the Cloudscape `Icon` component, in FERN blue and hidden from screen readers (see section 8). The cartoon teaser illustrations are not used, because they clash with the Cloudscape style.

### 2. Amazon review fixes

| Request (30 Oct 2026) | Done |
| --- | --- |
| Eight pillar links all led to the same page | One "Explore our mission & pillars" button; pillar names are plain text |
| Mission & Pillars repeated on the Workspace page and in the footer | Footer removed |
| One consistent name for the library | "Standards & Reference Library" everywhere (menu, search, pages, links) |
| "Learn" reached from several places that open the same page | Home has one way in to each destination: About and Get started are the header buttons; Workspace, the library and Learn are the three starting points. Following Kim's comment that the purpose of "Learn at your own pace" was unclear, the Popular learning topics block was removed from Home (lessons are chosen inside Learn, which will link to Amazon's LMS), and each application card links only from its title. Help is in the menu only |
| Language and country on the main menu, chosen independently | Two header dropdowns (see below) |
| Administration tab for users and roles | Demonstration page (see below) |
| Applications must not launch (WEB-SCOPE-01) | Application pages describe the tool only; every card shows "Coming soon" |

### 3. Language and country in the header

- **Language:** shows *English (US)*. "Other languages" is disabled with the reason "Translations are not available yet". No translations exist, so the portal does not pretend otherwise.
- **Country:** *All countries* or one of the nine countries in the BBM data (CZ, DE, ES, FR, IT, PL, ROI, SK, UK).
  - The choice filters the Standards & Reference Library, and changing the filter in the library updates the header.
  - It is remembered in the browser (`localStorage`, key `fern-country`).
  - A country in a shared library link (`bbmCountry`) takes priority.

### 4. Administration demonstration: Users & roles

Open it from the menu: **Administration → Users & roles** (`?page=admin`). It is labelled *Demo*, uses fictitious sample people, and saves nothing to Midway, APM or any Amazon system. Changes last for the browser tab only (`sessionStorage`), and **Reset sample data** restores them.

| Tab | What it shows |
| --- | --- |
| Users | Table of people with Amazon alias, roles and status. **Add user** has validation, plus **Edit roles** and **Remove** with confirmation |
| Roles & access | Matrix of 6 proposed roles × 5 applications, plus *Write guides*, *Approve guides* and *Manage users* |
| Preview as role | Shows the applications and permissions a person with the chosen role would have |

The proposed roles are: Site manager, RME planner, Commercial & pricing specialist, Guide author, Approver and Administrator. The access defaults are **proposals for Benito and Richard to confirm**. For example, the Pricing Template Generator is limited to Commercial, as mentioned in the review.

The page also links to the existing content-administration walkthrough.

### 5. Typography follows the Cloudscape guidelines

Checked against [Cloudscape typography](https://cloudscape.design/foundation/visual-foundation/typography/) on all 24 routes:

| Guideline | Result |
| --- | --- |
| Open Sans | All rendered text |
| Type scale only (12/16, 14/20, 16/20, 18/22, 20/24, 24/30, 42/48) | All text, including the sign-in brand panel, which now uses display large (42/48), heading x-large (24/30), heading large (20/24), heading x-small (14/18), body medium (14/20) and body small (12/16) |
| One `h1` per page, no skipped heading levels, nothing below 12px | Yes |
| Monospace only for ID strings | BBM object codes (results, reader header, related standards) and Amazon aliases (Users & roles) use the code style (`Box variant="code"`, 12/16 monospace). Nothing else is monospace |
| Sentence case | About 300 headings, section titles, buttons and link labels changed from Title Case to sentence case (for example "Turn direction into a plan"). Only capitalisation changed, not wording |

Sentence case keeps capitals for names: page and application names (for example "Leadership & Policy", "Pricing Template Generator"), the pillars, FERN, Workspace, Learn, Amazon and BBM terms (Blue Badge, IFM Hybrid, Prime / Plus / Core), demo role names, and acronyms (FM, KPIs, SLAs, AI, PDF). Lesson titles changed too (for example "Service models explained"); their URLs are unchanged because lesson slugs are lower case. New content should be written in sentence case.

### 6. Colours follow the Cloudscape guidelines

Checked against [Cloudscape colors](https://cloudscape.design/foundation/visual-foundation/colors/):

| Guideline | Result |
| --- | --- |
| Use design tokens, not hard-coded colours | Portal styles that are not Cloudscape components (`src/app/cloudscape.scss`, `src/auth/demo-sign-in.scss`, `src/features/reference/standards-reader.scss`) use `@cloudscape-design/design-tokens` through Sass, for example `awsui.$color-text-body-secondary`; 59 hard-coded colours were replaced. The only remaining colour values are the FERN blue theme tokens in `src/app/ui.tsx` (`applyTheme`) and the content-administration walkthrough, which keeps its own screens |
| Blue for primary actions, links and interactive accents | Yes; FERN blue is applied as theme tokens, so token-based styles (links, accents, primary buttons) follow it |
| Red and green only for status | Yes; the three mission values on Mission & Pillars now use a neutral check icon instead of the green success indicator |
| Do not rely on colour alone; sufficient contrast | All badges and statuses carry text or icons; 0 contrast failures across 1,403 text elements on 20 routes (WCAG AA) |

Keep `@cloudscape-design/design-tokens` at the version released with `@cloudscape-design/components` when upgrading: token CSS variable names change between releases. Dark mode is not offered; the token-based styles would follow it if it is enabled later.

### 7. Design tokens for spacing, type and shape

Checked against [Cloudscape design tokens](https://cloudscape.design/foundation/visual-foundation/design-tokens/):

| Guideline | Result |
| --- | --- |
| Spacing, type and radius from tokens | The portal `.scss` files use `awsui.$space-scaled-*`, `$font-size-*` / `$line-height-*` / `$font-weight-*`, `$font-family-base` and `$border-radius-container`. Values that were off the 2/4/8/12/16/20/24/32/40 px scale moved to the nearest step; the sign-in page and the reader moved by a few pixels |
| Use each token for its purpose | `color-background-item-selected` (selected items) was used as a decorative tint on the sign-in panel, the mobile sign-in bar and the guide mascot; these now use the neutral `color-background-cell-shaded` |
| Do not override Cloudscape components | The standards reader had rules for native buttons, headings and summaries left from the earlier design. The button rule still reached Cloudscape buttons inside the reader (44 px tall, own border and radius, and a stray line under expandable section headers); it was removed, so reader buttons now match the rest of the portal. About 290 lines of reader CSS for classes no longer rendered were removed |

Not converted, on purpose: component dimensions (image sizes, `max-width`, the embedded PDF height, breakpoints), the 72 px anchor offset that matches the header, the FERN wordmark weight and tracking, and the emoji flag size. `src/styles/index.css` (global reset) is plain CSS and stays without tokens; its disclosure-arrow rules moved to `admin-demo.css`, the only place that still uses native `<details>` (see section 11). `src/features/reference/region-labels.css` became `region-labels.scss` to use tokens.

### 8. Icons follow the Cloudscape iconography

Checked against [Cloudscape iconography](https://cloudscape.design/foundation/visual-foundation/iconography/):

| Guideline | Result |
| --- | --- |
| Action icons from the Cloudscape set, with a text label | Already the case: download, back, expand/collapse all, refresh and profile use `iconName` on labelled buttons |
| No icons with page, section or sub-section headings | Icons were removed from the page titles (Workspace topics, Mission & Pillars, Learn, application pages) and from the Learn lesson, Help topic and pillar section headers |
| Symbol icons sparingly, to the left of a labelled resource | Kept only on navigation items: home starting points, Workspace cards, application cards, "Works with" links, the home pillar summary and the three sign-in benefits. The icons beside the "Guided by" pillar badges were removed; the badges already carry the names |
| Icon sizes 16 / 20 / 32 / 48 px, matched to the text | `FernIcon` takes `normal`, `medium` (default) or `big` and renders the Cloudscape `Icon` with the `svg` slot, so Cloudscape sets the size and stroke width. Card and link icons are 20 px; the pillar summary and sign-in benefits are 32 px. Previously 18–34 px |
| Custom icons: 2 px strokes, not filled shapes | Phosphor duotone (filled tints, shapes drawn as fills) was replaced by `lucide-react`, which draws with strokes and rounded joins like the Cloudscape set. Phosphor's filled paths do not render in the Cloudscape `svg` slot, which forces `fill: none` |

Lucide icons use a 24 px grid rather than Cloudscape's 16 px, so their strokes render at about 1.3 px (medium) and 2 px (big), within the guideline. Use `FernIcon` / `IconTitle` from `app/visuals.tsx` for any new symbol icon, and prefer a Cloudscape `iconName` when one fits.

### 9. Layout follows the Cloudscape guidelines

Checked against [Cloudscape layout](https://cloudscape.design/foundation/visual-foundation/layout/):

| Guideline | Result |
| --- | --- |
| Standard app layout for browsing and documentation; one app layout type throughout | One `AppLayout` (standard, not the toolbar layout) in `FernWorkspace.tsx` for every page; the sign-in page sits outside it |
| Regions: collapsible side navigation, breadcrumbs, notifications, main content, tools | All five are used. Notifications (Flashbar) and tools (help panel) were added in this change |
| Content layout for page headers; consistent vertical spacing | `Page` wraps every page in `ContentLayout` with an h1 `Header`; content is spaced with `SpaceBetween` |
| Column layout or grid to place content side by side | The custom `.fern-grid` CSS grid (12 places on the Workspace practice guides) became `TextGrid`, a `ColumnLayout` text grid (one column per block up to four, at least 240 px each). The two definition lists (Planning objective fields, Continual Improvement lesson prompts) became `KeyValuePairs` through `Terms`. Standards search results use a two-column `ColumnLayout` instead of the custom `.fs-results` grid, with list roles kept for screen readers |
| Responsive, not designed for one screen size | No horizontal overflow at 1440 px or 390 px; columns stack on narrow screens |

**Help panel.** The (i) button on the right of every page opens a help panel with a short "How to use this page" for the current kind of page (Home, Workspace, Workspace topic, Mission & Pillars, Applications, application page, Learn, Standards library, Help, Users & roles; other pages get general reading help). It stays open while you move between pages and follows the page. The text is in `src/app/pageHelp.tsx`, describes only controls that exist on the page, and is marked as draft: approved "How to use" guides (Benito or Richard) should replace it.

**Notifications.** Page-level messages go to the app layout's Flashbar through `usePageNotifications(items)` from `ui.tsx`; they clear when the page closes. Users & roles uses it for the demonstration notice and for the confirmation after adding, changing or removing a user. Messages about part of a page stay as `Alert` (application availability, "No matching standards", the operational-issue warning on Help, Learn examples), as Cloudscape recommends.

### 10. Motion follows the Cloudscape guidelines

Checked against [Cloudscape motion](https://cloudscape.design/foundation/visual-foundation/motion/):

| Guideline | Result |
| --- | --- |
| Motion from the design system, with its duration and easing tokens | All motion comes from Cloudscape components (dropdowns, modals, side navigation, help panel, flashbar). The portal has no custom `transition`, `animation` or `@keyframes`; page changes and section links scroll instantly |
| Respect reduced motion | Cloudscape turns off non-essential motion under `prefers-reduced-motion`; the portal adds none of its own |
| Loading motion only for real work | The demo sign-in no longer waits 900 ms behind a “Signing in” spinner; the demo check is instant |
| Turn motion off in automated tests | All four browser suites run with `reducedMotion: 'reduce'` |

### 11. Spacing follows the Cloudscape guidelines

Checked against [Cloudscape spacing](https://cloudscape.design/foundation/visual-foundation/spacing/):

| Guideline | Result |
| --- | --- |
| 4 px grid; spacing from the scale and tokens, not hard-coded pixels | Portal `.scss` uses `$space-scaled-*` (section 7); no inline margin or padding in components; spacing between components uses `SpaceBetween` (sizes xxxs–l only) |
| Page header to content 16, container padding 20, header to description 2, label to control 4 | Provided by `ContentLayout`, `Container`, `Header` and `FormField` |
| Buttons in an action stripe 8 apart | All horizontal button groups use `xs` |
| Form fields 20 apart | All forms now use `SpaceBetween size="l"` between fields: the add/edit user form and the standards search form changed from `m` (16 px) |

The native `<details>` disclosure rules (10 px padding, rem units) left `src/styles/index.css`: the portal uses Cloudscape expandable sections, and only the content administration walkthrough still uses `<details>`, so the rules now live in `admin-demo.css`, scoped to `.admin-demo`, unchanged.

## Developer notes

| File | Purpose |
| --- | --- |
| `src/app/FernWorkspace.tsx` | Shell: header, navigation, breadcrumbs, notifications, help panel, routing, page switch |
| `src/app/ui.tsx` | Shared blocks: Cloudscape theme, `Page`, `Card`, `Section`, `ExpandAllControls`, `Terms`, `TextGrid`, `NavLink` / `NavButton`, `revealSection`, `usePageNotifications` |
| `src/app/pageHelp.tsx` | Help panel text for each kind of page (draft until guides are approved) |
| `src/app/cloudscape.scss` | Sticky header, list markers and indent in text content, wide-table helper, scroll offset for anchors. New portal styles go in `.scss` and use design tokens (`@use '@cloudscape-design/design-tokens/index.scss' as awsui;`) |
| `src/app/portalRoutes.ts` | URL ↔ page, plus `routeFor(label)`, which maps a page, resource, lesson or application name to its route |
| `src/app/preferences.ts` | Header country preference |
| `src/app/visuals.tsx` | Photographs (`PageBanner`), hero, mascot, icon sets and `IconTitle` / `FernIcon` |
| `src/features/admin/` | Users & roles demonstration and its sample data |

- **Links inside the portal** use `NavLink` or `NavButton` with a page label (e.g. `<NavLink to="Performance & KPIs">`). They render a real `href`, so ctrl/cmd-click opens a new tab, and a plain click navigates in place.
- **Reading sections** use `Section`. "Expand all" opens every section inside the nearest `[data-reading-scope]`. A `#id` link, or `revealSection(id)`, opens the section that contains the target and scrolls to it.
- **Cloudscape global styles are imported** in `src/styles/index.css` (`@cloudscape-design/global-styles/index.css`). Portal base rules (block images, pointer cursor) sit in `@layer base`, so Cloudscape and page styles always take precedence. Switching from the Tailwind reset changed only the Users & roles table, whose rows are now slightly taller (Cloudscape's intended spacing); a 48-screenshot comparison found the other pages pixel-identical.
- **Search** is `features/search/FernAISearch.tsx` (header box and `searchFern`) and `features/search/SearchResults.tsx` (results page). Choosing a suggestion opens that page; pressing Enter opens `?page=search&q=…`, which lists matches grouped as guidance, learning topics and applications (coming soon), ranked by how many words match, with a box to refine the search and a link that runs the same words in the Standards & Reference Library search. It returns keyword matches, not AI answers. Quick Suite integration is still outstanding.

### Routes

| URL | Page |
| --- | --- |
| `/` | Home |
| `?page=workspace`, `mission[&pillar=1-8]`, `leadership`, `overview`, `planning`, `performance`, `risk`, `assurance`, `improvement` | Workspace |
| `?page=applications`, `?page=pre-contract` (and other application slugs) | Applications |
| `?page=about`, `getting-started`, `learn[&lesson=…]`, `reference[&bbm=…]`, `help`, `updates`, `facility` | Resources |
| `?page=search&q=…` | Search results |
| `?page=admin` | Users & roles (demo) |

### Removed

- The old header and sidebars (`HomeNavigation`, `navigation.tsx`) and the footer (`SiteFooter`).
- The per-page search box and reading controls (`ReadingControls`).
- The illustration components (`VisualGuide`, `HumanImage`); their photographs and icons now come from `app/visuals.tsx`.
- 22 page-specific CSS files.
- Five unused images: the old sidebar mascot and four cartoon teaser illustrations. The Learn photograph, removed at first, was restored.
- The temporary `?ui=cloudscape` sample.

The single-file export dropped from about 61 MB to 55 MB.

## Verification

```powershell
pnpm typecheck; pnpm test; pnpm build; pnpm export:portal
pnpm dev   # then, in another terminal:
node tests/browser.mjs; node tests/homepage-browser.mjs
node tests/portal-handover-browser.mjs; node tests/pdf-delivery-browser.mjs
```

All results passed on 31 October 2026:

- Typecheck passed, and 40/40 unit tests passed.
- All four browser suites passed. They were rewritten for the Cloudscape UI, and the handover suite now also covers the header country filter and the Users & roles demo.
- A crawl of all 25 routes at desktop (1440 px) and mobile (390 px) widths found no page errors, no console errors and no horizontal overflow.

## Still open

| Item | Waiting on |
| --- | --- |
| Sign-in with Midway; real roles (FERN-managed or from APM) | Amazon identity / Federate set-up; decision by Benito and Richard |
| Users & roles connected to a real store and approvals | The decision above, plus backend and CMS |
| Learn linking to Amazon's LMS and K-Mine | Contacts and format from Amazon (Vishnu, LMS owner) |
| Translations for other languages | Content owner |
| Home page changes from Kim's home-page BRD | BRD review |
| Clearer library title/description | Kim, after review |
| Approved "How to use" text for the help panel (draft text is in `src/app/pageHelp.tsx`) | Guide authors (HC, then internal); approval by Benito or Richard |

## Superseded documents

The following describe the previous custom design and are kept for history. Where they conflict with this document, this document is the current behaviour:

- `HOMEPAGE-INTEGRATION.md`
- `SHARED-AI-SEARCH.md`
- `SHARED-RESOURCE-NAVIGATION.md`
- `EXPANDABLE-READING.md`
- `WEBSITE-VISUAL-INTEGRATION-2026-09-15.md`
- `ICON-PRESENTATION-2026-09-16.md`
- `APPLICATION-ICON-SIZING-2026-09-17.md`
