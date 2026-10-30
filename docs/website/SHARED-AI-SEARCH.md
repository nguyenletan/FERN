# Shared FERN Search

16 September 2026 update — SEARCH-10: the visible title is now “FERN Search”, with “Keyword search available · AI assistance planned” below the field. The shared female FERN guide is reused across login, search and help. Desktop and mobile sizing follow the refreshed portal styles. The historical implementation notes below predate this presentation update; keyword matching and navigation behavior are unchanged.

15 September 2026 — PRD SEARCH-10

A shared search component sits below headings or heroes throughout the reader-facing portal, including detailed Workspace guides. The decorative FERN helper stays small. At narrow widths the field stacks below the title. Login and standalone applications are unchanged.

The current implementation runs local keyword matching over website topics and the existing application catalogue. Guidance results use the portal navigation; unavailable applications remain text only. No query is sent to an AI service, and the bar states that the AI connection is planned. Amazon Quick Suite integration and production permission-aware retrieval remain required under SEARCH-01–09.

Implementation: apps/portal/src/features/search/FernAISearch.tsx and fern-ai-search.css. SearchNavigation supplies the existing portal navigation handler. No new dependencies or external service calls.

Validation: TypeScript, existing automated tests, production builds and static React rendering of 24 views. The supplementary rendering check is work/visual-review/check-ai-search.mjs in the parent workspace. Live browser, keyboard and responsive visual verification remain outstanding because browser launch is restricted in this session.
