/** Layout of the replace preview row */
export type ReplacePreviewLayout = 'arrow' | 'inline' | 'block';

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

export const DEFAULT_PREVIEW_OPTIONS: PreviewOptions = {
  layout: 'arrow',
  highlightShape: 'rounded',
  color: 'red-cyan',
  monospace: false,
  showInvisible: false,
};
