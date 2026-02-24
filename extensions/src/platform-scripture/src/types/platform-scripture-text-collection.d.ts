/**
 * Type declarations for the Text Collection main view (UI-PKG-003). These types support the
 * dual-pane layout for comparing multiple Bible translations.
 */

/** View mode for the single pane */
export type ViewMode = 'Preview' | 'Unformatted' | 'Standard';

/** Scroll group assignment */
export type ScrollGroup = 'A' | 'B' | 'C' | 'D' | 'E' | 'None';

/** Reference to a project by name and GUID */
export interface ReferencedProject {
  name: string;
  id: string;
}

/** Information about a scripture text used in text collection */
export interface ScrTextReference {
  name: string;
  id: string;
  fullName: string;
  language: string;
  languageId: string;
  fontName: string;
  baseFontSize: number;
  isRTL: boolean;
}

/** A single text in a Text Collection with its per-text zoom factor */
export interface TextCollectionItem {
  scrText: ScrTextReference;
  zoom: number;
}

/** Per-item state for memento serialization */
export interface TextCollectionItemState {
  scrTextName: string;
  scrTextId: string;
  zoom: number;
}

/** Complete TC window state for persistence */
export interface TextCollectionMemento {
  items: TextCollectionItemState[];
  curItem: number;
  singleShown: boolean;
  multiShown: boolean;
  viewName: ViewMode;
  singleZoom: number;
  multiZoom: number;
  splitterProportion: number;
  reference: string;
  scrollGroup: ScrollGroup;
}

/** Multi-pane content returned by the backend */
export interface MultiPaneContent {
  html: string;
  css: string;
  items: TextCollectionItemState[];
}

/** Action types for the Text Collection reducer */
export type TextCollectionAction =
  | { type: 'SET_ITEMS'; items: TextCollectionItem[] }
  | { type: 'SET_CUR_ITEM'; index: number }
  | { type: 'TOGGLE_SINGLE_PANE' }
  | { type: 'SET_VIEW_MODE'; viewName: ViewMode }
  | { type: 'SET_SPLITTER_PROPORTION'; proportion: number }
  | { type: 'ZOOM_IN_MULTI' }
  | { type: 'ZOOM_OUT_MULTI' }
  | { type: 'ZOOM_RESET_MULTI' }
  | { type: 'ZOOM_IN_SINGLE' }
  | { type: 'ZOOM_OUT_SINGLE' }
  | { type: 'ZOOM_RESET_SINGLE' }
  | { type: 'ZOOM_IN_TEXT'; index: number }
  | { type: 'ZOOM_OUT_TEXT'; index: number }
  | { type: 'ZOOM_ACTUAL_TEXT'; index: number }
  | { type: 'MOVE_ITEM_UP'; index: number }
  | { type: 'MOVE_ITEM_DOWN'; index: number }
  | { type: 'REMOVE_ITEM'; index: number }
  | { type: 'SET_MULTI_PANE_CONTENT'; html: string; css: string }
  | { type: 'TOGGLE_FOOTNOTES' }
  | { type: 'SET_FOCUS'; singleHasFocus: boolean }
  | { type: 'SET_SETUP_COMPLETE' }
  | { type: 'SET_WINDOW_TITLE'; title: string }
  | {
      type: 'SET_MISSING_PROJECTS';
      missing: ReferencedProject[];
      missingResources: ReferencedProject[];
    }
  | { type: 'TOGGLE_HIGHLIGHT_TERMS' }
  | { type: 'TOGGLE_HIGHLIGHT_GUESSED' };

/** Complete internal state of the Text Collection window */
export interface TextCollectionFormState {
  items: TextCollectionItem[];
  curItem: number;
  multiShown: boolean;
  singleShown: boolean;
  viewName: ViewMode;
  multiPaneZoom: number;
  singlePaneZoom: number;
  singleFootnoteZoom: number;
  singleFootnoteShown: boolean;
  singleFootnoteProportion: number;
  splitterProportion: number;
  highlightBiblicalTermRenderings: boolean;
  highlightGuessedRenderings: boolean;
  singleResourceHasFocus: boolean;
  missingProjects: ReferencedProject[];
  missingResources: ReferencedProject[];
  windowTitle: string;
  windowTooltip: string;
  setupComplete: boolean;
  multiPaneHtml: string;
  multiPaneCss: string;
}
