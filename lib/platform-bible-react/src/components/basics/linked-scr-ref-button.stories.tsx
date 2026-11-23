import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { LinkedScrRefButton } from './linked-scr-ref-button.component';

const meta: Meta<typeof LinkedScrRefButton> = {
  title: 'Basics/LinkedScrRefButton',
  component: LinkedScrRefButton,
  tags: ['autodocs', 'test'],
  parameters: {
    docs: {
      description: {
        component: `
A small primitive that renders a scripture reference (or any short label) as a shadcn link-style button, optionally wrapped in a tooltip.

**Features:**
- Click the reference text to navigate (consumer-supplied \`onClick\`)
- Optional hover tooltip via \`tooltipContent\`
- Disabled automatically when no \`onClick\` is provided (read-only mode)
- Tight, inline styling — designed for table cells / row affordances
        `,
      },
    },
  },
  argTypes: {
    scrRef: {
      control: 'text',
      description: 'Already-formatted reference text. Pass an empty string to render nothing.',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler. Omit to render the button in disabled / read-only mode.',
    },
    tooltipContent: {
      control: 'text',
      description: 'Optional tooltip content shown on hover.',
    },
    ariaLabel: {
      control: 'text',
      description: 'Optional accessible name override.',
    },
    className: {
      control: 'text',
      description: 'Optional class name appended to the button.',
    },
    testId: {
      control: 'text',
      description: 'Optional data-testid for the button.',
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
    scrRef: 'JHN 3:16',
    onClick: fn(),
    tooltipContent: 'Go to JHN 3:16',
  },
};

export const WithoutTooltip: Story = {
  args: {
    scrRef: 'GEN 1:1',
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `tooltipContent` is omitted the button is rendered without the tooltip wrapper.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    scrRef: 'PSA 23:1',
    tooltipContent: 'Read-only context — no navigation',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `onClick` is omitted the button is automatically disabled. Useful in read-only contexts where the reference should still be readable.',
      },
    },
  },
};
