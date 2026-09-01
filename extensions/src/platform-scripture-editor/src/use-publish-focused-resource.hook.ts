import { useEffect } from 'react';

/**
 * Publishes the project id of the scripture/resource a read-only reference panel is displaying into
 * that panel's web view state, under `FOCUSED_RESOURCE_PROJECT_ID_STATE_KEY` (see
 * `focused-resource-state-key.const.ts`).
 *
 * A panel's web view definition `projectId` is its _container_ project, and Simple mode's default
 * layout opens these panels with no `projectId` at all — so the resource actually on screen is
 * otherwise invisible outside the panel's own iframe. Publishing it lets other extensions see it
 * through `getAllOpenWebViewDefinitions` / `onDidUpdateWebView`; Find's project picker reads it to
 * list resources open in these panels as searchable projects.
 *
 * Pass the current value and setter from `useWebViewState` — the write is skipped when the value is
 * unchanged, because each write updates the web view definition and fans an event out to every
 * subscriber (including this panel), which would otherwise loop.
 *
 * @param publishedProjectId Currently published value, from `useWebViewState`.
 * @param setPublishedProjectId Setter from `useWebViewState`.
 * @param focusedResourceProjectId Project id of the resource on screen, or `undefined` while none
 *   is resolved (still loading, or an uninstalled DBL resource) — published as `undefined` so a
 *   stale id is never left behind.
 */
export function usePublishFocusedResourceProjectId(
  publishedProjectId: string | undefined,
  setPublishedProjectId: (projectId: string | undefined) => void,
  focusedResourceProjectId: string | undefined,
): void {
  useEffect(() => {
    if (publishedProjectId === focusedResourceProjectId) return;
    setPublishedProjectId(focusedResourceProjectId);
  }, [publishedProjectId, setPublishedProjectId, focusedResourceProjectId]);
}
