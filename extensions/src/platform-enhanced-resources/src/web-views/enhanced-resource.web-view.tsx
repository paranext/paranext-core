import { WebViewProps } from '@papi/core';

global.webViewComponent = function EnhancedResourceWebView({ useWebViewState }: WebViewProps) {
  const [message] = useWebViewState<string>('message', 'Enhanced Resources loading...');

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-items-center tw-justify-center">
      <p>{message}</p>
    </div>
  );
};
