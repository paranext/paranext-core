import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FileQuestion, FolderOpen, Inbox, Plus, Search } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/shadcn-ui/empty';

const meta: Meta<typeof Empty> = {
  title: 'Shadcn/Empty',
  component: Empty,
  tags: ['autodocs', 'test'],
  argTypes: {
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="tw:max-w-lg tw:p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>Nothing here yet</EmptyTitle>
        <EmptyDescription>
          Items you add will show up in this list once they are available.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The default zero-state: an icon, a title, and a short explanation.',
      },
    },
  },
};

export const WithAction: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No items</EmptyTitle>
        <EmptyDescription>Create your first item to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={fn()}>
          <Plus className="tw:mr-2 tw:h-4 tw:w-4" />
          Create item
        </Button>
      </EmptyContent>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A zero-state with a recovery action. Actions belong in `EmptyContent`, below the header.',
      },
    },
  },
};

export const WithMultipleActions: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try a different search term, or clear the filters to see everything.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="tw:flex tw:gap-2">
          <Button variant="outline" onClick={fn()}>
            Clear filters
          </Button>
          <Button onClick={fn()}>New search</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Two actions side by side inside `EmptyContent`.',
      },
    },
  },
};

export const WithoutMedia: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyTitle>No items</EmptyTitle>
        <EmptyDescription>
          `EmptyMedia` is optional — omit it when an icon adds nothing.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A text-only zero-state with no media slot.',
      },
    },
  },
};

export const TitleOnly: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyTitle>No items</EmptyTitle>
      </EmptyHeader>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The minimal composition — a title and nothing else.',
      },
    },
  },
};

export const MediaVariants: Story = {
  render: () => (
    <div className="tw:flex tw:flex-col tw:gap-6">
      <div>
        <p className="tw:mb-1 tw:text-xs tw:text-muted-foreground">default</p>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="default">
              <FileQuestion className="tw:size-10 tw:text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>Default media</EmptyTitle>
            <EmptyDescription>
              The media renders unstyled, so larger illustrations fit as-is.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
      <div>
        <p className="tw:mb-1 tw:text-xs tw:text-muted-foreground">icon</p>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileQuestion />
            </EmptyMedia>
            <EmptyTitle>Icon media</EmptyTitle>
            <EmptyDescription>
              The icon variant draws a muted rounded tile around a small icon.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Both `EmptyMedia` variants side by side.',
      },
    },
  },
};

export const InsideBorderedContainer: Story = {
  render: (args) => (
    <Empty {...args} className="tw:border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>Nothing to show</EmptyTitle>
        <EmptyDescription>
          The component sets `border-dashed` but no border width; add `tw:border` to draw it.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Adding a border width turns on the dashed outline the component already styles for.',
      },
    },
  },
};
