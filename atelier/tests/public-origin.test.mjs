import test from 'node:test';
import assert from 'node:assert/strict';
import {atelierRequestUrl,isAtelierRequestOrigin} from '../lib/public-origin.ts';

test('handshake and invite parameters return to www without loss',()=>{
 const input='https://atelier.explicitcrea.com/atelier?__clerk_handshake=example&invite=abc';
 assert.equal(atelierRequestUrl(input).href,'https://www.explicitcrea.com/atelier?__clerk_handshake=example&invite=abc');
});
test('POST body remains usable and www Origin is accepted through transport', async()=>{
 const req=new Request('https://atelier.explicitcrea.com/atelier/api/workspace',{method:'POST',headers:{origin:'https://www.explicitcrea.com'},body:'{"scene":1}'});
 assert.equal(isAtelierRequestOrigin(req,true),true);
 assert.equal(await req.text(),'{"scene":1}');
});
test('reject foreign and lookalike origins; missing required Origin stays forbidden',()=>{
 for(const origin of ['https://evil.example','https://www.explicitcrea.com.evil.example','http://www.explicitcrea.com','null'])
 assert.equal(isAtelierRequestOrigin(new Request('https://atelier.explicitcrea.com/atelier/api/workspace',{headers:{origin}}),true),false);
 assert.equal(isAtelierRequestOrigin(new Request('https://atelier.explicitcrea.com/atelier/api/hosting-transfer'),true),false);
});
test('preview and local origins remain independent; forwarded host cannot widen access',()=>{
 for(const input of ['http://localhost:3000/atelier','https://explicit-atelier.vercel.app/atelier','https://atelier.explicitcrea.com.evil.example/atelier'])
 assert.equal(atelierRequestUrl(input).href,input);
 assert.equal(isAtelierRequestOrigin(new Request('https://explicit-atelier.vercel.app/atelier',{headers:{origin:'https://www.explicitcrea.com','x-forwarded-host':'www.explicitcrea.com'}}),true),false);
});
