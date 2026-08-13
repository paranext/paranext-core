/**
 * Service router for the WebView service. Registers under the generic "WebViewService" network
 * object name and routes calls to the focused window's WebView service shard (e.g.
 * "WebViewService-1"). This enables multi-window support by ensuring that operations like
 * openWebView execute in the correct window.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import {
  focusWindow,
  getFocusedWindowId,
  getReadyWindowIds,
  getTargetWindowId,
  getUnreachableWindowIds,
  isWindowReady,
} from '@main/services/window-state.service';
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
import { getNetworkEvent } from '@shared/services/network.service';
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
 * Exported for `command.service-router.ts`, which routes the requests that name a web view to the
 * window that owns it and so has to ask the same shards this router does.
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

/**
 * What a window is asked to look for. An id is answered by one lookup per window; a type needs the
 * window's whole list, which is why the two are distinct rather than one predicate — the id path is
 * on every routed call and must not start shipping every definition.
 */
type OwnerMatcher =
  | { kind: 'id'; webViewId: WebViewId }
  | { kind: 'type'; webViewType: WebViewType };

function describeMatcher(matcher: OwnerMatcher): string {
  return matcher.kind === 'id'
    ? `webview ${matcher.webViewId}`
    : `a ${matcher.webViewType} web view`;
}

/** A window a search settled on, and the shard an operation runs in it through */
type WindowShard = {
  /**
   * The window that answered. Kept alongside the shard because the search already resolved it, and
   * raising that window afterwards is the only way the user sees where a cross-window operation
   * went.
   */
  windowId: number;
  shard: WebViewServiceShard;
};

/** The window that owns a web view, and the definition the ownership search already fetched */
type WebViewOwner = WindowShard & {
  definition: SavedWebViewDefinition;
};

/**
 * Search the windows that can answer for the one that owns a given web view, returning its WebView
 * service shard along with the definition the search fetched — callers that want the definition
 * already have it here, and a second fetch would be another cross-process round trip that can come
 * back with something different.
 *
 * Only ready windows are asked: a window that has not registered its services cannot answer, and
 * asking it stalls the search for the network service's whole registration retry. One that was
 * serving requests until a moment ago still counts as a window that could not be asked — see
 * below.
 *
 * Does not decide what an unresolved owner means. `owner` comes back undefined both when every
 * window answered and none owns it, and when some window could not be asked at all — those two are
 * indistinguishable from in here, since the window that failed may be the one holding it.
 * `hadUnreachableWindows` carries that fact forward so each caller can weigh it against what
 * guessing wrong would cost there.
 */
async function findOwner(
  matcher: OwnerMatcher,
  operation: string,
): Promise<{ owner: WebViewOwner | undefined; hadUnreachableWindows: boolean }> {
  // A tracked window that was serving requests and stopped is skipped by the search below rather
  // than answering it, which makes it a window that could not be asked. Letting the search come
  // back "nobody owns this" while such a window exists would send the operation to the routing
  // target, and the web view it named may be sitting in the window that never got asked.
  //
  // A window whose renderer has not registered anything YET is skipped too, and does not count:
  // nothing has ever been opened in it, so it cannot be holding what this search is looking for.
  // Counting it would fail every search here for the seconds a window takes to start — every
  // `File > New Window`, and the whole of app startup.
  const unreachableWindowIds = getUnreachableWindowIds();
  let hadServiceErrors = unreachableWindowIds.length > 0;
  if (hadServiceErrors)
    logger.warn(
      `Windows ${unreachableWindowIds.join(', ')} stopped serving requests, so they could not be asked about ${describeMatcher(matcher)} for ${operation}`,
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
            `WebView service for window ${windowId} is not registered, so it could not be asked about ${describeMatcher(matcher)} for ${operation}`,
          );
          hadServiceErrors = true;
          return undefined;
        }
        const definition =
          matcher.kind === 'id'
            ? await webViewShard.getOpenWebViewDefinition(matcher.webViewId)
            : (await webViewShard.getAllOpenWebViewDefinitions()).find(
                (candidate) => candidate.webViewType === matcher.webViewType,
              );
        if (definition) return { windowId, shard: webViewShard, definition };
        return undefined;
      } catch (e) {
        logger.warn(
          `Failed to query ${describeMatcher(matcher)} in window ${windowId} for ${operation}: ${getErrorMessage(e)}`,
        );
        hadServiceErrors = true;
        return undefined;
      }
    }),
  );
  // Ready-window order is creation order, so picking the first match would prefer a window opened
  // earlier over the one this call is already headed for. Collecting candidates in parallel above
  // does not reintroduce that nondeterminism: selection below only starts once every window has
  // answered, so whichever one replies fastest cannot change which owner comes out — only window id
  // and the routing target decide that.
  const matches = owners.filter((candidate) => candidate !== undefined);
  const targetWindowId = getTargetWindowId();
  const owner =
    matches.find((candidate) => candidate.windowId === targetWindowId) ??
    matches.sort((a, b) => a.windowId - b.windowId)[0];
  // Both matchers mean "the one in the app", and they differ in what backs that up rather than in
  // what they intend. For an `id` matcher it is enforced: `withWindowScopedWebViewIds` suffixes
  // every id with its window at creation, so two windows answering the same id search means that
  // scoping was bypassed somehow — worth alarming a log reader over. `existingId: '?'` says the
  // same thing about a TYPE: callers reach for it precisely for the views the app means to have one
  // of app-wide. Nothing enforces that one — simple mode loads the same static layout into every
  // window with no per-window scoping — so a second copy is a state the app can be observed in, not
  // one it intends. Reported at debug for that reason: it says which copy was picked without
  // claiming something is broken.
  if (matches.length > 1) {
    if (matcher.kind === 'id')
      logger.warn(
        `Webview ${matcher.webViewId} was found open in more than one window (${matches.map((match) => match.windowId).join(', ')}); web view ids are meant to be unique across the app. Using the one in window ${owner.windowId}.`,
      );
    else
      logger.debug(
        `Found ${matches.length} open '${matcher.webViewType}' web views (${matches.map((match) => match.definition.id).join(', ')}); using the one in window ${owner.windowId}.`,
      );
  }
  return { owner, hadUnreachableWindows: hadServiceErrors };
}

/**
 * The tab or tab group a layout says to open next to, over or inside, which names the window that
 * tab or tab group is in.
 *
 * A `tab` layout's `parentTabGroupId` names one as surely as the other layouts' `targetTabId` does.
 * The dock's "+" button passes the tab group it sits in through a command, so by the time that open
 * arrives here it has been round the extension host and which window it belongs in is a question
 * only the tab group id can answer.
 *
 * Tab-group ids are not app-unique: rc-dock mints them from a module-level counter (`nextId()` in
 * `Algorithm.js`) that every renderer starts at zero and increments independently, so several
 * windows routinely hold the same one. Routing by it can therefore only ever prefer the right
 * window, never identify it, which is why callers treat the routing target as load-bearing here
 * rather than as a tie-break.
 */
function getLayoutTargetTabId(layout?: Layout): string | undefined {
  if (layout?.type === 'panel' || layout?.type === 'replace-tab') return layout.targetTabId;
  if (layout?.type === 'tab') return layout.parentTabGroupId;
  return undefined;
}

/**
 * The window whose dock holds the tab or tab group a layout points at, or nothing if no window that
 * could answer holds it.
 *
 * Asks each window what its dock holds rather than which window owns a web view with that id. A
 * layout can name a tab that is no web view — a settings tab, a dialog — and a tab group id is not
 * a web view id at all, so an ownership lookup answers "nobody" for both and the open lands
 * wherever the user happens to be instead of where it was aimed.
 *
 * A window that could not be asked does NOT fail the open here, which is the one way this differs
 * from the `existingId` search. Guessing wrong there costs a second copy of a web view meant to be
 * unique; guessing wrong here costs only placement — the tab still opens, in the window the user is
 * in, beside whatever is already there. Failing instead would mean that for as long as ANY window
 * cannot answer — a second window still starting, or one whose renderer crashed and never
 * re-registered — every open naming a tab produces nothing at all.
 */
async function findLayoutTargetOwner(targetTabId: string): Promise<WindowShard | undefined> {
  // Every window that could not be asked is warned about and then treated as one that does not hold
  // the target — see the doc comment above for why that is the right call for a layout target
  // specifically. A window whose renderer has not registered anything yet is not even worth the
  // warning: its dock holds nothing, so it is a window with a real answer rather than one that
  // could not be asked.
  const unreachableWindowIds = getUnreachableWindowIds();
  if (unreachableWindowIds.length > 0)
    logger.warn(
      `Windows ${unreachableWindowIds.join(', ')} stopped serving requests, so they could not be asked whether they hold '${targetTabId}' for openWebView beside a layout target`,
    );
  const holders = await Promise.all(
    getReadyWindowIds().map(async (windowId) => {
      try {
        const webViewShard = await getWebViewShard(windowId);
        if (!webViewShard) {
          logger.warn(
            `WebView service for window ${windowId} is not registered, so it could not be asked whether it holds '${targetTabId}' for openWebView beside a layout target`,
          );
          return undefined;
        }
        return (await webViewShard.dockContainsTab(targetTabId))
          ? { windowId, shard: webViewShard }
          : undefined;
      } catch (e) {
        logger.warn(
          `Failed to ask window ${windowId} whether it holds '${targetTabId}' for openWebView beside a layout target: ${getErrorMessage(e)}`,
        );
        return undefined;
      }
    }),
  );
  const holdingWindows = holders.filter((candidate) => candidate !== undefined);
  // Tab group ids are minted per window, so several windows routinely hold the same one, and which
  // window this call is already headed for is what tells those apart — a "+" click in a later
  // window would otherwise land in an unrelated tab group in the first one. Window id order decides
  // the rest so that a target held by neither the routing target nor a single window still goes
  // somewhere predictable rather than wherever answered first.
  const targetWindowId = getTargetWindowId();
  return (
    holdingWindows.find((candidate) => candidate.windowId === targetWindowId) ??
    holdingWindows.sort((a, b) => a.windowId - b.windowId)[0]
  );
}

/**
 * Run an open in the window that owns the tab it was routed by, and raise that window.
 *
 * Raising is deliberately narrow.
 *
 * It happens only when the shard resolved an id. A web view it found already open resolves to that
 * existing id here, the same as one it just created — both reached the window and are meant to
 * raise it; only a shard that resolved nothing (no match, and the caller declined to create one)
 * skips raising, since there is then no tab there to show.
 *
 * It happens only when the owning window is not the one the call was already going to, since the
 * tab is appearing in front of the user there anyway and taking OS focus would interrupt whatever
 * else they are doing to show it to them.
 *
 * It happens only while this app holds focus, so this can move focus BETWEEN this app's windows but
 * never take it from another application. An open routed here need not be something the user just
 * asked for — an extension can re-open a web view by id at any moment — and pulling the app in
 * front of whatever they are working in would be the wrong answer to every one of those.
 *
 * It happens only when the caller did not opt out with `bringToFront: false` — see the comment
 * below.
 */
async function openWebViewInOwningWindow(
  owner: WindowShard,
  webViewType: WebViewType,
  layout?: Layout,
  options?: OpenWebViewOptions,
): Promise<WebViewId | undefined> {
  const openedWebViewId = await owner.shard.openWebView(webViewType, layout, options);
  const isCrossWindow = owner.windowId !== getTargetWindowId();
  // A caller who opted out of bringToFront is opting out at the window level too: the shard already
  // honours this for the tab it raises inside its own window, and an OS-level raise the caller did
  // not ask for is the louder half of the same action. Skipping it here is what keeps a passive
  // probe from pulling a window to the front every time it runs.
  if (
    openedWebViewId &&
    isCrossWindow &&
    getFocusedWindowId() !== undefined &&
    options?.bringToFront !== false
  )
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
    const matcher: OwnerMatcher =
      options.existingId === '?'
        ? { kind: 'type', webViewType }
        : { kind: 'id', webViewId: options.existingId };
    const { owner, hadUnreachableWindows } = await findOwner(matcher, 'openWebView');
    if (owner) return openWebViewInOwningWindow(owner, webViewType, layout, options);
    // "Could not ask" is not "answered no" — but what to do about that depends on which question
    // went unanswered, because the two matchers fail in opposite directions.
    //
    // A named id is one specific web view somewhere in the app. Opening blind is what mints a second
    // copy of a view meant to be unique, and the caller asked for THAT one, so the path that would
    // create refuses to guess; a caller that creates nothing is told nothing was found, which is
    // true and costs it nothing.
    if (hadUnreachableWindows && matcher.kind === 'id') {
      if (options.createNewIfNotFound !== false)
        throw new Error(
          `Could not openWebView ${describeMatcher(matcher)}: some windows were unreachable.`,
        );
      return undefined;
    }
    // A `?` search names a type, and every caller of it is an entry point the user just clicked —
    // Open Comments, Get Resources, Find. Refusing there means the click does nothing at all for as
    // long as one window is unreachable, which for a crashed renderer is the rest of the session.
    // Guessing wrong costs a second copy of the view, in the window the user is looking at, where
    // they can see and close it. Falling through to open where the user is beats not opening.
  }

  // A layout naming a tab or tab group names the window that holds it, so it routes the same way an
  // existingId does — and after it, because a window shard that finds the existing web view raises it and
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
  const matcher: OwnerMatcher = { kind: 'id', webViewId };
  const { owner, hadUnreachableWindows } = await findOwner(matcher, 'reload');
  if (owner) return owner.shard.reloadWebView(webViewType, webViewId, options);
  // A reload always targets a specific existing web view, so a window that could not be asked may
  // be the one holding it — falling back here risks reloading whatever the focused window happens
  // to be showing instead of the web view that was named.
  if (hadUnreachableWindows)
    throw new Error(`Could not reload ${describeMatcher(matcher)}: some windows were unreachable.`);

  // Webview not found in any window — fall back to focused window (may be a new webview)
  const webViewShard = await getTargetWebViewShard();
  return webViewShard.reloadWebView(webViewType, webViewId, options);
}

async function getOpenWebViewDefinition(
  webViewId: string,
): Promise<SavedWebViewDefinition | undefined> {
  const matcher: OwnerMatcher = { kind: 'id', webViewId };
  const { owner, hadUnreachableWindows } = await findOwner(matcher, 'getOpenWebViewDefinition');
  if (owner) return owner.definition;
  // A window that could not be asked may be the one holding this web view, so an unresolved owner
  // is not evidence it does not exist.
  if (hadUnreachableWindows)
    throw new Error(
      `Could not getOpenWebViewDefinition ${describeMatcher(matcher)}: some windows were unreachable.`,
    );
  return undefined;
}

/** Everything the windows that answered have open, and the windows that should have but did not */
export type OpenWebViewDefinitionsByReachability = {
  /** Open web view definitions merged from every window that answered */
  definitions: SavedWebViewDefinition[];
  /**
   * Windows that were serving requests but failed to answer, so their web views are missing from
   * `definitions`. A window whose renderer has never registered anything is not in here — it has
   * nothing open, which `definitions` already says.
   */
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

  // A tracked window that is not ready is not in the list fanned out to below, so nothing else here
  // would ever mention it. For a window that was serving requests and stopped — a crashed renderer,
  // a page being replaced — leaving it out entirely makes a window that is alive with a dozen
  // editors in it come back identical to a window that does not exist, so it is reported instead.
  // A window whose renderer has not registered anything yet reports nothing because it has nothing:
  // an empty answer for it is the truth, not a gap.
  const windowIdsThatStoppedServing = getUnreachableWindowIds();
  if (windowIdsThatStoppedServing.length > 0) {
    logger.warn(
      `Windows ${windowIdsThatStoppedServing.join(', ')} stopped serving requests, so what they have open could not be read. They are reported as unreachable rather than as having nothing open.`,
    );
    unreachableWindowIds.push(...windowIdsThatStoppedServing);
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
 * Register the WebView service router under the generic name so it claims the name before any
 * renderer starts. Must be called during main process startup, before createWindow().
 */
export async function startWebViewServiceRouter(): Promise<void> {
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
  logger.info('WebView service router registered');
}
