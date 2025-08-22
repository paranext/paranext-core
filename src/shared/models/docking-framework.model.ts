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
  /** The last time (`Date.now()`) the tab was instructed to flash its contents in the UI. */
  flashTriggerTime?: number;
  /** Content to show inside the tab. */
  content: ReactNode;
  /** (optional) Minimum width that the tab can become in CSS `px` units */
  minWidth?: number;
  /** (optional) Minimum height that the tab can become in CSS `px` units */
  minHeight?: number;
  /** Last known focused element. Used for restoring focus in the tab */
  lastFocusedElement?: HTMLElement;
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

/**
 * JSDOC SOURCE DirectionFromTab
 *
 * Direction relative to a tab pointing to another tab. Can be used to navigate between tabs in the
 * dock layout.
 *
 * Note: In the following descriptions, "forward"/"next" means right in LTR and left in RTL, and
 * "backward"/"previous" means left in LTR and right in RTL
 *
 * - `nextTab` - go forward one tab. If there are no more tabs after this tab in this tab's tab group,
 *   go to the backward-most tab in the next tab group (useful for cycling through all tabs)
 * - `previousTab` - go backward one tab. If there are no more tabs before this tab in this tab's tab
 *   group, go to the forward-most tab in the previous tab group (useful for cycling through all
 *   tabs)
 * - `nextTabGroup` - go to the active tab in the tab group forward from the tab group this tab is in
 * - `previousTabGroup` - go to the active tab in the tab group backward from the tab group this tab
 *   is in
 * - `nextTabOrGroup` - go forward one tab. If there are no more tabs after this tab in this tab's tab
 *   group, go to the active tab in the next tab group
 * - `previousTabOrGroup` - go backward one tab. If there are no more tabs before this tab in this
 *   tab's tab group, go to the active tab in the previous tab group
 * - `nearTabOrNextGroup` - go forward or backward one tab if there is another in the same tab group.
 *   If there are no more tabs in this tab's tab group, go to the active tab in the next tab group
 *   (useful for closing a tab)
 */
export const DIRECTION_FROM_TAB = Object.freeze([
  'nextTab',
  'previousTab',
  'nextTabGroup',
  'previousTabGroup',
  'nextTabOrGroup',
  'previousTabOrGroup',
  'nearTabOrNextGroup',
] as const);
/** JSDOC DESTINATION DirectionFromTab */
export type DirectionFromTab = (typeof DIRECTION_FROM_TAB)[number];

/**
 * Checks if the specified direction is a valid {@link DirectionFromTab}.
 *
 * @param direction The direction to check
 * @returns True if the direction is a valid {@link DirectionFromTab}, false otherwise
 */
export function isDirectionFromTab(direction: unknown): direction is DirectionFromTab {
  if (!direction) return false;

  // TypeScript's `includes` types are very weird. This code works fine, but TypeScript wants anything
  // passed to `includes` to be of the type of the array for some reason. But that's the whole point here.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return DIRECTION_FROM_TAB.includes(direction as DirectionFromTab);
}

/** Information about a tab in a panel */
interface TabLayout {
  type: 'tab';
  /** Id of the parent dock box that the tab belongs to */
  parentTabGroupId?: string;
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

interface ReplaceTabLayout {
  type: 'replace-tab';
  /** The ID of the tab to replace */
  targetTabId: string;
}

/** Information about how a Paranext tab fits into the dock layout */
export type Layout = TabLayout | FloatLayout | PanelLayout | ReplaceTabLayout;

/** Props that are passed to the web view tab component */
export type WebViewTabProps = WebViewDefinition;

/**
 * Rc-dock's onLayoutChange prop made asynchronous with `webViewDefinition` added. The dock layout
 * component calls this on the web view service when the layout changes.
 *
 * @param newLayout The changed layout to save.
 * @param currentTabId The tab being changed
 * @param direction The direction the tab is being moved (or deleted or other things - RCDock uses
 *   the word "direction" here loosely)
 * @param webViewDefinition The web view definition if the edit was on a web view; `undefined`
 *   otherwise
 * @returns Promise that resolves when finished doing things
 */
export type OnLayoutChangeRCDock = (
  newLayout: LayoutBase,
  currentTabId?: string,
  direction?: DropDirection,
  webViewDefinition?: WebViewDefinition,
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
   * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
   *   tabs. Defaults to `true`
   * @returns If tab added, final layout used to display the new tab. If existing tab updated,
   *   `undefined`
   */
  addTabToDock: (
    savedTabInfo: SavedTabInfo,
    layout: Layout,
    shouldBringToFront?: boolean,
  ) => Layout | undefined;
  /**
   * Add or update a webview in the layout
   *
   * @param webView Web view to add or update
   * @param layout Information about where to put a new webview
   * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
   *   tabs. Defaults to `true`
   * @returns If WebView added, final layout used to display the new webView. If existing webView
   *   updated, `undefined`
   */
  addWebViewToDock: (
    webView: WebViewTabProps,
    layout: Layout,
    shouldBringToFront?: boolean,
  ) => Layout | undefined;
  /**
   * Remove a tab in the layout
   *
   * @param tabId ID of the tab to remove
   */
  removeTabFromDock: (tabId: string) => boolean;
  /**
   * Float a tab in the layout
   *
   * @param tabId ID of the tab to float
   */
  floatTabById: (tabId: string) => void;
  /**
   * Gets the WebView definition for the web view with the specified ID
   *
   * @param webViewId The ID of the WebView whose web view definition to get
   * @returns WebView definition with the specified ID or undefined if not found
   */
  getWebViewDefinition: (webViewId: string) => WebViewDefinition | undefined;
  /**
   * Updates the tab with the specified id with the specified properties. No need to have all the
   * tab info; just specify the properties you want to update.
   *
   * WARNING: This does not work well with `tab.data` `WebViewDefinition` information. Use
   * `updateWebViewDefinition` for that instead
   *
   * @param tabId ID of the tab to update
   * @param partialTabInfo Partial tab info to update. Any unspecified properties will stay the same
   * @param shouldBringToFront If true, the tab will flash, will be brought to the front, and will
   *   be unobscured by other tabs. Defaults to `false`
   * @returns Updated tab info or `undefined` if the tab was not found
   * @throws If the item found in the dock layout with the specified ID is not a tab
   */
  updateTabPartial: (
    tabId: string,
    partialTabInfo: Partial<TabInfo>,
    shouldBringToFront?: boolean,
  ) => TabInfo | undefined;
  /**
   * Updates the WebView with the specified ID with the specified properties
   *
   * @param webViewId The ID of the WebView to update
   * @param updateInfo Properties to update on the WebView. Any unspecified properties will stay the
   *   same
   * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
   *   tabs. Defaults to `false`
   * @returns True if successfully found the WebView to update; false otherwise
   */
  updateWebViewDefinition: (
    webViewId: string,
    updateInfo: WebViewDefinitionUpdateInfo,
    shouldBringToFront?: boolean,
  ) => boolean;
  /**
   * Gets info for a tab in a direction from the source tab.
   *
   * @param sourceTabId ID of tab to go from to get to destination tab
   * @param direction Direction to go from the source tab to get to the destination tab
   * @returns Info for the destination tab or `undefined` if source tab or destination tab is not
   *   found
   * @throws If the item found in the dock layout with the source tab ID is not a tab
   * @throws If the item found in the dock layout with the destination tab ID is not a tab
   */
  getTabInfoByDirectionFromTab: (
    sourceTabId: string,
    direction: DirectionFromTab,
  ) => TabInfo | undefined;
  /**
   * Gets info for the tab that contains the specified DOM element
   *
   * @param tabElement The DOM element in the tab whose info to get
   * @returns Info for the tab in question or `undefined` if tab is not found
   * @throws If found a tab id in the DOM but there was no corresponding tab info in the dock layout
   */
  getTabInfoByElement: (tabElement: Element) => TabInfo | undefined;
  /**
   * Gets info for the tab with the specified ID
   *
   * @param tabId The ID of the tab whose info to get
   * @returns Info for the tab in question or `undefined` if tab is not found
   * @throws If the item found in the dock layout with the specified ID is not a tab
   */
  getTabInfoById: (tabId: string) => TabInfo | undefined;
  /**
   * Sets an existing tab as the active tab in its tab group, makes sure it is unobscured by other
   * tabs, and sets the document focus in that tab
   *
   * @param tabId ID of the tab to set active and focused
   * @returns `true` if successfully found tab to update, `false` otherwise
   */
  focusTab: (tabId: string) => boolean;
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
