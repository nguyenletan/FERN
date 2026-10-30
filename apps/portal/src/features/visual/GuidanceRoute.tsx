import './visual-review.css';
export function openGuidanceSection(id:string){
 const target=document.getElementById(id);if(!target)return;
 if(target instanceof HTMLDetailsElement)target.open=true;
 const focusTarget=target.querySelector<HTMLElement>('summary,h2,h3')??target;
 focusTarget.setAttribute('tabindex','-1');focusTarget.focus({preventScroll:true});target.scrollIntoView({block:'start'});
}
export default function GuidanceRoute({title,id,steps}:{title:string;id:string;steps:[string,string,string,string][]}){
 return <nav className="guidance-route" aria-labelledby={id}><h2 id={id}>{title}</h2><p>Follow the steps in order, or choose a step to read its guidance. These are guidance links, not a record of completed work.</p><ol>{steps.map(([term,action,description,target],index)=><li key={term}><a href={'#'+target} onClick={event=>{event.preventDefault();openGuidanceSection(target);}}><span className="guidance-step-label">Step {index+1} · {term}</span><strong>{action}</strong><span className="guidance-step-description">{description}</span><span className="guidance-step-link">Read guidance <span aria-hidden="true">→</span></span></a></li>)}</ol></nav>;
}
