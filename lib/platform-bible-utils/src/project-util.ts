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
 * Blank is absent, on the same terms as {@link normalizeFullName}: a name of spaces is present but
 * invisible, so treating it as distinct would render a dangling separator. Applying the rule here
 * rather than asking every caller to pre-normalize is what keeps {@link formatProjectName} safe for
 * a raw value — including one arriving from outside the repo through a public prop.
 *
 * @param names The project's short and optional full name.
 * @returns `true` when the full name is present, non-blank, and different from the short name.
 */
export function hasDistinctFullName(names: ProjectNames): boolean {
  return !!normalizeFullName(names.fullName) && names.fullName !== names.shortName;
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
 * Bidi caveat: the hyphen is direction-neutral, so it sits wherever the surrounding run puts it.
 * Which remedy a caller needs depends on how the joined name reaches the screen:
 *
 * - **The joined string is an element's whole text** (a tooltip line, a trigger label): set
 *   `dir="auto"` on that element.
 * - **The two names are separate elements**: each gets its own direction only when it is a
 *   block-level or flex-item box. Plain inline spans do NOT isolate — they join the surrounding run
 *   like any other inline text — so an inline pair needs `dir="auto"` per name as well.
 * - **The joined string is interpolated into a longer sentence** (a subtitle, a notification): an
 *   attribute cannot help, because `dir="auto"` reads the direction of the SENTENCE's first strong
 *   character rather than the name's. Wrap the name with {@link isolateBidi} before interpolating,
 *   which is the character-level form of HTML's `<bdi>` and travels inside the string.
 * - **An `aria-label`**: carries no direction at all, so the caveat does not reach it.
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
 * setting that was never written, and legacy projects carry `''` or a run of spaces. This is the
 * single place that decides which of those counts as absent, so a reader can hand the raw value
 * straight through rather than writing its own guard.
 *
 * Whitespace-only counts as absent: a name of spaces renders as a full name that is there but
 * invisible, so {@link formatProjectName} would emit `'ABC - '` with a dangling separator. The
 * returned name is not trimmed otherwise — leading or trailing space in a real name is the
 * project's own data, and this function narrows rather than edits.
 *
 * @param fullName The raw setting value.
 * @returns The full name, or `undefined` when it is absent, blank, or not a string.
 */
export function normalizeFullName(fullName: unknown): string | undefined {
  return typeof fullName === 'string' && fullName.trim().length > 0 ? fullName : undefined;
}
