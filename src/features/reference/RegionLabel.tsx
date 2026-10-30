import { regionLabel } from './regionLabels';
import './region-labels.css';
export default function RegionLabel({ code }: { code: string }) {
  const { label, flag } = regionLabel(code);
  return (
    <span className="fs-region-label">
      {flag && (
        <span className="fs-country-flag" aria-hidden="true">
          {flag}
        </span>
      )}
      <span className="fs-country-name">{label}</span>
    </span>
  );
}
