/* Public-evidence routes and radial graph. Hiring never implies willingness to outsource. */
(function(root){
 'use strict';
 const fold=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 function jobs(a){return a.jobs||[]}
 function available(j,now=new Date()){const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(now));const age=(new Date(day+'T00:00:00Z')-new Date(j.observed+'T00:00:00Z'))/86400000;return ['open','listed'].includes(j.availability)&&age>=0&&age<=30}
 function roster(j){return j.contract==='Roster'}
 function freelance(j){return ['Freelance','Contract'].includes(j.contract)}
 function hiring(a,now){return jobs(a).filter(j=>available(j,now)&&!roster(j))}
 function soloEvidence(a,now){return jobs(a).filter(j=>available(j,now)&&(freelance(j)||roster(j)))}
 function kind(a){if(a.buyerType==='Marque / équipe interne')return 'brand';return /studio|production|animation|post.?production/.test(fold(a.kind))?'production':'agency'}
 function offer(a){const text=fold([a.kind,...a.capabilities].join(' '));return {solo:a.collaboration?.solo??/production|motion|3d|animation|montage|design|social|creativ/.test(text),team:a.collaboration?.team??/production|studio|creativ|campaign|campagne|agency|agence/.test(text)}}
 function route(a,now=new Date()){const live=hiring(a,now),f=soloEvidence(a,now);return f.some(j=>!roster(j))?'Mission freelance repérée':live.length?'Recrutement publié':f.length?'Appel permanent à talents':a.external?'Recours externe documenté':'Besoin à qualifier'}
 const servicePatterns={'3D':/3d|cgi|vfx|model|rig|render/,'Animation':/animation|animateur|animator/,'Montage':/montage|editor|editing|post.?production/,'Motion':/motion/,'Design':/design|graphis|illustrat|branding/,'Social':/social|influence|contenu|content/};
 function jobMatches(j,f={},now=new Date()){if(!available(j,now))return false;if(f.contract&&j.contract!==f.contract)return false;if(f.signal==='hiring'&&roster(j))return false;if((f.signal==='freelance'||f.mode==='freelance')&&!freelance(j))return false;if(f.signal==='roster'&&!roster(j))return false;if(f.remote&&!/oui|remote|distanciel|hybride|teletravail/.test(fold((j.remote||'')+' '+(j.remoteNote||''))))return false;if(f.service&&servicePatterns[f.service]&&!servicePatterns[f.service].test(fold([j.title,j.discipline,...(j.disciplines||[])].join(' '))))return false;return true}
 function matches(a,f={},now=new Date()){
  const h=a.headcount||{},oo=offer(a),jj=jobs(a);
  if(f.region&&a.region!==f.region)return false;
  if(f.size==='micro'&&!(h.max&&h.max<=10))return false;
  if(f.size==='small'&&!(h.max&&h.max<=50))return false;
  if(f.size==='11-50'&&!(h.min>=11&&h.max<=50))return false;
  if(f.size==='medium'&&!(h.min>=51&&h.max<=200))return false;
  if(f.size==='large'&&!(h.min>200))return false;
  if(f.size==='unknown'&&h.min!=null)return false;
  if(f.kind&&kind(a)!==f.kind)return false;
  if(f.mode==='solo'&&!oo.solo)return false;if(f.mode==='team'&&!oo.team)return false;
  if(f.mode==='freelance'&&!soloEvidence(a,now).some(j=>!roster(j)))return false;
  if(f.signal==='hiring'&&!hiring(a,now).length)return false;
  if(f.signal==='freelance'&&!soloEvidence(a,now).some(j=>!roster(j)))return false;
  if(f.signal==='roster'&&!soloEvidence(a,now).some(roster))return false;
  if(f.signal==='external'&&!a.external)return false;
  if(f.signal==='confirmed'&&!a.assessment?.need)return false;
  if(f.service){const p={'3D':/3d|cgi|vfx|model|rig|render/,'Animation':/animation|animateur|animator/,'Montage':/montage|editor|editing|post.?production/,'Motion':/motion/,'Design':/design|graphis|illustrat|branding/,'Social':/social|influence|contenu|content/};const text=fold([...(a.capabilities||[]),...jj.map(j=>j.title+' '+j.discipline)].join(' '));if(p[f.service]&&!p[f.service].test(text))return false;}
  if((f.contract||f.remote||f.mode==='freelance'||['hiring','freelance','roster'].includes(f.signal))&&!jj.some(j=>jobMatches(j,f,now)))return false;
  if(f.remote&&!jj.some(j=>available(j,now)&&/oui|remote|distanciel|hybride|teletravail/i.test(fold((j.remote||'')+' '+(j.remoteNote||'')))))return false;
  if(f.externalOnly&&!a.external)return false;if(f.readyOnly&&!a.assessment?.ready)return false;
  if(f.q){const text=fold([a.name,a.country,a.city,a.kind,...a.capabilities,...a.sectors,...a.clients.map(c=>c.name),...jj.map(j=>j.title+' '+j.location),a.opportunity?.offer].join(' '));if(!text.includes(fold(f.q)))return false}
  return true;
 }
 function compare(a,b,now=new Date()){const x=a.assessment,y=b.assessment;const tier=y.priorityTier-x.priorityTier;if(x.ready||y.ready||x.blocked||y.blocked||x.stage==='Client acquis'||y.stage==='Client acquis')return root.RadarModel.compare(a,b);if(x.need!==y.need)return x.need?-1:1;if(x.economicFailure||x.capacityFailure||y.economicFailure||y.capacityFailure)return root.RadarModel.compare(a,b);const weight=c=>soloEvidence(c,now).some(j=>!roster(j))?3:hiring(c,now).length?2:soloEvidence(c,now).length?1:0;return weight(b)-weight(a)||(Number(!!a.outsourcingCounterSignal)-Number(!!b.outsourcingCounterSignal))||root.RadarModel.compare(a,b)}
 function choose(visible,limit=12,focusId){const out=visible.slice(0,limit||visible.length);const focus=visible.find(a=>a.id===focusId);if(focus&&!out.some(a=>a.id===focusId)){if(limit&&out.length>=limit)out.pop();out.unshift(focus)}return out}
 function layout({agencies,brands,partners,visible,limit=12,focusId=null,references=false,now=new Date()}){
  const drawn=choose(visible,limit,focusId),ids=new Set(drawn.map(a=>a.id)),nodes=[],edges=[];
  // All company records remain selectable, including those outside the display limit.
  agencies.forEach(a=>{a.x=0;a.y=0;a.r=128;a.w=226;a.h=116;nodes.push(a)});
  const rings=[];for(let offset=0,ring=0;offset<drawn.length;ring++){const count=Math.min(12+ring*6,drawn.length-offset),rx=640+ring*430,ry=360+ring*290;rings.push({rx,ry});for(let i=0;i<count;i++){const a=drawn[offset+i],angle=-Math.PI/2+2*Math.PI*i/count;Object.assign(a,{x:Math.cos(angle)*rx,y:Math.sin(angle)*ry,angle});edges.push({from:'explicit',to:a.id,type:'recommended'});}offset+=count}
  const explicit={id:'explicit',name:'Explicit Crea',type:'explicit',x:0,y:0,r:95};nodes.push(explicit);
  const focus=drawn.find(a=>a.id===focusId),focusAngle=focus?.angle||0;
  const bset=new Set();if(references)drawn.forEach(a=>(a.clientIds||[]).forEach(id=>bset.add(id)));else if(focus)(focus.clientIds||[]).forEach(id=>bset.add(id));
  const bb=brands.filter(b=>bset.has(b.id));const brx=1000+(rings.length-1)*430,bry=660+(rings.length-1)*290;
  bb.forEach((b,i)=>{const theta=focus&&!references?focusAngle+(i-(bb.length-1)/2)*.23:-Math.PI/2+2*Math.PI*(i%36)/Math.min(36,bb.length-Math.floor(i/36)*36);const br=references?Math.floor(i/36):0;Object.assign(b,{x:Math.cos(theta)*(brx+br*320),y:Math.sin(theta)*(bry+br*250),r:90,w:170,h:80});nodes.push(b);for(const a of drawn)if(a.clientIds?.includes(b.id))edges.push({from:a.id,to:b.id,type:'documented',url:a.clients.find(c=>'brand-'+root.RadarWeb.slug(c.name)===b.id)?.url})});
  const pp=partners.filter(p=>(references||focus)&&p.connections.some(id=>ids.has(id)&&(references||id===focus?.id)));pp.forEach((p,i)=>{const theta=focusAngle+.7+i*.2;Object.assign(p,{x:Math.cos(theta)*(brx+180),y:Math.sin(theta)*(bry+180),r:100,w:190,h:86});nodes.push(p);p.evidence.filter(e=>ids.has(e.agencyId)).forEach(e=>edges.push({from:e.agencyId,to:p.id,type:'partnership',url:e.url}))});
  const jnodes=[];if(focus){const jj=jobs(focus).filter(j=>available(j,now));jj.forEach((j,i)=>{const theta=focusAngle-.85-i*.23;const node={...j,id:'job-'+focus.id+'-'+j.id,name:j.title,type:'job',agencyId:focus.id,x:Math.cos(theta)*(brx+230),y:Math.sin(theta)*(bry+160),r:120,w:228,h:108};nodes.push(node);jnodes.push(node);edges.push({from:focus.id,to:node.id,type:'hiring',url:j.url})})}
  const placed=[explicit,...drawn];for(const n of [...bb,...pp,...jnodes]){let tries=0;const theta=Math.atan2(n.y,n.x);while(placed.some(p=>Math.abs(p.x-n.x)<((p.w||p.r*2)+(n.w||n.r*2))/2+18&&Math.abs(p.y-n.y)<((p.h||p.r*2)+(n.h||n.r*2))/2+18)&&tries++<100){n.x+=Math.cos(theta)*90;n.y+=Math.sin(theta)*90}placed.push(n)}
  const activeIds=new Set(['explicit',...drawn.map(a=>a.id),...bb.map(b=>b.id),...pp.map(p=>p.id),...jnodes.map(j=>j.id)]);
  return {nodes,edges,activeIds,drawn,rings};
 }
 const slug=s=>fold(s).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 root.RadarWeb={jobs,available,roster,freelance,hiring,soloEvidence,kind,offer,route,matches,jobMatches,compare,choose,layout,slug};
})(globalThis);
