/**
 * Normalizes a project id to its canonical, case-insensitive form (UPPERCASE) so it can key a
 * `Map`/`Set` or be compared for equality without a casing mismatch silently dropping a match.
 *
 * Paratext project ids are hex GUIDs that the .NET data provider canonicalizes to uppercase;
 * callers that join or dedupe ids arriving from mixed sources (e.g. an open-tab's `projectId`
 * against a project list) must fold case the same way. This is the single shared normalizer so
 * those callers cannot drift apart.
 *
 * @param projectId The project id to normalize.
 * @returns The uppercase form of the id.
 */
export function normalizeProjectId(projectId: string): string {
  return projectId.toUpperCase();
}

/** A project's display names. `fullName` is optional because not every project carries one. */
export type ProjectNames = {
  /** Short name, e.g. `'arb'`. Always present; this is the identifying field. */
  shortName: string;
  /** Longer descriptive name, e.g. `'True Meaning Arabic'`. Absent or empty on many projects. */
  fullName?: string;
};

/**
 * Whether a project's full name carries information its short name does not, and so is worth
 * rendering as a second field.
 *
 * The comparison is an exact, case-sensitive `!==` on purpose: two names differing only by case are
 * genuinely different strings a project deliberately carries, and suppressing one would hide data
 * the user entered. Callers that render the two names in separate slots (a muted second line, a
 * toolbar label's secondary field) use this rather than repeating the rule.
 *
 * @param names The project's short and optional full name.
 * @returns `true` when the full name is present, non-empty, and different from the short name.
 */
export function hasDistinctFullName(names: ProjectNames): boolean {
  return !!names.fullName && names.fullName !== names.shortName;
}

/**
 * Formats a project for display as `"{shortName} - {fullName}"`, or as the short name alone when
 * {@link hasDistinctFullName} is false.
 *
 * The short name leads because it is the field that identifies a project to a Paratext user, so it
 * is the half that must survive ellipsis truncation in a narrow container. The separator is not
 * localized: it joins two proper nouns rather than translatable prose, and the surrounding
 * element's direction handles right-to-left layout.
 *
 * @param names The project's short and optional full name.
 * @returns The display string.
 */
export function formatProjectName(names: ProjectNames): string {
  return hasDistinctFullName(names) ? `${names.shortName} - ${names.fullName}` : names.shortName;
}

/**
 * Compares two projects for display order: alphabetical by short name, case- and
 * accent-insensitive.
 *
 * Short name rather than full name because the short name is the field that leads every project
 * label, and a list ordered by a field the user cannot see reads as unsorted. Compares names only —
 * a caller with its own tie-break (a scroll group, a project id) layers it on top of this result.
 *
 * @param a First project.
 * @param b Second project.
 * @returns Negative, zero or positive, as `Array.prototype.sort` expects.
 */
export function compareProjectsByName(a: ProjectNames, b: ProjectNames): number {
  return a.shortName.localeCompare(b.shortName, undefined, { sensitivity: 'base' });
}
