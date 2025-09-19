import type { Meta, StoryObj } from '@storybook/react-vite';
import { FootnoteItem } from '@/components/advanced/footnotes/footnote-item.component';
import { FootnoteItemProps } from '@/components/advanced/footnotes/footnotes.types';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof FootnoteItem> = {
  title: 'Advanced/FootnoteItem',
  component: FootnoteItem,
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
  args: {
    className: '',
    formatCaller: undefined,
    showMarkers: true,
  },
};
export default meta;

type Story = StoryObj<typeof FootnoteItem>;

export const Basic: Story = {
  args: {
    footnote: {
      type: 'note',
      marker: 'f',
      caller: 'a',
      content: [
        {
          marker: 'fr',
          type: 'text',
          content: ['6.8 '],
        },
        {
          marker: 'ft',
          type: 'text',
          content: ['This is a basic footnote.'],
        },
      ],
    },
  } satisfies FootnoteItemProps,
};

export const CrossReferenceWithoutCaller: Story = {
  args: {
    footnote: {
      type: 'note',
      marker: 'x',
      caller: undefined,
      content: [
        {
          marker: 'xo',
          type: 'text',
          content: ['1:2 '],
        },
        {
          marker: 'xt',
          type: 'text',
          content: ['Malachi 3:1'],
        },
      ],
    },
  } satisfies FootnoteItemProps,
};

type FootnoteItemStoryProps = FootnoteItemProps & { callerSymbol: string };

function FootnoteItemStory({ callerSymbol, ...rest }: FootnoteItemStoryProps) {
  return (
    <FootnoteItem
      {...rest}
      formatCaller={(c) => {
        if (c === '+') return callerSymbol;
        if (c === '-') return undefined;
        return c;
      }}
    />
  );
}

export const WithCallerFormatting: StoryObj<FootnoteItemStoryProps> = {
  args: {
    callerSymbol: '†',
    footnote: {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [
        { marker: 'fr', type: 'text', content: ['1:8 '] },
        { marker: 'fq', type: 'text', content: ['quoted text '] },
        { marker: 'ft', type: 'text', content: ['Footnote with a custom caller formatter.'] },
      ],
    },
  },
  argTypes: {
    callerSymbol: { control: 'text' },
  },
  render: (args) => <FootnoteItemStory {...args} />,
};

export const FootnoteTextWithoutMarker: Story = {
  args: {
    footnote: {
      type: 'note',
      marker: 'f',
      caller: 'a',
      content: ['This text is not marked using a valid footnote character style.'],
    },
    useUsfmFallbackStyles: false,
  } satisfies FootnoteItemProps,
};

export const SuppressDefaultUsfmStyles: Story = {
  args: {
    formatCaller: (c) => {
      if (c === '+') return 'a';
      if (c === '-') return undefined;
      return c;
    },
    footnote: {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [
        {
          marker: 'fr',
          type: 'text',
          content: ['1:5 '],
        },
        {
          marker: 'ft',
          type: 'text',
          content: ['Or '],
        },
        {
          marker: 'fqa',
          type: 'text',
          content: ['before him in love, '],
        },
        {
          marker: 'fv',
          type: 'text',
          content: ['5'],
        },
        {
          marker: 'fqa',
          type: 'text',
          content: ['having predestined us'],
        },
      ],
    },
    useUsfmFallbackStyles: false,
  } satisfies FootnoteItemProps,
};
