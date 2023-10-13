import { ReactNode } from 'react';

/**
 * Saved information used to recreate a tab.
 *
 * {@link TabLoader} loads this into {@link TabInfo}
 * {@link TabSaver} saves {@link TabInfo} into this
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
   * Data needed to load the tab
   */
  data?: unknown;
};

/**
 * Information that Paranext uses to create a tab in the dock layout.
 *
 * {@link TabLoader} loads {@link SavedTabInfo} into this
 * {@link TabSaver} saves this into {@link SavedTabInfo}
 */
export type TabInfo = SavedTabInfo & {
  /**
   * Url of image to show on the title bar of the tab
   *
   * Defaults to Platform.Bible logo
   */
  tabIconUrl?: string;
  /**
   * Text to show on the title bar of the tab
   */
  tabTitle: string;
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
 * Function that takes a {@link SavedTabInfo} and creates a Paranext tab out of it. Each type of tab
 * must provide a {@link TabLoader}.
 *
 * For now all tab creators must do their own data type verification
 */
export type TabLoader = (savedTabInfo: SavedTabInfo) => TabInfo;

/**
 * Function that takes a Paranext tab and creates a saved tab out of it. Each type of tab can
 * provide a {@link TabSaver}. If they do not provide one, the properties added by `TabInfo` are
 * stripped from TabInfo by `saveTabInfoBase` before saving (so it is just a {@link SavedTabInfo}).
 *
 * @param tabInfo the Paranext tab to save
 *
 * @returns The saved tab info for Paranext to persist. If `undefined`, does not save the tab
 */
export type TabSaver = (tabInfo: TabInfo) => SavedTabInfo | undefined;

/** The type of code that defines a webview's content */
export enum WebViewContentType {
  /**
   * This webview is a React webview. It must specify its component by setting it to
   * `globalThis.webViewComponent`
   */
  React = 'react',
  /** This webview is a raw HTML/JS/CSS webview. */
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
  /**
   * Url of image to show on the title bar of the tab
   *
   * Defaults to Platform.Bible logo
   */
  iconUrl?: string;
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
 * Saved WebView information that does not contain the actual content of the WebView. Saved into
 * layouts. Could have as little as the type and id. WebView providers load these into actual
 * {@link WebViewDefinition}s and verify any existing properties on the WebViews.
 */
export type SavedWebViewDefinition =
  | (
      | Partial<Omit<WebViewDefinitionReact, 'content' | 'styles'>>
      | Partial<Omit<WebViewDefinitionHtml, 'content'>>
    ) &
      Pick<WebViewDefinitionBase, 'id' | 'webViewType'>;

/** Props that are passed to the web view component */
export type WebViewProps = WebViewDefinition;

/** Information about a tab in a panel */
interface TabLayout {
  type: 'tab';
}

/**
 * Indicates where to display a floating window
 *
 * `cascade` - place the window a bit below and to the right of the previously created floating
 *    window
 * `center` - center the window in the dock layout
 */
type FloatPosition = 'cascade' | 'center';

/** The dimensions for a floating tab */
export type FloatSize = { width: number; height: number };

/** Information about a floating window */
export interface FloatLayout {
  type: 'float';
  floatSize?: FloatSize;
  /** Where to display the floating window. Defaults to `cascade` */
  position?: FloatPosition;
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

/** Information about a panel */
interface PanelLayout {
  type: 'panel';
  direction?: PanelDirection;
  /** If undefined, it will add in the `direction` relative to the previously added tab. */
  targetTabId?: string;
}

/** Information about how a Paranext tab fits into the dock layout */
export type Layout = TabLayout | FloatLayout | PanelLayout;

/** Event emitted when webViews are created */
export type AddWebViewEvent = {
  webView: SavedWebViewDefinition;
  layout: Layout;
};

/** Options that affect what `webViews.getWebView` does */
export type GetWebViewOptions = {
  /**
   * If provided and if a web view with this id exists, requests from the web view provider an
   * existing WebView with this id if one exists. The web view provider can deny the request if it
   * chooses to do so.
   *
   * Alternatively, set this to '?' to attempt to find any existing web view with the specified
   * webViewType.
   *
   * Note: setting `existingId` to `undefined` counts as providing in this case (providing is tested
   * with `'existingId' in options`, not just testing if `existingId` is truthy). Not providing an
   * `existingId` at all is the only way to specify we are not looking for an existing webView
   */
  existingId?: string | '?' | undefined;
  /**
   * Whether to create a webview with a new id and a webview with id `existingId` was not found.
   * Only relevant if `existingId` is provided. If `existingId` is not provided, this property is
   * ignored.
   *
   * Defaults to true
   */
  createNewIfNotFound?: boolean;
};
