import type { FootnoteEditorHandle } from 'platform-bible-react';
import type { EditMenuCommand } from './edit-menu-actions.util';

/**
 * Which editor the tab's top-menu Edit commands act on: the main Scripture text, or the footnotes
 * pane (an open row editor, or a selection in a read-only row).
 */
export type EditTarget = 'main' | 'footnotes';

/** The two regions a selection can be classified into. */
export type EditTargetRoots = {
  /** The main editor's own element, or `null` while it is not mounted */
  mainEditorRoot: Element | null | undefined;
  /**
   * The footnotes pane's list of rows (the row editor and the read-only rows), without the pane's
   * header, close button or other chrome; `null` while the pane is not rendered
   */
  footnotesRows: Element | null | undefined;
};

/** The selector of the open row editor's editable root inside the pane's rows. */
export const ROW_EDITOR_ROOT_SELECTOR = '.editor-input';

/**
 * Says which editor a selection anchor sits in.
 *
 * @param anchor The browser selection's anchor node, `null` or `undefined` for no selection
 * @param roots The regions to test the anchor against
 * @returns The target the anchor is in, or `undefined` when it is in neither (the toolbar, a pane
 *   header, a blur, no selection): the caller keeps its current target then
 */
export function classifySelectionAnchor(
  anchor: Node | null | undefined,
  { mainEditorRoot, footnotesRows }: EditTargetRoots,
): EditTarget | undefined {
  if (!anchor) return undefined;
  if (mainEditorRoot?.contains(anchor)) return 'main';
  if (footnotesRows?.contains(anchor)) return 'footnotes';
  return undefined;
}

/** What the browser selection says about the footnotes pane's rows. */
export type FootnotesSelectionState = {
  /** Whether the selection is a range inside the pane's rows */
  hasSelection: boolean;
  /** Whether the selection's anchor is inside the row editor */
  inRowEditor: boolean;
};

export const NO_FOOTNOTES_SELECTION: FootnotesSelectionState = {
  hasSelection: false,
  inRowEditor: false,
};

/**
 * Reads where the browser selection is relative to the footnotes pane's rows.
 *
 * @param selection The document's selection, `null` for none
 * @param footnotesRows The pane's rows, `null` while the pane is not rendered
 */
export function readFootnotesSelectionState(
  selection: Pick<Selection, 'anchorNode' | 'isCollapsed'> | null | undefined,
  footnotesRows: Element | null | undefined,
): FootnotesSelectionState {
  const anchor = selection?.anchorNode;
  if (!selection || !anchor || !footnotesRows?.contains(anchor)) return NO_FOOTNOTES_SELECTION;
  return {
    hasSelection: !selection.isCollapsed,
    inRowEditor: !!footnotesRows.querySelector(ROW_EDITOR_ROOT_SELECTOR)?.contains(anchor),
  };
}

/** What {@link runFootnotesEditMenuCommand} needs from the footnotes pane and the web view. */
export type FootnotesEditMenuContext = {
  /** The open row editor, or `undefined`/`null` when no row session is open */
  rowEditor:
    | Pick<FootnoteEditorHandle, 'cut' | 'copy' | 'paste' | 'pastePlainText'>
    | null
    | undefined;
  /** Whether the selection the user last made is inside the open row editor */
  isSelectionInRowEditor: boolean;
  /** Whether a non-collapsed browser selection is inside the pane's rows right now */
  hasRowsSelection: boolean;
  /** Copies the browser selection; the pane's own copy handler applies the copy limit */
  copyBrowserSelection: () => void;
  /** Tells the user the action is not available */
  notifyActionBlocked: () => void;
  /** Reports an action that threw */
  onActionError: (error: unknown) => void;
};

/**
 * Runs a top-menu Cut / Copy / Paste while the edit target is the footnotes pane. Never touches the
 * main editor: when the pane has nothing to act on, Copy does nothing and Cut and Paste tell the
 * user the action is blocked, since acting on the main text at a caret the user left earlier would
 * be worse.
 *
 * @returns Whether an action ran
 */
export function runFootnotesEditMenuCommand(
  command: EditMenuCommand,
  {
    rowEditor,
    isSelectionInRowEditor,
    hasRowsSelection,
    copyBrowserSelection,
    notifyActionBlocked,
    onActionError,
  }: FootnotesEditMenuContext,
): boolean {
  const isCopy = command === 'platformScriptureEditor.copySelection';
  try {
    if (rowEditor && isSelectionInRowEditor) {
      switch (command) {
        case 'platformScriptureEditor.cutSelection':
          rowEditor.cut();
          break;
        case 'platformScriptureEditor.copySelection':
          rowEditor.copy();
          break;
        case 'platformScriptureEditor.pasteAtSelection':
          rowEditor.paste();
          break;
        case 'platformScriptureEditor.pasteAsPlainTextAtSelection':
          rowEditor.pastePlainText();
          break;
        default: {
          const unhandled: never = command;
          throw new Error(`Unhandled Edit command: ${String(unhandled)}`);
        }
      }
      return true;
    }
    if (isCopy && hasRowsSelection) {
      copyBrowserSelection();
      return true;
    }
  } catch (e) {
    onActionError(e);
    notifyActionBlocked();
    return false;
  }
  if (!isCopy) notifyActionBlocked();
  return false;
}
