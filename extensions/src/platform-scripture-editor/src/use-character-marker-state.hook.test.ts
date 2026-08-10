// @vitest-environment jsdom

import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { act, renderHook } from '@testing-library/react';
import { MutableRefObject } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useCharacterMarkerState } from './use-character-marker-state.hook';

const USJ_PARTIAL_BD: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['GEN - Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        'kolo ',
        { type: 'char', marker: 'bd', content: ['Mulu'] },
      ],
    },
  ],
};

const KOLO = '$.content[2].content[1]';
const MULU = '$.content[2].content[2].content[0]';

const insertMarker = vi.fn();
const focus = vi.fn();
const getUsj = vi.fn(() => USJ_PARTIAL_BD);

/**
 * A ref exposing only the three `EditorRef` members the hook and the generator touch. Cast through
 * `unknown` because the literal does not structurally satisfy the full 22-member interface.
 */
function makeEditorRef(usj: Usj = USJ_PARTIAL_BD): MutableRefObject<EditorRef | null> {
  const readUsj = usj === USJ_PARTIAL_BD ? getUsj : vi.fn(() => usj);
  // The literal only has the three members above, not the full 22-member EditorRef interface.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    current: { insertMarker, focus, getUsj: readUsj },
  } as unknown as MutableRefObject<EditorRef | null>;
}

const STRINGS = { '%markerMenu_marker_bd_description%': 'Bold' };

function options(overrides: Record<string, unknown> = {}) {
  return {
    editorRef: makeEditorRef(),
    getSelection: () => ({
      start: { jsonPath: MULU, offset: 0 },
      end: { jsonPath: MULU, offset: 4 },
    }),
    blockMarker: 'p',
    contextMarker: 'bd',
    localizedStrings: STRINGS,
    ...overrides,
  };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('useCharacterMarkerState — getUsj cost', () => {
  it('does not call getUsj while only the selection changes', () => {
    const { rerender } = renderHook((props) => useCharacterMarkerState(props), {
      initialProps: options(),
    });

    for (let i = 0; i < 20; i++) {
      rerender(options({ contextMarker: i % 2 === 0 ? 'bd' : 'p' }));
    }

    expect(getUsj).not.toHaveBeenCalled();
  });

  it('calls getUsj exactly once per menu open', () => {
    const { result } = renderHook(() => useCharacterMarkerState(options()));

    act(() => result.current.onOpen());

    expect(getUsj).toHaveBeenCalledTimes(1);
  });

  it('holds the open-time coverage when the selection moves under an open menu', () => {
    // The freeze is deliberate: the rows describe the selection the menu was opened against, and
    // re-sampling would both repoint them at text the user cannot see and pay for another
    // whole-chapter `getUsj()`. Pinned here so a future edit cannot make it drift by accident.
    let selection = { start: { jsonPath: MULU, offset: 0 }, end: { jsonPath: MULU, offset: 4 } };
    const { result, rerender } = renderHook((props) => useCharacterMarkerState(props), {
      initialProps: options({ getSelection: () => selection }),
    });

    act(() => result.current.onOpen());
    expect(result.current.currentMarker).toBe('bd');

    // The caret moves out of `\bd` into the plain text before it, and the view re-renders.
    selection = { start: { jsonPath: KOLO, offset: 0 }, end: { jsonPath: KOLO, offset: 5 } };
    rerender(options({ getSelection: () => selection, contextMarker: 'p' }));

    expect(result.current.currentMarker).toBe('bd');
    expect(getUsj).toHaveBeenCalledTimes(1);
  });
});

describe('useCharacterMarkerState — trigger label inputs', () => {
  it('reports the character marker at the caret and its localized description', () => {
    const { result } = renderHook(() => useCharacterMarkerState(options()));

    expect(result.current.currentMarker).toBe('bd');
    expect(result.current.currentMarkerLabel).toBe('Bold');
  });

  it('ignores a contextMarker that is not a character marker', () => {
    const { result } = renderHook(() => useCharacterMarkerState(options({ contextMarker: 'p' })));

    expect(result.current.currentMarker).toBeUndefined();
  });

  it('reports mixed for a selection spanning more than one json path while closed', () => {
    const { result } = renderHook(() =>
      useCharacterMarkerState(
        options({
          getSelection: () => ({
            start: { jsonPath: KOLO, offset: 0 },
            end: { jsonPath: MULU, offset: 4 },
          }),
        }),
      ),
    );

    expect(result.current.isMixed).toBe(true);
  });

  it('prefers coverage over the cheap check once the menu opens', () => {
    // `\bd Mu\bd*\bd lu\bd*` — two adjacent sibling char nodes carrying the SAME marker, so the two
    // ends have different json paths. The cheap check over-reports `isMixed` before the menu opens;
    // coverage corrects it once `onOpen` runs. This is the only test standing behind the spec's
    // §4.1 guarantee that the trigger and the open menu never contradict each other.
    const usjSiblingSameMarker: Usj = {
      type: 'USJ',
      version: '3.0',
      content: [
        { type: 'book', marker: 'id', code: 'GEN', content: ['GEN - Genesis'] },
        { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
            { type: 'char', marker: 'bd', content: ['Mu'] },
            { type: 'char', marker: 'bd', content: ['lu'] },
          ],
        },
      ],
    };
    const { result } = renderHook(() =>
      useCharacterMarkerState(
        options({
          editorRef: makeEditorRef(usjSiblingSameMarker),
          getSelection: () => ({
            start: { jsonPath: '$.content[2].content[1].content[0]', offset: 0 },
            end: { jsonPath: '$.content[2].content[2].content[0]', offset: 2 },
          }),
        }),
      ),
    );

    // Before the menu opens: the cheap check sees two different json paths and over-reports mixed.
    expect(result.current.isMixed).toBe(true);

    act(() => result.current.onOpen());

    // After the menu opens: coverage corrects it, since one marker ('bd') covers the whole
    // selection.
    expect(result.current.isMixed).toBe(false);
    expect(result.current.currentMarker).toBe('bd');
  });
});

describe('useCharacterMarkerState — unresolvable selection', () => {
  it('falls back to contextMarker when the selection cannot be resolved against the USJ', () => {
    // A jsonPath that does not exist in USJ_PARTIAL_BD: `computeCharacterMarkerCoverage` returns
    // the pure function's "no information" result (empty markerStates, hasUncovered === false),
    // which is what it reports whenever there was nothing to measure — an unresolvable path, a
    // selection inside a note, or a caret on a non-text node. A selection it *did* measure and
    // found unmarked has hasUncovered === true instead. The hook must treat this as "no coverage"
    // rather than "nothing applied", falling back to contextMarker exactly as it does with no
    // selection or no USJ.
    const { result } = renderHook(() =>
      useCharacterMarkerState(
        options({
          contextMarker: 'bd',
          getSelection: () => ({
            start: { jsonPath: '$.content[99].content[99]', offset: 0 },
            end: { jsonPath: '$.content[99].content[99]', offset: 4 },
          }),
        }),
      ),
    );

    act(() => result.current.onOpen());

    expect(result.current.currentMarker).toBe('bd');
    result.current.markerMenuItems.forEach((item) => {
      expect(item.selectionState).toBeUndefined();
    });
  });
});

describe('useCharacterMarkerState — menu items', () => {
  it('gives every item a selection state once the menu has opened', () => {
    const { result } = renderHook(() => useCharacterMarkerState(options()));

    act(() => result.current.onOpen());

    const bold = result.current.markerMenuItems.find((item) => item.marker === 'bd');
    const italic = result.current.markerMenuItems.find((item) => item.marker === 'it');
    expect(bold?.selectionState).toBe('all');
    expect(italic?.selectionState).toBe('none');
  });

  it('derives the covering marker from coverage so a mixed selection still offers removal', () => {
    // The gap this rule closes: contextMarker is the anchor's marker, so for `kolo ` + `\bd Mulu`
    // with the anchor in plain text it is 'p' and the remove row would be missing.
    const removeCharacterMarker = vi.fn();
    const { result } = renderHook(() =>
      useCharacterMarkerState(
        options({
          contextMarker: 'p',
          getSelection: () => ({
            start: { jsonPath: KOLO, offset: 0 },
            end: { jsonPath: MULU, offset: 4 },
          }),
          removeCharacterMarker,
        }),
      ),
    );

    act(() => result.current.onOpen());

    const removeRow = result.current.markerMenuItems.find((item) => item.marker === undefined);
    expect(removeRow).toBeDefined();
    expect(removeRow?.selectionState).toBe('partial');
    removeRow?.action();
    expect(removeCharacterMarker).toHaveBeenCalledWith('bd');
  });

  it('offers no removal row when two markers cover the selection, since the target is ambiguous', () => {
    const nestedUsj: Usj = {
      type: 'USJ',
      version: '3.0',
      content: [
        { type: 'book', marker: 'id', code: 'GEN', content: ['GEN - Genesis'] },
        { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
        {
          type: 'para',
          marker: 'p',
          content: [
            {
              type: 'char',
              marker: 'wj',
              content: [{ type: 'char', marker: 'nd', content: ['Lord'] }, ' said'],
            },
          ],
        },
      ],
    };
    const { result } = renderHook(() =>
      useCharacterMarkerState(
        options({
          editorRef: makeEditorRef(nestedUsj),
          contextMarker: 'nd',
          getSelection: () => ({
            start: { jsonPath: '$.content[2].content[0].content[0].content[0]', offset: 0 },
            end: { jsonPath: '$.content[2].content[0].content[1]', offset: 5 },
          }),
          removeCharacterMarker: vi.fn(),
        }),
      ),
    );

    act(() => result.current.onOpen());

    expect(
      result.current.markerMenuItems.find((item) => item.marker === undefined),
    ).toBeUndefined();
  });
});

describe('useCharacterMarkerState — focus', () => {
  it('refocuses the editor when the menu closes', () => {
    const { result } = renderHook(() => useCharacterMarkerState(options()));

    act(() => result.current.onClose());

    expect(focus).toHaveBeenCalledTimes(1);
  });
});

describe('useCharacterMarkerState — disabled rows', () => {
  // The generator stays inert whenever a character marker covers the selection, because
  // `insertMarker` nests rather than replaces. These assert that the inert rows are also marked
  // unavailable, so a click is refused visibly instead of being silently swallowed.

  it('disables every marker row while a marker is applied and replacement does not exist yet', () => {
    const { result } = renderHook(() => useCharacterMarkerState(options()));

    const markerRows = result.current.markerMenuItems.filter((item) => item.marker);
    expect(markerRows.length).toBeGreaterThan(0);
    expect(markerRows.every((item) => item.isDisabled)).toBe(true);
  });

  it('disables only the applied marker once replacement exists', () => {
    const { result } = renderHook(() =>
      useCharacterMarkerState(options({ changeCharacterMarker: vi.fn() })),
    );

    const markerRows = result.current.markerMenuItems.filter((item) => item.marker);
    expect(markerRows.find((item) => item.marker === 'bd')?.isDisabled).toBe(true);
    expect(markerRows.filter((item) => item.marker !== 'bd').some((item) => item.isDisabled)).toBe(
      false,
    );
  });

  it('disables nothing when no character marker is applied, so adding still works', () => {
    const { result } = renderHook(() =>
      useCharacterMarkerState(
        options({
          contextMarker: 'p',
          getSelection: () => ({
            start: { jsonPath: KOLO, offset: 0 },
            end: { jsonPath: KOLO, offset: 4 },
          }),
        }),
      ),
    );

    expect(result.current.markerMenuItems.some((item) => item.isDisabled)).toBe(false);
  });

  it('never disables the remove row', () => {
    const { result } = renderHook(() =>
      useCharacterMarkerState(options({ removeCharacterMarker: vi.fn() })),
    );

    const removeRow = result.current.markerMenuItems.find((item) => item.marker === undefined);
    expect(removeRow).toBeDefined();
    expect(removeRow?.isDisabled).toBe(false);
  });
});
