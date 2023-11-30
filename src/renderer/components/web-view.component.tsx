import { useRef } from 'react';
import {
  WebViewContentType,
  WebViewDefinition,
  SavedWebViewDefinition,
} from '@shared/models/web-view.model';
import { SavedTabInfo, TabInfo, WebViewTabProps } from '@shared/models/docking-framework.model';
import {
  convertWebViewDefinitionToSaved,
  getWebView,
  saveTabInfoBase,
  IFRAME_SANDBOX_ALLOW_SAME_ORIGIN,
  IFRAME_SANDBOX_ALLOW_SCRIPTS,
  WEBVIEW_IFRAME_SRC_SANDBOX,
  WEBVIEW_IFRAME_SRCDOC_SANDBOX,
} from '@renderer/services/web-view.service-host';
import logger from '@shared/services/logger.service';

export const TAB_TYPE_WEBVIEW = 'webView';

export function getTitle({ webViewType, title, contentType }: Partial<WebViewTabProps>): string {
  return title || `${webViewType || contentType} Web View`;
}

export default function WebView({
  webViewType,
  content,
  title,
  contentType,
  allowScripts,
  allowSameOrigin,
}: WebViewTabProps) {
  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const iframeRef = useRef<HTMLIFrameElement>(null!);

  /** Whether this webview's iframe will be populated by `src` as opposed to `srcdoc` */
  const shouldUseSrc = contentType === WebViewContentType.URL;

  // TODO: We may be catching iframe exceptions moving forward by posting messages from the child
  // iframe to the parent, so it might be good to figure out how it works to add and remove a
  // handler of some sort. Maybe the post message handler can more easily handle this kind of
  // situation, though. We just don't want to leak memory by leaving an event handler on an iframe
  // when it gets removed (if that does leak memory).

  return (
    <iframe
      ref={iframeRef}
      title={getTitle({ webViewType, title, contentType })}
      /**
       * Sandbox attribute for the webview - controls what resources scripts and other things can
       * access. See `ALLOWED_IFRAME_SRC_SANDBOX_VALUES` in `web-view.service.ts` for more info.
       *
       * Note that this does NOT change after the iframe is first added to the dom. We are relying
       * on the `MutationObserver` in `web-view.service.ts` to catch if an extension tries to change
       * its WebViewContentType and src/srcdoc to some combination that is forbidden (unless
       * changing src or srcdoc re-adds the iframe to the dom, in which case it is fine)
       *
       * TODO: test this sometime to see what happens
       *
       * DO NOT CHANGE THIS WITHOUT A SERIOUS REASON
       */
      sandbox={`${shouldUseSrc ? WEBVIEW_IFRAME_SRC_SANDBOX : WEBVIEW_IFRAME_SRCDOC_SANDBOX}${
        allowSameOrigin ? ` ${IFRAME_SANDBOX_ALLOW_SAME_ORIGIN}` : ''
      }${allowScripts ? ` ${IFRAME_SANDBOX_ALLOW_SCRIPTS}` : ''}`}
      // TODO: csp?
      // TODO: credentialless?
      // TODO: referrerpolicy?
      src={shouldUseSrc ? content : undefined}
      srcDoc={shouldUseSrc ? undefined : content}
      // Allow WebViews to go fullscreen because why not (fullscreen YouTube video of Psalms LBL)
      allow="fullscreen;"
    />
  );
}

/**
 * Tell the web view service to load the web view with the provided saved definition
 *
 * @param data Web view definition to load
 */
async function retrieveWebViewContent(data: SavedWebViewDefinition): Promise<void> {
  const loadedId = await getWebView(data.webViewType, undefined, {
    existingId: data.id,
    createNewIfNotFound: false,
  });
  if (loadedId !== data.id)
    logger.error(
      `WebView with type ${data.webViewType} and id ${data.id} loaded into id ${loadedId}!`,
    );
}

export function updateWebViewTab(savedTabInfo: SavedTabInfo, data: WebViewDefinition): TabInfo {
  return {
    ...savedTabInfo,
    data,
    tabIconUrl: data.iconUrl,
    tabTitle: data.title ?? 'Unknown',
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
          await retrieveWebViewContent(data);
        } catch (e) {
          logger.error(
            `web-view.component failed to retrieve web view content for ${JSON.stringify(
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
      title: 'Unknown',
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
