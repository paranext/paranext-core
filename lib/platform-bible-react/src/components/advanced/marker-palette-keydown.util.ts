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
 * Session kinds (ALL ACTIVE — typed characters filter the palette and never land in the document,
 * identical to the editor package's own palettes; the trigger `\` is claimed by the session owner
 * before opening, so nothing of the palette's is ever in the document):
 *
 * - `'backslash'` — collapsed-caret `\` palette: filter characters are claimed and routed to the
 *   query; Space commits the marker the user literally TYPED
 *   ({@link MarkerPaletteSessionDriver.commitTyped} — the session owner materializes the literal
 *   through the editor and the engine resolves it), except where
 *   {@link MarkerPaletteSessionState.shouldSpaceCommit} routes note markers through the overlay
 *   commit (like Enter) instead.
 * - `'enter'` — FOCUSED Enter-split menu (collapsed caret): control keys and filter characters
 *   (including Space — the menu's only commit is the highlighted item) are claimed, any other key
 *   means the user resumed editing (dismiss, let it land).
 * - `'selection'` — FOCUSED selection-wrap palette: EVERY non-chord key is claimed — nothing may land
 *   while it is open, because typing would replace the wrapped selection. Space commits the item
 *   the typed filter names EXACTLY ({@link MarkerPaletteSessionDriver.commitItem} — the wrap), or
 *   refuses visibly when the typed marker is not offered (claimed dismiss, selection intact).
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
   * the palette selection through the overlay (claimed, like Enter) instead of committing the typed
   * literal. Consumers use this for markers where the materialized `\marker ` literal would
   * misbehave — e.g. `\f ` in Standard view: mid-text the Tier-2 tokenizer absorbs the following
   * word into the new footnote as its caller, whereas committing the palette item inserts an empty
   * footnote exactly like `\f` + Enter.
   */
  shouldSpaceCommit?: (filter: string) => boolean;
}

/**
 * The palette operations the forwarding table drives. `update`/`commit`/`dismiss` are the shared
 * `PaletteDriver` overlay contract from `platform-bible-utils/experimental`; the two commit ops
 * below are EDITOR-side applies the session owner implements against its own editor ref (the
 * overlay knows nothing of them — the table calls `dismiss()` right after each, so implementations
 * only perform the apply).
 */
export interface MarkerPaletteSessionDriver extends PaletteDriver {
  /**
   * Commit the marker the user literally TYPED (the session filter), with the palette's Space
   * semantics: materialize the literal through the editor (`EditorRef.commitTypedMarker`) and let
   * the marker-edit engine resolve it — open span `closed="false"` for an inline marker, unknown
   * settles as typed. Only invoked for a `'backslash'` session's Space.
   */
  commitTyped(typed: string): void;
  /**
   * Commit ONE SPECIFIC offered item, named by its bare marker code — the selection-wrap Space
   * commit, where the marker is whatever was literally typed (an exact match against the offered
   * entries), not whatever is highlighted. The session owner applies it through the editor
   * (`EditorRef.applyMarkerMenuSelection`, `trigger: "backslash"`). Only invoked for a
   * `'selection'` session's Space.
   */
  commitItem(marker: string): void;
}

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
  // case-insensitive) are valid wherever markers are filtered. `*` filters close-tag endmarkers
  // like `nd*` in the marker palettes (under the active palette nothing lands, so the passive
  // `*`-closes-the-span route is gone; Space then commits the typed `nd*` literal).
  backslash: /^[a-z0-9+*-]$/i,
  // Focused Enter-split menu: paragraph markers only (digits for q1/s2 etc.).
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

  if (event.key === ' ') {
    if (session.kind === 'backslash') {
      // The active palette's Space commit ("commit what was typed"). Claimed: nothing may land.
      claim(event);
      if (session.shouldSpaceCommit?.(session.filter)) {
        // Note markers commit like Enter through the overlay (exact-first resolution) — see
        // MarkerPaletteSessionState.shouldSpaceCommit for why the typed-literal route misbehaves.
        driver.commit();
        return 'ended';
      }
      driver.commitTyped(session.filter);
      driver.dismiss();
      return 'ended';
    }
    if (session.kind === 'selection') {
      // Wrap commit: the marker is whatever was literally TYPED — an exact match against the
      // offered entries. A marker not offered (unknown, or not valid here) has nothing to
      // commit: the palette closes and the selection stays intact rather than wrapped in a
      // guess (visible refusal). Claimed either way — nothing may replace the selection.
      claim(event);
      const match = session.items.find((item) => item.marker === session.filter);
      if (match) driver.commitItem(match.marker);
      driver.dismiss();
      return 'ended';
    }
    // 'enter': Space keeps filtering, matching the editor package's Enter-triggered menu (its
    // only commit is the highlighted item). Falls through to the filter branch below via the
    // explicit append — ' ' is not in FILTER_CHAR_REGEX.
    claim(event);
    session.filter += ' ';
    driver.update({ filterText: session.filter });
    return 'continue';
  }

  if (event.key === 'Backspace' && session.filter === '') {
    // Editor-palette parity: with nothing typed there is nothing to widen — Backspace closes the
    // menu. Claimed: nothing of the palette's ever landed, so an unclaimed Backspace would eat a
    // real document character.
    claim(event);
    driver.dismiss();
    return 'ended';
  }

  if (event.key === 'Backspace' || FILTER_CHAR_REGEX[session.kind].test(event.key)) {
    // ACTIVE palettes: the character narrows the query (or Backspace widens it) and must never
    // land in the document.
    claim(event);
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
