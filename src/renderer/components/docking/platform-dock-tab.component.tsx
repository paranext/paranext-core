import { TabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';

import { TAB_GROUP } from './platform-dock-layout-positioning.util';
import { PlatformPanel } from './platform-panel.component';
import { PlatformTabTitle } from './platform-tab-title.component';
import { RCDockTabInfo } from './docking-framework-internal.model';

/**
 * Options for {@link createRCDockTabFromTabInfo}.
 *
 * Using an options object instead of positional parameters so future tab-construction options can
 * be added without re-arranging callers.
 */
export type CreateRCDockTabOptions = {
  /** If true, the returned tab will start flashing when next rendered. Defaults to `false`. */
  shouldFlash?: boolean;
};

/**
 * Creates a tab ready to go into rc-dock from platform tab info
 *
 * @param tabInfo Data used to create the rc-dock tab
 * @param options Construction options (see {@link CreateRCDockTabOptions}).
 * @returns Rc-dock tab created from `tabInfo`
 */
export function createRCDockTabFromTabInfo(
  tabInfo: TabInfo,
  options: CreateRCDockTabOptions = {},
): RCDockTabInfo {
  const { shouldFlash = false } = options;
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
        id={tabInfo.id}
        // For WebView tabs, the tab id IS the web view id
        webViewId={tabInfo.tabType === TAB_TYPE_WEBVIEW ? tabInfo.id : undefined}
      />
    ),
    content: <PlatformPanel id={tabInfo.id}>{tabInfo.content}</PlatformPanel>,
    group: TAB_GROUP,
    // Tabs are closable by default; a WebView can opt out by setting `isClosable: false` (e.g. the
    // fixed 3-column simple-mode layout's own webviews, which force this per interface mode so
    // floating dialogs like About/Settings stay closable in simple mode while the fixed columns
    // don't — see each webview provider's own `isClosable` computation).
    closable: tabInfo.isClosable ?? true,
  };
}

export default createRCDockTabFromTabInfo;
