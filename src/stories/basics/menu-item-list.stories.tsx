import type { Meta, StoryObj } from '@storybook/react';
import { MenuItemList, Command } from 'platform-bible-react';

const meta: Meta<typeof MenuItemList> = {
  title: 'Basics/MenuItemList',
  component: MenuItemList,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof MenuItemList>;

export const DefaultNoMenuItems: Story = {
  args: {},
};

function HandleMenuCommand(command: Command) {
  if (command.command === 'storybookMenu.log') {
    // eslint-disable-next-line no-console
    console.log(command.name);
  } else if (command.command === 'storybookMenu.warn') {
    // eslint-disable-next-line no-console
    console.warn(command.name);
  } else {
    // eslint-disable-next-line no-console
    console.error(`Unexpected command: ${command.name}`);
  }
}

function GetMenuDefinition(className: string) {
  const menuDefinition = {
    className,
    commandHandler: HandleMenuCommand,
    items: [
      {
        name: 'Do something normal',
        command: 'storybookMenu.log',
        iconPathBefore: '/sample-icon.png',
        hasDivider: true,
      },
      {
        name: 'Do something scary',
        command: 'storybookMenu.warn',
        iconPathAfter: '/sample-icon.png',
      },
    ],
  };
  return menuDefinition;
}

export const Normal: Story = {
  args: GetMenuDefinition(''),
};

export const Paratext: Story = {
  args: GetMenuDefinition('paratext'),
};

export const ParatextBright: Story = {
  args: GetMenuDefinition('paratext bright'),
};
