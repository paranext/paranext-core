import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from '@/components/shadcn-ui/kbd';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Kbd> = {
  title: 'Shadcn/Kbd',
  component: Kbd,
  tags: ['autodocs', 'test'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: (args) => <Kbd {...args}>Ctrl</Kbd>,
  parameters: {
    docs: {
      description: {
        story: 'A keyboard key rendered with the default Kbd style.',
      },
    },
  },
};

export const KeyboardShortcut: Story = {
  render: () => (
    <span className="tw-flex tw-items-center tw-gap-1 tw-text-sm">
      <Kbd>Ctrl</Kbd>+<Kbd>Z</Kbd>
    </span>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple Kbd elements combined to represent a keyboard shortcut.',
      },
    },
  },
};
