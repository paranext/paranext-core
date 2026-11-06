import type { ViewOptions } from '@eten-tech-foundation/platform-editor';
import { useRef } from 'react';
import type { NoteEditingSurface } from './platform-scripture-editor.utils';

/** The row editor the footnotes pane renders */
export type HeldPaneRowEditor = {
  /** The pane row the row editor is open on, if any */
  editingFootnoteIndex: number | undefined;
  /** The view options the row editor renders with */
  viewOptions: ViewOptions | undefined;
};

/**
 * Decides which row editor the footnotes pane renders, and on which view options, so that a session
 * ended from outside can still settle its note.
 *
 * When the pane stops being the editing surface (a switch to Power's Preview, the text turning
 * read-only), the row editor has to stay mounted until the effect that closes its session runs, and
 * by then the pane's view options can already be another view's: Power's Preview hides markers. The
 * editor runs its marker engine only in editable marker mode and tears it down before any effect of
 * that commit runs, so either unmounting the row editor or handing it the next view's options would
 * lose a marker rename still pending under its caret. So the row editor goes on rendering the open
 * session's note on the options it had while the pane was the editing surface, whatever the surface
 * is now, until the session ends.
 *
 * The held options are updated during render, so the row editor never renders a commit on the next
 * view's options.
 *
 * @param paneViewOptions The footnotes pane's current view options
 * @param noteEditingSurface Where notes are edited in the current view
 * @param paneEditingIndex The pane row whose note the open session is editing, if any
 */
export function useHeldPaneRowEditor(
  paneViewOptions: ViewOptions | undefined,
  noteEditingSurface: NoteEditingSurface,
  paneEditingIndex: number | undefined,
): HeldPaneRowEditor {
  const viewOptionsRef = useRef(paneViewOptions);
  if (noteEditingSurface === 'pane' || paneEditingIndex === undefined)
    viewOptionsRef.current = paneViewOptions;
  return { editingFootnoteIndex: paneEditingIndex, viewOptions: viewOptionsRef.current };
}
