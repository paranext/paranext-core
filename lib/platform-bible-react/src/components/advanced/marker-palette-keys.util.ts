/**
 * The EDITOR-side half of a marker-palette session: routing one forwarded key through the shared
 * table, with the four editor commit drivers wired to an editor ref.
 *
 * `marker-palette-keydown.util.ts` is the one table that decides what each key MEANS, and
 * `marker-palette-session.util.ts` is the one spine that opens a session and settles its show
 * promise. Between them sat a third thing both consumers wrote for themselves — the web view
 * (`platform-scripture-editor.web-view.tsx`) and the footnote popover
 * (`footnote-editor.component.tsx`) — and the two copies had already diverged. This is that third
 * thing, written once.
 *
 * What genuinely differs between the consumers stays caller-supplied: the overlay ops
 * (`papi.overlays` vs a host-supplied `FootnoteEditorMarkerPalette`), how each restores a caret its
 * palette blurred away, how each reopens at the caret for the `\` commit, and the gate the main
 * editor applies before routing at all (read-only, which a scheduled sync can flip with no user
 * gesture). Everything else — which commit the table asked for, restoring the caret before each
 * apply, and clearing the session only when it is still the current one — is identical in both and
 * lives here.
 */

import type { MutableRefObject, RefObject } from 'react';
import type { EditorRef, MarkerMenuItem } from '@eten-tech-foundation/platform-editor';
import type { PaletteDriver } from 'platform-bible-utils/experimental';
import {
  handleMarkerPaletteSessionKeyDown,
  type MarkerPaletteKeyEvent,
} from '@/components/advanced/marker-palette-keydown.util';
import type { MarkerPaletteOpenSession } from '@/components/advanced/marker-palette-session.util';

/** What {@link routeMarkerPaletteKey} needs from its consumer. */
export interface RouteMarkerPaletteKeyOptions<TItem extends MarkerMenuItem> {
  /** The consumer's live session ref. Cleared here when the table reports the session ended. */
  sessionRef: MutableRefObject<MarkerPaletteOpenSession<TItem> | undefined>;
  /** The editor the commits apply to — both consumers hold it as `useRef<EditorRef | null>`. */
  editorRef: RefObject<EditorRef | null>;
  /** The consumer's overlay ops — `update`, `commit`, `dismiss`. */
  palette: PaletteDriver;
  /**
   * Puts the caret back when the live selection was nulled. Called before EVERY editor-side commit:
   * the palette holds focus, so `.editor-input` is blurred while these run and Lexical's blur
   * processing can null the editor-state selection. `commitTypedMarker`/`commitTypedCloser` then
   * refuse and return false — which nothing reads — and `applyMarkerMenuSelection` lands at the
   * document end. Without it the user gets no marker, no error, and a caret somewhere else.
   */
  restoreCaret: () => void;
  /**
   * Opens a fresh palette at the current caret, for the `\` commit's second half. The consumer
   * performs it through its own open path so the reopened session gets the same ranking, search bar
   * and zero-match rules as any other.
   *
   * Returns false when it could not open one — no marker context at the new caret, or nothing
   * offered there. The old palette is normally retired by the replacement REPLACING it, so a
   * refusal leaves it mounted and holding focus over a session the table has already ended; this
   * dismisses it instead, rather than spending the user's next keystroke on the orphan.
   */
  reopenAtCaret: () => boolean;
  /**
   * Ends the session this token identifies, if it is still the current one — the consumer's writer
   * from `useMarkerPaletteSessionWriters`, not a local equivalent.
   *
   * Routing through the writer rather than clearing the ref here is what keeps the writers the ONLY
   * place settling resumes. Clearing locally still worked, because the show promise later reaches
   * the spine's own clear, but it made resume wait on an overlay round trip and left settling
   * suspended for good if that promise never settled. It also duplicated the baseline clearing.
   */
  clearSessionIfCurrent: (token: number) => void;
  /**
   * Whether the editor changed under the open palette, compared against the baseline taken as the
   * palette took focus. The same function the consumer gives the session spine.
   *
   * The spine asks it before applying a HIGHLIGHTED commit, which comes back through the overlay.
   * TYPED commits — Space on the typed marker, `*`, the `\` commit-and-reopen, and the
   * selection-wrap Space — never go near the spine; they apply straight from here, so without this
   * they are unguarded. That matters most for a consumer with no live close: if the document
   * changed while the palette was open, the next typed commit applies at a caret pointing into
   * different content, which is exactly what the guard exists to refuse.
   *
   * Omit it and no guard runs, as before.
   */
  hasEditorChangedSinceFocus?: () => boolean;
}

/**
 * Routes one key a focused palette forwarded back to its session owner.
 *
 * Returns `'no-session'` when the palette has outlived its session, which the consumer must treat
 * as "close it": the palette holds real focus and forwards EVERY key here, so ignoring them leaves
 * a box the keyboard cannot get out of — Escape included.
 */
export function routeMarkerPaletteKey<TItem extends MarkerMenuItem>(
  event: MarkerPaletteKeyEvent,
  options: RouteMarkerPaletteKeyOptions<TItem>,
): 'routed' | 'no-session' {
  const {
    sessionRef,
    editorRef,
    palette,
    restoreCaret,
    reopenAtCaret,
    clearSessionIfCurrent,
    hasEditorChangedSinceFocus,
  } = options;
  const session = sessionRef.current;
  if (!session) return 'no-session';

  /**
   * Runs an editor-side commit unless the editor moved under the open palette, in which case the
   * palette closes and nothing is applied. The caret this commit would land at is no longer the one
   * the user chose, so applying would put the marker somewhere they did not ask for; closing lets
   * them reopen where they actually want it, which is the same answer the spine gives a highlighted
   * commit.
   *
   * Asked BEFORE `restoreCaret`, for the reason the spine asks before its own restore: the restore
   * writes a selection back into the editor, so a guard consulted afterwards compares against that
   * write rather than against what the user left.
   */
  const applyUnlessEditorChanged = (apply: () => void) => {
    if (hasEditorChangedSinceFocus?.()) {
      palette.dismiss();
      return;
    }
    apply();
  };

  const outcome = handleMarkerPaletteSessionKeyDown(event, session, {
    update: (update) => palette.update(update),
    commit: () => palette.commit(),
    dismiss: () => palette.dismiss(),
    commitTyped: (typed) =>
      applyUnlessEditorChanged(() => {
        restoreCaret();
        editorRef.current?.commitTypedMarker(typed);
      }),
    commitTypedAndReopen: (typed) =>
      applyUnlessEditorChanged(() => {
        // The `\` commit: the same materialization as Space with NO terminating space, then a
        // fresh palette for the backslash just pressed. Showing a new palette replaces the current
        // overlay (the old show promise rejects ABORTED, which the spine already handles), so there
        // is no explicit dismiss to sequence against the commit.
        restoreCaret();
        editorRef.current?.commitTypedMarker(typed, { trailingSpace: false });
        if (!reopenAtCaret()) palette.dismiss();
      }),
    commitTypedCloser: (typed) =>
      applyUnlessEditorChanged(() => {
        restoreCaret();
        editorRef.current?.commitTypedCloser(typed);
      }),
    commitItem: (marker) =>
      applyUnlessEditorChanged(() => {
        const selected = session.items.find((item) => item.marker === marker);
        if (!selected) return;
        restoreCaret();
        editorRef.current?.applyMarkerMenuSelection(selected, {
          trigger: 'backslash',
          literalPrefixLanded: false,
        });
      }),
  });

  // Clear only if this session is still the current one: a `\` commit opens a REPLACEMENT session
  // synchronously inside the table call above, and an unconditional clear would kill it. The
  // writer's own token check does exactly that, and resumes settling when nothing is left.
  if (outcome === 'ended') clearSessionIfCurrent(session.token);
  return 'routed';
}
