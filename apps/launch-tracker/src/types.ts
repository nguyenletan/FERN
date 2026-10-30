export interface IFMLaunchTrackerPageProps {
  onDirtyChange?: (dirty: boolean) => void;
  site: string;
  facilityType: string;
  serviceModel: string;
  tier: string;
  region: string;
}
