export type ResourceType =
  | 'ScriptureResource'
  | 'CommentaryResource'
  | 'EnhancedResource'
  | 'XmlResource'
  | 'SourceLanguageResource';

export type DblResourceData = {
  dblEntryUid: string;
  displayName: string;
  fullName: string;
  bestLanguageName: string;
  type: ResourceType;
  size: number;
  installed: boolean;
  updateAvailable: boolean;
  projectId: string;
};

/**
 * Whether a DBL catalog row already accounts for a local project — by exact `projectId` match, or,
 * failing that, by the `startsWith(dblEntryUid)` convention.
 *
 * The prefix branch is a best-effort fallback, not an invariant. A resource project's id is
 * unrelated to the DBL entry it was installed from: ParatextData records the entry uid in the
 * project's settings and matches on that, so the prefix holds for many installed resources and not
 * for others. The authoritative answer is the `projectId` the backend reports, which is why the
 * exact-match branch is tried first and wins for any row that has been reconciled against disk. See
 * `adr-dbl-install-status-from-backend`.
 *
 * Both branches require the row to have been reconciled against disk at least once (`installed`, or
 * a non-empty `projectId`). A never-synced row carries `installed: false, projectId: ''`, and
 * `''.startsWith('')` is true for every string, so trusting such a row would let a stale entry for
 * a DBL-reassigned UID hide a local project whose real UID still matches.
 *
 * Producers on both sides of the picker consult this — the one that decides which local projects
 * are NOT already in the catalog, and the one that decides which catalog row describes a downloaded
 * project. They must agree, or a project is claimed by one and disowned by the other.
 *
 * @param row The DBL catalog row to test
 * @param localProjectId The id of the local project to test it against
 * @returns `true` when `row` already accounts for `localProjectId`
 */
export function doesCatalogRowCoverProject(row: DblResourceData, localProjectId: string): boolean {
  if (!row.installed && row.projectId === '') return false;
  if (row.projectId !== '' && row.projectId === localProjectId) return true;
  return (
    row.dblEntryUid !== '' && localProjectId.toLowerCase().startsWith(row.dblEntryUid.toLowerCase())
  );
}
