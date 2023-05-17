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
  styles?: string;
};

/** WebView representation using HTML */
export type WebViewContentsHtml = WebViewContentsBase & {
  contentType: WebViewContentType.HTML;
};

/** WebView definition created by extensions to show web content */
export type WebViewContents = WebViewContentsReact | WebViewContentsHtml;

export const TYPE_WEBVIEW = 'webView';

interface TabLayout {
  type: 'tab';
}

export interface FloatLayout {
  type: 'float';
  floatSize?: { width: number; height: number };
}

export type PanelDirection =
  | 'left'
  | 'right'
  | 'bottom'
  | 'top'
  // TODO: The following produce a panel but probably aren't useful for panels - IJH 2023-05-5
  | 'before-tab'
  | 'after-tab'
  | 'maximize'
  | 'move'
  | 'active'
  | 'update';

interface PanelLayout {
  type: 'panel';
  direction?: PanelDirection;
  /** If undefined, it will add in the `direction` relative to the previously added tab. */
  targetTabId?: string;
}

export type Layout = TabLayout | FloatLayout | PanelLayout;

/** Event emitted when webViews are added */
export type AddWebViewEvent = {
  webView: WebViewProps;
  layout: Layout;
};
