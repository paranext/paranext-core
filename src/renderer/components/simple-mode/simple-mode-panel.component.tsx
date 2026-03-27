import useStandaloneWebView from '@renderer/components/simple-mode/use-standalone-web-view.hook';
import WebView from '@renderer/components/web-view.component';
import { WebViewType } from '@shared/models/web-view.model';
import { useMemo } from 'react';

interface SimpleModePanelProps {
  webViewType: WebViewType;
  options?: Record<string, unknown>;
}

/**
 * A panel that renders a single standalone WebView. Used in Simple mode for the reference panel and
 * editor panel.
 */
export default function SimpleModePanel({ webViewType, options = {} }: SimpleModePanelProps) {
  // Memoize options to avoid unnecessary re-creation
  const stableOptions = useMemo(() => options, [JSON.stringify(options)]);

  const { definition, isLoading } = useStandaloneWebView(webViewType, stableOptions);

  if (isLoading || !definition) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground tw-text-sm">
        {isLoading ? 'Loading...' : 'No content'}
      </div>
    );
  }

  return (
    <div className="tw-h-full tw-w-full tw-relative">
      <WebView {...definition} />
    </div>
  );
}
