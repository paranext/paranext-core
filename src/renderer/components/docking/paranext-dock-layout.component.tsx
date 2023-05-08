import 'rc-dock/dist/rc-dock.css';
import './paranext-dock-layout.component.css';
import { useRef, useCallback } from 'react';
import DockLayout, { DropDirection, LayoutBase, LayoutData, TabData, TabGroup } from 'rc-dock';
import createErrorTab from '@renderer/components/docking/error-tab.component';
import ParanextPanel from '@renderer/components/docking/paranext-panel.component';
import ParanextTabTitle from '@renderer/components/docking/paranext-tab-title.component';
import createWebViewPanel from '@renderer/components/web-view.component';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import createAboutPanel from '@renderer/testing/about-panel.component';
import createButtonsPanel from '@renderer/testing/test-buttons-panel.component';
import testLayout, { WEBVIEW_PLACEHOLDER_TAB_ID } from '@renderer/testing/test-layout.data';
import createTabPanel from '@renderer/testing/test-panel.component';
import createQuickVerseHeresyPanel from '@renderer/testing/test-quick-verse-heresy-panel.component';
import { SavedTabInfo, TYPE_WEBVIEW, TabCreator, TabInfo } from '@shared/data/web-view.model';
import papi from '@shared/services/papi.service';
import { AddWebViewEvent } from '@shared/services/web-view.service';
import { serializeTabId, deserializeTabId } from '@shared/utils/papi-util';

type TabType = string;

const DOCK_LAYOUT_KEY = 'dock-saved-layout';
// NOTE: 'card' is a built-in style. We can likely remove it when we create a full theme for
// Paranext.
const TAB_GROUP = 'card paranext';

const groups: { [key: string]: TabGroup } = {
  [TAB_GROUP]: {
    maximizable: false, // Don't allow groups of tabs to be maximized
    floatable: true, // Allow tabs to be floated
    animated: false, // Don't animate tab transitions
    // TODO: Currently allowing newWindow crashes since electron doesn't seem to have window.open defined?
    // newWindow: true, // Allow floating windows to show in a native window
  },
};
const savedLayout: LayoutData = getStorageValue(DOCK_LAYOUT_KEY, testLayout as LayoutData);

// TODO: Build this mapping from extensions so extensions can create their own panels
const tabTypeCreationMap = new Map<TabType, TabCreator>([
  ['about', createAboutPanel],
  ['buttons', createButtonsPanel],
  ['quick-verse-heresy', createQuickVerseHeresyPanel],
  ['tab', createTabPanel],
  [TYPE_WEBVIEW, createWebViewPanel],
]);

let previousTabId: string = WEBVIEW_PLACEHOLDER_TAB_ID;

function getTabDataFromSavedInfo(tabInfo: SavedTabInfo): TabInfo {
  let tabCreator: TabCreator | undefined;
  if (tabInfo.id) {
    const { type } = deserializeTabId(tabInfo.id);
    tabCreator = tabTypeCreationMap.get(type);
  }
  if (!tabCreator) return createErrorTab(`No handler for the tab type '${tabInfo.id}'`);

  // Call the creation method to let the extension method create the tab
  try {
    return tabCreator(tabInfo);
  } catch (e) {
    // If the tab couldn't be created, replace it with an error tab
    if (e instanceof Error) return createErrorTab(e.message);
    return createErrorTab(String(e));
  }
}

/**
 * Creates tab data from the specified saved tab information by calling back to the
 * extension that registered the creation of the tab type
 * @param savedTabInfo Data that is to be used to create the new tab (comes from rc-dock, typically from disk)
 */
function loadTab(savedTabInfo: SavedTabInfo): TabData & SavedTabInfo {
  if (!savedTabInfo.id) throw new Error('loadTab: "id" is missing.');

  const { id } = savedTabInfo;
  const newTabData = getTabDataFromSavedInfo(savedTabInfo);

  // Translate the data from the extension to be in the form needed by rc-dock
  return {
    id,
    data: savedTabInfo.data,
    title: <ParanextTabTitle text={newTabData.title} />,
    content: <ParanextPanel>{newTabData.content}</ParanextPanel>,
    minWidth: newTabData.minWidth,
    minHeight: newTabData.minHeight,
    group: TAB_GROUP,
    closable: true,
  };
}

/**
 * When rc-dock detects a changed layout, save it.
 *
 * TODO: We could filter whether we need to save based on the `direction` argument. - 2023-05-1 IJH
 * @param newLayout the changed layout to save.
 */
function onLayoutChange(newLayout: LayoutBase): void {
  localStorage.setItem(DOCK_LAYOUT_KEY, JSON.stringify(newLayout));
}

/**
 * Safely load a value from local storage.
 * @param key of the value.
 * @param defaultValue to return if the key is not found.
 * @returns the value of the key fetched from local storage, or the default value if not found.
 */
function getStorageValue<T>(key: string, defaultValue: T): T {
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : undefined;
  return initial || defaultValue;
}

function addWebViewToDock({ webView, layoutType }: AddWebViewEvent, dockLayout: DockLayout) {
  const tabId = serializeTabId(TYPE_WEBVIEW, webView.id);
  let targetTab = dockLayout.find(tabId) as TabData;
  let willRemoveTarget = false;
  let direction: DropDirection = 'update';
  if (!targetTab) {
    targetTab = dockLayout.find(previousTabId) as TabData;
    direction = 'after-tab';
    if (previousTabId === WEBVIEW_PLACEHOLDER_TAB_ID) willRemoveTarget = true;
  }
  const tab = loadTab({ id: tabId, data: webView });
  previousTabId = tabId;

  switch (layoutType) {
    case 'tab':
      if (direction === 'update') dockLayout.updateTab(tabId, tab);
      else dockLayout.dockMove(tab, targetTab, direction);
      if (willRemoveTarget) dockLayout.dockMove(targetTab, null, 'remove');
      break;

    case 'panel':
    case 'float':
      throw new Error(`Not yet implemented layoutType: '${layoutType}'`);

    default:
      throw new Error(`Unknown layoutType: '${layoutType}'`);
  }
}

export default function ParanextDockLayout() {
  // This ref will always be defined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dockLayoutRef = useRef<DockLayout>(null!);

  useEvent(
    papi.webViews.onDidAddWebView,
    useCallback((event: AddWebViewEvent) => {
      const dockLayout = dockLayoutRef.current;
      addWebViewToDock(event, dockLayout);
    }, []),
  );

  return (
    <DockLayout
      ref={dockLayoutRef}
      groups={groups}
      defaultLayout={savedLayout}
      dropMode="edge"
      loadTab={loadTab}
      onLayoutChange={onLayoutChange}
    />
  );
}
