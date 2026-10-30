# Application icon sizing — 17 September 2026

Requirement ICON-01: reduce the five homepage application icons in proportion to their card text and containers, as requested in the 13:07 screenshot.

Changed baseline-refresh.css: desktop icons 72 × 72 → 48 × 48 CSS pixels; mobile icons 56 × 56 → 40 × 40 CSS pixels. Bottom margin 6 → 2 pixels. Existing transparent images, centred alignment and intrinsic aspect ratios remain. Card height contracts naturally with the smaller artwork.

Acceptance: in-app browser confirmed all five icons at 48 pixels on desktop and 40 pixels on phone, horizontally centred in their cards. Desktop and mobile screenshots inspected. TypeScript, 153 tests, six builds and standalone export passed. This CSS-only adjustment changes no navigation or interaction.
