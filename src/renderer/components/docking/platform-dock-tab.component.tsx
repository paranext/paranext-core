import { TabInfo } from '@shared/models/docking-framework.model';

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
      />
    ),
    content: <PlatformPanel id={tabInfo.id}>{tabInfo.content}</PlatformPanel>,
    group: TAB_GROUP,
    closable: true,
  };
}

export default createRCDockTabFromTabInfo;
