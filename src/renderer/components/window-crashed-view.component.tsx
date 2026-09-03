import {
  buildCrashedViewButtonStateCss,
  CRASHED_VIEW_BUTTON_STYLE,
  CRASHED_VIEW_MESSAGE_STYLE,
  CRASHED_VIEW_TITLE_STYLE,
  createCrashedViewLocalizer,
} from '@renderer/components/crashed-view.util';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { Component, CSSProperties, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';

const TITLE_KEY = '%window_error_crashed_title%';
const MESSAGE_KEY = '%window_error_crashed_message%';
const RELOAD_BUTTON_KEY = '%window_error_crashed_reloadButton%';

type WindowCrashedViewStringKey = typeof TITLE_KEY | typeof MESSAGE_KEY | typeof RELOAD_BUTTON_KEY;

/**
 * Keys this view resolves. Declared at module level because `useLocalizedStrings` requires a stable
 * array reference - a new array each render would resubscribe on every render. Mutable because the
 * hook's parameter is `LocalizeKey[]`; only the `readonly` view of it leaves this module.
 */
const STRING_KEYS: LocalizeKey[] = [TITLE_KEY, MESSAGE_KEY, RELOAD_BUTTON_KEY];

/**
 * The keys this view resolves, as a `readonly` view of the array the hook subscribes with. Exposed
 * so tests can check the English defaults cover exactly these keys; `readonly` so no consumer can
 * mutate the array the hook depends on being stable.
 */
export const WINDOW_CRASHED_VIEW_STRING_KEYS: readonly LocalizeKey[] = STRING_KEYS;

/**
 * Last-resort English text.
 *
 * Every other view in the app falls back to the localize key itself when a string has not resolved.
 * This one must not: it renders precisely because the window's React tree died, and a user looking
 * at a dead window is better served by English than by `%window_error_crashed_title%`.
 */
export const WINDOW_CRASHED_ENGLISH_DEFAULTS: Readonly<Record<WindowCrashedViewStringKey, string>> =
  {
    [TITLE_KEY]: 'This window stopped working',
    [MESSAGE_KEY]:
      'Something went wrong and this window could not be displayed. Reloading should bring it back.',
    [RELOAD_BUTTON_KEY]: 'Reload',
  };

const localize = createCrashedViewLocalizer(WINDOW_CRASHED_ENGLISH_DEFAULTS);

// Styles are inline rather than Tailwind/shadcn on purpose, and the reason is narrower than "fewer
// dependencies": a `tw:` class is only as good as the class names the Tailwind build emitted, and a
// shadcn primitive is a component tree that renders through the same React that just failed. This
// view is the last thing between a throw and a blank window, so what it paints is written where
// nothing else has to succeed first. The theme stylesheet is applied to the document at module
// evaluation rather than by React, so its custom properties still resolve here; each still carries a
// literal fallback in case the failure happened before the theme was applied.
// `fontFamily: inherit` rather than a hardcoded stack so this screen uses whatever typeface the
// document establishes (`body` sets it in `app.component.scss`) - a crash screen in a different font
// from the app reads as a foreign page rather than as this app telling the user something.
// `position: fixed; inset: 0` rather than `height: 100vh` so the box is measured from the viewport
// and is unaffected by whatever margin the document's stylesheets do or do not reset.
const CONTAINER_STYLE: CSSProperties = {
  position: 'fixed',
  inset: 0,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'safe center',
  overflow: 'auto',
  gap: '1rem',
  padding: '1.5rem',
  textAlign: 'center',
  background: 'var(--background, #ffffff)',
  color: 'var(--foreground, #1b1b1b)',
  fontFamily: 'inherit',
};

const BUTTON_CLASS = 'platform-window-crashed-reload';

const BUTTON_STATE_CSS = buildCrashedViewButtonStateCss(BUTTON_CLASS);

export type WindowCrashedViewProps = {
  /**
   * Reloads the window.
   *
   * Injected rather than called directly so this stays a presentational component that a test and a
   * story can render without navigating anything.
   */
  onReload: () => void;
};

type CrashedViewShellProps = {
  /** Heading, already resolved to display text. */
  title: string;
  /** Explanation, already resolved to display text. */
  message: string;
  /** Label on the reload button, already resolved to display text. */
  reloadLabel: string;
  /** Reloads the window. */
  onReload: () => void;
};

/**
 * The screen itself: fixed markup and fixed styles over text that is already resolved.
 *
 * Calls React's own hooks only. Nothing here reaches a service, so it renders the same whether the
 * text came from the localization service or from {@link WINDOW_CRASHED_ENGLISH_DEFAULTS} - which is
 * what lets the English path stay identical in layout to the localized one.
 *
 * Takes focus on mount if this window has it. The crash destroyed every focusable thing in the
 * window, so a keyboard or screen-reader user is otherwise left on `body` with no route to the
 * reload button - and unlike a single crashed pane there is nothing else here to steal focus from.
 * A window the user is not looking at is left alone, so a background window crashing cannot pull
 * focus away from the one they are working in. `role="alert"` announces the text either way.
 */
function CrashedViewShell({ title, message, reloadLabel, onReload }: CrashedViewShellProps) {
  // React refs passed to DOM elements must be initialized with null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // `ownerDocument` rather than a bare `document` for the same reason the web view screen uses it:
    // it asks the document this element actually lives in.
    if (containerRef.current?.ownerDocument.hasFocus()) containerRef.current.focus();
  }, []);

  return (
    <>
      {/* Outside the alert region so the region holds only what is announced. */}
      <style>{BUTTON_STATE_CSS}</style>
      <div ref={containerRef} style={CONTAINER_STYLE} role="alert" tabIndex={-1}>
        <p style={CRASHED_VIEW_TITLE_STYLE}>{title}</p>
        <p style={CRASHED_VIEW_MESSAGE_STYLE}>{message}</p>
        <button
          type="button"
          className={BUTTON_CLASS}
          style={CRASHED_VIEW_BUTTON_STYLE}
          onClick={onReload}
        >
          {reloadLabel}
        </button>
      </div>
    </>
  );
}

/**
 * The screen with its text resolved through the localization service.
 *
 * Everything here that can reach a service lives below {@link CrashedViewLocalizationBoundary}, so a
 * failure to localize costs the user English text rather than the blank window this whole view
 * exists to replace.
 */
function LocalizedCrashedView({ onReload }: WindowCrashedViewProps) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  return (
    <CrashedViewShell
      title={localize(localizedStrings, TITLE_KEY)}
      message={localize(localizedStrings, MESSAGE_KEY)}
      reloadLabel={localize(localizedStrings, RELOAD_BUTTON_KEY)}
      onReload={onReload}
    />
  );
}

/**
 * The screen with its text taken straight from {@link WINDOW_CRASHED_ENGLISH_DEFAULTS}, reaching no
 * service.
 */
function EnglishCrashedView({ onReload }: WindowCrashedViewProps) {
  return (
    <CrashedViewShell
      title={WINDOW_CRASHED_ENGLISH_DEFAULTS[TITLE_KEY]}
      message={WINDOW_CRASHED_ENGLISH_DEFAULTS[MESSAGE_KEY]}
      reloadLabel={WINDOW_CRASHED_ENGLISH_DEFAULTS[RELOAD_BUTTON_KEY]}
      onReload={onReload}
    />
  );
}

type CrashedViewLocalizationBoundaryProps = PropsWithChildren<{
  /** Rendered instead of the children if resolving localized text throws. */
  fallback: ReactNode;
}>;

/**
 * Shows `fallback` if resolving this screen's localized text throws.
 *
 * The boundary that renders this view cannot cover it. React hands an error thrown inside a
 * boundary's own fallback to the NEXT boundary up, and above the renderer root there is none - so a
 * throw while localizing would blank the window, which is the exact failure this view exists to
 * replace. Localization is the data type the runaway-render guard trips on more than any other, so
 * it is a likely thing to be unwell at the moment this view mounts.
 *
 * Everything above this boundary - {@link CrashedViewShell} included - must stay service-free for
 * the same reason: a throw there still has nothing to catch it.
 */
class CrashedViewLocalizationBoundary extends Component<
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

  // React's error boundary contract requires this to be an instance method, and the error arrives
  // as an argument, so there is no instance state for it to reach.
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  componentDidCatch(error: unknown) {
    logger.warn(
      `The window's crash screen could not localize its text, falling back to English: ${getErrorMessage(error)}`,
    );
  }

  render(): ReactNode {
    const { children, fallback } = this.props;
    const { hasError } = this.state;

    return hasError ? fallback : children;
  }
}

/**
 * Replaces the window's content when {@link RendererErrorBoundary} catches a render failure, so the
 * window shows what happened instead of going blank.
 *
 * Localized when localization works, English when it does not - including when it throws, which
 * nothing above this component could catch.
 */
export function WindowCrashedView({ onReload }: WindowCrashedViewProps) {
  return (
    <CrashedViewLocalizationBoundary fallback={<EnglishCrashedView onReload={onReload} />}>
      <LocalizedCrashedView onReload={onReload} />
    </CrashedViewLocalizationBoundary>
  );
}

export default WindowCrashedView;
