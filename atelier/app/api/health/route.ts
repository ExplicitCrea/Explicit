import {sql} from '../../../lib/vercel-runtime';
export const dynamic='force-dynamic';
export async function GET(){try{await sql().query('SELECT 1');return Response.json({app:'atelier',database:true,authentication:!!process.env.CLERK_SECRET_KEY,files:!!process.env.BLOB_READ_WRITE_TOKEN},{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({app:'atelier',ready:false},{status:503,headers:{'Cache-Control':'no-store'}});}}
