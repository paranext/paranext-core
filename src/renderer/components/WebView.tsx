import { useEffect, useId, useRef } from 'react';
import Frame from 'react-frame-component';

export type WebViewProps =
  | {
      hasReact: false;
      contents: string;
    }
  | {
      hasReact: true;
      contents: React.ReactNode;
    };

export function WebView({ contents, hasReact = false }: WebViewProps) {
  const title = useId();

  // This ref will always be defined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const iframeRef = useRef<HTMLIFrameElement>(null!);

  useEffect(() => {
    // TODO: This doesn't work. Probably because the browser considers it to be cross-origin since we are loading from a script. Figure out how to fix this
    const iframe = iframeRef.current;
    const errorHandler = (e: ErrorEvent) => {
      console.error(`WebView threw an error: ${e.message}`);
    };
    if (iframe.contentWindow === null)
      throw new Error(
        "Somehow the webview's contentWindow is null while setting up error handler! Investigate",
      );
    iframe.contentWindow.addEventListener('error', errorHandler);
    return () => {
      if (iframe.contentWindow === null)
        throw new Error(
          "Somehow the webview's contentWindow is null while removing error handler! Investigate",
        );
      iframe.contentWindow.removeEventListener('error', errorHandler);
    };
  }, []);

  return hasReact ? (
    <Frame ref={iframeRef}>{contents}</Frame>
  ) : (
    <iframe
      ref={iframeRef}
      title={`web-view-${title}`}
      srcDoc={contents as string}
    />
  );
}
