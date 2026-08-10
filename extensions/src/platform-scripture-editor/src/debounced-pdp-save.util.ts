import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { areUsjContentsEqualExceptWhitespace } from 'platform-bible-utils';

/**
 * Inputs to a single fire of the debounced keystroke-driven PDP save. Everything the fire needs is
 * passed explicitly so the chapter-safety decision is a property of the captured payload, not of
 * React effect ordering (see {@link performDebouncedPdpSave}).
 */
export interface DebouncedPdpSaveParams {
  /**
   * The editor's USJ as of when this save was SCHEDULED — already SETTLED and with any declared
   * transient input (e.g. an open palette's `\`+filter literal) already excluded, because the
   * caller captures it via `EditorRef.getUsj()` at schedule time rather than forwarding the raw
   * `onUsjChange` payload. That is what makes it safe to replay later without re-reading the
   * editor: used as the save content when the chapter has since changed (the editor has moved on to
   * different content by then), and as a fallback when the editor can no longer be read.
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
  /** Read the editor's current USJ. Already settled — see `EditorRef.getUsj`. */
  getEditorUsj: () => Usj | undefined;
}

/**
 * Decides what an imperative "save the editor's USJ if it changed" should write to the PDP: returns
 * the USJ to save, or `undefined` when there is nothing new to write.
 *
 * No literal stripping any more: an in-editor command surface with input in flight declares it to
 * the editor (`EditorRef.setTransientInput`), which excludes those bytes from the settled USJ this
 * receives. The caller records the returned USJ as what was sent so the echo comparison converges.
 */
export function resolveUsjToSaveToPdp(
  usjFromEditor: Usj,
  usjFromPdp: Usj | undefined,
): Usj | undefined {
  return areUsjContentsEqualExceptWhitespace(usjFromPdp, usjFromEditor) ? undefined : usjFromEditor;
}

/**
 * Runs one fire of the debounced keystroke-driven PDP save, choosing the correct save target so a
 * pending trailing save can NEVER be written to the wrong chapter.
 *
 * A pending 700ms trailing save may fire (via the chapter-switch flush) AFTER the user has already
 * navigated to another chapter. By that point the editor holds the NEW chapter's content and the
 * current-chapter save refs have moved on. The prior implementation stayed correct only because
 * React happens to run effect cleanups (where the flush lives) before the effects that re-point
 * those refs — an implicit ordering guarantee. Here, WHICH content is saved and through WHICH of
 * the captured/current save fns is explicit and data-driven:
 *
 * - If the chapter changed between scheduling and firing, save the CAPTURED content via the CAPTURED
 *   save fn (both bound to the chapter the content was typed in) and never touch the editor —
 *   reading it would pull the new chapter's content, and the current save fn would write it to the
 *   wrong chapter.
 * - Otherwise (same chapter), save what the editor shows. `EditorRef.getUsj` already returns it
 *   settled, and already excludes any in-progress input an open command surface has declared, so
 *   there is no palette case to special-case and nothing here mutates the document. A pre-save
 *   settle used to, and that mutation is exactly what made a debounced save able to re-settle an
 *   explicitly-undone literal.
 *
 * This narrows, but does not remove, the effect-ordering dependency: both save fns still resolve
 * the actual PDP setter via `saveUsjToPdpRawStableRef.current` in
 * `platform-scripture-editor.web-view.tsx` (~line 1923), which is re-pointed to the new chapter's
 * setter from a `useEffect` BODY, not during render. A cross-chapter flush (itself running in an
 * effect CLEANUP) still relies on React's cleanup-before-body ordering to observe the OLD chapter's
 * setter there before that `useEffect` body reassigns it.
 */
export function performDebouncedPdpSave({
  usj,
  scheduledChapterKey,
  currentChapterKey,
  capturedSave,
  latestSave,
  getEditorUsj,
}: DebouncedPdpSaveParams): void {
  if (scheduledChapterKey !== currentChapterKey) {
    capturedSave(usj);
    return;
  }
  latestSave(getEditorUsj() ?? usj);
}
