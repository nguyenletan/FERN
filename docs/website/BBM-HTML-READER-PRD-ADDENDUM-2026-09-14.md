# BBM Standards HTML Reader — PRD Addendum

14 September 2026 | FERN Internal Portal | Implementation for review

## Purpose and user journey

Users can read the supplied Amazon Base Building Maintenance and Compliance Standards in the Reference Library without first downloading a PDF. They can search by title, object code or source wording, filter by document, choose a standard, read its complete page range and return to the results. The Risk & Compliance route continues to lead to the Reference Library.

A selected standard provides HTML text and tables, original PDF page numbers, source edition, original-PDF comparison, a download containing only its original pages, and a full-document download. Introductions have separate reading and download entries. Wide tables scroll on narrow screens. Search results load in groups of 20; this does not truncate the selected standard.

## Scope and source authority

- April 2024 Compliance: 91 indexed standards, 218 PDF pages, plus an introduction entry.
- March 2025 Maintenance: 103 indexed standards, 130 PDF pages, plus an introduction entry.
- All pages belong to exactly one entry, including continuation pages and change logs.
- These supplied editions are fixed source snapshots. The reader is not a live Amazon catalogue, a facility assessment or a statement of current statutory compliance.
- The standalone applications remain outside this website increment.

## Requirements and acceptance

| ID | Requirement | Verification |
|---|---|---|
| BBM-HTML-01 | Preserve source wording, blank cells, merged table relationships and illustrations; separate interface guidance from source text. | Extraction and table-grid checks; source-page inspection; Amazon specialist review before production. |
| BBM-HTML-02 | Include every page once within its source edition, with introduction and continuation pages retained. | Automated complete page-range coverage. |
| BBM-HTML-03 | Download selected original pages and the unchanged full source PDF. | Hash checks and pixel comparison of every selected PDF page against its source. |
| BBM-HTML-04 | Search both sources by title, code and wording; support document filtering, empty results and return to retained search. | Search unit tests; browser acceptance remains outstanding. |
| BBM-HTML-05 | Support keyboard navigation, visible focus, labelled inputs, screen-reader status messages and horizontal table scrolling on mobile. | Implemented markup/styles; desktop/mobile and assistive-technology acceptance remains outstanding. |
| BBM-HTML-06 | Identify edition and page references and preserve source contradictions rather than silently resolving them. | Manifest and fidelity notes. |
| BBM-HTML-07 | Keep the delivered reader usable offline with embedded assets and PDFs. | Single-file export check; actual browser download checks remain outstanding. |

## Content updates and Amazon ownership

Amazon must designate an authorised document owner or specialist for each edition and confirm the appropriate internal contact route. No owner, approval or contact has been inferred from prototype data. Historical contact details within original documents remain historical source wording.

For each replacement edition, the owner supplies the authoritative PDF, document identifier, version, effective date, approval status and applicability. Engineering then regenerates the HTML and downloads, compares added/changed/withdrawn standards and code mappings, runs coverage and source-fidelity checks, and submits the changed content for specialist review. Publication requires owner approval. Retain the previous edition and change record in the controlled repository; do not silently overwrite an edition.

The production Amazon CMS/document service should own the approved catalogue and enforce access rights. Serve PDFs and standard content on demand in production rather than embedding every document in the initial application bundle. The large self-contained HTML is for offline review and handover.

## Outstanding acceptance

Browser interaction and visual review are not claimed as passed. The existing browser security restriction remains in force; no alternate browser or localhost route was used to bypass it. Amazon source-owner verification, current edition/applicability confirmation and production identity/document-service integration remain separate acceptance steps.
