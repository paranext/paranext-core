import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { FootnoteList } from '@/components/advanced/footnotes/footnote-list.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { getFormatCallerFunction } from 'platform-bible-utils';
import '@/components/demo/scripture-editor/usj-nodes.css';
import { usjFootnotes } from './footnotes.usj.data';

const meta: Meta<typeof FootnoteList> = {
  title: 'Advanced/FootnoteList',
  component: FootnoteList,
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
  argTypes: {
    layout: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof FootnoteList>;

// Shared template with selection state
function Template({ footnotes = [], listId = 'default-list-id', ...restArgs }: Story['args'] = {}) {
  const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>(undefined);

  return (
    <FootnoteList
      {...restArgs}
      footnotes={footnotes}
      listId={listId}
      selectedFootnote={selectedFootnote}
      onFootnoteSelected={setSelectedFootnote}
    />
  );
}

export const Basic: Story = {
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Basic',
    showMarkers: false,
    layout: 'horizontal',
    localizedStrings: {
      '%webView_footnoteList_header%': 'Footnotes',
    },
  },
};

export const WithCustomCallerFormatting: Story = {
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-WithCustomCallerFormatting',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: getFormatCallerFunction(usjFootnotes, ['†', '‡', '⁂', '★', '☆']),
    localizedStrings: {
      '%webView_footnoteList_header%': 'Footnotes',
    },
  },
};

export const Raw: Story = {
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Raw',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: (caller) => caller,
    localizedStrings: {
      '%webView_footnoteList_header%': 'Footnotes',
    },
  },
};

export const Formatted: Story = {
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Formatted',
    showMarkers: false,
    layout: 'vertical',
    localizedStrings: {
      '%webView_footnoteList_header%': 'Footnotes',
    },
  },
};

export const ShowMarkers: Story = {
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-ShowMarkers',
    showMarkers: true,
    layout: 'vertical',
    formatCaller: (caller) => caller,
    localizedStrings: {
      '%webView_footnoteList_header%': 'Footnotes',
    },
  },
};
