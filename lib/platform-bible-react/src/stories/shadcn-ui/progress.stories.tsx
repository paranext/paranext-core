import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from '@/components/shadcn-ui/progress';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Progress> = {
  title: 'Shadcn/Progress',
  component: Progress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 0% completion.',
      },
    },
  },
};

export const Partial: Story = {
  args: {
    value: 60,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 60% completion.',
      },
    },
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at 100% completion.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="tw-flex tw-w-80 tw-flex-col tw-gap-4">
      <div className="tw-flex tw-items-center tw-gap-2">
        <Progress value={0} className="tw-flex-1" />
        <span className="tw-w-8 tw-text-sm">0%</span>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <Progress value={25} className="tw-flex-1" />
        <span className="tw-w-8 tw-text-sm">25%</span>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <Progress value={50} className="tw-flex-1" />
        <span className="tw-w-8 tw-text-sm">50%</span>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <Progress value={75} className="tw-flex-1" />
        <span className="tw-w-8 tw-text-sm">75%</span>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <Progress value={100} className="tw-flex-1" />
        <span className="tw-w-8 tw-text-sm">100%</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars showing different completion states with labels.',
      },
    },
  },
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="tw-w-80">
        <Progress value={progress} />
        <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">Progress: {progress}%</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'An animated progress bar that updates after a delay.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <div className="tw-w-80">
      <Progress {...args} />
      <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
        Use the controls to adjust the progress value.
      </p>
    </div>
  ),
  args: {
    value: 33,
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive progress bar where you can experiment with properties using the controls.',
      },
    },
  },
};
