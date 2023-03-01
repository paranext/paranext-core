import 'rc-dock/dist/rc-dock.css';
import './ParanextDockLayout.css';
import { newGuid } from '@shared/util/Util';
import { SavedTabInfo, TabCreator } from '@shared/data/WebviewTypes';
import DockLayout, { LayoutData, TabBase } from 'rc-dock';
import ParanextPanel from './ParanextPanel';
import ParanextTabTitle from './ParanextTabTitle';
// TODO: Remove these testing panels when we can create extensions for them
import HelloPanel from '../testing/HelloPanel';
import TestButtonsPanel from '../testing/TestButtonsPanel';

// NOTE: 'card' is a built-in style. We can likely remove it when we
// create a full theme for Paranext.
const TAB_GROUPS = 'card paranext';

// TODO: Move the following methods to Webview. They should eventually come from extensions.
const createHello = () => {
  return {
    type: 'hello',
    title: 'Hello',
    content: <HelloPanel />,
    minWidth: 230,
    minHeight: 230,
  };
};

const createButtons = () => {
  return {
    type: 'buttons',
    title: 'Test Buttons',
    content: <TestButtonsPanel />,
  };
};

const createTab = (tabInfo: SavedTabInfo) => {
  const data = tabInfo.data ? JSON.parse(tabInfo.data) : {};

  const title = data.title ? data.title : 'Unknown';
  const content = data.content ? data.content : 'Unknown';
  return {
    type: 'tab',
    title: `Tab ${title}`,
    content,
  };
};

// TODO: Build this mapping from extensions so extensions can create their own panels
const tabTypeCreationMap = new Map<string, TabCreator>([
  ['hello', createHello],
  ['buttons', createButtons],
  ['tab', createTab],
]);

const ParanextDockLayout = ({
  startingLayout,
}: {
  startingLayout: LayoutData;
}) => {
  const groups = {
    TAB_STYLE: {
      // the css class for this would be dock-panel-custom
      // this is a custom panel style defined in panel-style.html
      floatable: true,
      newWindow: true,
      maximizable: true,
      animated: false,
      moreIcon: undefined,
      panelExtra: () => <> </>, // Get rid of buttons on tab panel (we only want buttons on each tab)
    },
  };

  const createErrorTab = (errorMessage: string) => {
    return {
      id: `error${newGuid()}`,
      title: <ParanextTabTitle text="Error" />,
      content: (
        <ParanextPanel>
          <div>
            Content could not be loaded. Please make sure you have the correct
            extension loaded.
          </div>
          <div>Message: {errorMessage}</div>
        </ParanextPanel>
      ),
      closable: true,
      group: TAB_GROUPS,
      minWidth: 150,
      minHeight: 150,
    };
  };

  const loadTab = (savedTabInfo: TabBase) => {
    let { id } = savedTabInfo;
    const tabInfo = savedTabInfo as SavedTabInfo;
    if (!tabInfo.type) return createErrorTab('Tab is missing a defined type');

    const tabCreator = tabTypeCreationMap.get(tabInfo.type);
    if (!tabCreator)
      return createErrorTab(`No handler for the tab type '${tabInfo.type}'`);

    // Call the creation method to let the extension method create the tab
    const newTabData = tabCreator(tabInfo);

    if (!id) id = newGuid();

    // Translate the data from the extension to be in the form needed by rc-dock
    return {
      id,
      title: <ParanextTabTitle text={newTabData.title} />,
      content: <ParanextPanel>{newTabData.content}</ParanextPanel>,
      cached: newTabData.cached,
      minWidth: newTabData.minWidth,
      minHeight: newTabData.minHeight,
      group: TAB_GROUPS,
      closable: true,
    };
  };

  return (
    <DockLayout
      groups={groups}
      defaultLayout={startingLayout}
      dropMode="edge"
      loadTab={loadTab}
      style={{ position: 'absolute', left: 3, top: 3, right: 3, bottom: 3 }}
    />
  );
};

export default ParanextDockLayout;
