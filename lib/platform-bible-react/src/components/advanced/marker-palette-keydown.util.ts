/**
 * Shared keydown table for standard-view marker-palette sessions. This is THE single source of the
 * while-open key semantics for BOTH consumers — `platform-scripture-editor.web-view.tsx` and
 * `footnote-editor.component.tsx`. Neither may carry its own copy: the capture-phase handling here
 * (stopPropagation on session-ending keys, claiming every key that could mutate the document) is
 * what stops an in-session Enter from reaching MarkerEditPlugin FIRST and double-mutating the
 * document — a `\fp` insert or plain split committing before the palette apply runs.
 *
 * Consumers register a `keydown` listener in CAPTURE phase and call
 * {@link handleMarkerPaletteSessionKeyDown} while a session is open; on an `'ended'` outcome they
 * clear their session ref. Claimed keys are `preventDefault`ed AND `stopPropagation`ed so, in
 * capture, Lexical's own root-element listener never sees them.
 *
 * ## One table, every kind
 *
 * All three session kinds obey the SAME rules, because two palettes that look alike must not behave
 * differently — a user should not have to know which one is open to predict what a key does.
 * Paratext 9 works this way too (`MarkerDropdownControl.cs` KeyDown/KeyPress), and the rules below
 * are its rules:
 *
 * - **Letters, digits, `+`, `-`** add to the filter.
 * - **Backspace** removes the last filter character; with an empty filter it CLOSES the palette.
 * - **Space** with an empty filter closes and inserts nothing; otherwise it commits what was TYPED
 *   ({@link MarkerPaletteSessionDriver.commitTyped}), even if that text is not highlighted or not in
 *   the list — except that a typed NOTE marker commits like Enter
 *   ({@link MarkerPaletteSessionState.shouldSpaceCommit}), and a `'selection'` session wraps the
 *   selected text in the item its filter names exactly, refusing visibly when no item matches.
 * - **`*`** commits the typed text as a CLOSING marker
 *   ({@link MarkerPaletteSessionDriver.commitTypedCloser}); a `'selection'` session with an empty
 *   filter refuses instead, leaving the selection intact.
 * - **`\`** with a non-empty filter commits what was typed and reopens a fresh palette
 *   ({@link MarkerPaletteSessionDriver.commitTypedAndReopen}), so `\qt-s\qt-e` is one flow; with an
 *   empty filter it is ignored. Not a commit key in a `'selection'` session: the wrap consumes the
 *   selection, leaving nothing for a second marker to attach to.
 * - **Enter and Tab**, unmodified or with Shift, commit the highlighted item; with zero matches
 *   nothing happens and the palette stays open.
 * - **Ctrl/Cmd/Alt chords** (never AltGr) CLOSE the palette and do their normal job. Chord+Enter is
 *   still claimed on the way out: cmdk acts on any un-prevented Enter regardless of modifiers, so
 *   an unclaimed one would click the highlighted item while the dismissal is in flight.
 * - **Escape** closes. **Up/Down** move the highlight.
 * - **Everything else** — punctuation, accented Latin, every non-Latin script, `Dead`, Delete and the
 *   navigation keys — is IGNORED: claimed, so nothing reaches the text, and the palette stays open.
 *   Modifier and lock keydowns pass through untouched, since the Shift half of a `+` chord and
 *   CapsLock are how a marker gets typed in the first place.
 *
 * The kinds therefore differ only in which markers they list and in how a HIGHLIGHTED item is
 * applied — `'enter'` splits the paragraph with it, `'backslash'` and `'selection'` retag or wrap —
 * plus the two `'selection'` refusals noted above.
 *
 * ## Why nothing lands in the document
 *
 * A palette holds real keyboard focus, on its LIST rather than a text box (the overlay's
 * `focusTarget: 'list'`), and forwards every key it receives back here. Focusing something that
 * cannot be edited is what keeps composed input out: an IME or a dead key starts composing in any
 * focused input no matter what a handler cancels, and once a composition is under way per-key rules
 * no longer apply to it. With the list focused no composition starts, so a dead key arrives as an
 * ordinary keydown and the ignore rule above covers it.
 *
 * In the short window between the trigger keystroke and the palette taking focus the editor still
 * has focus, and the consumer's capture-phase listener routes keys here instead — the same table,
 * so the semantics do not change with who holds focus. A composition that begins in that window
 * cannot be forwarded; the consumer closes the palette and lets the composed text land as ordinary
 * typing.
 *
 * Matching strips the `+` nesting prefix from BOTH the filter and item labels
 * (`stripMarkerNestingPrefix`), so chords like `\+w` filter to the same items as `\w` — including
 * nested close-tag entries, whose labels carry the prefix (`+wj*`).
 */

import { MODIFIER_KEYS } from 'platform-bible-utils';
import { isMacOs } from '@/utils/platform.util';
import type { ForwardedPaletteKeyEvent, PaletteDriver } from 'platform-bible-utils/experimental';
import type { MutableRefObject } from 'react';
import {
  filterAndRankPaletteItems,
  stripMarkerNestingPrefix,
} from '@/components/advanced/marker-palette-filter.util';

/**
 * What this table needs of a keydown. A DOM `KeyboardEvent` satisfies it, and so does a
 * `ForwardedPaletteKeyEvent` (from `platform-bible-utils/experimental`, outside this package's docs
 * entry, so a code reference rather than a link) handed back by a focused palette — so ONE handler
 * serves a session's own capture-phase listener and the keys its palette forwards, and the two can
 * never diverge in semantics.
 */
export type MarkerPaletteKeyEvent = ForwardedPaletteKeyEvent;

/**
 * Which gesture opened a marker-palette session. This is what decides the session's key semantics —
 * chiefly which keys commit and what committing does. In every kind, typed characters filter the
 * palette rather than landing in the document.
 *
 * - `'backslash'` — the collapsed-caret `\` palette, for inserting a marker at the caret. Space
 *   commits the marker the user literally typed, `*` commits it as a CLOSING marker, and `\`
 *   commits and immediately reopens the palette so `\qt-s\qt-e` is one flow.
 * - `'enter'` — the Enter-split menu at a collapsed caret, for choosing the marker of the paragraph
 *   the split creates. Its only commit is the highlighted item (Enter or Tab). Forwarded, so the
 *   table owns its filter characters, Backspace and arrows; nothing it accepts may reach the
 *   document.
 * - `'selection'` — the selection-wrap palette, opened with text selected. EVERY non-chord key is
 *   claimed, because anything that landed would replace the wrapped selection. Space wraps the
 *   selection in the marker the filter names exactly (ignoring case and the `+` nesting prefix);
 *   `*` instead replaces the selection with the typed closing marker (Paratext 9 parity).
 *
 * The full per-kind key table is documented at the top of this module.
 */
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
   *
   * Implementations must compare the filter with the shared marker normalization (case-fold, `+`
   * nesting prefix stripped — `stripMarkerNestingPrefix`), the same way the visible list matches: a
   * raw compare lets `\F` + Space slip past the exception and materialize the very literal the
   * exception exists to avoid.
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
   * Commit ONE SPECIFIC offered item, named by the item's OWN marker code — the selection-wrap
   * Space commit, where the marker is whatever was literally typed (an exact match against the
   * offered entries, ignoring case and the `+` nesting prefix on both sides), not whatever is
   * highlighted. The session owner applies it through the editor
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

/**
 * USFM marker characters that filter the palette — the SAME set for every session kind, because
 * every palette lists markers and a marker name is spelled the same way wherever it is typed.
 * Hyphens (milestones `ts-s`/`ts-e`, `qt-s`, `zpa-xb`) and letter case (custom markers may be
 * capitalized; marker search is case-insensitive) are valid everywhere. `*` is NOT here: it is the
 * CLOSING-marker commit key (see its branch below), so it can never reach the filter.
 */
const FILTER_CHAR_REGEX = /^[a-z0-9+-]$/i;

/**
 * The filter character a keydown contributes, or `undefined` when the key is not palette input.
 *
 * USFM marker names are always basic Latin; the translator's keyboard may not be. So the rule is:
 * take the character the layout actually produced whenever it can name a marker, and fall back to
 * the PHYSICAL key only when it cannot. On a Cyrillic or Greek layout the `q` key produces `й` or
 * `;`, which matches no marker, and the fallback turns it back into `q` — Paratext 9 does the same
 * (`MarkerDropdownControl.cs` KeyDown reads `e.KeyCode`).
 *
 * Why the character has to win, rather than reading `keyCode` first:
 *
 * - `keyCode` does not mean the same thing on every platform. Chromium derives it from the native
 *   virtual key, which Windows assigns per layout but macOS and Linux map through a US-layout
 *   table. Reading it first made a French AZERTY `a` filter `a` on Windows and `q` on macOS, so the
 *   same keyboard behaved differently per OS and a French or German translator on a Mac could not
 *   type a marker at all.
 * - Several layouts put marker characters on keys whose `keyCode` says otherwise. AZERTY keeps
 *   VK_0–VK_9 on the number row while producing `&é"'(-è_çà` unshifted, so the `-` key reports
 *   `keyCode` 54 — reading that first turned every milestone marker (`qt-s`, `ts-s`, `zpa-xb`) into
 *   `qt6`. Czech QWERTZ puts `+` unshifted on Digit1, which became `1`, making the `\+w` nesting
 *   prefix untypeable.
 *
 * The fallback covers letters only. Digits need none: every layout that reaches a digit produces
 * the digit character, including the numpad and AZERTY's shifted number row. It also covers packet
 * -key input (Keyman, `keyCode` 231) for free — such a key carries its character and no usable
 * `keyCode`, so it never reaches the fallback.
 */
export function resolveFilterCharacter(event: MarkerPaletteKeyEvent): string | undefined {
  const { key, keyCode } = event;

  // What the user actually typed, when it can name a marker. Case comes along with it, which is
  // what custom markers need: `event.key` already folds Shift and CapsLock together, including
  // their cancelling each other out.
  if (FILTER_CHAR_REGEX.test(key)) return key;

  // The physical letter key, for a layout whose character cannot name a marker.
  if (keyCode >= 65 && keyCode <= 90) {
    const letter = String.fromCharCode(keyCode);
    const upperKey = key.toUpperCase();
    const lowerKey = key.toLowerCase();
    // Prefer the layout's own character case (`Й` vs `й`) — it reflects whatever combination of
    // Shift and CapsLock produced it. Only a caseless script leaves nothing to read.
    const isUpper =
      upperKey !== lowerKey
        ? key === upperKey
        : event.shiftKey !== (event.getModifierState?.('CapsLock') ?? false);
    return isUpper ? letter : letter.toLowerCase();
  }

  return undefined;
}

/**
 * Control keys the table has a branch for, in every session kind. HAND-KEPT in step with
 * {@link handleMarkerPaletteSessionKeyDown} below: adding a branch below requires adding its key
 * here, or a focused palette consumes the key itself instead of forwarding it back to the session.
 * The reverse direction — a stale entry left behind after its branch is removed — is pinned by the
 * claimed-keys sweep in this module's test suite.
 */
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
 * The list's control-key half ({@link CONTROL_KEYS}) is kept in step with the handler's branches BY
 * HAND — see that constant's comment for the convention when adding or removing a branch; only the
 * filter-character half is derived (from `FILTER_CHAR_REGEX`). The test suite's claimed-keys sweep
 * pins the reverse direction, failing on a listed key the handler no longer acts on. Pure modifiers
 * are excluded: the table only passes them through, and claiming them would break `+` chords.
 *
 * Every kind currently claims the SAME set — the per-kind parameter is deliberate room for the key
 * sets to diverge later, not a difference today.
 */
export function getMarkerPaletteClaimedKeys(): string[] {
  return [...CONTROL_KEYS, ...FILTER_CHAR_ALPHABET.filter((char) => FILTER_CHAR_REGEX.test(char))];
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
  const { kind } = session;

  if (isImeCompositionKeyEvent(event)) {
    // A composition key is not palette input — claiming an Enter that confirms a CJK candidate
    // (or ingesting composition keystrokes into the filter) would corrupt the composition. Leave
    // the session open and let the key reach the editor's composition handling.
    return 'passed';
  }

  if (MODIFIER_KEYS.has(event.key)) {
    // Modifier and lock keydowns aren't input — e.g. the Shift half of a `+` chord fires its own
    // keydown before the `+` arrives, and CapsLock is how an uppercase CUSTOM marker gets typed.
    // The shared MODIFIER_KEYS set (platform-bible-utils) covers the lock keys. `Dead` is NOT
    // handled here: with focus on the palette's list no composition starts, so a dead key arrives
    // as an ordinary keydown and falls through to the ignore rule at the bottom like any other
    // character that cannot name a marker.
    return 'passed';
  }

  // Which modifiers make a CHORD is a platform question, not a fixed list. Ctrl and Cmd are
  // command modifiers everywhere. Alt is not: on macOS, Option is how characters are COMPOSED —
  // `Option+e` begins `é`, `Option+n` begins `ñ`, `Option+a` types `å` outright — so it holds the
  // role AltGr holds on Windows and Linux, which the AltGraph exclusion below already covers.
  // Reading Option as a chord dismissed the palette the instant a Mac user reached for an accent:
  // the dead key arrives with `altKey` set, so it never got as far as the rule that ignores keys
  // which cannot name a marker. Ctrl+Option and Cmd+Option are still chords — their command
  // modifier is what decides.
  const isAltAChordModifier = !isMacOs();
  if (
    (event.ctrlKey || event.metaKey || (event.altKey && isAltAChordModifier)) &&
    !event.getModifierState?.('AltGraph')
  ) {
    // A real chord (Ctrl+C, Cmd+V, …): never ingest it into the filter, and normally never claim
    // it — let it do its normal job. The palette is no longer relevant to what happens next. AltGr
    // is the exception: on Windows/Linux a character typed WITH AltGr held reports `ctrlKey &&
    // altKey` both set, so without the explicit exclusion ordinary typing on several European
    // layouts dismissed the session.
    //
    // Chord+Enter alone IS claimed: on a focused palette the chord arrives through key forwarding,
    // the palette's own handler does not preventDefault a forwarded key, and cmdk acts on any
    // un-prevented Enter regardless of modifiers — synchronously clicking the highlighted item
    // while this dismissal is in flight, committing a marker the user never chose. Claiming only
    // Enter keeps ordinary chords (copy/paste) doing their job; cmdk's other keys (arrows) merely
    // move the highlight of a palette that is already closing.
    if (event.key === 'Enter') claim(event);
    driver.dismiss();
    return 'ended';
  }

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    claim(event); // in capture, keep Lexical from moving the document caret
    driver.update({ moveSelection: event.key === 'ArrowDown' ? 1 : -1 });
    return 'continue';
  }

  if (event.key === 'Enter' || event.key === 'Tab') {
    // Tab commits the highlighted item exactly like Enter — the editor package's own menus treat
    // the two as one commit gesture. Shift+Enter and Shift+Tab commit too: Shift is how the user
    // reaches an uppercase custom marker, not a separate gesture, and a soft line break has no
    // USFM representation anyway. Real chords were handled above.
    //
    // In capture, the claim keeps Lexical's KEY_ENTER (paragraph split / note `\fp`) from running
    // BEFORE the palette commit applies — the popover double-mutation bug. Claimed even for the
    // zero-match no-op below: an unclaimed Enter would split the paragraph under the open palette.
    claim(event);
    const matches = filterAndRankPaletteItems(
      session.items.map((item) => ({ label: item.marker })),
      session.filter,
      // Containment, for every kind: all marker palettes are host-driven (the session owns the
      // query and the palette renders it read-only), so this commit must resolve against the same
      // list the host filtered. Ranking cmdk's way here instead would commit an item the rendered
      // list never offered.
      'passive',
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
    if (kind !== 'selection') {
      // The active palette's Space commit ("commit what was typed"). Claimed: nothing may land.
      claim(event);
      if (session.filter === '') {
        // Nothing typed, so there is no marker to commit — materializing anyway put a bare `\`
        // and a space into the document, which is neither a marker nor anything the user asked
        // for. Paratext 9 closes the popup and leaves the document alone; so does this. Same
        // shape as the `*` refusal below, and as the `\` commit key, which is likewise an
        // ordinary character with an empty filter.
        driver.dismiss();
        return 'ended';
      }
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
    // Wrap commit: the marker is whatever was literally TYPED — an exact match against the
    // offered entries under the same normalization the filter matches with: case-insensitive
    // (markers are unique ignoring case and custom markers may be capitalized —
    // FILTER_CHAR_REGEX's own rule) and ignoring the `+` nesting prefix on both sides
    // (stripMarkerNestingPrefix — `+nd` visibly matches the `nd` entry, so the commit must find
    // the same item the list shows instead of refusing it). The ITEM's own marker is what commits:
    // the item is authoritative, so the offered casing wins and a nested closer keeps its leading
    // `+`. A marker not offered (unknown, or not valid here) has nothing to commit: the palette
    // closes and the selection stays intact rather than wrapped in a guess (visible refusal).
    // Claimed either way — nothing may replace the selection.
    claim(event);
    const typed = stripMarkerNestingPrefix(session.filter).toLowerCase();
    const match = session.items.find(
      (item) => stripMarkerNestingPrefix(item.marker).toLowerCase() === typed,
    );
    if (match) driver.commitItem(match.marker);
    driver.dismiss();
    return 'ended';
  }

  if (event.key === '*') {
    if (kind === 'selection' && session.filter === '') {
      // Over a selection with NOTHING typed there is no marker to close, and committing anyway
      // would delete the selected content and leave a bare `\*` in its place — one (likely
      // mistyped) keystroke destroying the selection the user was about to wrap. Decline
      // visibly instead, the same way Space refuses a marker that is not offered: claimed (the
      // `*` must not land on the selection either) and dismissed, selection intact. The
      // collapsed-caret palette below deliberately keeps committing a bare `\*` — nothing is
      // selected there, so the commit is just the literal bytes the user typed.
      claim(event);
      driver.dismiss();
      return 'ended';
    }
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

  if (event.key === '\\' && kind !== 'selection') {
    // The palette's THIRD commit key: `\` commits what was typed exactly as Space does but with NO
    // terminating space byte, then opens a FRESH palette for the backslash just pressed — so
    // `\qt-s\qt-e` is one continuous flow instead of losing the first marker. The separator is
    // unnecessary: a marker-name scan terminates at `\`, and the reopened session's own commit
    // supplies it.
    if (session.filter === '') {
      // Nothing typed, so there is nothing to commit. The palette holds focus, so the `\` cannot
      // land in the text whatever we do here — and a key that can only be a no-op must not also
      // throw the palette away. Claimed and ignored, like every other key the palette has no use
      // for; the user types a marker or escapes.
      claim(event);
      return 'continue';
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

  const filterCharacter = resolveFilterCharacter(event);
  if (event.key === 'Backspace' || filterCharacter !== undefined) {
    // The character narrows the query (or Backspace widens it) and must never land in the
    // document.
    claim(event);
    session.filter =
      event.key === 'Backspace' ? session.filter.slice(0, -1) : session.filter + filterCharacter;
    driver.update({ filterText: session.filter });
    return 'continue';
  }

  // Any other key is IGNORED: claimed, so nothing reaches the text, and the palette stays open.
  // Reached by everything outside the filter alphabet — punctuation, accented Latin, every
  // non-Latin script, `Dead`, Delete and the navigation keys (Left/Right/Home/End/PageUp/PageDown).
  //
  // Paratext 9 does the same (`MarkerDropdownControl.IsMarkerCharacter`): a key that cannot narrow
  // a marker name is simply not palette input. Closing on it instead would make an accidental
  // keystroke — or one character of a non-Latin layout — throw away a palette the user is still
  // using, and before the palette held focus it also let that character land in the verse.
  claim(event);
  return 'continue';
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
