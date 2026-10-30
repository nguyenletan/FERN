# FERN engineering conventions

This repository is the FERN portal (website), a React, TypeScript, Vite and Tailwind prototype extracted from the supplied Figma Make ZIP. Read README.md and docs/start/ARCHITECTURE.md before changes.

- Portal UI lives in apps/portal/src; common UI, assets, status definitions and demo sign-in live in packages/platform/src. Shared packages must not import the portal.
- FERN applications are maintained in a separate repository. Do not add application workflows here; the portal shows them as "Coming soon" until an approved launch integration exists.
- Keep page composition separate from immutable content and configuration.
- Preserve explicit unavailable, unconnected and unassessed states. Never manufacture evidence, approval, scores or production integration.
- Treat source design prompts as historical reference, not proof of implementation or requirement approval.
- Link new behaviour to a PRD requirement and acceptance test. Product rules requiring owner decisions remain draft.
- Run pnpm typecheck, pnpm test and pnpm build:all. Use pnpm test:browser for navigation or interaction changes.
- Keep the demo authentication and scripted assistant clearly distinguished from production implementations.
- Do not place secrets or real operational records in fixtures.
