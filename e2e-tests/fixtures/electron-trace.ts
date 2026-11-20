import type { PlaywrightWorkerOptions } from '@playwright/test';

/** The `trace` option as a fixture receives it: the config's `use.trace`, or `--trace` on the CLI. */
export type TraceOption = PlaywrightWorkerOptions['trace'];

/**
 * Which snapshots to record on every action: `true` means DOM snapshots only, or an object picks
 * DOM, aria and screen snapshots. The same shape as the context's `tracing.start({ snapshots })`.
 */
export type TraceSnapshots = NonNullable<Exclude<TraceOption, string>['snapshots']>;

/** What a launch fixture does about an Electron DOM trace on one attempt of a test. */
export interface ElectronTracePlan {
  /** Whether to record a trace on this attempt. */
  record: boolean;
  /** Snapshots to record (what the trace viewer shows for each action). */
  snapshots: TraceSnapshots;
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
 * `TestTracing._shouldCaptureTrace` and `_shouldAbandonTrace` (bundled into
 * `playwright/lib/worker/workerProcessEntry.js` as of Playwright 1.65) so that the option means the
 * same here as it does for a browser test. Re-check those rules when Playwright is upgraded; a new
 * trace mode fails `typecheck:e2e` at the `switch` below.
 */
export function electronTracePlan(trace: TraceOption, retry: number): ElectronTracePlan {
  const options = typeof trace === 'string' ? { mode: trace } : trace;
  const mode = options.mode === 'retry-with-trace' ? 'on-first-retry' : options.mode;
  let record: boolean;
  switch (mode) {
    case 'off':
      record = false;
      break;
    case 'on':
    case 'retain-on-failure':
    case 'retain-on-failure-and-retries':
      record = true;
      break;
    case 'on-first-retry':
      record = retry === 1;
      break;
    case 'on-all-retries':
      record = retry > 0;
      break;
    case 'retain-on-first-failure':
      record = retry === 0;
      break;
    default: {
      const unknownMode: never = mode;
      throw new Error(`Unknown Playwright trace mode: ${String(unknownMode)}`);
    }
  }
  return {
    record,
    snapshots: typeof trace === 'string' ? true : (trace.snapshots ?? true),
    screenshots: typeof trace === 'string' ? true : (trace.screenshots ?? true),
    // 'retain-on-failure-and-retries' keeps every retry's trace, so only a first attempt's depends
    // on the outcome
    keepOnlyOnFailure:
      mode === 'retain-on-failure' ||
      mode === 'retain-on-first-failure' ||
      (mode === 'retain-on-failure-and-retries' && retry === 0),
  };
}
