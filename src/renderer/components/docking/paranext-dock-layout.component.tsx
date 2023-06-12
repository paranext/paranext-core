import 'rc-dock/dist/rc-dock.css';
import './paranext-dock-layout.component.css';
import { useRef, useCallback } from 'react';
import DockLayout, {
  BoxData,
  FloatPosition,
  LayoutBase,
  LayoutData,
  LayoutSize,
  PanelData,
  TabData,
  TabGroup,
} from 'rc-dock';
import createErrorTab from '@renderer/components/docking/error-tab.component';
import ParanextPanel from '@renderer/components/docking/paranext-panel.component';
import ParanextTabTitle from '@renderer/components/docking/paranext-tab-title.component';
import createWebViewPanel from '@renderer/components/web-view.component';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import createAboutPanel from '@renderer/testing/about-panel.component';
import createButtonsPanel from '@renderer/testing/test-buttons-panel.component';
import testLayout, { FIRST_TAB_ID } from '@renderer/testing/test-layout.data';
import createTabPanel from '@renderer/testing/test-panel.component';
import createQuickVerseHeresyPanel from '@renderer/testing/test-quick-verse-heresy-panel.component';
import {
  AddWebViewEvent,
  FloatLayout,
  SavedTabInfo,
  TYPE_WEBVIEW,
  TabCreator,
  TabInfo,
} from '@shared/data/web-view.model';
import LogError from '@shared/log-error.model';
import papi from '@shared/services/papi.service';
import { serializeTabId, deserializeTabId } from '@shared/utils/papi-util';
import PlatformBibleToolbar from '../platform-bible-toolbar';

type TabType = string;

const DOCK_FLOAT_OFFSET = 28;
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

let previousTabId: string = FIRST_TAB_ID;
let floatPosition: FloatPosition = { left: 0, top: 0, width: 0, height: 0 };

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
 * @param savedTabInfo Data that is to be used to create the new tab (comes from rc-dock)
 */
export function loadTab(savedTabInfo: SavedTabInfo): TabData & SavedTabInfo {
  if (!savedTabInfo.id) throw new LogError('loadTab: "id" is missing.');

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
 * TODO: We could filter whether we need to save based on the `direction` argument. - IJH 2023-05-1
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

/**
 * Check if the input item is just a tab, i.e. not a panel, box, or float.
 * @param tab to check.
 * @returns `true` if its a tab or `false` otherwise.
 */
function isTab(tab: PanelData | TabData | BoxData | undefined): boolean {
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
 * @param layout specified by the WebView.
 * @param previousPosition used with the previous float window.
 * @param layoutSize of the whole dock layout.
 * @returns cascaded position.
 */
export function getFloatPosition(
  layout: FloatLayout,
  previousPosition: FloatPosition,
  layoutSize: LayoutSize,
): FloatPosition {
  // Defaults are added in `web-view.service.ts`.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { width, height } = layout.floatSize!;
  let { left, top } = previousPosition;
  left = offsetOrOverflowAxis(left, width, layoutSize.width);
  top = offsetOrOverflowAxis(top, height, layoutSize.height);
  return { left, top, width, height };
}

export function addWebViewToDock({ webView, layout }: AddWebViewEvent, dockLayout: DockLayout) {
  const tabId = serializeTabId(TYPE_WEBVIEW, webView.id);
  const tab = loadTab({ id: tabId, data: webView });
  let targetTab = dockLayout.find(tabId);

  // Update existing WebView
  if (targetTab) {
    dockLayout.updateTab(tabId, tab);
    if (isTab(targetTab)) previousTabId = tabId;
    return;
  }

  // Add new WebView
  const unknownLayoutType = layout.type;
  let targetTabId = previousTabId;
  switch (layout.type) {
    case 'tab':
      targetTab = dockLayout.find(previousTabId) as TabData;
      if (previousTabId === FIRST_TAB_ID)
        dockLayout.dockMove(tab, targetTab.parent as PanelData, 'top');
      else dockLayout.dockMove(tab, targetTab, 'after-tab');
      previousTabId = tabId;
      break;

    case 'float':
      floatPosition = getFloatPosition(layout, floatPosition, dockLayout.getLayoutSize());
      dockLayout.dockMove(tab, null, 'float', floatPosition);
      break;

    case 'panel':
      if (layout.targetTabId) targetTabId = layout.targetTabId;
      targetTab = dockLayout.find(targetTabId);
      if (!isTab(targetTab))
        throw new LogError(`When adding a panel, unknown target tab: '${targetTabId}'`);

      // Defaults are added in `web-view.service.ts`.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dockLayout.dockMove(tab, targetTab?.parent as PanelData, layout.direction!);
      break;

    default:
      throw new LogError(`Unknown layoutType: '${unknownLayoutType}'`);
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
    <>
      <PlatformBibleToolbar/>
      <DockLayout
        ref={dockLayoutRef}
        groups={groups}
        defaultLayout={savedLayout}
        dropMode="edge"
        loadTab={loadTab}
        onLayoutChange={onLayoutChange}
      />
    </>
  );
}
