import type {NextConfig} from 'next';
const config:NextConfig={basePath:'/atelier',poweredByHeader:false,async redirects(){return [{source:'/signin-with-chatgpt',destination:'/sign-in',permanent:false},{source:'/signout-with-chatgpt',destination:'/sign-out',permanent:false}];}};
export default config;
