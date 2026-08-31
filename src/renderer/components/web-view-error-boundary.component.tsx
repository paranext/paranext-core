import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { WebViewCrashedView } from './web-view-crashed-view.component';

export type WebViewErrorBoundaryProps = PropsWithChildren<{
  /** Id of the web view being guarded. Logged with any failure and used to offer a reload. */
  webViewId: string;
  /** Type of the web view being guarded. Logged with any failure and used to offer a reload. */
  webViewType: string;
  /** Tab title of the web view being guarded, named in the crash message. */
  webViewTitle?: string;
}>;

type WebViewErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Catches render failures inside a single web view so the pane shows {@link WebViewCrashedView}
 * instead of going blank, and reports them to the app log.
 *
 * Every React web view mounts through one `root.render` call in the web view service, with nothing
 * above it, so an uncaught render throw tears down that iframe's whole React root and leaves an
 * empty pane with nothing in the log a user could report. This is the only thing standing between
 * that throw and the blank pane.
 *
 * Deliberately hook-free. Any hook added here would run ABOVE the catch, so if it threw, the pane
 * would blank exactly as it does without this component — the net would have the hole it exists to
 * close. All localization happens in the fallback, which mounts only after a crash.
 *
 * Covers throws during render and during commit (`useEffect` included) anywhere in the web view's
 * tree, which is the class of failure that blanks panes today. It does NOT cover errors in event
 * handlers, async callbacks or unhandled rejections — React error boundaries never see those — nor
 * a data provider that returns a `PlatformError` rather than throwing. It also cannot catch a throw
 * inside its own fallback: React routes that to the next boundary up, of which there is none, so
 * the pane would blank as before. That is why {@link WebViewCrashedView} stays small and falls back
 * to English rather than depending on localization resolving.
 */
export class WebViewErrorBoundary extends Component<
  WebViewErrorBoundaryProps,
  WebViewErrorBoundaryState
> {
  constructor(props: WebViewErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WebViewErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    const { webViewId, webViewType } = this.props;
    logger.error(
      `Web view ${webViewId} (type ${webViewType}) crashed while rendering: ${getErrorMessage(
        error,
        // `ErrorInfo.componentStack` is typed `string | null`; this repo does not write `null`
      )}${errorInfo.componentStack ?? ''}`,
    );
  }

  render(): ReactNode {
    const { children, webViewId, webViewType, webViewTitle } = this.props;
    const { hasError } = this.state;

    if (hasError)
      return (
        <WebViewCrashedView
          webViewId={webViewId}
          webViewType={webViewType}
          webViewTitle={webViewTitle}
        />
      );

    return children;
  }
}

export default WebViewErrorBoundary;
