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
import { isLocalizeKey } from 'platform-bible-utils';
import {
  generateInlineMarkerMenuListItems,
  markerMenuItemsToResolvedPaletteItems,
  parseCallerSequenceSetting,
  resolveEditingSessionActivity,
  resolveFootnotesPaneAutoVisibility,
  restoreSelectionIfLost,
  shouldSpaceCommitNoteMarker,
  STALE_NOTE_EDITING_SESSION_MS,
  type FootnotesPaneAutoVisibilityInput,
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
      undefined,
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
      undefined,
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
      undefined,
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

  it('restores the caret before inserting, so a pick made after the menu took focus still lands', () => {
    const { ref, insertMarker } = makeMockEditorRef();
    const restoreSelection = vi.fn();
    const items = generateInlineMarkerMenuListItems(
      ref,
      vi.fn(),
      {},
      false,
      vi.fn(),
      restoreSelection,
      PARENT,
      BASE_STYLE_INFO,
    );

    items[0].action?.();

    expect(restoreSelection).toHaveBeenCalledTimes(1);
    expect(insertMarker).toHaveBeenCalledWith(items[0].marker);
    // Order is the whole point: this menu focuses its own search input on open, which can leave
    // the editor with no selection — restoring after the insert would be too late to place it.
    expect(restoreSelection.mock.invocationCallOrder[0]).toBeLessThan(
      insertMarker.mock.invocationCallOrder[0],
    );
  });

  it('when protected: does not restore the caret either (nothing is inserted)', () => {
    const { ref, insertMarker } = makeMockEditorRef();
    const restoreSelection = vi.fn();
    const items = generateInlineMarkerMenuListItems(
      ref,
      vi.fn(),
      {},
      true,
      vi.fn(),
      restoreSelection,
      PARENT,
      BASE_STYLE_INFO,
    );

    items.find((item) => item.isDisallowed)?.action?.();

    expect(restoreSelection).not.toHaveBeenCalled();
    expect(insertMarker).not.toHaveBeenCalled();
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
      undefined,
      PARENT,
      BASE_STYLE_INFO,
    );

    expect(items.find((i) => i.marker === 'f')?.title).toBe('A Footnote text item');
    expect(items.find((i) => i.marker === 'v')?.title).toBe('v');
  });

  it('prefers the bundled markerMenu LocalizeKey over the stylesheet description when loaded', () => {
    const { ref } = makeMockEditorRef();
    const items = generateInlineMarkerMenuListItems(
      ref,
      noop,
      { '%markerMenu_marker_f_description%': 'Fußnote (übersetzt)' },
      false,
      vi.fn(),
      undefined,
      PARENT,
      BASE_STYLE_INFO,
    );

    // The translated markerMenu_marker_* strings are the PRIMARY title source; the raw
    // stylesheet Description only fills in for markers with no loaded LocalizeKey — which is
    // what custom.sty markers rely on.
    expect(items.find((i) => i.marker === 'f')?.title).toBe('Fußnote (übersetzt)');
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
      undefined,
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
      undefined,
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
      undefined,
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
      undefined,
      PARENT,
      withCustomMarker,
    );

    expect(items.some((i) => i.marker === 'wj')).toBe(true);
  });

  it('falls back to the bundled default stylesheet when no project styleInfo is supplied', () => {
    const { ref } = makeMockEditorRef();
    const items = generateInlineMarkerMenuListItems(
      ref,
      noop,
      {},
      false,
      vi.fn(),
      undefined,
      PARENT,
    );

    // The bundled usfm.sty defines far more inline/note markers under 'p' than the minimal test
    // fixture above, so this can only pass if the no-styleInfo path is actually wired up.
    expect(items.length).toBeGreaterThan(Object.keys(BASE_STYLE_INFO.markers).length);
    expect(items.some((i) => i.marker === 'wj')).toBe(true);
  });
});

describe('resolveFootnotesPaneAutoVisibility', () => {
  const GENESIS_1 = 'GEN|1';
  const GENESIS_2 = 'GEN|2';

  /** Auto-show on, Standard view, current chapter has notes, no manual override in play. */
  const AUTO_SHOWING: FootnotesPaneAutoVisibilityInput = {
    isAutoShowEnabled: true,
    viewType: 'standard',
    chapterHasNotes: true,
    manualOverrideChapterKey: undefined,
    currentChapterKey: GENESIS_1,
  };

  it('shows the pane when the chapter has notes', () => {
    expect(resolveFootnotesPaneAutoVisibility(AUTO_SHOWING)).toBe(true);
  });

  it('hides the pane when the chapter has no notes', () => {
    expect(resolveFootnotesPaneAutoVisibility({ ...AUTO_SHOWING, chapterHasNotes: false })).toBe(
      false,
    );
  });

  it('has no opinion while auto-show is off, so the pane keeps whatever the user set', () => {
    expect(
      resolveFootnotesPaneAutoVisibility({ ...AUTO_SHOWING, isAutoShowEnabled: false }),
    ).toBeUndefined();
    expect(
      resolveFootnotesPaneAutoVisibility({
        ...AUTO_SHOWING,
        isAutoShowEnabled: false,
        chapterHasNotes: false,
      }),
    ).toBeUndefined();
  });

  it('has no opinion outside Standard view, whatever the chapter holds', () => {
    expect(
      resolveFootnotesPaneAutoVisibility({ ...AUTO_SHOWING, viewType: 'markers' }),
    ).toBeUndefined();
    expect(
      resolveFootnotesPaneAutoVisibility({ ...AUTO_SHOWING, viewType: 'formatted' }),
    ).toBeUndefined();
    expect(
      resolveFootnotesPaneAutoVisibility({
        ...AUTO_SHOWING,
        viewType: 'markers',
        chapterHasNotes: false,
      }),
    ).toBeUndefined();
  });

  it('lets a manual show/hide in the current chapter win over the auto decision', () => {
    // The user hid the pane in a chapter that HAS notes: auto would show it, and must not.
    expect(
      resolveFootnotesPaneAutoVisibility({
        ...AUTO_SHOWING,
        manualOverrideChapterKey: GENESIS_1,
      }),
    ).toBeUndefined();
    // ...and the mirror image: shown by hand in a chapter with no notes, auto must not hide it.
    expect(
      resolveFootnotesPaneAutoVisibility({
        ...AUTO_SHOWING,
        chapterHasNotes: false,
        manualOverrideChapterKey: GENESIS_1,
      }),
    ).toBeUndefined();
  });

  it('resumes the auto decision once a chapter change leaves the override behind', () => {
    const overriddenInPreviousChapter: FootnotesPaneAutoVisibilityInput = {
      ...AUTO_SHOWING,
      manualOverrideChapterKey: GENESIS_1,
      currentChapterKey: GENESIS_2,
    };

    expect(resolveFootnotesPaneAutoVisibility(overriddenInPreviousChapter)).toBe(true);
    expect(
      resolveFootnotesPaneAutoVisibility({
        ...overriddenInPreviousChapter,
        chapterHasNotes: false,
      }),
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

describe('resolveEditingSessionActivity', () => {
  const NOW = 1_000_000;

  it('keeps deferring for a fresh note-editing session', () => {
    const activity = resolveEditingSessionActivity({
      hasPaletteSession: false,
      editingNoteKey: 'note-key-1',
      noteSessionRefreshedAtMs: NOW - 1_000,
      nowMs: NOW,
    });
    expect(activity).toEqual({ isActive: true, isNoteSessionStale: false });
  });

  it('keeps deferring right up to the staleness bound, and stops exactly at it', () => {
    const justInside = resolveEditingSessionActivity({
      hasPaletteSession: false,
      editingNoteKey: 'note-key-1',
      noteSessionRefreshedAtMs: NOW - (STALE_NOTE_EDITING_SESSION_MS - 1),
      nowMs: NOW,
    });
    expect(justInside).toEqual({ isActive: true, isNoteSessionStale: false });

    const atBound = resolveEditingSessionActivity({
      hasPaletteSession: false,
      editingNoteKey: 'note-key-1',
      noteSessionRefreshedAtMs: NOW - STALE_NOTE_EDITING_SESSION_MS,
      nowMs: NOW,
    });
    expect(atBound).toEqual({ isActive: false, isNoteSessionStale: true });
  });

  it('a popover edit or save refreshes the clock, so a live long edit is never reaped', () => {
    // Session opened long ago, but the user interacted with the popover recently. The web view
    // stamps the refresh timestamp on every edit inside the popover (FootnoteEditor's onNoteEdit)
    // and on every save that reaches the parent editor, and that refresh timestamp (not the open
    // timestamp) is what the caller passes in — any refresh younger than the bound keeps the
    // session active.
    const activity = resolveEditingSessionActivity({
      hasPaletteSession: false,
      editingNoteKey: 'note-key-1',
      noteSessionRefreshedAtMs: NOW - 5_000,
      nowMs: NOW,
    });
    expect(activity).toEqual({ isActive: true, isNoteSessionStale: false });
  });

  it('treats an open session with no recorded time as stale (cannot prove it is live)', () => {
    const activity = resolveEditingSessionActivity({
      hasPaletteSession: false,
      editingNoteKey: 'note-key-1',
      noteSessionRefreshedAtMs: undefined,
      nowMs: NOW,
    });
    expect(activity).toEqual({ isActive: false, isNoteSessionStale: true });
  });

  it('is inactive with no palette session and no note session', () => {
    const activity = resolveEditingSessionActivity({
      hasPaletteSession: false,
      editingNoteKey: undefined,
      noteSessionRefreshedAtMs: undefined,
      nowMs: NOW,
    });
    expect(activity).toEqual({ isActive: false, isNoteSessionStale: false });
  });

  it('a palette session keeps the deferral active with no time bound of its own', () => {
    const activity = resolveEditingSessionActivity({
      hasPaletteSession: true,
      editingNoteKey: undefined,
      noteSessionRefreshedAtMs: undefined,
      nowMs: NOW,
    });
    expect(activity).toEqual({ isActive: true, isNoteSessionStale: false });
  });

  it('still reports a stale note session for cleanup even while a palette session stays active', () => {
    const activity = resolveEditingSessionActivity({
      hasPaletteSession: true,
      editingNoteKey: 'note-key-1',
      noteSessionRefreshedAtMs: NOW - STALE_NOTE_EDITING_SESSION_MS - 1,
      nowMs: NOW,
    });
    expect(activity).toEqual({ isActive: true, isNoteSessionStale: true });
  });
});

describe('markerMenuItemsToResolvedPaletteItems', () => {
  it('resolves the close-tag badge LocalizeKey to its localized string', () => {
    const items = markerMenuItemsToResolvedPaletteItems(
      [{ marker: 'wj*', kind: 'closeTag', isBasic: true }],
      { '%markerMenu_endTag_label%': 'End' },
    );
    expect(items).toHaveLength(1);
    expect(items[0].badge).toBe('End');
  });

  it('produces items with NO unresolved LocalizeKey text, so the palette request skips the localization await', () => {
    const items = markerMenuItemsToResolvedPaletteItems(
      [
        { marker: 'wj*', kind: 'closeTag', isBasic: true },
        { marker: 'nd', kind: 'character', isBasic: false, description: 'Name of God' },
        { marker: 'f', kind: 'note', isBasic: true, description: 'Footnote' },
      ],
      { '%markerMenu_endTag_label%': 'End' },
    );
    const textValues = items.flatMap((item) =>
      [item.label, item.description, item.badge].filter((value) => value !== undefined),
    );
    expect(textValues.length).toBeGreaterThan(0);
    expect(textValues.filter((value) => isLocalizeKey(value))).toEqual([]);
  });

  it('keeps raw key text for a key the strings map does not know (same fallback the overlay host applies)', () => {
    const items = markerMenuItemsToResolvedPaletteItems(
      [{ marker: 'wj*', kind: 'closeTag', isBasic: true }],
      {},
    );
    expect(items[0].badge).toBe('%markerMenu_endTag_label%');
  });

  it('passes plain-string fields through unchanged', () => {
    const items = markerMenuItemsToResolvedPaletteItems(
      [{ marker: 'nd', kind: 'character', isBasic: false, description: 'Name of God' }],
      { '%markerMenu_endTag_label%': 'End' },
    );
    expect(items[0]).toMatchObject({
      id: 'nd',
      label: 'nd',
      description: 'Name of God',
      muted: true,
    });
    expect(items[0].badge).toBeUndefined();
  });
});

describe('shouldSpaceCommitNoteMarker', () => {
  const items = [
    { kind: 'note', marker: 'f' },
    { kind: 'character', marker: 'nd' },
  ] as const;

  it('is true when the typed filter names an offered note marker', () => {
    expect(shouldSpaceCommitNoteMarker(items, 'f')).toBe(true);
  });

  it('matches case-insensitively — `\\F` + Space must hit the same exception `\\f` does', () => {
    expect(shouldSpaceCommitNoteMarker(items, 'F')).toBe(true);
  });

  it('strips the `+` nesting prefix from the typed filter, like every other matching site', () => {
    expect(shouldSpaceCommitNoteMarker(items, '+f')).toBe(true);
  });

  it('is false for non-note markers and for filters that only prefix a note marker', () => {
    expect(shouldSpaceCommitNoteMarker(items, 'nd')).toBe(false);
    expect(shouldSpaceCommitNoteMarker(items, '')).toBe(false);
    expect(shouldSpaceCommitNoteMarker([{ kind: 'note', marker: 'fe' }], 'f')).toBe(false);
  });
});

describe('parseCallerSequenceSetting', () => {
  it('splits a space-separated sequence into individual callers', () => {
    expect(parseCallerSequenceSetting('a b c')).toEqual(['a', 'b', 'c']);
  });

  it('drops empty entries from extra/leading/trailing whitespace (PT9 GetNthCaller splits with RemoveEmptyEntries)', () => {
    expect(parseCallerSequenceSetting('  a   b\tc ')).toEqual(['a', 'b', 'c']);
  });

  it('returns undefined for an empty or whitespace-only value so callers apply their own PT9 default', () => {
    expect(parseCallerSequenceSetting('')).toBeUndefined();
    expect(parseCallerSequenceSetting('   ')).toBeUndefined();
  });

  it('keeps multi-character and non-Latin callers verbatim', () => {
    expect(parseCallerSequenceSetting('๑ ๒ ๓')).toEqual(['๑', '๒', '๓']);
    expect(parseCallerSequenceSetting('aa bb')).toEqual(['aa', 'bb']);
  });
});
