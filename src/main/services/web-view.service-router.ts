/**
 * Service router for the WebView service. Registers under the generic "WebViewService" network
 * object name and routes calls to the focused window's WebView service shard (e.g.
 * "WebViewService-1"). This enables multi-window support by ensuring that operations like
 * openWebView execute in the correct window. It also claims the settings commands, which open a tab
 * in a window's dock layout and so belong to the same shards.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 *
 * What no single window can own lives beside this file rather than inside it:
 * `web-view.shard-index.ts` holds the per-window shards, `web-view.ownership.ts` the vocabulary of
 * an ownership search and the register of moves in flight, `web-view.owner-resolution.ts` the
 * search itself and the creation of a window to hold a view, and `web-view.move.ts` the policy for
 * moving one between windows. This file keeps the routing, and the command registrations that name
 * those capabilities.
 */

import {
  focusWindow,
  getAbandonedWindowIds,
  getReadyWindowIds,
  getTargetWindowId,
  getUnreachableWindowIds,
  isApplicationFocused,
  isWindowClosing,
  wasWindowEverReady,
} from '@main/services/window-state.service';
import { assertCommandRoutingMatchesDocs } from '@main/services/owner-routed-command.util';
import { resolveShardForWindow } from '@main/services/target-shard-resolver.util';
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
import { WebViewServiceShard } from '@shared/models/web-view.service-shard.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
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
import {
  describeMatcher,
  webViewMovesInFlight,
  type OwnerMatcher,
} from '@main/services/web-view.ownership';
import {
  getTargetWebViewShard,
  getWebViewShard,
  webViewShards,
} from '@main/services/web-view.shard-index';
import {
  createFreshWindow,
  findLayoutTargetOwner,
  findOwner,
  getLayoutTargetTabId,
  resetWindowCreatorForTesting,
  setWebViewWindowCreator,
  WINDOW_CREATOR_WIRING_TIMEOUT_MS,
  type WebViewWindowCreator,
  type WindowShard,
} from '@main/services/web-view.owner-resolution';
import { moveWebView } from '@main/services/web-view.move';

/**
 * Names this router no longer defines but still offers, because callers reach the web view
 * machinery through the router and moving them out is not a reason to make every caller say so.
 * `getWebViewShard` is read by `scroll-group-navigation.commands.ts` and `main.ts`;
 * `setWebViewWindowCreator` is how `main.ts` wires the creator once its window-creating closure
 * exists.
 */
export { getWebViewShard, setWebViewWindowCreator, type WebViewWindowCreator };

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
 * It happens only while this application holds OS focus. An open routed here need not be something
 * the user just asked for — an extension can re-open a web view by id at any moment — so a raise
 * that fired while they were working in another application would pull this app in front of them
 * for something they never requested. `isApplicationFocused()` is blur-aware, so it answers whether
 * the foreground is ours at this instant rather than whether it once was; it also rules out a raise
 * during startup, before anything has been focused at all.
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
 * Create a pending-content window and open in it, for a caller with nothing to protect from the
 * window's start — the two steps of {@link createFreshWindow} back to back.
 */
async function openInFreshWindow(
  webViewDescription: string,
  open: (shard: WebViewServiceShard) => Promise<WebViewId | undefined>,
): Promise<WebViewId | undefined> {
  const freshWindow = await createFreshWindow(webViewDescription);
  return freshWindow.runOpen(open);
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

/**
 * Internal-only export for testing; not for use in development.
 *
 * `createFreshWindow` is here because what it promises about overlapping closes cannot be exercised
 * through any router method: every caller of one awaits each close before the next, which is the
 * sequential case the promise is not about.
 */
export const testingWebViewServiceRouter = {
  moveWebView,
  createFreshWindow,
  WINDOW_CREATOR_WIRING_TIMEOUT_MS,
  resetWindowCreatorForTesting,
};

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
  const definitions = definitionsPerWindow.flat();

  // A web view mid-move is open in no window (see `webViewMovesInFlight`), so every window above
  // answered truthfully and the merged read still misses it — the one gap a caller that selects by
  // this list, like the shutdown sync's writable-project selection, cannot see for itself. Folded in
  // by id rather than appended unconditionally: the target may already have adopted while the move
  // record is still in the set (a late-landing adopt only clears it once its own probe confirms), and
  // counting that view twice would be as wrong as missing it.
  //
  // Matched against every id the move tracks, not just the captured one: a window scopes web view
  // ids to itself when it loads a layout, so the window holding this view may answer with the
  // spelling the move started from rather than the stripped one the target was handed. One match
  // means this view is already in the read under a name of its own.
  const definitionIds = new Set(definitions.map((definition) => definition.id));
  // What has already been folded in. Two sets, because the two spellings a move tracks answer
  // different questions and one set conflates them.
  //
  // A captured id has had its window scope stripped, and stripping is not injective: every window's
  // default Home tab reduces to the same string. So a captured id cannot say WHICH view it is, and
  // matching one move's ids against another's captured id would let the first fold-in claim `home`
  // and the next move read that as "already reported", dropping a view that really is missing.
  //
  // A window-scoped id can say which view it is — stripping only removes a `-wN` suffix, so an id
  // that survives the filter below still carries its window's scope and names one view in the whole
  // application.
  const foldedInScopedIds = new Set<WebViewId>();
  // And the captured spellings, read only against a LATER move's named id. That direction is what
  // distinguishes the two cases: a second move whose named id is what an earlier fold-in delivered
  // has picked up that very view — the target adopted late, the record has not cleared yet, and the
  // user moved the same tab again — whereas two different views whose captured ids collide never
  // have one's named id equal to the other's captured id, because the named id keeps its scope.
  const foldedInCapturedIds = new Set<WebViewId>();
  const foldedInDefinitions: SavedWebViewDefinition[] = [];
  webViewMovesInFlight.forEach((move) => {
    const [namedWebViewId] = move.webViewIds;
    if (
      move.webViewIds.some(
        (webViewId) => definitionIds.has(webViewId) || foldedInScopedIds.has(webViewId),
      ) ||
      foldedInCapturedIds.has(namedWebViewId)
    )
      return;
    move.webViewIds
      .filter((webViewId) => webViewId !== move.capturedDefinition.id)
      .forEach((webViewId) => foldedInScopedIds.add(webViewId));
    foldedInCapturedIds.add(move.capturedDefinition.id);
    foldedInDefinitions.push(move.capturedDefinition);
  });
  // `debug`, not `warn`: a move overlapping a whole-app read is an expected, handled condition, and
  // this read backs `getAllOpenWebViewDefinitions`, which any caller can invoke at any time — so an
  // ordinary tab drag would otherwise raise an operator-facing warning about nothing.
  if (foldedInDefinitions.length > 0)
    logger.debug(
      `Web view(s) ${foldedInDefinitions.map((definition) => definition.id).join(', ')} are between windows on a move, so no window reported them; folding in their captured definitions rather than leaving them out of this read.`,
    );

  return {
    definitions: [...definitions, ...foldedInDefinitions],
    unreachableWindowIds,
    abandonedWindowIds,
  };
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

  // Having EVER been ready is what tells the two empty answers apart, not being ready right now. A
  // window whose renderer never registered genuinely had nothing open. One that was serving
  // requests a moment ago may have had editors with unsaved work in it, and its own service is the
  // only thing that could have listed them, so the caller has to hear that the question went
  // unanswered rather than that the answer was none — and that is just as true of a window whose
  // renderer has since died, which is exactly when the distinction is load-bearing.
  if (wasWindowEverReady(windowId))
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
