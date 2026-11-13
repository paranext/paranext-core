// @vitest-environment node

import { createRequire } from 'module';
import { describe, expect, it, vi } from 'vitest';

type StapleResult = { ok: boolean; output: string };
type StapleWithRetry = (
  appPath: string,
  options?: {
    attempts?: number;
    delayMs?: number;
    staple?: (appPath: string) => StapleResult;
    wait?: (ms: number) => Promise<void>;
  },
) => Promise<void>;

// The helper is CommonJS because electron-builder `require`s the afterSign hook that uses it, so
// load it the way that hook does rather than through Vitest's ESM transform.
const { stapleWithRetry }: { stapleWithRetry: StapleWithRetry } = createRequire(import.meta.url)(
  './staple-with-retry.js',
);

const APP_PATH = '/build/mac-universal/Paratext 10.app';
const FAILED: StapleResult = {
  ok: false,
  output: 'The staple and validate action failed! Error 68.',
};
const STAPLED: StapleResult = { ok: true, output: 'The staple and validate action worked!' };

function stapleResults(...results: StapleResult[]) {
  const staple = vi.fn<(appPath: string) => StapleResult>();
  results.forEach((result) => staple.mockReturnValueOnce(result));
  return staple;
}

describe('stapleWithRetry', () => {
  it('staples once and does not wait when the first attempt works', async () => {
    const staple = stapleResults(STAPLED);
    const wait = vi.fn(async () => {});

    await stapleWithRetry(APP_PATH, { staple, wait });

    expect(staple).toHaveBeenCalledTimes(1);
    expect(staple).toHaveBeenCalledWith(APP_PATH);
    expect(wait).not.toHaveBeenCalled();
  });

  it('waits between failed attempts and stops at the first one that works', async () => {
    const staple = stapleResults(FAILED, FAILED, STAPLED);
    const wait = vi.fn(async () => {});

    await stapleWithRetry(APP_PATH, { attempts: 5, delayMs: 30_000, staple, wait });

    expect(staple).toHaveBeenCalledTimes(3);
    expect(wait).toHaveBeenCalledTimes(2);
    expect(wait).toHaveBeenNthCalledWith(1, 30_000);
    expect(wait).toHaveBeenNthCalledWith(2, 30_000);
  });

  it('fails with the last output once every attempt has failed, without a trailing wait', async () => {
    const staple = stapleResults(FAILED, FAILED, {
      ok: false,
      output: 'The staple and validate action failed! Error 65.',
    });
    const wait = vi.fn(async () => {});

    await expect(stapleWithRetry(APP_PATH, { attempts: 3, staple, wait })).rejects.toThrow(
      /after 3 attempts[\s\S]*Error 65/,
    );
    expect(staple).toHaveBeenCalledTimes(3);
    expect(wait).toHaveBeenCalledTimes(2);
  });
});
