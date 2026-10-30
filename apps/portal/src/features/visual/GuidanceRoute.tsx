import Box from '@cloudscape-design/components/box';
import {revealSection} from '../../app/ui';
/** Open (if collapsed), scroll to and focus a guidance section on the current page. */
export const openGuidanceSection=revealSection;
/** Numbered route through a guide; each step links to the section that explains it (the portal opens it on click). */
export default function GuidanceRoute({title,id,steps,children}:{title:string;id:string;steps:[string,string,string,string][];children?:React.ReactNode}){
 return <nav aria-labelledby={id}><h3 id={id}>{title}</h3><p>Follow the steps in order, or choose a step to read its guidance. These are guidance links, not a record of completed work.</p>
  <ol>{steps.map(([term,action,description,target],index)=><li key={term}><Box variant="small" color="text-body-secondary">Step {index+1} · {term}</Box><a href={'#'+target}><strong>{action}</strong></a> — {description}</li>)}</ol>
  {children}
 </nav>;
}
