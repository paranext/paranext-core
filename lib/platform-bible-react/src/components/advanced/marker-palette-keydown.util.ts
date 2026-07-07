/**
 * Shared keydown forwarding table for standard-view marker-palette sessions (Task 15 final review,
 * Important 1). This is THE single source of the while-open key semantics — previously duplicated
 * between `platform-scripture-editor.web-view.tsx` and `footnote-editor.component.tsx`, and the
 * copies drifted: the round-3 capture-phase rework (stopPropagation on session-ending keys, the
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
 *   while it is open, because typing would replace the wrapped selection (the QA run 3 text loss).
 *
 * Modifier-only keydowns (the Shift half of a `+` chord) pass through untouched so chords like
 * `\+w` keep filtering. Real chords (Ctrl/Cmd/Alt + key) are never ingested into the filter and
 * never claimed — the session is dismissed and the chord does its normal job (e.g. Ctrl+C copies
 * the wrapped selection; previously the selection session claimed it and copy was dead while a wrap
 * palette was open).
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
}

/** The palette operations the forwarding table drives (overlay service or host-supplied). */
export interface MarkerPaletteSessionDriver {
  update(update: { filterText?: string; moveSelection?: number }): void;
  commit(): void;
  dismiss(): void;
}

/**
 * - `'passed'` — modifier-only keydown; nothing happened, the session stays open.
 * - `'continue'` — the key drove the palette (filter/arrows); the session stays open.
 * - `'ended'` — the session is over (commit/dismiss); the caller must clear its session ref.
 */
export type MarkerPaletteKeyOutcome = 'passed' | 'continue' | 'ended';

const FILTER_CHAR_REGEX: Record<MarkerPaletteSessionKind, RegExp> = {
  // Passive mirror: PT9 marker characters that land in the document as they filter.
  backslash: /^[a-z0-9+]$/,
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
    // BEFORE the palette commit applies — the popover double-mutation bug.
    claim(event);
    driver.commit();
    return 'ended';
  }

  if (event.key === 'Escape') {
    claim(event); // keep Lexical (and anything else) from acting on Escape
    driver.dismiss();
    return 'ended';
  }

  if (session.kind === 'backslash' && (event.key === ' ' || event.key === '*')) {
    // PT9 Space-commit / `*`-close: the key lands as literal text and is picked up by the
    // engine's own Tier-2 marker-completion trigger, so the palette is no longer relevant.
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
