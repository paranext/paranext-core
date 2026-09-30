import type { ViewOptionsTextEntry } from '../scripture-text-grid-contents.utils';

// Re-exported so consumers (this component's tests, a dialog that reuses the component) get the row
// type from one place. `ViewOptionsTextEntry` (from the View Options data layer) already carries
// `isUserRemovable` — the hover-✕ display gate (true only for genuine user rows) — so no wrapper
// type is needed.
export type { ViewOptionsTextEntry };

/**
 * Every display mode, in the order the View Options toggle offers them. Also the source for
 * {@link ResourceCollectionViewMode} and {@link isResourceCollectionViewMode}, so the type, the
 * toggle, and the persisted-value guard cannot drift apart.
 */
export const RESOURCE_COLLECTION_VIEW_MODES = Object.freeze([
  'verse',
  'chapter',
  'aligned',
] as const);

/**
 * The display mode. `'aligned'` is the verse-aligned grid: verse N of every resource on one row.
 * Its visible label is "Grid" — the value stays `'aligned'` because the whole surface is already
 * called the Scripture Text Grid, so `viewMode === 'grid'` inside it would not say which grid.
 */
export type ResourceCollectionViewMode = (typeof RESOURCE_COLLECTION_VIEW_MODES)[number];

/**
 * Whether a value is a display mode this build knows how to render.
 *
 * The chosen mode is persisted per web view, so a saved layout can name a mode that this build does
 * not have — written by a newer build, or by one whose modes were since renamed. Reading it back
 * unchecked would hand an unrenderable mode to the grid, so callers reading persisted state coerce
 * through this to the default instead.
 *
 * @param value Value read from persisted web-view state.
 * @returns True when `value` is one of {@link RESOURCE_COLLECTION_VIEW_MODES}.
 */
export function isResourceCollectionViewMode(value: unknown): value is ResourceCollectionViewMode {
  return RESOURCE_COLLECTION_VIEW_MODES.some((mode) => mode === value);
}

/**
 * Localization keys this component reads, keyed by role. This is the single source for the key
 * strings — {@link RESOURCE_COLLECTION_OPTIONS_STRING_KEYS} and the component both reference it, so
 * they cannot drift (a drift would surface as a raw key rendered in the UI).
 */
export const RESOURCE_COLLECTION_OPTIONS_KEYS = {
  viewHeader: '%webView_scriptureTextGrid_viewOptions_viewHeader%',
  verse: '%webView_scriptureTextGrid_viewOptions_verse%',
  chapter: '%webView_scriptureTextGrid_viewOptions_chapter%',
  grid: '%webView_scriptureTextGrid_viewOptions_grid%',
  // Specific rather than the general `comingSoon` key beside it (which stays, unmodified, because
  // shipped strings are immutable): the hint renders after the whole toggle group, with Grid
  // between it and the disabled Chapter item, so it has to name the mode it describes.
  chapterComingSoon: '%webView_scriptureTextGrid_viewOptions_chapterComingSoon%',
  textsHeader: '%webView_scriptureTextGrid_viewOptions_textsHeader%',
  emptyTexts: '%webView_scriptureTextGrid_viewOptions_emptyState_prompt%',
  getResources: '%webView_scriptureTextGrid_viewOptions_getResources%',
  adminSharedLock: '%webView_scriptureTextGrid_viewOptions_adminSharedLock%',
  removeFromList: '%webView_scriptureTextGrid_viewOptions_removeFromList%',
  installing: '%webView_scriptureTextGrid_viewOptions_installing%',
} as const;

/** All localization keys this component reads (spread into the host web view's string-key list). */
export const RESOURCE_COLLECTION_OPTIONS_STRING_KEYS = Object.freeze([
  RESOURCE_COLLECTION_OPTIONS_KEYS.viewHeader,
  RESOURCE_COLLECTION_OPTIONS_KEYS.verse,
  RESOURCE_COLLECTION_OPTIONS_KEYS.chapter,
  RESOURCE_COLLECTION_OPTIONS_KEYS.grid,
  RESOURCE_COLLECTION_OPTIONS_KEYS.chapterComingSoon,
  RESOURCE_COLLECTION_OPTIONS_KEYS.textsHeader,
  RESOURCE_COLLECTION_OPTIONS_KEYS.emptyTexts,
  RESOURCE_COLLECTION_OPTIONS_KEYS.getResources,
  RESOURCE_COLLECTION_OPTIONS_KEYS.adminSharedLock,
  RESOURCE_COLLECTION_OPTIONS_KEYS.removeFromList,
  RESOURCE_COLLECTION_OPTIONS_KEYS.installing,
] as const);

export type ResourceCollectionOptionsStringKey =
  (typeof RESOURCE_COLLECTION_OPTIONS_STRING_KEYS)[number];

/** Localized strings for `ResourceCollectionOptions`; each falls back to its key when absent. */
export type ResourceCollectionOptionsLocalizedStrings = {
  [key in ResourceCollectionOptionsStringKey]?: string;
};

/**
 * Props for the reusable, presentational View Options inner component. Data and callbacks only — no
 * PAPI, popover, or persistence coupling — so it can be rendered both inside the Scripture Text
 * Grid popover and inside a dialog. Callers compute the rows (via `getViewOptionsTexts`) and own
 * persistence.
 */
export interface ResourceCollectionOptionsProps {
  /** The currently selected view mode. */
  viewMode: ResourceCollectionViewMode;
  /** Called when the user picks a different, enabled view mode. */
  onViewModeChange: (mode: ResourceCollectionViewMode) => void;
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
  /**
   * When `true`, the panel is not bound to a project/PDP yet, so the controls that act on a text
   * collection — the checkboxes and the remove (✕) controls — are disabled because there is nothing
   * to persist them to. The Get Resources button stays enabled: browsing and installing resources
   * needs no bound project. Pair with `disabledMessage` to explain why the list is empty. Defaults
   * to `false`.
   */
  disabled?: boolean;
  /**
   * Optional message shown in the TEXTS section while `disabled` (e.g. "No project selected."), so
   * an empty, non-interactive panel explains itself instead of looking broken.
   */
  disabledMessage?: string;
  /** Localized strings; each falls back to its key when absent. */
  localizedStrings?: ResourceCollectionOptionsLocalizedStrings;
}
