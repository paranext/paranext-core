// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import {
  classifySelectionAnchor,
  readFootnotesSelectionState,
  runFootnotesEditMenuCommand,
  type FootnotesEditMenuContext,
} from './edit-target.util';
import { EDIT_MENU_COMMANDS } from './edit-menu-actions.util';

function buildDom() {
  document.body.innerHTML = `
    <div id="main"><p id="mainText">main text</p></div>
    <div id="pane">
      <button id="paneClose">x</button>
      <div id="rows">
        <ul>
          <li id="readOnlyRow">read-only note</li>
          <li id="editingRow"><div class="editor-input"><span id="rowEditorText">row text</span></div></li>
        </ul>
      </div>
    </div>
    <div id="toolbar"><button id="toolbarButton">Edit</button></div>`;
  const byId = (id: string) => {
    const element = document.getElementById(id);
    if (!element) throw new Error(`missing ${id}`);
    return element;
  };
  return { byId, roots: { mainEditorRoot: byId('main'), footnotesRows: byId('rows') } };
}

describe('classifySelectionAnchor', () => {
  it("says 'main' for an anchor inside the main editor", () => {
    const { byId, roots } = buildDom();
    expect(classifySelectionAnchor(byId('mainText').firstChild, roots)).toBe('main');
  });

  it("says 'footnotes' for an anchor in the pane's rows, read-only or editing", () => {
    const { byId, roots } = buildDom();
    expect(classifySelectionAnchor(byId('readOnlyRow').firstChild, roots)).toBe('footnotes');
    expect(classifySelectionAnchor(byId('rowEditorText').firstChild, roots)).toBe('footnotes');
  });

  it('says nothing for the pane header, the toolbar, no selection, or a missing region', () => {
    const { byId, roots } = buildDom();
    expect(classifySelectionAnchor(byId('paneClose'), roots)).toBeUndefined();
    expect(classifySelectionAnchor(byId('toolbarButton'), roots)).toBeUndefined();
    expect(classifySelectionAnchor(undefined, roots)).toBeUndefined();
    expect(
      classifySelectionAnchor(byId('readOnlyRow'), {
        mainEditorRoot: undefined,
        footnotesRows: undefined,
      }),
    ).toBeUndefined();
  });
});

describe('readFootnotesSelectionState', () => {
  it('reports a range in the rows, and whether it is in the row editor', () => {
    const { byId, roots } = buildDom();
    expect(
      readFootnotesSelectionState(
        { anchorNode: byId('readOnlyRow').firstChild, isCollapsed: false },
        roots.footnotesRows,
      ),
    ).toEqual({ hasSelection: true, inRowEditor: false });
    expect(
      readFootnotesSelectionState(
        { anchorNode: byId('rowEditorText').firstChild, isCollapsed: false },
        roots.footnotesRows,
      ),
    ).toEqual({ hasSelection: true, inRowEditor: true });
  });

  it('reports a caret as no selection, and anything outside the rows as nothing', () => {
    const { byId, roots } = buildDom();
    expect(
      readFootnotesSelectionState(
        { anchorNode: byId('rowEditorText').firstChild, isCollapsed: true },
        roots.footnotesRows,
      ),
    ).toEqual({ hasSelection: false, inRowEditor: true });
    expect(
      readFootnotesSelectionState(
        { anchorNode: byId('mainText').firstChild, isCollapsed: false },
        roots.footnotesRows,
      ),
    ).toEqual({ hasSelection: false, inRowEditor: false });
    expect(readFootnotesSelectionState(undefined, roots.footnotesRows)).toEqual({
      hasSelection: false,
      inRowEditor: false,
    });
  });
});

describe('runFootnotesEditMenuCommand', () => {
  const [CUT, COPY, PASTE, PASTE_PLAIN] = EDIT_MENU_COMMANDS;

  const makeContext = (overrides: Partial<FootnotesEditMenuContext> = {}) => {
    const rowEditor = {
      cut: vi.fn(),
      copy: vi.fn(),
      paste: vi.fn(),
      pastePlainText: vi.fn(),
    };
    const context: FootnotesEditMenuContext = {
      rowEditor,
      isSelectionInRowEditor: true,
      hasRowsSelection: false,
      copyBrowserSelection: vi.fn(),
      notifyActionBlocked: vi.fn(),
      onActionError: vi.fn(),
      ...overrides,
    };
    return { rowEditor, context };
  };

  it.each([
    [CUT, 'cut'],
    [COPY, 'copy'],
    [PASTE, 'paste'],
    [PASTE_PLAIN, 'pastePlainText'],
  ] as const)(
    'sends %s to the row editor handle when the selection is in it',
    (command, method) => {
      const { rowEditor, context } = makeContext();

      expect(runFootnotesEditMenuCommand(command, context)).toBe(true);

      expect(rowEditor[method]).toHaveBeenCalledOnce();
      expect(context.notifyActionBlocked).not.toHaveBeenCalled();
    },
  );

  it('copies a read-only row selection through the browser, so the pane applies the copy limit', () => {
    const { context } = makeContext({ rowEditor: undefined, hasRowsSelection: true });

    expect(runFootnotesEditMenuCommand(COPY, context)).toBe(true);

    expect(context.copyBrowserSelection).toHaveBeenCalledOnce();
  });

  it('copies a read-only row selection through the browser when the row editor holds no selection', () => {
    const { rowEditor, context } = makeContext({
      isSelectionInRowEditor: false,
      hasRowsSelection: true,
    });

    runFootnotesEditMenuCommand(COPY, context);

    expect(context.copyBrowserSelection).toHaveBeenCalledOnce();
    expect(rowEditor.copy).not.toHaveBeenCalled();
  });

  it('does nothing, silently, for Copy with nothing selected', () => {
    const { context } = makeContext({ rowEditor: undefined });

    expect(runFootnotesEditMenuCommand(COPY, context)).toBe(false);

    expect(context.copyBrowserSelection).not.toHaveBeenCalled();
    expect(context.notifyActionBlocked).not.toHaveBeenCalled();
  });

  it.each([CUT, PASTE, PASTE_PLAIN])(
    'does nothing but show the blocked notice for %s on a read-only row',
    (command) => {
      const { rowEditor, context } = makeContext({
        rowEditor: undefined,
        isSelectionInRowEditor: false,
        hasRowsSelection: true,
      });

      expect(runFootnotesEditMenuCommand(command, context)).toBe(false);

      expect(context.notifyActionBlocked).toHaveBeenCalledOnce();
      expect(context.copyBrowserSelection).not.toHaveBeenCalled();
      expect(rowEditor.cut).not.toHaveBeenCalled();
    },
  );

  it('reports a failing handle and shows the blocked notice', () => {
    const error = new Error('clipboard denied');
    const { rowEditor, context } = makeContext();
    rowEditor.paste.mockImplementation(() => {
      throw error;
    });

    expect(runFootnotesEditMenuCommand(PASTE, context)).toBe(false);

    expect(context.onActionError).toHaveBeenCalledWith(error);
    expect(context.notifyActionBlocked).toHaveBeenCalledOnce();
  });
});
