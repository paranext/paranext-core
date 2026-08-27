import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import { decideWindowClose } from '@main/services/window-close-decision.service';
import {
  isAppQuitRequested,
  resetShutdownLatchesForNewSession,
} from '@main/services/shutdown-latch.service';
import {
  addWindow,
  markWindowClosing,
  resetForTesting as resetWindowStateForTesting,
  setPrimaryWindowId,
} from '@main/services/window-state.service';

vi.mock('electron', () => ({ BrowserWindow: class {} }));

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/** Stand-in for a BrowserWindow — the window state service only reads `id` and `isDestroyed` */
function fakeWindow(id: number): BrowserWindow {
  // Constructing a real BrowserWindow needs the Electron runtime; these are the only members the
  // window state service touches
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { id, isDestroyed: () => false } as BrowserWindow;
}

/** A confirm prompt that records whether it was shown and answers as told */
function promptAnswering(answer: 'close-all' | 'cancel') {
  const confirm = vi.fn(async () => answer);
  return { confirm };
}

describe('deciding what a window close means', () => {
  beforeEach(() => {
    resetShutdownLatchesForNewSession();
    resetWindowStateForTesting();
  });

  describe('primary window with other windows open', () => {
    beforeEach(() => {
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setPrimaryWindowId(1);
    });

    test('asks before doing anything', async () => {
      const { confirm } = promptAnswering('cancel');

      await decideWindowClose(1, confirm);

      expect(confirm).toHaveBeenCalledTimes(1);
    });

    test('cancel leaves the app exactly as it was', async () => {
      const { confirm } = promptAnswering('cancel');

      const decision = await decideWindowClose(1, confirm);

      expect(decision).toBe('stay-open');
      // Nothing may have been latched: a cancelled close is not a close at all
      expect(isAppQuitRequested()).toBe(false);
    });

    test('confirm marks the quit BEFORE reporting, so every window sees a quit on its first pass', async () => {
      // The other windows' close handlers read the quit latch on their first pass to decide
      // 'entry-stays'. If the latch were set after they were told to close, they would read it
      // unset and record 'entry-goes-with-it' — their layouts would be lost.
      const { confirm } = promptAnswering('close-all');

      const decision = await decideWindowClose(1, confirm);

      expect(decision).toBe('quit-all');
      expect(isAppQuitRequested()).toBe(true);
    });
  });

  describe('primary window alone', () => {
    test('quits without asking, as it always has', async () => {
      addWindow(fakeWindow(1));
      setPrimaryWindowId(1);
      const { confirm } = promptAnswering('cancel');

      const decision = await decideWindowClose(1, confirm);

      expect(confirm).not.toHaveBeenCalled();
      expect(decision).toBe('close-this-window');
    });
  });

  describe('secondary window', () => {
    test('never asks and never quits, whatever else is open', async () => {
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setPrimaryWindowId(1);
      const { confirm } = promptAnswering('close-all');

      const decision = await decideWindowClose(2, confirm);

      expect(confirm).not.toHaveBeenCalled();
      expect(decision).toBe('close-this-window');
      expect(isAppQuitRequested()).toBe(false);
    });
  });

  describe('primary window while another is already on its way out', () => {
    test('does not count a window that is already closing as one that would be left behind', async () => {
      // Two windows, but the second is mid-close: closing the primary now leaves nothing behind,
      // so there is nothing to confirm
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setPrimaryWindowId(1);
      markWindowClosing(2);
      const { confirm } = promptAnswering('cancel');

      const decision = await decideWindowClose(1, confirm);

      expect(confirm).not.toHaveBeenCalled();
      expect(decision).toBe('close-this-window');
    });
  });
});
