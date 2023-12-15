// #region utility functions that deal with loading, saving, and adding webviews. This code should
// really be in `web-view.service.ts`, but that file cannot currently import renderer code as it is
// a shared file.
// TODO: please move these utility functions with #203

import { getErrorMessage } from '@shared/utils/util';
import {
  RCDockTabInfo,
  SavedTabInfo,
  TabInfo,
  TabLoader,
  TabSaver,
  TabType,
} from '@shared/models/docking-framework.model';
import LogError from '@shared/log-error.model';
import { saveTabInfoBase } from '@renderer/services/web-view.service-host';
import { TAB_TYPE_ABOUT, loadAboutTab } from '@renderer/testing/about-panel.component';
import { TAB_TYPE_BUTTONS, loadButtonsTab } from '@renderer/testing/test-buttons-panel.component';
import { TAB_TYPE_TEST, loadTestTab } from '@renderer/testing/test-panel.component';
import {
  TAB_TYPE_QUICK_VERSE_HERESY,
  loadQuickVerseHeresyTab,
} from '@renderer/testing/test-quick-verse-heresy-panel.component';
import { TAB_TYPE_ERROR, createErrorTab, saveErrorTab } from './error-tab.component';
import { TAB_TYPE_BASIC_LIST, loadBasicListTab } from '../basic-list/basic-list.component';
import DIALOGS from '../dialogs';
import {
  TAB_TYPE_EXTENSION_MANAGER,
  loadExtensionManagerTab,
} from '../extension-manager/extension-manager-tab.component';
import {
  TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG,
  loadDownloadUpdateProjectTab,
} from '../projects/download-update-project-tab.component';
import {
  TAB_TYPE_RUN_BASIC_CHECKS,
  loadRunBasicChecksTab,
} from '../run-basic-checks-dialog/run-basic-checks-tab.component';
import {
  TAB_TYPE_SETTINGS_DIALOG,
  loadSettingsDialog,
} from '../settings-dialog/settings-tab.component';
import { TAB_TYPE_WEBVIEW, loadWebViewTab, saveWebViewTab } from '../web-view.component';
import { createRCDockTabFromTabInfo } from './dock-layout-create-tab';

/** Tab loader functions for each Platform tab type */
const tabLoaderMap = new Map<TabType, TabLoader>([
  [TAB_TYPE_ABOUT, loadAboutTab],
  [TAB_TYPE_BUTTONS, loadButtonsTab],
  [TAB_TYPE_QUICK_VERSE_HERESY, loadQuickVerseHeresyTab],
  [TAB_TYPE_TEST, loadTestTab],
  [TAB_TYPE_WEBVIEW, loadWebViewTab],
  [TAB_TYPE_DOWNLOAD_UPDATE_PROJECT_DIALOG, loadDownloadUpdateProjectTab],
  [TAB_TYPE_EXTENSION_MANAGER, loadExtensionManagerTab],
  [TAB_TYPE_SETTINGS_DIALOG, loadSettingsDialog],
  [TAB_TYPE_RUN_BASIC_CHECKS, loadRunBasicChecksTab],
  [TAB_TYPE_BASIC_LIST, loadBasicListTab],
  ...Object.entries(DIALOGS).map(
    ([dialogTabType, dialogDefinition]) =>
      // The default implementation of `loadDialog` uses `this`, so bind it to the definition
      [dialogTabType, dialogDefinition.loadDialog.bind(dialogDefinition)] as const,
  ),
]);

/** Tab saver functions for each Platform tab type that wants to override the default */
const tabSaverMap = new Map<TabType, TabSaver>([
  [TAB_TYPE_WEBVIEW, saveWebViewTab],
  [TAB_TYPE_ERROR, saveErrorTab],
  ...Object.entries(DIALOGS).map(
    ([dialogTabType, dialogDefinition]) =>
      // The default implementation of `saveDialog` uses `this`, so bind it to the definition
      [dialogTabType, dialogDefinition.saveDialog.bind(dialogDefinition)] as const,
  ),
]);

/**
 * Loads tab data from the specified saved tab information by running the tab loader provided by the
 * component file that registered this tab type
 *
 * @param savedTabInfo Data that is to be used to create the new tab (comes from rc-dock)
 * @returns Tab that holds all info needed to make an actual tab in the dock layout
 */
function loadSavedTabInfo(savedTabInfo: SavedTabInfo): TabInfo {
  const tabLoader = tabLoaderMap.get(savedTabInfo.tabType);
  if (!tabLoader) return createErrorTab(`No tab loader for tabType '${savedTabInfo.tabType}'`);

  // Call the creation method to let the extension method create the tab
  try {
    return tabLoader(savedTabInfo);
  } catch (e) {
    // If the tab couldn't be created, replace it with an error tab
    return createErrorTab(getErrorMessage(e));
  }
}

/**
 * Loads tab data from the specified saved tab information into an actual dock layout tab
 *
 * @param savedTabInfo Data that is to be used to create the new tab (comes from rc-dock)
 * @returns Live dock layout tab ready to used
 */
export function loadTab(savedTabInfo: SavedTabInfo): RCDockTabInfo {
  if (!savedTabInfo.id) throw new LogError('loadTab: "id" is missing.');

  // Load the tab from the saved tab info
  const tabInfo = loadSavedTabInfo(savedTabInfo);

  return createRCDockTabFromTabInfo(tabInfo);
}

/**
 * Converts the tab data into saved tab information by running the tab saver provided by the
 * component file that registered this tab type
 *
 * @param dockTabInfo The tab data to save
 * @returns Saved tab info ready to be saved into the layout
 */
export function saveTab(dockTabInfo: RCDockTabInfo): SavedTabInfo | undefined {
  // Remove the rc-dock properties that are not also in SavedTabInfo
  // We don't need to use the other properties, but we need to remove them
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { parent, group, closable, title, ...strippedTabInfo } = dockTabInfo;
  const tabInfo: TabInfo = strippedTabInfo;

  const tabSaver = tabSaverMap.get(tabInfo.tabType);

  return tabSaver ? tabSaver(tabInfo) : saveTabInfoBase(tabInfo);
}
