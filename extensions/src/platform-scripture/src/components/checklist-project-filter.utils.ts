import type { ProjectSelectorProject } from 'platform-bible-react';

/**
 * Returns the list of projects eligible to appear in the Markers Checklist's **comparative-texts**
 * dropdown. Excludes the currently selected primary project (the user can't compare a project
 * against itself — UX-2 finding #14).
 *
 * @param allProjects All scripture projects discovered via `papi.projectLookup`.
 * @param primaryProjectId The currently selected primary project id, or `undefined` when none is
 *   selected.
 */
export function filterComparativeProjects(
  allProjects: readonly ProjectSelectorProject[],
  primaryProjectId: string | undefined,
): ProjectSelectorProject[] {
  if (primaryProjectId === undefined) return [...allProjects];
  return allProjects.filter((p) => p.id !== primaryProjectId);
}

/**
 * Returns the list of projects eligible to appear in the Markers Checklist's **primary** project
 * dropdown. Excludes every project currently selected as a comparative text (UX-2 finding #14;
 * bidirectional exclusion paired with {@link filterComparativeProjects}).
 *
 * @param allProjects All scripture projects discovered via `papi.projectLookup`.
 * @param comparativeProjectIds Ids of the currently selected comparative texts.
 */
export function filterPrimaryProjects(
  allProjects: readonly ProjectSelectorProject[],
  comparativeProjectIds: readonly string[],
): ProjectSelectorProject[] {
  if (comparativeProjectIds.length === 0) return [...allProjects];
  const excluded = new Set(comparativeProjectIds);
  return allProjects.filter((p) => !excluded.has(p.id));
}
