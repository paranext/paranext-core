import papi, { logger, WebViewFactory } from '@papi/backend';
import type {
  ExecutionActivationContext,
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  ScrollGroupScrRef,
  WebViewDefinition,
} from '@papi/core';
import type {
  CommentFilters,
  CommentListWebViewController,
  LegacyCommentFilters,
  LegacyScopeFilter,
  OpenCommentListWebViewOptions,
  ScopeFilter,
} from 'legacy-comment-manager';
import { getErrorMessage, serialize } from 'platform-bible-utils';
import commentListWebView from './comment-list.web-view?inline';
import tailwindStyles from './tailwind.css?inline';
import { presetToLabelKey, scopeFilterToLabelKey } from './comment-list-filters.model';
import {
  LEGACY_COMMENT_USJ_PDPF_ID,
  LegacyCommentManagerUsjProjectDataProviderEngineFactory,
} from './project-data-provider/legacy-comment-manager-usj-pdpef.model';
import { LEGACY_COMMENT_USJ_PROJECT_INTERFACES } from './project-data-provider/legacy-comment-manager-usj-pdpe.model';
import { COMMENT_LIST_PANEL_WEB_VIEW_TYPE } from './comment-list-panel.utils';
import { createCommentListWebViewController } from './comment-list-web-view-controller.util';
import {
  CommentListPanelOptions,
  CommentListPanelWebViewFactory,
  setPendingCommentListPanelProjectId,
} from './comment-list-panel-web-view.factory';

const commentListWebViewType = 'legacyCommentManager.commentList';
const commentListPanelWebViewType = COMMENT_LIST_PANEL_WEB_VIEW_TYPE;

// #region Comment List WebView

interface CommentListWebViewOptions extends OpenWebViewOptions {
  projectId: string | undefined;
  editorScrollGroupId: ScrollGroupScrRef | undefined;
  editorWebViewId: string | undefined;
  // One-shot initial filter/scope for a NEW view, seeded into web view state so the view mounts
  // already-filtered instead of relying on a post-open setFilters message (which could race the
  // view's message listener). Passed by openCommentList on every open, but only takes effect when
  // creating a new view: a reuse hit returns before the provider (getWebViewDefinition) ever runs,
  // so these are simply inert there. Also carries the deprecated legacy shapes straight through from
  // OpenCommentListWebViewOptions — the web view maps them onto the current model on mount.
  initialFilters: Partial<CommentFilters> | LegacyCommentFilters | undefined;
  initialScopeFilter: ScopeFilter | LegacyScopeFilter | undefined;
}

/** WebView Factory for the Comment List web view with controller support */
class CommentListWebViewFactory extends WebViewFactory<typeof commentListWebViewType> {
  constructor() {
    super(commentListWebViewType);
  }

  override async getWebViewDefinition(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: CommentListWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== commentListWebViewType)
      throw new Error(
        `${commentListWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    // Kick off the (independent) title localization now so it runs concurrently with the
    // project-name lookup below instead of serially before it.
    const baseTitlePromise = papi.localization.getLocalizedString({
      localizeKey: '%webView_legacyCommentManager_commentList_title%',
    });

    // A caller-supplied projectId may be invalid or not yet loaded; a rejection here would fail the
    // whole open, so guard the lookup and fall back to the id rather than let the title throw.
    let projectName: string | undefined;
    if (projectId) {
      try {
        const baseProjectPdp = await papi.projectDataProviders.get('platform.base', projectId);
        projectName = await baseProjectPdp.getSetting('platform.name');
      } catch (error) {
        logger.warn(
          `Could not resolve a name for project ${projectId}; using the id in the title`,
          error,
        );
      }
    }

    const baseTitle = await baseTitlePromise;
    // Fall back to the id when the name is missing OR empty (`||`, not `??`, so an empty-string
    // project name doesn't render a blank "Comments: " suffix).
    const title = projectId ? `${baseTitle}: ${projectName || projectId}` : baseTitle;

    return {
      ...savedWebView,
      title,
      projectId,
      content: commentListWebView,
      styles: tailwindStyles,
      scrollGroupScrRef: getWebViewOptions.editorScrollGroupId,
      state: {
        ...savedWebView.state,
        // Always rebuild un-blocked. `isSyncBlocked` is transient runtime state owned by the core
        // auto-sync edit-block driver; forcing it false here means a crash/reload mid-sync can never
        // restore a read-only comment view from the saved layout (mirrors the scripture editor's
        // scrub in platform-scripture-editor main.ts). The driver re-flags it if a sync is still in
        // flight.
        isSyncBlocked: false,
        editorWebViewId: getWebViewOptions.editorWebViewId ?? savedWebView.state?.editorWebViewId,
        // Seeded only when opening a new view (undefined otherwise, which clears any persisted
        // value). Deliberately NOT persisted across restarts: a restored view has these undefined
        // and so mounts with default filters rather than re-applying a stale one-shot request.
        initialFilters: getWebViewOptions.initialFilters,
        initialScopeFilter: getWebViewOptions.initialScopeFilter,
      },
    };
  }

  override async createWebViewController(
    webViewDefinition: WebViewDefinition,
    webViewNonce: string,
  ): Promise<CommentListWebViewController> {
    return createCommentListWebViewController(webViewDefinition, webViewNonce);
  }
}

const commentListWebViewProvider: IWebViewProvider = new CommentListWebViewFactory();

// #endregion Comment List WebView

// #region Comment List Panel WebView (Column 3 fixed tab)

const commentListPanelWebViewProvider: IWebViewProvider = new CommentListPanelWebViewFactory();

/**
 * Opens or updates the fixed Comment List Panel in Column 3 for the given project. If the panel is
 * already open, reloads it in place without bringing it to the front.
 *
 * This implements the `legacyCommentManager.openCommentListPanel` command.
 *
 * @param projectId The project whose comments to display. If `undefined`, a newly created panel
 *   opens empty, but an already-open panel keeps its current project (`undefined` is
 *   indistinguishable from "no pending value" in the sentinel, so resolution falls back to the
 *   saved projectId). This is an accepted limitation: in Simple mode there is no scenario where an
 *   active project needs to be cleared after having been set.
 * @returns The webView ID of the panel, or `undefined` if opening failed
 */
async function openCommentListPanel(projectId: string | undefined): Promise<string | undefined> {
  // Use existingId: '?' to passively probe for the existing Column 3 tab (returns its id, or
  // undefined if not found) without bringing it to front or creating one if absent.
  const existingId = await papi.webViews.openWebView(
    commentListPanelWebViewType,
    { type: 'tab' },
    { existingId: '?', createNewIfNotFound: false, bringToFront: false },
  );

  if (existingId) {
    setPendingCommentListPanelProjectId(projectId);
    return papi.webViews.reloadWebView(commentListPanelWebViewType, existingId, {
      bringToFront: false, // Don't steal focus from the Scripture editor on project switch
    });
  }

  // Panel not yet open (shouldn't happen in Simple mode where it's always in the layout).
  const openOptions: CommentListPanelOptions = { projectId };
  return papi.webViews.openWebView(commentListPanelWebViewType, { type: 'tab' }, openOptions);
}

/**
 * Raises an open tab of the requested type without reloading it, and creates nothing when none is
 * open. Mirrors `showOrCreateTab` in
 * `extensions/src/platform-scripture-editor/src/show-panel.util.ts`, which the scripture editor's
 * other Simple Tools items use; keep the two in step so every Tools item raises its tab the same
 * way.
 */
const RAISE_EXISTING_TAB_ONLY: OpenWebViewOptions = {
  existingId: '?',
  createNewIfNotFound: false,
  bringToFront: true,
};

/**
 * Brings the Comments tab to the front, the way clicking it would. An open tab is raised, never
 * reloaded, so an in-progress comment edit survives. If no tab is open, opens one for the editor's
 * project.
 *
 * @param editorWebViewId The scripture editor the request came from
 * @returns The Comments web view's ID, or `undefined` if it couldn't be shown
 */
async function showCommentListPanel(
  editorWebViewId: string | undefined,
): Promise<string | undefined> {
  const existingId = await papi.webViews.openWebView(
    commentListPanelWebViewType,
    undefined,
    RAISE_EXISTING_TAB_ONLY,
  );
  if (existingId) return existingId;
  let projectId: string | undefined;
  if (editorWebViewId) {
    // getOpenWebViewDefinition throws if no window claimed the web view and some window could not be
    // asked. That is not this command's problem to fail over — degrade to "no project id" so a new
    // Comments tab still opens, unlabeled, rather than rejecting the whole show request.
    try {
      projectId = (await papi.webViews.getOpenWebViewDefinition(editorWebViewId))?.projectId;
    } catch (e) {
      logger.warn(
        `Could not resolve the project for web view ${editorWebViewId}: ${getErrorMessage(e)}`,
      );
    }
  }
  const openOptions: CommentListPanelOptions = { projectId };
  return papi.webViews.openWebView(commentListPanelWebViewType, { type: 'tab' }, openOptions);
}

/**
 * Selects/scrolls to a specific thread in the fixed Column 3 Comment List panel — without reloading
 * the panel. Reloading (as {@link openCommentListPanel} does) remounts the panel's React root, which
 * would discard any in-progress inline edit; this function assumes the panel is already showing the
 * right project (it does not accept a `projectId`) and only changes which thread is selected and,
 * optionally, which tab is in front.
 *
 * This implements the `legacyCommentManager.selectCommentThreadInPanel` command.
 *
 * @param threadId The ID of the thread to select and scroll to in the panel
 * @param bringToFront Whether to also bring the panel's tab to the front
 * @returns The webView ID of the panel, or `undefined` if it isn't open in the current layout
 */
async function selectCommentThreadInPanel(
  threadId: string,
  bringToFront: boolean,
): Promise<string | undefined> {
  // Same existingId: '?' probe openCommentListPanel uses to find the singleton Column 3 panel.
  const panelWebViewId = await papi.webViews.openWebView(
    commentListPanelWebViewType,
    { type: 'tab' },
    { existingId: '?', createNewIfNotFound: false, bringToFront },
  );
  if (!panelWebViewId) {
    throw new Error('Comment List Panel is not open in the current layout');
  }

  const panelController = await papi.webViews.getWebViewController(
    commentListPanelWebViewType,
    panelWebViewId,
  );
  if (!panelController) {
    throw new Error(
      `Could not get WebView Controller for comment list panel WebView ${panelWebViewId} to select thread ${threadId}`,
    );
  }

  await panelController.selectThread(threadId);
  return panelWebViewId;
}

// #endregion Comment List Panel WebView

/**
 * Open or focus the Comment List WebView for the project ID associated with the specified WebView
 * ID
 *
 * This implements the `legacyCommentManager.openCommentList` command
 *
 * @param webViewId The ID of the WebView whose project comments to display
 * @param options Additional options for opening the comment list WebView
 * @returns The ID of the comment list WebView that was opened or focused, or `undefined` if no
 *   project ID could be determined
 */
async function openCommentList(
  webViewId: string | undefined,
  options: OpenCommentListWebViewOptions = {},
): Promise<string | undefined> {
  let triggerProjectId: string | undefined;
  let tabIdFromWebViewId: string | undefined;
  let editorScrollGroupId: CommentListWebViewOptions['editorScrollGroupId'];

  logger.debug('Opening comment list');

  if (webViewId) {
    const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
    triggerProjectId = webViewDefinition?.projectId;
    tabIdFromWebViewId = webViewDefinition?.id;
    editorScrollGroupId = webViewDefinition?.scrollGroupScrRef;
  }

  // A caller that isn't the project's own web view (e.g. the S/R results dialog) can target a
  // project directly. Takes precedence over the web-view-derived project.
  const projectId = options.projectId ?? triggerProjectId;

  // If the caller targeted a different project than the triggering web view, that web view's editor
  // context (scroll group + id) belongs to another project, so it must not wire this comment list to
  // the wrong editor. The trigger's tab id is still used purely for docking placement.
  //
  // A cross-project list is intentionally left to fall back to the window's scroll group (see
  // useWebViewScrollGroupScrRef) rather than being coerced onto an all-books scope: all four scopes
  // are always offered, and a scroll-group reference is a BCV, which is project-agnostic. See
  // Architecture-Decisions.md ("Cross-project comment list follows the window's scroll group") for
  // the known consequence (unmapped versification differences) before re-adding a guard here.
  const editorContextApplies = !options.projectId || options.projectId === triggerProjectId;
  const editorWebViewId = editorContextApplies ? webViewId : undefined;
  if (!editorContextApplies) editorScrollGroupId = undefined;

  if (!projectId) {
    logger.debug('No project!');
    return undefined;
  }

  // Find the project's comment list wherever it lives in the dock — including in another window —
  // or create one if none is open anywhere. The dock layouts are the reuse authority: a `'?'` search
  // scoped by `existingProjectId` finds the project's list regardless of which window it was last
  // opened or moved to. The initial filters/scope are seeded into the web view state so a
  // freshly-created view mounts already-filtered.
  const webViewOptions: CommentListWebViewOptions = {
    projectId,
    editorScrollGroupId,
    editorWebViewId,
    initialFilters: options.filtersToSet,
    initialScopeFilter: options.scopeFilterToSet,
  };
  const commentListWebViewId = await papi.webViews.openWebView(
    commentListWebViewType,
    { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
    {
      ...webViewOptions,
      existingId: '?',
      existingProjectId: projectId,
      bringToFront: true,
      createNewIfNotFound: true,
    },
  );

  // Post-open controller actions. Sent unconditionally even to a freshly-created view whose filters
  // are already seeded via state (above): web view messages are buffered and replayed once the
  // view's iframe finishes loading (see web-view.component.tsx), so this never races a mount-order
  // loss — but it does mean the receiver (comment-list.web-view.tsx) is responsible for making a
  // same-value re-send a no-op rather than churning React/query state. Only fetch the controller
  // when there is actually something to send — so a filters-only open skips it entirely and can't
  // fail on a transient controller-lookup miss.
  const needsSetFilters = !!options.filtersToSet || options.scopeFilterToSet !== undefined;
  const needsSelectThread = !!options.threadIdToSelect;
  if (commentListWebViewId && (needsSetFilters || needsSelectThread)) {
    const commentListController = await papi.webViews.getWebViewController(
      commentListWebViewType,
      commentListWebViewId,
    );
    if (!commentListController) {
      // Name the pending action(s) so a controller-lookup miss is diagnosable in logs.
      const pendingActions: string[] = [];
      if (needsSetFilters)
        pendingActions.push(
          `apply filters ${serialize({
            filters: options.filtersToSet,
            scopeFilter: options.scopeFilterToSet,
          })}`,
        );
      if (needsSelectThread) pendingActions.push(`select thread ${options.threadIdToSelect}`);
      throw new Error(
        `Could not get WebView Controller for comment list WebView ${commentListWebViewId} to ${pendingActions.join(
          ' and ',
        )}`,
      );
    }

    // setFilters BEFORE selectThread so the selection lands within the final filtered view rather
    // than being filtered out by a subsequent re-query.
    if (needsSetFilters)
      await commentListController.setFilters(options.filtersToSet, options.scopeFilterToSet);

    // Scroll to the specified thread in the comment list.
    if (options.threadIdToSelect)
      await commentListController.selectThread(options.threadIdToSelect);
  }

  return commentListWebViewId;
}

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.debug('Legacy comment manager is activating!');

  const commentListWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    commentListWebViewType,
    commentListWebViewProvider,
  );

  const commentListPanelWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    commentListPanelWebViewType,
    commentListPanelWebViewProvider,
  );

  const openCommentListPanelPromise = papi.commands.registerCommand(
    'legacyCommentManager.openCommentListPanel',
    openCommentListPanel,
    {
      method: {
        summary: 'Open or update the fixed Comment List panel in Column 3',
        params: [
          {
            name: 'projectId',
            required: false,
            summary: 'The project whose comments to display',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The webView ID of the panel',
          schema: { type: 'string' },
        },
      },
    },
  );

  const selectCommentThreadInPanelPromise = papi.commands.registerCommand(
    'legacyCommentManager.selectCommentThreadInPanel',
    selectCommentThreadInPanel,
    {
      method: {
        summary: 'Select a thread in the fixed Comment List panel in Column 3',
        params: [
          {
            name: 'threadId',
            required: true,
            summary: 'The ID of the thread to select and scroll to in the panel',
            schema: { type: 'string' },
          },
          {
            name: 'bringToFront',
            required: true,
            summary: "Whether to also bring the panel's tab to the front",
            schema: { type: 'boolean' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The webView ID of the panel',
          schema: { type: 'string' },
        },
      },
    },
  );

  const showCommentListPanelPromise = papi.commands.registerCommand(
    'legacyCommentManager.showCommentListPanel',
    showCommentListPanel,
    {
      method: {
        summary: 'Bring the Comments tab to the front, opening it if it is not open',
        params: [
          {
            name: 'editorWebViewId',
            required: false,
            summary: 'The scripture editor the request came from',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the Comments web view, or undefined if it could not be shown',
          schema: { type: 'string' },
        },
      },
    },
  );

  const openCommentListPromise = papi.commands.registerCommand(
    'legacyCommentManager.openCommentList',
    openCommentList,
    {
      method: {
        summary: 'Open Comment List',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'The ID of the WebView tied to the project that the comments are for',
            schema: { type: 'string' },
          },
          {
            name: 'options',
            required: false,
            summary: 'Additional options for opening the comment list WebView',
            schema: {
              $ref: '#/components/schemas/OpenCommentListWebViewOptions',
            },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the new comment list WebView',
          schema: { type: 'string' },
        },
      },
      components: {
        schemas: {
          OpenCommentListWebViewOptions: {
            type: 'object',
            properties: {
              threadIdToSelect: {
                type: 'string',
                description: 'ID of the thread to select and scroll to in the comment list',
              },
              projectId: {
                type: 'string',
                description:
                  'Project whose comments to show (overrides the webViewId-derived project)',
              },
              filtersToSet: {
                type: 'object',
                description:
                  'Comment-filter preset to pre-apply; an unspecified preset resets to all. Also ' +
                  'accepts the deprecated four-axis shape ({ resolved, read, type, assignment }) ' +
                  'for backward compatibility, mapped onto the closest matching preset (see ' +
                  'LegacyCommentFilters in the type declarations for the full mapping); a ' +
                  'combination with no counterpart resolves to all.',
                // The enum is derived from presetToLabelKey's keys, so it always matches the
                // CommentPreset union exactly. The deprecated axis properties (resolved/read/type/
                // assignment) are intentionally left undeclared here rather than hand-listed: this
                // object schema has no `additionalProperties: false`, so they already validate, and
                // documenting them in prose (above) avoids a second enum list to keep in sync.
                properties: {
                  preset: {
                    type: 'string',
                    enum: Object.keys(presetToLabelKey),
                  },
                },
              },
              scopeFilterToSet: {
                type: 'string',
                // The current values are derived from scopeFilterToLabelKey's keys, so they always
                // match the ScopeFilter union exactly. Unlike filtersToSet's object schema (which
                // has no additionalProperties: false and so accepts undeclared properties without
                // any schema change), a string enum has no such escape hatch — an unlisted value
                // fails schema validation even though resolveScopeFilter still accepts it. So the
                // deprecated 'unfiltered' value is appended explicitly to keep the published
                // OpenRPC contract honest about what the shim actually accepts.
                enum: [...Object.keys(scopeFilterToLabelKey), 'unfiltered'],
                description:
                  'Scope to pre-apply; omitting it resets scope to all-books. Also accepts the ' +
                  "deprecated 'unfiltered' value, which maps to all-books.",
              },
            },
          },
        },
      },
    },
  );

  // createCommentUsj command removed; commentsUsj PDPF provides createComment

  const commentsUsjPdpefPromise =
    papi.projectDataProviders.registerProjectDataProviderEngineFactory(
      LEGACY_COMMENT_USJ_PDPF_ID,
      LEGACY_COMMENT_USJ_PROJECT_INTERFACES,
      new LegacyCommentManagerUsjProjectDataProviderEngineFactory(LEGACY_COMMENT_USJ_PDPF_ID),
    );

  context.registrations.add(
    await commentListWebViewProviderPromise,
    await commentListPanelWebViewProviderPromise,
    await openCommentListPromise,
    await openCommentListPanelPromise,
    await selectCommentThreadInPanelPromise,
    await showCommentListPanelPromise,
    await commentsUsjPdpefPromise,
  );

  // Potentially helpful code if you need to see comments without the UI
  /*   setTimeout(async () => {
    logger.debug('GETTING COMMENTS');
    const commentPDP = await papi.projectDataProviders.get('legacyCommentManager.comments', '93fd8ea0de378f9d331cb798ef8039595524c161');
    const commentThreads = await commentPDP.getCommentThreads({ scriptureRanges: [
          {
            granularity: 'book',
            start: { book: "GEN", chapterNum: 0, verseNum: 0 },
            end: { book: "GEN", chapterNum: 50, verseNum: 26 },
          },
        ],});
    logger.debug(`COMMENTS! => ${JSON.stringify(commentThreads)}`);
  }, 20000); */

  logger.debug('Legacy comment manager is finished activating!');
}

export async function deactivate() {
  logger.debug('Legacy comment manager is deactivating!');
  return true;
}
