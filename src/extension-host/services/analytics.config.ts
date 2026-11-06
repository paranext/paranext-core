import { AnalyticsEnvironment } from '@shared/models/analytics.model';

/** PostHog ingestion endpoint. The project lives in PostHog's EU (Frankfurt) region. */
export const POSTHOG_HOST = 'https://eu.i.posthog.com';

/**
 * Env var that turns the PostHog transport on in an unpackaged development build, so a developer
 * can watch their own events arrive while working on analytics. Packaged production builds do not
 * need it. Set to exactly `'true'` (matching `PT_ANALYTICS_TEST_OVERRIDE`); any other value is
 * ignored. Documented in README.md.
 */
export const ANALYTICS_POSTHOG_ENV_VAR = 'PT_ANALYTICS_POSTHOG';

/**
 * PostHog project keys per analytics environment. These are write-only client keys that PostHog
 * designs to ship inside client applications; they cannot read data. Committing one is an accepted
 * exception to the repository's no-secrets rule for that reason. This is the only place in the
 * codebase that holds one.
 *
 * TODO(PT-4401): the `production` slot deliberately reuses the Test project key until the
 * Production key is supplied through that ticket's injection mechanism. Never paste a Production
 * key here.
 */
export const POSTHOG_PROJECT_KEYS: Readonly<Record<AnalyticsEnvironment, string>> = {
  test: 'phc_nHwLGRjRzTZuT8DtjPdRVp32kirKeArT7uED4BvYsfA4',
  production: 'phc_nHwLGRjRzTZuT8DtjPdRVp32kirKeArT7uED4BvYsfA4',
};

/**
 * Whether analytics events should be transmitted to PostHog rather than logged to the console. True
 * for a packaged production build, or when a developer opts in with the env var.
 */
export function isPostHogEnabled(): boolean {
  if (process.env[ANALYTICS_POSTHOG_ENV_VAR] === 'true') return true;
  return Boolean(globalThis.isPackaged) && process.env.NODE_ENV === 'production';
}
