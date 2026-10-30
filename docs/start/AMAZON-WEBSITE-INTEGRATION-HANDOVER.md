# Connecting the FERN website to Amazon services

8 September 2026 · Engineering handover requirements · No live connections verified

## What Amazon is receiving

FERN supplies the website interface, source code and requirements. Amazon's team connects it to approved internal services and confirms that the resulting experience works for its users. The current priority is the website; individual FM applications remain standalone and will be validated separately.

The required services are Quick Suite for AI-assisted discovery, a CMS for managed content and an LMS for learning management. The CMS and LMS products are not yet identified. Quick Suite is the stakeholder's specified platform; its internal environment, entitlement and configured model have not been verified.

## Services and responsibilities

| Service | What it provides | What FERN provides | Amazon confirmation needed |
| --- | --- | --- | --- |
| Quick Suite | Configured chat agent and authorised knowledge retrieval | Homepage discovery and Need a hand entry points to the same supported chat experience | Environment, region, agent ID and owner, supported embedding/query handoff, identity, knowledge scope, permitted actions and evaluation |
| CMS | Content editing, review, publication, versions and withdrawal | Website display and navigation for published content | Product, service owner, interfaces, publishing roles, approved content, source/contact metadata and refresh rules |
| LMS | Course catalogue, launch, enrolment, progress and completion records | Learn discovery and supported learner-facing integration | Product, learning owner, identity mapping, interfaces, enrolment rules, record access and retention |
| Identity | Authentication, session and access groups | Consistent signed-in experience | Approved sign-in, employees/contractors, role mappings, expiry/logout and service-specific permissions |
| Authoritative repositories | Original reference documents and their access rules | Source links and relevant metadata | System of record, document identifiers, versions, access and licensing |

These responsibilities may be fulfilled by several teams or by one shared platform. Named individuals and internal contact routes must be supplied by Amazon; no assignment is implied by this table.

## Information needed to start integration

For each service, provide a service owner and technical contact, an approved test environment, interface documentation, example non-sensitive records, access arrangements and error/availability behaviour. Provide secrets through Amazon's approved secret-management process, never in the source archive or teaser.

For Quick Suite, confirm whether a question typed into FERN can be passed into embedded chat through a supported interface. Public embedding capabilities do not establish permission to use them in the internal environment. Claude-based operation is stakeholder-supplied context; do not introduce a direct Anthropic API dependency or hard-code a model version.

For the CMS, agree which content is owned there and which records link to another repository. Identify who writes, reviews and publishes each content area. Changes to source permissions, publication status and withdrawal must reach both the website and search.

For the LMS, agree course identifiers, learner identifiers and which learning records FERN may display. Opening a course is not completion. The LMS remains authoritative for learning outcomes; unavailable records are not zero progress. Learning-record access must not automatically extend to the homepage AI.

## Suggested implementation sequence

1. Confirm service owners, test environments and identity/access contracts.
2. Connect the CMS and publish a small authorised content set with source/version metadata.
3. Connect Quick Suite to that content and verify permissions, citations and failure fallback.
4. Connect Learn to a small authorised LMS course set; verify launch, learner identity and progress.
5. Complete desktop/mobile, accessibility and integration acceptance using agreed test users.
6. Package the accepted source, PRD, configuration instructions and a clearly separate teaser.

Independent service teams can work in parallel once their contracts are agreed. This sequence is not a delivery-time commitment.

## Acceptance record

| Requirement | Evidence required | Current position |
| --- | --- | --- |
| SEARCH-01–09 | Natural-language retrieval, source citations, access isolation, unavailable states, supported chat handoff and no unintended actions | Keyword preview only; Quick Suite integration not implemented |
| CMS-01–09 / GOV-01–07 | Reviewed publication, revision history, authorised contact, withdrawal and search/access updates | Local website content only; CMS not connected |
| LMS-01–04 | Authorised catalogue and course launch, correct learner identity, authoritative progress/completion and failure handling | Introductory articles only; LMS not connected |
| WEB-SCOPE-01–05 | Website-only application previews, no demo facility selection, preserved standalone builds, coherent handover | Website boundary implemented; full browser acceptance and final repackaging outstanding |

Record the test environment, source versions, test identities/roles, actual result, defects and authorised reviewer. Amazon sets acceptance thresholds and synchronisation timing. Do not reuse the application unit-test count as proof of these integration requirements.

## Packaging boundary

The source folder should contain this document alongside the PRD and setup instructions. The full source includes the separate application projects. The teaser contains presentation only: no secrets, private learner records, operational records or live service connections.

The existing source ZIP and teaser are dated snapshots. Regenerate them after the website corrections and PRD review are complete. This document does not certify production readiness.


## Non-technical content administration — 15 September 2026

The approved CMS must let authorised administrative staff edit text, replace images, maintain links/contact information, preview, submit for review and publish within their permissions without code, Git or routine engineering support. Website PRD CMS-04–09 and NON-TECHNICAL-CONTENT-ADMINISTRATION.md define the required templates, draft recovery, source protection, permissions and usability acceptance. This is a required production capability; the current source/HTML preview does not implement the connected editor. Amazon must provide the chosen CMS, owners and access model. Include representative admin staff in acceptance and supply a short illustrated editor guide.
