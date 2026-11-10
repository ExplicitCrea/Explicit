import {radarStateSchema,emptyRadarState,type RadarDatabase,type RadarState,type Statement,type ScanSnapshot,type ScanJob} from './types.ts';
import {SOURCES,ASSISTED,collect,canonical,hypotheses} from './collector.mjs';
import catalogue from './catalogue.json' with {type:'json'};

const parse=(v:any)=>typeof v==='string'?JSON.parse(v):v;
export async function loadRadarState(db:RadarDatabase,agencyId:string){
 await db.query('INSERT INTO atelier_radar_state(agency_id,content,revision,updated_at) VALUES($1,$2::jsonb,0,$3) ON CONFLICT DO NOTHING',[agencyId,JSON.stringify(emptyRadarState()),new Date().toISOString()]);
 const [row]=await db.query('SELECT content,revision FROM atelier_radar_state WHERE agency_id=$1',[agencyId]);
 return {state:radarStateSchema.parse(parse(row.content)),revision:Number(row.revision)};
}
export async function saveRadarState(db:RadarDatabase,agencyId:string,state:RadarState,revision:number){
 const checked=radarStateSchema.parse(state);
 const rows=await db.query('UPDATE atelier_radar_state SET content=$1::jsonb,revision=revision+1,updated_at=$2 WHERE agency_id=$3 AND revision=$4 RETURNING revision',[JSON.stringify(checked),new Date().toISOString(),agencyId,revision]);
 return rows.length?{state:checked,revision:Number(rows[0].revision)}:null;
}
const companyIds:Record<string,string>={orple:'orple-cg',dlabs:'d-labs-visual',yalp:'yalp-video',giantant:'giant-ant',hornet:'hornet',fivestone:'fivestone-studios',fml:'eu-feed-me-light'};
export async function scanSnapshot(db:RadarDatabase,agencyId:string):Promise<ScanSnapshot>{
 const [runs,jobs,counts]=await Promise.all([
  db.query('SELECT * FROM atelier_radar_runs WHERE agency_id=$1 ORDER BY started_at DESC LIMIT 24',[agencyId]),
  db.query('SELECT * FROM atelier_radar_jobs WHERE agency_id=$1 ORDER BY last_seen DESC LIMIT 2000',[agencyId]),
  db.query('SELECT count(*)::int AS n FROM atelier_radar_jobs WHERE agency_id=$1',[agencyId]),
 ]);
 const sourceRows=runs[0]?await db.query('SELECT data_json FROM atelier_radar_source_runs WHERE agency_id=$1 AND run_id=$2',[agencyId,runs[0].id]):[];
 const mapped=jobs.map(row=>{const job=parse(row.data_json),agency=catalogue.agencies.find(a=>a.id===companyIds[job.sourceId]);return {...job,id:row.id,firstSeen:row.first_seen,lastSeen:row.last_seen,status:row.status==='observed'&&Date.now()-Date.parse(row.last_seen)>30*86400000?'stale':row.status,missingCount:row.missing_count,headcount:agency?.headcount||null,companyGraphId:agency?.id||'scan-'+job.sourceId} as ScanJob;});
 return {sources:SOURCES,assisted:ASSISTED,runs:runs.map(r=>({...r,agency_id:undefined,report:r.report_json?parse(r.report_json):null,report_json:undefined})),sourceRuns:sourceRows.map(r=>parse(r.data_json)),jobs:mapped,hypotheses:hypotheses(mapped.filter(j=>j.status==='observed')),scope:'Sources métier publiques FR/EN. Budget et acceptation d’une agence restent à qualifier.',limits:{jobs:2000,total:Number(counts[0].n)}};
}
export function networkSnapshot(snapshot:ScanSnapshot){
 const data:any=structuredClone(catalogue);
 for(const source of SOURCES){
  const jobs=snapshot.jobs.filter(j=>j.sourceId===source.id),collected=snapshot.sourceRuns.some(r=>r.sourceId===source.id&&r.status==='ok');
  let agency=data.agencies.find((a:any)=>a.id===companyIds[source.id]);
  if(!agency&&jobs.length){agency={id:'scan-'+source.id,name:source.company,country:'Multibureaux · voir chaque annonce',region:source.region,city:'Selon annonce',website:source.url,linkedin:'',kind:'Studio / employeur créatif',languages:['EN'],sectors:[],capabilities:[...new Set(jobs.map(j=>j.discipline))],headcount:{range:'Non documenté',min:null,max:null},team:{observedRoles:[],missingEvidence:'Non établi'},clients:[],signals:[],opportunity:{offer:'Renfort métier à qualifier',buyerRoles:['Production','Direction créative'],rationale:'Offres publiques observées.'},collaboration:{solo:true,team:true},budgetStatus:'Inconnu',capacityGapStatus:'Non établi'};data.agencies.push(agency);}
  if(agency&&(collected||jobs.length))agency.jobs=jobs.map(j=>({...j,sourceBoardUrl:j.sourceUrl,observed:j.lastSeen.slice(0,10),availability:j.status==='observed'?'listed':'à vérifier',soloRelevant:j.contract==='Freelance'||j.contract==='Roster',teamRelevant:false,teamNote:'Achat à une équipe à qualifier.'}));
 }
 data.scan={lastRun:snapshot.runs[0]||null,note:'Références et effectifs issus du relevé du 03/11 ; offres actualisées par le scanner.'};
 data.notice=snapshot.notice||'';return data;
}
export async function runRadarScan(db:RadarDatabase,agencyId:string,trigger='manual',collector:typeof collect=collect){
 const now=new Date().toISOString(),id=crypto.randomUUID();
 await db.query("UPDATE atelier_radar_runs SET status='interrupted',finished_at=$1 WHERE agency_id=$2 AND status='running' AND started_at<$3",[now,agencyId,new Date(Date.now()-180000).toISOString()]);
 try{await db.query("INSERT INTO atelier_radar_runs(agency_id,id,status,started_at,trigger_name,origin) VALUES($1,$2,'running',$3,$4,'atelier')",[agencyId,id,now,trigger]);}
 catch(error){const active=await db.query("SELECT id,started_at FROM atelier_radar_runs WHERE agency_id=$1 AND status='running'",[agencyId]);if(active[0])return {running:true,...active[0]};throw error;}
 try{
  const results:any[]=[];for(let i=0;i<SOURCES.length;i+=3)results.push(...await Promise.all(SOURCES.slice(i,i+3).map(source=>collector(source))));
  const before=await db.query('SELECT id,data_json FROM atelier_radar_jobs WHERE agency_id=$1',[agencyId]);
  const known=new Map(before.map(r=>[r.id,parse(r.data_json)]));const statements:Statement[]=[];let added=0,changed=0,observed=0;
  for(const result of results){
   const ids=new Set<string>();
   for(const job of result.jobs){
    const key=canonical(job.company)+'|'+canonical(job.title)+'|'+canonical(job.location);
    const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(key));const jobId=Array.from(new Uint8Array(bytes)).map(x=>x.toString(16).padStart(2,'0')).join('');
    if(ids.has(jobId))continue;ids.add(jobId);observed++;
    const old=known.get(jobId);if(!old)added++;else if(old.description!==job.description||old.contract!==job.contract)changed++;
    statements.push({text:"INSERT INTO atelier_radar_jobs(agency_id,id,source_id,company,title,data_json,first_seen,last_seen,missing_count,status,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$7,0,'observed',$7) ON CONFLICT(agency_id,id) DO UPDATE SET data_json=excluded.data_json,last_seen=excluded.last_seen,missing_count=0,status='observed',updated_at=excluded.updated_at",args:[agencyId,jobId,job.sourceId,job.company,job.title,JSON.stringify(job),now]});
   }
   if(result.status==='ok'&&result.complete)for(const old of before.filter(r=>parse(r.data_json).sourceId===result.sourceId&&!ids.has(r.id)))statements.push({text:"UPDATE atelier_radar_jobs SET missing_count=missing_count+1,status=CASE WHEN missing_count+1>=2 THEN 'not_seen' ELSE 'to_recheck' END,updated_at=$1 WHERE agency_id=$2 AND id=$3",args:[now,agencyId,old.id]});
   statements.push({text:'INSERT INTO atelier_radar_source_runs(agency_id,run_id,source_id,status,data_json) VALUES($1,$2,$3,$4,$5)',args:[agencyId,id,result.sourceId,result.status,JSON.stringify({...result,jobs:undefined,observedAt:now})]});
  }
  for(let i=0;i<statements.length;i+=75)await db.batch(statements.slice(i,i+75));
  const failed=results.filter(r=>r.status!=='ok'),report={observed,new:added,changed,successfulSources:results.length-failed.length,totalSources:results.length,rejected:results.reduce((n,r)=>n+(r.rejectedCount||0),0),errors:failed.map(r=>({source:r.sourceId,error:r.error})),note:'Présence observée, sans candidature ni prise de contact.'};
  await db.query('UPDATE atelier_radar_runs SET status=$1,finished_at=$2,report_json=$3 WHERE agency_id=$4 AND id=$5',[failed.length===results.length?'failed':failed.length?'partial':'completed',new Date().toISOString(),JSON.stringify(report),agencyId,id]);
  return {id,...report};
 }catch(error){await db.query("UPDATE atelier_radar_runs SET status='failed',finished_at=$1,report_json=$2 WHERE agency_id=$3 AND id=$4",[new Date().toISOString(),JSON.stringify({error:'La collecte a été interrompue.'}),agencyId,id]);throw error;}
}

// Called only for the historical Explicit Crea workspace. Imports are monotonic:
// a stale legacy snapshot cannot overwrite a more recent scan made in Atelier.
export async function importLegacySnapshot(db:RadarDatabase,agencyId:string,snapshot:ScanSnapshot){
 if(!Array.isArray(snapshot.jobs)||!Array.isArray(snapshot.runs)||!Array.isArray(snapshot.sourceRuns))throw new Error('Historique Radar invalide');
 const latest=snapshot.runs[0],version=latest?.started_at;if(!version||!Number.isFinite(Date.parse(version)))return;
 const statements:Statement[]=[];
 for(const run of snapshot.runs)statements.push({text:"INSERT INTO atelier_radar_runs(agency_id,id,status,started_at,finished_at,trigger_name,report_json,origin) VALUES($1,$2,$3,$4,$5,$6,$7,'radar') ON CONFLICT(agency_id,id) DO UPDATE SET status=excluded.status,finished_at=excluded.finished_at,report_json=excluded.report_json",args:[agencyId,run.id,run.status,run.started_at,run.finished_at||null,run.trigger_name,run.report?JSON.stringify(run.report):null]});
 for(const job of snapshot.jobs)statements.push({text:'INSERT INTO atelier_radar_jobs(agency_id,id,source_id,company,title,data_json,first_seen,last_seen,missing_count,status,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT(agency_id,id) DO UPDATE SET data_json=excluded.data_json,last_seen=excluded.last_seen,missing_count=excluded.missing_count,status=excluded.status,updated_at=excluded.updated_at WHERE atelier_radar_jobs.updated_at<excluded.updated_at',args:[agencyId,job.id,job.sourceId,job.company,job.title,JSON.stringify(job),job.firstSeen,job.lastSeen,job.missingCount||0,job.status,version]});
 for(const source of snapshot.sourceRuns)statements.push({text:'INSERT INTO atelier_radar_source_runs(agency_id,run_id,source_id,status,data_json) VALUES($1,$2,$3,$4,$5) ON CONFLICT(agency_id,run_id,source_id) DO UPDATE SET status=excluded.status,data_json=excluded.data_json',args:[agencyId,latest.id,source.sourceId,source.status,JSON.stringify(source)]});
 for(let i=0;i<statements.length;i+=75)await db.batch(statements.slice(i,i+75));
}
