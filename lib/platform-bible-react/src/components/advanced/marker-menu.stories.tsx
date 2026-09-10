import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClipboardPaste, Eraser, RemoveFormatting } from 'lucide-react';
import { expect, fn } from 'storybook/test';
import { MarkerMenu, MarkerMenuItem } from './marker-menu.component';

const localizedStrings = {
  '%markerMenu_deprecated_label%': 'Deprecated',
  '%markerMenu_disallowed_label%': 'Disallowed',
  '%markerMenu_noResults%': 'No results found.',
  '%markerMenu_searchPlaceholder%': 'Type a style or search.',
};

const meta: Meta<typeof MarkerMenu> = {
  title: 'Advanced/MarkerMenu',
  component: MarkerMenu,
  tags: ['autodocs', 'test'],
  parameters: {
    docs: {
      description: {
        component:
          'A searchable list of markers (and marker-like commands) for the scripture editor. Rows ' +
          'can carry a selection state (how much of the current selection the marker covers), a ' +
          'disabled state (the consumer has no operation for the row right now), and the ' +
          'marker-level deprecated/disallowed states.',
      },
    },
  },
  // The menu is meant to live inside a popover the consumer sizes, so the stories render it in a
  // fixed-width bordered box rather than letting it stretch across the docs page.
  decorators: [
    (Story) => (
      <div className="tw:w-80 tw:rounded-md tw:border tw:border-border">
        <Story />
      </div>
    ),
  ],
  args: {
    localizedStrings,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Items with no `selectionState` and no `isDisabled` — how the menu has always rendered. */
const legacyItems: MarkerMenuItem[] = [
  { marker: 'bd', title: 'Bold', subtitle: 'A character style, use bold text', action: fn() },
  { marker: 'it', title: 'Italic', subtitle: 'A character style, use italic text', action: fn() },
  { marker: 'nd', title: 'Name of God', subtitle: 'For name of deity', action: fn() },
  { icon: Eraser, title: 'Remove character style', action: fn() },
];

export const Default: Story = {
  args: { markerMenuItems: legacyItems },
  parameters: {
    docs: {
      description: {
        story:
          'The inert/legacy case: no item supplies `selectionState`, so no selection affordance ' +
          'renders and no `aria-checked` is set. Consumers that do not track a selection see ' +
          'exactly the rows they saw before the affordance existed.',
      },
    },
  },
};

export const SelectionStateAll: Story = {
  args: {
    markerMenuItems: legacyItems.map((item) => ({ ...item, selectionState: 'all' as const })),
  },
  parameters: {
    docs: {
      description: {
        story: 'Every row covers the whole selection: a check, and `aria-checked="true"`.',
      },
    },
  },
};

export const SelectionStatePartial: Story = {
  args: {
    markerMenuItems: legacyItems.map((item) => ({ ...item, selectionState: 'partial' as const })),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Every row covers part of the selection. Visually identical to `all` — a checked row ' +
          'means "on the selection" — while `aria-checked="mixed"` preserves the distinction for ' +
          'screen readers.',
      },
    },
  },
};

export const SelectionStateNone: Story = {
  args: {
    markerMenuItems: legacyItems.map((item) => ({ ...item, selectionState: 'none' as const })),
  },
  parameters: {
    docs: {
      description: {
        story:
          'No row is on the selection. The indicator renders empty but still reserves its width, ' +
          'so rows stay aligned with the checked ones.',
      },
    },
  },
};

export const MixedSelectionStates: Story = {
  args: {
    markerMenuItems: [
      {
        marker: 'bd',
        title: 'Bold',
        subtitle: 'A character style, use bold text',
        selectionState: 'all',
        action: fn(),
      },
      {
        marker: 'it',
        title: 'Italic',
        subtitle: 'A character style, use italic text',
        selectionState: 'partial',
        action: fn(),
      },
      {
        marker: 'nd',
        title: 'Name of God',
        subtitle: 'For name of deity',
        selectionState: 'none',
        action: fn(),
      },
      {
        marker: 'wj',
        title: 'Words of Jesus',
        subtitle: 'For marking the words of Jesus',
        action: fn(),
      },
      { icon: Eraser, title: 'Remove character style', selectionState: 'none', action: fn() },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'The realistic case: `all`, `partial`, and `none` alongside a row with no ' +
          '`selectionState` at all (Words of Jesus), which renders no indicator and shifts left.',
      },
    },
  },
};

export const DisabledItems: Story = {
  args: {
    markerMenuItems: [
      {
        marker: 'bd',
        title: 'Bold',
        subtitle: 'A character style, use bold text',
        selectionState: 'all',
        action: fn(),
      },
      {
        marker: 'it',
        title: 'Italic',
        subtitle: 'A character style, use italic text',
        selectionState: 'none',
        isDisabled: true,
        action: fn(),
      },
      {
        icon: Eraser,
        title: 'Remove character style',
        selectionState: 'none',
        isDisabled: true,
        action: fn(),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          '`isDisabled` says the consumer has no operation for the row right now (e.g. nothing to ' +
          'remove). The row stays listed and renders no trailing label — unlike deprecated and ' +
          'disallowed, it describes the moment, not the marker.',
      },
    },
  },
};

export const DeprecatedAndDisallowed: Story = {
  args: {
    markerMenuItems: [
      {
        marker: 'bd',
        title: 'Bold',
        subtitle: 'A character style, use bold text',
        selectionState: 'none',
        action: fn(),
      },
      {
        marker: 'pro',
        title: 'Pronunciation',
        subtitle: 'For indicating pronunciation in CJK texts',
        isDeprecated: true,
        action: fn(),
      },
      // The play function types `q`, so this must stay the only item matching that query by marker
      // code or title — otherwise the `option` assertion below stops being unambiguous.
      {
        marker: 'q',
        title: 'Poetry',
        subtitle: 'Only reachable by searching for "q" or "Poetry"',
        isDisallowed: true,
        action: fn(),
      },
    ],
  },
  play: async ({ canvas, userEvent, step }) => {
    await step('Search for the disallowed "Poetry" (q) marker', async () => {
      const searchInput = canvas.getByPlaceholderText('Type a style or search.');
      await userEvent.type(searchInput, 'q');
    });

    await step('Verify the disallowed marker is revealed, disabled, with its badge', async () => {
      const item = await canvas.findByRole('option', { name: /Poetry/ });
      await expect(item).toHaveAttribute('aria-disabled', 'true');
      await expect(canvas.getByText('Disallowed')).toBeInTheDocument();
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'Deprecated items stay visible but disabled with a trailing label. Disallowed items are ' +
          'hidden while the query is empty (because allowed items exist) — type `q` or `Poetry` ' +
          'to reveal the disallowed row, which also renders disabled.',
      },
    },
  },
};

export const AllItemsDisallowed: Story = {
  args: {
    markerMenuItems: [
      { marker: 'q', title: 'Poetry', isDisallowed: true, action: fn() },
      { marker: 'q1', title: 'Poetry level 1', isDisallowed: true, action: fn() },
      { marker: 'q2', title: 'Poetry level 2', isDisallowed: true, action: fn() },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'When every item is disallowed the menu shows them (disabled) rather than reading as an ' +
          'empty "No results" state.',
      },
    },
  },
};

export const NarrowWithLongTitles: Story = {
  // 200px is the narrow end consumers pin the popover to, which is what makes truncation visible.
  decorators: [
    (Story) => (
      <div className="tw:w-[200px] tw:rounded-md tw:border tw:border-border">
        <Story />
      </div>
    ),
  ],
  args: {
    searchPlaceholder: 'Search character markers',
    markerMenuItems: [
      {
        marker: 'addpn',
        title: 'Addition with proper name, dot underline',
        subtitle: 'For Chinese words to be dot underline & underline',
        selectionState: 'all',
        action: fn(),
      },
      {
        marker: 'qt',
        title: 'Quoted text — Old Testament quotation in the New Testament',
        subtitle: 'Old Testament quotations in the New Testament',
        selectionState: 'partial',
        action: fn(),
      },
      {
        icon: Eraser,
        title: 'Remove all character styles from the selection',
        selectionState: 'none',
        isDisabled: true,
        action: fn(),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'At the 200px width consumers pin the popover to, long titles and subtitles truncate ' +
          'rather than wrap, per the Responsiveness guideline. Hover a row to see the full text.',
      },
    },
  },
};

export const CharacterMarkerRemoveRow: Story = {
  args: {
    searchPlaceholder: 'Search character markers',
    markerMenuItems: [
      {
        icon: RemoveFormatting,
        title: 'Remove character marker',
        action: fn(),
      },
      {
        marker: 'bd',
        title: 'Bold',
        subtitle: 'A character style, use bold text',
        action: fn(),
      },
      {
        marker: 'nd',
        title: 'Name of God',
        subtitle: 'For name of deity',
        action: fn(),
      },
    ],
  },
  play: async ({ canvas, step }) => {
    await step('Verify the remove row renders first and is selectable', async () => {
      const options = await canvas.findAllByRole('option');
      await expect(options[0]).toHaveTextContent('Remove character marker');
      await expect(options[0]).not.toHaveAttribute('aria-disabled', 'true');
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          'The character-marker menu leads with a remove row: an icon-and-title command row with ' +
          'no marker code, which takes the character marker off the selected text and leaves the ' +
          'text itself in place. It appears only while a character marker is applied to the ' +
          'selection. `MarkerMenu` does no sorting of its own — it renders `markerMenuItems` in ' +
          'the order given, so the consumer is the one that puts the remove row ahead of the ' +
          'marker rows and sorts those by marker code.\n\n' +
          "Note that the row's icon must be passed explicitly. With `icon` absent, `MarkerMenu` " +
          'falls back to a `Ban` glyph, which reads as "disallowed" rather than "remove" in a ' +
          'menu that already renders a disallowed affordance.',
      },
    },
  },
};

export const ParagraphMarkersAndCommands: Story = {
  args: {
    searchPlaceholder: 'Search to change paragraph style.',
    markerMenuItems: [
      {
        marker: 'p',
        title: 'Paragraph',
        subtitle: 'normal (with indent first line)',
        action: fn(),
      },
      { icon: ClipboardPaste, title: 'Paste', action: fn() },
      { icon: ClipboardPaste, title: 'Paste as plaintext', action: fn() },
      {
        marker: 'pi',
        title: 'Indented Paragraph',
        subtitle: 'indent level 1 (with first line indent)',
        isDisallowed: true,
        action: fn(),
      },
      {
        marker: 'ph',
        title: 'Indented paragraph with hanging indent',
        isDeprecated: true,
        action: fn(),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'The paragraph-marker surface, which is what the other stories do not show: paragraph ' +
          'markers whose subtitles carry the indent level, and more than one non-marker command ' +
          'row (the two paste commands) rather than a single remove row. It also passes the ' +
          "paragraph menu's own `searchPlaceholder` instead of the generic one — type `pi` to " +
          'reveal the disallowed row.',
      },
    },
  },
};

export const CodeStyledMarkersWithTrailingDetail: Story = {
  args: {
    localizedStrings,
    markerMenuItems: [
      {
        marker: 'p',
        title: 'Paragraph - Normal - First Line Indent',
        subtitle: 'Paragraph text, with first line indent',
        action: fn(),
      },
      {
        marker: 'q1',
        title: 'Poetry - Level 1',
        subtitle: 'Poetic line, first level of indent',
        action: fn(),
      },
      { marker: 'toc1', title: 'Long Table of Contents Text', action: fn() },
      { marker: 'mt1', title: 'Major Title - Level 1', subtitle: 'Book title', action: fn() },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Marker codes render in monospace, so they read as the codes they are rather than as ' +
          "prose. Each row's detail sits to the right of its title, smaller and muted, and gives " +
          'up its space first — the title identifies the row, so it keeps as much of the width as ' +
          'it can. Both truncate rather than wrap, and both carry the full text in a `title` ' +
          'attribute. The `toc1` row shows a marker with no detail at all.',
      },
    },
  },
};

export const NarrowPopover: Story = {
  // Same 200px squeeze as `NarrowWithLongTitles`, on the other row shape: marker code plus trailing
  // detail, rather than long titles with selection affordances. The two shapes give up their space
  // differently, so both are worth seeing at the narrow end.
  decorators: [
    (Story) => (
      <div className="tw:w-[200px] tw:rounded-md tw:border tw:border-border">
        <Story />
      </div>
    ),
  ],
  args: {
    markerMenuItems: [
      {
        marker: 'p',
        title: 'Paragraph - Normal - First Line Indent',
        subtitle: 'Paragraph text, with first line indent',
        action: fn(),
      },
      {
        marker: 'q1',
        title: 'Poetry - Level 1',
        subtitle: 'Poetic line, first level of indent',
        action: fn(),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'The narrowest width consumers pin this popover to. The detail is down to an ellipsis ' +
          'while the title is still readable — the row stays identifiable when there is only ' +
          'room for one of the two.',
      },
    },
  },
};
