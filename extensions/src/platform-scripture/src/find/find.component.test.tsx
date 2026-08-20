// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Canon } from '@sillsdev/scripture';
import { getAvailableBookIds } from 'platform-bible-react';
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

  // jsdom does not implement IntersectionObserver; each result card uses one to track visibility.
  if (typeof globalThis.IntersectionObserver === 'undefined') {
    const stubObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: vi.fn(() => []),
      root: undefined,
      rootMargin: '',
      thresholds: [],
    }));
    // IntersectionObserver constructor as a vi.fn factory satisfies runtime contract but not
    // structural typing; we cast through unknown to adapt it to the required type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.IntersectionObserver = stubObserver as unknown as typeof IntersectionObserver;
  }

  // jsdom does not implement scrollIntoView; the selected result card scrolls itself into view.
  if (typeof Element.prototype.scrollIntoView === 'undefined') {
    Element.prototype.scrollIntoView = vi.fn();
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
    "This replacement adds a paragraph, verse, or chapter marker, which isn't allowed while structure is locked.",
  '%webView_find_replace_structureProtectedNote%': 'Structure is locked.',
  '%webView_find_replace_readOnlyNote%':
    'This project is read-only. Replacements will be rejected.',
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
    activeMode: 'find',
    replaceTerm: '',
    preserveCase: false,
    isReplacing: false,
    isEditable: true,
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
          scope: 'selectedBooks',
          selectedBookIds: [],
        })}
      />,
    );
    expect(screen.getByText('Select at least one book to search')).toBeInTheDocument();
    expect(screen.queryByText('Enter search text to find results')).not.toBeInTheDocument();
  });

  it('announces the idle and invalid-query placeholders via role="status" for screen readers', () => {
    // role="status" doesn't take its accessible NAME from content per the ARIA spec (only an
    // explicit aria-label would), so the live region is located by role alone and its announced
    // text is asserted via textContent, not the `name` matcher.
    const { rerender } = render(
      <Find {...buildProps({ searchTerm: '', searchStatus: undefined })} />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Enter search text to find results');

    rerender(
      <Find
        {...buildProps({
          searchTerm: 'God',
          searchStatus: undefined,
          scope: 'selectedBooks',
          selectedBookIds: [],
        })}
      />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Select at least one book to search');
  });

  it('shows the loading skeleton (not the idle prompt) when a valid term is pending search', () => {
    const { container } = render(
      <Find
        {...buildProps({
          searchTerm: 'God',
          searchStatus: undefined,
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
        name: "This replacement adds a paragraph, verse, or chapter marker, which isn't allowed while structure is locked.",
      }),
    ).not.toBeInTheDocument();
  });

  // Regression: read-only previously surfaced only a hover tooltip, weaker feedback than
  // structure-protection's persistent note + tooltip pair. Both reasons now show an always-visible
  // note in the same slot, not just an on-hover explanation.
  it('shows a persistent read-only note (not just a hover tooltip) when isEditable is false', () => {
    render(<Find {...buildReplaceProps({ isEditable: false })} />);
    expect(
      screen.getByText('This project is read-only. Replacements will be rejected.'),
    ).toBeInTheDocument();
  });

  it('shows the persistent structure-protected note when structure is locked and the project is editable', () => {
    render(<Find {...buildReplaceProps({ isEditable: true, isStructureProtected: true })} />);
    expect(screen.getByText('Structure is locked.')).toBeInTheDocument();
    expect(
      screen.queryByText('This project is read-only. Replacements will be rejected.'),
    ).not.toBeInTheDocument();
  });

  it('shows only the read-only note (not the structure-protected note) when both reasons apply', () => {
    render(<Find {...buildReplaceProps({ isEditable: false, isStructureProtected: true })} />);
    expect(
      screen.getByText('This project is read-only. Replacements will be rejected.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Structure is locked.')).not.toBeInTheDocument();
  });
});

describe('Find — permission-blocked Replace (per-result button)', () => {
  // Regression test: the per-result Replace button/keyboard-shortcut used to receive neither
  // isEditable nor isStructureProtected, so it stayed clickable even while the toolbar Replace /
  // Replace All buttons were correctly disabled — a bypass of the exact gate this component exists
  // to enforce. Uses a distinct label ("Replace card") from searchResultLocalizedStrings so this
  // button is unambiguous from the toolbar's "Replace" button in the same render.
  function buildPerResultProps(overrides: Partial<FindProps>): FindProps {
    return buildProps({
      activeMode: 'replace',
      searchTerm: 'God',
      searchStatus: 'completed',
      results: [FAKE_RESULT],
      resultsByBook: new Map([['GEN', [{ result: FAKE_RESULT, originalIndex: 0 }]]]),
      focusedResultIndex: 0,
      searchResultLocalizedStrings: { '%webView_find_replace%': 'Replace card' },
      ...overrides,
    });
  }

  it('disables the per-result Replace button when isEditable is false', () => {
    render(<Find {...buildPerResultProps({ isEditable: false })} />);
    expect(screen.getByRole('button', { name: 'Replace card' })).toBeDisabled();
  });

  it('explains why via a tooltip, matching the toolbar buttons, instead of a silent disable', () => {
    render(<Find {...buildPerResultProps({ isEditable: false })} />);
    const button = screen.getByRole('button', { name: 'Replace card' });
    expect(button).toBeDisabled();
    // The toolbar's Replace/Replace All are also read-only-blocked in this render, so there are
    // two matching tooltip wrappers — assert this button's own ancestor specifically.
    expect(button.closest('[role="group"]')).toHaveAccessibleName(
      "This project is read-only, so replacements can't be made.",
    );
  });

  it('disables the per-result Replace button when structure is protected and the replacement would change it', () => {
    render(
      <Find
        {...buildPerResultProps({
          isEditable: true,
          isStructureProtected: true,
          isReplacementStructureChanging: true,
        })}
      />,
    );
    expect(screen.getByRole('button', { name: 'Replace card' })).toBeDisabled();
  });

  it('leaves the per-result Replace button enabled when nothing blocks replace', () => {
    render(<Find {...buildPerResultProps({ isEditable: true })} />);
    expect(screen.getByRole('button', { name: 'Replace card' })).toBeEnabled();
  });
});

describe('Find — books-scope summary in the "Showing" trigger', () => {
  // The real BooksPresent setting is one character per canon book; the shared helper rejects any
  // other length, so these tests use a full-length string rather than buildProps' short stand-in.
  const ALL_BOOKS_PRESENT = '1'.repeat(Canon.allBookIds.length);
  const allAvailableBookIds = getAvailableBookIds(ALL_BOOKS_PRESENT);

  function buildBooksScopeProps(selectedBookIds: string[]): FindProps {
    return buildProps({
      scope: 'selectedBooks',
      booksPresent: ALL_BOOKS_PRESENT,
      selectedBookIds,
      scopeSelectorLocalizedStrings: {
        '%webView_scope_selector_all_books%': 'All books',
        '%webView_book_selector_more%': 'more',
      },
    });
  }

  it('summarizes a full selection as "All books" instead of listing every book', () => {
    render(<Find {...buildBooksScopeProps(allAvailableBookIds)} />);
    expect(screen.getByText('All books')).toBeInTheDocument();
    // The regression this guards: every id joined into the trigger, which overflowed the panel.
    expect(screen.queryByText(/GEN, EXO, LEV/)).not.toBeInTheDocument();
  });

  it('truncates to a canon-order first … last range when more than five books are selected', () => {
    render(<Find {...buildBooksScopeProps(['MRK', 'GEN', 'EXO', 'LEV', 'NUM', 'DEU'])} />);
    // The regression this guards: every selected id joined into the trigger, which widened the
    // "Showing" row until the whole panel grew a horizontal scrollbar.
    expect(screen.getByText('GEN … MRK')).toBeInTheDocument();
  });

  it('lists the books individually when few enough are selected', () => {
    render(<Find {...buildBooksScopeProps(['LEV', 'GEN', 'EXO'])} />);
    expect(screen.getByText('GEN, EXO, LEV')).toBeInTheDocument();
  });

  it('still opens the scope popover when the trigger also carries the full-selection tooltip', async () => {
    // With a lossy summary the trigger Button is the asChild child of both PopoverTrigger and
    // TooltipTrigger (PT-4092); nesting two asChild triggers is easy to get wrong in a way that
    // silently stops the popover from opening.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<Find {...buildBooksScopeProps(['MRK', 'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'MAT'])} />);
    await user.click(screen.getByText('GEN … MRK'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });
});
