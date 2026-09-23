import { formatReplacementString } from './string-util';

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

/**
 * Chooses the name to show for a project: its short name (the `platform.name` project setting) when
 * that is a non-empty string, otherwise its id.
 *
 * Accepts the raw setting value so callers need no checks of their own: a missing name, an empty
 * name, and a `PlatformError` (as `useProjectSetting` reports a failed read) all fall back to the
 * id.
 *
 * @example
 *
 * ```ts
 * getProjectDisplayName('4f3e…', 'WEB'); // 'WEB'
 * getProjectDisplayName('4f3e…', ''); // '4f3e…'
 * getProjectDisplayName('4f3e…', undefined); // '4f3e…'
 * ```
 *
 * @param projectId The project's id, shown when no usable name is available.
 * @param projectName The project's `platform.name` setting value, or anything else a lookup
 *   produced (`undefined`, an error, etc.).
 * @returns `projectName` when it is a non-empty string, otherwise `projectId`.
 */
export function getProjectDisplayName(projectId: string, projectName: unknown): string {
  return typeof projectName === 'string' && projectName ? projectName : projectId;
}

/**
 * Formats a title for something scoped to one project, such as a web view's tab, by replacing
 * `{projectName}` in `titleFormat` with the project's display name (see
 * {@link getProjectDisplayName}). Use it wherever a provider and its web view both build the same
 * title, so the two always agree.
 *
 * To look up the name and the localized format as well, use
 * `papi.localization.getLocalizedProjectTitle` (in a web view provider or other async code) or the
 * `useLocalizedProjectTitle` hook (in a web view).
 *
 * @example
 *
 * ```ts
 * formatProjectTitle('Character Inventory: {projectName}', '4f3e…', 'WEB');
 * // 'Character Inventory: WEB'
 * formatProjectTitle('Results ({resultsCount}): {projectName}', '4f3e…', '', {
 *   resultsCount: 3,
 * });
 * // 'Results (3): 4f3e…'
 * ```
 *
 * @param titleFormat Title containing a `{projectName}` placeholder, typically a localized string.
 * @param projectId The project's id, shown when `projectName` is not a non-empty string.
 * @param projectName The project's `platform.name` setting value, or anything else a lookup
 *   produced (`undefined`, an error, etc.).
 * @param replacements Values for any other `{key}` placeholders in `titleFormat`. A `projectName`
 *   entry here is ignored in favor of the resolved display name.
 * @returns `titleFormat` with its placeholders replaced. Placeholders with no replacement are left
 *   as their key text, as {@link formatReplacementString} does.
 */
export function formatProjectTitle(
  titleFormat: string,
  projectId: string,
  projectName: unknown,
  replacements?: { [key: string]: unknown },
): string {
  return formatReplacementString(titleFormat, {
    ...replacements,
    projectName: getProjectDisplayName(projectId, projectName),
  });
}
