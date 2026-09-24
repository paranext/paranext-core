import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { OverlayCommandPalettePresentational } from './overlay-command-palette.component';

const meta: Meta<typeof OverlayCommandPalettePresentational> = {
  title: 'Advanced/OverlayCommandPalette',
  component: OverlayCommandPalettePresentational,
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
type Story = StoryObj<typeof OverlayCommandPalettePresentational>;

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

export const Passive: Story = {
  args: {
    passive: true,
    filterText: 'q',
    selectedIndex: 2,
    items: [
      { id: 'q', label: 'q', description: 'Poetry Line' },
      { id: 'q1', label: 'q1', description: 'Poetry Line 1' },
      { id: 'q2', label: 'q2', description: 'Poetry Line 2' },
      { id: 'qa', label: 'qa', description: 'Acrostic Heading' },
      { id: 'qc', label: 'qc', description: 'Centered Poetry Line' },
      { id: 'p', label: 'p', description: 'Paragraph' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Passive mode never takes focus: the search input is a read-only display of the marker text the user is typing in the editor that requested the palette, and both filtering and highlighting come from props instead of the input. Here `filterText` is `q`, which prefix-filters the list (`p` drops out) and ranks the exact match first, and `selectedIndex` of 2 highlights the third remaining item (`q2`) rather than the default first one.',
      },
    },
  },
};

export const MutedItems: Story = {
  args: {
    items: [
      { id: 'p', label: 'Paragraph (p)' },
      { id: 'pc', label: 'Centered Paragraph (pc)', muted: true },
      { id: 'q1', label: 'Poetry Line 1 (q1)' },
      { id: 'qd', label: 'Hebrew Note (qd)', muted: true },
      { id: 's', label: 'Section Heading (s)' },
      { id: 'pmo', label: 'Embedded Text Opening (pmo)', muted: true },
    ],
    placeholder: 'Search markers...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Muted items alternate with normal ones so the de-emphasis is comparable side by side. A muted item is one the palette offers but does not consider basic, so its text is dimmed as a cue — unlike the disabled items in WithBadges, it can still be highlighted and selected.',
      },
    },
  },
};
