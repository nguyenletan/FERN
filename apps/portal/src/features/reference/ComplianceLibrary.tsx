import { lazy, Suspense } from 'react';
// The reader carries the 6.8 MB standards text; load it only when the Reference Library opens.
const StandardsLibrary = lazy(() => import('./StandardsLibrary'));
export default function ComplianceLibrary() {
  return (
    <Suspense fallback={<p role="status">Loading the BBM standards library…</p>}>
      <StandardsLibrary />
    </Suspense>
  );
}
