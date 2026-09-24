// @vitest-environment jsdom
// The module under test value-imports `platform-bible-react`, whose bundled entry point touches
// `document` at module-eval time (it re-exports the whole component library). The default `node`
// environment (see `vitest.config.ts`) has no `document`, so this file needs jsdom — same fix
// already used by `scripture-pane.test.tsx` and `use-editor-pdp-sync.hook.test.ts`.
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MutableRefObject } from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { EditorRef, SelectionRange } from '@eten-tech-foundation/platform-editor';
import { isBlockMarker, isLocalizeKey } from 'platform-bible-utils';
import {
  CONTEXT_MENU_ACTION_TO_NOTE_KIND,
  createInsertContextMenuItems,
  isEditorContextMenuOpen,
  generateInlineMarkerMenuListItems,
  getChapterKey,
  INSERT_CONTEXT_MENU_STRING_KEYS,
  insertNoteAtCurrentSelectionCore,
  markerMenuItemsToResolvedPaletteItems,
  noteKindForCtrlTChord,
  NOTE_INSERT_CONFIG,
  parseCallerSequenceSetting,
  resolveEditingSessionActivity,
  resolveFootnotesPaneAutoVisibility,
  restoreSelectionIfLost,
  shouldSkipNoteInsert,
  shouldSpaceCommitNoteMarker,
  STALE_NOTE_EDITING_SESSION_MS,
  type FootnotesPaneAutoVisibilityInput,
} from './platform-scripture-editor.web-view.utils';

// insertNoteAtCurrentSelectionCore logs its read-only/no-editor skip through `logger.debug`; the
// shared `@papi/frontend` mock exports no `logger`, so the skip path needs its own, same as
// use-open-find-shortcut.hook.test.ts. Hoisted so the vi.mock factory below can reference it (the
// factory is hoisted above imports).
const { loggerDebug } = vi.hoisted(() => ({ loggerDebug: vi.fn() }));
vi.mock('@papi/frontend', () => ({
  default: {},
  logger: { debug: loggerDebug },
}));

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
  // The 'p' parent's children include block markers (e.g. 'q' poetry, 's1' section heading) and
  // inline markers (e.g. 'f' footnote, 'x' cross-reference) against the real usfmMarkers data.
  const PARENT = 'p';
  const noop = () => {};

  it('offers both block and inline markers for the parent', () => {
    const { ref } = makeMockEditorRef();
    const markers = generateInlineMarkerMenuListItems(
      ref,
      noop,
      {},
      false,
      vi.fn(),
      undefined,
      PARENT,
    ).map((item) => item.marker ?? '');

    // The menu is the one place a user can reach either kind from the keyboard, so both have to be
    // there: 'nd'/'wj' character styles, 'f'/'x' notes, 'p'/'q'/'s1' block styles.
    expect(markers).toEqual(expect.arrayContaining(['nd', 'wj', 'f', 'x', 'p', 'q', 's1']));
    expect(markers.filter((marker) => isBlockMarker(marker)).length).toBeGreaterThan(0);
    expect(markers.filter((marker) => !isBlockMarker(marker)).length).toBeGreaterThan(0);
  });

  it('offers only the markers the parent declares as children', () => {
    const { ref } = makeMockEditorRef();
    const markers = generateInlineMarkerMenuListItems(
      ref,
      noop,
      {},
      false,
      vi.fn(),
      undefined,
      PARENT,
    ).map((item) => item.marker);

    // Parent-scoped, not the whole marker table: 'p' declares no introduction markers, and a menu
    // that offered them would be listing markers that cannot occur here.
    expect(markers).not.toContain('ip');
    expect(markers).not.toContain('imt');
  });

  it('sorts by marker code', () => {
    const { ref } = makeMockEditorRef();
    const markers = generateInlineMarkerMenuListItems(
      ref,
      noop,
      {},
      false,
      vi.fn(),
      undefined,
      PARENT,
    ).map((item) => item.marker ?? '');

    expect(markers).toEqual([...markers].sort((a, b) => a.localeCompare(b)));
  });

  it('returns [] for a parent with no children, so the menu never opens empty', () => {
    const { ref } = makeMockEditorRef();
    // 'nd' is a leaf character marker — nothing can be inserted under it.
    expect(
      generateInlineMarkerMenuListItems(ref, noop, {}, false, vi.fn(), undefined, 'nd'),
    ).toEqual([]);
  });

  it('when protected: block-marker item is disallowed and its action notifies without inserting', () => {
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
    );

    const blockItem = items.find((i) => i.marker === 'q');
    expect(blockItem?.isDisallowed).toBe(true);

    blockItem?.action?.();
    expect(notify).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledTimes(1);
    expect(insertMarker).not.toHaveBeenCalled();
  });

  it('when protected: inline-marker item is allowed and its action inserts', () => {
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
    );

    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => !i.isDisallowed)).toBe(true);

    items[0].action?.();
    expect(insertMarker).toHaveBeenCalledWith(items[0].marker);
    expect(notify).not.toHaveBeenCalled();
  });

  it('localizes marker titles, falling back to the raw localize key when not loaded', () => {
    const { ref } = makeMockEditorRef();
    const items = generateInlineMarkerMenuListItems(
      ref,
      noop,
      { '%markerMenu_marker_f_description%': 'Fußnote (übersetzt)' },
      false,
      vi.fn(),
      undefined,
      PARENT,
    );

    expect(items.find((i) => i.marker === 'f')?.title).toBe('Fußnote (übersetzt)');
    expect(items.find((i) => i.marker === 'nd')?.title).toBe('%markerMenu_marker_nd_description%');
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
    );

    items.find((item) => item.isDisallowed)?.action?.();

    expect(restoreSelection).not.toHaveBeenCalled();
    expect(insertMarker).not.toHaveBeenCalled();
  });

  it('returns [] when there is no parent marker', () => {
    const { ref } = makeMockEditorRef();
    expect(generateInlineMarkerMenuListItems(ref, noop, {}, false, vi.fn())).toEqual([]);
  });
});

describe('getChapterKey', () => {
  it('is stable for identical inputs', () => {
    expect(getChapterKey('GEN', 1, 'English')).toBe(getChapterKey('GEN', 1, 'English'));
  });

  it('differs across book and chapter', () => {
    expect(getChapterKey('GEN', 1, 'English')).not.toBe(getChapterKey('EXO', 1, 'English'));
    expect(getChapterKey('GEN', 1, 'English')).not.toBe(getChapterKey('GEN', 2, 'English'));
  });

  // A versification change re-selects the chapter document just as a chapter switch does, so it
  // must change the key too — otherwise a pending debounced save scheduled under the old
  // versification fires as a "same chapter" save through the NEW versification's save function.
  it('differs when only the versification differs', () => {
    expect(getChapterKey('GEN', 1, 'English')).not.toBe(getChapterKey('GEN', 1, 'Septuagint'));
    expect(getChapterKey('GEN', 1, 'English')).not.toBe(getChapterKey('GEN', 1, undefined));
  });
});

describe('resolveFootnotesPaneAutoVisibility', () => {
  const GENESIS_1 = 'GEN|1';
  const GENESIS_2 = 'GEN|2';

  /** Auto-show on, current chapter has notes, no manual override in play. */
  const AUTO_SHOWING: FootnotesPaneAutoVisibilityInput = {
    isAutoShowEnabled: true,
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

describe('NOTE_INSERT_CONFIG', () => {
  // Per-kind, not aggregate: a table iterated in bulk can't tell a cross-wired entry (e.g. the
  // endnote kind reusing the footnote's marker or commit-message key) from a correct one. Each
  // case pins its OWN kind's fields against the other two kinds' values, so a swap fails here.
  it.each([
    ['insertFootnoteAtSelection', 'f', '%versionHistoryCommit_beforeInsertFootnote%'],
    ['insertCrossReferenceAtSelection', 'x', '%versionHistoryCommit_beforeInsertCrossReference%'],
    ['insertEndnoteAtSelection', 'fe', '%versionHistoryCommit_beforeInsertEndnote%'],
  ] as const)(
    '%s maps to marker %s and commit-message key %s',
    (kind, marker, commitMessageKey) => {
      expect(NOTE_INSERT_CONFIG[kind].marker).toBe(marker);
      expect(NOTE_INSERT_CONFIG[kind].commitMessageKey).toBe(commitMessageKey);
    },
  );

  it('gives each kind a distinct marker, commit-message key, and edit description', () => {
    const configs = Object.values(NOTE_INSERT_CONFIG);
    const markers = configs.map((config) => config.marker);
    const commitMessageKeys = configs.map((config) => config.commitMessageKey);
    const editDescriptions = configs.map((config) => config.editDescription);

    expect(new Set(markers).size).toBe(configs.length);
    expect(new Set(commitMessageKeys).size).toBe(configs.length);
    expect(new Set(editDescriptions).size).toBe(configs.length);
  });
});

describe('shouldSkipNoteInsert', () => {
  it('skips when there is no mounted editor', () => {
    expect(shouldSkipNoteInsert(false, false)).toBe(true);
  });

  it('skips when the editor is read-only', () => {
    expect(shouldSkipNoteInsert(true, true)).toBe(true);
  });

  it('does not skip with a mounted, writable editor', () => {
    expect(shouldSkipNoteInsert(true, false)).toBe(false);
  });
});

describe('insertNoteAtCurrentSelectionCore', () => {
  // Resolves every kind's commit-message key to a traceable `LOC:<key>` string, same convention as
  // the localized-strings stub further down this file.
  const localizedStrings = Object.fromEntries(
    Object.values(NOTE_INSERT_CONFIG).map((config) => [
      config.commitMessageKey,
      `LOC:${config.commitMessageKey}`,
    ]),
  );

  /** A fresh pair of spies plus a shared call log, so ORDER between them is observable. */
  function makeDeps() {
    const calls: string[] = [];
    const insertMarker = vi.fn((marker: string) => {
      calls.push(`insertMarker:${marker}`);
    });
    const commitSnapshot = vi.fn(async (message: string) => {
      calls.push(`commitSnapshot:${message}`);
    });
    return { calls, insertMarker, commitSnapshot };
  }

  // Falsifiability: this must go RED if the read-only check is deleted or moved below the
  // snapshot — verified by hand against a temporarily reordered/deleted implementation.
  it('skips both the snapshot and the marker insert when read-only', async () => {
    const { calls, insertMarker, commitSnapshot } = makeDeps();
    await insertNoteAtCurrentSelectionCore(
      'insertFootnoteAtSelection',
      true,
      true,
      insertMarker,
      commitSnapshot,
      localizedStrings,
    );
    expect(calls).toEqual([]);
    expect(commitSnapshot).not.toHaveBeenCalled();
    expect(insertMarker).not.toHaveBeenCalled();
  });

  it('skips both the snapshot and the marker insert with no mounted editor', async () => {
    const { calls, insertMarker, commitSnapshot } = makeDeps();
    await insertNoteAtCurrentSelectionCore(
      'insertFootnoteAtSelection',
      false,
      false,
      insertMarker,
      commitSnapshot,
      localizedStrings,
    );
    expect(calls).toEqual([]);
    expect(commitSnapshot).not.toHaveBeenCalled();
    expect(insertMarker).not.toHaveBeenCalled();
  });

  it('commits the snapshot with the kind’s commit message BEFORE inserting the marker when editable', async () => {
    const { calls, insertMarker, commitSnapshot } = makeDeps();
    await insertNoteAtCurrentSelectionCore(
      'insertEndnoteAtSelection',
      true,
      false,
      insertMarker,
      commitSnapshot,
      localizedStrings,
    );
    expect(calls).toEqual([
      `commitSnapshot:LOC:${NOTE_INSERT_CONFIG.insertEndnoteAtSelection.commitMessageKey}`,
      `insertMarker:${NOTE_INSERT_CONFIG.insertEndnoteAtSelection.marker}`,
    ]);
  });
});

describe('CONTEXT_MENU_ACTION_TO_NOTE_KIND', () => {
  // Per-action, not aggregate: a table iterated in bulk can't tell a cross-wired entry (e.g. the
  // footnote action mapped to the endnote kind) from a correct one, since every kind still appears
  // somewhere in the table either way.
  it.each([
    ['insertFootnote', 'insertFootnoteAtSelection'],
    ['insertCrossReference', 'insertCrossReferenceAtSelection'],
    ['insertEndnote', 'insertEndnoteAtSelection'],
  ] as const)('%s maps to %s', (action, kind) => {
    expect(CONTEXT_MENU_ACTION_TO_NOTE_KIND[action]).toBe(kind);
  });

  it('maps each action to a distinct kind', () => {
    const kinds = Object.values(CONTEXT_MENU_ACTION_TO_NOTE_KIND);
    expect(new Set(kinds).size).toBe(kinds.length);
  });
});

describe('noteKindForCtrlTChord', () => {
  it('maps Ctrl+T (no Shift) to the footnote kind', () => {
    expect(noteKindForCtrlTChord(false)).toBe('insertFootnoteAtSelection');
  });

  it('maps Ctrl+Shift+T to the cross-reference kind', () => {
    expect(noteKindForCtrlTChord(true)).toBe('insertCrossReferenceAtSelection');
  });
});

describe('createInsertContextMenuItems', () => {
  // Parity contract: the context menu must offer exactly the Insert-menu inserts, in menu order.
  // Read the Insert menu straight from the contribution so a menus.json change without a
  // context-menu twin fails this test.
  const menusJson = JSON.parse(
    readFileSync(join(__dirname, '../contributions/menus.json'), 'utf8'),
  );
  const { groups, items: topMenuItems } =
    menusJson.webViewMenus['platformScriptureEditor.react'].topMenu;
  // Taken from the Insert COLUMN rather than the one group in it today: keyed on the group name, a
  // second group added to that column would put an item in the Insert menu with no context-menu
  // twin and leave this guard green.
  const insertGroupOrders = new Map<string, number>(
    Object.entries(groups)
      .filter(([, group]) => group.column === 'platformScriptureEditor.insert')
      .map(([name, group]): [string, number] => [name, group.order]),
  );
  const insertMenuItems: {
    label: string;
    group: string;
    order: number;
    hiddenInterfaceModes?: string[];
  }[] = topMenuItems
    .filter((item: { group: string }) => insertGroupOrders.has(item.group))
    .sort(
      (a: { group: string; order: number }, b: { group: string; order: number }) =>
        (insertGroupOrders.get(a.group) ?? 0) - (insertGroupOrders.get(b.group) ?? 0) ||
        a.order - b.order,
    );

  const makeActions = () => ({
    insertFootnote: vi.fn(),
    insertCrossReference: vi.fn(),
    insertEndnote: vi.fn(),
    insertComment: vi.fn(),
  });

  // Localized-strings stub: key -> `LOC:<key>` so titles are traceable to keys.
  const strings = Object.fromEntries(
    insertMenuItems.map((item) => [item.label, `LOC:${item.label}`]),
  );

  const ENABLED = { isReadOnly: false, canUserCreateComments: true, isSyncBlocked: false };

  it('offers exactly the Insert-menu items, localized, in the same order', () => {
    const items = createInsertContextMenuItems(strings, makeActions(), ENABLED);
    expect(items.map((i) => i.title)).toEqual(insertMenuItems.map((i) => `LOC:${i.label}`));
  });

  // The builder and the web view's localized-strings list must ask for the SAME keys — a key
  // present in one and not the other resolves to `undefined` and renders a blank row. Asserting
  // against the exported list (rather than the menus.json labels above) catches that drift
  // directly: every title this builder can produce must resolve through one of these keys.
  it('resolves every title through a key in INSERT_CONTEXT_MENU_STRING_KEYS', () => {
    const keyedStrings = Object.fromEntries(
      INSERT_CONTEXT_MENU_STRING_KEYS.map((key) => [key, key]),
    );
    const items = createInsertContextMenuItems(keyedStrings, makeActions(), ENABLED);
    items.forEach((item) => {
      expect(INSERT_CONTEXT_MENU_STRING_KEYS).toContain(item.title);
    });
  });

  // createInsertContextMenuItems takes no interface-mode input, so it cannot honor a per-mode
  // hide: an Insert-column item hidden from Simple mode's top menu would still show up here. The
  // parity test above compares labels/order only and would pass vacuously in that case, so pin the
  // gap directly rather than leaving it latent.
  it('has no Insert-column item declaring hiddenInterfaceModes, since the builder cannot honor it', () => {
    const itemsWithHiddenModes = insertMenuItems.filter(
      (item) => item.hiddenInterfaceModes?.length,
    );
    expect(itemsWithHiddenModes).toEqual([]);
  });

  it('disables note inserts when read-only and the comment insert per permission', () => {
    const readOnly = createInsertContextMenuItems(strings, makeActions(), {
      ...ENABLED,
      isReadOnly: true,
    });
    expect(readOnly.map((i) => !!i.isDisabled)).toEqual([true, true, true, false]);
    const noCommentPermission = createInsertContextMenuItems(strings, makeActions(), {
      ...ENABLED,
      canUserCreateComments: false,
    });
    expect(noCommentPermission.map((i) => !!i.isDisabled)).toEqual([false, false, false, true]);
  });

  // A sync freeze reaches the note inserts through the editor's own read-only state, so only the
  // comment insert — which does not go through the editor — needs the flag directly.
  it('disables the comment insert while sync-blocked', () => {
    const syncBlocked = createInsertContextMenuItems(strings, makeActions(), {
      ...ENABLED,
      isSyncBlocked: true,
    });
    expect(syncBlocked.map((i) => !!i.isDisabled)).toEqual([false, false, false, true]);
  });

  // Per-item, not aggregate: calling every item's onSelect and counting each action's TOTAL calls
  // passes under any permutation of the item-to-action mapping — it cannot tell "Insert footnote"
  // wired to insertCrossReference from the correct wiring. Asserting ONE item's onSelect against
  // every action's call count catches exactly that cross-wiring.
  it.each([
    [0, 'insertFootnote'],
    [1, 'insertCrossReference'],
    [2, 'insertEndnote'],
    [3, 'insertComment'],
  ] as const)('item %i runs ONLY its own action (%s)', (index, actionName) => {
    const actions = makeActions();
    const items = createInsertContextMenuItems(strings, actions, ENABLED);
    items[index].onSelect();
    (['insertFootnote', 'insertCrossReference', 'insertEndnote', 'insertComment'] as const).forEach(
      (name) => {
        expect(actions[name]).toHaveBeenCalledTimes(name === actionName ? 1 : 0);
      },
    );
  });
});

describe('isEditorContextMenuOpen', () => {
  /**
   * Builds a `.editor-input`-bearing editor root inside its own container, marked as if
   * `ContextMenuPlugin` had opened a right-click menu for it when `menuOpen` is set — see
   * `isEditorContextMenuOpenFor` (`editor-context-menu.util.ts`) for what this function delegates
   * to and why the signal is per-editor rather than a document-wide class query.
   */
  function makeEditor({ menuOpen }: { menuOpen: boolean }): HTMLDivElement {
    const container = document.createElement('div');
    const root = document.createElement('div');
    root.className = 'editor-input';
    if (menuOpen) root.setAttribute('aria-controls', 'editor-context-menu');
    container.append(root);
    document.body.append(container);
    return container;
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('is false with no context menu open', () => {
    expect(isEditorContextMenuOpen(makeEditor({ menuOpen: false }))).toBe(false);
  });

  // Keyed on the menu being OPEN, not on a highlighted item — see `isEditorContextMenuOpen`'s
  // TSDoc for why a menu holding nothing to invoke still holds the keyboard.
  it('is true while the given editor’s own menu is open', () => {
    expect(isEditorContextMenuOpen(makeEditor({ menuOpen: true }))).toBe(true);
  });

  // Scoped to the given container: the footnote-editor popover mounts its own `ContextMenuPlugin`
  // instance, whose portal shares the same classes as the main editor's — a DIFFERENT editor's open
  // menu elsewhere in the document must never trip THIS container's gate.
  it('ignores a different editor’s open menu elsewhere in the document', () => {
    const ownEditor = makeEditor({ menuOpen: false });
    makeEditor({ menuOpen: true });
    expect(isEditorContextMenuOpen(ownEditor)).toBe(false);
  });

  it('is false for an editor that has not mounted yet', () => {
    expect(isEditorContextMenuOpen(undefined)).toBe(false);
  });
});
