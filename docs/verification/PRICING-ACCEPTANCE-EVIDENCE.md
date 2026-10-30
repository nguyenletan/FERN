# Pricing and downstream acceptance evidence

## Economic sensitivity — 6 September 2026

Users can add up to 30 named economic sensitivity cases, each with explicit inflation, nominal discount rate and rationale/source. Cases retain baseline currency, location, timing and cost scope. They do not modify baseline economic inputs. The asset view permits editing; the combined view evaluates the same cases against the reviewed combined schedule.

Each valid case shows undiscounted cost, net present cost, absolute and percentage difference from baseline NPC, and five horizon results where covered. Zero baseline NPC has no percentage. Missing baseline or case inputs withhold that comparison without blocking valid base calculations. Cases are scenarios, not forecasts, probabilities, recommendations or approved country rates.

Project save/restore and JSON calculation records preserve cases. Each case can export a CSV with its assumptions, baseline rates/evidence, case identity and (for combined scope) pricing reference and overlap evidence. Adding/changing cases changes the project snapshot and therefore requires fresh combined review under the existing binding rule. AMZ-PRC-16/18 remain open for domain and economic-method approval.

Verification: 87 automated tests, typecheck and build pass. Browser synthetic case: baseline NPC EUR 400; alternative 10% inflation / 0% discount yields NPC EUR 537.02, delta EUR 137.02 (34.26%). Tests cover no baseline mutation, invalid inputs, zero denominator, unavailable horizons, CSV provenance and backup validation. The standalone Playwright executable remains absent, so complete browser/download automation is not reported as passed.


## Economic CSV reports — 6 September 2026

Asset and combined economic panels now export dedicated cash-flow CSV reports. Reports include site, scope, currency, price base date, analysis length, location, inflation, nominal discount rate, timing convention, source evidence, method, limitations and provisional status. Combined reports additionally identify the pricing issue/revision, overlap treatment and evidence. Annual base-price/nominal/present costs and the five horizon totals are exported without display rounding; uncovered horizons are explicitly unavailable. Existing base-price CSVs remain separate.

Economic results are recalculated from inputs at export; invalid calculations and missing report identity block the report. CSV fields preserve quoted/multiline evidence and protect formula-like user text. This does not approve source inputs or create a production audit record. Amazon AMZ-PRC-16/18 remain open.

Verification: 82 automated tests, typecheck and build pass. Export tests check annual/horizon reconciliation, currency, source-version traceability, unavailable horizons, malformed inputs and CSV quoting. The standalone browser suite still cannot launch because its executable is absent. The new browser download action and downloaded-file validation remain unverified here; executable regression assertions are supplied for the engineering environment.


6 September 2026. Synthetic technical acceptance cases; no Amazon domain approval implied.

## Executed checks

| Case | Inputs / expected result | Evidence and status |
|---|---|---|
| EUR pricing | Ten assets, four events/year, 30 minutes at 40/hour plus 2 materials/event: 880/year, 4,400/five years | In-app browser PASS; issued fixed version 4 in isolated localhost storage |
| Asset calculation | Two assets; maintenance 2 × 10 × 2 = 40/year; renewal 2 × 100 = 200 in 2030; 2026–2030 total 400 | In-app browser PASS |
| Additional scope | Pricing 4,400 + maintenance 200 + renewal 200 = EUR 4,800 | In-app browser PASS |
| Full maintenance replacement | Pricing 4,400 + renewal 200 = EUR 4,600; asset maintenance excluded, input records retained | In-app browser PASS |
| Mismatched currencies | EUR pricing with USD asset assessment | In-app browser PASS: combined result withheld with mismatch reason |
| Persistence | Save Euro asset project, reload, reselect/reload retained pricing reference, review scope again | In-app browser PASS: EUR 400 asset total and EUR 4,800 combined total |
| Pre-contract | EUR 968 comparable cost versus EUR 880 baseline | In-app browser PASS: difference 88, 10% |
| Currency labels | Asset rate, task rate and elemental headings must not force pounds | Corrected remaining pound labels; asset rate label verified in browser; typecheck/build PASS |
| Automated tests | Existing calculation, scope, currency, import and issue tests | 68 tests PASS; typecheck PASS; production build PASS |

Test data uses the separate localhost origin. User assessment data at 127.0.0.1 was not changed. Expected values were calculated independently from the simple inputs above. Synthetic cases do not validate real facility quantities, rates, maintenance strategy or statutory obligations.

## Remaining technical verification

The standalone Playwright suite was invoked but could not start because the browser executable is absent. Its regression flow now includes EUR pricing, positive combined Lifecycle results, replacement, mismatched currency, and download-content assertions. These automated browser/download assertions are **not** reported as passed. Download file contents, pricing-record file re-import, comprehensive responsive/accessibility checks, and production identity/shared-storage/approval paths remain to be verified in the engineering environment. In-app interaction checks do not replace the full browser suite.

## Amazon acceptance still required

AMZ-PRC-01–10 retain workbook/business-rule decisions. AMZ-PRC-11 covers authoritative and licensed comparison sources; AMZ-PRC-12 covers mappings and overlap; AMZ-PRC-13–15/17 cover production services and operating specifications; AMZ-PRC-16 covers independent Engineering/Finance domain acceptance. Provide approved populated reference cases, expected outputs, named validators and signed outcomes. See [Amazon register](../amazon/AMAZON-PRICING-DECISIONS.md).

The application remains provisional. Shared Amazon services, formal approval and the full economic lifecycle model are not completed by these checks.

## Recovery increment

73 tests now pass. In-app browser save and restore after reopening retained the synthetic EUR 4,800 combined total. Changing the horizon then restoring retained evidence but required a new review. Production shared-storage and formal approval remain unverified.

## Economic calculation checks

78 automated tests pass. Browser synthetic asset case: zero inflation/discount retains EUR 400 total; 10% inflation and 10% nominal discount produces EUR 537.02 undiscounted and EUR 363.64 net present cost. These are test rates, not recommendations. Amazon economic convention/rate approval is tracked as AMZ-PRC-18.


## Monorepo separation — 7 September 2026

Typecheck, 89 automated tests and all five independent application builds plus the original root portal build pass. New tests cover application import boundaries and separate entries. In-app browser smoke checks cover portal Pricing navigation and separate application sign-in/rendering. This is not a repeat of the full data-entry/download acceptance journey. The full Playwright suite was attempted and blocked before execution by macOS Chromium process-launch permission denial. See TECHNICAL-VERIFICATION.json for current evidence. No domain approval is asserted.
