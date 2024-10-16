import { MutableRefObject, ReactNode } from 'react';
import { DockLayout, DropDirection, LayoutBase } from 'rc-dock';
import { WebViewDefinition, WebViewDefinitionUpdateInfo } from '@shared/models/web-view.model';
import { LocalizeKey } from 'platform-bible-utils';

/**
 * Saved information used to recreate a tab.
 *
 * - {@link TabLoader} loads this into {@link TabInfo}
 * - {@link TabSaver} saves {@link TabInfo} into this
 */
export type SavedTabInfo = {
  /**
   * Tab ID - a unique identifier that identifies this tab. If this tab is a WebView, this ID will
   * match the `WebViewDefinition.id`
   */
  id: string;
  /** Type of tab - indicates what kind of built-in tab this info represents */
  tabType: string;
  /** Data needed to load the tab */
  data?: unknown;
};

/**
 * Information that Paranext uses to create a tab in the dock layout.
 *
 * - {@link TabLoader} loads {@link SavedTabInfo} into this
 * - {@link TabSaver} saves this into {@link SavedTabInfo}
 */
export type TabInfo = SavedTabInfo & {
  /**
   * Url of image to show on the title bar of the tab
   *
   * Defaults to the software's standard logo.
   */
  tabIconUrl?: string;
  /**
   * Text to show (or a localizeKey that will automatically be localized) on the title bar of the
   * tab
   */
  tabTitle: string | LocalizeKey;
  /** Text to show when hovering over the title bar of the tab */
  tabTooltip?: string;
  /** Content to show inside the tab. */
  content: ReactNode;
  /** (optional) Minimum width that the tab can become in CSS `px` units */
  minWidth?: number;
  /** (optional) Minimum height that the tab can become in CSS `px` units */
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
 * @param tabInfo The Paranext tab to save
 * @returns The saved tab info for Paranext to persist. If `undefined`, does not save the tab
 */
export type TabSaver = (tabInfo: TabInfo) => SavedTabInfo | undefined;

/** Information about a tab in a panel */
interface TabLayout {
  type: 'tab';
}

/**
 * Indicates where to display a floating window
 *
 * - `cascade` - place the window a bit below and to the right of the previously created floating
 *   window
 * - `center` - center the window in the dock layout
 */
type FloatPosition = 'cascade' | 'center';

/** The dimensions for a floating tab in CSS `px` units */
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

/** Props that are passed to the web view tab component */
export type WebViewTabProps = WebViewDefinition;

/** Rc-dock's onLayoutChange prop made asynchronous - resolves */
export type OnLayoutChangeRCDock = (
  newLayout: LayoutBase,
  currentTabId?: string,
  direction?: DropDirection,
) => Promise<void>;

/** Properties related to the dock layout */
export type PapiDockLayout = {
  /** The rc-dock dock layout React element ref. Used to perform operations on the layout */
  dockLayout: DockLayout;
  /**
   * A ref to a function that runs when the layout changes. We set this ref to our
   * {@link onLayoutChange} function
   */
  onLayoutChangeRef: MutableRefObject<OnLayoutChangeRCDock | undefined>;
  /**
   * Add or update a tab in the layout
   *
   * @param savedTabInfo Info for tab to add or update
   * @param layout Information about where to put a new tab
   * @returns If tab added, final layout used to display the new tab. If existing tab updated,
   *   `undefined`
   */
  addTabToDock: (savedTabInfo: SavedTabInfo, layout: Layout) => Layout | undefined;
  /**
   * Add or update a webview in the layout
   *
   * @param webView Web view to add or update
   * @param layout Information about where to put a new webview
   * @returns If WebView added, final layout used to display the new webView. If existing webView
   *   updated, `undefined`
   */
  addWebViewToDock: (webView: WebViewTabProps, layout: Layout) => Layout | undefined;
  /**
   * Remove a tab in the layout
   *
   * @param tabId ID of the tab to remove
   */
  removeTabFromDock: (tabId: string) => boolean;
  /**
   * Gets the WebView definition for the web view with the specified ID
   *
   * @param webViewId The ID of the WebView whose web view definition to get
   * @returns WebView definition with the specified ID or undefined if not found
   */
  getWebViewDefinition: (webViewId: string) => WebViewDefinition | undefined;
  /**
   * Updates the WebView with the specified ID with the specified properties
   *
   * @param webViewId The ID of the WebView to update
   * @param updateInfo Properties to update on the WebView. Any unspecified properties will stay the
   *   same
   * @returns True if successfully found the WebView to update; false otherwise
   */
  updateWebViewDefinition: (webViewId: string, updateInfo: WebViewDefinitionUpdateInfo) => boolean;
  /**
   * The layout to use as the default layout if the dockLayout doesn't have a layout loaded.
   *
   * TODO: This should be removed and the `testLayout` imported directly in this file once this
   * service is refactored to split the code between processes. The only reason this is passed from
   * `platform-dock-layout.component.tsx` is that we cannot import `testLayout` here since this
   * service is currently all shared code. Refactor should happen in #203
   */
  testLayout: LayoutBase;
};
