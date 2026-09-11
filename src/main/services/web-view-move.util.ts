/**
 * Moving a web view from the window holding it into another, and putting it back when that fails.
 *
 * The policy for a move lives here: the in-flight registration, the pending-content window it opens
 * into, the abandoned-window close, the recovery ladder and the late-adopt probe. The router keeps
 * the two commands, their OpenRPC documentation and their argument checks, and calls in here for
 * what they mean.
 */

import {
  focusWindow,
  isApplicationFocused,
  isWindowClosing,
} from '@main/services/window-state.service';
import { resolveShardForWindow } from '@main/services/target-shard-resolver.util';
import { SavedWebViewDefinition, WebViewId } from '@shared/models/web-view.model';
import {
  describeWebViewMoveFailure,
  WebViewMoveFailureDisposition,
} from '@shared/models/web-view-move.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, wait } from 'platform-bible-utils';
import { WebViewServiceShard } from '@shared/models/web-view.service-shard.model';
import { isRequestTimedOutError } from '@shared/data/rpc.model';
import { settingsService } from '@shared/services/settings.service';
import { SettingTypes } from 'papi-shared-types';
import { NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE } from '@shared/services/web-view.service-model';
import {
  describeMatcher,
  addMoveInFlight,
  deleteMoveInFlight,
  type OwnerMatcher,
  type WebViewMoveInFlight,
} from '@main/services/web-view-ownership.util';
import { getTargetWebViewWindowShard, webViewShards } from '@main/services/web-view-shard-index';
import {
  createFreshWindow,
  findOwner,
  type WebViewOwner,
  type WindowShard,
} from '@main/services/web-view-owner-resolution.util';

/**
 * Where a move sends a web view: an existing window's id, or a window created for it.
 *
 * A tagged union rather than `string | 'new'`, which TypeScript collapses to `string` and would
 * silently destroy the discrimination between an id and the `'new'` sentinel.
 */
export type MoveWebViewTarget = { kind: 'window'; windowId: string } | { kind: 'new' };

/**
 * Web views with a move already running, so a second move of the same one is refused rather than
 * racing it. Ids only: this is about which web view is spoken for, not about the move's details.
 */
const movesInProgress = new Set<WebViewId>();

/**
 * How many times {@link findWebViewAdoptedAfterTimeout} asks the target whether the adopt landed.
 *
 * Attempts and delay are sized together to cover a provider slower than the request timeout on a
 * machine slower than the one this was written on. Ending the probe early does not fail the move —
 * it drops into recovery, which reopens the web view elsewhere while the target may still be
 * finishing, and that is the collision this probe exists to avoid. So the cost of probing too
 * briefly is worse than the cost of a user waiting a few seconds longer for a move that was already
 * in trouble.
 */
const LATE_ADOPT_PROBE_ATTEMPTS = 4;

/** How long {@link findWebViewAdoptedAfterTimeout} waits between attempts. See the attempt count */
const LATE_ADOPT_PROBE_RETRY_DELAY_MS = 3_000;

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
 *   which is the same id the web view was minted with and keeps for its whole life
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
  if (target.kind === 'window' && isApplicationFocused()) focusWindow(target.windowId);
}

/**
 * Move a web view: make the destination ready, close the view in the window that holds it, reopen
 * it from the captured definition in the destination.
 *
 * Close-source-first is load-bearing for the OPEN — a one-instance web view cannot be opened in the
 * destination while the source instance is alive, because reuse logic would find and raise the
 * source instead. It is not load-bearing for getting the destination ready, which opens nothing: a
 * window created for the move and the shard to reach it through are both settled before the
 * capture, so the wait for a window to finish starting — the one step here that can take a cold
 * renderer start — is spent with the web view still in the window the user left it in.
 *
 * @returns Authoritative id of the web view in its new window — the same id as `webViewId`, since a
 *   web view keeps the id it was minted with for its whole life, across any number of moves (see
 *   `mint-web-view-ids.util.ts`)
 * @throws If no window holds the web view; if the destination could not be made ready — a named
 *   target window that does not exist or is closing, or a window created for the move that never
 *   became reachable, all of which leave the web view where it was; if taking the web view out of
 *   its window failed, which can have closed it without handing anything back, so the error says
 *   its whereabouts are unknown; or if the open in the destination failed, where the error says
 *   where the web view ended up instead (see {@link recoverAfterFailedMove})
 */
export async function moveWebView(
  webViewId: WebViewId,
  target: MoveWebViewTarget,
): Promise<WebViewId> {
  // Refused, not queued. A second move of the same web view races the first for a tab only one of
  // them can capture, and the loser is told the tab may have closed while it is safe in the window
  // the winner put it in. Queueing would instead hold the second caller for as long as the first
  // takes, which the late-adopt probe can stretch to minutes with nothing on screen explaining it.
  //
  // This check and the `add` below it are one synchronous step, so two calls cannot both pass it.
  // The in-flight register cannot do this job: it is filled only after the source window has
  // answered the capture, which is several awaits later.
  if (movesInProgress.has(webViewId))
    throw new Error(
      describeWebViewMoveFailure(
        'already-moving',
        `Cannot move webview ${webViewId}: it is already being moved.`,
      ),
    );
  movesInProgress.add(webViewId);
  try {
    return await moveCapturedWebView(webViewId, target);
  } finally {
    movesInProgress.delete(webViewId);
  }
}

/**
 * The move itself, once {@link moveWebView} has established that this web view is not already on its
 * way somewhere. Never called directly: everything it does assumes it is the only move holding this
 * web view.
 */
async function moveCapturedWebView(
  webViewId: WebViewId,
  target: MoveWebViewTarget,
): Promise<WebViewId> {
  const matcher: OwnerMatcher = { kind: 'id', webViewId };
  const { owner, hadUnreachableWindows } = await findOwner(matcher, 'move');
  // A move always names an existing web view, so a window that could not be asked may be the one
  // holding it. Reading that as "nobody has it" would fail the move for the wrong reason, and the
  // caller could not tell a view that is not open from one in a window that never answered.
  if (!owner && hadUnreachableWindows)
    throw new Error(`Could not move ${describeMatcher(matcher)}: some windows were unreachable.`);
  if (!owner) throw new Error(`Cannot move webview ${webViewId}: no window has it open.`);

  const targetDescription = target.kind === 'new' ? 'a new window' : `window ${target.windowId}`;

  /**
   * The window a move to a new window created and left standing, because content reached it while
   * its adopt was not succeeding. Only that window can say what became of the adopt, and only a
   * move that has one has anywhere to put the question. A provider decline sets this too, and the
   * decline path below ignores it: a decline docks nothing, so a window standing after one is not
   * holding this move's web view.
   */
  let standingNewWindow: WindowShard | undefined;
  /** The named target window's shard. A move to a new window has no named target */
  let targetShard: WebViewServiceShard | undefined;
  /**
   * The window a move to a new window created, so its close can be re-checked after its adopt the
   * same way a named target's is — a move to a new window has no target id to check until this is
   * set
   */
  let freshWindowId: string | undefined;
  /**
   * The window this move is putting the captured view into, for the in-flight register — set in the
   * branch below the moment the id exists (immediately for a named target, or once
   * `createFreshWindow` hands one back), so a `WebViewMoveInFlight` this move later adds is never
   * missing it.
   *
   * Unlike a recovery rung's destination (see `readoptWithDestination` below and the invariant on
   * `WebViewMoveInFlight.destinationWindowId`), this is not set-then-cleared around one call: it is
   * baked into the record at construction, and the record is not added to the in-flight register
   * until it already carries this value. Nothing but a synchronous `isWindowClosing` check runs
   * between that and the primary adopt starting, and every path that gives up on this destination
   * hands off to `recoverAfterFailedMove` synchronously too, which clears the field as its own
   * first statement, before its own first `await`. So the record is never visible with this naming
   * a window that has no adopt starting or running against it — without needing a `finally` of its
   * own the way each recovery rung does.
   */
  let destinationWindowId: string;
  /** Puts the captured definition in the destination resolved below */
  let adoptIntoDestination: (definition: SavedWebViewDefinition) => Promise<WebViewId | undefined>;
  /**
   * Undo the destination, for a move that ends before it ever adopts into it. Only a move to a new
   * window has anything to undo — it created a window — so anything else leaves this out.
   */
  let discardDestination: (() => Promise<void>) | undefined;

  if (target.kind === 'new') {
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
    // Created and reachable before anything closes. This is the step that can take a whole cold
    // renderer start, and the one that fails when a window never gets there — so it belongs where a
    // window that never comes up costs the user a wait and an error rather than a web view open in
    // no window at all. It opens nothing: an empty window gives reuse logic nothing to find, so
    // what makes the capture below have to come before the adopt is untouched by doing this early.
    const freshWindow = await createFreshWindow(webViewId);
    freshWindowId = freshWindow.windowId;
    destinationWindowId = freshWindow.windowId;
    adoptIntoDestination = (definition) =>
      freshWindow.runOpen(
        (shard) => shard.adoptWebView(definition),
        (standingWindow) => {
          standingNewWindow = standingWindow;
        },
      );
    discardDestination = freshWindow.discard;
  } else {
    // The web view is already there; closing and reopening it would be churn for nothing
    if (target.windowId === owner.windowId) return webViewId;
    // A window whose close has been decided is a stale target the caller cannot know about:
    // adopting into it would report success and then lose the view when the close lands
    if (isWindowClosing(target.windowId))
      throw new Error(
        `Cannot move webview ${webViewId} to window ${target.windowId}: that window is closing.`,
      );
    // Resolved before anything closes: an unknown target must fail the move with the web view
    // untouched
    const shard = await resolveShardForWindow(
      NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
      webViewShards,
      target.windowId,
    );
    targetShard = shard;
    destinationWindowId = target.windowId;
    adoptIntoDestination = (definition) => shard.adoptWebView(definition);
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
    // Nothing is coming to fill a window this move created, and an empty window the user never
    // asked to manage must not outlive the move that made it
    await discardDestination?.();
    // Named as a failure whose outcome is unknown, because it is one: a caller that reported this
    // as a move that changed nothing would tell the user their action did nothing while their tab
    // may be gone from the screen with only the log holding what it was
    throw new Error(
      describeWebViewMoveFailure(
        'possibly-closed',
        `Could not move webview ${webViewId} to ${targetDescription}: capturing it failed (${getErrorMessage(e)}). Window ${owner.windowId} may or may not still have it, and its definition from before the move is in the log.`,
      ),
    );
  }
  if (!captured) {
    // Same as above: there is nothing to put in a window this move created, and the window that
    // held the web view a moment ago says it does not — where it is now is not this move's to say
    await discardDestination?.();
    // And the same log, for the same reason: this rejects with the disposition that sends the user
    // to the log for what became of their tab, and an owner that answers nothing says nothing about
    // what the web view was. The owner search's definition is the only description still in hand
    logger.error(
      `Window ${owner.windowId} no longer had webview ${webViewId} when the move tried to capture it. Definition from the owner search: ${JSON.stringify(owner.definition)}`,
    );
    throw new Error(
      describeWebViewMoveFailure(
        'possibly-closed',
        `Cannot move webview ${webViewId}: window ${owner.windowId} no longer had it when the move tried to capture it.`,
      ),
    );
  }

  // From here the web view is open in NO window until the target takes it, or until recovery
  // puts it back — see the in-flight register, which is what keeps a search landing in that gap
  // from being told the view does not exist.
  const moveInFlight: WebViewMoveInFlight = {
    webViewType: captured.webViewType,
    projectId: captured.projectId,
    destinationWindowId,
    capturedDefinition: captured,
  };
  addMoveInFlight(moveInFlight);
  try {
    try {
      // Read again at the last moment: the capture above closed the source tab, and everything
      // between the target check at the top of this move and here has been cross-process work the
      // target's close could have been decided during. Throwing hands the web view to the recovery
      // below rather than into a window that is about to take it away.
      if (target.kind === 'window' && isWindowClosing(target.windowId))
        throw new Error(
          `window ${target.windowId}'s close was decided while the move was in flight`,
        );
      const movedWebViewId = await adoptIntoDestination(captured);
      if (movedWebViewId !== undefined) {
        // Read again on the way out, but only to note it, not to undo it: once the adopt has
        // succeeded the destination owns the web view, and a close decided during or after the
        // adopt is the destination's own close path to handle, exactly like any other tab it
        // holds. Handing this to the recovery below would re-adopt the same id into a second
        // window while the destination may still hold it live — the collision the in-flight
        // register and every rung of that ladder exist to prevent, not something to invite here.
        // A move to a new window is not exempt: the window it created can start closing in the
        // same gap, and freshWindowId is what makes it askable here.
        const adoptedWindowId = target.kind === 'window' ? target.windowId : freshWindowId;
        if (adoptedWindowId !== undefined && isWindowClosing(adoptedWindowId))
          logger.debug(
            `Webview ${webViewId}'s adopt into window ${adoptedWindowId} succeeded, but that window's close was decided while the adopt was running; its own close path will handle the view.`,
          );
        else raiseMoveTarget(target);
        return movedWebViewId;
      }
      logger.warn(
        `Moving webview ${webViewId} to ${targetDescription} did not happen: the provider did not recreate it there. Reopening it where it can go.`,
      );
    } catch (e) {
      // A timed-out adopt may have succeeded after its request expired, and only the window that
      // ran it knows — see findWebViewAdoptedAfterTimeout. The window to ask is the target a move
      // named, or, for a move to a new window, the window that path created and left standing:
      // content reaching a window created for this one adopt is what a late-landing adopt looks
      // like from outside. A new-window attempt that took its window down with it has nobody to
      // ask and nothing that could have landed, so it goes straight to the recovery the user is
      // waiting on rather than spending the probe's attempts on a window that is gone.
      const shardToProbe = targetShard ?? standingNewWindow?.shard;
      /**
       * Whether the adopt can still be running: only a request that expired client-side can be. An
       * answer the destination produced itself — of any kind — is the destination saying it is
       * done
       */
      const mightAdoptStillLand = isRequestTimedOutError(e);
      if (shardToProbe !== undefined && mightAdoptStillLand) {
        const lateAdoptedWebViewId = await findWebViewAdoptedAfterTimeout(
          shardToProbe,
          captured.id,
          targetDescription,
        );
        if (lateAdoptedWebViewId !== undefined) {
          raiseMoveTarget(target);
          return lateAdoptedWebViewId;
        }
      }
      if (standingNewWindow !== undefined) {
        // The window created for this move is holding content: the dock took the tab, and the
        // failure came back after that. Reopening the captured definition anywhere would put the
        // same web view id live in two windows, where messages for it become unroutable and
        // closing either copy takes the other's controller with it. What decides that is the
        // content standing in the window, not what kind of failure came back — an adopt that threw
        // past the dock, or an answer lost on its way home, leaves the same window holding the same
        // web view as the timed-out adopt the probe above chases. So the move ends here: the window
        // keeps whatever reached it — closing it would destroy content that may be in front of the
        // user — and the caller is told the web view reached that window and the move could not be
        // confirmed, which is what is actually known here: where it went, but not whether the move
        // finished.
        logger.error(
          `Webview ${webViewId}'s adopt into window ${standingNewWindow.windowId} did not report success (${getErrorMessage(e)}), but that window is holding content, so nothing may reopen the web view elsewhere. Captured definition: ${JSON.stringify(captured)}`,
        );
        /** What became of the adopt, said no more definitely than this failure allows */
        const whatTheAdoptDid = mightAdoptStillLand
          ? `timed out and could not be confirmed (${getErrorMessage(e)})`
          : `failed (${getErrorMessage(e)})`;
        throw new Error(
          describeWebViewMoveFailure(
            'reached-new-window-unconfirmed',
            `Could not move webview ${webViewId} to ${targetDescription}: adopting it there ${whatTheAdoptDid}, and window ${standingNewWindow.windowId} is holding content, so the move could not be confirmed. Its captured definition is in the log.`,
          ),
        );
      }
      logger.warn(
        `Moving webview ${webViewId} to ${targetDescription} failed: ${getErrorMessage(e)}. Reopening it where it can go.`,
      );
    }

    return await recoverAfterFailedMove(
      webViewId,
      owner,
      captured,
      targetDescription,
      moveInFlight,
    );
  } finally {
    deleteMoveInFlight(moveInFlight);
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
 * Run one recovery rung's readopt while `moveInFlight.destinationWindowId` names the window it is
 * aimed at, for exactly that readopt's duration and no longer — see the invariant on
 * {@link WebViewMoveInFlight.destinationWindowId}. Setting the field before the call and leaving the
 * clearing to whatever code happens to run next leaves it naming a window whose readopt has already
 * ended, which is what a stale destination is; a `finally` here makes the clear happen on every
 * exit — success, a handled failure inside {@link readoptAfterFailedMove}, or a throw — so a rung
 * that goes through this helper cannot omit it, and a rung added later has no path that skips it
 * either.
 *
 * @param moveInFlight This move's own record in the in-flight register, updated in place — the
 *   register holds this exact object, not a copy
 * @param windowId The window this rung's readopt is aimed at
 * @param attemptReadopt The readopt attempt itself, run while the field names `windowId`
 */
async function readoptWithDestination(
  moveInFlight: WebViewMoveInFlight,
  windowId: string,
  attemptReadopt: () => Promise<boolean>,
): Promise<boolean> {
  moveInFlight.destinationWindowId = windowId;
  try {
    return await attemptReadopt();
  } finally {
    moveInFlight.destinationWindowId = undefined;
  }
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
 *
 * Keeps `moveInFlight.destinationWindowId` honest as the ladder moves on — see the invariant on
 * {@link WebViewMoveInFlight.destinationWindowId}. Cleared to `undefined` up front, since the target
 * this move just gave up on has no readopt running against it any more and recovery has not chosen
 * its next window yet. Each rung below then runs its own readopt through
 * {@link readoptWithDestination}, which sets the field and clears it again around that one call, so
 * nothing here has to remember to clear it afterwards.
 *
 * @param moveInFlight This move's own record in the in-flight register, updated in place — the
 *   register holds this exact object, not a copy
 */
async function recoverAfterFailedMove(
  webViewId: WebViewId,
  owner: WebViewOwner,
  captured: SavedWebViewDefinition,
  targetDescription: string,
  moveInFlight: WebViewMoveInFlight,
): Promise<never> {
  moveInFlight.destinationWindowId = undefined;
  logger.debug(
    `Reopening webview ${webViewId} after its failed move to ${targetDescription}. Captured definition: ${JSON.stringify(captured)}`,
  );
  /** The window that took the web view back: how to name it, and how a caller must read that */
  let reopenedIn: { description: string; disposition: WebViewMoveFailureDisposition } | undefined;
  if (!isWindowClosing(owner.windowId)) {
    const sourceDescription = `window ${owner.windowId}, where it came from`;
    const reopenedInSource = await readoptWithDestination(moveInFlight, owner.windowId, () =>
      readoptAfterFailedMove(owner.shard, webViewId, captured, sourceDescription),
    );
    if (reopenedInSource) {
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
      const { windowId: focusedWindowId, shard: focusedShard } =
        await getTargetWebViewWindowShard();
      const reopenedInFocused = await readoptWithDestination(moveInFlight, focusedWindowId, () =>
        readoptAfterFailedMove(focusedShard, webViewId, captured, 'the focused window'),
      );
      if (reopenedInFocused) {
        reopenedIn = {
          description: 'the focused window',
          disposition: 'reopened-in-focused-window',
        };
      }
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
