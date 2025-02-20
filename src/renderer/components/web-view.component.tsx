import { useCallback, useEffect, useMemo, useRef } from 'react';
import { WebViewContentType, WebViewDefinition } from '@shared/models/web-view.model';
import { SavedTabInfo, TabInfo, WebViewTabProps } from '@shared/models/docking-framework.model';
import {
  convertWebViewDefinitionToSaved,
  openWebView,
  saveTabInfoBase,
  IFRAME_SANDBOX_ALLOW_SAME_ORIGIN,
  IFRAME_SANDBOX_ALLOW_SCRIPTS,
  WEBVIEW_IFRAME_SRC_SANDBOX,
  WEBVIEW_IFRAME_SRCDOC_SANDBOX,
  IFRAME_SANDBOX_ALLOW_POPUPS,
  updateWebViewDefinitionSync,
  isWebViewNonceCorrect,
} from '@renderer/services/web-view.service-host';
import logger from '@shared/services/logger.service';
import {
  PromiseChainingMap,
  UnsubscriberAsync,
  formatReplacementString,
  isLocalizeKey,
  serialize,
  getLocalizeKeysForScrollGroupIds,
} from 'platform-bible-utils';
import { BookChapterControl, ScrollGroupSelector, useEvent } from 'platform-bible-react';
import './web-view.component.css';
import {
  useLocalizedStrings,
  useProjectSetting,
  useScrollGroupScrRef,
} from '@renderer/hooks/papi-hooks';
import { availableScrollGroupIds } from '@renderer/services/scroll-group.service-host';
import { getNetworkEvent, registerRequestHandler } from '@shared/services/network.service';
import {
  getWebViewMessageRequestType,
  WebViewMessageRequestHandler,
} from '@shared/services/web-view.service-model';
import { Canon } from '@node_modules/@sillsdev/scripture/dist';

export const TAB_TYPE_WEBVIEW = 'webView';

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIds);

const registrationPromises = new PromiseChainingMap<string>(logger);

/**
 * Tell the web view service to load the web view with the provided information. Used to retrieve
 * web view content and to reload the web view when the extension service reloads
 *
 * @param data Web view definition to load
 */
async function retrieveWebViewContent(webViewType: string, id: string): Promise<void> {
  const loadedId = await openWebView(webViewType, undefined, {
    existingId: id,
    createNewIfNotFound: false,
  });
  if (loadedId !== id)
    logger.error(`WebView with type ${webViewType} and id ${id} loaded into id ${loadedId}!`);
}

export default function WebView({
  id,
  webViewType,
  content,
  title,
  contentType,
  allowScripts,
  allowSameOrigin,
  allowPopups,
  scrollGroupScrRef,
  projectId,
}: WebViewTabProps) {
  // React starts refs as null
  // eslint-disable-next-line no-null/no-null
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const postMessageCallback = useCallback(
    ([webViewNonce, message, targetOrigin]: Parameters<WebViewMessageRequestHandler>) => {
      if (!isWebViewNonceCorrect(id, webViewNonce))
        throw new Error(
          `Web View Component ${id} (type ${webViewType}) received a message with an invalid nonce!`,
        );
      if (!iframeRef.current)
        throw new Error(
          `Web View Component ${id} (type ${webViewType}) received a message but could not route it to the iframe because its ref was not set!`,
        );
      if (!iframeRef.current.contentWindow)
        throw new Error(
          `Web View Component ${id} (type ${webViewType}) received a message but could not route it to the iframe because its contentWindow was falsy!`,
        );

      iframeRef.current.contentWindow.postMessage(message, { targetOrigin });
    },
    [id, webViewType],
  );

  type UnsubscriberContainer = { unsub: UnsubscriberAsync | undefined };

  useEffect(() => {
    let cleanupHasRun = false;

    async function registerRequestHandlerAsync(unsubContainer: UnsubscriberContainer) {
      if (cleanupHasRun) return;
      const unsub = await registerRequestHandler(
        getWebViewMessageRequestType(id),
        (...args: Parameters<WebViewMessageRequestHandler>) => postMessageCallback(args),
        {
          method: {
            summary: `Post a message to a WebView with id "${id}". Expected to be used only by the Web View Provider that created the web view or the Web View Controller that represents the web view created by the Web View Provider.`,
            params: [
              {
                name: 'webViewNonce',
                required: true,
                summary: 'A nonce to ensure that the message is coming from the correct source',
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'message',
                required: true,
                summary: 'The message to send to the WebView',
                schema: {
                  type: 'string',
                },
              },
              {
                name: 'targetOrigin',
                required: false,
                summary:
                  'Expected origin of the web view. Does not send the message if the web view origin does not match. See https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#targetorigin for more information. Defaults to same origin only (works automatically with React and HTML web views)',
                schema: {
                  type: 'string',
                },
              },
            ],
            result: {
              name: 'return value',
              schema: {
                type: 'null',
              },
            },
          },
        },
      );

      // Save the unsubscribe function so that the cleanup function can run it later
      if (!cleanupHasRun) unsubContainer.unsub = unsub;
      // If the cleanup function has run already, run the unsubscribe function now
      else await unsub();
    }

    const unsubContainer: UnsubscriberContainer = { unsub: undefined };
    registrationPromises.addPromiseFunction(id, () => registerRequestHandlerAsync(unsubContainer));

    return () => {
      registrationPromises.addPromiseFunction(id, async () => {
        cleanupHasRun = true;
        await unsubContainer.unsub?.();
      });
    };
  }, [id, postMessageCallback]);

  useEvent(
    getNetworkEvent('platform.onDidReloadExtensions'),
    useCallback(async () => {
      try {
        await retrieveWebViewContent(webViewType, id);
      } catch (e) {
        logger.error(
          `web-view.component failed to reload web view content for webViewType ${webViewType} id ${id} when extensions reloaded: ${e}`,
        );
      }
    }, [webViewType, id]),
  );

  const webViewKey = '%webView_defaultTitle_webView%';
  const webViewTitleTypeFormatStr = '%webView_title_type_formatString%';
  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () =>
        title && isLocalizeKey(title)
          ? [title, webViewTitleTypeFormatStr]
          : [webViewKey, webViewTitleTypeFormatStr],
      [title],
    ),
  );
  const localizedWebViewTitleFormatStr = localizedStrings[webViewTitleTypeFormatStr];
  const defaultTitle =
    title ??
    formatReplacementString(localizedWebViewTitleFormatStr, {
      type: webViewType || contentType,
      defaultTitle: localizedStrings[webViewKey],
    });
  const localizedTitle = title && isLocalizeKey(title) ? localizedStrings[title] : defaultTitle;

  /** Whether this webview's iframe will be populated by `src` as opposed to `srcdoc` */
  const shouldUseSrc = contentType === WebViewContentType.URL;

  // TODO: We may be catching iframe exceptions moving forward by posting messages from the child
  // iframe to the parent, so it might be good to figure out how it works to add and remove a
  // handler of some sort. Maybe the post message handler can more easily handle this kind of
  // situation, though. We just don't want to leak memory by leaving an event handler on an iframe
  // when it gets removed (if that does leak memory).

  const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useScrollGroupScrRef(
    scrollGroupScrRef,
    useCallback(
      (newScrollGroupScrRef) =>
        updateWebViewDefinitionSync(id, { scrollGroupScrRef: newScrollGroupScrRef }),
      [id],
    ),
  );

  const [scrollGroupLocalizedStrings] = useLocalizedStrings(scrollGroupLocalizedStringKeys);

  const [booksPresent] = useProjectSetting(projectId, 'platformScripture.booksPresent', '');

  const activeBookNums = useMemo(
    () =>
      booksPresent
        ? Array.from(booksPresent).reduce((ids: number[], char, index) => {
            if (char === '1') {
              ids.push(index + 1);
            }
            return ids;
          }, [])
        : undefined,
    [booksPresent], // Dependency array: recompute only if booksPresent changes
  );

  return (
    <div className="web-view-parent">
      <div className="web-view-tab-nav">
        <BookChapterControl
          scrRef={scrRef}
          handleSubmit={setScrRef}
          activeBookIds={activeBookNums?.map((n) => Canon.bookNumberToId(n))}
        />
        <ScrollGroupSelector
          availableScrollGroupIds={availableScrollGroupIds}
          scrollGroupId={scrollGroupId}
          onChangeScrollGroupId={setScrollGroupId}
          localizedStrings={scrollGroupLocalizedStrings}
        />
      </div>
      <iframe
        className="web-view"
        ref={iframeRef}
        title={localizedTitle}
        /**
         * Sandbox attribute for the webview - controls what resources scripts and other things can
         * access. See `ALLOWED_IFRAME_SRC_SANDBOX_VALUES` in `web-view.service.ts` for more info.
         *
         * Note that this does NOT change after the iframe is first added to the dom. We are relying
         * on the `MutationObserver` in `web-view.service.ts` to catch if an extension tries to
         * change its WebViewContentType and src/srcdoc to some combination that is forbidden
         * (unless changing src or srcdoc re-adds the iframe to the dom, in which case it is fine)
         *
         * TODO: test this sometime to see what happens
         *
         * DO NOT CHANGE THIS WITHOUT A SERIOUS REASON
         */
        sandbox={`${shouldUseSrc ? WEBVIEW_IFRAME_SRC_SANDBOX : WEBVIEW_IFRAME_SRCDOC_SANDBOX}${
          allowSameOrigin ? ` ${IFRAME_SANDBOX_ALLOW_SAME_ORIGIN}` : ''
        }${allowScripts ? ` ${IFRAME_SANDBOX_ALLOW_SCRIPTS}` : ''}${allowPopups ? ` ${IFRAME_SANDBOX_ALLOW_POPUPS}` : ''}`}
        // TODO: csp?
        // TODO: credentialless?
        // TODO: referrerpolicy?
        src={shouldUseSrc ? content : undefined}
        srcDoc={shouldUseSrc ? undefined : content}
        // Allow WebViews to go fullscreen because why not (fullscreen YouTube video of Psalms LBL)
        allow="fullscreen;"
      />
    </div>
  );
}

export function updateWebViewTab(savedTabInfo: SavedTabInfo, data: WebViewDefinition): TabInfo {
  return {
    ...savedTabInfo,
    data,
    tabIconUrl: data.iconUrl,
    tabTitle: data.title ?? '%tab_title_unknown%',
    tabTooltip: data.tooltip ?? '',
    content: <WebView {...data} />,
  };
}

export function loadWebViewTab(savedTabInfo: SavedTabInfo): TabInfo {
  if (!savedTabInfo.id) throw new Error('"id" is missing.');

  let data: WebViewTabProps;
  if (savedTabInfo.data) {
    // We need to make sure that the data is of the correct type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    data = savedTabInfo.data as WebViewTabProps;

    if (savedTabInfo.id !== data.id) throw new Error('"id" does not match webView id.');
    if (!data.webViewType) throw new Error('WebView does not have a webViewType. Cannot restore');

    // If the webview is saved aka doesn't have content, tell the web view service to load the web
    // view. It will asynchronously go get the content and re-run this function
    if (!data.content && data.content !== '') {
      (async () => {
        try {
          await retrieveWebViewContent(data.webViewType, data.id);
        } catch (e) {
          logger.error(
            `web-view.component failed to retrieve web view content for ${serialize(
              savedTabInfo,
            )}: ${e}`,
          );
        }
      })();
    }
  } else {
    // placeholder data
    data = {
      id: savedTabInfo.id,
      webViewType: 'Unknown',
      title: '%tab_title_unknown%',
      content: '',
      contentType: WebViewContentType.HTML,
    };
  }

  return updateWebViewTab(savedTabInfo, data);
}

export function saveWebViewTab(tabInfo: TabInfo): SavedTabInfo {
  return {
    ...saveTabInfoBase(tabInfo),
    // Assert what the unknown `data` type is.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    data: convertWebViewDefinitionToSaved(tabInfo.data as WebViewDefinition),
  };
}
