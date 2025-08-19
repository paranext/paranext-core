import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useState } from 'react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Shadcn/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    variant: { control: 'select', options: ['default', 'outline'] },
    size: { control: 'select', options: ['default', 'sm', 'lg'] },
    disabled: { control: 'boolean' },
    onValueChange: { action: 'value changed' },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    type: 'single',
    onValueChange: fn(),
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic toggle group with single selection.',
      },
    },
  },
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    onValueChange: fn(),
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A toggle group that allows multiple selections.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    type: 'multiple',
    onValueChange: fn(),
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A toggle group with outline variant, similar to the original example.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => {
    const [formatting, setFormatting] = useState<string[]>([]);

    return (
      <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="tw-h-4 tw-w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="tw-h-4 tw-w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="tw-h-4 tw-w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A toggle group with icons for text formatting options.',
      },
    },
  },
};

export const Alignment: Story = {
  render: () => {
    const [alignment, setAlignment] = useState('left');

    return (
      <ToggleGroup
        type="single"
        value={alignment}
        onValueChange={(value) => value && setAlignment(value)}
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="tw-h-4 tw-w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="tw-h-4 tw-w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="tw-h-4 tw-w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A single-selection toggle group for text alignment.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Small</h4>
        <ToggleGroup type="single" size="sm">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Default</h4>
        <ToggleGroup type="single" size="default">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Large</h4>
        <ToggleGroup type="single" size="lg">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toggle groups in different sizes.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" disabled>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A disabled toggle group that cannot be interacted with.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Default Variant - Multiple</h4>
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Outline Variant - Single</h4>
        <ToggleGroup variant="outline" type="single">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different toggle group variants and selection types, matching the original example.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <div className="tw-space-y-4">
      <ToggleGroup {...args}>
        <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
      </ToggleGroup>
      <div className="tw-text-sm tw-text-muted-foreground">
        Use the controls to experiment with different properties.
      </div>
    </div>
  ),
  args: {
    type: 'single',
    variant: 'default',
    size: 'default',
    disabled: false,
    onValueChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive toggle group where you can experiment with properties using the controls.',
      },
    },
  },
};
