import { MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  isCharacterMarker,
  isString,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjReaderWriter,
} from 'platform-bible-utils';

/** How much of the current selection a character marker covers. */
export type CharacterMarkerSelectionState = 'all' | 'partial' | 'none';

/**
 * The subset of the editor's `SelectionRange` this analysis needs. Declared structurally so the
 * analysis stays free of any dependency on the editor package — a real `SelectionRange` satisfies
 * it.
 */
export type CharacterMarkerSelection = {
  /** Where the selection starts. `offset` is absent for locations that are not text content. */
  start: { jsonPath: string; offset?: number };
  /** Where the selection ends. Absent means a collapsed caret at `start`. */
  end?: { jsonPath: string; offset?: number };
};

/** Per-marker coverage of a selection, plus whether any of it carries no character marker. */
export type CharacterMarkerCoverage = {
  /**
   * Every character marker covering any part of the selection, and whether it covers all of the
   * selected text or only part of it. A marker absent from this map covers none of the selection.
   */
  markerStates: Readonly<Record<string, 'all' | 'partial'>>;
  /** `true` when some of the selected text carries no character marker at all. */
  hasUncovered: boolean;
};

const EMPTY_COVERAGE: CharacterMarkerCoverage = Object.freeze({
  markerStates: Object.freeze({}),
  hasUncovered: false,
});

/**
 * Guard on the ancestor walk. USJ nesting is shallow in practice (book > para > char > char), so a
 * depth this size can only be reached by a malformed document or a JSONPath that resolves to
 * something unexpected — in which case stopping is better than looping.
 */
const MAX_ANCESTOR_DEPTH = 20;

/**
 * The character markers enclosing the node at `jsonPath`, innermost first.
 *
 * Returns `undefined` when the node is inside a note (`\f`, `\x`), which excludes it from coverage
 * entirely: note _content_ markers such as `ft` and `xo` are genuine character markers, but the
 * editor's own character-marker operations skip note subtrees, so counting them here would report
 * coverage the user cannot act on.
 */
function getAncestorCharacterMarkers(
  usjRW: UsjReaderWriter,
  jsonPath: string,
): string[] | undefined {
  const markers: string[] = [];
  let path = jsonPath;
  for (let depth = 0; depth < MAX_ANCESTOR_DEPTH; depth++) {
    // Every node in USJ content sits inside an array (a marker's `content`), so one `^` from a
    // node's path only reaches that array, not the object that owns it — a second `^` is needed to
    // land on the enclosing MarkerObject. `findParent` already appends one `^` itself, so passing it
    // `${path}^` (one extra caret) yields the two-caret hop to the owning object.
    const parent = usjRW.findParent<MarkerObject | Usj>(`${path}^`);
    if (!parent || !('marker' in parent) || !isString(parent.marker)) return markers;
    if (parent.type === 'note') return undefined;
    if (isCharacterMarker(parent.marker)) markers.push(parent.marker);
    // Advance `path` by the same two-caret hop so the next iteration's `findParent` call reaches
    // the next MarkerObject up, not the array in between.
    path = `${path}^^`;
  }
  return markers;
}

/**
 * Resolves a selection against a chapter's USJ into per-marker coverage.
 *
 * One computation feeds three consumers: the trigger's `(mixed)` state, the menu's per-marker
 * partial/all/none rows, and the _(none)_ row's own state.
 *
 * ⚠️ The caller must supply USJ it already has — this function does not fetch it. `getUsj()`
 * serializes the whole chapter, so it must not be called on every caret move.
 *
 * @param usj The chapter USJ the selection's json paths refer to.
 * @param selection The selection to analyze. `undefined` yields an empty coverage.
 * @returns Per-marker coverage. Empty (no markers, nothing uncovered) when the selection cannot be
 *   resolved against `usj` — an unresolvable path is treated as "no information", never as a
 *   throw.
 */
export function computeCharacterMarkerCoverage(
  usj: Usj,
  selection: CharacterMarkerSelection | undefined,
): CharacterMarkerCoverage {
  if (!selection?.start?.jsonPath) return EMPTY_COVERAGE;

  const usjRW = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });

  let startLocation;
  let endJsonPath: string;
  try {
    startLocation = usjRW.jsonPathToUsjNodeAndDocumentLocation(selection.start.jsonPath);
    endJsonPath = selection.end?.jsonPath ?? selection.start.jsonPath;
    // Resolve the end too, so an unresolvable end path fails here rather than silently walking to
    // the end of the chapter.
    usjRW.jsonPathToUsjNodeAndDocumentLocation(endJsonPath);
  } catch {
    return EMPTY_COVERAGE;
  }
  if (!startLocation) return EMPTY_COVERAGE;

  // Walk forward from the start, collecting the text nodes up to and including the end node. The
  // walk includes its starting point, and returning `true` stops it.
  const segments: { jsonPath: string; text: string }[] = [];
  let reachedEnd = false;
  usjRW.findNextMatchingNode(startLocation, ({ node, documentLocation }) => {
    if (isString(node)) segments.push({ jsonPath: documentLocation.jsonPath, text: node });
    if (documentLocation.jsonPath === endJsonPath) {
      reachedEnd = true;
      return true;
    }
    return false;
  });
  // An end that never came up (a reversed or unreachable range) degrades to the start node alone
  // rather than to the rest of the chapter.
  if (!reachedEnd) segments.length = Math.min(segments.length, 1);

  // Trim the first and last segments to the selection's offsets. With one segment both apply to it.
  if (segments.length > 0) {
    const startOffset = selection.start.offset ?? 0;
    const endOffset = selection.end?.offset;
    if (segments.length === 1) {
      segments[0].text = segments[0].text.slice(startOffset, endOffset);
    } else {
      segments[0].text = segments[0].text.slice(startOffset);
      const last = segments[segments.length - 1];
      last.text = last.text.slice(0, endOffset);
    }
  }

  const coveredLengthByMarker = new Map<string, number>();
  let uncoveredLength = 0;
  let totalLength = 0;
  segments.forEach(({ jsonPath, text }) => {
    if (text.length === 0) return;
    const ancestors = getAncestorCharacterMarkers(usjRW, jsonPath);
    if (!ancestors) return; // Inside a note — excluded from coverage.
    totalLength += text.length;
    if (ancestors.length === 0) uncoveredLength += text.length;
    ancestors.forEach((marker) => {
      coveredLengthByMarker.set(marker, (coveredLengthByMarker.get(marker) ?? 0) + text.length);
    });
  });

  // A collapsed caret selects no text, so length accounting says nothing. Fall back to the markers
  // enclosing the caret and call them 'all': everything selected (nothing) is inside them.
  if (totalLength === 0) {
    const ancestors = getAncestorCharacterMarkers(usjRW, selection.start.jsonPath) ?? [];
    const caretStates: Record<string, 'all' | 'partial'> = {};
    ancestors.forEach((marker) => {
      caretStates[marker] = 'all';
    });
    return {
      markerStates: caretStates,
      hasUncovered: ancestors.length === 0 && segments.length > 0,
    };
  }

  const markerStates: Record<string, 'all' | 'partial'> = {};
  coveredLengthByMarker.forEach((coveredLength, marker) => {
    markerStates[marker] = coveredLength >= totalLength ? 'all' : 'partial';
  });
  return { markerStates, hasUncovered: uncoveredLength > 0 };
}
