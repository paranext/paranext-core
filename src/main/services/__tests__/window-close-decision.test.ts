import { beforeEach, describe, expect, test, vi } from 'vitest';
import type { BrowserWindow } from 'electron';
import { decideWindowClose } from '@main/services/window-close-decision.service';
import {
  isAppQuitRequested,
  markQuitRequested,
  resetShutdownLatchesForNewSession,
} from '@main/services/shutdown-latch.service';
import {
  addWindow,
  markWindowClosing,
  resetForTesting as resetWindowStateForTesting,
  setPrimaryWindowId,
  setWindowPendingContentPredicate,
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

  describe('primary window during a quit the user already asked for', () => {
    test('does not ask again, and does not touch the latch', async () => {
      // Cmd+Q, File → Quit and platform.quit set the quit latch from `before-quit`, and Electron
      // then closes each window in creation order — the primary first, before any secondary has
      // been marked closing. That looks exactly like a primary ✕ with others open. It is not: the
      // user already chose to quit, so asking "close all windows?" would be asking them twice, and
      // a cancel here could never undo a latch that `before-quit` set.
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setPrimaryWindowId(1);
      markQuitRequested();
      const { confirm } = promptAnswering('cancel');

      const decision = await decideWindowClose(1, confirm);

      expect(confirm).not.toHaveBeenCalled();
      expect(decision).toBe('close-this-window');
      expect(isAppQuitRequested()).toBe(true);
    });
  });

  describe('primary window the app has already decided to close', () => {
    test('does not ask — an emptied window closes by rule, not by the user', async () => {
      // When the last web view is moved out of the primary, the emptiness handler decides it
      // closes and marks it closing BEFORE scheduling the close. That close is the app's own, made
      // under the equal-siblings rule, not a ✕ the user pressed — asking "close the application?"
      // here would block a decision already taken, with a dialog on a window that has nothing in it.
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setPrimaryWindowId(1);
      markWindowClosing(1);
      const { confirm } = promptAnswering('cancel');

      const decision = await decideWindowClose(1, confirm);

      expect(confirm).not.toHaveBeenCalled();
      expect(decision).toBe('close-this-window');
      expect(isAppQuitRequested()).toBe(false);
    });
  });

  describe('a quit arriving while the question is still open', () => {
    test('is the answer: the decision resolves to quit-all without waiting for the user', async () => {
      // The user is looking at the question when Cmd+Q, File → Quit or platform.quit fires. That
      // quit is a stronger statement than any button, and the dialog cannot be dismissed from
      // code — so the decision has to notice the latch and stop waiting, or the app hangs with the
      // question up and the quit swallowed underneath it.
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setPrimaryWindowId(1);
      const confirm = vi.fn(
        () =>
          new Promise<'close-all' | 'cancel'>(() => {
            // never resolves — the user never clicks
          }),
      );

      const pending = decideWindowClose(1, confirm);
      // The question is showing; now the quit arrives
      markQuitRequested();

      await expect(pending).resolves.toBe('quit-all');
      expect(confirm).toHaveBeenCalledTimes(1);
    });
  });

  describe('primary window while another is still loading', () => {
    test('asks — a window still waiting for its content would be left behind too', async () => {
      // A move-to-new-window target that has not finished loading is not a candidate to be the
      // last window, but it is very much a window the user would lose. The question is about what
      // survives this close, not about which windows could be the last one standing.
      addWindow(fakeWindow(1));
      addWindow(fakeWindow(2));
      setPrimaryWindowId(1);
      setWindowPendingContentPredicate((windowId) => windowId === 2);
      const { confirm } = promptAnswering('cancel');

      const decision = await decideWindowClose(1, confirm);

      expect(confirm).toHaveBeenCalledTimes(1);
      expect(decision).toBe('stay-open');
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
