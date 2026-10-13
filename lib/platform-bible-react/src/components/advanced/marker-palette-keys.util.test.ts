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
  const reopenAtCaret = vi.fn();
  const baselineRef: MutableRefObject<EditorContentSnapshot | undefined> = {
    // Only its presence matters here — this module clears the baseline, never reads inside it
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    current: {} as unknown as EditorContentSnapshot,
  };
  const options = { sessionRef, editorRef, palette, restoreCaret, reopenAtCaret, baselineRef };
  return {
    session,
    sessionRef,
    editor,
    palette,
    restoreCaret,
    reopenAtCaret,
    baselineRef,
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
    });

    expect(routeMarkerPaletteKey(makeEvent('\\'), options)).toBe('routed');
    expect(editor.commitTypedMarker).toHaveBeenCalledWith('wj', { trailingSpace: false });
    expect(reopenAtCaret).toHaveBeenCalledOnce();
    expect(sessionRef.current?.token).toBe(2);
  });

  it('clears the session and the change-guard baseline once the session ends', () => {
    // A baseline describes the editor as THIS session's palette took focus; carrying one into the
    // next session would compare against a stale document and refuse a good commit.
    const { options, sessionRef, baselineRef } = setUp();

    expect(routeMarkerPaletteKey(makeEvent('Escape'), options)).toBe('routed');
    expect(sessionRef.current).toBeUndefined();
    expect(baselineRef.current).toBeUndefined();
  });

  it('keeps the baseline while a replacement session is still open', () => {
    const { options, sessionRef, baselineRef, reopenAtCaret } = setUp();
    reopenAtCaret.mockImplementation(() => {
      sessionRef.current = { kind: 'backslash', token: 2, filter: '', items: [] };
    });

    routeMarkerPaletteKey(makeEvent('\\'), options);

    expect(baselineRef.current).toBeDefined();
  });
});
