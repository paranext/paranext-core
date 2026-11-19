// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
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
    getRoots: () => ({ mainEditorRoot: main, footnotesRows: rows }),
    isRowEditorOpen: true,
    resetToken: 'GEN|1',
    mainHasSelection: false,
  };

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

  it('starts on the main text, editable, following the main selection', () => {
    const { result } = renderHook((props: UseEditTargetOptions) => useEditTarget(props), {
      initialProps: { ...baseOptions, mainHasSelection: true },
    });

    expect(result.current).toMatchObject({ target: 'main', hasSelection: true, isEditable: true });
  });

  it('follows a selection into a read-only row, stays there when the selection goes elsewhere, and returns on a main selection', () => {
    const { result } = renderHook((props: UseEditTargetOptions) => useEditTarget(props), {
      initialProps: { ...baseOptions, isRowEditorOpen: false, mainHasSelection: true },
    });

    select(readOnlyText);
    expect(result.current).toMatchObject({
      target: 'footnotes',
      hasSelection: true,
      isEditable: false,
    });

    // Nowhere: the toolbar, then no selection at all.
    select(toolbarButton);
    expect(result.current.target).toBe('footnotes');
    act(() => {
      document.getSelection()?.removeAllRanges();
      document.dispatchEvent(new Event('selectionchange'));
    });
    expect(result.current.target).toBe('footnotes');
    expect(result.current.hasSelection).toBe(true);

    select(mainText);
    expect(result.current).toMatchObject({ target: 'main', hasSelection: true, isEditable: true });
  });

  it('is editable only while the footnote selection is inside the open row editor', () => {
    const { result, rerender } = renderHook((props: UseEditTargetOptions) => useEditTarget(props), {
      initialProps: baseOptions,
    });

    select(rowEditorText);
    expect(result.current).toMatchObject({ target: 'footnotes', isEditable: true });
    expect(result.current.isSelectionInRowEditor).toBe(true);

    select(readOnlyText);
    expect(result.current).toMatchObject({ target: 'footnotes', isEditable: false });

    select(rowEditorText);
    rerender({ ...baseOptions, isRowEditorOpen: false });
    expect(result.current.isEditable).toBe(false);
  });

  it('reports no selection once the row editor closes, with the target still on the footnotes', () => {
    const { result, rerender } = renderHook((props: UseEditTargetOptions) => useEditTarget(props), {
      initialProps: baseOptions,
    });
    select(rowEditorText);
    expect(result.current.hasSelection).toBe(true);

    // The row editor's nodes are replaced: the selection is no longer in the rows.
    act(() => {
      document.getSelection()?.removeAllRanges();
    });
    rerender({ ...baseOptions, isRowEditorOpen: false });

    expect(result.current).toMatchObject({
      target: 'footnotes',
      hasSelection: false,
      isEditable: false,
    });
  });

  it('re-reads the selection when the pane hides or another row opens, keeping the target', () => {
    const { result, rerender } = renderHook((props: UseEditTargetOptions) => useEditTarget(props), {
      initialProps: { ...baseOptions, recheckToken: 'true|0' },
    });
    select(readOnlyText);
    expect(result.current).toMatchObject({ target: 'footnotes', hasSelection: true });

    act(() => {
      document.getSelection()?.removeAllRanges();
    });
    rerender({ ...baseOptions, recheckToken: 'false|undefined' });

    expect(result.current).toMatchObject({ target: 'footnotes', hasSelection: false });
  });

  it("does not move the target when only the main editor's own selection changes", () => {
    const { result, rerender } = renderHook((props: UseEditTargetOptions) => useEditTarget(props), {
      initialProps: baseOptions,
    });
    select(readOnlyText, { collapsed: true });
    expect(result.current).toMatchObject({ target: 'footnotes', hasSelection: false });

    rerender({ ...baseOptions, mainHasSelection: true });

    expect(result.current).toMatchObject({ target: 'footnotes', hasSelection: false });
  });

  it('returns to the main text when the reset token changes', () => {
    const { result, rerender } = renderHook((props: UseEditTargetOptions) => useEditTarget(props), {
      initialProps: baseOptions,
    });
    select(readOnlyText);
    expect(result.current.target).toBe('footnotes');

    rerender({ ...baseOptions, resetToken: 'GEN|2' });

    expect(result.current).toMatchObject({ target: 'main', hasSelection: false, isEditable: true });
  });

  it('classifies on focusin as well as selectionchange', () => {
    const { result } = renderHook((props: UseEditTargetOptions) => useEditTarget(props), {
      initialProps: baseOptions,
    });
    const selection = document.getSelection();
    const range = document.createRange();
    range.selectNodeContents(readOnlyText);
    selection?.addRange(range);

    act(() => {
      document.getElementById('readOnly')?.dispatchEvent(new Event('focusin', { bubbles: true }));
    });

    expect(result.current.target).toBe('footnotes');
  });

  it('stops listening on unmount', () => {
    const { result, unmount } = renderHook((props: UseEditTargetOptions) => useEditTarget(props), {
      initialProps: baseOptions,
    });
    unmount();
    select(readOnlyText);
    expect(result.current.target).toBe('main');
  });
});
