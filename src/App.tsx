import {useState} from 'react';
import DemoSignIn from "../packages/platform/src/features/auth/DemoSignIn";
import FernWorkspace from "../apps/portal/src/app/FernWorkspace";
import ContentAdminDemo from '../apps/portal/src/features/admin-demo/ContentAdminDemo';
import "../apps/portal/src/app/baseline-refresh.css";
export default function App(){const [admin,setAdmin]=useState(false);return admin?<ContentAdminDemo onClose={()=>setAdmin(false)}/>:<><DemoSignIn renderApp={onSignOut=><FernWorkspace onSignOut={onSignOut}/>}/><button className="demo-admin-launch" onClick={()=>setAdmin(true)}>Proposed administration walkthrough</button></>;}
