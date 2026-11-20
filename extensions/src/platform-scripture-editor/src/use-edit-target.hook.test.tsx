// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEditTarget, type UseEditTargetOptions } from './use-edit-target.hook';

function find(selector: string): HTMLElement {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) throw new Error(`No element matches ${selector}`);
  return element;
}

function textOf(element: Element): Text {
  const { firstChild } = element;
  if (!(firstChild instanceof Text)) throw new Error('The element has no text');
  return firstChild;
}

describe('useEditTarget', () => {
  let main: HTMLElement;
  let rows: HTMLElement;
  let readOnlyText: Text;
  let rowEditorText: Text;
  let mainText: Text;
  let toolbarButton: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="main"><p>main text</p></div>
      <div id="rows">
        <p id="readOnly">read-only note</p>
        <div class="editor-input"><span>row text</span></div>
      </div>
      <button id="toolbar">Edit</button>`;
    main = find('#main');
    rows = find('#rows');
    toolbarButton = find('#toolbar');
    mainText = textOf(find('#main p'));
    readOnlyText = textOf(find('#readOnly'));
    rowEditorText = textOf(find('#rows .editor-input span'));
  });

  afterEach(() => {
    document.getSelection()?.removeAllRanges();
    document.body.innerHTML = '';
  });

  const baseOptions: UseEditTargetOptions = {
    getMainEditorRoot: () => main,
    getFootnotesRows: () => rows,
    recheckToken: 'rendered',
    resetToken: 'GEN|1',
    mainHasSelection: false,
  };

  const render = (initialProps: UseEditTargetOptions = baseOptions) =>
    renderHook((props: UseEditTargetOptions) => useEditTarget(props), { initialProps });

  const select = (node: Node, { collapsed = false } = {}) => {
    const range = document.createRange();
    range.selectNodeContents(node);
    if (collapsed) range.collapse(true);
    const selection = document.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });
  };

  it('starts on the main text, following the main selection', () => {
    const { result } = render({ ...baseOptions, mainHasSelection: true });

    expect(result.current).toEqual({ target: 'main', hasSelection: true });
  });

  it('follows a selection into the pane, stays there when the selection goes elsewhere, and returns on a main selection', () => {
    const { result } = render({ ...baseOptions, mainHasSelection: true });

    select(readOnlyText);
    expect(result.current).toEqual({ target: 'footnotes', hasSelection: true });

    // Nowhere: the toolbar (the pane's selection is gone), then no selection at all.
    select(toolbarButton);
    expect(result.current).toEqual({ target: 'footnotes', hasSelection: false });
    act(() => {
      document.getSelection()?.removeAllRanges();
      document.dispatchEvent(new Event('selectionchange'));
    });
    expect(result.current).toEqual({ target: 'footnotes', hasSelection: false });

    select(mainText);
    expect(result.current).toEqual({ target: 'main', hasSelection: true });
  });

  it('drops the footnote selection when the selection moves outside both editors, keeping the target', () => {
    const { result } = render();
    select(readOnlyText);
    expect(result.current).toEqual({ target: 'footnotes', hasSelection: true });

    // Control: a selection change that stays inside the rows keeps the selection.
    select(rowEditorText);
    expect(result.current).toEqual({ target: 'footnotes', hasSelection: true });

    select(toolbarButton);
    expect(result.current).toEqual({ target: 'footnotes', hasSelection: false });
  });

  it('counts a selection inside the row editor as a footnote selection', () => {
    const { result } = render();

    select(rowEditorText);
    expect(result.current).toEqual({ target: 'footnotes', hasSelection: true });

    select(rowEditorText, { collapsed: true });
    expect(result.current).toEqual({ target: 'footnotes', hasSelection: false });
  });

  it("does not move the target when only the main editor's own selection changes", () => {
    const { result, rerender } = render();
    select(readOnlyText, { collapsed: true });
    expect(result.current).toEqual({ target: 'footnotes', hasSelection: false });

    rerender({ ...baseOptions, mainHasSelection: true });

    expect(result.current).toEqual({ target: 'footnotes', hasSelection: false });
  });

  it('returns to the main text when the reset token changes', () => {
    const { result, rerender } = render();
    select(readOnlyText);
    expect(result.current.target).toBe('footnotes');

    rerender({ ...baseOptions, resetToken: 'GEN|2' });

    expect(result.current).toEqual({ target: 'main', hasSelection: false });
  });

  it('falls back to the main text when the footnote rows are gone, and stays put while they are rendered', () => {
    const { result, rerender } = render({ ...baseOptions, mainHasSelection: true });
    select(readOnlyText);
    expect(result.current.target).toBe('footnotes');

    // Control: the rows are still rendered and the selection is nowhere; the target stays.
    act(() => {
      document.getSelection()?.removeAllRanges();
    });
    rerender({ ...baseOptions, mainHasSelection: true, recheckToken: 'rendered, other row' });
    expect(result.current.target).toBe('footnotes');

    // The rows root is absent: no selection change fires in the main text, so it falls back at once.
    rerender({
      ...baseOptions,
      mainHasSelection: true,
      getFootnotesRows: () => undefined,
      recheckToken: 'not rendered',
    });
    expect(result.current).toEqual({ target: 'main', hasSelection: true });
  });

  it('re-reads the footnote selection when the recheck token changes, keeping the target', () => {
    const { result, rerender } = render();
    select(readOnlyText);
    expect(result.current).toEqual({ target: 'footnotes', hasSelection: true });

    act(() => {
      document.getSelection()?.removeAllRanges();
    });
    expect(result.current.hasSelection).toBe(true);
    rerender({ ...baseOptions, recheckToken: 'another row' });

    expect(result.current).toEqual({ target: 'footnotes', hasSelection: false });
  });

  it('classifies on focusin as well as selectionchange', () => {
    const { result } = render();
    const range = document.createRange();
    range.selectNodeContents(readOnlyText);
    document.getSelection()?.addRange(range);

    act(() => {
      find('#readOnly').dispatchEvent(new Event('focusin', { bubbles: true }));
    });

    expect(result.current.target).toBe('footnotes');
  });

  it('looks the footnote rows up only for a selection outside the main text', () => {
    const getFootnotesRows = vi.fn(() => rows);
    render({ ...baseOptions, getFootnotesRows });
    // Mounting rechecks once; what follows is the per-selection cost.
    getFootnotesRows.mockClear();

    select(mainText);
    expect(getFootnotesRows).not.toHaveBeenCalled();

    select(readOnlyText);
    expect(getFootnotesRows).toHaveBeenCalled();
  });

  it('stops listening on unmount', () => {
    const { result, unmount } = render();
    unmount();
    select(readOnlyText);
    expect(result.current.target).toBe('main');
  });
});
