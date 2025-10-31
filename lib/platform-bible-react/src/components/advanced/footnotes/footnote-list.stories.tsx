import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { FootnoteList } from '@/components/advanced/footnotes/footnote-list.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { getFormatCallerFunction } from 'platform-bible-utils';
import '@/components/demo/scripture-editor/usj-nodes.css';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/shadcn-ui/resizable';
import { usjFootnotes } from './footnotes.usj.data';

const meta: Meta<typeof FootnoteList> = {
  title: 'Advanced/FootnoteList',
  component: FootnoteList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-h-[300px] tw-overflow-hidden tw-border tw-border-slate-300 tw-p-4">
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
  const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>();

  return (
    <FootnoteList
      {...restArgs}
      footnotes={footnotes}
      listId={listId}
      selectedFootnote={selectedFootnote}
      onFootnoteSelected={(footnote) => setSelectedFootnote(footnote)}
    />
  );
}

// Shared template with resizable panels and stubbed in Scripture.
function ScripturePanelTemplate({
  footnotes = [],
  listId = 'default-list-id',
  showMarkers,
  ...restArgs
}: Story['args'] = {}) {
  const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>();

  return (
    <ResizablePanelGroup
      direction={restArgs.layout === 'horizontal' ? 'vertical' : 'horizontal'}
      className="tw-h-full tw-min-h-0 tw-w-full"
    >
      <ResizablePanel className="tw-flex tw-min-h-0 tw-flex-col">
        <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col">
          <p>
            <sup>11</sup>In the beginning
            {showMarkers ? (
              <span className="tw-text-blue-400">
                \f + \fr 1.11 \fr* This is a simple footnote \f
              </span>
            ) : (
              <sup>a</sup>
            )}
            ...
          </p>
        </div>
      </ResizablePanel>

      <>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={39}
          className="tw-flex tw-min-h-0 tw-flex-col tw-bg-sidebar tw-pb-0 tw-pl-2 tw-pr-0 tw-pt-2"
          minSize={15}
          maxSize={85}
        >
          <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col">
            <Template
              {...restArgs}
              footnotes={footnotes}
              listId={listId}
              selectedFootnote={selectedFootnote}
              onFootnoteSelected={(footnote) => setSelectedFootnote(footnote)}
            />
          </div>
        </ResizablePanel>
      </>
    </ResizablePanelGroup>
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
  render: ScripturePanelTemplate,
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
  render: ScripturePanelTemplate,
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
