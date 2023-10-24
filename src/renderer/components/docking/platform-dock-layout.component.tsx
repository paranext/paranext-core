import 'rc-dock/dist/rc-dock.css';
import './platform-dock-layout.component.css';
import { useRef, useEffect } from 'react';
import DockLayout, {
  BoxData,
  FloatPosition,
  LayoutSize,
  PanelData,
  TabData,
  TabGroup,
} from 'rc-dock';
import {
  ErrorTabData,
  TAB_TYPE_ERROR,
  createErrorTab,
  saveErrorTab,
} from '@renderer/components/docking/error-tab.component';
import PlatformPanel from '@renderer/components/docking/platform-panel.component';
import PlatformTabTitle from '@renderer/components/docking/platform-tab-title.component';
import {
  loadWebViewTab,
  TAB_TYPE_WEBVIEW,
  saveWebViewTab,
  updateWebViewTab,
} from '@renderer/components/web-view.component';
import { loadAboutTab, TAB_TYPE_ABOUT } from '@renderer/testing/about-panel.component';
import { loadButtonsTab, TAB_TYPE_BUTTONS } from '@renderer/testing/test-buttons-panel.component';
import testLayout from '@renderer/testing/test-layout.data';
import { loadTestTab, TAB_TYPE_TEST } from '@renderer/testing/test-panel.component';
import {
  loadQuickVerseHeresyTab,
  TAB_TYPE_QUICK_VERSE_HERESY,
} from '@renderer/testing/test-quick-verse-heresy-panel.component';
import {
  FloatLayout,
  FloatSize,
  SavedTabInfo,
  TabLoader,
  TabInfo,
  TabSaver,
  Layout,
  WebViewTabProps,
  PanelDirection,
  WebViewDefinitionUpdateInfo,
  WebViewDefinition,
} from '@shared/data/web-view.model';
import LogError from '@shared/log-error.model';
import {
  OnLayoutChangeRCDock,
  mergeUpdatablePropertiesIntoWebViewDefinition,
  registerDockLayout,
  saveTabInfoBase,
} from '@shared/services/web-view.service';
import { getErrorMessage } from '@shared/utils/util';
import {
  loadDownloadUpdateProjectTab,
  TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG,
} from '@renderer/components/projects/download-update-project-tab.component';
import {
  loadOpenMultipleProjectsTab,
  TAB_TYPE_OPEN_MULTIPLE_PROJECTS_DIALOG,
} from '@renderer/components/projects/open-multiple-projects-tab.component';
import {
  TAB_TYPE_EXTENSION_MANAGER,
  loadExtensionManagerTab,
} from '@renderer/components/extension-manager/extension-manager-tab.component';
import {
  TAB_TYPE_SETTINGS_DIALOG,
  loadSettingsDialog,
} from '@renderer/components/settings-dialog/settings-tab.component';
import {
  TAB_TYPE_RUN_BASIC_CHECKS,
  loadRunBasicChecksTab,
} from '@renderer/components/run-basic-checks-dialog/run-basic-checks-tab.component';
import {
  TAB_TYPE_BASIC_LIST,
  loadBasicListTab,
} from '@renderer/components/basic-list/basic-list.component';
import {
  TAB_TYPE_WORD_LIST,
  loadWordListTab,
} from '@renderer/components/word-list/word-list.component';
import { hasDialogRequest, resolveDialogRequest } from '@renderer/services/dialog.service-host';
import { DialogData } from '@shared/models/dialog-options.model';
import DIALOGS from '@renderer/components/dialogs';
import cloneDeep from 'lodash/cloneDeep';

type TabType = string;

type RCDockTabInfo = TabData & TabInfo;

/** The default initial size for floating tabs in CSS `px` units. Can be overridden by tabTypes' initial sizes */
const DEFAULT_FLOAT_SIZE: FloatSize = { width: 300, height: 150 };
/** Default direction a tab will be placed from an existing tab if created as a panel */
const DEFAULT_PANEL_DIRECTION: PanelDirection = 'right';

const DOCK_FLOAT_OFFSET = 28;
// NOTE: 'card' is a built-in style. We can likely remove it when we create a full theme for
// Platform.
const TAB_GROUP = 'card platform-bible';

const groups: { [key: string]: TabGroup } = {
  [TAB_GROUP]: {
    maximizable: false, // Don't allow groups of tabs to be maximized
    floatable: true, // Allow tabs to be floated
    animated: false, // Don't animate tab transitions
    // TODO: Currently allowing newWindow crashes since electron doesn't seem to have window.open defined?
    // newWindow: true, // Allow floating windows to show in a native window
  },
};

// #region utility functions that deal with loading, saving, and adding webviews. This code should
// really be in `web-view.service.ts`, but that file cannot currently import renderer code as it is
// a shared file.
// TODO: please move these utility functions with #203

/** tab loader functions for each Platform tab type */
const tabLoaderMap = new Map<TabType, TabLoader>([
  [TAB_TYPE_ABOUT, loadAboutTab],
  [TAB_TYPE_BUTTONS, loadButtonsTab],
  [TAB_TYPE_QUICK_VERSE_HERESY, loadQuickVerseHeresyTab],
  [TAB_TYPE_TEST, loadTestTab],
  [TAB_TYPE_WEBVIEW, loadWebViewTab],
  [TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG, loadDownloadUpdateProjectTab],
  [TAB_TYPE_OPEN_MULTIPLE_PROJECTS_DIALOG, loadOpenMultipleProjectsTab],
  [TAB_TYPE_EXTENSION_MANAGER, loadExtensionManagerTab],
  [TAB_TYPE_SETTINGS_DIALOG, loadSettingsDialog],
  [TAB_TYPE_RUN_BASIC_CHECKS, loadRunBasicChecksTab],
  [TAB_TYPE_BASIC_LIST, loadBasicListTab],
  [TAB_TYPE_WORD_LIST, loadWordListTab],
  ...Object.entries(DIALOGS).map(
    ([dialogTabType, dialogDefinition]) =>
      // The default implementation of `loadDialog` uses `this`, so bind it to the definition
      [dialogTabType, dialogDefinition.loadDialog.bind(dialogDefinition)] as const,
  ),
]);

/** tab saver functions for each Platform tab type that wants to override the default */
const tabSaverMap = new Map<TabType, TabSaver>([
  [TAB_TYPE_WEBVIEW, saveWebViewTab],
  [TAB_TYPE_ERROR, saveErrorTab],
  ...Object.entries(DIALOGS).map(
    ([dialogTabType, dialogDefinition]) =>
      // The default implementation of `saveDialog` uses `this`, so bind it to the definition
      [dialogTabType, dialogDefinition.saveDialog.bind(dialogDefinition)] as const,
  ),
]);

/** Initial sizes for each tab in CSS `px` units if created as floating tabs */
const tabInitialFloatingSize: Record<TabType, FloatSize> = Object.fromEntries(
  Object.entries(DIALOGS).map(
    ([dialogTabType, dialogDefinition]) => [dialogTabType, dialogDefinition.initialSize] as const,
  ),
);

let previousTabId: string | undefined;
let previousFloatPosition: FloatPosition = { left: 0, top: 0, width: 0, height: 0 };

/**
 * Loads tab data from the specified saved tab information by running the tab loader provided by the
 * component file that registered this tab type
 * @param savedTabInfo Data that is to be used to create the new tab (comes from rc-dock)
 * @returns tab that holds all info needed to make an actual tab in the dock layout
 */
function loadSavedTabInfo(savedTabInfo: SavedTabInfo): TabInfo {
  const tabLoader = tabLoaderMap.get(savedTabInfo.tabType);
  if (!tabLoader) return createErrorTab(`No tab loader for tabType '${savedTabInfo.tabType}'`);

  // Call the creation method to let the extension method create the tab
  try {
    return tabLoader(savedTabInfo);
  } catch (e) {
    // If the tab couldn't be created, replace it with an error tab
    return createErrorTab(getErrorMessage(e));
  }
}

/**
 * Creates a tab ready to go into rc-dock from platform tab info
 * @param tabInfo data used to create the rc-dock tab
 *
 * @returns rc-dock tab created from `tabInfo`
 */
function createRCDockTabFromTabInfo(tabInfo: TabInfo) {
  // Translate the data from the loaded tab to be in the form needed by rc-dock
  return {
    ...tabInfo,
    title: <PlatformTabTitle iconUrl={tabInfo.tabIconUrl} text={tabInfo.tabTitle} />,
    content: <PlatformPanel>{tabInfo.content}</PlatformPanel>,
    group: TAB_GROUP,
    closable: true,
  };
}

/**
 * Loads tab data from the specified saved tab information into an actual dock layout tab
 * @param savedTabInfo Data that is to be used to create the new tab (comes from rc-dock)
 * @returns live dock layout tab ready to used
 */
export function loadTab(savedTabInfo: SavedTabInfo): RCDockTabInfo {
  if (!savedTabInfo.id) throw new LogError('loadTab: "id" is missing.');

  // Load the tab from the saved tab info
  const tabInfo = loadSavedTabInfo(savedTabInfo);

  return createRCDockTabFromTabInfo(tabInfo);
}

/**
 * Converts the tab data into saved tab information by running the tab saver provided by the
 * component file that registered this tab type
 * @param dockTabInfo the tab data to save
 * @returns saved tab info ready to be saved into the layout
 */
function saveTab(dockTabInfo: RCDockTabInfo): SavedTabInfo | undefined {
  // Remove the rc-dock properties that are not also in SavedTabInfo
  // We don't need to use the other properties, but we need to remove them
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { parent, group, closable, title, ...strippedTabInfo } = dockTabInfo;
  const tabInfo: TabInfo = strippedTabInfo;

  const tabSaver = tabSaverMap.get(tabInfo.tabType);

  return tabSaver ? tabSaver(tabInfo) : saveTabInfoBase(tabInfo);
}

/**
 * Check if the input item is just a tab, i.e. not a panel, box, or float.
 * @param tab to check.
 * @returns `true` if its a tab or `false` otherwise.
 */
function isTab(tab: PanelData | TabData | BoxData | undefined): tab is TabData {
  // Assert the more specific type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  if (!tab || (tab as TabData).title == null) return false;
  return true;
}

function offsetOrOverflowAxis(
  axis: number,
  size: number,
  max: number,
  offset = DOCK_FLOAT_OFFSET,
): number {
  if (axis + size + offset >= max) return offset;
  return axis + offset;
}

/**
 * Get left & top so float windows cascade their position. Float window should not overflow the
 * layout but start cascading again.
 * @param layout specified by the WebView. Must have all values - this function assumes this layout
 *   has had default values set already
 * @param previousPosition used with the previous float window.
 * @param layoutSize of the whole dock layout.
 * @returns cascaded position.
 */
export function getFloatPosition(
  layout: FloatLayout,
  previousPosition: FloatPosition,
  layoutSize: LayoutSize,
): FloatPosition {
  // Defaults are added in `layoutDefaults`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const { width, height } = layout.floatSize!;

  let { left, top } = previousPosition;

  switch (layout.position) {
    case 'center':
      left = layoutSize.width / 2 - width / 2;
      top = layoutSize.height / 2 - height / 2;
      break;
    case 'cascade':
    default:
      left = offsetOrOverflowAxis(left, width, layoutSize.width);
      top = offsetOrOverflowAxis(top, height, layoutSize.height);
      break;
  }
  return { left, top, width, height };
}

/** Find the previous tab if one was previously added or find the first tab otherwise */
function findPreviousTab(dockLayout: DockLayout) {
  // If we have a previous tab, try to find it
  if (previousTabId !== undefined) {
    const previousTab = dockLayout.find(previousTabId);
    // If we found the previous tab, go with that
    if (previousTab) return previousTab;
  }
  // We don't have a previous tab or we didn't find the one we thought we had. Just find the first
  // available tab. Assert the more specific type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return dockLayout.find((tabData) => isTab(tabData)) as TabData;
}

/** Set up defaults for webview layout instructions */
function layoutDefaults(layout: Layout, savedTabInfo: SavedTabInfo): Layout {
  const layoutDefaulted = cloneDeep(layout);
  switch (layoutDefaulted.type) {
    case 'float': {
      if (!layoutDefaulted.floatSize) {
        layoutDefaulted.floatSize =
          tabInitialFloatingSize[savedTabInfo.tabType] || DEFAULT_FLOAT_SIZE;
      } else {
        if (!layoutDefaulted.floatSize.width || layoutDefaulted.floatSize.width <= 0)
          layoutDefaulted.floatSize.width =
            tabInitialFloatingSize[savedTabInfo.tabType]?.width || DEFAULT_FLOAT_SIZE.width;

        if (!layoutDefaulted.floatSize.height || layoutDefaulted.floatSize.height <= 0)
          layoutDefaulted.floatSize.height =
            tabInitialFloatingSize[savedTabInfo.tabType]?.height || DEFAULT_FLOAT_SIZE.height;
      }

      break;
    }
    case 'panel':
      if (!layoutDefaulted.direction) layoutDefaulted.direction = DEFAULT_PANEL_DIRECTION;
      break;
    case 'tab':
    default:
    // do nothing
  }
  return layoutDefaulted;
}

/**
 * Add or update a tab in the layout
 * @param savedTabInfo info for tab to add or update
 * @param layout information about where to put a new tab
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 * layout
 *
 * @returns If tab added, final layout used to display the new tab. If existing tab updated,
 *   `undefined`
 */
export function addTabToDock(
  savedTabInfo: SavedTabInfo,
  layout: Layout,
  dockLayout: DockLayout,
): Layout | undefined {
  const tab = loadTab(savedTabInfo);
  let targetTab = dockLayout.find(tab.id);

  // Update existing tab
  if (targetTab) {
    dockLayout.updateTab(tab.id, tab, false);
    if (isTab(targetTab)) previousTabId = tab.id;

    // We did not add a tab, so return undefined to indicate that
    return undefined;
  }

  // Figure out layout defaults for this tab
  const updatedLayout = layoutDefaults(layout, savedTabInfo);

  // Add new tab
  switch (updatedLayout.type) {
    case 'tab':
      targetTab = findPreviousTab(dockLayout);
      if (targetTab) {
        if (previousTabId === undefined)
          // The target tab is the first found tab, so just add this as a new panel on top.
          // Assert the more specific type.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          dockLayout.dockMove(tab, targetTab.parent as PanelData, 'top');
        // The target tab is a previously added tab, so add this as a tab next to it
        else dockLayout.dockMove(tab, targetTab, 'after-tab');
      }
      // Didn't find any tabs. Add as a new tab
      else
        dockLayout.dockMove(
          tab,
          // Find the first thing (the dock box) and add the tab to it
          dockLayout.find(() => true) ?? null,
          'middle',
        );
      previousTabId = tab.id;
      break;

    case 'float': {
      const floatPosition = getFloatPosition(
        updatedLayout,
        previousFloatPosition,
        dockLayout.getLayoutSize(),
      );

      if (!updatedLayout.position || updatedLayout.position === 'cascade')
        // Update the previous float position so the next cascading float layout will appear after it
        previousFloatPosition = floatPosition;

      dockLayout.dockMove(tab, null, 'float', floatPosition);
      break;
    }
    case 'panel':
      if (updatedLayout.targetTabId !== undefined) {
        // Look for a specific tab
        targetTab = dockLayout.find(updatedLayout.targetTabId);
        if (!isTab(targetTab))
          throw new LogError(
            `When adding a panel, unknown target tab: '${updatedLayout.targetTabId}'`,
          );
      }
      // Didn't ask for a specific tab, so just get the previous tab and go from there
      else targetTab = findPreviousTab(dockLayout);

      dockLayout.dockMove(
        tab,
        // Add to the parent of the found tab if we found a tab. Assert the more specific type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        (targetTab?.parent as PanelData) ??
          // Otherwise find the first thing (the dock box) and add the tab to it
          dockLayout.find(() => true) ??
          null,
        // Defaults are added in `layoutDefaults`.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        updatedLayout.direction!,
      );
      break;

    default:
      // Type assert here because TypeScript thinks this layout is `never` because the switch has
      // covered all its options (if JS were statically typed, this `default` would never hit)
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      throw new LogError(`Unknown layoutType: '${(updatedLayout as Layout).type}'`);
  }

  // If there was an error loading the tab, we create an error tab. But we also want to throw here
  // so people know there was a problem.
  // TODO: Do we really want to create an error tab in the first place? Or maybe that should only
  // happen on startup
  if (tab.tabType === TAB_TYPE_ERROR)
    throw new LogError(
      // Assert the more specific type.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      `Dock Layout created an error tab: ${(tab.data as ErrorTabData)?.errorMessage}`,
    );

  return updatedLayout;
}

/**
 * Add or update a webview in the layout
 * @param webView web view to add or update
 * @param layout information about where to put a new webview
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 * layout
 *
 * @returns If WebView added, final layout used to display the new webView. If existing webView
 *   updated, `undefined`
 */
export function addWebViewToDock(
  webView: WebViewTabProps,
  layout: Layout,
  dockLayout: DockLayout,
): Layout | undefined {
  const tabId = webView.id;
  if (!tabId)
    throw new Error(
      `platform-dock-layout error: WebView of type ${webView.webViewType} has no id!`,
    );
  return addTabToDock({ id: tabId, tabType: TAB_TYPE_WEBVIEW, data: webView }, layout, dockLayout);
}

/**
 * Gets the web view definition (data on the TabInfo) for the web view with the specified id
 *
 * @param webViewId the id of the WebView whose web view definition to get
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 * layout
 * @param methodName name of the method that is calling this - prints in thrown exceptions
 *
 * @returns `[targetTabInfo, targetTabWebViewData]`
 * - `targetTabInfo` - tab info for the tab containing the web view specified or `undefined` if not
 *   found
 * - `targetTabWebViewData` - web view definition for the specified web view or `undefined` if not
 *   found
 *
 * @throws if the tab found with the specified webViewId is not a tab or is not a webview
 */
function getWebViewTabInfoById(
  webViewId: string,
  dockLayout: DockLayout,
  methodName: string,
): [RCDockTabInfo | undefined, WebViewDefinition | undefined] {
  const targetTab = dockLayout.find(webViewId);

  // If we didn't find the webview, return false
  if (!targetTab) return [undefined, undefined];

  if (!isTab(targetTab))
    throw new Error(
      `platform-dock-layout.component ${methodName} error: target tab with id '${targetTab.id}' is not a tab`,
    );

  // We know the tab in the dock layout is RCDockTabInfo because we set it to be that
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const targetTabInfo = targetTab as RCDockTabInfo;

  if (targetTabInfo.tabType !== TAB_TYPE_WEBVIEW)
    throw new Error(
      `platform-dock-layout.component ${methodName} error: target tab with id '${targetTab.id}' is not a WebView tab`,
    );

  // Type assert the webview data in the web view tab
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const targetTabWebViewData = targetTabInfo.data as WebViewDefinition;

  return [targetTabInfo, targetTabWebViewData];
}

/**
 * Gets the WebView definition for the web view with the specified id
 *
 * @param webViewId the id of the WebView whose web view definition to get
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 * layout
 *
 * @returns WebView definition with the specified id or undefined if not found
 */
export function getWebViewDefinition(
  webViewId: string,
  dockLayout: DockLayout,
): WebViewDefinition | undefined {
  const [, targetTabWebViewData] = getWebViewTabInfoById(
    webViewId,
    dockLayout,
    'getWebViewDefinitionUpdatableProperties',
  );

  return targetTabWebViewData;
}

/**
 * Updates the WebView with the specified id with the specified properties
 *
 * @param webViewId the id of the WebView to update
 * @param updateInfo properties to update on the WebView. Any unspecified
 * properties will stay the same
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 * layout
 *
 * @returns true if successfully found the WebView to update; false otherwise
 */
function updateWebViewDefinition(
  webViewId: string,
  updateInfo: WebViewDefinitionUpdateInfo,
  dockLayout: DockLayout,
): boolean {
  const [targetTabInfo, targetTabWebViewData] = getWebViewTabInfoById(
    webViewId,
    dockLayout,
    'updateWebViewDefinition',
  );

  if (!targetTabInfo || !targetTabWebViewData) return false;

  // Add the updatable properties according to `WebViewDefinitionUpdateInfo` to the tab's data
  const updatedWebViewData = mergeUpdatablePropertiesIntoWebViewDefinition(
    targetTabWebViewData,
    updateInfo,
  );
  const updatedTabData = createRCDockTabFromTabInfo(
    updateWebViewTab(targetTabInfo, updatedWebViewData),
  );
  // Update existing tab
  dockLayout.updateTab(webViewId, updatedTabData, false);
  return true;
}

// #endregion

export default function PlatformDockLayout() {
  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const dockLayoutRef = useRef<DockLayout>(null!);

  /**
   * onLayoutChange function from `web-view.service.ts` once this docklayout is registered.
   *
   * TODO: Strange pattern that we are setting a ref to a service function. Investigate changing
   * this pattern in some way. Maybe just export `onLayoutChange`?
   */
  const onLayoutChangeRef = useRef<OnLayoutChangeRCDock | undefined>();

  useEffect(() => {
    // Register with `web-view.service.ts` so it can perform operations on us
    const unsub = registerDockLayout({
      dockLayout: dockLayoutRef.current,
      onLayoutChangeRef,
      addTabToDock: (savedTabInfo: SavedTabInfo, layout: Layout) =>
        addTabToDock(savedTabInfo, layout, dockLayoutRef.current),
      addWebViewToDock: (webView: WebViewTabProps, layout: Layout) =>
        addWebViewToDock(webView, layout, dockLayoutRef.current),
      removeTabFromDock: (tabId: string) => {
        const tabToRemove = dockLayoutRef.current.find(tabId);
        if (isTab(tabToRemove)) dockLayoutRef.current.dockMove(tabToRemove, null, 'remove');
        // Return whether or not we found the tab to remove
        return !!tabToRemove;
      },
      getWebViewDefinition: (webViewId) => getWebViewDefinition(webViewId, dockLayoutRef.current),
      updateWebViewDefinition: (webViewId, updateInfo) =>
        updateWebViewDefinition(webViewId, updateInfo, dockLayoutRef.current),
      testLayout,
    });
    return () => {
      unsub();
    };
    // Is there any situation where dockLayoutRef will change? We need to add to dependencies if so
  }, []);

  return (
    <DockLayout
      ref={dockLayoutRef}
      groups={groups}
      defaultLayout={{ dockbox: { mode: 'horizontal', children: [] } }}
      dropMode="edge"
      loadTab={loadTab}
      // Type assert `saveTab` as not returning `undefined` because rc-dock's types are wrong
      // Here, if `saveTab` returns `undefined` the tab is not saved
      // https://github.com/ticlo/rc-dock/blob/8b6481dca4b4dd07f89107d6f48b1831bbdf0470/src/Serializer.ts#L68
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      saveTab={saveTab as (dockTabInfo: RCDockTabInfo) => SavedTabInfo}
      onLayoutChange={(...args) => {
        const [, currentTabId, direction] = args;
        // If a dialog was closed, tell the dialog service
        if (currentTabId && direction === 'remove') {
          // Assert the more specific type.
          /* eslint-disable no-type-assertion/no-type-assertion */
          const removedTab = dockLayoutRef.current.find(currentTabId) as RCDockTabInfo;
          if ((removedTab.data as DialogData)?.isDialog && hasDialogRequest(currentTabId))
            /* eslint-enable */
            resolveDialogRequest(currentTabId, null, false);
        }

        (async () => {
          if (onLayoutChangeRef.current) {
            try {
              await onLayoutChangeRef.current(...args);
            } catch (e) {
              throw new Error(
                `platform-dock-layout.component error: Failed to run onLayoutChangeRef.current! currentTabId: ${currentTabId}, direction: ${direction}`,
              );
            }
          }
        })();
      }}
    />
  );
}
