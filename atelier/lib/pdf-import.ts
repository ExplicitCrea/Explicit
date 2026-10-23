import type { PdfPage } from './mcskyz';

export async function readBriefPdf(file:File,onProgress:(message:string)=>void):Promise<PdfPage[]>{
  if(file.size>25*1024*1024)throw new Error('Le PDF doit peser moins de 25 Mo.');
  if(!file.name.toLowerCase().endsWith('.pdf'))throw new Error('Choisis un fichier PDF.');
  const pdfjs=await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc='/atelier/vendor/pdf.worker.min.mjs';
  const task=pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false,useSystemFonts:true});
  const pdf=await task.promise;
  try{
    if(pdf.numPages>120)throw new Error('120 pages maximum par import. Sépare les briefs plus longs.');
    const pages:PdfPage[]=[];
    for(let p=1;p<=pdf.numPages;p++){
      onProgress('Lecture du PDF · page '+p+' / '+pdf.numPages);
      const page=await pdf.getPage(p);const content=await page.getTextContent();
      const lines=new Map<number,{x:number;text:string}[]>();
      for(const item of content.items){if(!('str' in item))continue;const y=Math.round(item.transform[5]/3)*3;const row=lines.get(y)??[];row.push({x:item.transform[4],text:item.str});lines.set(y,row);}
      pages.push({number:p,text:[...lines.entries()].sort((a,b)=>b[0]-a[0]).map(([,row])=>row.sort((a,b)=>a.x-b.x).map(v=>v.text).join(' ')).join('\n')});page.cleanup();
    }
    if(pages.reduce((n,p)=>n+p.text.trim().length,0)<80)throw new Error('Ce PDF semble être un scan. Exporte une version avec du texte sélectionnable, ou colle le texte du brief dans l’onglet Texte.');
    return pages;
  }finally{await pdf.destroy();}
}
