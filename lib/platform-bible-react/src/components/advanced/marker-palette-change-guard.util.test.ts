import { describe, expect, it } from 'vitest';
import {
  captureEditorContentSnapshot,
  hasEditorChanged,
  type EditorContentSnapshot,
} from './marker-palette-change-guard.util';

const snapshot = (content: unknown, caret?: unknown): EditorContentSnapshot | undefined =>
  captureEditorContentSnapshot(
    () => content,
    () => caret,
  );

describe('captureEditorContentSnapshot', () => {
  it('yields undefined when the content cannot be read', () => {
    // An editor that cannot report its content must not produce a baseline, or the guard would
    // compare against nothing and call every later state a change.
    expect(
      captureEditorContentSnapshot(
        () => undefined,
        () => ({ start: 1 }),
      ),
    ).toBeUndefined();
  });

  it('captures content with no caret when the caret cannot be read', () => {
    expect(snapshot({ a: 1 })).toEqual({ content: JSON.stringify({ a: 1 }), caret: undefined });
  });
});

describe('hasEditorChanged', () => {
  it('reports a CONTENT change', () => {
    // The case the guard exists for: a commit applies at the caret, so content that moved under
    // the palette would put the marker somewhere the user never chose.
    expect(hasEditorChanged(snapshot({ v: 'before' }, 1), snapshot({ v: 'after' }, 1))).toBe(true);
  });

  it('reports a CARET move', () => {
    expect(
      hasEditorChanged(snapshot({ v: 1 }, { start: 1 }), snapshot({ v: 1 }, { start: 9 })),
    ).toBe(true);
  });

  it('does NOT treat a caret nulled on blur as a move', () => {
    // Lexical nulls the editor-state selection on blur, which is precisely what happens when the
    // palette takes focus. An absent caret is the normal state while a palette is open; treating
    // it as a change would end every session the moment it opened.
    expect(hasEditorChanged(snapshot({ v: 1 }, { start: 1 }), snapshot({ v: 1 }))).toBe(false);
  });

  it('does not fire when either snapshot is missing', () => {
    // Never block on ignorance — a guard that fires when it cannot see breaks the ordinary commit
    // path, which is worse than not guarding.
    expect(hasEditorChanged(undefined, snapshot({ v: 1 }, 1))).toBe(false);
    expect(hasEditorChanged(snapshot({ v: 1 }, 1), undefined)).toBe(false);
    expect(hasEditorChanged(undefined, undefined)).toBe(false);
  });

  it('is quiet when nothing moved', () => {
    expect(
      hasEditorChanged(snapshot({ v: 1 }, { start: 3 }), snapshot({ v: 1 }, { start: 3 })),
    ).toBe(false);
  });

  it('sees a caret that REAPPEARS somewhere else after the blur null', () => {
    // The realistic shape of the bug: focus leaves (caret readable), the palette opens, something
    // moves the caret, and by commit time it is readable again at a different place.
    const baseline = snapshot({ v: 1 }, { start: { jsonPath: '/a', offset: 2 } });
    const moved = snapshot({ v: 1 }, { start: { jsonPath: '/b', offset: 0 } });
    expect(hasEditorChanged(baseline, moved)).toBe(true);
  });
});
