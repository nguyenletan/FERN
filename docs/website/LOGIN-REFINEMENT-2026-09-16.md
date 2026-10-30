# Login and mascot refinement — approved review fixes

User instruction: fix the findings in the 16 September visual review. This addendum covers presentation and accessible form controls; production identity and integrations remain unchanged.

| Requirement | Acceptance check | Result |
| --- | --- | --- |
| LOGIN-REFINE-01: Display the complete four-person team on desktop without clipping. | At 960 × 900, inspect all figures, feet and equipment within the image and panel. | Passed; login-refined-desktop.png. |
| LOGIN-REFINE-02: Show sign-in in the initial mobile viewport. | At 390 × 844 and 320 × 640, inspect the compact brand header and measure the submit button bottom. | Passed; bottom 528.2 px and 550.6 px respectively; no horizontal overflow. |
| LOGIN-REFINE-03: Use live HTML for headings, tagline and benefit descriptions. | Inspect accessible DOM; copy must be text rather than a background image. | Passed; all desktop copy exposed. |
| LOGIN-REFINE-04: Use one recognisable female FERN guide and consistent labels. | Inspect team image and compare login/search/help imports; all clothing labels use FERN. | Passed; shared fern-guide-transparent.png, derived from the team central character. |
| LOGIN-REFINE-05: Preserve demo sign-in, with labelled controls. | Invalid password produces an alert; demo/demo opens Home; Show/Hide password toggles input type; native checkbox changes state. | Passed in in-app browser. Labels connected to fields and toggle has accessible name. |
| SEARCH-10 presentation: State available search capability accurately. | FERN Search title, keyword status, policy search returns Leadership & Policy and opens it. | Passed; existing matching logic unchanged. |

Evidence in source/test-results/design: login-refined-desktop.png, login-refined-mobile.png, home-refined-search.png. Image provenance and final prompts: design-reference/login-refinement-prompts.md.

TypeScript, all 142 existing tests and all six builds passed. Browser suite launch was attempted but its Chromium executable is absent; affected flows were checked manually via the in-app browser. No full screen-reader or accessibility-conformance audit is claimed. Remember me remains the existing prototype state; it does not establish persistent production authentication.
