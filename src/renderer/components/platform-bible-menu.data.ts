import { LocalizedMenus } from '@shared/utils/menu-document-combiner';
import { MultiColumnMenu } from 'platform-bible-utils';

type LocalizedMainMenu = LocalizedMenus['mainMenu'];

const standardMenuLayout: LocalizedMainMenu = {
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
    'platform.project': { column: 'paratext.paratext', order: 4 },
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
      label: 'Download/Install Resources',
      localizeNotes: 'Main application menu > Paratext column > Download/Install Resources',
      group: 'paratext.sendReceive',
      order: 1,
      command: 'platform.downloadAndInstallResources',
    },
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
      label: 'Open Resource Viewer',
      localizeNotes: 'Main application menu > Paratext column > Open Resource Viewer...',
      group: 'paratext.resourceTools',
      order: 1,
      command: 'resourceViewer.open',
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
      label: 'Open Hello World Project...',
      localizeNotes: 'Main application menu > Paratext column > Open Hello World Project',
      group: 'platform.project',
      order: 1,
      command: 'helloWorld.openProject',
    },
    {
      label: 'Settings',
      localizeNotes: 'Main application menu > Paratext column > Settings',
      group: 'platform.misc',
      order: 1,
      command: 'platform.settings',
    },
    {
      label: 'Exit',
      localizeNotes: 'Main application menu > Paratext column > Exit',
      group: 'platform.misc',
      order: 3,
      command: 'platform.quit',
    },
  ],
};

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
      label: 'Download/Install Resources',
      localizeNotes: 'Main application menu > Paratext column > Download/Install Resources',
      group: 'paratext.sendReceive',
      order: 1,
      command: 'platform.downloadAndInstallResources',
    },
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
      label: 'Open Resource Viewer',
      localizeNotes: 'Main application menu > Paratext column > Open Resource Viewer...',
      group: 'paratext.resourceTools',
      order: 1,
      command: 'resourceViewer.open',
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
      label: 'Open Hello World Project...',
      localizeNotes: 'Main application menu > Paratext column > Open Word List',
      group: 'paratext.resourceTools',
      order: 4,
      command: 'helloWorld.openProject',
    },
    {
      label: 'Settings',
      localizeNotes: 'Main application menu > Paratext column > Settings',
      group: 'platform.misc',
      order: 1,
      command: 'platform.settings',
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
      id: 'platform.visitSupportPage',
    },
    {
      label: 'About Platform Bible',
      localizeNotes: 'Main application menu > Help column > About Platform.Bible',
      group: 'platform.helpGroup',
      order: 2,
      id: 'platform.about',
    },
  ],
};

export function provideMenuData(isSupportAndDevelopment: boolean): MultiColumnMenu {
  // TODO: As part of #425 (Menus: Stitch together back end services and UI components to get menu
  // contributions working end-to-end), we will want to create a parallel type to MultiColumnMenu
  // that should be used in the React components (and returned here) that does not expect the
  // ReferencedItem keys, but rather takes a plain string.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (
    isSupportAndDevelopment ? supportAndDevelopmentMenuLayout : standardMenuLayout
  ) as MultiColumnMenu;
}

export default standardMenuLayout;
