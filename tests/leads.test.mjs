import {test} from 'node:test';
import assert from 'node:assert/strict';
import {onRequestPost} from '../functions/api/inquiry.js';
import {onRequestGet,onRequestPatch} from '../functions/api/admin/leads.js';

const adminToken='unit-only-slickk-secret-32-chars-minimum';
const valid = {name:'Test Buyer',company:'Example Co',email:'test@example.com',service:'logo-design',budget:'Not specified',phone:'+88012345678',timeline:'Flexible',reference:'https://example.com',message:'I would like a quote for a new company identity and launch assets.',consent:'on',website:'','cf-turnstile-response':'test-token'};
function incoming(body=valid){return new Request('https://slickk.online/api/inquiry',{method:'POST',headers:{Origin:'https://slickk.online','Content-Type':'application/json'},body:JSON.stringify(body)});}
function mockDb(){
 const calls=[];
 return {calls,prepare(sql){return {bind(...args){return {
    run:async()=>{calls.push({kind:'run',sql,args});return {meta:{changes:1}};},
    all:async()=>({results:[{id:'00000000-0000-4000-8000-000000000000',name:'Test Buyer',company:'=HYPERLINK("https://example.com")',email:'test@example.com',phone:'',service:'logo-design',budget:'Not specified',timeline:'Flexible',reference:'',message:'Example',consent_at:'2026-10-26',status:'new',created_at:'2026-10-26',updated_at:'2026-10-26'}]})
  };}};}};
}
test('D1 lead is accepted and persisted after a valid Turnstile check without email service',async()=>{
 const before=globalThis.fetch;const db=mockDb();
 try{
  globalThis.fetch=async()=>new Response(JSON.stringify({success:true,hostname:'slickk.online'}),{headers:{'Content-Type':'application/json'}});
  const response=await onRequestPost({request:incoming(),env:{INQUIRIES_DB:db,TURNSTILE_SECRET:'test-only'}});
  assert.equal(response.status,200);assert.equal((await response.json()).stored,true);
  assert.equal(db.calls.length,1);assert.match(db.calls[0].sql,/INSERT INTO leads/);
  assert.equal(db.calls[0].args[1],'Test Buyer');
  assert.equal(db.calls[0].args[6],'Not specified');
 }finally{globalThis.fetch=before;}
});
test('D1 lead intake fails closed on storage errors',async()=>{
 const before=globalThis.fetch;try{
  globalThis.fetch=async()=>new Response(JSON.stringify({success:true,hostname:'slickk.online'}));
  const badDB={prepare(){return{bind(){return{run:async()=>{throw Error('db failure');}};}};}};
  const response=await onRequestPost({request:incoming(),env:{INQUIRIES_DB:badDB,TURNSTILE_SECRET:'test-only'}});
  assert.equal(response.status,503);
 }finally{globalThis.fetch=before;}
});
test('private API denies missing and invalid administrator credentials',async()=>{
 const db=mockDb();const env={INQUIRIES_DB:db,LEADS_ADMIN_TOKEN:adminToken};
 for(const headers of [{},{Authorization:'Bearer wrong-secret'}, {Authorization:'Bearer '+adminToken.slice(0,-1)}]){
  const response=await onRequestGet({request:new Request('https://slickk.online/api/admin/leads',{headers}),env});
  assert.equal(response.status,401);assert.equal(response.headers.get('Cache-Control'),'no-store');
 }
});
test('private API serves filtered records, CSV protects against formula injection and updates status',async()=>{
 const db=mockDb();const env={INQUIRIES_DB:db,LEADS_ADMIN_TOKEN:adminToken};
 const request=(uri,more={})=>new Request('https://slickk.online'+uri,{headers:{Authorization:'Bearer '+adminToken,...(more.headers||{})},...more});
 const res=await onRequestGet({request:request('/api/admin/leads?status=new'),env});
 assert.equal(res.status,200);assert.equal((await res.json()).results.length,1);
 const csv=await onRequestGet({request:request('/api/admin/leads?export=csv'),env});
 const data=await csv.text();assert.equal(csv.status,200);assert.ok(data.includes('\\\'=HYPERLINK')||data.includes("'=HYPERLINK"),data);
 const patch=await onRequestPatch({request:request('/api/admin/leads',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:'00000000-0000-4000-8000-000000000000',status:'contacted'})}),env});
 assert.equal(patch.status,200);assert.ok(db.calls.some(x=>/UPDATE leads SET status/.test(x.sql)));
});
