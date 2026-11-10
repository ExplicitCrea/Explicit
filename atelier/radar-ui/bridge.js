(function(){
 'use strict';
 const config=window.ATELIER_RADAR,clone=v=>JSON.parse(JSON.stringify(v));
 const notify=(status,message='')=>window.parent.postMessage({type:'atelier:radar',status,message,pending:dirty||!!inFlight},location.origin);
 const api=action=>'/atelier/api/radar/'+action+'?agency='+encodeURIComponent(config.agencyId);
 async function json(action,options){const r=await fetch(api(action),{cache:'no-store',...options});let data;try{data=await r.json();}catch{throw Error('Réponse Radar illisible. Réessaie dans un instant.');}if(!r.ok){const error=new Error(data.error||'Radar indisponible.');error.status=r.status;throw error;}return data;}
 let snapshot=null,desired=null,inFlight=null,dirty=false;
 const ready=json('state').then(value=>{snapshot=value;desired=clone(value.state);notify('saved');return value;}).catch(error=>{notify('error',error.message);throw error;});
 async function flush(){
  await ready;
  if(config.readOnly)throw Error('Ton accès Radar est en lecture seule.');
  notify('saving');
  while(dirty){
   dirty=false;const sent=clone(desired);let target=clone(sent);
   for(let attempt=0;attempt<3;attempt++){
    try{
     const saved=await json('state',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:target,revision:snapshot.revision})});
     const pending=window.RadarStateTools.mergeStates(sent,desired,saved.state);snapshot=saved;desired=pending.state;
     break;
    }catch(error){
     if(error.status!==409||attempt===2){dirty=true;throw error;}
     const remote=await json('state'),merged=window.RadarStateTools.mergeStates(snapshot.state,target,remote.state);
     if(merged.conflicts.length){dirty=true;throw Error('Un collaborateur a modifié le même champ. Exporte ta copie avant de recharger Radar.');}
     snapshot=remote;target=merged.state;
    }
   }
  }
  return clone(snapshot.state);
 }
 function save(part){
  return ready.then(()=>{
   const next={...desired,...clone(part)};if(JSON.stringify(next)===JSON.stringify(desired)&&!dirty)return inFlight||clone(snapshot.state);
   desired=next;dirty=true;
   if(!inFlight)inFlight=flush().catch(error=>{notify('error',error.message);throw error;}).finally(()=>{inFlight=null;if(!dirty)notify('saved');});
   return inFlight;
  });
 }
 const readonly=()=>{if(!config.readOnly)return;for(const el of document.querySelectorAll('#status,#notes,#quickStatus,#quickNotes,[data-q],#saveQualification,#trackingFile,#restoreTracking'))el.disabled=true;};
 new MutationObserver(readonly).observe(document.documentElement,{childList:true,subtree:true});
 window.addEventListener('beforeunload',event=>{if(dirty||inFlight){event.preventDefault();event.returnValue='';}});
 window.addEventListener('message',event=>{
  if(event.origin!==location.origin||event.source!==parent)return;
  if(event.data?.type==='atelier:radar:retry'&&dirty&&!inFlight)save({}).catch(()=>{});
  if(event.data?.type==='atelier:radar:export')ready.then(()=>{const blob=new Blob([JSON.stringify({...desired,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='Atelier_Radar_suivi.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}).catch(error=>notify('error',error.message));
 });
 document.addEventListener('DOMContentLoaded',()=>{
  readonly();
  for(const link of document.querySelectorAll('a[href]')){
   const original=link.getAttribute('href');
   const page={'/':'index.html','/scanner.html':'scanner.html','/investment-report.html':'investment-report.html'}[original];
   if(page)link.href='/atelier/api/radar/ui/'+page+'?agency='+encodeURIComponent(config.agencyId)+'&theme='+config.theme;
  }
 });
 window.AtelierRadar={ready,save,json,api,notify};
})();
