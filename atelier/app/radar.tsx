'use client';
import {useEffect,useRef,useState} from 'react';
import {Radar,Network,Users,BriefcaseBusiness,ChartNoAxesCombined,FileText,Download,RefreshCw,Cloud,CloudOff,LoaderCircle} from 'lucide-react';

const views=[{id:'scanner',label:'Scanner',icon:Radar},{id:'map',label:'Toile',icon:Network},{id:'list',label:'Cibles',icon:Users},{id:'jobs',label:'Offres',icon:BriefcaseBusiness},{id:'audit',label:'Analyse',icon:ChartNoAxesCombined},{id:'report',label:'Rapport',icon:FileText}] as const;
type RadarView=typeof views[number]['id'];
export function RadarHub({agencyId,theme,readOnly,onPendingChange}:{agencyId:string;theme:'light'|'dark';readOnly:boolean;onPendingChange:(value:boolean)=>void}){
 const [view,setView]=useState<RadarView>('scanner'),[version,setVersion]=useState(0),[status,setStatus]=useState('loading'),[error,setError]=useState(''),[pending,setPending]=useState(false);
 const frame=useRef<HTMLIFrameElement>(null);
 const page=view==='scanner'?'scanner.html':view==='report'?'investment-report.html':'index.html';
 const src='/atelier/api/radar/ui/'+page+'?'+new URLSearchParams({agency:agencyId,theme,view}).toString();
 useEffect(()=>{setStatus('loading');setError('');},[src,version]);
 useEffect(()=>{function message(event:MessageEvent){if(event.origin!==window.location.origin||event.source!==frame.current?.contentWindow||event.data?.type!=='atelier:radar')return;if(!['saved','saving','error'].includes(event.data.status))return;setStatus(event.data.status);setPending(event.data.pending===true);onPendingChange(event.data.pending===true);setError(typeof event.data.message==='string'?event.data.message.slice(0,400):'');}window.addEventListener('message',message);return()=>window.removeEventListener('message',message);},[onPendingChange]);
 function backup(){frame.current?.contentWindow?.postMessage({type:'atelier:radar:export'},window.location.origin);}
 return <section className="radar-hub"><div className="page-heading"><div><span className="eyebrow">PROSPECTION & DÉVELOPPEMENT</span><h1>Radar</h1></div><div className="button-row"><span className={'radar-sync '+status} role="status">{status==='saved'?<Cloud size={15}/>:status==='error'?<CloudOff size={15}/>:<LoaderCircle size={15} className="spinner"/>}{status==='saved'?'Suivi partagé':status==='error'?pending?'À enregistrer':'À vérifier':status==='saving'?'Enregistrement…':'Chargement…'}</span><button className="icon-button" title="Exporter le suivi partagé" aria-label="Exporter le suivi Radar" onClick={()=>void backup()}><Download size={18}/></button><button className="icon-button" disabled={pending} title={pending?'Sauvegarde en cours':'Actualiser Radar'} aria-label="Actualiser Radar" onClick={()=>setVersion(v=>v+1)}><RefreshCw size={17}/></button></div></div>
 <nav className="radar-nav" aria-label="Outils Radar">{views.map(item=><button key={item.id} disabled={pending} className={view===item.id?'selected':''} aria-current={view===item.id?'page':undefined} onClick={()=>setView(item.id)}><item.icon size={17}/><span>{item.label}</span></button>)}</nav>
 {readOnly&&<p className="fineprint">Radar est en lecture seule pour ton profil.</p>}
 {error&&<div className="info-banner radar-error" role="alert"><CloudOff size={18}/><span>{error}</span><button className="text-action" onClick={()=>frame.current?.contentWindow?.postMessage({type:'atelier:radar:retry'},window.location.origin)}>Réessayer</button></div>}
 <iframe key={agencyId+':'+version} ref={frame} className="radar-frame" title={'Radar · '+views.find(v=>v.id===view)?.label} src={src}/>
 </section>;
}
