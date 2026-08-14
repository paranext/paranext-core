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
  getAbandonedWindowIds,
  getReadyWindowIds,
  getTargetWindowId,
  getUnreachableWindowIds,
  isApplicationFocused,
  isWindowClosing,
  isWindowReady,
} from '@main/services/window-state.service';
import { assertCommandRoutingMatchesDocs } from '@main/services/owner-routed-command.util';
import { clearWindowPendingContent } from '@main/services/window-layout-persistence.service';
import {
  createTargetShardResolver,
  resolveShardForWindow,
} from '@main/services/target-shard-resolver.util';
import {
  GetWebViewOptions,
  OpenWebViewOptions,
  ReloadWebViewOptions,
  SavedWebViewDefinition,
  WebViewId,
  WebViewType,
} from '@shared/models/web-view.model';
import {
  describeWebViewMoveFailure,
  WebViewMoveFailureDisposition,
} from '@shared/models/web-view-move.model';
import { Layout } from '@shared/models/docking-framework.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, wait } from 'platform-bible-utils';
import { networkObjectService } from '@shared/services/network-object.service';
import { createServiceShardIndex } from '@main/services/service-shard-index';
import { WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import { WebViewServiceShard } from '@shared/models/web-view.service-shard.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { CATEGORY_COMMAND, isRequestTimedOutError } from '@shared/data/rpc.model';
import { getNetworkEvent, registerRequestHandler } from '@shared/services/network.service';
import { serializeRequestType } from '@shared/utils/util';
import { settingsService } from '@shared/services/settings.service';
import { SettingTypes } from 'papi-shared-types';
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

/**
 * What a window is asked to look for. An id is answered by one lookup per window; a type needs the
 * window's whole list, which is why the two are distinct rather than one predicate — the id path is
 * on every routed call and must not start shipping every definition.
 */
type OwnerMatcher =
  | { kind: 'id'; webViewId: WebViewId }
  | {
      kind: 'type';
      webViewType: WebViewType;
      /**
       * Narrows the search to web views showing this project. Left out, a type matches whatever
       * project it is showing.
       */
      projectId?: string;
    };

function describeMatcher(matcher: OwnerMatcher): string {
  if (matcher.kind === 'id') return `webview ${matcher.webViewId}`;
  return matcher.projectId === undefined
    ? `a ${matcher.webViewType} web view`
    : `a ${matcher.webViewType} web view showing project ${matcher.projectId}`;
}

/** A web view a move has taken out of one window and not yet put into another */
type WebViewMoveInFlight = {
  /** Ids the view answers to for the length of the move: the one named, and the captured one */
  webViewIds: WebViewId[];
  webViewType: WebViewType;
  /** Project the captured view was showing, if any */
  projectId?: string;
};

/**
 * Moves that have closed a web view in its source window and not yet opened it in its target.
 *
 * For that gap the web view is open in no window at all, so every window answers an ownership
 * search truthfully and the search still comes back wrong: the view exists, and a caller that
 * creates on a miss mints a second copy of one the app means to have exactly one of.
 *
 * Deliberately nothing to wait on. A search that lands in the gap is told the question could not be
 * answered right now — which is what {@link findOwner}'s `hadUnreachableWindows` already means — so
 * every caller keeps the weighing it already applies to that: a passive probe answers not-found,
 * and a caller that creates opens where the user is rather than refuse for the length of a move.
 */
const webViewMovesInFlight = new Set<WebViewMoveInFlight>();

/** Whether a move in flight is holding the web view a search is looking for */
function isMatchedByMoveInFlight(matcher: OwnerMatcher): boolean {
  return [...webViewMovesInFlight].some((move) =>
    matcher.kind === 'id'
      ? move.webViewIds.includes(matcher.webViewId)
      : move.webViewType === matcher.webViewType &&
        (matcher.projectId === undefined || move.projectId === matcher.projectId),
  );
}

/**
 * The main-process window facilities the window-layout rung needs. Injected by `main.ts` after it
 * defines its window-creating closure — this router starts before that closure exists.
 */
export type WebViewWindowCreator = {
  /** Create a window that starts truly empty and waits for routed content. Answers its window id */
  createPendingContentWindow: () => Promise<number>;
  /** Close a window this router created whose content never arrived */
  closeWindow: (windowId: number) => void;
};

let windowCreator: WebViewWindowCreator | undefined;

/** Wire the window facilities the window-layout rung uses. See {@link WebViewWindowCreator} */
export function setWebViewWindowCreator(creator: WebViewWindowCreator): void {
  windowCreator = creator;
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
                (candidate) =>
                  candidate.webViewType === matcher.webViewType &&
                  (matcher.projectId === undefined || candidate.projectId === matcher.projectId),
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
  // Asked only once nothing was found: a window that holds the view settles the search, and a move
  // registered for a view some window still holds has not reached its capture yet.
  if (!owner && isMatchedByMoveInFlight(matcher)) {
    logger.warn(
      `${describeMatcher(matcher)} is between windows on a move, so no window holds it right now; ${operation} is told the question could not be answered rather than that nothing has it`,
    );
    hadServiceErrors = true;
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
 * wherever the user happens to be instead of where it was aimed. That is why every layout target,
 * `replace-tab` included, is resolved here: the strict ownership search is blind to those targets
 * by construction, so its "nobody" says nothing about whether the target exists.
 *
 * Like {@link findOwner}, this does not decide what an unresolved target means —
 * `hadUnreachableWindows` carries that forward, and the two layout kinds weigh it differently. For
 * a `panel` or `tab` layout, guessing wrong costs only placement: the tab still opens, in the
 * window the user is in. For `replace-tab`, replacing IS the operation, and a window that guessed
 * wrong throws only after the web view provider has run and its side effects (controller, nonce,
 * state) exist — so that caller refuses rather than guess. Either way a window that positively
 * holds the target settles the question, and another window failing to answer cannot make that
 * answer wrong.
 */
async function findLayoutTargetOwner(
  targetTabId: string,
): Promise<{ owner: WindowShard | undefined; hadUnreachableWindows: boolean }> {
  // A window whose renderer has not registered anything yet is not worth a warning and does not
  // count as unreachable: its dock holds nothing, so it is a window with a real answer rather than
  // one that could not be asked.
  const unreachableWindowIds = getUnreachableWindowIds();
  let hadServiceErrors = unreachableWindowIds.length > 0;
  if (hadServiceErrors)
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
          hadServiceErrors = true;
          return undefined;
        }
        return (await webViewShard.dockContainsTab(targetTabId))
          ? { windowId, shard: webViewShard }
          : undefined;
      } catch (e) {
        logger.warn(
          `Failed to ask window ${windowId} whether it holds '${targetTabId}' for openWebView beside a layout target: ${getErrorMessage(e)}`,
        );
        hadServiceErrors = true;
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
  const owner =
    holdingWindows.find((candidate) => candidate.windowId === targetWindowId) ??
    holdingWindows.sort((a, b) => a.windowId - b.windowId)[0];
  return { owner, hadUnreachableWindows: hadServiceErrors };
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
  // Read again here, at the last moment before the window is asked to do the work. Finding this
  // window meant asking every window in the app, which takes as long as the slowest of them — long
  // enough for this one's close to have been decided since any earlier read, including the one the
  // caller's own rung took.
  if (isWindowClosing(owner.windowId))
    throw new Error(
      `Cannot open ${webViewType} in window ${owner.windowId}: that window is closing.`,
    );
  const openedWebViewId = await owner.shard.openWebView(webViewType, layout, options);
  const isCrossWindow = owner.windowId !== getTargetWindowId();
  // A caller who opted out of bringToFront is opting out at the window level too: the shard already
  // honours this for the tab it raises inside its own window, and an OS-level raise the caller did
  // not ask for is the louder half of the same action. Skipping it here is what keeps a passive
  // probe from pulling a window to the front every time it runs.
  if (openedWebViewId && isCrossWindow && isApplicationFocused() && options?.bringToFront !== false)
    focusWindow(owner.windowId);
  return openedWebViewId;
}

/**
 * Create a pending-content window, run an open against its shard, and never leak the window: any
 * failure — and a provider decline — closes it again, since a window whose content never arrived is
 * an empty shell the user never asked to manage. On success the pending-content mark comes off, so
 * a reload before the first layout push restores as an ordinary (empty) window instead of waiting
 * forever for content that already arrived.
 */
async function openInFreshWindow(
  webViewDescription: string,
  open: (shard: WebViewServiceShard) => Promise<WebViewId | undefined>,
): Promise<WebViewId | undefined> {
  if (!windowCreator)
    throw new Error(
      `Cannot open ${webViewDescription} in a new window: window creation is not wired up`,
    );
  const creator = windowCreator;
  const windowId = await creator.createPendingContentWindow();

  // Closes the window this call created, at most once, and never lets a failure to close replace
  // the reason the window is being closed in the first place — a window that fails to close is a
  // leak to warn about, not grounds to hide why the open itself did not succeed.
  //
  // Asks the window first whether anything reached it in the meantime: an open whose request timed
  // out can still have landed afterwards, and this window is the only place that knows. Every other
  // outcome closes, including one where the question itself could not be answered — a
  // pending-content window kept by mistake never reports itself born-empty and never docks Home, so
  // it stands there blank with nothing to heal it, which is worse than closing one window too many.
  const closeAbandonedWindow = async () => {
    try {
      const shard = await webViewShards.getShard(windowId);
      if (await shard?.hasContentArrivedSinceEmptyReport()) {
        logger.warn(
          `Window ${windowId}'s new-window open did not succeed, but content reached the window anyway; leaving it open.`,
        );
        // It is holding content, so it is a window routed work can go to — and it must stop
        // restoring as a window still waiting for content that has already arrived. Changing the
        // mark announces the routing-target change itself, so nothing else has to.
        clearWindowPendingContent(windowId);
        return;
      }
    } catch (recheckError) {
      logger.warn(
        `Could not ask window ${windowId} whether content reached it before closing it: ${getErrorMessage(recheckError)}`,
      );
    }
    try {
      creator.closeWindow(windowId);
    } catch (closeError) {
      logger.warn(
        `Could not close window ${windowId} after its new-window open did not succeed: ${getErrorMessage(closeError)}`,
      );
    }
  };

  let openedWebViewId: WebViewId | undefined;
  try {
    const shard = await resolveShardForWindow(
      NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
      webViewShards,
      windowId,
    );
    openedWebViewId = await open(shard);
  } catch (e) {
    await closeAbandonedWindow();
    throw e;
  }

  if (openedWebViewId === undefined) {
    // The provider chose not to create the web view — the established "it did not happen"
    // answer. The window it would have lived in has no reason to exist, and a decline never docked
    // anything, so the re-check inside cannot mistake this open's own content for an interloper.
    await closeAbandonedWindow();
  } else {
    // The routed content is in the window now. Un-mark it, so a reload before its first layout
    // push restores as an ordinary (empty) window instead of waiting forever for content that
    // already arrived.
    clearWindowPendingContent(windowId);
  }
  return openedWebViewId;
}

/**
 * Open a web view in a window created for it. In Simple mode — single-window by design — the window
 * layout degrades to a tab in the window the user is working in; the platform owns placement there.
 * The mode read fails closed to the degraded path, matching how window restore treats an unreadable
 * mode.
 *
 * Any failure after the window exists closes it again: a window whose content never arrived is an
 * empty shell the user never asked to manage.
 */
async function openWebViewInNewWindow(
  webViewType: WebViewType,
  options?: OpenWebViewOptions,
): Promise<WebViewId | undefined> {
  let interfaceMode: SettingTypes['platform.interfaceMode'] | undefined;
  try {
    interfaceMode = await settingsService.get('platform.interfaceMode');
  } catch (e) {
    logger.warn(
      `Could not read platform.interfaceMode for a window-layout open; opening as a tab instead: ${getErrorMessage(e)}`,
    );
  }
  if (interfaceMode !== 'power') {
    const webViewShard = await getTargetWebViewShard();
    return webViewShard.openWebView(webViewType, { type: 'tab' }, options);
  }

  return openInFreshWindow(webViewType, (shard) =>
    shard.openWebView(webViewType, { type: 'tab' }, options),
  );
}

/** Where a move sends a web view: an existing window's id, or `'new'` for a window created for it */
type MoveWebViewTarget = number | 'new';

/** How many times {@link findWebViewAdoptedAfterTimeout} asks the target whether the adopt landed */
const LATE_ADOPT_PROBE_ATTEMPTS = 3;

/** How long {@link findWebViewAdoptedAfterTimeout} waits between attempts */
const LATE_ADOPT_PROBE_RETRY_DELAY_MS = 2_000;

/**
 * Whether a move's target holds the web view whose adopt call timed out — asked before any
 * recovery, because a timed-out adopt is ambiguous where every other failure is not: the request
 * expired client-side, but the target may still be running it (a provider can legitimately take
 * longer than the request timeout), and reopening the captured definition elsewhere while the
 * target finishes would put the same web view id live in two windows, where messages for it become
 * unroutable.
 *
 * Bounded to a few attempts a couple of seconds apart: a target that never answers must not stall
 * the recovery the user is waiting on forever. A provider still slower than these attempts ends in
 * recovery anyway and the collision window comes back — that residual is accepted over an unbounded
 * wait.
 *
 * @param webViewId The id the target would hold the web view under — the captured definition's id,
 *   which the capture already stripped of its source window's scope
 * @returns The id the web view is open under in the target, or undefined when the probe confirmed
 *   absence or could not ask
 */
async function findWebViewAdoptedAfterTimeout(
  targetShard: WebViewServiceShard,
  webViewId: WebViewId,
  targetDescription: string,
): Promise<WebViewId | undefined> {
  for (let attempt = 1; attempt <= LATE_ADOPT_PROBE_ATTEMPTS; attempt += 1) {
    try {
      // Sequential attempts: each one must settle before the next may start
      // eslint-disable-next-line no-await-in-loop
      const definition = await targetShard.getOpenWebViewDefinition(webViewId);
      if (definition) {
        logger.info(
          `Webview ${webViewId}'s adopt into ${targetDescription} timed out but landed anyway; probe attempt ${attempt} of ${LATE_ADOPT_PROBE_ATTEMPTS} found it open as ${definition.id}`,
        );
        return definition.id;
      }
      logger.debug(
        `Webview ${webViewId}'s timed-out adopt has not landed in ${targetDescription} (probe attempt ${attempt} of ${LATE_ADOPT_PROBE_ATTEMPTS})`,
      );
    } catch (e) {
      logger.warn(
        `Could not ask ${targetDescription} whether webview ${webViewId}'s timed-out adopt landed (probe attempt ${attempt} of ${LATE_ADOPT_PROBE_ATTEMPTS}): ${getErrorMessage(e)}`,
      );
    }
    if (attempt < LATE_ADOPT_PROBE_ATTEMPTS)
      // Sequential attempts (see above)
      // eslint-disable-next-line no-await-in-loop
      await wait(LATE_ADOPT_PROBE_RETRY_DELAY_MS);
  }
  return undefined;
}

/**
 * Raise the window a completed move put the web view in. Raising is how the user sees where the web
 * view went — same narrow rule as cross-window opens: only between this app's windows, never taking
 * focus from another application. A new window raises itself when it is created.
 */
function raiseMoveTarget(target: MoveWebViewTarget): void {
  if (typeof target === 'number' && isApplicationFocused()) focusWindow(target);
}

/**
 * Move a web view: close it in the window that holds it, reopen it from the captured definition in
 * the target. Close-source-first is load-bearing — a one-instance web view cannot be opened in the
 * target while the source instance is alive, because reuse logic would find and raise the source
 * instead.
 *
 * @returns Authoritative id of the web view in its new window. Can differ from the id passed in: a
 *   web view restored from a persisted layout carries a window-scoped id, and the capture strips
 *   that scope rather than carry one window's scope into another — callers use the returned id for
 *   anything after the move
 * @throws If no window holds the web view, if the target window does not exist or is closing, or if
 *   the target open failed — the error says where the web view ended up (see
 *   {@link recoverAfterFailedMove})
 */
async function moveWebView(webViewId: WebViewId, target: MoveWebViewTarget): Promise<WebViewId> {
  const matcher: OwnerMatcher = { kind: 'id', webViewId };
  const { owner, hadUnreachableWindows } = await findOwner(matcher, 'move');
  // A move always names an existing web view, so a window that could not be asked may be the one
  // holding it. Reading that as "nobody has it" would fail the move for the wrong reason, and the
  // caller could not tell a view that is not open from one in a window that never answered.
  if (!owner && hadUnreachableWindows)
    throw new Error(`Could not move ${describeMatcher(matcher)}: some windows were unreachable.`);
  if (!owner) throw new Error(`Cannot move webview ${webViewId}: no window has it open.`);

  const targetDescription = target === 'new' ? 'a new window' : `window ${target}`;

  let targetShard: WebViewServiceShard | undefined;
  if (target === 'new') {
    // Same read as opening into a new window, but not the same degrade. In Simple mode —
    // single-window by design — there is no other window to move to, and the view already is a
    // tab in the only window there is, so there is nothing to do. A mode that could not be READ is
    // not that answer: resolving as though it were reports a move that did not happen, and the
    // caller has nothing to tell it apart from one that did — the tab-title notification driven by
    // this result would tell the user their web view is in a new window while it sits where it was.
    let interfaceMode: SettingTypes['platform.interfaceMode'];
    try {
      interfaceMode = await settingsService.get('platform.interfaceMode');
    } catch (e) {
      throw new Error(
        `Cannot move webview ${webViewId} to a new window: the interface mode could not be read (${getErrorMessage(e)}).`,
      );
    }
    if (interfaceMode !== 'power') return webViewId;
    // Checked before anything closes, even though openInFreshWindow checks again: failing after
    // the capture would put the view through a needless close and recovery
    if (!windowCreator)
      throw new Error(`Cannot move webview ${webViewId}: window creation is not wired up`);
  } else {
    // The web view is already there; closing and reopening it would be churn for nothing
    if (target === owner.windowId) return webViewId;
    // A window whose close has been decided is a stale target the caller cannot know about:
    // adopting into it would report success and then lose the view when the close lands
    if (isWindowClosing(target))
      throw new Error(
        `Cannot move webview ${webViewId} to window ${target}: that window is closing.`,
      );
    // Resolved before anything closes: an unknown target must fail the move with the web view
    // untouched
    targetShard = await resolveShardForWindow(
      NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
      webViewShards,
      target,
    );
  }

  let captured: SavedWebViewDefinition | undefined;
  try {
    captured = await owner.shard.captureAndCloseWebView(webViewId);
  } catch (e) {
    // A cross-process capture that fails may have closed the tab without delivering the capture.
    // There is no captured definition to recover from — and blindly reopening from the owner
    // search's definition could duplicate a view whose tab never closed — so log that definition
    // (enough to reconstruct the web view by hand) and surface the move context the raw shard
    // error lacks
    logger.error(
      `Capturing webview ${webViewId} for a move to ${targetDescription} failed; window ${owner.windowId} may or may not still have it. Definition from the owner search: ${JSON.stringify(owner.definition)}`,
    );
    throw new Error(
      `Could not move webview ${webViewId} to ${targetDescription}: capturing it failed (${getErrorMessage(e)}). Its definition from before the move is in the log.`,
    );
  }
  if (!captured)
    throw new Error(
      `Cannot move webview ${webViewId}: window ${owner.windowId} no longer had it when the move tried to capture it.`,
    );

  // From here the web view is open in NO window until the target takes it, or until recovery
  // puts it back — see `webViewMovesInFlight`, which is what keeps a search landing in that gap
  // from being told the view does not exist.
  const moveInFlight: WebViewMoveInFlight = {
    webViewIds: [webViewId, captured.id],
    webViewType: captured.webViewType,
    projectId: captured.projectId,
  };
  webViewMovesInFlight.add(moveInFlight);
  try {
    try {
      // Read again at the last moment: the capture above closed the source tab, and everything
      // between the target check at the top of this move and here has been cross-process work the
      // target's close could have been decided during. Throwing hands the web view to the recovery
      // below rather than into a window that is about to take it away.
      if (typeof target === 'number' && isWindowClosing(target))
        throw new Error(`window ${target}'s close was decided while the move was in flight`);
      const movedWebViewId =
        targetShard !== undefined
          ? await targetShard.adoptWebView(captured)
          : await openInFreshWindow(webViewId, (shard) => shard.adoptWebView(captured));
      if (movedWebViewId !== undefined) {
        raiseMoveTarget(target);
        return movedWebViewId;
      }
      logger.warn(
        `Moving webview ${webViewId} to ${targetDescription} did not happen: the provider did not recreate it there. Reopening it where it can go.`,
      );
    } catch (e) {
      // A timed-out adopt may have succeeded after its request expired, and only the window that
      // ran it knows — see findWebViewAdoptedAfterTimeout. Only a move into an existing window has
      // a window to ask: the new-window path creates its window inside the attempt above, so a
      // failure there arrives here with no shard to put the question to.
      if (targetShard !== undefined && isRequestTimedOutError(e)) {
        const lateAdoptedWebViewId = await findWebViewAdoptedAfterTimeout(
          targetShard,
          captured.id,
          targetDescription,
        );
        if (lateAdoptedWebViewId !== undefined) {
          raiseMoveTarget(target);
          return lateAdoptedWebViewId;
        }
      }
      logger.warn(
        `Moving webview ${webViewId} to ${targetDescription} failed: ${getErrorMessage(e)}. Reopening it where it can go.`,
      );
    }

    return await recoverAfterFailedMove(webViewId, owner, captured, targetDescription);
  } finally {
    webViewMovesInFlight.delete(moveInFlight);
  }
}

/**
 * Reopen a captured web view in one window, answering whether it is now open there.
 *
 * A timed-out readopt is asked about rather than given up on, exactly as the move's own adopt is —
 * see {@link findWebViewAdoptedAfterTimeout}. The recovery ladder walks on to the next window when a
 * rung answers no, so reading a timeout as a no is what would put this web view id live in two
 * windows, where messages for it become unroutable.
 *
 * @param webViewId The id the caller named, for the log; `captured.id` is what a landed readopt is
 *   found under
 */
async function readoptAfterFailedMove(
  shard: WebViewServiceShard,
  webViewId: WebViewId,
  captured: SavedWebViewDefinition,
  destinationDescription: string,
): Promise<boolean> {
  try {
    if ((await shard.adoptWebView(captured)) !== undefined) return true;
  } catch (e) {
    if (
      isRequestTimedOutError(e) &&
      (await findWebViewAdoptedAfterTimeout(shard, captured.id, destinationDescription)) !==
        undefined
    )
      return true;
    logger.warn(
      `Could not reopen webview ${webViewId} in ${destinationDescription}: ${getErrorMessage(e)}`,
    );
  }
  return false;
}

/**
 * Reopen a web view whose move could not open it in its target, escalating until something takes
 * it: the source window — unless its close has begun, which a move that emptied it will have made
 * true — then the focused window. Always rejects: wherever the web view ended up, the move the
 * caller asked for did not happen, and the error says where it is.
 *
 * Where it is rides on the error as a {@link WebViewMoveFailureDisposition} and not only in its
 * prose. These three outcomes are as far apart as "nothing changed" and "the web view is open
 * nowhere at all", and a caller reporting a failed move to the user has to tell them apart without
 * reading a sentence written for the log.
 */
async function recoverAfterFailedMove(
  webViewId: WebViewId,
  owner: WebViewOwner,
  captured: SavedWebViewDefinition,
  targetDescription: string,
): Promise<never> {
  logger.debug(
    `Reopening webview ${webViewId} after its failed move to ${targetDescription}. Captured definition: ${JSON.stringify(captured)}`,
  );
  /** The window that took the web view back: how to name it, and how a caller must read that */
  let reopenedIn: { description: string; disposition: WebViewMoveFailureDisposition } | undefined;
  if (!isWindowClosing(owner.windowId)) {
    const sourceDescription = `window ${owner.windowId}, where it came from`;
    if (await readoptAfterFailedMove(owner.shard, webViewId, captured, sourceDescription)) {
      // Read again, because capturing out of this window is what emptied it: its close can be
      // decided while the readopt is in flight, and a web view in a window that is closing is not
      // recovered — it is about to be lost with it. The next rung reopens it somewhere that will
      // still be there, which duplicates it for as long as the closing window takes to go.
      if (isWindowClosing(owner.windowId))
        logger.warn(
          `Webview ${webViewId} was reopened in window ${owner.windowId}, but that window's close was decided in the meantime; reopening it somewhere else as well.`,
        );
      else
        reopenedIn = { description: sourceDescription, disposition: 'reopened-in-source-window' };
    }
  }
  if (reopenedIn === undefined) {
    try {
      const focusedShard = await getTargetWebViewShard();
      if (await readoptAfterFailedMove(focusedShard, webViewId, captured, 'the focused window'))
        reopenedIn = {
          description: 'the focused window',
          disposition: 'reopened-in-focused-window',
        };
    } catch (e) {
      logger.warn(
        `Could not reopen webview ${webViewId} in the focused window: ${getErrorMessage(e)}`,
      );
    }
  }
  if (reopenedIn === undefined) {
    // Last resort short of silent loss: the definition in the log is enough to reconstruct the
    // web view by hand
    logger.error(
      `Nothing could reopen webview ${webViewId} after its failed move. Captured definition: ${JSON.stringify(captured)}`,
    );
    throw new Error(
      describeWebViewMoveFailure(
        'not-reopened',
        `Could not move webview ${webViewId} to ${targetDescription}, and could not reopen it anywhere afterwards. Its captured definition is in the log.`,
      ),
    );
  }
  throw new Error(
    describeWebViewMoveFailure(
      reopenedIn.disposition,
      `Could not move webview ${webViewId} to ${targetDescription}; it was reopened in ${reopenedIn.description}.`,
    ),
  );
}

/** The move command names this router claims */
type MoveCommandName = 'platform.moveWebViewToNewWindow' | 'platform.moveWebViewToWindow';

/** OpenRPC documentation for the move commands, keyed like {@link SETTINGS_COMMAND_DOCS} */
const MOVE_COMMAND_DOCS: Record<MoveCommandName, SingleMethodDocumentation> = {
  'platform.moveWebViewToNewWindow': {
    method: {
      'x-experimental': true,
      summary:
        'Move a web view to a window created for it: close it where it is, reopen it there. ' +
        'Does nothing in Simple mode',
      params: [
        {
          name: 'webViewId',
          required: true,
          summary: 'Web view to move',
          schema: { type: 'string' },
        },
      ],
      result: {
        name: 'return value',
        summary:
          'Authoritative id of the web view in its new window. Can differ from the passed ' +
          'webViewId (a web view restored from a persisted layout carries a window-scoped id ' +
          'the move does not keep) — use the returned id for anything after the move',
        schema: { type: 'string' },
      },
    },
  },
  'platform.moveWebViewToWindow': {
    method: {
      'x-experimental': true,
      summary:
        'Move a web view to the given window: close it where it is, reopen it there. Moving it ' +
        'to its own window does nothing; naming a window that does not exist is an error',
      params: [
        {
          name: 'webViewId',
          required: true,
          summary: 'Web view to move',
          schema: { type: 'string' },
        },
        {
          name: 'targetWindowId',
          required: true,
          summary:
            "The target window's runtime id — ids restart at 1 each launch, so never persist one",
          schema: { type: 'number' },
        },
      ],
      result: {
        name: 'return value',
        summary:
          'Authoritative id of the web view in its new window. Can differ from the passed ' +
          'webViewId (a web view restored from a persisted layout carries a window-scoped id ' +
          'the move does not keep) — use the returned id for anything after the move',
        schema: { type: 'string' },
      },
    },
  },
};

/** Handle `platform.moveWebViewToNewWindow`. Arguments arrive untyped over the network */
async function moveWebViewToNewWindow(webViewId: unknown): Promise<WebViewId> {
  if (typeof webViewId !== 'string')
    throw new Error(`platform.moveWebViewToNewWindow needs a web view id; got ${typeof webViewId}`);
  return moveWebView(webViewId, 'new');
}

/** Handle `platform.moveWebViewToWindow`. Arguments arrive untyped over the network */
async function moveWebViewToWindow(
  webViewId: unknown,
  targetWindowId: unknown,
): Promise<WebViewId> {
  if (typeof webViewId !== 'string')
    throw new Error(`platform.moveWebViewToWindow needs a web view id; got ${typeof webViewId}`);
  if (typeof targetWindowId !== 'number')
    throw new Error(
      `platform.moveWebViewToWindow needs a target window id number; got ${typeof targetWindowId}`,
    );
  return moveWebView(webViewId, targetWindowId);
}

/** Internal-only export for testing; not for use in development */
export const testingWebViewServiceRouter = { moveWebView };

// Router methods that route to the focused window's WebView service shard

async function openWebView(
  webViewType: WebViewType,
  layout?: Layout,
  options?: OpenWebViewOptions,
): Promise<WebViewId | undefined> {
  // Contradictions among the arguments themselves, decided together and before anything else runs.
  // A call that cannot be honored must not fan a search out to every window on the way to being
  // refused — and, since a search that finds a match returns from the owner rung below, checking
  // any of these later would make enforcement depend on what the docks happened to hold.

  // `existingProjectId` only qualifies a '?' search; a concrete existingId already names one
  // exact web view, and no existingId at all names no search for it to limit, so combining it
  // with either is contradictory. Caught here rather than only in the window shard.
  if (options?.existingProjectId !== undefined && options.existingId !== '?')
    throw new Error(
      options.existingId === undefined
        ? "openWebView: existingProjectId requires existingId: '?'; it was not given at all."
        : `openWebView: existingProjectId only qualifies an existingId of '?'; existingId ${JSON.stringify(options.existingId)} already names an exact web view.`,
    );

  if (options?.targetWindowId !== undefined) {
    if (layout?.type === 'window')
      throw new Error(
        `Cannot open ${webViewType}: a 'window' layout asks for a new window, but targetWindowId names an existing one. Pass one or the other.`,
      );
    if (layout?.type === 'replace-tab')
      throw new Error(
        `Cannot open ${webViewType}: a replace-tab layout names its own window through its target tab, so targetWindowId cannot also name one. Pass one or the other.`,
      );
  }

  /**
   * Whether the reuse search below ended without an answer and this open carried on anyway — the
   * `'?'` fall-through, which trades a possible duplicate for the click doing something. Declared
   * out here because the layout is decided below the search, where the search's own reachability
   * reading is out of scope.
   */
  let didSearchFallThroughInconclusively = false;

  // If an existingId is provided, search all windows for the webview's owner
  if (options?.existingId) {
    // A project filter narrows which web views count as a match before the search picks among the
    // windows that have one, so a match for the asked-for project outranks the routing target's
    // preference for a web view of the type showing something else
    const matcher: OwnerMatcher =
      options.existingId === '?'
        ? { kind: 'type', webViewType, projectId: options.existingProjectId }
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
    didSearchFallThroughInconclusively = hadUnreachableWindows && matcher.kind === 'type';
  }

  /**
   * The layout the rest of this open acts on.
   *
   * A `window` layout becomes a tab when the reuse search fell through without an answer: what the
   * fall-through accepts is a duplicate in the window the user is looking at, where they can see it
   * and close it. A whole new window is a different bargain — it takes the screen and OS focus, and
   * the copy it may be duplicating can be sitting behind it on another monitor.
   *
   * Substituted rather than skipping the window rung: every path below hands the layout to a
   * window's shard, and rc-dock acts on `window` itself, so skipping would produce the popup
   * anyway.
   */
  const effectiveLayout =
    didSearchFallThroughInconclusively && layout?.type === 'window'
      ? ({ type: 'tab' } satisfies Layout)
      : layout;

  if (effectiveLayout?.type === 'window') {
    // A caller that declined creation only wanted the reuse search above, which found nothing (its
    // own not-found and unreachable answers are decided up there). A window layout from here on
    // only ever creates, so the decline is honored before any window exists — a created window is
    // shown and takes OS focus the moment it appears, which no passive probe may cause just for
    // its shard to decline the open and the scaffold to close the window again.
    if (options?.existingId && options.createNewIfNotFound === false) return undefined;
    return openWebViewInNewWindow(webViewType, options);
  }

  // A named window outranks placement inference: the caller said where. It never outranks
  // `existingId` reuse above — an existing view stays wherever it lives.
  if (options?.targetWindowId !== undefined) {
    // A window whose close has been decided is a stale target the caller cannot know about — same
    // rule the move commands apply: opening into it would report success and then lose the web
    // view when the close lands
    if (isWindowClosing(options.targetWindowId))
      throw new Error(
        `Cannot open ${webViewType} in window ${options.targetWindowId}: that window is closing.`,
      );

    const shard = await resolveShardForWindow(
      NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
      webViewShards,
      options.targetWindowId,
    );
    return shard.openWebView(webViewType, effectiveLayout, options);
  }

  // A layout naming a tab or tab group names the window that holds it, so it routes the same way an
  // existingId does — and after it, because a window shard that finds the existing web view raises it and
  // returns before it ever reads the layout. Routing in the other order would send the call to a
  // window that then ignores the reason it was sent there.
  const layoutTargetTabId = getLayoutTargetTabId(effectiveLayout);
  if (layoutTargetTabId) {
    // The docks are asked, not the ownership index: a replace-tab target is routinely a settings
    // tab or a dialog, which an ownership lookup cannot see at all, so its "nobody" would say
    // nothing about whether the target exists — and refusing on it took every such open down for as
    // long as one window stayed unreachable.
    const { owner, hadUnreachableWindows } = await findLayoutTargetOwner(layoutTargetTabId);
    // For `replace-tab`, replacing IS the operation, not placement advice: a window that guessed
    // wrong throws only after the web view provider has run and its side effects (controller,
    // nonce, state) exist. So when nothing that could be asked holds the target and some window
    // could not be asked — the window that may be holding it — this open refuses rather than guess.
    // A `panel` or `tab` layout falls through instead: guessing wrong there costs placement only.
    if (effectiveLayout?.type === 'replace-tab' && !owner && hadUnreachableWindows)
      throw new Error(
        `Could not openWebView ${webViewType} over replace-tab target '${layoutTargetTabId}': some windows were unreachable.`,
      );
    if (owner) {
      // Same rule a caller-named targetWindowId gets above: a window whose close has been decided
      // would take this content and lose it when the close lands. A layout names a tab rather than a
      // window, so the caller has even less way of knowing which window it resolved to — falling
      // through to the focused window instead would put the tab somewhere the caller did not ask
      // for and never say so.
      if (isWindowClosing(owner.windowId))
        throw new Error(
          `Cannot open ${webViewType} in window ${owner.windowId}: that window is closing.`,
        );
      return openWebViewInOwningWindow(owner, webViewType, effectiveLayout, options);
    }
  }

  // No existingId or not found in any window — route to focused window
  const webViewShard = await getTargetWebViewShard();
  return webViewShard.openWebView(webViewType, effectiveLayout, options);
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
   *
   * Transient by nature: the window is being reloaded, and it answers again once it comes back.
   */
  unreachableWindowIds: number[];
  /**
   * Windows nothing will ever run in again — their renderer died and the reload path gave up — so
   * their web views are missing from `definitions` and will not appear in a later read either.
   *
   * Kept apart from `unreachableWindowIds` rather than folded into it, because the two mean
   * opposite things about what to do next. A caller that refuses to act on an incomplete answer is
   * right to refuse while a window is coming back and wrong to refuse forever, so this list must
   * never reach the ones that throw. A caller that reports coverage — the shutdown sync — needs it
   * for the opposite reason: the projects open in a given-up window genuinely never synced, and
   * dropping it here would let the last line of that session's log claim clean coverage.
   */
  abandonedWindowIds: number[];
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

  // Reported, but never as unreachable. Their web views are gone the same way, and the callers that
  // report coverage have to hear about them — but they are tracked until the user closes them, so
  // putting them in the list above would make the readers that refuse a partial answer refuse every
  // one of these reads for the rest of the session.
  const abandonedWindowIds = getAbandonedWindowIds();
  if (abandonedWindowIds.length > 0)
    logger.warn(
      `Windows ${abandonedWindowIds.join(', ')} were given up on after their renderer died, so what they had open cannot be read and will not become readable.`,
    );

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
  return { definitions: definitionsPerWindow.flat(), unreachableWindowIds, abandonedWindowIds };
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
 *
 * Only the unreachable windows do that, deliberately. Throwing is worth its cost because it is
 * temporary — the window is being reloaded and answers again once it comes back. A window that was
 * given up on stays tracked until the user closes it, so throwing for one would take every read
 * here down for the rest of the session, which is the poisoning this list of two states exists to
 * avoid.
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
    const { owner, hadUnreachableWindows } = await findOwner(
      { kind: 'id', webViewId },
      'openSettings',
    );
    if (owner) {
      await owner.shard.openSettingsTab(owner.definition.projectId);
      return;
    }
    // "Could not ask" is not "nobody has it", and the difference matters more here than the fallback
    // below suggests: the project comes off the owning definition, so running this in the focused
    // window instead opens settings against whichever project THAT window happens to be showing.
    // Failing is the honest answer when the window holding the web view is the one that went unasked.
    if (hadUnreachableWindows)
      throw new Error(
        `Could not openSettings ${describeMatcher({ kind: 'id', webViewId })}: some windows were unreachable.`,
      );
  }
  logger.debug(
    `openSettingsForWebView has no owner to route by; focus-routing to window ${getTargetWindowId()}`,
  );
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
  logger.debug(`openUserSettings is focus-routing to window ${getTargetWindowId()}`);
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
    {
      commandName: 'platform.moveWebViewToNewWindow',
      docs: MOVE_COMMAND_DOCS['platform.moveWebViewToNewWindow'],
      routing: 'owner',
    },
    {
      commandName: 'platform.moveWebViewToWindow',
      docs: MOVE_COMMAND_DOCS['platform.moveWebViewToWindow'],
      routing: 'owner',
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
    registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, 'platform.moveWebViewToNewWindow'),
      moveWebViewToNewWindow,
      MOVE_COMMAND_DOCS['platform.moveWebViewToNewWindow'],
    ),
    registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, 'platform.moveWebViewToWindow'),
      moveWebViewToWindow,
      MOVE_COMMAND_DOCS['platform.moveWebViewToWindow'],
    ),
  ]);
  logger.info('WebView service router registered');
}
