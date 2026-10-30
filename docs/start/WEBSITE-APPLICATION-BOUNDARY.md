# Main website and standalone applications

8 September 2026 — current delivery boundary

We are completing the FERN website first. The website includes login, Home, the seven Workspace sections, introductory learning, reference guidance and Help. Individual applications remain separate engineering workstreams.

## Requirements and acceptance

| ID | Requirement | Acceptance |
| --- | --- | --- |
| WEB-SCOPE-01 | Display application descriptions without launching workflows. | Home cards and sidebar application buttons are disabled. Indirect guidance navigation displays an availability description, never a calculation or data-entry workflow. |
| WEB-SCOPE-02 | Do not select or display a demonstration facility on the website. | No BHX4 status, facility selector or history on Home or FM Overview. Legacy facility guidance displays an explanation only. |
| WEB-SCOPE-03 | Preserve independent application development. | Standalone source and build entries remain available; website no longer imports their workflow pages. No application records are deleted. |
| WEB-SCOPE-04 | Keep website guidance usable on desktop and mobile. | Workspace and learning navigation continue to work; mobile drawer and Home navigation remain available. |
| WEB-SCOPE-05 | Deliver consistent source, PRD and teaser after website corrections. | Regenerate and reconcile the final handover together; previous ZIPs and teasers are dated snapshots, not automatically refreshed. |

“Coming soon” means unavailable on the website. It is not a delivery date, a statement that all application functionality is complete, or an Amazon production approval.

After website completion, review each standalone application's functionality, UI and authorised real-data validation. Amazon integration specifications, source ownership, authorised contacts, identity, shared storage and formal approvals remain controlled handover dependencies.

## Verification

TypeScript check, 124 automated tests and all application builds pass. In-app browser inspection confirmed disabled Home/sidebar application controls. At 492 px width, FM Overview displayed without BHX4, facility selection or horizontal overflow.

The automated website browser suite could not start because the Playwright Chromium executable is missing. Complete desktop/mobile and keyboard regression remains outstanding. The previous integrated application browser scenario is retained as browser-integrated-legacy.mjs for migration to standalone application testing; it is not a current portal acceptance test.

The existing source review ZIP and standalone teaser have not been regenerated in this increment.

### Follow-up: consistent guidance links

Learn and Planning & Objectives no longer offer active tool-opening controls. Get Started links readers to service-model learning. Both sidebar variants visibly label applications Coming soon, including on touch devices where hover titles cannot explain availability. This extends WEB-SCOPE-01 to secondary guidance paths. Typecheck, 124 tests and all builds pass; automated browser execution remains blocked by the missing runtime.

### Getting Started follows available actions

The user-approved correction replaces facility selection with “Explore Guidance and Learning”. Step 1 exposes all seven Workspace guidance destinations; step 2 opens Learn and Reference Library; step 3 explains source interpretation. Disabled application previews appear after the current guidance. Standalone save/export instructions have been removed from this website introduction.

Acceptance: no facility-selection instruction in Getting Started; active guidance precedes unavailable tools; all five application previews remain disabled. Facility handoff requirements remain in the production PRD. Typecheck, 124 tests and all builds pass; automated browser execution remains blocked by missing Chromium. This increment has not received a full rendered interaction review.

### Remaining facility wording corrected

About FERN and Learn now direct users to guidance without facility selection. The teaser source template now says Discover FERN. The legacy informational facility panel has a neutral title, and Help no longer includes standalone save/export instructions. Standalone applications retain their facility workflows. Existing exported HTML files remain dated snapshots awaiting regeneration. Typecheck, 124 tests and all builds pass; a source scan found no affirmative facility-selection or save/export instruction in dashboard or teaser-template copy.

### Guided-search artwork

The user-supplied FERN G.png character replaces the sparkle beside Guided search in the main website and teaser source template. The existing AI connection planned label remains. The image is bundled locally, has responsive dimensions and an empty alt attribute because adjacent text identifies the feature. SEARCH-02 remains unchanged: the artwork does not indicate a live AI connection. Typecheck, 124 tests and all builds pass. Exported teaser files await regeneration.

### Search avatar refinement

The supplied character is now displayed as a compact circular portrait rather than a full-body thumbnail: 44 px on desktop and 36 px on small screens. The original asset is unchanged; CSS controls its presentation. This reduces visual weight while making the face recognisable beside Guided search. The AI availability text remains visible. A desktop screenshot check confirmed the portrait fits the search band without competing with the input. Typecheck, 124 tests and all builds pass. Full mobile/keyboard regression is not claimed.

### Search layout alternative following user feedback

The circular portrait has been replaced: the full character now sits beside the question heading, while Guided search / AI availability appears beneath the input. The desktop layout has two columns and stacks below 800 px. The original image asset is unchanged. This supersedes the previous avatar presentation; user visual acceptance remains open. Typecheck, 124 tests and all builds pass.

### Need a hand assistant entry

Need a hand now shows a disabled AI question field with an explicit unavailable message and a separate functional Browse Help & Guidance action. The teaser source mirrors the presentation with all help actions disabled. PRD v1.9 CONTENT-04 and SEARCH-09 define both homepage question bars as entry points to the same Quick Suite agent, with common permissions and supported session continuity. No AI service has been connected. Typecheck, 124 tests and builds pass; automated browser execution is blocked by missing Chromium. Rendered interaction acceptance remains open for this increment.


### Assistant follow-up verification

In-app browser check at 538 px confirmed that Browse Help & Guidance opens the Help content, the AI question/send controls remain disabled, and the page has no horizontal overflow. Bottom padding was increased to keep the help link clear of the panel edge. This is a limited manual check, not complete accessibility or Quick Suite integration acceptance. The project and integration handovers now reference PRD v1.9 and SEARCH-09.

### Settings removed from ordinary website navigation

The configuration group and account-administration entries have been removed from both sidebars and the profile dropdown. The dropdown now offers functional Help & Guidance and Sign Out. The teaser source no longer lists Settings. PRD v1.10 ADMIN-01–03 retains future administrative requirements with role-based access and separate personal preferences. Typecheck, 124 tests and all builds pass. Automated browser checks remain blocked by missing Chromium; rendered navigation acceptance for this change remains open.
