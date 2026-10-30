# Expandable reading

15 September 2026 — PRD READ-01 and READ-02

The integrated Workspace pages show short introductions and closed topic sections. Full approved copy remains inside native details elements. Mission & Pillars, Help & Guidance, Reference Library explanations and selected BBM standards provide scoped Expand all / Collapse all controls. Search and key actions remain visible.

In a selected standard, the original source overview and scope/system description stay visible. Individual PDF pages group complete tasks, tables and conditions without editing the source data. Pages containing the search phrase open on selection; contents links reveal closed ancestors before scrolling. Download Selected Standard and Download Full Document remain directly available.

Implementation is in apps/portal/src/features/reading/ReadingControls.tsx and reading-controls.css, composed into the relevant content pages. The reader uses native keyboard-operable summary elements. No library dependencies or live service integration were added.

Verification: TypeScript, 142 existing tests, application builds and supplementary static React rendering. The parent workspace check is work/visual-review/check-expandable-reading.mjs, covering all seven Workspace pages, Mission, Help, Reference Library and a selected fire-door standard with complete source transcripts and matching-page reveal. Browser visual, keyboard, mobile and anchor-interaction verification remain outstanding because browser launch is restricted in this session.
