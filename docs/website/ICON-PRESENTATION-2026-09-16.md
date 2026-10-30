# Homepage icon presentation

User request: size icons in proportion to the written content and use transparent backgrounds.

- Application illustrations: 72 × 72 px on desktop, 56 × 56 px on mobile (600 px and below); aligned with the card copy.
- Getting-started and learning illustrations: 64 × 64 px on desktop/tablet, 48 × 48 px on mobile.
- Workspace, Reference Library and Learn navigation icons: 30 × 30 px, no coloured background tile or extra padding.
- All eight source illustrations have separate transparent PNG variants. Existing white object surfaces, such as paper and book pages, remain part of the illustration. The backdrop is alpha-transparent. Original files are retained.
- Dashboard, share preview and reusable page artwork imports use the transparent variants. Non-photo reusable illustration wrappers also use transparent backgrounds.

Acceptance: desktop screenshot at 960 × 900 confirms the smaller illustrations and no white rectangles over the pale-blue panels. Mobile screenshot at 390 × 844 confirms 56 px application icons; DOM measurements confirm 48 px learning images and equal main client/scroll widths of 375 px. All eight files were checked for RGBA format and fully transparent background pixels. Evidence: `test-results/design/icons-transparent-desktop.png`, `icons-transparent-mobile.png` and `icon-transparency-checks.json`.

Built-in image-generation prompts and asset names: `design-reference/transparent-icon-prompts.md`. This is a presentation-only change; card navigation and unavailable application states are unchanged.
