import type { Meta, StoryObj } from '@storybook/react-vite';
import { OverlayCommandPalette } from '@/components/advanced/overlays/overlay-command-palette.component';

const meta: Meta<typeof OverlayCommandPalette> = {
  title: 'Advanced/OverlayCommandPalette',
  component: OverlayCommandPalette,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A searchable command palette overlay. Displays a filterable list of items with optional descriptions, badges, icons, and grouping.',
      },
    },
  },
  args: {
    position: { x: 200, y: 10 },
    onSelect: (itemId) => console.log('Selected:', itemId),
    onDismiss: () => console.log('Dismissed'),
  },
};

export default meta;
type Story = StoryObj<typeof OverlayCommandPalette>;

export const BasicItems: Story = {
  args: {
    items: [
      { id: 'p', label: 'Paragraph (p)' },
      { id: 'q1', label: 'Poetry Line 1 (q1)' },
      { id: 'q2', label: 'Poetry Line 2 (q2)' },
      { id: 's', label: 'Section Heading (s)' },
      { id: 'r', label: 'Parallel Passage (r)' },
    ],
    placeholder: 'Type a marker...',
  },
};

export const WithDescriptions: Story = {
  args: {
    items: [
      { id: 'ft', label: 'ft', description: 'Footnote text' },
      { id: 'xt', label: 'xt', description: 'Cross-reference text' },
      { id: 'fr', label: 'fr', description: 'Footnote caller reference' },
      { id: 'xo', label: 'xo', description: 'Cross-reference origin' },
      { id: 'fk', label: 'fk', description: 'Footnote keyword' },
    ],
    placeholder: 'Search footnote markers...',
  },
};

export const WithGroups: Story = {
  args: {
    items: [
      { id: 'p', label: 'Paragraph', group: 'Paragraphs' },
      { id: 'pi', label: 'Indented Paragraph', group: 'Paragraphs' },
      { id: 'q1', label: 'Poetry Line 1', group: 'Poetry' },
      { id: 'q2', label: 'Poetry Line 2', group: 'Poetry' },
      { id: 'q3', label: 'Poetry Line 3', group: 'Poetry' },
      { id: 's', label: 'Section Heading', group: 'Titles & Headings' },
      { id: 's2', label: 'Subsection Heading', group: 'Titles & Headings' },
      { id: 'ms', label: 'Major Section', group: 'Titles & Headings' },
    ],
    placeholder: 'Search USFM markers...',
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { id: 'p', label: 'Paragraph (p)', badge: 'Common' },
      { id: 'q1', label: 'Poetry Line 1 (q1)', badge: 'Common' },
      { id: 'pro', label: 'Pronoun (pro)', badge: 'Deprecated', disabled: true },
      { id: 'cls', label: 'Closure (cls)', badge: 'Disallowed', disabled: true },
      { id: 's', label: 'Section Heading (s)' },
    ],
    placeholder: 'Search markers...',
  },
};

export const ManyItems: Story = {
  args: {
    items: Array.from({ length: 60 }, (_, i) => {
      let group = 'Group C';
      if (i < 20) group = 'Group A';
      else if (i < 40) group = 'Group B';
      return {
        id: `item-${i}`,
        label: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`,
        group,
      };
    }),
    placeholder: 'Search 60 items...',
  },
};

export const Centered: Story = {
  args: {
    position: undefined,
    items: [
      { id: 'open', label: 'Open File', description: 'Open an existing file' },
      { id: 'save', label: 'Save', description: 'Save the current file' },
      { id: 'find', label: 'Find', description: 'Search in file' },
      { id: 'replace', label: 'Find and Replace', description: 'Search and replace in file' },
      { id: 'settings', label: 'Settings', description: 'Open application settings' },
    ],
    placeholder: 'Type a command...',
  },
};
