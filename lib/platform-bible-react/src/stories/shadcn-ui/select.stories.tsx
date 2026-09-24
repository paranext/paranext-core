import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from '@/components/shadcn-ui/select';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: 'Shadcn/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: { action: 'value changed' },
    disabled: { control: 'boolean' },
    defaultValue: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="tw:w-48">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  args: {
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic select dropdown with simple options.',
      },
    },
  },
};

export const Framework: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="tw:w-48">
        <SelectValue placeholder="Select framework" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="next">Next.js</SelectItem>
        <SelectItem value="sveltekit">SvelteKit</SelectItem>
        <SelectItem value="astro">Astro</SelectItem>
        <SelectItem value="nuxt">Nuxt.js</SelectItem>
      </SelectContent>
    </Select>
  ),
  args: {
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A select dropdown for choosing frameworks, similar to the original example.',
      },
    },
  },
};

export const WithGroups: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="tw:w-60">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
          <SelectItem value="spinach">Spinach</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  args: {
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A select dropdown with grouped options.',
      },
    },
  },
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="tw:w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  ),
  args: {
    defaultValue: 'system',
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A select dropdown with a default value pre-selected.',
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="tw:w-48">
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
  args: {
    disabled: true,
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled select dropdown that cannot be interacted with.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="tw:space-y-4">
      <div>
        <label htmlFor="basic-select" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
          Basic Select
        </label>
        <Select>
          <SelectTrigger id="basic-select" className="tw:w-48">
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
            <SelectItem value="c">Option C</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="default-select" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
          With Default Value
        </label>
        <Select defaultValue="b">
          <SelectTrigger id="default-select" className="tw:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
            <SelectItem value="c">Option C</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="disabled-select" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
          Disabled
        </label>
        <Select disabled>
          <SelectTrigger id="disabled-select" className="tw:w-48">
            <SelectValue placeholder="Disabled" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different select variants showing various configurations.',
      },
    },
  },
};

export const Position: Story = {
  render: () => (
    <div className="tw:flex tw:gap-16 tw:items-start">
      <div className="tw:space-y-2">
        <p className="tw:text-sm tw:font-medium">popper (default)</p>
        <p className="tw:text-xs tw:text-muted-foreground tw:max-w-40">
          Popup drops below the trigger. Width is at least as wide as the trigger.
        </p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="A" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="genesis">Genesis</SelectItem>
            <SelectItem value="exodus">Exodus</SelectItem>
            <SelectItem value="leviticus">Leviticus</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="tw:space-y-2">
        <p className="tw:text-sm tw:font-medium">item-aligned</p>
        <p className="tw:text-xs tw:text-muted-foreground tw:max-w-40">
          Popup overlays the trigger, aligned to the selected item. Width matches content.
        </p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="A" />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            <SelectItem value="genesis">Genesis</SelectItem>
            <SelectItem value="exodus">Exodus</SelectItem>
            <SelectItem value="leviticus">Leviticus</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**popper** (default) drops the popup below the trigger like a standard dropdown and constrains its minimum width to the trigger width. **item-aligned** overlays the popup on the trigger, positioning it so the selected item aligns with the trigger — useful when you want the list to appear "in place".',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="tw:space-y-4">
        <Select {...args} value={value} onValueChange={handleValueChange}>
          <SelectTrigger className="tw:w-48">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <div className="tw:text-sm tw:text-muted-foreground">
          Selected value: <code>{value || '(none)'}</code>
        </div>
      </div>
    );
  },
  args: {
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive select dropdown that shows the current selection.',
      },
    },
  },
};
