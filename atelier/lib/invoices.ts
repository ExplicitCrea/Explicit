import { invoiceDraftSchema, type InvoiceDraft, type Issuer } from './workspace-extras.ts';
import { today, plusDays, uid, type Project } from './studio.ts';
export const cents=(v:number)=>Math.round((Number.isFinite(v)?v:0)*100);
export const euros=(v:number)=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(v/100);
export function invoiceTotals(d:InvoiceDraft){
  const raw=d.lines.map(l=>Math.round(l.quantity*l.unitCents));const subtotal=raw.reduce((a,b)=>a+b,0);const discount=Math.min(d.discountCents,subtotal);
  const shares=raw.map((n,i)=>({i,amount:subtotal?Math.floor(discount*n/subtotal):0,fraction:subtotal?(discount*n/subtotal)%1:0}));let rest=discount-shares.reduce((n,s)=>n+s.amount,0);
  for(const s of [...shares].sort((a,b)=>b.fraction-a.fraction)){if(rest--<=0)break;s.amount++;}
  const lines=d.lines.map((l,i)=>{const ht=raw[i]-shares[i].amount;const vat=Math.round(ht*(d.issuer.vatExempt?0:l.vatBps)/10000);return {raw:raw[i],discount:shares[i].amount,ht,vat,ttc:ht+vat};});
  const ht=subtotal-discount,vat=lines.reduce((n,l)=>n+l.vat,0),ttc=ht+vat;return {lines,subtotal,discount,ht,vat,ttc,due:Math.max(0,ttc-d.paidCents)};
}
export function invoiceErrors(d:InvoiceDraft){const errors:string[]=[];const validDate=(v:string)=>/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v+'T12:00:00Z'))&&new Date(v+'T12:00:00Z').toISOString().slice(0,10)===v;
  if(!invoiceDraftSchema.safeParse(d).success)errors.push('Vérifie les lignes et les montants.');
  if(!d.issuer.name.trim()||!d.issuer.address.trim()||!d.issuer.legalForm.trim())errors.push('Renseigne le nom légal, la forme juridique et l’adresse de l’émetteur.');
  if(!/^\d{14}$/.test(d.issuer.siret.replace(/\s/g,'')))errors.push('Le SIRET de l’émetteur doit comporter 14 chiffres.');
  if(!d.issuer.vatExempt&&!d.issuer.vatNumber.trim())errors.push('Renseigne le numéro de TVA de l’émetteur.');
  if(!d.clientName.trim()||!d.clientAddress.trim())errors.push('Renseigne l’identité et l’adresse du client.');
  if(d.clientSiret&&!/^\d{9}(?:\d{5})?$/.test(d.clientSiret.replace(/\s/g,'')))errors.push('Le SIREN / SIRET du client est invalide.');
  if(![d.date,d.serviceDate,d.dueDate].every(validDate))errors.push('Les dates de facture, prestation et échéance sont obligatoires.');
  if(d.dueDate<d.date)errors.push('L’échéance doit suivre la date de facture.');
  if(d.date>today())errors.push('Une facture ne peut pas être émise à une date future.');
  if(!d.issuer.paymentTerms.trim()||!d.issuer.earlyDiscount.trim()||(d.clientProfessional&&!d.issuer.lateFees.trim()))errors.push('Complète les conditions de paiement, d’escompte et de pénalités.');
  const totals=invoiceTotals(d);if(d.discountCents>totals.subtotal)errors.push('La remise dépasse les lignes HT.');if(d.paidCents>totals.ttc)errors.push('Le montant déjà réglé dépasse le total TTC.');if(totals.ttc<=0)errors.push('La facture doit avoir un montant positif.');
  if(d.kind==='balance'&&!d.notes.trim())errors.push('Référence les factures d’acompte et leur déduction dans les notes du solde.');
  return errors;
}
export function newInvoice(issuer:Issuer,project?:Project):InvoiceDraft{
  const lines=project?.budgetDocument?.lines.map(l=>({id:uid(),description:l.label+(l.detail?' — '+l.detail:''),quantity:l.quantity||1,unitCents:cents(l.unitPrice),vatBps:issuer.vatExempt?0:2000}));
  return invoiceDraftSchema.parse({id:uid(),projectId:project?.id||'',kind:'standard',label:project?.title||'Nouvelle facture',date:today(),serviceDate:today(),dueDate:plusDays(today(),30),clientName:project?.client||'',clientAddress:'',clientSiret:'',clientEmail:'',clientProfessional:true,issuer:{...issuer},lines:lines?.length?lines:[{id:uid(),description:project?.title||'Prestation de production',quantity:1,unitCents:cents(project?.budget||0),vatBps:issuer.vatExempt?0:2000}],discountCents:cents(project?.budgetDocument?.discount||0),paidCents:0,notes:'',updatedAt:new Date().toISOString()});
}
