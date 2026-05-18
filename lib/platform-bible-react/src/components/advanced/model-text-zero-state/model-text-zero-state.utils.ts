import { DblResourceData } from 'platform-bible-utils';

/**
 * Stub utility — sample-data-backed implementation of "filter to resources that match the user's
 * preferred languages". Real implementation will live elsewhere (likely on the platform service or
 * in resource-picker-dialog's utils once the design lands); we only need plausible output here so
 * stories render convincingly.
 *
 * Behavior:
 *
 * - If `userLanguages` is empty, returns all resources unchanged.
 * - Otherwise, returns resources whose `bestLanguageName` matches one of the user's languages,
 *   followed by all other resources (preserved order). This lets stories show ranking without
 *   hiding the long tail.
 */
export function filterResourcesByUserLanguages(
  resources: DblResourceData[],
  userLanguages: string[],
): DblResourceData[] {
  if (userLanguages.length === 0) return resources;
  const set = new Set(userLanguages.map((l) => l.toLowerCase()));
  const matching = resources.filter((r) => set.has(r.bestLanguageName.toLowerCase()));
  const rest = resources.filter((r) => !set.has(r.bestLanguageName.toLowerCase()));
  return [...matching, ...rest];
}

/**
 * Stub utility — naive relevance ranker that floats `selectedResourceIds` and "installed" entries
 * to the top. Used to show "preferred / project-associated resources first" in picker variants.
 */
export function rankByRelevance(
  resources: DblResourceData[],
  selectedResourceIds: string[],
): DblResourceData[] {
  const selectedSet = new Set(selectedResourceIds);
  return [...resources].sort((a, b) => {
    const aSelected = selectedSet.has(a.dblEntryUid) ? 1 : 0;
    const bSelected = selectedSet.has(b.dblEntryUid) ? 1 : 0;
    if (aSelected !== bSelected) return bSelected - aSelected;
    const aInst = a.installed ? 1 : 0;
    const bInst = b.installed ? 1 : 0;
    if (aInst !== bInst) return bInst - aInst;
    return a.displayName.localeCompare(b.displayName);
  });
}

/**
 * Returns only resources that can serve as a model text — scripture resources. (Source language
 * resources are excluded from this list: model text is a vernacular/published translation the team
 * is translating FROM, not a Greek/Hebrew base text — that surfaces elsewhere.)
 */
export function modelTextCandidates(resources: DblResourceData[]): DblResourceData[] {
  return resources.filter((r) => r.type === 'ScriptureResource');
}

/** Lightweight case-insensitive match across the fields a user is likely to search on. */
export function matchesSearch(resource: DblResourceData, searchText: string): boolean {
  if (!searchText) return true;
  const lower = searchText.toLowerCase();
  return (
    resource.displayName.toLowerCase().includes(lower) ||
    resource.fullName.toLowerCase().includes(lower) ||
    resource.bestLanguageName.toLowerCase().includes(lower)
  );
}
