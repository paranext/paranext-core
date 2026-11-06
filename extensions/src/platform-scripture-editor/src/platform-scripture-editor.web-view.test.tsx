// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { newPlatformError } from 'platform-bible-utils';
import { EMPTY_CHAPTER_VIEW_KEYS } from './empty-chapter-view.const';

// ---------------------------------------------------------------------------
// Hoisted mocks — must be before any import that touches the component
// ---------------------------------------------------------------------------

const UNSUPPORTED_KEY = '%project_unsupported_studyBibleAdditions%';
const UNSUPPORTED_SENTENCE = "Study Bible Additions projects aren't supported yet.";
const GENERIC_KEY = '%project_unsupported_generic%';
const GENERIC_SENTENCE = "This project can't be opened.";
const PROJECT_ID = 'PROJECT1';

const {
  mockUseProjectData,
  mockUseLocalizedStrings,
  mockNotifyEditActionBlocked,
  chapterUsjValue,
  editorHandle,
  projectDataProviders,
  projectSettings,
  loadingProjectSettings,
  chapterUsjFor,
  chapterUsjSave,
  notificationsSend,
  editorProps,
} = vi.hoisted(() => {
  /** An empty, typed slot a test fills in. */
  const slot = <T,>(): { current: T | undefined } => ({ current: undefined });
  return {
    mockUseProjectData: vi.fn(),
    mockUseLocalizedStrings: vi.fn(),
    mockNotifyEditActionBlocked: vi.fn(),
    /** What the chapter subscription delivers instead of its default, when set. */
    chapterUsjValue: { current: undefined as unknown },
    /** What the stubbed editor exposes through its ref; nothing, as an unmounted editor, by default. */
    editorHandle: { current: undefined as unknown },
    /**
     * The project data providers `useProjectDataProvider` answers, by name; any other is
     * unavailable. Each must keep its identity across renders, or the web view refetches on every
     * render.
     */
    projectDataProviders: new Map<string, unknown>(),
    /** Project settings that read as something other than their default, by key. */
    projectSettings: new Map<string, unknown>(),
    /** Project settings whose read is still pending, by key; they read as their default meanwhile. */
    loadingProjectSettings: new Set<string>(),
    /**
     * When set, what the chapter subscription delivers for a chapter number, and whether it is
     * still loading; takes precedence over {@link chapterUsjValue}.
     */
    chapterUsjFor: slot<(chapterNum: number) => [unknown, boolean]>(),
    /** When set, the chapter subscription's setter: called with the chapter number and the USJ. */
    chapterUsjSave: slot<(chapterNum: number, usj: unknown) => unknown>(),
    notificationsSend: vi.fn(() => Promise.resolve('notification-id')),
    /** The props the stubbed editor was last rendered with. */
    editorProps: slot<Record<string, unknown>>(),
  };
});

/** What each key localizes to by default; any other key echoes itself, as an unresolved one does. */
const TRANSLATIONS: Record<string, string> = {
  [UNSUPPORTED_KEY]: UNSUPPORTED_SENTENCE,
  [GENERIC_KEY]: GENERIC_SENTENCE,
};

/** `useLocalizedStrings` resolving every key through `translations`, settled. */
function localizeWith(translations: Record<string, string>) {
  return (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, translations[key] ?? key])),
    false,
  ];
}

/**
 * Stands in for the data-type-keyed hook objects `useProjectData` and `useData` return: every data
 * type answers with the default value its caller passed, settled and not loading, except that
 * `ChapterUSJ` answers with {@link chapterUsjValue} when one is set.
 */
function dataHooks() {
  return new Proxy(
    {},
    {
      get: (_target, dataType) => (selector: unknown, defaultValue: unknown) => {
        if (dataType === 'ChapterUSJ' && chapterUsjFor.current) {
          // The real selector carries `chapterNum`; the chapter hooks are the only ones read here.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const { chapterNum } = selector as { chapterNum: number };
          const [value, isLoading] = chapterUsjFor.current(chapterNum);
          return [value, chapterSetter(chapterNum), isLoading];
        }
        return [
          dataType === 'ChapterUSJ' && chapterUsjValue.current !== undefined
            ? chapterUsjValue.current
            : defaultValue,
          vi.fn(),
          false,
        ];
      },
    },
  );
}

/** One setter per chapter, kept across renders as the real hook keeps it, bound to its chapter. */
const chapterSetters = new Map<number, (usj: unknown) => unknown>();
function chapterSetter(chapterNum: number) {
  let setter = chapterSetters.get(chapterNum);
  if (!setter) {
    setter = (usj: unknown) => chapterUsjSave.current?.(chapterNum, usj);
    chapterSetters.set(chapterNum, setter);
  }
  return setter;
}

vi.mock('@papi/frontend', () => {
  // Any service the editor reaches for answers every call with a settled promise, so its effects run
  // without a backend. `then` is left undefined so the stand-in is never mistaken for a promise.
  const service: unknown = new Proxy(() => Promise.resolve(undefined), {
    get: (_target, property) => {
      if (property === 'then') return undefined;
      if (property === 'notifications')
        return new Proxy(
          {},
          { get: (_t, method) => (method === 'send' ? notificationsSend : service) },
        );
      return service;
    },
  });
  return {
    default: service,
    logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
  };
});

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: (keys: string[]) => mockUseLocalizedStrings(keys),
  useProjectData: (...args: unknown[]) => {
    mockUseProjectData(...args);
    return dataHooks();
  },
  useData: () => dataHooks(),
  useProjectDataProvider: (providerName: string) => projectDataProviders.get(providerName),
  useProjectSetting: (_projectId: unknown, key: string, defaultValue: unknown) => [
    projectSettings.has(key) ? projectSettings.get(key) : defaultValue,
    vi.fn(),
    vi.fn(),
    loadingProjectSettings.has(key),
  ],
  useSetting: (_key: unknown, defaultValue: unknown) => [defaultValue, vi.fn(), vi.fn(), false],
  useRecentScriptureRefs: () => ({ recentScriptureRefs: [], addRecentScriptureRef: vi.fn() }),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    // The real hook builds an IntersectionObserver, which jsdom does not implement.
    useViewVisibility: () => true,
  };
});

// Stub the editor so jsdom never needs to render it; everything else in the package stays real.
vi.mock('@eten-tech-foundation/platform-editor', async (importOriginal) => {
  const original = await importOriginal<typeof import('@eten-tech-foundation/platform-editor')>();
  return {
    ...original,
    Editorial: React.forwardRef((props: Record<string, unknown>, ref) => {
      editorProps.current = props;
      React.useImperativeHandle(ref, () => editorHandle.current);
      return <div data-testid="editorial" tabIndex={-1} />;
    }),
  };
});

vi.mock('./editor-side-effects.utils', async (importOriginal) => {
  const original = await importOriginal<typeof import('./editor-side-effects.utils')>();
  return { ...original, notifyEditActionBlocked: mockNotifyEditActionBlocked };
});

// ---------------------------------------------------------------------------
// Import the component AFTER all mocks are set up.
// The file assigns to globalThis.webViewComponent as its side effect.
// ---------------------------------------------------------------------------
// Must follow vi.mock() calls so the side effect runs against the mock boundaries above.
// Vitest's hoisting ensures execution order is correct regardless of static position.
// eslint-disable-next-line import/first
import './platform-scripture-editor.web-view';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * WebViewProps for an editor tab on chapter 1 of `book` whose saved state carries
 * `unsupportedReason`, plus any other saved `state`. A key it does not carry reads as its default.
 */
function makeProps(
  unsupportedReason: string,
  state: Record<string, unknown> = {},
  book = 'GEN',
): WebViewProps {
  // The object literal only provides the minimum props needed for testing — the double cast
  // avoids satisfying every optional field of WebViewProps.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    id: 'editor-web-view-id',
    projectId: PROJECT_ID,
    title: 'Project',
    updateWebViewDefinition: vi.fn(),
    useWebViewState: vi.fn(
      // useWebViewState is generic (key → TState) but mocks can't express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key: string, defaultValue: any): [any, (val: any) => void, () => void] => {
        if (key === 'unsupportedReason') return [unsupportedReason, vi.fn(), vi.fn()];
        if (key in state) return [state[key], vi.fn(), vi.fn()];
        return [defaultValue, vi.fn(), vi.fn()];
      },
    ),
    useWebViewScrollGroupScrRef: vi.fn(() => [
      { book, chapterNum: 1, verseNum: 1, versificationStr: 'English' },
      vi.fn(),
      undefined,
      vi.fn(),
    ]),
  } as unknown as WebViewProps;
}

/** Reads the component set by the web view file's side effect. */
function getEditorWebView(): React.ComponentType<WebViewProps> {
  // globalThis is a special interface; cast to Record<string, unknown> to access a property added at runtime.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>)
    .webViewComponent as React.ComponentType<WebViewProps>;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  mockUseProjectData.mockClear();
  mockNotifyEditActionBlocked.mockClear();
  chapterUsjValue.current = undefined;
  chapterUsjFor.current = undefined;
  chapterUsjSave.current = undefined;
  chapterSetters.clear();
  notificationsSend.mockClear();
  editorProps.current = undefined;
  editorHandle.current = undefined;
  projectDataProviders.clear();
  projectSettings.clear();
  loadingProjectSettings.clear();
  mockUseLocalizedStrings.mockReset();
  mockUseLocalizedStrings.mockImplementation(localizeWith(TRANSLATIONS));
  // The web view host supplies this global; the editor reads its persisted view type through it.
  vi.stubGlobal('getWebViewState', (_key: string, defaultValue: unknown) => defaultValue);
  // jsdom has no ResizeObserver, and the editor's resizable footnotes pane constructs one.
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    },
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Scripture editor web view entry point', () => {
  it('shows why the project cannot be opened, and never asks for its text', () => {
    const EditorWebView = getEditorWebView();

    render(<EditorWebView {...makeProps(UNSUPPORTED_KEY)} />);

    expect(screen.getByText(UNSUPPORTED_SENTENCE)).toBeInTheDocument();
    expect(mockUseProjectData).not.toHaveBeenCalled();
  });

  it('opens the editor for a project with no reason', async () => {
    const EditorWebView = getEditorWebView();

    // The mounted editor's effects resolve their mocked PAPI calls and set state; letting them
    // settle inside `act` keeps those updates from landing outside it.
    await act(async () => {
      render(<EditorWebView {...makeProps('')} />);
    });

    expect(mockUseProjectData).toHaveBeenCalledWith('platformScripture.USJ_Chapter', PROJECT_ID);
    expect(screen.queryByText(UNSUPPORTED_SENTENCE)).not.toBeInTheDocument();
  });

  it('shows neither the editor nor a raw key while the reason is being localized', () => {
    mockUseLocalizedStrings.mockImplementation((keys: string[]) => [
      Object.fromEntries(keys.map((key) => [key, key])),
      true,
    ]);
    const EditorWebView = getEditorWebView();

    const { container } = render(<EditorWebView {...makeProps(UNSUPPORTED_KEY)} />);

    expect(mockUseProjectData).not.toHaveBeenCalled();
    expect(container.textContent).not.toContain('%');
    // Positive control: the loading spinner rendered, so the empty text is not vacuous.
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows the generic reason when the reason has no translation', () => {
    mockUseLocalizedStrings.mockImplementation(localizeWith({ [GENERIC_KEY]: GENERIC_SENTENCE }));
    const EditorWebView = getEditorWebView();

    const { container } = render(<EditorWebView {...makeProps(UNSUPPORTED_KEY)} />);

    expect(screen.getByText(GENERIC_SENTENCE)).toBeInTheDocument();
    expect(container.textContent).not.toContain('%');
  });

  it('shows English text when nothing about the reason can be localized', () => {
    mockUseLocalizedStrings.mockImplementation(localizeWith({}));
    const EditorWebView = getEditorWebView();

    const { container } = render(<EditorWebView {...makeProps(UNSUPPORTED_KEY)} />);

    expect(screen.getByText(GENERIC_SENTENCE)).toBeInTheDocument();
    expect(container.textContent).not.toContain('%');
  });

  it('shows the generic reason for a saved value that is not a localize key', () => {
    const EditorWebView = getEditorWebView();

    render(<EditorWebView {...makeProps('not a key')} />);

    expect(screen.getByText(GENERIC_SENTENCE)).toBeInTheDocument();
    expect(screen.queryByText('not a key')).not.toBeInTheDocument();
  });
});

describe('Scripture editor when the backend refuses the project', () => {
  /** The chapter read's failure as the C# refusal delivers it over JSON-RPC. */
  const REFUSAL = newPlatformError(
    new Error(
      `JSON-RPC Request error (-32000): Project '${PROJECT_ID}' can't be opened in Platform.Bible: ${UNSUPPORTED_KEY} (PROJECT_OPEN_BLOCKED)`,
    ),
  );

  it('shows the reason instead of loading forever when the tab has no reason saved', async () => {
    chapterUsjValue.current = REFUSAL;
    const EditorWebView = getEditorWebView();

    await act(async () => {
      render(<EditorWebView {...makeProps('')} />);
    });

    // Positive control: the editor asked for the text, so the refusal is what it got back.
    expect(mockUseProjectData).toHaveBeenCalledWith('platformScripture.USJ_Chapter', PROJECT_ID);
    expect(screen.getByTestId('unsupported-project-message')).toHaveTextContent(
      UNSUPPORTED_SENTENCE,
    );
  });

  it('keeps loading for any other failure', async () => {
    chapterUsjValue.current = newPlatformError(new Error('Something else went wrong'));
    const EditorWebView = getEditorWebView();

    await act(async () => {
      render(<EditorWebView {...makeProps('')} />);
    });

    expect(mockUseProjectData).toHaveBeenCalledWith('platformScripture.USJ_Chapter', PROJECT_ID);
    expect(screen.queryByTestId('unsupported-project-message')).not.toBeInTheDocument();
  });
});

describe('Scripture editor "Add chapter number" on an empty book', () => {
  const ADD_CHAPTER_NUMBER_KEY = EMPTY_CHAPTER_VIEW_KEYS.ADD_CHAPTER_NUMBER_BUTTON_KEY;

  /**
   * An editor whose `insertFirstChapter` answers `isInserted`. Every other method the web view
   * reaches for is a no-op, so its effects run as they would against an editor showing nothing.
   */
  function makeEditorHandle(isInserted: boolean) {
    const insertFirstChapter = vi.fn(() => isInserted);
    const handle: unknown = new Proxy(
      {},
      {
        get: (_target, property) =>
          property === 'insertFirstChapter' ? insertFirstChapter : vi.fn(),
      },
    );
    editorHandle.current = handle;
    return insertFirstChapter;
  }

  /** Opens chapter 1 of `book`, which holds only its `\id` line. */
  async function renderEmptyBook(book: string) {
    chapterUsjValue.current = {
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'book', marker: 'id', code: book }],
    };
    projectDataProviders.set('platformScripture.Versification', {
      getFinalVerseNumbersInBook: async () => [0, 31],
    });
    const EditorWebView = getEditorWebView();
    await act(async () => {
      render(<EditorWebView {...makeProps('', { isReadOnly: false }, book)} />);
    });
  }

  async function renderEmptyGenesis() {
    await renderEmptyBook('GEN');
    return screen.getByRole('button', { name: ADD_CHAPTER_NUMBER_KEY });
  }

  it('tells the user when the editor refuses the chapter, and accepts another click', async () => {
    const insertFirstChapter = makeEditorHandle(false);
    const button = await renderEmptyGenesis();

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockNotifyEditActionBlocked).toHaveBeenCalledTimes(2);
    // A refused insert must not leave the click marked in flight, or the second would be ignored.
    expect(insertFirstChapter).toHaveBeenCalledTimes(2);
  });

  it('ignores a second click while the first insert is on its way to the saved chapter', async () => {
    const insertFirstChapter = makeEditorHandle(true);
    const button = await renderEmptyGenesis();

    fireEvent.click(button);
    fireEvent.click(button);

    expect(insertFirstChapter).toHaveBeenCalledTimes(1);
    expect(insertFirstChapter).toHaveBeenCalledWith(31);
    expect(mockNotifyEditActionBlocked).not.toHaveBeenCalled();
  });

  it('offers no chapter number in a peripheral book, which never holds chapters', async () => {
    // The versification gives a peripheral book chapters and verses, so only the book stops it.
    await renderEmptyBook('FRT');

    // Positive control: the empty-chapter view is up, so the missing button is not vacuous.
    expect(screen.getByText(EMPTY_CHAPTER_VIEW_KEYS.MESSAGE_KEY)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: ADD_CHAPTER_NUMBER_KEY })).not.toBeInTheDocument();
  });

  /** Turns the administrator's team lock on, for a user who may or may not lift it. */
  function lockForTeam(canUserLiftLock: boolean) {
    projectSettings.set('platformScripture.structureProtected', true);
    projectDataProviders.set('platformScripture.textConnectionSettings', {
      canUserWriteProjectTextConnectionSettings: async () => canUserLiftLock,
    });
  }

  it("keeps chapter 1 from being added under an administrator's team lock", async () => {
    lockForTeam(false);
    const insertFirstChapter = makeEditorHandle(true);
    const button = await renderEmptyGenesis();

    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(insertFirstChapter).not.toHaveBeenCalled();
  });

  it('lets an administrator who can lift the team lock add chapter 1 under it', async () => {
    lockForTeam(true);
    const insertFirstChapter = makeEditorHandle(true);
    const button = await renderEmptyGenesis();

    fireEvent.click(button);

    expect(insertFirstChapter).toHaveBeenCalledWith(31);
  });
});

describe('Scripture editor footnotes pane while the chapter is held back from the editor', () => {
  const ALLOW_INVISIBLE_KEY = 'platformScripture.allowInvisibleCharacters';

  /** A chapter with one footnote. */
  const chapterWithFootnote = {
    type: 'USJ',
    version: '3.1',
    content: [
      { type: 'book', marker: 'id', code: 'GEN' },
      { type: 'chapter', marker: 'c', number: '1' },
      {
        type: 'para',
        marker: 'p',
        content: [
          { type: 'verse', marker: 'v', number: '1' },
          'In the beginning',
          { type: 'note', marker: 'f', caller: '+', content: ['A footnote text'] },
        ],
      },
    ],
  };

  async function renderWithPaneOpen() {
    chapterUsjValue.current = chapterWithFootnote;
    const EditorWebView = getEditorWebView();
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(
        <EditorWebView {...makeProps('', { footnotesPaneVisible: true, isReadOnly: false })} />,
      );
    });
    return result;
  }

  it('lists no footnotes beside the spinner until the setting is read', async () => {
    loadingProjectSettings.add(ALLOW_INVISIBLE_KEY);

    await renderWithPaneOpen();

    // The editor is not mounted yet, so a row listed here could not be opened for editing.
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('lists the footnotes once the setting is read', async () => {
    await renderWithPaneOpen();

    // Positive control: the same chapter and pane list its footnote when nothing is held back.
    expect(screen.getByTestId('editorial')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(1);
  });
});

describe('Scripture editor while the invisible-characters setting cannot be read', () => {
  const ALLOW_INVISIBLE_KEY = 'platformScripture.allowInvisibleCharacters';
  const BANNER_KEY = '%webView_platformScriptureEditor_settingUnreadable_withheld_banner%';

  const chapterWithFootnote = {
    type: 'USJ',
    version: '3.1',
    content: [
      { type: 'book', marker: 'id', code: 'GEN' },
      { type: 'chapter', marker: 'c', number: '1' },
      {
        type: 'para',
        marker: 'p',
        content: [
          { type: 'verse', marker: 'v', number: '1' },
          'a~b',
          { type: 'note', marker: 'f', caller: '+', content: ['A footnote text'] },
        ],
      },
    ],
  };

  const EditorWebView = getEditorWebView();
  /** A new element each time, so a rerender is not skipped for identical props. */
  const webViewElement = () => (
    <EditorWebView {...makeProps('', { footnotesPaneVisible: true, isReadOnly: false })} />
  );

  it('shows the banner and no editor or footnote rows, then mounts the editor once it is read', async () => {
    chapterUsjValue.current = chapterWithFootnote;
    projectSettings.set(ALLOW_INVISIBLE_KEY, newPlatformError('project unavailable'));
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(webViewElement());
    });

    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(BANNER_KEY);
    expect(screen.queryByRole('option')).not.toBeInTheDocument();

    projectSettings.set(ALLOW_INVISIBLE_KEY, true);
    await act(async () => {
      result?.rerender(webViewElement());
    });

    expect(screen.getByTestId('editorial')).toBeInTheDocument();
    expect(screen.queryByText(BANNER_KEY)).not.toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(1);
  });
});

describe('Scripture editor when its latest edits cannot be saved', () => {
  const HELD_EDITS_LOST_KEY = '%webView_platformScriptureEditor_error_heldEditsLost_format%';
  const EDITS_REPLACED_KEY = '%webView_platformScriptureEditor_error_editsReplacedByUpdate_format%';
  /** Longer than the editor's save debounce, so a pending save has fired after it. */
  const LONGER_THAN_SAVE_DEBOUNCE_MS = 800;

  function chapterText(chapterNum: number, text: string) {
    return {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'book', marker: 'id', code: 'GEN' },
        { type: 'chapter', marker: 'c', number: `${chapterNum}` },
        { type: 'para', marker: 'p', content: [{ type: 'verse', marker: 'v', number: '1' }, text] },
      ],
    };
  }

  /** The text of verse 1 in a chapter built by {@link chapterText}. */
  function verseText(usj: unknown) {
    return JSON.stringify(usj ?? '').match(/"number":"1"\},"([^"]*)"/)?.[1];
  }

  /**
   * Opens GEN 1 in an unfocused editor whose saves stay in flight until the test finishes them.
   * `delivered` holds each chapter the backend has delivered; while the selected chapter is not
   * there yet, the subscription goes on delivering the last chapter it had, as the real data hook
   * does while the next one loads.
   */
  async function setUp() {
    mockUseLocalizedStrings.mockImplementation(
      localizeWith({
        ...TRANSLATIONS,
        [HELD_EDITS_LOST_KEY]: 'Not saved: {book} {chapter}',
        [EDITS_REPLACED_KEY]: 'Changed outside: {book} {chapter}',
      }),
    );
    vi.mocked(logger.warn).mockClear();
    vi.mocked(logger.debug).mockClear();

    const scrRef = { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' };
    const delivered = new Map<number, unknown>([[1, chapterText(1, 'In the beginning')]]);
    let lastDelivered = delivered.get(1);
    chapterUsjFor.current = (chapterNum) => {
      const usj = delivered.get(chapterNum);
      if (usj === undefined) return [lastDelivered, true];
      lastDelivered = usj;
      return [usj, false];
    };

    const saves: { chapterNum: number; usj: unknown; finish: (result: boolean) => void }[] = [];
    chapterUsjSave.current = (chapterNum, usj) =>
      new Promise<boolean>((resolve) => {
        saves.push({ chapterNum, usj, finish: resolve });
      });

    let editorUsj: unknown;
    editorHandle.current = new Proxy(
      {},
      {
        get: (_target, property) => {
          if (property === 'getUsj') return () => editorUsj;
          if (property === 'setUsj')
            return (usj: unknown) => {
              editorUsj = usj;
            };
          if (property === 'isFocused') return () => false;
          return vi.fn();
        },
      },
    );

    const props = makeProps('', { isReadOnly: false });
    vi.mocked(props.useWebViewScrollGroupScrRef).mockImplementation(() => [
      { ...scrRef },
      vi.fn(),
      undefined,
      vi.fn(),
    ]);
    const EditorWebView = getEditorWebView();
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(<EditorWebView {...props} />);
    });
    const rerender = async () => {
      await act(async () => {
        result?.rerender(<EditorWebView {...props} />);
      });
    };

    return {
      saves,
      delivered,
      unmount: () => result?.unmount(),
      /** The user's edit to verse 1 of GEN 1, as the editor reports it. */
      type: (text: string) => {
        act(() => {
          editorUsj = chapterText(1, text);
          // The stubbed editor hands its props through; `onUsjChange` is the web view's handler.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const onUsjChange = editorProps.current?.onUsjChange as (
            usj: unknown,
            ops: unknown[],
            source: string,
          ) => void;
          onUsjChange(editorUsj, [], 'local');
        });
      },
      blurWindow: () => {
        act(() => {
          window.dispatchEvent(new Event('blur'));
        });
      },
      goToChapter: async (chapterNum: number) => {
        scrRef.chapterNum = chapterNum;
        await rerender();
      },
      deliver: async (chapterNum: number, usj: unknown) => {
        delivered.set(chapterNum, usj);
        await rerender();
      },
      /** Lets a save in flight come back, and the editor act on its result. */
      finishSave: async (index: number) => {
        await act(async () => {
          saves[index].finish(true);
        });
      },
    };
  }

  /** The notifications sent that tell the user their latest edits were not saved. */
  function lostEditsNotices() {
    return notificationsSend.mock.calls
      .map((call: unknown[]) => call[0])
      .filter(
        (notice) =>
          notice instanceof Object &&
          'message' in notice &&
          typeof notice.message === 'string' &&
          /^(Not saved|Changed outside):/.test(notice.message),
      );
  }

  function lostEditsWarnings() {
    return vi
      .mocked(logger.warn)
      .mock.calls.filter(([message]) =>
        String(message).includes('before its latest edits were saved'),
      );
  }

  /** Types in GEN 1 and sends it, then types more, which is held back behind that save. */
  async function holdBackEditsBehindARunningSave(editor: Awaited<ReturnType<typeof setUp>>) {
    editor.type('In the beginning God');
    editor.blurWindow();
    editor.type('In the beginning God created');
    editor.blurWindow();
    // Positive controls: one save is in flight, and the second was held back behind it.
    expect(editor.saves).toHaveLength(1);
    expect(vi.mocked(logger.debug)).toHaveBeenCalledWith(
      expect.stringContaining('waiting for the save of GEN|1|'),
    );
  }

  it('says nothing about a held-back save while the editor stays on the chapter, and sends it once the running save comes back', async () => {
    const editor = await setUp();
    await holdBackEditsBehindARunningSave(editor);

    await editor.finishSave(0);
    // The running save's update: what it sent, back from the backend.
    await editor.deliver(1, chapterText(1, 'In the beginning God'));

    expect(editor.saves).toHaveLength(2);
    expect(verseText(editor.saves[1].usj)).toBe('In the beginning God created');
    expect(lostEditsWarnings()).toHaveLength(0);
    expect(lostEditsNotices()).toHaveLength(0);
  });

  it('reports nothing on leaving the chapter once the held-back edits have been sent', async () => {
    const editor = await setUp();
    await holdBackEditsBehindARunningSave(editor);
    await editor.finishSave(0);
    await editor.deliver(1, chapterText(1, 'In the beginning God'));
    expect(editor.saves).toHaveLength(2);

    await editor.goToChapter(2);
    await editor.deliver(2, chapterText(2, 'Thus the heavens'));

    expect(lostEditsWarnings()).toHaveLength(0);
    expect(lostEditsNotices()).toHaveLength(0);
  });

  it('warns and notifies once, naming the chapter, when the editor leaves it with edits held back', async () => {
    const editor = await setUp();
    await holdBackEditsBehindARunningSave(editor);

    await editor.goToChapter(2);
    await editor.deliver(2, chapterText(2, 'Thus the heavens'));
    editor.unmount();

    expect(lostEditsWarnings()).toHaveLength(1);
    expect(lostEditsNotices()).toEqual([
      expect.objectContaining({ message: 'Not saved: GEN 1', webViewId: 'editor-web-view-id' }),
    ]);
  });

  it('notifies once, outside the closing editor, when the page goes away with edits held back', async () => {
    const editor = await setUp();
    await holdBackEditsBehindARunningSave(editor);

    act(() => {
      window.dispatchEvent(new Event('pagehide'));
    });
    // The page's teardown unmounts the editor after `pagehide`; that must not report again.
    editor.unmount();

    expect(lostEditsWarnings()).toHaveLength(1);
    expect(lostEditsNotices()).toEqual([
      expect.objectContaining({ message: 'Not saved: GEN 1', webViewId: undefined }),
    ]);
  });

  it('sends waiting edits as soon as focus leaves the editor for another control in its web view', async () => {
    const editor = await setUp();
    const editorElement = screen.getByTestId('editorial');
    const outside = document.createElement('button');
    document.body.append(outside);
    editor.type('In the beginning God');

    // Control: focus moving within the editor's own area sends nothing yet.
    fireEvent.focusOut(editorElement, { relatedTarget: editorElement.parentElement });
    expect(editor.saves).toHaveLength(0);

    fireEvent.focusOut(editorElement, { relatedTarget: outside });

    expect(editor.saves).toHaveLength(1);
    expect(verseText(editor.saves[0].usj)).toBe('In the beginning God');
  });

  it('throws waiting edits away, saying the chapter was changed outside, when an update arrives without the claim', async () => {
    const editor = await setUp();
    editor.type('In the beginning God');

    // An unfocused editor has no claim, so this change made outside it replaces the editor.
    await editor.deliver(1, chapterText(1, 'In the beginning, Find replaced this'));
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, LONGER_THAN_SAVE_DEBOUNCE_MS);
      });
    });

    expect(editor.saves).toHaveLength(0);
    expect(lostEditsNotices()).toEqual([
      expect.objectContaining({ message: 'Changed outside: GEN 1' }),
    ]);
  });

  // The editor holds off typing, pasting and the like while the next chapter loads, but an edit
  // that does not come through its own keyboard, such as one from the footnotes pane, still lands.
  it('reports an edit that reaches the chapter being left while the next one loads', async () => {
    const editor = await setUp();
    await editor.goToChapter(2);
    editor.type('In the beginning God');

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, LONGER_THAN_SAVE_DEBOUNCE_MS);
      });
    });
    await editor.deliver(2, chapterText(2, 'Thus the heavens'));

    expect(editor.saves).toHaveLength(0);
    expect(lostEditsNotices()).toEqual([expect.objectContaining({ message: 'Not saved: GEN 1' })]);
  });
});
