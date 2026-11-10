import type {NextConfig} from 'next';
const config:NextConfig={basePath:'/atelier',poweredByHeader:false,outputFileTracingIncludes:{'/api/radar/ui/*':['./radar-ui/**','./node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2','./node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2']},async redirects(){return [{source:'/signin-with-chatgpt',destination:'/sign-in',permanent:false},{source:'/signout-with-chatgpt',destination:'/sign-out',permanent:false}];}};
export default config;
