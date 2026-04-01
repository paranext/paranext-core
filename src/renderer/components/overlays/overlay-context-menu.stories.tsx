import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  OverlayContextMenuPresentational,
  OverlayContextMenuItem,
} from './overlay-context-menu.component';

const meta: Meta<typeof OverlayContextMenuPresentational> = {
  title: 'Advanced/OverlayContextMenu',
  component: OverlayContextMenuPresentational,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A context menu component rendered at a specific position. Supports items, separators, and submenus.',
      },
    },
  },
  args: {
    position: { x: 50, y: 50 },
    onSelect: (result) => console.log('Selected:', result),
    onDismiss: () => console.log('Dismissed'),
  },
};

export default meta;
type Story = StoryObj<typeof OverlayContextMenuPresentational>;

const basicItems: OverlayContextMenuItem[] = [
  { type: 'item', id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
  { type: 'item', id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
  { type: 'item', id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
  { type: 'separator' },
  { type: 'item', id: 'disabled', label: 'Disabled Item', disabled: true },
  { type: 'item', id: 'delete', label: 'Delete' },
];

export const BasicItems: Story = {
  args: { items: basicItems },
};

const submenuItems: OverlayContextMenuItem[] = [
  { type: 'item', id: 'new', label: 'New File' },
  {
    type: 'submenu',
    label: 'Open Recent',
    items: [
      { type: 'item', id: 'file1', label: 'project.json' },
      { type: 'item', id: 'file2', label: 'README.md' },
      { type: 'item', id: 'file3', label: 'index.ts' },
    ],
  },
  { type: 'separator' },
  { type: 'item', id: 'save', label: 'Save', shortcut: 'Ctrl+S' },
];

export const WithSubmenus: Story = {
  args: { items: submenuItems },
};

const kitchenSinkItems: OverlayContextMenuItem[] = [
  { type: 'item', id: 'open', label: 'Open', shortcut: 'Ctrl+O' },
  { type: 'item', id: 'save', label: 'Save', shortcut: 'Ctrl+S' },
  { type: 'separator' },
  {
    type: 'submenu',
    label: 'Encoding',
    items: [
      { type: 'item', id: 'utf8', label: 'UTF-8' },
      { type: 'item', id: 'ascii', label: 'ASCII' },
      { type: 'item', id: 'latin1', label: 'ISO 8859-1' },
    ],
  },
  { type: 'separator' },
  { type: 'item', id: 'delete', label: 'Delete File' },
];

export const KitchenSink: Story = {
  args: { items: kitchenSinkItems },
};
