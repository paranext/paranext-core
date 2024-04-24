import { TabInfo } from '@shared/models/docking-framework.model';

import { WebViewDefinition } from '@shared/models/web-view.model';
import { TAB_GROUP } from './platform-dock-layout-positioning.util';
import PlatformPanel from './platform-panel.component';
import PlatformTabTitle from './platform-tab-title.component';

/**
 * Creates a tab ready to go into rc-dock from platform tab info
 *
 * @param tabInfo Data used to create the rc-dock tab
 * @returns Rc-dock tab created from `tabInfo`
 */
export default function createRCDockTabFromTabInfo(tabInfo: TabInfo) {
  // Translate the data from the loaded tab to be in the form needed by rc-dock
  const webViewData =
    // If the tab is for a web view, then its data should be a WebViewDefinition
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    tabInfo.tabType === 'webView' ? (tabInfo.data as WebViewDefinition) : undefined;
  // Assume the webViewType is correctly formatted because it should have already been checked
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const webViewType = webViewData?.webViewType as `${string}.${string}`;
  return {
    ...tabInfo,
    title: (
      <PlatformTabTitle
        webViewType={webViewType}
        iconUrl={tabInfo.tabIconUrl}
        text={tabInfo.tabTitle}
        tooltip={tabInfo.tabTooltip}
      />
    ),
    content: <PlatformPanel>{tabInfo.content}</PlatformPanel>,
    group: TAB_GROUP,
    closable: true,
  };
}
