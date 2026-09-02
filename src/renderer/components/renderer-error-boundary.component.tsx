import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { MainWindowCrashedView } from './main-window-crashed-view.component';

type RendererErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Reloads the window, which builds a fresh document and so a fresh React root.
 *
 * A module-level function rather than a method because nothing here needs instance state, and the
 * class's two lint rules disagree about where a private instance method may sit relative to
 * `render` (`@typescript-eslint/member-ordering` wants `render` first, `react/sort-comp` wants it
 * last).
 */
function reloadWindow() {
  globalThis.location.reload();
}

/**
 * Reports a render failure that reached the renderer root.
 *
 * A module-level function for the same reason as {@link reloadWindow}.
 */
function logRendererCrash(error: unknown, errorInfo: ErrorInfo) {
  // `ErrorInfo.componentStack` is typed `string | null`, and this repo does not write `null`. The
  // explicit newline keeps the stack readable even if a React version returns one that does not
  // already start with a line break.
  const componentStack = errorInfo.componentStack ? `\n${errorInfo.componentStack}` : '';
  logger.error(
    `The renderer's React tree crashed while rendering: ${getErrorMessage(error)}${componentStack}`,
  );
}

/**
 * Catches render failures anywhere in the window's React tree so the window shows
 * {@link MainWindowCrashedView} instead of going blank, and reports them to the app log.
 *
 * The whole tree mounts through one `root.render` call with nothing above it, so an uncaught render
 * throw tears down the entire root. The renderer process survives that, which is why the window
 * stays on screen with nothing painted in it and module-level services keep logging as though
 * nothing happened - there is no `render-process-gone` for Electron's main-process recovery to act
 * on, and no way back except restarting the app. This is the only thing standing between that throw
 * and the blank window.
 *
 * Wrapped above the router rather than inside it so a throw from the router itself is covered too.
 *
 * Deliberately hook-free. Any hook added here would run ABOVE the catch, so if it threw, the window
 * would blank exactly as it does without this component - the net would have the hole it exists to
 * close. All localization happens in the fallback, which mounts only after a crash.
 *
 * Covers throws during render and during commit (`useEffect` included). It does NOT cover errors in
 * event handlers, async callbacks or unhandled rejections - React error boundaries never see those
 *
 * - Nor a data provider that returns a `PlatformError` rather than throwing.
 */
export class RendererErrorBoundary extends Component<
  PropsWithChildren,
  RendererErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): RendererErrorBoundaryState {
    return { hasError: true };
  }

  // React's error boundary contract requires this to be an instance method, and everything it
  // reports arrives as arguments, so there is no instance state for it to reach. Delegating to a
  // module-level function keeps it that way rather than inventing a use for `this`.
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    logRendererCrash(error, errorInfo);
  }

  render(): ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) return <MainWindowCrashedView onReload={reloadWindow} />;

    return children;
  }
}

export default RendererErrorBoundary;
