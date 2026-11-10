import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {PGlite} from '@electric-sql/pglite';
import {loadRadarState,saveRadarState,scanSnapshot,networkSnapshot,runRadarScan,importLegacySnapshot} from '../lib/radar/store.ts';
import {radarStateSchema,isLegacyAgency,legacyOwner} from '../lib/radar/types.ts';
import {SOURCES,classify,parseSource,collect} from '../lib/radar/collector.mjs';

const schema=JSON.parse(readFileSync(new URL('../lib/vercel-schema.json',import.meta.url),'utf8'));
const stateTools={};vm.runInNewContext(readFileSync(new URL('../radar-ui/state-merge.js',import.meta.url),'utf8'),stateTools);
const merge=(...values)=>JSON.parse(JSON.stringify(stateTools.RadarStateTools.mergeStates(...values)));
async function database(){
 const engine=new PGlite();for(const s of schema)await engine.exec(s);
 const db={query:async(text,args=[])=>{const r=await engine.query(text,args);return r.rows;},batch:statements=>engine.transaction(async tx=>{for(const s of statements)await tx.query(s.text,s.args);})};
 return {db,engine};
}
const job=(title='Freelance Motion Designer')=>({company:'Studio Test',sourceId:SOURCES[0].id,sourceUrl:SOURCES[0].url,title,url:'https://example.com/job',description:'Motion design pour un projet créatif.',evidence:'Brief public.',discipline:'Motion',contract:'Freelance',location:'France',remote:'Oui',region:'France'});
const collector=jobs=>async source=>({sourceId:source.id,status:'ok',jobs:source.id===SOURCES[0].id?jobs:[],complete:true,rawCount:source.id===SOURCES[0].id?jobs.length:0,rejectedCount:0});

test('les notes Radar sont privées à leur agence et les écritures périmées sont refusées',async()=>{
 const {db,engine}=await database();try{
  const a=await loadRadarState(db,'agency-a'),b=await loadRadarState(db,'agency-b');
  const next={tracking:{studio:{notes:'Note privée A',status:'En discussion'}},auditSettings:{n:40,p:2}};
  assert.equal((await saveRadarState(db,'agency-a',next,a.revision)).revision,1);
  assert.equal(await saveRadarState(db,'agency-a',{tracking:{},auditSettings:{}},a.revision),null);
  assert.deepEqual((await loadRadarState(db,'agency-b')).state,b.state);
  assert.equal((await loadRadarState(db,'agency-a')).state.tracking.studio.notes,'Note privée A');
  assert.equal((await saveRadarState(db,'agency-b',{tracking:{other:{notes:'B'}},auditSettings:{}},b.revision)).revision,1);
 }finally{await engine.close();}
});

test('les sauvegardes concurrentes de champs distincts fusionnent et un même champ produit un conflit',()=>{
 const base={tracking:{a:{notes:'Ancien',status:'À qualifier'}},auditSettings:{n:40}};
 const local=structuredClone(base),remote=structuredClone(base);local.tracking.a.notes='Ma note';remote.tracking.a.status='Contacté';remote.auditSettings.n=60;
 const merged=merge(base,local,remote);assert.deepEqual(merged.conflicts,[]);assert.equal(merged.state.tracking.a.notes,'Ma note');assert.equal(merged.state.tracking.a.status,'Contacté');assert.equal(merged.state.auditSettings.n,60);
 remote.tracking.a.notes='Autre note';assert.deepEqual(merge(base,local,remote).conflicts,['tracking.a.notes']);
 const sent={tracking:{a:{notes:'Ma note'}},auditSettings:{n:40}},pending=structuredClone(sent),saved=structuredClone(sent);pending.auditSettings.n=70;saved.tracking.b={notes:'Ajout du collaborateur'};
 const after=merge(sent,pending,saved);assert.equal(after.state.auditSettings.n,70);assert.equal(after.state.tracking.b.notes,'Ajout du collaborateur');
});

test('les imports de suivi rejettent les statuts inconnus et clés de pollution de prototype',()=>{
 assert.equal(radarStateSchema.safeParse({tracking:{a:{status:'Envoyé automatiquement'}},auditSettings:{}}).success,false);
 assert.equal(radarStateSchema.safeParse(JSON.parse('{"tracking":{"__proto__":{"notes":"x"}},"auditSettings":{}}')).success,false);
 assert.equal(radarStateSchema.safeParse({tracking:{a:{notes:'x',qualification:{reviewedAt:null,needConfirmed:true}}},auditSettings:{n:40}}).success,true);
 assert.equal(isLegacyAgency({owner_id:legacyOwner,workspace_key:legacyOwner}),true);
 assert.equal(isLegacyAgency({owner_id:legacyOwner,workspace_key:'autre-agence'}),false);
 assert.equal(isLegacyAgency({owner_id:'autre-compte',workspace_key:legacyOwner}),false);
});

test('un scan persiste, dédoublonne les offres et ne touche pas une autre agence',async()=>{
 const {db,engine}=await database();try{
  const result=await runRadarScan(db,'a','manual',collector([job(),job()]));
  assert.equal(result.new,1);assert.equal(result.observed,1);
  const first=await scanSnapshot(db,'a');assert.equal(first.jobs.length,1);assert.equal(first.runs[0].status,'completed');assert.equal(first.sourceRuns.length,11);
  assert.equal((await scanSnapshot(db,'b')).jobs.length,0);
  await runRadarScan(db,'b','manual',collector([job()]));assert.equal((await scanSnapshot(db,'b')).jobs.length,1);
  await runRadarScan(db,'a','manual',collector([job()]));assert.equal((await scanSnapshot(db,'a')).jobs.length,1);
  await db.query("INSERT INTO atelier_radar_runs(agency_id,id,status,started_at,trigger_name) VALUES('a','active','running',$1,'manual')",[new Date().toISOString()]);
  assert.equal((await runRadarScan(db,'a','manual',collector([]))).running,true);
 }finally{await engine.close();}
});

test('une panne de source ne ferme aucune offre et seules deux absences complètes changent son état',async()=>{
 const {db,engine}=await database();try{
  await runRadarScan(db,'a','manual',collector([job()]));
  await runRadarScan(db,'a','manual',async source=>({sourceId:source.id,status:'error',error:'HTTP 503',jobs:[],complete:false}));
  let snapshot=await scanSnapshot(db,'a');assert.equal(snapshot.jobs[0].status,'observed');assert.equal(snapshot.jobs[0].missingCount,0);assert.equal(snapshot.runs[0].status,'failed');
  await runRadarScan(db,'a','manual',collector([]));snapshot=await scanSnapshot(db,'a');assert.equal(snapshot.jobs[0].status,'to_recheck');
  await runRadarScan(db,'a','manual',collector([]));snapshot=await scanSnapshot(db,'a');assert.equal(snapshot.jobs[0].status,'not_seen');assert.equal(snapshot.jobs[0].missingCount,2);
 }finally{await engine.close();}
});

test('la reprise historique est idempotente et ne remplace pas un scan Atelier plus récent',async()=>{
 const {db,engine}=await database();try{
  const old={sources:SOURCES,assisted:[],runs:[{id:'legacy',status:'completed',started_at:'2026-11-01T09:00:00.000Z',finished_at:'2026-11-01T09:00:01.000Z',trigger_name:'weekly',report:{observed:1}}],sourceRuns:[],jobs:[{...job(),id:'legacy-job',firstSeen:'2026-10-01T09:00:00.000Z',lastSeen:'2026-11-01T09:00:00.000Z',status:'observed',missingCount:0}],hypotheses:[],scope:''};
  await importLegacySnapshot(db,'a',old);await importLegacySnapshot(db,'a',old);
  assert.equal((await scanSnapshot(db,'a')).jobs.length,1);assert.equal((await scanSnapshot(db,'a')).runs.length,1);
  await db.query("UPDATE atelier_radar_jobs SET title='Titre actualisé',data_json=$1,updated_at='2026-11-10T09:00:00.000Z' WHERE agency_id='a' AND id='legacy-job'",[JSON.stringify({...job(),title:'Titre actualisé'})]);
  await importLegacySnapshot(db,'a',old);assert.equal((await scanSnapshot(db,'a')).jobs[0].title,'Titre actualisé');assert.equal((await scanSnapshot(db,'b')).jobs.length,0);
  assert.equal(networkSnapshot(await scanSnapshot(db,'a')).agencies.length>=55,true);
 }finally{await engine.close();}
});

test('les adaptateurs métier excluent les faux positifs et exposent les erreurs de transport',async()=>{
 assert.equal(classify('Software engineer','video'),null);assert.equal(classify('Stage monteur vidéo',''),null);
 assert.equal(classify('Freelance 3D Artist','Blender').contract,'Freelance');
 assert.throws(()=>parseSource(SOURCES[0],'{"unexpected":[]}'));
 const error=await collect(SOURCES[0],async()=>new Response('unavailable',{status:503}));assert.equal(error.status,'error');assert.deepEqual(error.jobs,[]);
});

test('les pages embarquées gardent les outils, les exports et utilisent les API Atelier',()=>{
 const app=readFileSync(new URL('../radar-ui/app.js',import.meta.url),'utf8'),scanner=readFileSync(new URL('../radar-ui/scanner-ui.js',import.meta.url),'utf8'),audit=readFileSync(new URL('../radar-ui/audit.js',import.meta.url),'utf8');
 assert.match(app,/AtelierRadar.json\('network'\)/);assert.match(scanner,/AtelierRadar.api\('scans'\)/);assert.match(audit,/await window.AtelierRadar.save\(\{tracking,auditSettings\}\)/);
 for(const source of [app,scanner,audit])assert.doesNotMatch(source,/localStorage|auth\.openai\.com|fetch\('\/api\//);
 for(const name of ['exportCSV','exportSVG','downloadJSON'])assert.ok(app.includes(name));
 assert.ok(audit.includes('restoreAuditTracking'));assert.ok(audit.includes('RadarModel.economics'));
});
