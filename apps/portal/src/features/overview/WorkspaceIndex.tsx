import Cards from '@cloudscape-design/components/cards';
import Header from '@cloudscape-design/components/header';
import {NavLink,Page} from '../../app/ui';

export const workspacePages = [
 ["Mission & Pillars","Explore our FM mission and the eight pillars that guide how we work."],
 ['Leadership & Policy','Understand FM direction, policies and guidance.'],
 ['FM Overview','Review available FM information and areas needing attention.'],
 ['Planning & Objectives','Explore how needs connect to plans and measurable outcomes.'],
 ['Performance & KPIs','Understand performance measures and supporting evidence.'],
 ['Risk & Compliance','Review risks and the requirements that apply.'],
 ['Audit & Assurance','Understand assessments, findings and verification.'],
 ['Continual Improvement','Use evidence and experience to identify improvements.'],
];
export default function WorkspaceIndex() {
 return <Page title="Workspace" description="FM knowledge and governance. Choose an area to explore FM information and guidance.">
  <Cards
   header={<Header variant="h2" counter={`(${workspacePages.length})`}>Workspace topics</Header>}
   items={workspacePages.map(([title,description])=>({title,description}))}
   trackBy="title"
   cardsPerRow={[{cards:1},{minWidth:640,cards:2},{minWidth:1100,cards:3}]}
   cardDefinition={{header:item=><NavLink to={item.title} fontSize="heading-m">{item.title}</NavLink>,sections:[{id:'description',content:item=>item.description}]}}
  />
 </Page>;
}
