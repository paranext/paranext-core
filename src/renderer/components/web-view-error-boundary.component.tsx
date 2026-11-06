import { reloadWebView } from '@renderer/services/web-view.service-shard';
import { WebViewProps } from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import {
  Component,
  ComponentType,
  createElement,
  ErrorInfo,
  PropsWithChildren,
  ReactNode,
} from 'react';
import type { Root } from 'react-dom/client';
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
 * Re-attempts loading a crashed web view, which recreates its iframe and so gives the crashed
 * subtree a fresh React root.
 *
 * `reloadWebView` RESOLVES `undefined` when the web view is no longer in the layout rather than
 * rejecting, so a `.catch` alone would leave a Reload button that does nothing and reports nothing.
 * Both outcomes are logged.
 *
 * A module-level function rather than a method because the class's two lint rules disagree about
 * where a private instance method may sit relative to `render`
 * (`@typescript-eslint/member-ordering` wants `render` first, `react/sort-comp` wants it last).
 * Nothing here needs instance state, so lifting it out satisfies both without suppressing either.
 */
function reloadCrashedWebView(webViewId: string, webViewType: string) {
  reloadWebView(webViewType, webViewId)
    .then((reloadedWebViewId) => {
      if (!reloadedWebViewId)
        logger.warn(
          `Could not reload crashed web view ${webViewId} (type ${webViewType}): it is no longer open`,
        );
      return undefined;
    })
    .catch((error: unknown) => {
      logger.error(
        `Failed to reload crashed web view ${webViewId} (type ${webViewType}): ${getErrorMessage(error)}`,
      );
    });
}

/**
 * Catches render failures inside a single web view so the pane shows {@link WebViewCrashedView}
 * instead of going blank, and reports them to the app log.
 *
 * Every React web view mounts through {@link renderWebViewInErrorBoundary}, with nothing above this
 * boundary, so without it an uncaught render throw tears down that iframe's whole React root and
 * leaves an empty pane with nothing in the log a user could report. This is the only thing standing
 * between that throw and the blank pane.
 *
 * Deliberately hook-free. Any hook added here would run ABOVE the catch, so if it threw, the pane
 * would blank exactly as it does without this component — the net would have the hole it exists to
 * close. All localization happens in the fallback, which mounts only after a crash.
 *
 * Covers throws during render and during commit (`useEffect` included) anywhere in the web view's
 * tree, which is the class of failure that blanks panes today. It does NOT cover errors in event
 * handlers, async callbacks or unhandled rejections — React error boundaries never see those — nor
 * a data provider that returns a `PlatformError` rather than throwing.
 *
 * It also cannot catch a throw inside its own fallback: React routes that to the next boundary up,
 * of which there is none, so the pane would blank as before. That is why {@link WebViewCrashedView}
 * stays small, why it falls back to English literals rather than depending on localization
 * resolving, and why the one part of it that reaches a service carries a boundary of its own.
 *
 * A crashed subtree stays crashed until the web view is reloaded. Nothing resets it on a definition
 * update, deliberately: the definition updates that reach a crashed pane are shared-state ones
 * (`scrollGroupScrRef` on every navigation, `state`, bring-to-front), so resetting on them would
 * re-run the same failing render on every verse move. The changes that genuinely mean "show
 * something else here" — switching a tab's project, re-pointing a panel — replace or reload the web
 * view, which builds a fresh iframe and so a fresh boundary anyway.
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
    // `ErrorInfo.componentStack` is typed `string | null`, and this repo does not write `null`. The
    // explicit newline keeps the stack readable even if a React version returns one that does not
    // already start with a line break.
    const componentStack = errorInfo.componentStack ? `\n${errorInfo.componentStack}` : '';
    logger.error(
      `Web view ${webViewId} (type ${webViewType}) crashed while rendering: ${getErrorMessage(error)}${componentStack}`,
    );
  }

  render(): ReactNode {
    const { children, webViewId, webViewType, webViewTitle } = this.props;
    const { hasError } = this.state;

    if (hasError)
      return (
        <WebViewCrashedView
          onReload={() => reloadCrashedWebView(webViewId, webViewType)}
          webViewTitle={webViewTitle}
        />
      );

    return children;
  }
}

/**
 * Renders a React web view's component into the root its iframe created, as the only child of a
 * {@link WebViewErrorBoundary}. Every React web view's generated bootstrap script calls this,
 * through the `renderWebViewInErrorBoundary` global, each time it renders, so no web view mounts
 * without the boundary.
 *
 * The boundary's id, type and title come from `webViewProps`, the same saved definition the
 * component is rendered with, so a definition update cannot leave the boundary reporting one web
 * view's id against another's type or title.
 *
 * @param root The React root the web view's iframe created for its `#root` element
 * @param webViewComponent The component the web view's bundle provides
 * @param webViewProps The props to render the component with, built from its saved definition
 */
export function renderWebViewInErrorBoundary(
  root: Root,
  webViewComponent: ComponentType<WebViewProps>,
  webViewProps: WebViewProps,
): void {
  root.render(
    createElement(
      WebViewErrorBoundary,
      {
        webViewId: webViewProps.id,
        webViewType: webViewProps.webViewType,
        webViewTitle: webViewProps.title,
      },
      createElement(webViewComponent, webViewProps),
    ),
  );
}

export default WebViewErrorBoundary;
