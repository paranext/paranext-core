import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizationData } from '@shared/services/localization.service-model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { Component, CSSProperties, PropsWithChildren, ReactNode } from 'react';

const TITLE_KEY = '%mainWindow_error_crashed_title%';
const MESSAGE_KEY = '%mainWindow_error_crashed_message%';
const RELOAD_BUTTON_KEY = '%mainWindow_error_crashed_reloadButton%';

type MainWindowCrashedViewStringKey =
  | typeof TITLE_KEY
  | typeof MESSAGE_KEY
  | typeof RELOAD_BUTTON_KEY;

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
export const MAIN_WINDOW_CRASHED_VIEW_STRING_KEYS: readonly LocalizeKey[] = STRING_KEYS;

/**
 * Last-resort English text.
 *
 * Every other view in the app falls back to the localize key itself when a string has not resolved.
 * This one must not: it renders precisely because the window's React tree died, and a user looking
 * at a dead window is better served by English than by `%mainWindow_error_crashed_title%`.
 */
export const ENGLISH_DEFAULTS: Readonly<Record<MainWindowCrashedViewStringKey, string>> = {
  [TITLE_KEY]: 'This window stopped working',
  [MESSAGE_KEY]:
    'Something went wrong and this window could not be displayed. Reloading should bring it back.',
  [RELOAD_BUTTON_KEY]: 'Reload',
};

function localize(localizedStrings: LocalizationData, key: MainWindowCrashedViewStringKey): string {
  const value = localizedStrings[key];
  // `useLocalizedStrings` seeds each key with the key itself, so an unresolved string is
  // indistinguishable from one that resolved to its own name — treat both as unresolved
  return value && value !== key ? value : ENGLISH_DEFAULTS[key];
}

// Styles are inline rather than Tailwind/shadcn on purpose. This view renders after the window's
// React tree has already failed once, so every dependency it takes is another thing that can stop
// it appearing - and a crash screen that cannot render leaves the blank window it exists to
// replace. The theme stylesheet is applied to the document at module evaluation rather than by
// React, so its custom properties still resolve here; each still carries a literal fallback in case
// the failure happened before the theme was applied.
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
  fontFamily: 'system-ui, sans-serif',
};

const TITLE_STYLE: CSSProperties = {
  margin: 0,
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '-0.015em',
};

const MESSAGE_STYLE: CSSProperties = {
  margin: 0,
  maxWidth: '24rem',
  fontSize: '0.875rem',
  color: 'var(--muted-foreground, #5b5b5b)',
};

const BUTTON_STYLE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2rem',
  padding: '0 0.625rem',
  border: '1px solid transparent',
  borderRadius: 'var(--radius, 0.625rem)',
  background: 'var(--primary, #1b1b1b)',
  color: 'var(--primary-foreground, #ffffff)',
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
};

const BUTTON_CLASS = 'platform-main-window-crashed-reload';

// Hover and focus-visible cannot be expressed as inline styles, and a button with no visible focus
// indicator is unusable by keyboard - which matters here because it is the only control on screen.
const BUTTON_STATE_CSS = `
.${BUTTON_CLASS}:hover { opacity: 0.9; }
.${BUTTON_CLASS}:focus-visible { outline: 2px solid var(--ring, #7f7f7f); outline-offset: 2px; }
`;

export type MainWindowCrashedViewProps = {
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
 * Calls no hooks and reaches no service, so it renders the same whether the text came from the
 * localization service or from {@link ENGLISH_DEFAULTS} - which is what lets the English path stay
 * identical in layout to the localized one.
 *
 * `role="alert"` announces the text to a screen reader, whose previous focus died with the tree.
 */
function CrashedViewShell({ title, message, reloadLabel, onReload }: CrashedViewShellProps) {
  return (
    <>
      {/* Outside the alert region so the region holds only what is announced. */}
      <style>{BUTTON_STATE_CSS}</style>
      <div style={CONTAINER_STYLE} role="alert">
        <p style={TITLE_STYLE}>{title}</p>
        <p style={MESSAGE_STYLE}>{message}</p>
        <button type="button" className={BUTTON_CLASS} style={BUTTON_STYLE} onClick={onReload}>
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
function LocalizedCrashedView({ onReload }: MainWindowCrashedViewProps) {
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

/** The screen with its text taken straight from {@link ENGLISH_DEFAULTS}, reaching no service. */
function EnglishCrashedView({ onReload }: MainWindowCrashedViewProps) {
  return (
    <CrashedViewShell
      title={ENGLISH_DEFAULTS[TITLE_KEY]}
      message={ENGLISH_DEFAULTS[MESSAGE_KEY]}
      reloadLabel={ENGLISH_DEFAULTS[RELOAD_BUTTON_KEY]}
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
 * replace. The runaway-render guard that produced PT-4501 trips on `LocalizedStrings` more than any
 * other data type, so localization is a likely thing to be unwell at the moment this view mounts.
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
export function MainWindowCrashedView({ onReload }: MainWindowCrashedViewProps) {
  return (
    <CrashedViewLocalizationBoundary fallback={<EnglishCrashedView onReload={onReload} />}>
      <LocalizedCrashedView onReload={onReload} />
    </CrashedViewLocalizationBoundary>
  );
}

export default MainWindowCrashedView;
