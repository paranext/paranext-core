import {
  CRASHED_VIEW_BUTTON_STYLE,
  CRASHED_VIEW_MESSAGE_STYLE,
  CRASHED_VIEW_TITLE_STYLE,
} from '@renderer/components/crashed-view.util';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { readDirection } from 'platform-bible-react/experimental';
import { Component, CSSProperties, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';

export type CrashedViewShellProps = {
  /** Heading, already resolved to display text. */
  title: string;
  /** Explanation, already resolved to display text. */
  message: string;
  /** Label on the reload button, already resolved to display text. */
  reloadLabel: string;
  /** Reloads whatever crashed. */
  onReload: () => void;
  /**
   * Positions and paints the box. Each crash screen supplies its own, because a screen replacing a
   * pane is measured from its pane and one replacing a window is measured from the viewport - the
   * one thing about the two screens that genuinely differs.
   */
  containerStyle: CSSProperties;
  /** Class on the reload button, whose hover/focus states `buttonStateCss` styles. */
  buttonClass: string;
  /** Stylesheet for `buttonClass`, from `buildCrashedViewButtonStateCss`. */
  buttonStateCss: string;
};

/**
 * The screen itself: fixed markup and fixed styles over text that is already resolved.
 *
 * Shared by both crash screens - `WebViewCrashedView` and `WindowCrashedView` - which are meant to
 * read as one thing. Everything about them that is identical lives here, so neither can be restyled
 * without the other following.
 *
 * Calls React's own hooks only, and reaches no service, so it renders the same whether the text
 * came from the localization service or from a screen's built-in English defaults - which is what
 * lets the English path stay identical in layout to the localized one.
 *
 * Takes focus on mount only if the document it lives in already had focus, i.e. the crash really
 * did destroy what the user was working in. The crash unmounted everything focusable, so a keyboard
 * or screen-reader user who was working here would otherwise be left on `body` with no route to the
 * reload button - while a document the user is not looking at is left alone, so a crash somewhere
 * they are not cannot yank the caret out of what they are typing in. `role="alert"` announces the
 * text either way, which is what covers the surfaces that do not take focus.
 *
 * Hidden case: an inactive rc-dock tab is `display: none`, so it holds no focus and the focus
 * effect is a no-op with no catch-up on activation. That is deliberate - `role="alert"` announces
 * the message when the tab is opened, and stealing focus into a pane the user has not looked at yet
 * would be worse than not moving it.
 *
 * Sets its own base direction. Every other surface in the app is inside something that has already
 * established one, but a crash screen may be the only thing left in its document - so an RTL user
 * would otherwise read this screen laid out LTR, with trailing punctuation on the wrong side.
 * `readDirection` is a bare `localStorage` read, so honoring it costs none of the "reach no
 * service" constraint above.
 */
export function CrashedViewShell({
  title,
  message,
  reloadLabel,
  onReload,
  containerStyle,
  buttonClass,
  buttonStateCss,
}: CrashedViewShellProps) {
  // React refs passed to DOM elements must be initialized with null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // `ownerDocument` is required rather than a bare `document`: this component may be
    // renderer-realm code rendered into a web view's iframe DOM, where a bare `document` is the
    // RENDERER's document rather than the one this element is in.
    if (containerRef.current?.ownerDocument.hasFocus()) containerRef.current.focus();
  }, []);

  return (
    <>
      {/* Outside the alert region so the region holds only what is announced. */}
      <style>{buttonStateCss}</style>
      <div
        ref={containerRef}
        style={containerStyle}
        dir={readDirection()}
        role="alert"
        tabIndex={-1}
      >
        <p style={CRASHED_VIEW_TITLE_STYLE}>{title}</p>
        <p style={CRASHED_VIEW_MESSAGE_STYLE}>{message}</p>
        <button
          type="button"
          className={buttonClass}
          style={CRASHED_VIEW_BUTTON_STYLE}
          onClick={onReload}
        >
          {reloadLabel}
        </button>
      </div>
    </>
  );
}

type CrashedViewLocalizationBoundaryProps = PropsWithChildren<{
  /** Rendered instead of the children if resolving localized text throws. */
  fallback: ReactNode;
  /**
   * What crashed, named in the log line so the failure can be traced to a surface - e.g. `the
   * window` or `web view Scripture Editor`.
   */
  surfaceDescription: string;
}>;

/**
 * Shows `fallback` if resolving a crash screen's localized text throws.
 *
 * The boundary that renders a crash screen cannot cover this. React hands an error thrown inside a
 * boundary's own fallback to the NEXT boundary up, and there is no boundary above a web view's root
 * or above the renderer's, so a throw while localizing would blank the surface, which is the exact
 * failure the crash screen exists to replace. A crash inside `useLocalizedStrings` is one of the
 * known causes of that blank surface, so the one part of a crash screen that reaches a service gets
 * its own boundary and degrades to English.
 *
 * Everything above this boundary - {@link CrashedViewShell} included - must stay service-free for
 * the same reason: a throw there still has nothing to catch it.
 */
export class CrashedViewLocalizationBoundary extends Component<
  CrashedViewLocalizationBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: CrashedViewLocalizationBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    const { surfaceDescription } = this.props;
    logger.warn(
      `The crash screen for ${surfaceDescription} could not localize its text, falling back to English: ${getErrorMessage(error)}`,
    );
  }

  render(): ReactNode {
    const { children, fallback } = this.props;
    const { hasError } = this.state;

    return hasError ? fallback : children;
  }
}
