import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlatformMenubar } from '@/components/advanced/menus/platform-menubar.component';
import type { Localized, MultiColumnMenu, MenuItemContainingCommand } from 'platform-bible-utils';
import { useState } from 'react';

const meta: Meta<typeof PlatformMenubar> = {
  title: 'Advanced/Menu/PlatformMenubar',
  component: PlatformMenubar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A menubar component designed specifically for Platform.Bible applications.

This component provides:
- Multi-column menu organization with groups and items
- Support for commands and submenus
- Keyboard shortcuts (Alt+P, Alt+L, Alt+N, Alt+H)
- Tooltips for menu items
- Icon support (before and after text)
- Style variants (default, muted)
- Menu state change notifications

The menubar accepts structured menu data from Platform.Bible and renders it as an accessible menubar component.
        `,
      },
    },
  },
  argTypes: {
    menuData: {
      control: false,
      description: 'Menu data structure conforming to Platform.Bible format',
    },
    onSelectMenuItem: {
      control: false,
      description: 'Callback function invoked when a menu item is selected',
    },
    onOpenChange: {
      control: false,
      description: 'Optional callback for menu open/close state changes',
    },
    variant: {
      control: 'select',
      options: ['default', 'muted'],
      description: 'Style variant for the menubar',
      defaultValue: 'default',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample menu data structure
const createSampleMenuData = (): Localized<MultiColumnMenu> => ({
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
      iconPathBefore:
        'https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg',
    },
    {
      label: 'Exit',
      localizeNotes: 'Application main menu > Project > Exit',
      group: 'platform.projectMisc',
      order: 999999999,
      command: 'platform.quit',
      iconPathAfter:
        'https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg',
    },
    {
      label: 'Visit Support.Bible',
      localizeNotes: 'Application main menu > Help > Visit Support.Bible',
      group: 'platform.helpMisc',
      order: 1,
      command: 'platform.visitSupportPage',
      iconPathAfter:
        'https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg',
      iconPathBefore:
        'https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg',
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
});

function MenuDemo({ variant }: { variant?: 'default' | 'muted' }) {
  const [lastCommand, setLastCommand] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
    setLastCommand(item.command);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setMenuOpen(isOpen);
  };

  return (
    <div className="tw-space-y-4">
      <PlatformMenubar
        menuData={createSampleMenuData()}
        onSelectMenuItem={handleSelectMenuItem}
        onOpenChange={handleOpenChange}
        variant={variant}
      />

      <div className="tw-space-y-2 tw-rounded tw-border tw-bg-gray-50 tw-p-4">
        <div className="tw-text-sm">
          <strong>Menu Status:</strong> {menuOpen ? 'Open' : 'Closed'}
        </div>
        <div className="tw-text-sm">
          <strong>Last Command:</strong> {lastCommand || 'None'}
        </div>
        <div className="tw-text-xs tw-text-muted-foreground">
          <strong>Keyboard shortcuts:</strong> Alt+P (Project), Alt+L (Layout), Alt+N (Navigate),
          Alt+H (Help)
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <MenuDemo />,
};

export const MutedVariant: Story = {
  render: () => <MenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Menubar with muted styling for subtle integration.',
      },
    },
  },
};

export const WithSubmenus: Story = {
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');

    // Extended menu data with submenus
    const menuDataWithSubmenus: Localized<MultiColumnMenu> = {
      ...createSampleMenuData(),
      groups: {
        ...createSampleMenuData().groups,
        'platform.app.export': {
          column: 'platform.app',
          order: 3,
        },
        'platform.app.export.formats': {
          menuItem: 'platform.export',
          order: 1,
        },
      },
      items: [
        ...createSampleMenuData().items,
        {
          label: 'Export As...',
          tooltip: 'Export project in various formats',
          localizeNotes: 'Export submenu',
          group: 'platform.app.export',
          order: 1,
          id: 'platform.export',
        },
        {
          label: 'PDF',
          tooltip: 'Export as PDF document',
          localizeNotes: 'PDF export',
          group: 'platform.app.export.formats',
          order: 1,
          command: 'platform.exportPDF',
        },
        {
          label: 'Word Document',
          tooltip: 'Export as Word document',
          localizeNotes: 'Word export',
          group: 'platform.app.export.formats',
          order: 2,
          command: 'platform.exportWord',
        },
        {
          label: 'Plain Text',
          tooltip: 'Export as plain text',
          localizeNotes: 'Text export',
          group: 'platform.app.export.formats',
          order: 3,
          command: 'platform.exportText',
        },
      ],
    };

    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };

    return (
      <div className="tw-space-y-4">
        <PlatformMenubar menuData={menuDataWithSubmenus} onSelectMenuItem={handleSelectMenuItem} />

        <div className="tw-rounded tw-border tw-bg-gray-50 tw-p-4">
          <div className="tw-text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw-mt-2 tw-text-xs tw-text-muted-foreground">
            Try the &quot;Project&quot; menu and look for the &quot;Export As...&quot; submenu.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with nested submenus showing hierarchical menu organization.',
      },
    },
  },
};

export const MinimalMenu: Story = {
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');

    const minimalMenuData: Localized<MultiColumnMenu> = {
      columns: {
        'platform.app': {
          label: 'File',
          order: 1,
        },
        'platform.help': {
          label: 'Help',
          order: 2,
        },
      },
      groups: {
        'platform.app.main': {
          column: 'platform.app',
          order: 1,
        },
        'platform.help.main': {
          column: 'platform.help',
          order: 1,
        },
      },
      items: [
        {
          label: 'New',
          tooltip: 'Create new document',
          localizeNotes: 'New file command',
          group: 'platform.app.main',
          order: 1,
          command: 'platform.new',
        },
        {
          label: 'Open',
          tooltip: 'Open existing document',
          localizeNotes: 'Open file command',
          group: 'platform.app.main',
          order: 2,
          command: 'platform.open',
        },
        {
          label: 'About',
          tooltip: 'About this application',
          localizeNotes: 'About dialog',
          group: 'platform.help.main',
          order: 1,
          command: 'platform.about',
        },
      ],
    };

    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };

    return (
      <div className="tw-space-y-4">
        <PlatformMenubar menuData={minimalMenuData} onSelectMenuItem={handleSelectMenuItem} />

        <div className="tw-rounded tw-border tw-bg-gray-50 tw-p-4">
          <div className="tw-text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw-mt-2 tw-text-xs tw-text-muted-foreground">
            Minimal menubar with just File and Help menus.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Simplified menubar with minimal menu structure for basic applications.',
      },
    },
  },
};
