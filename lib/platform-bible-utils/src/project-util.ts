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
 * Joins a project's short name to its full name in {@link formatProjectName}.
 *
 * Exported because a consumer that renders the two names in separate elements — a toolbar label
 * with its own separator node, say — has to draw the same character the joined string uses, or the
 * visible label and its own tooltip disagree the moment this changes.
 *
 * Not localized: it joins two proper nouns rather than translatable prose.
 *
 * Bidi caveat: the hyphen is direction-neutral. A caller that renders the two names in separate
 * elements gets the surrounding element's direction for free, but {@link formatProjectName} returns
 * one text node, so a right-to-left name inside a left-to-right container (or the reverse) can put
 * the separator on the visually wrong side. Callers that place that joined string where mixed
 * directions are likely — a tooltip, a subtitle, an `aria-label` — should set `dir="auto"` on the
 * element that carries it.
 */
export const PROJECT_NAME_SEPARATOR = ' - ';

/**
 * Formats a project for display as `"{shortName} - {fullName}"`, or as the short name alone when
 * {@link hasDistinctFullName} is false.
 *
 * The short name leads because it is the field that identifies a project to a Paratext user, so it
 * is the half that must survive ellipsis truncation in a narrow container. The separator is
 * {@link PROJECT_NAME_SEPARATOR}.
 *
 * @param names The project's short and optional full name.
 * @returns The display string.
 */
export function formatProjectName(names: ProjectNames): string {
  return hasDistinctFullName(names)
    ? `${names.shortName}${PROJECT_NAME_SEPARATOR}${names.fullName}`
    : names.shortName;
}

/**
 * Compares two project short names for display order: alphabetical, case- and accent-insensitive.
 *
 * The string-level form of {@link compareProjectsByName}, for a caller whose list rows are not
 * {@link ProjectNames} objects and would otherwise allocate a throwaway one per comparison.
 *
 * @param a First short name.
 * @param b Second short name.
 * @returns Negative, zero or positive, as `Array.prototype.sort` expects.
 */
export function compareProjectShortNames(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: 'base' });
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
  return compareProjectShortNames(a.shortName, b.shortName);
}

/**
 * Narrows a raw `platform.fullName` project setting to the full name, or `undefined` when the
 * project effectively has none.
 *
 * The setting is typed `string`, but a project data provider yields `null` or `undefined` for a
 * setting that was never written, and legacy projects carry `''`. This is the single place that
 * decides which of those counts as absent, so a reader can hand the raw value straight through
 * rather than writing its own guard.
 *
 * @param fullName The raw setting value.
 * @returns The full name, or `undefined` when it is absent, empty, or not a string.
 */
export function normalizeFullName(fullName: unknown): string | undefined {
  return typeof fullName === 'string' && fullName.length > 0 ? fullName : undefined;
}
