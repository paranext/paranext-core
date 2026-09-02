import { describe, expect, test } from 'vitest';
import {
  decideAbandonedWindowNotice,
  type AbandonedWindowNoticeInput,
} from '@main/abandoned-window-notice.util';

/** A window that has just been given up on, on screen, with nothing else going on */
const ASKABLE: AbandonedWindowNoticeInput = {
  isAppShuttingDown: false,
  isWindowClosing: false,
  hasAlreadyAsked: false,
  isAbandonedWindowVisible: true,
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

  test('asks on the primary instead when the abandoned window is not on screen', () => {
    // A modal parented to a minimized or hidden window is a question nobody is shown, and the
    // window it is about has already stopped being somewhere the user can look
    expect(decideAbandonedWindowNotice({ ...ASKABLE, isAbandonedWindowVisible: false })).toEqual({
      kind: 'ask',
      parent: 'primary-window',
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
