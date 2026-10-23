import type {IssuerProfile,ClientProfile,InvoiceDraft} from './workspace-extras.ts';
import type {Workspace} from './studio.ts';
export function defaultIssuer(w:Workspace){return w.issuerProfiles.find(p=>p.id===w.defaultIssuerId)??w.issuerProfiles[0]??null;}
export function withIssuer(d:InvoiceDraft,profile:IssuerProfile):InvoiceDraft{return {...d,issuerProfileId:profile.id,issuer:structuredClone(profile.issuer),lines:d.lines.map(l=>({...l,vatBps:profile.issuer.vatExempt?0:d.issuer.vatExempt?2000:l.vatBps}))};}
export function withClient(d:InvoiceDraft,profile:ClientProfile):InvoiceDraft{return {...d,clientProfileId:profile.id,clientName:profile.name,clientAddress:profile.address,clientSiret:profile.siret,clientEmail:profile.email,clientProfessional:profile.professional};}
