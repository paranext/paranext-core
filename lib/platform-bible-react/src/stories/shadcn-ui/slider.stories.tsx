import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Slider } from '@/components/shadcn-ui/slider';
import { useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Slider> = {
  title: 'Shadcn/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
    disabled: { control: 'boolean' },
    onValueChange: { action: 'value changed' },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn(),
  },
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A slider with dual handles for selecting a range.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled slider that cannot be interacted with.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => {
    const [value1, setValue1] = useState([40]);
    const [value2, setValue2] = useState([20, 80]);

    return (
      <div className="tw-w-80 tw-space-y-6">
        <div>
          <label htmlFor="single-slider" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
            Single Value
          </label>
          <Slider id="single-slider" value={value1} onValueChange={setValue1} max={100} step={1} />
          <div className="tw-mt-1 tw-text-sm tw-text-muted-foreground">Value: {value1[0]}</div>
        </div>
        <div>
          <label htmlFor="range-slider" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
            Range Selection
          </label>
          <Slider id="range-slider" value={value2} onValueChange={setValue2} max={100} step={1} />
          <div className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
            Range: {value2[0]} - {value2[1]}
          </div>
        </div>
        <div>
          <label htmlFor="disabled-slider" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
            Disabled
          </label>
          <Slider id="disabled-slider" defaultValue={[50]} disabled max={100} step={1} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different slider variants showing single value, range, and disabled states.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState([33]);

    const handleValueChange = (newValue: number[]) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="tw-w-80 tw-space-y-4">
        <Slider {...args} value={value} onValueChange={handleValueChange} />
        <div className="tw-text-sm tw-text-muted-foreground">
          Current value: <code>{value[0]}</code>
        </div>
      </div>
    );
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive slider that shows the current value, similar to the original example.',
      },
    },
  },
};
