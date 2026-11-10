// Curated catalogue: no arbitrary URL ingestion, no login bypass, no outreach.
export const SOURCES=[
 {id:'framestore',company:'Framestore',kind:'recruitee',url:'https://framestore.recruitee.com/api/offers/',region:'Monde',size:'unknown'},
 {id:'dept',company:'DEPT',kind:'greenhouse',url:'https://boards-api.greenhouse.io/v1/boards/dept/jobs?content=true',region:'Monde',size:'large'},
 {id:'superside',company:'Superside',kind:'lever',url:'https://api.lever.co/v0/postings/superside?mode=json',region:'Monde',size:'unknown'},
 {id:'buck',company:'BUCK',kind:'buck',url:'https://buck.co/careers',region:'Monde',size:'unknown'},
 {id:'hornet',company:'Hornet',kind:'hornet',url:'https://www.hellohornet.com/careers',region:'Amériques',size:'unknown'},
 {id:'giantant',company:'Giant Ant',kind:'giantant',url:'https://www.giantant.ca/careers',region:'Amériques',size:'unknown'},
 {id:'dlabs',company:'D/Labs',kind:'dlabs',url:'https://www.d-labs.fr/offres',region:'France',size:'unknown'},
 {id:'yalp',company:'Yalp',kind:'yalp',url:'https://yalp-video.fr/recrutement/motiondesigner',region:'France',size:'unknown'},
 {id:'orple',company:'OrpleCG',kind:'orple',url:'https://orplecg.com/3d-animation-studio-jobs/',region:'Europe',size:'unknown'},
 {id:'fivestone',company:'Fivestone Studios',kind:'roster',url:'https://fivestonestudios.com/freelancers',region:'Amériques',size:'unknown'},
 {id:'fml',company:'Feed Me Light',kind:'roster',url:'https://feedmelight.com/about',region:'Monde',size:'unknown'}
];
export const ASSISTED=[
 {name:'LinkedIn Jobs et groupes métiers',url:'https://www.linkedin.com/jobs/',reason:'Accès connecté et groupes privés : lecture assistée uniquement. Rechercher freelance motion designer, 3D artist, video editor ; vérifier chaque employeur.'},
 {name:'Welcome to the Jungle',url:'https://www.welcometothejungle.com/fr/jobs',reason:'Recherche métiers vidéo / motion / 3D ; aucun accès API autorisé configuré.'},
 {name:'Malt',url:'https://www.malt.fr/',reason:'Contrats via compte professionnel ; aucune lecture des demandes privées.'},
 {name:'Upwork',url:'https://www.upwork.com/',reason:'Offres vidéo / animation / 3D à consulter dans le compte ; aucune promesse de collecte automatique.'}
];
export function plain(s=''){
 let x=String(s);const entities={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',rsquo:'’',lsquo:'‘',ldquo:'“',rdquo:'”',middot:'·',mdash:'—',ndash:'–'};
 for(let i=0;i<2;i++)x=x.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,(m,k)=>{if(k[0]==='#'){const n=parseInt(k.slice(k[1]?.toLowerCase()==='x'?2:1),k[1]?.toLowerCase()==='x'?16:10);return n>0&&n<=0x10ffff?String.fromCodePoint(n):' ';}return entities[k.toLowerCase()]??m;});
 return x.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
}
export function classify(title,description=''){
 const t=plain(title).toLowerCase(),d=plain(description).toLowerCase();
 if(/engineer|developer|développeur|software|sales|business develop|account executive|recruiter|human resource|finance|medical|internship|apprenti|apprentice|stagiaire|\bstage\b|product designer|ux designer|ui\/ux/.test(t)) return null;
 let discipline=/motion/.test(t)?'Motion':/\b3d\b|\bcg\b|cgi|blender|lighting|rigging|texture|lookdev|houdini/.test(t)?'3D':/animat|composit|vfx/.test(t)?'Animation':/video editor|vidéo|video|monteur|monteuse|editing/.test(t)?'Montage':/graphic|graphique|illustrat|concept artist|design director|art director/.test(t)?'Design':/production|producer/.test(t)&&/animation|video|film|creative|cgi|3d|motion/.test(d)?'Production':null;
 if(!discipline)return null;
 const contractText=t+' '+d;
 const contract=/roster|expression of interest|general opportunities|talent pool|spontan/.test(t)?'Roster':/freelance|independent contractor/.test(contractText)?'Freelance':/\bcdi\b|permanent|full.time|full_time/.test(contractText)?'Salarié':/\bcdd\b|fixed.term|\bftc\b/.test(contractText)?'CDD':/contract/.test(contractText)?'Contract à qualifier':'Non précisé';
 return {discipline,contract};
}
export function canonical(s){return plain(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();}
export function validDate(v){const d=v&&new Date(v);return d&&!isNaN(d)?d.toISOString():null;}
export function normalize(source,raw){
 const fit=classify(raw.title,raw.description);if(!fit)return null;
 let url;try{url=new URL(raw.url||source.url);if(url.protocol!=='https:')return null;}catch{return null;}
 if(raw.expiresAt&&validDate(raw.expiresAt)&&Date.parse(raw.expiresAt)<Date.now())return null;
 const text=plain(raw.description);
 const anchor=text.search(/about the role|what you(?:’|')ll do|responsibilities|the work\b|missions?\s*:|le poste|votre mission|who you are/i);
 return {...fit,company:source.company,sourceId:source.id,sourceUrl:source.url,title:plain(raw.title).slice(0,220),url:url.href,description:text.slice(0,5000),evidence:text.slice(Math.max(0,anchor),Math.max(0,anchor)+700),location:plain(raw.location||'Non précisé'),remote:raw.remote===true?'Oui':raw.remote===false?'Non':'À vérifier',publishedDate:validDate(raw.publishedDate),externalId:String(raw.id||''),size:source.size,region:source.region,restrictions:'Vérifier pays autorisés, langue, fuseau horaire et acceptation d’une agence.'};
}
export function parseSource(source,text){
 let rows=[],complete=true;
 if(source.kind==='recruitee'){const x=JSON.parse(text);if(!Array.isArray(x.offers))throw Error('Structure Recruitee modifiée');rows=x.offers.map(j=>({id:j.id,title:j.title,description:(j.description||'')+' '+(j.requirements||'')+' '+(j.employment_type_code||''),url:j.careers_url,location:[j.city,j.country].filter(Boolean).join(', '),remote:j.remote===true?true:j.hybrid?undefined:j.remote,publishedDate:j.published_at,expiresAt:j.close_at}));}
 else if(source.kind==='greenhouse'){const x=JSON.parse(text);if(!Array.isArray(x.jobs))throw Error('Structure Greenhouse modifiée');rows=x.jobs.map(j=>({id:j.id,title:j.title,description:j.content,url:j.absolute_url,location:j.location?.name,publishedDate:j.first_published}));}
 else if(source.kind==='lever'){const x=JSON.parse(text);if(!Array.isArray(x))throw Error('Structure Lever modifiée');if(x.length>=500)throw Error('Pagination à adapter : 500 résultats');rows=x.map(j=>({id:j.id,title:j.text,description:(j.descriptionPlain||j.description||'')+' '+JSON.stringify(j.categories||{}),url:j.hostedUrl,location:j.categories?.location,remote:j.workplaceType==='remote'?true:j.workplaceType==='on-site'?false:undefined}));}
 else if(source.kind==='dlabs'){
  const sections=[...text.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].filter(m=>/charg[eé]|illustrat|monteur|monteuse/i.test(plain(m[1])));
  rows=sections.map((m,i)=>({title:plain(m[1]),description:plain(text.slice(m.index,sections[i+1]?.index||text.length)),url:source.url}));if(!rows.length)throw Error('Structure D/Labs non reconnue');
 }else if(source.kind==='buck'){
  const m=text.match(/<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);if(!m)throw Error('Structure BUCK non reconnue');
  const modules=JSON.parse(m[1]).props?.pageProps?.page?.modules;
  if(!Array.isArray(modules)||!modules.some(m=>Array.isArray(m.jobs)))throw Error('Module de postes BUCK absent');
  rows=modules.flatMap(m=>m.jobs||[]).map(j=>({id:j.id,title:j.title,url:j.absoluteUrl,location:j.locationName,description:'Carte du board officiel. Détails du contrat et éligibilité à vérifier sur la page de candidature.'}));
 }else if(source.kind==='hornet'){
  const p=plain(text),title='Freelance Concept Artist',start=p.lastIndexOf('Hornet is seeking a Freelance Concept Artist');
  if(start<0||!/open positions/i.test(p))throw Error('Structure Hornet modifiée ; vérification requise');
  rows=[{title,description:p.slice(start,start+7000),url:source.url,location:'Remote — territoire à vérifier',remote:true}];complete=false;
 }else if(source.kind==='giantant'){
  const p=plain(text),start=p.indexOf('Junior 2D Animator');if(start<0)throw Error('Poste Giant Ant non reconnu');
  rows=[{title:'Junior 2D Animator (After Effects)',description:p.slice(start,start+1800),location:'Vancouver · hybride',url:source.url,remote:false}];complete=false;
 }else if(source.kind==='orple'){
  const p=plain(text);if(!/current opportunities/i.test(p))throw Error('Section offres Orple non reconnue');
  for(const pattern of [/3D Motion Artist\s*\(Blender\)/i,/2D Animator\s*\/\s*Compositor/i]){
   const m=p.match(pattern);if(m)rows.push({title:m[0],description:p.slice(m.index,Math.min(m.index+4300,p.indexOf('How to apply',m.index)>m.index?p.indexOf('How to apply',m.index):p.length)),url:source.url});
  }if(!rows.length)throw Error('Postes Orple non reconnus');complete=false;
 }else if(source.kind==='yalp'){
  const p=plain(text);if(!/motion\s*designer/i.test(p)||!/\bCDI\b/.test(p))throw Error('Poste Yalp non reconnu');rows=[{title:'Motion designer',description:'CDI. '+p.slice(Math.max(0,p.toLowerCase().indexOf('motion designer')),15000),url:source.url,location:'Rennes'}];complete=false;
 }else if(source.kind==='roster'){
  const p=plain(text);if(!/roster|talent log/i.test(p)||!/freelance/i.test(p))throw Error('Roster non reconnu');rows=[{title:'Roster freelance animation 2D / 3D',description:p,url:source.url}];complete=false;
 }else{
  complete=false;for(const m of text.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
   try{const walk=x=>{if(!x||typeof x!=='object')return;if(x['@type']==='JobPosting')rows.push({title:x.title,description:x.description,url:x.url||source.url,location:x.jobLocation?.address?.addressLocality,publishedDate:x.datePosted});for(const v of Object.values(x))if(typeof v==='object')Array.isArray(v)?v.forEach(walk):walk(v);};walk(JSON.parse(m[1]));}catch{}}
  if(!rows.length)throw Error('Aucune annonce structurée lisible ; contrôle manuel requis');
 }
 if(rows.length>500)throw Error('Limite de volume dépassée');
 return {rawCount:rows.length,jobs:rows.map(r=>normalize(source,r)).filter(Boolean),complete};
}
export async function collect(source,fetcher=fetch){
 const start=Date.now();try{
  const r=await fetcher(source.url,{redirect:'manual',headers:{Accept:'application/json,text/html;q=0.9','User-Agent':'ExplicitCreaOpportunityMonitor/1.0'},signal:AbortSignal.timeout(12000)});
  if(!r.ok)throw Error('HTTP '+r.status+(r.status>=300&&r.status<400?' — redirection à vérifier':''));
  if(Number(r.headers.get('content-length'))>2500000)throw Error('Réponse trop volumineuse');
  const reader=r.body.getReader();let bytes=0,chunks=[];while(true){const v=await reader.read();if(v.done)break;bytes+=v.value.length;if(bytes>2500000){await reader.cancel();throw Error('Réponse trop volumineuse');}chunks.push(v.value);}let buf=new Uint8Array(bytes),off=0;for(const c of chunks){buf.set(c,off);off+=c.length;}
  const result=parseSource(source,new TextDecoder().decode(buf));return {sourceId:source.id,status:'ok',...result,rejectedCount:result.rawCount-result.jobs.length,duration:Date.now()-start};
 }catch(e){return {sourceId:source.id,status:'error',error:String(e.message).slice(0,250),jobs:[],complete:false,duration:Date.now()-start};}
}
export function hypotheses(jobs){
 const groups=Object.groupBy?Object.groupBy(jobs,j=>j.company):jobs.reduce((a,j)=>((a[j.company]??=[]).push(j),a),{});
 return Object.entries(groups).flatMap(([company,js])=>{
  const ds=[...new Set(js.filter(j=>j.contract!=='Roster').map(j=>j.discipline))];
  return ds.length>=2?[{company,rule:'multi-disciplines-v1',fact:ds.length+' disciplines observées : '+ds.join(', '),interpretation:'Une coordination de spécialistes pourrait être utile. Cela ne prouve ni sous-effectif, ni budget, ni volonté d’externaliser.',offer:'Proposer un renfort coordonné après qualification.',question:'Ces recrutements couvrent-ils des projets simultanés et acceptez-vous une équipe externe ?',confidence:'À confirmer',evidence:js.map(j=>({title:j.title,url:j.url}))}]:[];
 });
}
