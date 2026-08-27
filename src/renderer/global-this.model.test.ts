import { afterEach, describe, expect, test, vi } from 'vitest';

// The module reads `location.search` once at import, so each case rewrites the URL, drops the
// cached module, and imports it again. The webpack DefinePlugin global it reads at import time is
// stood in for the same way the renderer bundle would supply it.
async function importWithSearch(search: string): Promise<number | undefined> {
  window.history.replaceState({}, '', `/${search}`);
  vi.resetModules();
  vi.stubGlobal('webpackRenderer', { isPackaged: false });
  await import('./global-this.model');
  return globalThis.windowId;
}

describe('the renderer’s window id', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    globalThis.windowId = undefined;
  });

  test('parses the id the main process put on the URL', async () => {
    await expect(importWithSearch('?windowId=7')).resolves.toBe(7);
  });

  test('is undefined when the parameter is absent, rather than window 0', async () => {
    // `Number(null)` is 0 and `Number.isInteger(0)` is true, so a parse that only checked for an
    // integer would turn a missing parameter into a window claiming to be window 0 — which is what
    // the positive-integer requirement exists to stop
    await expect(importWithSearch('?logLevel=info')).resolves.toBeUndefined();
  });

  test.each([
    ['0', 'zero, which is never minted'],
    ['-3', 'a negative'],
    ['1.5', 'a fraction'],
    ['abc', 'a non-number'],
    ['', 'an empty value'],
  ])('refuses %s (%s) rather than claiming to be some window', async (raw) => {
    await expect(importWithSearch(`?windowId=${raw}`)).resolves.toBeUndefined();
  });
});
