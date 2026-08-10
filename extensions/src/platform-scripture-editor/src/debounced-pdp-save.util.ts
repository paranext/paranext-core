import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { areUsjContentsEqualExceptWhitespace } from 'platform-bible-utils';

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
  /**
   * The literal trigger run (`\` + typed filter, e.g. `\f`) currently sitting in the document for a
   * PASSIVE palette session, or undefined for focused sessions (their filter chars never land). A
   * palette-open flush must not write this un-settled literal to the PDP: ParatextData tokenizes an
   * unknown marker in body text as a PARAGRAPH, so the raw literal came back as a garbage paragraph
   * echo (live-observed when clicking a palette entry blurred the iframe and flushed). The literal
   * is stripped from the SAVED copy only — the document keeps it for the palette's apply to
   * consume.
   */
  paletteLiteralRun?: string;
  /** Read the editor's current USJ. Already settled — see `EditorRef.getUsj`. */
  getEditorUsj: () => Usj | undefined;
}

/**
 * Returns a copy of `usj` with the LAST occurrence of `literal` removed from its text content, or
 * the original `usj` unchanged when the literal is not present. The walk finds the last string (in
 * document order) containing the literal and removes that string's last occurrence — the position
 * nearest the caret, where a passive palette's trigger literal lives. Never mutates the input (the
 * editor still owns that object).
 */
function stripLastLiteralRun(usj: Usj, literal: string): Usj {
  const copy: Usj = JSON.parse(JSON.stringify(usj));
  let target: { holder: unknown[]; index: number } | undefined;
  const walk = (content: unknown[] | undefined): void => {
    content?.forEach((entry, index) => {
      if (typeof entry === 'string') {
        if (entry.includes(literal)) target = { holder: content, index };
        return;
      }
      if (entry && typeof entry === 'object' && 'content' in entry && Array.isArray(entry.content))
        walk(entry.content);
    });
  };
  walk(copy.content);
  if (!target) return usj;
  const text = target.holder[target.index];
  if (typeof text !== 'string') return usj;
  const at = text.lastIndexOf(literal);
  target.holder[target.index] = text.slice(0, at) + text.slice(at + literal.length);
  return copy;
}

/**
 * Strips a passive palette session's un-settled trigger literal (`\` + typed filter) from `usj`
 * when one is known, or returns `usj` untouched when there is none (no session, or a focused
 * session whose filter chars never land in the document). See
 * {@link DebouncedPdpSaveParams.paletteLiteralRun} for why the literal must never reach the PDP.
 */
function stripPaletteLiteral(usj: Usj, literalRun: string | undefined): Usj {
  return literalRun ? stripLastLiteralRun(usj, literalRun) : usj;
}

/**
 * Decides what an imperative "save the editor's USJ if it changed" should write to the PDP: returns
 * the USJ to save, or `undefined` when there is nothing new to write.
 *
 * The debounced keystroke save already strips a passive palette session's un-settled `\`+filter
 * literal before writing ({@link performDebouncedPdpSave}), but saves also fire OUTSIDE that path
 * while a session is open — `useEditorPdpSync` pushes newer editor content back up when a PDP echo
 * arrives — and those read the raw editor USJ, literal included. Writing the literal lets
 * ParatextData tokenize the unknown marker into a garbage paragraph that echoes back into the
 * document, so the literal is stripped from the SAVED copy here too (the editor keeps it for the
 * palette's apply to consume). The STRIPPED copy is also what is compared against the PDP's
 * content: when the literal is the only divergence there is nothing real to save, and the caller
 * must record the returned (stripped) USJ as what was sent so the echo comparison converges.
 */
export function resolveUsjToSaveToPdp(
  usjFromEditor: Usj,
  usjFromPdp: Usj | undefined,
  paletteLiteralRun: string | undefined,
): Usj | undefined {
  const usjToSave = stripPaletteLiteral(usjFromEditor, paletteLiteralRun);
  return areUsjContentsEqualExceptWhitespace(usjFromPdp, usjToSave) ? undefined : usjToSave;
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
 * - Otherwise (same chapter), preserve the existing behavior: with a marker-palette session open,
 *   save the SCHEDULED USJ — the raw serialization captured at the keystroke, whose un-settled
 *   trigger literal the strip below removes and the palette's apply is still going to consume; with
 *   no palette session, save what the editor shows, which `EditorRef.getUsj` already returns
 *   settled. Nothing in this path mutates the document: a pre-save settle used to, and that
 *   mutation is exactly what made a debounced save able to re-settle an explicitly-undone literal.
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
  isPaletteSessionOpen,
  paletteLiteralRun,
  getEditorUsj,
}: DebouncedPdpSaveParams): void {
  if (scheduledChapterKey !== currentChapterKey) {
    capturedSave(stripPaletteLiteral(usj, paletteLiteralRun));
    return;
  }
  if (isPaletteSessionOpen) {
    latestSave(stripPaletteLiteral(usj, paletteLiteralRun));
    return;
  }
  latestSave(getEditorUsj() ?? usj);
}
