import 'server-only';
import {neon,type NeonQueryFunction} from '@neondatabase/serverless';
import {put,get,del} from '@vercel/blob';
import schema from './vercel-schema.json';
import {postgresSQL} from './vercel-sql';
let client:NeonQueryFunction<false,false>|undefined,ready:Promise<void>|undefined;
export function sql(){if(!process.env.DATABASE_URL)throw new Error('Base Vercel non configurée');return client??=neon(process.env.DATABASE_URL);}
export function ensureSchema(){return ready??=(async()=>{const db=sql();await db.transaction([db.query("SELECT pg_advisory_xact_lock(hashtext('atelier:schema'))"),...schema.map(s=>db.query(s))]);})().catch(e=>{ready=undefined;throw e;});}
class Statement {
 constructor(public text:string,public args:unknown[]=[]){ }
 bind(...args:unknown[]){return new Statement(this.text,args);}
 async first<T=Record<string,unknown>>():Promise<T|null>{const r=await this.all<T>();return r.results[0]??null;}
 async all<T=Record<string,unknown>>(){await ensureSchema();const r=await sql().query(postgresSQL(this.text),this.args,{fullResults:true});return {results:r.rows as T[],meta:{changes:r.rowCount??0},success:true};}
 async run(){return (await database.batch([this]))[0];}
}
const database={prepare:(s:string)=>new Statement(s),async batch(statements:Statement[]){await ensureSchema();const db=sql();const results=await db.transaction([db.query("SELECT pg_advisory_xact_lock(hashtext('atelier:write'))"),...statements.map(s=>db.query(postgresSQL(s.text),s.args))],{fullResults:true});return results.slice(1).map(r=>({results:r.rows,meta:{changes:r.rowCount??0},success:true}));}};
const bucket={async put(key:string,bytes:Uint8Array,options?:{httpMetadata?:{contentType?:string}}){return put(key,Buffer.from(bytes),{access:'private',addRandomSuffix:false,allowOverwrite:true,contentType:options?.httpMetadata?.contentType});},async get(key:string){const r=await get(key,{access:'private',useCache:false});return r?.statusCode===200?{body:r.stream,size:r.blob.size}:null;},async delete(key:string){await del(key);}};
export const env={DB:database,BUCKET:bucket,get OPENAI_API_KEY(){return process.env.OPENAI_API_KEY;},get OPENAI_BRIEF_MODEL(){return process.env.OPENAI_BRIEF_MODEL;}};
