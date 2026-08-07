/**
 * Service router for the WebView service. Registers under the generic "WebViewService" network
 * object name and routes calls to the focused window's WebView service shard (e.g.
 * "WebViewService-1"). This enables multi-window support by ensuring that operations like
 * openWebView execute in the correct window. It also claims the settings commands, which open a tab
 * in a window's dock layout and so belong to the same shards.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import {
  focusWindow,
  getFocusedWindowId,
  getNotReadyWindowIds,
  getReadyWindowIds,
  getTargetWindowId,
  isWindowReady,
} from '@main/services/window-state.service';
import { assertCommandRoutingMatchesDocs } from '@main/services/owner-routed-command.util';
import { createTargetShardResolver } from '@main/services/target-shard-resolver.util';
import {
  GetWebViewOptions,
  OpenWebViewOptions,
  ReloadWebViewOptions,
  SavedWebViewDefinition,
  WebViewId,
  WebViewType,
} from '@shared/models/web-view.model';
import { Layout } from '@shared/models/docking-framework.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { networkObjectService } from '@shared/services/network-object.service';
import { createServiceShardIndex } from '@main/services/service-shard-index';
import { WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import { WebViewServiceShard } from '@shared/models/web-view.service-shard.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { getNetworkEvent, registerRequestHandler } from '@shared/services/network.service';
import { serializeRequestType } from '@shared/utils/util';
import {
  CloseWebViewEvent,
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
  getWebViewController,
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  OpenWebViewEvent,
  UpdateWebViewEvent,
  WebViewServiceType,
} from '@shared/services/web-view.service-model';

/**
 * The WebView service shard each window registers, found by network object type and window
 * attribute rather than by rebuilding the window-scoped name the window registered under.
 */
const webViewShards = createServiceShardIndex<WebViewServiceShard>({
  objectType: WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE,
  resolveShard: (networkObjectId) => networkObjectService.get<WebViewServiceShard>(networkObjectId),
});

/**
 * Get the WebView service shard for a specific window. Returns undefined if that window has not
 * registered one — its renderer has not got that far, or the window is gone.
 *
 * Exported for `scroll-group-navigation.commands.ts`, which writes a detached reference back to the
 * window that answered its navigation context and so has to reach the same shards this router
 * does.
 *
 * @param windowId The Electron BrowserWindow ID
 */
export async function getWebViewShard(windowId: number): Promise<WebViewServiceShard | undefined> {
  return webViewShards.getShard(windowId);
}

/** Get the WebView service shard for the currently focused window, throwing if none is available. */
const getTargetWebViewShard = createTargetShardResolver(
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  webViewShards,
);

/** The window that owns a web view, and the definition the ownership search already fetched */
type WebViewOwner = {
  /**
   * The window that claimed the web view. Kept alongside the shard because the search already
   * resolved it, and raising that window afterwards is the only way the user sees where a
   * cross-window operation went.
   */
  windowId: number;
  shard: WebViewServiceShard;
  definition: SavedWebViewDefinition;
};

/**
 * Search the windows that can answer for the one that owns a given web view, returning its WebView
 * service shard along with the definition the search fetched — callers that want the definition
 * already have it here, and a second fetch would be another cross-process round trip that can come
 * back with something different.
 *
 * Only ready windows are asked: a window that has not registered its services cannot answer, and
 * asking it stalls the search for the network service's whole registration retry. It still counts
 * as a window that could not be asked — see below.
 *
 * Returns undefined when every window answered and none owns it.
 *
 * @throws If no window claimed the web view and some window could not be asked, since the owner may
 *   be the window that did not answer
 */
async function findOwner(
  webViewId: WebViewId,
  operation: string,
): Promise<WebViewOwner | undefined> {
  // A tracked window that has not registered its services is skipped by the search below rather
  // than answering it, which makes it a window that could not be asked. Letting the search come
  // back "nobody owns this" while such a window exists would send the operation to the focused
  // window, and the web view it named may be sitting in the window that never got asked.
  const notReadyWindowIds = getNotReadyWindowIds();
  let hadServiceErrors = notReadyWindowIds.length > 0;
  if (hadServiceErrors)
    logger.warn(
      `Windows ${notReadyWindowIds.join(', ')} have not registered their services, so they could not be asked about webview ${webViewId} for ${operation}`,
    );
  const owners = await Promise.all(
    getReadyWindowIds().map(async (windowId) => {
      try {
        const webViewShard = await getWebViewShard(windowId);
        // A ready window is one whose renderer registered its WINDOW service; the others register
        // moments apart, so its WebView service can still be missing. That is a window that could
        // not be asked, not one that answered no — see the reachability note below.
        if (!webViewShard) {
          logger.warn(
            `WebView service for window ${windowId} is not registered, so it could not be asked about webview ${webViewId} for ${operation}`,
          );
          hadServiceErrors = true;
          return undefined;
        }
        const definition = await webViewShard.getOpenWebViewDefinition(webViewId);
        if (definition) return { windowId, shard: webViewShard, definition };
        return undefined;
      } catch (e) {
        logger.warn(
          `Failed to query webview ${webViewId} in window ${windowId} for ${operation}: ${getErrorMessage(e)}`,
        );
        hadServiceErrors = true;
        return undefined;
      }
    }),
  );
  const owner = owners.find((candidate) => candidate !== undefined);
  if (owner) return owner;

  // "Could not ask" is not "answered no": the window that failed may be the one holding this web
  // view, and treating it as an unowned id sends the operation to the focused window instead
  if (hadServiceErrors)
    throw new Error(`Could not ${operation} webview ${webViewId}: some windows were unreachable.`);

  return undefined;
}

/**
 * The tab a layout says to open next to or over, which names the window that tab is in.
 *
 * `tab` layouts are deliberately not routed by their `parentTabGroupId`. A tab group id is not a
 * web view id, so answering it would mean asking every window a question none of them can answer
 * today — a new cross-process query per open, for the single call site that passes one (the dock's
 * "+" button, whose tab group is by construction in the window the user just clicked in).
 */
function getLayoutTargetTabId(layout?: Layout): string | undefined {
  if (layout?.type === 'panel' || layout?.type === 'replace-tab') return layout.targetTabId;
  return undefined;
}

/**
 * The window holding the tab a layout points at, or nothing if no window that could answer has it.
 *
 * A window that could not be asked does NOT fail the open here, which is the one way this differs
 * from the `existingId` search. Guessing wrong there costs a second copy of a web view meant to be
 * unique; guessing wrong here costs only placement — the tab still opens, in the window the user is
 * in, beside whatever is already there. Failing instead would mean that for as long as ANY window
 * cannot answer — a second window still starting, or one whose renderer crashed and never
 * re-registered — every open naming a tab produces nothing at all.
 */
async function findLayoutTargetOwner(targetTabId: string): Promise<WebViewOwner | undefined> {
  try {
    return await findOwner(targetTabId, 'openWebView beside a layout target');
  } catch (e) {
    logger.warn(
      `Could not work out which window holds tab ${targetTabId}, so this open goes to the window the user is in: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * Run an open in the window that owns the tab it was routed by, and raise that window.
 *
 * Raising is deliberately narrow. It only happens when something actually opened — raising a window
 * to show a tab that did not appear is worse than not raising it — and only when the owning window
 * is not the one the call was already going to, since the tab is appearing in front of the user
 * there anyway and taking OS focus would interrupt whatever else they are doing to show it to
 * them.
 *
 * It also only happens while this app holds focus, so this can move focus BETWEEN this app's
 * windows but never take it from another application. An open routed here need not be something the
 * user just asked for — an extension can re-open a web view by id at any moment — and pulling the
 * app in front of whatever they are working in would be the wrong answer to every one of those.
 */
async function openWebViewInOwningWindow(
  owner: WebViewOwner,
  webViewType: WebViewType,
  layout?: Layout,
  options?: OpenWebViewOptions,
): Promise<WebViewId | undefined> {
  const openedWebViewId = await owner.shard.openWebView(webViewType, layout, options);
  const isCrossWindow = owner.windowId !== getTargetWindowId();
  if (openedWebViewId && isCrossWindow && getFocusedWindowId() !== undefined)
    focusWindow(owner.windowId);
  return openedWebViewId;
}

// Router methods that route to the focused window's WebView service shard

async function openWebView(
  webViewType: WebViewType,
  layout?: Layout,
  options?: OpenWebViewOptions,
): Promise<WebViewId | undefined> {
  // If an existingId is provided, search all windows for the webview's owner
  if (options?.existingId) {
    const owner = await findOwner(options.existingId, 'openWebView');
    if (owner) return openWebViewInOwningWindow(owner, webViewType, layout, options);
  }

  // A layout naming a tab names the window that tab is in, so it routes the same way an existingId
  // does — and after it, because a window shard that finds the existing web view raises it and
  // returns before it ever reads the layout. Routing in the other order would send the call to a
  // window that then ignores the reason it was sent there.
  const layoutTargetTabId = getLayoutTargetTabId(layout);
  if (layoutTargetTabId) {
    const owner = await findLayoutTargetOwner(layoutTargetTabId);
    if (owner) return openWebViewInOwningWindow(owner, webViewType, layout, options);
  }

  // No existingId or not found in any window — route to focused window
  const webViewShard = await getTargetWebViewShard();
  return webViewShard.openWebView(webViewType, layout, options);
}

async function reloadWebView(
  webViewType: WebViewType,
  webViewId: WebViewId,
  options?: ReloadWebViewOptions,
): Promise<WebViewId | undefined> {
  const owner = await findOwner(webViewId, 'reload');
  if (owner) return owner.shard.reloadWebView(webViewType, webViewId, options);

  // Webview not found in any window — fall back to focused window (may be a new webview)
  const webViewShard = await getTargetWebViewShard();
  return webViewShard.reloadWebView(webViewType, webViewId, options);
}

async function getOpenWebViewDefinition(
  webViewId: string,
): Promise<SavedWebViewDefinition | undefined> {
  return (await findOwner(webViewId, 'getOpenWebViewDefinition'))?.definition;
}

/** Everything the windows that answered have open, and the ready windows that did not answer */
export type OpenWebViewDefinitionsByReachability = {
  /** Open web view definitions merged from every window that answered */
  definitions: SavedWebViewDefinition[];
  /** Ready windows that failed to answer, so their web views are missing from `definitions` */
  unreachableWindowIds: number[];
};

/**
 * Gather what every window has open, keeping track of the ones that could not be asked.
 *
 * Unlike the other router methods, this fans out rather than routing: callers use it to seed their
 * picture of the whole WebView landscape, so restricting it to the focused window would make every
 * other window's tabs invisible.
 *
 * Exported for the callers that can do something sensible with an incomplete answer — the shutdown
 * sync has one shot at this and no event stream to correct it later, so it syncs what it can find
 * and says plainly that the coverage is partial. Everyone else should use the router's
 * {@link getAllOpenWebViewDefinitions}, which refuses to answer at all rather than pass a partial
 * list off as the whole picture.
 */
export async function getAllOpenWebViewDefinitionsWithReachability(): Promise<OpenWebViewDefinitionsByReachability> {
  const unreachableWindowIds: number[] = [];

  // A tracked window that has not registered its services is not in the list fanned out to below,
  // so nothing else here would ever mention it. Leaving it out entirely makes a window that is
  // alive with a dozen editors in it come back identical to a window that does not exist — and a
  // window drops out of the ready set by crashing or reloading, not only by still starting up.
  const notReadyWindowIds = getNotReadyWindowIds();
  if (notReadyWindowIds.length > 0) {
    logger.warn(
      `Windows ${notReadyWindowIds.join(', ')} have not registered their services, so what they have open could not be read. They are reported as unreachable rather than as having nothing open.`,
    );
    unreachableWindowIds.push(...notReadyWindowIds);
  }

  const definitionsPerWindow = await Promise.all(
    getReadyWindowIds().map(async (windowId) => {
      try {
        const webViewShard = await getWebViewShard(windowId);
        // A ready window whose WebView service has not registered yet is a window that could not be
        // asked. Answering `[]` for it would put it in the result as a window with nothing open,
        // which is the one thing this function exists to keep apart from the truth.
        if (!webViewShard) {
          logger.warn(
            `WebView service for window ${windowId} is not registered, so its open webviews could not be read`,
          );
          unreachableWindowIds.push(windowId);
          return [];
        }
        return await webViewShard.getAllOpenWebViewDefinitions();
      } catch (e) {
        logger.warn(
          `Failed to get open webview definitions from window ${windowId}: ${getErrorMessage(e)}`,
        );
        unreachableWindowIds.push(windowId);
        return [];
      }
    }),
  );
  return { definitions: definitionsPerWindow.flat(), unreachableWindowIds };
}

/**
 * What one specific window has open, rather than the merged picture the router serves.
 *
 * A window is the only thing that knows what it has open, so this is the only way to ask about a
 * window that is on its way out — the merged read asks the windows that can answer, and by the time
 * anything notices a window has gone it is no longer one of them.
 *
 * @param windowId Window to ask. It must still be alive; its scoped service goes with it.
 * @returns Everything that window has open, or an empty list if its renderer never got as far as
 *   registering its services — a window that was never ready never had anything open
 * @throws If the window was serving requests but could not be asked, since "could not ask" is not
 *   "answered none"
 */
export async function getOpenWebViewDefinitionsForWindow(
  windowId: number,
): Promise<SavedWebViewDefinition[]> {
  const webViewShard = await getWebViewShard(windowId);
  if (webViewShard) return webViewShard.getAllOpenWebViewDefinitions();

  // Readiness is what tells the two empty answers apart. A window whose renderer never registered
  // genuinely had nothing open. One that was serving requests a moment ago may have had editors
  // with unsaved work in it, and its own service is the only thing that could have listed them, so
  // the caller has to hear that the question went unanswered rather than that the answer was none.
  if (isWindowReady(windowId))
    throw new Error(
      `WebView service for window ${windowId} is not available, so what it had open could not be read.`,
    );
  return [];
}

/**
 * Every open web view across all windows.
 *
 * A window that fails to answer makes this throw rather than silently shrink the list: callers read
 * it as the complete picture — deciding whether a tab already exists, which project is open — and a
 * window that could not be asked is indistinguishable in the result from one with nothing open. A
 * ready window failing is exceptional, so failing loudly is better than acting on tabs whose
 * existence was never established.
 */
async function getAllOpenWebViewDefinitions(): Promise<SavedWebViewDefinition[]> {
  const { definitions, unreachableWindowIds } =
    await getAllOpenWebViewDefinitionsWithReachability();
  if (unreachableWindowIds.length > 0)
    throw new Error(
      `Could not get open webview definitions: windows ${unreachableWindowIds.join(', ')} were unreachable.`,
    );
  return definitions;
}

/** @deprecated Alias for getOpenWebViewDefinition */
async function getSavedWebViewDefinition(
  webViewId: string,
): Promise<SavedWebViewDefinition | undefined> {
  return getOpenWebViewDefinition(webViewId);
}

/** @deprecated Alias for openWebView */
async function getWebView(
  webViewType: WebViewType,
  layout?: Layout,
  options?: GetWebViewOptions,
): Promise<WebViewId | undefined> {
  return openWebView(webViewType, layout, options);
}

// Network events - these are global (not per-window) because events propagate across all processes
const onDidOpenWebView = getNetworkEvent<OpenWebViewEvent>(EVENT_NAME_ON_DID_OPEN_WEB_VIEW);
const onDidUpdateWebView = getNetworkEvent<UpdateWebViewEvent>(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);
const onDidCloseWebView = getNetworkEvent<CloseWebViewEvent>(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

/**
 * The router object registered under the generic "WebViewService" name. Every method either routes
 * to the window that owns a named web view or asks every window and merges the answers; none of
 * them is a plain forward to the focused window.
 *
 * Declared as the service it claims the name of, so a member added to `WebViewServiceType` cannot
 * silently become a name the router does not answer for.
 */
const webViewServiceRouter: WebViewServiceType = {
  onDidAddWebView: onDidOpenWebView,
  onDidOpenWebView,
  onDidUpdateWebView,
  onDidCloseWebView,
  getWebView,
  openWebView,
  reloadWebView,
  getSavedWebViewDefinition,
  getOpenWebViewDefinition,
  getAllOpenWebViewDefinitions,
  getWebViewController,
};

/**
 * Open a Settings tab limited to the project of the web view a caller named.
 *
 * Owner-routed: opening the settings for a web view in a background window must not open a settings
 * tab in the window the user happens to be looking at, and the owning window is the only one that
 * can read the web view's definition. `findOwner` hands back the definition it already fetched, so
 * the project comes along without a second round trip. A web view no window claims falls back to
 * the focused window with no project — the same thing an id that no longer exists anywhere wants.
 */
async function openSettingsForWebView(webViewId?: WebViewId): Promise<void> {
  // The id is optional on this command, and arguments arrive untyped over the network
  if (typeof webViewId === 'string') {
    const owner = await findOwner(webViewId, 'openSettings');
    if (owner) {
      await owner.shard.openSettingsTab(owner.definition.projectId);
      return;
    }
  }
  await (await getTargetWebViewShard()).openSettingsTab(undefined);
}

/**
 * Open a Settings tab that is not limited to any project, in the window the user is working in.
 *
 * Focus-routed, unlike the two above: this command is declared to take no arguments, so it names no
 * web view and has no owner to route by. It shares its implementation with them and must not share
 * their routing.
 */
async function openUserSettings(): Promise<void> {
  await (await getTargetWebViewShard()).openSettingsTab(undefined);
}

/** The settings command names this router claims */
type SettingsCommandName =
  | 'platform.openSettings'
  | 'platform.openProjectSettings'
  | 'platform.openUserSettings';

/**
 * OpenRPC documentation for the settings commands, which are the names consumers call.
 *
 * Keyed by the exact names rather than by `string`, so a mistyped lookup below is a compile error
 * rather than a registration that publishes no documentation at all.
 */
const SETTINGS_COMMAND_DOCS: Record<SettingsCommandName, SingleMethodDocumentation> = {
  'platform.openSettings': {
    method: {
      summary: 'Open a Settings tab, optionally limited to the project shown in a given web view',
      params: [
        {
          name: 'webViewId',
          required: false,
          summary: 'Web view whose project the Settings tab should be limited to, if any',
          schema: { type: 'string' },
        },
      ],
      result: { name: 'return value', schema: { type: 'null' } },
    },
  },
  'platform.openProjectSettings': {
    method: {
      deprecated: true,
      summary:
        'Open the Settings tab limited to the project shown in the given web view. Renamed to ' +
        'platform.openSettings',
      params: [
        {
          name: 'webViewId',
          required: true,
          summary: 'Web view whose project the Settings tab should be limited to',
          schema: { type: 'string' },
        },
      ],
      result: { name: 'return value', schema: { type: 'null' } },
    },
  },
  'platform.openUserSettings': {
    method: {
      deprecated: true,
      summary:
        'Open the Settings tab without limiting it to any particular project. Renamed to ' +
        'platform.openSettings',
      params: [],
      result: { name: 'return value', schema: { type: 'null' } },
    },
  },
};

/**
 * Register the WebView service router under the generic name so it claims the name before any
 * renderer starts. Must be called during main process startup, before createWindow().
 */
export async function startWebViewServiceRouter(): Promise<void> {
  // Which of these three routes by ownership is decided in this module rather than derived from
  // their parameters, so nothing otherwise keeps the `webViewId` each one documents and the routing
  // it actually gets in agreement.
  assertCommandRoutingMatchesDocs('WebView service router', [
    {
      commandName: 'platform.openSettings',
      docs: SETTINGS_COMMAND_DOCS['platform.openSettings'],
      routing: 'owner',
    },
    {
      commandName: 'platform.openProjectSettings',
      docs: SETTINGS_COMMAND_DOCS['platform.openProjectSettings'],
      routing: 'owner',
    },
    {
      commandName: 'platform.openUserSettings',
      docs: SETTINGS_COMMAND_DOCS['platform.openUserSettings'],
      routing: 'focus',
    },
  ]);

  await networkObjectService.set<WebViewServiceType>(
    NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
    webViewServiceRouter,
    undefined,
    undefined,
    // Experimental at the object level, which fans out over every method. The generic name is not
    // new, but what it now answers with is: several of its methods ask every window and merge, or
    // route by which window owns a named web view, and both of those can now fail in ways a
    // single-window caller never had to handle.
    { 'x-experimental': true },
  );

  await Promise.all([
    registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, 'platform.openSettings'),
      openSettingsForWebView,
      SETTINGS_COMMAND_DOCS['platform.openSettings'],
    ),
    registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, 'platform.openProjectSettings'),
      openSettingsForWebView,
      SETTINGS_COMMAND_DOCS['platform.openProjectSettings'],
    ),
    registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, 'platform.openUserSettings'),
      openUserSettings,
      SETTINGS_COMMAND_DOCS['platform.openUserSettings'],
    ),
  ]);
  logger.info('WebView service router registered');
}
