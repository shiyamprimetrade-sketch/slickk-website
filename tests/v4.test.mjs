import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import { onRequestPost as inquiry } from '../functions/api/inquiry.js';
import { onRequestPost as events } from '../functions/api/events.js';
import { onRequestGet as metrics } from '../functions/api/admin/metrics.js';
import { load } from 'cheerio';

async function database() {
  const sqlite=new DatabaseSync(':memory:');
  sqlite.exec(await readFile('migrations/0001_leads.sql','utf8'));
  sqlite.exec(await readFile('migrations/0002_v4_intake.sql','utf8'));
  const bound=statement=>({bind:(...args)=>({run:async()=>({meta:statement.run(...args)}),first:async()=>statement.get(...args),all:async()=>({results:statement.all(...args)})}),all:async()=>({results:statement.all()})});
  return {sqlite,binding:{prepare:sql=>bound(sqlite.prepare(sql))}};
}
const payload={name:'V4 test',company:'Example only',email:'v4@example.com',service:'logo-design',budget:'Not specified',message:'Please discuss an identity brief and its deliverables.',consent:'on',website:'',inquiryType:'quote','cf-turnstile-response':'unit-only'};
const request=(path,body,origin='https://slickk.online')=>new Request('https://slickk.online'+path,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','CF-Connecting-IP':'192.0.2.10'},body:JSON.stringify(body)});

test('real SQLite persists quote intake, enforces atomic rate limits, and rejects invalid company or Turnstile action',async()=>{
  const db=await database();const original=globalThis.fetch;
  const env={INQUIRIES_DB:db.binding,TURNSTILE_SECRET:'unit-only-secret'};
  try{
    db.sqlite.prepare("INSERT INTO inquiry_limits VALUES ('expired-test',1,0)").run();
    globalThis.fetch=async()=>Response.json({success:true,hostname:'slickk.online',action:'inquiry'});
    const invalid=await inquiry({request:request('/api/inquiry',{...payload,company:'x'.repeat(141)}),env});assert.equal(invalid.status,422);
    for(let index=0;index<5;index++){
      const response=await inquiry({request:request('/api/inquiry',payload),env});assert.equal(response.status,200);assert.equal((await response.json()).stored,true);
    }
    assert.equal((await inquiry({request:request('/api/inquiry',payload),env})).status,429);
    assert.equal(db.sqlite.prepare('SELECT COUNT(*) AS n FROM leads').get().n,5);
    assert.equal(db.sqlite.prepare("SELECT COUNT(*) AS n FROM inquiry_limits WHERE key='expired-test'").get().n,0);
    assert.equal(db.sqlite.prepare('SELECT inquiry_type FROM leads LIMIT 1').get().inquiry_type,'quote');
    assert.ok(!db.sqlite.prepare('SELECT key FROM inquiry_limits').get().key.includes('192.0.2.10'));
    globalThis.fetch=async()=>Response.json({success:true,hostname:'slickk.online',action:'different-action'});
    const other=request('/api/inquiry',payload);other.headers.set('CF-Connecting-IP','192.0.2.11');
    assert.equal((await inquiry({request:other,env})).status,403);
  }finally{globalThis.fetch=original;db.sqlite.close();}
});

test('streamed body is byte-bounded, and unavailable verification never stores an inquiry',async()=>{
  const db=await database();const original=globalThis.fetch;
  const env={INQUIRIES_DB:db.binding,TURNSTILE_SECRET:'unit-only-secret'};
  try{
    const oversized=request('/api/inquiry',{...payload,message:'😀'.repeat(3000)});
    assert.equal((await inquiry({request:oversized,env})).status,413);
    globalThis.fetch=async()=>new Response('Unavailable',{status:503});
    assert.equal((await inquiry({request:request('/api/inquiry',payload),env})).status,503);
    assert.equal(db.sqlite.prepare('SELECT COUNT(*) AS n FROM leads').get().n,0);
  }finally{globalThis.fetch=original;db.sqlite.close();}
});

test('opt-in interactions are bounded and durable, while reporting is authenticated',async()=>{
  const db=await database();const env={INQUIRIES_DB:db.binding,EVENTS_ENABLED:'true',TURNSTILE_SECRET:'unit-only',LEADS_ADMIN_TOKEN:'unit-only-administrator-token-more-than-32-characters'};
  const value={event:'quote_start',page:'/pricing/',service:'logo-design',consent:'analytics'};
  try{
    assert.equal((await events({request:request('/api/events',value),env:{}})).status,503);
    assert.equal((await events({request:request('/api/events',value,'https://other.example'),env})).status,403);
    assert.equal((await events({request:request('/api/events',{...value,consent:'no'}),env})).status,422);
    assert.equal((await events({request:request('/api/events',{...value,page:'/private?email=person@example.com'}),env})).status,422);
    assert.equal((await events({request:request('/api/events',{...value,service:'random-injected-row'}),env})).status,422);
    for(let index=0;index<2;index++)assert.equal((await events({request:request('/api/events',value),env})).status,200);
    assert.equal(db.sqlite.prepare('SELECT total FROM interaction_counts').get().total,2);
    const denied=await metrics({request:new Request('https://slickk.online/api/admin/metrics'),env});assert.equal(denied.status,401);
    const accepted=await metrics({request:new Request('https://slickk.online/api/admin/metrics',{headers:{Authorization:'Bearer '+env.LEADS_ADMIN_TOKEN}}),env});assert.equal(accepted.status,200);
    assert.equal((await accepted.json()).interactions[0].total,2);
  }finally{db.sqlite.close();}
});

test('V4 portfolio assets, complete package scopes, raster social metadata and service schema are shipped',async()=>{
  const pricing=load(await readFile('dist/pricing/index.html','utf8'));
  assert.equal(pricing('.package-details').length,7);
  for(const link of pricing('a[href^="/request-quote/?service="]').toArray())assert.ok(!pricing(link).attr('href').includes('%20'));
  for(const slug of ['identity-system','corporate-brochure','commerce-experience','operations-dashboard','social-campaign']){
    const svg=await readFile('public/images/portfolio/'+slug+'.svg','utf8');assert.match(svg,/<svg/);assert.ok(svg.length>1000);
    const page=load(await readFile('dist/portfolio/'+slug+'/index.html','utf8'));assert.equal(page('.concept-gallery img').length,2);
    assert.match(page('main').text(),/No measured business outcome/);
  }
  const service=load(await readFile('dist/seo-services/index.html','utf8'));
  assert.ok(service('.service-faq details').length>=2);
  const schemas=service('script[type="application/ld+json"]').map((_,element)=>JSON.parse(service(element).html())).get();
  assert.ok(schemas.some(schema=>schema['@type']==='Service'));
  assert.ok(schemas.some(schema=>schema['@type']==='BreadcrumbList'));
  assert.equal(service('meta[property="og:image"]').attr('content'),'https://slickk.online/images/agency-social.jpg');
  const home=await readFile('dist/index.html','utf8');assert.doesNotMatch(home,/Unilever|Trusted by BAT|data-cfemail=/);
  for(const line of (await readFile('dist/_headers','utf8')).split(/\r?\n/))assert.ok(line.length<=2000,'Cloudflare must not drop an oversized header line');
});
