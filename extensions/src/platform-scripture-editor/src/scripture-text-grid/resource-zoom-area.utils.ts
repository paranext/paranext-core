/** Prefix of every Text Collection resource's zoom area id. */
export const RESOURCE_ZOOM_AREA_PREFIX = 'resource-';

/**
 * The Text Collection's pane-wide zoom area: core's declared default area for this web view type,
 * used for a resource whose id yields no usable area id.
 */
export const TEXT_COLLECTION_ZOOM_AREA = 'text-collection';

/**
 * The zoom area id of one resource: `resource-` + the id lower-cased, with every character outside
 * `[a-z0-9-]` replaced by `-`. `undefined` when the id has no `[a-z0-9]` character to keep (empty,
 * or only other characters), so distinct resources are never silently collapsed into one area.
 *
 * The prefix gives the id its leading letter (a DBL entry UID can start with a digit) and keeps it
 * clear of the platform's reserved `default`. Real ids are lower-case hex, which pass through
 * unchanged; two ids that differ only in case or in replaced characters share one area.
 */
export function toResourceZoomAreaId(resourceId: string): string | undefined {
  // Code-unit replacement is exact here: the only characters kept are ASCII, and whatever else the
  // id holds becomes hyphens either way.
  const sanitised = resourceId.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  if (!/[a-z0-9]/.test(sanitised)) return undefined;
  return `${RESOURCE_ZOOM_AREA_PREFIX}${sanitised}`;
}

/**
 * The content zoom area a resource's text is marked with and its zoom commands target: its own
 * `resource-<id>` area, else the pane-wide {@link TEXT_COLLECTION_ZOOM_AREA}. The grid's markers and
 * zoom scopes and the zoom menus' commands all resolve a resource's area through this one function,
 * so they can never disagree about it.
 */
export function resourceZoomAreaOf(resourceId: string): string {
  return toResourceZoomAreaId(resourceId) ?? TEXT_COLLECTION_ZOOM_AREA;
}
