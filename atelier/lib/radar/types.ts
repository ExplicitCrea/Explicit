import {z} from 'zod';

const safeKey=z.string().min(1).max(180).regex(/^[\w.-]+$/).refine(k=>!['__proto__','prototype','constructor'].includes(k));
const scalar=z.union([z.string().max(20000),z.number().finite().min(-1e12).max(1e12),z.boolean(),z.null()]);
export const trackingEntrySchema=z.object({
 status:z.enum(['À qualifier','À contacter','Contacté','En discussion','Gagné','À exclure']).optional(),
 notes:z.string().max(20000).optional(),updated:z.string().max(60).optional(),
 qualification:z.record(safeKey,scalar).refine(v=>Object.keys(v).length<=40).optional(),
});
export const radarStateSchema=z.object({
 tracking:z.record(safeKey,trackingEntrySchema).refine(v=>Object.keys(v).length<=2000),
 auditSettings:z.record(safeKey,scalar).refine(v=>Object.keys(v).length<=100),
});
export type RadarState=z.infer<typeof radarStateSchema>;
export const emptyRadarState=():RadarState=>({tracking:{},auditSettings:{}});
export type Statement={text:string;args:unknown[]};
export type RadarDatabase={query:(text:string,args?:unknown[])=>Promise<Record<string,any>[]>;batch:(statements:Statement[])=>Promise<unknown>};
export type ScanJob={id:string;sourceId:string;company:string;title:string;description:string;firstSeen:string;lastSeen:string;status:string;missingCount:number;[key:string]:any};
export type ScanSnapshot={sources:any[];assisted:any[];runs:any[];sourceRuns:any[];jobs:ScanJob[];hypotheses:any[];scope:string;notice?:string;readOnly?:boolean;limits?:{jobs:number;total:number}};
export const legacyOwner='BcWLMyvjdMxgTeorM71mpz51AOQovcs6RmdEPDht5zJWaMksihJbfm';
export const legacyOrigin='https://explicit-prospect-radar.asbel-mac.chatgpt.site';
export function isLegacyAgency(agency:{owner_id:string;workspace_key:string}){return agency.owner_id===legacyOwner&&agency.workspace_key===legacyOwner;}
