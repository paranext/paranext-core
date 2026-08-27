import { afterEach, describe, expect, test, vi } from 'vitest';

// The module reads `location.search` once at import, so each case rewrites the URL, drops the
// cached module, and imports it again. The webpack DefinePlugin global it reads at import time is
// stood in for the same way the renderer bundle would supply it.
async function importWithSearch(search: string): Promise<string | undefined> {
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

  test('keys per-window storage by the slot the main process put on the URL', async () => {
    // Boot is the one place guaranteed to run before anything reads per-window storage, in every
    // interface mode — a slot learned any later would leave storage throwing until then
    await importWithSearch('?windowId=7&windowSlotId=slot-seven');
    const storage = (await import('./services/local-storage.service')).default;

    storage.setItem('probe', 'value');

    expect(localStorage.getItem('slot-seven_probe')).toBe('value');
  });

  test('leaves per-window storage unusable when the URL names no slot', async () => {
    await importWithSearch('?windowId=7');
    const storage = (await import('./services/local-storage.service')).default;

    expect(() => storage.setItem('probe', 'value')).toThrow(/does not know its slot/);
  });

  test('reads the id the main process put on the URL, as the raw string', async () => {
    await expect(importWithSearch('?windowId=7')).resolves.toBe('7');
  });

  test('is undefined when the parameter is absent, rather than claiming to be some window', async () => {
    await expect(importWithSearch('?logLevel=info')).resolves.toBeUndefined();
  });

  test('is undefined when the parameter is present but empty', async () => {
    await expect(importWithSearch('?windowId=')).resolves.toBeUndefined();
  });
});
