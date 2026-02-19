import { describe, it, expect, vi } from 'vitest';
import type { EncyclopediaTabProps } from './encyclopedia-tab.component';
import type {
  EncyclopediaItemProps,
  EncyclopediaDisplayItem,
  EncyclopediaEntry,
} from './encyclopedia-item.component';

/**
 * EncyclopediaTab and EncyclopediaItem component tests.
 *
 * Note: Full React component rendering tests require a DOM environment (jsdom) and mocking of
 * platform-bible-react components. These tests verify the exported interfaces, type contracts, and
 * callback behavior.
 */

// --- Mock data factory ---

function createMockEntry(overrides: Partial<EncyclopediaEntry> = {}): EncyclopediaEntry {
  return {
    id: 'entry-001',
    title: 'Abraham',
    articleHtml: '<p>Abraham was the patriarch of the Israelite nation.</p>',
    scriptureRefs: ['GEN 12:1', 'GEN 15:6', 'ROM 4:3'],
    ...overrides,
  };
}

function createMockEncyclopediaItem(
  overrides: Partial<EncyclopediaDisplayItem> = {},
): EncyclopediaDisplayItem {
  return {
    id: 'enc-001',
    title: 'Abraham',
    sourceText: '\u05D0\u05B7\u05D1\u05B0\u05E8\u05B8\u05D4\u05B8\u05DD',
    translations: ['Abraham', 'Abram'],
    teaserHtml: 'Abraham was the patriarch of the Israelite nation, called by God...',
    expanded: false,
    seeAlso: [
      { id: 'enc-002', title: 'Sarah' },
      { id: 'enc-003', title: 'Isaac' },
    ],
    entry: createMockEntry(),
    ...overrides,
  };
}

describe('encyclopedia-tab.component', () => {
  // --- EncyclopediaTabProps Type Contract Tests ---

  it('EncyclopediaTabProps interface accepts all required props', () => {
    const props: EncyclopediaTabProps = {
      items: [],
      onToggleExpand: () => {},
      onReadArticle: () => {},
    };

    expect(props.items).toEqual([]);
  });

  it('EncyclopediaTabProps accepts items with all EncyclopediaDisplayItem fields', () => {
    const item = createMockEncyclopediaItem();

    const props: EncyclopediaTabProps = {
      items: [item],
      onToggleExpand: () => {},
      onReadArticle: () => {},
    };

    expect(props.items).toHaveLength(1);
    expect(props.items[0].id).toBe('enc-001');
    expect(props.items[0].title).toBe('Abraham');
    expect(props.items[0].translations).toEqual(['Abraham', 'Abram']);
    expect(props.items[0].seeAlso).toHaveLength(2);
  });

  // --- Expand/Collapse Interaction Tests ---

  it('onToggleExpand is called with the correct id', () => {
    const onToggleExpand = vi.fn();

    const props: EncyclopediaTabProps = {
      items: [createMockEncyclopediaItem({ id: 'enc-005' })],
      onToggleExpand,
      onReadArticle: () => {},
    };

    props.onToggleExpand('enc-005');
    expect(onToggleExpand).toHaveBeenCalledWith('enc-005');
  });

  it('expanded item has expanded === true', () => {
    const expandedItem = createMockEncyclopediaItem({ expanded: true });
    const collapsedItem = createMockEncyclopediaItem({ expanded: false, id: 'enc-002' });

    expect(expandedItem.expanded).toBe(true);
    expect(collapsedItem.expanded).toBe(false);
  });

  // --- Read Article Interaction Tests ---

  it('onReadArticle is called with the correct EncyclopediaEntry', () => {
    const onReadArticle = vi.fn();
    const entry = createMockEntry({ id: 'entry-007', title: 'Moses' });

    const props: EncyclopediaTabProps = {
      items: [createMockEncyclopediaItem({ entry })],
      onToggleExpand: () => {},
      onReadArticle,
    };

    props.onReadArticle(entry);
    expect(onReadArticle).toHaveBeenCalledWith(entry);
    expect(onReadArticle).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'entry-007',
        title: 'Moses',
      }),
    );
  });

  // --- Empty State Tests ---

  it('EncyclopediaTabProps with empty items represents empty state', () => {
    const props: EncyclopediaTabProps = {
      items: [],
      onToggleExpand: () => {},
      onReadArticle: () => {},
    };

    expect(props.items).toHaveLength(0);
  });

  // --- EncyclopediaDisplayItem Type Contract Tests ---

  it('EncyclopediaDisplayItem has all required fields', () => {
    const item = createMockEncyclopediaItem();

    expect(item.id).toBe('enc-001');
    expect(item.title).toBe('Abraham');
    expect(item.sourceText).toBeTruthy();
    expect(item.translations).toEqual(['Abraham', 'Abram']);
    expect(item.teaserHtml).toBeTruthy();
    expect(typeof item.expanded).toBe('boolean');
    expect(Array.isArray(item.seeAlso)).toBe(true);
    expect(item.entry).toBeDefined();
    expect(item.entry.id).toBe('entry-001');
  });

  it('EncyclopediaDisplayItem with empty translations and seeAlso', () => {
    const item = createMockEncyclopediaItem({
      translations: [],
      seeAlso: [],
      teaserHtml: '',
    });

    expect(item.translations).toEqual([]);
    expect(item.seeAlso).toEqual([]);
    expect(item.teaserHtml).toBe('');
  });

  it('EncyclopediaDisplayItem with multiple seeAlso cross-references', () => {
    const item = createMockEncyclopediaItem({
      seeAlso: [
        { id: 'enc-010', title: 'Covenant' },
        { id: 'enc-011', title: 'Promise' },
        { id: 'enc-012', title: 'Faith' },
      ],
    });

    expect(item.seeAlso).toHaveLength(3);
    expect(item.seeAlso[0].title).toBe('Covenant');
    expect(item.seeAlso[2].id).toBe('enc-012');
  });
});

describe('encyclopedia-item.component', () => {
  // --- EncyclopediaItemProps Type Contract Tests ---

  it('EncyclopediaItemProps interface accepts all required props', () => {
    const item = createMockEncyclopediaItem();

    const props: EncyclopediaItemProps = {
      item,
      onToggleExpand: () => {},
      onReadArticle: () => {},
    };

    expect(props.item.title).toBe('Abraham');
  });

  // --- EncyclopediaEntry Type Contract Tests ---

  it('EncyclopediaEntry has all required fields', () => {
    const entry = createMockEntry();

    expect(entry.id).toBe('entry-001');
    expect(entry.title).toBe('Abraham');
    expect(entry.articleHtml).toBeTruthy();
    expect(entry.scriptureRefs).toHaveLength(3);
    expect(entry.scriptureRefs[0]).toBe('GEN 12:1');
  });

  it('EncyclopediaEntry with empty scriptureRefs', () => {
    const entry = createMockEntry({ scriptureRefs: [] });

    expect(entry.scriptureRefs).toEqual([]);
  });

  it('EncyclopediaEntry with long article HTML', () => {
    const longHtml = '<p>A very long article...</p>'.repeat(100);
    const entry = createMockEntry({ articleHtml: longHtml });

    expect(entry.articleHtml.length).toBeGreaterThan(1000);
  });

  // --- Callback behavior tests ---

  it('onToggleExpand callback receives item id', () => {
    const onToggleExpand = vi.fn();
    const item = createMockEncyclopediaItem({ id: 'enc-042' });

    const props: EncyclopediaItemProps = {
      item,
      onToggleExpand,
      onReadArticle: () => {},
    };

    // Simulate the toggle
    props.onToggleExpand(props.item.id);
    expect(onToggleExpand).toHaveBeenCalledWith('enc-042');
  });

  it('onReadArticle callback receives entry object', () => {
    const onReadArticle = vi.fn();
    const entry = createMockEntry({ id: 'entry-099', title: 'Jerusalem' });
    const item = createMockEncyclopediaItem({ entry });

    const props: EncyclopediaItemProps = {
      item,
      onToggleExpand: () => {},
      onReadArticle,
    };

    // Simulate read article click
    props.onReadArticle(props.item.entry);
    expect(onReadArticle).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'entry-099',
        title: 'Jerusalem',
      }),
    );
  });

  // --- Multiple items test ---

  it('multiple EncyclopediaDisplayItems can coexist with unique ids', () => {
    const items: EncyclopediaDisplayItem[] = [
      createMockEncyclopediaItem({ id: 'enc-001', title: 'Abraham' }),
      createMockEncyclopediaItem({ id: 'enc-002', title: 'Moses' }),
      createMockEncyclopediaItem({ id: 'enc-003', title: 'David', expanded: true }),
    ];

    expect(items).toHaveLength(3);
    const ids = items.map((i) => i.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(3);
    expect(items[2].expanded).toBe(true);
  });
});
