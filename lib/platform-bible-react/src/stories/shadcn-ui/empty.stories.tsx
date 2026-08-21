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
        component: `
A centered zero-state composition for when there is no content to show.

**Choosing between this and \`EmptyState\`:**
- Use \`Empty\` when the zero-state needs media, a heading, or an action.
- Use [\`EmptyState\`](?path=/docs/basics-emptystate--docs) for a plain one-line message inside a list, grid, or panel — it takes a single localized \`message\` and renders it in a \`role="status"\` region.

**Two things the caller controls:**
- These primitives set no ARIA role. Pass \`role="status"\` yourself, and mount it before the content changes — see the \`LiveRegion\` story.
- The root sets \`border-dashed\` but no border width, so pass \`className="tw:border"\` to draw the dashed outline.
- \`EmptyTitle\` renders a \`<div>\`, not a heading. Nest your own heading element inside it when the zero-state is a region's entire content.
        `,
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
          The default media variant adds no background, so it suits larger illustrations.
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
          Empty sets a dashed border style but no border width, so the caller adds a border width to
          draw the outline.
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

export const NarrowWidth: Story = {
  render: (args) => (
    <div className="tw:w-[300px] tw:border tw:border-border">
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
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The same content at the 300px minimum width that `Guidelines/Responsiveness` mandates for web views. The outer border marks the 300px boundary; `tw:p-6` on the root spends 48px of it, and `EmptyContent` stacks its actions in a column.',
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
          Keep the status region mounted across the change so screen readers announce the new
          message.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
  parameters: {
    docs: {
      description: {
        story: `
The \`Empty\` primitives set no ARIA role, so pass \`role="status"\` yourself for a zero-state that replaces content the user was reading.

Placement matters more than the role: assistive tech announces *mutations* to a live region that is already in the accessibility tree. Mounting the region and its text in one commit — the shape this static story shows — typically announces nothing in NVDA or JAWS. Keep the \`role="status"\` element mounted across the transition and swap only its text.

Scope it too: \`role="status"\` on the \`Empty\` root makes every button label inside \`EmptyContent\` announced content, so prefer the role on \`EmptyHeader\` or on the description when the zero-state has actions.
        `,
      },
    },
  },
};
