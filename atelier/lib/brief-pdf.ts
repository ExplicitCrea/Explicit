import {structureBrief,imagePlacements,imageTargets,type LayoutPage,type TextLine,type ImagePlacement} from './brief-layout.ts';
import {uid} from './studio.ts';
import type {Worker as OcrWorker} from 'tesseract.js';
import type {BriefDocument,BriefImage} from './brief-types';
export type LocalVisual={id:string;blob:Blob;kind:'image'|'page';width:number;height:number;page:number;caption:string};
export type ExtractedBrief=Omit<BriefDocument,'fileId'>&{source:File;visuals:Map<string,LocalVisual>};
function check(signal?:AbortSignal){if(signal?.aborted)throw new DOMException('Import annulé','AbortError');}
const digest=async(data:ArrayBuffer)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',data))).map(n=>n.toString(16).padStart(2,'0')).join('');
export function textLines(items:any[],viewport:{width:number;height:number;scale:number;convertToViewportPoint:(x:number,y:number)=>number[]}):TextLine[]{
 const rows=new Map<number,TextLine[]>();
 for(const item of items){if(typeof item.str!=='string'||!item.str.trim())continue;const [x,baseline]=viewport.convertToViewportPoint(item.transform[4],item.transform[5]);const h=Math.max(4,Math.abs(item.height||Math.hypot(item.transform[2],item.transform[3]))*viewport.scale),y=baseline-h;const key=Math.round(baseline/3)*3,row=rows.get(key)||[];row.push({text:item.str,x:x/viewport.width,y:y/viewport.height,width:Math.abs(item.width)*viewport.scale/viewport.width,height:h/viewport.height});rows.set(key,row);}
 const lines:TextLine[]=[];for(const row of rows.values()){row.sort((a,b)=>a.x-b.x);const groups:TextLine[][]=[];for(const item of row){const group=groups[groups.length-1],last=group?.[group.length-1];if(!last||item.x-(last.x+last.width)>.14)groups.push([item]);else group.push(item);}for(const group of groups)lines.push({text:group.map(x=>x.text).join(' ').replace(/\s+/g,' ').trim(),x:Math.min(...group.map(x=>x.x)),y:Math.min(...group.map(x=>x.y)),width:Math.max(...group.map(x=>x.x+x.width))-Math.min(...group.map(x=>x.x)),height:Math.max(...group.map(x=>x.height))});}return lines.sort((a,b)=>a.y-b.y||a.x-b.x);
}
async function encoded(canvas:HTMLCanvasElement){const blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,'image/webp',.9));if(!blob)throw new Error('Impossible de préparer un visuel.');if(blob.size<=2*1024*1024)return blob;const smaller=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,'image/jpeg',.72));if(!smaller||smaller.size>2*1024*1024)throw new Error('Un visuel reste trop volumineux. Réduis la taille du PDF.');return smaller;}
function resizedCanvas(width:number,height:number,max=1600){const scale=Math.min(1,max/width,3600/height,Math.sqrt(3600000/(width*height)));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(width*scale));canvas.height=Math.max(1,Math.round(height*scale));return canvas;}
async function crop(canvas:HTMLCanvasElement,left:number,top:number,right:number,bottom:number){const x=Math.max(0,Math.floor(left*canvas.width)),y=Math.max(0,Math.floor(top*canvas.height)),w=Math.max(1,Math.ceil((right-left)*canvas.width)),h=Math.max(1,Math.ceil((bottom-top)*canvas.height));const target=resizedCanvas(w,h);try{target.getContext('2d')!.drawImage(canvas,x,y,w,h,0,0,target.width,target.height);return {blob:await encoded(target),width:target.width,height:target.height};}finally{target.width=target.height=1;}}
async function rawImage(image:any){if(!image?.width||!image?.height||image.width*image.height>25000000)throw new Error('Visuel non décodable');const target=resizedCanvas(image.width,image.height);let raw:HTMLCanvasElement|null=null;try{const ctx=target.getContext('2d')!;
 if(image.bitmap)ctx.drawImage(image.bitmap,0,0,target.width,target.height);
 else if(image.data){raw=document.createElement('canvas');raw.width=image.width;raw.height=image.height;const source=raw.getContext('2d')!,out=source.createImageData(image.width,image.height),data=image.data;
  if(image.kind===3||data.length===image.width*image.height*4)out.data.set(data);
  else if(image.kind===2||data.length===image.width*image.height*3){for(let i=0,j=0;i<out.data.length;i+=4,j+=3){out.data[i]=data[j];out.data[i+1]=data[j+1];out.data[i+2]=data[j+2];out.data[i+3]=255;}}
  else if(image.kind===1){const stride=Math.ceil(image.width/8);for(let y=0;y<image.height;y++)for(let x=0;x<image.width;x++){const at=(y*image.width+x)*4,v=data[y*stride+(x>>3)]&(128>>(x&7))?255:0;out.data[at]=out.data[at+1]=out.data[at+2]=v;out.data[at+3]=255;}}
  else throw new Error('Couleurs non prises en charge');source.putImageData(out,0,0);ctx.drawImage(raw,0,0,target.width,target.height);
 }else throw new Error('Visuel indisponible');
 return {blob:await encoded(target),width:target.width,height:target.height};
 }finally{target.width=target.height=1;if(raw)raw.width=raw.height=1;}}
export async function extractBriefPdf(file:File,onProgress:(message:string)=>void,signal?:AbortSignal):Promise<ExtractedBrief>{
 if(file.size>25*1024*1024)throw new Error('25 Mo maximum par PDF.');if(!file.name.toLowerCase().endsWith('.pdf'))throw new Error('Choisis un fichier PDF.');check(signal);
 const bytes=await file.arrayBuffer(),fingerprint=await digest(bytes);const pdfjs=await import('pdfjs-dist');pdfjs.GlobalWorkerOptions.workerSrc='/atelier/vendor/pdf.worker.min.mjs';
 const loading=pdfjs.getDocument({data:new Uint8Array(bytes),isEvalSupported:false,useSystemFonts:true,maxImageSize:25000000,standardFontDataUrl:'/atelier/vendor/pdf-fonts/',cMapUrl:'/atelier/vendor/pdf-cmaps/',cMapPacked:true,wasmUrl:'/atelier/vendor/pdf-wasm/'});
 let ocr:OcrWorker|null=null;const ocrNotes:string[]=[];let ocrPage=0;const abort=()=>{void loading.destroy().catch(()=>{});if(ocr)void ocr.terminate().catch(()=>{});};signal?.addEventListener('abort',abort,{once:true});
 try{const pdf=await loading.promise;if(pdf.numPages>120)throw new Error('120 pages maximum. Sépare les briefs plus longs.');const pages:LayoutPage[]=[];
  for(let n=1;n<=pdf.numPages;n++){check(signal);onProgress('Texte · page '+n+' / '+pdf.numPages);const page=await pdf.getPage(n),viewport=page.getViewport({scale:1}),content=await page.getTextContent();let lines=textLines(content.items,viewport);
   if(lines.reduce((sum,l)=>sum+l.text.length,0)<35){const scale=Math.min(2.4,1800/viewport.width,3600/viewport.height,Math.sqrt(4800000/(viewport.width*viewport.height))),view=page.getViewport({scale}),canvas=document.createElement('canvas');canvas.width=Math.ceil(view.width);canvas.height=Math.ceil(view.height);ocrPage=n;
    try{onProgress('Lecture du scan · page '+n+' / '+pdf.numPages);await page.render({canvas,viewport:view,background:'#ffffff'}).promise;check(signal);
     if(!ocr){const api=await import('tesseract.js');ocr=await api.createWorker(['fra','eng'],1,{workerPath:'/atelier/vendor/ocr/worker.min.js',corePath:'/atelier/vendor/ocr',langPath:'/atelier/vendor/ocr/lang',workerBlobURL:false,errorHandler:()=>{},logger:message=>{if(!signal?.aborted)onProgress('OCR · page '+ocrPage+' / '+pdf.numPages+(message.status==='recognizing text'?' · '+Math.round(message.progress*100)+' %':' · préparation…'));}});await ocr.setParameters({preserve_interword_spaces:'1'});}
     check(signal);const {data}=await ocr.recognize(canvas,{}, {blocks:true});check(signal);const detected=(data.blocks||[]).flatMap(block=>block.paragraphs.flatMap(p=>p.lines)).filter(l=>l.text.trim()).map(l=>({text:l.text.trim(),x:l.bbox.x0/canvas.width,y:l.bbox.y0/canvas.height,width:(l.bbox.x1-l.bbox.x0)/canvas.width,height:(l.bbox.y1-l.bbox.y0)/canvas.height}));
     if(data.confidence>=30&&detected.length){lines=detected;ocrNotes.push('Page '+n+' : texte reconnu par OCR. Relis les noms, références et accents.');}else ocrNotes.push('Page '+n+' : OCR peu fiable. Le visuel est conservé ; complète le texte du module.');
    }catch(e){check(signal);ocrNotes.push('Page '+n+' : lecture OCR indisponible. Le visuel reste consultable et le texte peut être saisi manuellement.');if(ocr){await ocr.terminate().catch(()=>{});ocr=null;}}
    finally{canvas.width=canvas.height=1;}
   }
   pages.push({number:n,width:viewport.width,height:viewport.height,lines});page.cleanup();
  }
  if(ocr){await ocr.terminate();ocr=null;}const result=structureBrief(pages);result.warnings.unshift(...ocrNotes);const visuals=new Map<string,LocalVisual>(),hashes=new Map<string,string>();let total=0;
  const saveVisual=async(moduleId:string,rendered:{blob:Blob;width:number;height:number},kind:'image'|'page',page:number,caption:string)=>{check(signal);const hash=kind+await digest(await rendered.blob.arrayBuffer());let id=hashes.get(hash);if(!id){id=uid();hashes.set(hash,id);total+=rendered.blob.size;if(total>60*1024*1024||visuals.size>=600)throw new Error('Ce PDF contient trop de visuels pour un seul import. Sépare-le en plusieurs fichiers.');visuals.set(id,{id,...rendered,kind,page,caption});}const m=result.modules.find(m=>m.id===moduleId)!;if(!m.images.some(im=>im.fileId===id&&im.page===page)){if(m.images.length>=120)throw new Error('Une scène contient plus de 120 visuels. Sépare le PDF.');m.images.push({fileId:id,caption,kind,page,width:rendered.width,height:rendered.height});}};
  for(let n=1;n<=pdf.numPages;n++){check(signal);onProgress('Images · page '+n+' / '+pdf.numPages);const page=await pdf.getPage(n),base=page.getViewport({scale:1}),scale=Math.min(1.8,1400/base.width,3600/base.height,Math.sqrt(3600000/(base.width*base.height))),viewport=page.getViewport({scale}),canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
   try{await page.render({canvas,viewport,background:'#ffffff'}).promise;check(signal);const ops=await page.getOperatorList(),placements=imagePlacements(ops,pdfjs.OPS,viewport);
    for(const placement of placements){check(signal);for(const target of imageTargets(result.segments,n,placement)){let rendered;
     if(target.crop)rendered=await crop(canvas,target.crop.left,target.crop.top,target.crop.right,target.crop.bottom);
     else{try{const img=placement.inline||(page.objs.has(placement.key)?page.objs.get(placement.key):page.commonObjs.has(placement.key)?page.commonObjs.get(placement.key):null);rendered=await rawImage(img);}catch{rendered=await crop(canvas,placement.left,placement.top,placement.right,placement.bottom);}}
     await saveVisual(target.segment.moduleId,rendered,'image',n,(target.crop?'Visuel de scène':'Image')+' · p. '+n);
    }}
    for(const segment of result.segments.filter(s=>s.page===n&&s.bottom-s.top>.02)){const rendered=await crop(canvas,segment.left??0,segment.top,segment.right??1,segment.bottom);await saveVisual(segment.moduleId,rendered,'page',n,'Extrait de page '+n);}
   }finally{canvas.width=canvas.height=1;page.cleanup();}
  }
  result.warnings.push('Rattachement proposé selon les titres et la position des images. Vérifie les modules avant import.');
  return {id:uid(),name:file.name.slice(0,250).replace(/[\uD800-\uDBFF]$/,''),fingerprint,pageCount:pdf.numPages,addedAt:new Date().toISOString(),source:file,visuals,modules:result.modules,warnings:[...new Set(result.warnings)].slice(0,40)};
 }finally{signal?.removeEventListener('abort',abort);if(ocr)await ocr.terminate().catch(()=>{});await loading.destroy().catch(()=>{});}
}
