import path from 'path';
import os from 'os';
import { vi } from 'vitest';

// getAppDir is memoized, so each test must get a fresh module import.
// We use vi.resetModules() + dynamic import to clear the memoized value between tests.

describe('getAppDir', () => {
  const originalIsPackaged = globalThis.isPackaged;
  const originalResourcesPath = globalThis.resourcesPath;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    globalThis.isPackaged = originalIsPackaged;
    globalThis.resourcesPath = originalResourcesPath;
  });

  it('returns .platform.bible in home directory when packaged', async () => {
    globalThis.isPackaged = true;
    const { getAppDir } = await import('./util');
    expect(getAppDir()).toBe(path.join(os.homedir(), '.platform.bible'));
  });

  it('returns resourcesPath/dev-appdata when not packaged', async () => {
    globalThis.isPackaged = false;
    globalThis.resourcesPath = '/fake/repo/root';
    const { getAppDir } = await import('./util');
    expect(getAppDir()).toBe(path.join('/fake/repo/root', 'dev-appdata'));
  });
});
