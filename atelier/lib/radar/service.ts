import 'server-only';
import {ensureSchema,sql} from '../vercel-runtime';
import type {AgencyAccess} from '../agencies';
import {isLegacyAgency,legacyOrigin,type RadarDatabase,type ScanSnapshot} from './types';
import {importLegacySnapshot} from './store';

export async function radarDatabase():Promise<RadarDatabase>{
 await ensureSchema();const db=sql();
 return {query:(text,args=[])=>db.query(text,args),batch:statements=>db.transaction(statements.map(s=>db.query(s.text,s.args)))};
}
export async function syncLegacyRadar(db:RadarDatabase,agency:AgencyAccess){
 if(!isLegacyAgency(agency))return '';
 const token=process.env.ATELIER_RADAR_SOURCE_TOKEN;
 if(!token)return 'Les relevés de l’ancien Radar n’ont pas encore été synchronisés.';
 // The record is per agency and is never used as a user/permission selector.
 await db.query('INSERT INTO atelier_radar_sync(agency_id,checked_at,status) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',[agency.id,'1970-01-01T00:00:00.000Z','pending']);
 const claimed=await db.query('UPDATE atelier_radar_sync SET checked_at=$1,status=$2 WHERE agency_id=$3 AND checked_at<$4 RETURNING agency_id',[new Date().toISOString(),'syncing',agency.id,new Date(Date.now()-300000).toISOString()]);
 if(!claimed.length){const [last]=await db.query('SELECT status FROM atelier_radar_sync WHERE agency_id=$1',[agency.id]);return last?.status==='error'?'La synchronisation de l’ancien Radar est temporairement indisponible. Les scans lancés dans Atelier restent disponibles.':'';}
 try{
  const response=await fetch(legacyOrigin+'/api/scanner',{headers:{'OAI-Sites-Authorization':'Bearer '+token},redirect:'error',cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error('Legacy Radar unavailable');
  const payload=await response.text();if(payload.length>8000000)throw new Error('Legacy snapshot too large');
  await importLegacySnapshot(db,agency.id,JSON.parse(payload) as ScanSnapshot);
  await db.query('UPDATE atelier_radar_sync SET status=$1 WHERE agency_id=$2',['ok',agency.id]);return '';
 }catch{await db.query('UPDATE atelier_radar_sync SET status=$1 WHERE agency_id=$2',['error',agency.id]);return 'La synchronisation de l’ancien Radar est temporairement indisponible. Les scans lancés dans Atelier restent disponibles.';}
}
