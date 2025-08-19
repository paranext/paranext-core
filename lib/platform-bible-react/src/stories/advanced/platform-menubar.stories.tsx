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

// Sample icon data URLs for demonstration
const homeIcon =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEwVjIwWk0xNCAyMFYxNEgxOFYyMEgxNFpNMyAxMkwxMiAzTDIxIDEySDE5VjIxSDVWMTJIM1oiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==';
const settingsIcon =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDhBNCA0IDAgMSAwIDEyIDE2QTQgNCAwIDAgMCAxMiA4Wk0xMiAxNEEyIDIgMCAxIDEgMTIgMTBBMiAyIDAgMCAxIDEyIDE0WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMjEuNSAxMS41TDIwLjUgMTFMMjAuNSAxMEwyMS41IDguNUwyMiA3TDIwLjUgNi41TDIwIDVMMTguNSA0LjVMMTcgNEwxNi41IDVMMTYgNi41TDE1IDdMMTQuNSA4LjVMMTUgMTBMMTYgMTFMMTYuNSAxMS41TDE3IDEyTDE4LjUgMTIuNUwyMCAxM0wyMC41IDEyTDIxLjUgMTEuNVoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==';
const documentIcon =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzIDJWOUgxOEwyMiAyVjIySDE2VjE4SDJWMkgxM1pNMTQgMTBWNEwyMCAxMEgxNFoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==';

// Sample menu data structure
const createSampleMenuData = (): Localized<MultiColumnMenu> => ({
  columns: {
    'platform.app': {
      label: 'Project',
      order: 1,
    },
    'platform.window': {
      label: 'Layout',
      order: 2,
    },
    'platform.layout': {
      label: 'Navigate',
      order: 3,
    },
    'platform.help': {
      label: 'Help',
      order: 4,
    },
  },
  groups: {
    'platform.app.file': {
      column: 'platform.app',
      order: 1,
    },
    'platform.app.recent': {
      column: 'platform.app',
      order: 2,
    },
    'platform.window.views': {
      column: 'platform.window',
      order: 1,
    },
    'platform.layout.navigation': {
      column: 'platform.layout',
      order: 1,
    },
    'platform.help.support': {
      column: 'platform.help',
      order: 1,
    },
  },
  items: [
    {
      label: 'New Project',
      tooltip: 'Create a new project',
      localizeNotes: 'Create new project command',
      group: 'platform.app.file',
      order: 1,
      command: 'platform.newProject',
      iconPathBefore: documentIcon,
    },
    {
      label: 'Open Project',
      tooltip: 'Open an existing project',
      localizeNotes: 'Open existing project command',
      group: 'platform.app.file',
      order: 2,
      command: 'platform.openProject',
      iconPathBefore: homeIcon,
    },
    {
      label: 'Recent Project 1',
      tooltip: 'Open recent project',
      localizeNotes: 'Recent project item',
      group: 'platform.app.recent',
      order: 1,
      command: 'platform.openRecent1',
    },
    {
      label: 'Recent Project 2',
      tooltip: 'Open recent project',
      localizeNotes: 'Recent project item',
      group: 'platform.app.recent',
      order: 2,
      command: 'platform.openRecent2',
    },
    {
      label: 'Show Resources',
      tooltip: 'Toggle resource panel visibility',
      localizeNotes: 'Toggle resources view',
      group: 'platform.window.views',
      order: 1,
      command: 'platform.toggleResources',
    },
    {
      label: 'Settings',
      tooltip: 'Open application settings',
      localizeNotes: 'Settings command',
      group: 'platform.window.views',
      order: 2,
      command: 'platform.openSettings',
      iconPathAfter: settingsIcon,
    },
    {
      label: 'Go to Chapter',
      tooltip: 'Navigate to a specific chapter',
      localizeNotes: 'Chapter navigation',
      group: 'platform.layout.navigation',
      order: 1,
      command: 'platform.goToChapter',
    },
    {
      label: 'Go to Verse',
      tooltip: 'Navigate to a specific verse',
      localizeNotes: 'Verse navigation',
      group: 'platform.layout.navigation',
      order: 2,
      command: 'platform.goToVerse',
    },
    {
      label: 'Documentation',
      tooltip: 'View application documentation',
      localizeNotes: 'Help documentation',
      group: 'platform.help.support',
      order: 1,
      command: 'platform.openDocs',
    },
    {
      label: 'About',
      tooltip: 'About this application',
      localizeNotes: 'About dialog',
      group: 'platform.help.support',
      order: 2,
      command: 'platform.about',
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
