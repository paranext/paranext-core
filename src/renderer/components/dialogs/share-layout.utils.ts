import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference, ResourceReferenceList } from 'platform-scripture';

export type SplitResourcesByTabResult = {
  scriptureResources: ResourceReference[];
  commentaryResources: ResourceReference[];
  otherResources: ResourceReference[];
};

function isDblResourceReference(ref: ResourceReference): ref is ResourceReference & { id: string } {
  return ref.type === 'dblResource';
}

function isProjectReference(ref: ResourceReference): boolean {
  return ref.type === 'project';
}

/**
 * Splits a flat `referencedProjectsAndResources` list into per-tab sub-lists, mirroring the per-tab
 * classification the resource panel already applies for display. That classification is two steps
 * in the platform-scripture-editor extension: `buildPickerResources` (in
 * `downloaded-resources.utils.ts`) stamps a `type` on each row — `dblResource` items are typed via
 * the cached DBL resource catalog, `project` items default to the Scripture tab — and
 * `resource-text-panel.web-view.tsx` then keeps only the rows whose `type` matches the tab it is
 * showing.
 *
 * The two agree on the rules and differ on what happens to a reference the rules cannot place. A
 * `dblResource` with no row in the catalog has no knowable type, so the panel DROPS it — a guessed
 * type would leak a blank row into a type-filtered view. This function must PRESERVE it instead, in
 * `otherResources`, because it is round-tripping the setting rather than rendering it: the dialog
 * doesn't display or let the admin edit `otherResources`, but callers must write it back unchanged
 * or those references are permanently lost. Same rule, opposite failure mode — do not "fix" one to
 * match the other.
 *
 * `src/renderer` cannot import across the extension boundary, so this comment is the only thing
 * keeping the classification rules in step: edit them together.
 */
export function splitResourcesByTab(
  items: ResourceReference[],
  dblResources: DblResourceData[],
): SplitResourcesByTabResult {
  const scriptureResources: ResourceReference[] = [];
  const commentaryResources: ResourceReference[] = [];
  const otherResources: ResourceReference[] = [];

  items.forEach((item) => {
    if (isDblResourceReference(item)) {
      const dblType = dblResources.find((r) => r.dblEntryUid === item.id)?.type;
      if (dblType === 'CommentaryResource') commentaryResources.push(item);
      else if (dblType === 'ScriptureResource') scriptureResources.push(item);
      else otherResources.push(item);
      return;
    }
    if (isProjectReference(item)) scriptureResources.push(item);
    else otherResources.push(item);
  });

  return { scriptureResources, commentaryResources, otherResources };
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
