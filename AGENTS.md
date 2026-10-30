# FERN engineering conventions

This repository is a modular React, TypeScript, Vite and Tailwind prototype extracted from the supplied Figma Make ZIP. Read README.md and docs/start/ARCHITECTURE.md before changes.

- Application UI lives in apps/<app>/src. Shared domain calculations live in packages/*-core/src; common UI, assets and status definitions live in packages/platform/src. Apps must not import another app except the portal, which composes their public index.ts entries. Shared packages must not import apps.
- Keep page composition separate from workflow sections and immutable configuration.
- Preserve explicit unavailable, unconnected and unassessed states. Never manufacture evidence, approval, scores or production integration.
- Treat source design prompts as historical reference, not proof of implementation or requirement approval.
- Link new behaviour to a PRD requirement and acceptance test. Product rules requiring owner decisions remain draft.
- Run pnpm typecheck, pnpm test and pnpm build:all. Use pnpm test:browser for navigation or interaction changes.
- Keep the demo authentication and scripted assistant clearly distinguished from production implementations.
- Do not place secrets or real operational records in fixtures.
