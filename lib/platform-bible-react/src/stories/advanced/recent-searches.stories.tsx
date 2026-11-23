import type { Meta, StoryObj } from '@storybook/react-vite';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { formatScrRef } from 'platform-bible-utils';
import { expect, fn, screen, within } from 'storybook/test';
import RecentSearches, {
  type RecentSearchesProps,
} from '@/components/advanced/recent-searches.component';

const RECENT_REFERENCES: SerializedVerseRef[] = [
  { book: 'GEN', chapterNum: 1, verseNum: 1 },
  { book: 'EXO', chapterNum: 2, verseNum: 3 },
  { book: 'MAT', chapterNum: 15, verseNum: 1 },
];

const meta: Meta<RecentSearchesProps<SerializedVerseRef>> = {
  title: 'Advanced/RecentSearches',
  component: RecentSearches,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A clock button that opens the list of references the user visited most recently, and reports the one they pick.\n\nIt is a **menu**, not a listbox: picking an item runs an action and closes the list, which is what menu semantics (`role="menu"` / `role="menuitem"`, roving focus, type-ahead, Escape to close) describe. Consumers querying these roles are relying on a documented contract — see the `adr-recent-searches-menu-semantics` entry in `Architecture-Decisions.md`.\n\nThe menu is deliberately non-modal. It usually opens beside a search box the user is still typing in, often inside another popover, so it must not trap focus or stop the surrounding controls responding to clicks.\n\nRenders nothing at all when there are no recent searches, so a caller can mount it unconditionally.',
      },
    },
  },
  args: {
    recentSearches: RECENT_REFERENCES,
    onSearchItemSelect: fn(),
    renderItem: (verseRef: SerializedVerseRef) => formatScrRef(verseRef, 'English'),
    getItemKey: (verseRef: SerializedVerseRef) =>
      `${verseRef.book}-${verseRef.chapterNum}-${verseRef.verseNum}`,
    // Standalone rather than the default absolute positioning, which assumes the button sits
    // inside a search input.
    buttonClassName: 'tw:h-9 tw:w-9',
  },
};

export default meta;

type Story = StoryObj<RecentSearchesProps<SerializedVerseRef>>;

export const Default: Story = {};

/**
 * The component returns nothing when the list is empty, so the canvas below is intentionally blank
 * — a caller never has to guard the render itself.
 */
export const NoRecentSearches: Story = {
  args: { recentSearches: [] },
};

/** Opens the menu and picks an entry, asserting the roles the component promises consumers. */
export const PickingARecentSearch: Story = {
  play: async ({ canvas, step, args, userEvent }) => {
    await step('Open the recent searches menu', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Show recent searches' }));
    });

    await step('The list uses menu semantics, not listbox semantics', async () => {
      // The menu portals out of the canvas, so query the whole document rather than `canvas`.
      await expect(await screen.findByRole('menu')).toBeInTheDocument();
      await expect(screen.getAllByRole('menuitem')).toHaveLength(RECENT_REFERENCES.length);
      await expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });

    await step('Picking an entry reports it to the caller', async () => {
      const menu = screen.getByRole('menu');
      await userEvent.click(within(menu).getByRole('menuitem', { name: /Exodus 2:3/ }));
      await expect(args.onSearchItemSelect).toHaveBeenCalledWith(RECENT_REFERENCES[1]);
    });
  },
};
