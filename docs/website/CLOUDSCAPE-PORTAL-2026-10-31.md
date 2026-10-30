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
| Home | Hero image, illustrated panels | Hero `Container` (photo beside the welcome text and the Get started / What is FERN? buttons), three starting points, mission summary, application cards, popular learning topics |
| Workspace topics (7) and Mission & Pillars | Custom cards and `<details>` | `Container`, `ExpandableSection`, "Expand all / Collapse all" |
| Detailed practice guides (7) | Page-specific CSS cards | `Card` (Container) and `Section` (ExpandableSection); converted with an AST codemod so the text is verbatim |
| Applications | Cards on Home only | Cards on Home plus an **Applications** page with a filter (`?page=applications`) and an introduction page per application |
| Learn, Get started, Help, About, What's new | Panels inside Home | Their own pages under **Resources** |
| Standards & Reference Library | Custom search form and result rows | `Input`, `Select` (country), `SegmentedControl` (collection), result list, `KeyValuePairs` reader, expandable source pages |
| Search | A search box on every page | One header search (`Autosuggest`) suggesting topics, lessons and applications |
| Demo sign-in | Custom form | The FERN brand panel is kept; the form uses Cloudscape `Container`, `Form` (with `errorText`), `FormField`, `Input`, a "Show password" `Checkbox` and a primary `Button`. Privacy, terms and help open a dismissible `Alert`. It is still a demonstration and will be replaced by Midway |
| Content-administration walkthrough | — | Unchanged. The CMS keeps its own editing screens (agreed: Cloudscape for the portal, not the CMS) |

The look follows Cloudscape defaults, with FERN blue for primary buttons and links and the existing Inter/system font stack.

**FERN imagery is kept inside the Cloudscape layout** (`app/visuals.tsx`):

| Image or icon | Where |
| --- | --- |
| Home hero photograph | Home, in a `Container` with side media (the image moves above the text on phones) |
| Photograph banners | Top of each Workspace topic, Mission & Pillars and Learn (original alt text kept) |
| FERN guide mascot | Help & Guidance, "Need a hand?" |
| Application icons | Application cards, introduction pages and "Works with" links |
| Pillar icons | Home mission summary, Mission & Pillars sections, "Guided by" on Workspace topics |
| Topic, lesson and help icons | Home starting points, Workspace cards, Learn topics, Help topics |

Icons are the Phosphor duotone icons used before, in FERN blue and hidden from screen readers. The cartoon teaser illustrations are not used, because they clash with the Cloudscape style.

### 2. Amazon review fixes

| Request (30 Oct 2026) | Done |
| --- | --- |
| Eight pillar links all led to the same page | One "Explore our mission & pillars" button; pillar names are plain text |
| Mission & Pillars repeated on the Workspace page and in the footer | Footer removed |
| One consistent name for the library | "Standards & Reference Library" everywhere (menu, search, pages, links) |
| "Learn" reached from several places that open the same page | Home has one way in to each destination: About and Get started are the header buttons; Workspace, the library and Learn are the three starting points; the lesson links open specific lessons. Help is in the menu only |
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

## Developer notes

| File | Purpose |
| --- | --- |
| `src/app/FernWorkspace.tsx` | Shell: header, navigation, breadcrumbs, routing, page switch |
| `src/app/ui.tsx` | Shared blocks: Cloudscape theme, `Page`, `Card`, `Section`, `ExpandAllControls`, `Terms`, `NavLink` / `NavButton`, `revealSection` |
| `src/app/cloudscape.css` | Sticky header, list markers under the Tailwind reset, grid and wide-table helpers, scroll offset for anchors |
| `src/app/portalRoutes.ts` | URL ↔ page, plus `routeFor(label)`, which maps a page, resource, lesson or application name to its route |
| `src/app/preferences.ts` | Header country preference |
| `src/app/visuals.tsx` | Photographs (`PageBanner`), hero, mascot, icon sets and `IconTitle` / `FernIcon` |
| `src/features/admin/` | Users & roles demonstration and its sample data |

- **Links inside the portal** use `NavLink` or `NavButton` with a page label (e.g. `<NavLink to="Performance & KPIs">`). They render a real `href`, so ctrl/cmd-click opens a new tab, and a plain click navigates in place.
- **Reading sections** use `Section`. "Expand all" opens every section inside the nearest `[data-reading-scope]`. A `#id` link, or `revealSection(id)`, opens the section that contains the target and scrolls to it.
- **Cloudscape global styles are not imported.** The portal already applies the Tailwind reset, and in the single-file export the normalize stylesheet would also restyle the sign-in page.
- **Search** is `features/search/FernAISearch.tsx`. It returns keyword matches, not AI answers. Quick Suite integration is still outstanding.

### Routes

| URL | Page |
| --- | --- |
| `/` | Home |
| `?page=workspace`, `mission[&pillar=1-8]`, `leadership`, `overview`, `planning`, `performance`, `risk`, `assurance`, `improvement` | Workspace |
| `?page=applications`, `?page=pre-contract` (and other application slugs) | Applications |
| `?page=about`, `getting-started`, `learn[&lesson=…]`, `reference[&bbm=…]`, `help`, `updates`, `facility` | Resources |
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

## Superseded documents

The following describe the previous custom design and are kept for history. Where they conflict with this document, this document is the current behaviour:

- `HOMEPAGE-INTEGRATION.md`
- `SHARED-AI-SEARCH.md`
- `SHARED-RESOURCE-NAVIGATION.md`
- `EXPANDABLE-READING.md`
- `WEBSITE-VISUAL-INTEGRATION-2026-09-15.md`
- `ICON-PRESENTATION-2026-09-16.md`
- `APPLICATION-ICON-SIZING-2026-09-17.md`
