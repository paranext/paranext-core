import TabDropdownMenu from '@/components/advanced/tab-dropdown-menu.component';
import { BookIcon } from 'lucide-react';

const menuData = {
  columns: {
    'platformScriptureEditor.options': { label: 'Options', order: 3 },
    'platformScriptureEditor.tools': { label: 'Tools', order: 4 },
    'platformScriptureEditor.info': { label: 'Info', order: 5 },
    'platform.project': { label: 'Project', order: 1 },
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
      column: 'platform.project',
      order: 1,
      isExtensible: true,
    },
    'platform.manageBooks': { column: 'platform.project', order: 2 },
    'platform.deleteProject': { column: 'platform.project', order: 3 },
    'platform.projectDetails': {
      column: 'platform.project',
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
    },
    {
      label: 'Text Color',
      localizeNotes: '',
      group: 'platformScriptureEditor.colors',
      order: 1,
      command: 'platformScriptureEditor.changeTextColor',
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

export default function TabDropdownMenuExample() {
  return (
    <TabDropdownMenu
      commandHandler={(command) => console.log('Run command: ', command)}
      menuData={menuData}
      icon={<BookIcon />}
      tabLabel="Tab Label"
    />
  );
}
