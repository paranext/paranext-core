import { useEffect, useRef } from 'react';

/** The project a `useProjectData` subscription reads, and the provider it currently reads from. */
export type ProjectDataSource = {
  projectId: string | undefined;
  /** The provider passed to `useProjectData`, as `useProjectDataProvider` returned it. */
  dataProvider: unknown;
};

/**
 * Whether the data a `useProjectData` subscription fetches with `selector` is still loading.
 * `useProjectData` marks a new selector or provider as loading only from an effect, so the render
 * that changes one still reports the previous data as settled. This also reports loading:
 *
 * - On the render that changes `selector`, until an effect has seen it.
 * - After `source.projectId` changes, until the subscription has been seen loading from a provider
 *   other than the one served before the project changed. `useProjectDataProvider` keeps serving
 *   the previous project's provider until the new one resolves, and a request still in flight on it
 *   settles as if it were the new project's data.
 *
 * @param selector The memoized selector the data is fetched with. Compared by identity, as
 *   `useProjectData` compares it.
 * @param isLoading The loading flag `useProjectData` returned for that fetch.
 * @param source The project and provider the subscription reads. Leave it out only when the project
 *   cannot change for the life of the component.
 * @returns `true` while the data is loading.
 */
export function useIsProjectDataLoading(
  selector: unknown,
  isLoading: boolean,
  source?: ProjectDataSource,
): boolean {
  const selectorSeenByEffectRef = useRef(selector);
  useEffect(() => {
    selectorSeenByEffectRef.current = selector;
  }, [selector]);

  // Updated during render, not in an effect, so no render after a project change can read the
  // previous project's data as settled.
  const projectId = source?.projectId;
  const dataProvider = source?.dataProvider;
  const lastRenderProviderRef = useRef(dataProvider);
  const projectLoadRef = useRef<{
    projectId: string | undefined;
    previousProvider: unknown;
    hasSeenLoading: boolean;
  }>({ projectId, previousProvider: undefined, hasSeenLoading: true });
  if (projectLoadRef.current.projectId !== projectId)
    projectLoadRef.current = {
      projectId,
      previousProvider: lastRenderProviderRef.current,
      hasSeenLoading: false,
    };
  if (isLoading && dataProvider !== projectLoadRef.current.previousProvider)
    projectLoadRef.current.hasSeenLoading = true;
  lastRenderProviderRef.current = dataProvider;

  return (
    isLoading ||
    selectorSeenByEffectRef.current !== selector ||
    !projectLoadRef.current.hasSeenLoading
  );
}
