// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { runKeepingBrowserSelection } from './browser-selection.util';

/** A paragraph with one text node, selected from `start` to `end`. */
function selectText(start: number, end: number) {
  const paragraph = document.createElement('p');
  paragraph.textContent = 'grace and truth';
  document.body.appendChild(paragraph);
  const text = paragraph.firstChild;
  if (!text) throw new Error('missing text node');
  window.getSelection()?.setBaseAndExtent(text, start, text, end);
  return { paragraph, text };
}

/** What the editor's copy does to the browser selection: selects an element, then removes it. */
function moveSelectionAway() {
  const hidden = document.createElement('span');
  hidden.textContent = '#';
  document.body.appendChild(hidden);
  window.getSelection()?.selectAllChildren(hidden);
  hidden.remove();
}

describe('runKeepingBrowserSelection', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.getSelection()?.removeAllRanges();
    document.body.replaceChildren();
  });

  it('puts back a selection the action moved', () => {
    selectText(0, 5);

    runKeepingBrowserSelection(moveSelectionAway);

    expect(window.getSelection()?.toString()).toBe('grace');
  });

  it('keeps the direction of a backward selection', () => {
    const { text } = selectText(9, 0);

    runKeepingBrowserSelection(moveSelectionAway);

    const selection = window.getSelection();
    expect(selection?.anchorNode).toBe(text);
    expect(selection?.anchorOffset).toBe(9);
    expect(selection?.focusOffset).toBe(0);
  });

  it('puts the selection back, and still throws, when the action throws', () => {
    selectText(0, 5);

    expect(() =>
      runKeepingBrowserSelection(() => {
        moveSelectionAway();
        throw new Error('copy failed');
      }),
    ).toThrow('copy failed');
    expect(window.getSelection()?.toString()).toBe('grace');
  });

  it('leaves the selection alone when the action did not move it', () => {
    selectText(0, 5);
    const setBaseAndExtent = vi.spyOn(Selection.prototype, 'setBaseAndExtent');

    runKeepingBrowserSelection(() => {});

    expect(setBaseAndExtent).not.toHaveBeenCalled();
  });

  it('puts nothing back when the selected text is gone', () => {
    const { paragraph } = selectText(0, 5);

    runKeepingBrowserSelection(() => {
      paragraph.remove();
      moveSelectionAway();
    });

    expect(window.getSelection()?.toString()).toBe('');
  });

  it('does not throw when the selected text got shorter than the old selection', () => {
    const { text } = selectText(0, 9);

    expect(() =>
      runKeepingBrowserSelection(() => {
        text.textContent = 'gr';
        moveSelectionAway();
      }),
    ).not.toThrow();
  });

  it('leaves the selection to the action when the browser had none, as with a selected paragraph marker', () => {
    // A selected paragraph marker is the editor's own node selection, not a browser range.
    window.getSelection()?.removeAllRanges();
    const setBaseAndExtent = vi.spyOn(Selection.prototype, 'setBaseAndExtent');
    const action = vi.fn(moveSelectionAway);

    runKeepingBrowserSelection(action);

    expect(action).toHaveBeenCalledTimes(1);
    expect(setBaseAndExtent).not.toHaveBeenCalled();
  });
});
