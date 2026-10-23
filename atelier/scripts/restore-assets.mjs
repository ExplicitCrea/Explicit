import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {dirname,resolve} from 'node:path';
import {get,put} from '@vercel/blob';
const manifest=JSON.parse(await readFile(new URL('../asset-manifest.json',import.meta.url),'utf8'));
const hash=bytes=>createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex');
let imported=0;for(let at=0;at<manifest.length;at+=8){await Promise.all(manifest.slice(at,at+8).map(async f=>{
 const destination=resolve('public',f.path);if(!destination.startsWith(resolve('public')+'/'))throw new Error('Invalid asset path');
 try{const bytes=await readFile(destination);if(hash(bytes)===f.sha)return;}catch{}
 const key='app-assets/'+f.sha;let bytes;const stored=await get(key,{access:'private'});
 if(stored?.statusCode===200)bytes=Buffer.from(await new Response(stored.stream).arrayBuffer());
 else {if(process.env.ATELIER_SOURCE_ORIGIN!=='https://explicit-atelier.opalelf9.chatgpt.site'||!process.env.ATELIER_SOURCE_TOKEN)throw new Error('Missing private asset '+f.path);const r=await fetch(process.env.ATELIER_SOURCE_ORIGIN+'/'+f.path,{headers:{'OAI-Sites-Authorization':'Bearer '+process.env.ATELIER_SOURCE_TOKEN},redirect:'error',signal:AbortSignal.timeout(60000)});if(!r.ok)throw new Error('Asset download failed: '+f.path+' HTTP '+r.status);bytes=Buffer.from(await r.arrayBuffer());if(hash(bytes)!==f.sha)throw new Error('Asset integrity failed: '+f.path);await put(key,bytes,{access:'private',addRandomSuffix:false,allowOverwrite:true,contentType:'application/octet-stream'});imported++;}
 if(bytes.length!==f.size||hash(bytes)!==f.sha)throw new Error('Asset integrity failed: '+f.path);await mkdir(dirname(destination),{recursive:true});await writeFile(destination,bytes);
}));}
console.log('Atelier assets verified: '+manifest.length+'; copied into your private store: '+imported);
