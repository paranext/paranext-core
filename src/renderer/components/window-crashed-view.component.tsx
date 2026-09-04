import {
  CrashedViewLocalizationBoundary,
  CrashedViewShell,
} from '@renderer/components/crashed-view.component';
import {
  buildCrashedViewButtonStateCss,
  createCrashedViewLocalizer,
} from '@renderer/components/crashed-view.util';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';
import { CSSProperties } from 'react';

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

/**
 * The screen with its text resolved through the localization service.
 *
 * Everything here that can reach a service lives below `CrashedViewLocalizationBoundary`, so a
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
      containerStyle={CONTAINER_STYLE}
      buttonClass={BUTTON_CLASS}
      buttonStateCss={BUTTON_STATE_CSS}
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
      containerStyle={CONTAINER_STYLE}
      buttonClass={BUTTON_CLASS}
      buttonStateCss={BUTTON_STATE_CSS}
    />
  );
}

/**
 * Replaces the window's content when `RendererErrorBoundary` catches a render failure, so the
 * window shows what happened instead of going blank.
 *
 * Localized when localization works, English when it does not - including when it throws, which
 * nothing above this component could catch.
 */
export function WindowCrashedView({ onReload }: WindowCrashedViewProps) {
  return (
    <CrashedViewLocalizationBoundary
      fallback={<EnglishCrashedView onReload={onReload} />}
      surfaceDescription="the window"
    >
      <LocalizedCrashedView onReload={onReload} />
    </CrashedViewLocalizationBoundary>
  );
}

export default WindowCrashedView;
