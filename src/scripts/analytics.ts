export function initAnalytics() {
  if (document.body.dataset.trackingEnabled !== 'true') return;
  const panel=document.querySelector<HTMLElement>('#analytics-consent');
  const showPanel=(visible:boolean)=>{if(!panel)return;panel.classList.toggle('is-visible',visible);panel.inert=!visible;panel.setAttribute('aria-hidden',String(!visible));};
  let allowed=false;
  try { allowed=localStorage.getItem('slickk-analytics')==='yes'; showPanel(localStorage.getItem('slickk-analytics')===null); } catch { showPanel(true); }
  const send=(event:string,service='')=>{
    if(!allowed)return;
    void fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event,page:location.pathname,service:/^[a-z0-9-]{0,50}$/.test(service)?service:'',consent:'analytics'}),keepalive:true}).catch(()=>{});
  };
  document.querySelectorAll<HTMLButtonElement>('[data-analytics-choice]').forEach(button=>button.addEventListener('click',()=>{
    allowed=button.dataset.analyticsChoice==='yes';
    try{localStorage.setItem('slickk-analytics',allowed?'yes':'no');}catch{/* The choice still applies to this page if browser storage is unavailable. */}
    showPanel(false);
    if(allowed)send('page_view');
  }));
  document.querySelector('#analytics-preferences')?.addEventListener('click',()=>showPanel(true));
  if(allowed)send('page_view');
  document.addEventListener('click',event=>{
    if(!(event.target instanceof Element))return;
    const link=event.target.closest<HTMLAnchorElement>('a[href]');if(!link)return;
    const url=new URL(link.href);if(url.origin!==location.origin)return;
    if(!['/contact/','/request-quote/'].includes(url.pathname))return;
    const service=url.searchParams.get('service')||'';
    send(location.pathname.startsWith('/portfolio/')?'portfolio_to_contact':url.pathname==='/request-quote/'?'quote_start':service?'service_inquiry':'consultation_request',service);
  });
  document.addEventListener('slickk:inquiry-saved',(event)=>{
    if(!(event instanceof CustomEvent))return;
    send(event.detail.type==='quote'?'quote_submission':'contact_request',event.detail.service);
  });
}
