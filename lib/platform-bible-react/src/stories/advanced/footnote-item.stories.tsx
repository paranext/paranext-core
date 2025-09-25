import type { Meta, StoryObj } from '@storybook/react-vite';
import { FootnoteItem } from '@/components/advanced/footnotes/footnote-item.component';
import { FootnoteItemProps } from '@/components/advanced/footnotes/footnotes.types';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import '@/components/demo/scripture-editor/usj-nodes.css';
import { cn } from '@/utils/shadcn-ui.util';
import { usjFootnotes } from './footnotes.usj.data';

const meta: Meta<typeof FootnoteItem> = {
  title: 'Advanced/FootnoteItem',
  component: FootnoteItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className={cn('formatted-font', 'tw-p-4')}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    formatCaller: undefined,
    showMarkers: true,
  },
};
export default meta;

type Story = StoryObj<typeof FootnoteItem>;

export const Basic: Story = {
  args: {
    footnote: usjFootnotes[0],
  } satisfies FootnoteItemProps,
};

export const CrossReferenceWithoutCaller: Story = {
  args: {
    footnote: usjFootnotes[2],
  } satisfies FootnoteItemProps,
};

type FootnoteItemWithFormatCallerStoryProps = FootnoteItemProps & { callerSymbol: string };

function FootnoteItemWithFormatCallerStory({
  callerSymbol,
  ...rest
}: FootnoteItemWithFormatCallerStoryProps) {
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

export const WithCallerFormatting: StoryObj<FootnoteItemWithFormatCallerStoryProps> = {
  args: {
    callerSymbol: '†',
    footnote: usjFootnotes[1],
  },
  argTypes: {
    callerSymbol: { control: 'text' },
  },
  render: (args) => <FootnoteItemWithFormatCallerStory {...args} />,
};

export const UnmarkedFootnoteText: Story = {
  args: {
    footnote: usjFootnotes[5],
  } satisfies FootnoteItemProps,
};

export const Complex: Story = {
  args: {
    formatCaller: (c) => {
      if (c === '+') return 'a';
      if (c === '-') return undefined;
      return c;
    },
    footnote: usjFootnotes[4],
  } satisfies FootnoteItemProps,
};
