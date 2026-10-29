import type { UseWebViewStateHook } from '@papi/core';
import { deepEqual } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  getResourceSelectionKey,
  RESOURCE_SELECTION_BY_PROJECT_STATE_KEY,
  toResourceSelections,
  updateResourceSelections,
  type StoredResourceSelection,
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
): [StoredResourceSelection, (update: StoredResourceSelection) => void] {
  const [savedSelections, setSelections] = useWebViewState<ResourceSelectionByProject>(
    RESOURCE_SELECTION_BY_PROJECT_STATE_KEY,
    NO_SELECTIONS,
  );
  const selections = useMemo(() => toResourceSelections(savedSelections), [savedSelections]);

  // The setter takes a whole value, not an update, so two changes made before the next render would
  // otherwise each start from the same stale record and the second would undo the first.
  const latestSelectionsRef = useRef(selections);
  // The last value written, until the web view state reports it back. Each write is reported back in
  // turn, so an earlier write can render after a later one was made; taking that render as the
  // latest would let the next change build on it and undo the later write.
  const unreportedWriteRef = useRef<ResourceSelectionByProject | undefined>(undefined);
  useEffect(() => {
    const unreportedWrite = unreportedWriteRef.current;
    if (unreportedWrite) {
      if (!deepEqual(selections, unreportedWrite)) return;
      unreportedWriteRef.current = undefined;
    }
    latestSelectionsRef.current = selections;
  }, [selections]);

  const updateSelection = useCallback(
    (update: StoredResourceSelection) => {
      // Normalized like a rendered value, so the render that reports it back compares equal
      const next = toResourceSelections(
        updateResourceSelections(latestSelectionsRef.current, projectId, update),
      );
      // An unchanged value is never reported back, so it must not wait for a report
      if (deepEqual(next, latestSelectionsRef.current)) return;
      latestSelectionsRef.current = next;
      unreportedWriteRef.current = next;
      setSelections(next);
    },
    [projectId, setSelections],
  );

  return [selections[getResourceSelectionKey(projectId)] ?? {}, updateSelection];
}
