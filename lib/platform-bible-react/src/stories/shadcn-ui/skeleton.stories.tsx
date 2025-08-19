import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Skeleton> = {
  title: 'Shadcn/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'tw-h-4 tw-w-64',
  },
};

export const Card: Story = {
  render: () => (
    <div className="tw-flex tw-items-center tw-space-x-4">
      <Skeleton className="tw-h-12 tw-w-12 tw-rounded-full" />
      <div className="tw-space-y-2">
        <Skeleton className="tw-h-4 tw-w-[250px]" />
        <Skeleton className="tw-h-4 tw-w-[200px]" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A skeleton loading state for a card with avatar and text, similar to the original example.',
      },
    },
  },
};

export const Shapes: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Rectangles</h4>
        <div className="tw-space-y-2">
          <Skeleton className="tw-h-4 tw-w-full" />
          <Skeleton className="tw-h-4 tw-w-5/6" />
          <Skeleton className="tw-h-4 tw-w-4/6" />
        </div>
      </div>
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Circles</h4>
        <div className="tw-flex tw-gap-2">
          <Skeleton className="tw-h-8 tw-w-8 tw-rounded-full" />
          <Skeleton className="tw-h-10 tw-w-10 tw-rounded-full" />
          <Skeleton className="tw-h-12 tw-w-12 tw-rounded-full" />
        </div>
      </div>
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Custom Shapes</h4>
        <div className="tw-space-y-2">
          <Skeleton className="tw-h-6 tw-w-24 tw-rounded-md" />
          <Skeleton className="tw-h-8 tw-w-32 tw-rounded-lg" />
          <Skeleton className="tw-h-20 tw-w-20 tw-rounded-xl" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different skeleton shapes including rectangles, circles, and custom rounded shapes.',
      },
    },
  },
};

export const List: Story = {
  render: () => (
    <div className="tw-space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`skeleton-item-${i}`} className="tw-flex tw-items-center tw-space-x-3">
          <Skeleton className="tw-h-10 tw-w-10 tw-rounded-full" />
          <div className="tw-space-y-2">
            <Skeleton className="tw-h-3 tw-w-32" />
            <Skeleton className="tw-h-3 tw-w-24" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A skeleton loading state for a list of items.',
      },
    },
  },
};

export const Article: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <Skeleton className="tw-h-8 tw-w-3/4" />
      <Skeleton className="tw-h-4 tw-w-full" />
      <Skeleton className="tw-h-4 tw-w-full" />
      <Skeleton className="tw-h-4 tw-w-5/6" />
      <Skeleton className="tw-h-32 tw-w-full tw-rounded-md" />
      <Skeleton className="tw-h-4 tw-w-full" />
      <Skeleton className="tw-h-4 tw-w-4/5" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A skeleton loading state for an article with title, text, and image.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <div className="tw-space-y-4">
      <Skeleton {...args} />
      <p className="tw-text-sm tw-text-muted-foreground">
        Use the controls to adjust the skeleton styling.
      </p>
    </div>
  ),
  args: {
    className: 'tw-h-6 tw-w-48',
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive skeleton where you can experiment with properties using the controls.',
      },
    },
  },
};
