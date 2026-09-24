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
    if (isBlockMarker(marker)) {
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
 * True when a replacement string itself contains a structural marker. Used by the UI to proactively
 * disable Replace (such a replacement is guaranteed to add a marker and be rejected).
 */
export function replacementContainsStructuralMarker(text: string): boolean {
  return extractStructuralMarkers(text).length > 0;
}
