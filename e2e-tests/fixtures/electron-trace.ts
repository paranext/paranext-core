import type { PlaywrightWorkerOptions } from '@playwright/test';

/** The `trace` option as a fixture receives it: the config's `use.trace`, or `--trace` on the CLI. */
export type TraceOption = PlaywrightWorkerOptions['trace'];

/** What a launch fixture does about an Electron DOM trace on one attempt of a test. */
export interface ElectronTracePlan {
  /** Whether to record a trace on this attempt. */
  record: boolean;
  /**
   * Which snapshots to record on each action (what the trace viewer shows for it). `true` means DOM
   * snapshots. The `{ dom, aria, screen }` form chooses the kinds, and `tracing.start` takes it
   * as-is, as Playwright passes it for a browser test.
   */
  snapshots: NonNullable<Exclude<TraceOption, string>['snapshots']>;
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
 * `TestTracing._shouldCaptureTrace` and `_shouldAbandonTrace` so that the option means the same
 * here as it does for a browser test. As of Playwright 1.65 that class is bundled into
 * `playwright/lib/worker/workerProcessEntry.js`; earlier versions had it in `testTracing.js`.
 * Re-check those rules when Playwright is upgraded; a new trace mode fails `typecheck:e2e` at the
 * `switch` below.
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
    // `retain-on-failure-and-retries` keeps every retry's trace, but a first run's only if it failed
    keepOnlyOnFailure:
      mode === 'retain-on-failure' ||
      mode === 'retain-on-first-failure' ||
      (mode === 'retain-on-failure-and-retries' && retry === 0),
  };
}
