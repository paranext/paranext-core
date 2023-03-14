import { WebViewContents } from '@shared/data/WebViewTypes';
import logger from '@shared/util/logger';
import { useEffect, useId, useRef } from 'react';

export type WebViewProps = Omit<
  WebViewContents,
  'componentName' | 'contentType'
>;

export function WebView({ contents }: WebViewProps) {
  const title = useId();

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
      title={`web-view-${title}`}
      srcDoc={contents as string}
    />
  );
}
