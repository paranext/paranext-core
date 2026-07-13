import type { WebViewProps } from '@papi/core';
import { useCallback, useMemo, useRef } from 'react';
import { DEFAULT_ZOOM_FACTOR, adjustZoomFactor, clampZoom, roundZoom } from './resource-zoom.utils';

/** Per-resource zoom factors keyed by the stable resourceId. */
export type ZoomByResourceId = Record<string, number>;

/** The web view's state hook, injected so this controller is unit-testable. */
export type UseWebViewStateHook = WebViewProps['useWebViewState'];

/**
 * The single mutation/read surface the zoom input paths (context menu, kebab, Ctrl/Cmd+wheel)
 * funnel through.
 */
export type ResourceZoomController = {
  /** Returns the stored factor for `resourceId`, or `DEFAULT_ZOOM_FACTOR` if unset. */
  getZoom: (resourceId: string) => number;
  /** Stores a clamped, rounded factor for `resourceId`. */
  setZoomForResource: (resourceId: string, factor: number) => void;
  /** Steps the factor by `deltaSteps * ZOOM_STEP` (+1 = zoom in, −1 = zoom out). */
  adjustZoom: (resourceId: string, deltaSteps: number) => void;
  /** Removes the stored factor so `getZoom` returns the default. */
  resetZoom: (resourceId: string) => void;
  /**
   * Drops entries for resourceIds not in the list; call when the resource set changes to avoid
   * orphaned entries.
   */
  pruneToResourceIds: (resourceIds: readonly string[]) => void;
};

const EMPTY_ZOOM_MAP: ZoomByResourceId = {};

/**
 * Owns the per-resource zoom map, persisted in the grid web view's `useWebViewState` (synchronous
 * localStorage — no debounce needed, so no pending write can be lost on close). Reads fall back to
 * `DEFAULT_ZOOM_FACTOR`; writes clamp+round via `resource-zoom.utils`.
 *
 * @param useWebViewState - The web view's state hook, injected so the controller persists to (and
 *   rehydrates from) web-view state and stays unit-testable.
 * @returns The zoom controller the input paths (context menu, kebab, Ctrl/Cmd+wheel) funnel
 *   through.
 */
export function useResourceZoom(useWebViewState: UseWebViewStateHook): ResourceZoomController {
  const [zoomByResourceId, setZoomByResourceId] = useWebViewState<ZoomByResourceId>(
    'scriptureTextGrid.zoomByResourceId',
    EMPTY_ZOOM_MAP,
  );

  // Keep the latest map in a ref so the stable callbacks below compute next-state from the freshest
  // snapshot even when several fire before React re-renders (e.g. a fast Ctrl+wheel burst).
  const mapRef = useRef<ZoomByResourceId>(zoomByResourceId);
  mapRef.current = zoomByResourceId;

  const getZoom = useCallback(
    (resourceId: string) => roundZoom(mapRef.current[resourceId] ?? DEFAULT_ZOOM_FACTOR),
    [],
  );

  const setZoomForResource = useCallback(
    (resourceId: string, factor: number) => {
      const next = roundZoom(clampZoom(factor));
      if (mapRef.current[resourceId] === next) return;
      const updated = { ...mapRef.current, [resourceId]: next };
      mapRef.current = updated;
      setZoomByResourceId(updated);
    },
    [setZoomByResourceId],
  );

  const adjustZoom = useCallback(
    (resourceId: string, deltaSteps: number) => {
      const current = mapRef.current[resourceId] ?? DEFAULT_ZOOM_FACTOR;
      setZoomForResource(resourceId, adjustZoomFactor(current, deltaSteps));
    },
    [setZoomForResource],
  );

  const resetZoom = useCallback(
    (resourceId: string) => {
      if (!(resourceId in mapRef.current)) return;
      const rest = { ...mapRef.current };
      delete rest[resourceId];
      mapRef.current = rest;
      setZoomByResourceId(rest);
    },
    [setZoomByResourceId],
  );

  const pruneToResourceIds = useCallback(
    (resourceIds: readonly string[]) => {
      const live = new Set(resourceIds);
      const entries = Object.entries(mapRef.current).filter(([id]) => live.has(id));
      if (entries.length === Object.keys(mapRef.current).length) return; // nothing to prune
      const pruned = Object.fromEntries(entries);
      mapRef.current = pruned;
      setZoomByResourceId(pruned);
    },
    [setZoomByResourceId],
  );

  return useMemo(
    () => ({ getZoom, setZoomForResource, adjustZoom, resetZoom, pruneToResourceIds }),
    [getZoom, setZoomForResource, adjustZoom, resetZoom, pruneToResourceIds],
  );
}

export default useResourceZoom;
