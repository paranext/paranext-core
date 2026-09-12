import { useEffect, useState } from 'react';
import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Resolves a reading panel's container project id to one that actually exists, reporting
 * `undefined` for a project that does not.
 *
 * A web view definition can name a project that is no longer on disk — a saved layout restored
 * after the project was deleted, moved, or never cloned onto this machine. Without this, such an id
 * is indistinguishable from a project that is merely slow to register: every project-scoped hook
 * downstream waits on a data provider that will never arrive, so the panel spins on its loading
 * state for the life of the window with no error and no way out.
 *
 * Answering `undefined` instead puts those panels on the no-project path, which is a working state:
 * with no project, a panel offers the freely-licensed texts (see `useResourceReferenceSource`)
 * rather than a spinner.
 *
 * ## Why the answer starts optimistic
 *
 * The id is reported unchanged until a lookup has _confidently_ said the project is absent. A
 * project's PDP factory registers well after the window paints, so anything that treated "not found
 * yet" as "not there" would flash the no-project prompt at a user whose project is fine — and, for
 * the panels, would then have to unwind that once the real list arrived. Staying optimistic costs
 * nothing: the panel is already showing its loading state during that window either way.
 *
 * ## What counts as confident
 *
 * `getMetadataForProject` is the confidence bar, chosen because it is the same one the toolbar's
 * project picker already uses to decide it cannot name the current project. It waits for a PDP
 * factory to register (20s) and then retries the metadata read across a startup grace period, so it
 * rejects only once "absent" is the best available answer.
 *
 * It cannot distinguish absence from an infrastructure failure that outlasts those waits — both
 * arrive as a rejection, and both land the panel on the no-project path. That is the safe way for
 * the ambiguity to resolve: the no-project path renders something usable and re-resolves if the id
 * changes, whereas the alternative is the permanent spinner this exists to remove.
 *
 * @param projectId The container project from the web view definition, or `undefined` when the web
 *   view was opened without one.
 * @returns `projectId` while it is present and not known to be missing; `undefined` when there is
 *   no project or the named one could not be found.
 */
export function useResolvedContainerProjectId(projectId: string | undefined): string | undefined {
  const [missingProjectId, setMissingProjectId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (projectId === undefined) return undefined;

    let isCurrent = true;
    papi.projectLookup
      .getMetadataForProject(projectId)
      .then(() => {
        // Clears a stale verdict rather than only setting one: the same project id can come back
        // (a Send/Receive clone, a restart after the project is restored) and the panel must
        // return to the project path when it does.
        if (isCurrent) setMissingProjectId(undefined);
        return undefined;
      })
      .catch((e: unknown) => {
        if (!isCurrent) return;
        logger.warn(
          `Resource panel container project ${projectId} could not be found; treating this panel as having no project: ${getErrorMessage(e)}`,
        );
        setMissingProjectId(projectId);
      });

    return () => {
      isCurrent = false;
    };
  }, [projectId]);

  // Compared against the id this verdict was reached for, not held as a bare boolean: the effect's
  // cleanup only stops a stale response from landing, it cannot un-render one that already did, so
  // a new `projectId` must not inherit the previous id's verdict for even one render.
  return missingProjectId !== undefined && missingProjectId === projectId ? undefined : projectId;
}

export default useResolvedContainerProjectId;
