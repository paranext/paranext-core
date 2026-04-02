/** Layout of the replace preview row */
export type ReplacePreviewLayout = 'find' | 'arrow' | 'inline' | 'block';

/** Border/shape style applied to the highlighted text spans */
export type ReplacePreviewHighlightShape = 'bar' | 'rounded' | 'plain';

/** Color scheme applied to find/replace highlights */
export type ReplacePreviewColor = 'red-cyan' | 'red-green' | 'grey-blue';

/** All configurable preview display options */
export interface PreviewOptions {
  /** How the find→replace preview is laid out */
  layout: ReplacePreviewLayout;
  /** Border style of the highlight chips */
  highlightShape: ReplacePreviewHighlightShape;
  /** Color scheme for find and replace highlights */
  color: ReplacePreviewColor;
  /** Whether to render preview text in monospace font */
  monospace: boolean;
  /** Whether to render whitespace characters as visible symbols */
  showInvisible: boolean;
}

/** Default options when in Find (no replace) mode: rounded shape, find layout */
export const DEFAULT_FIND_PREVIEW_OPTIONS: PreviewOptions = {
  layout: 'find',
  highlightShape: 'rounded',
  color: 'red-cyan',
  monospace: false,
  showInvisible: false,
};

/** Default options when in Replace mode: block layout, bar shape, red/emerald color */
export const DEFAULT_REPLACE_PREVIEW_OPTIONS: PreviewOptions = {
  layout: 'block',
  highlightShape: 'bar',
  color: 'red-green',
  monospace: false,
  showInvisible: false,
};

/** @deprecated Use {@link DEFAULT_FIND_PREVIEW_OPTIONS} or {@link DEFAULT_REPLACE_PREVIEW_OPTIONS} */
export const DEFAULT_PREVIEW_OPTIONS = DEFAULT_REPLACE_PREVIEW_OPTIONS;
