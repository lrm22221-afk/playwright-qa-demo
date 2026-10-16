import { defineConfig, devices } from '@playwright/test';

const UI_URL = process.env.UI_BASE_URL ?? 'https://www.saucedemo.com';
const API_URL = process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [['list'], ['html', { open: 'never' }], ['junit', { outputFile: 'test-results/junit.xml' }]],
  use: { trace: 'on-first-retry', screenshot: 'only-on-failure', video: 'retain-on-failure' },
  projects: [
    { name: 'chromium', testDir: './tests/ui', use: { ...devices['Desktop Chrome'], baseURL: UI_URL } },
    { name: 'firefox', testDir: './tests/ui', use: { ...devices['Desktop Firefox'], baseURL: UI_URL } },
    { name: 'webkit', testDir: './tests/ui', use: { ...devices['Desktop Safari'], baseURL: UI_URL } },
    { name: 'mobile', testDir: './tests/ui', use: { ...devices['Pixel 7'], baseURL: UI_URL } },
    { name: 'a11y', testDir: './tests/a11y', use: { ...devices['Desktop Chrome'], baseURL: UI_URL } },
    { name: 'api', testDir: './tests/api', use: { baseURL: API_URL } },
  ],
});
