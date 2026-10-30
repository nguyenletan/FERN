import Cards from '@cloudscape-design/components/cards';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import {Card,NavButton,NavLink,Page,Section,Terms,revealSection} from '../../app/ui';

const workspaceTasks = [
  ['Understand the FM picture', 'FM Overview'],
  ['Explore planning and objectives', 'Planning & Objectives'],
  ['Understand performance measures', 'Performance & KPIs'],
  ['Review risk and applicable requirements', 'Risk & Compliance'],
  ['Understand assessment findings and evidence', 'Audit & Assurance'],
  ['Explore improvement opportunities', 'Continual Improvement'],
  ['Find policy and governance guidance', 'Leadership & Policy'],
];

export default function GetStarted() {
  return <Page title="Get started" description="You don’t need to know where everything lives. Start with the question you want to answer.">
    <Cards
      header={<Header variant="h2">Choose your starting point</Header>}
      trackBy="title" cardsPerRow={[{cards:1},{minWidth:640,cards:3}]}
      items={[
        {title:'Find guidance for my task',text:'Choose the FM topic you are working on.',link:<Link href="#start-task-section" onFollow={event=>{event.preventDefault();revealSection('start-task-section');}}>Choose a topic</Link>},
        {title:'Learn about FERN and FM',text:'Start with an introductory learning topic.',link:<NavLink to="Learn">Open Learn</NavLink>},
        {title:'Find a standard or source',text:'Search the supplied BBM standards and read the source.',link:<NavLink to="Standards & Reference Library">Open the Standards &amp; Reference Library</NavLink>},
      ]}
      cardDefinition={{header:item=>item.title,sections:[{id:'text',content:item=>item.text},{id:'link',content:item=>item.link}]}}
    />
    <Card id="start-task-section" title="1. What Are You Trying to Do?" description="Choose a topic to read the relevant Workspace guidance.">
      <ul>{workspaceTasks.map(([task, page]) => <li key={page}><NavLink to={page}>{task}</NavLink> — {page}</li>)}</ul>
    </Card>
    <Card title="2. Explore Guidance and Learning">
      <p>Browse the Workspace sections to understand FM governance and practices. Visit Learn for introductory topics, or the Standards &amp; Reference Library for guidance on sources and document status. You do not need to select a facility.</p>
      <SpaceBetween direction="horizontal" size="l"><NavLink to="Learn">Explore learning topics</NavLink><NavLink to="Standards & Reference Library">Visit the Standards &amp; Reference Library</NavLink></SpaceBetween>
    </Card>
    <Card title="3. Check the Information and Its Sources" description="When reading guidance, check its source, date and applicability. These terms help you understand what is available and what still needs confirmation.">
      <Terms items={[
        ['Available', 'Information can be reviewed. Check its source and whether it applies to your task.'],
        ['Not Available', 'The information is not currently available.'],
        ['Not Confirmed', 'Information exists but needs confirmation before the intended use.'],
        ['Evidence Required', 'Additional supporting information is needed.'],
      ]}/>
      <p>A FERN explanation does not replace the authoritative source or establish approval.</p>
    </Card>
    <Card title="Compare Service Options" actions={<NavButton to="Service Models Explained">Read About Service Models</NavButton>}>
      <p>The delivery model describes <strong>how the service is delivered</strong>. The service tier describes <strong>the level of service required</strong>. Compare them separately before reviewing combinations.</p>
      <Section variant="default" header="Understand Delivery Models and Service Tiers">
        <Terms items={[
          ['Blue Badge', 'Amazon employees delivering activities internally.'],
          ['IFM', 'External Yellow Badge provision against specified inputs, resources, activities and requirements.'],
          ['IFM Hybrid', 'Mixed Blue Badge and Yellow Badge delivery under the applicable service arrangement.'],
          ['Fully Contained', 'External Yellow Badge provision against defined output-based service requirements.'],
        ]}/>
        <p>Prime is the highest service tier, Plus is intermediate, and Core is the basic tier. Mandatory requirements apply at every tier. Actual responsibilities come from the applicable service arrangement and contract.</p>
        <p>Compare operating conditions, asset needs, resource capability, criticality, risk, maintenance, lifecycle, cost and evidence quality. Opening a tool does not select a model or commit a decision.</p>
      </Section>
    </Card>
    <Card title="Need Help Finding Your Way?" actions={<NavButton to="Help & Guidance">Explore Help &amp; Guidance</NavButton>}/>
  </Page>;
}
