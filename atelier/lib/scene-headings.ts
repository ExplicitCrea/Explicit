export type SceneHeading={ref:string;title:string};

const reference=String.raw`(\d{1,3}(?:\s*[a-z](?=\s*[:.)\-–—|]|\s*$))?|[a-z])`;
const explicit=new RegExp(String.raw`^\s*(sc[eè]ne|sc\.?|s[eé]quence|seq\.?|3d)\s*(?:n[°ºo]?\s*)?${reference}(?=\s|[:.)\-–—|]|$)\s*[:.)\-–—|]?\s*(.*)$`,'i');
const numbered=/^\s*(\d{1,3}(?:\s*[a-z])?)\s*[.)\-–—:]\s+(.+?)\s*$/i;

function makeHeading(number:string,title:string,sequence=false):SceneHeading{
 const ref=(sequence?'SEQ.':'SC.')+number.replace(/\s/g,'').toUpperCase().replace(/^\d+/,n=>String(Number(n)).padStart(2,'0'));
 return {ref,title:(title.trim()||ref).slice(0,180)};
}

// Explicit scene references remain valid without imposing a particular brief layout.
export function sceneHeading(text:string):SceneHeading|null{
 if(text.length>260)return null;
 const match=text.normalize('NFC').match(explicit);
 return match?makeHeading(match[2],match[3],/^s[eé]q/i.test(match[1])):null;
}

// A numbered list alone is not a scene list. Require production fields in the
// following block, including when the heading and fields straddle two pages.
export function findSceneHeadings(lines:string[]):Map<number,SceneHeading>{
 const candidates=lines.flatMap((text,index)=>{
  const heading=sceneHeading(text);
  if(heading)return [{index,heading,explicit:true}];
  const match=text.length<=260?text.normalize('NFC').match(numbered):null;
  return match?[{index,heading:makeHeading(match[1],match[2]),explicit:false}]:[];
 });
 const found=new Map<number,SceneHeading>();
 for(let c=0;c<candidates.length;c++){
  const candidate=candidates[c];
  if(candidate.explicit){found.set(candidate.index,candidate.heading);continue;}
  const end=Math.min(candidates[c+1]?.index??lines.length,candidate.index+160);
  const fields=new Set<string>();
  for(let i=candidate.index+1;i<end;i++){
   const match=lines[i].match(/^\s*(d[eé]cor(?: principal| ma[iî]tre)?|lieu|environnement|location|sc[eè]ne|action|description|cam[eé]ras?|cadrages?|plans?)\s*[:–—-]/i);
   if(!match)continue;
   const label=match[1].normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
   fields.add(/^(decor|lieu|environnement|location)/.test(label)?'set':/^(scene|action|description)/.test(label)?'action':'camera');
  }
  if(fields.size>=2)found.set(candidate.index,candidate.heading);
 }
 return found;
}
