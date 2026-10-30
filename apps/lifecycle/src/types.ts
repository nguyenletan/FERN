export interface LifecycleAssetAnalysisPageProps {
  site: string;
  facilityType: string;
  serviceModel: string;
  tier: string;
  region: string;
  onNavigate: (dest: string) => void;
}
