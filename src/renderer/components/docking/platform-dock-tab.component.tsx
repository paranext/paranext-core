import { TabInfo } from '@shared/models/docking-framework.model';

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
  /**
   * Whether the app is in `'power'` interface mode. When `false` (simple mode), tabs are not
   * closable. Defaults to `true` so callers that don't yet plumb the mode get power-mode-compatible
   * behavior.
   */
  isPowerMode?: boolean;
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
  const { shouldFlash = false, isPowerMode = true } = options;
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
      />
    ),
    content: <PlatformPanel id={tabInfo.id}>{tabInfo.content}</PlatformPanel>,
    group: TAB_GROUP,
    // Simple mode: tabs are not closable. Hides the X button and disables rc-dock's close shortcut.
    closable: isPowerMode,
  };
}

export default createRCDockTabFromTabInfo;
