import { beforeEach, expect, test, vi } from 'vitest';

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  globalThis.isPackaged = false;
  vi.stubEnv('NODE_ENV', 'development');
});

test('a packaged production build enables PostHog without any env var', async () => {
  globalThis.isPackaged = true;
  vi.stubEnv('NODE_ENV', 'production');
  const { isPostHogEnabled } = await import('@extension-host/services/analytics.config');
  expect(isPostHogEnabled()).toBe(true);
});

test('a dev build without the env var keeps PostHog disabled', async () => {
  const { isPostHogEnabled } = await import('@extension-host/services/analytics.config');
  expect(isPostHogEnabled()).toBe(false);
});

test('a dev build with PT_ANALYTICS_POSTHOG=true enables PostHog', async () => {
  vi.stubEnv('PT_ANALYTICS_POSTHOG', 'true');
  const { isPostHogEnabled } = await import('@extension-host/services/analytics.config');
  expect(isPostHogEnabled()).toBe(true);
});

test.each(['TRUE', '1', 'yes', 'false'])(
  'the env var value %s is not an exact "true" and does not enable PostHog',
  async (value) => {
    vi.stubEnv('PT_ANALYTICS_POSTHOG', value);
    const { isPostHogEnabled } = await import('@extension-host/services/analytics.config');
    expect(isPostHogEnabled()).toBe(false);
  },
);

test('a packaged build that is not NODE_ENV=production is treated as dev', async () => {
  globalThis.isPackaged = true;
  vi.stubEnv('NODE_ENV', 'development');
  const { isPostHogEnabled } = await import('@extension-host/services/analytics.config');
  expect(isPostHogEnabled()).toBe(false);
});

test('both environment slots currently point at a key and the host is the EU endpoint', async () => {
  const { POSTHOG_HOST, POSTHOG_PROJECT_KEYS } = await import(
    '@extension-host/services/analytics.config'
  );
  expect(POSTHOG_HOST).toBe('https://eu.i.posthog.com');
  expect(POSTHOG_PROJECT_KEYS.test).toMatch(/^phc_/);
  expect(POSTHOG_PROJECT_KEYS.production).toMatch(/^phc_/);
});
