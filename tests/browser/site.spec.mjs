import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ["/","/about/","/services/","/software-development/","/app-development/","/web-development/","/seo-services/","/digital-marketing/","/content-creation/","/portfolio/","/pricing/","/contact/","/faq/","/privacy/","/terms/","/cookies/","/industries/","/process/","/insights/","/request-quote/","/branding-graphic-design/","/ai-automation/","/services/logo-design/","/services/brochure-design/","/services/brand-identity/","/services/company-profile-design/","/services/website-development/","/services/app-development/","/services/digital-marketing/","/services/seo/","/services/graphic-design/","/services/ai-automation/","/portfolio/identity-system/","/portfolio/corporate-brochure/","/portfolio/commerce-experience/","/portfolio/operations-dashboard/","/portfolio/social-campaign/"];

test.beforeEach(async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('slickk-analytics','no'));
  // Local UI checks do not exercise a real anti-bot challenge; deployed intake has separate evidence.
  await page.route('https://challenges.cloudflare.com/**',route=>route.abort());
});

test('all pages have responsive layout and no detected WCAG A/AA violations', async ({ page }, testInfo) => {
  test.setTimeout(120_000); // A full 37-page Axe crawl needs more than 30 seconds on shared CI runners.
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response.status(), route).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
    if (route === '/') await page.screenshot({ path: 'test-results/' + testInfo.project.name + '-agency-home.png', fullPage: true });
    const accessibility = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    expect(accessibility.violations, route).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('navigation, menu keyboard handling, FAQs and email-draft inquiry', async ({ page, isMobile }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  if (isMobile) {
    const menu = page.getByRole('button', {name:/Menu/});
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded','true');
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded','false');
    await menu.click();
  }
  await page.getByRole('navigation', { name:'Main navigation' }).getByRole('link', {name:'Services',exact:true}).click();
  await expect(page).toHaveURL(/\/services\//);
  await page.goto('/faq/');
  await page.locator('summary').first().click();
  await expect(page.locator('details').first()).toHaveAttribute('open','');
  await page.goto('/contact/?service=web-development');
  await expect(page.locator('select[name=service]')).toHaveValue('web-development');
  await page.locator('input[name=name]').fill('Example User');
  await page.locator('input[name=email]').fill('example@example.com');
  await page.locator('textarea[name=message]').fill('Please help us build a professional responsive company website.');
  await page.locator('input[name=consent]').check();
  if(await page.locator('#project-inquiry').getAttribute('data-mode')==='draft'){
    await page.getByRole('button',{name:'Open email draft'}).click();
    await expect(page.locator('#inquiry-status')).toContainText('Nothing has been submitted');
  }else{
    // UI integration only; real Turnstile and D1 are verified separately on the deployed site.
    await page.route('**/api/inquiry',route=>route.fulfill({status:200,contentType:'application/json',body:'{"ok":true,"stored":true,"notified":false}'}));
    await page.locator('button[type=submit]').click();
    await expect(page.locator('#inquiry-status')).toContainText('saved');
  }
  const missing=await page.goto('/this-page-does-not-exist/');
  expect(missing.status()).toBe(404);
});

test('contact fallback visible with JavaScript disabled', async ({ browser, baseURL }) => {
  const ctx=await browser.newContext({baseURL,javaScriptEnabled:false,viewport:{width:390,height:844}});
  const page=await ctx.newPage(); await page.goto('/contact/');
  await expect(page.locator('#project-inquiry')).toBeHidden();
  await expect(page.locator('noscript').first()).toHaveCount(1);
  await ctx.close();
});

test('V2 demonstration portfolio filters work with keyboard-accessible controls',async({page})=>{
 await page.goto('/portfolio/');
 const gallery=page.locator('[data-project-discipline]');
 await expect(gallery).toHaveCount(5);
 const filter=page.getByRole('button',{name:'Brochures',exact:true});
 await filter.click();
 await expect(filter).toHaveAttribute('aria-pressed','true');
 await expect(gallery.filter({visible:true})).toHaveCount(1);
 await page.getByRole('button',{name:'All Projects'}).click();
 await expect(gallery.filter({visible:true})).toHaveCount(5);
});

test('V4 quote prefill, motion safeguards and form loading/error states work',async({page})=>{
 await page.goto('/pricing/');
 await page.getByRole('link',{name:'Request a quote →'}).first().click();
 await expect(page.locator('select[name=service]')).toHaveValue('logo-design');
 await expect(page.locator('input[name=inquiryType]')).toHaveValue('quote');
 await page.locator('input[name=name]').fill('Example User');
 await page.locator('input[name=email]').fill('example@example.com');
 await page.locator('textarea[name=message]').fill('Please discuss a logo design brief and its agreed deliverables.');
 await page.locator('input[name=consent]').check();
 await page.evaluate(()=>{document.querySelector('#project-inquiry').dataset.mode='secure';});
 await page.route('**/api/inquiry',async route=>{await new Promise(resolve=>setTimeout(resolve,200));await route.fulfill({status:503,contentType:'application/json',body:'{"ok":false}'});});
 const submit=page.locator('button[type=submit]');await submit.click();
 await expect(submit).toBeDisabled();await expect(submit).toHaveAttribute('aria-busy','true');
 await expect(page.locator('#inquiry-status')).toContainText('could not send');await expect(submit).toBeEnabled();
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 await expect(page.locator('html')).toHaveAttribute('data-motion','paused');
 expect(await page.locator('.aurora-surface').first().evaluate(element=>getComputedStyle(element,'::before').animationName)).toBe('none');
});

test('optional analytics sends only after consent and stops after withdrawal',async({page})=>{
 const events=[];await page.route('**/api/events',route=>{events.push(route.request().postDataJSON());return route.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'});});
 await page.goto('/');
 if(await page.locator('body').getAttribute('data-tracking-enabled')!=='true')return;
 expect(events).toHaveLength(0);
 await page.locator('#analytics-preferences').click();await page.getByRole('button',{name:'Allow analytics',exact:true}).click();
 await expect.poll(()=>events.length).toBe(1);expect(events[0]).toEqual({event:'page_view',page:'/',service:'',consent:'analytics'});
 await page.locator('#analytics-preferences').click();await page.getByRole('button',{name:'Necessary only',exact:true}).click();
 await page.goto('/services/');
 expect(events).toHaveLength(1);
});
