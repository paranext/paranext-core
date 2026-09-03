import type { LocalizedStringValue } from 'platform-bible-utils';

/**
 * Localization keys for the ResourceCell's status and action labels. Import to resolve them via
 * `useLocalizedStrings` (in the app) or `getLocalizedStrings` (in Storybook).
 *
 * Kept out of the component so a node-environment test can import the key list without pulling in
 * the editor component tree, which needs a DOM. `resource-cell-view.component.tsx` re-exports
 * everything here, so importers that already read these from the component are unaffected.
 */
export const UNAVAILABLE_KEY = '%webView_scriptureTextGrid_cell_unavailable%';
export const NOT_INSTALLED_KEY = '%webView_scriptureTextGrid_cell_not_installed%';
export const LOADING_KEY = '%webView_scriptureTextGrid_cell_status_loading%';
export const FAILED_KEY = '%webView_scriptureTextGrid_cell_status_failed%';
export const BOOK_NOT_AVAILABLE_KEY = '%webView_scriptureTextGrid_cell_status_bookNotAvailable%';
export const EMPTY_KEY = '%webView_scriptureTextGrid_cell_verse_empty%';
export const ZOOM_IN_KEY = '%webView_scriptureTextGrid_cell_zoomIn%';
export const ZOOM_OUT_KEY = '%webView_scriptureTextGrid_cell_zoomOut%';
export const RESET_ZOOM_KEY = '%webView_scriptureTextGrid_cell_resetZoom%';
export const ZOOM_OPTIONS_KEY = '%webView_scriptureTextGrid_cell_zoomOptions%';
export const COPY_KEY = '%webView_scriptureTextGrid_cell_copy%';

export const RESOURCE_CELL_STRING_KEYS = Object.freeze([
  UNAVAILABLE_KEY,
  NOT_INSTALLED_KEY,
  LOADING_KEY,
  FAILED_KEY,
  BOOK_NOT_AVAILABLE_KEY,
  EMPTY_KEY,
  ZOOM_IN_KEY,
  ZOOM_OUT_KEY,
  RESET_ZOOM_KEY,
  ZOOM_OPTIONS_KEY,
  COPY_KEY,
] as const);

export type ResourceCellLocalizedStringKey = (typeof RESOURCE_CELL_STRING_KEYS)[number];
export type ResourceCellLocalizedStrings = {
  [key in ResourceCellLocalizedStringKey]?: LocalizedStringValue;
};
