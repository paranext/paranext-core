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
  /** Where the selection starts. */
  start: CharacterMarkerSelectionLocation;
  /** Where the selection ends. Absent means a collapsed caret at `start`. */
  end?: CharacterMarkerSelectionLocation;
};

/**
 * One end of a {@link CharacterMarkerSelection}: any `UsjDocumentLocation` shape, declared
 * structurally. Which optional field is present says what the location points at — `offset` for a
 * text content string; `propertyOffset` for a property value such as a marker's name (the
 * `jsonPath` then ends in a bracketed property name); `closingMarkerOffset`, `keyName`, `keyOffset`
 * or `keyClosingMarkerOffset` for a closing marker or attribute; none of them for the start of a
 * marker object.
 */
export type CharacterMarkerSelectionLocation = {
  jsonPath: string;
  offset?: number;
  propertyOffset?: number;
  closingMarkerOffset?: number;
  keyName?: string;
  keyOffset?: number;
  keyClosingMarkerOffset?: number;
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

/** Properties whose value is written in the owning marker's opener (`\nd`, `\v 1`, `\f +`). */
const OPENER_SIDE_PROPERTIES = ['marker', 'number', 'caller', 'code'];

/** Matches the bracketed property name a property location's `jsonPath` ends in. */
const TRAILING_PROPERTY_REGEX = /\[(?:'([^']*)'|"([^"]*)")\]$/;

/**
 * Where a selection end sits relative to the USJ node its `jsonPath` names:
 *
 * - `'node'`: at the node itself — inside a text string at `offset`, or at the start of a marker
 *   object.
 * - `'after-content'`: after the owning marker object's content — its closing marker or an attribute.
 */
type NormalizedPosition = {
  jsonPath: string;
  offset?: number;
  kind: 'node' | 'after-content';
};

/**
 * Maps any location shape to a node position the document walk can use. A location in the owner's
 * opener (its marker name, verse number, note caller) is the owner's start; a closing-marker,
 * attribute or other property location is after the owner's content.
 */
function normalizeLocation(location: CharacterMarkerSelectionLocation): NormalizedPosition {
  const { jsonPath, offset } = location;
  if (typeof offset === 'number') return { jsonPath, offset, kind: 'node' };

  const propertyMatch = TRAILING_PROPERTY_REGEX.exec(jsonPath);
  if (propertyMatch) {
    const ownerJsonPath = jsonPath.slice(0, propertyMatch.index);
    const propertyName = propertyMatch[1] ?? propertyMatch[2];
    return {
      jsonPath: ownerJsonPath,
      kind: OPENER_SIDE_PROPERTIES.includes(propertyName) ? 'node' : 'after-content',
    };
  }

  const isAfterContent =
    location.closingMarkerOffset !== undefined ||
    location.keyName !== undefined ||
    location.keyOffset !== undefined ||
    location.keyClosingMarkerOffset !== undefined ||
    location.propertyOffset !== undefined;
  return { jsonPath, kind: isAfterContent ? 'after-content' : 'node' };
}

/** Whether `jsonPath` is `ancestorJsonPath` itself or anything beneath it. */
function isSelfOrDescendant(jsonPath: string, ancestorJsonPath: string): boolean {
  return jsonPath === ancestorJsonPath || jsonPath.startsWith(`${ancestorJsonPath}.`);
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
 *   measure — a selection inside a note, or a path that does not resolve against `usj` (a selection
 *   taken from a different document than `usj`) — which is treated as "no information", never as a
 *   throw and never as "the selection is unmarked".
 */
export function computeCharacterMarkerCoverage(
  usj: Usj,
  selection: CharacterMarkerSelection | undefined,
): CharacterMarkerCoverage {
  if (!selection?.start?.jsonPath) return EMPTY_COVERAGE;

  const usjRW = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });

  // Property, closing-marker and attribute locations are normalized to the marker object that owns
  // them; none of them resolve to a node of their own.
  const startPosition = normalizeLocation(selection.start);
  const endPosition = normalizeLocation(selection.end ?? selection.start);

  let startLocation;
  try {
    startLocation = usjRW.jsonPathToUsjNodeAndDocumentLocation(startPosition.jsonPath);
    // Resolve the end too, so an unresolvable end path fails here rather than silently walking to
    // the end of the chapter.
    usjRW.jsonPathToUsjNodeAndDocumentLocation(endPosition.jsonPath);
  } catch {
    return EMPTY_COVERAGE;
  }
  if (!startLocation) return EMPTY_COVERAGE;

  // A start after its owner's content begins after the owner's whole subtree.
  const skipsStartSubtree = startPosition.kind === 'after-content';
  const endsAfterContent = endPosition.kind === 'after-content';

  // Walk forward from the start, collecting the text nodes up to the end. The walk includes its
  // starting point, and returning `true` stops it.
  const segments: { jsonPath: string; text: string }[] = [];
  // An end after its owner's content is already reached when the start is inside that owner.
  let reachedEnd =
    endsAfterContent && isSelfOrDescendant(startPosition.jsonPath, endPosition.jsonPath);
  usjRW.findNextMatchingNode(startLocation, ({ node, documentLocation }) => {
    const { jsonPath } = documentLocation;
    // Leaving the end owner's subtree ends the walk. Checked before collecting so the node that
    // carried us out never enters `segments`.
    if (endsAfterContent && reachedEnd && !isSelfOrDescendant(jsonPath, endPosition.jsonPath))
      return true;

    if (jsonPath === endPosition.jsonPath) {
      reachedEnd = true;
      // An end at the start of a marker object is exclusive: it is the gap in front of that
      // object, so nothing of it is selected.
      if (!endsAfterContent && !isString(node)) return true;
    }

    const isSkipped = skipsStartSubtree && isSelfOrDescendant(jsonPath, startPosition.jsonPath);
    if (isString(node) && !isSkipped) segments.push({ jsonPath, text: node });

    return !endsAfterContent && jsonPath === endPosition.jsonPath;
  });
  // An end that never came up (an unreachable range) degrades to the start node alone rather than
  // to the rest of the chapter. Note this is not the backwards-drag case: the editor normalizes
  // selection direction before this sees it (`$getUsjSelectionFromEditor` swaps anchor and focus
  // on `isBackward()`), so `start` always precedes `end` in document order.
  if (!reachedEnd) segments.length = Math.min(segments.length, 1);

  // Trim the first and last segments to the selection's offsets. With one segment both apply to it.
  if (segments.length > 0) {
    const startOffset = startPosition.kind === 'node' ? (startPosition.offset ?? 0) : 0;
    const endOffset = endPosition.kind === 'node' ? endPosition.offset : undefined;
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
    const ancestors = getAncestorCharacterMarkers(usjRW, startPosition.jsonPath);
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
