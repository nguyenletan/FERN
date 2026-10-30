import { useState } from 'react';
import DemoSignIn from '../packages/platform/src/features/auth/DemoSignIn';
import FernWorkspace from '../apps/portal/src/app/FernWorkspace';
import ContentAdminDemo from '../apps/portal/src/features/admin-demo/ContentAdminDemo';
// The proposed administration walkthrough opens from the user menu in the portal header.
export default function App() {
  const [admin, setAdmin] = useState(false);
  return admin ? (
    <ContentAdminDemo onClose={() => setAdmin(false)} />
  ) : (
    <DemoSignIn renderApp={(onSignOut) => <FernWorkspace onSignOut={onSignOut} onAdmin={() => setAdmin(true)} />} />
  );
}
