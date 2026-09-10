import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ToolbarCompoundLabel,
  type ToolbarCompoundLabelProps,
} from '@/components/advanced/toolbar-compound-label/toolbar-compound-label.component';

const meta: Meta<ToolbarCompoundLabelProps> = {
  title: 'Advanced/ToolbarCompoundLabel',
  component: ToolbarCompoundLabel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A two-field toolbar label that degrades predictably as its slot narrows. The second field is always the one that gives way: it clips with an ellipsis, then disappears, leaving the first field alone. A tooltip carries the complete text whenever what is rendered is not all of it.\n\nUse this for any toolbar item whose text can outgrow its space — a scripture reference, a project name, a paragraph style. Handling it here rather than per-item is what keeps them behaving the same way as they shrink.',
      },
    },
  },
  args: {
    primary: 'GEN',
    secondary: '1:1',
    fullText: 'Genesis 1:1',
  },
};

export default meta;

type Story = StoryObj<ToolbarCompoundLabelProps>;

export const Default: Story = {};

export const InANarrowSlot: Story = {
  render: (args) => (
    <div className="tw:w-24 tw:overflow-hidden tw:border tw:p-1">
      <ToolbarCompoundLabel {...args} />
    </div>
  ),
  args: {
    primary: '1 Chronicles',
    secondary: '29:30',
    fullText: '1 Chronicles 29:30',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The secondary field absorbs the shrinking, so it clips to an ellipsis while the book name stays whole. Hover to see the full reference — the tooltip opens only because something is actually clipped.',
      },
    },
  },
};

export const AbbreviatedPrimary: Story = {
  args: { isPartial: true },
  parameters: {
    docs: {
      description: {
        story:
          '`GEN` stands in for `Genesis`. Nothing is clipped, so CSS cannot detect that anything is missing — `isPartial` is what tells the label to offer its tooltip anyway. Without it the full book name would be unreachable.',
      },
    },
  },
};

export const SecondaryDropped: Story = {
  args: { showSecondary: false },
  parameters: {
    docs: {
      description: {
        story:
          'At the narrowest step the second field is removed entirely. The tooltip becomes unconditional, since the label is incomplete by construction.',
      },
    },
  },
};

export const SecondaryFirst: Story = {
  args: {
    primary: '(TP1)',
    secondary: 'Translation Project 1',
    secondaryFirst: true,
    fullText: 'Translation Project 1 (TP1)',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A project selector reads full-name-then-short-name, but the short name is the identifying half and has to survive. `secondaryFirst` keeps the reading order while leaving the shrink order alone.',
      },
    },
  },
};

export const CustomSeparator: Story = {
  args: {
    primary: <span className="tw:font-mono">p</span>,
    secondary: 'Paragraph',
    separator: ' - ',
    fullText: 'p - Paragraph',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The separator is a real text node, not a CSS gap, so it survives into `textContent` — screen readers and text-matching tests both read one continuous label. The paragraph-style trigger uses ` - ` and renders its marker code in monospace.',
      },
    },
  },
};
