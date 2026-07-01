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
  OpenCommentListWebViewOptions,
  ScopeFilter,
} from 'legacy-comment-manager';
import { serialize } from 'platform-bible-utils';
import commentListWebView from './comment-list.web-view?inline';
import tailwindStyles from './tailwind.css?inline';
import { CommentListWebViewMessage } from './comment-list-messages.model';
import { SCOPE_FILTER_CURRENT_CHAPTER, UNFILTERED } from './comment-list-filters.model';
import {
  LEGACY_COMMENT_USJ_PDPF_ID,
  LegacyCommentManagerUsjProjectDataProviderEngineFactory,
} from './project-data-provider/legacy-comment-manager-usj-pdpef.model';
import { LEGACY_COMMENT_USJ_PROJECT_INTERFACES } from './project-data-provider/legacy-comment-manager-usj-pdpe.model';

const commentListWebViewType = 'legacyCommentManager.commentList';
const COMMENT_LIST_PANEL_WEBVIEW_TYPE = 'legacyCommentManager.commentListPanel';

// #region Comment List WebView

interface CommentListWebViewOptions extends OpenWebViewOptions {
  projectId: string | undefined;
  editorScrollGroupId: ScrollGroupScrRef | undefined;
  editorWebViewId: string | undefined;
  // One-shot initial filter/scope for a NEW view, seeded into web view state so the view mounts
  // already-filtered instead of relying on a post-open setFilters message (which could race the
  // view's message listener). Only set when creating a new view; undefined on reuse/restore.
  initialFilters: Partial<CommentFilters> | undefined;
  initialScopeFilter: ScopeFilter | undefined;
}

/** Map of projectId to comment list web view id for reusing existing web views */
const activeCommentListsByProject = new Map<string, string>();

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
        `${commentListWebViewType} provider received request to provide a ${savedWebView.webViewType} WebView`,
      );

    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    // Track this web view by project ID so we can reuse it later
    if (projectId) {
      activeCommentListsByProject.set(projectId, savedWebView.id);
    }

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
    // Single message channel for this controller, closing over the id/nonce so the two methods
    // can't drift on the plumbing.
    const postToWebView = (message: CommentListWebViewMessage) =>
      papi.webViewProviders.postMessageToWebView(webViewDefinition.id, webViewNonce, message);

    return {
      async selectThread(threadId: string): Promise<void> {
        logger.debug(
          `Comment List WebView Controller ${webViewDefinition.id} received request to selectThread ${threadId}`,
        );
        await postToWebView({ method: 'selectThread', threadId });
      },
      async setFilters(
        filters?: Partial<CommentFilters>,
        scopeFilter?: ScopeFilter,
      ): Promise<void> {
        logger.debug(
          `Comment List WebView Controller ${webViewDefinition.id} received setFilters ${serialize({ filters, scopeFilter })}`,
        );
        await postToWebView({ method: 'setFilters', filters, scopeFilter });
      },
      async dispose(): Promise<boolean> {
        return true;
      },
    };
  }
}

const commentListWebViewProvider: IWebViewProvider = new CommentListWebViewFactory();

// #endregion Comment List WebView

// #region Comment List Panel WebView (Column 3 fixed tab)

interface CommentListPanelOptions extends OpenWebViewOptions {
  projectId?: string;
}

/** Pending projectId consumed by commentListPanelProvider.getWebView() after reloadWebView() */
let currentCommentListPanelProjectId: string | undefined;

const commentListPanelProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    openWebViewOptions: CommentListPanelOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== COMMENT_LIST_PANEL_WEBVIEW_TYPE)
      throw new Error(
        `${COMMENT_LIST_PANEL_WEBVIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const projectId =
      currentCommentListPanelProjectId ?? openWebViewOptions.projectId ?? savedWebView.projectId;
    currentCommentListPanelProjectId = undefined;

    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_legacyCommentManager_commentList_title%',
    });

    return {
      ...savedWebView,
      title,
      projectId,
      content: commentListWebView,
      styles: tailwindStyles,
    };
  },
};

/**
 * Opens or updates the fixed Comment List Panel in Column 3 for the given project.
 *
 * This implements the `legacyCommentManager.openCommentListPanel` command. Called by
 * `openTextConnectionPanels` whenever the active project changes in Simple mode.
 *
 * @param projectId The project whose comments to display, or `undefined` to show an empty panel
 * @returns The webView ID of the panel, or `undefined` if opening failed
 */
async function openCommentListPanel(projectId: string | undefined): Promise<string | undefined> {
  const allOpenDefs = await papi.webViews.getAllOpenWebViewDefinitions();
  const existingPanel = allOpenDefs.find(
    (def) => def.webViewType === COMMENT_LIST_PANEL_WEBVIEW_TYPE,
  );

  if (existingPanel) {
    currentCommentListPanelProjectId = projectId;
    return papi.webViews.reloadWebView(COMMENT_LIST_PANEL_WEBVIEW_TYPE, existingPanel.id, {
      bringToFront: false,
    });
  }

  const openOptions: CommentListPanelOptions = { projectId };
  return papi.webViews.openWebView(COMMENT_LIST_PANEL_WEBVIEW_TYPE, { type: 'tab' }, openOptions);
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
  /** The ID of the comment list WebView that was opened or focused */
  let commentListWebViewId: string | undefined;

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
  const editorContextApplies = !options.projectId || options.projectId === triggerProjectId;
  const editorWebViewId = editorContextApplies ? webViewId : undefined;
  if (!editorContextApplies) editorScrollGroupId = undefined;

  // A cross-project target has no editor to derive "current chapter" from, so a current-chapter
  // scope would filter against a stale/blank ref. Fall back to all-books (UNFILTERED) in that case.
  // UNFILTERED rather than undefined keeps the new-view and reused-view paths consistent: on a reused
  // view it makes needsSetFilters true so an actual setFilters is sent (undefined would leave a
  // reused view stale while a new view mounted at all-books — the same call diverging by view state).
  let effectiveScopeFilterToSet = options.scopeFilterToSet;
  if (!editorContextApplies && effectiveScopeFilterToSet === SCOPE_FILTER_CURRENT_CHAPTER) {
    logger.warn(
      'openCommentList: dropping current-chapter scope for a cross-project target (no editor context); using all-books',
    );
    effectiveScopeFilterToSet = UNFILTERED;
  }

  if (!projectId) {
    logger.debug('No project!');
    return undefined;
  }

  // Check if there's already an open comment list for this project
  const existingWebViewId = activeCommentListsByProject.get(projectId);
  if (existingWebViewId) {
    logger.debug(`Found existing comment list for project ${projectId}: ${existingWebViewId}`);

    // Bring the existing web view to the front. Pass createNewIfNotFound: false so we can detect
    // when the webview is no longer in the dock layout (returns undefined in that case).
    const foundWebViewId = await papi.webViews.openWebView(
      commentListWebViewType,
      { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
      { existingId: existingWebViewId, bringToFront: true, createNewIfNotFound: false },
    );

    if (foundWebViewId) {
      commentListWebViewId = existingWebViewId;
    } else {
      // The previously cached webview is no longer in the dock layout (e.g., the layout was
      // reset). Clear the cache so the code below creates a fresh webview.
      logger.warn(
        `Comment list webview ${existingWebViewId} not found in layout for project ${projectId}; ` +
          `clearing cache and creating a new one`,
      );
      activeCommentListsByProject.delete(projectId);
    }
  }

  let createdNew = false;
  if (!commentListWebViewId) {
    // No existing comment list, so create a new one. The initial filters/scope are seeded into the
    // web view state so the view mounts already-filtered — no post-open setFilters is needed.
    createdNew = true;
    const webViewOptions: CommentListWebViewOptions = {
      projectId,
      editorScrollGroupId,
      editorWebViewId,
      initialFilters: options.filtersToSet,
      initialScopeFilter: effectiveScopeFilterToSet,
    };
    commentListWebViewId = await papi.webViews.openWebView(
      commentListWebViewType,
      { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
      webViewOptions,
    );
  }

  // Post-open controller actions. A newly-created view already has its filters seeded, so it only
  // needs a thread selection; a reused view needs setFilters to apply the requested view. Only fetch
  // the controller when there is actually something to send — so a filters-only open of a NEW view
  // skips it entirely and can't fail on a transient controller-lookup miss.
  const needsSetFilters =
    !createdNew && (!!options.filtersToSet || effectiveScopeFilterToSet !== undefined);
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
            scopeFilter: effectiveScopeFilterToSet,
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
      await commentListController.setFilters(options.filtersToSet, effectiveScopeFilterToSet);

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
    COMMENT_LIST_PANEL_WEBVIEW_TYPE,
    commentListPanelProvider,
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

  // Subscribe to web view updates to clean up tracking when comment list is closed
  const webViewUpdateUnsub = papi.webViews.onDidCloseWebView((event) => {
    // Check if this was one of our tracked comment lists
    activeCommentListsByProject.forEach((webViewId, projectIdKey) => {
      if (webViewId === event.webView.id) {
        activeCommentListsByProject.delete(projectIdKey);
        logger.debug(`Removed tracking for closed comment list: ${event.webView.id}`);
      }
    });
  });

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
                description: 'Comment-filter axes to pre-apply; unspecified axes reset to all',
                // These enums duplicate the axis unions (ResolvedFilter / ReadFilter / TypeFilter /
                // AssignmentFilter in legacy-comment-manager.d.ts). Keep them in sync by hand until a
                // codegen step derives this schema from the types.
                properties: {
                  resolved: { type: 'string', enum: ['all', 'unresolved', 'resolved'] },
                  read: { type: 'string', enum: ['all', 'unread', 'read'] },
                  type: { type: 'string', enum: ['all', 'conflicts', 'comments'] },
                  assignment: {
                    type: 'string',
                    enum: ['all', 'assigned-to-me', 'team', 'unassigned'],
                  },
                },
              },
              scopeFilterToSet: {
                type: 'string',
                enum: ['unfiltered', 'current-chapter'],
                description:
                  'Scope to pre-apply; omitting it resets scope to all-books (unfiltered)',
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
    await commentsUsjPdpefPromise,
    webViewUpdateUnsub,
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
