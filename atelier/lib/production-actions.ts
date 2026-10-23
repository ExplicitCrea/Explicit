import type {Project,Task} from './studio.ts';
export function assignTask(task:Task,assignee:string):Task{return {...task,assignee,coAssignees:[],steps:task.steps.map(s=>!s.done&&(!s.assignee||s.assignee===task.assignee)?{...s,assignee}:s)};}
export function updateProjectTask(project:Project,id:string,fn:(t:Task)=>Task):Project{
 const previous=project.tasks.find(t=>t.id===id);if(!previous)return project;
 const changed=fn(previous);const tasks=project.tasks.map(t=>t.id===id?changed:t);
 return {...project,tasks,...(project.mcskyz?{mcskyz:{...project.mcskyz,scenes:project.mcskyz.scenes.map(s=>{if(s.id!==id)return s;const title=changed.title.startsWith(s.label)?changed.title.slice(s.label.length).replace(/^\s*[—–-]?\s*/,''):changed.title;return {...s,assignee:changed.assignee,title,label:changed.scene||s.label,...(changed.description!==previous.description?{action:changed.description}:{})};})}}:{})};
}
export function shortDescription(task:Task,project?:Project,max=150){const raw=task.description||project?.briefs.flatMap(d=>d.modules).find(m=>m.taskId===task.id)?.text||project?.mcskyz?.scenes.find(s=>s.id===task.id)?.action||task.indication||task.notes;const text=raw.replace(/\s+/g,' ').trim();return text.length>max?text.slice(0,max-1)+'…':text;}
export function removeProjectTask(project:Project,id:string):Project{
 const task=project.tasks.find(t=>t.id===id);if(!task)return project;
 const prefix=task.service+':'+task.unit+':';let slot=0;
 const generated=task.originKey.startsWith(prefix);
 const tasks=project.tasks.filter(t=>t.id!==id).map(t=>generated&&t.originKey.startsWith(prefix)?{...t,originKey:prefix+(++slot)}:t);
 return {...project,tasks,briefs:project.briefs.map(d=>({...d,modules:d.modules.map(m=>m.taskId===id?{...m,taskId:''}:m)})),workflows:project.workflows.map(f=>generated&&f.service===task.service&&f.mode===task.unit?{...f,count:Math.max(0,f.count-1)}:f),...(project.mcskyz?{mcskyz:{...project.mcskyz,scenes:project.mcskyz.scenes.filter(s=>s.id!==id)}}:{})};
}

export function assignTaskPeople(task:Task,ids:string[]):Task{const people=[...new Set(ids.filter(Boolean))];const next=assignTask(task,people[0]||'');return {...next,coAssignees:people.slice(1)};}
