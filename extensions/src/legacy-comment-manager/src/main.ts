import { Usj } from '@eten-tech-foundation/scripture-utilities';
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
  ExtractedCommentScriptureText,
  OpenCommentListWebViewOptions,
} from 'legacy-comment-manager';
import {
  getErrorMessage,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsfmVerseRefVerseLocation,
  UsjDocumentLocation,
  UsjReaderWriter,
} from 'platform-bible-utils';
import commentListWebView from './comment-list.web-view?inline';
import tailwindStyles from './tailwind.css?inline';
import { CommentListWebViewMessage } from './comment-list-messages.model';

const commentListWebViewType = 'legacyCommentManager.commentList';

/** Time in ms to wait for the comment list web view to load before scrolling to a thread */
const COMMENT_LIST_LOAD_DELAY_MS = 500;

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

/**
 * Get the USFM text snippets for a comment and its context based on the selected text range in a
 * USJ chapter
 *
 * @param selectedTextStart The start location of the selected text in the USJ document
 * @param selectedTextEnd The end location of the selected text in the USJ document
 * @param usjChapter The USJ chapter containing the selected text
 * @param bookId The book ID for the USJ chapter
 * @returns Information about the selection and its context that are used to create a comment
 */
async function extractCommentScriptureText(
  selectedTextStart: UsjDocumentLocation,
  selectedTextEnd: UsjDocumentLocation,
  usjChapter: Usj,
  bookId: string,
): Promise<ExtractedCommentScriptureText | undefined> {
  try {
    const usjRW = new UsjReaderWriter(usjChapter, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });

    // Get the verse ref and offset for the start and end of the selected text
    const selectedTextStartUsfmLocation = usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(
      selectedTextStart,
      bookId,
    );
    const selectedTextEndUsfmLocation = usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(
      selectedTextEnd,
      bookId,
    );

    // Find the start of the verse containing the selected text
    const verseStart: UsfmVerseRefVerseLocation = {
      verseRef: selectedTextStartUsfmLocation.verseRef,
      offset: 0,
    };

    // Find the next verse marker (any verse) after the selection end to determine end of current
    // verse context
    const selectedTextEndUsjNodeAndDocumentLocation = usjRW.jsonPathToUsjNodeAndDocumentLocation(
      selectedTextEnd.jsonPath,
    );
    const nextVerseNodeAndDoc = usjRW.findNextMatchingNode(
      selectedTextEndUsjNodeAndDocumentLocation,
      ({ node }) => {
        return typeof node === 'object' && node.type === 'verse';
      },
    );

    // Find the end of the verse containing the selected text
    let verseEnd: UsfmVerseRefVerseLocation;
    if (nextVerseNodeAndDoc?.documentLocation) {
      // There is a verse after this verse - use its start as the end of the current verse
      verseEnd = usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(
        nextVerseNodeAndDoc.documentLocation,
        bookId,
      );
    } else {
      // No next verse found - use end of USFM content
      const usfmLength = usjRW.toUsfm().length;
      verseEnd = {
        verseRef: selectedTextEndUsfmLocation.verseRef,
        offset:
          // Get the length of the rest of the USFM after the verse start
          usfmLength - usjRW.usfmVerseLocationToIndexInUsfm(selectedTextEndUsfmLocation.verseRef),
      };
    }

    // Get the USFM indices for the verse and selection so we can extract the USFM text for them
    const verseStartIndex = usjRW.usfmVerseLocationToIndexInUsfm(verseStart);
    const verseEndIndex = usjRW.usfmVerseLocationToIndexInUsfm(verseEnd);
    const selectionStartIndex = usjRW.usfmVerseLocationToIndexInUsfm(selectedTextStartUsfmLocation);
    const selectionEndIndex = usjRW.usfmVerseLocationToIndexInUsfm(selectedTextEndUsfmLocation);

    const usfmText = usjRW.toUsfm();

    // Pull the verse text out from the USFM
    let verse = usfmText.substring(verseStartIndex, verseEndIndex);
    if (verse.length > 500) {
      verse = verse.substring(0, 500);
    }

    // Pull the selected text out from the USFM
    const selectedText = usfmText.substring(selectionStartIndex, selectionEndIndex);

    // Pull context before and after the selected text, limiting to 50 characters each
    let contextBefore = usfmText.substring(verseStartIndex, selectionStartIndex);
    if (contextBefore.length > 50) {
      contextBefore = contextBefore.substring(contextBefore.length - 50);
    }

    let contextAfter = usfmText.substring(selectionEndIndex, verseEndIndex);
    if (contextAfter.length > 50) {
      contextAfter = contextAfter.substring(0, 50);
    }

    return {
      verse,
      selectedText,
      contextBefore,
      contextAfter,
      startPosition: selectedTextStartUsfmLocation.offset ?? 0,
    };
  } catch (error) {
    logger.error(`Error extracting scripture text range: ${getErrorMessage(error)}`);
    throw error;
  }
}

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
    // Wait for the comment list to load before scrolling. This can be removed if we properly buffer
    // messages to WebView controllers and WebViews that aren't loaded yet.
    await new Promise<void>((resolve) => {
      setTimeout(resolve, COMMENT_LIST_LOAD_DELAY_MS);
    });

    // Get the comment list controller and select the thread
    const commentListController = await papi.webViews.getWebViewController(
      commentListWebViewType,
      commentListWebViewId,
    );
    if (commentListController) {
      await commentListController.selectThread(options.threadIdToSelect);
    } else
      throw new Error(
        `Could not get WebView Controller for comment list WebView ${commentListWebViewId} to scroll to thread ${options.threadIdToSelect}`,
      );
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

  const extractScriptureTextRangePromise = papi.commands.registerCommand(
    'legacyCommentManager.extractCommentScriptureText',
    extractCommentScriptureText,
    {
      method: {
        summary: 'Extract scripture text snippets from a range in a chapter',
        params: [
          {
            name: 'start',
            required: true,
            summary: 'Start location of the range in USJ document space',
            schema: { type: 'object' },
          },
          {
            name: 'end',
            required: true,
            summary: 'End location of the range in USJ document space',
            schema: { type: 'object' },
          },
          {
            name: 'usjChapter',
            required: true,
            summary: 'USJ document containing the chapter to extract text from',
            schema: { type: 'object' },
          },
          {
            name: 'bookId',
            required: true,
            summary: 'Book ID (e.g., "GEN") for the chapter being processed',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'Extracted scripture text snippets or error object',
          schema: { type: 'object' },
        },
      },
    },
  );

  context.registrations.add(
    await commentListWebViewProviderPromise,
    await openCommentListPromise,
    await extractScriptureTextRangePromise,
    webViewUpdateUnsub,
  );

  /* Potentially helpful code if you need to see comments without the UI
  setTimeout(async () => {
    logger.debug('GETTING COMMENTS');
    const commentPDP = await papi.projectDataProviders.get('legacyCommentManager.Comments', '93fd8ea0de378f9d331cb798ef8039595524c161');
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
