// @vitest-environment jsdom
// jsdom, not this package's default node environment: the claim is observed by dispatching a real
// keydown through window listeners.

import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  InsertCommentChordKeys,
  isInsertCommentChord,
  runPaletteSessionKeyDown,
} from './insert-comment-chord.util';

function keys(
  key: string,
  modifiers: Partial<InsertCommentChordKeys> = {},
): InsertCommentChordKeys {
  return { key, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false, ...modifiers };
}

describe('isInsertCommentChord', () => {
  it('is Cmd+Alt+M on macOS, including the µ that Option+M can type', () => {
    expect(isInsertCommentChord(keys('m', { metaKey: true, altKey: true }), true)).toBe(true);
    expect(isInsertCommentChord(keys('µ', { metaKey: true, altKey: true }), true)).toBe(true);
    expect(isInsertCommentChord(keys('M', { metaKey: true, altKey: true }), true)).toBe(true);
  });

  it('is Ctrl+Alt+M or Ctrl+Shift+N on Windows and Linux', () => {
    expect(isInsertCommentChord(keys('m', { ctrlKey: true, altKey: true }), false)).toBe(true);
    expect(isInsertCommentChord(keys('N', { ctrlKey: true, shiftKey: true }), false)).toBe(true);
  });

  it("is not another platform's chord, nor a chord missing a modifier", () => {
    expect(isInsertCommentChord(keys('m', { ctrlKey: true, altKey: true }), true)).toBe(false);
    expect(isInsertCommentChord(keys('m', { metaKey: true, altKey: true }), false)).toBe(false);
    expect(isInsertCommentChord(keys('m', { ctrlKey: true }), false)).toBe(false);
    expect(isInsertCommentChord(keys('n', { ctrlKey: true }), false)).toBe(false);
    expect(isInsertCommentChord(keys('m', { altKey: true }), true)).toBe(false);
  });
});

/**
 * The web view's two window keydown listeners, reduced to what this chord needs: the capture one
 * hands keys to an open palette session, the bubble one inserts a comment on the chord.
 */
function listenLikeTheWebView(isMac: boolean) {
  const session = { isOpen: true };
  // Like the real key table: an ordinary chord dismisses the palette (ending the session) and is
  // declined, so it keeps propagating.
  const runSessionKey = vi.fn(() => {
    session.isOpen = false;
  });
  const insertComment = vi.fn();

  const handleCapture = (event: KeyboardEvent) => {
    if (session.isOpen) runPaletteSessionKeyDown(event, isMac, runSessionKey);
  };
  const handleBubble = (event: KeyboardEvent) => {
    if (isInsertCommentChord(event, isMac)) insertComment();
  };
  window.addEventListener('keydown', handleCapture, true);
  window.addEventListener('keydown', handleBubble);

  return {
    session,
    runSessionKey,
    insertComment,
    removeListeners: () => {
      window.removeEventListener('keydown', handleCapture, true);
      window.removeEventListener('keydown', handleBubble);
    },
  };
}

describe('runPaletteSessionKeyDown', () => {
  let removeListeners: (() => void) | undefined;
  afterEach(() => {
    removeListeners?.();
    removeListeners = undefined;
    document.body.replaceChildren();
  });

  /** Dispatches a keydown at an element in the document, as typing in the editor does */
  function pressInEditor(init: KeyboardEventInit): KeyboardEvent {
    const editor = document.createElement('div');
    document.body.appendChild(editor);
    const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
    editor.dispatchEvent(event);
    return event;
  }

  it('closes the palette without inserting a comment when the chord is pressed with a palette open', () => {
    const webView = listenLikeTheWebView(false);
    removeListeners = webView.removeListeners;

    const event = pressInEditor({ key: 'm', ctrlKey: true, altKey: true });

    expect(webView.runSessionKey).toHaveBeenCalledOnce();
    expect(webView.session.isOpen).toBe(false);
    expect(webView.insertComment).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
  });

  it('leaves every other key the session declines to propagate', () => {
    const webView = listenLikeTheWebView(true);
    removeListeners = webView.removeListeners;
    const bubbleSpy = vi.fn();
    window.addEventListener('keydown', bubbleSpy);

    const event = pressInEditor({ key: 'b', metaKey: true });

    window.removeEventListener('keydown', bubbleSpy);
    expect(webView.runSessionKey).toHaveBeenCalledOnce();
    expect(bubbleSpy).toHaveBeenCalledOnce();
    expect(event.defaultPrevented).toBe(false);
  });

  it('inserts a comment on the chord when no palette is open', () => {
    const webView = listenLikeTheWebView(true);
    removeListeners = webView.removeListeners;
    webView.session.isOpen = false;

    pressInEditor({ key: 'm', metaKey: true, altKey: true });

    expect(webView.runSessionKey).not.toHaveBeenCalled();
    expect(webView.insertComment).toHaveBeenCalledOnce();
  });
});
