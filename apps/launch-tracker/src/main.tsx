import React from 'react';
import ReactDOM from 'react-dom/client';
import Page from './index';
import DemoSignIn from '../../../packages/platform/src/features/auth/DemoSignIn';
import StandaloneShell from '../../../packages/platform/src/StandaloneShell';
import '../../../packages/platform/src/index.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><DemoSignIn renderApp={onSignOut=><StandaloneShell title="FM Mobilisation & Transition Tracker" Page={Page} onSignOut={onSignOut}/>}/></React.StrictMode>);
