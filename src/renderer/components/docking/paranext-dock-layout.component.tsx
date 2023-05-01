import 'rc-dock/dist/rc-dock.css';
import './paranext-dock-layout.component.css';
import { useRef, useEffect, ReactElement } from 'react';
import { newGuid } from '@shared/utils/util';
import { SavedTabInfo, TabCreator, TabInfo } from '@shared/data/web-view.model';
import { registerLayoutSave } from '@shared/services/web-view.service';
import DockLayout, { LayoutData, TabBase, TabData, TabGroup } from 'rc-dock';
import testLayout from '@renderer/testing/test-layout.data';
// import createHelloPanel from '@renderer/testing/hello-panel.component';
// import createButtonsPanel from '@renderer/testing/test-buttons-panel.component';
// import createTabPanel from '@renderer/testing/test-panel.component';
import * as commandService from '@shared/services/command.service';
import { isRenderer } from '@shared/utils/internal-util';
import createErrorTab from '@renderer/components/docking/error-tab.component';
import ParanextPanel from '@renderer/components/docking/paranext-panel.component';
import ParanextTabTitle from '@renderer/components/docking/paranext-tab-title.component';
// import createQuickVerseHeresyPanel from '@renderer/testing/test-quick-verse-heresy-panel.component';

// NOTE: 'card' is a built-in style. We can likely remove it when we
// create a full theme for Paranext.
const TAB_GROUPS = 'card paranext';

// TODO: Build this mapping from extensions so extensions can create their own panels

const tabTypeCreationMap: Map<string, TabCreator> = new Map();

// const tabTypeCreationMap = new Map<string, TabCreator>([
//   ['hello', createHelloPanel],
//   ['buttons', createButtonsPanel],
//   ['quick-verse-heresy', createQuickVerseHeresyPanel],
//   ['tab', createTabPanel],
// ]);

export function addTabHandlerDock(type: string, creator: TabCreator) {
  tabTypeCreationMap.set(type, creator);
}

const getTabDataFromSavedInfo = (tabInfo: SavedTabInfo): TabInfo => {
  if (!tabInfo.type) return createErrorTab('Tab type was undefined');

  const tabCreator = tabTypeCreationMap.get(tabInfo.type);
  if (!tabCreator) return createErrorTab(`No handler for the tab type '${tabInfo.type}'`);

  // Call the creation method to let the extension method create the tab
  try {
    return tabCreator(tabInfo);
  } catch (e) {
    // If the tab couldn't be created, replace it with an error tab
    if (e instanceof Error) return createErrorTab(e.message);
    return createErrorTab(String(e));
  }
};

function saveTab(tab: TabData): TabBase {
  const { id, type, data } = tab as WebviewInfo;
  return { id, type, data } as TabBase;
}

type WebviewInfo = {
  type: string;
  id: string;
  data?: unknown;
  group?: string;
  minWidth?: number;
  minHeight?: number;
  title: ReactElement | string;
  content: ReactElement;
  closable?: boolean;
};

/**
 * Creates tab data from the specified saved tab information by calling back to the
 * extension that registered the creation of the tab type
 * @param savedTabInfo Data that is to be used to create the new tab (comes from rc-dock, typically from disk)
 */
function loadTab(savedTabInfo: TabBase): WebviewInfo {
  let { id } = savedTabInfo;
  if (!id) id = newGuid();

  const tabInfo = savedTabInfo as SavedTabInfo;
  const newTabData = getTabDataFromSavedInfo(tabInfo);

  // Translate the data from the extension to be in the form needed by rc-dock
  return {
    id,
    data: tabInfo.data,
    type: newTabData.type,
    title: <ParanextTabTitle text={newTabData.title} />,
    content: <ParanextPanel>{newTabData.content}</ParanextPanel>,
    minWidth: newTabData.minWidth,
    minHeight: newTabData.minHeight,
    group: TAB_GROUPS,
    closable: true,
  };
}

const groups: {
  [key: string]: TabGroup;
} = {
  [TAB_GROUPS]: {
    maximizable: false, // Don't allow groups of tabs to be maximized
    floatable: true, // Allow tabs to be floated
    animated: false, // Don't animate tab transitions
    // TODO: Currently allowing newWindow crashes since electron doesn't seem to have window.open defined?
    // newWindow: true, // Allow floating windows to show in a native window
  },
};

export async function addTabHandler(type: string, creator: TabCreator) {
  if (!isRenderer()) {
    return commandService.sendCommand<[string, TabCreator], void>('addTabHandler', type, creator);
  }

  addTabHandlerDock(type, creator);

  // Resolve this promise
  return undefined;
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
    return () => {
      unregister();
    };
  }, []);

  return (
    <DockLayout
      ref={dockLayoutRef}
      groups={groups}
      defaultLayout={testLayout as LayoutData}
      dropMode="edge"
      saveTab={saveTab}
      loadTab={loadTab}
    />
  );
}
