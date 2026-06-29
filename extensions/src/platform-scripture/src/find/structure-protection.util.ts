import { usfmMarkers, MarkerType } from 'platform-bible-utils';

/**
 * Sentinel error message thrown by the Scripture Finder PDP's `replace()` when a replacement would
 * change structure while protection is active. The Find web view matches this substring to surface
 * a localized, user-facing message. Keep this stable — both producer (PDP) and consumer (UI) depend
 * on it.
 */
export const STRUCTURE_PROTECTED_ERROR = 'platformScripture.replace.structureProtected';

/**
 * True when a marker is a paragraph- or verse-level (block) structure marker.
 *
 * Mirrors `isBlockMarker` in
 * `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts` (canonical):
 * paragraph-type markers (identified via {@link usfmMarkers}/{@link MarkerType.Paragraph}, which
 * already includes chapter `c`) plus verse (`v`, which is typed Character and is special-cased).
 */
export function isStructuralMarker(marker: string): boolean {
  return usfmMarkers[marker]?.type === MarkerType.Paragraph || marker === 'v';
}

/**
 * Matches a USFM backslash marker token: optional `+` nesting, a marker name with optional numeric
 * suffix (e.g. `q1`), and an optional closing `*`.
 */
const MARKER_TOKEN_REGEX = /\\\+?([a-z]+\d*)\*?/g;

/**
 * Extracts the ordered sequence of structural markers from a USFM string. Paragraph markers are
 * represented by their style (e.g. `p`, `q1`, `c`); verse markers include the verse identifier that
 * follows them (e.g. `v:4`, `v:4-5`). Non-structural (inline/character) markers are ignored.
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
      if (marker === 'v') {
        // Capture the verse identifier immediately following `\v` (e.g. "4" or "4-5").
        const after = usfm.slice(regex.lastIndex);
        // Verse IDs start with a digit per USFM (e.g. "4", "4a", "4-5"); avoid capturing a following marker.
        const numMatch = after.match(/^\s*(\d[\d\w-]*)/);
        result.push(`v:${numMatch ? numMatch[1] : ''}`);
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
 * structural (paragraph-level or verse) marker.
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

/** Inputs to {@link computeEffectiveStructureProtection}. */
export type EffectiveStructureProtectionInputs = {
  /** Global `platform.interfaceMode` value; the feature applies only in `'simple'`. */
  interfaceMode: string | undefined;
  /** Project-level `platformScripture.structureProtected` admin setting. */
  isAdminProtected: boolean;
  /** Whether the current user can toggle the admin/project lock. */
  canAdminToggle: boolean;
  /** The user's personal preference; `undefined` when never set. */
  userSetting: boolean | undefined;
};

/**
 * Computes effective structure protection. Duplicated from `useStructureProtectionState` in
 * `extensions/src/platform-scripture-editor/src/use-structure-protection-state.hook.ts` (canonical
 * source of truth) because that hook lives in a different extension and cannot be imported here.
 * Keep in sync with that hook.
 */
export function computeEffectiveStructureProtection({
  interfaceMode,
  isAdminProtected,
  canAdminToggle,
  userSetting,
}: EffectiveStructureProtectionInputs): boolean {
  const isProtectionActive = interfaceMode === 'simple';
  if (!isProtectionActive) return false;
  const effectiveUserSetting = userSetting ?? isProtectionActive;
  return (isAdminProtected && !canAdminToggle) || effectiveUserSetting;
}
