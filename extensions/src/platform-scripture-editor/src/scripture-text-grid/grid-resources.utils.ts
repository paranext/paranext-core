import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceReference, ProjectReference } from 'platform-scripture';
import { isDblResourceReference } from '../resource-reference.utils';
import type { GridResource } from './resource-cell.component';

/** The Bible-text references the grid can render — the reference types that carry a resource `id`. */
type BibleTextReference = ProjectReference | DblResourceReference;

/**
 * Maps the Bible-text references chosen for display to renderable grid cells. A cell fetches its
 * chapter text by `projectId`, so each reference must resolve to the _installed project's_ id:
 *
 * - `ProjectReference` — its `id` already IS the project id.
 * - `DblResourceReference` — its `id` is the DBL entry UID, NOT a project id. Resolve it to the
 *   installed project id via the cached DBL resource list (matched by `dblEntryUid`). This mirrors
 *   how `resource-text-panel` resolves the resource it renders.
 *
 * A DBL resource with no installed project (not yet downloaded, or absent from the cache) is
 * included with `projectId: undefined`. The cell renders an 'unavailable' placeholder so the
 * resource stays visible in the grid and doesn't silently disappear from View Options.
 */
export function toGridResources(
  references: BibleTextReference[],
  dblResources: DblResourceData[],
): GridResource[] {
  return references.map((reference) => {
    let projectId: string | undefined;
    if (isDblResourceReference(reference)) {
      const match = dblResources.find((resource) => resource.dblEntryUid === reference.id);
      projectId = match?.installed ? match.projectId : undefined;
    } else {
      projectId = reference.id;
    }
    return { resourceId: reference.id, projectId, label: reference.name };
  });
}

export default toGridResources;
