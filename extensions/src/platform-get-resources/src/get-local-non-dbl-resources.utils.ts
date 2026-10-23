import type { DblResourceData } from 'platform-bible-utils';
import { doesCatalogRowCoverProject, normalizeFullName } from 'platform-bible-utils';

/** Subset of ProjectMetadata fields consumed by {@link buildLocalNonDblResources}. */
type ProjectInfo = {
  id: string;
  isEditable?: boolean;
  name?: string;
  fullName?: string;
  language?: string;
  unsupportedReason?: string;
};

/**
 * DBL UIDs identifying locally-installed commentaries. Mirrors the C# CommentariesWhiteList in
 * DblDownloadableDataProvider.cs.
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
  '090f7cbf7924b245', // TNN — English
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
 * Filters out editable projects and any project a DBL catalog row already covers — that rule lives
 * in {@link doesCatalogRowCoverProject}, shared with the picker's downloaded-project mapper so the
 * two cannot drift. Maps the remaining metadata to {@link DblResourceData} with `dblEntryUid ===
 * projectId` as a synthetic marker so callers can create a `ProjectReference` instead of a
 * `DblResourceReference`.
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
    if (m.unsupportedReason) return false;
    return !dblEntries.some((r) => doesCatalogRowCoverProject(r, m.id));
  });

  return nonDblMetadata.map(
    (m): DblResourceData => ({
      // Convention: dblEntryUid === projectId marks this as a non-DBL synthetic entry.
      // selectTextConnection detects this and creates a ProjectReference instead of a
      // DblResourceReference so the resource is resolvable without a catalog entry.
      dblEntryUid: m.id,
      displayName: m.name ?? m.id,
      // A synthetic entry for a local project carries no DBL catalog full name. Left empty rather
      // than mirrored from the short name: the table renders Full Name in its own column beside
      // Name, so a mirror would print the same text twice. `DblResourceData.fullName` is a
      // required wire field, so empty is the absent form here.
      fullName: normalizeFullName(m.fullName) ?? '',
      bestLanguageName: m.language ?? '',
      // Best-effort: a project id need not start with the DBL entry uid it was installed from
      // (see `adr-dbl-install-status-from-backend`), so a commentary whose ids diverge is
      // classified as a plain ScriptureResource.
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

/**
 * Waits for `work` to finish, but no longer than `ms`.
 *
 * @param work The work to wait for. A rejection before the limit is passed on; one after it is
 *   ignored, since nothing is waiting for it any more.
 * @param ms The longest to wait, in milliseconds
 * @returns `true` if `work` finished in time, `false` if the limit was reached first
 */
export async function waitAtMost(work: Promise<unknown>, ms: number): Promise<boolean> {
  const finished = work.then(() => true);
  // Settled on its own so a rejection after the limit is not reported as unhandled.
  finished.catch(() => undefined);
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      finished,
      new Promise<boolean>((resolve) => {
        timer = setTimeout(() => resolve(false), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}
