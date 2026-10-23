import {PDFDocument,PageSizes,rgb,type PDFFont,type PDFPage,type Color} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import {invoiceTotals,euros} from './invoices.ts';
import type {InvoiceDraft} from './workspace-extras.ts';
export type InvoiceFonts={display:Uint8Array;body:Uint8Array;medium:Uint8Array;mono:Uint8Array};
let cachedFonts:Promise<InvoiceFonts>|undefined;
export function loadInvoiceFonts(){return cachedFonts??=(async()=>{try{const names=['archivo-semibold','spacegrotesk-regular','spacegrotesk-medium','ibmplexmono-regular'];const data=await Promise.all(names.map(async name=>{const r=await fetch('/atelier/fonts/'+name+'.ttf');if(!r.ok)throw new Error('Les polices de la facture ne sont pas disponibles. Réessaie.');return new Uint8Array(await r.arrayBuffer());}));return {display:data[0],body:data[1],medium:data[2],mono:data[3]};}catch(e){cachedFonts=undefined;throw e;}})();}
export function pdfLines(value:string,font:PDFFont,size:number,width:number){
 const lines:string[]=[];for(const paragraph of value.replace(/\r\n?/g,'\n').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,'').split('\n')){
  let line='';for(const word of paragraph.split(/\s+/).filter(Boolean)){
   const joined=line?line+' '+word:word;if(font.widthOfTextAtSize(joined,size)<=width){line=joined;continue;}
   if(line){lines.push(line);line='';}let part='';for(const ch of word){if(part&&font.widthOfTextAtSize(part+ch,size)>width){lines.push(part);part='';}part+=ch;}line=part;
  }lines.push(line);
 }return lines;
}
export async function createInvoicePDF(d:InvoiceDraft,number?:string,providedFonts?:InvoiceFonts){
 const bytes=providedFonts??await loadInvoiceFonts();const pdf=await PDFDocument.create();pdf.registerFontkit(fontkit);
 const [display,body,medium,mono]=await Promise.all([bytes.display,bytes.body,bytes.medium,bytes.mono].map(b=>pdf.embedFont(b,{subset:true})));
 const [W,H]=PageSizes.A4,M=34,CW=W-M*2,BOTTOM=H-42;
 const ink=rgb(.137,.169,.322),blue=rgb(.192,.302,.8),paper=rgb(.969,.957,.918),green=rgb(.878,.906,.749),muted=rgb(.408,.427,.482),rule=rgb(.72,.749,.71),white=rgb(1,1,1);
 let page!:PDFPage;let y=M;
 const rect=(x:number,top:number,width:number,height:number,color:Color)=>page.drawRectangle({x,y:H-top-height,width,height,color});
 const line=(top:number,color=rule)=>page.drawLine({start:{x:M,y:H-top},end:{x:W-M,y:H-top},thickness:.6,color});
 const draw=(text:string,x:number,top:number,size=8,font=body,color=ink)=>page.drawText(text,{x,y:H-top-size,size,font,color});
 const drawLines=(lines:string[],x:number,top:number,size:number,font:PDFFont,color=ink,width=0,right=false)=>{lines.forEach((text,i)=>draw(text,right?x+width-font.widthOfTextAtSize(text,size):x,top+i*size*1.4,size,font,color));return lines.length*size*1.4;};
 const block=(text:string,x:number,top:number,width:number,size=8,font=body,color=ink)=>drawLines(pdfLines(text,font,size,width),x,top,size,font,color);
 const label=(text:string,x:number,top:number)=>draw(text.toLocaleUpperCase('fr-FR'),x,top,6.2,mono,blue);
 const newPage=(continued=false)=>{page=pdf.addPage(PageSizes.A4);rect(0,0,W,H,paper);y=M;if(continued){draw('facture / suite',M,y,17,display,blue);block(number||'BROUILLON',W-M-180,y+4,180,8,mono);line(y+32,blue);y+=45;}};
 const ensure=(height:number)=>{if(y+height>BOTTOM)newPage(true);};
 const flowing=(text:string,size=8,font=body,color=ink)=>{const lines=pdfLines(text,font,size,CW);for(const text of lines){ensure(size*1.4);draw(text,M,y,size,font,color);y+=size*1.4;}};
 const date=(v:string)=>/^\d{4}-\d{2}-\d{2}$/.test(v)?v.split('-').reverse().join('.'):'À compléter';
 const currency=(value:number)=>euros(value).replace(/[\u202f\u00a0]/g,' ');
 const totals=invoiceTotals(d);newPage();
 label(d.kind==='deposit'?'Facture d’acompte':d.kind==='balance'?'Facture de solde':'Facture de prestation',M,y);draw('facture',M,y+11,48,display,blue);y+=73;block(number||'BROUILLON',M,y,CW-155,9,mono);
 rect(W-M-143,M+2,143,78,green);for(let r=0;r<5;r++)for(let c=0;c<12;c++)page.drawEllipse({x:W-M-135+c*11.4,y:H-M-13-r*11-Math.sin(c*.65)*4,xScale:4.6,yScale:.8+(1-c/12)*3.2,color:blue});
 y+=24;line(y,blue);y+=13;const dateX=[M,M+CW/3,M+CW*2/3];for(const [i,[name,value]] of [['Date d’émission',d.date],['Date de prestation',d.serviceDate],['Échéance',d.dueDate]].entries()){label(name,dateX[i],y);draw(date(value),dateX[i],y+13,9,mono);}y+=37;line(y);y+=17;
 const gap=24,col=(CW-gap)/2,partyTop=y;
 const issuerName=d.issuer.name||'Nom légal à compléter',clientName=d.clientName||'Client à compléter';
 const issuerLines=[d.issuer.legalForm,d.issuer.address||'Adresse à compléter','SIRET : '+(d.issuer.siret||'À compléter'),...(!d.issuer.vatExempt?['TVA : '+(d.issuer.vatNumber||'À compléter')]:[]),d.issuer.email].filter(Boolean);
 const clientLines=[d.clientAddress||'Adresse à compléter',...(d.clientSiret?['SIREN / SIRET : '+d.clientSiret]:[]),d.clientEmail].filter(Boolean);
 const partyHeight=(name:string,lines:string[],width:number)=>19+pdfLines(name,display,12.5,width).length*17.5+8+lines.reduce((n,text)=>n+pdfLines(text,body,7.5,width).length*10.5+3,0)+7;
 const issuerH=partyHeight(issuerName,issuerLines,col),clientH=partyHeight(clientName,clientLines,col-22);
 rect(M+col+gap,partyTop,col,clientH,green);page.drawLine({start:{x:M+col+gap,y:H-partyTop},end:{x:W-M,y:H-partyTop},thickness:1.5,color:blue});
 for(const [i,[name,lines]] of ([[issuerName,issuerLines],[clientName,clientLines]] as [string,string[]][]).entries()){
  const x=M+i*(col+gap)+(i?11:0),width=col-(i?22:0);label(i?'02 / Facturé à':'01 / Émetteur',x,partyTop+10);
  let py=partyTop+26;py+=block(name,x,py,width,12.5,display)+6;
  for(const text of lines)py+=block(text,x,py,width,7.5,body)+3;
 }
 y=partyTop+Math.max(issuerH,clientH)+17;label('03 / Prestations',M,y);y+=14;y+=block(d.label,M,y,CW,14.25,display)+13;
 const widths=[.05,.41,.07,.18,.10,.19].map(n=>n*CW);const xs=widths.map((_,i)=>M+widths.slice(0,i).reduce((a,b)=>a+b,0));
 const tableHeader=()=>{rect(M,y,CW,23,blue);['N°','Désignation','Qté','P.U. HT','TVA','Total HT'].forEach((text,i)=>{const width=widths[i]-10;const lines=pdfLines(text.toLocaleUpperCase('fr-FR'),mono,6,width);drawLines(lines,xs[i]+5,y+7,6,mono,white,width,i>1);});y+=23;};
 if(y+60>BOTTOM)newPage(true);tableHeader();
 for(const [i,l] of d.lines.entries()){
  const cells=[String(i+1).padStart(2,'0'),l.description,l.quantity.toLocaleString('fr-FR',{maximumFractionDigits:3}),currency(l.unitCents),d.issuer.vatExempt?'—':(l.vatBps/100).toLocaleString('fr-FR')+' %',currency(totals.lines[i].raw)];
  const columns=cells.map((text,c)=>pdfLines(text,c===0?mono:c===5?medium:body,c===0?6.8:7.5,widths[c]-10));let offset=0,total=Math.max(...columns.map(c=>c.length));
  while(offset<total){let capacity=Math.floor((BOTTOM-y-14)/10.5);if(capacity<1){newPage(true);tableHeader();capacity=Math.floor((BOTTOM-y-14)/10.5);}const remaining=total-offset;
   if(remaining<=65&&remaining>capacity&&offset===0){newPage(true);tableHeader();capacity=Math.floor((BOTTOM-y-14)/10.5);}
   const count=Math.min(capacity,remaining);columns.forEach((lines,c)=>drawLines(lines.slice(offset,offset+count),xs[c]+5,y+7,c===0?6.8:7.5,c===0?mono:c===5?medium:body,c===0?muted:ink,widths[c]-10,c>1));
   const height=count*10.5+14;y+=height;line(y);offset+=count;
  }
 }
 y+=17;
 const rows:[string,number][]=[['Sous-total HT',totals.subtotal],...(totals.discount>0?[['Remise HT',-totals.discount] as [string,number]]:[]),['Total HT',totals.ht],['TVA',totals.vat],['Total TTC',totals.ttc],...(d.paidCents>0?[['Déjà réglé',d.paidCents] as [string,number]]:[])];
 const totalH=rows.length*17+69;ensure(totalH);const tx=M+col+gap,tw=col;
 if(d.issuer.vatExempt)block('TVA non applicable, article 293 B du CGI.',M,y,col,7,body,muted);
 for(const [name,amount] of rows){if(name==='Total TTC'){page.drawLine({start:{x:tx,y:H-y+3},end:{x:W-M,y:H-y+3},thickness:.5,color:rule});}draw(name,tx,y,8,body);const value=currency(amount);const size=Math.min(8,(tw*.58)/Math.max(1,medium.widthOfTextAtSize(value,1)));draw(value,tx+tw-medium.widthOfTextAtSize(value,size),y,size,medium);y+=17;}
 y+=5;rect(tx,y,tw,59,green);label('Net à payer',tx+12,y+10);const due=currency(totals.due),dueSize=Math.min(24,(tw-24)/Math.max(1,display.widthOfTextAtSize(due,1)));draw(due,tx+12,y+25,dueSize,display,blue);y+=76;
 if(d.notes){ensure(35);label('Notes & références',M,y);y+=14;flowing(d.notes,7.7);y+=17;}
 const payment=[d.issuer.paymentTerms,d.issuer.bank].filter(Boolean).join('\n\n');const terms=[d.issuer.earlyDiscount,...(d.clientProfessional?['Pénalités de retard : '+(d.issuer.lateFees||'À compléter avant émission'),'Indemnité forfaitaire pour frais de recouvrement : 40 €.']:[])].filter(Boolean).join('\n');
 const footerH=Math.max(pdfLines(payment,body,6.8,col).length,pdfLines(terms,body,6.8,col).length)*9.52+31;ensure(footerH);line(y,blue);y+=13;label('04 / Règlement',M,y);label('Conditions',tx,y);y+=14;const footerTop=y;const a=block(payment,M,footerTop,col,6.8,body,muted),b=block(terms,tx,footerTop,col,6.8,body,muted);y+=Math.max(a,b);
 if(!number){y+=13;ensure(18);draw('DOCUMENT DE TRAVAIL - NON ÉMIS',M,y,7,mono,muted);}
 const pages=pdf.getPages();for(const [i,p] of pages.entries()){page=p;page.drawLine({start:{x:M,y:27},end:{x:W-M,y:27},thickness:.5,color:rule});draw(number||'BROUILLON',M,H-20,6.5,mono,muted);const pageLabel=(i+1)+' / '+pages.length;draw(pageLabel,W-M-mono.widthOfTextAtSize(pageLabel,6.5),H-20,6.5,mono,muted);}
 pdf.setTitle((number||'Brouillon')+' - '+d.label);pdf.setAuthor(d.issuer.name);pdf.setCreator('Atelier');return pdf.save();
}
export async function downloadInvoicePDF(d:InvoiceDraft,number?:string){const bytes=await createInvoicePDF(d,number);const url=URL.createObjectURL(new Blob([new Uint8Array(bytes).buffer],{type:'application/pdf'}));const a=document.createElement('a');a.href=url;a.download=((number||'Brouillon')+'_'+d.clientName).replace(/[^\p{L}\p{N}_.-]+/gu,'_').slice(0,150)+'.pdf';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
