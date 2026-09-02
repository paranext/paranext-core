/**
 * Which window owns a web view, and how a new one is brought into being to hold it.
 *
 * Sits between the shard index it searches and the move policy that drives it: the router and the
 * move path both resolve owners and both create windows, so this cannot live in either.
 */

import {
  getReadyWindowIds,
  getTargetWindowId,
  getUnreachableWindowIds,
} from '@main/services/window-state.service';
import { clearWindowPendingContent } from '@main/services/window-layout-persistence.service';
import { resolveShardForWindow } from '@main/services/target-shard-resolver.util';
import { SavedWebViewDefinition, WebViewId } from '@shared/models/web-view.model';
import { Layout } from '@shared/models/docking-framework.model';
import { logger } from '@shared/services/logger.service';
import { AsyncVariable, getErrorMessage } from 'platform-bible-utils';
import { WebViewServiceShard } from '@shared/models/web-view.service-shard.model';
import { NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE } from '@shared/services/web-view.service-model';
import {
  describeMatcher,
  isMatchedByMoveInFlight,
  type OwnerMatcher,
} from '@main/services/web-view.ownership';
import { getWebViewShard, webViewShards } from '@main/services/web-view.shard-index';

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

/**
 * Time in ms {@link createFreshWindow} waits for {@link setWebViewWindowCreator} to be called before
 * giving up. This router starts serving `openWebView` (see `startWebViewServiceRouter`) well before
 * `main.ts` wires the creator, so a caller — an extension calling `openWebView({ type: 'window' })`
 * from `activate()`, in particular — can arrive first; sized to match
 * `REGISTER_DATA_PROVIDER_TIMEOUT_MS` elsewhere on the boot path (30 seconds), generous enough for
 * a slow cold boot.
 */
export const WINDOW_CREATOR_WIRING_TIMEOUT_MS = 30000;

let windowCreator: WebViewWindowCreator | undefined;

/**
 * Resolves once {@link setWebViewWindowCreator} wires the creator, so a caller that reaches
 * {@link createFreshWindow} before wiring exists can wait for it instead of failing outright. See
 * {@link setWebViewWindowCreator} for the boot-ordering constraint this depends on.
 *
 * Absent until something actually waits: an `AsyncVariable` starts its timeout when it is
 * constructed, so one made at module load would measure a bound nobody asked for — rejecting with
 * no waiter attached on a boot slower than the bound, and handing an instant rejection to the first
 * caller to arrive after it. {@link waitForWindowCreatorWiring} makes it, so the bound always means
 * "wiring did not arrive while a call waited for it".
 */
let windowCreatorWired: AsyncVariable<void> | undefined;

/**
 * Wait for the window creator to be wired, bounded by {@link WINDOW_CREATOR_WIRING_TIMEOUT_MS}
 * measured from this call — see {@link windowCreatorWired} for why it is not measured from load.
 * Callers that already have a creator do not come here at all.
 */
function waitForWindowCreatorWiring(): Promise<void> {
  windowCreatorWired ??= new AsyncVariable<void>(
    'WebViewWindowCreator wiring',
    WINDOW_CREATOR_WIRING_TIMEOUT_MS,
  );
  return windowCreatorWired.promise;
}

/**
 * Wire the window facilities the window-layout rung uses. See {@link WebViewWindowCreator}
 *
 * Must be called without first waiting for extension-host readiness: extensions can call
 * `openWebView({ type: 'window' })` from `activate()`, and {@link createFreshWindow} blocks
 * (bounded) on this being called when that happens before wiring exists — if `main.ts` ever starts
 * waiting for an extension-host ready signal before making this call, that wait deadlocks against
 * this one.
 */
export function setWebViewWindowCreator(creator: WebViewWindowCreator): void {
  windowCreator = creator;
  // Only if something is waiting on it. Wiring that beats every caller leaves nothing to resolve,
  // and the callers that follow read `windowCreator` directly rather than waiting.
  windowCreatorWired?.resolveToValue(undefined);
}

/** A window a search settled on, and the shard an operation runs in it through */
export type WindowShard = {
  /**
   * The window that answered. Kept alongside the shard because the search already resolved it, and
   * raising that window afterwards is the only way the user sees where a cross-window operation
   * went.
   */
  windowId: number;
  shard: WebViewServiceShard;
};

/** The window that owns a web view, and the definition the ownership search already fetched */
export type WebViewOwner = WindowShard & {
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
export async function findOwner(
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
    // `debug`, not `warn`, for the reason the mid-move fold-in gives: a move overlapping a search is
    // an expected, handled condition on a path any caller can reach at any time, so an ordinary tab
    // drag would otherwise raise an operator-facing warning about nothing. The level says how loudly
    // to report it; the refusal below is what answers the caller.
    logger.debug(
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
export function getLayoutTargetTabId(layout?: Layout): string | undefined {
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
export async function findLayoutTargetOwner(
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
 * A window created to receive content that has not been put in it yet: created, marked
 * pending-content, and already reachable through the shard {@link createFreshWindow} resolved.
 *
 * The two halves are separate because they cost different things. Getting this far is a cold
 * renderer start — bundle, network service, shard registration — and it OPENS NOTHING; running the
 * open is the part that puts content somewhere. A caller holding something it would have to undo,
 * like a move that has to empty the source window first, can therefore pay the whole start before
 * it commits to anything, and a window that never becomes reachable costs it a wait and an error
 * rather than content stranded mid-flight.
 *
 * Either half leaves the window closed again when it does not end in content: a window whose
 * content never arrived is an empty shell the user never asked to manage.
 */
export type FreshWindow = {
  /**
   * Run an open against the created window. A failure — and a provider decline — closes the window
   * again. Success takes the pending-content mark off, so a reload before the first layout push
   * restores as an ordinary (empty) window instead of waiting forever for content that already
   * arrived.
   *
   * @param onWindowLeftStanding Called when an open that did not end in content did NOT take the
   *   window down with it, because content reached it anyway — with the window and the shard to
   *   reach it through. This window is the only place that knows whether that happened, so a caller
   *   whose next move depends on it has to be told from in here; one that has nothing to do with
   *   the answer may leave this out. A failure and a provider decline both reach here, so a window
   *   left standing does not mean the open threw — and on a decline it cannot be holding THIS
   *   open's content, since a decline docks nothing, so a caller reasoning about where its own
   *   content went may ignore that one
   */
  runOpen: (
    open: (shard: WebViewServiceShard) => Promise<WebViewId | undefined>,
    onWindowLeftStanding?: (standingWindow: WindowShard) => void,
  ) => Promise<WebViewId | undefined>;
  /**
   * Close the created window for a caller that will never run its open — what became impossible
   * between creating the window and being ready to fill it. Nothing was ever opened here, so there
   * is nothing to report about where it went.
   *
   * The window is closed once however many times this is called, and whether or not the open above
   * already took it down: calls after the first join that one attempt rather than issuing a close
   * of their own, so a caller need not await one before making another.
   */
  discard: () => Promise<void>;
};

/**
 * Create a pending-content window and resolve the shard to reach it through, so the window is ready
 * to be filled. See {@link FreshWindow} for why filling it is a separate step.
 *
 * Never leaks the window: a shard that never arrives closes it again before this throws.
 *
 * @param webViewDescription What the window is being created for, for the errors this raises
 */
export async function createFreshWindow(webViewDescription: string): Promise<FreshWindow> {
  if (!windowCreator) {
    try {
      await waitForWindowCreatorWiring();
    } catch {
      // Cleared so the next caller waits its own bound rather than inheriting this spent one. A
      // settled latch answers instantly, which on a boot where wiring is still moments away would
      // refuse a call that had not waited at all.
      windowCreatorWired = undefined;
      throw new Error(
        `Cannot open ${webViewDescription} in a new window: the window creator was never wired up within ${WINDOW_CREATOR_WIRING_TIMEOUT_MS} ms`,
      );
    }
  }
  const creator = windowCreator;
  if (!creator)
    throw new Error(
      `Cannot open ${webViewDescription} in a new window: window creation is not wired up`,
    );
  const windowId = await creator.createPendingContentWindow();

  // Closes the window this call created, and never lets a failure to close replace the reason the
  // window is being closed in the first place — a window that fails to close is a leak to warn
  // about, not grounds to hide why the open itself did not succeed.
  //
  // Asks the window first whether anything reached it in the meantime: an open whose request timed
  // out can still have landed afterwards, and this window is the only place that knows. Every other
  // outcome closes, including one where the question itself could not be answered — a
  // pending-content window kept by mistake never reports itself born-empty and never docks Home, so
  // it stands there blank with nothing to heal it, which is worse than closing one window too many.
  //
  // A window kept this way is reported to the caller, since it is the one window that can be asked
  // what became of the open that appeared to fail.
  const closeWindowUnlessContentArrived = async (
    onWindowLeftStanding?: (standingWindow: WindowShard) => void,
  ) => {
    try {
      const shard = await webViewShards.getShard(windowId);
      if (shard && (await shard.hasContentArrivedSinceEmptyReport())) {
        logger.warn(
          `Window ${windowId}'s new-window open did not succeed, but content reached the window anyway; leaving it open.`,
        );
        // It is holding content, so it is a window routed work can go to — and it must stop
        // restoring as a window still waiting for content that has already arrived. Changing the
        // mark announces the routing-target change itself, so nothing else has to.
        clearWindowPendingContent(windowId);
        onWindowLeftStanding?.({ windowId, shard });
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

  /**
   * The one close this window ever gets, memoized so every later call joins it instead of starting
   * another.
   *
   * At most once is enforced here rather than left to callers: both of the returned methods close,
   * so a caller that discards after a failed open — or discards twice — would otherwise issue a
   * second close on a window whose close is already running, which trips the force-close escape
   * hatch and abandons the first close's close-time work (see `window-emptiness.util.ts`). A flag
   * inside the close cannot enforce that: the only place to set one is past the cross-process
   * awaits above, and calls that overlap all read it before any of them gets there.
   *
   * What a joining call therefore skips is the whole attempt, including the arrival re-check —
   * whose answer cannot have changed under it, since the flag it reads stays set until the window
   * next reports its dock empty, which a window holding content does not do — and its own
   * `onWindowLeftStanding`, a report nothing but `runOpen` asks for and no caller runs twice, so
   * joining costs nobody an answer they were waiting on.
   */
  let closeAttempt: Promise<void> | undefined;
  const closeAbandonedWindow = (onWindowLeftStanding?: (standingWindow: WindowShard) => void) => {
    closeAttempt ??= closeWindowUnlessContentArrived(onWindowLeftStanding);
    return closeAttempt;
  };

  let shard: WebViewServiceShard;
  try {
    shard = await resolveShardForWindow(
      NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
      webViewShards,
      windowId,
    );
  } catch (e) {
    await closeAbandonedWindow();
    throw e;
  }

  return {
    runOpen: async (open, onWindowLeftStanding) => {
      let openedWebViewId: WebViewId | undefined;
      try {
        openedWebViewId = await open(shard);
      } catch (e) {
        await closeAbandonedWindow(onWindowLeftStanding);
        throw e;
      }

      if (openedWebViewId === undefined) {
        // The provider chose not to create the web view — the established "it did not happen"
        // answer. The window it would have lived in has no reason to exist, and a decline never
        // docked anything, so the re-check inside cannot mistake this open's own content for an
        // interloper.
        await closeAbandonedWindow(onWindowLeftStanding);
      } else {
        // The routed content is in the window now. Un-mark it, so a reload before its first layout
        // push restores as an ordinary (empty) window instead of waiting forever for content that
        // already arrived.
        clearWindowPendingContent(windowId);
      }
      return openedWebViewId;
    },
    discard: () => closeAbandonedWindow(),
  };
}

/**
 * Puts the window creator back to its unwired startup state — no creator and no latch, so the next
 * wait builds one and times itself — letting a test exercise {@link createFreshWindow}'s
 * before-wiring wait more than once. Testing only.
 */
export function resetWindowCreatorForTesting(): void {
  windowCreator = undefined;
  windowCreatorWired = undefined;
}
