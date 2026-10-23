/** The parts of a keydown the insert-comment chord is read from */
export type InsertCommentChordKeys = Pick<
  KeyboardEvent,
  'key' | 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey'
>;

/**
 * Whether a keydown is the insert-comment chord: Cmd+Alt+M on macOS, Ctrl+Alt+M or Ctrl+Shift+N on
 * Windows/Linux.
 *
 * Read by both of the Scripture editor web view's keydown listeners — the capture-phase one claims
 * the chord while a marker palette session is open (see {@link runPaletteSessionKeyDown}), the
 * bubble-phase one inserts a comment otherwise — so the two cannot disagree on what the chord is:
 * claimed and never inserted, or inserted and never claimed.
 *
 * @param event The keydown
 * @param isMac Whether the app is running on macOS
 */
export function isInsertCommentChord(event: InsertCommentChordKeys, isMac: boolean): boolean {
  const key = event.key.toLowerCase();
  if (isMac)
    // In some cases, Mac interprets Option+M as 'µ', so check both
    return event.metaKey && event.altKey && (key === 'm' || key === 'µ');
  return (
    (event.ctrlKey && event.altKey && key === 'm') ||
    (event.ctrlKey && event.shiftKey && key === 'n')
  );
}

/**
 * Runs a keydown that arrived while a marker palette session is open through the session's key
 * table, and claims the insert-comment chord so that pressing it only closes the palette.
 *
 * The key table treats the chord as an ordinary chord — dismiss the palette, decline the key — and
 * a declined key keeps propagating, with the session already cleared. Unclaimed, it would reach the
 * bubble-phase listener, which inserts a comment, and the dismissal's refocus would then pull focus
 * straight back out of the comment box the user is typing in. The claim has to happen here, in the
 * capture-phase listener: by the bubble phase the session is gone, so no check there can tell that
 * the chord just closed a palette.
 *
 * Claiming it also matches what the chord does once the palette has focus, where the keystroke goes
 * to the renderer and never reaches the web view at all.
 *
 * @param event The keydown, seen by a capture-phase listener
 * @param isMac Whether the app is running on macOS
 * @param runSessionKey The open session's key table. It may end the session.
 */
export function runPaletteSessionKeyDown(
  event: KeyboardEvent,
  isMac: boolean,
  runSessionKey: (event: KeyboardEvent) => void,
): void {
  const closesPaletteOnly = isInsertCommentChord(event, isMac);
  runSessionKey(event);
  if (closesPaletteOnly) {
    event.preventDefault();
    event.stopPropagation();
  }
}
