import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { INVENTORY_STRING_KEYS, InventorySummaryItem, Scope } from 'platform-bible-react';
import { useCallback, useMemo, useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  CharacterInventory,
  CHARACTER_INVENTORY_STRING_KEYS,
} from './character-inventory.component';
import {
  RepeatedWordsInventory,
  REPEATED_WORDS_INVENTORY_STRING_KEYS,
} from './repeated-words-inventory.component';
import { MarkerInventory, MARKER_INVENTORY_STRING_KEYS } from './marker-inventory.component';

/**
 * The inventory components (`CharacterInventory`, `RepeatedWordsInventory`, `MarkerInventory`, …)
 * are presentational wrappers around the shared `Inventory`: they build the type-specific columns
 * and forward the rest. In the app the inventory webview feeds them PAPI (items + occurrences via
 * the data provider, approved/unapproved lists via project settings). These stories feed them from
 * a thin in-memory CRUD service so the flow is fully interactive: filter, change scope, approve /
 * unapprove items (which moves them between the lists and re-renders), and select an item to load
 * its occurrences on demand.
 */

const sharedStrings = getLocalizedStrings([...INVENTORY_STRING_KEYS]);
const characterStrings = getLocalizedStrings([...CHARACTER_INVENTORY_STRING_KEYS]);
const repeatedWordsStrings = getLocalizedStrings([...REPEATED_WORDS_INVENTORY_STRING_KEYS]);
const markerStrings = getLocalizedStrings([...MARKER_INVENTORY_STRING_KEYS]);

const DEFAULT_SCR_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

/** A seed inventory item: its key plus the occurrences the data provider would return for it. */
type SeedItem = {
  key: string | string[];
  count: number;
  occurrences: { reference: SerializedVerseRef; text: string }[];
};

const characterSeed: SeedItem[] = [
  {
    key: 'a',
    count: 3,
    occurrences: [
      { reference: { book: 'GEN', chapterNum: 1, verseNum: 1 }, text: 'In the beginning' },
      { reference: { book: 'GEN', chapterNum: 1, verseNum: 2 }, text: 'And the earth was' },
    ],
  },
  {
    key: 'ḥ',
    count: 1,
    occurrences: [
      { reference: { book: 'GEN', chapterNum: 1, verseNum: 4 }, text: 'God saw the light' },
    ],
  },
  {
    key: '”',
    count: 2,
    occurrences: [
      { reference: { book: 'GEN', chapterNum: 1, verseNum: 3 }, text: 'Let there be light”' },
    ],
  },
  {
    key: '​',
    count: 1,
    occurrences: [
      { reference: { book: 'GEN', chapterNum: 1, verseNum: 5 }, text: 'the first day' },
    ],
  },
];

const repeatedWordsSeed: SeedItem[] = [
  {
    key: 'the the',
    count: 2,
    occurrences: [
      {
        reference: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        text: 'In the the beginning was the Word',
      },
    ],
  },
  {
    key: 'and and',
    count: 1,
    occurrences: [
      {
        reference: { book: 'GEN', chapterNum: 1, verseNum: 3 },
        text: 'And and God said, Let there be light',
      },
    ],
  },
  {
    key: 'is is',
    count: 1,
    occurrences: [
      { reference: { book: 'PSA', chapterNum: 25, verseNum: 8 }, text: 'God is is good' },
    ],
  },
];

const markerSeed: SeedItem[] = [
  {
    key: 'xt',
    count: 3,
    occurrences: [
      {
        reference: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        text: 'In the beginning God created the heavens and the earth.',
      },
    ],
  },
  {
    key: 'f',
    count: 5,
    occurrences: [
      {
        reference: { book: 'GEN', chapterNum: 1, verseNum: 3 },
        text: 'And God said, "Let there be light," and there was light.',
      },
    ],
  },
  {
    key: 'toc2',
    count: 1,
    occurrences: [
      {
        reference: { book: 'GEN', chapterNum: 1, verseNum: 5 },
        text: 'God called the light Day, and the darkness he called Night.',
      },
    ],
  },
];

const seedMarkerNames: string[] = [
  'xt - Cross Reference - Target References',
  'toc2 - File - Short Table of Contents Text',
  'fig - Auxiliary - Figure/Illustration/Map',
  'f - Footnote',
];

/** Which presentational inventory the harness should render. */
type InventoryKind = 'character' | 'repeatedWords' | 'marker';

type HarnessConfig = {
  kind: InventoryKind;
  /** Seed items the in-memory service serves. */
  items: SeedItem[];
  /** Items approved up front. */
  initialApproved?: string[];
  /** Items unapproved up front. */
  initialUnapproved?: string[];
  /** Force the loading state by reporting items as still loading and serving none. */
  loading?: boolean;
};

/**
 * Thin in-memory service container shared by every inventory story: it owns the approved /
 * unapproved lists and the per-item occurrence cache, derives each item's status from those lists
 * (exactly as the webview does), loads occurrences on demand, and renders the requested
 * presentational inventory.
 */
function InventoryHarness({ config }: { config: HarnessConfig }) {
  // The app navigates the scroll group on setVerseRef; in the story we just track it locally.
  const [, setScrRef] = useState<SerializedVerseRef>(DEFAULT_SCR_REF);
  const [scope, setScope] = useState<Scope>('chapter');
  const [approvedItems, setApprovedItems] = useState<string[]>(config.initialApproved ?? []);
  const [unapprovedItems, setUnapprovedItems] = useState<string[]>(config.initialUnapproved ?? []);
  // Occurrences loaded on demand, keyed by item key (mirrors the webview's occurrence cache).
  const [occurrencesByKey, setOccurrencesByKey] = useState<{
    [key: string]: SeedItem['occurrences'];
  }>({});

  // Derive each item's status + currently-loaded occurrences from the in-memory state, just like
  // the webview's `enhancedInventoryItems`, so approve/unapprove and item-selection reflect.
  const inventoryItems = useMemo<InventorySummaryItem[]>(() => {
    if (config.loading) return [];
    return config.items.map((item) => {
      const itemKey = String(item.key);
      let status: 'approved' | 'unapproved' | 'unknown' = 'unknown';
      if (approvedItems.includes(itemKey)) status = 'approved';
      else if (unapprovedItems.includes(itemKey)) status = 'unapproved';
      return {
        key: item.key,
        count: item.count,
        status,
        occurrences: occurrencesByKey[itemKey] ?? [],
      };
    });
  }, [config.items, config.loading, approvedItems, unapprovedItems, occurrencesByKey]);

  // Approve/unapprove move the key between the two lists so the row's status updates immediately.
  const onApprovedItemsChange = useCallback((items: string[]) => {
    // Settings write in the app; here we reflect it in-memory so the list re-renders.
    // eslint-disable-next-line no-console
    console.log('setValidItems', items);
    setApprovedItems(items);
  }, []);

  const onUnapprovedItemsChange = useCallback((items: string[]) => {
    // Settings write in the app; here we reflect it in-memory so the list re-renders.
    // eslint-disable-next-line no-console
    console.log('setInvalidItems', items);
    setUnapprovedItems(items);
  }, []);

  // Selecting an item loads its occurrences from the seed (the app reads them from the provider).
  const onItemSelected = useCallback(
    (itemKey: string) => {
      setOccurrencesByKey((prev) => {
        if (prev[itemKey]) return prev;
        const seed = config.items.find((item) => String(item.key) === itemKey);
        return { ...prev, [itemKey]: seed?.occurrences ?? [] };
      });
    },
    [config.items],
  );

  const sharedProps = {
    inventoryItems,
    setVerseRef: setScrRef,
    localizedStrings: sharedStrings,
    approvedItems,
    onApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange,
    scope,
    onScopeChange: setScope,
    areInventoryItemsLoading: config.loading ?? false,
    onItemSelected,
  };

  switch (config.kind) {
    case 'repeatedWords':
      return (
        <RepeatedWordsInventory
          {...sharedProps}
          repeatedWordsInventoryStrings={repeatedWordsStrings}
        />
      );
    case 'marker':
      return (
        <MarkerInventory
          {...sharedProps}
          markerInventoryStrings={markerStrings}
          markerNames={seedMarkerNames}
        />
      );
    case 'character':
    default:
      return <CharacterInventory {...sharedProps} characterInventoryStrings={characterStrings} />;
  }
}

const meta: Meta<typeof InventoryHarness> = {
  title: 'Bundled Extensions/platform-scripture/Inventory',
  component: InventoryHarness,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InventoryHarness>;

function createDecorator(config: HarnessConfig) {
  return function InventoryDecorator() {
    return <InventoryHarness config={config} />;
  };
}

/**
 * The character inventory, populated. Approve / unapprove items to move them between the lists, use
 * the status filter, and select a row to load its occurrences.
 */
export const Character: Story = {
  decorators: [
    createDecorator({
      kind: 'character',
      items: characterSeed,
      initialApproved: ['a'],
      initialUnapproved: ['”'],
    }),
  ],
};

/** The repeated-words inventory, populated. */
export const RepeatedWords: Story = {
  decorators: [
    createDecorator({
      kind: 'repeatedWords',
      items: repeatedWordsSeed,
      initialApproved: ['and and'],
      initialUnapproved: ['the the'],
    }),
  ],
};

/**
 * The marker inventory, populated. Marker names (the style-name column + the "show preceding
 * marker" option) come from the seed the webview would load from the project.
 */
export const Markers: Story = {
  decorators: [
    createDecorator({
      kind: 'marker',
      items: markerSeed,
      initialApproved: ['xt'],
      initialUnapproved: ['f'],
    }),
  ],
};

/** Items are still loading — the inventory's loading state renders. */
export const Loading: Story = {
  decorators: [createDecorator({ kind: 'character', items: characterSeed, loading: true })],
};

/** No items to review — the empty inventory renders. */
export const Empty: Story = {
  decorators: [createDecorator({ kind: 'character', items: [] })],
};
