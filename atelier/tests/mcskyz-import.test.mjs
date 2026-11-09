import test from 'node:test';
import assert from 'node:assert/strict';
import {parseMcSkyz,allocateScenes,projectFromMcSkyz} from '../lib/mcskyz.ts';
import {structureBrief,attachBrief} from '../lib/brief-layout.ts';
import {findSceneHeadings,sceneHeading} from '../lib/scene-headings.ts';

const block=(n,title='Entrée dans le hall')=>`${n}. ${title}\nPhrase du script : « Une personne arrive. »\nDécor : Hall principal\nScène : Le personnage ouvre la porte.\nIl traverse le hall.\nCaméra : Travelling avant.\nPersonnages : Personnage principal\nProps : Sac`;
const layout=pages=>pages.map(p=>({number:p.number,width:600,height:900,lines:p.text.split('\n').map((text,i,all)=>({text,x:.08,y:(i+1)/(all.length+2),width:.84,height:.01}))}));

test('un brief de 25 scènes numérotées devient 25 tâches, avec ses champs et une répartition 13/12',()=>{
 const pages=[{number:1,text:'Document SCÈNES 3D, 25 scènes.\nConsignes générales à conserver.'},...Array.from({length:25},(_,i)=>({number:i+2,text:block(i+1)}))];
 const plan=parseMcSkyz(pages,'brief-client.pdf');
 assert.equal(plan.declaredScenes,25);
 assert.deepEqual(plan.scenes.map(s=>s.label),Array.from({length:25},(_,i)=>'SC.'+String(i+1).padStart(2,'0')));
 assert.match(plan.planNotes,/Consignes générales/);
 for(const scene of plan.scenes){
  assert.equal(scene.environment,'Hall principal');
  assert.equal(scene.action,'Le personnage ouvre la porte.\nIl traverse le hall.');
  assert.equal(scene.cameras,'Travelling avant.');
  assert.equal(scene.characters,'Personnage principal');
  assert.equal(scene.props,'Sac');
 }
 const allocated={...plan,scenes:allocateScenes(plan.scenes,'louis','vincent')};
 const project=projectFromMcSkyz(allocated,'Production test','2026-12-01');
 assert.equal(project.tasks.length,25);
 assert.equal(project.tasks.filter(t=>t.assignee==='louis').length,13);
 assert.equal(project.tasks.filter(t=>t.assignee==='vincent').length,12);
 assert.equal(new Set(project.tasks.map(t=>t.scene)).size,25);
 assert.ok(project.tasks.every(t=>t.description.startsWith('Le personnage ouvre')));
 assert.equal(plan.warnings.length,0);
});

test('les sommaires, listes de prix et références dans le récit ne créent pas de scènes',()=>{
 for(const text of [
  'Document 3D, 2 scènes\n1. Arrivée\n2. Départ',
  'Devis pour 2 scènes\n1. Modélisation : 250 €\n2. Animation : 500 €',
  'Dans le script : la scène 12 reprend la 3D 3.\nLa photo de la scène de crime est une référence.',
 ])assert.equal(parseMcSkyz([{number:1,text}]).scenes.length,0);
 const headings=findSceneHeadings(('SOMMAIRE\n1. Arrivée\n2. Départ\nBRIEF DÉTAILLÉ\n'+block(1)+'\n'+block(2)).split('\n'));
 assert.equal(headings.size,2);
 assert.deepEqual([...headings.values()].map(h=>h.ref),['SC.01','SC.02']);
});

test('les anciens préfixes, les séquences et les variantes A/B conservent leurs références',()=>{
 const headings=['Scène 01A — Hall','SC.01 B : Couloir','Séquence 2 — Extérieur','3D 03 — Porte','Scène A — Insert'];
 assert.deepEqual(headings.map(h=>sceneHeading(h)?.ref),['SC.01A','SC.01B','SEQ.02','SC.03','SC.A']);
 assert.equal(parseMcSkyz([{number:1,text:'Scène 01 | Hôtel | Marche lente\nScène 02 | Rue | Arrivée'}]).scenes.length,2);
 const variants=parseMcSkyz([{number:1,text:'2 scènes\n'+block('1A')+'\n'+block('1B')+'\n'+block(2)}]);
 assert.equal(variants.scenes.length,3);
 assert.ok(variants.warnings.some(w=>w.includes('3 références distinctes')));
});

test('un titre en fin de page et une action sur plusieurs pages restent dans la même scène',()=>{
 const plan=parseMcSkyz([
  {number:1,text:'Consignes générales\n1. Le hall'},
  {number:2,text:'Décor : Hall\nScène : La porte s’ouvre.'},
  {number:3,text:'Le personnage entre.\nCaméra : Vue fixe.\n'+block(2)},
 ]);
 assert.equal(plan.scenes.length,2);
 assert.deepEqual(plan.scenes[0].pages,[1,2,3]);
 assert.equal(plan.scenes[0].action,'La porte s’ouvre.\nLe personnage entre.');
 assert.equal(plan.scenes[0].cameras,'Vue fixe.');
});

test('un en-tête répété sur la page suivante ne fait pas disparaître la première partie',()=>{
 const plan=parseMcSkyz([
  {number:1,text:'Scène 01 — Le hall\nDécor : Hall\nAction : Première action.'},
  {number:2,text:'Scène 01 — Le hall\nAction : Deuxième action.\nCaméra : Plan large.'},
 ]);
 assert.equal(plan.scenes.length,1);
 assert.deepEqual(plan.scenes[0].pages,[1,2]);
 assert.match(plan.scenes[0].action,/Première action/);
 assert.match(plan.scenes[0].action,/Deuxième action/);
 assert.match(plan.scenes[0].source,/Première action/);
});

test('les pieds de page et le contexte de la scène suivante ne deviennent pas des consignes caméra',()=>{
 const plan=parseMcSkyz([{number:1,text:block(1)+'\nSTUDIO | 3D | Projet | page 1\nCONTEXTE DU CHAPITRE SUIVANT\nDans le script : « Un autre récit. »\n'+block(2)}]);
 assert.equal(plan.scenes[0].cameras,'Travelling avant.');
 assert.doesNotMatch(plan.scenes[0].action,/Phrase du script|Caméra|CONTEXTE/);
});

test('Brief et PDF reconnaît les mêmes scènes et les relie au plan sans doubler les tâches',()=>{
 const pages=[{number:1,text:'Consignes générales\n'+block(1)+'\n'+block(2)},{number:2,text:block(3)}];
 const plan=parseMcSkyz(pages),structured=structureBrief(layout(pages));
 const scenes=structured.modules.filter(m=>m.sceneRef);
 assert.deepEqual(scenes.map(m=>m.sceneRef),plan.scenes.map(s=>s.label));
 assert.equal(structured.modules.filter(m=>!m.sceneRef).length,1);
 assert.ok(scenes.every(m=>structured.segments.some(s=>s.moduleId===m.id)));
 const project=projectFromMcSkyz({...plan,scenes:allocateScenes(plan.scenes,'louis','vincent')},'Test','2026-12-01');
 const attached=attachBrief(project,{id:'document',name:'brief.pdf',fileId:'pdf-file',fingerprint:'a'.repeat(64),pageCount:2,addedAt:new Date().toISOString(),modules:structured.modules,warnings:[]});
 assert.equal(attached.tasks.length,3);
 for(const module of attached.briefs[0].modules.filter(m=>m.sceneRef))assert.equal(module.taskId,project.tasks.find(t=>t.scene===module.sceneRef).id);
});

test('les anciens modules explicites en colonnes restent reconnus',()=>{
 const result=structureBrief([{number:1,width:600,height:900,lines:[
  {text:'Scène 01 — Hall',x:.05,y:.1,width:.4,height:.02},
  {text:'Scène 02 — Rue',x:.55,y:.1,width:.4,height:.02},
  {text:'Action : Entrée',x:.05,y:.2,width:.4,height:.02},
  {text:'Action : Départ',x:.55,y:.2,width:.4,height:.02},
 ]}]);
 assert.deepEqual(result.modules.filter(m=>m.sceneRef).map(m=>m.sceneRef),['SC.01','SC.02']);
});
