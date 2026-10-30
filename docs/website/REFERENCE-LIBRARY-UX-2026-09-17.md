# Reference Library usability update — 17 September 2026

Implements the user's instruction to continue after the Reference Library UX review. This is a presentation and discovery update to the supplied library, not an update of the source standards or an applicability assessment.

| Requirement | Implemented behavior | Acceptance evidence |
| --- | --- | --- |
| LIB-UX-01: One clear search scope | Reference Library opens directly on its standards search; general site search stays on other pages. Topic shortcuts, collection counts and exact-code search share this workflow. | In-app browser: emergency lighting, Fire doors, collection changes and clear search. |
| LIB-UX-02: Scan useful results | Compact rows show original title, code, collection, edition, pages, match reason and highlighted source excerpt. Excerpts come from one source paragraph or cell. Explicit source-linked standards appear after direct matches. | Regression tests verify emergency lighting ranks CT.ELEC.EMERGENCYAC then source-linked LIGHT.SAFETY; no inferred links. |
| LIB-UX-03: Recover from no results | Explicit suggested-query button for supported aliases/title misspellings; no automatic query substitution. Clear search, both-collection recovery and browse all remain available. | In-app browser and tests: emergency ligting suggests emergency lighting; exact codes remain unchanged. |
| LIB-UX-04: Read on small screens | Task cards pair original labels and values. Source intervals/evidence remain separate from task frequency. Blank interval cells are labelled in a disclosure. Regional conditions include continuation pages. | All 2,639 task rows and 809 regional-condition rows checked for exact cell values and coverage. Approved sample rows independently compared. Emergency lighting has 9 tasks and 9 regional rows including UK and SK on page 17. Mobile 390px has no document/main overflow. |
| LIB-UX-05: Keep context and source access | Early section jumps, visible source relationships, original tables, selected/full PDF controls, original PDF comparison, query/filter URLs and return focus/position. | In-app checks cover section jumps, original page disclosure, view switching, PDF comparison, explicit return and browser Back. Source PDF hashes and page coverage retain existing tests. |

Verification: TypeScript passed; 153 automated tests passed; all six builds and the self-contained HTML export passed. The built-in browser was used for targeted desktop/mobile visual and interaction checks; no sampled console errors. Screenshots are in test-results/design/library-*.png.

The standalone Playwright suite was not rerun: its Chromium executable was unavailable in the preceding review. Its changed search selectors were updated. The in-app checks do not claim exhaustive browser, download or accessibility certification. The embedded PDF links were exercised; byte fidelity is covered by source/PDF hash tests.

Engineering: libraryDiscovery.ts owns ranking, suggestions and source excerpt selection. taskReading.ts projects source grids, merged cells and continuation tables into reading rows. TaskReader.tsx renders those rows; library-usability.css contains the scoped responsive styles. StandardsLibrary.tsx composes discovery and reading. Source PDFs/generated content are unchanged. The original tables remain available to check full scope, general instructions, notes and conditions. Whitespace wrapping in task cards follows the viewport rather than PDF line breaks.

No production identity, live standard feed, AI connection or approval status is added. Supplied editions remain Compliance April 2024 and Preventive Maintenance March 2025. Existing website artwork and baseline styling are retained.
