import { describe, expect, test } from 'vitest';
import {
  chooseNoticeParentWindowId,
  decideAbandonedWindowNotice,
  type AbandonedWindowNoticeInput,
} from '@main/abandoned-window-notice.util';

/** A window that has just been given up on, on screen, with nothing else going on */
const ASKABLE: AbandonedWindowNoticeInput = {
  isAppShuttingDown: false,
  isWindowClosing: false,
  hasAlreadyAsked: false,
  isAbandonedWindowVisible: true,
  isAbandonedWindowPendingContent: false,
};

describe('decideAbandonedWindowNotice', () => {
  test('asks on the abandoned window itself when it is on screen', () => {
    // The message is about that window, and a message about window B appearing over window A reads
    // as being about A
    expect(decideAbandonedWindowNotice(ASKABLE)).toEqual({
      kind: 'ask',
      parent: 'abandoned-window',
    });
  });

  test('asks on another window when the abandoned window is not on screen', () => {
    // A modal parented to a minimized or hidden window is a question nobody is shown, and the
    // window it is about has already stopped being somewhere the user can look
    expect(decideAbandonedWindowNotice({ ...ASKABLE, isAbandonedWindowVisible: false })).toEqual({
      kind: 'ask',
      parent: 'another-window',
    });
  });

  test('says nothing while the application is going down', () => {
    // Every window is on its way out, so the offer to close one is noise — and a whole-application
    // crash would otherwise put one of these on screen per window
    expect(decideAbandonedWindowNotice({ ...ASKABLE, isAppShuttingDown: true })).toEqual({
      kind: 'stay-silent',
    });
  });

  test('says nothing about a window whose close has already begun', () => {
    // The window is going anyway; offering to close it is a question with no answer left to give
    expect(decideAbandonedWindowNotice({ ...ASKABLE, isWindowClosing: true })).toEqual({
      kind: 'stay-silent',
    });
  });

  test('says nothing the second time about the same window', () => {
    // `render-process-gone` can fire again for a window already given up on. The user has answered
    // once; asking again would reopen a question they closed.
    expect(decideAbandonedWindowNotice({ ...ASKABLE, hasAlreadyAsked: true })).toEqual({
      kind: 'stay-silent',
    });
  });

  test('says nothing about a window that never received the content it was made for', () => {
    // Such a window's entry holds nothing, so it is not kept when the window closes — the offer's
    // promise that the window comes back would be false, and there is nothing to bring back anyway
    expect(
      decideAbandonedWindowNotice({ ...ASKABLE, isAbandonedWindowPendingContent: true }),
    ).toEqual({ kind: 'stay-silent' });
  });

  test('a window that is both invisible and already asked about stays silent', () => {
    // Silence wins over the parent choice: the parent only matters once asking is decided, so a
    // reordering that let the fallback answer first would ask a question that should not exist
    expect(
      decideAbandonedWindowNotice({
        ...ASKABLE,
        hasAlreadyAsked: true,
        isAbandonedWindowVisible: false,
      }),
    ).toEqual({ kind: 'stay-silent' });
  });
});

describe('chooseNoticeParentWindowId', () => {
  test('never answers with the window the notice is about', () => {
    // This choice is only made because that window is not on screen, and the primary role sits on
    // the persisted entry — which a window given up on keeps. Answering with it would put the
    // question back on the window nobody is shown, which is the whole thing this avoids.
    expect(
      chooseNoticeParentWindowId('1', [
        { windowId: '1', isPrimary: true },
        { windowId: '2', isPrimary: false },
      ]),
    ).toBe('2');
  });

  test('prefers the primary among the windows that are left', () => {
    expect(
      chooseNoticeParentWindowId('1', [
        { windowId: '2', isPrimary: false },
        { windowId: '3', isPrimary: true },
      ]),
    ).toBe('3');
  });

  test('takes any other window when none of them holds the role', () => {
    // Reachable exactly when the abandoned window is the primary: some window has to carry the
    // question, and any window the user can see beats one they cannot
    expect(
      chooseNoticeParentWindowId('1', [
        { windowId: '1', isPrimary: true },
        { windowId: '2', isPrimary: false },
        { windowId: '3', isPrimary: false },
      ]),
    ).toBe('2');
  });

  test('answers with nothing when there is no other window', () => {
    // The caller shows the box with no parent rather than parenting it to a window off screen
    expect(chooseNoticeParentWindowId('1', [{ windowId: '1', isPrimary: true }])).toBeUndefined();
    expect(chooseNoticeParentWindowId('1', [])).toBeUndefined();
  });
});
