import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import {
  addWindow,
  getPrimaryWindowId,
  isPrimaryWindow,
  removeWindow,
  resetForTesting,
  setPrimaryWindowId,
} from '@main/services/window-state.service';

// `window-state.service` only imports BrowserWindow as a type, but the module graph resolves
// `electron`, which is unavailable outside the Electron runtime.
vi.mock('electron', () => ({ BrowserWindow: class {} }));

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/** Stand-in for a BrowserWindow — the service only reads `id` and `isDestroyed` */
function fakeWindow(id: number): BrowserWindow {
  // Constructing a real BrowserWindow needs the Electron runtime; these are the only members the
  // service under test touches
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { id, isDestroyed: () => false } as BrowserWindow;
}

describe('primary window reference', () => {
  beforeEach(() => {
    resetForTesting();
  });

  test('has no primary until one is set', () => {
    expect(getPrimaryWindowId()).toBeUndefined();
    expect(isPrimaryWindow(1)).toBe(false);
  });

  test('names the window it was told is primary, and no other', () => {
    addWindow(fakeWindow(1));
    addWindow(fakeWindow(2));

    setPrimaryWindowId(1);

    expect(getPrimaryWindowId()).toBe(1);
    expect(isPrimaryWindow(1)).toBe(true);
    expect(isPrimaryWindow(2)).toBe(false);
  });

  test('survives the primary window going down with the app', () => {
    // The close path reads the primary role while the primary is being torn down, which is after
    // it has left the tracked list. A reference that vanished with the window would go undefined at
    // exactly the moment it is needed — the failure the persisted `isMain` lookup has.
    const primary = fakeWindow(1);
    addWindow(primary);
    setPrimaryWindowId(1);

    removeWindow(primary, 1);

    expect(getPrimaryWindowId()).toBe(1);
    expect(isPrimaryWindow(1)).toBe(true);
  });

  test('is cleared for a new session', () => {
    setPrimaryWindowId(7);

    resetForTesting();

    expect(getPrimaryWindowId()).toBeUndefined();
  });
});
