# Compliance Library: Search and Source Access

14 September 2026 · Local website implementation

## User Journey

Open Reference Library. The first section is Find a Compliance Standard. Search a topic or APM object code, expand a matching title, and choose Open standard at page… or Download source PDF. Risk & Compliance includes a Find a Compliance Standard button that opens Reference Library through the existing resource navigation.

The supplied April 2024 Base Building Compliance Standards contains 91 indexed task headers across PDF pages 3–218. Results identify title, source code, edition and full page span, including continuation pages. Blank search shows all entries; matching is case-insensitive and requires each query word to appear in the title or code. It is title/code search, not full-text or AI search.

The index is a navigation aid. Detailed scope, activities, qualifications, records and regional conditions remain in the source PDF. No facility compliance result, current contact or current legal validation is inferred. There is no live Amazon catalogue connection, automatic source refresh or new access-control service.

## Source Packaging

(Superseded 30 October 2026: the site build serves PDFs from `bbm/`; only the standalone HTML embeds them. See the BBM HTML reader addendum.) The original supplied PDF is bundled in the portal and embedded in the standalone HTML. The byte-level source hash is tested against the reviewed original. Browsers create a local Blob URL to open/download it; URLs are revoked when the library unmounts. Source files are not uploaded to an external service by this feature.

The full HTML now includes the internal Amazon source document and should be included only in the authorised internal review/handover distribution. A public or externally shared teaser should be generated without the embedded standard. This increment does not modify existing earlier teaser exports.

In production, Amazon should replace this static source asset with its approved repository connection and enforce source access permissions, publication status and supersession. Existing BBM source-status, code and terminology decisions remain recorded in AMAZON-DECISIONS.md in the BBM review package. The printed draft wording in the source PDF has not been edited.

## PRD Traceability

- LIB-01: local title/object-code search delivered for this edition only; unified connected catalogue remains outstanding.
- LIB-02–04: edition and source page references displayed; live publication/supersession metadata remains outstanding.
- LIB-05–06: original source preserved and distinguished from FERN explanations; production authentication/authorisation is not delivered by the local prototype.
- EVD-01–02: each result opens the relevant PDF page, with the full document retained.
- WEB-05: Risk & Compliance provides the source-discovery entry point.

This document supplements v1.2 and the earlier BBM content addendum; the consolidated PRD HTML/PDF has not been rebuilt.

## Verification

Typecheck, all 134 tests and builds for all applications passed. Tests cover word/case/code matching, empty and no-result search, unique identifiers, consecutive page spans and the bundled source hash. The full HTML was rebuilt with embedded assets and no external script or stylesheet dependencies.

Browser testing was not performed because the previously recorded browser security restriction remains. The following acceptance checks must be run in an approved desktop and mobile browser before reporting end-to-end acceptance:

1. From Risk & Compliance choose Find a Compliance Standard; Reference Library becomes visible.
2. Search fire doors, emergency lighting and Legionella; verify corresponding titles and source pages 69, 15 and 185.
3. Expand a result using the keyboard; focus remains visible. Open its PDF and verify the viewer reaches the stated page. If the viewer ignores page fragments, the interface provides the page number explicitly.
4. Download the source PDF; confirm it has 218 pages and matches the original hash.
5. Clear search and verify all 91 entries return; use an unknown query and verify no-result wording does not imply no obligation.
6. At a narrow mobile viewport, verify search controls and source links wrap without horizontal overflow.
7. Leave and reopen the library; PDF links should be freshly prepared and work.

No application calculations or facility records were changed.
