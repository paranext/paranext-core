import type { PlaywrightWorkerOptions } from '@playwright/test';

/** The `trace` option as a fixture receives it: the config's `use.trace`, or `--trace` on the CLI. */
export type TraceOption = PlaywrightWorkerOptions['trace'];

/** What a launch fixture does about an Electron DOM trace on one attempt of a test. */
export interface ElectronTracePlan {
  /** Whether to record a trace on this attempt. */
  record: boolean;
  /** Record DOM snapshots (what the trace viewer shows for each action). */
  snapshots: boolean;
  /** Record a screencast alongside the snapshots. */
  screenshots: boolean;
  /** Keep the recorded trace only when the attempt failed; otherwise it is always kept. */
  keepOnlyOnFailure: boolean;
}

/**
 * Applies Playwright's `trace` option to an Electron app's context.
 *
 * Playwright's own trace recording never reaches an app started with `_electron.launch()`: it
 * traces only the browser contexts its browser types created. The test runner still writes a
 * steps-only `trace.zip` for each test, but with no DOM snapshots in it. A fixture that launches
 * Electron records the app's context itself, and this decides when, mirroring the rules of
 * `TestTracing._shouldCaptureTrace` and `_shouldAbandonTrace` in
 * `playwright/lib/worker/testTracing.js` so that the option means the same here as it does for a
 * browser test.
 */
export function electronTracePlan(trace: TraceOption, retry: number): ElectronTracePlan {
  const options = typeof trace === 'string' ? { mode: trace } : trace;
  const mode = options.mode === 'retry-with-trace' ? 'on-first-retry' : options.mode;
  const record =
    mode === 'on' ||
    mode === 'retain-on-failure' ||
    (mode === 'on-first-retry' && retry === 1) ||
    (mode === 'on-all-retries' && retry > 0) ||
    (mode === 'retain-on-first-failure' && retry === 0);
  return {
    record,
    snapshots: typeof trace === 'string' ? true : (trace.snapshots ?? true),
    screenshots: typeof trace === 'string' ? true : (trace.screenshots ?? true),
    keepOnlyOnFailure: mode === 'retain-on-failure' || mode === 'retain-on-first-failure',
  };
}
