import { type Project, type Profile, uid, serviceLabel } from './studio.ts';
import { type BudgetDocument, budgetDocumentSchema } from './workspace-extras.ts';
import { environmentGroups,allocationSummary } from './mcskyz.ts';
import { euros,cents } from './invoices.ts';
export function defaultBudget(project:Project):BudgetDocument{
  if(project.budgetDocument)return structuredClone(project.budgetDocument);
  const scenes=project.mcskyz?.scenes||[];
  const lines=project.budget>0?[{id:uid(),label:'Production globale',detail:'Périmètre du projet à confirmer',quantity:1,unitPrice:project.budget}]:[
    {id:uid(),label:'Assemblage & animation',detail:'Scènes du plan de production',quantity:scenes.length||1,unitPrice:0},
    {id:uid(),label:'Décors & environnements',detail:'Décors maîtres, zones et variantes',quantity:scenes.length?environmentGroups(scenes).length:1,unitPrice:0},
    {id:uid(),label:'Personnages, rigs & props',detail:'Périmètre et fournisseurs à confirmer',quantity:1,unitPrice:0},
    {id:uid(),label:'Finitions & livraison',detail:'Contrôle qualité, exports et retours',quantity:1,unitPrice:0},
  ];
  return budgetDocumentSchema.parse({lines,discount:0,duration:'À confirmer',shots:'À confirmer',characters:'À confirmer',deliverables:'Formats et exports à confirmer',phases:[{dates:'À planifier',scope:'Découpage et validation du périmètre'},{dates:'À planifier',scope:'Décors, personnages et accessoires'},{dates:'À planifier',scope:'Animation, caméras, éclairage et rendu'},{dates:'À planifier',scope:'Retours, contrôle qualité et livraison'}],conditions:'Acompte et échéance à convenir sur la facture.',notes:'Budget proposé, soumis à validation du périmètre.',contactEmail:'',contactWebsite:''});
}
export function budgetTotals(b:BudgetDocument){const subtotal=b.lines.reduce((n,l)=>n+Math.round(l.quantity*cents(l.unitPrice)),0),discount=cents(b.discount);return {subtotal,discount,total:subtotal-discount};}
export function budgetValues(project:Project,b:BudgetDocument,profiles:Profile[],agency:string){
  const scenes=project.mcskyz?.scenes.map(s=>({...s,assignee:project.tasks.find(t=>t.id===s.id)?.assignee??s.assignee}))||[];
  const groups=environmentGroups(scenes),allocation=allocationSummary(scenes);const owners=[...new Set(project.tasks.map(t=>t.assignee).filter(Boolean))];
  const sceneCount=scenes.length||new Set(project.tasks.filter(t=>t.unit==='scene').map(t=>t.scene||t.id)).size;
  const totals=budgetTotals(b);const values:Record<string,string>={
    PROJECT_TITLE:project.title,CLIENT:project.client,VOLUME_SUMMARY:sceneCount?sceneCount+' scènes · '+(groups.length?groups.length+' décors':'périmètre à confirmer'):project.tasks.length+' éléments de production',SERVICES:project.workflows.map(f=>serviceLabel(f.service)).join(' / '),DURATION:b.duration,GREETING:'Bonjour '+project.client+' !',INTRO_TITLE:'La commande en un regard',INTRO_TEXT:'Votre production « '+project.title+' » : un périmètre partagé, des étapes de validation et un budget détaillé.',DOCUMENT_SCOPE:'Ce document complète le plan de production dans Atelier. Les détails des scènes et leurs affectations restent disponibles dans le plan et son export.',SCENE_COUNT:sceneCount?String(sceneCount):'À définir',SET_COUNT:groups.length?String(groups.length):'À définir',SHOT_COUNT:b.shots,SET_LIST:groups.length?groups.map(g=>g.name).join(' / '):'Décors à confirmer',CHARACTER_LIST:b.characters,CHARACTER_COUNT:'À confirmer',DELIVERABLES:b.deliverables,DEADLINE:new Date(project.deadline+'T12:00:00Z').toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'}),BUDGET_SUBTOTAL:euros(totals.subtotal),DISCOUNT:totals.discount?'−'+euros(totals.discount):euros(0),BUDGET_TOTAL:euros(totals.total),TAX_LABEL:'Montants HT',PROFILE_A:profiles.find(p=>p.id===owners[0])?.name||'À attribuer',PROFILE_B:profiles.find(p=>p.id===owners[1])?.name||'À attribuer',SHARED_SETS:allocation.shared.length?allocation.shared.length+' décor(s) partagé(s) : '+allocation.shared.map(g=>g.name).join(' / '):'Décors regroupés par responsable selon le plan. Répartition ajustable.',VALIDATION_NOTES:b.notes,CONDITIONS:b.conditions,INVOICE_NOTES:'Émetteur légal, acompte et échéance à valider dans l’espace Factures.',CONFIDENTIALITY:'Diffusion des documents et droits d’utilisation selon les conditions validées entre les parties.',PLANNING_NOTES:'Démarrage après validation du périmètre et réception des éléments. Retours selon le planning convenu.',AGENCY:agency,AGENCY_SERVICES:project.workflows.map(f=>serviceLabel(f.service)).join(' / '),CONTACT_EMAIL:b.contactEmail||'Contact à confirmer',CONTACT_WEBSITE:b.contactWebsite||'Site à confirmer',CONTACT_REGION:'France',
  };
  for(let i=0;i<5;i++){const l=b.lines[i];values['BUDGET_LINE_'+(i+1)]=l?.label||'—';values['BUDGET_DETAIL_'+(i+1)]=l?l.quantity+' × '+euros(cents(l.unitPrice))+' · '+l.detail:'—';values['BUDGET_AMOUNT_'+(i+1)]=l?euros(Math.round(l.quantity*cents(l.unitPrice))):'—';}
  b.phases.forEach((p,i)=>{values['PHASE_'+(i+1)+'_DATES']=p.dates;values['PHASE_'+(i+1)+'_SCOPE']=p.scope;});
  for(const [i,key] of ['ALLOCATION_A','ALLOCATION_B'].entries()){const tasks=project.tasks.filter(t=>t.assignee===owners[i]);values[key]=tasks.length?tasks.length+' élément(s) : '+tasks.map(t=>t.scene||t.title).join(', '):'À attribuer dans le plan de production';}
  return values;
}
export const escapeXml=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'');
export async function buildBudgetPptx(values:Record<string,string>):Promise<{blob:Blob;shortened:string[]}>{
  const [{default:JSZip},template,manifest]=await Promise.all([import('jszip'),fetch('/atelier/budget/atelier-budget-template.pptx'),fetch('/atelier/budget/atelier-budget-template.json')]);
  if(!template.ok||!manifest.ok)throw new Error('Le modèle de présentation n’a pas pu être chargé.');
  const config=await manifest.json() as {fields:Record<string,{maxRecommendedCharacters:number;defaultValue:string}>};const zip=await JSZip.loadAsync(await template.arrayBuffer());const shortened:string[]=[];
  const safe:Record<string,string>={};for(const [key,field] of Object.entries(config.fields)){let value=(values[key]??field.defaultValue).replace(/\s+/g,' ').trim();if(value.length>field.maxRecommendedCharacters&&!/^BUDGET_AMOUNT|^BUDGET_TOTAL|^BUDGET_SUBTOTAL|^DISCOUNT$/.test(key)){value=value.slice(0,field.maxRecommendedCharacters-1)+'…';shortened.push(key);}safe[key]=escapeXml(value);}
  for(const name of Object.keys(zip.files).filter(n=>/^ppt\/slides\/slide\d+\.xml$/.test(n))){const xml=await zip.file(name)!.async('string');zip.file(name,xml.replace(/\{\{([A-Z_0-9]+)\}\}/g,(_,key)=>safe[key]??escapeXml('À confirmer')));}
  return {blob:await zip.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.presentationml.presentation',compression:'DEFLATE'}),shortened};
}
