/**
 * Decides whether the editor changed underneath an open marker palette.
 *
 * A palette commit applies AT THE CARET. If something moved the caret or changed the content while
 * the palette was open — an incoming update for the same chapter, a drag-and-drop, a context-menu
 * paste, the editor's own marker settle — then applying would put the marker somewhere the user
 * never chose, and the caret restored from the focus-out capture would address content that no
 * longer exists. So a changed editor ends the session instead of committing into it.
 *
 * The baseline is taken when focus LEAVES the editor for the palette, which is the last moment the
 * caret is still readable: Lexical's blur processing nulls the editor-state selection just after,
 * and the consumers already capture there for the same reason.
 *
 * Deliberately NOT based on Lexical's dirty-node markers: the root is marked dirty on every commit,
 * so they report a change for every palette that ever applies anything. This compares actual
 * content and the actual caret.
 */

/** A point-in-time fingerprint of the editor's content and caret. */
export interface EditorContentSnapshot {
  /**
   * The settled content, serialized for comparison. Settled rather than live so a marker edit the
   * user has pending does not read as a change the moment it settles on its own.
   */
  content: string;
  /**
   * The caret at capture, serialized, or `undefined` when it could not be read. Absent is not the
   * same as moved — see {@link hasEditorChanged}.
   */
  caret: string | undefined;
}

/**
 * Builds a snapshot from whatever the consumer can read right now. Both reads are allowed to fail:
 * an editor that cannot report its content yields `undefined`, and the guard then declines to block
 * anything rather than guessing.
 */
export function captureEditorContentSnapshot(
  readContent: () => unknown,
  readCaret: () => unknown,
): EditorContentSnapshot | undefined {
  const content = readContent();
  if (content === undefined) return undefined;
  const caret = readCaret();
  return {
    content: JSON.stringify(content),
    caret: caret === undefined ? undefined : JSON.stringify(caret),
  };
}

/**
 * Whether `current` represents a change from `baseline` that should end the session.
 *
 * Two deliberate non-changes:
 *
 * - **No baseline, or no current snapshot.** Never block on ignorance: a guard that fires when it
 *   cannot see is worse than no guard, because it breaks the ordinary commit path.
 * - **A caret that has gone missing.** Lexical nulls the editor-state selection on blur, which is
 *   exactly what happens when the palette takes focus — so an absent caret is the NORMAL state
 *   while a palette is open, not evidence that anything moved. A caret that is present and
 *   different is a real move.
 */
export function hasEditorChanged(
  baseline: EditorContentSnapshot | undefined,
  current: EditorContentSnapshot | undefined,
): boolean {
  if (!baseline || !current) return false;
  if (baseline.content !== current.content) return true;
  if (current.caret === undefined) return false;
  return current.caret !== baseline.caret;
}
