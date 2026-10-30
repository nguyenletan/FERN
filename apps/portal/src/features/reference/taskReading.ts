export type SourceCell={text:string;col:number;colSpan:number;rowSpan:number};
export type SourceTable={type:string;header?:boolean;widths?:number[];rows?:SourceCell[][]};
export type ReadingPage={number:number;blocks:SourceTable[]};
export type ReadingRow={page:number;block:number;row:number;index:string;fields:{label:string;value:string}[]};
/** Expand merged cells using only their original grid coordinates. Empty cells stay empty. */
export function sourceGrid(rows:SourceCell[][],width:number){
 const grid=rows.map(()=>Array<string>(width).fill(''));
 rows.forEach((row,y)=>row.forEach(cell=>{for(let dy=0;dy<cell.rowSpan;dy++)for(let dx=0;dx<cell.colSpan;dx++)if(grid[y+dy]&&cell.col+dx<width)grid[y+dy][cell.col+dx]=cell.text;}));return grid;
}
export function taskReading(pages:ReadingPage[]){
 const tasks:ReadingRow[]=[];const regions:ReadingRow[]=[];let taskHeaders:string[]=[];let regionHeaders:string[]=[];
 for(const page of pages)for(const [blockIndex,block] of page.blocks.entries()){
  if(block.type!=='table'||!block.rows||!block.widths)continue;
  const grid=sourceGrid(block.rows,block.widths.length),head=grid[0]??[];
  const isTaskHeader=!!block.header&&head.includes('Task Index')&&head.some(h=>h==='Tasks'||h==='Task Requirements');
  const isRegional=!!block.header&&head.includes('Region')&&head.includes('Relevant legislation');
  if(isTaskHeader)taskHeaders=head;
  if(isRegional)regionHeaders=head;
  const regional=isRegional||(!block.header&&regionHeaders.length>0&&block.widths.length===regionHeaders.length);
  if(!isTaskHeader&&!regional&&(block.header||block.widths.length!==taskHeaders.length))continue;
  const headers=regional?regionHeaders:taskHeaders;if(!headers.length)continue;
  const start=block.header?1:0;
  for(let row=start;row<grid.length;row++){
   const values=grid[row];
   const fields=headers.map((label,i)=>({label:label||'Source column '+(i+1),value:values[i]}));
   const index=values[headers.indexOf('Task Index')]??'';
   (regional?regions:tasks).push({page:page.number,block:blockIndex,row,index,fields});
  }
 }
 return {tasks,regions};
}
