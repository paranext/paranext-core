import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference, ResourceReferenceList } from 'platform-scripture';

export type SplitResourcesByTabResult = {
  scriptureResources: ResourceReference[];
  commentaryResources: ResourceReference[];
};

function isDblResourceReference(ref: ResourceReference): ref is ResourceReference & { id: string } {
  return ref.type === 'dblResource';
}

function isProjectReference(ref: ResourceReference): boolean {
  return ref.type === 'project';
}

/**
 * Splits a flat `referencedProjectsAndResources` list into per-tab sub-lists, mirroring the
 * filtering `resource-text-panel.web-view.tsx` already applies for display: `dblResource` items are
 * typed via the cached DBL resource catalog, `project` items always belong to the Scripture tab,
 * and any other reference type is dropped from both tabs.
 */
export function splitResourcesByTab(
  items: ResourceReference[],
  dblResources: DblResourceData[],
): SplitResourcesByTabResult {
  const scriptureResources: ResourceReference[] = [];
  const commentaryResources: ResourceReference[] = [];

  items.forEach((item) => {
    if (isDblResourceReference(item)) {
      const dblType = dblResources.find((r) => r.dblEntryUid === item.id)?.type;
      if (dblType === 'CommentaryResource') commentaryResources.push(item);
      else if (dblType === 'ScriptureResource') scriptureResources.push(item);
      return;
    }
    if (isProjectReference(item)) scriptureResources.push(item);
  });

  return { scriptureResources, commentaryResources };
}

/**
 * Per-field seeding fallback for the Share Layout dialog (spec Section 2): use the project-level
 * (previously shared) list if it has items; otherwise fall back to the admin's personal list.
 */
export function seedResourceList(
  projectList: ResourceReferenceList | undefined,
  personalList: ResourceReferenceList | undefined,
): ResourceReference[] {
  if (projectList && projectList.items.length > 0) return projectList.items;
  return personalList?.items ?? [];
}

/**
 * Per-field seeding fallback for scalar settings (model text's single reference, or the active tab
 * identifier): use the project-level value if it is set (non-empty string / defined reference);
 * otherwise fall back to the personal value.
 */
export function seedScalar<T extends string | ResourceReference | undefined>(
  projectValue: T,
  personalValue: T,
): T {
  const isProjectValueUnset = projectValue === undefined || projectValue === '';
  return isProjectValueUnset ? personalValue : projectValue;
}
