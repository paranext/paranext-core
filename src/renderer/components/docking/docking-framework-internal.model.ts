import { TabData, PanelData, BoxData } from 'rc-dock';
import { TabInfo } from '@shared/models/docking-framework.model';

export type TabType = string;

export type RCDockTabInfo = TabData & TabInfo;

/**
 * Check if the input item is just a tab, i.e. not a panel, box, or float.
 *
 * @param tab To check.
 * @returns `true` if its a tab or `false` otherwise.
 */
export function isTab(tab: PanelData | TabData | BoxData | undefined): tab is TabData {
  // Assert the more specific type. Null to work with the external API.
  // eslint-disable-next-line no-type-assertion/no-type-assertion, no-null/no-null
  if (!tab || (tab as TabData).title == null) return false;
  return true;
}
