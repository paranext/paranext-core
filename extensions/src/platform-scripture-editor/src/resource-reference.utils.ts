import type {
  DblResourceReference,
  ProjectReference,
  EffectiveResourceReference,
} from 'platform-scripture';
import type { DblResourceData, ResourceType } from 'platform-bible-utils';
// Type-only, so this module gains no runtime dependency on the hook (and stays importable from a
// node-environment test).
import type { EffectiveResourceReferenceListState } from './use-effective-resource-reference-list.hook';
import { findCachedDblResource } from './scripture-text-grid/dbl-resource-lookup.utils';

/**
 * Checks if a {@link ResourceReference} is a {@link DblResourceReference}.
 *
 * @param item The resource reference to check
 * @returns `true` if the item is a {@link DblResourceReference}, otherwise `false`
 */
export function isDblResourceReference(item: unknown): item is DblResourceReference {
  return (
    !!item &&
    typeof item === 'object' &&
    'type' in item &&
    item.type === 'dblResource' &&
    'id' in item &&
    'name' in item
  );
}

/**
 * Checks if a {@link ResourceReference} is a {@link ProjectReference}.
 *
 * @param item The resource reference to check
 * @returns `true` if the item is a {@link ProjectReference}, otherwise `false`
 */
export function isProjectReference(item: unknown): item is ProjectReference {
  return (
    !!item &&
    typeof item === 'object' &&
    'type' in item &&
    item.type === 'project' &&
    'id' in item &&
    'name' in item
  );
}

/**
 * Returns the display label for a resource reference in the form `{fullName} ({displayName})` for
 * DBL resources, falling back to `ref.name` if the DblResourceData entry is not yet in the list.
 * Returns `ref.name` for project references.
 *
 * @param ref The resource reference to label
 * @param dblResourcesList The list of known DBL resources to look up `ref` in when it's a
 *   {@link DblResourceReference}
 * @returns The display label for `ref`
 */
export function getRefLabel(
  ref: EffectiveResourceReference,
  dblResourcesList: DblResourceData[],
): string {
  if (isDblResourceReference(ref)) {
    const dblData = dblResourcesList.find((r) => r.dblEntryUid === ref.id);
    if (dblData) return `${dblData.fullName} (${dblData.displayName})`;
    return ref.name;
  }
  if (isProjectReference(ref)) {
    return ref.name;
  }
  return '';
}

/** Returns the `id` field for reference types that have one, or `undefined` for others. */
export function getRefId(ref: EffectiveResourceReference | undefined): string | undefined {
  if (ref && (isDblResourceReference(ref) || isProjectReference(ref))) {
    return ref.id;
  }
  return undefined;
}

/**
 * The references a resource panel can show, given the kind of resource it was opened for.
 *
 * Pure so that the web view can reach the same answer the panel renders from: the web view needs
 * the resolved resource for its own PAPI-side concerns (the chapter subscription, the tab title,
 * Ctrl+F, and publishing navigable project ids), and this is the first half of reaching it.
 */
export function filterResourcesByType(
  effectiveResources: EffectiveResourceReference[] | undefined,
  dblResources: DblResourceData[],
  resourceType: ResourceType,
): EffectiveResourceReference[] {
  if (!effectiveResources) return [];
  return effectiveResources.filter((ref) => {
    if (isDblResourceReference(ref)) {
      return dblResources.find((r) => r.dblEntryUid === ref.id)?.type === resourceType;
    }
    if (isProjectReference(ref)) {
      // ProjectReferences only appear in the Bible Texts tab
      return resourceType === 'ScriptureResource';
    }
    return false;
  });
}

/** What a resource panel is showing, resolved from the selection against the DBL catalog. */
export type SelectedResource = {
  /** The chosen reference, or the first available one when the selection names nothing present. */
  selectedRef: EffectiveResourceReference | undefined;
  /** The catalog entry backing `selectedRef`, when it is a DBL resource. */
  dblMatch: DblResourceData | undefined;
  /**
   * The project of the resource the panel DISPLAYS — not the panel's own `projectId`, which is the
   * container project whose reference list is shown. `undefined` until a DBL resource is
   * installed.
   */
  resourceProjectId: string | undefined;
  /** Display name of the resolved resource, for the tab title. */
  resourceShortName: string | undefined;
};

/**
 * Resolves the selection to the resource actually on screen. Pure, and the second half of what the
 * web view needs — see {@link filterResourcesByType}.
 */
export function resolveSelectedResource(
  filteredResources: EffectiveResourceReference[],
  selectedResourceId: string | undefined,
  dblResources: DblResourceData[],
): SelectedResource {
  const selectedRef =
    filteredResources.find((r) => getRefId(r) === selectedResourceId) ?? filteredResources[0];

  let dblMatch: DblResourceData | undefined;
  let resourceProjectId: string | undefined;
  let resourceShortName: string | undefined;

  if (isDblResourceReference(selectedRef)) {
    dblMatch = findCachedDblResource(selectedRef, dblResources);
    resourceProjectId = dblMatch?.installed ? dblMatch.projectId : undefined;
    if (dblMatch?.installed) resourceShortName = dblMatch.displayName;
  } else if (isProjectReference(selectedRef)) {
    resourceProjectId = selectedRef.id;
    resourceShortName = selectedRef.name;
  }

  return { selectedRef, dblMatch, resourceProjectId, resourceShortName };
}

/** Everything a resource panel and its web view derive from the configured references. */
export type ResourcePanelSelection = SelectedResource & {
  /** The references the panel can offer, filtered to its resource type. */
  filteredResources: EffectiveResourceReference[];
};

/**
 * The single derivation of what a resource panel is showing.
 *
 * Both the panel and its web view need this answer, and they must not be able to reach different
 * ones: the panel renders from it, while the web view keys the chapter subscription, the text
 * direction, the tab title, Ctrl+F and the published navigable project ids off it. The web view
 * cannot simply take the panel's answer via a callback — `resourceProjectId` keys the `ChapterUSJ`
 * subscription that produces the USJ passed DOWN to the panel, so the dependency is circular. One
 * function called from both sides is what keeps the two in step, since nothing under `extensions/`
 * tests a `*.web-view.tsx` and no test could otherwise pin the agreement.
 */
export function resolveResourcePanelSelection({
  effectiveResourcesState,
  dblResources,
  resourceType,
  selectedResourceId,
}: {
  effectiveResourcesState: EffectiveResourceReferenceListState;
  dblResources: DblResourceData[];
  resourceType: ResourceType;
  selectedResourceId: string | undefined;
}): ResourcePanelSelection {
  const effectiveResources =
    effectiveResourcesState.status === 'ready' ? effectiveResourcesState.list : undefined;
  const filteredResources = filterResourcesByType(
    effectiveResources?.items,
    dblResources,
    resourceType,
  );
  return {
    filteredResources,
    ...resolveSelectedResource(filteredResources, selectedResourceId, dblResources),
  };
}
