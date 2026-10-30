# Source register and migration record

## Amazon pricing review — 6 September 2026

The supplied BBM Pricing Template was inspected read-only across all nine sheets. Source SHA-256: `438ae6467a5414b125aa184beb84b3b036f0f3ff97edca21c4dfc2086e463ea4`. The original was unchanged. Formula inventory and synthetic evidence are in the separate Amazon review pack. Findings require Amazon decisions; neither workbook content nor this review is approval.

See [Amazon specification and approval register](AMAZON-PRICING-DECISIONS.md) for evidence requests, proposed owner roles and interim treatment. All items remain open until explicitly resolved.

6 September 2026 · No source approval inferred

| Source | Use in this pack | Authority/status |
|---|---|---|
| User request to split FERN code for engineering/GitHub and develop a PRD | Task scope | Direct user instruction |
| User clarification: every FERN application must be fully functional and usable | Product acceptance condition | Direct user instruction; not a claim that this baseline meets it |
| DesignFERNHomepageLayout-main.zip | Implementation snapshot | Supplied source; domain approval unverified |
| Review FERN Homepage Design | Context for previously reported launch defects | Prior discussion, checked against supplied code; not independent approval of business rules |
| Clarify FERN PRD Scope | Whole-platform production intent, source hierarchy proposal, open technical constraints | Prior discussion; full earlier draft pack not available for reconciliation |
| ZIP src/imports/pasted_text/*.md | Inventory of historical design prompts | Reference material only; not executed as new instructions or treated as approved methods |
| ZIP AGENTS.md / .figma tooling | Identifies original Figma environment | Development guidance evaluated against the actual local environment; no running-server assumption adopted |
| Programme Hub and P0–P5 source documents | Required future reconciliation | Full authoritative baselines not provided/verified in this task |

## Snapshot identity

- ZIP SHA-256: `e3bd2584254189ca7be788ca0d5d00342e05ce64457c2b9f9e1992f802ef82a3`
- Original App.tsx SHA-256: `d3cf4b576c4975eb51f28c9d2b5faca0116477627868a16dd3bf37223d263cb9`
- Original App.tsx: 8732 lines, 678,242 bytes.
- ZIP comment (source export metadata, not independently verified): `1616c126824892eeae3ba6ae9c6d57868a5fe9db`

## Migration accounting

The original archive is untouched. Working extraction remains separate from the deliverable. All original top-level declarations were mapped into modules, the four workflow pages were divided into 46 named sections, and the dashboard/navigation/sign-in were separated. Original image bytes used by the running application are retained under src/assets.

Copied into the independent project: React source, global CSS, entrypoint, TypeScript configuration, locked application dependencies and the two imported images. Standard local Vite configuration and HTML metadata replace Figma-only deployment/preview tooling. Original prompts, unused screenshots and Figma metadata remain in the source ZIP rather than the application runtime. No source records, evidence or business results were created.

The initial formatter supplied by the export (oxfmt 0.2.0) removed separators from some inline TypeScript types. Those separators were restored, oxfmt was upgraded to 0.66.0, and the source was rechecked. Playwright 1.62.1 was added for the supplied browser suite. Application framework versions remain from the supplied lockfile.

The HTML equivalence check compares the refactor with a temporary baseline containing only the two report-state fixes and the explicit launch section reorder. It does not compare business functionality or certify pixel-perfect rendering. See VALIDATION.md.

## Original declarations to destination

| Original declaration | Destination under src/ |
|---|---|
| DEMO_EMAIL | features/auth/demoCredentials.ts |
| DEMO_PASSWORD | features/auth/demoCredentials.ts |
| App | features/auth/DemoSignIn.tsx (mounted by App.tsx) |
| Chevron | components/ui/Chevron.tsx |
| InfoIcon | components/ui/InfoIcon.tsx |
| classificationHelp | domain/evidence.ts |
| classificationStyle | domain/evidence.ts |
| confidenceColor | domain/evidence.ts |
| DATA_STATUS_CONFIG | domain/dataStatus.ts |
| DataStatus | domain/dataStatus.ts |
| SOURCE_STATUS_CONFIG | domain/dataStatus.ts |
| SourceStatus | domain/dataStatus.ts |
| DataStatusBadge | components/data/DataStatusBadge.tsx |
| DataSourceBadge | components/data/DataSourceBadge.tsx |
| DataCompletenessWidget | components/data/DataCompletenessWidget.tsx |
| SUGGESTED_QUESTIONS | features/ask-fern/demoResponses.ts |
| PROTOTYPE_QUERY | features/ask-fern/demoResponses.ts |
| InvestigationStep | features/ask-fern/types.ts |
| AskFernResponse | features/ask-fern/types.ts |
| buildResponse | features/ask-fern/demoResponses.ts |
| PROTOTYPE_SITES | features/context/prototypeSites.ts |
| SiteConfig | features/context/prototypeSites.ts |
| AskFern | features/ask-fern/AskFern.tsx |
| AppCardField | features/dashboard/FernAppCard.tsx |
| FernAppCardProps | features/dashboard/FernAppCard.tsx |
| FernAppCard | features/dashboard/FernAppCard.tsx |
| FernPage | components/layout/UnimplementedPage.tsx |
| LIFECYCLE_DATA_CATEGORIES | features/lifecycle/configuration.tsx |
| LifecycleAssetAnalysisPageProps | features/lifecycle/types.ts |
| LifecycleAssetAnalysisPage | features/lifecycle/LifecycleAssetAnalysisPage.tsx |
| DATA_CATEGORIES | features/pre-contract/configuration.tsx |
| FMPreContractAssessmentPageProps | features/pre-contract/types.ts |
| FMPreContractAssessmentPage | features/pre-contract/FMPreContractAssessmentPage.tsx |
| PricingTemplateGeneratorPageProps | features/pricing/types.ts |
| PricingTemplateGeneratorPage | features/pricing/PricingTemplateGeneratorPage.tsx |
| IFMLaunchTrackerPageProps | features/launch-tracker/types.ts |
| IFMLaunchTrackerPage | features/launch-tracker/IFMLaunchTrackerPage.tsx |
| GapPattern | components/data/GapPattern.tsx |
| ConflictPattern | components/data/ConflictPattern.tsx |
| FernHomepage | app/FernWorkspace.tsx |
| WFState | features/lifecycle/configuration.tsx |
| wfStages | features/lifecycle/configuration.tsx |
| wfColor | features/lifecycle/configuration.tsx |
| wfBg | features/lifecycle/configuration.tsx |
| wfBorder | features/lifecycle/configuration.tsx |
| PRICING_WORKFLOW | features/pricing/configuration.tsx |
| PRICING_DATA_CATEGORIES | features/pricing/configuration.tsx |
| statusBadge | features/launch-tracker/configuration.tsx |
| fieldRow | features/launch-tracker/configuration.tsx |
| gateCondition | features/launch-tracker/configuration.tsx |
| futureField | features/launch-tracker/configuration.tsx |
| WorkflowState | features/pre-contract/configuration.tsx |
| workflowStages | features/pre-contract/configuration.tsx |
| stageColor | features/pre-contract/configuration.tsx |
| stageBg | features/pre-contract/configuration.tsx |
| stageBorder | features/pre-contract/configuration.tsx |
| LifecycleContextSection | features/lifecycle/sections/LifecycleContextSection.tsx |
| LifecycleDataPreparationSection | features/lifecycle/sections/LifecycleDataPreparationSection.tsx |
| LifecycleConfigurationSection | features/lifecycle/sections/LifecycleConfigurationSection.tsx |
| LifecycleEventsSection | features/lifecycle/sections/LifecycleEventsSection.tsx |
| LifecycleCalculationsSection | features/lifecycle/sections/LifecycleCalculationsSection.tsx |
| LifecycleSensitivitySection | features/lifecycle/sections/LifecycleSensitivitySection.tsx |
| LifecycleScenariosSection | features/lifecycle/sections/LifecycleScenariosSection.tsx |
| LifecycleComparisonSection | features/lifecycle/sections/LifecycleComparisonSection.tsx |
| LifecycleDecisionSection | features/lifecycle/sections/LifecycleDecisionSection.tsx |
| LifecycleReportSection | features/lifecycle/sections/LifecycleReportSection.tsx |
| LifecycleHandoverSection | features/lifecycle/sections/LifecycleHandoverSection.tsx |
| PricingContextSection | features/pricing/sections/PricingContextSection.tsx |
| PricingInputsSection | features/pricing/sections/PricingInputsSection.tsx |
| PricingWorkbookSection | features/pricing/sections/PricingWorkbookSection.tsx |
| PricingMappingSection | features/pricing/sections/PricingMappingSection.tsx |
| PricingMappingAcceptanceSection | features/pricing/sections/PricingMappingAcceptanceSection.tsx |
| PricingMethodValidationSection | features/pricing/sections/PricingMethodValidationSection.tsx |
| PricingFormulaVerificationSection | features/pricing/sections/PricingFormulaVerificationSection.tsx |
| PricingCalculationOutputSection | features/pricing/sections/PricingCalculationOutputSection.tsx |
| PricingReviewSection | features/pricing/sections/PricingReviewSection.tsx |
| PricingReportSection | features/pricing/sections/PricingReportSection.tsx |
| PricingHandoverSection | features/pricing/sections/PricingHandoverSection.tsx |
| LaunchContextSection | features/launch-tracker/sections/LaunchContextSection.tsx |
| LaunchSourceIntakeSection | features/launch-tracker/sections/LaunchSourceIntakeSection.tsx |
| LaunchRequirementExtractionSection | features/launch-tracker/sections/LaunchRequirementExtractionSection.tsx |
| LaunchConfigurationSection | features/launch-tracker/sections/LaunchConfigurationSection.tsx |
| LaunchResponsibilitiesSection | features/launch-tracker/sections/LaunchResponsibilitiesSection.tsx |
| LaunchExecutionSection | features/launch-tracker/sections/LaunchExecutionSection.tsx |
| LaunchExecutionAssuranceSection | features/launch-tracker/sections/LaunchExecutionAssuranceSection.tsx |
| LaunchAssuranceSection | features/launch-tracker/sections/LaunchAssuranceSection.tsx |
| LaunchTraceabilitySection | features/launch-tracker/sections/LaunchTraceabilitySection.tsx |
| LaunchDefinitionSection | features/launch-tracker/sections/LaunchDefinitionSection.tsx |
| LaunchReadinessSection | features/launch-tracker/sections/LaunchReadinessSection.tsx |
| LaunchAssessmentSection | features/launch-tracker/sections/LaunchAssessmentSection.tsx |
| LaunchHumanReviewSection | features/launch-tracker/sections/LaunchHumanReviewSection.tsx |
| LaunchDecisionSection | features/launch-tracker/sections/LaunchDecisionSection.tsx |
| LaunchReportSection | features/launch-tracker/sections/LaunchReportSection.tsx |
| PreContractContextSection | features/pre-contract/sections/PreContractContextSection.tsx |
| PreContractDataPreparationSection | features/pre-contract/sections/PreContractDataPreparationSection.tsx |
| PreContractBaselineSection | features/pre-contract/sections/PreContractBaselineSection.tsx |
| PreContractScenariosSection | features/pre-contract/sections/PreContractScenariosSection.tsx |
| PreContractImpactsSection | features/pre-contract/sections/PreContractImpactsSection.tsx |
| PreContractReadinessSection | features/pre-contract/sections/PreContractReadinessSection.tsx |
| PreContractRecommendationSection | features/pre-contract/sections/PreContractRecommendationSection.tsx |
| PreContractReportSection | features/pre-contract/sections/PreContractReportSection.tsx |
| PreContractDecisionSection | features/pre-contract/sections/PreContractDecisionSection.tsx |

DashboardPage, navigation and dashboard configuration were further separated from FernWorkspace after the initial mapping.

## Workflow section boundaries

| Feature | Component | First source section |
|---|---|---|
| features/lifecycle | LifecycleContextSection | Application header |
| features/lifecycle | LifecycleDataPreparationSection | FERN Data Preparation |
| features/lifecycle | LifecycleConfigurationSection | Lifecycle Analysis Configuration |
| features/lifecycle | LifecycleEventsSection | Renewal Event Register |
| features/lifecycle | LifecycleCalculationsSection | Calculation Method Control |
| features/lifecycle | LifecycleSensitivitySection | Sensitivity Analysis |
| features/lifecycle | LifecycleScenariosSection | Baseline Lifecycle Position |
| features/lifecycle | LifecycleComparisonSection | Lifecycle Scenario Comparison |
| features/lifecycle | LifecycleDecisionSection | Lifecycle Recommendation Readiness |
| features/lifecycle | LifecycleReportSection | Lifecycle Assessment Report |
| features/lifecycle | LifecycleHandoverSection | Link to FM Pre-Contract Assessment |
| features/pricing | PricingContextSection | Header |
| features/pricing | PricingInputsSection | Site Classification |
| features/pricing | PricingWorkbookSection | Cost Summary |
| features/pricing | PricingMappingSection | Pricing Data Validation |
| features/pricing | PricingMappingAcceptanceSection | Pricing Mapping Test & Acceptance |
| features/pricing | PricingMethodValidationSection | Pricing Calculation Method Validation |
| features/pricing | PricingFormulaVerificationSection | Pricing Formula Implementation & Verification |
| features/pricing | PricingCalculationOutputSection | Controlled Pricing Calculation & Output |
| features/pricing | PricingReviewSection | Pricing Output Review Readiness |
| features/pricing | PricingReportSection | Pricing Assessment Report |
| features/pricing | PricingHandoverSection | Pricing Assessment Handover |
| features/launch-tracker | LaunchContextSection | Header |
| features/launch-tracker | LaunchSourceIntakeSection | Source Intake Control |
| features/launch-tracker | LaunchRequirementExtractionSection | Launch Requirement Extraction Readiness |
| features/launch-tracker | LaunchConfigurationSection | Launch Tracking Configuration Readiness |
| features/launch-tracker | LaunchResponsibilitiesSection | Launch Responsibility Configuration |
| features/launch-tracker | LaunchExecutionSection | Tracking Record Activation Readiness |
| features/launch-tracker | LaunchExecutionAssuranceSection | Launch Dependency Impact |
| features/launch-tracker | LaunchAssuranceSection | Launch Assurance Review Readiness |
| features/launch-tracker | LaunchTraceabilitySection | Requirement-to-Tracking Traceability |
| features/launch-tracker | LaunchDefinitionSection | Source Information Required |
| features/launch-tracker | LaunchReadinessSection | Evidence & Traceability |
| features/launch-tracker | LaunchAssessmentSection | Launch Readiness Assessment |
| features/launch-tracker | LaunchHumanReviewSection | Launch Human Review |
| features/launch-tracker | LaunchDecisionSection | Launch Decision Record |
| features/launch-tracker | LaunchReportSection | Launch Assurance Report |
| features/pre-contract | PreContractContextSection | Application header |
| features/pre-contract | PreContractDataPreparationSection | FERN Data Preparation |
| features/pre-contract | PreContractBaselineSection | CURRENT FM SERVICE BASELINE |
| features/pre-contract | PreContractScenariosSection | DELIVERY SCENARIO ASSESSMENT |
| features/pre-contract | PreContractImpactsSection | COST & COMMERCIAL COMPARISON |
| features/pre-contract | PreContractReadinessSection | ANALYSIS BLOCKED |
| features/pre-contract | PreContractRecommendationSection | FERN RECOMMENDATION |
| features/pre-contract | PreContractReportSection | ASSESSMENT REPORT |
| features/pre-contract | PreContractDecisionSection | HUMAN REVIEW |

## NRM3 source addition — 6 September 2026

The user selected NRM3 for Lifecycle Assessment. The supplied full NRM3 PDF and DSA2 workbook were inspected as methodological and project reference sources. Detailed references, distinctions and findings are in [NRM3-LIFECYCLE-METHODOLOGY.md](../apps/lifecycle/NRM3-LIFECYCLE-METHODOLOGY.md). Original files remain unchanged and are not embedded in the engineering ZIP.

- NRM 3 Introduction.pdf: SHA-256 `f4eb254ad950eb54e5f97ae217eafd5fa19cc717f5f6dd4360ee27953c14675c`
- NRM3_Asset_Register_DSA2_Main_FC_v1.1.xlsx: SHA-256 `cf1b1b527a83e90409358e5c7ac87ce11f89ac5f3e92033dbcd4e4f3aa5d3779`

## Additional NRM3 source review

DSA2 is real Amazon building data, confirmed by the product owner. Read-only workbook/formula inspection and static VBA extraction completed; macros were not executed. See NRM3-TEMPLATE-REVIEW.md. Original files remain unchanged.

- Copy of NRM3_Asset_Register_BLANK_Template_Macro_enabled1.xlsm: SHA-256 `59db945d16aff5dddc48c33e116396e90f676e1aef172f8c1a5fbba6d47175bd`
- nrm_3_logic_and_levels_table.xlsx: SHA-256 `e77c8d378f513ccf76fe62a7e66470b5286bfd4f79649345b39858e0a4c7e116`
- nrm_3_appendices_e_and_f.xls: SHA-256 `69a83812ba62fd5459cb9e2f75b7d602641a702bd0703b8f4d0a1da9499bf5d9`

## BBM source review — 6 September 2026

Supplied references were reviewed as evidence, not executable instructions or proof of approval. See [capability review](../apps/lifecycle/LIFECYCLE-CAPABILITY-AND-DECISIONS.md) for findings, locators and limitations. Source originals and extracted raw content are excluded from the engineering pack.

| Supplied file | SHA-256 |
|---|---|
| BBM Pricing Template_(Example).xlsx | `438ae6467a5414b125aa184beb84b3b036f0f3ff97edca21c4dfc2086e463ea4` |
| BBM tasks quality assurance + APM mobile enhance (V5 August 2025).pptx | `598d62d02f08402a0a98205cfacc4d1624e660e4aea77e9998bd319b3069a724` |
| BBM_Scope_AMZL_V1.6.docx | `cecde076cfb0720b287253460bd94e1f4d63f64f67be7aadfc66104c8e11b4f7` |
| BBM_activites quality assurance for BBM Summit (V1).pptx | `46a82b98c230fd3e86571f920e4f46074805da39237257749922a8e8ad94a35e` |
| BBM_fixed_ scope_2024+BBM KPI (V1.4) - AU.pptx | `931e7d83c9dfb505d2ad08d1973553920fb2f60359c5f1d42bec10dfecc289be` |
| BBM_fixed_scope_KPIs_SLA_for_FME_(Apr.2026 V1.0).pptx | `ce82198158c591a4b0cfce6d0248894052a55a5c46dd676ad06ebe8fd15e7fce` |
| CF-ATS MBR-QBR KPI Template Ver P_Vendors_2025.xlsx | `af443d3e668c7c55fca5c34a506a911ed3c06a15979177c9ec225bbef57b7a16` |
| EU-UK BBM SLA table (V5 Feb2026).ods | `74f5bbc2d79351b131f73b7c680f71acaf252ae42a4dcbdcca87890f275d159f` |
| Framework for BBM service quality and cost (draft V3).docx | `16d801c52e09b70d47b5bb8abf3fc8aa80374d466fec5409fa9444b5754921e9` |
| New BBM_KPI_proposal_gap_analysis (V1).pptx | `22bc986b4133f2597f4777611bce770d253f609c78dae9e8f358931a97d1b864` |

## BB cost and workforce clarification

Direct user instruction identifies Staff Rate Card as the BB cost baseline. New documents below are supporting summaries/drafts, not proof of Amazon approval. Reviewed text and table content without changing originals.

| Source | SHA-256 | Status |
|---|---|---|
| EU RME Standard Staffing Model — Overview.docx | `37d2fbb8e2d2a6aabd50ad30b55dd37a427598c7e8eeb19615a3988b94bb1d2e` | Supplied overview/draft; underlying authority unverified |
| FM Resource Classification — BB _ 3PBB _ YB _ GB.docx | `43ec0447e88fb655ddb2dbf78c2df3c07af267d22081ca7817bb0ab41b8db191` | Supplied overview/draft; underlying authority unverified |


## Staffing reference update — 7 September 2026

See [Staffing model requirements](STAFFING-MODEL-REQUIREMENTS.md) for the two user-supplied staffing/resource documents, proposed use in FM Contract & Service Model and FM Pre-Contract / Pre-Tender Assessment, and open Amazon decisions STF-01–08. These are documented requirements, not implemented staffing rules or formal policy approval.

- EU RME Standard Staffing Model — Overview.docx — SHA-256 `37d2fbb8e2d2a6aabd50ad30b55dd37a427598c7e8eeb19615a3988b94bb1d2e`. Supplied reference; underlying authority unverified.

- FM Resource Classification — BB _ 3PBB _ YB _ GB.docx — SHA-256 `43ec0447e88fb655ddb2dbf78c2df3c07af267d22081ca7817bb0ab41b8db191`. Supplied reference; underlying authority unverified.
