/**
 * Shared keydown forwarding table for standard-view marker-palette sessions. This is THE single
 * source of the while-open key semantics — previously duplicated between
 * `platform-scripture-editor.web-view.tsx` and `footnote-editor.component.tsx`, and the copies
 * drifted: the capture-phase key handling (stopPropagation on session-ending keys, the
 * every-key-claiming 'selection' session that fixed the wrap-palette text loss, Enter-session
 * type-to-filter) landed only in the web view, so the popover's in-session Enter still reached
 * MarkerEditPlugin FIRST (double mutation: `\fp` insert/plain split committed before the palette
 * apply ran).
 *
 * Consumers register a `keydown` listener in CAPTURE phase and call
 * {@link handleMarkerPaletteSessionKeyDown} while a session is open; on an `'ended'` outcome they
 * clear their session ref. Claimed keys are `preventDefault`ed AND `stopPropagation`ed so, in
 * capture, Lexical's own root-element listener never sees them.
 *
 * Session kinds:
 *
 * - `'backslash'` — PASSIVE palette after a collapsed-caret `\`: the literal keeps landing in the
 *   document, so filter characters are only MIRRORED (never claimed); Space/`*` land and end the
 *   session (the engine's own Tier-2 completion takes over).
 * - `'enter'` — FOCUSED Enter-split menu (collapsed caret): control keys and filter characters are
 *   claimed (a typed char must narrow the palette, not land), any other key means the user resumed
 *   editing (dismiss, let it land).
 * - `'selection'` — FOCUSED selection-wrap palette: EVERY non-chord key is claimed — nothing may land
 *   while it is open, because typing would replace the wrapped selection.
 *
 * Modifier-only keydowns (the Shift half of a `+` chord) pass through untouched so chords like
 * `\+w` keep filtering. Real chords (Ctrl/Cmd/Alt + key) are never ingested into the filter and
 * never claimed — the session is dismissed and the chord does its normal job (e.g. Ctrl+C copies
 * the wrapped selection; previously the selection session claimed it and copy was dead while a wrap
 * palette was open).
 */

import type { PaletteDriver } from 'platform-bible-utils/experimental';
import type { MutableRefObject } from 'react';
import { filterAndRankPaletteItems } from '@/components/advanced/marker-palette-filter.util';

export type MarkerPaletteSessionKind = 'backslash' | 'enter' | 'selection';

/** The mutable per-session state the forwarding table reads and updates. */
export interface MarkerPaletteSessionState {
  kind: MarkerPaletteSessionKind;
  /**
   * Display-only mirror of what the user has typed since the session opened. Appliers read the real
   * literal run from the document at apply time, so drift here can never corrupt an insert.
   */
  filter: string;
  /**
   * The entries the palette offers (marker = the bare code, which is also the palette item's
   * label). The table needs them to detect a ZERO-MATCH filter on Enter — P9 parity: Enter over
   * zero matches does nothing and the session stays open, so the table must count matches with the
   * same per-mode semantics the overlay service filters with ({@link filterAndRankPaletteItems}).
   * Both session owners already carry their offered items; this exposes them to the table.
   */
  items: readonly { marker: string }[];
  /**
   * When set on a `'backslash'` session and it returns true for the current filter, Space COMMITS
   * the palette selection (claimed, like Enter) instead of landing as a literal and dismissing.
   * Consumers use this for markers where the literal `\marker ` completion route would misbehave —
   * e.g. typing `\f ` in Standard view: the Tier-2 tokenizer would absorb the rest of the paragraph
   * into the new footnote as its caller/content, whereas committing the palette inserts an empty
   * footnote exactly like `\f` + Enter.
   */
  shouldSpaceCommit?: (filter: string) => boolean;
}

/**
 * The palette operations the forwarding table drives (overlay service or host-supplied) — the
 * shared `PaletteDriver` contract from `platform-bible-utils/experimental`.
 */
export type MarkerPaletteSessionDriver = PaletteDriver;

/**
 * - `'passed'` — modifier-only or IME-composition keydown; nothing happened, the session stays open.
 * - `'continue'` — the key drove the palette (filter/arrows); the session stays open.
 * - `'ended'` — the session is over (commit/dismiss); the caller must clear its session ref.
 */
export type MarkerPaletteKeyOutcome = 'passed' | 'continue' | 'ended';

/**
 * True for a keydown fired while an IME (input method editor) composition is underway. Such a key
 * feeds or confirms a CJK/complex-script candidate and must reach the editor's own
 * composition-guarded handlers untouched — never open, drive, or dismiss a marker palette. `keyCode
 * === 229` is the DOM's legacy "handled by IME" signal, needed because some engines fire the first
 * composition keydown BEFORE `isComposing` flips true.
 *
 * The marker-palette hosts register their keydown listeners in CAPTURE phase, AHEAD of the editor's
 * own `isComposing()` guard, so each entry point needs this check itself: the forwarding table
 * below applies it to every in-session key, and hosts apply it to their palette-open triggers (e.g.
 * the `\`/Enter guards in `footnote-editor.component.tsx` and
 * `platform-scripture-editor.web-view.tsx`).
 */
export function isImeCompositionKeyEvent(event: KeyboardEvent): boolean {
  return event.isComposing || event.keyCode === 229;
}

const FILTER_CHAR_REGEX: Record<MarkerPaletteSessionKind, RegExp> = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is deliberately kept OUT of
  // `backslash`: in the passive palette `*` is a close/commit trigger handled earlier at keydown
  // time (the Space/`*` branch in `handleMarkerPaletteSessionKeyDown`), not a filter character —
  // whereas a focused `selection` palette filters close-tag endmarkers like `nd*`, so it keeps `*`.
  backslash: /^[a-z0-9+-]$/i,
  // Focused menus: claimed filter characters (digits for q1/s2 etc.).
  enter: /^[a-z0-9]$/i,
  selection: /^[a-z0-9+*-]$/i,
};

function claim(event: KeyboardEvent): void {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Routes one keydown through an open marker-palette session. See the module doc for the per-kind
 * semantics. Call from a CAPTURE-phase listener; on `'ended'` clear the session ref.
 */
export function handleMarkerPaletteSessionKeyDown(
  event: KeyboardEvent,
  session: MarkerPaletteSessionState,
  driver: MarkerPaletteSessionDriver,
): MarkerPaletteKeyOutcome {
  if (isImeCompositionKeyEvent(event)) {
    // A composition key is not palette input — claiming an Enter that confirms a CJK candidate
    // (or ingesting composition keystrokes into the filter) would corrupt the composition. Leave
    // the session open and let the key reach the editor's composition handling.
    return 'passed';
  }

  if (
    event.key === 'Shift' ||
    event.key === 'Control' ||
    event.key === 'Alt' ||
    event.key === 'Meta'
  ) {
    // Pure modifier keydowns aren't input — e.g. the Shift half of a `+` chord fires its own
    // keydown before the `+` arrives. Dismissing here would kill the session mid-chord and break
    // `\+w` nested-marker filtering.
    return 'passed';
  }

  if (event.ctrlKey || event.metaKey || event.altKey) {
    // A real chord (Ctrl+C, Cmd+V, …): never ingest it into the filter and never claim it — let
    // it do its normal job. The palette is no longer relevant to what happens next.
    driver.dismiss();
    return 'ended';
  }

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    claim(event); // in capture, keep Lexical from moving the document caret
    driver.update({ moveSelection: event.key === 'ArrowDown' ? 1 : -1 });
    return 'continue';
  }

  if (event.key === 'Enter') {
    // In capture, the claim keeps Lexical's KEY_ENTER (paragraph split / note `\fp`) from running
    // BEFORE the palette commit applies — the popover double-mutation bug. Claimed even for the
    // zero-match no-op below: an unclaimed Enter would split the paragraph under the open palette.
    claim(event);
    const matches = filterAndRankPaletteItems(
      session.items.map((item) => ({ label: item.marker })),
      session.filter,
      session.kind === 'backslash' ? 'passive' : 'active',
    );
    if (matches.length === 0) {
      // P9 parity: Enter over a zero-match filter does NOTHING and the palette stays open — the
      // user can Backspace the filter wider, Space-commit the typed marker, or Escape out. The
      // overlay service independently drops a zero-match commit (palette left open), so ending
      // the session here would orphan the still-mounted overlay over a dead session.
      return 'continue';
    }
    driver.commit();
    return 'ended';
  }

  if (event.key === 'Escape') {
    claim(event); // keep Lexical (and anything else) from acting on Escape
    driver.dismiss();
    return 'ended';
  }

  if (session.kind === 'backslash' && (event.key === ' ' || event.key === '*')) {
    if (event.key === ' ' && session.shouldSpaceCommit?.(session.filter)) {
      // Space commits like Enter for markers where the literal completion route would misbehave
      // (see MarkerPaletteSessionState.shouldSpaceCommit). Claimed so no literal space lands.
      claim(event);
      driver.commit();
      return 'ended';
    }
    // PT9 Space-commit / `*`-close: the key lands as literal text and is picked up by the
    // engine's own Tier-2 marker-completion trigger, so the palette is no longer relevant.
    driver.dismiss();
    return 'ended';
  }

  if (session.kind === 'backslash' && event.key === 'Backspace' && session.filter === '') {
    // Passive palette with an empty filter: the only thing behind the palette is the trigger `\`,
    // which this (unclaimed) Backspace is about to delete from the document. End the session so the
    // overlay isn't left orphaned behind a deleted `\`.
    driver.dismiss();
    return 'ended';
  }

  if (event.key === 'Backspace' || FILTER_CHAR_REGEX[session.kind].test(event.key)) {
    // Focused sessions claim the character (it must not land in the document); the passive
    // backslash session lets it land and only mirrors it.
    if (session.kind !== 'backslash') claim(event);
    session.filter =
      event.key === 'Backspace' ? session.filter.slice(0, -1) : session.filter + event.key;
    driver.update({ filterText: session.filter });
    return 'continue';
  }

  // Any other key: what's about to land no longer matches what the palette is offering. The
  // selection session still claims it (nothing may replace the wrapped selection); the others let
  // it land.
  if (session.kind === 'selection') claim(event);
  driver.dismiss();
  return 'ended';
}

/**
 * Clears a palette-session ref only when it still holds the session identified by `token`.
 *
 * The keydown flow ends sessions synchronously (Escape/Space/`*`/any-other-key clear the ref before
 * dismissing), but the show-promise's `.then`/`.catch` also clear it asynchronously. If the user
 * dismisses session A and immediately re-triggers session B, A's promise settles AFTER B was
 * created — an unconditional clear there would kill the live session B. Tokens are a monotonic
 * counter, so a stale session's async cleanup can never touch a newer session.
 *
 * Shared by the standard-view marker-palette consumers (`platform-scripture-editor.web-view.tsx`
 * and `footnote-editor.component.tsx`), which each own a session ref shaped like `{ token: number;
 * ... }`.
 */
export function clearPaletteSessionIfCurrent<TSession extends { token: number }>(
  sessionRef: MutableRefObject<TSession | undefined>,
  token: number,
): void {
  if (sessionRef.current?.token === token) sessionRef.current = undefined;
}
