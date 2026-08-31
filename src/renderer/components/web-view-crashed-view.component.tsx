import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizationData } from '@shared/services/localization.service-model';
import { formatReplacementString, isLocalizeKey, LocalizeKey } from 'platform-bible-utils';
import { CSSProperties, useEffect, useMemo, useRef } from 'react';

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
 * array reference - a new array each render would resubscribe on every render.
 */
export const WEB_VIEW_CRASHED_VIEW_STRING_KEYS: LocalizeKey[] = [
  TITLE_KEY,
  MESSAGE_KEY,
  MESSAGE_NO_TITLE_KEY,
  RELOAD_BUTTON_KEY,
];

/**
 * Last-resort English text.
 *
 * Every other view in the app falls back to the localize key itself when a string has not resolved.
 * This one must not: it renders precisely because something in this web view broke, and one known
 * cause of a blank web view is a crash inside `useLocalizedStrings` itself. A user whose editor
 * just died is better served by English than by `%webView_error_crashed_title%`.
 */
export const ENGLISH_DEFAULTS: Readonly<Record<WebViewCrashedViewStringKey, string>> = {
  [TITLE_KEY]: 'This panel stopped working',
  [MESSAGE_KEY]: 'Something went wrong and “{webViewTitle}” could not be displayed.',
  [MESSAGE_NO_TITLE_KEY]: 'Something went wrong and this panel could not be displayed.',
  [RELOAD_BUTTON_KEY]: 'Reload',
};

function localize(localizedStrings: LocalizationData, key: WebViewCrashedViewStringKey): string {
  const value = localizedStrings[key];
  // `useLocalizedStrings` seeds each key with the key itself, so an unresolved string is
  // indistinguishable from one that resolved to its own name — treat both as unresolved
  return value && value !== key ? value : ENGLISH_DEFAULTS[key];
}

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

// Mirrors `EmptyTitle`: text-sm, font-medium, tracking-tight
const TITLE_STYLE: CSSProperties = {
  margin: 0,
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '-0.015em',
};

// Mirrors `EmptyDescription` inside `EmptyHeader`, whose max-w-sm is 24rem
const MESSAGE_STYLE: CSSProperties = {
  margin: 0,
  maxWidth: '24rem',
  fontSize: '0.875rem',
  color: 'var(--muted-foreground, #5b5b5b)',
};

// Mirrors shadcn `Button` default variant at default size: h-8, px-2.5, rounded-lg (= --radius),
// text-sm, font-medium, and a TRANSPARENT border rather than a visible one - the border exists only
// so the focus-visible state can color it without shifting layout.
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

const BUTTON_CLASS = 'platform-web-view-crashed-reload';

// Hover and focus-visible cannot be expressed as inline styles, and a button with no visible focus
// indicator is unusable by keyboard - which matters here because the container takes focus first and
// Tab moves to this button. A scoped <style> is allowed: the web view CSP includes 'unsafe-inline'
// for styles. Kept to the two states inline styles cannot reach.
const BUTTON_STATE_CSS = `
.${BUTTON_CLASS}:hover { opacity: 0.9; }
.${BUTTON_CLASS}:focus-visible { outline: 2px solid var(--ring, #7f7f7f); outline-offset: 2px; }
`;

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
 * Replaces a web view's content when {@link WebViewErrorBoundary} catches a render failure, so the
 * pane shows what happened instead of going blank.
 *
 * Takes focus on mount only if this web view already had it - the crash unmounted everything
 * focusable in the pane, so a keyboard or screen-reader user who was working here would otherwise
 * be left on `body` with no route to the reload button. `role="alert"` announces the text either
 * way, which is what covers the panes that do not take focus. See the effect for the cases.
 */
export function WebViewCrashedView({ onReload, webViewTitle }: WebViewCrashedViewProps) {
  const [localizedStrings] = useLocalizedStrings(WEB_VIEW_CRASHED_VIEW_STRING_KEYS);

  // A web view's title may be a localize key rather than display text, so it needs resolving before
  // it can go in the message - otherwise the panel that exists to avoid showing raw `%…%` keys shows
  // one. Resolved separately from the keys above because it varies per web view; memoized because
  // `useLocalizedStrings` requires a stable array reference.
  const titleKeys = useMemo<LocalizeKey[]>(
    () => (webViewTitle && isLocalizeKey(webViewTitle) ? [webViewTitle] : []),
    [webViewTitle],
  );
  const [localizedTitles] = useLocalizedStrings(titleKeys);

  // React refs passed to DOM elements must be initialized with null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only claim focus if this web view already had it, i.e. the crash really did destroy what the
    // user was working in. Several web views are visible at once, so a pane crashing on a shared
    // state change while the user types elsewhere must not yank the caret out of that pane - and it
    // would do so silently, since programmatic focus on a tabIndex={-1} container matches no
    // `:focus-visible` ring.
    //
    // `ownerDocument` is required: this component is renderer-realm code rendered into a web view's
    // iframe DOM, so a bare `document` here is the RENDERER's document, not this pane's.
    //
    // Hidden case: an inactive rc-dock tab is `display: none`, so it holds no focus and this is a
    // no-op with no catch-up on activation. That is deliberate - `role="alert"` announces the
    // message when the tab is opened, and stealing focus into a pane the user has not looked at yet
    // would be worse than not moving it.
    if (containerRef.current?.ownerDocument.hasFocus()) containerRef.current.focus();
  }, []);

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
    <div ref={containerRef} style={CONTAINER_STYLE} role="alert" tabIndex={-1}>
      <style>{BUTTON_STATE_CSS}</style>
      <p style={TITLE_STYLE}>{localize(localizedStrings, TITLE_KEY)}</p>
      <p style={MESSAGE_STYLE}>{message}</p>
      <button type="button" className={BUTTON_CLASS} style={BUTTON_STYLE} onClick={onReload}>
        {localize(localizedStrings, RELOAD_BUTTON_KEY)}
      </button>
    </div>
  );
}

export default WebViewCrashedView;
