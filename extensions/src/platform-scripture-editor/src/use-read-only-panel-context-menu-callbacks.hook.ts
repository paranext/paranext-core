import papi, { logger } from '@papi/frontend';
import type { EditorContextMenuRequest } from 'platform-bible-react/experimental';
import { useMemo } from 'react';
import {
  CONTEXT_MENU_HAS_SELECTION_KEY,
  createContextMenuCommandEffects,
} from './editor-context-menu-pick.util';
import type { ReadOnlyPanelContextMenuCallbacks } from './use-read-only-panel-context-menu.hook';
import { useContextMenuRequestLog } from './use-context-menu-request-log.hook';

/** The request key the panels' Find item reads for "a project to search has resolved". */
export const CONTEXT_MENU_CAN_FIND_KEY = 'platformScriptureEditor.contextMenu.canFind';

/**
 * The options `papi.overlays.showContextMenu` gets for one read-only panel right-click: where to
 * open, the facts the menu's conditions read, and no command run by the platform (the panel runs
 * what was picked itself).
 *
 * @param request What the editor reported for the right-click
 * @param canFind Whether the panel has a project for Find to search
 */
export function getReadOnlyPanelContextMenuShowOptions(
  request: EditorContextMenuRequest,
  canFind: boolean,
) {
  return {
    position: request.position,
    shouldRunCommand: false,
    contextKeys: {
      [CONTEXT_MENU_HAS_SELECTION_KEY]: request.hasSelection,
      [CONTEXT_MENU_CAN_FIND_KEY]: canFind,
    },
  };
}

/** What {@link createReadOnlyPanelContextMenuCallbacks} needs to know about the panel. */
export type ReadOnlyPanelContextMenuCallbacksOptions = {
  /** The web view's id: the menu opens in, and picked commands are sent for, this tab. */
  webViewId: string;
  /** The web view type whose `contextMenu` contribution the menu is built from. */
  webViewType: string;
  /** The project the panel shows, the source for Find; `undefined` while none is resolved. */
  projectId: string | undefined;
  /** Wraps each `showContextMenu` call to log its outcome. */
  trackRequest: (
    request: EditorContextMenuRequest,
    showMenu: Promise<string | undefined>,
  ) => Promise<string | undefined>;
  /** The platform services the callbacks call. */
  papi: Pick<typeof papi, 'commands' | 'overlays'>;
  /** Receives the failure of a command that could not be sent. */
  logger: { warn: (message: string) => void };
};

/**
 * The platform calls behind a read-only panel's context menu. Find sends what the panel's Ctrl+F
 * sends: the panel's own project and the selection as the project spells it.
 */
export function createReadOnlyPanelContextMenuCallbacks({
  webViewId,
  webViewType,
  projectId,
  trackRequest,
  papi: papiService,
  logger: log,
}: ReadOnlyPanelContextMenuCallbacksOptions): ReadOnlyPanelContextMenuCallbacks {
  const { openFind, sendCommand } = createContextMenuCommandEffects({
    webViewId,
    projectId,
    viewOptions: undefined,
    editorName: 'panel editor',
    papi: papiService,
    logger: log,
  });
  return {
    requestMenu: (request) =>
      trackRequest(
        request,
        papiService.overlays.showContextMenu(
          webViewType,
          webViewId,
          getReadOnlyPanelContextMenuShowOptions(request, projectId !== undefined),
        ),
      ),
    dismissMenu: () => papiService.overlays.dismissContextMenu(webViewId),
    openFind,
    sendCommand,
  };
}

/**
 * {@link createReadOnlyPanelContextMenuCallbacks} on the real platform services, for the web view of
 * a read-only Scripture panel to hand to its component.
 *
 * @param webViewId The web view's id
 * @param webViewType The web view type the panel runs as
 * @param projectId The project the panel shows, or `undefined` while none is resolved
 */
export function useReadOnlyPanelContextMenuCallbacks(
  webViewId: string,
  webViewType: string,
  projectId: string | undefined,
): ReadOnlyPanelContextMenuCallbacks {
  const trackRequest = useContextMenuRequestLog({
    webViewId,
    editorName: 'panel editor',
    isMainEditor: false,
    logger,
  });
  return useMemo(
    () =>
      createReadOnlyPanelContextMenuCallbacks({
        webViewId,
        webViewType,
        projectId,
        trackRequest,
        papi,
        logger,
      }),
    [webViewId, webViewType, projectId, trackRequest],
  );
}
