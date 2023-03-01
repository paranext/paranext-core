/**
 * Information used to recreate a tab
 */
export type SavedTabInfo = {
  /**
   * The underlying tab type. Used to determine which extension owns it.
   */
  type: string;
  /**
   * Data needed to recreate the tab during load
   */
  data?: string;
};

/**
 * Information needed to create a tab inside of Paranext
 */
export type TabInfo = {
  /**
   * The underlying tab type. Used to determine which extension owns it.
   */
  type: string;
  /**
   * Text to show on the title bar of the tab
   */
  title: string;
  /**
   * Content to show inside the tab
   */
  content: React.ReactNode;
  /**
   * (optional) Whether the tab can be closed by the user (default is true)
   */
  closable?: boolean;
  /**
   * (optional) Minimum width that the tab can become
   */
  minWidth?: number;
  /**
   * (optional) Minimum height that the tab can become
   */
  minHeight?: number;
  /**
   * - when value is true: content will always reuse the react component thus allows the component to keep its internal state
   * - when value is false: content will be destroyed when it's not visible
   * - when value is undefined: content is rendered normally as react component
   */
  cached?: boolean;
};

export type TabCreator = (tabData: SavedTabInfo) => TabInfo;
