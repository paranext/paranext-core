import { useRef } from 'react';
import {
  SavedTabInfo,
  TabInfo,
  WebViewContentType,
  WebViewDefinition,
  SavedWebViewDefinition,
  WebViewProps,
} from '@shared/data/web-view.model';
import {
  getWebView,
  saveTabInfoBase,
  convertWebViewDefinitionToSaved,
  DEFAULT_IFRAME_SANDBOX,
} from '@shared/services/web-view.service';
import logger from '@shared/services/logger.service';

export const TAB_TYPE_WEBVIEW = 'webView';

export function getTitle({ webViewType, title, contentType }: Partial<WebViewProps>): string {
  return title || `${webViewType || contentType} Web View`;
}

export default function WebView({ webViewType, content, title, contentType }: WebViewProps) {
  // This ref will always be defined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const iframeRef = useRef<HTMLIFrameElement>(null!);

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
       * access. See `ALLOWED_IFRAME_SANDBOX_VALUES` in `web-view.service.ts` for more information.
       *
       * DO NOT CHANGE THIS WITHOUT A SERIOUS REASON
       */
      sandbox={DEFAULT_IFRAME_SANDBOX}
      srcDoc={content}
    />
  );
}

/**
 * Tell the web view service to load the web view with the provided saved definition
 * @param data web view definition to load
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

export function loadWebViewTab(savedTabInfo: SavedTabInfo): TabInfo {
  if (!savedTabInfo.id) throw new Error('"id" is missing.');

  let data: WebViewProps;
  if (savedTabInfo.data) {
    // We need to make sure that the data is of the correct type
    data = savedTabInfo.data as WebViewProps;

    if (savedTabInfo.id !== data.id) throw new Error('"id" does not match webView id.');
    if (!data.webViewType) throw new Error('WebView does not have a webViewType. Cannot restore');

    // If the webview is saved aka doesn't have content, tell the web view service to load the web
    // view. It will asynchronously go get the content and re-run this function
    if (!data.content && data.content !== '') retrieveWebViewContent(data);
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

  return {
    ...savedTabInfo,
    tabIconUrl: data.iconUrl,
    tabTitle: data.title ?? 'Unknown',
    content: <WebView {...data} />,
  };
}

export function saveWebViewTab(tabInfo: TabInfo): SavedTabInfo {
  return {
    ...saveTabInfoBase(tabInfo),
    data: convertWebViewDefinitionToSaved(tabInfo.data as WebViewDefinition),
  };
}
