import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '@/components/shadcn-ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/shadcn-ui/empty';
import { FileQuestion, FolderOpen, Search } from 'lucide-react';

const meta: Meta<typeof Empty> = {
  title: 'Shadcn/Empty',
  component: Empty,
  tags: ['autodocs', 'test'],
  parameters: {
    docs: {
      description: {
        component:
          'A centered zero-state composition for when there is no content to show. Use it when the zero-state needs media, a heading, or an action; for a plain one-line message inside a list, grid, or panel, use `EmptyState` (Basics) instead.',
      },
    },
  },
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

export const Simple: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyTitle>No projects</EmptyTitle>
        <EmptyDescription>Projects you open will appear here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A zero-state with just a title and description.',
      },
    },
  },
};

export const WithIconMedia: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No projects</EmptyTitle>
        <EmptyDescription>Projects you open will appear here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The `icon` variant of `EmptyMedia` renders the icon in a small muted rounded container.',
      },
    },
  },
};

export const WithDefaultMedia: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia>
          <FileQuestion className="tw:size-10 tw:text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>Nothing to show</EmptyTitle>
        <EmptyDescription>
          The `default` variant of `EmptyMedia` adds no background, so it suits larger
          illustrations.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The `default` variant of `EmptyMedia` is a transparent container for a larger icon or illustration.',
      },
    },
  },
};

export const WithAction: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          No projects match your search. Try a different term or clear the filters.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={fn()}>Clear filters</Button>
      </EmptyContent>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A zero-state with a call to action in `EmptyContent`.',
      },
    },
  },
};

export const DashedBorder: Story = {
  render: (args) => (
    <Empty {...args} className="tw:border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No projects</EmptyTitle>
        <EmptyDescription>
          `Empty` sets `border-dashed` but no border width, so add `tw:border` to draw the dashed
          outline.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The dashed outline only renders when the caller supplies a border width via `className`.',
      },
    },
  },
};

export const LiveRegion: Story = {
  render: (args) => (
    <Empty {...args} role="status">
      <EmptyHeader>
        <EmptyTitle>No comments</EmptyTitle>
        <EmptyDescription>
          Add a status role when the zero-state replaces content that changed, so screen readers
          announce it.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The `Empty` primitives set no ARIA role. For dynamic empty states, pass `role="status"` so the message is announced.',
      },
    },
  },
};
