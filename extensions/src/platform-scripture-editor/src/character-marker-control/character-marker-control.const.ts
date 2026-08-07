import { LocalizeKey } from 'platform-bible-utils';

/**
 * The localize keys {@link CharacterMarkerControl} resolves.
 *
 * Kept in their own module, apart from the component, so that consumers which only need the key
 * list — the editor web view's preload list, the localized-strings parity test — can import it
 * without pulling in React and the component library. The parity test runs in a `node` environment
 * and cannot load a module that reaches for `document`.
 */

export const ARIA_LABEL_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel%';
/**
 * The separators between a marker code and its description, and between the control's name and its
 * current value, live in the translated string rather than in code: neither the punctuation nor the
 * ordering is universal, and a Latin marker code sitting next to RTL text reorders around whatever
 * separator is used.
 */
export const ARIA_LABEL_FORMAT_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel_format%';
export const LABEL_FORMAT_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_label_format%';
export const MIXED_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_mixed%';
export const NONE_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_none%';
export const NO_MARKERS_TOOLTIP_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_noMarkersTooltip%';
/**
 * Lives in `platform-bible-react` beside its two siblings (`_insert`, `_paragraph`) rather than in
 * this extension: all three are placeholders for the same shared `MarkerMenu` search field, and the
 * editor web view already preloads `MARKER_MENU_STRING_KEYS`, so it needs no separate
 * registration.
 */
export const SEARCH_PLACEHOLDER_KEY: LocalizeKey = '%markerMenu_searchPlaceholder_character%';
/** Reuses the shipped sync-blocked wording rather than adding a second phrasing of it. */
export const SYNC_BLOCKED_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_syncEditBlocked_banner%';

/**
 * Localize keys used by {@link CharacterMarkerControl}. Spread these into the editor web view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const CHARACTER_MARKER_CONTROL_STRING_KEYS = Object.freeze([
  ARIA_LABEL_KEY,
  ARIA_LABEL_FORMAT_KEY,
  LABEL_FORMAT_KEY,
  MIXED_KEY,
  NONE_KEY,
  NO_MARKERS_TOOLTIP_KEY,
  SEARCH_PLACEHOLDER_KEY,
  SYNC_BLOCKED_KEY,
] as const);
