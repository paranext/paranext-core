import { useId } from 'react';

export type WebViewProps = {
  contents: string;
};

export function WebView({ contents }: WebViewProps) {
  const title = useId();

  return <iframe title={`web-view-${title}`} srcDoc={contents} />;
}
