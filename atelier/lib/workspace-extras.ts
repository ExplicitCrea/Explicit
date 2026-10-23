import { z } from 'zod';
import { workflowSchema } from './production.ts';

const text=(max=200)=>z.string().max(max);
export const sourceSceneSchema=z.object({
  id:text(180),label:text(80),title:text(180),pages:z.array(z.number().int().min(1).max(500)).max(100),
  source:text(18000),action:text(6000),cameras:text(4000),characters:text(2000),props:text(2000),
  environment:text(180),variant:text(300),difficulty:z.number().int().min(1).max(5),reason:text(500),
  assignee:text(180),locked:z.boolean().default(false),reviewed:z.boolean().default(false),
});
export type SourceScene=z.infer<typeof sourceSceneSchema>;
export const mcskyzSchema=z.object({fileName:text(250),importedAt:text(50),method:z.literal('pdf-text-v1'),declaredScenes:z.number().int().min(0).max(1000).nullable(),warnings:z.array(text(700)).max(100),scenes:z.array(sourceSceneSchema).max(200),planNotes:text(10000).default('')});
export type McSkyzPlan=z.infer<typeof mcskyzSchema>;
export const templateSchema=z.object({id:text(180),name:z.string().trim().min(1).max(100),description:text(500),workflows:z.array(workflowSchema).min(1).max(5),notes:text(10000).default('')});
export type ProjectTemplate=z.infer<typeof templateSchema>;
export const budgetDocumentSchema=z.object({
  lines:z.array(z.object({id:text(180),label:z.string().trim().min(1).max(100),detail:text(350),quantity:z.number().min(0).max(10000),unitPrice:z.number().min(0).max(1000000)})).max(5),
  discount:z.number().min(0).max(10000000).default(0),duration:text(120),shots:text(120),characters:text(500),deliverables:text(700),
  phases:z.array(z.object({dates:text(100),scope:text(250)})).length(4),conditions:text(1200),notes:text(1000),contactEmail:text(150),contactWebsite:text(200),
});
export type BudgetDocument=z.infer<typeof budgetDocumentSchema>;
export const issuerSchema=z.object({name:text(180),legalForm:text(100),address:text(500),siret:text(20),email:text(180),vatNumber:text(60),vatExempt:z.boolean(),bank:text(500),paymentTerms:text(500),lateFees:text(350),earlyDiscount:text(200)});
export type Issuer=z.infer<typeof issuerSchema>;
export const issuerProfileSchema=z.object({id:z.string().min(1).max(180),label:z.string().trim().min(1).max(80),issuer:issuerSchema});
export type IssuerProfile=z.infer<typeof issuerProfileSchema>;
export const clientProfileSchema=z.object({id:z.string().min(1).max(180),label:z.string().trim().min(1).max(80),name:z.string().trim().min(1).max(180),address:text(500),siret:text(20),email:text(180),professional:z.boolean().default(true)});
export type ClientProfile=z.infer<typeof clientProfileSchema>;
export const blankIssuer=():Issuer=>({name:'',legalForm:'Entreprise individuelle',address:'',siret:'',email:'',vatNumber:'',vatExempt:true,bank:'',paymentTerms:'Paiement par virement à échéance.',lateFees:'',earlyDiscount:'Aucun escompte pour paiement anticipé.'});
export const invoiceDraftSchema=z.object({
  id:z.string().min(1).max(180),projectId:text(180),kind:z.enum(['standard','deposit','balance']),label:z.string().trim().min(1).max(180),
  date:text(10),serviceDate:text(10),dueDate:text(10),clientName:text(180),clientAddress:text(500),clientSiret:text(20),clientEmail:text(180),clientProfessional:z.boolean(),
  issuerProfileId:text(180).default(''),clientProfileId:text(180).default(''),issuer:issuerSchema,lines:z.array(z.object({id:text(180),description:z.string().trim().min(1).max(1000),quantity:z.number().min(0.001).max(100000),unitCents:z.number().int().min(0).max(100000000),vatBps:z.number().int().min(0).max(10000)})).min(1).max(100),
  discountCents:z.number().int().min(0).max(100000000),paidCents:z.number().int().min(0).max(100000000),notes:text(3000),updatedAt:text(50),
});
export type InvoiceDraft=z.infer<typeof invoiceDraftSchema>;
export type IssuedInvoice={id:string;number:string;issuedAt:string;draft:InvoiceDraft;paidCents:number};
