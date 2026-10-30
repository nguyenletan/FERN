export interface FMPreContractAssessmentPageProps {
  onDirtyChange?: (dirty:boolean)=>void;
  site: string;
  facilityType: string;
  serviceModel?: string;
  tier?: string;
  region: string;
  onNavigate?: (dest: string) => void;
}
