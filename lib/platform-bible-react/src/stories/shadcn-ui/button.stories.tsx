import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import { ThemeProvider } from '@/preview/preview-components/theme-provider.component';

const meta: Meta<typeof Button> = {
  title: 'Shadcn/Button',
  component: Button,
  tags: ['autodocs', 'test'],
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
      <ThemeProvider>
        <Story />
      </ThemeProvider>
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

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Playground: Story = {
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'default',
  },
};

export const ClickTest: Story = {
  args: {
    children: 'Click Me',
    variant: 'default',
  },
};

export const DisabledTest: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const VariantTest: Story = {
  args: {
    children: 'Variant Test',
    variant: 'destructive',
  },
};

export const SizeTest: Story = {
  args: {
    children: 'Size Test',
    size: 'lg',
  },
};
