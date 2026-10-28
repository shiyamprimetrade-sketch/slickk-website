/* global Response */
import { auth } from './leads.js';
export async function onRequestGet({request,env}) {
  const json=(status,value)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
  if (!await auth(request,env)) return json(401,{ok:false});
  try {
    const leads=await env.INQUIRIES_DB.prepare('SELECT inquiry_type,service,status,COUNT(*) AS total FROM leads GROUP BY inquiry_type,service,status').all();
    const interactions=await env.INQUIRIES_DB.prepare('SELECT event,SUM(total) AS total FROM interaction_counts WHERE day >= date(\'now\',\'-30 days\') GROUP BY event').all();
    return json(200,{ok:true,leads:leads.results,interactions:interactions.results,notice:'Interactions are approximate opt-in counters, not unique visitors or verified leads. Lead totals come from stored inquiries.'});
  } catch { return json(503,{ok:false}); }
}
