import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from '@/components/shadcn-ui/context-menu';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof ContextMenu> = {
  title: 'Shadcn/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Context Menu component displays a menu to the user — such as a set of actions or functions, triggered by right-clicking on an element.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="tw-flex tw-h-32 tw-w-64 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-dashed tw-text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic context menu with simple menu items.',
      },
    },
  },
};

export const WithShortcuts: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="tw-flex tw-h-32 tw-w-64 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-dashed tw-text-sm">
        Right click for shortcuts
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Select All
          <ContextMenuShortcut>⌘A</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context menu with keyboard shortcuts displayed.',
      },
    },
  },
};

export const WithCheckboxItems: Story = {
  render: () => {
    const [checked, setChecked] = React.useState({
      showBookmarks: true,
      showFullURLs: false,
    });

    return (
      <ContextMenu>
        <ContextMenuTrigger className="tw-flex tw-h-32 tw-w-64 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-dashed tw-text-sm">
          Right click for options
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>View Options</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem
            checked={checked.showBookmarks}
            onCheckedChange={(checkedValue) =>
              setChecked((prev) => ({ ...prev, showBookmarks: checkedValue }))
            }
          >
            Show Bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={checked.showFullURLs}
            onCheckedChange={(checkedValue) =>
              setChecked((prev) => ({ ...prev, showFullURLs: checkedValue }))
            }
          >
            Show Full URLs
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Context menu with checkbox items for toggleable options.',
      },
    },
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const [selectedView, setSelectedView] = React.useState('list');

    return (
      <ContextMenu>
        <ContextMenuTrigger className="tw-flex tw-h-32 tw-w-64 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-dashed tw-text-sm">
          Right click for view options
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>View Mode</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={selectedView} onValueChange={setSelectedView}>
            <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
            <ContextMenuRadioItem value="grid">Grid View</ContextMenuRadioItem>
            <ContextMenuRadioItem value="cards">Card View</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
          <ContextMenuSeparator />
          <ContextMenuItem>Refresh</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Context menu with radio group for mutually exclusive options.',
      },
    },
  },
};

export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="tw-flex tw-h-32 tw-w-64 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-dashed tw-text-sm">
        Right click for submenu
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>New File</ContextMenuItem>
        <ContextMenuItem>New Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Open With</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>VS Code</ContextMenuItem>
            <ContextMenuItem>Notepad</ContextMenuItem>
            <ContextMenuItem>Notepad++</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Choose Default Program...</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Send To</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Desktop</ContextMenuItem>
            <ContextMenuItem>Documents</ContextMenuItem>
            <ContextMenuItem>Mail Recipient</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Compressed Folder</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Properties</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context menu with nested submenus for hierarchical actions.',
      },
    },
  },
};

export const WithGroupsAndLabels: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="tw-flex tw-h-32 tw-w-64 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-dashed tw-text-sm">
        Right click for organized menu
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>File Operations</ContextMenuLabel>
          <ContextMenuItem>
            New
            <ContextMenuShortcut>⌘N</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Open
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Edit Operations</ContextMenuLabel>
          <ContextMenuItem>
            Undo
            <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Redo
            <ContextMenuShortcut>⌘Y</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>Disabled Item</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context menu with grouped items, labels, and disabled states.',
      },
    },
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [bookmarks, setBookmarks] = React.useState(true);
    const [toolbar, setToolbar] = React.useState(false);
    const [zoom, setZoom] = React.useState('100');

    return (
      <ContextMenu>
        <ContextMenuTrigger className="tw-flex tw-h-40 tw-w-80 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-dashed tw-bg-muted/50 tw-text-sm">
          Right click for complete example
        </ContextMenuTrigger>
        <ContextMenuContent className="tw-w-64">
          <ContextMenuGroup>
            <ContextMenuItem>
              Back
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Forward
              <ContextMenuShortcut>⌘]</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Reload
              <ContextMenuShortcut>⌘R</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel>View</ContextMenuLabel>
            <ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
              Show Bookmarks
              <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={toolbar} onCheckedChange={setToolbar}>
              Show Toolbar
            </ContextMenuCheckboxItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuLabel>Zoom</ContextMenuLabel>
            <ContextMenuRadioGroup value={zoom} onValueChange={setZoom}>
              <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="75">75%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="125">125%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="150">150%</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>Developer Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>
                Inspect Element
                <ContextMenuShortcut>⌘⇧C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Console
                <ContextMenuShortcut>⌘⇧J</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                Sources
                <ContextMenuShortcut>⌘⇧I</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>View Page Source</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>
            Print
            <ContextMenuShortcut>⌘P</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive example showcasing all context menu features: groups, labels, checkboxes, radio items, submenus, shortcuts, and disabled states.',
      },
    },
  },
};
