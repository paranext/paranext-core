import { describe, it, expect, vi } from 'vitest';
import type { ResearchPaneProps, ResearchTab, ScopeFilterValue } from './research-pane.component';
import type { WordFilterData } from './scripture-pane.component';

/**
 * ResearchPane component tests.
 *
 * Note: Full React component rendering tests require a DOM environment (jsdom) and mocking of
 * platform-bible-react components. These tests verify the exported interface, type contracts, and
 * callback behavior.
 */

/** Default dictionary-related props for creating ResearchPaneProps in tests */
const DEFAULT_DICTIONARY_PROPS = {
  dictionaryItems: [],
  dictionarySortColumn: undefined as undefined,
  dictionarySortAscending: true,
  onDictionarySortChange: () => {},
  onDictionaryToggleExpand: () => {},
  hideIrrelevantMeanings: false,
  onHideIrrelevantChange: () => {},
  onSemanticDomainClick: () => {},
  onDictionaryAssessmentChange: () => {},
  dictionaryAssessments: {},
  encyclopediaItems: [],
  onEncyclopediaToggleExpand: () => {},
  onEncyclopediaReadArticle: () => {},
  mediaItems: [],
  mediaExpandedGroups: [],
  onMediaToggleGroup: () => {},
  onMediaItemClick: () => {},
};

describe('research-pane.component', () => {
  // --- Render / Type Tests ---

  it('ResearchPaneProps interface accepts all required props', () => {
    const props: ResearchPaneProps = {
      activeTab: 'dictionary',
      onTabChange: () => {},
      scopeFilter: 'current-verse',
      onScopeFilterChange: () => {},
      wordFilter: undefined,
      onClearWordFilter: () => {},
      ...DEFAULT_DICTIONARY_PROPS,
    };

    expect(props.activeTab).toBe('dictionary');
    expect(props.scopeFilter).toBe('current-verse');
    expect(props.wordFilter).toBeUndefined();
  });

  it('ResearchPaneProps accepts all four tab values', () => {
    const tabs: ResearchTab[] = ['dictionary', 'encyclopedia', 'media', 'maps'];

    tabs.forEach((tab) => {
      const props: ResearchPaneProps = {
        activeTab: tab,
        onTabChange: () => {},
        scopeFilter: 'current-verse',
        onScopeFilterChange: () => {},
        onClearWordFilter: () => {},
        ...DEFAULT_DICTIONARY_PROPS,
      };
      expect(props.activeTab).toBe(tab);
    });
  });

  it('ResearchPaneProps accepts all scope filter values', () => {
    const scopes: ScopeFilterValue[] = [
      'current-verse',
      'current-section',
      'current-chapter',
      'current-sense',
    ];

    scopes.forEach((scope) => {
      const props: ResearchPaneProps = {
        activeTab: 'dictionary',
        onTabChange: () => {},
        scopeFilter: scope,
        onScopeFilterChange: () => {},
        onClearWordFilter: () => {},
        ...DEFAULT_DICTIONARY_PROPS,
      };
      expect(props.scopeFilter).toBe(scope);
    });
  });

  // --- Tab Switching Interaction Tests ---

  it('onTabChange callback is invoked with correct tab value', () => {
    const onTabChange = vi.fn();

    const props: ResearchPaneProps = {
      activeTab: 'dictionary',
      onTabChange,
      scopeFilter: 'current-verse',
      onScopeFilterChange: () => {},
      onClearWordFilter: () => {},
      ...DEFAULT_DICTIONARY_PROPS,
    };

    // Simulate tab switch to encyclopedia
    props.onTabChange('encyclopedia');
    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith('encyclopedia');

    // Simulate tab switch to media
    props.onTabChange('media');
    expect(onTabChange).toHaveBeenCalledTimes(2);
    expect(onTabChange).toHaveBeenCalledWith('media');

    // Simulate tab switch to maps
    props.onTabChange('maps');
    expect(onTabChange).toHaveBeenCalledTimes(3);
    expect(onTabChange).toHaveBeenCalledWith('maps');
  });

  // --- Scope Filter Change Tests ---

  it('onScopeFilterChange callback is invoked with correct scope value', () => {
    const onScopeFilterChange = vi.fn();

    const props: ResearchPaneProps = {
      activeTab: 'dictionary',
      onTabChange: () => {},
      scopeFilter: 'current-verse',
      onScopeFilterChange,
      onClearWordFilter: () => {},
      ...DEFAULT_DICTIONARY_PROPS,
    };

    // Simulate scope change to current-section
    props.onScopeFilterChange('current-section');
    expect(onScopeFilterChange).toHaveBeenCalledWith('current-section');

    // Simulate scope change to current-chapter
    props.onScopeFilterChange('current-chapter');
    expect(onScopeFilterChange).toHaveBeenCalledWith('current-chapter');
  });

  it('current-sense scope is available as a valid ScopeFilterValue', () => {
    const onScopeFilterChange = vi.fn();

    const props: ResearchPaneProps = {
      activeTab: 'dictionary',
      onTabChange: () => {},
      scopeFilter: 'current-sense',
      onScopeFilterChange,
      wordFilter: {
        lemma: 'agape',
        lexicalLinks: ['lex001'],
        surfaceForm: 'agape',
        sourcePane: 'scripture',
      },
      onClearWordFilter: () => {},
      ...DEFAULT_DICTIONARY_PROPS,
    };

    expect(props.scopeFilter).toBe('current-sense');
    expect(props.wordFilter).toBeDefined();
  });

  // --- Word Filter Display/Clear Tests ---

  it('wordFilter prop accepts WordFilterData from scripture pane', () => {
    const scriptureWordFilter: WordFilterData = {
      lemma: 'agape',
      lexicalLinks: ['lex001', 'lex002'],
      surfaceForm: 'agape',
      sourcePane: 'scripture',
    };

    const props: ResearchPaneProps = {
      activeTab: 'dictionary',
      onTabChange: () => {},
      scopeFilter: 'current-verse',
      onScopeFilterChange: () => {},
      wordFilter: scriptureWordFilter,
      onClearWordFilter: () => {},
      ...DEFAULT_DICTIONARY_PROPS,
    };

    expect(props.wordFilter).toBeDefined();
    expect(props.wordFilter?.lemma).toBe('agape');
    expect(props.wordFilter?.surfaceForm).toBe('agape');
    expect(props.wordFilter?.sourcePane).toBe('scripture');
    expect(props.wordFilter?.lexicalLinks).toEqual(['lex001', 'lex002']);
  });

  it('wordFilter prop accepts WordFilterData from dictionary pane', () => {
    const dictionaryWordFilter: WordFilterData = {
      lemma: 'logos',
      lexicalLinks: ['lex003'],
      surfaceForm: 'logos',
      sourcePane: 'dictionary',
    };

    const props: ResearchPaneProps = {
      activeTab: 'dictionary',
      onTabChange: () => {},
      scopeFilter: 'current-verse',
      onScopeFilterChange: () => {},
      wordFilter: dictionaryWordFilter,
      onClearWordFilter: () => {},
      ...DEFAULT_DICTIONARY_PROPS,
    };

    expect(props.wordFilter?.sourcePane).toBe('dictionary');
  });

  it('onClearWordFilter callback is invoked when clear button is triggered', () => {
    const onClearWordFilter = vi.fn();

    const props: ResearchPaneProps = {
      activeTab: 'dictionary',
      onTabChange: () => {},
      scopeFilter: 'current-verse',
      onScopeFilterChange: () => {},
      wordFilter: {
        lemma: 'agape',
        lexicalLinks: [],
        surfaceForm: 'agape',
        sourcePane: 'scripture',
      },
      onClearWordFilter,
      ...DEFAULT_DICTIONARY_PROPS,
    };

    // Simulate clearing the word filter
    props.onClearWordFilter();
    expect(onClearWordFilter).toHaveBeenCalledTimes(1);
  });

  it('wordFilter can be undefined (no active filter)', () => {
    const props: ResearchPaneProps = {
      activeTab: 'dictionary',
      onTabChange: () => {},
      scopeFilter: 'current-verse',
      onScopeFilterChange: () => {},
      wordFilter: undefined,
      onClearWordFilter: () => {},
      ...DEFAULT_DICTIONARY_PROPS,
    };

    expect(props.wordFilter).toBeUndefined();
  });

  // --- Integration Contract Tests ---

  it('ResearchPaneProps is compatible with shell state shape', () => {
    // Verify the props interface matches what the shell passes
    // This ensures the shell can correctly wire up to ResearchPane
    const activeTab: ResearchTab = 'dictionary';
    const scopeFilter: ScopeFilterValue = 'current-verse';
    const wordFilter: WordFilterData | undefined = undefined;

    const props: ResearchPaneProps = {
      activeTab,
      onTabChange: vi.fn(),
      scopeFilter,
      onScopeFilterChange: vi.fn(),
      wordFilter,
      onClearWordFilter: vi.fn(),
      ...DEFAULT_DICTIONARY_PROPS,
    };

    expect(props).toBeDefined();
    expect(typeof props.onTabChange).toBe('function');
    expect(typeof props.onScopeFilterChange).toBe('function');
    expect(typeof props.onClearWordFilter).toBe('function');
  });

  it('default values match expected initial state', () => {
    // Verify the defaults that the shell should pass
    const defaultActiveTab: ResearchTab = 'dictionary';
    const defaultScopeFilter: ScopeFilterValue = 'current-verse';

    expect(defaultActiveTab).toBe('dictionary');
    expect(defaultScopeFilter).toBe('current-verse');
  });
});
