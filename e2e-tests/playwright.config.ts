import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration for paranext-core E2E tests.
 *
 * Run against development build by default, production build with --project=production
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Electron tests need serial execution
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Retry once locally to handle flaky DataProvider timeouts
  workers: 1, // Single worker for Electron to avoid port conflicts
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  timeout: 120_000, // 2 minutes per test (app initialization can be slow)
  expect: {
    timeout: 10_000,
  },
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  outputDir: './test-results',
  projects: [
    {
      name: 'development',
      metadata: {
        buildType: 'development',
      },
    },
    {
      name: 'production',
      metadata: {
        buildType: 'production',
      },
    },
  ],
});
