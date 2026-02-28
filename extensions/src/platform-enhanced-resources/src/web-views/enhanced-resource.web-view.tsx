import { WebViewProps } from '@papi/core';

globalThis.webViewComponent = function EnhancedResourceWebView({
  useWebViewScrollGroupScrRef,
  useWebViewState,
}: WebViewProps) {
  const [scrRef] = useWebViewScrollGroupScrRef();
  const [isInitialized] = useWebViewState<boolean>('isInitialized', false);

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full" data-testid="er-web-view">
      <div className="tw-flex tw-items-center tw-gap-2 tw-p-2 tw-border-b">
        <span className="tw-text-sm tw-font-medium">
          {scrRef ? `${scrRef.book} ${scrRef.chapterNum}:${scrRef.verseNum}` : ''}
        </span>
      </div>
      <div className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-text-muted-foreground">
        {isInitialized ? (
          <span>Enhanced Resource loaded</span>
        ) : (
          <span>Loading Enhanced Resource...</span>
        )}
      </div>
    </div>
  );
};
