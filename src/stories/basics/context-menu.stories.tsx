import type { Meta, StoryObj } from '@storybook/react';
import { Command, ContextMenu, MenuProps } from 'platform-bible-react';
import { SingleColumnMenu } from 'platform-bible-utils';
import { LocalizedMenus } from '@shared/utils/menu-document-combiner';

const meta: Meta<typeof ContextMenu> = {
  title: 'Basics/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ContextMenu>;

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
    console.log(command.command);
  } else if (command.command === 'storybookMenu.warn') {
    // eslint-disable-next-line no-console
    console.warn(command.command);
  } else {
    // eslint-disable-next-line no-console
    console.error(`Unexpected command: ${command.command}`);
  }
}

type LocalizedContextMenu = LocalizedMenus['defaultWebViewContextMenu'];

function GetMenuDefinition(): Partial<MenuProps> {
  const contextMenuDefinition: LocalizedContextMenu = {
    groups: {
      'group.2': { order: 2, column: 'TODO: this should not be required' },
      'group.1': { order: 1, column: 'TODO: this should not be required' },
      'group.submenu': { order: 1, menuItem: 'submenu.root' },
    },
    items: [
      {
        label: 'Do something scary',
        localizeNotes: 'N/A',
        tooltip: 'Proceed with caution!',
        group: 'group.2',
        order: 1,
        command: 'storybookMenu.warn',
        iconPathAfter: '/sample-icon.png',
      },
      {
        label: 'Do something normal in group 2',
        localizeNotes: 'N/A',
        tooltip: 'Perform a normal action',
        group: 'group.2',
        order: 0,
        command: 'storybookMenu.log',
        iconPathBefore: '/sample-icon.png',
      },
      {
        label: 'Do something normal in group 1',
        localizeNotes: 'N/A',
        tooltip: 'Perform a normal action',
        group: 'group.1',
        order: 0,
        command: 'storybookMenu.log',
        iconPathBefore: '/sample-icon.png',
      },
      {
        label: 'I have a submenu',
        localizeNotes: 'N/A',
        tooltip: 'Click me to see submenu',
        group: 'group.1',
        order: 0,
        id: 'submenu.root',
      },
      {
        label: 'Do something else in group 1',
        localizeNotes: 'N/A',
        tooltip: 'Perform another action',
        group: 'group.1',
        order: 1,
        command: 'storybookMenu.other',
        iconPathBefore: '/sample-icon.png',
      },
      {
        label: 'I am thing 2 on the submenu',
        localizeNotes: 'N/A',
        tooltip: 'Do not click me - it tickles!',
        group: 'group.submenu',
        order: 4,
        command: 'storybookMenu.tickle',
      },
      {
        label: 'I am thing 1 on the submenu',
        localizeNotes: 'N/A',
        tooltip: 'Log something to the console',
        group: 'group.submenu',
        order: 2,
        command: 'storybookMenu.log',
      },
    ],
  };

  // TODO: As part of #425 (Menus: Stitch together back end services and UI components to get menu
  // contributions working end-to-end), we will want to create a parallel type to SingleColumnMenu
  // that should be used in the React components (and returned here) that does not expect the
  // ReferencedItem keys, but rather takes a plain string.
  return {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    menuDefinition: contextMenuDefinition as SingleColumnMenu,
    commandHandler: HandleMenuCommand,
  };
}

export const Normal: Story = {
  args: GetMenuDefinition(),
  render: (args) => (
    <div>
      <p>Prior text</p>
      <p>
        <span>Some </span>
        <span>
          <ContextMenu {...args} commandHandler={HandleMenuCommand}>
            sample text to right-click
          </ContextMenu>
        </span>
        <span>.</span>
      </p>
      <p>Following text</p>
    </div>
  ),
};

export const Paratext: Story = {
  args: GetMenuDefinition(),
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
  args: GetMenuDefinition(),
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
