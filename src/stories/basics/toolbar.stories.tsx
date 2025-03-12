import { LocalizedMenus } from '@shared/utils/menu-document-combiner';
import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar, Command, Label } from 'platform-bible-react';
import { MultiColumnMenu, Localized } from 'platform-bible-utils';

const meta: Meta<typeof Toolbar> = {
  title: 'Basics/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};
export default meta;

type LocalizedMainMenu = LocalizedMenus['mainMenu'];

const menuLayoutWithoutIcons: LocalizedMainMenu = {
  columns: {
    'column.one': { label: 'Menu One', order: 0 },
    'column.two': { label: 'Empty', order: 2 },
    'column.three': { label: 'Last Menu', order: 3, isExtensible: true },
    isExtensible: false,
  },
  groups: {
    'good.stuff': { column: 'column.one', order: 1 },
    'okay.things': { column: 'column.one', order: 2 },
    'last.items': { column: 'column.three', order: 1 },
  },
  items: [
    {
      label: 'Do something normal',
      localizeNotes: 'Storybook toolbar menu > Column One > Do something normal',
      group: 'good.stuff',
      order: 1,
      command: 'storybookToolbar.log',
    },
    {
      label: 'Do something scary',
      localizeNotes: 'Storybook toolbar menu > Column One > Do something scary',
      group: 'okay.things',
      order: 1,
      command: 'storybookToolbar.warn',
    },
    // Note: The next two items are intentionally out of order.
    {
      label: 'Nonexistent command',
      localizeNotes: 'Storybook toolbar menu > Column Three > Nonexistent command',
      group: 'last.items',
      order: 2,
      command: 'storybookToolbar.nonexistent',
    },
    {
      label: 'Log a message',
      localizeNotes: 'Storybook toolbar menu > Column Three > Log a message',
      group: 'last.items',
      order: 1,
      command: 'storybookToolbar.log',
    },
  ],
};

const menuLayoutWithIcons: LocalizedMainMenu = {
  columns: {
    'column.one': { label: 'Menu One', order: 0 },
    'column.two': { label: 'Empty', order: 2 },
    'column.three': { label: 'Last Menu', order: 3, isExtensible: true },
    isExtensible: false,
  },
  groups: {
    'good.stuff': { column: 'column.one', order: 1 },
    'okay.things': { column: 'column.one', order: 2 },
    'last.items': { column: 'column.three', order: 1 },
  },
  items: [
    {
      label: 'Do something normal',
      localizeNotes: 'Storybook toolbar menu > Column One > Do something normal',
      group: 'good.stuff',
      order: 1,
      command: 'storybookToolbar.log',
      iconPathBefore: '/sample-icon.png',
    },
    {
      label: 'Do something scary',
      localizeNotes: 'Storybook toolbar menu > Column One > Do something scary',
      group: 'okay.things',
      order: 1,
      command: 'storybookToolbar.warn',
      iconPathAfter: '/sample-icon.png',
    },
    // Note: The next two items are intentionally out of order.
    {
      label: 'Nonexistent command',
      localizeNotes: 'Storybook toolbar menu > Column Three > Nonexistent command',
      group: 'last.items',
      order: 2,
      command: 'storybookToolbar.nonexistent',
    },
    {
      label: 'Log a message',
      localizeNotes: 'Storybook toolbar menu > Column Three > Log a message',
      group: 'last.items',
      order: 1,
      command: 'storybookToolbar.log',
      iconPathBefore: '/sample-icon.png',
      iconPathAfter: '/sample-icon.png',
    },
  ],
};

function provideMenuData(isSupportAndDevelopment: boolean): Promise<Localized<MultiColumnMenu>> {
  return Promise.resolve(isSupportAndDevelopment ? menuLayoutWithIcons : menuLayoutWithoutIcons);
}

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  args: {},
};

export const Paratext: Story = {
  args: {
    className: 'paratext',
    children: <Label>Paratext</Label>,
  },
};

export const ParatextBright: Story = {
  args: {
    className: 'paratext bright',
    children: <Label>Paratext Bright</Label>,
  },
};

function HandleMenuCommand(command: Command) {
  if (command.command === 'storybookToolbar.log') {
    // eslint-disable-next-line no-console
    console.log(command.command);
  } else if (command.command === 'storybookToolbar.warn') {
    // eslint-disable-next-line no-console
    console.warn(command.command);
  } else {
    // eslint-disable-next-line no-console
    console.error(`Unexpected command: ${command.command}`);
  }
}

export const WithMenuHoldShiftToSeeIcons: Story = {
  args: {
    commandHandler: HandleMenuCommand,
    menuProvider: provideMenuData,
  },
};
