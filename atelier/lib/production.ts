import { z } from 'zod';

export const serviceIds=['3d','montage','motion','sfx','post'] as const;
export const unitIds=['scene','sequence','video','fx','asset','livrable'] as const;
export const unitLabels:Record<string,string>={scene:'scène',sequence:'séquence',video:'vidéo',fx:'FX',asset:'asset',livrable:'livrable'};
export const palette=['#a7c96b','#aa8cdb','#76b3d6','#e0a479','#d6799c','#70bca6','#d0ba65','#8b9bcf'];
export const profileSchema=z.object({id:z.string().min(1).max(180),name:z.string().trim().min(1).max(80),role:z.string().trim().min(1).max(140),color:z.string().regex(/^#[0-9a-fA-F]{6}$/),scope:z.enum(['internal','external']),capacity:z.number().min(0).max(1000).default(10),active:z.boolean().default(true)});
export type Profile=z.infer<typeof profileSchema>;
export function defaultProfiles():Profile[]{return [{id:'louis',name:'Louis',role:'Direction · animation · 3D',color:palette[0],scope:'internal',capacity:10,active:true},{id:'vincent',name:'Vincent',role:'Animation · production 3D',color:palette[1],scope:'internal',capacity:10,active:true}];}
export const SERVICES:{id:typeof serviceIds[number];label:string;short:string;description:string;modes:typeof unitIds[number][];steps:{key:string;label:string}[]}[]=[
  {id:'3d',label:'Création 3D',short:'3D',description:'Scènes, FX ou assets',modes:['scene','fx','asset'],steps:[{key:'prepa',label:'Préparation / storyboard'},{key:'decor',label:'Décors & modélisation'},{key:'perso',label:'Personnages / rig'},{key:'anim',label:'Animation'},{key:'fx',label:'FX / simulation'},{key:'light',label:'Lighting'},{key:'render',label:'Rendu'},{key:'compo',label:'Compositing'},{key:'validation',label:'Validation finale'}]},
  {id:'montage',label:'Création montage',short:'Montage',description:'Dérush, montage et finitions',modes:['video','sequence'],steps:[{key:'derush',label:'Dérush'},{key:'montage',label:'Montage'},{key:'habillage',label:'Habillage'},{key:'etalo',label:'Étalonnage'},{key:'st',label:'Sous-titres'},{key:'export',label:'Export & vérification'},{key:'validation',label:'Validation finale'}]},
  {id:'motion',label:'Création motion',short:'Motion design',description:'Design et animation graphique',modes:['sequence','video','livrable'],steps:[{key:'board',label:'Storyboard'},{key:'design',label:'Design / styleframes'},{key:'anim',label:'Animation motion'},{key:'compo',label:'Compositing'},{key:'decli',label:'Déclinaisons de formats'},{key:'render',label:'Rendu / export'},{key:'validation',label:'Validation finale'}]},
  {id:'sfx',label:'Création SFX / audio',short:'SFX / audio',description:'Bruitages, sound design et mix',modes:['video','sequence','fx'],steps:[{key:'recherche',label:'Recherche sonore'},{key:'bruitage',label:'Bruitages'},{key:'design',label:'Sound design'},{key:'music',label:'Musique'},{key:'mix',label:'Mixage'},{key:'export',label:'Export audio'},{key:'validation',label:'Validation finale'}]},
  {id:'post',label:'Postproduction',short:'Postproduction',description:'Assemblage et livraison',modes:['video','livrable'],steps:[{key:'confo',label:'Conformation'},{key:'compo',label:'Compositing / VFX'},{key:'etalo',label:'Étalonnage final'},{key:'qc',label:'Contrôle qualité'},{key:'decli',label:'Déclinaisons'},{key:'delivery',label:'Livraison'}]},
];
export type ServiceId=typeof serviceIds[number];
export const serviceLabel=(id:string)=>SERVICES.find(s=>s.id===id)?.short??id;
export const workflowSchema=z.object({service:z.enum(serviceIds),mode:z.enum(unitIds),count:z.number().int().min(0).max(100),steps:z.array(z.string().min(1).max(80)).min(1).max(20),assignee:z.string().max(180).default(''),assignments:z.record(z.string().max(180)).default({})});
export type Workflow=z.infer<typeof workflowSchema>;
export const stepSchema=z.object({id:z.string().min(1).max(180),key:z.string().max(80),label:z.string().trim().min(1).max(180),done:z.boolean(),assignee:z.string().max(180).default(''),indication:z.string().max(3000).default(''),doneAt:z.string().max(50).default('')});
export type ProductionStep=z.infer<typeof stepSchema>;
export const IDEAS=[
 {id:1,title:'Les retours inclus dans la commande',description:'Suivre les allers-retours convenus et préparer un avenant quand les corrections dépassent le périmètre.'},
 {id:2,title:'Les questions de brief',description:'Repérer les informations manquantes dans un brief et préparer les questions à faire valider au client.'},
 {id:3,title:'Les disponibilités de l’équipe',description:'Voir les congés et engagements de chacun avant de promettre une nouvelle date de livraison.'},
 {id:4,title:'Le simulateur de planning',description:'Tester l’effet de scènes supplémentaires, d’un retard ou d’un renfort avant de modifier la production.'},
 {id:5,title:'Le contrôle qualité des médias',description:'Vérifier résolution, cadence, durée, codec et niveau audio des fichiers avant leur livraison.'},
 {id:6,title:'Le registre des licences',description:'Associer aux musiques, polices et assets leurs droits, justificatifs et limites de réutilisation.'},
 {id:7,title:'La recherche visuelle d’assets',description:'Retrouver un décor, une matière ou un personnage depuis une image de référence ou une description.'},
 {id:8,title:'La mémoire de chaque client',description:'Conserver ses préférences de cadrage, de style, de formats et ses habitudes de validation.'},
 {id:9,title:'Le bilan de rentabilité',description:'Comparer budget, achats, prestations et paiements pour comprendre la marge de chaque production.'},
 {id:10,title:'Le suivi des achats du studio',description:'Relier rendus cloud, logiciels, abonnements et achats d’assets aux productions qui les utilisent.'},
];
