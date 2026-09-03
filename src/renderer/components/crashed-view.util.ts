import { LocalizationData } from '@shared/services/localization.service-model';
import { LocalizeKey } from 'platform-bible-utils';
import { CSSProperties } from 'react';

/**
 * Pieces shared by the app's crash screens - {@link WebViewCrashedView}, which replaces a single
 * pane, and {@link WindowCrashedView}, which replaces a whole window.
 *
 * The two screens are meant to read as one thing, so the parts that decide how they LOOK live here
 * rather than being copied. Only what is genuinely identical is shared: each screen keeps its own
 * container style, because they differ in how they are positioned, and its own shell, because they
 * differ in whether they claim focus on mount.
 *
 * Everything here is plain data and pure functions evaluated at module load. Nothing reaches a
 * service, which is what lets a crash screen depend on it - see each screen's own notes on why it
 * takes as few dependencies as it can.
 */

/** Mirrors `EmptyTitle`: text-sm, font-medium, tracking-tight */
export const CRASHED_VIEW_TITLE_STYLE: CSSProperties = {
  margin: 0,
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '-0.015em',
};

/** Mirrors `EmptyDescription` inside `EmptyHeader`, whose max-w-sm is 24rem */
export const CRASHED_VIEW_MESSAGE_STYLE: CSSProperties = {
  margin: 0,
  maxWidth: '24rem',
  fontSize: '0.875rem',
  color: 'var(--muted-foreground, #5b5b5b)',
};

/**
 * Mirrors shadcn `Button` default variant at default size: h-8, px-2.5, rounded-lg (= --radius),
 * text-sm, font-medium, and a TRANSPARENT border rather than a visible one - the border exists only
 * so the focus-visible state can color it without shifting layout.
 */
export const CRASHED_VIEW_BUTTON_STYLE: CSSProperties = {
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

/**
 * Builds the scoped stylesheet for a crash screen's reload button.
 *
 * Hover and focus-visible cannot be expressed as inline styles, and a button with no visible focus
 * indicator is unusable by keyboard - which matters on a crash screen, where it is the only control
 * or nearly so. A scoped `<style>` is allowed: the web view CSP includes 'unsafe-inline' for
 * styles. Kept to the two states inline styles cannot reach.
 *
 * @param buttonClass Class name the caller puts on its button. Each screen passes its own so two
 *   crash screens on screen at once cannot style each other.
 */
export function buildCrashedViewButtonStateCss(buttonClass: string): string {
  return `
.${buttonClass}:hover { opacity: 0.9; }
.${buttonClass}:focus-visible { outline: 2px solid var(--ring, #7f7f7f); outline-offset: 2px; }
`;
}

/**
 * Builds the string resolver for a crash screen, closing over that screen's English defaults.
 *
 * A factory rather than a three-argument function so each screen's call sites stay
 * `localize(strings, KEY)`, and so `TKey` is pinned to that screen's own key union - passing a key
 * the screen has no default for does not compile.
 *
 * @param englishDefaults Last-resort text, one entry per key the screen resolves
 * @returns A resolver returning the localized string, or the English default when it has not
 *   resolved
 */
export function createCrashedViewLocalizer<TKey extends LocalizeKey>(
  englishDefaults: Readonly<Record<TKey, string>>,
): (localizedStrings: LocalizationData, key: TKey) => string {
  return (localizedStrings, key) => {
    const value = localizedStrings[key];
    // `useLocalizedStrings` seeds each key with the key itself, so an unresolved string is
    // indistinguishable from one that resolved to its own name — treat both as unresolved
    return value && value !== key ? value : englishDefaults[key];
  };
}
