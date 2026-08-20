/**
 * Shared keydown forwarding table for standard-view marker-palette sessions. This is THE single
 * source of the while-open key semantics for BOTH consumers —
 * `platform-scripture-editor.web-view.tsx` and `footnote-editor.component.tsx`. Neither may carry
 * its own copy: the capture-phase handling here (stopPropagation on session-ending keys, the
 * every-key-claiming `'selection'` session that keeps a wrap palette from losing the selected text,
 * Enter-session type-to-filter) is what stops an in-session Enter from reaching MarkerEditPlugin
 * FIRST and double-mutating the document — a `\fp` insert or plain split committing before the
 * palette apply runs.
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
 *   commit (like Enter) instead. `*` is a SECOND commit key here, for closing markers
 *   ({@link MarkerPaletteSessionDriver.commitTypedCloser}): `\` + query + `*` at the caret, no
 *   terminating space and no opening glyph. `\` is a THIRD commit key: it commits what was typed
 *   with no terminating space and then REOPENS the palette for the backslash just pressed
 *   ({@link MarkerPaletteSessionDriver.commitTypedAndReopen}), so `\qt-s\qt-e` is one flow — but
 *   only with a non-empty filter; an empty one has nothing to commit, so the backslash lands as an
 *   ordinary character and no palette reopens. Because they commit, neither `*` nor `\` is a filter
 *   character — a close-tag entry can no longer be narrowed to by typing its trailing `*`, since
 *   pressing `*` commits the end state that entry would have applied.
 * - `'enter'` — FOCUSED Enter-split menu (collapsed caret): control keys and filter characters
 *   (including Space — the menu's only commit is the highlighted item) are claimed, any other key
 *   means the user resumed editing (dismiss, let it land).
 * - `'selection'` — FOCUSED selection-wrap palette: EVERY non-chord key is claimed — nothing may land
 *   while it is open, because typing would replace the wrapped selection. Space commits the item
 *   the typed filter names EXACTLY ({@link MarkerPaletteSessionDriver.commitItem} — the wrap), or
 *   refuses visibly when the typed marker is not offered (claimed dismiss, selection intact). `*`
 *   commits here too, deleting the selection and landing the typed closer in its place (Paratext 9
 *   parity) — a different gesture from Space's wrap. `\` is NOT a commit key here: the wrap
 *   consumes the selection, leaving nothing for a second marker to attach to.
 *
 * A session that opens a HOST-rendered palette also declares the keys it claims
 * ({@link getMarkerPaletteClaimedKeys}) so the palette forwards exactly those back instead of
 * consuming them — without that, whichever document holds focus is the only one that sees a
 * keystroke, and none of the semantics above run when the palette's own input wins that race.
 *
 * Modifier-only keydowns (the Shift half of a `+` chord) pass through untouched so chords like
 * `\+w` keep filtering. Real chords (Ctrl/Cmd/Alt + key) are never ingested into the filter and
 * never claimed — the session is dismissed and the chord does its normal job (e.g. Ctrl+C copies
 * the wrapped selection instead of being swallowed while a wrap palette is open).
 */

import type { ForwardedPaletteKeyEvent, PaletteDriver } from 'platform-bible-utils/experimental';
import type { MutableRefObject } from 'react';
import { filterAndRankPaletteItems } from '@/components/advanced/marker-palette-filter.util';

/**
 * What this table needs of a keydown. A DOM `KeyboardEvent` satisfies it, and so does a
 * `ForwardedPaletteKeyEvent` (from `platform-bible-utils/experimental`, outside this package's docs
 * entry, so a code reference rather than a link) handed back by a focused palette — so ONE handler
 * serves a session's own capture-phase listener and the keys its palette forwards, and the two can
 * never diverge in semantics.
 */
export type MarkerPaletteKeyEvent = ForwardedPaletteKeyEvent;

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
   * Commit the marker the user literally TYPED with the palette's `\` semantics — the same
   * materialization {@link MarkerPaletteSessionDriver.commitTyped} performs but WITHOUT the
   * terminating space (`EditorRef.commitTypedMarker` with `trailingSpace: false`) — and then open a
   * NEW palette session at the resulting caret, for the backslash the user just pressed. The
   * session owner performs both halves, so the reopened session goes through its normal open path
   * and gets the same ranking, search bar and zero-match rules as any other. Only invoked for a
   * `'backslash'` session's `\` with a NON-EMPTY filter; an empty one has nothing to commit and the
   * backslash is left to land as an ordinary character.
   */
  commitTypedAndReopen(typed: string): void;
  /**
   * Commit the marker the user literally TYPED as a CLOSING marker — the palette's `*` commit,
   * applied through the editor (`EditorRef.commitTypedCloser`). `\` + `typed` + `*` lands at the
   * caret with no terminating space and no opening glyph, and the marker-edit engine resolves it:
   * against a matching open span it becomes that span's real closer, otherwise it settles as an
   * unmatched closer, flagged as typed. Only invoked for a `'backslash'` session's `*`.
   */
  commitTypedCloser(typed: string): void;
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
export function isImeCompositionKeyEvent(event: MarkerPaletteKeyEvent): boolean {
  return event.isComposing || event.keyCode === 229;
}

const FILTER_CHAR_REGEX: Record<MarkerPaletteSessionKind, RegExp> = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  // Focused Enter-split menu: paragraph markers only (digits for q1/s2 etc.).
  enter: /^[a-z0-9]$/i,
  selection: /^[a-z0-9+-]$/i,
};

/** Control keys the table has a branch for, in every session kind. */
const CONTROL_KEYS: readonly string[] = [
  ' ',
  'Enter',
  'Escape',
  'Tab',
  'Backspace',
  'ArrowUp',
  'ArrowDown',
  '*',
  '\\',
];

/** Every character `FILTER_CHAR_REGEX` can accept, in both cases. */
const FILTER_CHAR_ALPHABET: readonly string[] = [
  ...'abcdefghijklmnopqrstuvwxyz',
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ...'0123456789',
  '+',
  '-',
];

/**
 * Every `KeyboardEvent.key` this table acts on for `kind` — the list a session hands to its palette
 * as the `keys` of its `PaletteKeyForwarding` declaration so the palette forwards exactly these
 * back instead of consuming them.
 *
 * Why a session must claim the FILTER characters too, not just its commit keys: the session's
 * filter is the only record of what the user typed, and every commit resolves from it
 * ({@link MarkerPaletteSessionDriver.commitTyped}, `commitItem`'s exact match, `commitTypedCloser`).
 * If typed characters went into the palette's own input while only the commit keys were forwarded,
 * the session would commit an EMPTY query while the screen showed a full one. Forwarding the whole
 * set makes the session the single owner of the query in both focus states — which is exactly what
 * the passive palette already is.
 *
 * Derived from the table rather than hand-listed, so the two cannot drift. Pure modifiers are
 * excluded: the table only passes them through, and claiming them would break `+` chords.
 */
export function getMarkerPaletteClaimedKeys(kind: MarkerPaletteSessionKind): string[] {
  return [
    ...CONTROL_KEYS,
    ...FILTER_CHAR_ALPHABET.filter((char) => FILTER_CHAR_REGEX[kind].test(char)),
  ];
}

function claim(event: MarkerPaletteKeyEvent): void {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Routes one keydown through an open marker-palette session. See the module doc for the per-kind
 * semantics. Call from a CAPTURE-phase listener; on `'ended'` clear the session ref.
 */
export function handleMarkerPaletteSessionKeyDown(
  event: MarkerPaletteKeyEvent,
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

  if (event.key === '*' && session.kind !== 'enter') {
    // The palette's CLOSING-marker commit, the counterpart to Space's opening one: commit
    // `\` + filter + `*`, with no terminating space and no opening glyph, and close.
    // Claimed: nothing may land on top of the commit.
    //
    // Commits in EVERY selection shape (Paratext 9 parity). At a collapsed caret the closer lands
    // at the caret; over a NON-COLLAPSED selection the selected content is DELETED and the closer
    // lands in its place, which is what typing `\nd*` with text selected has always done. That is a
    // different gesture from Space's selection WRAP, so the two keys are not interchangeable there.
    //
    // No `shouldSpaceCommit` exception here, unlike Space. That exception exists because a
    // materialized `\f ` OPENING literal absorbs the text after the caret as the note's caller; a
    // closing marker materializes no note and absorbs nothing, so every marker takes this route.
    // Zero matches take it too — what the user typed is what commits, and an unmatched closer
    // lands literally for the engine to flag rather than silently doing nothing.
    claim(event);
    driver.commitTypedCloser(session.filter);
    driver.dismiss();
    return 'ended';
  }

  if (event.key === '\\' && session.kind === 'backslash') {
    // The palette's THIRD commit key: `\` commits what was typed exactly as Space does but with NO
    // terminating space byte, then opens a FRESH palette for the backslash just pressed — so
    // `\qt-s\qt-e` is one continuous flow instead of losing the first marker. The separator is
    // unnecessary: a marker-name scan terminates at `\`, and the reopened session's own commit
    // supplies it.
    if (session.filter === '') {
      // Nothing typed, so there is nothing to commit and `\` is just a character: it must LAND
      // (not claimed) and no replacement palette opens.
      driver.dismiss();
      return 'ended';
    }
    claim(event);
    driver.commitTypedAndReopen(session.filter);
    return 'ended';
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
