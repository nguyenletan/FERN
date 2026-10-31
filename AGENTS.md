# FERN engineering conventions

This repository is the FERN portal (website), a React, TypeScript and Vite prototype built with Cloudscape (with @cloudscape-design/global-styles; no Tailwind) extracted from the supplied Figma Make ZIP. Read README.md and docs/start/ARCHITECTURE.md before changes.

- This is one Vite application: all source lives in src/ (shell in src/app, pages in src/features, demo sign-in in src/auth, global CSS in src/styles, images in src/assets). Do not add apps/ or packages/ workspace folders.
- FERN applications are maintained in a separate repository. Do not add application workflows here; the portal shows them as "Coming soon" until an approved launch integration exists.
- Keep page composition separate from immutable content and configuration.
- Preserve explicit unavailable, unconnected and unassessed states. Never manufacture evidence, approval, scores or production integration.
- Treat source design prompts as historical reference, not proof of implementation or requirement approval.
- Link new behaviour to a PRD requirement and acceptance test. Product rules requiring owner decisions remain draft.
- Run pnpm typecheck, pnpm test and pnpm build. Use pnpm test:browser for navigation or interaction changes.
- Keep the demo authentication and scripted assistant clearly distinguished from production implementations.
- Do not place secrets or real operational records in fixtures.
