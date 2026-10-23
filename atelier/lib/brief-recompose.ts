import {normalizeSceneRef,linkBriefScenes,matchingSceneTasks} from './brief-layout.ts';
import {uid} from './studio.ts';
import type {ExtractedBrief} from './brief-pdf';
import type {SceneAnalysis} from './brief-analysis';
import type {BriefModule} from './brief-types';
import type {Project} from './studio';
export function prepareDetectedBrief(draft:ExtractedBrief,project:Project):ExtractedBrief{
 const modules:BriefModule[]=[];const byRef=new Map<string,BriefModule>();
 const combine=(a:BriefModule,b:BriefModule)=>{a.text=[a.text,b.text].filter(Boolean).join('\n\n');a.pages=[...new Set([...a.pages,...b.pages])].sort((x,y)=>x-y);a.images=[...new Map([...a.images,...b.images].map(im=>[im.fileId+'-'+im.page+'-'+im.kind,im])).values()];};
 for(const original of draft.modules){const m=structuredClone(original),ref=normalizeSceneRef(m.sceneRef);let existing=ref?byRef.get(ref):modules.find(v=>!v.sceneRef&&v.text.length+m.text.length+2<=60000&&v.images.length+m.images.length<=120);
  if(existing){combine(existing,m);if(existing.text.length>60000||existing.images.length>120)throw new Error('Une scène dépasse les limites d’import. Sépare ce brief avant de l’ajouter.');}
  else{if(ref){m.sceneRef=ref;byRef.set(ref,m);}else m.title='Contexte général';modules.push(m);}
 }
 const warnings=draft.warnings.filter(w=>!/aucune référence de scène|un module par page/i.test(w));
 for(const ref of byRef.keys())if(matchingSceneTasks(project,ref).length>1)warnings.push(ref+' correspond à plusieurs tâches : choisis manuellement sa scène dans le plan.');
 warnings.unshift(byRef.size?'Scènes repérées dans les titres du PDF. Texte source conservé ; vérifie le découpage.':'Aucune scène clairement numérotée. Le contexte complet est conservé ; crée ou délimite les scènes avant leur transfert.');
 return {...draft,modules:linkBriefScenes(modules,project),warnings:[...new Set(warnings)].slice(0,40)};
}
export function recomposeBrief(draft:ExtractedBrief,analysis:SceneAnalysis):ExtractedBrief{
 const all=draft.modules.flatMap(m=>m.images),sharedPages=analysis.scenes.flatMap(s=>s.pages).filter((page,i,pages)=>pages.indexOf(page)!==i);let shared=false;
 const images=(reference:string,pages:number[])=>{const matching=reference?draft.modules.filter(m=>normalizeSceneRef(m.sceneRef)===normalizeSceneRef(reference)):[];const knownPages=new Set(matching.flatMap(m=>m.pages));const extraPages=pages.filter(page=>!knownPages.has(page));const chosen=[...matching.flatMap(m=>m.images),...all.filter(im=>extraPages.includes(im.page))];if(extraPages.some(page=>sharedPages.includes(page)))shared=true;const unique=[...new Map(chosen.map(im=>[im.fileId+'-'+im.page+'-'+im.kind,im])).values()];if(unique.length>120)throw new Error('Une scène rassemble plus de 120 visuels. Sépare ce brief avant l’import.');return unique;};
 const modules:BriefModule[]=[];
 if(analysis.context.trim())modules.push({id:uid(),sceneRef:'',title:'Brief général',text:analysis.context,pages:analysis.contextPages,images:images('',analysis.contextPages),taskId:''});
 for(const scene of analysis.scenes){const visuals=images(scene.reference,scene.pages);modules.push({id:uid(),sceneRef:scene.reference,title:scene.title,text:scene.text,pages:[...new Set([...scene.pages,...visuals.map(im=>im.page)])].sort((a,b)=>a-b),images:visuals,taskId:''});}
 const warnings=[...analysis.warnings,...(shared?['Certaines pages illustrent plusieurs scènes. Vérifie le rattachement de leurs images dans les fiches.']:[]),...draft.warnings.filter(w=>!/aucun.*sc[eè]ne|par page|sans titre/i.test(w))].slice(0,40);
 return {...draft,modules,warnings};
}
