import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '@/components/basics/spinner.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Spinner> = {
  title: 'Basics/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    size: { control: { type: 'number', min: 1, max: 100 } },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'A default spinner with standard size and color.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'A small spinner with custom size.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'A large spinner with custom size.',
      },
    },
  },
};

export const CustomSize: Story = {
  args: {
    size: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'A spinner with a custom size of 10.',
      },
    },
  },
};

export const Colored: Story = {
  args: {
    className: 'tw-text-red-600',
  },
  parameters: {
    docs: {
      description: {
        story: 'A red-colored spinner using custom CSS classes.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="tw-flex tw-items-center tw-gap-6">
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <Spinner />
        <span className="tw-text-sm">Default</span>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <Spinner className="tw-text-red-600" />
        <span className="tw-text-sm">Red</span>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <Spinner className="tw-text-blue-600" />
        <span className="tw-text-sm">Blue</span>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <Spinner className="tw-text-green-600" />
        <span className="tw-text-sm">Green</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different colored spinner variants.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="tw-flex tw-items-center tw-gap-6">
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <Spinner size={3} />
        <span className="tw-text-sm">Size 3</span>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <Spinner size={4} />
        <span className="tw-text-sm">Size 4</span>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <Spinner />
        <span className="tw-text-sm">Default</span>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <Spinner size={8} />
        <span className="tw-text-sm">Size 8</span>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
        <Spinner size={10} />
        <span className="tw-text-sm">Size 10</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different spinner sizes from small to large.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <div className="tw-flex tw-flex-col tw-items-center tw-gap-4">
      <Spinner {...args} />
      <p className="tw-text-sm tw-text-muted-foreground">
        Use the controls to adjust the spinner size and styling.
      </p>
    </div>
  ),
  args: {
    size: 6,
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive spinner where you can experiment with properties using the controls.',
      },
    },
  },
};
