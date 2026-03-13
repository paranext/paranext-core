import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  OverlayContextMenu,
  OverlayContextMenuItem,
} from '@/components/advanced/overlays/overlay-context-menu.component';

const meta: Meta<typeof OverlayContextMenu> = {
  title: 'Advanced/OverlayContextMenu',
  component: OverlayContextMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A context menu component rendered at a specific position. Supports items, separators, submenus, checkboxes, and radio groups.',
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
type Story = StoryObj<typeof OverlayContextMenu>;

const basicItems: OverlayContextMenuItem[] = [
  { type: 'item', id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
  { type: 'item', id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
  { type: 'item', id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
  { type: 'separator' },
  { type: 'item', id: 'disabled', label: 'Disabled Item', disabled: true },
  { type: 'item', id: 'delete', label: 'Delete', destructive: true },
];

export const BasicItems: Story = {
  args: { items: basicItems },
};

const checkboxItems: OverlayContextMenuItem[] = [
  { type: 'checkbox', id: 'bold', label: 'Bold', checked: true },
  { type: 'checkbox', id: 'italic', label: 'Italic', checked: false },
  { type: 'checkbox', id: 'underline', label: 'Underline', checked: false },
];

export const CheckboxItems: Story = {
  args: { items: checkboxItems },
};

const radioItems: OverlayContextMenuItem[] = [
  { type: 'radio', id: 'small', label: 'Small', value: 'small', group: 'size', checked: false },
  { type: 'radio', id: 'medium', label: 'Medium', value: 'medium', group: 'size', checked: true },
  { type: 'radio', id: 'large', label: 'Large', value: 'large', group: 'size', checked: false },
];

export const RadioGroup: Story = {
  args: { items: radioItems },
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
  { type: 'checkbox', id: 'wrap', label: 'Word Wrap', checked: true },
  { type: 'checkbox', id: 'minimap', label: 'Show Minimap', checked: false },
  { type: 'separator' },
  { type: 'radio', id: 'lf', label: 'LF', value: 'lf', group: 'eol', checked: true },
  { type: 'radio', id: 'crlf', label: 'CRLF', value: 'crlf', group: 'eol', checked: false },
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
  { type: 'item', id: 'delete', label: 'Delete File', destructive: true },
];

export const KitchenSink: Story = {
  args: { items: kitchenSinkItems },
};
