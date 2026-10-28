import { forEachMarkerToken, isNoteMarker, isStructuralMarker } from './usfm-tokens.util';

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
    if (marker === 'v' || marker === 'c') {
      // Capture the number/identifier immediately following a verse (`\v`) or chapter (`\c`)
      // marker so renumbering is detected (e.g. "4", "4a", "4-5" for verses; "1" for chapters).
      // Without this, `\c 1` → `\c 2` would extract identically and slip past structure protection.
      const after = usfm.slice(matchEndIndex);
      // Verse/chapter IDs start with a digit per USFM (e.g. "4", "4a", "4-5"); avoid capturing a following marker.
      const numMatch = after.match(/^\s*(\d[\d\w-]*)/);
      result.push(`${marker}:${numMatch ? numMatch[1] : ''}`);
    } else {
      result.push(marker);
    }
  });
  return result;
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
 * Extracts every marker whose deletion {@link markersDeletedBy} refuses: structural markers, plus
 * notes.
 *
 * Notes (`\f`, `\x`, …) count here but not as structure: a footnote does not begin a block, yet a
 * replacement that swallows one destroys authored text with nothing on screen to show for it.
 *
 * Unlike {@link extractStructuralMarkers} this reports bare marker names — a deletion guard asks
 * whether the marker survives at all, not whether it was renumbered, which is what structure
 * protection asks.
 */
export function extractGuardedMarkers(usfm: string): string[] {
  const result: string[] = [];
  forEachMarkerToken(usfm, (marker) => {
    if (isStructuralMarker(marker) || isNoteMarker(marker)) result.push(marker);
  });
  return result;
}

/**
 * True when `inserted` does not put back every marker in `removedMarkers` (as returned by
 * {@link extractGuardedMarkers}).
 *
 * This is deliberately narrower than {@link usfmChangesStructure}, which also refuses additions and
 * reordering: those are matters of editorial policy and stay behind the opt-in Simple-mode
 * protection. Losing a marker that was there is not policy — it is unrecoverable content loss.
 *
 * Split from {@link usfmDeletesMarkers} so the Find UI can extract a result's markers once, when
 * results are built, and re-test them cheaply against each replacement term the user types.
 */
export function markersDeletedBy(removedMarkers: string[], inserted: string): boolean {
  if (removedMarkers.length === 0) return false;
  const before = new Map<string, number>();
  removedMarkers.forEach((marker) => before.set(marker, (before.get(marker) ?? 0) + 1));
  const after = new Map<string, number>();
  extractGuardedMarkers(inserted).forEach((marker) =>
    after.set(marker, (after.get(marker) ?? 0) + 1),
  );
  return [...before].some(([marker, count]) => (after.get(marker) ?? 0) < count);
}

/**
 * True when replacing `removed` with `inserted` would delete a structural marker or a note that the
 * replacement does not put back. See {@link markersDeletedBy} for the rule.
 */
export function usfmDeletesMarkers(removed: string, inserted: string): boolean {
  return markersDeletedBy(extractGuardedMarkers(removed), inserted);
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
