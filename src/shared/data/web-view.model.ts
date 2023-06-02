import { ReactNode } from 'react';

/** Props that are passed to the web view component */
export type WebViewProps = WebViewContents & Pick<SavedTabInfo, 'id'>;

/**
 * Serialized information used to recreate a tab.
 *
 * {@link TabLoader} deserializes this into {@link TabInfo}
 */
export type SavedTabInfo = {
  /**
   * Tab ID - a unique identifier that identifies this tab
   */
  id: string;
  /**
   * Type of tab - indicates what kind of built-in tab this info represents
   */
  tabType: string;
  /**
   * Data needed to deserialize the tab during load
   */
  data?: unknown;
};

/**
 * Information that Paranext uses to create a tab in the dock layout.
 *
 * {@link TabLoader} deserialize {@link SavedTabInfo} into this
 */
export type TabInfo = SavedTabInfo & {
  /**
   * Text to show on the title bar of the tab
   */
  title: string;
  /**
   * Content to show inside the tab.
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
 * Function that takes a serialized tab and creates a Paranext tab out of it. Each type of tab must
 * provide a TabLoader.
 *
 * For now all tab creators must do their own data type verification
 */
export type TabLoader = (savedTabInfo: SavedTabInfo) => TabInfo;

/**
 * Function that takes a Paranext tab and creates a serialized tab out of it. Each type of tab can
 * provide a TabSaver. If they do not provide one, the `SavedTabInfo` properties are stripped from
 * TabInfo before saving.
 */
export type TabSaver = (tabInfo: TabInfo) => SavedTabInfo;

export enum WebViewContentType {
  React = 'react',
  HTML = 'html',
}

/** Base WebView properties that all WebViews share */
type WebViewContentsBase = { webViewType: string; content: string; title?: string };

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

/** Serialized WebView information that does not contain the content of the WebView */
export type WebViewContentsSerialized =
  | Omit<WebViewContentsReact, 'content'>
  | Omit<WebViewContentsHtml, 'content'>;

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
