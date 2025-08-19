import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { Label } from '@/components/shadcn-ui/label';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Shadcn/Checkbox',
  component: Checkbox,
  tags: ['autodocs', 'test'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    onCheckedChange: { action: 'checked changed' },
  },
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

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => (
    <div className="tw-flex tw-items-center tw-space-x-2">
      <Checkbox {...args} id="default" />
      <Label htmlFor="default">Default checkbox</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic checkbox with label.',
      },
    },
  },
};

export const Checked: Story = {
  render: (args) => (
    <div className="tw-flex tw-items-center tw-space-x-2">
      <Checkbox {...args} id="checked" checked />
      <Label htmlFor="checked">Checked checkbox</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A checkbox in the checked state.',
      },
    },
  },
};

export const Unchecked: Story = {
  render: (args) => (
    <div className="tw-flex tw-items-center tw-space-x-2">
      <Checkbox {...args} id="unchecked" checked={false} />
      <Label htmlFor="unchecked">Unchecked checkbox</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A checkbox explicitly set to unchecked state.',
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="tw-flex tw-items-center tw-space-x-2">
      <Checkbox {...args} id="disabled" disabled />
      <Label htmlFor="disabled">Disabled checkbox</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A disabled checkbox that cannot be interacted with.',
      },
    },
  },
};

export const DisabledChecked: Story = {
  render: (args) => (
    <div className="tw-flex tw-items-center tw-space-x-2">
      <Checkbox {...args} id="disabled-checked" disabled checked />
      <Label htmlFor="disabled-checked">Disabled and checked</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A checkbox that is both disabled and checked.',
      },
    },
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const handleCheck = (value: string, checked: boolean) => {
      if (checked) {
        setCheckedItems((prev) => [...prev, value]);
      } else {
        setCheckedItems((prev) => prev.filter((item) => item !== value));
      }
    };

    return (
      <div className="tw-space-y-3">
        <p className="tw-text-sm tw-font-medium">Select your preferences:</p>
        <div className="tw-space-y-2">
          {[
            'Email notifications',
            'SMS notifications',
            'Push notifications',
            'Marketing emails',
          ].map((option) => (
            <div key={option} className="tw-flex tw-items-center tw-space-x-2">
              <Checkbox
                id={option}
                checked={checkedItems.includes(option)}
                onCheckedChange={(checked) => handleCheck(option, !!checked)}
              />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </div>
        <p className="tw-text-xs tw-text-muted-foreground">
          Selected: {checkedItems.join(', ') || 'None'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A group of related checkboxes with state management.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div className="tw-space-y-4">
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Checkbox
            {...args}
            id="interactive"
            checked={isChecked}
            onCheckedChange={(checked) => {
              setIsChecked(!!checked);
              fn()(checked);
            }}
          />
          <Label htmlFor="interactive">Interactive checkbox</Label>
        </div>
        <p className="tw-text-sm tw-text-muted-foreground">
          Current state: {isChecked ? 'Checked' : 'Unchecked'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive checkbox where you can experiment with properties using the controls.',
      },
    },
  },
};
