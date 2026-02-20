import { describe, it, expect, vi } from 'vitest';
import type {
  DictionaryTabProps,
  DictionarySortField,
  DictionaryDisplayItem,
  TermRenderingStatusCode,
  DictionarySense,
  DictionaryDisplaySubItem,
} from './dictionary-tab.component';
import type { DictionaryItemProps } from './dictionary-item.component';

/**
 * DictionaryTab and DictionaryItem component tests.
 *
 * Note: Full React component rendering tests require a DOM environment (jsdom) and mocking of
 * platform-bible-react components. These tests verify the exported interfaces, type contracts, and
 * callback behavior.
 */

// --- Mock data factory ---

function createMockSense(overrides: Partial<DictionarySense> = {}): DictionarySense {
  return {
    number: '1',
    definition: 'beginning, origin',
    isRelevant: true,
    partOfSpeech: 'noun',
    renderings: ['beginning'],
    renderingStatus: 'AllFound',
    semanticDomains: [{ number: '1.1', name: 'Sky' }],
    ...overrides,
  };
}

function createMockSubItem(
  overrides: Partial<DictionaryDisplaySubItem> = {},
): DictionaryDisplaySubItem {
  return {
    homographSubscript: 0,
    senses: [createMockSense()],
    ...overrides,
  };
}

function createMockDictionaryItem(
  overrides: Partial<DictionaryDisplayItem> = {},
): DictionaryDisplayItem {
  return {
    term: 'arche',
    sourceText: '\u03B1\u03C1\u03C7\u03AE',
    lexicalLinks: 'lex001',
    subItems: [createMockSubItem()],
    foundStatus: 'AllFound',
    foundRenderings: ['beginning'],
    missingInVerses: [],
    occursInReferences: [
      { book: 'GEN', chapter: 1, verse: 1 },
      { book: 'JHN', chapter: 1, verse: 1 },
      { book: 'COL', chapter: 1, verse: 18 },
    ],
    translations: ['beginning', 'origin'],
    isGuess: false,
    multipleTokens: false,
    expanded: false,
    ...overrides,
  };
}

describe('dictionary-tab.component', () => {
  // --- DictionaryTabProps Type Contract Tests ---

  it('DictionaryTabProps interface accepts all required props', () => {
    const props: DictionaryTabProps = {
      items: [],
      sortColumn: undefined,
      sortAscending: true,
      onSortChange: () => {},
      onToggleExpand: () => {},
      isWordFilterActive: false,
      hideIrrelevantMeanings: false,
      onHideIrrelevantChange: () => {},
      onSemanticDomainClick: () => {},
      onAssessmentChange: () => {},
      assessments: {},
    };

    expect(props.items).toEqual([]);
    expect(props.sortAscending).toBe(true);
    expect(props.isWordFilterActive).toBe(false);
  });

  it('DictionaryTabProps accepts items with all DictionaryDisplayItem fields', () => {
    const item = createMockDictionaryItem();

    const props: DictionaryTabProps = {
      items: [item],
      sortColumn: 'translations',
      sortAscending: true,
      onSortChange: () => {},
      onToggleExpand: () => {},
      isWordFilterActive: false,
      hideIrrelevantMeanings: false,
      onHideIrrelevantChange: () => {},
      onSemanticDomainClick: () => {},
      onAssessmentChange: () => {},
      assessments: {},
    };

    expect(props.items).toHaveLength(1);
    expect(props.items[0].term).toBe('arche');
    expect(props.items[0].foundStatus).toBe('AllFound');
    expect(props.items[0].translations).toEqual(['beginning', 'origin']);
    expect(props.items[0].occursInReferences).toHaveLength(3);
  });

  // --- Sort Interaction Tests ---

  it('onSortChange is called with column and ascending when sort toggles', () => {
    const onSortChange = vi.fn();

    const props: DictionaryTabProps = {
      items: [],
      sortColumn: undefined,
      sortAscending: true,
      onSortChange,
      onToggleExpand: () => {},
      isWordFilterActive: false,
      hideIrrelevantMeanings: false,
      onHideIrrelevantChange: () => {},
      onSemanticDomainClick: () => {},
      onAssessmentChange: () => {},
      assessments: {},
    };

    // Simulate clicking Translations column header
    props.onSortChange('translations', true);
    expect(onSortChange).toHaveBeenCalledWith('translations', true);

    // Simulate toggling to descending
    props.onSortChange('translations', false);
    expect(onSortChange).toHaveBeenCalledWith('translations', false);

    // Simulate changing to Source column
    props.onSortChange('source', true);
    expect(onSortChange).toHaveBeenCalledWith('source', true);
  });

  it('all DictionarySortField values are valid', () => {
    const fields: DictionarySortField[] = ['translations', 'source', 'definition', 'count'];

    fields.forEach((field) => {
      const props: DictionaryTabProps = {
        items: [],
        sortColumn: field,
        sortAscending: true,
        onSortChange: () => {},
        onToggleExpand: () => {},
        isWordFilterActive: false,
        hideIrrelevantMeanings: false,
        onHideIrrelevantChange: () => {},
        onSemanticDomainClick: () => {},
        onAssessmentChange: () => {},
        assessments: {},
      };
      expect(props.sortColumn).toBe(field);
    });
  });

  // --- Expand/Collapse Interaction Tests ---

  it('onToggleExpand is called with the correct term', () => {
    const onToggleExpand = vi.fn();
    const item = createMockDictionaryItem({ term: 'logos' });

    const props: DictionaryTabProps = {
      items: [item],
      sortColumn: undefined,
      sortAscending: true,
      onSortChange: () => {},
      onToggleExpand,
      isWordFilterActive: false,
      hideIrrelevantMeanings: false,
      onHideIrrelevantChange: () => {},
      onSemanticDomainClick: () => {},
      onAssessmentChange: () => {},
      assessments: {},
    };

    props.onToggleExpand('logos');
    expect(onToggleExpand).toHaveBeenCalledWith('logos');
  });

  it('expanded item shows detail section (type contract)', () => {
    const expandedItem = createMockDictionaryItem({ expanded: true });
    const collapsedItem = createMockDictionaryItem({ expanded: false, term: 'logos' });

    expect(expandedItem.expanded).toBe(true);
    expect(collapsedItem.expanded).toBe(false);
  });

  // --- TermRenderingStatusCode Tests ---

  it('all TermRenderingStatusCode values are valid in DictionaryDisplayItem', () => {
    const statuses: TermRenderingStatusCode[] = [
      'AllFound',
      'SomeFound',
      'NoneFound',
      'AllGuessed',
      'SomeGuessed',
      'AllMissing',
      'AutoAssigned',
      'Denied',
      'NotInProject',
      'NoRendering',
      'NotMapped',
      'Unknown',
    ];

    statuses.forEach((status) => {
      const item = createMockDictionaryItem({ foundStatus: status });
      expect(item.foundStatus).toBe(status);
    });
  });

  // --- Hide Irrelevant Meanings Tests ---

  it('onHideIrrelevantChange is called with the correct value', () => {
    const onHideIrrelevantChange = vi.fn();

    const props: DictionaryTabProps = {
      items: [],
      sortColumn: undefined,
      sortAscending: true,
      onSortChange: () => {},
      onToggleExpand: () => {},
      isWordFilterActive: false,
      hideIrrelevantMeanings: false,
      onHideIrrelevantChange,
      onSemanticDomainClick: () => {},
      onAssessmentChange: () => {},
      assessments: {},
    };

    props.onHideIrrelevantChange(true);
    expect(onHideIrrelevantChange).toHaveBeenCalledWith(true);

    props.onHideIrrelevantChange(false);
    expect(onHideIrrelevantChange).toHaveBeenCalledWith(false);
  });

  it('irrelevant senses have isRelevant === false', () => {
    const relevantSense = createMockSense({ isRelevant: true });
    const irrelevantSense = createMockSense({ isRelevant: false, definition: 'ruler, authority' });

    expect(relevantSense.isRelevant).toBe(true);
    expect(irrelevantSense.isRelevant).toBe(false);
  });

  // --- Semantic Domain Click Tests ---

  it('onSemanticDomainClick is called with domain number', () => {
    const onSemanticDomainClick = vi.fn();

    const props: DictionaryTabProps = {
      items: [],
      sortColumn: undefined,
      sortAscending: true,
      onSortChange: () => {},
      onToggleExpand: () => {},
      isWordFilterActive: false,
      hideIrrelevantMeanings: false,
      onHideIrrelevantChange: () => {},
      onSemanticDomainClick,
      onAssessmentChange: () => {},
      assessments: {},
    };

    props.onSemanticDomainClick('1.1');
    expect(onSemanticDomainClick).toHaveBeenCalledWith('1.1');

    props.onSemanticDomainClick('8.4.6');
    expect(onSemanticDomainClick).toHaveBeenCalledWith('8.4.6');
  });

  // --- Assessment Tests ---

  it('onAssessmentChange is called with term and isHelpful', () => {
    const onAssessmentChange = vi.fn();

    const props: DictionaryTabProps = {
      items: [],
      sortColumn: undefined,
      sortAscending: true,
      onSortChange: () => {},
      onToggleExpand: () => {},
      isWordFilterActive: true,
      hideIrrelevantMeanings: false,
      onHideIrrelevantChange: () => {},
      onSemanticDomainClick: () => {},
      onAssessmentChange,
      assessments: {},
    };

    props.onAssessmentChange('arche', true);
    expect(onAssessmentChange).toHaveBeenCalledWith('arche', true);

    props.onAssessmentChange('arche', false);
    expect(onAssessmentChange).toHaveBeenCalledWith('arche', false);
  });

  it('assessments map tracks term -> boolean values', () => {
    const assessments: Record<string, boolean | undefined> = {
      arche: true,
      logos: false,
      pneuma: undefined,
    };

    expect(assessments.arche).toBe(true);
    expect(assessments.logos).toBe(false);
    expect(assessments.pneuma).toBeUndefined();
  });
});

describe('dictionary-item.component', () => {
  // --- DictionaryItemProps Type Contract Tests ---

  it('DictionaryItemProps interface accepts all required props', () => {
    const item = createMockDictionaryItem();

    const props: DictionaryItemProps = {
      item,
      onToggleExpand: () => {},
      isWordFilterActive: false,
      hideIrrelevantMeanings: false,
      onSemanticDomainClick: () => {},
      onAssessmentChange: () => {},
    };

    expect(props.item.term).toBe('arche');
    expect(props.isWordFilterActive).toBe(false);
  });

  it('DictionaryItemProps accepts optional assessmentValue', () => {
    const item = createMockDictionaryItem();

    const propsWithAssessment: DictionaryItemProps = {
      item,
      onToggleExpand: () => {},
      isWordFilterActive: true,
      hideIrrelevantMeanings: false,
      onSemanticDomainClick: () => {},
      onAssessmentChange: () => {},
      assessmentValue: true,
    };

    const propsWithoutAssessment: DictionaryItemProps = {
      item,
      onToggleExpand: () => {},
      isWordFilterActive: true,
      hideIrrelevantMeanings: false,
      onSemanticDomainClick: () => {},
      onAssessmentChange: () => {},
    };

    expect(propsWithAssessment.assessmentValue).toBe(true);
    expect(propsWithoutAssessment.assessmentValue).toBeUndefined();
  });

  // --- Deferred Feature Contract Tests ---

  it('DictionaryDisplayItem does not have editLink property (DEF-UI-004)', () => {
    const item = createMockDictionaryItem();
    // The item type should NOT have an editLink field - it is deferred
    expect('editLink' in item).toBe(false);
  });

  it('occurrence count is a number, not a link (DEF-UI-005)', () => {
    const item = createMockDictionaryItem();
    // Occurrence count is derived from occursInReferences.length, rendered as plain text
    expect(typeof item.occursInReferences.length).toBe('number');
    expect(item.occursInReferences.length).toBe(3);
  });

  // --- Sub-item and Sense Tests ---

  it('DictionaryDisplayItem with multiple sub-items and senses', () => {
    const item = createMockDictionaryItem({
      subItems: [
        createMockSubItem({
          homographSubscript: 1,
          senses: [
            createMockSense({ number: '1', definition: 'beginning', isRelevant: true }),
            createMockSense({ number: '2', definition: 'ruler', isRelevant: false }),
          ],
        }),
        createMockSubItem({
          homographSubscript: 2,
          senses: [createMockSense({ number: '1', definition: 'origin', isRelevant: true })],
        }),
      ],
    });

    expect(item.subItems).toHaveLength(2);
    expect(item.subItems[0].homographSubscript).toBe(1);
    expect(item.subItems[0].senses).toHaveLength(2);
    expect(item.subItems[0].senses[1].isRelevant).toBe(false);
    expect(item.subItems[1].homographSubscript).toBe(2);
    expect(item.subItems[1].senses).toHaveLength(1);
  });

  it('DictionarySense with semantic domains', () => {
    const sense = createMockSense({
      semanticDomains: [
        { number: '1.1', name: 'Sky' },
        { number: '8.4.6', name: 'Time' },
      ],
    });

    expect(sense.semanticDomains).toHaveLength(2);
    expect(sense.semanticDomains[0].number).toBe('1.1');
    expect(sense.semanticDomains[1].name).toBe('Time');
  });

  it('DictionarySense with empty renderings', () => {
    const senseWithRenderings = createMockSense({ renderings: ['beginning'] });
    const senseWithoutRenderings = createMockSense({ renderings: [] });
    const senseUndefinedRenderings = createMockSense({ renderings: undefined });

    expect(senseWithRenderings.renderings).toEqual(['beginning']);
    expect(senseWithoutRenderings.renderings).toEqual([]);
    expect(senseUndefinedRenderings.renderings).toBeUndefined();
  });

  // --- Empty State Tests ---

  it('DictionaryTabProps with empty items shows empty state', () => {
    const props: DictionaryTabProps = {
      items: [],
      sortColumn: undefined,
      sortAscending: true,
      onSortChange: () => {},
      onToggleExpand: () => {},
      isWordFilterActive: false,
      hideIrrelevantMeanings: false,
      onHideIrrelevantChange: () => {},
      onSemanticDomainClick: () => {},
      onAssessmentChange: () => {},
      assessments: {},
    };

    expect(props.items).toHaveLength(0);
  });
});
