import { type SourceScene, type McSkyzPlan } from './workspace-extras.ts';
import { projectSchema, taskSchema, uid, newWorkflow, type Project } from './studio.ts';

export type PdfPage={number:number;text:string};
export const normalize=(v:string)=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const heading=/^\s*(?:sc[eè]ne|sc\.)\s*(?:n[°ºo]?\s*)?(\d{1,3}(?:\s*[a-z](?=\s*[:.)\-–—|]|\s*$))?|[a-z])(?=\s|[:.)\-–—|]|$)\s*[:.)\-–—|]?\s*(.*)$/i;
const field=(source:string,label:string)=>{const re=new RegExp('(?:^|\\n)\\s*(?:'+label+')\\s*[:–—-]\\s*([^\\n]+)','i');return source.match(re)?.[1]?.trim()??'';};
const blockField=(source:string,label:string)=>{
  const start=new RegExp('^\\s*(?:'+label+')\\s*[:–—-]\\s*(.*)','i');
  const next=/^\s*(?:action|description|cam[eé]ras?|cadrages?|plans?|d[eé]cor(?: principal| ma[iî]tre)?|lieu|environnement|location|variante|zone|ambiance|moment|m[eé]t[eé]o|personnages?|protagonistes?|props?|accessoires?|r[eé]f[eé]rences?)\s*[:–—-]/i;
  const values:string[]=[];let active=false;
  for(const line of source.split('\n')){const match=line.match(start);if(match){values.push(match[1]);active=true;}else if(next.test(line))active=false;else if(active)values.push(line);}
  return values.join('\n').trim();
};
const shorten=(s:string,n:number)=>s.trim().slice(0,n);
export function difficulty(source:string):{value:number;reason:string}{
  const s=normalize(source);const reasons:string[]=[];let score=1;
  if(/personnage|protagoniste|marche|course|interaction|gestuelle/.test(s)){score++;reasons.push('animation / personnages');}
  if(/foule|combat|poursuite|fusillade|explosion|simulation|destruction/.test(s)){score+=2;reasons.push('action collective ou simulation');}
  if(/vehicule|voiture|helicoptere|deplacement|camera.*(?:travelling|mouvement)|travelling/.test(s)){score++;reasons.push('déplacements ou caméra mobile');}
  return {value:Math.min(5,score),reason:reasons.length?'Proposition : '+reasons.join(', ')+'.':'Proposition : mise en scène simple, à vérifier.'};
}
export function parseMcSkyz(pages:PdfPage[],fileName='Brief McSkyz.pdf'):McSkyzPlan{
  const full=pages.map(p=>p.text).join('\n');const warnings:string[]=[];
  const sparse=pages.filter(p=>p.text.trim().length<40);if(sparse.length)warnings.push('Peu de texte reconnu sur les pages '+sparse.map(p=>p.number).join(', ')+'. Vérifie les images, plans et scans dans le PDF original.');
  const declaredMatch=full.match(/\b(\d{1,3})\s*sc[eè]nes?\s*(?:3d|au total|à réaliser|a realiser)?/i);
  const declaredScenes=declaredMatch?Number(declaredMatch[1]):null;
  const chunks:{label:string;title:string;text:string;pages:number[]}[]=[];let current:typeof chunks[number]|null=null;let preamble='';
  for(const page of pages){for(const raw of page.text.split(/\r?\n/)){const line=raw.trim();const match=line.match(heading);
    if(match&&line.length<260){
      const ref=match[1].replace(/\s/g,'').toUpperCase();const label='SC.'+(/^\d/.test(ref)?ref.replace(/^\d+/,n=>String(Number(n)).padStart(2,'0')):ref);current={label,title:match[2].trim(),text:line,pages:[page.number]};chunks.push(current);
    }else if(current){current.text+='\n'+raw;if(!current.pages.includes(page.number))current.pages.push(page.number);}else{preamble+='\n'+raw;}
  }}
  const unique=new Map<string,typeof chunks[number]>();
  for(const chunk of chunks){const old=unique.get(chunk.label);if(!old)unique.set(chunk.label,chunk);else{if(chunk.text.length>old.text.length)unique.set(chunk.label,chunk);warnings.push(chunk.label+' apparaît plusieurs fois : le passage le plus détaillé est proposé. Vérifie les pages.');}}
  if(unique.size>200)throw new Error('Plus de 200 scènes détectées. Découpe le PDF en plusieurs productions.');
  const scenes=[...unique.values()].map(c=>{
    const source=shorten(c.text,18000);const pipe=c.title.split('|').map(x=>x.trim());
    let environment=field(source,'d[eé]cor(?: principal| ma[iî]tre)?|lieu(?: principal)?|environnement|location');
    if(!environment&&pipe.length>=2)environment=pipe[0];
    // A scene heading such as "INT. HÔTEL — NUIT" provides a source-backed location.
    if(!environment){const loc=c.title.match(/^(?:INT\.?|EXT\.?|INT\.?\s*\/\s*EXT\.?)\s*[-–—:]?\s*(.+)$/i);if(loc)environment=loc[1].replace(/\s*[-–—]\s*(?:jour|nuit|matin|soir).*$/i,'').trim();}
    const variants=[field(source,'variante|zone|ambiance|moment|m[eé]t[eé]o'),...[...new Set(source.match(/\b(?:nuit|jour|pluie|neige|brouillard|cr[eé]puscule)\b/gi)??[])]];
    if(environment){const prefix=environment.match(/^(INT\.?|EXT\.?)\s*[-–—:]?\s+/i);if(prefix){variants.push(prefix[1]);environment=environment.slice(prefix[0].length);}const moment=environment.match(/\s*[-–—/(,]\s*(jour|nuit|matin|soir|pluie|neige)\s*\)?\s*$/i);if(moment){variants.push(moment[1]);environment=environment.slice(0,moment.index);}const zone=environment.match(/^(.+?)\s*(?:\/|>|\s[–—-]\s)\s*((?:couloir|chambre|hall|toit|parking|salle|[eé]tage|lobby|entr[eé]e|fa[cç]ade)\b.*)$/i);if(zone){environment=zone[1];variants.push(zone[2]);}}
    const variant=[...new Set(variants.filter(Boolean))].join(' · ');
    const title=shorten(pipe.length>=2?pipe[1]:c.title||c.label,180);const d=difficulty(source);
    return {id:uid(),label:c.label,title,source,pages:c.pages,action:shorten(blockField(source,'action|description')||(pipe.length>=2?pipe.slice(1).join(' | '):source.replace(/^.*\n?/,''))||title,6000),environment:shorten(environment||'À préciser — '+c.label,180),variant:shorten(variant,300),cameras:shorten(blockField(source,'cam[eé]ra(?:s)?|cadrage(?:s)?|plan(?:s)?'),4000),characters:shorten(blockField(source,'personnage(?:s)?|protagoniste(?:s)?'),2000),props:shorten(blockField(source,'props?|accessoire(?:s)?'),2000),difficulty:d.value,reason:d.reason,assignee:'',locked:false,reviewed:false} satisfies SourceScene;
  });
  if(!scenes.length)warnings.push('Aucune scène détaillée identifiée. Ce document peut être un budget, un sommaire ou un scan. Ajoute le brief détaillé ou colle un texte structuré ; aucun découpage ne sera inventé.');
  if(declaredScenes!==null&&declaredScenes!==scenes.length)warnings.push('Le document annonce '+declaredScenes+' scènes ; '+scenes.length+' références distinctes ont été reconnues. Les scènes A/B et les variantes ne sont pas supprimées pour atteindre le chiffre annoncé.');
  const unknown=scenes.filter(s=>s.environment.startsWith('À préciser')).length;if(unknown)warnings.push(unknown+' scène(s) sans décor explicite : indique leur décor ou fusionne les lieux avant de répartir.');
  if(scenes.some(s=>s.source.length===18000))warnings.push('Une scène dépasse la capacité de texte par scène. Vérifie le PDF original avant validation.');
  return {fileName,importedAt:new Date().toISOString(),method:'pdf-text-v1',declaredScenes,warnings:[...new Set(warnings)].slice(0,100),scenes,planNotes:shorten(preamble,10000)};
}
export function environmentGroups(scenes:SourceScene[]){const groups=new Map<string,{name:string;scenes:SourceScene[]}>();for(const scene of scenes){const key=normalize(scene.environment)||scene.id;const g=groups.get(key)??{name:scene.environment,scenes:[]};g.scenes.push(scene);groups.set(key,g);}return [...groups.values()];}

// Exact half-count is the hard objective; reuse comes next, then difficulty.
// Each environment may be split only when whole-group allocation cannot meet the quota.
export function allocateScenes(scenes:SourceScene[],a:string,b:string):SourceScene[]{
  if(!a||!b||a===b)throw new Error('Choisis deux profils différents.');
  if(scenes.length>200)throw new Error('200 scènes maximum.');
  const target=Math.ceil(scenes.length/2);const totalDifficulty=scenes.reduce((n,s)=>n+s.difficulty,0);
  type State={count:number;score:number;difficulty:number;owners:Record<string,string>};
  let states:State[]=[{count:0,score:0,difficulty:0,owners:{}}];
  const groups=environmentGroups(scenes).sort((x,y)=>y.scenes.length-x.scenes.length);
  for(const group of groups){
    const lockedA=group.scenes.filter(s=>s.locked&&s.assignee===a),lockedB=group.scenes.filter(s=>s.locked&&s.assignee===b);
    const free=group.scenes.filter(s=>!s.locked||![a,b].includes(s.assignee)).sort((x,y)=>y.difficulty-x.difficulty);
    const candidates:State[]=[];
    for(const state of states)for(let k=0;k<=free.length;k++){
      const count=state.count+lockedA.length+k;if(count>target)continue;
      // Two orientations offer different difficulty without enumerating every subset.
      for(const reverse of k===0||k===free.length?[false]:[false,true]){
        const sorted=reverse?[...free].reverse():free;const idsA=new Set([...lockedA,...sorted.slice(0,k)].map(s=>s.id));
        const aCount=idsA.size;const split=aCount>0&&aCount<group.scenes.length;const owners={...state.owners};let weight=state.difficulty;
        for(const s of group.scenes){owners[s.id]=idsA.has(s.id)?a:b;if(idsA.has(s.id))weight+=s.difficulty;}
        candidates.push({count,score:state.score+(split?1000:0),difficulty:weight,owners});
      }
    }
    // Keep several difficulty alternatives per count; environment splits dominate score.
    const buckets=new Map<number,State[]>();for(const c of candidates){const list=buckets.get(c.count)??[];list.push(c);buckets.set(c.count,list);}
    states=[...buckets.values()].flatMap(list=>list.sort((x,y)=>(x.score-y.score)||Math.abs(x.difficulty-totalDifficulty/2)-Math.abs(y.difficulty-totalDifficulty/2)).slice(0,8));
  }
  const best=states.filter(s=>s.count===target).sort((x,y)=>(x.score-y.score)||Math.abs(x.difficulty-totalDifficulty/2)-Math.abs(y.difficulty-totalDifficulty/2))[0];
  if(!best)throw new Error('Les affectations verrouillées empêchent une répartition égale. Déverrouille quelques scènes.');
  return scenes.map(s=>({...s,assignee:best.owners[s.id]}));
}
export function allocationSummary(scenes:SourceScene[]){return {sets:environmentGroups(scenes),shared:environmentGroups(scenes).filter(g=>new Set(g.scenes.map(s=>s.assignee).filter(Boolean)).size>1),owners:[...new Set(scenes.map(s=>s.assignee).filter(Boolean))].map(id=>({id,count:scenes.filter(s=>s.assignee===id).length,difficulty:scenes.filter(s=>s.assignee===id).reduce((n,s)=>n+s.difficulty,0)}))};}
export function projectFromMcSkyz(plan:McSkyzPlan,title:string,deadline:string):Project{
  if(!plan.scenes.length)throw new Error('Le brief doit contenir au moins une scène vérifiée.');
  const flow={...newWorkflow('3d'),count:0};
  const tasks=plan.scenes.map(s=>taskSchema.parse({id:s.id,title:(s.label+' — '+s.title).slice(0,180),scene:s.label,type:'3D',service:'3d',unit:'scene',quantity:1,assignee:s.assignee,status:'todo',estimate:0,actual:0,blocker:'',assetId:'',description:s.action,notes:('Source : '+plan.fileName+' · pages '+s.pages.join(', ')+'\n'+s.source).slice(0,6000),indication:('Décor : '+s.environment+'\nVariante : '+s.variant+'\nAction : '+s.action+'\nCaméras : '+(s.cameras||'À préciser')+'\nPersonnages : '+(s.characters||'À préciser')+'\nProps : '+(s.props||'À préciser')+'\nDifficulté '+s.difficulty+'/5 · '+s.reason).slice(0,4000),originKey:'mcskyz:'+s.id,steps:flow.steps.map(key=>({id:uid(),key,label:({decor:'Décor prêt',anim:'Animation',light:'Lighting',render:'Rendu',validation:'Validation finale'} as Record<string,string>)[key]??key,done:false,assignee:s.assignee,indication:key==='decor'?s.environment:'',doneAt:''}))}));
  return projectSchema.parse({id:uid(),title,client:'McSkyz',kind:'3D · McSkyz',color:'violet',billable:true,budget:0,externalCosts:0,received:0,deadline,status:'active',leadIds:[...new Set(plan.scenes.map(s=>s.assignee).filter(Boolean))],reminderDays:3,notes:'Découpage proposé à partir du PDF. Les caméras, les décors et la difficulté restent à valider dans chaque scène.',link:'',demo:false,tasks,workflows:[flow],mcskyz:plan});
}
