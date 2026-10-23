import type {BriefDocument,BriefImage,BriefModule} from './brief-types.ts';
import {taskSchema,uid,newWorkflow,SERVICES,type Project} from './studio.ts';
export type TextLine={text:string;x:number;y:number;width:number;height:number};
export type LayoutPage={number:number;width:number;height:number;lines:TextLine[]};
export type Segment={moduleId:string;page:number;top:number;bottom:number;left?:number;right?:number};
export type ImagePlacement={key:string;left:number;top:number;right:number;bottom:number;index:number;inline?:unknown};
export type BriefStructure={modules:BriefModule[];segments:Segment[];warnings:string[]};
export function sceneHeading(text:string){const m=text.trim().match(/^(sc[eè]ne|sc\.?|s[eé]quence|seq\.?)\s*(?:n[°ºo]?\s*)?(\d{1,3}(?:\s*[a-z](?=\s*[:.)\-–—|]|\s*$))?|[a-z])(?=\s|[:.)\-–—|]|$)\s*[:.)\-–—|]?\s*(.*)$/i);if(!m||text.length>260)return null;const n=m[2].replace(/\s/g,'').toUpperCase();const ref=(/^s[eé]q/i.test(m[1])?'SEQ.':'SC.')+n.replace(/^\d+/,s=>String(Number(s)).padStart(2,'0'));return {ref,title:(m[3].trim()||ref).slice(0,180)};}
export function normalizeSceneRef(ref:string){if(/^\d{1,3}[a-z]?$/i.test(ref.trim()))return 'SC.'+ref.trim().toUpperCase().replace(/^\d+/,n=>String(Number(n)).padStart(2,'0'));const heading=sceneHeading(ref);return heading?.ref||ref.toUpperCase().replace(/[^A-Z0-9]/g,'');}
export function structureBrief(pages:LayoutPage[]):BriefStructure{
 const modules:BriefModule[]=[],segments:Segment[]=[],warnings:string[]=[];let current:BriefModule|null=null;const hasScenes=pages.some(p=>p.lines.some(l=>sceneHeading(l.text)));
 const make=(title:string,sceneRef:string)=>{const m:BriefModule={id:uid(),title,sceneRef,text:'',pages:[],taskId:sceneRef?'new':'',images:[]};modules.push(m);return m;};
 for(const page of pages){if(!hasScenes)current=null;const sorted=[...page.lines].sort((a,b)=>a.y-b.y||a.x-b.x);const heads=sorted.filter(l=>sceneHeading(l.text));
  if(sorted.map(l=>l.text).join('').trim().length<35)warnings.push('Page '+page.number+' : peu de texte sélectionnable. Le visuel est conservé ; complète le texte si le PDF est un scan.');
  const multi=heads.some((h,i)=>heads.some((other,j)=>j!==i&&Math.abs(h.y-other.y)<.02&&Math.abs(h.x-other.x)>.25));let columns=[0,1];
  if(multi){const xs:number[]=[];for(const h of [...heads].sort((a,b)=>a.x-b.x))if(!xs.some(x=>Math.abs(x-h.x)<.15))xs.push(h.x);columns=[0,...xs.slice(1).map(x=>x-xs[0]),1];warnings.push('Page '+page.number+' : colonnes détectées. Vérifie le rattachement des visuels.');}
  for(let c=0;c<columns.length-1;c++){const left=columns[c],right=columns[c+1],lines=sorted.filter(l=>l.x>=left-.005&&l.x<right-.005);let start=0;
   const addPage=(m:BriefModule)=>{if(!m.pages.includes(page.number))m.pages.push(page.number);};
   for(const line of lines){const h=sceneHeading(line.text);
    if(h){const boundary=Math.max(start,Math.min(.995,line.y-.008));if(current&&boundary>start+.01){segments.push({moduleId:current.id,page:page.number,top:start,bottom:boundary,left,right});addPage(current);}
     if((current as BriefModule|null)?.sceneRef!==h.ref){const old=modules.find(m=>m.sceneRef===h.ref);current=old||make(h.title,h.ref);if(old)warnings.push(h.ref+' : plusieurs passages ont été regroupés. Vérifie le module.');}
     start=boundary;addPage(current!);
    }else if(!current)current=make(heads.length?'Brief général':'Page '+page.number,'');
    addPage(current!);current!.text+=(current!.text?'\n':'')+line.text;
   }
   if(!current)current=make('Page '+page.number,'');addPage(current);segments.push({moduleId:current.id,page:page.number,top:start,bottom:1,left,right});
  }
 }
 if(!hasScenes)warnings.push('Aucune référence de scène reconnue. Les pages sont conservées en modules à nommer ou à scinder.');
 if(modules.length>200)throw new Error('200 modules maximum par PDF. Sépare ce brief en plusieurs fichiers.');if(modules.some(m=>m.text.length>60000))throw new Error('Une scène dépasse 60 000 caractères. Sépare le PDF pour conserver tout son texte.');
 return {modules,segments,warnings:[...new Set(warnings)].slice(0,40)};
}
export function segmentForImage(segments:Segment[],page:number,image:Pick<ImagePlacement,'top'|'bottom'>&{left?:number;right?:number}){let relevant=segments.filter(s=>s.page===page);const x=((image.left??0)+(image.right??1))/2;const column=relevant.filter(s=>x>=(s.left??0)&&x<(s.right??1));if(column.length)relevant=column;const center=(image.top+image.bottom)/2;return relevant.find(s=>center>=s.top&&center<s.bottom)||(center<(relevant[0]?.top??0)?relevant[0]:relevant[relevant.length-1]);}
export function imageTargets(segments:Segment[],page:number,image:ImagePlacement){
 const primary=segmentForImage(segments,page,image);if(!primary)return [];
 const fullPage=image.right-image.left>.7&&image.bottom-image.top>.65;
 if(fullPage){const targets=segments.filter(s=>s.page===page).map(segment=>({segment,crop:{left:Math.max(image.left,segment.left??0),right:Math.min(image.right,segment.right??1),top:Math.max(image.top,segment.top),bottom:Math.min(image.bottom,segment.bottom)}})).filter(t=>t.crop.right-t.crop.left>.05&&t.crop.bottom-t.crop.top>(image.bottom-image.top)*.12);if(new Set(targets.map(t=>t.segment.moduleId)).size>1)return targets;}
 return [{segment:primary,crop:null}];
}
type Matrix=[number,number,number,number,number,number];
const multiply=(a:Matrix,b:Matrix):Matrix=>[a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]];
export function imagePlacements(ops:{fnArray:number[];argsArray:any[]},codes:Record<string,number>,viewport:{width:number;height:number;convertToViewportPoint:(x:number,y:number)=>number[]}):ImagePlacement[]{
 let matrix:Matrix=[1,0,0,1,0,0];const stack:Matrix[]=[],out:ImagePlacement[]=[];
 const add=(key:string,index:number,m=matrix,inline?:unknown)=>{const points=[[0,0],[1,0],[0,1],[1,1]].map(([x,y])=>viewport.convertToViewportPoint(m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]));const xs=points.map(p=>p[0]/viewport.width),ys=points.map(p=>p[1]/viewport.height);const left=Math.max(0,Math.min(...xs)),right=Math.min(1,Math.max(...xs)),top=Math.max(0,Math.min(...ys)),bottom=Math.min(1,Math.max(...ys));if(right-left>.015&&bottom-top>.015)out.push({key,left,right,top,bottom,index,inline});};
 for(let i=0;i<ops.fnArray.length;i++){const code=ops.fnArray[i],args=ops.argsArray[i]||[];
  if(code===codes.save){stack.push([...matrix]);}else if(code===codes.restore){matrix=stack.pop()||[1,0,0,1,0,0];}
  else if(code===codes.transform)matrix=multiply(matrix,args as Matrix);
  else if(code===codes.paintFormXObjectBegin){stack.push([...matrix]);if(args[0])matrix=multiply(matrix,args[0]);}
  else if(code===codes.paintFormXObjectEnd)matrix=stack.pop()||[1,0,0,1,0,0];
  else if(code===codes.beginGroup){stack.push([...matrix]);if(args[0]?.matrix)matrix=multiply(matrix,args[0].matrix);}
  else if(code===codes.endGroup)matrix=stack.pop()||[1,0,0,1,0,0];
  else if(code===codes.paintImageXObject)add(args[0],i);
  else if(code===codes.paintInlineImageXObject)add('inline-'+i,i,matrix,args[0]);
  else if(code===codes.paintImageXObjectRepeat){for(let j=0;j<args[3].length;j+=2)add(args[0],i,multiply(matrix,[args[1],0,0,args[2],args[3][j],args[3][j+1]]));}
  else if(code===codes.paintInlineImageXObjectGroup){for(const entry of args[1]||[])add('group-'+i,i,multiply(matrix,entry.transform));}
 }
 return out;
}
export function attachBrief(project:Project,document:BriefDocument):Project{
 if(project.briefs.some(d=>d.fingerprint===document.fingerprint))throw new Error('Ce PDF est déjà présent dans ce projet.');
 const tasks=[...project.tasks];const flow=project.workflows[0]||newWorkflow('3d'),catalog=SERVICES.find(s=>s.id===flow.service)!;
 const modules=document.modules.map(module=>{let taskId=module.taskId;if(taskId==='new'&&module.sceneRef.trim()){
  const matches=matchingSceneTasks({...project,tasks},module.sceneRef);if(matches.length>1)throw new Error(module.sceneRef+' correspond à plusieurs éléments. Choisis la scène à relier avant le transfert.');if(matches.length===1)taskId=matches[0].id;
 }if(taskId==='new'){
  if(tasks.length>=400)throw new Error('Ce projet atteint 400 éléments. Importe les modules sans créer de nouvelles tâches.');
  const owner=project.leadIds.includes(flow.assignee)?flow.assignee:'';
  const description=module.text.length<=6000?module.text:module.text.slice(0,5890)+'\n\nSuite du texte et références : Brief et PDF de cette scène.';
  taskId=uid();tasks.push(taskSchema.parse({id:taskId,title:module.title,scene:module.sceneRef,type:catalog.short,service:flow.service,unit:module.sceneRef.startsWith('SEQ.')?'sequence':'scene',assignee:owner,status:'todo',estimate:0,actual:0,blocker:'',notes:'Brief : '+document.name+' · p. '+module.pages.join(', '),assetId:'',description,originKey:'brief:'+module.id,steps:flow.steps.map(key=>({id:uid(),key,label:catalog.steps.find(s=>s.key===key)?.label||key,done:false,doneAt:'',assignee:project.leadIds.includes(flow.assignments[key])?flow.assignments[key]:owner,indication:''}))}));
 }else if(taskId&&!tasks.some(t=>t.id===taskId))throw new Error('Une scène liée a été retirée. Choisis une autre scène avant d’importer.');
 return {...module,taskId};});
 return {...project,tasks,briefs:[...project.briefs,{...document,modules}]};
}
export function matchingSceneTasks(project:Project,reference:string){const ref=normalizeSceneRef(reference);return ref?project.tasks.filter(t=>t.scene.trim()&&normalizeSceneRef(t.scene)===ref):[];}
export function linkBriefScenes(modules:BriefModule[],project:Project){return modules.map(m=>{if(!m.sceneRef.trim())return {...m,taskId:''};const matches=matchingSceneTasks(project,m.sceneRef);return {...m,taskId:matches.length===1?matches[0].id:matches.length?'':'new'};});}
export function briefPlanSummary(project:Project,modules:BriefModule[]){
 const refs=new Set<string>(),newRefs=new Set<string>(),linked=new Set<string>();let create=0,independent=0;const conflicts:string[]=[];
 for(const m of modules){const ref=normalizeSceneRef(m.sceneRef);if(ref||m.taskId)refs.add(ref||m.id);if(m.taskId==='new'){
  const matches=matchingSceneTasks(project,m.sceneRef);if(matches.length>1){conflicts.push(m.sceneRef);continue;}if(matches.length===1){linked.add(matches[0].id);continue;}
  const key=ref||m.id;if(!newRefs.has(key)){newRefs.add(key);create++;}
 }else if(m.taskId){if(project.tasks.some(t=>t.id===m.taskId))linked.add(m.taskId);else conflicts.push(m.sceneRef||m.title);}else independent++;}
 return {scenes:refs.size,create,linked:linked.size,independent,conflicts:[...new Set(conflicts)]};
}
export function sceneBriefModules(project:Project,taskId:string){return project.briefs.flatMap(doc=>doc.modules.filter(m=>m.taskId===taskId).map(module=>({document:doc,module})));}

export function updateBriefModule(project:Project,documentId:string,module:BriefModule):Project{
 const document=project.briefs.find(d=>d.id===documentId);if(!document)return project;
 const next={...document,modules:document.modules.map(m=>m.id===module.id?module:m)};
 if(module.taskId!=='new')return {...project,briefs:project.briefs.map(d=>d.id===documentId?next:d)};
 const rebuilt=attachBrief({...project,briefs:project.briefs.filter(d=>d.id!==documentId)},next);
 const updated=rebuilt.briefs.find(d=>d.id===documentId)!;return {...rebuilt,briefs:project.briefs.map(d=>d.id===documentId?updated:d)};
}
