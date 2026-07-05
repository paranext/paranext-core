// @vitest-environment jsdom
// The module under test pulls in `getMarkerMenuItems`/`defaultStyleInfo` as real (not type-only)
// imports from `@eten-tech-foundation/platform-editor`, whose bundled entry point touches
// `document` at module-eval time (it re-exports the whole editor, React components and all). The
// default `node` environment (see `vitest.config.ts`) has no `document`, so this file needs jsdom
// — same fix already used by `scripture-pane.test.tsx` and `use-editor-pdp-sync.hook.test.ts` for
// the same package.
import { describe, it, expect, vi } from 'vitest';
import { MutableRefObject } from 'react';
import type {
  EditorRef,
  MarkerMenuItem as EditorMarkerMenuItem,
  StyleInfo,
} from '@eten-tech-foundation/platform-editor';
import {
  clearPaletteSessionIfCurrent,
  generateInlineMarkerMenuListItems,
  markerMenuItemToCommandPaletteItem,
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

    items[0].action?.();
    expect(insertMarker).toHaveBeenCalledWith(items[0].marker);
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

describe('markerMenuItemToCommandPaletteItem', () => {
  it('maps marker to id/label and passes the description through as plain strings', () => {
    const item: EditorMarkerMenuItem = {
      marker: 'q1',
      kind: 'paragraph',
      description: 'Poetry level 1 (basic)',
      isBasic: true,
    };

    expect(markerMenuItemToCommandPaletteItem(item)).toEqual({
      id: 'q1',
      label: 'q1',
      description: 'Poetry level 1 (basic)',
      badge: undefined,
      muted: false,
    });
  });

  it('marks close-tag items with the "end" badge in place (no group key — PT9 ordering governs)', () => {
    const closeTag: EditorMarkerMenuItem = { marker: '+wj*', kind: 'closeTag', isBasic: false };

    const mapped = markerMenuItemToCommandPaletteItem(closeTag);

    expect(mapped.badge).toBe('end');
    expect(mapped.group).toBeUndefined();
  });

  it('does not badge non-close-tag items', () => {
    const charItem: EditorMarkerMenuItem = { marker: 'nd', kind: 'character', isBasic: false };

    expect(markerMenuItemToCommandPaletteItem(charItem).badge).toBeUndefined();
  });

  it('maps non-basic items to muted (PT9 grey cue) and basic items to unmuted', () => {
    const nonBasic: EditorMarkerMenuItem = { marker: 'sig', kind: 'character', isBasic: false };
    const basic: EditorMarkerMenuItem = { marker: 'f', kind: 'note', isBasic: true };

    expect(markerMenuItemToCommandPaletteItem(nonBasic).muted).toBe(true);
    expect(markerMenuItemToCommandPaletteItem(basic).muted).toBe(false);
  });
});

describe('clearPaletteSessionIfCurrent', () => {
  it('clears the session when the token matches the live session', () => {
    const sessionRef: MutableRefObject<{ token: number } | undefined> = {
      current: { token: 3 },
    };

    clearPaletteSessionIfCurrent(sessionRef, 3);

    expect(sessionRef.current).toBeUndefined();
  });

  it('leaves a NEWER session in place when a stale token tries to clear (dismiss/re-trigger race)', () => {
    // Session A (token 1) was dismissed synchronously; session B (token 2) is live when A's
    // show-promise finally settles and runs its async cleanup with A's captured token.
    const sessionB = { token: 2 };
    const sessionRef: MutableRefObject<{ token: number } | undefined> = { current: sessionB };

    clearPaletteSessionIfCurrent(sessionRef, 1);

    expect(sessionRef.current).toBe(sessionB);
  });

  it('no-ops when no session is live', () => {
    const sessionRef: MutableRefObject<{ token: number } | undefined> = { current: undefined };

    clearPaletteSessionIfCurrent(sessionRef, 1);

    expect(sessionRef.current).toBeUndefined();
  });
});
