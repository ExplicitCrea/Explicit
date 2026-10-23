import { env } from '@/lib/vercel-runtime';
import { AccessError,requireOwner,type AccountContext } from './agencies';
import { invoiceErrors } from './invoices';
import type { InvoiceDraft,IssuedInvoice } from './workspace-extras';
const db=()=>env.DB!;
type InvoiceRow={id:string;number:string;content:string;issued_at:string;paid_cents:number};
const present=(r:InvoiceRow):IssuedInvoice=>({id:r.id,number:r.number,draft:JSON.parse(r.content),issuedAt:r.issued_at,paidCents:r.paid_cents});
const normalized=(s:string)=>s.replace(/\s/g,'');
const sequenceId=(agency:string,siret:string,year:number)=>agency+'::'+normalized(siret)+'::'+year;
export async function invoiceLedger(ctx:AccountContext){

 const rows=await db().prepare('SELECT id,number,content,issued_at,paid_cents FROM atelier_issued_invoices WHERE agency_id=? ORDER BY issued_at DESC').bind(ctx.agency.id).all<InvoiceRow>();
 const sequences=await db().prepare('SELECT year,prefix,next_number,issuer_siret FROM atelier_issuer_sequences WHERE agency_id=? ORDER BY year DESC,issuer_siret').bind(ctx.agency.id).all();
 return {invoices:rows.results.map(present),sequences:sequences.results};
}
export async function configureSequence(ctx:AccountContext,year:number,prefix:string,next:number,siret:string){
 requireOwner(ctx);const id=sequenceId(ctx.agency.id,siret,year);
 const existing=await db().prepare('SELECT id FROM atelier_issuer_sequences WHERE id=?').bind(id).first();
 if(existing)throw new AccessError('Cette séquence est déjà configurée et ne peut pas être réinitialisée.',409);
 await db().prepare('INSERT INTO atelier_issuer_sequences (id,agency_id,year,issuer_siret,prefix,next_number) VALUES (?,?,?,?,?,?)').bind(id,ctx.agency.id,year,normalized(siret),prefix,next).run();
}
export async function issueInvoice(ctx:AccountContext,draft:InvoiceDraft):Promise<IssuedInvoice>{
 requireOwner(ctx);
 const existing=await db().prepare('SELECT id,number,content,issued_at,paid_cents FROM atelier_issued_invoices WHERE agency_id=? AND draft_id=?').bind(ctx.agency.id,draft.id).first<InvoiceRow>();
 if(existing)return present(existing);
 const errors=invoiceErrors(draft);if(errors.length)throw new AccessError(errors[0],400);
 const siret=normalized(draft.issuer.siret),year=Number(draft.date.slice(0,4)),seq=sequenceId(ctx.agency.id,siret,year);
 const sequence=await db().prepare('SELECT id FROM atelier_issuer_sequences WHERE id=?').bind(seq).first();
 if(!sequence)throw new AccessError('Configure le prochain numéro pour cet émetteur et cette année.',400);
 const id=crypto.randomUUID(),now=new Date().toISOString();
 await db().batch([
  db().prepare("INSERT INTO atelier_issued_invoices (id,agency_id,issuer_siret,draft_id,number,content,issued_at,paid_cents) SELECT ?,?,?,?,prefix||printf('%04d',next_number),?,?,? FROM atelier_issuer_sequences WHERE id=? AND NOT EXISTS (SELECT 1 FROM atelier_issued_invoices WHERE agency_id=? AND issuer_siret=? AND json_extract(content,'$.date')>?) ON CONFLICT(agency_id,draft_id) DO NOTHING").bind(id,ctx.agency.id,siret,draft.id,JSON.stringify(draft),now,draft.paidCents,seq,ctx.agency.id,siret,draft.date),
  db().prepare('UPDATE atelier_issuer_sequences SET next_number=next_number+1 WHERE id=? AND EXISTS (SELECT 1 FROM atelier_issued_invoices WHERE id=?)').bind(seq,id),
 ]);
 const row=await db().prepare('SELECT id,number,content,issued_at,paid_cents FROM atelier_issued_invoices WHERE agency_id=? AND draft_id=?').bind(ctx.agency.id,draft.id).first<InvoiceRow>();
 if(!row)throw new AccessError('La date précède la dernière facture de cet émetteur. Corrige la date.',409);
 return present(row);
}
