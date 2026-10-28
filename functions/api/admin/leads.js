/* global Response, URL, crypto, TextEncoder */
import { limitedJson } from '../../lib/body.js';
// Authenticated staff-only API for a Cloudflare D1-backed lead inbox.
// LEADS_ADMIN_TOKEN: random >=32-character secret; never expose as PUBLIC_*.
const json=(code,value)=>new Response(JSON.stringify(value),{status:code,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const statuses=new Set(['new','contacted','qualified','proposal','won','lost']);
const encoder=new TextEncoder();
export async function auth(request,env){
  const expected=env?.LEADS_ADMIN_TOKEN;
  if (!env?.INQUIRIES_DB?.prepare||typeof expected!=='string'||expected.length<32)return false;
  const supplied=request.headers.get('Authorization')||'';
  if(!supplied.startsWith('Bearer '))return false;
  const entered=supplied.slice(7);
  if(entered.length<32||entered.length>256)return false;
  const [a,b]=await Promise.all([crypto.subtle.digest('SHA-256',encoder.encode(expected)),crypto.subtle.digest('SHA-256',encoder.encode(entered))]);
  const x=new Uint8Array(a),y=new Uint8Array(b);
  let diff=0;for(let i=0;i<x.length;i++)diff|=x[i]^y[i];
  return diff===0;
}
const safePage=value=>Math.max(0,Math.min(1000,Number.parseInt(value||'0',10)||0));
const csvCell=value=>'"'+String(value??'').replace(/"/g,'""').replace(/^[=+\-@\t\r]/,'\u0027$&')+'"';
export async function onRequestGet({request,env}){
  if(!await auth(request,env))return json(401,{ok:false,error:'Unauthorized'});
  const url=new URL(request.url);
  const status=url.searchParams.get('status')||'';
  if(status&&!statuses.has(status))return json(422,{ok:false,error:'Invalid filter'});
  const page=safePage(url.searchParams.get('page'));
  let result;
  try {
    const sql='SELECT id,name,company,email,phone,service,budget,timeline,reference,message,consent_at,status,created_at,updated_at,inquiry_type FROM leads'+(status?' WHERE status = ?':'')+' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const statement=env.INQUIRIES_DB.prepare(sql);
    result=await (status?statement.bind(status,50,page*50):statement.bind(50,page*50)).all();
  }catch{return json(503,{ok:false,error:'Database unavailable'});}
  const rows=Array.isArray(result?.results)?result.results:[];
  if(url.searchParams.get('export')==='csv'){
    const columns=['id','name','company','email','phone','service','budget','timeline','reference','message','consent_at','status','created_at','updated_at','inquiry_type'];
    const csv=[columns.join(','),...rows.map(row=>columns.map(k=>csvCell(row[k])).join(','))].join('\r\n');
    return new Response(csv,{status:200,headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="slickk-leads-page.csv"','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
  }
  return json(200,{ok:true,page,hasMore:rows.length===50,results:rows});
}
export async function onRequestPatch({request,env}){
  if(!await auth(request,env))return json(401,{ok:false,error:'Unauthorized'});
  if(request.headers.get('Origin')&&request.headers.get('Origin')!==new URL(request.url).origin)return json(403,{ok:false,error:'Invalid origin'});
  if(!request.headers.get('Content-Type')?.startsWith('application/json'))return json(415,{ok:false,error:'Unsupported media type'});
  let body;try{body=await limitedJson(request,300);}catch{return json(400,{ok:false,error:'Invalid payload'});}
  if(typeof body?.id!=='string'||!/^[a-f0-9-]{36}$/i.test(body.id)||!statuses.has(body.status))return json(422,{ok:false,error:'Invalid fields'});
  try{
    const updated=await env.INQUIRIES_DB.prepare('UPDATE leads SET status=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(body.status,body.id).run();
    return json(updated?.meta?.changes?200:404,{ok:Boolean(updated?.meta?.changes)});
  }catch{return json(503,{ok:false,error:'Database unavailable'});}
}
