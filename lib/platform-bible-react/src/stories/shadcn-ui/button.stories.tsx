import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Button } from '@/components/shadcn-ui/button';
import { ThemeProvider } from '@/storybook/theme-provider.component';

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

export const SizesDemo: Story = {
  render: () => (
    <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4">
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">default:</span>
        <Button size="default">Button</Button>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">sm:</span>
        <Button size="sm">Button</Button>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">lg:</span>
        <Button size="lg">Button</Button>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">icon:</span>
        <Button size="icon">★</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together.',
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
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /click me/i });

    // Verify button is rendered
    await expect(button).toBeInTheDocument();
    await expect(button).toBeVisible();

    // Click the button
    await userEvent.click(button);

    // Verify the onClick handler was called
    await expect(args.onClick).toHaveBeenCalled();
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const DisabledTest: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: /disabled button/i });

    // Verify button is rendered and disabled
    await expect(button).toBeInTheDocument();
    await expect(button).toBeDisabled();

    // Verify the onClick handler was not called (disabled buttons don't trigger clicks)
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const VariantTest: Story = {
  args: {
    children: 'Variant Test',
    variant: 'destructive',
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /variant test/i });

    // Verify button is rendered with destructive variant styles
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('tw-bg-destructive');

    // Test button interaction
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Test hover state by hovering over the button
    await userEvent.hover(button);
    await expect(button).toBeInTheDocument();

    // Test unhover
    await userEvent.unhover(button);
    await expect(button).toBeInTheDocument();
  },
};

export const SizeTest: Story = {
  args: {
    children: 'Size Test',
    size: 'lg',
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /size test/i });

    // Verify button is rendered with large size styles
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass('tw-h-11'); // Large size class

    // Test double click
    await userEvent.dblClick(button);
    await expect(args.onClick).toHaveBeenCalledTimes(2);

    // Test focus and blur
    button.focus();
    await expect(button).toHaveFocus();

    button.blur();
    await expect(button).not.toHaveFocus();
  },
};

export const ComplexInteraction: Story = {
  args: {
    children: 'Complex Test Button',
    variant: 'default',
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent, step }) => {
    await step('Initial button verification', async () => {
      const button = canvas.getByRole('button', { name: /complex test button/i });
      await expect(button).toBeInTheDocument();
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    });

    await step('Mouse interactions', async () => {
      const button = canvas.getByRole('button', { name: /complex test button/i });

      // Hover and unhover
      await userEvent.hover(button);
      await userEvent.unhover(button);

      // Single click
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('Keyboard interactions', async () => {
      const button = canvas.getByRole('button', { name: /complex test button/i });

      // Focus the button directly
      button.focus();
      await expect(button).toHaveFocus();

      // Activate via Enter key
      await userEvent.keyboard('{Enter}');
      await expect(args.onClick).toHaveBeenCalledTimes(2);

      // Activate via Space key
      await userEvent.keyboard(' ');
      await expect(args.onClick).toHaveBeenCalledTimes(3);
    });

    await step('Final verification', async () => {
      const button = canvas.getByRole('button', { name: /complex test button/i });
      await expect(button).toBeInTheDocument();
      await expect(args.onClick).toHaveBeenCalledTimes(3);
    });
  },
};
