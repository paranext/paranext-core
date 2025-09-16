import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { FootnoteList } from '@/components/advanced/footnotes/footnote-list.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';

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
    showMarkers: true,
  },
};

export const Raw: Story = {
  args: {
    footnotes: sampleFootnotes,
    showMarkers: true,
    onFootnoteSelected: undefined,
    formatCaller: (caller: string | undefined) => caller,
  },
};

function indexToLetters(index: number): string {
  // 0 -> a, 1 -> b ... 25 -> z, 26 -> aa, 27 -> ab, etc.
  let result = '';
  let i = index;
  while (i >= 0) {
    result = String.fromCharCode(97 + (i % 26)) + result;
    i = Math.floor(i / 26) - 1;
  }
  return result;
}

function createSmartFormatCaller(footnotes: MarkerObject[]) {
  // Precompute a stable sequence for '+' callers
  const plusSequenceMap = (() => {
    const map = new Map<number, string>();
    let letterCounter = 0;
    footnotes.forEach((fn, idx) => {
      if (fn.caller === '+') {
        map.set(idx, indexToLetters(letterCounter));
        letterCounter += 1;
      }
    });
    return map;
  })();

  return (caller: string | undefined, index: number): string | undefined => {
    if (caller === '+') return plusSequenceMap.get(index);
    if (caller === '-') return undefined;
    return caller;
  };
}

export const Formatted: Story = {
  render: () => {
    const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>(undefined);

    return (
      <div>
        <FootnoteList
          footnotes={sampleFootnotes}
          showMarkers={false}
          selectedFootnote={selectedFootnote}
          onFootnoteSelected={(footnote) => setSelectedFootnote(footnote)}
          formatCaller={createSmartFormatCaller(sampleFootnotes)}
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
          showMarkers
          selectedFootnote={selectedFootnote}
          onFootnoteSelected={(footnote) => setSelectedFootnote(footnote)}
          formatCaller={createSmartFormatCaller(sampleFootnotes)}
        />
      </div>
    );
  },
};
