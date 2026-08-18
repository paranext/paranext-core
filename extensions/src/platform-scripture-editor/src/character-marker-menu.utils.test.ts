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

  it('returns [] for a parent with no character children even when remove is available', () => {
    // A parent that contributes no character markers must win over the remove row rather than
    // surfacing it alone: a menu offering only "Remove" and nothing to add is not a UX we have
    // designed, and it would be inconsistent for it to appear for 'mt' but not 'c'. Both shapes are
    // pinned so a future refactor can't silently reorder this — 'c' has no `usfmMarkers` children at
    // all (caught by the early return), while 'mt' has children of which none is a character marker
    // (caught after the filter).
    const { ref } = makeMockEditorRef();
    const removeCharacterMarker = vi.fn();

    ['c', 'mt'].forEach((parentMarker) => {
      const items = generateCharacterMarkerMenuListItems(ref, noop, {}, parentMarker, {
        currentCharacterMarker: 'nd',
        removeCharacterMarker,
      });

      expect(items).toEqual([]);
    });
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

  it('does not add the marker when one is applied but change is not available yet', () => {
    // `EditorRef` exposes no replace-character-marker operation, so a caller has no
    // `changeCharacterMarker` to pass. Picking a marker must NOT fall back to `insertMarker`:
    // inserting over an existing character marker nests it (verified against the editor package —
    // `getUsjMarkerAction('bd')` over a selection inside a `\nd` CharNode yields
    // `char:nd > char:bd`), and nesting survives into the saved USJ. Inert is the safe behavior.
    const { ref, insertMarker } = makeMockEditorRef();
    const close = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, close, {}, PARENT, {
      currentCharacterMarker: 'nd',
    });

    items.find((item) => item.marker === 'bd')?.action();

    expect(insertMarker).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledTimes(1);
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

  it('offers the catch-all remove row instead of a single remove row when coverage is mixed', () => {
    const { ref } = makeMockEditorRef();
    const removeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT, {
      removeCharacterMarker,
      coverage: { markerStates: { bd: 'partial', nd: 'partial' }, hasUncovered: false },
    });

    const commandRows = items.filter((item) => !item.marker);
    expect(commandRows).toHaveLength(1);
    expect(commandRows[0].title).toBe(
      '%webView_platformScriptureEditor_characterMarkerMenu_removeMarkers%',
    );
  });

  it('removes every marker in the selection with one argument-less call', () => {
    // One call, not one per marker: the editor removes each covered run's innermost marker in a
    // single update, which is what keeps undo to a single step. Asserting the argument list is the
    // only way to tell "remove everything" apart from "remove the innermost one".
    const { ref } = makeMockEditorRef();
    const close = vi.fn();
    const removeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, close, {}, PARENT, {
      removeCharacterMarker,
      coverage: { markerStates: { bd: 'partial', nd: 'partial' }, hasUncovered: false },
    });

    items.find((item) => !item.marker)?.action();

    expect(removeCharacterMarker).toHaveBeenCalledTimes(1);
    expect(removeCharacterMarker).toHaveBeenCalledWith();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('treats a marked run plus unmarked text as mixed, not as a single applied marker', () => {
    // `resolveCurrentMarker` in the state hook returns 'bd' here (exactly one covering marker), so
    // without the coverage check this would offer "Remove marker" and quietly leave the unmarked
    // half out of the story.
    const { ref } = makeMockEditorRef();
    const removeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT, {
      currentCharacterMarker: 'bd',
      removeCharacterMarker,
      coverage: { markerStates: { bd: 'partial' }, hasUncovered: true },
    });

    expect(items.find((item) => !item.marker)?.title).toBe(
      '%webView_platformScriptureEditor_characterMarkerMenu_removeMarkers%',
    );
  });

  it('removes just that marker when a fully-covering marker row is picked', () => {
    // The prototype's toggle-off (plan §U4): a row whose marker covers the whole selection removes
    // it rather than nesting a second copy.
    const { ref, insertMarker } = makeMockEditorRef();
    const close = vi.fn();
    const removeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, close, {}, PARENT, {
      currentCharacterMarker: 'bd',
      removeCharacterMarker,
      coverage: { markerStates: { bd: 'all' }, hasUncovered: false },
    });

    items.find((item) => item.marker === 'bd')?.action();

    expect(removeCharacterMarker).toHaveBeenCalledWith('bd');
    expect(insertMarker).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('is inert for a fully-covering row with no removeCharacterMarker, instead of nesting', () => {
    // With no `removeCharacterMarker`, a fully-covering row must not fall through to the
    // insert/change branch below — that would nest a duplicate marker, which the code this pins
    // says must never happen. Two markers each fully covering the selection (a nested pair) is the
    // real-world shape that produces this: with more than one covering marker, the state hook's
    // `resolveCurrentMarker` returns `undefined`, so `currentCharacterMarker` is absent here rather
    // than equal to the clicked row's marker — that absence is what let the old buggy code fall all
    // the way through to `insertMarker(marker)` instead of stopping at the `changeCharacterMarker`
    // branch.
    const { ref, insertMarker } = makeMockEditorRef();
    const close = vi.fn();
    const changeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, close, {}, PARENT, {
      changeCharacterMarker,
      coverage: { markerStates: { bd: 'all', nd: 'all' }, hasUncovered: false },
    });

    items.find((item) => item.marker === 'bd')?.action();

    expect(insertMarker).not.toHaveBeenCalled();
    expect(changeCharacterMarker).not.toHaveBeenCalled();
  });

  it('leaves a partially-covering marker row inert (extend is not an editor operation yet)', () => {
    const { ref, insertMarker } = makeMockEditorRef();
    const close = vi.fn();
    const removeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, close, {}, PARENT, {
      removeCharacterMarker,
      coverage: { markerStates: { bd: 'partial' }, hasUncovered: true },
    });

    items.find((item) => item.marker === 'bd')?.action();

    expect(removeCharacterMarker).not.toHaveBeenCalled();
    expect(insertMarker).not.toHaveBeenCalled();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('stamps selectionState on every row from coverage', () => {
    const { ref } = makeMockEditorRef();
    const removeCharacterMarker = vi.fn();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT, {
      removeCharacterMarker,
      coverage: { markerStates: { bd: 'all', nd: 'partial' }, hasUncovered: true },
    });

    expect(items.find((item) => item.marker === 'bd')?.selectionState).toBe('all');
    expect(items.find((item) => item.marker === 'nd')?.selectionState).toBe('partial');
    expect(items.find((item) => item.marker === 'it')?.selectionState).toBe('none');
    // The remove row carries NO selectionState, even though coverage is available. `MarkerMenu`
    // maps the prop onto `aria-checked` and a checkbox affordance, and it means "how much of the
    // selection this MARKER covers" — a question a markerless action row does not pose. Stamping
    // it here would announce "not checked" on a fully-marked selection, beside an action that is
    // certain to remove markers.
    expect(items.find((item) => !item.marker)?.selectionState).toBeUndefined();
  });

  it('leaves selectionState undefined when there is no coverage', () => {
    // The pre-menu-open path. No coverage means no selection affordance and no aria-checked, which
    // is how every consumer that does not track a selection behaves.
    const { ref } = makeMockEditorRef();
    const items = generateCharacterMarkerMenuListItems(ref, noop, {}, PARENT);

    expect(items.every((item) => item.selectionState === undefined)).toBe(true);
  });
});
