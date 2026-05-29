import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { InventorySummaryItem, Scope } from 'platform-bible-react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MixedCapitalizationInventory,
  MixedCapitalizationInventoryProps,
} from './mixed-capitalization-inventory.component';

// Localized strings the shared <Inventory> needs (filter dropdown, scope labels, occurrences table,
// etc.). Resolved from the repo's English locale files so the Storybook review reads naturally; the
// wrapper's own header labels are resolved by the aliased `useLocalizedStrings` stub.
const localizedStrings = getLocalizedStrings([
  '%webView_inventory_all%',
  '%webView_inventory_approved%',
  '%webView_inventory_unapproved%',
  '%webView_inventory_unknown%',
  '%webView_inventory_scope_currentBook%',
  '%webView_inventory_scope_chapter%',
  '%webView_inventory_scope_verse%',
  '%webView_inventory_filter_text%',
  '%webView_inventory_show_additional_items%',
  '%webView_inventory_occurrences_table_header_reference%',
  '%webView_inventory_occurrences_table_header_occurrence%',
  '%webView_inventory_no_results%',
]);

/**
 * Representative Mixed Capitalization words. The standard column set (item / count / status)
 * matches `gm-016-column-set-mixed-cap` (standard-non-sba) and the wireframe sample rows (tHe,
 * iPhone, WOrds, …) in `ui-spec-inventory-form.md`. Status is conveyed via the approved/unapproved
 * lists below, which the shared <Inventory> reads — mirroring how Settings.xml drives row status.
 */
const SAMPLE_MIXED_CAP_ITEMS: InventorySummaryItem[] = [
  {
    key: 'tHe',
    count: 12,
    occurrences: [
      {
        reference: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        text: 'In tHe beginning God created',
      },
      { reference: { book: 'GEN', chapterNum: 5, verseNum: 3 }, text: 'And God said unTo tHe man' },
    ],
  },
  {
    key: 'iPhone',
    count: 3,
    occurrences: [
      { reference: { book: 'MAT', chapterNum: 4, verseNum: 4 }, text: 'wrote it on his iPhone' },
    ],
  },
  {
    key: 'WOrds',
    count: 1,
    occurrences: [
      { reference: { book: 'PSA', chapterNum: 25, verseNum: 8 }, text: 'these WOrds are good' },
    ],
  },
  {
    key: '1CoR',
    count: 5,
    occurrences: [
      { reference: { book: 'JHN', chapterNum: 1, verseNum: 1 }, text: 'see 1CoR 13 for love' },
    ],
  },
];

/**
 * Stateful decorator: owns the approved/unapproved/scope sample state and wires every `on*`
 * callback to a `useState`-mutating handler so a reviewer can click through the full happy-path
 * flow (approve/unapprove rows, change scope, select an item) and observe real state transitions.
 * Sample data lives here, never in the production component (COMP-004).
 */
function InteractiveMixedCapitalizationInventory({
  approvedItems: initialApprovedItems,
  unapprovedItems: initialUnapprovedItems,
  scope: initialScope,
  ...rest
}: MixedCapitalizationInventoryProps) {
  const [approvedItems, setApprovedItems] = useState<string[]>(initialApprovedItems);
  const [unapprovedItems, setUnapprovedItems] = useState<string[]>(initialUnapprovedItems);
  const [scope, setScope] = useState<Scope>(initialScope);
  const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);
  const [lastRef, setLastRef] = useState<SerializedVerseRef | undefined>(undefined);

  return (
    <div style={{ height: '90vh' }}>
      <MixedCapitalizationInventory
        {...rest}
        approvedItems={approvedItems}
        onApprovedItemsChange={setApprovedItems}
        unapprovedItems={unapprovedItems}
        onUnapprovedItemsChange={setUnapprovedItems}
        scope={scope}
        onScopeChange={setScope}
        onItemSelected={setSelectedItem}
        setVerseRef={setLastRef}
      />
      <div className="tw:p-2 tw:text-xs tw:text-muted-foreground" aria-live="polite">
        selected: {selectedItem ?? '(none)'} · scope: {scope} · lastRef:{' '}
        {lastRef ? `${lastRef.book} ${lastRef.chapterNum}:${lastRef.verseNum}` : '(none)'}
      </div>
    </div>
  );
}

const meta: Meta<typeof MixedCapitalizationInventory> = {
  title: 'Bundled Extensions/platform-scripture/MixedCapitalizationInventory',
  component: MixedCapitalizationInventory,
  tags: ['autodocs'],
  args: {
    inventoryItems: SAMPLE_MIXED_CAP_ITEMS,
    localizedStrings,
    approvedItems: [],
    unapprovedItems: [],
    scope: 'book',
    areInventoryItemsLoading: false,
    // Defaults; the Default story's decorator replaces these with state-mutating handlers.
    setVerseRef: () => {},
    onApprovedItemsChange: () => {},
    onUnapprovedItemsChange: () => {},
    onScopeChange: () => {},
    onItemSelected: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof MixedCapitalizationInventory>;

/**
 * Default — populated inventory with the standard Mixed Cap column set (item / count / status per
 * gm-016 standard-non-sba). Fully interactive: every `on*` prop is wired to a `useState` handler in
 * the decorator. `iPhone` starts approved and `WOrds` starts unapproved so the status column shows
 * all three states (approved / unapproved / unknown) on first render. The shared <Inventory> sorts
 * by status by default (BHV-303 / gm-015 non-SBA → CombinedStatus).
 */
export const Default: Story = {
  args: {
    approvedItems: ['iPhone'],
    unapprovedItems: ['WOrds'],
    scope: 'book',
  },
  render: (args) => <InteractiveMixedCapitalizationInventory {...args} />,
};

/**
 * Loading — initial inventory build / refresh. `areInventoryItemsLoading` is true; the shared
 * <Inventory> renders its loading affordance. (Stub callbacks are acceptable for non-Default
 * stories.)
 */
export const Loading: Story = {
  args: {
    inventoryItems: undefined,
    areInventoryItemsLoading: true,
  },
};

/**
 * Empty — `inventoryItems` is an empty array (genuine-empty: no mixed-cap words in the project, or
 * the inventory hasn't been built yet). The shared <Inventory> renders its no-results state.
 */
export const Empty: Story = {
  args: {
    inventoryItems: [],
    areInventoryItemsLoading: false,
  },
};

/**
 * StateRestore — demonstrates restored per-instance UI state from `gm-007-memento-capture-restore`:
 * the compound (status) filter restores to "Approved" and the verse scope is restored, while the
 * inventory reopens populated. Here that surfaces as the approved row (`iPhone`) being the focus of
 * the restored session. (locationFilter is intentionally NOT restored per gm-007 / RF-B-003 — that
 * reset is owned by the wiring layer, not this presentational wrapper.)
 */
export const StateRestore: Story = {
  args: {
    approvedItems: ['iPhone', '1CoR'],
    unapprovedItems: ['WOrds'],
    scope: 'chapter',
  },
  render: (args) => <InteractiveMixedCapitalizationInventory {...args} />,
};
