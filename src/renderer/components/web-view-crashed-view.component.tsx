import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { reloadWebView } from '@renderer/services/web-view.service-shard';
import { LocalizationData } from '@shared/services/localization.service-model';
import { logger } from '@shared/services/logger.service';
import { formatReplacementString, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { CSSProperties, useCallback, useEffect, useRef } from 'react';

const TITLE_KEY = '%webView_error_crashed_title%';
const MESSAGE_KEY = '%webView_error_crashed_message%';
const MESSAGE_NO_TITLE_KEY = '%webView_error_crashed_messageNoTitle%';
const RELOAD_BUTTON_KEY = '%webView_error_crashed_reloadButton%';

/**
 * Keys this view resolves. Module-level and frozen because `useLocalizedStrings` requires a stable
 * array reference.
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
const ENGLISH_DEFAULTS: Readonly<Record<string, string>> = {
  [TITLE_KEY]: 'This panel stopped working',
  [MESSAGE_KEY]: 'Something went wrong and “{webViewTitle}” could not be displayed.',
  [MESSAGE_NO_TITLE_KEY]: 'Something went wrong and this panel could not be displayed.',
  [RELOAD_BUTTON_KEY]: 'Reload',
};

function localize(localizedStrings: LocalizationData, key: LocalizeKey): string {
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
const CONTAINER_STYLE: CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.75rem',
  height: '100vh',
  padding: '2rem',
  textAlign: 'center',
  background: 'var(--background, #ffffff)',
  color: 'var(--foreground, #1b1b1b)',
  fontFamily: 'inherit',
};

const TITLE_STYLE: CSSProperties = {
  margin: 0,
  fontSize: '1rem',
  fontWeight: 600,
};

const MESSAGE_STYLE: CSSProperties = {
  margin: 0,
  maxWidth: '40rem',
  color: 'var(--muted-foreground, #5b5b5b)',
};

const BUTTON_STYLE: CSSProperties = {
  padding: '0.375rem 1rem',
  border: '1px solid var(--border, #d4d4d4)',
  borderRadius: 'var(--radius, 0.375rem)',
  background: 'var(--primary, #1b1b1b)',
  color: 'var(--primary-foreground, #ffffff)',
  font: 'inherit',
  cursor: 'pointer',
};

export type WebViewCrashedViewProps = {
  /** Id of the web view that crashed. Used to reload it. */
  webViewId: string;
  /** Type of the web view that crashed. Used to reload it, and logged with the failure. */
  webViewType: string;
  /** Tab title of the web view that crashed, named in the message so the user knows which pane died. */
  webViewTitle?: string;
};

/**
 * Replaces a web view's content when {@link WebViewErrorBoundary} catches a render failure, so the
 * pane shows what happened instead of going blank.
 *
 * Takes focus on mount. The crash unmounted everything focusable in this pane, so without moving
 * focus a keyboard or screen-reader user is left on `body` with no indication anything changed and
 * no route to the reload button. `role="alert"` announces the text itself.
 */
export function WebViewCrashedView({
  webViewId,
  webViewType,
  webViewTitle,
}: WebViewCrashedViewProps) {
  const [localizedStrings] = useLocalizedStrings(WEB_VIEW_CRASHED_VIEW_STRING_KEYS);
  // React refs passed to DOM elements must be initialized with null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const handleReload = useCallback(() => {
    reloadWebView(webViewType, webViewId).catch((error: unknown) => {
      logger.error(
        `Failed to reload crashed web view ${webViewId} (type ${webViewType}): ${getErrorMessage(error)}`,
      );
    });
  }, [webViewId, webViewType]);

  const message = webViewTitle
    ? formatReplacementString(localize(localizedStrings, MESSAGE_KEY), { webViewTitle })
    : localize(localizedStrings, MESSAGE_NO_TITLE_KEY);

  return (
    <div ref={containerRef} style={CONTAINER_STYLE} role="alert" tabIndex={-1}>
      <p style={TITLE_STYLE}>{localize(localizedStrings, TITLE_KEY)}</p>
      <p style={MESSAGE_STYLE}>{message}</p>
      <button type="button" style={BUTTON_STYLE} onClick={handleReload}>
        {localize(localizedStrings, RELOAD_BUTTON_KEY)}
      </button>
    </div>
  );
}

export default WebViewCrashedView;
