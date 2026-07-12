import type { DblResourceData } from 'platform-bible-utils';
import { isDblResourceReference } from '../resource-reference.utils';
import type { BibleTextReference } from '../scripture-text-grid-contents.utils';
import { findCachedDblResource } from './dbl-resource-lookup.utils';
import type { GridResource } from './resource-cell.component';

/**
 * Maps the Bible-text references chosen for display to renderable grid cells. A cell fetches its
 * chapter text by `projectId`, so each reference must resolve to the _installed project's_ id:
 *
 * - `ProjectReference` — its `id` already IS the project id.
 * - `DblResourceReference` — its `id` is the DBL entry UID, NOT a project id. Resolve it to the
 *   installed project id via the cached DBL resource list (matched by `dblEntryUid`). This mirrors
 *   how `resource-text-panel` resolves the resource it renders.
 *
 * A DBL resource with no installed project (not yet downloaded, or absent from the cache) has no
 * fetchable text, so it is omitted rather than rendered as a cell whose subscription spins
 * forever.
 */
export function toGridResources(
  references: BibleTextReference[],
  dblResources: DblResourceData[],
): GridResource[] {
  return references.flatMap((reference) => {
    let projectId: string | undefined;
    if (isDblResourceReference(reference)) {
      const match = findCachedDblResource(reference, dblResources);
      projectId = match?.installed ? match.projectId : undefined;
    } else {
      projectId = reference.id;
    }
    return projectId ? [{ projectId, label: reference.name }] : [];
  });
}

export default toGridResources;
