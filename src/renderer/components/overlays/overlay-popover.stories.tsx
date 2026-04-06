import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { OverlayPopoverPresentational } from './overlay-popover.component';

const meta: Meta<typeof OverlayPopoverPresentational> = {
  title: 'Advanced/OverlayPopover',
  component: OverlayPopoverPresentational,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A popover component anchored to a position. Supports text, markdown, and card content types.',
      },
    },
  },
  args: {
    position: { x: 200, y: 10 },
    onDismiss: () => console.log('Dismissed'),
    onAction: (actionId) => console.log('Action:', actionId),
  },
};

export default meta;
type Story = StoryObj<typeof OverlayPopoverPresentational>;

export const TextContent: Story = {
  args: {
    content: {
      type: 'text',
      title: 'Note',
      body: 'This is a simple text popover with a title and body content.',
    },
  },
};

export const MarkdownContent: Story = {
  args: {
    content: {
      type: 'markdown',
      markdown:
        '# Formatted Text\n\nIn the beginning **God** created the heavens and the earth. *(Gen 1:1)*',
    },
  },
};

export const MarkdownList: Story = {
  args: {
    content: {
      type: 'markdown',
      markdown: '# References\n\n- Genesis 1:1\n- Exodus 20:3\n- Psalm 23:1\n- John 3:16',
    },
  },
};

export const MarkdownDescription: Story = {
  args: {
    content: {
      type: 'markdown',
      markdown:
        '# Word Details\n\n**Lemma**: logos\n\n**Gloss**: word, speech, account\n\n**Occurrences**: 330',
    },
  },
};

export const CardContent: Story = {
  args: {
    content: {
      type: 'card',
      title: 'Translation Note',
      body: 'This verse has an alternate translation that may better convey the original meaning.',
      actions: [
        { id: 'view', label: 'View Details' },
        { id: 'dismiss', label: 'Dismiss', variant: 'secondary' },
      ],
    },
  },
};

export const CardDestructive: Story = {
  args: {
    content: {
      type: 'card',
      title: 'Remove Note',
      body: 'Are you sure you want to remove this translation note?',
      actions: [
        { id: 'cancel', label: 'Cancel', variant: 'secondary' },
        { id: 'remove', label: 'Remove', variant: 'destructive' },
      ],
    },
  },
};
