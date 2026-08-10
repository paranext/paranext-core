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
 * The key name is declared in `MARKER_MENU_STRING_KEYS` in
 * `lib/platform-bible-react/src/components/advanced/marker-menu.component.tsx`, not in this
 * extension: it and its two siblings (`_insert`, `_paragraph`) are placeholders for the same shared
 * `MarkerMenu` search field, and the editor web view already preloads `MARKER_MENU_STRING_KEYS`, so
 * it needs no separate registration here.
 *
 * Its shipped VALUE, unlike the `%webView_platformScriptureEditor_characterMarkerControl_*%` keys
 * above, does NOT live in `platform-bible-react` or in this extension's
 * `contributions/localizedStrings.json` — it ships in the platform shell's own locale assets
 * (`assets/localization/en.json`, `es.json`) beside its siblings, because it is a platform-shell
 * string, not an extension-namespaced one.
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
