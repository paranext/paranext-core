import { describe, expect, it, vi } from 'vitest';
import {
  clearPaletteSessionIfCurrent,
  handleMarkerPaletteSessionKeyDown,
  MarkerPaletteSessionDriver,
  MarkerPaletteSessionState,
} from './marker-palette-keydown.util';

function makeDriver(): MarkerPaletteSessionDriver & {
  update: ReturnType<typeof vi.fn>;
  commit: ReturnType<typeof vi.fn>;
  dismiss: ReturnType<typeof vi.fn>;
} {
  return { update: vi.fn(), commit: vi.fn(), dismiss: vi.fn() };
}

function makeEvent(key: string, init: KeyboardEventInit = {}): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init });
  vi.spyOn(event, 'stopPropagation');
  return event;
}

function session(kind: MarkerPaletteSessionState['kind'], filter = ''): MarkerPaletteSessionState {
  return { kind, filter };
}

describe('handleMarkerPaletteSessionKeyDown', () => {
  it('passes pure modifier keydowns through untouched (chords like \\+w keep filtering)', () => {
    const driver = makeDriver();
    const event = makeEvent('Shift');
    expect(handleMarkerPaletteSessionKeyDown(event, session('selection'), driver)).toBe('passed');
    expect(event.defaultPrevented).toBe(false);
    expect(driver.dismiss).not.toHaveBeenCalled();
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

  it('claims Escape and dismisses for every session kind', () => {
    (['backslash', 'enter', 'selection'] as const).forEach((kind) => {
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
    expect(handleMarkerPaletteSessionKeyDown(event, session('enter'), driver)).toBe('continue');
    expect(event.defaultPrevented).toBe(true);
    expect(driver.update).toHaveBeenCalledWith({ moveSelection: 1 });
  });

  it('backslash session: filter chars are MIRRORED, never claimed (the literal must land)', () => {
    const driver = makeDriver();
    const state = session('backslash', 'w');
    const event = makeEvent('j');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
    expect(event.defaultPrevented).toBe(false);
    expect(state.filter).toBe('wj');
    expect(driver.update).toHaveBeenCalledWith({ filterText: 'wj' });
  });

  it('backslash session: Space/`*` land unclaimed and end the session (Tier-2 takes over)', () => {
    (['*', ' '] as const).forEach((key) => {
      const driver = makeDriver();
      const event = makeEvent(key);
      expect(handleMarkerPaletteSessionKeyDown(event, session('backslash'), driver)).toBe('ended');
      expect(event.defaultPrevented).toBe(false);
      expect(driver.dismiss).toHaveBeenCalledOnce();
    });
  });

  it('backslash session: hyphen and uppercase are filter chars (milestones like ts-s, custom capitals)', () => {
    const driver = makeDriver();
    const state = session('backslash', 'ts');
    const hyphen = makeEvent('-');
    expect(handleMarkerPaletteSessionKeyDown(hyphen, state, driver)).toBe('continue');
    expect(hyphen.defaultPrevented).toBe(false); // still mirrored — the char must land in the doc
    expect(state.filter).toBe('ts-');
    const upper = makeEvent('S');
    expect(handleMarkerPaletteSessionKeyDown(upper, state, driver)).toBe('continue');
    expect(state.filter).toBe('ts-S');
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

  it('backslash session: Space still lands + dismisses when shouldSpaceCommit declines', () => {
    const driver = makeDriver();
    const state: MarkerPaletteSessionState = {
      ...session('backslash', 'wj'),
      shouldSpaceCommit: (filter) => filter === 'f', // 'wj' is not a note marker
    };
    const event = makeEvent(' ');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('ended');
    expect(event.defaultPrevented).toBe(false); // unclaimed: the literal completes via Tier-2
    expect(driver.dismiss).toHaveBeenCalledOnce();
    expect(driver.commit).not.toHaveBeenCalled();
  });

  it('backslash session: Backspace on an empty filter deletes the trigger `\\` and ends the session', () => {
    const driver = makeDriver();
    const event = makeEvent('Backspace');
    expect(handleMarkerPaletteSessionKeyDown(event, session('backslash', ''), driver)).toBe(
      'ended',
    );
    expect(event.defaultPrevented).toBe(false); // unclaimed: the `\` deletion lands in the document
    expect(driver.dismiss).toHaveBeenCalledOnce();
  });

  it('backslash session: Backspace with a non-empty filter still edits the filter (stays open)', () => {
    const driver = makeDriver();
    const state = session('backslash', 'wj');
    const event = makeEvent('Backspace');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
    expect(state.filter).toBe('w');
    expect(driver.dismiss).not.toHaveBeenCalled();
  });

  it('enter session: filter chars (incl. digits) are CLAIMED and forwarded', () => {
    const driver = makeDriver();
    const state = session('enter', 'q');
    const event = makeEvent('1');
    expect(handleMarkerPaletteSessionKeyDown(event, state, driver)).toBe('continue');
    expect(event.defaultPrevented).toBe(true); // must NOT land in the document
    expect(driver.update).toHaveBeenCalledWith({ filterText: 'q1' });
  });

  it('selection session: every non-chord key is claimed — nothing may replace the wrapped selection', () => {
    // filter char
    const driver = makeDriver();
    const typed = makeEvent('w');
    const state = session('selection');
    expect(handleMarkerPaletteSessionKeyDown(typed, state, driver)).toBe('continue');
    expect(typed.defaultPrevented).toBe(true);
    expect(driver.update).toHaveBeenCalledWith({ filterText: 'w' });
    // non-filter key: still claimed, session ends
    const other = makeEvent('%');
    expect(handleMarkerPaletteSessionKeyDown(other, state, driver)).toBe('ended');
    expect(other.defaultPrevented).toBe(true);
    expect(driver.dismiss).toHaveBeenCalledOnce();
  });

  it('backslash/enter sessions let unrelated keys land while dismissing', () => {
    (['backslash', 'enter'] as const).forEach((kind) => {
      const driver = makeDriver();
      const event = makeEvent('%');
      expect(handleMarkerPaletteSessionKeyDown(event, session(kind), driver)).toBe('ended');
      expect(event.defaultPrevented).toBe(false); // the user resumed editing; the key lands
      expect(driver.dismiss).toHaveBeenCalledOnce();
    });
  });

  it('Backspace edits the filter (claimed only for focused kinds)', () => {
    const passive = makeDriver();
    const passiveState = session('backslash', 'wj');
    const passiveEvent = makeEvent('Backspace');
    handleMarkerPaletteSessionKeyDown(passiveEvent, passiveState, passive);
    expect(passiveState.filter).toBe('w');
    expect(passiveEvent.defaultPrevented).toBe(false);

    const focused = makeDriver();
    const focusedState = session('selection', 'wj');
    const focusedEvent = makeEvent('Backspace');
    handleMarkerPaletteSessionKeyDown(focusedEvent, focusedState, focused);
    expect(focusedState.filter).toBe('w');
    expect(focusedEvent.defaultPrevented).toBe(true);
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
