import { ReactNode } from 'react';

/**
 * Serialized information used to recreate a tab.
 *
 * {@link TabLoader} deserializes this into {@link TabInfo}
 */
export type SavedTabInfo = {
  /**
   * Tab ID - a unique identifier that identifies this tab. If this tab is a WebView, this id will
   * match the WebViewDefinition.id
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

/** Type of code for a WebView */
export enum WebViewContentType {
  React = 'react',
  HTML = 'html',
}

/** What type a WebView is. Each WebView definition must have a unique type. */
export type WebViewType = string;

/** Id for a specific WebView. Each WebView has a unique id */
export type WebViewId = string;

/** Base WebView properties that all WebViews share */
type WebViewDefinitionBase = {
  /** What type of WebView this is. Unique to all other WebView definitions */
  webViewType: WebViewType;
  /** Unique id among webviews specific to this webview instance. */
  id: WebViewId;
  /** The code for the WebView that papi puts into an iframe */
  content: string;
  /** Name of the tab for the WebView */
  title?: string;
};

/** WebView representation using React */
export type WebViewDefinitionReact = WebViewDefinitionBase & {
  /** Indicates this WebView uses React */
  contentType?: WebViewContentType.React;
  /** String of styles to be loaded into the iframe for this WebView */
  styles?: string;
};

/** WebView representation using HTML */
export type WebViewDefinitionHtml = WebViewDefinitionBase & {
  /** Indicates this WebView uses HTML */
  contentType: WebViewContentType.HTML;
};

/** Properties defining a type of WebView created by extensions to show web content */
export type WebViewDefinition = WebViewDefinitionReact | WebViewDefinitionHtml;

/**
 * Serialized WebView information that does not contain the actual content of the WebView. Saved into
 * layouts. Could have as little as the type and id. WebView providers deserialize these into actual
 * {@link WebViewDefinition}s and verify any existing properties on the WebViews.
 */
export type WebViewDefinitionSerialized =
  | (
      | Partial<Omit<WebViewDefinitionReact, 'content'>>
      | Partial<Omit<WebViewDefinitionHtml, 'content'>>
    ) &
      Pick<WebViewDefinitionBase, 'id' | 'webViewType'>;

/** Props that are passed to the web view component */
export type WebViewProps = WebViewDefinition;

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

export type AddWebViewOptions = {
  /**
   * If provided, requests from the web view provider an existing existing WebView with this id
   * if one exists. The web view provider can deny the request if it chooses to do so.
   */
  existingId?: string;
};
