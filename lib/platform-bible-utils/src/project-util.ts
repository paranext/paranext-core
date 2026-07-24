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
