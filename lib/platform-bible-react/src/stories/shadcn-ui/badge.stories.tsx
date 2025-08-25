import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Badge } from '@/components/shadcn-ui/badge';
import { X, Star, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Badge> = {
  title: 'Shadcn/Badge',
  component: Badge,
  tags: ['autodocs', 'test'],
  argTypes: {
    variant: {
      options: ['default', 'destructive', 'outline', 'secondary', 'muted'],
      control: { type: 'select' },
    },
    className: { control: 'text' },
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

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (args) => <Badge {...args}>Default Badge</Badge>,
  args: {
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic badge with the default variant.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="tw-flex tw-flex-wrap tw-gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="muted">Muted</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants displayed together.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="tw-flex tw-flex-wrap tw-gap-2">
      <Badge variant="default">
        <Star className="tw-me-1 tw-h-3 tw-w-3" />
        Featured
      </Badge>
      <Badge variant="destructive">
        <AlertCircle className="tw-me-1 tw-h-3 tw-w-3" />
        Error
      </Badge>
      <Badge variant="secondary">
        <CheckCircle className="tw-me-1 tw-h-3 tw-w-3" />
        Completed
      </Badge>
      <Badge variant="outline">
        <Info className="tw-me-1 tw-h-3 tw-w-3" />
        Info
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges can include icons to provide additional context.',
      },
    },
  },
};

export const Clickable: Story = {
  render: () => (
    <div className="tw-flex tw-flex-wrap tw-gap-2">
      <Badge className="tw-cursor-pointer hover:tw-opacity-80" onClick={fn()} variant="default">
        Clickable Badge
      </Badge>
      <Badge className="tw-cursor-pointer hover:tw-opacity-80" onClick={fn()} variant="destructive">
        Remove <X className="tw-ms-1 tw-h-3 tw-w-3" />
      </Badge>
      <Badge className="tw-cursor-pointer hover:tw-opacity-80" onClick={fn()} variant="outline">
        Select <CheckCircle className="tw-ms-1 tw-h-3 tw-w-3" />
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges can be made clickable for interactive functionality.',
      },
    },
  },
};

export const DismissibleBadge: Story = {
  render: () => (
    <Badge className="tw-cursor-pointer hover:tw-opacity-80" onClick={fn()} variant="destructive">
      Dismissible <X className="tw-ms-1 tw-h-3 tw-w-3" />
    </Badge>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A badge with a close icon that can be dismissed.',
      },
    },
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="tw-space-y-2">
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">Status:</span>
        <Badge variant="secondary">
          <CheckCircle className="tw-me-1 tw-h-3 tw-w-3" />
          Active
        </Badge>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">Priority:</span>
        <Badge variant="destructive">
          <AlertCircle className="tw-me-1 tw-h-3 tw-w-3" />
          High
        </Badge>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">Type:</span>
        <Badge variant="outline">Feature</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges used to display status information in a structured layout.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => <Badge {...args}>Interactive Badge</Badge>,
  args: {
    variant: 'default',
    className: 'tw-cursor-pointer hover:tw-opacity-80',
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive badge where you can experiment with different properties using the controls.',
      },
    },
  },
};
