import papi, { logger } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  getResourceSelection,
  RESOURCE_SELECTION_SETTING_KEY,
  type ResourcePanelType,
  type ResourceSelectionsByPanel,
  type StoredResourceSelection,
} from './resource-selection-state.utils';

/** Stable default for `useSetting`, so the hook does not hand it a fresh object each render. */
const NO_SELECTIONS: ResourceSelectionsByPanel = {};

/**
 * The selection a Bible texts or Commentaries panel keeps for the project it is showing. Each
 * project keeps its own, in a user setting, so switching projects or restarting shows that
 * project's selection rather than the one made in the project before.
 *
 * Writes go through `platformScriptureEditor.updateResourceSelection`, which merges one project's
 * entry into the setting and runs writes one at a time, so this hook keeps no copy of its own. A
 * write shows once the setting reports it back.
 *
 * Writes only for the project the panel mounted with. A project switch reloads the panel into a new
 * document, but the old document can render once more with the new project's id while it still
 * holds the old project's resources; a selection resolved from those must not be stored for the new
 * project.
 *
 * Hidden case: nothing to defer or catch up. A project switch reloads the panel whether or not its
 * tab is showing, and which resource is selected is decided from data, not layout, so a hidden tab
 * has the new project's selection by the time it is shown. See
 * `adr-panel-selection-per-project-in-user-setting`.
 *
 * @param resourceType The kind of resource the panel lists
 * @param projectId The panel's project, if one is open
 * @returns The project's selection, a function that changes the given fields of it, and whether the
 *   setting is still loading (the selection is empty until it has)
 */
export function useProjectResourceSelection(
  resourceType: ResourcePanelType,
  projectId: string | undefined,
): [StoredResourceSelection, (update: StoredResourceSelection) => void, boolean] {
  const [savedPossiblyError, , , isLoading] = useSetting(
    RESOURCE_SELECTION_SETTING_KEY,
    NO_SELECTIONS,
  );

  useEffect(() => {
    if (isPlatformError(savedPossiblyError))
      logger.warn(
        `Could not read the resource selections; showing none: ${getErrorMessage(savedPossiblyError)}`,
      );
  }, [savedPossiblyError]);

  const selection = useMemo(
    () =>
      isPlatformError(savedPossiblyError)
        ? {}
        : getResourceSelection(savedPossiblyError, resourceType, projectId),
    [savedPossiblyError, resourceType, projectId],
  );

  const mountedProjectIdRef = useRef(projectId);
  const updateSelection = useCallback(
    (update: StoredResourceSelection) => {
      if (projectId !== mountedProjectIdRef.current) {
        logger.debug(
          `Not storing a ${resourceType} selection for project ${projectId} from a panel mounted for ${mountedProjectIdRef.current}`,
        );
        return;
      }
      papi.commands
        .sendCommand(
          'platformScriptureEditor.updateResourceSelection',
          resourceType,
          projectId,
          update,
        )
        .catch((e) =>
          logger.warn(
            `Could not store the ${resourceType} selection for project ${projectId}: ${getErrorMessage(e)}`,
          ),
        );
    },
    [resourceType, projectId],
  );

  return [selection, updateSelection, isLoading];
}
