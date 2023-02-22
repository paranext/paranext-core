import { useId } from 'react';
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

  return hasReact ? (
    <Frame>{contents}</Frame>
  ) : (
    <iframe title={`web-view-${title}`} srcDoc={contents as string} />
  );
}
