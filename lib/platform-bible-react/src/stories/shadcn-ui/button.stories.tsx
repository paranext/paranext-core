import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
// import { ThemeProvider } from '@/preview/preview-components/theme-provider.component'; // Temporarily disabled

const meta: Meta<typeof Button> = {
  title: 'Shadcn/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      control: { type: 'select' },
    },
    size: {
      options: ['default', 'sm', 'lg', 'icon'],
      control: { type: 'select' },
    },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      // Temporarily removing ThemeProvider due to known issues
      // <ThemeProvider>
      <Story />
      // </ThemeProvider>
    ),
  ],
};

export default meta; // Ensure this is the default export

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default',
  },
};

export const LiveEditable: Story = {
  render: (args) => (
    <div className="tw-space-y-4">
      <Button {...args}>{args.children || 'Click me!'}</Button>
      <p className="tw-text-sm tw-text-gray-600">
        Use the Code Editor tab to modify this button in real-time!
      </p>
    </div>
  ),
  args: {
    children: 'Editable Button',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story allows live code editing. Try changing the variant, size, or adding click handlers in the Code Editor panel.',
      },
    },
  },
};

export const VariantsDemo: Story = {
  render: () => (
    <div className="tw-flex tw-flex-wrap tw-gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All button variants displayed together. Try editing this code to add new variants or modify existing ones.',
      },
    },
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'default',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
