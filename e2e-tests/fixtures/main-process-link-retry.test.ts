// @vitest-environment node
/**
 * `withMainProcessLinkRetry` tries a main-process call again when Playwright's debugger link drops
 * it. Driven against a stub `ElectronApplication` that only reports its process's exit state, with
 * the wait between attempts injected so no test sleeps.
 */
import type { ElectronApplication } from '@playwright/test';
import { describe, expect, it, vi } from 'vitest';
import { withMainProcessLinkRetry } from './helpers';

const LINK_ERROR = new Error(
  'Execution context was destroyed, most likely because of a navigation.',
);

// Node.js ChildProcess reports null for both until it exits
/* eslint-disable no-null/no-null */
const RUNNING = { exitCode: null, signalCode: null };
const EXITED = { exitCode: 1, signalCode: null };
const KILLED = { exitCode: null, signalCode: 'SIGKILL' };
/* eslint-enable no-null/no-null */

function stubApp(state: {
  exitCode: number | null;
  signalCode: string | null;
}): ElectronApplication {
  // The function under test reads only `process()`, so a full ElectronApplication is not built.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { process: () => state } as unknown as ElectronApplication;
}

/** A call that throws each of `outcomes` that is an Error and returns the first that is not. */
function callThatFailsThen(...outcomes: Array<Error | string>) {
  const call = vi.fn<() => Promise<string>>();
  outcomes.forEach((outcome) => {
    if (outcome instanceof Error) call.mockRejectedValueOnce(outcome);
    else call.mockResolvedValueOnce(outcome);
  });
  return call;
}

describe('withMainProcessLinkRetry', () => {
  it('tries again after the link error and returns the later success', async () => {
    const call = callThatFailsThen(LINK_ERROR, LINK_ERROR, 'ok');
    const wait = vi.fn(() => Promise.resolve());

    await expect(withMainProcessLinkRetry(stubApp(RUNNING), call, wait)).resolves.toBe('ok');

    expect(call).toHaveBeenCalledTimes(3);
    expect(wait).toHaveBeenCalledTimes(2);
  });

  it('rethrows an error that is not the link error at once', async () => {
    const other = new Error('clipboard unavailable');
    const call = callThatFailsThen(other, 'ok');
    const wait = vi.fn(() => Promise.resolve());

    await expect(withMainProcessLinkRetry(stubApp(RUNNING), call, wait)).rejects.toBe(other);

    expect(call).toHaveBeenCalledTimes(1);
    expect(wait).not.toHaveBeenCalled();
  });

  it('rethrows the link error at once when the app has exited', async () => {
    const call = callThatFailsThen(LINK_ERROR, 'ok');
    const wait = vi.fn(() => Promise.resolve());
    const exited = stubApp(EXITED);

    await expect(withMainProcessLinkRetry(exited, call, wait)).rejects.toBe(LINK_ERROR);

    expect(call).toHaveBeenCalledTimes(1);
    expect(wait).not.toHaveBeenCalled();
  });

  it('rethrows the link error at once when the app was killed by a signal', async () => {
    const call = callThatFailsThen(LINK_ERROR, 'ok');
    const killed = stubApp(KILLED);

    await expect(withMainProcessLinkRetry(killed, call, () => Promise.resolve())).rejects.toBe(
      LINK_ERROR,
    );

    expect(call).toHaveBeenCalledTimes(1);
  });

  it('gives up after 3 attempts', async () => {
    const call = callThatFailsThen(LINK_ERROR, LINK_ERROR, LINK_ERROR, 'ok');
    const wait = vi.fn(() => Promise.resolve());

    await expect(withMainProcessLinkRetry(stubApp(RUNNING), call, wait)).rejects.toBe(LINK_ERROR);

    expect(call).toHaveBeenCalledTimes(3);
    expect(wait).toHaveBeenCalledTimes(2);
  });
});
