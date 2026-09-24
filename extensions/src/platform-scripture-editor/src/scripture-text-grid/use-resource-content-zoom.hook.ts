import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useCallback, useMemo } from 'react';
import { resourceZoomAreaOf } from './resource-zoom-area.utils';

/**
 * Web-view state key the platform keeps this pane's own content zoom levels under, a map from zoom
 * area id to factor (`CONTENT_ZOOM_LEVELS_STATE_KEY` in core, which extension code cannot import).
 * The platform writes it; this view only reads it.
 */
const CONTENT_ZOOM_LEVELS_STATE_KEY = 'platform.contentZoomLevels';

/** The factor a resource shows while the Tab content default zoom setting is unavailable. */
const FALLBACK_DEFAULT_ZOOM = 1;

const NO_LEVELS: Record<string, unknown> = {};

type ContentZoomCommand =
  | 'platform.webViewContentZoomIn'
  | 'platform.webViewContentZoomOut'
  | 'platform.webViewContentZoomReset';

/** What a resource's zoom items need: its level, whether Reset has anything to undo, and actions. */
export type ResourceZoomController = {
  /** The resource's effective level: its own, else the Tab content default zoom. */
  getZoom: (resourceId: string) => number;
  /** Whether the resource has a level of its own (Reset has something to undo). */
  hasOwnLevel: (resourceId: string) => boolean;
  /** One step in (+1) or out (-1), through the platform command for the resource's area. */
  adjustZoom: (resourceId: string, deltaSteps: 1 | -1) => void;
  /** Returns the resource to the Tab content default zoom, through the platform command. */
  resetZoom: (resourceId: string) => void;
};

/** The level the pane holds for one area, or `undefined` when it holds no usable one. */
function ownLevelOf(levels: Record<string, unknown>, areaId: string): number | undefined {
  const level = levels[areaId];
  return typeof level === 'number' && Number.isFinite(level) ? level : undefined;
}

/**
 * The Text Collection's per-resource zoom menus, on the platform's content zoom: each resource is
 * its own zoom area, the platform owns and remembers the levels, and this hook only reads them and
 * sends the platform's zoom commands for one resource's area.
 *
 * @param webViewId The Text Collection tab's own web view id, which the commands target.
 * @param useWebViewState The web view's state hook, which exposes the platform-written levels.
 * @returns The controller the right-click menu and the "⋮" menu read and act through.
 */
export function useResourceContentZoom(
  webViewId: string,
  useWebViewState: WebViewProps['useWebViewState'],
): ResourceZoomController {
  const [levels] = useWebViewState<Record<string, unknown>>(
    CONTENT_ZOOM_LEVELS_STATE_KEY,
    NO_LEVELS,
  );
  const [defaultZoomPossiblyError] = useSetting(
    'platform.webViewContentZoom',
    FALLBACK_DEFAULT_ZOOM,
  );
  const defaultZoom = isPlatformError(defaultZoomPossiblyError)
    ? FALLBACK_DEFAULT_ZOOM
    : defaultZoomPossiblyError;

  const getZoom = useCallback(
    (resourceId: string) => ownLevelOf(levels, resourceZoomAreaOf(resourceId)) ?? defaultZoom,
    [levels, defaultZoom],
  );

  const hasOwnLevel = useCallback(
    (resourceId: string) => ownLevelOf(levels, resourceZoomAreaOf(resourceId)) !== undefined,
    [levels],
  );

  const send = useCallback(
    (command: ContentZoomCommand, resourceId: string) => {
      const areaId = resourceZoomAreaOf(resourceId);
      papi.commands
        .sendCommand(command, webViewId, areaId)
        .catch((error) =>
          logger.warn(
            `ScriptureTextGrid: ${command} for zoom area "${areaId}" failed: ${getErrorMessage(error)}`,
          ),
        );
    },
    [webViewId],
  );

  const adjustZoom = useCallback(
    (resourceId: string, deltaSteps: 1 | -1) =>
      send(
        deltaSteps > 0 ? 'platform.webViewContentZoomIn' : 'platform.webViewContentZoomOut',
        resourceId,
      ),
    [send],
  );

  const resetZoom = useCallback(
    (resourceId: string) => send('platform.webViewContentZoomReset', resourceId),
    [send],
  );

  return useMemo(
    () => ({ getZoom, hasOwnLevel, adjustZoom, resetZoom }),
    [getZoom, hasOwnLevel, adjustZoom, resetZoom],
  );
}

export default useResourceContentZoom;
