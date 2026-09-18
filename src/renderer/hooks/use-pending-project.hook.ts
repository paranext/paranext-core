import { type ProjectItem } from '@renderer/components/projects/project-picker.component';
import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import { getErrorMessage, normalizeProjectId, type LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Message shown when a picked project fails to open. Declared here rather than inline so the key is
 * spelled exactly once — `PlatformNotification.message` accepts any string, so a typo would not
 * fail the build; it would ship a raw `%key%` into a toast.
 */
export const PROJECT_OPEN_FAILED_MESSAGE_KEY: LocalizeKey = '%toolbar_project_open_failed%';

/**
 * Shared by every "couldn't open that project" toast so a user retrying against an unavailable
 * editor replaces the message rather than collecting one copy per attempt.
 */
export const PROJECT_OPEN_FAILED_NOTIFICATION_ID = 'toolbar-project-open-failed';

/**
 * Sends the "couldn't open that project" toast and swallows its own failure.
 *
 * A named function rather than a chain inside the open-failure handler: nesting one promise in
 * another's rejection path is what `promise/no-nesting` is about, and pulling it out keeps the
 * handler itself synchronous — an `async` handler there would be a promise nobody holds, so a throw
 * outside the inner `catch` would surface as an unhandled rejection rather than a logged warning.
 */
function reportProjectOpenFailure() {
  notificationService
    .send({
      message: PROJECT_OPEN_FAILED_MESSAGE_KEY,
      severity: 'warning',
      notificationId: PROJECT_OPEN_FAILED_NOTIFICATION_ID,
    })
    .catch((notificationError: unknown) => {
      logger.warn(
        `Toolbar could not notify the user that opening a project failed: ${getErrorMessage(notificationError)}`,
      );
    });
}

/**
 * How long the toolbar keeps naming a just-selected project before falling back to whatever the
 * open editor reports. The bound exists because a successful open has no guaranteed completion
 * signal here: `useProjectPickerData` resolves the current project from THIS window's editor web
 * views — deliberately, so a background window's editor never becomes this window's current project
 * — so an editor that opens in another window (or resolves without producing one here) neither
 * throws nor ever matches. Without the bound the trigger would name a project that is not open,
 * indefinitely.
 *
 * The duration is a conservative round number, not a measured one: nothing here is derived from
 * project-open latency data, and the value only has to outlast any plausible open while still
 * clearing on its own rather than stranding the name. Widen it freely if a slow open is seen losing
 * its label; it is not tuned against a benchmark and should not be read as if it were.
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
  /**
   * The normalized id of the most recent pick, whether or not it is still pending.
   *
   * A ref rather than the `pendingProject` state because the failure path needs to know which pick
   * is current at the moment a rejection lands, and a pick that succeeded has already cleared the
   * state it would otherwise be read from.
   */
  const latestPickedProjectKeyRef = useRef<string | undefined>(undefined);

  // The one entry point every selection path takes, so the trigger names the picked project the
  // moment it is picked whether it came from the popover or from the dialog.
  const beginOpenProject = useCallback(
    (item: ProjectItem) => {
      // Already the current project: there is nothing to bridge. Arming anyway would swap the
      // trigger onto this item's spelling of an id the editor already reports, and leave a timer
      // to unwind.
      latestPickedProjectKeyRef.current = normalizeProjectId(item.id);
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
      // Synchronous on purpose. An `async` handler here is a promise nobody holds, so anything
      // throwing outside the inner `catch` — `logger.warn`, `setPendingProject` — would surface as
      // an unhandled rejection in the renderer instead of a logged warning.
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
        // Latest-wins again, for the same reason the state update above applies it: a slow failure
        // for a pick the user has already moved on from would otherwise toast while the project
        // they picked afterwards is open and named in the trigger, which reads as that one failing.
        if (latestPickedProjectKeyRef.current !== normalizeProjectId(item.id)) return;
        // Dropping the name back to whatever is open would otherwise undo the user's pick with no
        // account of why. Only this path reports: the timeout above is not a failure, since an
        // editor that opens in another window never reports here and has not gone wrong.
        reportProjectOpenFailure();
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
