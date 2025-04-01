import { PlatformMenubar } from '@/components/advanced/platform-menubar.component';

const menuData = {
  columns: {
    'platform.app': { label: 'Project', order: 1 },
    'platform.help': { label: 'Help', order: 4 },
    isExtensible: true,
  },
  groups: {
    'platform.projectProjects': { column: 'platform.app', order: 1, isExtensible: true },
    'platform.projectResources': { column: 'platform.app', order: 2, isExtensible: true },
    'platform.projectSettings': { column: 'platform.app', order: 3 },
    'platform.projectMisc': { column: 'platform.app', order: 4 },
    'platform.windowGroup': { column: 'platform.window', order: 1 },
    'platform.layoutGroup': { column: 'platform.layout', order: 1 },
    'platform.helpRegistration': { column: 'platform.help', order: 1, isExtensible: true },
    'platform.helpMisc': { column: 'platform.help', order: 2 },
    'platform.helpSubMenu': { menuItem: 'platform.helpSubMenuId', order: 3 },
    'platform.helpSubSubMenu': { menuItem: 'platform.helpSubSubMenuId', order: 4 },
  },
  items: [
    {
      label: 'Settings',
      localizeNotes: 'Application main menu > Project > Settings',
      group: 'platform.projectSettings',
      order: 1,
      command: 'platform.openSettings',
    },
    {
      label: 'Exit',
      localizeNotes: 'Application main menu > Project > Exit',
      group: 'platform.projectMisc',
      order: 999999999,
      command: 'platform.quit',
    },
    {
      label: 'Visit Support.Bible',
      localizeNotes: 'Application main menu > Help > Visit Support.Bible',
      group: 'platform.helpMisc',
      order: 1,
      command: 'platform.visitSupportPage',
    },
    {
      label: 'About Platform.Bible',
      localizeNotes: 'Application main menu > Help > About Platform.Bible',
      group: 'platform.helpMisc',
      order: 2,
      command: 'platform.about',
    },
    {
      label: 'Open Developer Documentation',
      localizeNotes: 'Application main menu > Help > Open Developer Documentation',
      group: 'platform.helpMisc',
      order: 4,
      command: 'platform.openDeveloperDocumentationUrl',
    },
    {
      label: 'Help Sub Menu',
      localizeNotes: 'Application main menu > Help > Help Sub Menu',
      group: 'platform.helpMisc',
      order: 3,
      id: 'platform.helpSubMenuId',
    },
    {
      label: 'Help Sub Menu Item 1',
      localizeNotes: 'Application main menu > Help > Help Sub Menu > Item 1',
      group: 'platform.helpSubMenu',
      order: 1,
      command: 'platform.openSettings',
    },
    {
      label: 'Help Sub Sub Menu',
      localizeNotes: 'Application main menu > Help > Help Sub Menu > Help Sub Sub Menu',
      group: 'platform.helpSubMenu',
      order: 3,
      id: 'platform.helpSubSubMenuId',
    },
    {
      label: 'Help Sub Sub Menu Item 1',
      localizeNotes: 'Application main menu > Help > Help Sub Menu > Help Sub Sub Menu > Item 1',
      group: 'platform.helpSubSubMenu',
      order: 1,
      command: 'platform.openSettings',
    },
    {
      label: 'Toggle Include My Paratext 9 Projects',
      tooltip:
        'Whether to look in the Paratext 9 project storage folder for Paratext projects to load (Windows only). Located at "C:\\My Paratext 9 Projects". Note: you must restart Platform.Bible in order for a change in this setting to take effect.',
      localizeNotes:
        'Application main menu > Project > Settings > Toggle Include My Paratext 9 Projects',
      group: 'platform.projectProjects',
      order: 1005,
      command: 'platformScripture.toggleIncludeMyParatext9Projects',
    },
    {
      label: 'Open Scripture Editor',
      localizeNotes: 'Application main menu > Project > Open Scripture Editor',
      group: 'platform.projectResources',
      order: -100,
      command: 'platformScriptureEditor.openScriptureEditor',
    },
    {
      label: 'Open Resource Viewer',
      localizeNotes: 'Application main menu > Project > Open Resource Viewer',
      group: 'platform.projectResources',
      order: -99,
      command: 'platformScriptureEditor.openResourceViewer',
    },
    {
      label: 'Paratext Registration Information...',
      localizeNotes: 'Application main menu > Help > Paratext Registration Information...',
      group: 'platform.helpRegistration',
      order: 1006,
      command: 'paratextRegistration.showParatextRegistration',
    },
    {
      label: 'Home...',
      localizeNotes: 'Application main menu > Project > Open Home...',
      group: 'platform.projectResources',
      order: 1001,
      command: 'platformGetResources.openHome',
    },
  ],
};

export function PlatformMenubarExample() {
  return (
    <PlatformMenubar
      commandHandler={(command) => console.log('Run command: ', command)}
      menuData={menuData}
    />
  );
}

export default PlatformMenubarExample;
