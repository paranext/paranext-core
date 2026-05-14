import { DblResourceData } from 'platform-bible-utils';

/**
 * Stub: filter a list of resources to those that match one of the user's known languages, with a
 * fall-through to "popular" English resources when the user's languages produce fewer than 3
 * matches. Real implementation will likely consult PAPI for ranked suggestions; this version is
 * purely sample-data-driven so stories render convincingly without a backend.
 *
 * Returns up to `limit` resources.
 */
export function filterResourcesByUserLanguages(
  resources: DblResourceData[],
  userLanguages: string[],
  limit = 5,
): DblResourceData[] {
  const langs = new Set(userLanguages.map((l) => l.toLowerCase()));
  const matches = resources.filter((r) => langs.has(r.bestLanguageName.toLowerCase()));
  if (matches.length >= 3) return matches.slice(0, limit);

  // Fall-through: pad with English resources not already in matches
  const matchIds = new Set(matches.map((r) => r.dblEntryUid));
  const fallback = resources.filter(
    (r) => r.bestLanguageName.toLowerCase() === 'english' && !matchIds.has(r.dblEntryUid),
  );
  return [...matches, ...fallback].slice(0, limit);
}

/**
 * Stub: rank a resource list so already-selected items float to the top, then installed items, then
 * everything else. Used by picker variants to honor "associated resources appear first / marked".
 */
export function rankResourcesForPicker(
  resources: DblResourceData[],
  selectedResourceIds: string[],
): DblResourceData[] {
  const selected = new Set(selectedResourceIds);
  const score = (r: DblResourceData) => {
    if (selected.has(r.dblEntryUid)) return 0;
    if (r.installed) return 1;
    return 2;
  };
  return [...resources].sort((a, b) => {
    const sa = score(a);
    const sb = score(b);
    if (sa !== sb) return sa - sb;
    return a.displayName.localeCompare(b.displayName);
  });
}

/** Stub: human-readable size (MB). Round to one decimal. */
export function formatResourceSize(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

/**
 * Stub: filter resources by a free-text search across displayName, fullName, and bestLanguageName.
 * Case-insensitive substring match.
 */
export function searchResources(resources: DblResourceData[], query: string): DblResourceData[] {
  const q = query.trim().toLowerCase();
  if (!q) return resources;
  return resources.filter(
    (r) =>
      r.displayName.toLowerCase().includes(q) ||
      r.fullName.toLowerCase().includes(q) ||
      r.bestLanguageName.toLowerCase().includes(q),
  );
}

/**
 * Localized strings hardcoded for prototype stories. Centralized here so the eventual extraction
 * pass has one place to look.
 */
export const RESOURCES_STRINGS = {
  adminAddedTooltip: 'This resource was added by your project administrator.',
  addMore: 'Add resources',
  addMoreShort: 'Add',
  remove: 'Remove',
  applySelection: 'Add selected',
  cancelSelection: 'Cancel',
  pickerTitle: 'Add Bible texts',
  searchPlaceholder: 'Search resources…',
  noResourcesYet: 'No Bible texts yet',
  noResourcesBody:
    'Bible texts are reference scriptures you can consult while translating. They are separate from your model text — the scripture you are translating from.',
  suggestionsHeading: 'Suggested for your languages',
  installedBadge: 'Installed',
  downloadAction: 'Download',
  alreadyAdded: 'Already added',
} as const;
