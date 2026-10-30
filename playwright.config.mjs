import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4321';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL, channel: 'chrome', trace: 'retain-on-failure' },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { command: 'node scripts/serve.mjs', url: baseURL, reuseExistingServer: !process.env.CI },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], viewport:{width:820,height:1180}, isMobile:true } },
    { name: 'mobile', use: { ...devices['iPhone 13'], deviceScaleFactor: 1, defaultBrowserType: 'chromium' } },
    { name: 'android', use: { ...devices['Pixel 7'], defaultBrowserType: 'chromium' } },
  ],
});
