/**
 * Service router for the renderer-hosted commands and dialog requests. Registers under the generic
 * request names they are called by (e.g. "platform.openSettings", "dialog:showDialog") and forwards
 * each call to a window's scoped handler (e.g. "platform.openSettings-1"). This enables
 * multi-window support by ensuring that renderer-hosted work executes in the right window: the
 * focused one for work that acts on the window the user is looking at, and the OWNING one for a
 * call that names a web view (see {@link WEB_VIEW_ID_COMMAND_NAMES}).
 *
 * Transitional: each of these commands moves into the router for its own service, at which point
 * this module goes away. See the router/shard pattern in `.context/standards/Architecture.md` §
 * "Service router and service shard".
 */

import {
  getNotReadyWindowIds,
  getReadyWindowIds,
  getTargetWindowId,
} from '@main/services/window-state.service';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import {
  RENDERER_HOSTED_COMMAND_DOCS,
  RENDERER_HOSTED_COMMAND_NAMES,
} from '@shared/services/web-view.service-model';
import { getWebViewShard } from '@main/services/web-view.service-router';
import * as networkService from '@shared/services/network.service';
import { NetworkMethodHandlerOptions } from '@shared/models/network.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { WebViewId } from '@shared/models/web-view.model';
import { serializeRequestType } from '@shared/utils/util';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Sort renderer-hosted commands by whether a call to them names a web view, reading each command's
 * own OpenRPC documentation rather than a second list kept in step with it by hand.
 *
 * A command whose FIRST parameter is a web view id has to run in the window that owns that web view
 * rather than the focused one — opening the settings for a web view in a background window must not
 * open a settings tab in the window the user happens to be looking at, and would resolve the wrong
 * project, since the owning window is the only one that can read the web view's definition.
 *
 * First is the constraint, not a convenience: {@link resolveRoutingWindowId} reads `args[0]`. A
 * command documenting a web view id anywhere else is reported rather than quietly left out, because
 * it looks routable by ownership and is not — the same silent wrong-window failure, returned inside
 * a mechanism that appears to handle it.
 *
 * @param docsByCommandName OpenRPC documentation keyed by generic (unscoped) command name
 * @returns The commands to route by ownership, and the ones whose declaration cannot be honored
 */
export function findWebViewIdCommandNames(
  docsByCommandName: Record<string, SingleMethodDocumentation>,
): {
  routableByOwner: string[];
  misdeclared: string[];
} {
  const routableByOwner: string[] = [];
  const misdeclared: string[] = [];
  Object.entries(docsByCommandName).forEach(([commandName, docs]) => {
    // A `Reference` param carries only a `$ref`, so it names nothing this can route on
    const webViewIdIndex = docs.method.params.findIndex(
      (param) => 'name' in param && param.name === 'webViewId',
    );
    if (webViewIdIndex === 0) routableByOwner.push(commandName);
    else if (webViewIdIndex > 0) misdeclared.push(commandName);
  });
  return { routableByOwner, misdeclared };
}

const { routableByOwner: webViewIdCommandNames, misdeclared: misdeclaredWebViewIdCommandNames } =
  findWebViewIdCommandNames(RENDERER_HOSTED_COMMAND_DOCS);

/**
 * Renderer-hosted commands whose first argument is a web view id. See
 * {@link findWebViewIdCommandNames}.
 */
const WEB_VIEW_ID_COMMAND_NAMES: ReadonlySet<string> = new Set(webViewIdCommandNames);

/**
 * Search the windows that can answer for the one whose WebView service shard knows the given web
 * view id, the same way `web-view.service-router.ts` finds a web view's owning shard — including
 * how it treats a window that could not be asked. Returns `undefined` when every window answered
 * and none claims the id; the caller then falls back to the focused window, which is what a web
 * view id that no longer exists anywhere would want anyway.
 *
 * Only ready windows are asked: a window that has not registered its services cannot answer, and
 * asking it stalls the call for the network service's whole registration retry. It still counts as
 * a window that could not be asked — see below.
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
  // A tracked window that has not registered its services is skipped by the search below rather
  // than answering it, so it is a window that could not be asked. It has to count as one, or the
  // fallback runs the call in the focused window while the web view it named sits in the window
  // nothing asked.
  const notReadyWindowIds = getNotReadyWindowIds();
  let hadServiceErrors = notReadyWindowIds.length > 0;
  if (hadServiceErrors)
    logger.warn(
      `Windows ${notReadyWindowIds.join(', ')} have not registered their services, so they could not be asked about web view ${webViewId} while routing ${requestName}`,
    );
  const ownerWindowIds = await Promise.all(
    getReadyWindowIds().map(async (id) => {
      try {
        const shard = await getWebViewShard(id);
        // Readiness is keyed on the window service; a renderer registers its WebView service
        // moments apart from that one, so a ready window can still be missing it. That window could
        // not be asked, which is not the same as it answering that it does not own the web view.
        if (!shard) {
          logger.warn(
            `WebView service for window ${id} is not registered, so it could not be asked about web view ${webViewId} while routing ${requestName}`,
          );
          hadServiceErrors = true;
          return undefined;
        }
        return (await shard.getOpenWebViewDefinition(webViewId)) ? id : undefined;
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
 * Register one route that forwards `category:name` to the scoped `category:name-{windowId}` of the
 * window that should handle it — the web view's owning window for the requests that name one, the
 * focused window otherwise.
 *
 * @param category Request category the name belongs to
 * @param name Generic (unscoped) request name consumers call
 * @param docs OpenRPC documentation for the generic name, if it has any
 */
async function registerRoutedRequestHandler(
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
    // are internal, so this router is where the OpenRPC docs belong
    docs,
    options,
  );
}

/**
 * Register routes for the commands the renderers still host per window. Each route forwards to a
 * window's scoped handler (see {@link resolveRoutingWindowId}). Must be called during main process
 * startup, before createWindow().
 */
export async function startCommandServiceRouter(): Promise<void> {
  if (misdeclaredWebViewIdCommandNames.length > 0) {
    const message = `Renderer-hosted commands document a webViewId parameter that is not their first, so calls naming a web view will run in the focused window instead of the window that owns it: ${misdeclaredWebViewIdCommandNames.join(', ')}`;
    // In dev/test, fail loudly and immediately so the gap cannot ship — startup collects and reports
    // this. In production a thrown error here would leave every generic name unanswered for the
    // session over one command's declaration, so log it and route the rest.
    if (!globalThis.isPackaged) throw new Error(message);
    logger.error(message);
  }

  await Promise.all(
    RENDERER_HOSTED_COMMAND_NAMES.map((commandName) =>
      registerRoutedRequestHandler(
        CATEGORY_COMMAND,
        commandName,
        RENDERER_HOSTED_COMMAND_DOCS[commandName],
      ),
    ),
  );

  logger.info(`Routes registered for ${RENDERER_HOSTED_COMMAND_NAMES.length} commands`);
}
