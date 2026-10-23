'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, ArrowRight, ArrowUpRight, Box, Check, CircleAlert, ChevronDown, Cloud, CloudOff, Command, FolderOpen, LayoutDashboard, LoaderCircle, LockKeyhole, Menu, MoreHorizontal, Layers3, FilePlus2, Pause, Play, Plus, Search, Settings2, Sparkles, Square, Target, X, Moon, Sun, CalendarDays, Users, Lightbulb, Bell, GitBranch } from './icons';
import { allTasks, hours, rebalance, today, workspaceSchema, upcomingDeadlines, migrateWorkspace, type Asset, type Project, type Snapshot, type Task, type Workspace, type Profile } from '../lib/studio';
import { AssetLibrary, Productions, type ViewActions } from './views';
import { AssetForm, BalanceForm, BriefForm, HandoffForm, SearchForm, SettingsForm } from './editors';
import { clock, Modal, ProfilesContext } from './ui';
import { Dashboard, ProjectDetail, TeamView, CalendarView, DeadlineForm, DeadlineAlerts, IdeasView } from './production-views';
import { ProjectForm, TaskForm, ProfileForm } from './production-editors';
import { CreateProduction, TemplateManager, McSkyzPlanModal } from './project-wizard';
import { BudgetEditor } from './budget-editor';
import { InvoicesView } from './invoice-editor';
import { AgencySettings, AcceptInvitation } from './agency-settings';
import { BrandLockup, AtelierMark } from './identity';
import {updateProjectTask,removeProjectTask} from '../lib/production-actions';
import {MyWork,GraphicBible,StudioHub} from './control-center';
import {BookOpen,UserRound} from 'lucide-react';
import type { AccountContext } from '../lib/agencies';

type Tab='mine'|'bible'|'today'|'projects'|'estimate'|'assets'|'team'|'calendar'|'ideas';
type ModalState =
  | {type:'project';project?:Project;draft?:Project;tasks?:Task[];budget?:number;costs?:number;initialDate?:string}
  | {type:'budgets'} | {type:'create'} | {type:'budget';projectId:string} | {type:'template';projectId?:string} | {type:'plan';projectId:string} | {type:'agency'} | {type:'invite';token:string}
  | {type:'task';projectId:string;task?:Task}
  | {type:'asset';asset?:Asset}
  | {type:'brief';projectId?:string}
  | {type:'profile';profile?:Profile} | {type:'deadline';projectId?:string;taskId?:string;date?:string} | {type:'alerts'}
  | {type:'balance'} | {type:'settings'} | {type:'search'} | {type:'handoff';projectId:string}
  | {type:'confirm';title:string;message:string;action:()=>void;label?:string} | null;
type Timer={projectId:string;taskId:string;startedAt:number};
const nav=[{id:'mine' as const,label:'Mon travail',icon:UserRound},{id:'bible' as const,label:'Bible',icon:BookOpen},{id:'today' as const,label:'Accueil',icon:LayoutDashboard},{id:'projects' as const,label:'Projets',icon:FolderOpen},{id:'calendar' as const,label:'Agenda',icon:CalendarDays},{id:'estimate' as const,label:'Factures',icon:FilePlus2},{id:'team' as const,label:'Équipe',icon:Users}];

export default function Studio({userKey}:{userKey:string}) {
  const [,refreshClock]=useState(0);
  useEffect(()=>{const id=setInterval(()=>refreshClock(v=>v+1),60000);return()=>clearInterval(id);},[]);
  const [theme,setTheme]=useState<'light'|'dark'>('light');
  const [themeReady,setThemeReady]=useState(false);
  useEffect(()=>{
    const url=new URL(window.location.href);const requested=url.searchParams.get('theme');let saved:string|null=null;
    try{saved=localStorage.getItem('atelier-theme-'+userKey);}catch{}
    const initial=document.documentElement.dataset.theme;const fallback=initial==='dark'||initial==='light'?initial:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    setTheme(requested==='dark'||requested==='light'?requested:saved==='dark'||saved==='light'?saved:fallback);setThemeReady(true);
    if(requested==='dark'||requested==='light'){url.searchParams.delete('theme');window.history.replaceState(window.history.state,'',url.pathname+url.search+url.hash);}
  },[userKey]);
  useEffect(()=>{if(!themeReady)return;document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;try{localStorage.setItem('atelier-theme-'+userKey,theme);localStorage.setItem('atelier-theme-last',theme);}catch{}},[theme,themeReady,userKey]);
  const [context,setContext]=useState<AccountContext|null>(null);const contextRef=useRef<AccountContext|null>(null);const agencyRef=useRef('');const [invoiceProject,setInvoiceProject]=useState('');
  const [w,setW]=useState<Workspace|null>(null);const ref=useRef<Workspace|null>(null);
  const revision=useRef(0);const generation=useRef(0);const savedGeneration=useRef(0);const inFlight=useRef(false);const conflictRef=useRef(false);
  const [dirtyTick,setDirtyTick]=useState(0);const [saveTick,setSaveTick]=useState(0);
  const [loading,setLoading]=useState(true);const [loadError,setLoadError]=useState('');const [sync,setSync]=useState<'saved'|'pending'|'saving'|'error'>('saved');const [syncError,setSyncError]=useState('');const [conflict,setConflict]=useState(false);
  const [tab,setTab]=useState<Tab>('today');const [projectId,setProjectId]=useState<string|null>(null);const [modal,setModal]=useState<ModalState>(null);const [mobileMenu,setMobileMenu]=useState(false);
  const [notification,setNotification]=useState('');const notificationTimeout=useRef<ReturnType<typeof setTimeout>|null>(null);
  const [timer,setTimer]=useState<Timer|null>(null);const [elapsed,setElapsed]=useState(0);const timerKey='atelier-focus-'+userKey;
  const notify=useCallback((message:string)=>{setNotification(message);if(notificationTimeout.current)clearTimeout(notificationTimeout.current);notificationTimeout.current=setTimeout(()=>setNotification(''),4500);},[]);
  const download=useCallback((name:string,content:string,type='application/json')=>{const url=URL.createObjectURL(new Blob([content],{type}));const link=document.createElement('a');link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);},[]);
  const exportBackup=useCallback(()=>{if(ref.current)download('atelier_explicit_crea_'+today()+'.json',JSON.stringify({exportedAt:new Date().toISOString(),workspace:ref.current},null,2));},[download]);
  const load=useCallback(async()=>{
    setLoading(true);setLoadError('');
    try{const response=await fetch('/atelier/api/workspace',{cache:'no-store'});const data=await response.json() as Snapshot & {error?:string;context:AccountContext};if(!response.ok)throw new Error(data.error||'Le studio n’a pas pu être chargé.');const snapshot=data;contextRef.current=data.context;setContext(data.context);agencyRef.current=data.context.agency.id;const checked=workspaceSchema.safeParse(snapshot.workspace);if(!checked.success)throw new Error('La sauvegarde reçue n’est pas compatible.');ref.current=checked.data;setW(checked.data);revision.current=snapshot.revision;generation.current=0;savedGeneration.current=0;conflictRef.current=false;setConflict(false);setSyncError('');setSync('saved');}
    catch(error){setLoadError(error instanceof Error?error.message:'Connexion indisponible.');}
    finally{setLoading(false);}
  },[]);
  useEffect(()=>{void load();},[load]);
  const flush=useCallback(async()=>{
    if(inFlight.current||conflictRef.current||!ref.current||generation.current===savedGeneration.current)return;
    inFlight.current=true;const payload=ref.current;const thisGeneration=generation.current;setSync('saving');
    let success=false;
    try{
      const response=await fetch('/atelier/api/workspace?agency='+encodeURIComponent(agencyRef.current),{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({workspace:payload,revision:revision.current})});
      const data=await response.json() as {revision:number;error?:string};
      if(!response.ok){if(response.status===409){conflictRef.current=true;setConflict(true);}throw new Error(data.error||'La sauvegarde n’a pas abouti.');}
      revision.current=data.revision;savedGeneration.current=thisGeneration;setSyncError('');success=true;setSync(generation.current===thisGeneration?'saved':'pending');
    }catch(error){setSync('error');setSyncError(error instanceof Error?error.message:'Connexion interrompue. Garde cette page ouverte et réessaie.');}
    finally{inFlight.current=false;if(success&&generation.current!==savedGeneration.current)setSaveTick(v=>v+1);}
  },[]);
  useEffect(()=>{if(!ref.current||generation.current===savedGeneration.current||conflictRef.current)return;const id=setTimeout(()=>void flush(),650);return()=>clearTimeout(id);},[dirtyTick,saveTick,flush]);
  useEffect(()=>{function beforeUnload(e:BeforeUnloadEvent){if(generation.current!==savedGeneration.current){e.preventDefault();e.returnValue='';}}window.addEventListener('beforeunload',beforeUnload);return()=>window.removeEventListener('beforeunload',beforeUnload);},[]);
  const change=useCallback((fn:(x:Workspace)=>Workspace)=>{
    if(!ref.current)return false;
    if(contextRef.current?.agency.role==='viewer'){notify('Accès en lecture : demande un droit éditeur au propriétaire.');return false;}
    const next=fn(ref.current);if(JSON.stringify(next).length>5900000){notify('Le studio dépasse la capacité de sauvegarde. Sépare ou archive les briefs longs.');return false;}const parsed=workspaceSchema.safeParse(next);
    if(!parsed.success){notify('Modification non appliquée : '+(parsed.error.issues[0]?.message||'données invalides'));return false;}
    ref.current=parsed.data;setW(parsed.data);generation.current+=1;if(!conflictRef.current)setSync('pending');setDirtyTick(t=>t+1);return true;
  },[notify]);
  useEffect(()=>{try{const raw=localStorage.getItem(timerKey);if(raw){const value=JSON.parse(raw);if(typeof value.projectId==='string'&&typeof value.taskId==='string'&&typeof value.startedAt==='number'&&Number.isFinite(value.startedAt)&&value.startedAt<=Date.now())setTimer(value);}}catch{/* Browser storage may be unavailable. */}},[timerKey]);
  useEffect(()=>{if(!timer){setElapsed(0);return;}const update=()=>setElapsed((Date.now()-timer.startedAt)/1000);update();const interval=setInterval(update,1000);return()=>clearInterval(interval);},[timer]);
  const startFocus=useCallback((pid:string,tid:string)=>{
    if(timer){notify('Une session est déjà en cours. Enregistre-la avant d’en lancer une autre.');return;}
    const value={projectId:pid,taskId:tid,startedAt:Date.now()};setTimer(value);try{localStorage.setItem(timerKey,JSON.stringify(value));}catch{}
    change(x=>({...x,projects:x.projects.map(p=>p.id===pid?{...p,tasks:p.tasks.map(t=>t.id===tid&&t.status==='todo'?{...t,status:'doing'}:t)}:p)}));notify('Session lancée. Ton temps sera ajouté à cette tâche à l’arrêt.');
  },[timer,timerKey,change,notify]);
  function stopFocus(){
    if(!timer)return;
    const task=ref.current?.projects.find(p=>p.id===timer.projectId)?.tasks.find(t=>t.id===timer.taskId);
    if(task){const h=Math.max(0.01,Math.round((Date.now()-timer.startedAt)/3600000*100)/100);change(x=>({...x,projects:x.projects.map(p=>p.id===timer.projectId?{...p,tasks:p.tasks.map(t=>t.id===timer.taskId?{...t,actual:Math.round((t.actual+h)*100)/100}:t)}:p)}));notify(hours(h)+' ajoutée(s) à « '+task.title+' ».');if(modal?.type==='task'&&modal.task?.id===task.id)setModal(null);}
    else notify('La tâche de cette session n’existe plus. Aucun temps n’a été ajouté.');
    setTimer(null);try{localStorage.removeItem(timerKey);}catch{}
  }
  function navigate(next:Tab){if(next!=='estimate')setInvoiceProject('');setTab(next);setProjectId(null);setMobileMenu(false);window.scrollTo({top:0,behavior:'instant'});}
  const openProject=(id:string)=>{setProjectId(id);setTab('projects');setModal(null);setMobileMenu(false);window.scrollTo({top:0,behavior:'instant'});};
  useEffect(()=>{function shortcut(e:KeyboardEvent){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(ref.current)setModal(m=>m?.type==='search'?null:{type:'search'});}}window.addEventListener('keydown',shortcut);return()=>window.removeEventListener('keydown',shortcut);},[]);
  const close=()=>setModal(null);
  async function beforeAccountChange(){for(let i=0;i<100&&inFlight.current;i++)await new Promise(r=>setTimeout(r,50));await flush();if(generation.current!==savedGeneration.current)throw new Error('Enregistre tes changements avant de continuer.');}
  async function reloadAccount(){close();setProjectId(null);await load();}
  useEffect(()=>{const token=new URLSearchParams(window.location.search).get('invite');if(token&&token.length<=200)setModal({type:'invite',token});},[]);
  const a:ViewActions={openProject,editProject:(project,tasks,budget,costs)=>setModal(project||tasks?{type:'project',project,tasks,budget,costs}:{type:'create'}),editTask:(pid,task)=>setModal({type:'task',projectId:pid,task}),editAsset:asset=>setModal({type:'asset',asset}),openBrief:pid=>setModal({type:'brief',projectId:pid}),change,startFocus,balance:()=>setModal({type:'balance'}),handoff:pid=>setModal({type:'handoff',projectId:pid}),toast:notify,download,editProfile:profile=>setModal({type:'profile',profile}),deadline:(projectId,taskId,date)=>setModal({type:'deadline',projectId,taskId,date}),budget:projectId=>setModal({type:'budget',projectId}),template:projectId=>setModal({type:'template',projectId}),plan:projectId=>setModal({type:'plan',projectId}),invoice:pid=>{setInvoiceProject(pid);navigate('estimate');},readOnly:context?.agency.role==='viewer',agencyId:context?.agency.id,ensureSaved:beforeAccountChange};
  function saveProject(p:Project,makeBudget=false){if(!change(x=>({...x,projects:x.projects.some(v=>v.id===p.id)?x.projects.map(v=>v.id===p.id?p:v):[...x.projects,p]})))return;setModal(null);openProject(p.id);if(makeBudget)setModal({type:'budget',projectId:p.id});notify('Le projet est prêt.');}
  function clearDemo(){setModal({type:'confirm',title:'Faire place à ton studio',message:'Les projets d’exemple seront retirés. Tes propres projets et les assets utilisés par tes projets seront conservés. Exporte une sauvegarde si tu veux garder les exemples.',label:'Retirer les exemples',action:()=>{change(x=>{const projects=x.projects.filter(p=>!p.demo);const used=new Set(projects.flatMap(p=>p.tasks.map(t=>t.assetId)));return{...x,projects,assets:x.assets.filter(v=>!v.demo||used.has(v.id))};});setProjectId(null);close();notify('L’atelier est à toi.');}});}
  const selected=w?.projects.find(p=>p.id===projectId);const activeTimerTask=w?.projects.find(p=>p.id===timer?.projectId)?.tasks.find(t=>t.id===timer?.taskId);
  const pageName=selected?.title??nav.find(n=>n.id===tab)?.label??(tab==='assets'?'Assets':tab==='ideas'?'Idées':'Accueil');

  if(loading||!w||!context||loadError)return <div className="loading-screen"><div className="loading-brand"><BrandLockup/></div><p>{loadError||'Chargement d’Atelier…'}</p>{loadError?<div className="button-row"><button className="button primary" onClick={()=>void load()}>Réessayer<ArrowRight size={16}/></button><a className="button secondary" target="_top" href="/atelier/signin-with-chatgpt?return_to=%2F">Se reconnecter</a></div>:<LoaderCircle className="spinner" size={25}/>}<span>EXPLICIT CREA / TON ESPACE PRIVÉ</span></div>;
  return <ProfilesContext.Provider value={w.profiles}><div className={'app-shell '+(timer?'has-timer':'')}>
    {mobileMenu&&<div className="sidebar-scrim" onClick={()=>setMobileMenu(false)}/>}
    <aside className={'sidebar '+(mobileMenu?'mobile-open':'')}><button className="brand" onClick={()=>navigate('today')} aria-label="Atelier, accueil"><BrandLockup/></button><button className="workspace-chip" onClick={()=>setModal({type:'agency'})}><span className="ec-logo"><AtelierMark size={25}/></span><strong>{context.agency.name}</strong><ChevronDown size={13}/></button><nav aria-label="Navigation principale">{nav.map(({id,label,icon:Icon})=><button key={id} aria-current={tab===id?'page':undefined} className={'nav-item '+(tab===id?'active':'')} onClick={()=>navigate(id)}><Icon size={19}/><span className="nav-text">{label}</span>{id==='projects'&&<small>{w.projects.filter(p=>p.status==='active').length}</small>}</button>)}<details className="nav-more"><summary><MoreHorizontal size={19}/><span>Plus</span><ChevronDown size={13}/></summary><div><button onClick={()=>navigate('assets')}><Box size={17}/>Assets</button><button onClick={()=>setModal({type:'template'})}><Layers3 size={17}/>Modèles</button><button onClick={()=>navigate('ideas')}><Lightbulb size={17}/>Idées</button><button onClick={()=>setModal({type:'settings'})}><Settings2 size={17}/>Réglages</button></div></details></nav><div className="sidebar-bottom"><p className="sidebar-caption">Crafted with passion<br/>&amp; aesthetic</p><button className="profile" onClick={()=>setModal({type:'agency'})}><span className="profile-avatar">{context.name.slice(0,1)}</span><span><b>{context.name}</b><small>Mon compte</small></span><Settings2 size={16}/></button></div></aside>
    <div className="workspace-main"><header className="topbar"><div className="topbar-left"><button className="icon-button mobile-nav" aria-label="Ouvrir le menu" onClick={()=>setMobileMenu(!mobileMenu)}><Menu size={21}/></button><span className="breadcrumb">Atelier<span>/</span><b>{pageName}</b></span></div><div className="topbar-actions"><button className="icon-button theme-toggle theme-switch" aria-pressed={theme==='dark'} aria-label={theme==='dark'?'Passer au mode jour':'Passer au mode nuit'} title={theme==='dark'?'Mode jour':'Mode nuit'} onClick={()=>setTheme(v=>v==='dark'?'light':'dark')}>{theme==='dark'?<Moon size={17}/>:<Sun size={17}/>}<span>{theme==='dark'?'Nuit':'Jour'}</span></button><button className="icon-button deadline-bell" aria-label="Voir les rappels d’échéance" title="Rappels d’échéance" onClick={()=>setModal({type:'alerts'})}><Bell size={17}/>{upcomingDeadlines(w).length>0&&<span>{upcomingDeadlines(w).length}</span>}</button><span className={'sync-state '+sync} aria-live="polite" title={sync==='saved'?'Enregistré':sync==='error'?'À sauvegarder':sync==='saving'?'Sauvegarde…':'Modification…'}>{sync==='saved'?<Cloud size={14}/>:sync==='error'?<CloudOff size={14}/>:<LoaderCircle size={14} className={sync==='saving'?'spinner':''}/>}<span>{sync==='saved'?'Enregistré':sync==='error'?'À sauvegarder':sync==='saving'?'Sauvegarde…':'Modification…'}</span></span><button className="icon-button global-search" title="Rechercher · Ctrl / Cmd K" onClick={()=>setModal({type:'search'})} aria-label="Rechercher (Ctrl ou Cmd K)"><Search size={17}/></button><button className="button primary small top-new" disabled={a.readOnly} onClick={()=>setModal({type:'create'})}><Plus size={15}/><span>Nouveau</span></button></div></header>
      <main className="page-content" id="main-content">{a.readOnly&&<div className="info-banner"><LockKeyhole size={17}/><span>Accès en lecture à {context.agency.name}. Les modifications sont réservées aux éditeurs.</span></div>}
        {syncError&&<div className="save-error" role="alert"><CircleAlert size={18}/><p>{syncError}</p><button className="button secondary small" onClick={exportBackup}>Exporter ma copie</button>{conflict?<button className="button primary small" onClick={()=>setModal({type:'confirm',title:'Charger la version enregistrée ?',message:'Tes changements locaux non sauvegardés seront remplacés. Exporte ta copie avant de continuer.',label:'Charger la sauvegarde',action:()=>{close();void load();}})}>Charger la sauvegarde</button>:<button className="button primary small" onClick={()=>void flush()}>Réessayer</button>}</div>}
        {w.projects.some(p=>p.demo)&&tab==='today'&&<div className="demo-banner"><span className="demo-spark"><Sparkles size={14}/></span><p>Exemples fictifs</p><button onClick={clearDemo}>Retirer les exemples<ArrowRight size={14}/></button></div>}
        {tab==='today'&&<StudioHub onProjects={()=>navigate('projects')} onBible={()=>navigate('bible')} onInvoices={()=>navigate('estimate')} onBudgets={()=>setModal({type:'budgets'})}/>}
        {tab==='mine'?<MyWork w={w} a={a} profileId={context.profileId} name={context.name} onAccount={()=>setModal({type:'agency'})}/>:tab==='bible'?<GraphicBible w={w} a={a}/>:tab==='today'?<Dashboard name={context.name} w={w} a={a} onProductions={()=>navigate('projects')} onCalendar={()=>navigate('calendar')}/>:tab==='projects'?selected?<ProjectDetail key={selected.id} project={selected} w={w} a={a} onBack={()=>{setProjectId(null);window.scrollTo(0,0);}}/>:<Productions w={w} a={a}/>:tab==='estimate'?<InvoicesView key={context.agency.id+invoiceProject} w={w} a={a} context={context} initialProjectId={invoiceProject}/>:tab==='calendar'?<CalendarView w={w} a={a}/>:tab==='team'?<TeamView w={w} a={a}/>:tab==='ideas'?<IdeasView w={w} a={a}/>:<AssetLibrary w={w} a={a}/>}
        <footer className="page-footer"><span><AtelierMark size={16}/>ATELIER <span>×</span> EXPLICIT CREA</span><span>Crafted with passion &amp; aesthetic</span><button onClick={()=>setModal({type:'settings'})}><Settings2 size={13}/>Réglages</button></footer>
      </main>
    </div>
    {timer&&<div className="focus-bar"><span className="focus-pulse"/><div className="focus-label"><span>SESSION EN COURS</span><b>{activeTimerTask?.title??'Session à terminer'}</b></div><strong className="focus-clock">{clock(elapsed)}</strong><button className="button light small" onClick={stopFocus}><Square size={12} fill="currentColor"/>Enregistrer le temps</button></div>}
    {notification&&<div className="toast" role="status"><Check size={17}/><span>{notification}</span><button className="icon-button" aria-label="Fermer le message" onClick={()=>setNotification('')}><X size={14}/></button></div>}
    {modal?.type==='create'&&<CreateProduction w={w} onManual={draft=>setModal({type:'project',draft})} onSave={saveProject} onClose={close} toast={notify}/>}
    {modal?.type==='budgets'&&<Modal title="Budgétisation" subtitle="Choisis le projet à présenter." onClose={close}>{w.projects.filter(p=>!p.demo).length?w.projects.filter(p=>!p.demo).map(p=><button className="alert-event" key={p.id} onClick={()=>setModal({type:'budget',projectId:p.id})}><FolderOpen size={20}/><div><b>{p.title}</b><small>{p.client}</small></div><ArrowUpRight size={17}/></button>):<p>Crée ton premier projet pour préparer son document de budget.</p>}</Modal>}
    {modal?.type==='budget'&&w.projects.find(p=>p.id===modal.projectId)&&<BudgetEditor project={w.projects.find(p=>p.id===modal.projectId)!} w={w} agency={context.agency.name} onSave={p=>saveProject(p)} onClose={close} toast={notify} download={download}/>}
    {modal?.type==='template'&&<TemplateManager w={w} project={w.projects.find(p=>p.id===modal.projectId)} onChange={change} onClose={close} toast={notify}/>}
    {modal?.type==='plan'&&w.projects.find(p=>p.id===modal.projectId)?.mcskyz&&<McSkyzPlanModal project={w.projects.find(p=>p.id===modal.projectId)!} onSave={p=>saveProject(p)} onClose={close} toast={notify}/>}
    {modal?.type==='agency'&&<AgencySettings context={context} profiles={w.profiles} onReload={reloadAccount} onReloadBefore={beforeAccountChange} onClose={close} toast={notify}/>}
    {modal?.type==='invite'&&<AcceptInvitation token={modal.token} onDone={reloadAccount} onClose={()=>{window.history.replaceState(null,'','/atelier/');close();}} toast={notify}/>}
    {modal?.type==='project'&&<ProjectForm key={modal.project?.id??'new'} project={modal.project} draft={modal.draft} tasks={modal.tasks} budget={modal.budget} costs={modal.costs} initialDate={modal.initialDate} onSave={saveProject} onDelete={id=>setModal({type:'confirm',title:'Supprimer ce projet ?',message:'Le projet et ses tâches seront retirés de ton studio. Les assets référencés dans la bibliothèque seront conservés.',label:'Supprimer le projet',action:()=>{change(x=>({...x,projects:x.projects.filter(p=>p.id!==id)}));setProjectId(null);close();}})} onClose={close} toast={notify}/>}
    {modal?.type==='task'&&w.projects.find(p=>p.id===modal.projectId)&&<TaskForm key={modal.task?.id??'new-task'} project={w.projects.find(p=>p.id===modal.projectId)!} task={modal.task} assets={w.assets} onSave={task=>{const pid=modal.projectId;change(x=>({...x,projects:x.projects.map(p=>p.id===pid?(p.tasks.some(t=>t.id===task.id)?updateProjectTask(p,task.id,()=>task):{...p,tasks:[...p.tasks,task]}):p)}));close();}} onDelete={id=>{const pid=modal.projectId;setModal({type:'confirm',title:'Retirer cette tâche ?',message:'Cet élément et ses validations seront retirés du projet.',label:'Retirer la tâche',action:()=>{change(x=>({...x,projects:x.projects.map(p=>p.id===pid?removeProjectTask(p,id):p)}));close();}});}} onClose={close} toast={notify}/>}
    {modal?.type==='asset'&&<AssetForm key={modal.asset?.id??'new-asset'} asset={modal.asset} onSave={asset=>{change(x=>({...x,assets:x.assets.some(v=>v.id===asset.id)?x.assets.map(v=>v.id===asset.id?asset:v):[...x.assets,asset]}));close();notify('Asset référencé.');}} onDelete={id=>setModal({type:'confirm',title:'Retirer cet asset ?',message:'Sa fiche sera supprimée et ses liens avec les tâches seront retirés. Le fichier 3D reste dans tes dossiers.',label:'Retirer la référence',action:()=>{change(x=>({...x,assets:x.assets.filter(v=>v.id!==id),projects:x.projects.map(p=>({...p,tasks:p.tasks.map(t=>t.assetId===id?{...t,assetId:''}:t)}))}));close();}})} onClose={close} toast={notify}/>}
    {modal?.type==='brief'&&<BriefForm w={w} project={w.projects.find(p=>p.id===modal.projectId)} onPlan={tasks=>{if(modal.projectId){const pid=modal.projectId;change(x=>({...x,projects:x.projects.map(p=>p.id===pid?{...p,tasks:[...p.tasks,...tasks]}:p)}));close();openProject(pid);notify('Le plan a été ajouté au projet.');}else setModal({type:'project',tasks});}} onClose={close} toast={notify}/>}
    {modal?.type==='balance'&&<BalanceForm w={w} onApply={()=>{change(rebalance);close();notify('Les tâches à faire ont été rééquilibrées.');}} onClose={close}/>}
    {modal?.type==='handoff'&&w.projects.find(p=>p.id===modal.projectId)&&<HandoffForm project={w.projects.find(p=>p.id===modal.projectId)!} w={w} download={download} onClose={close} toast={notify}/>}
    {modal?.type==='settings'&&<SettingsForm w={w} onSave={settings=>{change(x=>({...x,settings}));close();notify('Tes règles sont à jour.');}} onExport={exportBackup} onRestore={copy=>setModal({type:'confirm',title:'Restaurer cette sauvegarde ?',message:`Elle contient ${copy.projects.length} projet(s) et ${copy.assets.length} asset(s). Elle remplacera les données actuelles de ton studio.`,label:'Restaurer la sauvegarde',action:()=>{change(()=>copy);setProjectId(null);close();notify('Sauvegarde restaurée.');}})} onClear={clearDemo} onClose={close} toast={notify}/>}
    {modal?.type==='search'&&<SearchForm w={w} onProject={openProject} onTask={(pid,task)=>setModal({type:'task',projectId:pid,task})} onAsset={asset=>setModal({type:'asset',asset})} onClose={close}/>}

    {modal?.type==='profile'&&<ProfileForm profile={modal.profile} onSave={profile=>{change(x=>({...x,profiles:x.profiles.some(p=>p.id===profile.id)?x.profiles.map(p=>p.id===profile.id?profile:p):[...x.profiles,profile]}));close();notify('Le profil est prêt.');}} onDelete={w.profiles.length>1?id=>setModal({type:'confirm',title:'Retirer ce profil ?',message:'Son travail reste dans les projets. Ses affectations seront marquées « À attribuer ». Tu peux aussi archiver le profil pour garder son nom dans l’historique.',label:'Retirer le profil',action:()=>{change(x=>({...x,profiles:x.profiles.filter(p=>p.id!==id),projects:x.projects.map(p=>({...p,leadIds:p.leadIds.filter(lead=>lead!==id),mcskyz:p.mcskyz?{...p.mcskyz,scenes:p.mcskyz.scenes.map(s=>s.assignee===id?{...s,assignee:'',locked:false}:s)}:undefined,workflows:p.workflows.map(f=>({...f,assignee:f.assignee===id?'':f.assignee,assignments:Object.fromEntries(Object.entries(f.assignments).map(([k,v])=>[k,v===id?'':v]))})),tasks:p.tasks.map(t=>({...t,assignee:t.assignee===id?(t.coAssignees.find(person=>person!==id)||''):t.assignee,coAssignees:t.coAssignees.filter(person=>person!==id).slice(t.assignee===id?1:0),steps:t.steps.map(s=>({...s,assignee:s.assignee===id?'':s.assignee}))}))}))}));close();}}):undefined} onClose={close} toast={notify}/>}
    {modal?.type==='deadline'&&<DeadlineForm w={w} projectId={modal.projectId} taskId={modal.taskId} date={modal.date} onClose={close} onSave={(pid,tid,date,reminder)=>{change(x=>({...x,projects:x.projects.map(p=>p.id===pid?{...p,reminderDays:reminder,deadline:tid?p.deadline:date,tasks:tid?p.tasks.map(t=>t.id===tid?{...t,deadline:date}:t):p.tasks}:p)}));close();notify('L’échéance est enregistrée.');}}/>}
    {modal?.type==='alerts'&&<DeadlineAlerts w={w} onOpen={(projectId,taskId,date)=>setModal({type:'deadline',projectId,taskId,date})} onClose={close}/>}
    {modal?.type==='confirm'&&<Modal title={modal.title} onClose={close}><p className="confirm-message">{modal.message}</p><footer className="modal-footer"><button className="button secondary" onClick={close}>Annuler</button><button className="button primary" onClick={modal.action}>{modal.label??'Confirmer'}<ArrowRight size={16}/></button></footer></Modal>}
  </div></ProfilesContext.Provider>;
}
