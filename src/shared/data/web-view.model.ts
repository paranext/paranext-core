import { ReactNode } from 'react';

export type WebViewProps = Omit<WebViewContents, 'componentName'>;

/**
 * Information used to recreate a tab
 */
export type SavedTabInfo = {
  /**
   * Tab ID - must be unique
   */
  id?: string;
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
 * The underlying tab type. Used to determine which extension owns it.
 */
export type TabType = string;

/**
 * For now all tab creators must do their own data type verification
 */
export type TabCreator = (tabData: SavedTabInfo) => TabInfo;

export enum WebViewContentType {
  React = 'react',
  HTML = 'html',
}

/** Base WebView properties that all WebViews share */
type WebViewContentsBase = { id: string; content: string; title?: string };

/** WebView representation using React */
export type WebViewContentsReact = WebViewContentsBase & {
  contentType?: WebViewContentType.React;
  componentName: string;
  styles?: string;
};

/** WebView representation using HTML */
export type WebViewContentsHtml = WebViewContentsBase & {
  contentType: WebViewContentType.HTML;
};

/** WebView definition created by extensions to show web content */
export type WebViewContents = WebViewContentsReact | WebViewContentsHtml;
