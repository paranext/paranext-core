import { Usj } from '@eten-tech-foundation/scripture-utilities';

/**
 * Inputs to a single fire of the debounced keystroke-driven PDP save. Everything the fire needs is
 * passed explicitly so the chapter-safety decision is a property of the captured payload, not of
 * React effect ordering (see {@link performDebouncedPdpSave}).
 */
export interface DebouncedPdpSaveParams {
  /**
   * The editor's USJ captured when this save was SCHEDULED (the content typed for the chapter that
   * was active then). Used as the save content when the chapter has since changed, and as a
   * fallback when the editor can no longer be read.
   */
  usj: Usj;
  /** `book|chapterNum` of the chapter that was active when this save was SCHEDULED. */
  scheduledChapterKey: string;
  /** `book|chapterNum` of the chapter active NOW, at fire time. */
  currentChapterKey: string;
  /**
   * Save fn bound to the chapter that was active when SCHEDULED (captured at schedule time, so it
   * targets the right chapter even after the current-chapter refs have moved on).
   */
  capturedSave: (usj: Usj) => void;
  /** Save fn bound to the CURRENT chapter (read at fire time) — used for same-chapter saves. */
  latestSave: (usj?: Usj) => void;
  /** Whether a marker-palette session is currently open. */
  isPaletteSessionOpen: boolean;
  /** Settle pending mid-edit marker text in the editor so the saved USJ matches the screen. */
  commitPendingMarkerEdits: () => void;
  /** Read the editor's current (post-commit) USJ. */
  getEditorUsj: () => Usj | undefined;
}

/**
 * Runs one fire of the debounced keystroke-driven PDP save, choosing the correct save target so a
 * pending trailing save can NEVER be written to the wrong chapter.
 *
 * A pending 700ms trailing save may fire (via the chapter-switch flush) AFTER the user has already
 * navigated to another chapter. By that point the editor holds the NEW chapter's content and the
 * current-chapter save refs have moved on. The prior implementation stayed correct only because
 * React happens to run effect cleanups (where the flush lives) before the effects that re-point
 * those refs — an implicit ordering guarantee. Here the guarantee is explicit and data-driven:
 *
 * - If the chapter changed between scheduling and firing, save the CAPTURED content via the CAPTURED
 *   save fn (both bound to the chapter the content was typed in) and never touch the editor —
 *   reading it would pull the new chapter's content, and the current save fn would write it to the
 *   wrong chapter.
 * - Otherwise (same chapter), preserve the existing behavior: with a marker-palette session open,
 *   save the scheduled USJ without settling markers (the palette's apply must consume the typed
 *   literal); with no palette session, settle pending marker edits then save what the editor
 *   shows.
 */
export function performDebouncedPdpSave({
  usj,
  scheduledChapterKey,
  currentChapterKey,
  capturedSave,
  latestSave,
  isPaletteSessionOpen,
  commitPendingMarkerEdits,
  getEditorUsj,
}: DebouncedPdpSaveParams): void {
  if (scheduledChapterKey !== currentChapterKey) {
    capturedSave(usj);
    return;
  }
  if (isPaletteSessionOpen) {
    latestSave(usj);
    return;
  }
  commitPendingMarkerEdits();
  latestSave(getEditorUsj() ?? usj);
}
