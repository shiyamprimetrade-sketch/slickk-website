/* global Response, URL */
import { limitedJson } from '../lib/body.js';
import { allowRequest } from '../lib/rate-limit.js';
const events = new Set(['page_view','quote_start','service_inquiry','consultation_request','portfolio_to_contact','quote_submission','contact_request']);
const serviceIds = ['general','branding-graphic-design','ai-automation','software-development','app-development','web-development','seo-services','digital-marketing','content-creation','logo-design','brochure-design','brand-identity','company-profile-design','website-development','seo','graphic-design'];
const paths = new Set([...['business-website-cost-bangladesh','professional-brand-identity','software-project-brief'].map(s=>'/insights/'+s+'/'),'/','/about/','/services/','/portfolio/','/pricing/','/contact/','/request-quote/','/faq/','/privacy/','/terms/','/cookies/','/industries/','/process/','/insights/',...serviceIds.filter(s=>s!=='general').flatMap(s=>['/'+s+'/','/services/'+s+'/']),...['identity-system','corporate-brochure','commerce-experience','operations-dashboard','social-campaign'].map(s=>'/portfolio/'+s+'/')]);
const json = (status, body) => new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
export async function onRequestPost({request,env}) {
  if (env.EVENTS_ENABLED !== 'true' || !env.INQUIRIES_DB?.prepare) return json(503,{ok:false});
  if (request.headers.get('Origin') !== new URL(request.url).origin) return json(403,{ok:false});
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json(415,{ok:false});
  let value; try { value=await limitedJson(request,1024); } catch(error) { return json(error instanceof RangeError?413:400,{ok:false}); }
  if (value?.consent!=='analytics' || !events.has(value.event) || !paths.has(value.page) || !['',...serviceIds].includes(value.service)) return json(422,{ok:false});
  try { if(!await allowRequest(env,request.headers.get('CF-Connecting-IP')||'unknown','events',30,60))return json(429,{ok:false}); }
  catch { return json(503,{ok:false}); }
  try {
    await env.INQUIRIES_DB.prepare('INSERT INTO interaction_counts(day,event,page,service,total) VALUES (date(\'now\'),?,?,?,1) ON CONFLICT(day,event,page,service) DO UPDATE SET total=MIN(total+1,1000000)').bind(value.event,value.page,value.service).run();
    return json(200,{ok:true});
  } catch { return json(503,{ok:false}); }
}
