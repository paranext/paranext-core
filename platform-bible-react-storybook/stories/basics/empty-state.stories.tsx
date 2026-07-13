import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from '@/components/basics/empty-state.component';

const meta: Meta<typeof EmptyState> = {
  title: 'Basics/EmptyState',
  component: EmptyState,
  tags: ['autodocs', 'test'],
  parameters: {
    docs: {
      description: {
        component: `
A presentational empty-state message for a list, grid, or panel that has nothing to show.

**Features:**
- Renders the localized \`message\` in a \`role="status"\` region so screen readers announce it when the content becomes empty
- Layout (centering, spacing, emphasis) is left to the caller via \`className\`
- Optional \`id\` becomes a \`data-testid\` for e2e/test lookup
        `,
      },
    },
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Localized message describing why the region is empty and what the user can do.',
    },
    id: {
      control: 'text',
      description: 'Optional data-testid for locating the empty state.',
    },
    className: {
      control: 'text',
      description: 'Optional class name appended to the message element for layout/styling.',
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

export const Default: Story = {
  args: {
    message: 'No texts to display. Open View Options to choose which texts to show.',
  },
};

export const Centered: Story = {
  args: {
    message: 'No texts to display. Open View Options to choose which texts to show.',
    className: 'tw:text-center',
  },
  render: (args) => (
    <div className="tw:flex tw:h-40 tw:items-center tw:justify-center tw:rounded tw:border">
      <EmptyState {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Filling a grid body: the caller supplies a centering wrapper and passes `tw:text-center`.',
      },
    },
  },
};

export const Inline: Story = {
  args: {
    message: 'No texts added yet. Use Get resources to add them.',
    className: 'tw:py-1 tw:italic',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inside a panel section: an inline, italic hint sitting above a list.',
      },
    },
  },
};
