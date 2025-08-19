import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import TabDropdownMenu from '@/components/advanced/menus/tab-dropdown-menu.component';
import type { Localized, MultiColumnMenu, MenuItemContainingCommand } from 'platform-bible-utils';
import { Settings, Home, FileText } from 'lucide-react';

const meta: Meta<typeof TabDropdownMenu> = {
  title: 'Advanced/Menu/TabDropdownMenu',
  component: TabDropdownMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A dropdown menu component designed specifically for tab contexts in Platform.Bible applications.

This component provides:
- Multi-column menu organization with automatic separators
- Tooltips for menu items
- Support for icons (before and after text)
- Custom trigger icons (defaults to hamburger menu)
- Style variants (default, muted)
- Accessibility with proper aria-label

Unlike the platform menubar, this component ignores column headers and uses separators to distinguish between menu sections.
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
    tabLabel: {
      control: 'text',
      description: 'Accessibility label for the dropdown trigger',
    },
    icon: {
      control: false,
      description: 'Optional custom icon for the trigger button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
    variant: {
      control: 'select',
      options: ['default', 'muted'],
      description: 'Style variant for the dropdown menu',
      defaultValue: 'default',
    },
    id: {
      control: 'text',
      description: 'Optional unique identifier',
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

// Sample menu data structure
const createSampleMenuData = (): Localized<MultiColumnMenu> => ({
  columns: {
    'tab.edit': {
      label: 'Edit',
      order: 1,
    },
    'tab.view': {
      label: 'View',
      order: 2,
    },
    'tab.tools': {
      label: 'Tools',
      order: 3,
    },
  },
  groups: {
    'tab.edit.clipboard': {
      column: 'tab.edit',
      order: 1,
    },
    'tab.edit.text': {
      column: 'tab.edit',
      order: 2,
    },
    'tab.view.zoom': {
      column: 'tab.view',
      order: 1,
    },
    'tab.view.layout': {
      column: 'tab.view',
      order: 2,
    },
    'tab.tools.main': {
      column: 'tab.tools',
      order: 1,
    },
  },
  items: [
    {
      label: 'Copy',
      tooltip: 'Copy selected text',
      localizeNotes: 'Copy command',
      group: 'tab.edit.clipboard',
      order: 1,
      command: 'tab.copy',
    },
    {
      label: 'Paste',
      tooltip: 'Paste from clipboard',
      localizeNotes: 'Paste command',
      group: 'tab.edit.clipboard',
      order: 2,
      command: 'tab.paste',
    },
    {
      label: 'Find',
      tooltip: 'Find text in document',
      localizeNotes: 'Find command',
      group: 'tab.edit.text',
      order: 1,
      command: 'tab.find',
    },
    {
      label: 'Replace',
      tooltip: 'Find and replace text',
      localizeNotes: 'Replace command',
      group: 'tab.edit.text',
      order: 2,
      command: 'tab.replace',
    },
    {
      label: 'Zoom In',
      tooltip: 'Increase text size',
      localizeNotes: 'Zoom in command',
      group: 'tab.view.zoom',
      order: 1,
      command: 'tab.zoomIn',
    },
    {
      label: 'Zoom Out',
      tooltip: 'Decrease text size',
      localizeNotes: 'Zoom out command',
      group: 'tab.view.zoom',
      order: 2,
      command: 'tab.zoomOut',
    },
    {
      label: 'Split View',
      tooltip: 'Split the document view',
      localizeNotes: 'Split view command',
      group: 'tab.view.layout',
      order: 1,
      command: 'tab.splitView',
      iconPathBefore: homeIcon,
    },
    {
      label: 'Full Screen',
      tooltip: 'Enter full screen mode',
      localizeNotes: 'Full screen command',
      group: 'tab.view.layout',
      order: 2,
      command: 'tab.fullScreen',
    },
    {
      label: 'Preferences',
      tooltip: 'Open tab preferences',
      localizeNotes: 'Preferences command',
      group: 'tab.tools.main',
      order: 1,
      command: 'tab.preferences',
      iconPathAfter: settingsIcon,
    },
  ],
});

function TabMenuDemo({
  variant,
  customIcon,
  customLabel = 'Tab Options',
}: {
  variant?: 'default' | 'muted';
  customIcon?: React.ReactNode;
  customLabel?: string;
}) {
  const [lastCommand, setLastCommand] = useState<string>('');

  const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
    setLastCommand(item.command);
  };

  return (
    <div className="tw-space-y-4">
      <div className="tw-flex tw-items-center tw-gap-4">
        <TabDropdownMenu
          menuData={createSampleMenuData()}
          onSelectMenuItem={handleSelectMenuItem}
          tabLabel={customLabel}
          icon={customIcon}
          variant={variant}
        />
        <span className="tw-text-sm tw-text-muted-foreground">
          Click the menu button to see tab options
        </span>
      </div>

      <div className="tw-rounded tw-border tw-bg-gray-50 tw-p-4">
        <div className="tw-text-sm">
          <strong>Last Command:</strong> {lastCommand || 'None'}
        </div>
        <p className="tw-mt-2 tw-text-xs tw-text-muted-foreground">
          Menu items are organized by columns and separated with dividers.
        </p>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <TabMenuDemo />,
};

export const WithCustomIcon: Story = {
  render: () => (
    <TabMenuDemo customIcon={<Settings className="tw-h-4 tw-w-4" />} customLabel="Settings Menu" />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tab dropdown menu with a custom settings icon instead of the default hamburger menu.',
      },
    },
  },
};

export const MutedVariant: Story = {
  render: () => <TabMenuDemo variant="muted" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with muted styling for subtle integration.',
      },
    },
  },
};

export const MultipleMenus: Story = {
  render: () => {
    const [lastCommand, setLastCommand] = useState<string>('');

    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };

    return (
      <div className="tw-space-y-4">
        <div className="tw-flex tw-items-center tw-gap-2 tw-rounded tw-border tw-p-4">
          <span className="tw-text-sm tw-font-medium">Document Tab:</span>
          <TabDropdownMenu
            menuData={createSampleMenuData()}
            onSelectMenuItem={handleSelectMenuItem}
            tabLabel="Document Options"
          />

          <span className="tw-ml-4 tw-text-sm tw-font-medium">Settings Tab:</span>
          <TabDropdownMenu
            menuData={createSampleMenuData()}
            onSelectMenuItem={handleSelectMenuItem}
            tabLabel="Settings Options"
            icon={<Settings className="tw-h-4 tw-w-4" />}
            variant="muted"
          />

          <span className="tw-ml-4 tw-text-sm tw-font-medium">Home Tab:</span>
          <TabDropdownMenu
            menuData={createSampleMenuData()}
            onSelectMenuItem={handleSelectMenuItem}
            tabLabel="Home Options"
            icon={<Home className="tw-h-4 tw-w-4" />}
          />
        </div>

        <div className="tw-rounded tw-border tw-bg-gray-50 tw-p-4">
          <div className="tw-text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw-mt-2 tw-text-xs tw-text-muted-foreground">
            Example showing multiple tab dropdown menus with different icons and variants.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple tab dropdown menus showing different configurations and use cases.',
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
        'tab.tools.export': {
          column: 'tab.tools',
          order: 2,
        },
        'tab.tools.export.formats': {
          menuItem: 'tab.export',
          order: 1,
        },
      },
      items: [
        ...createSampleMenuData().items,
        {
          label: 'Export...',
          tooltip: 'Export document in various formats',
          localizeNotes: 'Export submenu',
          group: 'tab.tools.export',
          order: 1,
          id: 'tab.export',
        },
        {
          label: 'Export as PDF',
          tooltip: 'Export document as PDF',
          localizeNotes: 'PDF export',
          group: 'tab.tools.export.formats',
          order: 1,
          command: 'tab.exportPDF',
        },
        {
          label: 'Export as Text',
          tooltip: 'Export document as plain text',
          localizeNotes: 'Text export',
          group: 'tab.tools.export.formats',
          order: 2,
          command: 'tab.exportText',
        },
      ],
    };

    const handleSelectMenuItem = (item: MenuItemContainingCommand) => {
      setLastCommand(item.command);
    };

    return (
      <div className="tw-space-y-4">
        <div className="tw-flex tw-items-center tw-gap-4">
          <TabDropdownMenu
            menuData={menuDataWithSubmenus}
            onSelectMenuItem={handleSelectMenuItem}
            tabLabel="Tab with Submenus"
            icon={<FileText className="tw-h-4 tw-w-4" />}
          />
          <span className="tw-text-sm tw-text-muted-foreground">
            Tab menu with nested export options
          </span>
        </div>

        <div className="tw-rounded tw-border tw-bg-gray-50 tw-p-4">
          <div className="tw-text-sm">
            <strong>Last Command:</strong> {lastCommand || 'None'}
          </div>
          <p className="tw-mt-2 tw-text-xs tw-text-muted-foreground">
            Try the &quot;Tools&quot; section and look for the &quot;Export...&quot; submenu.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab dropdown menu with nested submenus for complex menu hierarchies.',
      },
    },
  },
};
