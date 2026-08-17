// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Find, FindProps } from './find.component';

// jsdom does not implement ResizeObserver; platform-bible-react's Tooltip/Popover components wire
// ResizeObservers on mount even when never opened. A no-op stub keeps the render path from throwing.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // ResizeObserver constructor as a vi.fn factory satisfies runtime contract but not structural
    // typing; we cast through unknown to adapt it to the required type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }

  // jsdom does not implement matchMedia; the unconditionally-rendered <Sonner /> toaster reads it
  // on mount to pick a theme.
  if (typeof window.matchMedia === 'undefined') {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: undefined,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }
});

const STRINGS = {
  '%general_countOfTotal%': '{count} of {total}',
  '%webView_find_searchPrompt%': 'Enter search text to find results',
  '%webView_find_selectBooksPrompt%': 'Select at least one book to search',
  '%webView_find_noResultsFound%': 'No results found',
  '%webView_find_searchPlaceholder%': 'Enter search text…',
  '%webView_find_showRecentSearches%': 'Show recent searches',
  '%webView_find_recent%': 'Recent',
  '%webView_find_toggleFilters%': 'Toggle filters',
  '%webView_find_matchContentIn%': 'Match content in',
  '%webView_find_allText%': 'Any text',
  '%webView_find_allText_tooltip%': 'Including introductions, titles, headings, etc.',
  '%webView_find_verseTextOnly%': 'Verse text only',
  '%webView_find_restrictions%': 'Match boundaries',
  '%webView_find_restrictions_none%': 'Anywhere',
  '%webView_find_restrictions_wholeWord%': 'Whole word',
  '%webView_find_restrictions_startOfWord%': 'Start of word',
  '%webView_find_restrictions_endOfWord%': 'End of word',
  '%webView_find_capitalization%': 'Capitalization',
  '%webView_find_pattern%': 'Pattern',
  '%webView_find_matchCase%': 'Match case',
  '%webView_find_allowRegex%': 'Allow regex',
  '%webView_find_showing%': 'Showing',
  '%webView_find_findTab%': 'Find',
  '%webView_find_replaceTab%': 'Replace',
  '%webView_find_replace%': 'Replace',
  '%webView_find_replaceAll%': 'Replace all',
  '%webView_find_preserveCase%': 'Preserve case',
  '%webView_find_preserveCase_tooltip%': 'Adapts replacement to match original casing',
  '%webView_find_replaceTerm_placeholder%': 'Replace with…',
  '%webView_find_previousResult%': 'Previous result',
  '%webView_find_nextResult%': 'Next result',
  '%webView_find_clearSearch%': 'Clear search',
  '%webView_find_cancelSearch%': 'Cancel search',
  '%webView_find_errorOccurred%': 'An error occurred: {error}',
  '%webView_find_result%': '{totalNumber} results',
  '%webView_find_showingResults%': 'Showing {visibleNumber} of {totalNumber} results',
  '%webView_find_showingResultsOfMore%': 'Showing {visibleNumber} of more than {totalNumber}',
  '%webView_find_replace_structureProtectedMarkerTooltip%':
    'This replacement adds a marker, which is not allowed while structure is locked.',
  '%webView_find_replace_structureProtectedNote%': 'Structure is locked.',
  '%webView_find_replace_readOnlyTooltip%':
    "This project is read-only, so replacements can't be made.",
  '%webView_find_previewOptions_toggle%': 'Preview style',
};

/** Minimal complete set of `FindProps`, overridden per test. */
function buildProps(overrides: Partial<FindProps>): FindProps {
  return {
    localizedStrings: STRINGS,
    scopeSelectorLocalizedStrings: {},
    searchResultLocalizedStrings: {},
    searchTerm: '',
    recentSearches: [],
    scope: 'book',
    verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    booksPresent: '1'.repeat(66),
    selectedBookIds: [],
    localizedBookData: new Map(),
    shouldMatchCase: false,
    searchTextType: 'all',
    wordRestriction: 'none',
    isRegexAllowed: false,
    isSearchQueryValid: true,
    activeMode: 'find',
    replaceTerm: '',
    preserveCase: false,
    isReplacing: false,
    results: [],
    resultsByBook: new Map(),
    focusedResultIndex: undefined,
    searchStatus: undefined,
    searchError: undefined,
    searchProgress: 0,
    totalNumberOfResults: 0,
    numberOfHiddenResults: 0,
    isPostReplaceSearch: false,
    onSearchTermChange: vi.fn(),
    onStartSearch: vi.fn(),
    onStopSearch: vi.fn(),
    setScope: vi.fn(),
    onSelectedBookIdsChange: vi.fn(),
    setSearchTextType: vi.fn(),
    setWordRestriction: vi.fn(),
    setShouldMatchCase: vi.fn(),
    setIsRegexAllowed: vi.fn(),
    onToggleMode: vi.fn(),
    onReplaceTermChange: vi.fn(),
    onPreserveCaseChange: vi.fn(),
    onFocusedResultChange: vi.fn(),
    onHideResult: vi.fn(),
    onReplace: vi.fn(),
    onReplaceAll: vi.fn(),
    onCancelReplace: vi.fn(),
    onResultsScroll: vi.fn(),
    getBookUsj: vi.fn(async () => undefined),
    ...overrides,
  };
}

describe('Find — results-area placeholder', () => {
  it('shows the "type to search" prompt when the search term is empty', () => {
    render(<Find {...buildProps({ searchTerm: '', searchStatus: undefined })} />);
    expect(screen.getByText('Enter search text to find results')).toBeInTheDocument();
    expect(screen.queryByText('Select at least one book to search')).not.toBeInTheDocument();
  });

  it('shows a "select at least one book" placeholder when the term is non-empty but the query is invalid', () => {
    render(
      <Find
        {...buildProps({
          searchTerm: 'God',
          searchStatus: undefined,
          isSearchQueryValid: false,
          scope: 'selectedBooks',
          selectedBookIds: [],
        })}
      />,
    );
    expect(screen.getByText('Select at least one book to search')).toBeInTheDocument();
    expect(screen.queryByText('Enter search text to find results')).not.toBeInTheDocument();
  });

  it('shows the loading skeleton (not the idle prompt) when a valid term is pending search', () => {
    const { container } = render(
      <Find
        {...buildProps({
          searchTerm: 'God',
          searchStatus: undefined,
          isSearchQueryValid: true,
        })}
      />,
    );
    expect(screen.queryByText('Enter search text to find results')).not.toBeInTheDocument();
    expect(screen.queryByText('Select at least one book to search')).not.toBeInTheDocument();
    expect(container.querySelectorAll('[class*="animate-pulse"]').length).toBeGreaterThan(0);
  });

  it('still shows the loading skeleton once the search is actually running', () => {
    const { container } = render(
      <Find
        {...buildProps({
          searchTerm: 'God',
          searchStatus: 'running',
          isSearchQueryValid: true,
        })}
      />,
    );
    expect(container.querySelectorAll('[class*="animate-pulse"]').length).toBeGreaterThan(0);
  });
});

/**
 * A single result to satisfy `visibleResults.length > 0` / `focusedResultIndex` preconditions for
 * Replace/Replace All. `resultsByBook` is intentionally left empty since these tests don't exercise
 * the result-list rendering.
 */
const FAKE_RESULT = {
  start: { verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, offset: 0 },
  end: { verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, offset: 3 },
  text: 'God',
};

describe('Find — permission-blocked Replace', () => {
  function buildReplaceProps(overrides: Partial<FindProps>): FindProps {
    return buildProps({
      activeMode: 'replace',
      searchTerm: 'God',
      searchStatus: 'completed',
      results: [FAKE_RESULT],
      focusedResultIndex: 0,
      ...overrides,
    });
  }

  it('disables Replace and Replace All with a read-only tooltip when isEditable is false', () => {
    render(<Find {...buildReplaceProps({ isEditable: false })} />);
    expect(screen.getByRole('button', { name: 'Replace' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Replace all' })).toBeDisabled();
    expect(
      screen.getByRole('group', {
        name: "This project is read-only, so replacements can't be made.",
      }),
    ).toBeInTheDocument();
  });

  it('leaves Replace and Replace All enabled when isEditable is true and structure is not protected', () => {
    render(<Find {...buildReplaceProps({ isEditable: true })} />);
    expect(screen.getByRole('button', { name: 'Replace' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Replace all' })).toBeEnabled();
  });

  it('shows the read-only tooltip (not the structure-protected one) when both reasons apply', () => {
    render(
      <Find
        {...buildReplaceProps({
          isEditable: false,
          isStructureProtected: true,
          isReplacementStructureChanging: true,
        })}
      />,
    );
    expect(
      screen.getByRole('group', {
        name: "This project is read-only, so replacements can't be made.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('group', {
        name: 'This replacement adds a marker, which is not allowed while structure is locked.',
      }),
    ).not.toBeInTheDocument();
  });
});
