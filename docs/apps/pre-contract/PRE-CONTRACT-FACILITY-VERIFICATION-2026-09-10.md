# Pre-Contract standalone facility verification — 10 September 2026

## Baseline inspection

Read the application handover, starter prompt, repository conventions, README, architecture, website boundary, Pre-Contract PRD increments, report requirements and verification records. Source is the existing outputs/fern-application folder, not the FERN documents folder. It has no .git directory; changes were compared against file backups rather than a Git baseline.

The existing server on port 4176 pointed at this source but returned an older workflow. A fresh server on port 4196 returned the current five-step assessment. No existing server was stopped and no browser storage was cleared.

The current standalone entry bypassed the existing facility picker and forced BHX4 / IFM / Plus demonstration context. This prevented the first required facility-to-assessment journey. The source supports named drafts, date validation, baseline narratives, retained alternatives and pricing calculations. The final review remains a descriptive input summary, without saved report versions or PDF. The historical PreContractReportSection is not used by the current page.

Before changes, 124 automated tests passed. A synthetic BHX4 assessment at the isolated test origin exercised invalid/valid decision dates, baseline entry, an alternative, save and list navigation. After changes its baseline, date and alternative were confirmed on reopening. No issued prices existed at the isolated origin; eligible pricing selection and file transfer were not browser-verified. Unit tests cover compatibility and stale review rules.

## Implemented increment

Requirements: FERN-FAC-001 and FERN-PCA-006, constrained by the website/application boundary.

The Pre-Contract entry now uses its own shell and the existing shared FacilityPicker. No assessment opens before a facility is explicitly selected and confirmed. Saved local facilities, legacy site records and manual facility registration are reused. New session/reload requires selection again; saved records remain available under their original site keys. Selection does not adopt a service model, tier or approval.

Change facility is disabled while an assessment has unsaved changes, with an explanation to save or return to the assessment list. Opening/cancelling the picker retains the mounted assessment. Selecting a different site remounts the assessment workspace and reads that site's library. Sign-out retains the existing unsaved-work confirmation. The picker now labels its empty state Not selected; unused legacy page props are optional. Main website source, application previews, other standalone entries, calculations and storage formats are unchanged.

## Verification

- pnpm typecheck: passed.
- pnpm test: 125 passed, including a new check that the standalone start screen does not expose assessment creation before facility confirmation.
- pnpm build:all: passed. Existing large-bundle notices remain for Pricing and Lifecycle.
- pnpm test:browser: attempted; blocked before execution because Playwright chromium_headless_shell-1234 is absent. This script currently targets the website, not the standalone journey. No full automated browser pass is claimed.
- In-app browser at http://127.0.0.1:4196/: manual facility creation with required fields and confirmation, reopening registered facility, initial absence of assessments at the new site, unsaved draft blocking Change facility, save enabling Change facility, cancel retaining draft, switching to BHX4 and back showing separate saved libraries, and reopening saved assessment inputs all passed using synthetic records.
- Keyboard Enter activated facility confirmation. Requested viewport sizes 390x844 and 1440x1000 yielded measured CSS widths 354 and 1309 in this browser. Facility selection screenshots were inspected at both; narrow assessment review was inspected; document width matched viewport width with no horizontal overflow. No captured browser errors. This is bounded keyboard/responsive testing, not full accessibility acceptance.

## Remaining work

1. Cross-origin controlled Pricing issue exchange: other standalone apps use different storage. Do not direct users to the disabled website applications as a workaround. The current pricing panel's same-origin handover wording needs reconciliation with the standalone exchange implementation.
2. Review results from supported calculations, saved report snapshots and real PDF from the same versioned data (FERN-RPT-001–010). This increment does not implement reports or PDF.
3. Lifecycle structured evidence, multi-year option evaluation, supported recommendations and authorised decisions.
4. Other standalone apps still use the previous fixed demonstration shell. Extend facility selection only in a separately scoped increment.
5. Migrate the legacy integrated browser scenario to a standalone automated suite and supply its browser runtime. Full download, conflict, storage-failure and accessibility browser coverage remains outstanding; existing unit tests are not domain acceptance.

Amazon facility identity, integration, model/tier definitions, authoritative sources, shared storage and approval decisions remain unresolved. No Jira or white-paper work was performed. Temporary code backups and verification logs are under /tmp/fern-precontract-facility-change; the permanent record is this document.
