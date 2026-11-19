// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { classifySelectionAnchor, hasFootnotesRowsSelection } from './edit-target.util';

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

describe('hasFootnotesRowsSelection', () => {
  it('is true for a range in the rows, read-only row or row editor', () => {
    const { byId, roots } = buildDom();
    expect(
      hasFootnotesRowsSelection(
        { anchorNode: byId('readOnlyRow').firstChild, isCollapsed: false },
        roots.footnotesRows,
      ),
    ).toBe(true);
    expect(
      hasFootnotesRowsSelection(
        { anchorNode: byId('rowEditorText').firstChild, isCollapsed: false },
        roots.footnotesRows,
      ),
    ).toBe(true);
  });

  it('is false for a caret, a range outside the rows, no selection, or no rows', () => {
    const { byId, roots } = buildDom();
    expect(
      hasFootnotesRowsSelection(
        { anchorNode: byId('readOnlyRow').firstChild, isCollapsed: true },
        roots.footnotesRows,
      ),
    ).toBe(false);
    expect(
      hasFootnotesRowsSelection(
        { anchorNode: byId('mainText').firstChild, isCollapsed: false },
        roots.footnotesRows,
      ),
    ).toBe(false);
    expect(hasFootnotesRowsSelection(undefined, roots.footnotesRows)).toBe(false);
    expect(
      hasFootnotesRowsSelection(
        { anchorNode: byId('readOnlyRow').firstChild, isCollapsed: false },
        undefined,
      ),
    ).toBe(false);
  });
});
