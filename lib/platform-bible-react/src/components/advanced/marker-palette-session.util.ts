/**
 * Shared open-session orchestration for standard-view `\` marker palettes — the ONE spine behind
 * BOTH consumers' `openMarkerPalette` flows (`platform-scripture-editor.web-view.tsx` and
 * `footnote-editor.component.tsx`), the same way `marker-palette-keydown.util.ts` is the one
 * while-open forwarding table. Neither consumer may carry its own copy: the spine owns session
 * token allocation, session construction, the key-forwarding declaration, and the show promise's
 * settlement handling — the commit ordering (restore the caret, focus, apply), the dismissal
 * refocus, and the failure cleanup — so the two palettes cannot drift apart in any of those.
 *
 * What GENUINELY differs between the consumers stays caller-supplied through
 * {@link RunMarkerPaletteSessionOptions}:
 *
 * - HOW the palette is shown (`show`): the web view builds a full `papi.overlays` command-palette
 *   request; the popover drives its host-supplied `FootnoteEditorMarkerPalette`.
 * - HOW a lost caret is restored (`restoreSelectionIfLost`): each editor restores from its own
 *   focus-out capture, and only the popover has a meaningful last-resort target (the end of its
 *   single note).
 * - The `'backslash'` Space exception (`shouldSpaceCommit`), the failure logging (`onShowError`),
 *   and the editor-side `focusEditor`/`applyItem` handles.
 */

import type { PaletteKeyForwarding } from 'platform-bible-utils/experimental';
import type { MutableRefObject } from 'react';
import {
  getMarkerPaletteClaimedKeys,
  type ForwardedSessionKind,
  type MarkerPaletteKeyEvent,
  type MarkerPaletteSessionState,
} from '@/components/advanced/marker-palette-keydown.util';

/**
 * The session record {@link runMarkerPaletteSession} creates and hands to the consumer's session
 * ref — the forwarding table's {@link MarkerPaletteSessionState} plus the `token` that scopes async
 * settle-time cleanup to THIS session (see `clearPaletteSessionIfCurrent`) and the consumer's own
 * item type, so commit resolution (`items.find` by marker) returns full items.
 */
export interface MarkerPaletteOpenSession<TItem extends { marker: string }>
  extends MarkerPaletteSessionState {
  /** Only the two forwarded kinds: the Enter-split (`'enter'`) palette has its own open path. */
  kind: ForwardedSessionKind;
  /** Identifies this session to async settle-time cleanup, from the consumer's monotonic counter. */
  token: number;
  items: readonly TItem[];
}

/**
 * The per-consumer half of a marker-palette session — everything the shared spine cannot own
 * because it differs between the web view and the footnote popover, plus the consumer-owned
 * session bookkeeping the spine drives through narrow callbacks.
 */
export interface RunMarkerPaletteSessionOptions<TItem extends { marker: string }> {
  /**
   * The entries the palette offers, in display order. An item's `marker` doubles as its palette
   * item id, which is how the show promise's resolved id maps back to the committed item.
   */
  items: readonly TItem[];
  /**
   * Selects the session flavor: `true` opens the collapsed-caret `'backslash'` session (shown in
   * the overlay's non-focus-stealing display), `false` the FOCUSED selection-wrap `'selection'`
   * session.
   */
  passive: boolean;
  /**
   * See {@link MarkerPaletteSessionState.shouldSpaceCommit}. Attached to `'backslash'` sessions
   * only — Space over a selection is the wrap commit, which has no typed-literal route to except.
   */
  shouldSpaceCommit?: (filter: string) => boolean;
  /**
   * The consumer's monotonic token allocator. Caller-owned (not module state) so ALL of a
   * consumer's palette opens — including kinds outside this spine, like the web view's
   * Enter-split palette — draw from ONE sequence and stale-settlement cleanup stays totally
   * ordered across them.
   */
  sessionCounterRef: MutableRefObject<number>;
  /** Stores the freshly created session as the consumer's current one. */
  setSession(session: MarkerPaletteOpenSession<TItem>): void;
  /**
   * Clears the consumer's session only when it still holds the session identified by `token`
   * (`clearPaletteSessionIfCurrent` over the consumer's ref).
   */
  clearSessionIfCurrent(token: number): void;
  /**
   * Runs the consumer's CURRENT forwarded-key handler. The palette captures this callback ONCE,
   * when shown, while the handler it must run is rebuilt whenever the session or its dependencies
   * change — so implementations read through a ref that always points at the current one.
   */
  runSessionKey(event: MarkerPaletteKeyEvent): void;
  /**
   * Shows the palette with the spine-built key-forwarding declaration and resolves the selected
   * item's id, or `undefined` when dismissed. The consumer owns the whole request/driver shape;
   * only `keyForwarding` is supplied, because its `keys` must be exactly the set the session's
   * kind claims.
   */
  show(keyForwarding: PaletteKeyForwarding): Promise<string | undefined>;
  /**
   * Restores the editor caret when the live selection was nulled, from the consumer's focus-out
   * capture. Runs BEFORE {@link RunMarkerPaletteSessionOptions.focusEditor} on a commit — see the
   * ordering comment in {@link runMarkerPaletteSession}.
   */
  restoreSelectionIfLost(): void;
  /** Focuses the consumer's editor. */
  focusEditor(): void;
  /** Applies the committed item to the consumer's editor. */
  applyItem(item: TItem): void;
  /**
   * Called whenever the show promise rejects, INCLUDING the routine replacement rejection
   * (PlatformError code ABORTED — the `\` reopen flow replaces the open palette on every commit
   * key), so implementations log conditionally: skip ABORTED, report everything else — a palette
   * that never opened should not fail silently.
   */
  onShowError(error: unknown): void;
}

/**
 * Opens one marker-palette session and sees it through to settlement. Fire-and-forget: the show
 * promise's `.then`/`.catch` own all cleanup, so nothing is returned.
 */
export function runMarkerPaletteSession<TItem extends { marker: string }>(
  options: RunMarkerPaletteSessionOptions<TItem>,
): void {
  const {
    items,
    passive,
    shouldSpaceCommit,
    sessionCounterRef,
    setSession,
    clearSessionIfCurrent,
    runSessionKey,
    show,
    restoreSelectionIfLost,
    focusEditor,
    applyItem,
    onShowError,
  } = options;

  sessionCounterRef.current += 1;
  const token = sessionCounterRef.current;
  const kind: ForwardedSessionKind = passive ? 'backslash' : 'selection';
  const session: MarkerPaletteOpenSession<TItem> = { kind, token, filter: '', items };
  if (kind === 'backslash' && shouldSpaceCommit) session.shouldSpaceCommit = shouldSpaceCommit;
  setSession(session);

  show({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: getMarkerPaletteClaimedKeys(kind),
    onKey: (event) => runSessionKey(event),
  })
    .then((id) => {
      clearSessionIfCurrent(token);
      if (id !== undefined) {
        // Restore the caret BEFORE focusing and applying: a mouse click on the palette blurred
        // the editor (the overlay renders outside its document), and Lexical's blur processing
        // can NULL the editor-state selection. `focus()` cannot bring a nulled selection back —
        // it falls back to selecting the document END — so the apply would land there instead of
        // at the caret the user last saw. Restoring first re-establishes that caret; `focus()`
        // then re-asserts it, so a mouse commit applies exactly like a keyboard one.
        restoreSelectionIfLost();
        focusEditor();
        const selected = items.find((item) => item.marker === id);
        if (selected) applyItem(selected);
      } else if (!passive) {
        // Focused palette dismissed: focus never left the passive case, but the focused palette's
        // own search input had it, so bring it back to the editor.
        focusEditor();
      }
      return undefined;
    })
    .catch((error: unknown) => {
      // Replaced by a newer overlay request (PlatformError code ABORTED) or any other rejection —
      // treat the same as an explicit dismissal.
      clearSessionIfCurrent(token);
      if (!passive) focusEditor();
      onShowError(error);
    });
}
