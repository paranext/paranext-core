import type { Meta, StoryObj } from '@storybook/react-vite';
import { OverlayPopover } from '@/components/advanced/overlays/overlay-popover.component';

const meta: Meta<typeof OverlayPopover> = {
  title: 'Advanced/OverlayPopover',
  component: OverlayPopover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A popover component anchored to a position. Supports text, list, description, rich text, and card content types.',
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
type Story = StoryObj<typeof OverlayPopover>;

export const TextContent: Story = {
  args: {
    content: {
      type: 'text',
      title: 'Note',
      body: 'This is a simple text popover with a title and body content.',
    },
  },
};

export const ListContent: Story = {
  args: {
    content: {
      type: 'list',
      title: 'References',
      items: ['Genesis 1:1', 'Exodus 20:3', 'Psalm 23:1', 'John 3:16'],
    },
  },
};

export const DescriptionContent: Story = {
  args: {
    content: {
      type: 'description',
      title: 'Word Details',
      entries: [
        { term: 'Lemma', detail: 'logos' },
        { term: 'Gloss', detail: 'word, speech, account' },
        { term: 'Occurrences', detail: '330' },
      ],
    },
  },
};

export const RichTextContent: Story = {
  args: {
    content: {
      type: 'richText',
      title: 'Formatted Text',
      body: [
        { text: 'In the beginning ' },
        { text: 'God', bold: true },
        { text: ' created the heavens and the earth. ' },
        { text: '(Gen 1:1)', italic: true, scriptureRef: true },
      ],
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
