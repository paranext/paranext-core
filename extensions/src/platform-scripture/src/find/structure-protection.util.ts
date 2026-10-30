import type { FindResult } from 'platform-scripture';
import {
  forEachMarkerToken,
  getMarkerClosedBy,
  isStructuralMarker,
  MARKER_ATTRIBUTES_REGEX,
  mustMarkerBeClosed,
  OPTIONAL_BREAK_MARKER,
} from './usfm-tokens.util';

/**
 * Sentinel error message thrown by the Scripture Finder PDP's `replace()` when a replacement would
 * change structure while protection is active. The Find web view matches this substring to surface
 * a localized, user-facing message. Keep this stable — both producer (PDP) and consumer (UI) depend
 * on it.
 */
export const STRUCTURE_PROTECTED_ERROR = 'platformScripture.replace.structureProtected';

/**
 * Extracts the ordered sequence of structural markers from a USFM string. Paragraph markers are
 * represented by their style (e.g. `p`, `q1`); verse and chapter markers include the number/
 * identifier that follows them (e.g. `v:4`, `v:4-5`, `c:1`) so renumbering is detected. Table rows
 * and cells (`tr`, `tc2`, `thc3`) and sidebar boundaries (`esb`, `esbe`) are structural too, since
 * each begins its own block. Non-structural (inline/character) markers and notes are ignored — for
 * notes see {@link usfmDeletesMarkers}, which counts them.
 */
export function extractStructuralMarkers(usfm: string): string[] {
  const result: string[] = [];
  forEachMarkerToken(usfm, (marker, matchEndIndex) => {
    if (!isStructuralMarker(marker)) return;
    result.push(spellVerseOrChapter(usfm, marker, matchEndIndex) ?? marker);
  });
  return result;
}

/**
 * Spells a verse or chapter marker with the number or identifier following it (`v:4`, `v:4-5`,
 * `c:1`), so renumbering is detected. Without this, `\c 1` → `\c 2` would extract identically.
 *
 * @returns The spelling, or `undefined` when `marker` is neither a verse nor a chapter marker
 */
function spellVerseOrChapter(
  usfm: string,
  marker: string,
  matchEndIndex: number,
): string | undefined {
  if (marker !== 'v' && marker !== 'c') return undefined;
  // Verse/chapter IDs start with a digit per USFM (e.g. "4", "4a", "4-5"); avoid capturing a following marker.
  const numMatch = usfm.slice(matchEndIndex).match(/^\s*(\d[\d\w-]*)/);
  return `${marker}:${numMatch ? numMatch[1] : ''}`;
}

/**
 * True when replacing `removed` with `inserted` would add, remove, change, or reorder any
 * structural (paragraph-level, verse, or chapter) marker.
 */
export function usfmChangesStructure(removed: string, inserted: string): boolean {
  const before = extractStructuralMarkers(removed);
  const after = extractStructuralMarkers(inserted);
  if (before.length !== after.length) return true;
  return before.some((marker, index) => marker !== after[index]);
}

/**
 * Sentinel error message thrown by the Scripture Finder PDP's `replace()` when a replacement would
 * delete a marker outright. Distinct from {@link STRUCTURE_PROTECTED_ERROR}: that one reports the
 * opt-in Simple-mode protection refusing a structural _change_, whereas this reports the guard
 * refusing marker _deletion_ where structure protection is not already refusing the replacement.
 */
export const MARKER_DELETION_ERROR = 'platformScripture.replace.markerDeletion';

/**
 * Sentinel error message thrown by the Scripture Finder PDP's `replace()` when a replacement would
 * delete only one end of a marker pair. Unlike {@link MARKER_DELETION_ERROR} no confirmation lifts
 * this: the result is a style that never ends or a note with no start.
 */
export const ONE_ENDED_MARKER_ERROR = 'platformScripture.replace.oneEndedMarker';

/**
 * How a milestone with no `-s`/`-e` suffix reads when a bare `\*` closes it on the spot: optional
 * whitespace, an optional `|attribute` payload, then the `\*`. Telling it apart from a custom `\z`
 * character marker takes this look ahead, since the map types both as milestones.
 */
const SELF_CLOSED_MILESTONE_REGEX = /^[ \t]*(?:\|[^\\]*)?\\\*/;

/** Spells a self-closed milestone in {@link extractGuardedMarkers}: `zms\*`. */
const SELF_CLOSED_MILESTONE_SUFFIX = '\\*';

/**
 * Extracts every marker in `usfm`, in order — everything a replacement of that span would delete.
 *
 * Each spelling keeps what the callers need to compare and pair:
 *
 * - A closing marker keeps its `*` (`nd*`), so the two ends of a pair stay distinguishable.
 * - A verse or chapter marker keeps its number (`v:3`), so `\v 9` does not count as putting `\v 3`
 *   back.
 * - A nested marker loses its `+`, which is not part of its identity.
 * - A self-closed milestone keeps its empty closer (`zms\*`), since it has no other end.
 *
 * Optional line breaks (`//`) follow the markers that have backslashes, rather than sitting in
 * order among them. They have no other end, so nothing depends on where they fall.
 */
export function extractGuardedMarkers(usfm: string): string[] {
  const result: string[] = [];
  forEachMarkerToken(usfm, (marker, matchEndIndex) => {
    if (usfm[matchEndIndex - 1] === '*') {
      result.push(`${marker}*`);
      return;
    }
    const verseOrChapter = spellVerseOrChapter(usfm, marker, matchEndIndex);
    if (verseOrChapter) {
      result.push(verseOrChapter);
      return;
    }
    const isSelfClosedMilestone =
      !/-[se]$/.test(marker) && SELF_CLOSED_MILESTONE_REGEX.test(usfm.slice(matchEndIndex));
    result.push(isSelfClosedMilestone ? `${marker}${SELF_CLOSED_MILESTONE_SUFFIX}` : marker);
  });
  // An attribute can hold a URL, whose slashes are not a line break.
  const optionalBreaks = usfm.replace(MARKER_ATTRIBUTES_REGEX, '').split(OPTIONAL_BREAK_MARKER);
  return [...result, ...Array<string>(optionalBreaks.length - 1).fill(OPTIONAL_BREAK_MARKER)];
}

/** The markers in `removedMarkers` that `inserted` does not put back. */
function findLostMarkers(removedMarkers: string[], inserted: string): string[] {
  if (removedMarkers.length === 0) return [];
  const putBack = new Map<string, number>();
  extractGuardedMarkers(inserted).forEach((marker) =>
    putBack.set(marker, (putBack.get(marker) ?? 0) + 1),
  );
  return removedMarkers.filter((marker) => {
    const count = putBack.get(marker) ?? 0;
    if (count === 0) return true;
    putBack.set(marker, count - 1);
    return false;
  });
}

/**
 * True when `inserted` does not put back every marker in `removedMarkers` (as returned by
 * {@link extractGuardedMarkers}).
 *
 * This is deliberately narrower than {@link usfmChangesStructure}, which also refuses additions and
 * reordering: those are matters of editorial policy and stay behind the opt-in Simple-mode
 * protection. Losing a marker that was there is not policy — it is content loss the user has to
 * have agreed to.
 *
 * Split from {@link usfmDeletesMarkers} so the Find UI can extract a result's markers once, when
 * results are built, and re-test them cheaply against each replacement term the user types.
 */
export function markersDeletedBy(removedMarkers: string[], inserted: string): boolean {
  return findLostMarkers(removedMarkers, inserted).length > 0;
}

/**
 * True when replacing `removed` with `inserted` would delete a marker that the replacement does not
 * put back. See {@link markersDeletedBy} for the rule.
 */
export function usfmDeletesMarkers(removed: string, inserted: string): boolean {
  return markersDeletedBy(extractGuardedMarkers(removed), inserted);
}

/**
 * The tokens in `markers` (as returned by {@link extractGuardedMarkers}) whose other end is not in
 * the list: a closer with no opener before it, or an opener still in effect where the list ends.
 * Markers that are not half of a pair, such as `\p` and `\v`, are never reported.
 *
 * A closer also ends whatever opened inside it, so a whole note counts as whole even though its
 * `\ft` has no closer of its own.
 */
export function findOneEndedMarkers(markers: string[]): string[] {
  const opened: string[] = [];
  const closersWithNoOpener: string[] = [];
  markers.forEach((token) => {
    if (token.endsWith(SELF_CLOSED_MILESTONE_SUFFIX)) return;
    const closedMarker = getMarkerClosedBy(token);
    if (closedMarker === undefined) {
      opened.push(token);
      return;
    }
    const openerIndex = opened.lastIndexOf(closedMarker);
    if (openerIndex >= 0) opened.length = openerIndex;
    else closersWithNoOpener.push(token);
  });
  return [...closersWithNoOpener, ...opened.filter(mustMarkerBeClosed)];
}

/**
 * True when `inserted` puts back so few of `removedMarkers` that one end of a pair is lost.
 *
 * Asked of the markers lost rather than the markers in the span: a span can hold a balanced pair
 * and still have a replacement keep only one end of it.
 */
function markersLoseOneEnd(removedMarkers: string[], inserted: string): boolean {
  return findOneEndedMarkers(findLostMarkers(removedMarkers, inserted)).length > 0;
}

/** True when replacing `removed` with `inserted` would delete only one end of a marker pair. */
export function usfmDeletesOneEndOfMarker(removed: string, inserted: string): boolean {
  return markersLoseOneEnd(extractGuardedMarkers(removed), inserted);
}

/**
 * True when `inserted` does not put back a chapter marker in `removedMarkers`. A confirmed Replace
 * still may not do this: it would merge two chapters.
 */
export function markersDeleteChapter(removedMarkers: string[], inserted: string): boolean {
  return findLostMarkers(removedMarkers, inserted).some((marker) => marker.startsWith('c:'));
}

/**
 * What a single Replace has to do about the markers in its match:
 *
 * - `replace`: nothing is deleted, so it goes ahead.
 * - `confirm`: it deletes markers, so the user has to agree first.
 * - `structureProtected`, `chapterMarker`, `oneEndedMarker`: it may not go ahead, so the match is
 *   skipped and the user is told why.
 */
export type MarkerReplaceAction =
  | 'replace'
  | 'confirm'
  | 'structureProtected'
  | 'chapterMarker'
  | 'oneEndedMarker';

/**
 * Decides what a single Replace of `result` with `replacement` has to do about the markers in the
 * match. Mirrors, in the same order, the guards `replace()` enforces, so that the user is asked or
 * told before the click can only fail.
 *
 * @param result The result being replaced
 * @param replacement The USFM that will actually be written, after any preserve-case change
 * @param isStructureProtected Whether structure protection is in effect for the project
 */
export function getMarkerReplaceAction(
  result: Pick<FindResult, 'matchedUsfm' | 'removedMarkers'>,
  replacement: string,
  isStructureProtected: boolean,
): MarkerReplaceAction {
  const removedMarkers = result.removedMarkers ?? [];
  // Whether this should skip or ask is still open with UX (PT-4969). To change it, this is the only
  // line the web view depends on; `replace()` refuses a structural change either way.
  if (isStructureProtected && usfmChangesStructure(result.matchedUsfm, replacement))
    return 'structureProtected';
  if (markersLoseOneEnd(removedMarkers, replacement)) return 'oneEndedMarker';
  if (markersDeleteChapter(removedMarkers, replacement)) return 'chapterMarker';
  return markersDeletedBy(removedMarkers, replacement) ? 'confirm' : 'replace';
}

/**
 * True when a replacement string itself contains a structural marker. Used by the UI to proactively
 * disable Replace while structure protection is active: such a replacement adds a marker, which
 * {@link usfmChangesStructure} rejects.
 *
 * Reports table and sidebar markers as well as paragraph, verse, and chapter ones, since
 * {@link extractStructuralMarkers} recognizes all of them.
 */
export function replacementContainsStructuralMarker(text: string): boolean {
  return extractStructuralMarkers(text).length > 0;
}
