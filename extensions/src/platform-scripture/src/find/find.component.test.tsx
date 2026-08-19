// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SerializedVerseRef } from '@sillsdev/scripture';
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
  it('shows the search prompt when nothing has been searched yet', () => {
    render(<Find {...buildProps()} />);

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
