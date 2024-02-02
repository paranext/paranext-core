import type { Meta, StoryObj } from '@storybook/react';
import { Command, ContextMenu } from 'platform-bible-react';

const meta: Meta<typeof ContextMenu> = {
  title: 'Basics/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    children: {
      options: ['click', 'Normal', 'Paratext'],
      mapping: {
        Normal: <p>click me!</p>,
        Paratext: <b>Paratext</b>,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ContextMenu>;

// export const DefaultNoMenuItemsMeansNoMenu: Story = {
//   args: {},
// };

export const Default: Story = {
  render: (args) => (
    <div>
      <p>Prior text</p>
      <ContextMenu {...args}>
        <b>
          Sample text to right-click. Since there are no menu items, only the browser default menu
          should show.
        </b>
      </ContextMenu>
      <p>Following text</p>
    </div>
  ),
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
  render: (args) => (
    <div>
      <p>Prior text</p>
      <p>
        <span>Some </span>
        <span>
          <ContextMenu {...args}>sample text to right-click</ContextMenu>
        </span>
        <span>.</span>
      </p>
      <p>Following text</p>
    </div>
  ),
};

export const Paratext: Story = {
  args: GetMenuDefinition('paratext'),
  render: (args) => (
    <div>
      <p>Prior text</p>
      <ContextMenu {...args}>
        <b>Sample text to right-click.</b>
      </ContextMenu>
      <p>Following text</p>
    </div>
  ),
};

export const ParatextBright: Story = {
  args: GetMenuDefinition('paratext bright'),
  render: (args) => (
    <div>
      <p>Prior text</p>
      <ContextMenu {...args}>
        <b>
          Sample text to right-click. Sample text to right-click. Sample text to right-click. Sample
          text to right-click. Sample text to right-click. Sample text to right-click.
        </b>
      </ContextMenu>
      <p>Following text</p>
    </div>
  ),
};
