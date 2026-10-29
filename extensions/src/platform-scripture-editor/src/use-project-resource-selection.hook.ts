import type { UseWebViewStateHook } from '@papi/core';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  getResourceSelectionKey,
  RESOURCE_SELECTION_BY_PROJECT_STATE_KEY,
  toResourceSelections,
  updateResourceSelections,
  type ResourceSelection,
  type ResourceSelectionByProject,
} from './resource-selection-state.utils';

/** Stable default for `useWebViewState`, so the hook does not hand it a fresh object each render. */
const NO_SELECTIONS: ResourceSelectionByProject = {};

/**
 * The selection a Bible texts or Commentaries panel keeps for the project it is showing. Each
 * project the panel has shown keeps its own, so switching projects shows that project's selection
 * rather than the one made in the project before.
 *
 * Hidden case: nothing to defer or catch up. A project switch reloads the panel whether or not its
 * tab is showing, and which resource is selected is decided from data, not layout, so a hidden tab
 * has the new project's selection by the time it is shown. See
 * `adr-panel-selection-per-project-in-web-view-state`.
 *
 * @param useWebViewState The web view's own `useWebViewState` from its `WebViewProps`
 * @param projectId The panel's project, if one is open
 * @returns The project's selection, and a function that changes the given fields of it
 */
export function useProjectResourceSelection(
  useWebViewState: UseWebViewStateHook,
  projectId: string | undefined,
): [ResourceSelection, (update: ResourceSelection) => void] {
  const [savedSelections, setSelections] = useWebViewState<ResourceSelectionByProject>(
    RESOURCE_SELECTION_BY_PROJECT_STATE_KEY,
    NO_SELECTIONS,
  );
  const selections = useMemo(() => toResourceSelections(savedSelections), [savedSelections]);

  // The setter takes a whole value, not an update, so two changes made before the next render would
  // otherwise each start from the same stale record and the second would undo the first.
  const latestSelectionsRef = useRef(selections);
  useEffect(() => {
    latestSelectionsRef.current = selections;
  }, [selections]);

  const updateSelection = useCallback(
    (update: ResourceSelection) => {
      const next = updateResourceSelections(latestSelectionsRef.current, projectId, update);
      latestSelectionsRef.current = next;
      setSelections(next);
    },
    [projectId, setSelections],
  );

  return [selections[getResourceSelectionKey(projectId)] ?? {}, updateSelection];
}
