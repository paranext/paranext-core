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
 * `downloaded-resources.utils.ts`) stamps a `type` on each row, and
 * `resource-text-panel.web-view.tsx` then keeps only the rows whose `type` matches the tab it is
 * showing.
 *
 * The two do NOT agree, in two ways. Both are live; neither is a bug to "fix" by making one match
 * the other without deciding which is right.
 *
 * 1. **`project` references are typed differently.** This function routes every one of them to
 *    `scriptureResources`. The panel refines the type first, by looking the project id up in the
 *    catalog (`resolveReferenced`: `type: dblByProjectId?.type ?? 'ScriptureResource'`). A
 *    locally-installed commentary is stored as a `ProjectReference` but has a catalog entry typed
 *    `CommentaryResource`, so the panel files it under Commentaries while this dialog shows the
 *    same reference under Bible Texts. That divergence is user-visible, and this function is the
 *    side that is wrong about it — fixing it here needs the catalog lookup, which the dialog
 *    already has `dblResources` for.
 * 2. **A reference the rules cannot place is handled oppositely, deliberately.** A `dblResource` with
 *    no catalog row has no knowable type, so the panel DROPS it rather than leak a blank row into a
 *    type-filtered view. This function must PRESERVE it, in `otherResources`, because it
 *    round-trips the setting rather than rendering it: the dialog neither displays nor lets the
 *    admin edit `otherResources`, but callers must write it back unchanged or those references are
 *    permanently lost.
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
