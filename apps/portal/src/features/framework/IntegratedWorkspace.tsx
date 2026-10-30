import {type ReactNode,useState,useEffect} from 'react';
import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import data from './frameworkContent.json';
import FrameworkContent from './FrameworkContent';
import {sectionSummary} from './sectionSummary';
import {ExpandAllControls,NavLink,Page,Prose,Section} from '../../app/ui';

/** A Workspace topic: overview, guidance sections, evidence and next steps, with the detailed practice guide one click away. */
export default function IntegratedWorkspace({title,children}:{title:string;children:ReactNode}){
 const page=data.pages.find(p=>p.title===title)!;
 const [practice,setPractice]=useState(false);
 useEffect(()=>{window.scrollTo({top:0});document.querySelector<HTMLElement>('#fern-main h1')?.focus({preventScroll:true});},[practice]);
 const intro=page.intro.split('\n\n');
 if(practice)return <Page title={title} description="Detailed practice guidance" actions={<Button iconName="arrow-left" onClick={()=>setPractice(false)}>Back to {title}</Button>}>
  <Box float="right"><ExpandAllControls label={title+' detailed guidance'}/></Box>
  {children}
 </Page>;
 return <Page title={title} description={intro[0].replace(/\*\*/g,'')} actions={<Button onClick={()=>setPractice(true)}>Open detailed practice guide</Button>}>
  <Container header={<Header variant="h2" description="The FERN mission in practice">About this topic</Header>}>
   <SpaceBetween size="m">
    <FrameworkContent text={intro[1]}/>
    <SpaceBetween direction="horizontal" size="xs"><Box variant="awsui-key-label">Guided by</Box>{page.pillars.map(n=><Badge key={n} color="blue">{data.pillars[n-1].name}</Badge>)}<NavLink to="Mission & Pillars">About the pillars</NavLink></SpaceBetween>
    <Section variant="footer" header="How these pillars support your work"><FrameworkContent text={intro.slice(2).join('\n\n')}/></Section>
   </SpaceBetween>
  </Container>
  <Container header={<Header variant="h2" description="Choose a step, or open the guidance below at your own pace." actions={<ExpandAllControls label={title}/>}>Your route through this topic</Header>}>
   <SpaceBetween size="m">
    <Prose><ol>{page.sections.map((s,i)=><li key={s.title}><a href={`#fw-section-${i}`}>{s.title}</a></li>)}</ol></Prose>
    <SpaceBetween size="s">{page.sections.map((s,i)=><Section id={`fw-section-${i}`} key={s.title} variant="default" header={s.title} description={sectionSummary(s)}><FrameworkContent text={s.body}/></Section>)}</SpaceBetween>
   </SpaceBetween>
  </Container>
  <Container header={<Header variant="h2">Evidence to connect</Header>}>
   <SpaceBetween size="s">
    <Prose><p>{page.evidence}</p></Prose>
    <Section variant="footer" header="How ISO informs this guidance"><Prose><p>{page.iso}</p><p>Read the relevant source and edition before applying it to a decision. External references do not establish a site-specific obligation or certification.</p></Prose><NavLink to="Standards & Reference Library">Explore the Standards &amp; Reference Library</NavLink></Section>
   </SpaceBetween>
  </Container>
  <Container header={<Header variant="h2">Continue your work</Header>}><FrameworkContent text={page.next}/></Container>
  <Container header={<Header variant="h2" description="Explore the existing practical explanations, examples and topic-specific checks." actions={<Button onClick={()=>setPractice(true)}>Open detailed practice guide</Button>}>Looking for more detail?</Header>}/>
 </Page>;
}
