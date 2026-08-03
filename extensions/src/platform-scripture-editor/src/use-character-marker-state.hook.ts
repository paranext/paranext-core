import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { isCharacterMarker, LanguageStrings, usfmMarkers } from 'platform-bible-utils';
import { MutableRefObject, useCallback, useMemo, useState } from 'react';
import {
  CharacterMarkerCoverage,
  CharacterMarkerSelection,
  computeCharacterMarkerCoverage,
} from './character-marker-coverage.utils';
import { generateCharacterMarkerMenuListItems } from './character-marker-menu.utils';
import { CharacterMarkerControlProps } from './character-marker-control.component';
import { correctEditorUsjVersion } from './platform-scripture-editor.utils';

export type UseCharacterMarkerStateOptions = {
  /** The editor, used to insert markers and to read USJ when the menu opens. */
  editorRef: MutableRefObject<EditorRef | null>;
  /** The current selection. Read on demand rather than passed as state, so it is never stale. */
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
    const selection = getSelection();
    const editorUsj = editorRef.current?.getUsj();
    if (!selection || !editorUsj) {
      setCoverage(undefined);
      return;
    }
    setCoverage(computeCharacterMarkerCoverage(correctEditorUsjVersion(editorUsj), selection));
  }, [editorRef, getSelection]);

  const onClose = useCallback(() => {
    setCoverage(undefined);
    editorRef.current?.focus();
  }, [editorRef]);

  const coveringMarkers = useMemo(() => Object.keys(coverage?.markerStates ?? {}), [coverage]);

  // Which marker the menu treats as applied. `contextMarker` describes the anchor only, so for a
  // selection spanning plain text and a marked run it is the block marker and the remove row would
  // be missing — the case U3 uses as its example. With coverage available, exactly one covering
  // marker is unambiguous; two or more is the genuine `(mixed)` case.
  const currentMarker = useMemo(() => {
    if (coverage) return coveringMarkers.length === 1 ? coveringMarkers[0] : undefined;
    return contextMarker && isCharacterMarker(contextMarker) ? contextMarker : undefined;
  }, [coverage, coveringMarkers, contextMarker]);

  const currentMarkerLabel = useMemo(() => {
    if (!currentMarker) return undefined;
    const { description } = usfmMarkers[currentMarker] ?? {};
    if (!description) return undefined;
    return localizedStrings[description] ?? description;
  }, [currentMarker, localizedStrings]);

  const isMixed = useMemo(() => {
    if (coverage) {
      // More than one covering marker, or a mix of covered and uncovered text.
      return coveringMarkers.length > 1 || (coveringMarkers.length > 0 && coverage.hasUncovered);
    }
    // O(1) fallback while the menu is closed. It over-reports — a selection spanning two adjacent
    // same-marker nodes has two paths — which is corrected the moment coverage arrives.
    const selection = getSelection();
    if (!selection?.end) return false;
    return selection.start.jsonPath !== selection.end.jsonPath;
  }, [coverage, coveringMarkers, getSelection]);

  const markerMenuItems = useMemo(() => {
    const items = generateCharacterMarkerMenuListItems(
      editorRef,
      // The control owns its own open state; closing happens through Radix, so the generator's
      // close callback has nothing to do here.
      () => {},
      localizedStrings,
      blockMarker,
      { currentCharacterMarker: currentMarker, changeCharacterMarker, removeCharacterMarker },
    );
    if (!coverage) return items;
    return items.map((item) => ({
      ...item,
      selectionState: item.marker
        ? (coverage.markerStates[item.marker] ?? 'none')
        : // The remove row: 'all' when nothing is marked, 'partial' when some of the selection is
          // unmarked, 'none' when every character carries a marker.
          ((): 'all' | 'partial' | 'none' => {
            if (coveringMarkers.length === 0) return 'all';
            return coverage.hasUncovered ? 'partial' : 'none';
          })(),
    }));
  }, [
    editorRef,
    localizedStrings,
    blockMarker,
    currentMarker,
    changeCharacterMarker,
    removeCharacterMarker,
    coverage,
    coveringMarkers,
  ]);

  return { currentMarker, currentMarkerLabel, isMixed, markerMenuItems, onOpen, onClose };
}

export default useCharacterMarkerState;
