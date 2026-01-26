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
  CommentListWebViewController,
  OpenCommentListWebViewOptions,
} from 'legacy-comment-manager';
import commentListWebView from './comment-list.web-view?inline';
import tailwindStyles from './tailwind.css?inline';
import { CommentListWebViewMessage } from './comment-list-messages.model';
import {
  LEGACY_COMMENT_USJ_PDPF_ID,
  LegacyCommentManagerUsjProjectDataProviderEngineFactory,
} from './project-data-provider/legacy-comment-manager-usj-pdpef.model';
import { LEGACY_COMMENT_USJ_PROJECT_INTERFACES } from './project-data-provider/legacy-comment-manager-usj-pdpe.model';

const commentListWebViewType = 'legacyCommentManager.commentList';

// #region Comment List WebView

interface CommentListWebViewOptions extends OpenWebViewOptions {
  projectId: string | undefined;
  editorScrollGroupId: ScrollGroupScrRef | undefined;
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

    const baseTitle = await papi.localization.getLocalizedString({
      localizeKey: '%webView_legacyCommentManager_commentList_title%',
    });

    const title = projectId
      ? `${baseTitle}: ${
          (await (
            await papi.projectDataProviders.get('platform.base', projectId)
          ).getSetting('platform.name')) ?? projectId
        }`
      : baseTitle;

    return {
      ...savedWebView,
      title,
      projectId,
      content: commentListWebView,
      styles: tailwindStyles,
      shouldShowToolbar: true,
      scrollGroupScrRef: getWebViewOptions.editorScrollGroupId,
    };
  }

  override async createWebViewController(
    webViewDefinition: WebViewDefinition,
    webViewNonce: string,
  ): Promise<CommentListWebViewController> {
    return {
      async selectThread(threadId: string): Promise<void> {
        logger.debug(
          `Comment List WebView Controller ${webViewDefinition.id} received request to selectThread ${threadId}`,
        );

        const message: CommentListWebViewMessage = {
          method: 'selectThread',
          threadId,
        };
        await papi.webViewProviders.postMessageToWebView(
          webViewDefinition.id,
          webViewNonce,
          message,
        );
      },
      async dispose(): Promise<boolean> {
        return true;
      },
    };
  }
}

const commentListWebViewProvider: IWebViewProvider = new CommentListWebViewFactory();

// #endregion Comment List WebView

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
  let projectId: CommentListWebViewOptions['projectId'];
  let tabIdFromWebViewId: string | undefined;
  let editorScrollGroupId: CommentListWebViewOptions['editorScrollGroupId'];
  /** The ID of the comment list WebView that was opened or focused */
  let commentListWebViewId: string | undefined;

  logger.debug('Opening comment list');

  if (webViewId) {
    const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
    projectId = webViewDefinition?.projectId;
    tabIdFromWebViewId = webViewDefinition?.id;
    editorScrollGroupId = webViewDefinition?.scrollGroupScrRef;
  }

  if (!projectId) {
    logger.debug('No project!');
    return undefined;
  }

  // Check if there's already an open comment list for this project
  const existingWebViewId = activeCommentListsByProject.get(projectId);
  if (existingWebViewId) {
    logger.debug(`Found existing comment list for project ${projectId}: ${existingWebViewId}`);

    // Bring the existing web view to the front
    await papi.webViews.openWebView(
      commentListWebViewType,
      { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
      { existingId: existingWebViewId, bringToFront: true, createNewIfNotFound: false },
    );

    commentListWebViewId = existingWebViewId;
  }

  if (!commentListWebViewId) {
    // No existing comment list, so create a new one
    const webViewOptions: CommentListWebViewOptions = { projectId, editorScrollGroupId };
    commentListWebViewId = await papi.webViews.openWebView(
      commentListWebViewType,
      { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
      webViewOptions,
    );
  }

  // Scroll to the specified thread in the comment list
  if (commentListWebViewId && options.threadIdToSelect) {
    // Get the comment list controller and select the thread
    const commentListController = await papi.webViews.getWebViewController(
      commentListWebViewType,
      commentListWebViewId,
    );
    if (commentListController) {
      await commentListController.selectThread(options.threadIdToSelect);
    } else {
      throw new Error(
        `Could not get WebView Controller for comment list WebView ${commentListWebViewId} to scroll to thread ${options.threadIdToSelect}`,
      );
    }
  }

  return commentListWebViewId;
}

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.debug('Legacy comment manager is activating!');

  const commentListWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    commentListWebViewType,
    commentListWebViewProvider,
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
    await openCommentListPromise,
    await commentsUsjPdpefPromise,
    webViewUpdateUnsub,
  );

  /* Potentially helpful code if you need to see comments without the UI
  setTimeout(async () => {
    logger.debug('GETTING COMMENTS');
    const commentPDP = await papi.projectDataProviders.get('legacyCommentManager.comments', '93fd8ea0de378f9d331cb798ef8039595524c161');
    const comments = await commentPDP.getComments({ bookId: 'GEN' });
    logger.debug(`COMMENTS! => ${JSON.stringify(comments)}`);
  }, 20000);
*/

  logger.debug('Legacy comment manager is finished activating!');
}

export async function deactivate() {
  logger.debug('Legacy comment manager is deactivating!');
  return true;
}
