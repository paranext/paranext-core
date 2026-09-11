import { type ProjectItem } from '@renderer/components/projects/project-picker.component';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, normalizeProjectId } from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * How long the toolbar keeps naming a just-selected project before falling back to whatever the
 * open editor reports. The bound exists because a successful open has no guaranteed completion
 * signal here: `useProjectPickerData` resolves the current project from THIS window's editor web
 * views, so an editor that opens in another window (or resolves without producing one here) neither
 * throws nor ever matches. Without the bound the trigger would name a project that is not open,
 * indefinitely.
 */
export const PENDING_PROJECT_TIMEOUT_MS = 15_000;

/** What {@link usePendingProject} hands back to the surface that names the selected project. */
export type PendingProjectState = {
  /**
   * The project the user has just picked, held until the editor reports it. `undefined` whenever
   * there is nothing to bridge.
   */
  pendingProject: ProjectItem | undefined;
  /** The project to name right now: the pending pick if there is one, else `currentProject`. */
  displayedProject: ProjectItem | undefined;
  /** Opens a project and starts naming it immediately, ahead of the editor reporting it. */
  beginOpenProject: (item: ProjectItem) => void;
};

/**
 * Bridges the gap between the user picking a project and the editor reporting it, so the surface
 * naming the project can name the pick the moment it is made rather than lagging the editor.
 *
 * The bridge is retired by whichever of four exits comes first: the editor catching up (comparing
 * normalized ids, since the editor reports the project in its own casing), the open failing, the
 * user picking the project that is already open, or {@link PENDING_PROJECT_TIMEOUT_MS} elapsing.
 *
 * Display fields travel with the pick, not just an id: a project picked from a dialog need not be
 * in any visible list, so there is not always a list row to name it from.
 *
 * @param currentProject The project the editor currently reports, or `undefined` if none
 * @param openProject Opens the picked project. A rejection retires the pick that caused it.
 */
export function usePendingProject(
  currentProject: ProjectItem | undefined,
  openProject: (projectId: string) => Promise<void>,
): PendingProjectState {
  const [pendingProject, setPendingProject] = useState<ProjectItem | undefined>(undefined);
  const pendingProjectTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // The one entry point every selection path takes, so the trigger names the picked project the
  // moment it is picked whether it came from the popover or from the dialog.
  const beginOpenProject = useCallback(
    (item: ProjectItem) => {
      // Already the current project: there is nothing to bridge. Arming anyway would swap the
      // trigger onto this item's spelling of an id the editor already reports, and leave a timer
      // to unwind.
      const isAlreadyCurrent =
        !!currentProject && normalizeProjectId(currentProject.id) === normalizeProjectId(item.id);
      if (!isAlreadyCurrent) {
        setPendingProject(item);
        // Supersede whatever an earlier pick armed, so the bound always belongs to the newest one.
        clearTimeout(pendingProjectTimeoutRef.current);
        pendingProjectTimeoutRef.current = setTimeout(() => {
          setPendingProject(undefined);
        }, PENDING_PROJECT_TIMEOUT_MS);
      } else {
        // Picking the open project is also the user correcting the trigger: an earlier pick whose
        // editor never reported here would otherwise keep its name up until the bound expired.
        setPendingProject(undefined);
      }
      openProject(item.id).catch((e: unknown) => {
        logger.warn(
          `Toolbar caught an error while trying to open project ${item.id}: ${getErrorMessage(e)}`,
        );
        // Latest-wins: a slow failure for an earlier pick must not clear a newer one.
        setPendingProject((current) =>
          current && normalizeProjectId(current.id) === normalizeProjectId(item.id)
            ? undefined
            : current,
        );
      });
    },
    [currentProject, openProject],
  );

  // The editor caught up: the pending bridge has done its job.
  useEffect(() => {
    if (
      pendingProject &&
      currentProject &&
      normalizeProjectId(currentProject.id) === normalizeProjectId(pendingProject.id)
    )
      setPendingProject(undefined);
  }, [pendingProject, currentProject]);

  // Nothing pending means nothing left for the bound to unwind, whichever path retired it — the
  // editor catching up, or a failed open. One place to cancel, so no path can forget to.
  useEffect(() => {
    if (!pendingProject) {
      clearTimeout(pendingProjectTimeoutRef.current);
      pendingProjectTimeoutRef.current = undefined;
    }
  }, [pendingProject]);

  useEffect(
    () => () => {
      clearTimeout(pendingProjectTimeoutRef.current);
    },
    [],
  );

  return { pendingProject, displayedProject: pendingProject ?? currentProject, beginOpenProject };
}

export default usePendingProject;
