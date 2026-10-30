# Transparent homepage illustrations

Tool: built-in image generation, background extraction/edit mode. Existing originals retained. The same prompt below was used independently for each supplied original image; no icon was redesigned in code.

Assets saved under `packages/platform/src/assets/`:

- `teaser-art-checklist-transparent.png`
- `teaser-art-analysis-transparent.png`
- `teaser-art-model-transparent.png`
- `teaser-art-pricing-transparent.png`
- `teaser-art-transition-transparent.png`
- `teaser-art-facility-transparent.png`
- `teaser-art-guides-transparent.png`
- `teaser-art-learning-transparent.png`

Final prompt for each edit:

Use case: background-extraction. Edit target: the provided existing FERN website illustration. Remove ONLY the external white/off-white background and make it truly transparent with alpha=0 outside the illustrated object. Preserve the exact illustrated subject, blue/navy/orange palette, shape, outlines, details and shading. IMPORTANT: preserve solid white interior surfaces such as paper, book pages, calculator keys, and building walls; remove only the surrounding backdrop and empty gaps between separate parts. No redesign, no added symbols or lettering, no glow, no coloured haze, no drop shadow, no checkerboard painted into the image. Centre the complete object in a square canvas with about 5% transparent margin, no cropping. Return a PNG with real alpha transparency, suitable for display on pale blue website cards.
