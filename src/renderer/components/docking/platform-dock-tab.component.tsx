import { TabInfo } from '@shared/models/docking-framework.model';

import { getZoomKeyForTab } from '@renderer/services/view-zoom-key.util';
import { TAB_GROUP } from './platform-dock-layout-positioning.util';
import { PlatformPanel } from './platform-panel.component';
import { PlatformTabTitle } from './platform-tab-title.component';
import { RCDockTabInfo } from './docking-framework-internal.model';

/**
 * Creates a tab ready to go into rc-dock from platform tab info
 *
 * @param tabInfo Data used to create the rc-dock tab
 * @param shouldFlash If true, the tab info will be adjusted to start flashing when next rendered.
 *   Defaults to `false`
 * @returns Rc-dock tab created from `tabInfo`
 */
export function createRCDockTabFromTabInfo(tabInfo: TabInfo, shouldFlash = false): RCDockTabInfo {
  // Update the flash trigger time if we are supposed to bring the tab to the front
  const flashTriggerTime = shouldFlash ? Date.now() : tabInfo.flashTriggerTime;

  // Derive the zoom storage key from the tab info. Webview tabs carry their `webViewType` on
  // `tabInfo.data`; native tabs key off `tabType`.
  // `TabInfo.data` is typed loosely (unknown-ish) because it carries arbitrary per-tab payloads;
  // for webview tabs it includes `webViewType`. We narrow to the shape `getZoomKeyForTab` needs.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const tabData = tabInfo.data as { webViewType?: string } | undefined;
  const zoomKey = getZoomKeyForTab({
    id: tabInfo.id,
    tabType: tabInfo.tabType,
    data: tabData,
  });

  // Translate the data from the loaded tab to be in the form needed by rc-dock
  return {
    ...tabInfo,
    flashTriggerTime,
    title: (
      <PlatformTabTitle
        iconUrl={tabInfo.tabIconUrl}
        text={tabInfo.tabTitle}
        tooltip={tabInfo.tabTooltip}
        flashTriggerTime={flashTriggerTime}
        id={tabInfo.id}
      />
    ),
    content: (
      <PlatformPanel id={tabInfo.id} zoomKey={zoomKey}>
        {tabInfo.content}
      </PlatformPanel>
    ),
    group: TAB_GROUP,
    closable: true,
  };
}

export default createRCDockTabFromTabInfo;
