import TabDropdownMenu from '@/components/advanced/menus/tab-dropdown-menu.component';
import { BookIcon } from 'lucide-react';

const menuData = {
  columns: {
    'platformScriptureEditor.options': { label: 'Options', order: 3 },
    'platformScriptureEditor.tools': { label: 'Tools', order: 4 },
    'platformScriptureEditor.info': { label: 'Info', order: 5 },
    'platform.app': { label: 'Project', order: 1 },
  },
  groups: {
    'platformScriptureEditor.colors': {
      column: 'platformScriptureEditor.options',
      order: 1,
    },
    'platformScriptureEditor.layout': {
      column: 'platformScriptureEditor.options',
      order: 2,
    },
    'platformScriptureEditor.general': {
      column: 'platformScriptureEditor.info',
      order: 2,
    },
    'platformScriptureEditor.inventory': {
      column: 'platformScriptureEditor.tools',
      order: 2,
    },
    'platformScriptureEditor.checks': {
      column: 'platformScriptureEditor.tools',
      order: 3,
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
      label: 'Background Color',
      localizeNotes: '',
      group: 'platformScriptureEditor.colors',
      order: 2,
      command: 'platformScriptureEditor.changeBackgroundColor',
      iconPathBefore:
        'https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg',
    },
    {
      label: 'Text Color',
      localizeNotes: '',
      group: 'platformScriptureEditor.colors',
      order: 1,
      command: 'platformScriptureEditor.changeTextColor',
      iconPathAfter:
        'https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg',
    },
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
      label: 'Thick Borders',
      localizeNotes: '',
      group: 'platformScriptureEditor.layout',
      order: 1,
      command: 'platformScriptureEditor.showThickBorders',
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
      shortcut: '⌘+I',
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

export function TabDropdownMenuExample() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      <TabDropdownMenu
        onSelectMenuItem={(command) => console.log('Run command: ', command)}
        menuData={menuData}
        icon={<BookIcon className="tw-h-4 tw-w-4" />}
        tabLabel="Tab Label"
      />

      <TabDropdownMenu
        onSelectMenuItem={(command) => console.log('Run command: ', command)}
        menuData={menuData}
        icon={
          <div className="tw-h-4 tw-w-4">
            {/* adding a custom icon here for demo purpose - windows icon */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M%2029.333%202.667%20L%2014.933%204.8%20L%2014.933%2015.467%20L%2029.333%2015.333%20Z%20M%2013.6%2016.667%20L%202.667%2016.533%20L%202.667%2025.6%20L%2013.467%2027.067%20Z%20M%202.667%206.4%20L%202.667%2015.467%20L%2013.467%2015.467%20L%2013.467%204.933%20Z%20M%2014.8%2016.667%20L%2014.8%2027.2%20L%2029.333%2029.333%20L%2029.333%2016.8%20Z%22%20fill%3D%22rgb(10%2C%2064%2C%2058)%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E" />
          </div>
        }
        tabLabel="Tab Label"
      />

      <TabDropdownMenu
        onSelectMenuItem={(command) => console.log('Run command: ', command)}
        menuData={menuData}
        icon={
          <div className="tw-flex">
            <BookIcon />
            Muted variant
          </div>
        }
        tabLabel="Tab Label"
        variant="muted"
      />
    </div>
  );
}

export default TabDropdownMenuExample;
