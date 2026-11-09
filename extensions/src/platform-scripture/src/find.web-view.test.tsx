// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCallback, useState, type ComponentType } from 'react';
import type { WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import { useProjectData, useProjectDataProvider } from '@papi/frontend/react';
import { sonner } from 'platform-bible-react';
import { booksPresentFor } from './find/find-book-lists.test-utils';
import { extractGuardedMarkers, ONE_ENDED_MARKER_ERROR } from './find/structure-protection.util';

// jsdom implements none of ResizeObserver, IntersectionObserver or matchMedia, and the Find render
// path touches all three (Radix popovers, `useViewVisibility`, shared components' media queries).
beforeAll(() => {
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
  if (!Element.prototype.scrollTo) Element.prototype.scrollTo = vi.fn();
});

// ---------------------------------------------------------------------------
// Hoisted mocks — must precede any import that touches the web view
// ---------------------------------------------------------------------------

const PROJECT_ID = 'PROJ';

const { mockReplaceAll } = vi.hoisted(() => ({
  /** Whether Find offers Replace All, which the app turns off. A test turns it on to reach it. */
  mockReplaceAll: { isEnabled: false },
}));

vi.mock('./replace-all-enabled.const', () => ({
  get IS_REPLACE_ALL_ENABLED() {
    return mockReplaceAll.isEnabled;
  },
}));

const { mockBooksPresent, mockIsEditable, mockSettingValues } = vi.hoisted(() => {
  const booksPresent: { value: string } = { value: '' };
  /**
   * The project's `platform.isEditable`. A test changes it with `set`, which re-renders the web
   * view the way a changed project setting does.
   */
  const isEditable = {
    value: true,
    listeners: new Set<() => void>(),
    set(value: boolean) {
      isEditable.value = value;
      isEditable.listeners.forEach((listener) => listener());
    },
    subscribe(listener: () => void) {
      isEditable.listeners.add(listener);
      return () => isEditable.listeners.delete(listener);
    },
  };
  /** Settings a test overrides; any setting not named here resolves to its default. */
  const settingValues: Record<string, unknown> = {};
  return {
    mockBooksPresent: booksPresent,
    mockIsEditable: isEditable,
    mockSettingValues: settingValues,
  };
});

// Real components, with `sonner` replaced by a spy the Replace tests read the toasts from.
vi.mock('platform-bible-react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('platform-bible-react')>()),
  sonner: Object.assign(
    vi.fn(() => 'toast-id'),
    { dismiss: vi.fn() },
  ),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    window: { dataProviderName: 'platform.window', setFocus: vi.fn(async () => undefined) },
    projectLookup: {
      getMetadataForAllProjects: vi.fn(async () => [{ id: 'PROJ' }]),
    },
    projectDataProviders: {
      get: vi.fn(async () => ({
        getSetting: vi.fn(async (key: string) => (key === 'platform.name' ? 'PROJ' : undefined)),
      })),
    },
    commands: { sendCommand: vi.fn(async () => undefined) },
    notifications: { send: vi.fn(async () => undefined) },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  network: { getNetworkEvent: vi.fn(() => () => () => true) },
}));

vi.mock('@papi/frontend/react', async () => {
  const { useSyncExternalStore } = await import('react');
  /** Every data type any `useData(...)` call reads resolves to the default it was given. */
  const dataTypes = new Proxy(
    {},
    { get: () => (_selector: unknown, defaultValue: unknown) => [defaultValue, vi.fn(), false] },
  );
  return {
    // Echo each key back as its own value, except the per-book name keys: leaving those out is what
    // an unresolved localization looks like, and it lets the book controls fall back to plain ids
    // and English names the assertions can target.
    useLocalizedStrings: (keys: string[]) => [
      Object.fromEntries(
        keys.filter((key) => !/^%(LocalizedId|Book)\./.test(key)).map((key) => [key, key]),
      ),
      false,
    ],
    useData: vi.fn(() => dataTypes),
    useDataProvider: vi.fn(() => undefined),
    useProjectData: vi.fn(() => dataTypes),
    useProjectDataProvider: vi.fn(() => undefined),
    useProjectSetting: (_projectId: unknown, key: string, defaultValue: unknown) => {
      // Called on every read, whatever the key, so each call site keeps the same hooks.
      const isEditable = useSyncExternalStore(mockIsEditable.subscribe, () => mockIsEditable.value);
      let value = defaultValue;
      if (key === 'platformScripture.booksPresent') value = mockBooksPresent.value;
      else if (key === 'platform.isEditable') value = isEditable;
      return [value, vi.fn(), vi.fn(), false];
    },
    useSetting: (key: string, defaultValue: unknown) => [
      key in mockSettingValues ? mockSettingValues[key] : defaultValue,
      vi.fn(),
      vi.fn(),
      false,
    ],
    useWebViewController: vi.fn(() => undefined),
  };
});

vi.mock('./hooks/use-open-project-tabs', () => ({
  useOpenProjectTabs: vi.fn(() => [
    {
      webViewId: 'editor-1',
      projectId: 'PROJ',
      scrollGroupId: 0,
      webViewType: 'platformScriptureEditor.react',
      projectSource: 'container',
    },
  ]),
}));

vi.mock('./hooks/use-project-recency-map', () => ({
  useProjectRecencyMap: vi.fn(() => new Map()),
}));

// ---------------------------------------------------------------------------
// Import the web view AFTER the mocks. It assigns to global.webViewComponent.
// ---------------------------------------------------------------------------
// Must follow the vi.mock() calls so the side effect runs against the mock boundaries above.
// Vitest's hoisting keeps the execution order correct regardless of static position.
// eslint-disable-next-line import/first
import './find.web-view';

function getFindWebView(): ComponentType<WebViewProps> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<WebViewProps>;
}

/**
 * Props for the Find web view with `initialState` seeding its web view state. Every write the web
 * view makes to that state is recorded on `writeWebViewState` as `(key, value)`.
 */
function makeProps(
  initialState: Record<string, unknown>,
  writeWebViewState: (key: string, value: unknown) => void,
) {
  // The literal supplies only the props the web view reads; the double cast avoids restating
  // every optional field of WebViewProps.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    id: 'find-1',
    projectId: PROJECT_ID,
    updateWebViewDefinition: vi.fn(() => true),
    useWebViewScrollGroupScrRef: () => [
      { book: 'GEN', chapterNum: 1, verseNum: 1 },
      vi.fn(),
      0,
      vi.fn(),
    ],
    useWebViewState: (key: string, defaultValue: unknown) => {
      // Stateful so the web view's own writes feed straight back in, as the platform's real
      // useWebViewState does. Hooks inside a mock callback are the only way to get that, and the
      // callback is only ever called during render.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(key in initialState ? initialState[key] : defaultValue);
      // Stable, like the real setter, so effects keyed on it don't re-run every render.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const write = useCallback(
        (next: unknown) => {
          writeWebViewState(key, next);
          setValue(next);
        },
        [key],
      );
      return [value, write];
    },
  } as unknown as WebViewProps;
}

const SAVED_BOOKS_KEY = 'findSelectedBookIds';

const ONE_ENDED_MESSAGE = '%webView_find_replace_skippedOneEndedMarker%';
const CHAPTER_MESSAGE = '%webView_find_replace_skippedChapterMarker%';
const STRUCTURE_PROTECTED_MESSAGE = '%webView_find_replace_skippedStructureProtected%';

/** What the unmocked `useProjectData` fake answers, for restoring after a test overrides it. */
const ORIGINAL_PROJECT_DATA = vi.mocked(useProjectData)('platformScripture.replaceWithUsfm', '');

describe('Find web view — the saved book scope on a project that lacks some of its books', () => {
  const writeWebViewState = vi.fn();

  beforeEach(() => {
    writeWebViewState.mockReset();
    // Leviticus is saved in the scope but absent from the project Find now points at.
    mockBooksPresent.value = booksPresentFor(['GEN', 'EXO', 'NUM', 'MAT']);
  });

  function renderFind() {
    const FindWebView = getFindWebView();
    render(
      <FindWebView
        {...makeProps(
          { findScope: 'selectedBooks', [SAVED_BOOKS_KEY]: ['GEN', 'EXO', 'LEV'] },
          writeWebViewState,
        )}
      />,
    );
  }

  it('scopes to the books the project has without writing that narrowing back', async () => {
    renderFind();

    expect(await screen.findByText('GEN, EXO')).toBeInTheDocument();
    expect(writeWebViewState).not.toHaveBeenCalledWith(SAVED_BOOKS_KEY, expect.anything());
  });

  it('saves what the user picks in the book picker', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    renderFind();

    await user.click(await screen.findByRole('button', { name: /%webView_find_showing%/ }));
    // A combobox takes its accessible name from a label, never from its contents, so the book
    // picker's trigger is reached through the summary it renders.
    await user.click(screen.getByText(/book_selector_books_selected/));
    await user.click(await screen.findByText('Numbers'));

    // A pick commits the visible set, so the book this project lacks is dropped on purpose.
    expect(writeWebViewState).toHaveBeenCalledWith(SAVED_BOOKS_KEY, ['GEN', 'EXO', 'NUM']);
  });
});

describe('Find web view — Replace mode', () => {
  beforeEach(() => {
    mockBooksPresent.value = booksPresentFor(['GEN']);
    // Replace is only offered in power mode.
    mockSettingValues['platform.interfaceMode'] = 'power';
  });

  afterEach(() => {
    delete mockSettingValues['platform.interfaceMode'];
  });

  it('offers Replace but not Replace all, which cannot be undone', async () => {
    const FindWebView = getFindWebView();
    render(<FindWebView {...makeProps({ findActiveMode: 'replace' }, vi.fn())} />);

    expect(
      await screen.findByRole('button', { name: '%webView_find_replace%' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '%webView_find_replaceAll%' })).toBeNull();
  });
});

describe('Find web view — Replace on a match whose text changed after the search', () => {
  const MATCH_TEXT = 'ZzMatchTextZz';
  const verseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

  const findPdp = {
    beginFindJob: vi.fn(async () => 'job-1'),
    abandonFindJob: vi.fn(async () => true),
    stopFindJob: vi.fn(async () => true),
    retrieveFindJobUpdate: vi.fn(async () => ({
      jobId: 'job-1',
      status: 'completed',
      percentComplete: 100,
      totalResultsCount: 1,
      nextResults: [
        {
          text: MATCH_TEXT,
          start: { verseRef, offset: 0 },
          end: { verseRef, offset: MATCH_TEXT.length },
          matchedUsfm: MATCH_TEXT,
        },
      ],
      totalExecutionTimeMs: 1,
    })),
  };
  // The project's text no longer matches what the search saw, so the write is skipped.
  const replacePdp = { replace: vi.fn(async () => ({ changedIndexes: [0] })) };

  beforeEach(() => {
    mockBooksPresent.value = booksPresentFor(['GEN']);
    mockSettingValues['platform.interfaceMode'] = 'power';
    // The real hook is generic over every project interface; the fake covers only the two Replace reads.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(useProjectDataProvider).mockImplementation(((projectInterface: string) => {
      if (projectInterface === 'platformScripture.findInScripture') return findPdp;
      if (projectInterface === 'platformScripture.replaceWithUsfm') return replacePdp;
      return undefined;
    }) as unknown as typeof useProjectDataProvider);
    // `commitChanges` resolves true; the command map has no single return type to satisfy.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(papi.commands.sendCommand).mockImplementation((async () => true) as never);
  });

  afterEach(() => {
    delete mockSettingValues['platform.interfaceMode'];
    vi.mocked(useProjectDataProvider).mockImplementation(() => undefined);
    vi.mocked(papi.commands.sendCommand).mockImplementation(async () => undefined);
    vi.mocked(sonner).mockClear();
    findPdp.beginFindJob.mockClear();
    replacePdp.replace.mockClear();
  });

  it('reports a changed match on Replace, writes no version-history commit after it, and searches again', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const FindWebView = getFindWebView();
    render(
      <FindWebView
        {...makeProps(
          { findActiveMode: 'replace', findSearchTerm: 'God', findReplaceTerm: 'Lord' },
          vi.fn(),
        )}
      />,
    );
    // The first search starts on its own once the provider is available.
    await waitFor(() => expect(findPdp.beginFindJob).toHaveBeenCalledTimes(1));

    // The result card has its own Replace button, in addition to the toolbar's.
    const replaceButtons = await screen.findAllByRole('button', { name: '%webView_find_replace%' });
    await user.click(replaceButtons[replaceButtons.length - 1]);

    await waitFor(() =>
      expect(sonner).toHaveBeenCalledWith('%webView_find_replace_textChangedError%'),
    );
    expect(replacePdp.replace).toHaveBeenCalledTimes(1);
    // The version-history commit before the replace happens; the one after it does not.
    const commitCalls = vi
      .mocked(papi.commands.sendCommand)
      .mock.calls.filter(([command]) => command === 'paratextBibleSendReceive.commitChanges');
    expect(commitCalls.map((call) => call[3])).toEqual([true]);
    // The list is refreshed against the project as it now stands.
    await waitFor(() => expect(findPdp.beginFindJob).toHaveBeenCalledTimes(2));
    // Nothing was written, so no "replaced" confirmation.
    expect(sonner).not.toHaveBeenCalledWith('%webView_find_replacedOneOccurrence%');
  });
});

describe('Find web view — Replace on a match that includes markers', () => {
  const REPLACE = '%webView_find_replace%';
  const CANCEL = '%general_cancel%';
  const CONFIRM = '%webView_find_replace_markersPrompt_confirm%';
  const OK = '%general_ok%';
  const DELETED_MARKER = '%webView_find_replace_markersPrompt_deletedMarker%';
  const verseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

  /** A result the way the finder reports it, with `removedMarkers` derived as it derives them. */
  function resultFor(text: string, matchedUsfm: string) {
    const removedMarkers = extractGuardedMarkers(matchedUsfm);
    return {
      text,
      start: { verseRef, offset: 0 },
      end: { verseRef, offset: matchedUsfm.length },
      matchedUsfm,
      ...(removedMarkers.length > 0 ? { removedMarkers } : {}),
    };
  }

  const WHOLE_MARKER_RESULT = resultFor('ZzFirstSecond', 'ZzFirst\n\\p ZzSecond');
  const END_ONLY_RESULT = resultFor('ZzLord God', 'ZzLord\\nd* God');
  const START_ONLY_RESULT = resultFor('ZzWord1:3', 'ZzWord\\f + \\fr 1:3');
  const CHAPTER_RESULT = resultFor('ZzFirstSecond', 'ZzFirst\n\\c 2\n\\p\n\\v 1 ZzSecond');
  const PLAIN_RESULT = resultFor('ZzPlain', 'ZzPlain');

  let resultToFind: ReturnType<typeof resultFor>;
  /** Tells the web view its monitored book's USFM changed, which re-runs the search. */
  let notifyBookChanged: () => void;

  const findPdp = {
    beginFindJob: vi.fn(async () => 'job-1'),
    abandonFindJob: vi.fn(async () => true),
    stopFindJob: vi.fn(async () => true),
    retrieveFindJobUpdate: vi.fn(async () => ({
      jobId: 'job-1',
      status: 'completed',
      percentComplete: 100,
      totalResultsCount: 1,
      nextResults: [resultToFind],
      totalExecutionTimeMs: 1,
    })),
  };
  const replacePdp = { replace: vi.fn(async () => ({ changedIndexes: [] })) };
  const usfmBookPdp = {
    getBookUSFM: vi.fn(async () => 'snapshot'),
    subscribeBookUSFM: vi.fn(async (_verseRef: unknown, callback: (usfm: string) => void) => {
      notifyBookChanged = () => callback('changed');
      callback('initial');
      return async () => true;
    }),
  };

  const commitCalls = () =>
    vi
      .mocked(papi.commands.sendCommand)
      .mock.calls.filter(([command]) => command === 'paratextBibleSendReceive.commitChanges');

  beforeEach(() => {
    mockBooksPresent.value = booksPresentFor(['GEN']);
    mockSettingValues['platform.interfaceMode'] = 'power';
    vi.mocked(papi.commands.sendCommand).mockClear();
    // The real hook is generic over every project interface; the fake covers only these reads.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(useProjectDataProvider).mockImplementation(((projectInterface: string) => {
      if (projectInterface === 'platformScripture.findInScripture') return findPdp;
      if (projectInterface === 'platformScripture.replaceWithUsfm') return replacePdp;
      if (projectInterface === 'platformScripture.USFM_Book') return usfmBookPdp;
      return undefined;
    }) as unknown as typeof useProjectDataProvider);
    // `commitChanges` resolves true; the command map has no single return type to satisfy.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(papi.commands.sendCommand).mockImplementation((async () => true) as never);
  });

  afterEach(() => {
    delete mockSettingValues['platform.interfaceMode'];
    vi.mocked(useProjectDataProvider).mockImplementation(() => undefined);
    vi.mocked(papi.commands.sendCommand).mockReset();
    vi.mocked(papi.commands.sendCommand).mockImplementation(async () => undefined);
    vi.mocked(useProjectData).mockReset();
    vi.mocked(useProjectData).mockImplementation(() => ORIGINAL_PROJECT_DATA);
    findPdp.beginFindJob.mockClear();
    replacePdp.replace.mockClear();
    mockIsEditable.set(true);
  });

  /** Renders Find in Replace mode on `result`, and waits for its Replace buttons. */
  async function renderReplacing(
    result: ReturnType<typeof resultFor>,
    webViewState: Record<string, unknown> = {},
  ) {
    resultToFind = result;
    const FindWebView = getFindWebView();
    render(
      <FindWebView
        {...makeProps(
          {
            findActiveMode: 'replace',
            findSearchTerm: 'Zz',
            findReplaceTerm: 'X',
            ...webViewState,
          },
          vi.fn(),
        )}
      />,
    );
    await waitFor(() => expect(findPdp.beginFindJob).toHaveBeenCalledTimes(1));
    return screen.findAllByRole('button', { name: REPLACE });
  }

  async function clickCardReplace(result: ReturnType<typeof resultFor>) {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const replaceButtons = await renderReplacing(result);
    await user.click(replaceButtons[replaceButtons.length - 1]);
    return user;
  }

  it('shows the marker in the prompt before anything is committed or written', async () => {
    await clickCardReplace(WHOLE_MARKER_RESULT);

    const prompt = await screen.findByRole('alertdialog');
    expect(within(prompt).getByText('\\p')).toBeInTheDocument();
    expect(commitCalls()).toEqual([]);
    expect(replacePdp.replace).not.toHaveBeenCalled();
  });

  it('writes nothing on Cancel', async () => {
    const user = await clickCardReplace(WHOLE_MARKER_RESULT);

    const prompt = await screen.findByRole('alertdialog');
    await user.click(within(prompt).getByRole('button', { name: CANCEL }));

    await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
    expect(commitCalls()).toEqual([]);
    expect(replacePdp.replace).not.toHaveBeenCalled();
  });

  it('replaces the whole range on Replace (including markers)', async () => {
    const user = await clickCardReplace(WHOLE_MARKER_RESULT);

    const prompt = await screen.findByRole('alertdialog');
    await user.click(within(prompt).getByRole('button', { name: CONFIRM }));

    await waitFor(() => expect(replacePdp.replace).toHaveBeenCalledTimes(1));
    expect(replacePdp.replace).toHaveBeenCalledWith(
      [{ start: WHOLE_MARKER_RESULT.start, end: WHOLE_MARKER_RESULT.end }],
      'X',
      [WHOLE_MARKER_RESULT.matchedUsfm],
      { allowMarkerDeletion: true },
    );
    await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
  });

  /** Everything a skip must leave behind, once its message has been shown and dismissed. */
  const SKIPPED = { buttons: [OK], commits: 0, writes: 0 };

  /** Reads the skip message `message`, clicks OK, and reports what the skip left behind. */
  async function dismissSkipMessage(
    user: ReturnType<typeof userEvent.setup>,
    message: string,
  ): Promise<typeof SKIPPED> {
    const prompt = await screen.findByRole('alertdialog');
    within(prompt).getByText(message);
    const buttons = within(prompt)
      .getAllByRole('button')
      .map((button) => button.textContent ?? '');

    await user.click(within(prompt).getByRole('button', { name: OK }));
    await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());

    return {
      buttons,
      commits: commitCalls().length,
      writes: replacePdp.replace.mock.calls.length,
    };
  }

  it.each([
    ['an end marker without its start', END_ONLY_RESULT, ONE_ENDED_MESSAGE],
    ['a start marker without its end, into a footnote', START_ONLY_RESULT, ONE_ENDED_MESSAGE],
    ['a chapter marker', CHAPTER_RESULT, CHAPTER_MESSAGE],
  ])('skips a match with %s, with only OK', async (_description, result, message) => {
    const user = await clickCardReplace(result);

    expect(await dismissSkipMessage(user, message)).toEqual(SKIPPED);
  });

  it('skips a structure marker while structure is protected, with only OK', async () => {
    const protectedData = new Proxy({}, { get: () => () => [true, vi.fn(), false] });
    // The fake covers only the one read this path makes.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(useProjectData).mockImplementation(() => protectedData as never);

    const user = await clickCardReplace(WHOLE_MARKER_RESULT);

    expect(await dismissSkipMessage(user, STRUCTURE_PROTECTED_MESSAGE)).toEqual(SKIPPED);
  });

  it('offers Cancel and Replace (including markers) when every pair is whole', async () => {
    await clickCardReplace(resultFor('the Lord God', 'the \\nd Lord\\nd* God'));

    const prompt = await screen.findByRole('alertdialog');
    expect(
      within(prompt)
        .getAllByRole('button')
        .map((button) => button.textContent),
    ).toEqual([CANCEL, CONFIRM]);
  });

  it('asks nothing of a match with no marker', async () => {
    await clickCardReplace(PLAIN_RESULT);

    await waitFor(() => expect(replacePdp.replace).toHaveBeenCalledTimes(1));
    expect(replacePdp.replace).toHaveBeenCalledWith(
      [{ start: PLAIN_RESULT.start, end: PLAIN_RESULT.end }],
      'X',
      [PLAIN_RESULT.matchedUsfm],
      undefined,
    );
    expect(screen.queryByRole('alertdialog')).toBeNull();
  });

  it('asks nothing when the replacement puts every marker back', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const replaceButtons = await renderReplacing(WHOLE_MARKER_RESULT, {
      findReplaceTerm: 'X\n\\p Y',
    });
    await user.click(replaceButtons[replaceButtons.length - 1]);

    await waitFor(() => expect(replacePdp.replace).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole('alertdialog')).toBeNull();
  });

  it('upper-cases only the text when preserve case follows an all-caps match', async () => {
    // Upper-casing the `\nd*` too would write a marker that does not exist and lose the closer.
    const result = resultFor('LORD GOD', 'LORD\\nd* GOD');
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const replaceButtons = await renderReplacing(result, {
      findReplaceTerm: 'x\\nd* y',
      findPreserveCase: true,
    });
    await user.click(replaceButtons[replaceButtons.length - 1]);

    await waitFor(() => expect(replacePdp.replace).toHaveBeenCalledTimes(1));
    expect(replacePdp.replace).toHaveBeenCalledWith(
      [{ start: result.start, end: result.end }],
      'X\\nd* Y',
      [result.matchedUsfm],
      undefined,
    );
    expect(screen.queryByRole('alertdialog')).toBeNull();
  });

  it('marks only the markers the replacement does not put back', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const replaceButtons = await renderReplacing(
      resultFor('ZzFirstZzSecond', 'ZzFirst\n\\p\n\\v 2 ZzSecond'),
      { findReplaceTerm: 'X\n\\p Y' },
    );
    await user.click(replaceButtons[replaceButtons.length - 1]);

    const prompt = await screen.findByRole('alertdialog');
    expect(
      within(prompt)
        .getAllByRole('deletion')
        .map((marker) => marker.textContent),
    ).toEqual([`\\v 2 ${DELETED_MARKER}`]);
    expect(prompt).toHaveAccessibleDescription(expect.stringContaining(`\\v 2 ${DELETED_MARKER}`));
  });

  it('keeps the prompt open through an edit made elsewhere, and searches again once it closes', async () => {
    const user = await clickCardReplace(WHOLE_MARKER_RESULT);
    const prompt = await screen.findByRole('alertdialog');

    // An edit made elsewhere, such as the editor saving as the Replace click takes its focus.
    await act(async () => notifyBookChanged());
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 50);
      });
    });

    expect(screen.getByRole('alertdialog')).toBe(prompt);
    expect(findPdp.beginFindJob).toHaveBeenCalledTimes(1);

    await user.click(within(prompt).getByRole('button', { name: CANCEL }));

    await waitFor(() => expect(findPdp.beginFindJob).toHaveBeenCalledTimes(2));
    expect(replacePdp.replace).not.toHaveBeenCalled();
  });

  it('confirms the match the user saw after an edit made elsewhere, checked against its text', async () => {
    const user = await clickCardReplace(WHOLE_MARKER_RESULT);
    const prompt = await screen.findByRole('alertdialog');

    await act(async () => notifyBookChanged());
    await user.click(within(prompt).getByRole('button', { name: CONFIRM }));

    await waitFor(() => expect(replacePdp.replace).toHaveBeenCalledTimes(1));
    expect(replacePdp.replace).toHaveBeenCalledWith(
      [{ start: WHOLE_MARKER_RESULT.start, end: WHOLE_MARKER_RESULT.end }],
      'X',
      [WHOLE_MARKER_RESULT.matchedUsfm],
      { allowMarkerDeletion: true },
    );
  });

  it('closes the prompt without writing when a new search replaces the results', async () => {
    const user = await clickCardReplace(WHOLE_MARKER_RESULT);
    const prompt = await screen.findByRole('alertdialog');
    const confirm = within(prompt).getByRole('button', { name: CONFIRM });

    // A new search, such as the one the scope starts when it moves with the editor, empties the
    // list before filling it again. The prompt keeps the user from the search box, so the search
    // is started from under it.
    fireEvent.keyDown(screen.getByPlaceholderText('%webView_find_searchPlaceholder%'), {
      key: 'Enter',
    });

    await waitFor(() => expect(findPdp.beginFindJob).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
    await user.click(confirm);
    expect(replacePdp.replace).not.toHaveBeenCalled();
  });

  it('says the match is skipped when replace() refuses one end of a pair the web view did not predict', async () => {
    // Text that changed after the search can reach replace() looking different from the result.
    replacePdp.replace.mockRejectedValueOnce(new Error(ONE_ENDED_MARKER_ERROR));
    vi.mocked(sonner).mockClear();
    await clickCardReplace(PLAIN_RESULT);

    await waitFor(() => expect(sonner).toHaveBeenCalledWith(ONE_ENDED_MESSAGE));
    expect(screen.queryByRole('alertdialog')).toBeNull();
  });

  it('closes the prompt without writing when the project becomes read-only', async () => {
    const user = await clickCardReplace(WHOLE_MARKER_RESULT);
    const prompt = await screen.findByRole('alertdialog');
    const confirm = within(prompt).getByRole('button', { name: CONFIRM });

    // A sync, for example, can make the project read-only while the prompt is open.
    act(() => mockIsEditable.set(false));

    await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
    await user.click(confirm);
    expect(replacePdp.replace).not.toHaveBeenCalled();
    // Closing is all it does: the results stay as they were.
    expect(findPdp.beginFindJob).toHaveBeenCalledTimes(1);
  });

  it('reaches the prompt from the toolbar Replace, which acts on the focused result', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const replaceButtons = await renderReplacing(WHOLE_MARKER_RESULT);

    await waitFor(() => expect(replaceButtons[0]).toBeEnabled());
    await user.click(replaceButtons[0]);

    expect(await screen.findByRole('alertdialog')).toBeInTheDocument();
    expect(replacePdp.replace).not.toHaveBeenCalled();
  });

  describe('Replace All', () => {
    const REPLACE_ALL = '%webView_find_replaceAll%';
    // Puts back the `\nd` the one-ended match holds, and adds its closer: no marker is lost, but the
    // replacement closes a style the match only opened.
    const PAIRED_TERM = 'the \\nd LORD\\nd*';
    const ONE_ENDED_RESULT = resultFor('Zzthe Lord', 'Zzthe \\nd Lord');
    const PLAIN_RANGE = {
      ...PLAIN_RESULT,
      start: { verseRef, offset: 40 },
      end: { verseRef, offset: 47 },
    };

    beforeEach(() => {
      mockReplaceAll.isEnabled = true;
      vi.mocked(sonner).mockClear();
      vi.mocked(papi.notifications.send).mockClear();
    });

    afterEach(() => {
      mockReplaceAll.isEnabled = false;
      findPdp.retrieveFindJobUpdate.mockReset();
      findPdp.retrieveFindJobUpdate.mockImplementation(async () => ({
        jobId: 'job-1',
        status: 'completed',
        percentComplete: 100,
        totalResultsCount: 1,
        nextResults: [resultToFind],
        totalExecutionTimeMs: 1,
      }));
    });

    /** Renders Find in Replace mode on `results` with `replaceTerm`, and clicks Replace All. */
    async function replaceAll(results: Array<ReturnType<typeof resultFor>>, replaceTerm: string) {
      findPdp.retrieveFindJobUpdate.mockImplementation(async () => ({
        jobId: 'job-1',
        status: 'completed',
        percentComplete: 100,
        totalResultsCount: results.length,
        nextResults: results,
        totalExecutionTimeMs: 1,
      }));
      const user = userEvent.setup({ pointerEventsCheck: 0 });
      await renderReplacing(results[0], { findReplaceTerm: replaceTerm });
      const replaceAllButton = await screen.findByRole('button', { name: REPLACE_ALL });
      await waitFor(() => expect(replaceAllButton).toBeEnabled());
      await user.click(replaceAllButton);
    }

    it('skips a result whose replacement would leave one end of a pair, and writes the rest', async () => {
      await replaceAll([ONE_ENDED_RESULT, PLAIN_RANGE], PAIRED_TERM);

      await waitFor(() => expect(replacePdp.replace).toHaveBeenCalledTimes(1));
      expect(replacePdp.replace).toHaveBeenCalledWith(
        [{ start: PLAIN_RANGE.start, end: PLAIN_RANGE.end }],
        PAIRED_TERM,
        [PLAIN_RANGE.matchedUsfm],
      );
    });

    it('skips a result a single Replace would ask about, since Replace All never asks', async () => {
      await replaceAll([WHOLE_MARKER_RESULT, PLAIN_RANGE], 'X');

      await waitFor(() => expect(replacePdp.replace).toHaveBeenCalledTimes(1));
      expect(replacePdp.replace).toHaveBeenCalledWith(
        [{ start: PLAIN_RANGE.start, end: PLAIN_RANGE.end }],
        'X',
        [PLAIN_RANGE.matchedUsfm],
      );
    });

    it('writes nothing when its only result would leave one end of a pair', async () => {
      await replaceAll([ONE_ENDED_RESULT], PAIRED_TERM);

      await waitFor(() =>
        expect(sonner).toHaveBeenCalledWith('%webView_find_replace_skippedAllOneResult_2%'),
      );
      expect(replacePdp.replace).not.toHaveBeenCalled();
    });

    it('says why when replace() refuses one end of a pair, rather than reporting a failure', async () => {
      // Text that changed after the search can reach replace() looking different from the result.
      replacePdp.replace.mockRejectedValueOnce(new Error(ONE_ENDED_MARKER_ERROR));
      await replaceAll([PLAIN_RESULT], 'X');

      await waitFor(() =>
        expect(sonner).toHaveBeenCalledWith('%webView_find_replace_oneEndedMarkerError%'),
      );
      expect(papi.notifications.send).not.toHaveBeenCalled();
    });
  });

  it('reaches the prompt from Enter on the selected card', async () => {
    const replaceButtons = await renderReplacing(WHOLE_MARKER_RESULT);
    // The toolbar Replace enables once the card is selected, which is what arms the card's keys.
    await waitFor(() => expect(replaceButtons[0]).toBeEnabled());

    fireEvent.keyDown(screen.getAllByText('ZzSecond', { exact: false })[0], { key: 'Enter' });

    expect(await screen.findByRole('alertdialog')).toBeInTheDocument();
    expect(replacePdp.replace).not.toHaveBeenCalled();
  });
});
