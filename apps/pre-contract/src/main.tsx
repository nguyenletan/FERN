import React from 'react';
import ReactDOM from 'react-dom/client';
import PreContractApp from './PreContractApp';
import DemoSignIn from '../../../packages/platform/src/features/auth/DemoSignIn';
import '../../../packages/platform/src/index.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><DemoSignIn renderApp={onSignOut=><PreContractApp onSignOut={onSignOut}/>}/></React.StrictMode>);
