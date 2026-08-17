/**
 * Why the Replace and Replace All controls are unavailable for the current project and replacement.
 *
 * - `readOnly` — the bound project cannot be written to at all (e.g. Find is pointed at a published
 *   resource opened in the editor column rather than at a translation project).
 * - `structureChangingMarker` — the project is writable, but structure is locked and the replacement
 *   text itself carries a paragraph, verse, or chapter marker, so the replacement is guaranteed to
 *   be rejected.
 */
export type ReplaceUnavailableReason = 'readOnly' | 'structureChangingMarker';

/**
 * Resolves why Replace and Replace All are unavailable, or `undefined` when they are available.
 *
 * `readOnly` takes precedence: a read-only project rejects every replacement, so naming the marker
 * problem would send the user off to fix a replacement that still could not be applied afterward.
 */
export function getReplaceUnavailableReason(
  isReadOnly: boolean,
  isStructureProtected: boolean,
  isReplacementStructureChanging: boolean,
): ReplaceUnavailableReason | undefined {
  if (isReadOnly) return 'readOnly';
  if (isStructureProtected && isReplacementStructureChanging) return 'structureChangingMarker';
  return undefined;
}
