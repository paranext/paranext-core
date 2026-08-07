import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { MarkerMenuItem } from 'platform-bible-react';
import { isCharacterMarker, LanguageStrings, usfmMarkers } from 'platform-bible-utils';
import { MutableRefObject, useCallback, useMemo, useState } from 'react';
import {
  CharacterMarkerCoverage,
  CharacterMarkerSelection,
  CharacterMarkerSelectionState,
  computeCharacterMarkerCoverage,
} from './character-marker-coverage.utils';
import { generateCharacterMarkerMenuListItems } from './character-marker-menu.utils';
import { CharacterMarkerControlProps } from './character-marker-control/character-marker-control.component';
import { correctEditorUsjVersion } from './platform-scripture-editor.utils';

export type UseCharacterMarkerStateOptions = {
  /** The editor, used to insert markers and to read USJ when the menu opens. */
  editorRef: MutableRefObject<EditorRef | null>;
  /**
   * The current selection. Read on demand rather than passed as state, so it is never stale. The
   * caller must also cause a re-render whenever the selection changes — `isMixed` is computed
   * inline on every render (not memoized) precisely so that a fresh render is what keeps the
   * trigger label current. A getter that only reads a ref, with nothing that changes on selection
   * change to trigger a re-render, will show a stale `(mixed)`/label until the next unrelated
   * render.
   */
  getSelection: () => CharacterMarkerSelection | undefined;
  /** The editor's `blockMarker` — the block containing the selection. Scopes which markers apply. */
  blockMarker?: string;
  /** The editor's `contextMarker` — the marker at the anchor. Filtered through isCharacterMarker. */
  contextMarker?: string;
  /** Localized strings for the marker titles and the remove row. */
  localizedStrings: LanguageStrings;
  /** Supplied once removal exists upstream; absent means the menu offers no remove row. */
  removeCharacterMarker?: (marker: string) => void;
  /** Supplied once replacement exists upstream; absent means picking a marker adds instead. */
  changeCharacterMarker?: (fromMarker: string, toMarker: string) => void;
};

/** The control props this hook derives. Placement and sync state stay the caller's business. */
export type CharacterMarkerState = Pick<
  CharacterMarkerControlProps,
  'currentMarker' | 'currentMarkerLabel' | 'isMixed' | 'markerMenuItems' | 'onOpen' | 'onClose'
>;

/**
 * Coverage for the current selection, or `undefined` when there is nothing to measure or the
 * selection cannot be resolved against the editor's USJ.
 *
 * Empty `markerStates` together with `hasUncovered === false` is the pure function's "no
 * information" result, and it is treated as such here — never as "the selection carries no marker".
 * It arises whenever there was nothing to measure: the selection's json paths do not resolve
 * against this USJ (e.g. drift between the editor's USJ and its selection after an edit), the
 * selection resolves inside a note (which coverage excludes entirely), or a collapsed caret's start
 * node is not a text node, so no text segment is collected at all. Returning `undefined` makes the
 * hook degrade exactly as it does with no selection or no USJ — falling back to `contextMarker` —
 * rather than confidently reporting "nothing applied".
 */
function computeCoverage(
  editorRef: MutableRefObject<EditorRef | null>,
  getSelection: () => CharacterMarkerSelection | undefined,
): CharacterMarkerCoverage | undefined {
  const selection = getSelection();
  const editorUsj = editorRef.current?.getUsj();
  if (!selection || !editorUsj) return undefined;

  const computed = computeCharacterMarkerCoverage(correctEditorUsjVersion(editorUsj), selection);
  const isUnresolvable = Object.keys(computed.markerStates).length === 0 && !computed.hasUncovered;
  return isUnresolvable ? undefined : computed;
}

/**
 * Which marker the menu treats as applied. `contextMarker` describes the anchor only, so for a
 * selection spanning plain text and a marked run it is the block marker and the remove row would be
 * missing. With coverage available, exactly one covering marker is unambiguous; two or more is the
 * genuine `(mixed)` case.
 */
function resolveCurrentMarker(
  coverage: CharacterMarkerCoverage | undefined,
  contextMarker: string | undefined,
): string | undefined {
  if (coverage) {
    const coveringMarkers = Object.keys(coverage.markerStates);
    return coveringMarkers.length === 1 ? coveringMarkers[0] : undefined;
  }
  return contextMarker && isCharacterMarker(contextMarker) ? contextMarker : undefined;
}

/** Builds the menu rows, stamping each with its selection state once coverage is known. */
function buildMarkerMenuItems(
  options: Pick<
    UseCharacterMarkerStateOptions,
    | 'editorRef'
    | 'localizedStrings'
    | 'blockMarker'
    | 'changeCharacterMarker'
    | 'removeCharacterMarker'
  > & {
    currentMarker: string | undefined;
    coverage: CharacterMarkerCoverage | undefined;
  },
): MarkerMenuItem[] {
  const {
    editorRef,
    localizedStrings,
    blockMarker,
    changeCharacterMarker,
    removeCharacterMarker,
    currentMarker,
    coverage,
  } = options;

  const items = generateCharacterMarkerMenuListItems(
    editorRef,
    // The control owns its own open state; closing happens through the menu's own host, so the
    // generator's close callback has nothing to do here.
    () => {},
    localizedStrings,
    blockMarker,
    { currentCharacterMarker: currentMarker, changeCharacterMarker, removeCharacterMarker },
  );

  return items.map((item) => {
    // Mirror the generator's action logic (`character-marker-menu.utils.ts`) so a row whose action
    // is a no-op is visibly unavailable rather than silently ignoring the click. The generator
    // deliberately stays inert while a character marker covers the selection, because
    // `insertMarker` NESTS rather than replaces: picking the covering marker again has no defined
    // meaning yet (toggle off? extend? — `PT-XXX-B4`), and picking a different one needs a replace
    // operation that does not exist until `PT-XXX-B2`. Both are correct as behavior and wrong as
    // silence, so the row is disabled here.
    //
    // The remove row (no `marker`) is never disabled: it is only emitted at all when
    // `removeCharacterMarker` exists, so it always has something to do.
    const isDisabled =
      !!item.marker && !!currentMarker && (item.marker === currentMarker || !changeCharacterMarker);

    if (!coverage) return { ...item, isDisabled };

    let selectionState: CharacterMarkerSelectionState;
    if (item.marker) selectionState = coverage.markerStates[item.marker] ?? 'none';
    // The remove row: 'partial' when some of the selection is unmarked, 'none' when every character
    // carries a marker. The `coveringMarkers.length === 0` ('all') case cannot arise here: the
    // remove row is only emitted when `currentCharacterMarker` is set (see
    // `character-marker-menu.utils.ts`), and `resolveCurrentMarker` only returns a marker when
    // exactly one covers the selection.
    else selectionState = coverage.hasUncovered ? 'partial' : 'none';
    return { ...item, isDisabled, selectionState };
  });
}

/**
 * Composes the editor's state into {@link CharacterMarkerControl}'s props.
 *
 * This is the only place `getUsj()` is called, and only from `onOpen` — the returned `onOpen` is
 * what makes "the chapter is not serialized on every caret move" structural rather than a
 * convention. The trigger's label uses an O(1) check until coverage exists, then prefers coverage.
 */
export function useCharacterMarkerState({
  editorRef,
  getSelection,
  blockMarker,
  contextMarker,
  localizedStrings,
  removeCharacterMarker,
  changeCharacterMarker,
}: UseCharacterMarkerStateOptions): CharacterMarkerState {
  const [coverage, setCoverage] = useState<CharacterMarkerCoverage | undefined>(undefined);

  const onOpen = useCallback(() => {
    setCoverage(computeCoverage(editorRef, getSelection));
  }, [editorRef, getSelection]);

  const onClose = useCallback(() => {
    setCoverage(undefined);
    editorRef.current?.focus();
  }, [editorRef]);

  const coveringMarkers = useMemo(() => Object.keys(coverage?.markerStates ?? {}), [coverage]);

  // See `resolveCurrentMarker`; U3 is the case its doc comment describes.
  const currentMarker = useMemo(
    () => resolveCurrentMarker(coverage, contextMarker),
    [coverage, contextMarker],
  );

  const currentMarkerLabel = useMemo(() => {
    if (!currentMarker) return undefined;
    const { description } = usfmMarkers[currentMarker] ?? {};
    if (!description) return undefined;
    return localizedStrings[description] ?? description;
  }, [currentMarker, localizedStrings]);

  // Computed inline, not memoized: its inputs include calling `getSelection()`, whose identity
  // does not change when the selection does (the caller only writes a ref) — a `useMemo` here
  // would key the value to a dependency that isn't the real source of freshness. The cheap-check
  // half is O(1) by design, so recomputing every render costs nothing and buys correctness.
  let isMixed: boolean;
  if (coverage) {
    // More than one covering marker, or a mix of covered and uncovered text.
    isMixed = coveringMarkers.length > 1 || (coveringMarkers.length > 0 && coverage.hasUncovered);
  } else {
    // O(1) fallback while the menu is closed. It over-reports — a selection spanning two adjacent
    // same-marker nodes has two paths — which is corrected the moment coverage arrives.
    const selection = getSelection();
    isMixed = !!selection?.end && selection.start.jsonPath !== selection.end.jsonPath;
  }

  const markerMenuItems = useMemo(
    () =>
      buildMarkerMenuItems({
        editorRef,
        localizedStrings,
        blockMarker,
        changeCharacterMarker,
        removeCharacterMarker,
        currentMarker,
        coverage,
      }),
    [
      editorRef,
      localizedStrings,
      blockMarker,
      currentMarker,
      changeCharacterMarker,
      removeCharacterMarker,
      coverage,
    ],
  );

  return {
    currentMarker,
    currentMarkerLabel,
    isMixed,
    markerMenuItems,
    onOpen,
    onClose,
  };
}

export default useCharacterMarkerState;
