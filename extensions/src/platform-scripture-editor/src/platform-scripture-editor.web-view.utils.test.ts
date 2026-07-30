// @vitest-environment jsdom
// The module under test pulls in `getMarkerMenuItems`/`defaultStyleInfo` as real (not type-only)
// imports from `@eten-tech-foundation/platform-editor`, whose bundled entry point touches
// `document` at module-eval time (it re-exports the whole editor, React components and all). The
// default `node` environment (see `vitest.config.ts`) has no `document`, so this file needs jsdom
// — same fix already used by `scripture-pane.test.tsx` and `use-editor-pdp-sync.hook.test.ts` for
// the same package.
import { describe, it, expect, vi } from 'vitest';
import { MutableRefObject } from 'react';
import type { EditorRef, SelectionRange, StyleInfo } from '@eten-tech-foundation/platform-editor';
import {
  generateInlineMarkerMenuListItems,
  isStandardViewEnterKeyEvent,
  restoreSelectionIfLost,
  transientInputForPaletteSession,
} from './platform-scripture-editor.web-view.utils';

/** Build a mock editor ref exposing a spy for the method the generator calls. */
function makeMockEditorRef() {
  const insertMarker = vi.fn();
  // Mock literal cannot satisfy the full EditorRef interface — cast for test isolation.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const ref = {
    current: { insertMarker },
  } as unknown as MutableRefObject<EditorRef | null>;
  return { ref, insertMarker };
}

describe('generateInlineMarkerMenuListItems', () => {
  const PARENT = 'p';
  const noop = () => {};

  // Minimal project-stylesheet fixture (as if merged from usfm.sty + custom.sty and serialized by
  // the host): 'p' the parent paragraph, 'v' a verse marker (the library classifies it as
  // styleType "character", but `isBlockMarker` special-cases 'v' as structural — same as PT9), 'f'
  // a note marker, and 'nd' a plain inline character marker. `wj` is deliberately absent here and
  // added back per-test to exercise stylesheet-driven inclusion/exclusion.
  const BASE_STYLE_INFO: StyleInfo = {
    markers: {
      p: { marker: 'p', styleType: 'paragraph' },
      v: { marker: 'v', styleType: 'character' },
      f: { marker: 'f', styleType: 'note', endMarker: 'f*', description: 'A Footnote text item' },
      nd: { marker: 'nd', styleType: 'character', description: 'For name of deity' },
    },
  };

  it('when protected: block-marker item (v) is disallowed and its action notifies without inserting', () => {
    const { ref, insertMarker } = makeMockEditorRef();
    const notify = vi.fn();
    const close = vi.fn();
    const items = generateInlineMarkerMenuListItems(
      ref,
      close,
      {},
      true,
      notify,
      PARENT,
      BASE_STYLE_INFO,
    );

    const blockItem = items.find((i) => i.marker === 'v');
    expect(blockItem?.isDisallowed).toBe(true);

    blockItem?.action?.();
    expect(notify).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(1);
    expect(insertMarker).not.toHaveBeenCalled();
  });

  it('when protected: inline-marker item (f) is allowed and its action inserts', () => {
    const { ref, insertMarker } = makeMockEditorRef();
    const notify = vi.fn();
    const close = vi.fn();
    const items = generateInlineMarkerMenuListItems(
      ref,
      close,
      {},
      true,
      notify,
      PARENT,
      BASE_STYLE_INFO,
    );

    const inlineItem = items.find((i) => i.marker === 'f');
    expect(inlineItem?.isDisallowed).toBeFalsy();

    inlineItem?.action?.();
    expect(insertMarker).toHaveBeenCalledWith('f');
    expect(notify).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('when not protected: no item is disallowed and all actions insert', () => {
    const { ref, insertMarker } = makeMockEditorRef();
    const notify = vi.fn();
    const close = vi.fn();
    const items = generateInlineMarkerMenuListItems(
      ref,
      close,
      {},
      false,
      notify,
      PARENT,
      BASE_STYLE_INFO,
    );

    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => !i.isDisallowed)).toBe(true);

    items.forEach((item) => item.action?.());
    expect(insertMarker).toHaveBeenCalledTimes(items.length);
    items.forEach((item) => expect(insertMarker).toHaveBeenCalledWith(item.marker));
    expect(notify).not.toHaveBeenCalled();
  });

  it('returns [] when there is no parent marker', () => {
    const { ref } = makeMockEditorRef();
    expect(generateInlineMarkerMenuListItems(ref, noop, {}, false, vi.fn())).toEqual([]);
  });

  it('titles fall back to the raw stylesheet description, or the marker code when no description is given', () => {
    const { ref } = makeMockEditorRef();
    const items = generateInlineMarkerMenuListItems(
      ref,
      noop,
      {},
      false,
      vi.fn(),
      PARENT,
      BASE_STYLE_INFO,
    );

    expect(items.find((i) => i.marker === 'f')?.title).toBe('A Footnote text item');
    expect(items.find((i) => i.marker === 'v')?.title).toBe('v');
  });

  it('localizes a description that is a localize key through localizedStrings', () => {
    const { ref } = makeMockEditorRef();
    const withLocalizeKeyDescription: StyleInfo = {
      markers: {
        ...BASE_STYLE_INFO.markers,
        nd: { marker: 'nd', styleType: 'character', description: '%marker_nd_description%' },
      },
    };
    const items = generateInlineMarkerMenuListItems(
      ref,
      noop,
      { '%marker_nd_description%': 'For name of deity (localized)' },
      false,
      vi.fn(),
      PARENT,
      withLocalizeKeyDescription,
    );

    expect(items.find((i) => i.marker === 'nd')?.title).toBe('For name of deity (localized)');
  });

  it('falls back to the raw localize key when localizedStrings has no entry for it', () => {
    const { ref } = makeMockEditorRef();
    const withLocalizeKeyDescription: StyleInfo = {
      markers: {
        ...BASE_STYLE_INFO.markers,
        nd: { marker: 'nd', styleType: 'character', description: '%marker_nd_description%' },
      },
    };
    const items = generateInlineMarkerMenuListItems(
      ref,
      noop,
      {},
      false,
      vi.fn(),
      PARENT,
      withLocalizeKeyDescription,
    );

    expect(items.find((i) => i.marker === 'nd')?.title).toBe('%marker_nd_description%');
  });

  it('omits a marker the supplied project stylesheet does not define (project-invalid)', () => {
    const { ref } = makeMockEditorRef();
    const items = generateInlineMarkerMenuListItems(
      ref,
      noop,
      {},
      false,
      vi.fn(),
      PARENT,
      BASE_STYLE_INFO,
    );

    expect(items.some((i) => i.marker === 'wj')).toBe(false);
  });

  it('includes a marker once the supplied stylesheet defines it (custom.sty addition)', () => {
    const { ref } = makeMockEditorRef();
    const withCustomMarker: StyleInfo = {
      markers: {
        ...BASE_STYLE_INFO.markers,
        wj: { marker: 'wj', styleType: 'character', description: 'For marking the words of Jesus' },
      },
    };
    const items = generateInlineMarkerMenuListItems(
      ref,
      noop,
      {},
      false,
      vi.fn(),
      PARENT,
      withCustomMarker,
    );

    expect(items.some((i) => i.marker === 'wj')).toBe(true);
  });

  it('falls back to the bundled default stylesheet when no project styleInfo is supplied', () => {
    const { ref } = makeMockEditorRef();
    const items = generateInlineMarkerMenuListItems(ref, noop, {}, false, vi.fn(), PARENT);

    // The bundled usfm.sty defines far more inline/note markers under 'p' than the minimal test
    // fixture above, so this can only pass if the no-styleInfo path is actually wired up.
    expect(items.length).toBeGreaterThan(Object.keys(BASE_STYLE_INFO.markers).length);
    expect(items.some((i) => i.marker === 'wj')).toBe(true);
  });
});

describe('isStandardViewEnterKeyEvent', () => {
  it('claims a plain Enter', () => {
    expect(isStandardViewEnterKeyEvent(new KeyboardEvent('keydown', { key: 'Enter' }))).toBe(true);
  });

  it('claims Enter regardless of modifier state (PT9 parity: no modifier check)', () => {
    expect(
      isStandardViewEnterKeyEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true })),
    ).toBe(true);
    expect(
      isStandardViewEnterKeyEvent(new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true })),
    ).toBe(true);
    expect(
      isStandardViewEnterKeyEvent(new KeyboardEvent('keydown', { key: 'Enter', altKey: true })),
    ).toBe(true);
    expect(
      isStandardViewEnterKeyEvent(new KeyboardEvent('keydown', { key: 'Enter', metaKey: true })),
    ).toBe(true);
    expect(
      isStandardViewEnterKeyEvent(
        new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true, shiftKey: true }),
      ),
    ).toBe(true);
  });

  it('never claims non-Enter keys, modified or not', () => {
    expect(isStandardViewEnterKeyEvent(new KeyboardEvent('keydown', { key: 'a' }))).toBe(false);
    expect(isStandardViewEnterKeyEvent(new KeyboardEvent('keydown', { key: '\\' }))).toBe(false);
    expect(
      isStandardViewEnterKeyEvent(new KeyboardEvent('keydown', { key: 'Escape', ctrlKey: true })),
    ).toBe(false);
  });
});

describe('restoreSelectionIfLost', () => {
  const snapshot: SelectionRange = { start: { jsonPath: '$.content[0].content[1]', offset: 4 } };

  /** Editor stub exposing only the two selection methods the helper consults. */
  function makeEditor(liveSelection: SelectionRange | undefined) {
    return {
      getSelection: vi.fn((): SelectionRange | undefined => liveSelection),
      setSelection: vi.fn(),
    };
  }

  it('restores the snapshot when the live selection is gone', () => {
    const editor = makeEditor(undefined);

    restoreSelectionIfLost(editor, snapshot);

    expect(editor.setSelection).toHaveBeenCalledTimes(1);
    expect(editor.setSelection).toHaveBeenCalledWith(snapshot);
  });

  it('leaves a live selection completely alone', () => {
    const liveSelection: SelectionRange = {
      start: { jsonPath: '$.content[2].content[0]', offset: 0 },
    };
    const editor = makeEditor(liveSelection);

    restoreSelectionIfLost(editor, snapshot);

    expect(editor.setSelection).not.toHaveBeenCalled();
  });

  it('does nothing when the selection is gone but no snapshot was captured', () => {
    const editor = makeEditor(undefined);

    restoreSelectionIfLost(editor, undefined);

    expect(editor.setSelection).not.toHaveBeenCalled();
  });

  it('tolerates a null editor handle (ref not mounted)', () => {
    // `editorRef.current` is genuinely `null` before the editor mounts — the exact value under test
    // eslint-disable-next-line no-null/no-null
    expect(() => restoreSelectionIfLost(null, snapshot)).not.toThrow();
  });
});

describe('transientInputForPaletteSession', () => {
  // Only the PASSIVE backslash session leaves bytes in the document: its `\` and every filter
  // character land as literal text. Focused sessions claim their keys, so there is nothing in the
  // document to declare.
  it('declares the trigger plus the current filter for a passive backslash session', () => {
    expect(transientInputForPaletteSession({ kind: 'backslash', filter: '' })).toEqual({
      kind: 'marker-literal',
      run: '\\',
    });
    expect(transientInputForPaletteSession({ kind: 'backslash', filter: 'q1' })).toEqual({
      kind: 'marker-literal',
      run: '\\q1',
    });
  });

  it('declares nothing for focused sessions or no session at all', () => {
    expect(transientInputForPaletteSession({ kind: 'enter', filter: 'q1' })).toBeUndefined();
    expect(transientInputForPaletteSession({ kind: 'selection', filter: 'nd' })).toBeUndefined();
    expect(transientInputForPaletteSession(undefined)).toBeUndefined();
  });
});
