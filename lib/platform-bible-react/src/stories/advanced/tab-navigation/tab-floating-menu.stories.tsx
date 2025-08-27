import { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';
import { TabFloatingMenu } from '@/components/advanced/tab-toolbar/tab-floating-menu.component';
import { TabToolbarCommonProps } from '@/components/advanced/tab-toolbar/tab-toolbar-container.component';

const projectMenuData = {
  columns: {
    tools: { label: 'Tools', order: 1 },
    info: { label: 'Info', order: 2 },
    project: { label: 'Project', order: 3 },
  },
  groups: {
    general: { column: 'info', order: 1 },
    inventory: { column: 'tools', order: 1 },
    checks: { column: 'tools', order: 2 },
    projectTop: { column: 'project', order: 1, isExtensible: true },
    manageBooks: { column: 'project', order: 2 },
    deleteProject: { column: 'project', order: 3 },
    projectDetails: { column: 'project', order: 4, isExtensible: true },
  },
  items: [
    {
      label: 'Inventory: Characters...',
      group: 'inventory',
      order: 1,
      command: 'openCharactersInventory',
      localizeNotes: '',
    },
    {
      label: 'Inventory: Repeated Words...',
      group: 'inventory',
      order: 2,
      command: 'openRepeatedWordsInventory',
      localizeNotes: '',
    },
    {
      label: 'Publisher Info',
      group: 'general',
      order: 1,
      command: 'showPublisherInfo',
      localizeNotes: '',
    },
    {
      label: 'Assignments and Progress',
      group: 'projectTop',
      order: 2,
      command: 'assignments',
      localizeNotes: '',
    },
    {
      label: 'Open Project Settings',
      group: 'projectTop',
      order: 3,
      command: 'openSettings',
      localizeNotes: '',
    },
  ],
};

const meta: Meta<TabToolbarCommonProps> = {
  title: 'Advanced/TabFloatingMenu',
  component: TabFloatingMenu,
  tags: ['autodocs'],
  args: {
    onSelectProjectMenuItem: (selectedMenuItem) =>
      console.log('Project Menu Run command: ', selectedMenuItem),
    projectMenuData,
  },
};

export default meta;

type Story = StoryObj<TabToolbarCommonProps>;

export const Default: Story = {};

export const WithCustomIcon: Story = {
  args: {
    menuButtonIcon: <Plus />,
  },
  parameters: {
    docs: {
      description: {
        story: 'TabFloatingMenu with a custom icon as the menu button.',
      },
    },
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'tw-bg-red-100 tw-border-red-400',
  },
  parameters: {
    docs: {
      description: {
        story: 'TabFloatingMenu with custom background and border color.',
      },
    },
  },
};
