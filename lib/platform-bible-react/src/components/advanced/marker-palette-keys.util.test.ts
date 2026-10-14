import { describe, expect, it, vi } from 'vitest';
import type { MutableRefObject, RefObject } from 'react';
import type { EditorRef, MarkerMenuItem } from '@eten-tech-foundation/platform-editor';
import { routeMarkerPaletteKey } from './marker-palette-keys.util';
import type { MarkerPaletteOpenSession } from './marker-palette-session.util';
import type { EditorContentSnapshot } from './marker-palette-change-guard.util';

/** Only `marker` takes part in anything this module does; the rest is what the type requires. */
const item = (marker: string): MarkerMenuItem => ({ marker, kind: 'character', isBasic: true });

function makeEvent(key: string): KeyboardEvent {
  return new KeyboardEvent('keydown', { key, cancelable: true, bubbles: true });
}

function setUp(sessionOverrides: Partial<MarkerPaletteOpenSession<MarkerMenuItem>> = {}) {
  const session: MarkerPaletteOpenSession<MarkerMenuItem> = {
    kind: 'backslash',
    token: 1,
    filter: 'wj',
    items: [item('wj'), item('nd')],
    ...sessionOverrides,
  };
  const sessionRef: MutableRefObject<MarkerPaletteOpenSession<MarkerMenuItem> | undefined> = {
    current: session,
  };
  const editor = {
    commitTypedMarker: vi.fn(),
    commitTypedCloser: vi.fn(),
    applyMarkerMenuSelection: vi.fn(),
  };
  // EditorRef has many required methods; a partial mock via type assertion is simpler than
  // stubbing all of them, and only these three are reachable from here
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const editorRef = { current: editor } as unknown as RefObject<EditorRef | null>;
  const palette = { update: vi.fn(), commit: vi.fn(), dismiss: vi.fn() };
  const restoreCaret = vi.fn();
  const reopenAtCaret = vi.fn(() => true);
  const baselineRef: MutableRefObject<EditorContentSnapshot | undefined> = {
    // Only its presence matters here — the WRITER clears the baseline, never this module
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    current: {} as unknown as EditorContentSnapshot,
  };
  /** Stands in for `useMarkerPaletteSessionWriters`' writer, which owns both of these. */
  const clearSessionIfCurrent = vi.fn((token: number) => {
    if (sessionRef.current?.token !== token) return;
    sessionRef.current = undefined;
    baselineRef.current = undefined;
  });
  const options = {
    sessionRef,
    editorRef,
    palette,
    restoreCaret,
    reopenAtCaret,
    clearSessionIfCurrent,
  };
  return {
    session,
    sessionRef,
    editor,
    palette,
    restoreCaret,
    reopenAtCaret,
    baselineRef,
    clearSessionIfCurrent,
    options,
  };
}

describe('routeMarkerPaletteKey', () => {
  it('reports `no-session` rather than swallowing the key', () => {
    // The palette holds real focus and forwards EVERY key here, so a silent return leaves a box the
    // keyboard cannot get out of — Escape included. Each consumer closes it on this signal.
    const { options, sessionRef, palette } = setUp();
    sessionRef.current = undefined;

    expect(routeMarkerPaletteKey(makeEvent('Escape'), options)).toBe('no-session');
    expect(palette.dismiss).not.toHaveBeenCalled();
  });

  it('restores the caret BEFORE each editor-side commit', () => {
    // The palette holds focus, so `.editor-input` is blurred and Lexical's blur processing can null
    // the selection. Committing first would refuse silently (`commitTypedMarker` returns false,
    // which nothing reads) or land at the document end.
    const order: string[] = [];
    const { options, editor, restoreCaret } = setUp();
    restoreCaret.mockImplementation(() => order.push('restore'));
    editor.commitTypedMarker.mockImplementation(() => order.push('commit'));

    expect(routeMarkerPaletteKey(makeEvent(' '), options)).toBe('routed');
    expect(order).toEqual(['restore', 'commit']);
  });

  it('reopens at the caret after a `\\` commit, and does NOT clear the replacement session', () => {
    // The `\` commit opens a REPLACEMENT session synchronously inside the table call. Clearing
    // unconditionally would kill it.
    const { options, sessionRef, reopenAtCaret, editor } = setUp();
    reopenAtCaret.mockImplementation(() => {
      sessionRef.current = { kind: 'backslash', token: 2, filter: '', items: [] };
      return true;
    });

    expect(routeMarkerPaletteKey(makeEvent('\\'), options)).toBe('routed');
    expect(editor.commitTypedMarker).toHaveBeenCalledWith('wj', { trailingSpace: false });
    expect(reopenAtCaret).toHaveBeenCalledOnce();
    expect(sessionRef.current?.token).toBe(2);
  });

  it('ends the session through the WRITER, not by clearing the ref itself', () => {
    // A baseline describes the editor as THIS session's palette took focus; carrying one into the
    // next session would compare against a stale document and refuse a good commit.
    const { options, sessionRef, baselineRef } = setUp();

    expect(routeMarkerPaletteKey(makeEvent('Escape'), options)).toBe('routed');
    // Routing the clear through the writer is what keeps it the only place settling resumes.
    expect(options.clearSessionIfCurrent).toHaveBeenCalledExactlyOnceWith(1);
    expect(sessionRef.current).toBeUndefined();
    expect(baselineRef.current).toBeUndefined();
  });

  it('keeps the baseline while a replacement session is still open', () => {
    const { options, sessionRef, baselineRef, reopenAtCaret } = setUp();
    reopenAtCaret.mockImplementation(() => {
      sessionRef.current = { kind: 'backslash', token: 2, filter: '', items: [] };
      return true;
    });

    routeMarkerPaletteKey(makeEvent('\\'), options);

    expect(baselineRef.current).toBeDefined();
  });

  it('dismisses the old palette when the `\\` commit cannot open a replacement', () => {
    // Without this the old palette is never retired — the replacement retires it by replacing it —
    // so it stays mounted holding focus over a session the table has already ended, and the user's
    // next keystroke is spent on the orphan. Unlikely (the `\\` list is essentially never empty
    // right after a commit) but one line to rule out.
    const { options, palette, reopenAtCaret } = setUp();
    reopenAtCaret.mockReturnValue(false);

    expect(routeMarkerPaletteKey(makeEvent('\\'), options)).toBe('routed');
    expect(palette.dismiss).toHaveBeenCalledOnce();
  });
});

describe('routeMarkerPaletteKey — the change guard on TYPED commits', () => {
  // The spine asks the guard before a HIGHLIGHTED commit, which comes back through the overlay.
  // Typed commits never go near the spine — they apply straight from the router — so each one is
  // covered here. A consumer with no live close (the footnote popover) has nothing else standing
  // between a changed document and a commit at a stale caret.
  const typedCommitKeys: readonly {
    key: string;
    filter: string;
    applied: keyof ReturnType<typeof setUp>['editor'];
  }[] = [
    { key: ' ', filter: 'wj', applied: 'commitTypedMarker' },
    { key: '*', filter: 'wj', applied: 'commitTypedCloser' },
    { key: '\\', filter: 'wj', applied: 'commitTypedMarker' },
  ];

  typedCommitKeys.forEach(({ key, filter, applied }) => {
    it(`refuses the ${key === ' ' ? 'Space' : key} commit and closes when the editor changed`, () => {
      const { options, editor, palette } = setUp({ filter });
      const changed = { ...options, hasEditorChangedSinceFocus: () => true };

      expect(routeMarkerPaletteKey(makeEvent(key), changed)).toBe('routed');
      expect(editor[applied]).not.toHaveBeenCalled();
      expect(palette.dismiss).toHaveBeenCalled();
    });

    it(`applies the ${key === ' ' ? 'Space' : key} commit when the editor did NOT change`, () => {
      const { options, editor } = setUp({ filter });
      const unchanged = { ...options, hasEditorChangedSinceFocus: () => false };

      expect(routeMarkerPaletteKey(makeEvent(key), unchanged)).toBe('routed');
      expect(editor[applied]).toHaveBeenCalled();
    });
  });

  it('refuses the selection-wrap Space commit when the editor changed', () => {
    const { options, editor, palette } = setUp({ kind: 'selection', filter: 'wj' });
    const changed = { ...options, hasEditorChangedSinceFocus: () => true };

    expect(routeMarkerPaletteKey(makeEvent(' '), changed)).toBe('routed');
    expect(editor.applyMarkerMenuSelection).not.toHaveBeenCalled();
    expect(palette.dismiss).toHaveBeenCalled();
  });

  it('asks the guard BEFORE restoring the caret', () => {
    // Same reason the spine does: the restore writes a selection back, so a guard asked afterwards
    // compares against that write rather than against what the user left.
    const order: string[] = [];
    const { options, restoreCaret } = setUp({ filter: 'wj' });
    restoreCaret.mockImplementation(() => order.push('restore'));
    const guarded = {
      ...options,
      hasEditorChangedSinceFocus: () => {
        order.push('guard');
        return false;
      },
    };

    routeMarkerPaletteKey(makeEvent(' '), guarded);

    expect(order).toEqual(['guard', 'restore']);
  });

  it('applies as before when no guard is supplied', () => {
    const { options, editor } = setUp({ filter: 'wj' });

    expect(routeMarkerPaletteKey(makeEvent(' '), options)).toBe('routed');
    expect(editor.commitTypedMarker).toHaveBeenCalled();
  });
});
