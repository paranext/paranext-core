import { WebViewContents } from '@shared/data/WebViewTypes';
import logger from '@shared/util/logger';
import { useEffect, useRef } from 'react';

export type WebViewProps = Omit<WebViewContents, 'componentName'>;

export function WebView({ contents, title, contentType }: WebViewProps) {
  // This ref will always be defined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const iframeRef = useRef<HTMLIFrameElement>(null!);

  useEffect(() => {
    // TODO: This doesn't work. Probably because the browser considers it to be cross-origin since we are loading from a script. Figure out how to fix this
    const iframe = iframeRef.current;
    const errorHandler = (e: ErrorEvent) => {
      logger.error(`WebView threw an error: ${e.message}`);
    };
    const getIframeContentWindowSafe = (stage: string) => {
      if (iframe.contentWindow === null)
        throw new Error(
          `Somehow the webview's contentWindow is null while ${stage} error handler! Investigate`,
        );
      return iframe.contentWindow;
    };
    getIframeContentWindowSafe('setting up').addEventListener(
      'error',
      errorHandler,
    );
    return () => {
      getIframeContentWindowSafe('removing').removeEventListener(
        'error',
        errorHandler,
      );
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      // TODO: Improve the default title when we have WebView types
      title={title || `${contentType} Web View`}
      // TODO: csp?
      // TODO: credentialless?
      // TODO: referrerpolicy?
      // Note: Mozilla's iframe page 'allow-same-origin' and 'allow-scripts' warns that listing both of these
      // allows the child scripts to remove this sandbox attribute from the iframe. However, it seems that this
      // is done by accessing window.parent or window.top, which is removed from the iframe with the injected
      // scripts in WebViewService. We will probably want to stay vigilant on security in this area.
      sandbox="allow-same-origin allow-scripts allow-pointer-lock"
      srcDoc={contents as string}
    />
  );
}
