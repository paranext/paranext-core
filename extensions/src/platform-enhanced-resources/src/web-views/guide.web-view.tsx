import { WebViewProps } from '@papi/core';

global.webViewComponent = function GuideWebView({ useWebViewState }: WebViewProps) {
  const [message] = useWebViewState<string>('message', 'Getting Started with Enhanced Resources');

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-items-center tw-justify-center tw-p-4">
      <h1 className="tw-text-2xl tw-font-bold tw-mb-4">{message}</h1>
    </div>
  );
};
