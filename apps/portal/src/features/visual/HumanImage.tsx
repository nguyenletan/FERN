import mission from './human-images/mission.jpg';
import leadership from './human-images/leadership.jpg';
import overview from './human-images/overview.jpg';
import planning from './human-images/planning.jpg';
import performance from './human-images/performance.jpg';
import risk from './human-images/risk.jpg';
import audit from './human-images/audit.jpg';
import improvement from './human-images/improvement.jpg';
import learn from './human-images/learn.jpg';
import './human-images.css';

const scenes:Record<string,{src:string;alt:string}>={
 'Mission & Pillars':{src:mission,alt:'A facilities team exchanging ideas as they walk through a building.'},
 'Leadership & Policy':{src:leadership,alt:'A facilities leader listening to colleagues as they discuss priorities.'},
 'FM Overview':{src:overview,alt:'A facilities manager and technician reviewing building information together.'},
 'Planning & Objectives':{src:planning,alt:'Colleagues reviewing a building plan and agreeing their next steps.'},
 'Performance & KPIs':{src:performance,alt:'Two colleagues discussing trends in performance information.'},
 'Risk & Compliance':{src:risk,alt:'A specialist and technician reviewing a checklist during a visual inspection.'},
 'Audit & Assurance':{src:audit,alt:'An assessor and site representative reviewing evidence together.'},
 'Continual Improvement':{src:improvement,alt:'A facilities team sharing observations and lessons learned.'},
 'Learn':{src:learn,alt:'An experienced technician coaching a colleague using training equipment.'},
};
export default function HumanImage({discipline}:{discipline:string}){
 const scene=scenes[discipline];
 if(!scene)return null;
 return <figure className="human-scene"><img src={scene.src} alt={scene.alt+' Amazon branding and automated logistics equipment appear in the background.'} width={1536} height={1024} decoding="async"/></figure>;
}
