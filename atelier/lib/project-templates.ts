import { newWorkflow, projectSchema, uid, plusDays, today, configureProject, type Project } from './studio.ts';
import { templateSchema, type ProjectTemplate } from './workspace-extras.ts';
const flow=(service:Parameters<typeof newWorkflow>[0],count:number,steps?:string[])=>({...newWorkflow(service),count,...(steps?{steps}:{})});
export const BUILTIN_TEMPLATES:ProjectTemplate[]=[
  {id:'mcskyz',name:'McSkyz · documentaire 3D',description:'PDF client, scènes détaillées, décors mutualisés et répartition à deux.',workflows:[flow('3d',1)],notes:'Références et actions par scène. Les décors sont regroupés après lecture du brief.'},
  {id:'youtube',name:'Montage YouTube',description:'Dérush, montage, habillage, étalonnage et livraison.',workflows:[flow('montage',1,['derush','montage','habillage','etalo','export','validation'])],notes:'Livrables : master 16:9, miniature et sous-titres à confirmer.'},
  {id:'motion-brand',name:'Film motion design',description:'Du storyboard aux styleframes, puis animation et son.',workflows:[flow('motion',3,['board','design','anim','compo','render','validation']),flow('sfx',1)],notes:'Valider le storyboard et la direction artistique avant animation.'},
  {id:'social',name:'Pack réseaux sociaux',description:'Six vidéos, dérush partagé et déclinaisons de formats.',workflows:[flow('montage',6),flow('motion',6,['design','anim','decli','render','validation'])],notes:'Préciser pour chaque livrable : ratio, durée, sous-titres, plateforme.'},
  {id:'assets',name:'Bibliothèque d’assets 3D',description:'Modèles, textures, éclairage et contrôle qualité.',workflows:[{...flow('3d',5,['decor','light','render','validation']),mode:'asset'}],notes:'Préciser formats, échelle, nomenclature, textures et variantes.'},
  {id:'sound',name:'Sound design & mixage',description:'Recherche sonore, bruitages, design, mixage et export.',workflows:[flow('sfx',1,['recherche','bruitage','design','mix','export','validation'])],notes:'Livrables : mix final et stems, niveau cible à préciser.'},
  {id:'hybrid',name:'Documentaire hybride',description:'Scènes 3D, montage, motion et finitions dans une production.',workflows:[flow('3d',8),flow('montage',1),flow('motion',3),flow('post',1)],notes:'Une validation client par métier et un contrôle final commun.'},
];
export function projectFromTemplate(t:ProjectTemplate):Project{
  return {...projectSchema.parse({id:uid(),title:'Nouvelle production',client:'Client à préciser',kind:t.workflows.map(f=>f.service).join(' · '),color:'violet',billable:true,budget:0,externalCosts:0,received:0,deadline:plusDays(today(),14),status:'active',notes:t.notes,link:'',demo:false,tasks:[],workflows:t.workflows.map(f=>({...f,assignee:'',assignments:{}}))}),title:'',client:''};
}
export function templateFromProject(p:Project,name:string):ProjectTemplate{
  return templateSchema.parse({id:uid(),name,description:'Parcours enregistré depuis '+p.title,notes:'',workflows:p.workflows.map(f=>({...f,assignee:'',assignments:{}}))});
}
