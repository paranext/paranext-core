import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { OverlayTabMenuPresentational } from './overlay-tab-menu.component';

const meta: Meta<typeof OverlayTabMenuPresentational> = {
  title: 'Advanced/OverlayTabMenu',
  component: OverlayTabMenuPresentational,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "A web view's tab menu drawn by the overlay service, below the rectangle of the web view's trigger, so a narrow tab cannot cut it off. Sections follow column order and are headed by their column labels.",
      },
    },
  },
  args: {
    anchor: { x: 40, y: 20, width: 32, height: 28 },
    onSelect: (item) => console.log('Selected:', item.command),
    onDismiss: () => console.log('Dismissed'),
  },
};

export default meta;
type Story = StoryObj<typeof OverlayTabMenuPresentational>;

/** Shaped like the scripture editor's tab menu: several columns and an Edit submenu */
const editorMenu: Localized<MultiColumnMenu> = {
  columns: {
    'demo.project': { label: 'Project', order: 1 },
    'demo.edit': { label: 'Edit', order: 2 },
    'demo.insert': { label: 'Insert', order: 3 },
  },
  groups: {
    'demo.projectTop': { column: 'demo.project', order: 1 },
    'demo.editTop': { column: 'demo.edit', order: 1 },
    'demo.editActions': { menuItem: 'demo.editSubmenu', order: 1 },
    'demo.editFind': { menuItem: 'demo.editSubmenu', order: 2 },
    'demo.notes': { column: 'demo.insert', order: 1 },
  },
  items: [
    {
      label: 'Manage books',
      localizeNotes: '',
      group: 'demo.projectTop',
      order: 1,
      command: 'demo.manageBooks',
      iconNameBefore: 'BookCopy',
    },
    {
      id: 'demo.editSubmenu',
      label: 'Edit',
      localizeNotes: '',
      group: 'demo.editTop',
      order: 1,
      iconNameBefore: 'Pencil',
    },
    { label: 'Undo', localizeNotes: '', group: 'demo.editActions', order: 1, command: 'demo.undo' },
    { label: 'Redo', localizeNotes: '', group: 'demo.editActions', order: 2, command: 'demo.redo' },
    {
      label: 'Find',
      localizeNotes: '',
      group: 'demo.editFind',
      order: 1,
      command: 'demo.find',
      shortcut: 'Ctrl+F',
    },
    {
      label: 'Insert footnote',
      localizeNotes: '',
      group: 'demo.notes',
      order: 1,
      command: 'demo.insertFootnote',
    },
    {
      label: 'Insert cross-reference',
      localizeNotes: '',
      group: 'demo.notes',
      order: 2,
      command: 'demo.insertCrossReference',
    },
  ],
};

export const Default: Story = {
  args: { menu: editorMenu },
};

export const OpenedFromKeyboard: Story = {
  args: { menu: editorMenu, focusFirstItem: true },
  parameters: {
    docs: {
      description: {
        story: 'Opened from the keyboard, the menu opens with its first item focused.',
      },
    },
  },
};

const tallMenu: Localized<MultiColumnMenu> = {
  columns: { 'demo.tools': { label: 'Tools', order: 1 } },
  groups: { 'demo.toolsTop': { column: 'demo.tools', order: 1 } },
  items: Array.from({ length: 40 }, (_, index) => ({
    label: `Tool ${index + 1}`,
    localizeNotes: '',
    group: 'demo.toolsTop',
    order: index,
    command: `demo.tool${index + 1}`,
  })),
};

export const TallerThanTheWindow: Story = {
  args: { menu: tallMenu },
  parameters: {
    docs: {
      description: {
        story:
          'A menu taller than the window scrolls inside itself; scrolling it does not dismiss it.',
      },
    },
  },
};
