import { describe, expect, it, vi } from 'vitest';
import {
  clearPaletteSessionIfCurrent,
  getMarkerPaletteClaimedKeys,
  resolveFilterCharacter,
  handleMarkerPaletteSessionKeyDown,
  isImeCompositionKeyEvent,
  MarkerPaletteSessionDriver,
  MarkerPaletteSessionState,
} from './marker-palette-keydown.util';

function makeDriver(): MarkerPaletteSessionDriver & {
  update: ReturnType<typeof vi.fn>;
  commit: ReturnType<typeof vi.fn>;
  dismiss: ReturnType<typeof vi.fn>;
  commitTyped: ReturnType<typeof vi.fn>;
  commitTypedAndReopen: ReturnType<typeof vi.fn>;
  commitTypedCloser: ReturnType<typeof vi.fn>;
  commitItem: ReturnType<typeof vi.fn>;
} {
  return {
    update: vi.fn(),
    commit: vi.fn(),
    dismiss: vi.fn(),
    commitTyped: vi.fn(),
    commitTypedAndReopen: vi.fn(),
    commitTypedCloser: vi.fn(),
    commitItem: vi.fn(),
  };
}

function makeEvent(key: string, init: KeyboardEventInit = {}): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
  vi.spyOn(event, 'stopPropagation');
  return event;
}

/**
 * Offer shaped like a real character-source context: the exact matches for the filters the tests
 * type ('w', 'wj', 'f', 'q1', 'ts-s') are all present, so Enter commits stay commits.
 */
const defaultItems = [
  { marker: 'f' },
  { marker: 'nd' },
  { marker: 'qt' },
  { marker: 'q1' },
  { marker: 'ts-s' },
  { marker: 'w' },
  { marker: 'wj' },
];

function session(
  kind: MarkerPaletteSessionState['kind'],
  filter = '',
  items: readonly { marker: string }[] = defaultItems,
): MarkerPaletteSessionState {
  return { kind, filter, items };
}

describe('handleMarkerPaletteSessionKeyDown', () => {
  it('passes pure modifier keydowns through untouched (chords like \\+w keep filtering)', () => {
    const driver = makeDriver();
    const event = makeEvent('Shift');
    expect(handleMarkerPaletteSessionKeyDown(event, session('selection'), driver)).toBe('passed');
    expect(event.defaultPrevented).toBe(false);
    expect(driver.dismiss).not.toHaveBeenCalled();
  });

  it('passes lock keys through untouched — never a dismissal, never a filter character', () => {
    // CapsLock is how an uppercase CUSTOM marker gets typed mid-filter and NumLock can be tapped
    // at any time — neither is input, so neither may dismiss the session or leak into the query.
    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
      ['CapsLock', 'NumLock'].forEach((key) => {
        const driver = makeDriver();
        const state = session(kind, 'w');
        const event = makeEvent(key);
        expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('passed');
        expect(event.defaultPrevented).toBe(false);
        expect(state.filter).toBe('w'); // not ingested
        expect(driver.dismiss).not.toHaveBeenCalled();
        expect(driver.update).not.toHaveBeenCalled();
      });
    });
  });

  it('IGNORES a dead key — claimed, filter untouched, palette stays open', () => {
    // `Dead` is how a diacritic begins on many layouts. With the palette holding focus no
    // composition starts, so it arrives as an ordinary keydown — and a key that cannot name a
    // marker is ignored rather than dismissing a palette the user is mid-way through.
    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
      const driver = makeDriver();
      const state = session(kind, 'w');
      const event = makeEvent('Dead');
      expect({ kind, outcome: handleMarkerPaletteSessionKeyDown(event, state, driver) }).toEqual({
        kind,
        outcome: 'continue',
      });
      expect(event.defaultPrevented).toBe(true);
      expect(state.filter).toBe('w');
      expect(driver.dismiss).not.toHaveBeenCalled();
    });
  });

  it('passes IME composition keydowns (isComposing) through untouched — no claim, no driver calls', () => {
    // An Enter that confirms a CJK/complex-script candidate arrives with `isComposing` and must
    // reach the editor's own composition-guarded handlers, not commit the palette. The capture
    // phase consumers run ahead of MarkerEditPlugin's `editor.isComposing()` guard, so the table
    // needs its own.
    const driver = makeDriver();
    const state = session('selection', 'w');
    const event = makeEvent('Enter', { isComposing: true });
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('passed');
    expect(event.defaultPrevented).toBe(false);
    expect(event.stopPropagation).not.toHaveBeenCalled();
    expect(driver.commit).not.toHaveBeenCalled();
    expect(driver.dismiss).not.toHaveBeenCalled();
    expect(driver.update).not.toHaveBeenCalled();
    expect(state.filter).toBe('w'); // not ingested
  });

  it('passes keyCode 229 keydowns through untouched even when isComposing is not yet set', () => {
    // Some engines fire the first composition keydown BEFORE `isComposing` flips true; the legacy
    // "handled by IME" signal for that keydown is `keyCode === 229` (often with key 'Process').
    const driver = makeDriver();
    const state = session('selection', 'w');
    const event = makeEvent('Process', { keyCode: 229 });
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('passed');
    expect(event.defaultPrevented).toBe(false);
    expect(driver.dismiss).not.toHaveBeenCalled();
    expect(state.filter).toBe('w'); // not ingested
  });

  it('never ingests or claims real chords — the session ends and the chord does its job (copy)', () => {
    const driver = makeDriver();
    const event = makeEvent('c', { ctrlKey: true });
    const state = session('selection', 'w');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(false); // Ctrl+C copies the wrapped selection
    expect(state.filter).toBe('w'); // not ingested
    expect(driver.dismiss).toHaveBeenCalledOnce();
  });

  it('claims chord+Enter while dismissing — cmdk must not click the highlighted item mid-dismissal', () => {
    // On a focused palette the chord arrives through key forwarding and cmdk acts on any
    // un-prevented Enter regardless of modifiers, so an unclaimed Ctrl+Enter committed the
    // highlighted item (wrapping the selection in a marker the user never chose) while the
    // dismissal was in flight. The chord still only dismisses — no commit of any kind.
    (['selection', 'backslash'] as const).forEach((kind) => {
      const driver = makeDriver();
      const event = makeEvent('Enter', { ctrlKey: true });
      expect(handleMarkerPaletteSessionKeyDown(event, session(kind, 'nd'), driver)).toBe('ended');
      expect(event.defaultPrevented).toBe(true); // claimed — cmdk skips its Enter case
      expect(driver.dismiss).toHaveBeenCalledOnce();
      expect(driver.commit).not.toHaveBeenCalled();
      expect(driver.commitItem).not.toHaveBeenCalled();
      expect(driver.commitTyped).not.toHaveBeenCalled();
    });
  });

  it('treats an AltGr chord (ctrl+alt with AltGraph) as a typed character — it filters, never dismisses', () => {
    // On Windows/Linux a character typed WITH AltGr held reports `ctrlKey && altKey` both set, so
    // without the AltGraph exclusion ordinary typing on several European layouts dismissed the
    // session mid-marker.
    const driver = makeDriver();
    const state = session('backslash', 'w');
    const event = makeEvent('j', { ctrlKey: true, altKey: true, modifierAltGraph: true });
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
    expect(event.defaultPrevented).toBe(true); // claimed — filters the palette, never lands
    expect(state.filter).toBe('wj');
    expect(driver.update).toHaveBeenCalledWith({ filterText: 'wj' });
    expect(driver.dismiss).not.toHaveBeenCalled();
  });

  it('a genuine ctrl+alt chord WITHOUT AltGraph keeps the chord behavior — unclaimed dismissal', () => {
    const driver = makeDriver();
    const state = session('backslash', 'w');
    const event = makeEvent('j', { ctrlKey: true, altKey: true });
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(false); // the chord must still do its normal job
    expect(state.filter).toBe('w'); // not ingested
    expect(driver.dismiss).toHaveBeenCalledOnce();
    expect(driver.update).not.toHaveBeenCalled();
  });

  it('claims in-session Enter (capture) so the editor never splits before the commit applies', () => {
    // The popover double-mutation bug: without preventDefault+stopPropagation in capture,
    // MarkerEditPlugin's KEY_ENTER inserted \fp/split BEFORE the palette commit ran.
    const driver = makeDriver();
    const event = makeEvent('Enter');
    expect(handleMarkerPaletteSessionKeyDown(event, session('backslash'), driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(driver.commit).toHaveBeenCalledOnce();
  });

  it('Enter with zero matches is a no-op — claimed, no driver call, session stays open (P9 parity)', () => {
    // Paratext 9: Enter over a palette whose typed filter matches nothing does NOTHING and the
    // palette stays open (Backspace widens the filter, Space commits the typed marker, Escape
    // closes). The table must not report 'ended' here: the overlay service drops a zero-match
    // commit and keeps the palette open, so ending the session would orphan the overlay over a
    // dead one and let subsequent typing land in the document under a floating palette.
    (['backslash', 'selection'] as const).forEach((kind) => {
      const driver = makeDriver();
      const state = session(kind, 'qqqq');
      const event = makeEvent('Enter');
      expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
      // Still claimed: an unclaimed Enter would split the paragraph under the open palette.
      expect(event.defaultPrevented).toBe(true);
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(driver.commit).not.toHaveBeenCalled();
      expect(driver.dismiss).not.toHaveBeenCalled();
    });
  });

  it('enter session ranks as a PASSIVE palette — the host drives its filter and highlight', () => {
    // A forwarded palette never has focus, so it is opened passive and the host drives its filter
    // and highlight (an active palette's highlight belongs to cmdk, which only responds to keys it
    // receives directly). Its commit must therefore count matches the way the host filters.
    // 'd' PREFIXES nothing in these items (passive => zero matches => Enter no-ops), while a
    // focused/active palette would find 'd' CONTAINED in 'nd' and commit.
    const items = [{ marker: 'nd' }, { marker: 'add' }];
    const driver = makeDriver();
    const event = makeEvent('Enter');
    expect(handleMarkerPaletteSessionKeyDown(event, session('enter', 'd', items), driver)).toBe(
      'continue',
    );
    expect(driver.commit).not.toHaveBeenCalled();
  });

  it('resolves zero matches by PREFIX for every kind — the palettes are all host-driven', () => {
    // 'd' prefixes neither 'nd' nor 'add', so Enter no-ops and the palette stays open in all three
    // kinds. Every marker palette now renders the session's query read-only and answers commits
    // from the session's own list, so one matching rule has to serve them all: ranking a commit
    // cmdk's way (containment) for any kind would commit an item the rendered list never offered.
    const items = [{ marker: 'nd' }, { marker: 'add' }];

    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
      const driver = makeDriver();
      const event = makeEvent('Enter');
      expect({
        kind,
        outcome: handleMarkerPaletteSessionKeyDown(event, session(kind, 'd', items), driver),
      }).toEqual({ kind, outcome: 'continue' });
      expect({ kind, commits: driver.commit.mock.calls.length }).toEqual({ kind, commits: 0 });
    });

    // A real prefix still commits, so the no-op above is the filter's doing, not a dead branch.
    const driver = makeDriver();
    expect(
      handleMarkerPaletteSessionKeyDown(makeEvent('Enter'), session('enter', 'n', items), driver),
    ).toBe('ended');
    expect(driver.commit).toHaveBeenCalledOnce();
  });

  it('Tab commits the highlighted item exactly like Enter — claimed, one overlay commit', () => {
    // The editor package's own menus treat Tab and Enter as one commit gesture; Tab is also in
    // the claimed-keys list, so a focused palette forwards it here rather than moving focus.
    (['backslash', 'selection'] as const).forEach((kind) => {
      const driver = makeDriver();
      const event = makeEvent('Tab');
      expect(handleMarkerPaletteSessionKeyDown(event, session(kind, 'nd'), driver)).toBe('ended');
      expect(event.defaultPrevented).toBe(true);
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(driver.commit).toHaveBeenCalledOnce();
      expect(driver.dismiss).not.toHaveBeenCalled();
    });
  });

  it('Tab with zero matches is the same claimed no-op as Enter — the session stays open', () => {
    (['backslash', 'selection'] as const).forEach((kind) => {
      const driver = makeDriver();
      const event = makeEvent('Tab');
      expect(handleMarkerPaletteSessionKeyDown(event, session(kind, 'qqqq'), driver)).toBe(
        'continue',
      );
      expect(event.defaultPrevented).toBe(true); // still claimed — Tab must not move focus
      expect(driver.commit).not.toHaveBeenCalled();
      expect(driver.dismiss).not.toHaveBeenCalled();
    });
  });

  it('claims Escape and dismisses for every forwarded session kind', () => {
    (['backslash', 'selection'] as const).forEach((kind) => {
      const driver = makeDriver();
      const event = makeEvent('Escape');
      expect(handleMarkerPaletteSessionKeyDown(event, session(kind), driver)).toBe('ended');
      expect(event.defaultPrevented).toBe(true);
      expect(driver.dismiss).toHaveBeenCalledOnce();
    });
  });

  it('claims arrows and drives the highlight without ending the session', () => {
    const driver = makeDriver();
    const event = makeEvent('ArrowDown');
    expect(handleMarkerPaletteSessionKeyDown(event, session('backslash'), driver)).toBe('continue');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.update).toHaveBeenCalledWith({ moveSelection: 1 });
  });

  it('backslash session: filter chars are CLAIMED and routed to the query — nothing lands (active palette)', () => {
    // The passive palette mirrored filter chars and let the literal land; the ACTIVE palette
    // claims them — typing filters the palette, never the document, identical to the editor
    // package's own `\` palette.
    const driver = makeDriver();
    const state = session('backslash', 'w');
    const event = makeEvent('j');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
    expect(event.defaultPrevented).toBe(true);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(state.filter).toBe('wj');
    expect(driver.update).toHaveBeenCalledWith({ filterText: 'wj' });
  });

  it('backslash session: Space commits the TYPED marker — claimed, commitTyped + dismiss, no overlay commit', () => {
    // The active palette's Space commit ("commit what was typed"): the session owner
    // materializes the literal through the editor (commitTyped) and the table closes the
    // overlay. The highlighted item is NOT committed — Space commits the query, Enter commits
    // the highlight.
    const driver = makeDriver();
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, session('backslash', 'wj'), driver)).toBe(
      'ended',
    );
    expect(event.defaultPrevented).toBe(true);
    expect(driver.commitTyped).toHaveBeenCalledExactlyOnceWith('wj');
    expect(driver.dismiss).toHaveBeenCalledOnce();
    expect(driver.commit).not.toHaveBeenCalled();
  });

  it('backslash session: Space with a zero-match filter still commits typed (unknown settles as typed)', () => {
    // Ratified zero-match row: Enter no-ops and stays open, but Space COMMITS the typed text as
    // the marker and closes — the materialized unknown literal settles as typed.
    const driver = makeDriver();
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, session('backslash', 'zz'), driver)).toBe(
      'ended',
    );
    expect(event.defaultPrevented).toBe(true);
    expect(driver.commitTyped).toHaveBeenCalledExactlyOnceWith('zz');
    expect(driver.commit).not.toHaveBeenCalled();
  });

  it('backslash session: `*` COMMITS the typed marker as a closing marker and ends the session', () => {
    // `*` is the palette's second commit key, the closing-marker counterpart to Space: it commits
    // `\nd*` at the caret with no terminating space and no opening glyph. It is therefore no
    // longer a filter character in this kind — pressing it commits the same end state a `closeTag`
    // entry would have applied, so there is nothing left to narrow to.
    const driver = makeDriver();
    const state = session('backslash', 'nd');
    const event = makeEvent('*');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true); // claimed — no literal asterisk may land
    expect(driver.commitTypedCloser).toHaveBeenCalledExactlyOnceWith('nd');
    expect(driver.dismiss).toHaveBeenCalled();
    expect(driver.commitTyped).not.toHaveBeenCalled();
    expect(driver.commit).not.toHaveBeenCalled();
    expect(state.filter).toBe('nd'); // not ingested into the query
  });

  it('backslash session: `*` commits even with zero matches (the closer settles as typed)', () => {
    // Same rule as Space's zero-match row: what the user typed is what commits. An unmatched
    // closer lands literally and the engine flags it — never a silent no-op.
    const driver = makeDriver();
    const state = session('backslash', 'zz');
    const event = makeEvent('*');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(driver.commitTypedCloser).toHaveBeenCalledExactlyOnceWith('zz');
  });

  it('backslash session: `*` on an empty filter commits a bare closer', () => {
    // Byte-fidelity, matching Space's bare-trigger row: `\*` is what the user typed.
    const driver = makeDriver();
    const state = session('backslash', '');
    const event = makeEvent('*');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(driver.commitTypedCloser).toHaveBeenCalledExactlyOnceWith('');
  });

  it('backslash session: a note marker does NOT reroute `*` through the overlay commit', () => {
    // `shouldSpaceCommit` exists because a materialized `\f ` OPENING literal absorbs the text
    // after the caret as the note's caller. A closing marker materializes no note and absorbs
    // nothing, so that exception does not apply to `*`.
    const driver = makeDriver();
    const state: MarkerPaletteSessionState = {
      ...session('backslash', 'f'),
      shouldSpaceCommit: (filter) => filter === 'f',
    };
    const event = makeEvent('*');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(driver.commitTypedCloser).toHaveBeenCalledExactlyOnceWith('f');
    expect(driver.commit).not.toHaveBeenCalled();
  });

  it('selection session: `*` COMMITS the typed closer over the selection (P9 parity)', () => {
    // Owner-directed, revising the earlier "`*` still filters here" pin: in Paratext 9, typing
    // `\nd*` with text selected DELETES the selected content and lands the literal closer. It is
    // a commit key in every selection shape, and a different gesture from Space's WRAP.
    const driver = makeDriver();
    const state = session('selection', 'nd');
    const event = makeEvent('*');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.commitTypedCloser).toHaveBeenCalledWith('nd');
    expect(driver.dismiss).toHaveBeenCalled();
    // Not a filter char any more — the query is not widened by the commit key.
    expect(driver.update).not.toHaveBeenCalled();
  });

  it('selection session: `*` on an EMPTY filter closes the palette and keeps the selection', () => {
    // Owner-directed: with nothing typed there is no marker to close, and a bare-closer commit
    // would delete the selected content for one (likely mistyped) keystroke. The palette declines
    // visibly instead — claimed, so the `*` cannot land over the selection either, and dismissed
    // with no commit of any kind. (The collapsed-caret palette's bare-closer commit above is
    // unchanged: nothing is selected there, so `\*` is just the bytes the user typed.)
    const driver = makeDriver();
    const state = session('selection', '');
    const event = makeEvent('*');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true); // claimed — the asterisk must not replace the selection
    expect(driver.commitTypedCloser).not.toHaveBeenCalled();
    expect(driver.commitTyped).not.toHaveBeenCalled();
    expect(driver.commit).not.toHaveBeenCalled();
    expect(driver.dismiss).toHaveBeenCalled();
  });

  it('backslash session: `\\` commits the typed marker WITHOUT a space and reopens', () => {
    // Owner-directed: `\qt-s` then `\` inserts the full `\qt-s` and opens a new palette for the
    // backslash just pressed, so a milestone pair is one continuous flow. No terminating space —
    // that is the whole difference from the Space commit.
    const driver = makeDriver();
    const state = session('backslash', 'qt');
    const event = makeEvent('\\');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.commitTypedAndReopen).toHaveBeenCalledWith('qt');
    expect(driver.commitTyped).not.toHaveBeenCalled();
  });

  it('`\\` on an EMPTY filter is IGNORED — claimed, nothing committed, palette stays open', () => {
    // With nothing typed there is nothing to commit. The palette holds focus, so the backslash
    // cannot reach the text whatever happens here — and a key that can only be a no-op must not
    // also throw away the palette the user just opened.
    (['backslash', 'enter'] as const).forEach((kind) => {
      const driver = makeDriver();
      const state = session(kind, '');
      const event = makeEvent('\\');
      expect({ kind, outcome: handleMarkerPaletteSessionKeyDown(event, state, driver) }).toEqual({
        kind,
        outcome: 'continue',
      });
      expect(event.defaultPrevented).toBe(true);
      expect(driver.commitTypedAndReopen).not.toHaveBeenCalled();
      expect(driver.commitTyped).not.toHaveBeenCalled();
      expect(driver.dismiss).not.toHaveBeenCalled();
    });
  });

  it('selection session: `\\` does NOT commit-and-reopen (the wrap consumes the selection)', () => {
    // Scoped to the collapsed-caret palette: over a selection the opening commit is the WRAP,
    // which consumes the selection, leaving nothing for a second marker to attach to.
    const driver = makeDriver();
    const state = session('selection', 'nd');
    const event = makeEvent('\\');
    handleMarkerPaletteSessionKeyDown(event, state, driver);
    expect(driver.commitTypedAndReopen).not.toHaveBeenCalled();
  });

  it('backslash session: hyphen and uppercase are filter chars (milestones like ts-s, custom capitals)', () => {
    const driver = makeDriver();
    const state = session('backslash', 'ts');
    const hyphen = makeEvent('-');
    expect(handleMarkerPaletteSessionKeyDown(hyphen, state, driver)).toBe('continue');
    expect(hyphen.defaultPrevented).toBe(true); // claimed — typing filters, never lands
    expect(state.filter).toBe('ts-');
    const upper = makeEvent('S');
    expect(handleMarkerPaletteSessionKeyDown(upper, state, driver)).toBe('continue');
    expect(state.filter).toBe('ts-S');
  });

  // Numbered markers (`q1`, `li2`, `s0`) are unreachable if a digit does not filter. Paratext 9's
  // own marker popup cannot type the digit `0` at all — a quirk deliberately not carried over, and
  // easy to lose again silently, so every digit is claimed and routed here.
  it('backslash session: every digit is a filter char, including the `0` Paratext 9 cannot type', () => {
    const driver = makeDriver();
    const state = session('backslash', 'q');
    '0123456789'.split('').forEach((digit) => {
      const event = makeEvent(digit);
      expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
      expect(event.defaultPrevented).toBe(true); // claimed — typing filters, never lands
    });
    expect(state.filter).toBe('q0123456789');
    expect(driver.commitTyped).not.toHaveBeenCalled();
  });

  it('backslash session: Space COMMITS (claimed, like Enter) when shouldSpaceCommit approves the filter', () => {
    // Typing `\f` then Space must insert an empty footnote exactly like `\f` + Enter — letting
    // the literal ` ` land would hand `\f ` to the Tier-2 tokenizer, which absorbs the rest of
    // the paragraph into the new footnote.
    const driver = makeDriver();
    const state: MarkerPaletteSessionState = {
      ...session('backslash', 'f'),
      shouldSpaceCommit: (filter) => filter === 'f',
    };
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true); // claimed: no literal space lands
    expect(driver.commit).toHaveBeenCalledOnce();
    expect(driver.dismiss).not.toHaveBeenCalled();
  });

  it('backslash session: Space commits TYPED when shouldSpaceCommit declines — claimed, never lands', () => {
    // The passive palette let the space land and Tier-2 complete the literal; under the active
    // palette nothing ever landed, so the commit materializes the typed literal instead
    // (commitTyped), byte-identical end state.
    const driver = makeDriver();
    const state: MarkerPaletteSessionState = {
      ...session('backslash', 'wj'),
      shouldSpaceCommit: (filter) => filter === 'f', // 'wj' is not a note marker
    };
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true); // claimed: no literal space lands
    expect(driver.commitTyped).toHaveBeenCalledExactlyOnceWith('wj');
    expect(driver.commit).not.toHaveBeenCalled();
  });

  it('Backspace on an empty filter is CLAIMED and closes the backslash and selection palettes', () => {
    // Editor-palette parity: with nothing typed there is nothing to widen — Backspace closes the
    // menu. Under the active palette nothing of the palette's ever landed, so an unclaimed
    // Backspace would eat a real document character (the passive palette relied on it deleting
    // the landed trigger `\`).
    (['backslash', 'selection'] as const).forEach((kind) => {
      const driver = makeDriver();
      const event = makeEvent('Backspace');
      expect(handleMarkerPaletteSessionKeyDown(event, session(kind, ''), driver)).toBe('ended');
      expect(event.defaultPrevented).toBe(true);
      expect(driver.dismiss).toHaveBeenCalledOnce();
    });
  });

  it('backslash session: Backspace with a non-empty filter still edits the filter (stays open)', () => {
    const driver = makeDriver();
    const state = session('backslash', 'wj');
    const event = makeEvent('Backspace');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
    expect(state.filter).toBe('w');
    expect(driver.dismiss).not.toHaveBeenCalled();
  });

  it('backslash session: Space with nothing typed closes the palette and commits nothing', () => {
    // Materializing the typed run on `\` then Space would land — with an empty filter — a bare
    // backslash and a space in the document, two characters that name no marker. Paratext 9
    // closes the popup and leaves the document untouched.
    const driver = makeDriver();
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, session('backslash', ''), driver)).toBe(
      'ended',
    );
    expect(event.defaultPrevented).toBe(true);
    expect(driver.dismiss).toHaveBeenCalledTimes(1);
    expect(driver.commitTyped).not.toHaveBeenCalled();
    expect(driver.commit).not.toHaveBeenCalled();
  });

  it('enter session: the palette owns its keys — filter, Backspace and arrows never reach the document', () => {
    // The overlay cannot hold browser focus against the editor, so the table owns these keys:
    // an unclaimed filter character would land in the scripture text under the open palette, and
    // an unclaimed arrow would move the document caret instead of the palette highlight.
    const driver = makeDriver();

    const filterChar = makeEvent('1');
    const filterState = session('enter', 'q');
    expect(handleMarkerPaletteSessionKeyDown(filterChar, filterState, driver)).toBe('continue');
    expect(filterChar.defaultPrevented).toBe(true);
    expect(filterState.filter).toBe('q1');

    const backspace = makeEvent('Backspace');
    expect(handleMarkerPaletteSessionKeyDown(backspace, filterState, driver)).toBe('continue');
    expect(backspace.defaultPrevented).toBe(true);
    expect(filterState.filter).toBe('q');

    const arrow = makeEvent('ArrowDown');
    expect(handleMarkerPaletteSessionKeyDown(arrow, filterState, driver)).toBe('continue');
    expect(arrow.defaultPrevented).toBe(true); // the palette highlight moves, not the caret
    expect(driver.update).toHaveBeenCalledWith({ moveSelection: 1 });
  });

  it('enter session: a printable key builds the filter instead of landing in the document', () => {
    // The palette owns its own keys the way 'backslash' and 'selection' do; an unclaimed
    // character would be inserted into the scripture text underneath the open palette.
    const driver = makeDriver();
    const state = session('enter', '');
    const event = makeEvent('q');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
    expect(event.defaultPrevented).toBe(true); // claimed — never reaches Lexical
    expect(state.filter).toBe('q');
    expect(driver.update).toHaveBeenCalledWith({ filterText: 'q' });
  });

  it('enter session: nothing lands and the palette stays open — it guards a pending split like selection guards a selection', () => {
    // Unlike 'backslash', which can let an unrelated key land while dismissing because nothing is
    // pending for it, 'enter' holds the user's paragraph split: the web view claims the Enter and
    // withholds the split until the palette commits, so a key that landed would also discard the
    // paragraph break. Same requirement 'selection' has, where a landing key would replace the
    // wrapped text — except that dismissing is destructive here too, so the key is ignored.
    ['.', ',', '(', '?', '/', 'é', 'ñ', 'п', 'ArrowLeft', 'Home', 'Delete'].forEach((key) => {
      const driver = makeDriver();
      const state = session('enter', 'q');
      const event = makeEvent(key);
      const outcome = handleMarkerPaletteSessionKeyDown(event, state, driver);
      expect({ key, outcome, claimed: event.defaultPrevented }).toEqual({
        key,
        outcome: 'continue',
        claimed: true,
      });
      expect({ key, dismissed: driver.dismiss.mock.calls.length }).toEqual({ key, dismissed: 0 });
    });
  });

  it('a composition keydown neither commits nor dismisses, in every kind', () => {
    // A composed character arrives through the editor's input path, not as a keydown the table can
    // ingest, and claiming the Enter that confirms a CJK candidate would corrupt the composition.
    // With focus on the palette's list no composition should start at all; this is the guard for
    // the window before the palette has focus.
    const cases = [
      { label: 'composition (keyCode 229)', event: makeEvent('Process', { keyCode: 229 }) },
      { label: 'composition (isComposing)', event: makeEvent('e', { isComposing: true }) },
    ];
    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
      cases.forEach(({ label, event }) => {
        const driver = makeDriver();
        const outcome = handleMarkerPaletteSessionKeyDown(event, session(kind, 'q1'), driver);
        expect({ kind, label, outcome }).toEqual({ kind, label, outcome: 'passed' });
        expect({ kind, label, commits: driver.commit.mock.calls.length }).toEqual({
          kind,
          label,
          commits: 0,
        });
        expect(driver.dismiss).not.toHaveBeenCalled();
      });
    });
  });

  it('Ctrl/Cmd/Alt+Enter CLOSES the palette in every kind, and is still claimed', () => {
    // A chord is the user doing something else (Cmd+S, Ctrl+C): the palette is no longer relevant
    // and closes, the same in both palettes. Enter stays CLAIMED even while closing — cmdk acts on
    // any un-prevented Enter regardless of modifiers, so an unclaimed chord+Enter would click the
    // highlighted item on the way out and commit a marker the user never chose.
    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
      (['ctrlKey', 'metaKey', 'altKey'] as const).forEach((modifier) => {
        const driver = makeDriver();
        const event = makeEvent('Enter', { [modifier]: true });
        const outcome = handleMarkerPaletteSessionKeyDown(event, session(kind, 'q1'), driver);
        expect({ kind, modifier, outcome, claimed: event.defaultPrevented }).toEqual({
          kind,
          modifier,
          outcome: 'ended',
          claimed: true,
        });
        expect({ kind, modifier, commits: driver.commit.mock.calls.length }).toEqual({
          kind,
          modifier,
          commits: 0,
        });
        expect(driver.dismiss).toHaveBeenCalledOnce();
      });
    });
  });

  it('treats OPTION as typing on macOS, not as a chord', () => {
    // On macOS Option composes characters — `Option+e` begins `é`, `Option+n` begins `ñ` — so it
    // holds the role AltGr holds on Windows and Linux. Reading it as a chord dismissed the palette
    // the instant a Mac user reached for an accent: the dead key arrives with `altKey` set, so it
    // never reached the rule that ignores keys which cannot name a marker. Live-reported.
    const { userAgent } = navigator;
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      configurable: true,
    });
    try {
      (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
        const driver = makeDriver();
        const event = makeEvent('Dead', { altKey: true });
        expect({
          kind,
          outcome: handleMarkerPaletteSessionKeyDown(event, session(kind, 'q'), driver),
        }).toEqual({ kind, outcome: 'continue' });
        expect(driver.dismiss).not.toHaveBeenCalled();
      });

      // Cmd and Ctrl are still command modifiers on macOS, Option held alongside or not.
      const cmdDriver = makeDriver();
      expect(
        handleMarkerPaletteSessionKeyDown(
          makeEvent('c', { metaKey: true, altKey: true }),
          session('enter', 'q'),
          cmdDriver,
        ),
      ).toBe('ended');
      expect(cmdDriver.dismiss).toHaveBeenCalledOnce();
    } finally {
      Object.defineProperty(navigator, 'userAgent', { value: userAgent, configurable: true });
    }
  });

  it('keeps ALT as a chord modifier off macOS, where AltGr is the composing one', () => {
    // Windows and Linux put composition on AltGr, which the chord branch excludes separately, so
    // a plain Alt chord there really is a command gesture and still closes the palette.
    const driver = makeDriver();
    const event = makeEvent('e', { altKey: true });
    expect(handleMarkerPaletteSessionKeyDown(event, session('enter', 'q'), driver)).toBe('ended');
    expect(driver.dismiss).toHaveBeenCalledOnce();

    // ...and AltGr typing (reported as ctrl+alt) is still not a chord.
    const altGrDriver = makeDriver();
    const altGr = makeEvent('w', { ctrlKey: true, altKey: true });
    altGr.getModifierState = (k: string) => k === 'AltGraph';
    expect(handleMarkerPaletteSessionKeyDown(altGr, session('enter', ''), altGrDriver)).toBe(
      'continue',
    );
    expect(altGrDriver.dismiss).not.toHaveBeenCalled();
  });

  it('SHIFT+Enter and Shift+Tab commit the highlighted item, like the unmodified keys', () => {
    // Shift is how an uppercase custom marker is typed, not a separate gesture, and a soft line
    // break has no USFM representation — it would serialize as a plain space, the same unmarked
    // data problem a plain split causes. Both palettes treat it as an ordinary commit.
    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
      (['Enter', 'Tab'] as const).forEach((key) => {
        const driver = makeDriver();
        const event = makeEvent(key, { shiftKey: true });
        const outcome = handleMarkerPaletteSessionKeyDown(
          event,
          session(kind, 'q1', [{ marker: 'q1' }]),
          driver,
        );
        expect({ kind, key, outcome, claimed: event.defaultPrevented }).toEqual({
          kind,
          key,
          outcome: 'ended',
          claimed: true,
        });
        expect(driver.commit).toHaveBeenCalledOnce();
      });
    });
  });

  it('Backspace on an EMPTY filter CLOSES the palette in every kind', () => {
    // With nothing typed there is nothing to widen, so Backspace closes — Paratext 9's behaviour,
    // and the same in both palettes. Claimed either way: nothing of the palette's ever landed, so
    // an unclaimed Backspace would eat a real character out of the verse.
    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
      const driver = makeDriver();
      const state = session(kind, '');
      const event = makeEvent('Backspace');
      expect({ kind, outcome: handleMarkerPaletteSessionKeyDown(event, state, driver) }).toEqual({
        kind,
        outcome: 'ended',
      });
      expect(event.defaultPrevented).toBe(true);
      expect(driver.dismiss).toHaveBeenCalledOnce();
      expect(driver.commit).not.toHaveBeenCalled();
    });
  });

  it('enter session: Space, `*` and `\\` commit the TYPED marker, like the `\\` palette', () => {
    // One set of rules for both palettes: the typed-commit keys mean the same thing wherever a
    // marker is being typed, so a user does not have to learn which palette they are looking at.
    // The marker engine decides what the committed marker does to the document.
    const spaceDriver = makeDriver();
    const spaceEvent = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(spaceEvent, session('enter', 'q1'), spaceDriver)).toBe(
      'ended',
    );
    expect(spaceEvent.defaultPrevented).toBe(true);
    expect(spaceDriver.commitTyped).toHaveBeenCalledWith('q1');

    const closerDriver = makeDriver();
    const closerEvent = makeEvent('*');
    expect(
      handleMarkerPaletteSessionKeyDown(closerEvent, session('enter', 'q1'), closerDriver),
    ).toBe('ended');
    expect(closerEvent.defaultPrevented).toBe(true);
    expect(closerDriver.commitTypedCloser).toHaveBeenCalledWith('q1');

    const reopenDriver = makeDriver();
    const reopenEvent = makeEvent('\\');
    expect(
      handleMarkerPaletteSessionKeyDown(reopenEvent, session('enter', 'q1'), reopenDriver),
    ).toBe('ended');
    expect(reopenEvent.defaultPrevented).toBe(true);
    expect(reopenDriver.commitTypedAndReopen).toHaveBeenCalledWith('q1');
  });

  it('Space on an EMPTY filter closes and commits nothing, in every kind', () => {
    // Nothing typed means no marker to commit; materializing anyway put a bare `\` and a space in
    // the document. Paratext 9 closes the popup and leaves the text alone.
    (['backslash', 'enter'] as const).forEach((kind) => {
      const driver = makeDriver();
      const event = makeEvent(' ');
      expect({
        kind,
        outcome: handleMarkerPaletteSessionKeyDown(event, session(kind, ''), driver),
      }).toEqual({ kind, outcome: 'ended' });
      expect(event.defaultPrevented).toBe(true);
      expect(driver.commitTyped).not.toHaveBeenCalled();
      expect(driver.dismiss).toHaveBeenCalledOnce();
    });
  });

  it('enter session: Enter with nothing typed commits the highlighted item', () => {
    // Enter-Enter is the whole gesture — open the split menu, accept its preselected choice.
    // Claimed: an Enter that reached Lexical would perform the unmarked plain split this palette
    // exists to prevent.
    const driver = makeDriver();
    const event = makeEvent('Enter');
    expect(handleMarkerPaletteSessionKeyDown(event, session('enter', ''), driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.commit).toHaveBeenCalledTimes(1);
    expect(driver.dismiss).not.toHaveBeenCalled();
  });

  it('enter session: Escape dismisses the palette', () => {
    // The counterpart: Escape means "no split".
    const driver = makeDriver();
    const event = makeEvent('Escape');
    expect(handleMarkerPaletteSessionKeyDown(event, session('enter', ''), driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.dismiss).toHaveBeenCalledTimes(1);
    expect(driver.commit).not.toHaveBeenCalled();
  });

  it('selection session: Space with an exact typed match commits THAT item — the wrap commit', () => {
    // Ratified: Space over a non-collapsed selection wraps the selection in the TYPED marker's
    // closed span — an exact match against the offered entries, not whatever is highlighted.
    // The session owner applies the specific item through the editor (commitItem) and the table
    // closes the overlay.
    const driver = makeDriver();
    const state = session('selection', 'nd');
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true); // nothing may replace the wrapped selection
    expect(driver.commitItem).toHaveBeenCalledExactlyOnceWith('nd');
    expect(driver.dismiss).toHaveBeenCalledOnce();
    expect(driver.commit).not.toHaveBeenCalled();
    expect(driver.commitTyped).not.toHaveBeenCalled();
  });

  it('selection session: Space with no exact typed match refuses visibly — claimed dismiss, no commit', () => {
    // A marker not offered (unknown, or not valid here) has nothing to commit: the palette
    // closes and the selection is left intact rather than wrapped in a guess.
    const driver = makeDriver();
    const state = session('selection', 'zz');
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.dismiss).toHaveBeenCalledOnce();
    expect(driver.commitItem).not.toHaveBeenCalled();
    expect(driver.commitTyped).not.toHaveBeenCalled();
    expect(driver.commit).not.toHaveBeenCalled();
  });

  it('selection session: the Space exact match is case-insensitive (`ND` typed, `nd` offered → commits)', () => {
    // Markers are unique ignoring case and custom markers may be capitalized (the same rule that
    // makes uppercase a filter character), so the wrap must not show `ND` matching in the list
    // and then refuse the very commit it displayed. The OFFERED casing is what commits.
    const driver = makeDriver();
    const state = session('selection', 'ND');
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.commitItem).toHaveBeenCalledExactlyOnceWith('nd');
    expect(driver.dismiss).toHaveBeenCalledOnce();
  });

  it('selection session: Space strips the `+` nesting prefix — `+nd` typed commits the offered `nd`', () => {
    // The filter strips a leading `+` in both modes, so `+nd` visibly matches the `nd` entry —
    // the commit must find the same item instead of refusing the wrap it displayed. The ITEM's
    // marker is what commits.
    const driver = makeDriver();
    const state = session('selection', '+nd');
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.commitItem).toHaveBeenCalledExactlyOnceWith('nd');
    expect(driver.dismiss).toHaveBeenCalledOnce();
  });

  it('backslash session: Space passes the literal typed filter to commitTyped — a typed `+` survives verbatim', () => {
    // commitTyped's contract is literal bytes: the `+` is stripped for MATCHING only, never from
    // what materializes in the document.
    const driver = makeDriver();
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, session('backslash', '+nd'), driver)).toBe(
      'ended',
    );
    expect(driver.commitTyped).toHaveBeenCalledExactlyOnceWith('+nd');
  });

  it('Enter counts matches on the stripped query — a `+w` filter still commits (nested `\\+w` chord)', () => {
    (['backslash', 'selection'] as const).forEach((kind) => {
      const driver = makeDriver();
      const event = makeEvent('Enter');
      expect(handleMarkerPaletteSessionKeyDown(event, session(kind, '+w'), driver)).toBe('ended');
      expect(driver.commit).toHaveBeenCalledOnce();
    });
  });

  it('selection session: the Space exact match is against the full marker code, not a prefix', () => {
    // 'n' prefixes 'nd' but is not offered itself — Space must refuse, not wrap in 'nd'.
    const driver = makeDriver();
    const state = session('selection', 'n');
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(driver.commitItem).not.toHaveBeenCalled();
    expect(driver.dismiss).toHaveBeenCalledOnce();
  });

  // The selection-wrap matrix, pinned as a whole so the "Space refuses instead of wrapping"
  // regression cannot come back through any one cell. Space commits what was TYPED (exact match
  // only); Enter commits what is HIGHLIGHTED. Neither ever refuses when an exact typed match
  // exists, and neither ever guesses when it does not.
  it('selection session: Enter with an exact typed match commits through the overlay (the highlighted item)', () => {
    const driver = makeDriver();
    const state = session('selection', 'nd');
    const event = makeEvent('Enter');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.commit).toHaveBeenCalledOnce();
    // Enter's marker choice is the overlay's, not the typed exact match — that is Space's rule.
    expect(driver.commitItem).not.toHaveBeenCalled();
  });

  it('selection session: Enter with a NEAR-MISS prefix still commits (the highlighted item)', () => {
    // 'n' is not offered itself, but it ranks 'nd' — unlike Space, Enter has something to commit.
    const driver = makeDriver();
    const state = session('selection', 'n');
    const event = makeEvent('Enter');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(driver.commit).toHaveBeenCalledOnce();
  });

  it('selection session: Enter with zero matches is a no-op and the palette stays open', () => {
    // P9 parity, same as every other kind: nothing to commit means nothing happens, and the
    // session must NOT end or the still-mounted overlay is orphaned over a dead session.
    const driver = makeDriver();
    const state = session('selection', 'zz');
    const event = makeEvent('Enter');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.commit).not.toHaveBeenCalled();
    expect(driver.commitItem).not.toHaveBeenCalled();
    expect(driver.dismiss).not.toHaveBeenCalled();
  });

  it('selection session: a filter character narrows the query and is claimed', () => {
    const driver = makeDriver();
    const typed = makeEvent('w');
    const state = session('selection');
    expect(handleMarkerPaletteSessionKeyDown(typed, state, driver)).toBe('continue');
    expect(typed.defaultPrevented).toBe(true);
    expect(driver.update).toHaveBeenCalledWith({ filterText: 'w' });
  });

  it('IGNORES every key that cannot name a marker, in every kind', () => {
    // Paratext 9's rule (`MarkerDropdownControl.IsMarkerCharacter`): a key that cannot narrow a
    // marker name is not palette input. Claimed, so it cannot reach the verse, and ignored, so an
    // accidental keystroke — or one character of a non-Latin layout — does not throw away a
    // palette the user is still using.
    const ignored = [
      '%',
      '.',
      ',',
      'é',
      'ж',
      '字',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'PageUp',
      'PageDown',
      'Delete',
    ];
    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
      ignored.forEach((key) => {
        const driver = makeDriver();
        const state = session(kind, 'q');
        const event = makeEvent(key);
        expect({
          kind,
          key,
          outcome: handleMarkerPaletteSessionKeyDown(event, state, driver),
        }).toEqual({ kind, key, outcome: 'continue' });
        expect({ kind, key, claimed: event.defaultPrevented }).toEqual({
          kind,
          key,
          claimed: true,
        });
        expect(state.filter).toBe('q'); // not ingested
        expect(driver.dismiss).not.toHaveBeenCalled();
        expect(driver.commit).not.toHaveBeenCalled();
      });
    });
  });

  it('Backspace edits a non-empty filter — claimed in backslash and selection sessions (nothing landed to delete)', () => {
    (['backslash', 'selection'] as const).forEach((kind) => {
      const driver = makeDriver();
      const state = session(kind, 'wj');
      const event = makeEvent('Backspace');
      expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
      expect(state.filter).toBe('w');
      expect(event.defaultPrevented).toBe(true);
      expect(driver.update).toHaveBeenCalledWith({ filterText: 'w' });
    });
  });
});

describe('clearPaletteSessionIfCurrent', () => {
  it('clears the ref when the token matches the live session', () => {
    const liveSession: { token: number } | undefined = { token: 3 };
    const sessionRef = { current: liveSession };

    clearPaletteSessionIfCurrent(sessionRef, 3);

    expect(sessionRef.current).toBeUndefined();
  });

  it('leaves a NEWER session in place when a stale token tries to clear (dismiss/re-trigger race)', () => {
    // Session A (token 1) was dismissed synchronously; session B (token 2) is live when A's
    // show-promise finally settles and runs its async cleanup with A's captured token.
    const sessionB: { token: number } | undefined = { token: 2 };
    const sessionRef = { current: sessionB };

    clearPaletteSessionIfCurrent(sessionRef, 1);

    expect(sessionRef.current).toBe(sessionB);
  });

  it('no-ops when no session is live', () => {
    const noSession: { token: number } | undefined = undefined;
    const sessionRef = { current: noSession };

    clearPaletteSessionIfCurrent(sessionRef, 1);

    expect(sessionRef.current).toBeUndefined();
  });
});

describe('getMarkerPaletteClaimedKeys', () => {
  // The list a session hands to its palette so the palette forwards exactly these keys back
  // instead of consuming them. Its control-key half (CONTROL_KEYS) is hand-kept in step with the
  // handler's branches; if the two drift, the forwarded half of a session behaves differently
  // from the focused one. The sweep below pins one drift direction behaviorally.
  it('claims every key the table acts on, for each forwarded session kind', () => {
    // Every kind is forwarded, so each must claim these keys, or a palette that does receive focus
    // consumes them instead of forwarding them back to the session.
    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
      const keys = getMarkerPaletteClaimedKeys();
      // The control keys the owner named explicitly, plus the ones the table has branches for.
      [' ', 'Enter', 'Escape', 'Tab', '*', 'Backspace', 'ArrowUp', 'ArrowDown'].forEach((key) => {
        // The kind is in the failure output via the surrounding forEach's own key list.
        expect({ kind, keys }).toMatchObject({ keys: expect.arrayContaining([key]) });
      });
      // Filter characters, or the session cannot own its own query when the palette has focus.
      expect(keys).toContain('n');
      expect(keys).toContain('D');
      expect(keys).toContain('1');
    });
  });

  it('claims the `\\` trigger so a commit-and-reopen works from a focused palette too', () => {
    expect(getMarkerPaletteClaimedKeys()).toContain('\\');
  });

  it('does not claim pure modifiers (they are not input and the table only passes them)', () => {
    const keys = getMarkerPaletteClaimedKeys();
    ['Shift', 'Control', 'Alt', 'Meta'].forEach((key) => expect(keys).not.toContain(key));
  });

  it('every claimed key is actually acted on in a forwarded session — no stale list entries', () => {
    // The claimed list is hand-kept in step with the handler's branches (CONTROL_KEYS's comment is
    // the convention), so it can drift in two directions. The FORWARD direction — a new branch
    // added without a list entry — remains convention-guarded only: no test can enumerate branches
    // the handler doesn't declare, which is exactly why getMarkerPaletteClaimedKeys's doc no
    // longer claims the list is derived. This sweep pins the REVERSE direction: a stale entry
    // whose branch was removed would make a focused palette forward a key the handler then lets
    // fall through to the dismiss-and-let-it-land catch-all. With a non-empty filter matching an
    // offered item, every listed key's branch CLAIMS its event (the unclaimed rows — empty-filter
    // `\` and the backslash catch-all — are only reachable for keys outside the list or an empty
    // filter), so a fallen-through key shows up here as an unclaimed dismissal. The 'selection'
    // kind's catch-all claims every key by design, so 'backslash' is the discriminating half of
    // the sweep; 'selection' still verifies every listed key is acted on rather than passed.
    // 'enter' rides along for the same limited reason as 'selection': its catch-all claims and
    // ignores every key, so a stale entry is indistinguishable here from a listed one. For 'enter'
    // the sweep verifies only that no listed key is passed through unclaimed.
    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
      getMarkerPaletteClaimedKeys().forEach((key) => {
        const driver = makeDriver();
        const state = session(kind, 'nd');
        const event = makeEvent(key);
        const outcome = handleMarkerPaletteSessionKeyDown(event, state, driver);
        // The kind and key ride along in the asserted object so a failure names the stale entry.
        expect({ kind, key, outcome, claimed: event.defaultPrevented }).toEqual({
          kind,
          key,
          outcome: expect.stringMatching(/^(continue|ended)$/),
          claimed: true,
        });
      });
    });
  });
});

describe('resolveFilterCharacter — the physical key, not the character the layout produced', () => {
  const ev = (key: string, init: KeyboardEventInit & { keyCode?: number } = {}) =>
    makeEvent(key, init);

  it('falls back to keyCode for A-Z, so a non-Latin layout types the Latin marker letter', () => {
    // The whole point: USFM marker names are always basic Latin, but the translator's keyboard may
    // not be. On a Cyrillic layout the `q` key produces `й`, which matches no marker — the palette
    // would be unusable for exactly the people most likely to need it.
    expect(resolveFilterCharacter(ev('й', { keyCode: 81 }))).toBe('q');
    expect(resolveFilterCharacter(ev('ф', { keyCode: 65 }))).toBe('a');
    // Greek: the `q` key produces `;`, which is not a marker character either.
    expect(resolveFilterCharacter(ev(';', { keyCode: 81 }))).toBe('q');
  });

  it('keeps a LATIN character the layout produced, whatever keyCode claims', () => {
    // `keyCode` is not portable: Chromium takes it from the native virtual key, which Windows
    // assigns per layout but macOS and Linux map through a US-layout table. The same French AZERTY
    // `a` key therefore reports keyCode 65 on Windows and 81 on macOS. Reading keyCode first made
    // that key filter `a` on one OS and `q` on the other, so a French or German translator on a Mac
    // could not type a marker at all. The character the user actually typed is the same on both.
    expect(resolveFilterCharacter(ev('a', { keyCode: 65 }))).toBe('a'); // AZERTY on Windows
    expect(resolveFilterCharacter(ev('a', { keyCode: 81 }))).toBe('a'); // the SAME key on macOS
    expect(resolveFilterCharacter(ev('z', { keyCode: 87 }))).toBe('z'); // QWERTZ `z`/`w` swap
  });

  it('keeps `-` and `+` on layouts whose number row reports digit keyCodes', () => {
    // AZERTY keeps VK_0-VK_9 on the number row while producing `&é"'(-è_çà` unshifted, so its `-`
    // key reports keyCode 54. Reading that as a digit turned every milestone marker into `qt6`.
    expect(resolveFilterCharacter(ev('-', { keyCode: 54 }))).toBe('-');
    // Czech/Slovak QWERTZ puts `+` unshifted on Digit1 — read as `1`, the `\\+w` nesting prefix
    // could never be typed.
    expect(resolveFilterCharacter(ev('+', { keyCode: 49 }))).toBe('+');
  });

  it('takes the letter after a DEAD key as an ordinary character', () => {
    // With focus on the palette's LIST no composition starts, so a dead key arrives as a plain
    // keydown (measured: `key=Dead`, then `key=e` with keyCode 69, and no composition events) —
    // the dead key itself names no marker, and the letter after it filters normally.
    //
    // A dead key pressed while the EDITOR still has focus is different: it carries keyCode 229 and
    // a composition does start. The table passes those through (`isImeCompositionKeyEvent`) rather
    // than ingesting them, and the consumer closes the palette on `compositionstart` — the one
    // accepted gap in the window before the palette takes focus.
    expect(resolveFilterCharacter(ev('Dead', { keyCode: 0 }))).toBeUndefined();
    expect(resolveFilterCharacter(ev('e', { keyCode: 69 }))).toBe('e');
    expect(isImeCompositionKeyEvent(ev('Dead', { keyCode: 229 }))).toBe(true);
  });

  it('preserves case — from the typed character, in either script', () => {
    // Custom markers may be capitalized, so case has to survive. `event.key` carries it in both
    // paths: a Latin character is returned as typed, and a non-Latin one still says which case the
    // user produced, whatever combination of Shift and CapsLock got them there.
    expect(resolveFilterCharacter(ev('W', { keyCode: 87, shiftKey: true }))).toBe('W');
    expect(resolveFilterCharacter(ev('w', { keyCode: 87 }))).toBe('w');
    expect(resolveFilterCharacter(ev('Ц', { keyCode: 87, shiftKey: true }))).toBe('W');
    expect(resolveFilterCharacter(ev('ц', { keyCode: 87 }))).toBe('w');
    // CapsLock on, Shift held: the two cancel, and the character records that.
    expect(resolveFilterCharacter(ev('ц', { keyCode: 87, shiftKey: true }))).toBe('w');
  });

  it('takes digits from the character, including the numpad and a shifted number row', () => {
    expect(resolveFilterCharacter(ev('1', { keyCode: 49 }))).toBe('1');
    expect(resolveFilterCharacter(ev('1', { keyCode: 97 }))).toBe('1'); // numpad
    // AZERTY needs Shift for a digit; the character is still `1`.
    expect(resolveFilterCharacter(ev('1', { keyCode: 49, shiftKey: true }))).toBe('1');
    // Shift+8 is `*` on a US layout — a commit key, not a filter character.
    expect(resolveFilterCharacter(ev('*', { keyCode: 56, shiftKey: true }))).toBeUndefined();
    expect(resolveFilterCharacter(ev('!', { keyCode: 49, shiftKey: true }))).toBeUndefined();
  });

  it('takes `+` and `-` from the character, since they move between physical keys', () => {
    // `\+w` nesting and `qt-s` milestones both need these, and they are not on one fixed key.
    expect(resolveFilterCharacter(ev('+', { keyCode: 187, shiftKey: true }))).toBe('+');
    expect(resolveFilterCharacter(ev('-', { keyCode: 189 }))).toBe('-');
  });

  it('falls back to the character for packet keys (Keyman), which report no usable keyCode', () => {
    expect(resolveFilterCharacter(ev('w', { keyCode: 231 }))).toBe('w');
    expect(resolveFilterCharacter(ev('7', { keyCode: 231 }))).toBe('7');
    // Still nothing for a character that cannot name a marker.
    expect(resolveFilterCharacter(ev('\u00e9', { keyCode: 231 }))).toBeUndefined();
  });

  it('returns undefined for everything that cannot name a marker', () => {
    ['.', ',', '%', '\u00e9', '\u0436', '\u5b57', 'Enter', 'ArrowLeft', 'F1'].forEach((key) => {
      expect({ key, resolved: resolveFilterCharacter(ev(key, { keyCode: 0 })) }).toEqual({
        key,
        resolved: undefined,
      });
    });
  });

  it('drives the SESSION filter through the table, not just in isolation', () => {
    // The unit above is only useful if the table actually calls it: a Cyrillic keydown must narrow
    // the query to the Latin marker letter.
    const driver = makeDriver();
    const state = session('enter', '');
    handleMarkerPaletteSessionKeyDown(makeEvent('й', { keyCode: 81 }), state, driver);
    handleMarkerPaletteSessionKeyDown(makeEvent('1', { keyCode: 49 }), state, driver);
    expect(state.filter).toBe('q1');
    expect(driver.update).toHaveBeenLastCalledWith({ filterText: 'q1' });
  });
});
