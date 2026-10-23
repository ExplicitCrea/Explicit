import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {AsyncLocalStorage} from 'node:async_hooks';
globalThis.AsyncLocalStorage=AsyncLocalStorage;
const {unstable_doesMiddlewareMatch:match}=await import('next/experimental/testing/server.js');
const source=readFileSync(new URL('../proxy.ts',import.meta.url),'utf8');
const config=Function('return '+source.match(/export const config=(.*);/s)[1])();
const nextConfig={basePath:'/atelier'};
test('Clerk couvre la racine /atelier avec et sans slash, les invitations, la connexion et les API',()=>{
 for(const path of ['/atelier','/atelier/','/atelier?invite=abc','/atelier/sign-in','/atelier/sign-up','/atelier/api/account','/atelier/api/workspace','/atelier/api/hosting-transfer'])assert.equal(match({config,nextConfig,url:'https://local.test'+path}),true,path);
});
test('le logo, les polices et les bundles Next restent exclus',()=>{
 for(const path of ['/atelier/_next/static/chunk.js','/atelier/brand/atelier-wordmark.svg','/atelier/fonts/archivo-semibold.ttf'])assert.equal(match({config,nextConfig,url:'https://local.test'+path}),false,path);
});
test('régression : le matcher seul excluait exactement /atelier',()=>{
 assert.equal(match({config:{matcher:config.matcher.filter(s=>s!=='/')},nextConfig,url:'https://local.test/atelier'}),false);
});
