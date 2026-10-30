# Amazon APM asset coverage and intake requirements

Product-owner clarification, 6 September 2026. This is the current coverage and integration direction for Lifecycle & Asset Analysis. API availability and exact asset coverage are not yet confirmed by Amazon.

## Coverage model

NRM3 is the classification and cost-planning reference. Its complete hierarchy is not the expected inventory of any building and is not a mandatory checklist for Amazon's asset register. FERN must not require a source to populate all 2,633 reference entries or infer completeness from that count.

Amazon APM (Asset Performance Management) is identified by the product owner as the relevant CAFM/CMMS source. Expected coverage may include building fire and life safety systems, HVAC and other critical plant, with lighting/electrical assets depending on building type. These are anticipated categories, not a confirmed list, field schema or guarantee of coverage. Confirm the exact APM inventory and source remit with Amazon.

Maintain three distinct concepts:

1. The versioned NRM3 reference catalog defines possible classifications.
2. The source inventory contains the actual records received from a particular source for a building, with extraction time and source remit.
3. The assessment scope selects the records, systems and cost categories required for the decision. Its completeness is evaluated against the agreed decision scope, not the entire NRM3 catalog.

One classification can describe many physical assets. Asset instances require stable source/system/site IDs. An NRM3 code is not a unique physical asset identifier.

## Required coverage states

| State | Meaning |
|---|---|
| Present in source | A source supplies an asset record; its individual fields may still be incomplete or unverified |
| Expected but not supplied | An asset/system is expected within the agreed scope, but evidence has not been supplied |
| Outside source remit | A category is not maintained by this source; another source may be needed |
| Applicability unknown | No evidence yet establishes whether the category applies to the building |
| Confirmed not applicable | An authorised, evidenced determination excludes the category from the building |
| Excluded from assessment | An explicit scope decision excludes the item from this assessment, without claiming it does not exist |

An empty APM response, missing file row or absent class must never automatically become zero quantity/cost, confirmed absence, or not applicable. Sources such as surveys, building documents and other authorised registers may supplement APM with their own provenance.

## Calculation and reporting acceptance

- A limited HVAC or life-safety assessment can be calculated when its agreed included inputs are sufficient, even if other NRM3 classes are absent from the source.
- Missing material inputs within the requested scope block the affected result; unrelated reference classes do not block it.
- Present cost results as totals for the included assessment scope. Do not call them a complete building lifecycle cost unless a building-wide scope and coverage review support that conclusion.
- Record source remit, building type, included/excluded systems, unresolved coverage, extraction date and reconciliation state with reports.
- Do not calculate a completeness percentage using the number of populated NRM3 catalog entries as the denominator. Use an agreed expected inventory/scope only when one exists.
- Partial API pages, failed downloads, stale extracts and permission restrictions must remain distinguishable from a complete successful source response.

## Parallel intake routes

All routes must remain supported in the product design; API development does not replace file input.

| Route | Required behaviour | Current implementation |
|---|---|---|
| Excel .xlsx/.xlsm | Preview source layout, map records, preserve evidence and reconcile existing records without executing macros | Supplied DSA2/template layouts implemented locally |
| CSV | Versioned field mapping; quoting/encoding/delimiter handling; stable IDs, units and row-level validation | Required; not yet implemented |
| JSON asset-data payload | Versioned import schema and source context; validate like other source records | Required; current JSON control restores FERN backups only, not arbitrary APM payloads |
| Manual entry/correction | Add assets, supply unavailable fields and explain provenance; preserve source assertions alongside corrections | Local editing implemented; full multi-user audit/version workflow outstanding |
| Authorised APM API | Read source data through a backend adapter, with site permissions, pagination, freshness and reconciliation | Discovery required; no endpoint, access or connector is established |

## APM discovery with Amazon

Obtain the following from the APM system owner and integration team before implementation:

- Actual platform/vendor/version, owning team and approved integration route (API, middleware, governed export or another approved interface).
- Available API specification or export schemas and the actual asset categories/levels included for each building type.
- Stable site and asset identifiers, parent/system relationships, status/retirement semantics, class labels and units.
- Availability and ownership of location, condition, criticality, installation dates, maintenance tasks/history, lifecycle evidence and costs. Do not assume every field exists in APM.
- Authentication, authorised read scopes, network access, permitted retention and approved non-production test access.
- Pagination, rate/volume limits, change tracking, timestamps, deletions, retries and scheduled refresh capabilities.
- Rules for reconciling APM records with files/manual corrections, resolving conflicting values and retaining traceability.

Initial proposed connection is read-only ingestion. Write-back, source-record modification and operational work-order actions are separate future scope; no endpoints or credentials are invented here. The browser must not hold APM service credentials.

## Engineering acceptance cases

1. Import a partial fire/HVAC register without creating placeholder assets for every other NRM3 class.
2. Calculate an agreed scoped estimate without missing unrelated classes blocking it.
3. Show unresolved material coverage and missing fields without treating them as absence or zero.
4. Import the same asset by file and API and reconcile using stable source/site IDs without duplication or silent overwrite.
5. Distinguish an incomplete API fetch from a successful empty response and retain the last known source snapshot appropriately.
6. Preserve manual corrections with their provenance when a later API/file refresh arrives.
7. Retain Excel, CSV and JSON data-input routes after API integration is available.
