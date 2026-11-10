(function(root){
 'use strict';
 const bad=new Set(['__proto__','constructor','prototype']);
 const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 function mergeStates(base,local,remote){
  const conflicts=[];
  function merge(b,l,r,path){
   if(same(l,b))return r;if(same(r,b)||same(l,r))return l;
   if(object(l)&&object(r)&&(object(b)||b===undefined)){
    const out={};for(const key of new Set([...Object.keys(b||{}),...Object.keys(l),...Object.keys(r)])){
     if(bad.has(key))throw Error('Clé de sauvegarde invalide.');
     const value=merge(b?.[key],l[key],r[key],path?path+'.'+key:key);if(value!==undefined)out[key]=value;
    }return out;
   }
   conflicts.push(path);return l;
  }
  return {state:merge(base,local,remote,''),conflicts};
 }
 root.RadarStateTools={mergeStates};
 if(typeof module==='object'&&module.exports)module.exports={mergeStates};
})(globalThis);
