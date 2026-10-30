import {useEffect,useRef} from 'react';
import './reading-controls.css';

/** Native details preserve keyboard behaviour and full source wording. */
export function revealReadingTarget(target:Element){
 let node:Element|null=target;
 while(node){if(node instanceof HTMLDetailsElement)node.open=true;node=node.parentElement;}
}
export default function ReadingControls({label='this page'}:{label?:string}){
 const root=useRef<HTMLDivElement>(null);
 const scope=()=>root.current?.closest('[data-reading-scope]');
 useEffect(()=>{
  const region=scope();if(!region)return;
  const reveal=(id:string)=>{const target=document.getElementById(id);if(!target||!region.contains(target))return;revealReadingTarget(target);requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));};
  const click=(event:Event)=>{const a=(event.target as Element).closest?.('a[href^="#"]');if(!a)return;try{reveal(decodeURIComponent(a.getAttribute('href')!.slice(1)));}catch{}};
  const hash=()=>{try{reveal(decodeURIComponent(window.location.hash.slice(1)));}catch{}};
  region.addEventListener('click',click);window.addEventListener('hashchange',hash);hash();
  return()=>{region.removeEventListener('click',click);window.removeEventListener('hashchange',hash);};
 },[]);
 const change=(open:boolean)=>scope()?.querySelectorAll<HTMLDetailsElement>('details').forEach(item=>{if(item.closest('[data-reading-scope]')===scope())item.open=open;});
 return <div ref={root} className="fern-reading-controls" role="group" aria-label={'Reading options for '+label}><span>Choose a heading to read more</span><button type="button" onClick={()=>change(true)}>Expand all</button><button type="button" onClick={()=>change(false)}>Collapse all</button></div>;
}
