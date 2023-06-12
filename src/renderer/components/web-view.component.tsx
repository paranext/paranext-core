import { useRef } from 'react';
import {
  SavedTabInfo,
  TabInfo,
  WebViewContentType,
  WebViewDefinition,
  WebViewProps,
} from '@shared/data/web-view.model';
import {
  addWebView,
  saveTabInfoBase,
  serializeWebViewDefinition,
} from '@shared/services/web-view.service';

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
      // TODO: csp?
      // TODO: credentialless?
      // TODO: referrerpolicy?
      /**
       * Sandbox attribute for the webview - controls what resources scripts and other things can access.
       *
       * DO NOT CHANGE THIS WITHOUT A SERIOUS REASON
       */
      // allow-same-origin so the iframe can get papi and communicate and such
      // allow-scripts so the iframe can actually do things
      // allow-pointer-lock so the iframe can lock the pointer as desired
      // Note: Mozilla's iframe page 'allow-same-origin' and 'allow-scripts' warns that listing both of these
      // allows the child scripts to remove this sandbox attribute from the iframe. This means the
      // sandboxing will do nothing for a determined hacker. We must distrust the whole renderer due
      // to this issue. We will probably want to stay vigilant on security in this area.
      sandbox="allow-same-origin allow-scripts allow-pointer-lock"
      srcDoc={content}
    />
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

    // If the webview is serialized aka doesn't have content, tell the web view service to
    // deserialize the web view. It will asynchronously go get the content and re-run this function
    if (!data.content && data.content !== '')
      (async () => {
        const deserializedId = await addWebView(data.webViewType, undefined, {
          existingId: data.id,
          createNewIfNotFound: false,
        });
        if (deserializedId !== data.id)
          throw new Error(
            `WebView with type ${data.webViewType} and id ${data.id} deserialized into id ${deserializedId}!`,
          );
      })();
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
    title: data.title ?? 'Unknown',
    content: <WebView {...data} />,
  };
}

export function saveWebViewTab(tabInfo: TabInfo): SavedTabInfo {
  return {
    ...saveTabInfoBase(tabInfo),
    data: serializeWebViewDefinition(tabInfo.data as WebViewDefinition),
  };
}
