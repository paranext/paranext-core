import type { EditorOptions, ViewOptions } from '@eten-tech-foundation/platform-editor';
import type { FootnoteEditorHandle } from 'platform-bible-react';
import { shouldEndPaneNoteEditOnRowSelect } from './platform-scripture-editor.utils';

/**
 * The editor options for the footnotes pane's row editor: the main editor's, on the pane's view
 * options, with structure protection off as it is in Power mode. A note has no verse or paragraph
 * structure of its own to protect, its edits only ever replace the note itself, and 'protected'
 * would claim Enter before the note's own `\fp` handling could run.
 *
 * @param editorOptions The main editor's options, so the row editor shares its copy limit, context
 *   menu and the rest
 * @param rowEditorViewOptions The view options the row editor renders with (see
 *   `useHeldPaneRowEditor`)
 */
export function getPaneRowEditorOptions(
  editorOptions: EditorOptions,
  rowEditorViewOptions: ViewOptions | undefined,
): EditorOptions {
  return { ...editorOptions, view: rowEditorViewOptions, structureProtectionMode: 'off' };
}

/**
 * Lands whatever the footnotes pane's row editor still has inside its live-apply debounce, before
 * its note-editing session closes.
 *
 * The flush settles every pending marker except the one under the caret of a FOCUSED editor, so
 * focus is released first, as the row editor's own close does: a session ended from outside while
 * the user is still typing in the row (a switch to Power mode, the text turning read-only) is the
 * user leaving that marker too. Without the blur, a marker rename still pending under the caret is
 * lost.
 *
 * @param rowEditor The row editor, if one is mounted
 * @param ownerDocument The document the row editor is in
 */
export function settleRowEditorBeforeClose(
  rowEditor: Pick<FootnoteEditorHandle, 'containsFocus' | 'flushPendingEdits'> | null | undefined,
  ownerDocument: Document,
): void {
  if (rowEditor?.containsFocus() && ownerDocument.activeElement instanceof HTMLElement)
    ownerDocument.activeElement.blur();
  rowEditor?.flushPendingEdits();
}

/** What {@link runPaneNoteEditRequest} reads and does */
export type PaneNoteEditRequestSteps = {
  /**
   * Whether the footnote popover is showing. A popover that outlived a switch into a pane-model
   * view still holds its note-editing session.
   */
  isPopoverOpen: boolean;
  /** The pane row whose note the row editor is open on, if any */
  paneEditingIndex: number | undefined;
  /** Moves the text to the note: reveals its caller, parks the caret past it, scrolls to its verse */
  navigateToNote: (index: number) => void;
  /** Ends the open row editor's session through the normal close path */
  endPaneNoteEdit: () => void;
  /** Opens the note in the row editor */
  startPaneNoteEdit: (index: number) => void;
};

/**
 * Carries out a request from the footnotes pane to edit a row's note in a pane-model view.
 *
 * While a popover still holds the session the text only moves to the note, as Space on the row
 * does, and the row is left merely selected until the popover is saved or closed: the popover
 * applies its text only on Save, so opening a row editor would close it and discard what was
 * typed.
 *
 * Otherwise a row editor open on another note is ended BEFORE the new note is read, as Space on
 * another row does. The row editor stays mounted and simply loads the next note, and a load flushes
 * the outgoing note unsettled: a marker rename still pending under its caret would be lost. Then
 * the text moves to the note and the note opens in the row editor.
 *
 * @param index The pane row whose note to edit
 * @param steps What this reads and does
 */
export function runPaneNoteEditRequest(index: number, steps: PaneNoteEditRequestSteps): void {
  if (steps.isPopoverOpen) {
    steps.navigateToNote(index);
    return;
  }
  if (
    shouldEndPaneNoteEditOnRowSelect({
      paneEditingIndex: steps.paneEditingIndex,
      selectedIndex: index,
    })
  )
    steps.endPaneNoteEdit();
  steps.navigateToNote(index);
  steps.startPaneNoteEdit(index);
}
