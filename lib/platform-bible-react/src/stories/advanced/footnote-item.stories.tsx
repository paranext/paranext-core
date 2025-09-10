import { FootnoteItem } from "@/components/advanced/footnotes/footnote-item.component";
import { FootnoteItemProps } from "@/components/advanced/footnotes/footnotes.types";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof FootnoteItem> = {
  title: "Advanced/FootnoteItem",
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
    className: "",
    formatCaller: undefined,
    showMarkers: true,
  },
};
export default meta;

type Story = StoryObj<typeof FootnoteItem>;

export const Basic: Story = {
  args: {
    footnote: {
      type: "note",
      marker: "f",
      caller: "a",
      content: [
        "This is a plain text footnote. ",
        {
          marker: "ft",
          type: "text",
          content: ["Nested ", { marker: "it", type: "italic", content: ["italic"] }, " text."],
        },
      ],
    },
  } satisfies FootnoteItemProps,
};

export const CrossReferenceWithoutCaller: Story = {
  args: {
    footnote: {
      type: "note",
      marker: "x",
      caller: undefined,
      content: [
        {
          marker: "xo",
          type: "text",
          content: ["1:2"],
        },
        {
          marker: "xt",
          type: "text",
          content: ["Malachi 3:1"],
        },
      ],
    },
  } satisfies FootnoteItemProps,
};

export const WithCallerFormatting: Story = {
  args: {
    formatCaller: (c) => c == "+" ? "a" : c == "-" ? undefined : c,
    footnote: {
      type: "note",
      marker: "f",
      caller: "+",
      content: [
        {
          marker: "fr",
          type: "text",
          content: ["1:8"],
        },
        {
          marker: "ft",
          type: "text",
          content: ["Footnote with a custom caller formatter."],
        },
      ],
    },
  } satisfies FootnoteItemProps,
};
