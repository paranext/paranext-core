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
 * browser test. Re-check those rules when Playwright is upgraded; a new trace mode fails
 * `typecheck:e2e` at the `switch` below.
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
    keepOnlyOnFailure: mode === 'retain-on-failure' || mode === 'retain-on-first-failure',
  };
}

/** What {@link stopElectronTrace} needs from the fixture: the app's tracing and the test's output. */
export interface StopElectronTraceOptions {
  /** Whether to save the trace (the attempt failed, or the plan keeps every trace). */
  keep: boolean;
  /** Stops tracing; saves the trace to `path` when one is given, discards it otherwise. */
  stop: (path: string | undefined) => Promise<void>;
  /** Where to save a kept trace. */
  tracePath: () => string;
  /** Attaches a saved trace to the test result. */
  attach: (path: string) => Promise<void>;
  /** Reports a trace that was to be kept but could not be saved. */
  warn: (message: string) => void;
}

/**
 * Stops an Electron trace: saves and attaches it when `keep`, discards it otherwise. Stopping fails
 * most often because the app is already gone (it crashed, or the test closed it), and the trace
 * with it. That is worth a warning only when the trace was to be kept; a trace that was going to be
 * discarded is lost to no one.
 */
export async function stopElectronTrace(options: StopElectronTraceOptions): Promise<void> {
  if (!options.keep) {
    try {
      await options.stop(undefined);
    } catch {
      // The trace was going to be discarded; losing it costs nothing.
    }
    return;
  }
  let tracePath: string;
  try {
    tracePath = options.tracePath();
    await options.stop(tracePath);
  } catch (error) {
    options.warn(`Could not save the Electron trace: ${error}`);
    return;
  }
  try {
    await options.attach(tracePath);
  } catch (error) {
    options.warn(
      `The Electron trace was saved to ${tracePath} but could not be attached: ${error}`,
    );
  }
}
