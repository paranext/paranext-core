// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { SCOPE_SELECTOR_STRING_KEYS } from 'platform-bible-react';
import { ProjectSelectorOpenTab } from 'platform-bible-react/experimental';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  BookResultEntry,
  Find,
  FIND_LOCALIZED_STRING_KEYS,
  FindProject,
  FindProps,
} from './find.component';
import { LocalizedBookData } from './find-types';
import { HidableFindResult, SEARCH_RESULT_LOCALIZED_STRING_KEYS } from './search-result.component';
import { DEFAULT_REPLACE_PREVIEW_OPTIONS } from './replace-preview-types';

// jsdom implements none of ResizeObserver, IntersectionObserver, matchMedia, or scrollIntoView, and
// the render path touches all four: platform-bible-react's Tooltip/Popover wire ResizeObservers, the
// results container calls scrollIntoView, and the shared components query media features. No-op stubs
// keep rendering from throwing so these tests can assert on what is rendered.
beforeAll(() => {
  // `vi.stubGlobal` accepts `unknown`, so these no-op stubs need no type assertion to stand in for
  // the real constructors — only `observe`/`disconnect` are ever reached from this render path.
  const stubObserver = () =>
    vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: vi.fn(() => []),
    }));

  vi.stubGlobal('ResizeObserver', stubObserver());
  vi.stubGlobal('IntersectionObserver', stubObserver());
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

  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = vi.fn();
  // Radix's PopoverContent calls scrollTo when it focuses children, which the project
  // selector tests below reach by opening the picker.
  if (!Element.prototype.scrollTo) Element.prototype.scrollTo = vi.fn();
});

/**
 * Maps every localized key to the key itself, so assertions can target an exact, stable string
 * without depending on the shipped English wording (which is free to change).
 */
function stubLocalizedStrings(keys: readonly LocalizeKey[]): LanguageStrings {
  const strings: LanguageStrings = {};
  keys.forEach((key) => {
    strings[key] = key;
  });
  return strings;
}

const NO_OPEN_PROJECTS_KEY = '%webView_find_noOpenProjects_results%';
const SEARCH_PROMPT_KEY = '%webView_find_searchPrompt%';
/** The status-bar message for a completed search with 1 result and none hidden. */
const STATUS_MESSAGE_KEY = '%webView_find_result%';

/** Distinctive match text, so a rendered result card is unambiguous to assert on. */
const RESULT_MATCH_TEXT = 'ZzMatchTextZz';

const VERSE_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

const PROJECTS: FindProject[] = [{ id: 'WEB', shortName: 'WEB', fullName: 'World English Bible' }];
const OPEN_TABS: ProjectSelectorOpenTab[] = [{ projectId: 'WEB', scrollGroupId: 0 }];

const RESULT: HidableFindResult = {
  text: RESULT_MATCH_TEXT,
  start: { verseRef: VERSE_REF, offset: 0 },
  end: { verseRef: VERSE_REF, offset: RESULT_MATCH_TEXT.length },
};

const RESULTS_BY_BOOK = new Map<string, BookResultEntry[]>([
  ['GEN', [{ result: RESULT, originalIndex: 0 }]],
]);

const LOCALIZED_BOOK_DATA = new Map<string, LocalizedBookData>([
  ['GEN', { localizedId: 'GEN', localizedName: 'Genesis' }],
]);

function buildProps(overrides: Partial<FindProps> = {}): FindProps {
  return {
    localizedStrings: stubLocalizedStrings(FIND_LOCALIZED_STRING_KEYS),
    scopeSelectorLocalizedStrings: stubLocalizedStrings(SCOPE_SELECTOR_STRING_KEYS),
    searchResultLocalizedStrings: stubLocalizedStrings(SEARCH_RESULT_LOCALIZED_STRING_KEYS),

    projects: PROJECTS,
    selectedProjectId: 'WEB',
    selectedScrollGroupId: 0,
    openTabs: OPEN_TABS,
    isLoadingProjects: false,
    noOpenProjects: false,
    onSelectProjectScrollGroup: vi.fn(),
    onSelectProject: vi.fn(),
    onOpenProjectInGroup: vi.fn(),

    searchTerm: 'God',
    recentSearches: [],
    scope: 'chapter',
    verseRef: VERSE_REF,
    booksPresent: '1'.repeat(123),
    hasExcludedExtraMaterial: false,
    selectedBookIds: [],
    localizedBookData: LOCALIZED_BOOK_DATA,
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
    getBookUsj: vi.fn().mockResolvedValue(undefined),
    previewOptions: DEFAULT_REPLACE_PREVIEW_OPTIONS,

    ...overrides,
  };
}

describe('Find results area — no-open-projects placeholder', () => {
  // `searchTerm: ''` is load-bearing: the idle prompt means "nothing has been searched YET", and a
  // non-empty term with no status now means a search is pending, which shows the loading skeleton
  // instead (see the results-area placeholder suite below). The shared `buildProps` defaults the
  // term to 'God' for the result-rendering tests, so it has to be cleared here.
  it('shows the search prompt when nothing has been searched yet', () => {
    render(<Find {...buildProps({ searchTerm: '' })} />);

    expect(screen.getByText(SEARCH_PROMPT_KEY)).toBeInTheDocument();
    expect(screen.queryByText(NO_OPEN_PROJECTS_KEY)).not.toBeInTheDocument();
  });

  it('shows the no-open-projects placeholder instead of the search prompt when nothing is open', () => {
    render(<Find {...buildProps({ noOpenProjects: true })} />);

    expect(screen.getByText(NO_OPEN_PROJECTS_KEY)).toBeInTheDocument();
    expect(screen.queryByText(SEARCH_PROMPT_KEY)).not.toBeInTheDocument();
  });

  it('renders results normally while a project is open', () => {
    render(
      <Find
        {...buildProps({
          results: [RESULT],
          resultsByBook: RESULTS_BY_BOOK,
          searchStatus: 'completed',
          totalNumberOfResults: 1,
        })}
      />,
    );

    expect(screen.getByText(RESULT_MATCH_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(NO_OPEN_PROJECTS_KEY)).not.toBeInTheDocument();
  });

  // The regression this guards: every result-activation callback is gated on a target editor tab, so
  // once the last tab closes the results still on screen are inert. Leaving them rendered invited
  // clicks that silently did nothing, with no explanation of why the panel had stopped responding.
  it('replaces results already on screen with the placeholder when the last tab closes', () => {
    render(
      <Find
        {...buildProps({
          noOpenProjects: true,
          results: [RESULT],
          resultsByBook: RESULTS_BY_BOOK,
          searchStatus: 'completed',
          totalNumberOfResults: 1,
        })}
      />,
    );

    expect(screen.getByText(NO_OPEN_PROJECTS_KEY)).toBeInTheDocument();
    // The inert results must be gone, not merely covered.
    expect(screen.queryByText(RESULT_MATCH_TEXT)).not.toBeInTheDocument();
  });

  it('suppresses the status bar so a stale result count cannot contradict the placeholder', () => {
    const { rerender } = render(
      <Find
        {...buildProps({
          results: [RESULT],
          resultsByBook: RESULTS_BY_BOOK,
          searchStatus: 'completed',
          totalNumberOfResults: 1,
        })}
      />,
    );

    // Baseline: with a project open, the completed-search status message is rendered. Matched on the
    // exact key the status bar resolves for 1 result with none hidden — NOT a loose /showing/ regex,
    // which would also match the scope control's "Showing" prefix in the header and pass vacuously.
    expect(screen.getByText(STATUS_MESSAGE_KEY)).toBeInTheDocument();

    rerender(
      <Find
        {...buildProps({
          noOpenProjects: true,
          results: [RESULT],
          resultsByBook: RESULTS_BY_BOOK,
          searchStatus: 'completed',
          totalNumberOfResults: 1,
        })}
      />,
    );

    expect(screen.queryByText(STATUS_MESSAGE_KEY)).not.toBeInTheDocument();
  });
});

/**
 * Two tabs of the SAME project in different scroll groups. In power mode this is what produces two
 * separate rows badged "A" and "B" — precisely the surface simple mode must not show, since simple
 * mode hides `ScrollGroupSelector` from both toolbars and the letters would name something the user
 * cannot see or change.
 */
const OPEN_TABS_TWO_GROUPS: ProjectSelectorOpenTab[] = [
  { projectId: 'WEB', scrollGroupId: 0 },
  { projectId: 'WEB', scrollGroupId: 1 },
];

const OTHER_PROJECT: FindProject = { id: 'OTH', shortName: 'OTH', fullName: 'Other Bible' };

const PROJECT_SELECTOR_LABEL_KEY = '%webView_find_projectSelector_label%';

/**
 * Radix Popover and cmdk rely on PointerEvent sequences `fireEvent.click` does not synthesize;
 * `pointerEventsCheck: 0` is the standard jsdom workaround (mirrors the ProjectSelector's own
 * tests).
 */
function setupUser() {
  return userEvent.setup({ pointerEventsCheck: 0 });
}

function openProjectSelector(user: ReturnType<typeof setupUser>) {
  return user.click(screen.getByRole('combobox', { name: PROJECT_SELECTOR_LABEL_KEY }));
}

describe('Find project selector — simple interface mode', () => {
  it('appends the scroll group letter to the trigger in power mode', () => {
    render(<Find {...buildProps()} />);

    expect(screen.getByRole('combobox', { name: PROJECT_SELECTOR_LABEL_KEY })).toHaveTextContent(
      'WEB · A',
    );
  });

  it('shows the bare project short name in the trigger when scroll groups are hidden', () => {
    render(<Find {...buildProps({ hideScrollGroups: true })} />);

    const trigger = screen.getByRole('combobox', { name: PROJECT_SELECTOR_LABEL_KEY });
    expect(trigger).toHaveTextContent('WEB');
    // The separator is what carries the group letter in power mode; its absence is the assertion.
    expect(trigger).not.toHaveTextContent('·');
  });

  it('renders one unbadged row per project when scroll groups are hidden', async () => {
    const user = setupUser();
    render(<Find {...buildProps({ openTabs: OPEN_TABS_TWO_GROUPS, hideScrollGroups: true })} />);

    await openProjectSelector(user);
    const rows = await screen.findAllByRole('option');

    // One row for the project, not one per open tab.
    expect(rows).toHaveLength(1);
    // Badges render the letters 'A'/'B' as their own text nodes, and neither 'WEB' nor 'World
    // English Bible' contains a bare 'A' or 'B', so their absence pins down that no badge rendered.
    expect(within(rows[0]).queryByText('A', { exact: true })).toBeNull();
    expect(within(rows[0]).queryByText('B', { exact: true })).toBeNull();
  });

  // Falsifies the test above: the same inputs WITHOUT `hideScrollGroups` do render both rows and
  // both letters, so that test is detecting the flag rather than a query that never matches.
  it('renders a badged row per open tab in power mode', async () => {
    const user = setupUser();
    render(<Find {...buildProps({ openTabs: OPEN_TABS_TWO_GROUPS })} />);

    await openProjectSelector(user);
    const rows = await screen.findAllByRole('option');

    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getByText('A', { exact: true })).toBeInTheDocument();
    expect(within(rows[1]).getByText('B', { exact: true })).toBeInTheDocument();
  });

  it('reports only the project id when a row is picked with scroll groups hidden', async () => {
    const user = setupUser();
    const onSelectProject = vi.fn();
    const onSelectProjectScrollGroup = vi.fn();
    render(
      <Find
        {...buildProps({
          projects: [...PROJECTS, OTHER_PROJECT],
          openTabs: [...OPEN_TABS, { projectId: 'OTH', scrollGroupId: 0 }],
          hideScrollGroups: true,
          onSelectProject,
          onSelectProjectScrollGroup,
        })}
      />,
    );

    await openProjectSelector(user);
    await user.click(await screen.findByText('Other Bible'));

    expect(onSelectProject).toHaveBeenCalledWith('OTH');
    // The scroll group is resolved by the web view, not reported from the picker, in this mode.
    expect(onSelectProjectScrollGroup).not.toHaveBeenCalled();
  });
});

// #region PT-4343 lifecycle + permission suites

/**
 * These suites assert on rendered ENGLISH text rather than on localization keys, so they need real
 * strings where the suites above deliberately use key-as-value stubs. Kept as their own map plus a
 * `buildLifecycleProps` adapter so the two conventions coexist in one file without either suite
 * having to be rewritten.
 */
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

/** `buildProps` with the English string map swapped in, for the suites below. */
function buildLifecycleProps(overrides: Partial<FindProps>): FindProps {
  return buildProps({ localizedStrings: STRINGS, ...overrides });
}

describe('Find — results-area placeholder', () => {
  it('shows the "type to search" prompt when the search term is empty', () => {
    render(<Find {...buildLifecycleProps({ searchTerm: '', searchStatus: undefined })} />);
    expect(screen.getByText('Enter search text to find results')).toBeInTheDocument();
    expect(screen.queryByText('Select at least one book to search')).not.toBeInTheDocument();
  });

  it('shows a "select at least one book" placeholder when the term is non-empty but the query is invalid', () => {
    render(
      <Find
        {...buildLifecycleProps({
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
      <Find {...buildLifecycleProps({ searchTerm: '', searchStatus: undefined })} />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Enter search text to find results');

    rerender(
      <Find
        {...buildLifecycleProps({
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
        {...buildLifecycleProps({
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
        {...buildLifecycleProps({
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
    return buildLifecycleProps({
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
    return buildLifecycleProps({
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

// #endregion

describe('Find — books-scope summary in the "Showing" trigger', () => {
  // The real BooksPresent setting is one character per canon book. These tests pin their own
  // full-length string so the expected summaries don't depend on buildProps' default.
  const ALL_BOOKS_PRESENT = '1'.repeat(Canon.allBookIds.length);

  // Deliberately NOT overridden per test: the localized strings come from buildProps' stub over the
  // real FIND_LOCALIZED_STRING_KEYS, so a key the component reads but never declares resolves to
  // `undefined` and these assertions fail — which is the regression a hand-built strings object
  // hides, since it can supply a key `find.web-view.tsx` never requests.
  const ALL_BOOKS_TEXT = '%webView_find_allBooks%';

  function buildBooksScopeProps(selectedBookIds: string[]): FindProps {
    return buildProps({
      scope: 'selectedBooks',
      booksPresent: ALL_BOOKS_PRESENT,
      selectedBookIds,
    });
  }

  it('summarizes a full selection as "All books" instead of listing every book', () => {
    // Spelled out independently of the component's own decoder, so a decoder that stopped
    // filtering obsolete books would fail here rather than agree with itself.
    const everyNonObsoleteBookId = Canon.allBookIds.filter(
      (bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
    );
    render(<Find {...buildBooksScopeProps(everyNonObsoleteBookId)} />);
    expect(screen.getByText(ALL_BOOKS_TEXT)).toBeInTheDocument();
    // The regression this guards: every id joined into the trigger, which overflowed the panel.
    expect(screen.queryByText(/GEN, EXO, LEV/)).not.toBeInTheDocument();
  });

  it('does not claim "All books" when an available book is missing from the selection', () => {
    const everyNonObsoleteBookId = Canon.allBookIds.filter(
      (bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
    );
    render(<Find {...buildBooksScopeProps(everyNonObsoleteBookId.slice(0, -1))} />);
    expect(screen.queryByText(ALL_BOOKS_TEXT)).not.toBeInTheDocument();
  });

  it('truncates to a canon-order first-last range when more than five books are selected', () => {
    render(<Find {...buildBooksScopeProps(['MRK', 'GEN', 'EXO', 'LEV', 'NUM', 'DEU'])} />);
    // The regression this guards: every selected id joined into the trigger, which widened the
    // "Showing" row until the whole panel grew a horizontal scrollbar.
    expect(screen.getByText('GEN - MRK')).toBeInTheDocument();
  });

  it('lists the books individually when few enough are selected', () => {
    render(<Find {...buildBooksScopeProps(['LEV', 'GEN', 'EXO'])} />);
    expect(screen.getByText('GEN, EXO, LEV')).toBeInTheDocument();
  });

  it('opens the scope popover from the summarized trigger', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<Find {...buildBooksScopeProps(['MRK', 'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'MAT'])} />);
    await user.click(screen.getByText('GEN - MRK'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });
});

describe('Find — an unrunnable query with results still on screen', () => {
  /**
   * The state this suite covers: a search ran over selected books, then the selection was emptied —
   * by a project switch pruning it, or by the user clearing it. The results belong to a query Find
   * would no longer run, but nothing has cleared them.
   */
  function buildEmptiedSelectionProps(overrides: Partial<FindProps> = {}): FindProps {
    return buildLifecycleProps({
      scope: 'selectedBooks',
      selectedBookIds: [],
      results: [RESULT],
      resultsByBook: RESULTS_BY_BOOK,
      searchStatus: 'completed',
      totalNumberOfResults: 1,
      activeMode: 'replace',
      replaceTerm: 'replacement',
      ...overrides,
    });
  }

  it('says why nothing will happen instead of dead-ending on stale results', () => {
    render(<Find {...buildEmptiedSelectionProps()} />);

    expect(screen.getByText('Select at least one book to search')).toBeInTheDocument();
  });

  // Replace All writes at the character offsets the results carry. Those offsets were resolved by a
  // query Find would no longer run, and nothing has re-verified them.
  it('blocks Replace all against results the current query would not produce', () => {
    render(<Find {...buildEmptiedSelectionProps()} />);

    expect(screen.getByRole('button', { name: 'Replace all' })).toBeDisabled();
  });

  it('leaves Replace all available once the selection names a book again', () => {
    render(<Find {...buildEmptiedSelectionProps({ selectedBookIds: ['GEN'] })} />);

    expect(screen.getByRole('button', { name: 'Replace all' })).toBeEnabled();
    expect(screen.queryByText('Select at least one book to search')).not.toBeInTheDocument();
  });
});
