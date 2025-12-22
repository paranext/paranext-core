import papi, { logger, WebViewFactory } from '@papi/backend';
import type {
  ExecutionActivationContext,
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  ScrollGroupScrRef,
  WebViewDefinition,
} from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type {
  CommentListWebViewController,
  ExtractedCommentScriptureTextError,
  ExtractedCommentScriptureText,
} from 'legacy-comment-manager';
import {
  getErrorMessage,
  UsfmVerseRefVerseLocation,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjDocumentLocation,
  UsjMarkerLocation,
  UsjNodeAndDocumentLocation,
  UsjReaderWriter,
  UsjTextContentLocation,
} from 'platform-bible-utils';
import commentListWebView from './comment-list.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

const commentListWebViewType = 'legacyCommentManager.commentList';

/** Message types that can be sent to the Comment List web view */
type CommentListWebViewMessage = {
  method: 'scrollToThread';
  threadId: string;
};

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
      async scrollToThread(threadId: string): Promise<void> {
        logger.debug(
          `Comment List WebView Controller ${webViewDefinition.id} received request to scrollToThread ${threadId}`,
        );

        const message: CommentListWebViewMessage = {
          method: 'scrollToThread',
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

async function extractCommentScriptureText(
  projectId: string,
  start: UsjDocumentLocation,
  end: UsjDocumentLocation,
  verseRef: SerializedVerseRef,
): Promise<ExtractedCommentScriptureText | ExtractedCommentScriptureTextError> {
  try {
    logger.debug(`Extracting scripture text range for project ${projectId}`);

    // Step 1: Fetch USJ chapter data
    const usjChapterPdp = await papi.projectDataProviders.get(
      'platformScripture.USJ_Chapter',
      projectId,
    );
    const usjChapter = await usjChapterPdp.getChapterUSJ(verseRef);

    if (!usjChapter) {
      return {
        error: `No USJ data found for ${verseRef.book} ${verseRef.chapterNum}`,
        code: 'DATA_NOT_FOUND',
      };
    }

    // Step 2: Create UsjReaderWriter
    const usjRW = new UsjReaderWriter(usjChapter, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });

    // Step 3: Convert USJ locations to USFM locations
    const startUsfmLocation = usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(start);
    const endUsfmLocation = usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(end);

    // Step 4: Validate same verse
    if (
      // Is there a better way to compare verse refs?
      startUsfmLocation.verseRef.book !== endUsfmLocation.verseRef.book ||
      startUsfmLocation.verseRef.chapterNum !== endUsfmLocation.verseRef.chapterNum ||
      startUsfmLocation.verseRef.verseNum !== endUsfmLocation.verseRef.verseNum
    ) {
      return {
        error: 'Range spans multiple verses',
        code: 'MULTI_VERSE_RANGE',
      };
    }

    // Step 5: Find verse boundaries
    const verseStart: UsfmVerseRefVerseLocation = {
      verseRef: startUsfmLocation.verseRef,
      offset: 0,
    };

    // Convert verse start to USJ node location for finding next verse
    const verseStartUsj = usjRW.usfmVerseLocationToUsjNodeAndDocumentLocation(
      verseStart,
    ) as UsjNodeAndDocumentLocation<UsjMarkerLocation | UsjTextContentLocation>;

    // Find next verse marker to determine end of current verse
    const nextVerseNode = usjRW.findNextMatchingNode(
      verseStartUsj,
      (nodeAndLocation: UsjNodeAndDocumentLocation<UsjMarkerLocation | UsjTextContentLocation>) => {
        return (
          typeof nodeAndLocation.node === 'object' &&
          'type' in nodeAndLocation.node &&
          nodeAndLocation.node.type === 'verse' &&
          nodeAndLocation.node !== verseStartUsj.node
        );
      },
    );

    // Determine verse end location
    let verseEndUsfmLocation: UsfmVerseRefVerseLocation;
    if (nextVerseNode) {
      verseEndUsfmLocation = usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(
        nextVerseNode.documentLocation,
      );
    } else {
      // No next verse found, use end of chapter with large offset
      verseEndUsfmLocation = {
        verseRef: startUsfmLocation.verseRef,
        offset: 999999,
      };
    }

    // Step 6: Extract USFM text using indices
    const usfmText = usjRW.toUsfm();

    const verseStartIndex = usjRW.usfmVerseLocationToIndexInUsfm(verseStart);
    const verseEndIndex = usjRW.usfmVerseLocationToIndexInUsfm(verseEndUsfmLocation);
    const selectionStartIndex = usjRW.usfmVerseLocationToIndexInUsfm(startUsfmLocation);
    const selectionEndIndex = usjRW.usfmVerseLocationToIndexInUsfm(endUsfmLocation);

    // Extract and limit text snippets
    let verse = usfmText.substring(verseStartIndex, verseEndIndex);
    if (verse.length > 500) {
      verse = verse.substring(0, 500);
    }

    const selectedText = usfmText.substring(selectionStartIndex, selectionEndIndex);

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
      startPosition: startUsfmLocation.offset ?? 0,
    };
  } catch (error) {
    logger.error(`Error extracting scripture text range: ${getErrorMessage(error)}`);
    return {
      error: getErrorMessage(error),
      code: 'INVALID_LOCATION',
    };
  }
}

async function openCommentList(editorWebViewId: string | undefined): Promise<string | undefined> {
  let projectId: CommentListWebViewOptions['projectId'];
  let tabIdFromWebViewId: string | undefined;
  let editorScrollGroupId: CommentListWebViewOptions['editorScrollGroupId'];

  logger.debug('Opening comment list');

  if (editorWebViewId) {
    const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(editorWebViewId);
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

    return existingWebViewId;
  }

  // No existing comment list, create a new one
  const options: CommentListWebViewOptions = { projectId, editorScrollGroupId };
  const commentListWebViewId = await papi.webViews.openWebView(
    commentListWebViewType,
    { type: 'panel', direction: 'right', targetTabId: tabIdFromWebViewId },
    options,
  );

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
            summary: 'The ID of the web view tied to the project that the comments are for',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the new comment list web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const extractScriptureTextRangePromise = papi.commands.registerCommand(
    'legacyCommentManager.extractCommentScriptureText',
    extractCommentScriptureText,
    {
      method: {
        summary: 'Extract scripture text snippets from a range in a project',
        params: [
          {
            name: 'projectId',
            required: true,
            summary: 'The project ID to extract scripture from',
            schema: { type: 'string' },
          },
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
            name: 'verseRef',
            required: true,
            summary: 'Verse reference indicating which chapter contains this range',
            schema: { type: 'object' },
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
