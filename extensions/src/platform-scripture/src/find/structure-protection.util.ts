import { isBlockMarker } from 'platform-bible-utils';

/**
 * Sentinel error message thrown by the Scripture Finder PDP's `replace()` when a replacement would
 * change structure while protection is active. The Find web view matches this substring to surface
 * a localized, user-facing message. Keep this stable — both producer (PDP) and consumer (UI) depend
 * on it.
 */
export const STRUCTURE_PROTECTED_ERROR = 'platformScripture.replace.structureProtected';

/**
 * Matches a USFM backslash marker token: optional `+` nesting, a marker name with optional numeric
 * suffix (e.g. `q1`), and an optional closing `*`.
 */
const MARKER_TOKEN_REGEX = /\\\+?([a-z]+\d*)\*?/g;

/**
 * Table markers that `isBlockMarker` does not recognize. A table row or cell begins its own block
 * just as a paragraph marker does, so deleting one loses structure, but `tr`/`tc#`/`th#`/`tcr#`/
 * `thr#` are absent from the shared marker map and report `false`.
 */
const TABLE_MARKER_REGEX = /^(?:tr|t[hc]r?\d+)$/;

/**
 * Note markers. Not structural — a footnote does not begin a block — but deleting one silently
 * destroys authored content, so {@link usfmDeletesMarkers} counts them even though
 * {@link extractStructuralMarkers} does not.
 */
const NOTE_MARKER_REGEX = /^(?:f|fe|ef|x|ex)$/;

/** True when a marker begins its own block, including the table markers `isBlockMarker` misses. */
function isStructuralMarker(marker: string): boolean {
  return isBlockMarker(marker) || TABLE_MARKER_REGEX.test(marker);
}

/**
 * Extracts the ordered sequence of structural markers from a USFM string. Paragraph markers are
 * represented by their style (e.g. `p`, `q1`); verse and chapter markers include the number/
 * identifier that follows them (e.g. `v:4`, `v:4-5`, `c:1`) so renumbering is detected.
 * Non-structural (inline/character) markers are ignored.
 */
export function extractStructuralMarkers(usfm: string): string[] {
  const result: string[] = [];
  const regex = new RegExp(MARKER_TOKEN_REGEX);
  let match = regex.exec(usfm);
  // regex.exec() returns null (not undefined) when there is no match, and we need to check for null
  // eslint-disable-next-line no-null/no-null
  while (match !== null) {
    const marker = match[1];
    if (isStructuralMarker(marker)) {
      if (marker === 'v' || marker === 'c') {
        // Capture the number/identifier immediately following a verse (`\v`) or chapter (`\c`)
        // marker so renumbering is detected (e.g. "4", "4a", "4-5" for verses; "1" for chapters).
        // Without this, `\c 1` → `\c 2` would extract identically and slip past structure protection.
        const after = usfm.slice(regex.lastIndex);
        // Verse/chapter IDs start with a digit per USFM (e.g. "4", "4a", "4-5"); avoid capturing a following marker.
        const numMatch = after.match(/^\s*(\d[\d\w-]*)/);
        result.push(`${marker}:${numMatch ? numMatch[1] : ''}`);
      } else {
        result.push(marker);
      }
    }
    match = regex.exec(usfm);
  }
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
 * opt-in Simple-mode protection refusing a structural _change_, whereas this reports the always-on
 * guard refusing marker _deletion_ in any interface mode.
 */
export const MARKER_DELETION_ERROR = 'platformScripture.replace.markerDeletion';

/**
 * True when replacing `removed` with `inserted` would delete a block marker or a note that the
 * replacement does not put back.
 *
 * This is deliberately narrower than {@link usfmChangesStructure}, which also refuses additions and
 * reordering: those are matters of editorial policy and stay behind the opt-in Simple-mode
 * protection. Losing a marker that was there is not policy — it is unrecoverable content loss — so
 * it is refused in every interface mode.
 *
 * Notes (`\f`, `\x`, …) count here but not as structure: a footnote does not begin a block, yet a
 * replacement that swallows one destroys authored text with nothing on screen to show for it.
 */
export function usfmDeletesMarkers(removed: string, inserted: string): boolean {
  const countMarkers = (usfm: string) => {
    const counts = new Map<string, number>();
    const regex = new RegExp(MARKER_TOKEN_REGEX);
    let match = regex.exec(usfm);
    // regex.exec() returns null (not undefined) when there is no match
    // eslint-disable-next-line no-null/no-null
    while (match !== null) {
      const marker = match[1];
      if (isStructuralMarker(marker) || NOTE_MARKER_REGEX.test(marker))
        counts.set(marker, (counts.get(marker) ?? 0) + 1);
      match = regex.exec(usfm);
    }
    return counts;
  };

  const before = countMarkers(removed);
  if (before.size === 0) return false;
  const after = countMarkers(inserted);
  return [...before].some(([marker, count]) => (after.get(marker) ?? 0) < count);
}

/**
 * True when a replacement string itself contains a structural marker. Used by the UI to proactively
 * disable Replace (such a replacement is guaranteed to add a marker and be rejected).
 */
export function replacementContainsStructuralMarker(text: string): boolean {
  return extractStructuralMarkers(text).length > 0;
}
