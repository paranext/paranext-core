import 'rc-dock/dist/rc-dock.css';
import './paranext-dock-layout.component.css';
import { useRef, useEffect, useCallback } from 'react';
import { SavedTabInfo, TabCreator, TabInfo, TabType } from '@shared/data/web-view.model';
import { AddWebViewEvent, registerLayoutSave } from '@shared/services/web-view.service';
import DockLayout, { DropDirection, LayoutBase, LayoutData, TabData, TabGroup } from 'rc-dock';
import testLayout, { WEBVIEW_PLACEHOLDER_TAB_ID } from '@renderer/testing/test-layout.data';
import createAboutPanel from '@renderer/testing/about-panel.component';
import createButtonsPanel from '@renderer/testing/test-buttons-panel.component';
import createTabPanel from '@renderer/testing/test-panel.component';
import * as commandService from '@shared/services/command.service';
import { isRenderer } from '@shared/utils/internal-util';
import createErrorTab from '@renderer/components/docking/error-tab.component';
import ParanextPanel from '@renderer/components/docking/paranext-panel.component';
import ParanextTabTitle from '@renderer/components/docking/paranext-tab-title.component';
import createWebViewPanel, { TYPE_WEBVIEW } from '@renderer/components/web-view.component';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import createQuickVerseHeresyPanel from '@renderer/testing/test-quick-verse-heresy-panel.component';
import papi from '@shared/services/papi.service';
import { serializeTabId, deserializeTabId } from '@shared/utils/papi-util';

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
  ['webview', createWebViewPanel],
]);

let previousTabId: string = WEBVIEW_PLACEHOLDER_TAB_ID;

export function addTabHandlerDock(type: TabType, creator: TabCreator) {
  tabTypeCreationMap.set(type, creator);
}

function saveTab(tab: TabData): SavedTabInfo {
  const { id, data } = tab as SavedTabInfo;
  return { id, data };
}

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

function onLayoutChange(newLayout: LayoutBase): void {
  localStorage.setItem(DOCK_LAYOUT_KEY, JSON.stringify(newLayout));
}

function getStorageValue<T>(key: string, defaultValue: T): T {
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : undefined;
  return initial || defaultValue;
}

export async function addTabHandler(type: TabType, creator: TabCreator) {
  if (!isRenderer()) {
    return commandService.sendCommand<[TabType, TabCreator], void>('addTabHandler', type, creator);
  }

  addTabHandlerDock(type, creator);

  // Resolve this promise
  return undefined;
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

    default:
      throw new Error(`Not yet implemented or unknown layoutType: '${layoutType}'`);
  }
}

export default function ParanextDockLayout() {
  // This ref will always be defined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dockLayoutRef = useRef<DockLayout>(null!);

  useEffect(() => {
    const dockLayout = dockLayoutRef.current;
    const unregister = registerLayoutSave(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const layout = dockLayout.saveLayout();
      // TODO: Save layout
    });
    return () => unregister();
  }, []);

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
      saveTab={saveTab}
      loadTab={loadTab}
      onLayoutChange={onLayoutChange}
    />
  );
}
