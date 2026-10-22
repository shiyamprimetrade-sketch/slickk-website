import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/about/', '/products/', '/global-sourcing/', '/quality-logistics/', '/why-slickk/', '/for-exporters/', '/for-buyers/', '/contact/', '/faq/', '/privacy/', '/terms/', '/responsible-sourcing/'];

test('all pages load images, fit the viewport, obey CSP and pass automated WCAG A/AA checks', async ({ page }, testInfo) => {
  const errors = []; page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  for (const route of routes) {
    const response = await page.goto(route); expect(response.status()).toBe(200);
    await page.locator('h1').waitFor();
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((image) => { image.loading = 'eager'; return image.decode(); })); });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `No horizontal overflow: ${route}`).toBe(true);
    expect(await page.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations, `Accessibility: ${route}`).toEqual([]);
    if (['/', '/products/', '/contact/'].includes(route)) await page.screenshot({ path: `test-results/${testInfo.project.name}-${route === '/' ? 'home' : route.replaceAll('/', '')}.png`, fullPage: true });
  }
  expect(errors).toEqual([]);
});

test('navigation, keyboard focus, mobile menu, product filtering, FAQ and inquiry draft work', async ({ page, isMobile }) => {
  await page.goto('/');
  await page.keyboard.press('Tab'); await expect(page.getByText('Skip to content')).toBeFocused();
  if (isMobile) {
    const menu = page.getByRole('button', { name: 'Menu' });
    await menu.click(); await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape'); await expect(menu).toHaveAttribute('aria-expanded', 'false'); await expect(menu).toBeFocused();
    await menu.click(); await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Our products' }).click();
  } else await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Our products' }).click();
  await expect(page).toHaveURL(/\/products\//);
  await page.getByRole('button', { name: 'Oranges', exact: true }).click();
  await expect(page.locator('[data-product]:visible')).toHaveCount(1); await expect(page.locator('[data-product="oranges"]')).toBeVisible();
  await page.getByRole('button', { name: 'All fruit', exact: true }).click(); await expect(page.locator('[data-product]:visible')).toHaveCount(3);
  await page.goto('/faq/'); await page.locator('summary').first().click(); await expect(page.locator('details').first()).toHaveAttribute('open', '');
  await page.goto('/contact/?product=grapes'); await expect(page.locator('select[name=product]')).toHaveValue('grapes');
  await page.getByLabel('Your name').fill('Test Buyer'); await page.getByLabel('Business name').fill('Example Business'); await page.locator('input[name=email]').fill('buyer@example.com');
  await page.getByLabel('Country').fill('Bangladesh'); await page.getByLabel('Your message').fill('Please discuss 100 cartons of grapes and packaging.');
  await page.locator('input[type=checkbox]').check();
  // Opening a mailto draft never sends a message automatically.
  await page.getByRole('button', { name: 'Open email draft' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'No message has been sent' })).toBeVisible();
  const missing = await page.goto('/a-route-that-does-not-exist/'); expect(missing.status()).toBe(404); await expect(page.locator('h1')).toContainText('out of season');
});

test('reduced motion and no-JavaScript fallback remain usable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
  const page = await context.newPage(); await page.goto('http://127.0.0.1:4321/products/');
  await expect(page.locator('[data-product]')).toHaveCount(3); await expect(page.locator('.product-filters')).toBeHidden();
  await page.goto('http://127.0.0.1:4321/contact/'); await expect(page.locator('#inquiry-form')).toBeHidden();
  await expect(page.locator('.no-js-email')).toBeVisible();
  await expect(page.locator('main a[href="mailto:contact@slickk.online"]').first()).toBeVisible(); await context.close();
});
