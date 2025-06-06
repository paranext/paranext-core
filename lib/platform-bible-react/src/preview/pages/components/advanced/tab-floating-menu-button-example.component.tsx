import { TabFloatingMenuButton } from '@/components/advanced/tab-toolbar/tab-floating-menu-button.component';

const projectMenuData = {
  columns: {
    'platformScriptureEditor.tools': { label: 'Tools', order: 3 },
    'platformScriptureEditor.info': { label: 'Info', order: 4 },
    'platform.app': { label: 'Project', order: 1 },
  },
  groups: {
    'platformScriptureEditor.general': {
      column: 'platformScriptureEditor.info',
      order: 1,
    },
    'platformScriptureEditor.inventory': {
      column: 'platformScriptureEditor.tools',
      order: 1,
    },
    'platformScriptureEditor.checks': {
      column: 'platformScriptureEditor.tools',
      order: 2,
    },
    'platform.projectTop': {
      column: 'platform.app',
      order: 1,
      isExtensible: true,
    },
    'platform.manageBooks': { column: 'platform.app', order: 2 },
    'platform.deleteProject': { column: 'platform.app', order: 3 },
    'platform.projectDetails': {
      column: 'platform.app',
      order: 4,
      isExtensible: true,
    },
    'platform.helpSubMenu': { menuItem: 'platform.helpSubMenuId', order: 3 },
    'platform.helpSubSubMenu': { menuItem: 'platform.helpSubSubMenuId', order: 4 },
  },
  items: [
    {
      label: 'Inventory: Characters...',
      localizeNotes: '',
      group: 'platformScriptureEditor.inventory',
      order: 1,
      command: 'platformScripture.openCharactersInventory',
    },
    {
      label: 'Inventory: Repeated Words...',
      localizeNotes: '',
      group: 'platformScriptureEditor.inventory',
      order: 2,
      command: 'platformScripture.openRepeatedWordsInventory',
    },
    {
      label: 'Inventory: Markers...',
      localizeNotes: '',
      group: 'platformScriptureEditor.inventory',
      order: 3,
      command: 'platformScripture.openMarkersInventory',
    },
    {
      label: 'Inventory: Punctuation...',
      localizeNotes: '',
      group: 'platformScriptureEditor.inventory',
      order: 4,
      command: 'platformScripture.openPunctuationInventory',
    },
    {
      label: 'Open Checks Side Panel',
      localizeNotes: '',
      group: 'platformScriptureEditor.checks',
      order: 3,
      command: 'platformScripture.openChecksSidePanel',
    },
    {
      label: 'Publisher Info',
      localizeNotes: '',
      group: 'platformScriptureEditor.general',
      order: 1,
      command: 'platformScriptureEditor.showPublisherInfo',
      iconPathAfter:
        'https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg',
      iconPathBefore:
        'https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg',
    },
    {
      label: 'Copyright Info',
      localizeNotes: '',
      group: 'platformScriptureEditor.general',
      order: 2,
      command: 'platformScriptureEditor.showCopyrightInfo',
    },
    {
      label: 'Assignments and Progress',
      localizeNotes: 'Web view main menu > Project > Assignments and progress...',
      group: 'platform.projectTop',
      order: 2,
      command: 'platform.assignments',
    },
    {
      label: 'Open Project Settings',
      localizeNotes: 'Web view main menu > Project > Open Project Settings...',
      group: 'platform.projectTop',
      order: 3,
      command: 'platform.openSettings',
    },
    {
      label: 'Help Sub Menu',
      localizeNotes: 'Web view main menu > Info > Help Sub Menu',
      group: 'platformScriptureEditor.general',
      order: 3,
      id: 'platform.helpSubMenuId',
    },
    {
      label: 'Help Sub Menu Item 1',
      localizeNotes: 'Web view main menu > Info > Help Sub Menu > Item 1',
      group: 'platform.helpSubMenu',
      order: 1,
      command: 'platform.openSettings',
    },
    {
      label: 'Help Sub Sub Menu',
      localizeNotes: 'Web view main menu > Info > Help Sub Menu > Help Sub Sub Menu',
      group: 'platform.helpSubMenu',
      order: 3,
      id: 'platform.helpSubSubMenuId',
    },
    {
      label: 'Help Sub Sub Menu Item 1',
      localizeNotes: 'Web view main menu > Info > Help Sub Menu > Help Sub Sub Menu > Item 1',
      group: 'platform.helpSubSubMenu',
      order: 1,
      command: 'platform.openSettings',
    },
  ],
};

export function TabFloatingMenuButtonExample() {
  return (
    <TabFloatingMenuButton
      onSelectProjectMenuItem={(command) => console.log('Project Menu Run command: ', command)}
      projectMenuData={projectMenuData}
    />
  );
}

export default TabFloatingMenuButtonExample;
