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

/** The current replace conditions {@link getReplaceUnavailableReason} weighs. */
export type ReplaceAvailabilityConditions = {
  /** Whether the bound project rejects every write (e.g. Find is pointed at a published resource). */
  isReadOnly: boolean;
  /** Whether the project has structure protection turned on. */
  isStructureProtected: boolean;
  /** Whether the replacement text itself carries a paragraph, verse, or chapter marker. */
  isReplacementStructureChanging: boolean;
};

/**
 * Resolves why Replace and Replace All are unavailable, or `undefined` when they are available.
 *
 * `readOnly` takes precedence: a read-only project rejects every replacement, so naming the marker
 * problem would send the user off to fix a replacement that still could not be applied afterward.
 */
export function getReplaceUnavailableReason({
  isReadOnly,
  isStructureProtected,
  isReplacementStructureChanging,
}: ReplaceAvailabilityConditions): ReplaceUnavailableReason | undefined {
  if (isReadOnly) return 'readOnly';
  if (isStructureProtected && isReplacementStructureChanging) return 'structureChangingMarker';
  return undefined;
}
