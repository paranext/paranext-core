import type { FindResult } from 'platform-scripture';
import {
  forEachMarkerToken,
  getIndependentlyClosedMarker,
  getMarkerDefaultAttribute,
  isNoteMarker,
  isStructuralMarker,
  MARKER_ATTRIBUTES_REGEX,
  MILESTONE_CLOSER_REGEX,
  mustMarkerBeClosed,
  OPTIONAL_BREAK_MARKER,
  VERSE_OR_CHAPTER_OPERAND_REGEX,
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
 * notes see {@link extractGuardedMarkers}, which counts them.
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
  const numMatch = usfm.slice(matchEndIndex).match(VERSE_OR_CHAPTER_OPERAND_REGEX);
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
 * this: see {@link getMarkerReplaceAction}.
 */
export const ONE_ENDED_MARKER_ERROR = 'platformScripture.replace.oneEndedMarker';

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
      !/-[se]$/.test(marker) && MILESTONE_CLOSER_REGEX.test(usfm.slice(matchEndIndex));
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
 * Takes markers already extracted, so a result's markers, extracted once when results are built,
 * can be tested against a replacement without reading its USFM again.
 */
export function markersDeletedBy(removedMarkers: string[], inserted: string): boolean {
  return findLostMarkers(removedMarkers, inserted).length > 0;
}

/** A milestone's `sid` or `eid` attribute, which says which start a given end belongs to. */
const MILESTONE_ID_REGEX = /\b[se]id\s*=\s*"([^"]*)"/;

/** The attributes that identify a milestone pair: see {@link readMilestoneId}. */
const MILESTONE_ID_ATTRIBUTES = new Set(['sid', 'eid']);

/**
 * Reads the id that pairs a milestone end with its other end, from the `|…` payload before its
 * `\*`.
 *
 * The id is written out as `sid="t1"` or `eid="t1"`, or bare (`\ts-s |t1\*`) when it is the only
 * attribute and the markers map makes it the marker's default attribute — which is how the USFM
 * writer spells it. A bare value on a marker whose default attribute is something else, such as
 * `\qt-s |Pilate\*` (`who`), is not an id.
 *
 * @param attributes The payload, with its leading `|`, or `''` when there is none
 */
function readMilestoneId(marker: string, attributes: string): string | undefined {
  const explicitId = MILESTONE_ID_REGEX.exec(attributes)?.[1];
  if (explicitId !== undefined) return explicitId;
  if (attributes.includes('=')) return undefined;
  const defaultAttribute = getMarkerDefaultAttribute(marker);
  if (defaultAttribute === undefined || !MILESTONE_ID_ATTRIBUTES.has(defaultAttribute))
    return undefined;
  const bareValue = attributes.slice(1).trim();
  return bareValue === '' ? undefined : bareValue;
}

/**
 * Identifies a milestone end by its spelling: `qt-s` opens and `qt-e` closes, and the two pair by
 * name plus their `sid`/`eid` when one is given, so two overlapping quotations do not pair with
 * each other.
 *
 * @returns The pair it belongs to and whether it is the start, or `undefined` when `marker` is not
 *   a milestone end
 */
function readMilestoneEnd(
  usfm: string,
  marker: string,
  matchEndIndex: number,
): { pair: string; isStart: boolean } | undefined {
  const side = /-([se])$/.exec(marker)?.[1];
  if (!side) return undefined;
  const attributes = MILESTONE_CLOSER_REGEX.exec(usfm.slice(matchEndIndex))?.[1] ?? '';
  const id = readMilestoneId(marker, attributes);
  const name = marker.slice(0, -2);
  return { pair: id === undefined ? name : `${name}|${id}`, isStart: side === 's' };
}

/** The ends of one pair of markers that a span holds without the other. */
type UnpairedEnds = {
  /** Closers with no opener before them in the span: each ends something opened before it. */
  closers: number;
  /** Openers with no closer after them in the span: each runs on past it. */
  openers: number;
};

/**
 * For each pair of markers in `usfm`, the ends it holds without the other: see {@link UnpairedEnds}.
 * A pair whose ends are all matched up within `usfm` is reported with zero of each. Markers with no
 * other end, such as `\p` and `\v`, are not reported.
 *
 * The two are kept apart, not netted, because a closer only ends an opener before it: in `LORD\nd*
 * said to my \nd Lord`, the `\nd*` ends a span that started before, and the `\nd` starts one that
 * ends after, so the span holds one end each of two different pairs.
 *
 * A note's closer also ends whatever is still open inside it, so a whole note balances even though
 * its `\ft` has no closer of its own. Other closers end only their own opener: a milestone or a
 * character style that overlaps another does not close it.
 *
 * @param closedNames The markers known to be paired because a closer for them is in sight
 */
function countUnpairedEnds(
  usfm: string,
  closedNames: ReadonlySet<string>,
): Map<string, UnpairedEnds> {
  const unpaired = new Map<string, UnpairedEnds>();
  const entryFor = (pair: string) => {
    let entry = unpaired.get(pair);
    if (!entry) {
      entry = { closers: 0, openers: 0 };
      unpaired.set(pair, entry);
    }
    return entry;
  };
  const opened: string[] = [];
  // Milestones are tracked apart from `opened`: they do not nest, and a note's closer does not end
  // one.
  const openedMilestones: string[] = [];
  const close = (pair: string, openers: string[], endsWhatIsInside: boolean) => {
    const entry = entryFor(pair);
    const openerIndex = openers.lastIndexOf(pair);
    if (openerIndex < 0) entry.closers += 1;
    else if (endsWhatIsInside) openers.splice(openerIndex);
    else openers.splice(openerIndex, 1);
  };
  forEachMarkerToken(usfm, (marker, matchEndIndex) => {
    const milestoneEnd = readMilestoneEnd(usfm, marker, matchEndIndex);
    if (milestoneEnd) {
      if (milestoneEnd.isStart) {
        entryFor(milestoneEnd.pair);
        openedMilestones.push(milestoneEnd.pair);
      } else close(milestoneEnd.pair, openedMilestones, false);
      return;
    }
    if (MILESTONE_CLOSER_REGEX.test(usfm.slice(matchEndIndex))) return;
    const closedMarker =
      usfm[matchEndIndex - 1] === '*' ? marker : getIndependentlyClosedMarker(marker);
    if (closedMarker !== undefined) {
      close(closedMarker, opened, isNoteMarker(closedMarker));
      return;
    }
    if (!closedNames.has(marker) && !mustMarkerBeClosed(marker)) return;
    entryFor(marker);
    opened.push(marker);
  });
  [...opened, ...openedMilestones].forEach((pair) => {
    entryFor(pair).openers += 1;
  });
  return unpaired;
}

/** The names of the markers that `usfm` closes with a `*`. */
function getClosedNames(usfm: string): string[] {
  const names: string[] = [];
  forEachMarkerToken(usfm, (marker, matchEndIndex) => {
    if (usfm[matchEndIndex - 1] === '*') names.push(marker);
  });
  return names;
}

/**
 * True when replacing `removed` with `inserted` leaves one end of a pair in the span without the
 * other: for some pair of markers in `removed`, the replacement does not hold exactly as many
 * closers and openers without their other end as the span does (see {@link countUnpairedEnds}). A
 * pair that only the replacement holds is not checked, since adding markers is a matter of
 * editorial policy, not something the match lost.
 *
 * The rest of the chapter is the same before and after, so comparing the span with its replacement
 * gives the same answer as checking the whole chapter.
 */
function markersLoseOneEnd(removed: string, inserted: string): boolean {
  const closedNames = new Set([...getClosedNames(removed), ...getClosedNames(inserted)]);
  const before = countUnpairedEnds(removed, closedNames);
  const after = countUnpairedEnds(inserted, closedNames);
  return [...before].some(([pair, { closers, openers }]) => {
    const replaced = after.get(pair);
    return (replaced?.closers ?? 0) !== closers || (replaced?.openers ?? 0) !== openers;
  });
}

/**
 * True when `inserted` does not put back a chapter marker in `removedMarkers`. A confirmed Replace
 * still may not do this: it would merge two chapters.
 */
function markersDeleteChapter(removedMarkers: string[], inserted: string): boolean {
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
 * match. The Find web view asks it before replacing, so the user is asked or told before the click
 * can only fail, and `replace()` enforces the same answer.
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
  // Skipping rather than asking here is a UX choice. To change it, this is the only line the web
  // view depends on; `replace()` refuses a structural change either way.
  if (isStructureProtected && usfmChangesStructure(result.matchedUsfm, replacement))
    return 'structureProtected';
  // Skipped for now, to avoid leaving broken text. Replacing one end can be intended, so Find with
  // markers (PT-3199) may allow it behind a clearly labeled Replace button.
  if (markersLoseOneEnd(result.matchedUsfm, replacement)) return 'oneEndedMarker';
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
