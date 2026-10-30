# Webpage review fixes — 16 September 2026

This addendum to the website requirements implements the user's instruction to fix the five findings in FERN-Overall-Review-2026-09-16/REVIEW.md. Earlier visual notes remain historical.

| Requirement | Result | Acceptance |
| --- | --- | --- |
| WEB-FIX-01: Every enabled login action must respond truthfully. | Language is static; unavailable Amazon sign-in/password recovery are explicit text. Privacy information, Preview terms and Preview help open working information panels. No production policies are invented. | In-app browser opened all three panels; help close action works. |
| WEB-FIX-02: Make demonstration access understandable. | Visible demo/demo instructions, Demo username label and helpful invalid-entry message. Removed nonfunctional Remember me; explicitly explain sign-in is required after refresh. | Valid demo sign-in verified. No persistent credentials introduced. |
| WEB-FIX-03: Readable orange CTA. | Dark navy #071c45 on #f87800 replaces white text. | Computed colours and mobile screenshot inspected; contrast exceeds 4.5:1. |
| WEB-FIX-04: Share and restore baseline destinations. | Page and learning-topic query parameters; Back/Forward restores page selections. BBM edition/query history is preserved. Requested destinations survive demo sign-in. | Five new routing tests; in-app browser checked Back, Forward, reload then sign-in, homepage lesson, manual lesson selection and standard-reader history. |
| WEB-FIX-05: Footer wording must match its destination. | Reference guidance opens the Reference library. Service models opens Service Models Explained. | Both routes clicked and destination/lesson verified. |

Verification: TypeScript passed; 147 automated tests passed; all six builds and self-contained HTML export passed. In-app browser checks passed; no sampled console errors or mobile horizontal overflow. Screenshots: test-results/design/bugfix-home-mobile.png and bugfix-login-mobile.png.

The repository browser test was updated and attempted, but cannot launch because Playwright Chromium is not installed. This is recorded as blocked, not passed. The in-app checks are targeted manual acceptance, not full browser or accessibility certification. No production identity, support integration or application availability was added.

Source boundaries: portalRoutes.ts owns URL parsing/serialization; FernWorkspace owns page navigation; DashboardPage/Learn consume lesson selection. Shared DemoSignIn remains explicitly a prototype across standalone apps. Existing Peccy-style assets and icon alignment are retained.
