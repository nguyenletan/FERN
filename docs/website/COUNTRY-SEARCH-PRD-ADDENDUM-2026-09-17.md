# Reference Library: country discovery

Status: implemented in the local demonstration; production integration and current source approval remain separate. This supplements the platform PRD's Reference Library requirements.

## LIB-COUNTRY-01 — Choose a country

The Reference Library offers All countries and each recognised country in the supplied source: Czech Republic (CZ), Germany (DE), Spain (ES), France (FR), Italy (IT), Poland (PL), Republic of Ireland (ROI), Slovakia (SK), United Kingdom (UK). Display the full name, original designation and a decorative flag. Selection combines with equipment/topic/object-code search and the Compliance / Preventive Maintenance collection. Default to All countries. Preserve the selection in the page URL and when opening a standard, following a related standard, returning to results or reloading.

## LIB-COUNTRY-02 — Explain inclusion

Use the source Region fields, never an inferred jurisdiction from a document title. Include standards with selected-country rows or shared All rows. A checked-by-default option includes standards with no recognised country information; users can switch it off. Label results as country-specific, shared or country not specified. In browsing, place selected-country results before shared and unspecified entries. Keyword search retains exact-code and title ranking, and must not match text found only in a recognised other-country task or regional row. Keep common scope and notes searchable. Counts and recovery controls reflect every active filter.

This is a discovery aid, not a finding that a document is applicable, current or sufficient to establish compliance. Unknown location must never be presented as country-approved. The supplied dataset contains many location-unspecified maintenance standards; retaining these by default prevents silent loss of potentially relevant material.

## LIB-COUNTRY-03 — Read regional content

In the task reading view, show the chosen country's rows, shared All rows and rows without a recognised country. State how many other-country rows are hidden and provide a clearly labelled Show all countries control. Keep source-page links, original tables, document editions, complete PDF downloads, conditions and source wording intact. Never overwrite authoritative source documents to implement filtering.

## Production content administration

Provide a controlled country taxonomy with full name, source designation, flag mapping, aliases, and explicit shared / unspecified states. Authorised content editors can assign geography to local guidance and future standards through the proposed CMS workflow. Controlled standards need source traceability and review before geography changes are published. Do not treat this demo's fixed mapping as an already implemented production CMS, location service or legal applicability engine. Adding a new jurisdiction requires approved content and taxonomy metadata; no automatic national compliance rules are inferred.

## Acceptance evidence

- `tests/country-search.test.mjs`: synthetic mixed-country source cells, shared and unknown treatment, no source mutation, country-aware keyword matching, URL persistence, and supplied PAT data.
- `verification/check-country-search.mjs` in the handover package: country and collection controls, result counts, local task/condition rows, show-all toggle, return/reload, and desktop/mobile layout.
- Existing unit, type, build and navigation checks remain required.
