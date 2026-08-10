import type { Meta, StoryObj } from '@storybook/react-vite';
import { Eraser } from 'lucide-react';
import { fn } from 'storybook/test';
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
      {
        marker: 'q',
        title: 'Poetry',
        subtitle: 'Only reachable by searching for "q" or "Poetry"',
        isDisallowed: true,
        action: fn(),
      },
    ],
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
