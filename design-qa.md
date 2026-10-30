# Visual QA — 16 September 2026

final result: passed

## Visual sources and evidence

Source visual truth: `design-reference/homepage-reference.png` (1026×1781). The former dark purpose section is preserved in `design-reference/purpose-before.png` (1390×332). User-directed changes: apply the reference's layout, shared header/footer and colour language across baseline pages; retain existing illustrations/mascot, depict a Black male in the hero, and make the purpose section consistent with the other light panels. Retain existing website functionality, mission/Workspace content, disabled applications and no facility-selection requirement.

Final hero/purpose evidence: `test-results/design/home-final.png`. Desktop comparison CSS viewport was 1026×900, with browser zoom reporting DPR 1.1; captured raster is 1129×990. Compare at a uniform 1/1.1 scale to the source's 1026px width. Earlier 1026×900 raster captures use DPR 1. Mobile captures `home-mobile.png`, `overview-mobile.png`, `footer-mobile.png` are 390×844. The reference has no mobile design; mobile is checked for coherent adaptation and usable controls. `footer-desktop.png` was captured at an effective 932×818 CSS viewport with DPR 1.1; it is supplemental footer evidence, not a full-width pixel comparison.

State: signed in with demo credentials. Home selected, menu closed for visual capture; open menu, Workspace/resource destinations, search results and reader disclosures were checked separately. Browser: Codex in-app browser, local Vite preview.

Full composition was reviewed through top, middle and footer captures because this app uses an internal scrolling main region. Focused comparisons covered the hero/branding, purpose panel, illustrated application cards, learning rows and helper/footer. Additional images include `home-cards-final.png`, `mission-desktop.png`, `reference-reader.png` and the seven `*-final.png` Workspace page captures. The older full-page reference is taller/different in section order because the latest baseline retains mission, Workspace routes and updates omitted from that earlier visual.

## Fidelity review

- Typography: retained the established Inter/system sans-serif stack; navy headings, blue subheading, a larger responsive hero heading and clear body hierarchy. Main title scale was increased after first comparison to better match the reference. Mobile wraps within the available width. The exact font in the raster reference is unconfirmed.
- Layout: full-width dark header, split hero, five application cards on desktop, two light learning panels, help panel and dark five-column footer. Existing mission and Workspace-route sections remain. Mobile stacks content, uses two application columns and an on-demand menu; checked without horizontal document overflow.
- Colours: shared navy header/footer, white reading surfaces, pale-blue panels, blue links/actions and orange primary welcome action. Purpose no longer uses a dark gradient; its light surface and white pillar tiles now match the surrounding components.
- Imagery: source illustrations/mascot are reused as raster assets. Hero was edited with built-in imagegen to feature a Black male colleague; both colleagues, tablet and warehouse remain clear. A further image edit adds the white feathered left edge from the reference. No missing images were found in checked views.
- Copy/functionality: current authorised baseline wording is retained. “Reference Network”, unavailable tools, FERN AI Search/keyword fallback, no facility selection, purpose and additional reader content intentionally differ from the older visual. Footer links point to real available destinations; unconnected application names are descriptive text. No fictional legal/social links or operational functions were introduced.

## Comparison history and fixes

1. P2: earlier CSS overrode the primary-action colour and older compact styling. Moved the visual stylesheet to the final root import and strengthened portal-scoped rules. Verified orange action, larger title and light card treatment.
2. P2: Workspace views lacked consistent horizontal inset after the shared-shell change. Added scoped `.fw-workspace-view` gutters; final captures for all seven destinations show the corrected shared reading frame.
3. P2: nested scrolling could move the mobile header offscreen after navigation/focus. Established one fixed portal frame, clipped non-scrolling wrappers and an independently scrolling main area. Rechecked mobile navigation, footer scrolling and document width; header top remains zero and document height matches the viewport.
4. P2: initial photo boundary was hard against the white text column. Added the generated white feathered-edge hero asset; `home-final.png` shows the final composition.

No actionable P0/P1/P2 visual findings remain for this requested refresh. Remaining P3: exact typeface identification and illustration-by-illustration pixel matching to the older mock could be refined if required; the user requested reuse of existing assets, which this implementation preserves.

## Interaction checks and limits

Checked demo sign-in; Mission & Pillars; all seven Workspace pages; Workspace index; Get Started; About FERN; Learn; Help; Reference Library; keyword search; Fire Doors standard lookup and source reading; Expand/Collapse all; menu open/close/Escape; mobile menu-to-page navigation; footer-to-page navigation; five disabled application cards and unavailable AI input. No console errors observed in final in-app preview.

TypeScript, 142 existing tests, and six builds passed. Automated Playwright browser suite could not launch because its Chromium runtime is absent. The generated HTML was checked for bundled script/style dependencies. Direct `file://` opening was blocked by browser-tool URL policy, so standalone-file browser acceptance is not claimed. PDF download byte checks and a full accessibility audit were not repeated for this visual-only change.

## Breadcrumb alignment follow-up

Corrected the shared breadcrumb style after the user identified the current-page label sitting above the navigation links. All children now share a line height and are vertically centred. Browser checks on Mission & Pillars and Leadership & Policy confirmed identical text top/bottom coordinates for Home, Workspace, separators and the current page. Evidence: `source/test-results/design/breadcrumb-leadership-fixed.png`. TypeScript, all 142 existing tests and all six builds passed again; the standalone HTML was regenerated.

## Search mascot scale follow-up

Enlarged the shared FERN AI Search mascot from 46 × 56 px to 76 × 92 px on desktop, and to 64 × 78 px at widths up to 700 px. Preserved the existing image and aspect ratio. Desktop (1280 px) and mobile (390 px) browser checks confirmed balanced placement; mobile main scroll width and client width both measured 375 px. Evidence: `source/test-results/design/mascot-search-desktop.png` and `source/test-results/design/mascot-search-mobile.png`. TypeScript, all 142 tests and all six builds passed again. HTML regenerated.

## Login mascot balance follow-up

Updated the shared login artwork with female character designs for the central FERN AI mascot and the colleague in the blue suit, aiming for an even gender spread across the four mascots. The existing artwork was edited using the built-in image-generation tool; uniforms, roles, branding and layout are retained. Original image preserved. Selected asset: `packages/platform/src/assets/login-balanced-team.png`; full prompt: `source/design-reference/login-balanced-team-prompt.md`. Browser verified at 1440 px using the new asset; evidence: `source/test-results/design/login-balanced-mascots.png`. TypeScript, all 142 tests and six builds passed again; standalone HTML regenerated.

## Review fixes: login, mascot consistency and search naming

Replaced the background screenshot with live brand, tagline and benefit text plus a complete transparent team illustration. All figures fit inside the desktop panel. Below 768 px, a compact brand/guide header brings the sign-in action into the first viewport. The same female FERN guide now appears on login, search, help and preview surfaces. All team clothing labels consistently say FERN. Search title is now FERN Search; keyword matching remains unchanged and planned AI is explicit. Form labels are associated with inputs, the password toggle has an accessible name, the checkbox is native, errors are alerts and the sign-in action uses brand blue. Original assets retained.

Acceptance evidence and requirements: `source/docs/website/LOGIN-REFINEMENT-2026-09-16.md`. Final asset paths and built-in image-generation prompts: `source/design-reference/login-refinement-prompts.md`. Desktop 960 px and mobile 390/320 px checks passed, as did invalid/valid demo login, password visibility, checkbox, keyword results and navigation. The updated login has live accessible text. Full accessibility conformance is not claimed. TypeScript, 142 tests, six builds and standalone export passed; the automated browser suite remains blocked by missing Chromium.

## Icon scale and transparent backgrounds

All eight existing application/learning illustrations now have separate transparent PNG variants, produced with built-in image editing. Only their surrounding white backdrop was removed; white paper and other object surfaces remain. Application illustrations are 72 px on desktop and 56 px on mobile; learning/getting-started illustrations are 64 px and 48 px. Navigation symbols are 30 px with transparent backgrounds. Dashboard, preview and reusable illustration imports are updated. Original files retained.

Desktop (960 px) and mobile (390 px) visual checks passed; mobile content has no horizontal overflow. All eight assets passed RGBA/transparent-pixel checks. TypeScript, 142 tests, all six builds and standalone export passed. See `source/docs/website/ICON-PRESENTATION-2026-09-16.md`, `source/design-reference/transparent-icon-prompts.md`, and `source/test-results/design/icons-transparent-desktop.png` / `icons-transparent-mobile.png`.

## Application icon centring

Centred the five application illustrations horizontally within their cards using automatic side margins. Desktop 960 px and mobile 390 px browser measurements confirmed zero difference between each image centre and its card centre. Sizes, transparent assets and text alignment are preserved. Evidence: source/test-results/design/application-icons-centred.png. TypeScript, 142 tests, six builds and HTML export passed.

## Diverse mascot team and refined professional character

Updated the login team with varied natural skin tones, hair and facial features, retaining two female and two male characters and the existing roles. The design brief specifies White, South Asian, East Asian and Black fictional colleagues. The suited colleague has revised proportions, expression, textured hair and a navy trouser suit with a simple pale-blue blouse. The central guide has a matching standalone asset reused for mobile login, search, help and previews. Previous assets retained. Both selected PNGs have alpha transparency.

Saved assets: `packages/platform/src/assets/fern-team-diverse-transparent.png` and `fern-guide-diverse-transparent.png`. Built-in image edit prompts: `source/design-reference/diverse-mascot-prompts.md`. Desktop 960 px and mobile 390 px screenshots verified the full team, matching guide and visible sign-in action; evidence: `source/test-results/design/login-diverse-team-desktop.png` and `login-diverse-guide-mobile.png`. TypeScript, 142 tests, six builds and standalone HTML export passed.

## Mascot reversion — latest user instruction

Reverted the active team and guide imports to the previous orange Peccy-style artwork: `fern-team-transparent.png` and `fern-guide-transparent.png`. This supersedes the diverse human-style mascot edit above. Applies to login, mobile login, search, help and preview surfaces. Responsive layout, transparent backgrounds, readable login text and centred application icons remain unchanged. Earlier alternate assets are retained only as history and are not used by the active UI. Browser confirmed the restored team loads; evidence: `source/test-results/design/login-orange-mascots-restored.png`. TypeScript, 142 tests, six builds and HTML export passed.


## Reference Library — 17 September 2026

Targeted desktop (880px) and phone (390px) checks passed for search, collection filters, misspelling recovery, source-linked result order, task cards, source-page disclosure, PDF comparison and returning to results. Browser Back restores the query and result focus. No sampled console errors; no main/document overflow at 390px. Original source tables intentionally retain their horizontal scroll region. Screenshots: `test-results/design/library-*.png`. Full acceptance notes: `docs/website/REFERENCE-LIBRARY-UX-2026-09-17.md`.


## Application icon proportion — 17 September 2026

Desktop 48px / mobile 40px icons verified centred. Reduced spacing keeps the artwork proportional to headings and cards. Evidence: test-results/design/application-icons-desktop.png and application-icons-mobile.png.
