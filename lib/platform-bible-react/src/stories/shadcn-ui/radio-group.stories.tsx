import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Label } from '@/components/shadcn-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof RadioGroup> = {
  title: 'Shadcn/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    defaultValue: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    onValueChange: { action: 'value changed' },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    defaultValue: 'comfortable',
    onValueChange: fn(),
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic radio group with multiple options, matching the original example.',
      },
    },
  },
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" className="tw-flex tw-gap-4">
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A horizontal radio group layout.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" disabled>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-one" id="disabled-one" />
        <Label htmlFor="disabled-one">Option One</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-two" id="disabled-two" />
        <Label htmlFor="disabled-two">Option Two</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A disabled radio group that cannot be interacted with.',
      },
    },
  },
};

export const WithoutDefaultValue: Story = {
  render: () => (
    <RadioGroup>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-one" id="no-default-one" />
        <Label htmlFor="no-default-one">Option One</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-two" id="no-default-two" />
        <Label htmlFor="no-default-two">Option Two</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-three" id="no-default-three" />
        <Label htmlFor="no-default-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A radio group with no default selection.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('option-two');

    return (
      <div className="tw-space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="tw-flex tw-items-center tw-gap-x-2">
            <RadioGroupItem value="option-one" id="controlled-one" />
            <Label htmlFor="controlled-one">Option One</Label>
          </div>
          <div className="tw-flex tw-items-center tw-gap-x-2">
            <RadioGroupItem value="option-two" id="controlled-two" />
            <Label htmlFor="controlled-two">Option Two</Label>
          </div>
          <div className="tw-flex tw-items-center tw-gap-x-2">
            <RadioGroupItem value="option-three" id="controlled-three" />
            <Label htmlFor="controlled-three">Option Three</Label>
          </div>
        </RadioGroup>
        <div className="tw-text-sm tw-text-muted-foreground">
          Selected: <code>{value}</code>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A controlled radio group with state management.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-1" id="interactive-1" />
        <Label htmlFor="interactive-1">Option 1</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-2" id="interactive-2" />
        <Label htmlFor="interactive-2">Option 2</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-3" id="interactive-3" />
        <Label htmlFor="interactive-3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
  args: {
    defaultValue: 'option-1',
    disabled: false,
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive radio group where you can experiment with properties using the controls.',
      },
    },
  },
};
