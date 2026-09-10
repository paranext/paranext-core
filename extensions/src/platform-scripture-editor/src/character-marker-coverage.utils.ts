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
 * The states a marker can have inside {@link CharacterMarkerCoverage.markerStates}. `'none'` cannot
 * occur there: a marker covering none of the selection is expressed by absence from the map.
 */
type CharacterMarkerCoverageState = Exclude<CharacterMarkerSelectionState, 'none'>;

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
  markerStates: Readonly<Record<string, CharacterMarkerCoverageState>>;
  /** `true` when some of the selected text carries no character marker at all. */
  hasUncovered: boolean;
};

const EMPTY_COVERAGE: CharacterMarkerCoverage = Object.freeze({
  markerStates: Object.freeze({}),
  hasUncovered: false,
});

/**
 * Whether a coverage carries no information at all — no marker covers any of the selection AND
 * nothing is uncovered.
 *
 * This is the "nothing to measure" result, NOT "the selection carries no marker": it arises from an
 * unresolvable json path, a selection inside a note, or a caret whose start node holds no text.
 * Callers should degrade to their own context on it rather than report an unmarked selection.
 * Exported so that test lives in one place instead of being re-derived at each call site.
 */
export function isEmptyCoverage(coverage: CharacterMarkerCoverage): boolean {
  return Object.keys(coverage.markerStates).length === 0 && !coverage.hasUncovered;
}

/**
 * Whether a selection carries more than one character marker, or mixes marked and unmarked text.
 *
 * This is the test that decides the trigger's `(mixed)` label AND whether the menu swaps its single
 * remove row for the catch-all remove row. Exported so those two answers come from one definition:
 * they must agree, and they live in different files.
 *
 * Deliberately NOT read off a resolved "current marker": the state hook resolves that to a marker
 * whenever exactly one covers the selection, INCLUDING when half the selection is unmarked — so a
 * marked run plus adjacent plain text would otherwise read as a plain single-marker selection and
 * offer to "remove the marker" as if that were the whole story.
 */
export function isMixedCoverage(coverage: CharacterMarkerCoverage): boolean {
  const coveringMarkers = Object.keys(coverage.markerStates);
  return coveringMarkers.length > 1 || (coveringMarkers.length > 0 && coverage.hasUncovered);
}

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
 * @returns Per-marker coverage. Empty (no markers, nothing uncovered) when there is nothing to
 *   measure — an unresolvable path, or a selection inside a note — which is treated as "no
 *   information", never as a throw and never as "the selection is unmarked".
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
  // Set when the end path names a MarkerObject rather than a text node — see below.
  let isInsideEndSubtree = false;
  const isDescendantOfEnd = (jsonPath: string) => jsonPath.startsWith(`${endJsonPath}.`);
  usjRW.findNextMatchingNode(startLocation, ({ node, documentLocation }) => {
    const { jsonPath } = documentLocation;
    // Leaving the end node's subtree ends the walk. Checked before collecting so the node that
    // carried us out never enters `segments`.
    if (isInsideEndSubtree && !isDescendantOfEnd(jsonPath)) return true;

    if (isString(node)) segments.push({ jsonPath, text: node });

    if (jsonPath === endJsonPath) {
      reachedEnd = true;
      if (isString(node)) return true;
      // The end resolved to a MarkerObject, not to its text. The walk is PRE-ORDER — it runs the
      // callback on an object before descending into its `content` — so stopping here would end
      // the walk before the marker's own text was ever collected and silently undercount it.
      // Descend instead, and stop on the way back out.
      isInsideEndSubtree = true;
    }
    return false;
  });
  // An end that never came up (an unreachable range) degrades to the start node alone rather than
  // to the rest of the chapter. Note this is not the backwards-drag case: the editor normalizes
  // selection direction before this sees it (`$getUsjSelectionFromEditor` swaps anchor and focus
  // on `isBackward()`), so `start` always precedes `end` in document order.
  if (!reachedEnd) segments.length = Math.min(segments.length, 1);

  // Trim the first and last segments to the selection's offsets. With one segment both apply to it.
  if (segments.length > 0) {
    const startOffset = selection.start.offset ?? 0;
    const endOffset = selection.end?.offset;
    if (segments.length === 1) {
      // `endOffset` indexes the END node's text. It applies here only when the end was actually
      // reached, which for a single segment means start and end name the same text node. On the
      // degraded path above the sole segment is the START node, and applying the end node's offset
      // to it would keep an arbitrary prefix instead of the whole node.
      segments[0].text = reachedEnd
        ? segments[0].text.slice(startOffset, endOffset)
        : segments[0].text.slice(startOffset);
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
    const ancestors = getAncestorCharacterMarkers(usjRW, selection.start.jsonPath);
    // Inside a note, which coverage excludes entirely. Report "no information" rather than
    // `hasUncovered: true`: claiming unmarked text is selected would describe a location this
    // function deliberately does not measure. The empty result makes the caller fall back to its
    // own context, exactly as it does for any other unresolvable selection.
    if (!ancestors) return EMPTY_COVERAGE;
    const caretStates: Record<string, CharacterMarkerCoverageState> = {};
    ancestors.forEach((marker) => {
      caretStates[marker] = 'all';
    });
    return {
      markerStates: caretStates,
      hasUncovered: ancestors.length === 0 && segments.length > 0,
    };
  }

  const markerStates: Record<string, CharacterMarkerCoverageState> = {};
  coveredLengthByMarker.forEach((coveredLength, marker) => {
    markerStates[marker] = coveredLength >= totalLength ? 'all' : 'partial';
  });
  return { markerStates, hasUncovered: uncoveredLength > 0 };
}
