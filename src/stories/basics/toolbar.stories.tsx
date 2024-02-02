import { Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar, Command } from 'platform-bible-react';

const meta: Meta<typeof Toolbar> = {
  title: 'Basics/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {
    menu: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  args: {},
};

export const Paratext: Story = {
  args: {
    className: 'paratext',
    children: <Typography>Paratext</Typography>,
  },
};

export const ParatextBright: Story = {
  args: {
    className: 'paratext bright',
    children: <Typography>Paratext Bright</Typography>,
  },
};

function HandleMenuCommand(command: Command) {
  if (command.command === 'storybookToolbar.log') {
    // eslint-disable-next-line no-console
    console.log(command.name);
  } else if (command.command === 'storybookToolbar.warn') {
    // eslint-disable-next-line no-console
    console.warn(command.name);
  } else {
    // eslint-disable-next-line no-console
    console.error(`Unexpected command: ${command.name}`);
  }
}

export const WithMenu: Story = {
  args: {
    commandHandler: HandleMenuCommand,
    menu: {
      columns: [
        {
          name: 'Menu One',
          items: [
            {
              name: 'Do something normal',
              command: 'storybookToolbar.log',
              hasDivider: true,
            },
            {
              name: 'Do something scary',
              command: 'storybookToolbar.warn',
            },
          ],
        },
        {
          name: 'Empty Menu',
          items: [],
        },
        {
          name: 'Last Menu',
          items: [
            {
              name: 'Log a message',
              command: 'storybookToolbar.log',
              isDense: true,
            },
            {
              name: 'Nonexistent command',
              command: 'storybookToolbar.nonexistent',
              isDense: true,
            },
          ],
        },
      ],
    },
  },
};

export const WithMenuWithIcons: Story = {
  args: {
    commandHandler: HandleMenuCommand,
    menu: {
      columns: [
        {
          name: 'Menu One',
          items: [
            {
              name: 'Do something normal',
              command: 'storybookToolbar.log',
              iconPathBefore: '/sample-icon.png',
            },
            {
              name: 'Do something scary',
              command: 'storybookToolbar.warn',
              iconPathAfter: '/sample-icon.png',
            },
          ],
        },
        {
          name: 'Last Menu',
          items: [
            {
              name: 'Log a message',
              command: 'storybookToolbar.log',
              iconPathBefore: '/sample-icon.png',
              iconPathAfter: '/sample-icon.png',
            },
            {
              name: 'Nonexistent command',
              command: 'storybookToolbar.nonexistent',
            },
          ],
        },
      ],
    },
  },
};
