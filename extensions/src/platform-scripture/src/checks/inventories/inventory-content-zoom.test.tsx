// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CONTENT_ZOOM_ROOT_ATTRIBUTE, InventorySummaryItem } from 'platform-bible-react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { CharacterInventory } from './character-inventory.component';
import { MarkerInventory } from './marker-inventory.component';
import { PunctuationInventory } from './punctuation-inventory.component';
import { RepeatedWordsInventory } from './repeated-words-inventory.component';

// jsdom has no ResizeObserver or matchMedia; the shared Select and Tooltip reach both.
beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: false,
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
});

const MARKER = `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`;

/** One item, so the inventory auto-selects it and renders its occurrence table too. */
function oneItem(key: string): InventorySummaryItem[] {
  return [
    {
      key,
      count: 1,
      status: 'unknown',
      occurrences: [
        { reference: { book: 'GEN', chapterNum: 1, verseNum: 1 }, text: 'In the beginning' },
      ],
    },
  ];
}

const shared = {
  setVerseRef: vi.fn(),
  localizedStrings: {},
  approvedItems: [],
  onApprovedItemsChange: vi.fn(),
  unapprovedItems: [],
  onUnapprovedItemsChange: vi.fn(),
  scope: 'chapter' as const,
  onScopeChange: vi.fn(),
  areInventoryItemsLoading: false,
};

const CASES = [
  [
    'character',
    'a',
    () => (
      <CharacterInventory
        {...shared}
        inventoryItems={oneItem('a')}
        characterInventoryStrings={{}}
      />
    ),
  ],
  [
    'repeated words',
    'the the',
    () => (
      <RepeatedWordsInventory
        {...shared}
        inventoryItems={oneItem('the the')}
        repeatedWordsInventoryStrings={{}}
      />
    ),
  ],
  [
    'markers',
    'xt',
    () => (
      <MarkerInventory
        {...shared}
        inventoryItems={oneItem('xt')}
        markerInventoryStrings={{}}
        markerNames={['xt - Cross Reference']}
      />
    ),
  ],
  [
    'punctuation',
    '”',
    () => (
      <PunctuationInventory
        {...shared}
        inventoryItems={oneItem('”')}
        punctuationInventoryStrings={{}}
      />
    ),
  ],
] as const;

describe('inventory content zoom', () => {
  it.each(CASES)(
    '%s inventory marks the item and the occurrence text, nothing else',
    (_name, itemKey, renderInventory) => {
      const { container } = render(renderInventory());
      const [itemTable, occurrenceTable] = container.querySelectorAll('table');

      const itemRowCells = [...itemTable.querySelectorAll('tbody tr:first-child td')];
      // The item value itself (for the markers inventory, the marker token) is project text.
      const itemCell = itemRowCells.find((cell) => cell.textContent === itemKey);
      expect(itemCell?.querySelector(MARKER)).toHaveTextContent(itemKey);
      // Count, Unicode value, style name and status cells stay at interface size.
      itemRowCells
        .filter((cell) => cell !== itemCell)
        .forEach((cell) => expect(cell.querySelector(MARKER)).toBeNull());
      expect(itemTable.querySelector(`thead ${MARKER}`)).toBeNull();

      const [referenceCell, textCell] = occurrenceTable.querySelectorAll('tbody td');
      expect(textCell).toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE, '');
      expect(referenceCell).not.toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE);

      // Every marker is the main area, and none sits inside another.
      container.querySelectorAll(MARKER).forEach((marker) => {
        expect(marker.getAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE)).toBe('');
        expect(marker.parentElement?.closest(MARKER)).toBeNull();
      });
    },
  );
});
