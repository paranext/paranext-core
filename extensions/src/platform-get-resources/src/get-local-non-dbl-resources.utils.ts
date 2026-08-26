import type { DblResourceData } from 'platform-bible-utils';

/** Subset of ProjectMetadata fields consumed by {@link buildLocalNonDblResources}. */
type ProjectInfo = {
  id: string;
  isEditable?: boolean;
  name?: string;
  fullName?: string;
  language?: string;
};

/**
 * DBL UIDs identifying locally-installed commentaries. Mirrors the C# CommentariesWhiteList in
 * DblDownloadableDataProvider.cs, plus the legacy TNN UID retained for installs before the DBL UID
 * reassignment.
 */
export const LOCAL_COMMENTARY_UIDS: ReadonlySet<string> = new Set([
  // UBS Translator's Handbook
  '97196133a859179b', // HBKENG — English
  '6c21e835eb8ca3b2', // HBKCS — Chinese (Simplified)
  '77dc05b26ce399dd', // HBKCT — Chinese (Traditional)
  '815f988992157b10', // HBKFRA — French
  '24daa5f24f0020b3', // HBKPT — Portuguese
  '1ff24938918bd69e', // HBKESP — Spanish
  // UBS/SIL Translator's Notes
  '72dd0b9b0f2b4024', // TNN — English (current UID)
  '090f7cbf7924b245', // TNN — English (old UID; kept for installs predating the DBL UID reassignment)
  '0617c397f003127c', // TNNESP — Spanish
  '233345361843ce8b', // TNNPTG — Portuguese
  'd95fde28b4346e61', // TNNFR — French
  // UBS/SIL Translator's Notes (Deuterocanon)
  'b58b80b798e22be6', // TND — English
  '943164c222f75687', // TNDESP — Spanish
  'e0b3f20ff8677585', // TNDPTG — Portuguese
]);

/**
 * Converts project metadata for locally-installed non-DBL projects into synthetic
 * {@link DblResourceData} entries suitable for the resource picker.
 *
 * Filters out editable projects and any project already represented in the DBL catalog (by exact
 * `projectId` match or by the `startsWith(dblEntryUid)` convention — guarded by `installed ||
 * projectId !== ''` to avoid false exclusions when a UID has been reassigned to a different
 * resource and the cache row is stale with `projectId: ''`). Maps the remaining metadata to
 * {@link DblResourceData} with `dblEntryUid === projectId` as a synthetic marker so callers can
 * create a {@link ProjectReference} instead of a {@link DblResourceReference}.
 *
 * @param allMetadata All project metadata (from `papi.projectLookup.getMetadataForAllProjects`)
 * @param dblEntries Current DBL catalog entries; pass `[]` if the catalog is not yet loaded
 * @returns Synthetic {@link DblResourceData} entries for locally-installed non-DBL resources
 */
export function buildLocalNonDblResources(
  allMetadata: ProjectInfo[],
  dblEntries: DblResourceData[],
): DblResourceData[] {
  const nonDblMetadata = allMetadata.filter((m) => {
    if (m.isEditable !== false) return false;
    const matchingDblEntry = dblEntries.find(
      (r) =>
        (r.projectId !== '' && r.projectId === m.id) ||
        // Guard against empty dblEntryUid: ''.startsWith('') is true for every string.
        // Guard installed || projectId !== '': a stale cache row (installed:false, projectId:'')
        // for a reassigned UID must not exclude a local project whose real UID still matches.
        ((r.installed || r.projectId !== '') &&
          r.dblEntryUid !== '' &&
          m.id.toLowerCase().startsWith(r.dblEntryUid.toLowerCase())),
    );
    return matchingDblEntry === undefined;
  });

  return nonDblMetadata.map(
    (m): DblResourceData => ({
      // Convention: dblEntryUid === projectId marks this as a non-DBL synthetic entry.
      // selectTextConnection detects this and creates a ProjectReference instead of a
      // DblResourceReference so the resource is resolvable without a catalog entry.
      dblEntryUid: m.id,
      displayName: m.name ?? m.id,
      fullName: m.fullName ?? m.name ?? m.id,
      bestLanguageName: m.language ?? '',
      type: [...LOCAL_COMMENTARY_UIDS].some((uid) => m.id.toLowerCase().startsWith(uid))
        ? 'CommentaryResource'
        : 'ScriptureResource',
      size: 0,
      installed: true,
      updateAvailable: false,
      projectId: m.id,
    }),
  );
}
