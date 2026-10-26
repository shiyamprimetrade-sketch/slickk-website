import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/about/', '/services/', '/software-development/', '/app-development/', '/web-development/', '/seo-services/', '/digital-marketing/', '/content-creation/', '/portfolio/', '/pricing/', '/contact/', '/faq/', '/privacy/', '/terms/', '/cookies/'];

test('all pages have responsive layout and no detected WCAG A/AA violations', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response.status(), route).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true);
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
  await page.getByRole('button',{name:'Open email draft'}).click();
  await expect(page.locator('#inquiry-status')).toContainText('Nothing has been submitted');
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
