import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WEB_VIEW_CONTENT_TYPE, WebViewDefinition } from '@shared/models/web-view.model';
import { SavedTabInfo, TabInfo, WebViewTabProps } from '@shared/models/docking-framework.model';
import {
  convertWebViewDefinitionToSaved,
  saveTabInfoBase,
  IFRAME_SANDBOX_ALLOW_SAME_ORIGIN,
  IFRAME_SANDBOX_ALLOW_SCRIPTS,
  WEBVIEW_IFRAME_SRC_SANDBOX,
  WEBVIEW_IFRAME_SRCDOC_SANDBOX,
  IFRAME_SANDBOX_ALLOW_POPUPS,
  updateWebViewDefinitionSync,
  isWebViewNonceCorrect,
  reloadWebView,
  updateTabPartialSync,
} from '@renderer/services/web-view.service-host';
import { logger } from '@shared/services/logger.service';
import {
  PromiseChainingMap,
  UnsubscriberAsync,
  formatReplacementString,
  isLocalizeKey,
  serialize,
  getLocalizeKeysForScrollGroupIds,
  isPlatformError,
  getErrorMessage,
} from 'platform-bible-utils';
import {
  BookChapterControl,
  SelectMenuItemHandler,
  ScrollGroupSelector,
  TabToolbar,
  useEvent,
} from 'platform-bible-react';
import './web-view.component.css';
import {
  useData,
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
import { Canon } from '@sillsdev/scripture';
import { handleMenuCommand } from '@shared/data/platform-bible-menu.commands';
import { menuDataService } from '@shared/services/menu-data.service';
import { windowService } from '@shared/services/window.service';

export const TAB_TYPE_WEBVIEW = 'webView';

const BOOKS_PRESENT_DEFAULT = '';

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIds);

const registrationPromises = new PromiseChainingMap<string>(logger);

const CROSS_ORIGIN_REMOVE_EVENT_LISTENER_ERROR_REGEX =
  /Failed to read a named property 'removeEventListener' from 'Window': Blocked a frame with origin ".+" from accessing a cross-origin frame./;

/**
 * Tell the web view service to load the web view with the provided information. Used to retrieve
 * web view content and to reload the web view when the extension service reloads
 *
 * @param data Web view definition to load
 */
async function retrieveWebViewContent(webViewType: string, id: string): Promise<void> {
  const loadedId = await reloadWebView(webViewType, id, {
    bringToFront: false,
  });

  if (!loadedId)
    throw new Error(
      `WebView with type ${webViewType} and id ${id} returned undefined when reloading!`,
    );

  if (loadedId !== id)
    logger.error(`WebView with type ${webViewType} and id ${id} loaded into id ${loadedId}!`);
}

export function WebView({
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
  shouldShowToolbar,
}: WebViewTabProps) {
  // React starts refs as null
  // eslint-disable-next-line no-null/no-null
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // Tracks how many times the iframe has loaded
  const [iframeHasLoadedTimes, setIframeHasLoadedTimes] = useState(0);

  // Store reference to iframe's cleanup function so we can call it before iframe loses contentWindow
  const unmountRootFunctionRef = useRef<(() => void) | undefined>(undefined);

  // Extract and store cleanup function when iframe loads
  useEffect(() => {
    const currentIframe = iframeRef.current;
    if (!currentIframe) return;

    const extractCleanupFunction = () => {
      try {
        // Align with WebViewCleanup from globalThis
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const contentWindowWithCleanup = currentIframe.contentWindow as Window & {
          webViewCleanup?: typeof globalThis.webViewCleanup;
        };

        if (contentWindowWithCleanup?.webViewCleanup?.unmountRoot)
          unmountRootFunctionRef.current = contentWindowWithCleanup.webViewCleanup.unmountRoot;
      } catch (error) {
        // While closing the WebView, we log a warning if the cleanup function is missing
        // If we log these errors when capturing, it causes noise during startup that isn't important since we try capturing multiple times
      }
    };

    // Try to extract immediately in case iframe is already loaded
    extractCleanupFunction();

    // Also try shortly after the iframe loads to give time for the iframe's React app to initialize
    const handleLoad = () => {
      setTimeout(extractCleanupFunction, 200);
    };

    currentIframe.addEventListener('load', handleLoad);

    return () => {
      currentIframe.removeEventListener('load', handleLoad);
    };
  }, [id, content]); // Re-run when content changes

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

  const handleLoadIframe = useCallback(() => {
    // Increment the tracker for the number of times the iframe has loaded
    setIframeHasLoadedTimes((prev) => prev + 1);
  }, []);

  // Keep track of focus in the iframe
  useEffect(() => {
    // The iframe doesn't have contentWindow yet on first render. But we want to attach the focusin
    // listener every time a new iframe loads after that
    if (iframeHasLoadedTimes < 1) return;

    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    // Focus this WebView when it is loaded - focusing tab on mount in `platform-panel.component.tsx`
    // doesn't always work perfectly with WebViews, so we also focus them here
    (async () => {
      try {
        await windowService.setFocus({
          focusType: 'tab',
          id,
        });
      } catch (e) {
        logger.warn(
          `web-view.component on load failed to set focus on cross-origin webView ${id}: ${getErrorMessage(e)}`,
        );
      }
    })();

    // Cross-origin iframes don't have contentDocument, and their focus works just fine without tracking
    // the active element in the iframe. No need to do more
    if (!iframe.contentDocument) return;

    // In the context of same-origin iframes, focusin seems to be the only event that gives us the
    // information we need. focusin tells us the last focused element other than body.
    // Unfortunately, it does not trigger on body, so we can't tell if the user is actually trying to
    // focus the body. Clicking the body only triggers focusout, and it looks exactly
    // the same as when the user clicks outside the iframe, so we can't use that to detect
    // focusing the body.
    function handleFocusIn(event: FocusEvent) {
      // This seems to be the correct type. Not sure why it is just EventTarget without the assertion
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      updateTabPartialSync(id, { lastFocusedElement: (event.target as HTMLElement) ?? undefined });
    }

    iframe.contentWindow.addEventListener('focusin', handleFocusIn);

    return () => {
      // It seems React gets rid of contentWindow faster than we can unregister the event listener,
      // but this doesn't seem to be a problem. Seems it automatically cleans it up
      if (!iframe.contentWindow) return;

      try {
        // For some reason, when hot reloading, React doesn't get rid of contentWindow before this
        // runs, but the iframe get counted as cross-origin all of a sudden but still has all its properties
        iframe.contentWindow.removeEventListener('focusin', handleFocusIn);
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        if (!CROSS_ORIGIN_REMOVE_EVENT_LISTENER_ERROR_REGEX.test(errorMessage)) throw e;
        logger.debug(
          `web-view.component: Tried to remove focusin event listener from iframe with id ${id} but it threw a cross-origin error ${errorMessage}. This is expected when hot reloading but not otherwise. If you see this other than when hot reloading, please investigate.`,
        );
      }
    };
  }, [iframeHasLoadedTimes, id]);

  useEvent(
    getNetworkEvent('platform.onDidReloadExtensions'),
    useCallback(async () => {
      try {
        await retrieveWebViewContent(webViewType, id);
      } catch (e) {
        logger.error(
          `web-view.component failed to reload web view content for webViewType ${webViewType} id ${id} when extensions reloaded: ${getErrorMessage(e)}`,
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
  const shouldUseSrc = contentType === WEB_VIEW_CONTENT_TYPE.URL;

  // Clean up iframe content on unmount to prevent memory leaks
  // When React removes the WebView component from the DOM, the iframe's srcDoc
  // content can remain in memory. This effect ensures that we explicitly clear
  // the content when the component unmounts to prevent memory leaks.
  useEffect(() => {
    // Capture the current iframe reference to use in cleanup
    const currentIframe = iframeRef.current;

    return () => {
      if (!currentIframe) {
        logger.warn(`WebView ${id} iframe reference was not available during cleanup`);
        return;
      }

      // Cleanly unmount any React root using the stored cleanup function
      if (!unmountRootFunctionRef.current) {
        logger.warn(`No cleanup function available for WebView ${id}`);
      } else {
        // Use setTimeout to avoid synchronous unmount during React rendering
        setTimeout(() => {
          try {
            if (!unmountRootFunctionRef.current) {
              logger.warn(`No cleanup function available for WebView ${id}`);
            } else {
              unmountRootFunctionRef.current();
              logger.debug(`Successfully unmounted React root for WebView ${id}`);
            }
          } catch (error) {
            logger.warn(`Failed unmount React root for WebView ${id}: ${getErrorMessage(error)}`);
          }
          unmountRootFunctionRef.current = undefined;
        }, 0);
      }
    };
  }, [id]);

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

  const [booksPresentPossiblyError] = useProjectSetting(
    projectId,
    'platformScripture.booksPresent',
    BOOKS_PRESENT_DEFAULT,
  );

  const booksPresent = useMemo(() => {
    if (isPlatformError(booksPresentPossiblyError)) {
      logger.warn(`Error getting books present: ${getErrorMessage(booksPresentPossiblyError)}`);
      return BOOKS_PRESENT_DEFAULT;
    }
    return booksPresentPossiblyError;
  }, [booksPresentPossiblyError]);

  const fetchActiveBooks = () => {
    return Array.from(booksPresent).reduce((ids: string[], char, index) => {
      if (char === '1') {
        ids.push(Canon.bookNumberToId(index + 1));
      }

      return ids;
    }, []);
  };

  const projectMenuCommandHandler = useCallback<SelectMenuItemHandler>(
    (projectMenuCommand) => {
      handleMenuCommand(projectMenuCommand, id);
    },
    [id],
  );

  const viewInfoMenuCommandHandler = useCallback<SelectMenuItemHandler>(
    (viewInfoMenuCommand) => {
      handleMenuCommand(viewInfoMenuCommand, id);
    },
    [id],
  );

  // Assume the webViewType is correctly formatted because it should have already been checked
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const menuSelector = (webViewType as `${string}.${string}`) ?? 'invalid.invalid';
  const menuInfo = useData(webViewType ? menuDataService.dataProviderName : undefined).WebViewMenu(
    menuSelector,
    {
      topMenu: undefined,
      includeDefaults: true,
      contextMenu: undefined,
    },
  );

  const [webViewMenu, , isLoading] = menuInfo;

  return (
    <div className="web-view-parent">
      {shouldShowToolbar && !isLoading && !isPlatformError(webViewMenu) && (
        <TabToolbar
          onSelectProjectMenuItem={projectMenuCommandHandler}
          onSelectViewInfoMenuItem={viewInfoMenuCommandHandler}
          projectMenuData={webViewMenu.topMenu}
          className="web-view-tab-nav"
          startAreaChildren={
            <BookChapterControl
              scrRef={scrRef}
              handleSubmit={setScrRef}
              getActiveBookIds={booksPresent ? fetchActiveBooks : undefined}
            />
          }
          endAreaChildren={
            <ScrollGroupSelector
              availableScrollGroupIds={availableScrollGroupIds}
              scrollGroupId={scrollGroupId}
              onChangeScrollGroupId={setScrollGroupId}
              localizedStrings={scrollGroupLocalizedStrings}
            />
          }
        />
      )}
      <iframe
        data-web-view-id={id}
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
        onLoad={handleLoadIframe}
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
            )}: ${getErrorMessage(e)}`,
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
      contentType: WEB_VIEW_CONTENT_TYPE.HTML,
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

export default WebView;
