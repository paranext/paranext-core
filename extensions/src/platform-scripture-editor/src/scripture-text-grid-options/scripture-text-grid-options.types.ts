import type { ViewOptionsTextEntry } from '../scripture-text-grid-contents.utils';

// Re-exported so consumers (this component's tests, the share-layout dialog on another branch) get
// the row type from one place. `ViewOptionsTextEntry` (from the View Options data layer) carries
// `isUserRemovable` — the hover-✕ display gate (true only for genuine user rows) — so no wrapper
// type is needed.
export type { ViewOptionsTextEntry };

/** The grid's display mode. `'chapter'` rendering is built separately, later. */
export type ScriptureTextGridViewMode = 'verse' | 'chapter';

/** Localization keys used by `ScriptureTextGridOptions`. */
export const SCRIPTURE_TEXT_GRID_OPTIONS_STRING_KEYS = Object.freeze([
  '%webView_scriptureTextGrid_viewOptions_viewHeader%',
  '%webView_scriptureTextGrid_viewOptions_verse%',
  '%webView_scriptureTextGrid_viewOptions_chapter%',
  '%webView_scriptureTextGrid_viewOptions_comingSoon%',
  '%webView_scriptureTextGrid_viewOptions_textsHeader%',
  '%webView_scriptureTextGrid_viewOptions_getResources%',
  '%webView_scriptureTextGrid_viewOptions_removeFromList%',
  '%webView_scriptureTextGrid_viewOptions_installing%',
] as const);

export type ScriptureTextGridOptionsStringKey =
  (typeof SCRIPTURE_TEXT_GRID_OPTIONS_STRING_KEYS)[number];

/** Localized strings for `ScriptureTextGridOptions`; each falls back to its key when absent. */
export type ScriptureTextGridOptionsLocalizedStrings = {
  [key in ScriptureTextGridOptionsStringKey]?: string;
};

/**
 * Props for the reusable, presentational View Options inner component. Data and callbacks only — no
 * PAPI, popover, or persistence coupling — so both the Scripture Text Grid popover and a separate
 * share-layout dialog can render it. Callers compute the rows (via `getViewOptionsTexts`) and own
 * persistence.
 */
export interface ScriptureTextGridOptionsProps {
  /** The currently selected view mode. */
  viewMode: ScriptureTextGridViewMode;
  /** Called when the user picks a different, enabled view mode. */
  onViewModeChange: (mode: ScriptureTextGridViewMode) => void;
  /**
   * When `false` (default) the Chapter toggle is disabled with a "coming soon" hint. It is enabled
   * once chapter rendering exists.
   */
  isChapterEnabled?: boolean;
  /** Admin-shared rows (top section): checkbox reflects the per-user overlay; never removable. */
  top: ViewOptionsTextEntry[];
  /** User + opted-out-admin rows (bottom section): hover-✕ only where `isUserRemovable`. */
  bottom: ViewOptionsTextEntry[];
  /** Display names of resources currently installing (shown as "Installing {name}…" rows). */
  installingResourceNames?: string[];
  /** Called when a row's checkbox toggles, with the resource id and the next checked state. */
  onCheckedChange: (resourceId: string, checked: boolean) => void;
  /** Called when the hover-✕ is clicked on a user row. */
  onRemoveFromList: (resourceId: string) => void;
  /** Called when the Get Resources button is clicked. */
  onGetResources: () => void;
  /** Localized strings; each falls back to its key when absent. */
  localizedStrings?: ScriptureTextGridOptionsLocalizedStrings;
}
