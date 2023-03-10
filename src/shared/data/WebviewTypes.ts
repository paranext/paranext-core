import { ReactNode } from 'react';

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
  data?: unknown;
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
  content: ReactNode;
  /**
   * (optional) Minimum width that the tab can become
   */
  minWidth?: number;
  /**
   * (optional) Minimum height that the tab can become
   */
  minHeight?: number;
};

/**
 * For now all tab creators must do their own data type verification
 */
export type TabCreator = (tabData: SavedTabInfo) => TabInfo;
