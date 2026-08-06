/**
 * Registers proxies under the generic request names that renderer-hosted commands and dialogs are
 * called by (e.g. "platform.openSettings", "dialog:showDialog") and forwards each call to a
 * window's scoped handler (e.g. "platform.openSettings-1"). This enables multi-window support by
 * ensuring that renderer-hosted work executes in the right window: the focused one for work that
 * acts on the window the user is looking at, and the OWNING one for a call that names a web view
 * (see {@link WEB_VIEW_ID_COMMAND_NAMES}).
 */

import { getReadyWindowIds, getTargetWindowId } from '@main/services/window-state.service';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import {
  CATEGORY_DIALOG,
  RENDERER_HOSTED_DIALOG_REQUEST_NAMES,
} from '@shared/services/dialog.service-model';
import {
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  RENDERER_HOSTED_COMMAND_DOCS,
  RENDERER_HOSTED_COMMAND_NAMES,
  WebViewServiceType,
} from '@shared/services/web-view.service-model';
import * as networkService from '@shared/services/network.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { NetworkMethodHandlerOptions } from '@shared/models/network.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { WebViewId } from '@shared/models/web-view.model';
import { serializeRequestType } from '@shared/utils/util';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Renderer-hosted commands whose FIRST argument is a web view id, so a call naming a web view has
 * to run in the window that owns it rather than the focused one — opening the settings for a web
 * view in a background window must not open a settings tab in the window the user happens to be
 * looking at (and would resolve the wrong project, since the owning window is the only one that can
 * read the web view's definition).
 *
 * Only commands that declare a web view id parameter belong here (see `papi-shared-types`):
 * `platform.openUserSettings` is deliberately absent — despite sharing a handler with
 * `platform.openSettings`, it is declared to take no arguments, so it has no owner to route by and
 * keeps following focus. Every other renderer-hosted command (about, Usersnap, the scripture
 * navigation commands) acts on the window itself, not on a named web view.
 */
const WEB_VIEW_ID_COMMAND_NAMES: ReadonlySet<string> = new Set([
  'platform.openSettings',
  'platform.openProjectSettings',
]);

/**
 * Search the windows that can answer for the one whose scoped WebViewService knows the given web
 * view id, the same way `web-view-routing.service.ts` finds a web view's owning service — including
 * how it treats a window that could not be asked. Returns `undefined` when every window answered
 * and none claims the id; the caller then falls back to the focused window, which is what a web
 * view id that no longer exists anywhere would want anyway.
 *
 * Only ready windows are asked: a window that has not registered its services cannot own a web
 * view, and asking it stalls the call for the network service's whole registration retry.
 *
 * @param webViewId Web view id the call named
 * @param requestName Request being routed, for logging
 * @throws If no window claimed the web view and some window could not be asked, since the owner may
 *   be the window that did not answer
 */
async function findWebViewOwnerWindowId(
  webViewId: WebViewId,
  requestName: string,
): Promise<number | undefined> {
  let hadServiceErrors = false;
  const ownerWindowIds = await Promise.all(
    getReadyWindowIds().map(async (id) => {
      try {
        const service = await networkObjectService.get<WebViewServiceType>(
          `${NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE}-${id}`,
        );
        // Readiness is keyed on the window service; a renderer registers its WebView service
        // moments apart from that one, so a ready window can still be missing it. That window could
        // not be asked, which is not the same as it answering that it does not own the web view.
        if (!service) {
          logger.warn(
            `WebView service for window ${id} is not registered, so it could not be asked about web view ${webViewId} while routing ${requestName}`,
          );
          hadServiceErrors = true;
          return undefined;
        }
        return (await service.getOpenWebViewDefinition(webViewId)) ? id : undefined;
      } catch (e) {
        logger.warn(
          `Failed to query web view ${webViewId} in window ${id} while routing ${requestName}: ${getErrorMessage(e)}`,
        );
        hadServiceErrors = true;
        return undefined;
      }
    }),
  );
  const ownerWindowId = ownerWindowIds.find((id) => id !== undefined);
  if (ownerWindowId !== undefined) return ownerWindowId;

  // "Could not ask" is not "answered no". Falling back to the focused window here would run the
  // call against whatever that window is showing instead of the web view it named.
  if (hadServiceErrors)
    throw new Error(
      `Could not route ${requestName} for web view ${webViewId}: some windows were unreachable.`,
    );

  return undefined;
}

/**
 * The window a call to `category:name` should run in: the window that owns the web view the call
 * names (when the request takes a web view id and some window owns it), else the focused window.
 *
 * @throws If there is no window to route to
 */
async function resolveRoutingWindowId(
  category: string,
  name: string,
  args: unknown[],
): Promise<number> {
  if (category === CATEGORY_COMMAND && WEB_VIEW_ID_COMMAND_NAMES.has(name)) {
    const [webViewId] = args;
    // The id is optional on some of these commands, and arguments arrive untyped over the network
    if (typeof webViewId === 'string') {
      const ownerWindowId = await findWebViewOwnerWindowId(webViewId, `${category}:${name}`);
      if (ownerWindowId !== undefined) return ownerWindowId;
    }
  }

  const targetWindowId = getTargetWindowId();
  if (targetWindowId === undefined)
    throw new Error(`No windows available to route ${category}:${name}`);
  return targetWindowId;
}

/**
 * Register one proxy that forwards `category:name` to the scoped `category:name-{windowId}` of the
 * window that should handle it — the web view's owning window for the requests that name one, the
 * focused window otherwise.
 *
 * @param category Request category the name belongs to
 * @param name Generic (unscoped) request name consumers call
 * @param docs OpenRPC documentation for the generic name, if it has any
 */
async function registerWindowRoutingProxy(
  category: string,
  name: string,
  docs?: SingleMethodDocumentation,
  options?: NetworkMethodHandlerOptions,
): Promise<void> {
  await networkService.registerRequestHandler(
    serializeRequestType(category, name),
    async (...args: unknown[]) => {
      const targetWindowId = await resolveRoutingWindowId(category, name, args);
      return networkService.request(
        serializeRequestType(category, `${name}-${targetWindowId}`),
        ...args,
      );
    },
    // The generic name is the documented public API; the scoped names the renderers register under
    // are internal, so this proxy is where the OpenRPC docs belong
    docs,
    options,
  );
}

/**
 * Register proxies for everything the renderers host per window — the renderer-hosted commands and
 * the dialog requests. Each proxy forwards to a window's scoped handler (see
 * {@link resolveRoutingWindowId}). Must be called during main process startup, before
 * createWindow().
 */
export async function startCommandRoutingService(): Promise<void> {
  await Promise.all([
    ...RENDERER_HOSTED_COMMAND_NAMES.map((commandName) =>
      registerWindowRoutingProxy(
        CATEGORY_COMMAND,
        commandName,
        RENDERER_HOSTED_COMMAND_DOCS[commandName],
      ),
    ),
    ...RENDERER_HOSTED_DIALOG_REQUEST_NAMES.map((requestName) =>
      // No OpenRPC docs on the generic dialog names. The renderer's doc objects reference
      // `dialog-definition.model` (renderer-only) for the dialog-type enum, so they cannot move to
      // the shared model the way RENDERER_HOSTED_COMMAND_DOCS did without relocating that model
      // too. The docs still appear in the OpenRPC document under the scoped names. Move
      // `dialog-definition.model` to `@shared` if the public names need documenting.
      //
      // A dialog waits for the user, so the proxy must disable its timeout the same way the
      // renderer's registration does — otherwise the generic request gives up while the dialog is
      // still open.
      registerWindowRoutingProxy(CATEGORY_DIALOG, requestName, undefined, {
        timeoutMilliseconds: 0,
      }),
    ),
  ]);

  logger.info(
    `Routing proxies registered for ${RENDERER_HOSTED_COMMAND_NAMES.length} commands and ${RENDERER_HOSTED_DIALOG_REQUEST_NAMES.length} dialog requests`,
  );
}
