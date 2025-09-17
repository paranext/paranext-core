import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { FootnoteList } from '@/components/advanced/footnotes/footnote-list.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { getFormatCallerFunction } from 'platform-bible-utils';

const sampleFootnotes: MarkerObject[] = [
  {
    marker: 'f',
    type: 'note',
    caller: '+',
    content: [
      {
        marker: 'ft',
        type: 'text',
        content: ['This is a simple footnote.'],
      },
    ],
    sid: 'f1',
  },
  {
    marker: 'f',
    type: 'note',
    caller: '+',
    content: [
      {
        marker: 'ft',
        type: 'text',
        content: [
          'Another footnote with ',
          { marker: 'it', type: 'italic', content: ['italic'] },
          ' text.',
        ],
      },
    ],
    sid: 'f2',
  },
  {
    marker: 'x',
    type: 'note',
    caller: '-',
    content: [
      {
        marker: 'xo',
        type: 'text',
        content: ['1:2'],
      },
      {
        marker: 'xt',
        type: 'text',
        content: ['Malachi 3:1'],
      },
    ],
    sid: 'x1',
  },
  {
    marker: 'f',
    type: 'note',
    caller: '+',
    content: [
      {
        marker: 'fr',
        type: 'text',
        content: ['6:7'],
      },
      {
        marker: 'ft',
        type: 'text',
        content: ["The caller for this one should be 'c'"],
      },
    ],
    sid: 'f2',
  },
];

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
};

export default meta;

type Story = StoryObj<typeof FootnoteList>;

export const Basic: Story = {
  args: {
    footnotes: sampleFootnotes,
    listId: 'storybook-Basic',
    showMarkers: false,
  },
};

export const WithCustomCallerFormatting: Story = {
  args: {
    footnotes: sampleFootnotes,
    listId: 'storybook-Basic',
    showMarkers: true,
    formatCaller: getFormatCallerFunction(sampleFootnotes, ['c', 'd', 'e', 'f', 'g']),
  },
};

export const Raw: Story = {
  args: {
    footnotes: sampleFootnotes,
    listId: 'storybook-Raw',
    showMarkers: true,
    onFootnoteSelected: undefined,
    formatCaller: (caller: string | undefined) => caller,
  },
};

export const Formatted: Story = {
  render: () => {
    const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>(undefined);

    return (
      <div>
        <FootnoteList
          footnotes={sampleFootnotes}
          listId="storybook-Formatted"
          showMarkers={false}
          selectedFootnote={selectedFootnote}
          onFootnoteSelected={(footnote) => setSelectedFootnote(footnote)}
        />
      </div>
    );
  },
};

export const ShowMarkers: Story = {
  render: () => {
    const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>(undefined);

    return (
      <div>
        <FootnoteList
          footnotes={sampleFootnotes}
          listId="storybook-ShowMarkers"
          showMarkers
          selectedFootnote={selectedFootnote}
          onFootnoteSelected={(footnote) => setSelectedFootnote(footnote)}
          formatCaller={(caller) => caller}
        />
      </div>
    );
  },
};
