import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShortcutKeys } from './shortcut-keys.component';

const meta: Meta<typeof ShortcutKeys> = {
  title: 'Basics/ShortcutKeys',
  component: ShortcutKeys,
  tags: ['autodocs', 'test'],
  parameters: {
    docs: {
      description: {
        component: `
Renders one already-resolved keyboard shortcut hint as keycaps: a single key is a lone \`Kbd\`, while a combination puts each key in its own \`Kbd\` inside a \`KbdGroup\`. Prefer this over building the \`KbdGroup\` by hand. It follows the hint's own spelling (see [Guidelines/Keyboard shortcuts](?path=/docs/guidelines-keyboard-shortcuts--docs)): macOS symbols sit adjacent with no separator, while Windows/Linux keys get a literal \`+\` between keycaps. Choosing the spelling for the user's OS is up to the caller.

\`hint\` takes a single key combination — such as a menu item's \`shortcut\` string — not a raw keyboard shortcuts catalog \`keys\` string with \`/\`-separated alternatives.
        `,
      },
    },
  },
  argTypes: {
    hint: {
      control: 'text',
      description: 'One already-resolved keyboard shortcut hint to render as keycaps.',
    },
  },
  decorators: [
    (Story) => (
      <div className="tw:p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleKey: Story = {
  args: {
    hint: 'F7',
  },
  parameters: {
    docs: {
      description: {
        story: 'A single-key shortcut renders as one naked `Kbd`, with no surrounding `KbdGroup`.',
      },
    },
  },
};

export const WindowsMultiKey: Story = {
  args: {
    hint: 'Ctrl+Shift+N',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The Windows/Linux spelling: each key gets its own keycap, joined by a plain-text `+`.',
      },
    },
  },
};

export const MacOsAdjacentSymbols: Story = {
  args: {
    hint: '⇧⌘Z',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The macOS spelling: modifier symbols sit adjacent with no separator between the keycaps.',
      },
    },
  },
};

export const CtrlPlusPlus: Story = {
  args: {
    hint: 'Ctrl++',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A `+` directly after another `+` is the key itself rather than a separator, so this renders two keycaps (`Ctrl` and `+`), not three.',
      },
    },
  },
};

export const InMenuRow: Story = {
  render: (args) => (
    <div className="tw:flex tw:w-64 tw:items-center tw:justify-between tw:rounded-sm tw:bg-popover tw:px-2 tw:py-1.5 tw:text-sm">
      <span>Redo</span>
      <ShortcutKeys {...args} />
    </div>
  ),
  args: {
    hint: '⇧⌘Z',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A typical consumer: a menu item row with its label on the start side and the shortcut hint on the end side.',
      },
    },
  },
};
