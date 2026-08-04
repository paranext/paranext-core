import { describe, it, expect, vi } from 'vitest';
import { isCharacterMarker } from 'platform-bible-utils';
import { MutableRefObject } from 'react';
import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { generateCharacterMarkerMenuListItems } from './character-marker-menu.utils';

/** Build a mock editor ref exposing spies for the methods the generator calls. */
function makeMockEditorRef() {
  const insertMarker = vi.fn();
  // Mock literal cannot satisfy the full EditorRef interface — cast for test isolation.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const ref = {
    current: { insertMarker },
  } as unknown as MutableRefObject<EditorRef | null>;
  return { ref, insertMarker };
}

describe('generateCharacterMarkerMenuListItems', () => {
  // 'p' is a real parent in the actual usfmMarkers data whose children mix block markers ('q',
  // 's1'), note markers ('f', 'x'), the mistyped verse marker ('v'), and 23 character markers.
  const PARENT = 'p';
  const noop = () => {};

  it('returns only character markers', () => {
    const { ref } = makeMockEditorRef();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT);

    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => !!item.marker && isCharacterMarker(item.marker))).toBe(true);
    ['v', 'q', 's1', 'f', 'x', 'p'].forEach((marker) => {
      expect(items.some((item) => item.marker === marker)).toBe(false);
    });
  });

  it('includes the note and cross-reference content markers that are character markers', () => {
    // 'xt', 'rq', and 'fm' are MarkerType.Character children of 'p'. Including them is deliberate:
    // they are genuine character markers, even though they belong to notes and cross-references
    // rather than body-text styling. Whether a menu should offer them is a UX question, so this
    // pins the current answer — narrowing the set later should fail here and be re-decided.
    const { ref } = makeMockEditorRef();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT);

    ['xt', 'rq', 'fm'].forEach((marker) => {
      expect(items.some((item) => item.marker === marker)).toBe(true);
    });
  });

  it('localizes marker titles and falls back to the localize key', () => {
    const { ref } = makeMockEditorRef();
    const items = generateCharacterMarkerMenuListItems(
      ref,
      noop,
      { '%markerMenu_marker_bd_description%': 'Bold text' },
      PARENT,
    );

    expect(items.find((item) => item.marker === 'bd')?.title).toBe('Bold text');
    expect(items.find((item) => item.marker === 'nd')?.title).toBe(
      '%markerMenu_marker_nd_description%',
    );
  });

  it('inserts the marker and closes the menu', () => {
    const { ref, insertMarker } = makeMockEditorRef();
    const close = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, close, {}, PARENT);

    items.find((item) => item.marker === 'bd')?.action();

    expect(insertMarker).toHaveBeenCalledWith('bd');
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('never disallows an item, so structure protection cannot block a character marker', () => {
    const { ref } = makeMockEditorRef();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT);

    expect(items.every((item) => !item.isDisallowed)).toBe(true);
  });

  it('sorts items by marker code', () => {
    const { ref } = makeMockEditorRef();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT);
    const markers = items.map((item) => item.marker ?? '');

    expect(markers).toEqual([...markers].sort((a, b) => a.localeCompare(b)));
  });

  it('returns [] when there is no parent marker', () => {
    const { ref } = makeMockEditorRef();

    expect(generateCharacterMarkerMenuListItems(ref, noop, {})).toEqual([]);
  });

  it('returns [] for parents that contribute no character markers', () => {
    const { ref } = makeMockEditorRef();

    // 'nd' is itself a character marker and has no children. 'c' is a real `blockMarker` value
    // (the editor reports it when the selection resolves to a chapter node) whose usfmMarkers entry
    // has no children at all, so an empty menu there is correct rather than a bug.
    expect(generateCharacterMarkerMenuListItems(ref, noop, {}, 'nd')).toEqual([]);
    expect(generateCharacterMarkerMenuListItems(ref, noop, {}, 'c')).toEqual([]);
  });

  it('returns [] for a childless parent even when a marker is applied and remove is available', () => {
    // The `parentMarker` early returns run before the remove row is built, so a childless parent
    // (here 'c', a real blockMarker with no `usfmMarkers` children) must win over the remove row
    // rather than surfacing it alone. Pinned so a future refactor can't silently reorder this.
    const { ref } = makeMockEditorRef();
    const removeCharacterMarker = vi.fn();

    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, 'c', {
      currentCharacterMarker: 'nd',
      removeCharacterMarker,
    });

    expect(items).toEqual([]);
    expect(removeCharacterMarker).not.toHaveBeenCalled();
  });

  it('changes the applied marker when a change callback is supplied', () => {
    const { ref, insertMarker } = makeMockEditorRef();
    const close = vi.fn();
    const changeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, close, {}, PARENT, {
      currentCharacterMarker: 'nd',
      changeCharacterMarker,
    });

    items.find((item) => item.marker === 'bd')?.action();

    expect(changeCharacterMarker).toHaveBeenCalledWith('nd', 'bd');
    expect(insertMarker).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('adds the marker when one is applied but change is not available yet', () => {
    // `EditorRef` exposes no replace-character-marker operation, so a caller has no
    // `changeCharacterMarker` to pass. Picking a marker must still add it rather than doing nothing.
    const { ref, insertMarker } = makeMockEditorRef();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT, {
      currentCharacterMarker: 'nd',
    });

    items.find((item) => item.marker === 'bd')?.action();

    expect(insertMarker).toHaveBeenCalledWith('bd');
  });

  it('does nothing but close when the picked marker is already applied', () => {
    // Applying the same marker again would nest an identical character marker. What a second pick
    // should do instead (toggle off, or extend over the whole selection) is an unmade UX decision,
    // so the row is deliberately inert and this pins that rather than leaving it to chance.
    const { ref, insertMarker } = makeMockEditorRef();
    const close = vi.fn();
    const changeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, close, {}, PARENT, {
      currentCharacterMarker: 'bd',
      changeCharacterMarker,
    });

    items.find((item) => item.marker === 'bd')?.action();

    expect(insertMarker).not.toHaveBeenCalled();
    expect(changeCharacterMarker).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('ignores a non-character-marker currentCharacterMarker (e.g. raw contextMarker of "p")', () => {
    // The design intends callers to pass `contextMarker` already filtered through
    // `isCharacterMarker`. If a caller instead passes the raw value, it is `'p'` whenever the caret
    // is in ordinary paragraph text — this guard must treat that as "no marker applied" so an add
    // doesn't silently become a change, and no remove row offers to remove a paragraph marker.
    const { ref, insertMarker } = makeMockEditorRef();
    const changeCharacterMarker = vi.fn();
    const removeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT, {
      currentCharacterMarker: 'p',
      changeCharacterMarker,
      removeCharacterMarker,
    });

    items.find((item) => item.marker === 'bd')?.action();

    expect(insertMarker).toHaveBeenCalledWith('bd');
    expect(changeCharacterMarker).not.toHaveBeenCalled();
    expect(items.every((item) => !!item.marker)).toBe(true);
  });

  it('offers a remove row only when a marker is applied and remove is available', () => {
    const { ref } = makeMockEditorRef();
    const removeCharacterMarker = vi.fn();

    const noMarkerApplied = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT, {
      removeCharacterMarker,
    });
    const removeUnavailable = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT, {
      currentCharacterMarker: 'nd',
    });
    const both = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT, {
      currentCharacterMarker: 'nd',
      removeCharacterMarker,
    });

    // Every marker item has a `marker`; only the remove row does not.
    expect(noMarkerApplied.every((item) => !!item.marker)).toBe(true);
    expect(removeUnavailable.every((item) => !!item.marker)).toBe(true);
    expect(both[0].marker).toBeUndefined();
    expect(both.filter((item) => !item.marker)).toHaveLength(1);
  });

  it('removes the applied marker from the remove row and closes', () => {
    const { ref, insertMarker } = makeMockEditorRef();
    const close = vi.fn();
    const removeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, close, {}, PARENT, {
      currentCharacterMarker: 'nd',
      removeCharacterMarker,
    });

    items[0].action();

    expect(removeCharacterMarker).toHaveBeenCalledWith('nd');
    expect(insertMarker).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('gives the remove row an explicit icon and a localized title', () => {
    const { ref } = makeMockEditorRef();
    const items = generateCharacterMarkerMenuListItems(
      ref,
      noop,
      {
        '%webView_platformScriptureEditor_characterMarkerMenu_removeMarker%':
          'Remove character marker',
      },
      PARENT,
      { currentCharacterMarker: 'nd', removeCharacterMarker: vi.fn() },
    );

    expect(items[0].title).toBe('Remove character marker');
    // The icon must be explicit: MarkerMenu falls back to a `Ban` (prohibited) glyph when `icon` is
    // absent, which reads as "disallowed" rather than "remove" in a menu that already renders a
    // disallowed affordance.
    expect(items[0].icon).toBeDefined();
  });

  it('falls back to the localize key for the remove row title', () => {
    const { ref } = makeMockEditorRef();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT, {
      currentCharacterMarker: 'nd',
      removeCharacterMarker: vi.fn(),
    });

    expect(items[0].title).toBe(
      '%webView_platformScriptureEditor_characterMarkerMenu_removeMarker%',
    );
  });
});
