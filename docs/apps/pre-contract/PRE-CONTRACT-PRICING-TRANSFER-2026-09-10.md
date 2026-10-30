# Pricing issue transfer into Pre-Contract — 10 September 2026

## Implemented behavior

This increment continues the existing standalone Pre-Contract work. It implements the file-transfer portion of FERN-PRC-005, FERN-PCA-003 and FERN-PCA-006. It does not complete those wider requirements or confer domain acceptance.

Pricing now creates a fixed provisional issue and downloads a dedicated pricing issue file. A user can deliberately choose any locally issued version to download. The editable calculation-record download remains separate and is not accepted as an issued-version transfer.

Pre-Contract's Pricing evidence step previews the file's facility, issue ID, source revision, issue time, currency, price date, first-year period, source, scope, service level, tax basis and recalculated cost. All issued inputs and evidence are available for inspection. Preview and Cancel make no storage changes. Confirm import stores the issue; the user still chooses a Pricing version and saves the assessment explicitly. Received issues are also available to the existing alternative-pricing selector.

Imports preserve IDs and original source revisions, including a later revision received without its predecessors. They do not renumber local issues or overwrite source issues. Multiple source histories can have the same revision number, so the main selector includes IDs and no longer infers a universal newest version. Identical imports are idempotent, including JSON object-property reordering. A matching ID with different inputs, revision or timestamp is rejected. Unknown formats, wrong facilities, invalid inputs, invalid identity/date/revision and non-provisional issue status are rejected. Totals are calculated from inputs, not imported result fields. Currency conversion and existing comparison rules are unchanged.

## Use it

1. In Pricing, complete valid inputs for the required site. Under **Issue and transfer pricing**, select **Create pricing issue**. For an existing version, use **Load issued versions for download** and choose it explicitly.
2. Select **Download pricing issue**. Keep the issued JSON file; later edits to the Pricing draft do not change it.
3. In Pre-Contract, confirm the same facility, open an assessment and choose **3. Pricing evidence**. Select the downloaded **Pricing issue file**, check the preview, and select **Confirm pricing issue import**.
4. Choose it from **Pricing version** and **Save draft**. Importing another version leaves the selection unchanged. Alternatives can select received versions after **Load option pricing versions** and still require their own applicability review.

The Pricing standalone shell still has fixed BHX4 demonstration context. Pre-Contract can receive valid files for another selected site, but this increment does not add facility selection to the Pricing standalone shell. That remains a prerequisite for preparing other facilities entirely through its UI. No site code rewriting or automatic source mapping is introduced.

## Storage and source boundaries

- Transfer contract: FERN-pricing-issue-transfer-v1, containing one provisional issue and its input snapshot. Limit: 15 MB on export and file preview.
- Original locally issued history: fern.pricing.issues.v1.<encoded site>, unchanged sequential local revisions, maximum 200.
- Received history: fern.pricing.received-issues.v1.<encoded site>, up to 200 received issues per site. It is separate from locally issued history and has no renumbering.
- Shared pricing reads validate and combine both stores. Duplicate IDs with conflicting content fail closed. Storage failures preserve the current draft and report failure; no successful import is claimed. Local storage is not a transactional multi-user database or tamper-proof archive.
- Existing assessment and recipient selection keys are unchanged. No browser data was cleared or migrated. File contents do not verify an issuer's identity, authority or provenance. Inspect applicability and evidence; final approval remains unavailable.
- Import controls are exposed in Pre-Contract. Lifecycle can read the shared contract when present at its origin, but a dedicated Lifecycle file-import UI is not delivered here. The old facility-history count does not yet include the separate received-issue store.
- Shared standalone header wording now describes separate storage and supported file transfers; it no longer directs users to disabled portal applications. Main website source and disabled application previews remain unchanged. No Jira or white-paper work was performed.

## Verification evidence

- pnpm typecheck: passed.
- pnpm test: 131 passed. Six new transfer cases cover separate stores and source revision 4 without prior revisions, retained evidence and recalculated amounts, repeated/reordered imports, conflicting identity, independent source numbering, saved selection retention, wrong sites, invalid/oversized files, invalid approval claims, quota failures, corrupt history, limits, and downstream comparison gates.
- pnpm build:all: passed. Existing Pricing/Lifecycle large-bundle notices remain.
- pnpm test:browser: passed against a fresh unchanged website server at port 4193 using the installed Chromium path below. Website application previews remained disabled and basic mobile width passed.
- pnpm test:browser:pricing-transfer: passed with fresh browser storage at separate origins 4194 and 4196. The test creates real EUR 100 and EUR 80 pricing issues through UI, downloads and imports their files, checks preview/cancel/no automatic selection, repeated import, wrong-site and approval-status rejection, conflicting-ID rejection, option difference EUR -20 / -20%, saved selection recovery after reload, and a 390px mobile preview without horizontal overflow. It collects page errors and fails if any occur.
- In-app browser independently exercised real downloaded files between the two origins. Version 1 remained selected after importing version 2. Mobile preview at measured CSS width 354 was visually inspected, and Enter confirmed import. This is bounded visual/keyboard verification, not a complete accessibility audit or Amazon domain approval.

Machine-readable browser evidence is in test-results/website-review.json and test-results/pricing-transfer/verification.json. Generated screenshots are under test-results/pricing-transfer. These outputs are generated evidence, not operational data.

### Reproducing browser checks

Use the receiving team's approved Node.js 24.x and Playwright Chromium install. Do not assume a previous developer's local runtime paths exist.

Start fresh Vite servers for the website, Pricing and Pre-Contract. The transfer test defaults to ports 4194 and 4196; override FERN_PRICING_TEST_URL and FERN_PRECONTRACT_TEST_URL when required. The website test uses FERN_TEST_URL. Run pnpm test:browser and pnpm test:browser:pricing-transfer.

## Next work

Connect the supported calculations to the final review, then implement saved report snapshots and PDF output from the same versioned data (FERN-RPT-001–010). Extend Pricing facility selection to support preparation for non-demo sites. Add received issues to facility source-history summaries. Lifecycle evidence transfer, multi-year scenario comparison, authoritative model/tier definitions and authorised decisions remain separate open work. AMZ-PRC-12–18 remain open where applicable; successful transfer is not source, domain or procurement approval.
