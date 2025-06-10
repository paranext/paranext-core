import { menuDataService } from '@shared/services/menu-data.service';
import { Localized, MultiColumnMenu, PlatformMenus } from 'platform-bible-utils';

type LocalizedMainMenu = Localized<PlatformMenus['mainMenu']>;

const supportAndDevelopmentMenuLayout: LocalizedMainMenu = {
  columns: {
    'paratext.paratext': { label: 'Paratext', order: 0 },
    'platform.window': { label: 'Window', order: 1 },
    'platform.layout': { label: 'Layout', order: 2 },
    'platform.help': { label: 'Help', order: 3, isExtensible: true },
    isExtensible: true,
  },
  groups: {
    'paratext.sendReceive': { column: 'paratext.paratext', order: 1 },
    'paratext.openCreate': { column: 'paratext.paratext', order: 2 },
    'paratext.saveDelete': { column: 'paratext.paratext', order: 3 },
    'paratext.resourceTools': { column: 'paratext.paratext', order: 4 },
    'platform.misc': { column: 'paratext.paratext', order: 9999999, isExtensible: true },
    'platform.windowGroup1': { column: 'platform.window', order: 1, isExtensible: true },
    'platform.windowGroup2': { column: 'platform.window', order: 2 },
    'platform.layoutSaveDelete': { column: 'platform.layout', order: 1 },
    'platform.helpGroup': { column: 'platform.help', order: 1 },
    'paratext.helpGroup': { column: 'platform.help', order: 100 },
    'paratext.helpSubgroup': { menuItem: 'paratext.helpRoot', order: 1 },
  },
  items: [
    {
      label: 'Open Project...',
      tooltip: 'Open project or resource text(s)',
      localizeNotes: 'Main application menu > Paratext column > Open Project',
      group: 'paratext.openCreate',
      order: 1,
      command: 'platform.openProjectDialog',
    },
    {
      label: 'Download/Update Project',
      localizeNotes: 'Main application menu > Paratext column > Download/Update Project',
      group: 'paratext.openCreate',
      order: 2,
      command: 'platform.openDownloadUpdateProjectDialog',
    },
    {
      label: 'Open Scripture Editor',
      localizeNotes: 'Main application menu > Paratext column > Open Scripture Editor...',
      group: 'paratext.resourceTools',
      order: 1,
      command: 'platformScriptureEditor.openScriptureEditor',
    },
    {
      label: 'Open Resource Viewer',
      localizeNotes: 'Main application menu > Paratext column > Open Resource Viewer...',
      group: 'paratext.resourceTools',
      order: 1,
      command: 'platformScriptureEditor.openResourceViewer',
    },
    {
      label: 'Open Text Collection',
      tooltip: 'Open a collection of project or Scripture resource text(s)',
      localizeNotes: 'Main application menu > Paratext column > Open Text Collection',
      group: 'paratext.resourceTools',
      order: 2,
      command: 'paratextBibleTextCollection.open',
    },
    {
      label: 'Open Word List',
      localizeNotes: 'Main application menu > Paratext column > Open Word List',
      group: 'paratext.resourceTools',
      order: 3,
      command: 'paratextBibleWordList.open',
    },
    {
      label: 'Open Hello Third Rock Project...',
      localizeNotes: 'Main application menu > Paratext column > Open Hello Third Rock Project',
      group: 'paratext.resourceTools',
      order: 4,
      command: 'helloRock3.openProject',
    },
    {
      label: 'Settings',
      localizeNotes: 'Main application menu > Paratext column > Settings',
      group: 'platform.misc',
      order: 1,
      command: 'platform.openSettings',
    },
    {
      label: 'Reload Extensions',
      localizeNotes: 'Main application menu > Paratext column > Reload Extensions',
      group: 'platform.misc',
      order: 2,
      command: 'platform.restartExtensionHost',
    },
    {
      label: 'Exit',
      localizeNotes: 'Main application menu > Paratext column > Exit',
      group: 'platform.misc',
      order: 3,
      command: 'platform.quit',
    },
    {
      label: 'Visit Support Bible',
      localizeNotes: 'Main application menu > Help column > Visit Support.Bible',
      group: 'platform.helpGroup',
      order: 1,
      command: 'platform.visitSupportPage',
    },
    {
      label: 'About Platform Bible',
      localizeNotes: 'Main application menu > Help column > About Platform.Bible',
      group: 'platform.helpGroup',
      order: 2,
      command: 'platform.about',
    },
  ],
};

export async function provideMenuData(
  isSupportAndDevelopment: boolean,
): Promise<Localized<MultiColumnMenu>> {
  return isSupportAndDevelopment ? supportAndDevelopmentMenuLayout : menuDataService.getMainMenu();
}

export default provideMenuData;
