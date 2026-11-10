import 'server-only';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

export const radarUiFiles=new Set(['index.html','scanner.html','investment-report.html','style.css','simple.css','scanner.css','embedded.css','model.js','web.js','app.js','audit.js','simple.js','scanner-ui.js','bridge.js','state-merge.js','archivo.woff2','space-grotesk.woff2']);
export async function radarUiFile(name:string){
 if(!radarUiFiles.has(name))return null;
 const bytes=name==='archivo.woff2'
  ?await readFile(join(process.cwd(),'node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2'))
  :name==='space-grotesk.woff2'
   ?await readFile(join(process.cwd(),'node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2'))
   :await readFile(join(process.cwd(),'radar-ui',name));
 const type=name.endsWith('.html')?'text/html':name.endsWith('.css')?'text/css':name.endsWith('.woff2')?'font/woff2':'text/javascript';
 return {bytes,type};
}
export function radarHtml(html:string,config:{agencyId:string;readOnly:boolean;theme:string;view:string}){
 const nonce=crypto.randomUUID().replace(/-/g,'');
 const value=JSON.stringify(config).replace(/</g,'\\u003c');
 const head='<base href="/atelier/api/radar/ui/"><script nonce="'+nonce+'">window.ATELIER_RADAR='+value+';document.documentElement.dataset.theme=window.ATELIER_RADAR.theme;</script><script src="state-merge.js" defer></script><script src="bridge.js" defer></script>';
 return {html:html.replace('<head>','<head>'+head).replace('</head>','<link rel="stylesheet" href="embedded.css"></head>'),nonce};
}
