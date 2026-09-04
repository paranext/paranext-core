import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  CrashedViewLocalizationBoundary,
  CrashedViewShell,
} from '@renderer/components/crashed-view.component';
import {
  buildCrashedViewButtonStateCss,
  createCrashedViewLocalizer,
} from '@renderer/components/crashed-view.util';
import { formatReplacementString, isLocalizeKey, LocalizeKey } from 'platform-bible-utils';
import { CSSProperties, useMemo } from 'react';

const TITLE_KEY = '%webView_error_crashed_title%';
const MESSAGE_KEY = '%webView_error_crashed_message%';
const MESSAGE_NO_TITLE_KEY = '%webView_error_crashed_messageNoTitle%';
const RELOAD_BUTTON_KEY = '%webView_error_crashed_reloadButton%';

type WebViewCrashedViewStringKey =
  | typeof TITLE_KEY
  | typeof MESSAGE_KEY
  | typeof MESSAGE_NO_TITLE_KEY
  | typeof RELOAD_BUTTON_KEY;

/**
 * Keys this view resolves. Declared at module level because `useLocalizedStrings` requires a stable
 * array reference - a new array each render would resubscribe on every render. Mutable because the
 * hook's parameter is `LocalizeKey[]`; only the `readonly` view of it leaves this module.
 */
const STRING_KEYS: LocalizeKey[] = [
  TITLE_KEY,
  MESSAGE_KEY,
  MESSAGE_NO_TITLE_KEY,
  RELOAD_BUTTON_KEY,
];

/**
 * The keys this view resolves, as a `readonly` view of the array the hook subscribes with. Exposed
 * so tests can check the English defaults cover exactly these keys; `readonly` so no consumer can
 * mutate the array the hook depends on being stable.
 */
export const WEB_VIEW_CRASHED_VIEW_STRING_KEYS: readonly LocalizeKey[] = STRING_KEYS;

/**
 * Last-resort English text.
 *
 * Every other view in the app falls back to the localize key itself when a string has not resolved.
 * This one must not: it renders precisely because something in this web view broke, and one known
 * cause of a blank web view is a crash inside `useLocalizedStrings` itself. A user whose editor
 * just died is better served by English than by `%webView_error_crashed_title%`.
 */
export const WEB_VIEW_CRASHED_ENGLISH_DEFAULTS: Readonly<
  Record<WebViewCrashedViewStringKey, string>
> = {
  [TITLE_KEY]: 'This panel stopped working',
  [MESSAGE_KEY]: 'Something went wrong and “{webViewTitle}” could not be displayed.',
  [MESSAGE_NO_TITLE_KEY]: 'Something went wrong and this panel could not be displayed.',
  [RELOAD_BUTTON_KEY]: 'Reload',
};

const localize = createCrashedViewLocalizer(WEB_VIEW_CRASHED_ENGLISH_DEFAULTS);

// Styles are inline rather than Tailwind/shadcn on purpose. This component is rendered by the
// renderer but mounts inside a web view's iframe, whose document carries only the CSP, the font and
// scrollbar styles, the theme stylesheet, and whatever CSS the extension shipped — never the
// renderer's Tailwind build. A `tw:`-classed element would render unstyled here. The theme
// stylesheet does define the CSS custom properties on `body`, so those resolve; each still carries a
// literal fallback so the panel stays readable even if a web view is somehow missing the theme.
// `position: absolute; inset: 0` rather than `height: 100vh`: nothing injected into a web view
// iframe resets the UA's default 8px body margin, so a viewport-height box would overflow by 16px
// and show a scrollbar. Absolute positioning is measured from the initial containing block, which
// ignores that margin. `overflow: auto` plus `safe center` keeps the content reachable in a pane too
// short to center it in - plain `center` would push the top out of the scrollable area.
const CONTAINER_STYLE: CSSProperties = {
  position: 'absolute',
  inset: 0,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'safe center',
  overflow: 'auto',
  // Mirrors the `Empty` primitive this would compose if Tailwind were available here: gap-4, p-6
  gap: '1rem',
  padding: '1.5rem',
  textAlign: 'center',
  background: 'var(--background, #ffffff)',
  color: 'var(--foreground, #1b1b1b)',
  fontFamily: 'inherit',
};

const BUTTON_CLASS = 'platform-web-view-crashed-reload';

const BUTTON_STATE_CSS = buildCrashedViewButtonStateCss(BUTTON_CLASS);

export type WebViewCrashedViewProps = {
  /**
   * Re-attempts loading the crashed web view.
   *
   * Injected rather than called directly so this stays a presentational component: importing the
   * web view service here would pull the whole service host into every consumer, Storybook and this
   * component's own test included.
   */
  onReload: () => void;
  /**
   * Tab title of the web view that crashed, named in the message so the user knows which pane died.
   *
   * This is the web view definition's raw title, which may be either display text or a
   * {@link LocalizeKey} - providers set either. It is resolved here rather than by the caller,
   * because the caller is the mount site inside the generated iframe script, which cannot run
   * hooks.
   */
  webViewTitle?: string;
};

/**
 * The panel with its text resolved through the localization service.
 *
 * Everything in this view that can reach a service lives here, below
 * {@link CrashedViewLocalizationBoundary}, so a failure to localize costs the user English text
 * rather than the blank pane this whole view exists to replace.
 */
function LocalizedCrashedView({ onReload, webViewTitle }: WebViewCrashedViewProps) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  // A web view's title may be a localize key rather than display text, so it needs resolving before
  // it can go in the message - otherwise the panel that exists to avoid showing raw `%…%` keys shows
  // one. Resolved separately from the keys above because it varies per web view; memoized because
  // `useLocalizedStrings` requires a stable array reference.
  const titleKeys = useMemo<LocalizeKey[]>(
    () => (webViewTitle && isLocalizeKey(webViewTitle) ? [webViewTitle] : []),
    [webViewTitle],
  );
  const [localizedTitles] = useLocalizedStrings(titleKeys);

  // Falls back to the untitled message rather than showing a key that did not resolve. Nested so
  // `isLocalizeKey` narrows `webViewTitle` before it is used to index the resolved strings.
  let resolvedTitle: string | undefined;
  if (webViewTitle) {
    if (isLocalizeKey(webViewTitle)) {
      const localizedTitle = localizedTitles[webViewTitle];
      if (localizedTitle && localizedTitle !== webViewTitle) resolvedTitle = localizedTitle;
    } else {
      resolvedTitle = webViewTitle;
    }
  }

  const message = resolvedTitle
    ? formatReplacementString(localize(localizedStrings, MESSAGE_KEY), {
        webViewTitle: resolvedTitle,
      })
    : localize(localizedStrings, MESSAGE_NO_TITLE_KEY);

  return (
    <CrashedViewShell
      title={localize(localizedStrings, TITLE_KEY)}
      message={message}
      reloadLabel={localize(localizedStrings, RELOAD_BUTTON_KEY)}
      onReload={onReload}
      containerStyle={CONTAINER_STYLE}
      buttonClass={BUTTON_CLASS}
      buttonStateCss={BUTTON_STATE_CSS}
    />
  );
}

/**
 * The panel with its text taken straight from {@link WEB_VIEW_CRASHED_ENGLISH_DEFAULTS}, reaching no
 * service at all.
 *
 * A localize-key title cannot be resolved on this path, so it degrades to the untitled message
 * rather than putting a raw `%…%` on screen.
 */
function EnglishCrashedView({ onReload, webViewTitle }: WebViewCrashedViewProps) {
  const displayTitle = webViewTitle && !isLocalizeKey(webViewTitle) ? webViewTitle : undefined;

  return (
    <CrashedViewShell
      title={WEB_VIEW_CRASHED_ENGLISH_DEFAULTS[TITLE_KEY]}
      message={
        displayTitle
          ? formatReplacementString(WEB_VIEW_CRASHED_ENGLISH_DEFAULTS[MESSAGE_KEY], {
              webViewTitle: displayTitle,
            })
          : WEB_VIEW_CRASHED_ENGLISH_DEFAULTS[MESSAGE_NO_TITLE_KEY]
      }
      reloadLabel={WEB_VIEW_CRASHED_ENGLISH_DEFAULTS[RELOAD_BUTTON_KEY]}
      onReload={onReload}
      containerStyle={CONTAINER_STYLE}
      buttonClass={BUTTON_CLASS}
      buttonStateCss={BUTTON_STATE_CSS}
    />
  );
}

/**
 * Replaces a web view's content when `WebViewErrorBoundary` catches a render failure, so the pane
 * shows what happened instead of going blank.
 *
 * Localized when localization works, English when it does not - including when it throws, which
 * nothing above this component could catch.
 */
export function WebViewCrashedView({ onReload, webViewTitle }: WebViewCrashedViewProps) {
  return (
    <CrashedViewLocalizationBoundary
      fallback={<EnglishCrashedView onReload={onReload} webViewTitle={webViewTitle} />}
      surfaceDescription={`web view ${webViewTitle ?? '(untitled)'}`}
    >
      <LocalizedCrashedView onReload={onReload} webViewTitle={webViewTitle} />
    </CrashedViewLocalizationBoundary>
  );
}

export default WebViewCrashedView;
