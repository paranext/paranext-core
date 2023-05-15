import { useRef } from 'react';
import {
  SavedTabInfo,
  TabInfo,
  WebViewContentType,
  WebViewProps,
} from '@shared/data/web-view.model';
import { deserializeTabId } from '@shared/utils/papi-util';

export function getTitle({ id, title, contentType }: WebViewProps): string {
  const defaultTitle = id ? `${id} ${contentType}` : `${contentType} Web View`;
  return title || defaultTitle;
}

export function WebView({ id, content, title, contentType }: WebViewProps) {
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
      title={getTitle({ id, content, title, contentType })}
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
      // allows the child scripts to remove this sandbox attribute from the iframe. However, it seems that this
      // is done by accessing window.parent or window.top, which is removed from the iframe with the injected
      // scripts in WebViewService. We will probably want to stay vigilant on security in this area.
      sandbox="allow-same-origin allow-scripts allow-pointer-lock"
      srcDoc={content}
    />
  );
}

export default function createWebViewPanel(tabInfo: SavedTabInfo): TabInfo {
  if (!tabInfo.id) throw new Error('"id" is missing.');

  let data: WebViewProps;
  if (tabInfo.data) {
    // We need to make sure that the data is of the correct type
    data = tabInfo.data as WebViewProps;
  } else {
    // placeholder data
    const { typeId } = deserializeTabId(tabInfo.id);
    data = { id: typeId, title: typeId, content: '', contentType: WebViewContentType.HTML };
  }

  const title = data.title ?? 'Unknown';
  return {
    title: `${title}`,
    content: <WebView {...data} />,
  };
}
