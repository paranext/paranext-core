import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar } from '@/components/advanced/toolbar.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Search, Save, Settings, Share } from 'lucide-react';

const meta: Meta<typeof Toolbar> = {
  title: 'Advanced/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
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

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: () => (
    <Toolbar onSelectMenuItem={(menuItemId) => console.log('Selected:', menuItemId)}>
      <Button variant="ghost" size="sm">
        <Save className="tw-h-4 tw-w-4" />
        Save
      </Button>
      <Button variant="ghost" size="sm">
        <Share className="tw-h-4 tw-w-4" />
        Share
      </Button>
      <Button variant="ghost" size="sm">
        <Settings className="tw-h-4 tw-w-4" />
        Settings
      </Button>
    </Toolbar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic toolbar with common action buttons.',
      },
    },
  },
};

export const WithSearch: Story = {
  render: () => (
    <Toolbar onSelectMenuItem={(menuItemId) => console.log('Selected:', menuItemId)}>
      <div className="tw-flex tw-items-center tw-space-x-2">
        <div className="tw-relative">
          <Search className="tw-absolute tw-left-2 tw-top-2.5 tw-h-4 tw-w-4 tw-text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="tw-w-[200px] tw-pl-8" />
        </div>
        <Button variant="ghost" size="sm">
          <Save className="tw-h-4 tw-w-4" />
          Save
        </Button>
        <Button variant="ghost" size="sm">
          <Share className="tw-h-4 tw-w-4" />
          Share
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="tw-h-4 tw-w-4" />
          Settings
        </Button>
      </div>
    </Toolbar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toolbar with search functionality and action buttons.',
      },
    },
  },
};

export const WithMenuBar: Story = {
  render: () => (
    <Toolbar onSelectMenuItem={(menuItemId) => console.log('Selected:', menuItemId)}>
      <Button variant="ghost" size="sm">
        <Save className="tw-h-4 tw-w-4" />
        Save
      </Button>
    </Toolbar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toolbar with a menubar placeholder and action buttons.',
      },
    },
  },
};

export const MinimalToolbar: Story = {
  render: () => (
    <Toolbar onSelectMenuItem={(menuItemId) => console.log('Selected:', menuItemId)}>
      <Button variant="ghost" size="sm">
        <Save className="tw-h-4 tw-w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Share className="tw-h-4 tw-w-4" />
      </Button>
    </Toolbar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal toolbar with just icon buttons.',
      },
    },
  },
};
