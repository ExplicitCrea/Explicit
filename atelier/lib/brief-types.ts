import {z} from 'zod';
export const briefImageSchema=z.object({fileId:z.string().uuid(),caption:z.string().max(250),kind:z.enum(['image','page']),page:z.number().int().min(1).max(120),width:z.number().int().min(1).max(4096),height:z.number().int().min(1).max(4096)});
export const briefModuleSchema=z.object({id:z.string().uuid(),sceneRef:z.string().max(80),title:z.string().trim().min(1).max(180),text:z.string().max(60000),pages:z.array(z.number().int().min(1).max(120)).min(1).max(120),taskId:z.string().max(180).default(''),images:z.array(briefImageSchema).max(120)});
export const briefDocumentSchema=z.object({id:z.string().uuid(),fileId:z.string().uuid(),name:z.string().max(250),fingerprint:z.string().regex(/^[a-f0-9]{64}$/),pageCount:z.number().int().min(1).max(120),addedAt:z.string().max(50),warnings:z.array(z.string().max(600)).max(40),modules:z.array(briefModuleSchema).min(1).max(200)});
export type BriefImage=z.infer<typeof briefImageSchema>;
export type BriefModule=z.infer<typeof briefModuleSchema>;
export type BriefDocument=z.infer<typeof briefDocumentSchema>;
export type ProjectFile={id:string;name:string;mime:string;kind:'pdf'|'image'|'page';size:number;width:number;height:number;page:number};
export function projectFileURL(id:string,agency:string,download=false){const params=new URLSearchParams({id,agency});if(download)params.set('download','1');return '/atelier/api/project-files?'+params;}
