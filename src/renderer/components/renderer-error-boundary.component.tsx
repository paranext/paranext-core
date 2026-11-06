import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { WindowCrashedView } from './window-crashed-view.component';

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
 * Whether a render failure has reached the renderer root in this window's lifetime.
 *
 * Module scope rather than component state because the reader is `index.tsx`'s teardown, which runs
 * outside React. Never reset: a window whose tree has crashed once is not a window whose web view
 * state can be trusted to be complete, whatever it renders afterwards.
 */
let rendererHasCrashed = false;

/**
 * Whether this window's React tree has crashed.
 *
 * Read by the `beforeunload` teardown in `index.tsx`, which purges saved web view state for every
 * web view it did not see load. That purge is only correct once every web view HAS loaded, and a
 * tree that crashed partway through restoring tabs never got there - so an unload after a crash
 * would delete the saved state of every tab that had not been restored yet. A crashed window can
 * reach that unload deliberately, through the reload button below, so the teardown has to be told
 * to hold off.
 */
export function hasRendererCrashed(): boolean {
  return rendererHasCrashed;
}

/**
 * Reports a render failure that reached the renderer root.
 *
 * A module-level function for the same reason as {@link reloadWindow}.
 *
 * Includes the error's own stack, not only its message: the component stack React supplies names
 * the components that were rendering but never the frame that threw, and in a packaged build with
 * no devtools attached React's own console output does not reach the file log. Without it the one
 * log line a reporter can send back names no code at all, which for a crash this hard to reproduce
 * on purpose is most of the diagnostic value.
 */
function logRendererCrash(error: unknown, errorInfo: ErrorInfo) {
  // `ErrorInfo.componentStack` is typed `string | null`, and this repo does not write `null`. The
  // explicit newline keeps the stack readable even if a React version returns one that does not
  // already start with a line break.
  const componentStack = errorInfo.componentStack ? `\n${errorInfo.componentStack}` : '';
  const errorStack = error instanceof Error && error.stack ? `\n${error.stack}` : '';
  logger.error(
    `The renderer's React tree crashed while rendering: ${getErrorMessage(error)}${errorStack}${componentStack}`,
  );
}

/**
 * Catches render failures anywhere in the window's React tree so the window shows
 * {@link WindowCrashedView} instead of going blank, and reports them to the app log.
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
 * event handlers, async callbacks or unhandled rejections, which React error boundaries never see,
 * nor a data provider that returns a `PlatformError` rather than throwing.
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
    rendererHasCrashed = true;
    // React hands a throw from `componentDidCatch` to the NEXT boundary up, and above the renderer
    // root there is none — so an exception while REPORTING the crash would unmount the root and
    // produce the very blank window this component exists to prevent. Reporting is not worth the
    // window: `getErrorMessage` can throw on a value whose `toString` throws, and a logger call
    // reaches a service that may be as unwell as the tree.
    try {
      logRendererCrash(error, errorInfo);
    } catch {
      // Nothing here can be reported through the channel that just failed, and the crash screen
      // still renders, which is the part the user needs.
    }
  }

  render(): ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) return <WindowCrashedView onReload={reloadWindow} />;

    return children;
  }
}

export default RendererErrorBoundary;
