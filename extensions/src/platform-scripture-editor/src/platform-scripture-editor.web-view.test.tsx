// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';
import { newPlatformError, RESOURCE_EXHAUSTED } from 'platform-bible-utils';
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
  appSettings,
  mockGetLocalizedStrings,
  toolbarProps,
  webViewMenu,
  mockContextKeysSet,
  captureSelectionHandler,
  mockShowContextMenu,
  mockDismissContextMenu,
  mockSendCommand,
  editorialOptions,
  mockLoggerDebug,
} = vi.hoisted(() => ({
  mockUseProjectData: vi.fn(),
  mockUseLocalizedStrings: vi.fn(),
  mockNotifyEditActionBlocked: vi.fn(),
  /** What the chapter subscription delivers instead of its default, when set. */
  chapterUsjValue: { current: undefined as unknown },
  /** What the stubbed editor exposes through its ref; nothing, as an unmounted editor, by default. */
  editorHandle: { current: undefined as unknown },
  /**
   * The project data providers `useProjectDataProvider` answers, by name; any other is unavailable.
   * Each must keep its identity across renders, or the web view refetches on every render.
   */
  projectDataProviders: new Map<string, unknown>(),
  /** Project settings that read as something other than their default, by key. */
  projectSettings: new Map<string, unknown>(),
  /** Project settings whose read is still pending, by key; they read as their default meanwhile. */
  loadingProjectSettings: new Set<string>(),
  /** User settings that read as something other than their default, by key. */
  appSettings: new Map<string, unknown>(),
  /** Answers the localization service's `getLocalizedStrings` (used for the tab title). */
  mockGetLocalizedStrings: vi.fn(),
  /** The menu the toolbar was last rendered with. */
  toolbarProps: { current: undefined as unknown },
  /** What the web view menu subscription delivers instead of its default, when set. */
  webViewMenu: { current: undefined as unknown },
  mockContextKeysSet: vi.fn(),
  /** Receives the `onSelectionChange` the stubbed editor was last rendered with. */
  captureSelectionHandler: vi.fn<(handler: unknown) => void>(),
  /** Stands in for `papi.overlays.showContextMenu`. */
  mockShowContextMenu: vi.fn(),
  /** Stands in for `papi.overlays.dismissContextMenu`. */
  mockDismissContextMenu: vi.fn(),
  /** Stands in for `papi.commands.sendCommand`. */
  mockSendCommand: vi.fn(),
  /** The `options` the stubbed editor was last rendered with. */
  editorialOptions: { current: undefined as unknown },
  /** Stands in for `logger.debug`. */
  mockLoggerDebug: vi.fn(),
}));

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
function dataValueFor(dataType: string | symbol, defaultValue: unknown): unknown {
  if (dataType === 'ChapterUSJ' && chapterUsjValue.current !== undefined) {
    return chapterUsjValue.current;
  }
  if (dataType === 'WebViewMenu' && webViewMenu.current !== undefined) return webViewMenu.current;
  return defaultValue;
}

function dataHooks() {
  return new Proxy(
    {},
    {
      get: (_target, dataType) => (_selector: unknown, defaultValue: unknown) => [
        dataValueFor(dataType, defaultValue),
        vi.fn(),
        false,
      ],
    },
  );
}

vi.mock('@papi/frontend', () => {
  // Any service the editor reaches for answers every call with a settled promise, so its effects run
  // without a backend. `then` is left undefined so the stand-in is never mistaken for a promise.
  const service: unknown = new Proxy(() => Promise.resolve(undefined), {
    get: (_target, property) => (property === 'then' ? undefined : service),
  });
  const papi: unknown = new Proxy(
    {},
    {
      get: (_target, property) => {
        if (property === 'contextKeys') return { set: mockContextKeysSet, remove: vi.fn() };
        if (property === 'localization') {
          return { getLocalizedStrings: mockGetLocalizedStrings };
        }
        if (property === 'overlays') {
          return new Proxy(
            {},
            {
              get: (_overlays, method) => {
                if (method === 'showContextMenu') return mockShowContextMenu;
                if (method === 'dismissContextMenu') return mockDismissContextMenu;
                return service;
              },
            },
          );
        }
        if (property === 'commands') {
          return new Proxy(
            {},
            { get: (_commands, method) => (method === 'sendCommand' ? mockSendCommand : service) },
          );
        }
        return service;
      },
    },
  );
  return {
    default: papi,
    logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: mockLoggerDebug },
  };
});

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: (keys: string[]) => mockUseLocalizedStrings(keys),
  useProjectData: (...args: unknown[]) => {
    mockUseProjectData(...args);
    return dataHooks();
  },
  useData: () => dataHooks(),
  useEvaluatedMenu: (menu: unknown) => menu,
  useProjectDataProvider: (providerName: string) => projectDataProviders.get(providerName),
  useProjectSetting: (_projectId: unknown, key: string, defaultValue: unknown) => [
    projectSettings.has(key) ? projectSettings.get(key) : defaultValue,
    vi.fn(),
    vi.fn(),
    loadingProjectSettings.has(key),
  ],
  useSetting: (key: string, defaultValue: unknown) => [
    appSettings.has(key) ? appSettings.get(key) : defaultValue,
    vi.fn(),
    vi.fn(),
    false,
  ],
  useRecentScriptureRefs: () => ({ recentScriptureRefs: [], addRecentScriptureRef: vi.fn() }),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    // The real hook builds an IntersectionObserver, which jsdom does not implement.
    useViewVisibility: () => true,
    // Wraps the real toolbar so a test can read the menu it was handed.
    TabToolbar: ({ projectMenuData, ...props }: Record<string, unknown>) => {
      toolbarProps.current = projectMenuData;
      return <original.TabToolbar projectMenuData={projectMenuData} {...props} />;
    },
  };
});

// Stub the editor so jsdom never needs to render it; everything else in the package stays real.
vi.mock('@eten-tech-foundation/platform-editor', async (importOriginal) => {
  const original = await importOriginal<typeof import('@eten-tech-foundation/platform-editor')>();
  return {
    ...original,
    Editorial: React.forwardRef((props: Record<string, unknown>, ref) => {
      captureSelectionHandler(props.onSelectionChange);
      editorialOptions.current = props.options;
      React.useImperativeHandle(ref, () => editorHandle.current);
      return (
        <div data-testid="editorial">
          <div className="editor-input" data-testid="editor-input" />
        </div>
      );
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
  chapterNum = 1,
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
      { book, chapterNum, verseNum: 1, versificationStr: 'English' },
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
  editorHandle.current = undefined;
  captureSelectionHandler.mockClear();
  mockContextKeysSet.mockClear();
  editorialOptions.current = undefined;
  mockShowContextMenu.mockReset();
  mockShowContextMenu.mockResolvedValue(undefined);
  mockDismissContextMenu.mockReset();
  mockDismissContextMenu.mockResolvedValue(undefined);
  mockSendCommand.mockReset();
  mockSendCommand.mockResolvedValue(undefined);
  projectDataProviders.clear();
  projectSettings.clear();
  loadingProjectSettings.clear();
  appSettings.clear();
  toolbarProps.current = undefined;
  webViewMenu.current = undefined;
  mockGetLocalizedStrings.mockReset();
  mockGetLocalizedStrings.mockImplementation(async ({ localizeKeys }: { localizeKeys: string[] }) =>
    Object.fromEntries(
      localizeKeys.map((key) => {
        if (key.includes('readonly_indicator')) return [key, '(Read-only)'];
        if (key.includes('editable_indicator')) return [key, '(Editable)'];
        return [key, '{editable} {projectName}'];
      }),
    ),
  );
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
  vi.useRealTimers();
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

const HAS_SELECTION_KEY = 'platformScriptureEditor.webView.editor-web-view-id.hasSelection';
const selectionStart = { jsonPath: '$.content[2].content[1]', offset: 0 };
const selectionRange = { start: selectionStart, end: { ...selectionStart, offset: 5 } };

const chapterWithText = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'GEN' },
    { type: 'chapter', marker: 'c', number: '1' },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '1' }, 'In the beginning'],
    },
  ],
};

/** The values published for the hasSelection key, in order. */
const publishedValues = () =>
  mockContextKeysSet.mock.calls
    .filter(([key]) => key === HAS_SELECTION_KEY)
    .map(([, value]) => value);

describe('Scripture editor hasSelection context key', () => {
  const EditorWebViewUnderTest = getEditorWebView();
  const webViewElement = (chapterNum = 1) => (
    <EditorWebViewUnderTest {...makeProps('', { isReadOnly: false }, 'GEN', chapterNum)} />
  );

  const selectInEditor = async (selection: unknown) => {
    await act(async () => {
      const handler = captureSelectionHandler.mock.lastCall?.[0];
      expect(handler).toBeInstanceOf(Function);
      if (typeof handler === 'function') await handler(selection);
    });
  };

  it('publishes hasSelection true for a selectionRange and keeps it when the editor reports no selection on blur', async () => {
    chapterUsjValue.current = chapterWithText;
    await act(async () => {
      render(webViewElement());
    });
    // Positive control: the key starts false.
    expect(publishedValues()).toEqual([false]);

    await selectInEditor(selectionRange);
    await selectInEditor(undefined);

    expect(publishedValues()).toEqual([false, true]);
  });

  it('publishes hasSelection false when a later selection is a caret, writing only on a flip', async () => {
    chapterUsjValue.current = chapterWithText;
    await act(async () => {
      render(webViewElement());
    });

    await selectInEditor(selectionRange);
    await selectInEditor({ start: selectionStart, end: { ...selectionStart, offset: 7 } });
    await selectInEditor({ start: selectionStart });

    expect(publishedValues()).toEqual([false, true, false]);
  });

  it('publishes hasSelection false after a chapter change', async () => {
    chapterUsjValue.current = chapterWithText;
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(webViewElement(1));
    });
    await selectInEditor(selectionRange);
    expect(publishedValues()).toEqual([false, true]);

    await act(async () => {
      result?.rerender(webViewElement(2));
    });

    expect(publishedValues()).toEqual([false, true, false]);
  });
});

describe('Scripture editor hasSelection context key across a view switch', () => {
  it('publishes hasSelection false after the Scripture view type changes', async () => {
    // Switching between Standard and Formatted view only takes effect in Power mode.
    appSettings.set('platform.interfaceMode', 'power');
    chapterUsjValue.current = chapterWithText;
    const EditorWebView = getEditorWebView();
    const elementFor = (viewType: string) => (
      <EditorWebView {...makeProps('', { isReadOnly: false, viewType })} />
    );
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(elementFor('standard'));
    });
    await act(async () => {
      const handler = captureSelectionHandler.mock.lastCall?.[0];
      expect(handler).toBeInstanceOf(Function);
      if (typeof handler === 'function') await handler(selectionRange);
    });
    expect(publishedValues().at(-1)).toBe(true);

    await act(async () => {
      result?.rerender(elementFor('formatted'));
    });

    expect(publishedValues().at(-1)).toBe(false);
  });
});

describe('Scripture editor resource wiring', () => {
  const TITLE_KEY = '%test_editor_title_format%';

  /** Props for a read-only tab whose saved title format asks for the read-only indicator. */
  const titleProps = () => makeProps('', { isReadOnly: true, unformattedTitle: TITLE_KEY });

  const renderTab = async (props: WebViewProps) => {
    const EditorWebView = getEditorWebView();
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(<EditorWebView {...props} />);
    });
    return result;
  };

  const rerenderTab = async (
    result: ReturnType<typeof render> | undefined,
    props: WebViewProps,
  ) => {
    const EditorWebView = getEditorWebView();
    await act(async () => {
      result?.rerender(<EditorWebView {...props} />);
    });
  };

  it('leaves the tab title alone until the published setting is read, then sets the short name alone', async () => {
    projectSettings.set('platform.name', 'engWEBUS');
    loadingProjectSettings.add('platform.isPublished');
    const props = titleProps();

    const result = await renderTab(props);
    // Positive control: the settled title would be sent were it not held back.
    expect(props.updateWebViewDefinition).not.toHaveBeenCalled();

    loadingProjectSettings.delete('platform.isPublished');
    projectSettings.set('platform.isPublished', true);
    await rerenderTab(result, props);

    expect(props.updateWebViewDefinition).toHaveBeenCalledWith({ title: 'engWEBUS' });
    expect(props.updateWebViewDefinition).toHaveBeenCalledTimes(1);
  });

  it('keeps the read-only indicator in the title of a read-only project', async () => {
    projectSettings.set('platform.name', 'engWEBUS');
    projectSettings.set('platform.isPublished', false);
    const props = titleProps();

    await renderTab(props);

    expect(props.updateWebViewDefinition).toHaveBeenCalledWith({ title: '(Read-only) engWEBUS' });
  });

  beforeEach(() => {
    webViewMenu.current = {
      topMenu: {
        columns: { 'platform.app': { label: 'Project', order: 1 } },
        groups: {},
        items: [],
      },
      includeDefaults: true,
      contextMenu: undefined,
    };
  });

  /** Reads `value[key]` when `value` is an object that has it. */
  const read = (value: unknown, key: string): unknown =>
    value && typeof value === 'object' && key in value
      ? Object.entries(value).find(([k]) => k === key)?.[1]
      : undefined;

  const projectColumnLabel = () =>
    read(read(read(toolbarProps.current, 'columns'), 'platform.app'), 'label');

  it('names the menu heading after the resource short name', async () => {
    projectSettings.set('platform.name', 'engWEBUS');
    projectSettings.set('platform.isPublished', true);

    await renderTab(makeProps('', { isReadOnly: true }));

    expect(projectColumnLabel()).toBe('engWEBUS');
  });

  it('keeps the original menu heading for a project', async () => {
    projectSettings.set('platform.name', 'engWEBUS');
    projectSettings.set('platform.isPublished', false);

    await renderTab(makeProps('', { isReadOnly: true }));

    expect(projectColumnLabel()).toBe('Project');
  });
});

describe('Scripture editor right-click menu', () => {
  const WEB_VIEW_ID = 'editor-web-view-id';
  const COPY = 'platformScriptureEditor.copySelection';
  const ALLOW_INVISIBLE_KEY = 'platformScripture.allowInvisibleCharacters';

  const chapterWithFootnote = {
    ...chapterWithText,
    content: [
      ...chapterWithText.content.slice(0, 2),
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

  type TabOptions = {
    state?: Record<string, unknown>;
    book?: string;
    chapterNum?: number;
    projectId?: string | undefined;
    /** Leaves the chapter undelivered, so the web view shows its loading spinner. */
    isChapterLoading?: boolean;
  };

  const renderEditor = async (initial: TabOptions = {}) => {
    if (!initial.isChapterLoading) chapterUsjValue.current ??= chapterWithText;
    const EditorWebView = getEditorWebView();
    const elementFor = (tab: TabOptions) => {
      const { state = {}, book = 'GEN', chapterNum = 1 } = tab;
      const props = makeProps('', { isReadOnly: false, ...state }, book, chapterNum);
      return (
        <EditorWebView {...props} projectId={'projectId' in tab ? tab.projectId : PROJECT_ID} />
      );
    };
    let result: ReturnType<typeof render> | undefined;
    let current = initial;
    await act(async () => {
      result = render(elementFor(initial));
    });
    return {
      rerender: (change: TabOptions) =>
        act(async () => {
          current = { ...current, ...change };
          result?.rerender(elementFor(current));
        }),
    };
  };

  const rightClick = (target: Element) =>
    act(async () => {
      fireEvent.contextMenu(target, { button: 2, clientX: 10, clientY: 20 });
    });

  /** The editor stub's selection when focus has to create one, as Lexical's `focus()` does. */
  const END_OF_CHAPTER = { start: { jsonPath: '$.content[2]', offset: 99 } };

  /**
   * What the stubbed editor exposes: the named methods record their call into `calls`, and any
   * other method the web view reaches for does nothing. `setLiveSelection` changes what the editor
   * reports as its selection; with `emulateLexicalFocus`, `focus()` puts the caret at the end of
   * the chapter when there is no selection, as the real editor's does.
   */
  const stubEditor = (
    overrides: Record<string, unknown> = {},
    { emulateLexicalFocus = false } = {},
  ) => {
    const calls: string[] = [];
    const getMarkerMenuContext = vi.fn();
    const insertMarker = vi.fn();
    let liveSelection: unknown;
    const record = (name: string) =>
      vi.fn(() => {
        calls.push(name);
      });
    const known: Record<string, unknown> = {
      focus: vi.fn(() => {
        calls.push('focus');
        if (emulateLexicalFocus) liveSelection ??= END_OF_CHAPTER;
      }),
      copy: record('copy'),
      cut: record('cut'),
      paste: record('paste'),
      pastePlainText: record('pastePlainText'),
      isFocused: () => true,
      getSelection: () => liveSelection,
      setSelection: vi.fn((selection: unknown) => {
        calls.push('setSelection');
        liveSelection = selection;
      }),
      getSelectedParaMarker: () => undefined,
      getMarkerMenuContext,
      insertMarker,
      ...overrides,
    };
    editorHandle.current = new Proxy(known, {
      get: (target, property) => {
        if (typeof property !== 'string' || property === 'then') return undefined;
        if (!(property in target)) target[property] = vi.fn();
        return target[property];
      },
    });
    return {
      calls,
      getMarkerMenuContext,
      insertMarker,
      setLiveSelection: (selection: unknown) => {
        liveSelection = selection;
      },
    };
  };

  /** An element inside the main editor's wrapper in every state it shows (the hidden workaround). */
  const wrapperContent = () => {
    const hidden = document.querySelector('button.tw\\:hidden');
    expect(hidden?.parentElement).toBeTruthy();
    return hidden?.parentElement ?? document.body;
  };

  it('stops the editor from showing its own right-click menu', async () => {
    await renderEditor();

    const options = editorialOptions.current;
    expect(options).toMatchObject({ hasBuiltInContextMenu: false });
    expect(options).not.toHaveProperty('contextMenu');
  });

  it('opens the platform menu at the click without running the pick, with the main editor key', async () => {
    stubEditor();
    await renderEditor();

    await rightClick(screen.getByTestId('editorial'));

    expect(mockShowContextMenu).toHaveBeenCalledExactlyOnceWith(
      'platformScriptureEditor.react',
      WEB_VIEW_ID,
      {
        position: { x: 10, y: 20 },
        shouldRunCommand: false,
        contextKeys: {
          'platformScriptureEditor.contextMenu.hasSelection': false,
          'platformScriptureEditor.contextMenu.isMainEditor': true,
        },
      },
    );
  });

  it('reports a selected paragraph marker as a selection', async () => {
    stubEditor({ getSelectedParaMarker: () => ({ marker: 'p' }) });
    await renderEditor();

    await rightClick(screen.getByTestId('editorial'));

    expect(mockShowContextMenu.mock.lastCall?.[2]).toMatchObject({
      contextKeys: { 'platformScriptureEditor.contextMenu.hasSelection': true },
    });
  });

  describe('states that show the text', () => {
    // The menu's own `when` and `enabledWhen` decide its items, so the request is made in each.
    it.each([
      ['read-only', { state: { isReadOnly: true } }],
      ['Preview', { state: { viewType: 'formatted' } }],
    ])('opens the menu in a %s tab', async (_name, tab) => {
      appSettings.set('platform.interfaceMode', 'power');
      stubEditor();
      await renderEditor(tab);

      await rightClick(screen.getByTestId('editorial'));

      expect(mockShowContextMenu).toHaveBeenCalledTimes(1);
    });

    it('opens the menu for a resource', async () => {
      projectSettings.set('platform.isPublished', true);
      stubEditor();
      await renderEditor({ state: { isReadOnly: true } });

      await rightClick(screen.getByTestId('editorial'));

      expect(mockShowContextMenu).toHaveBeenCalledTimes(1);
    });
  });

  describe('states that do not show the text', () => {
    // Every state the wrapper holds besides the text. The panel shown without a project cannot be
    // mounted by this harness (it reads services the mock does not stand in for).
    const expectNoRequestOn = async (target: Element | null) => {
      expect(target).toBeInTheDocument();
      if (target) await rightClick(target);
      expect(mockShowContextMenu).not.toHaveBeenCalled();
    };

    it('serves the same spot when the text is shown (positive control)', async () => {
      stubEditor();
      await renderEditor();

      await rightClick(wrapperContent());

      expect(mockShowContextMenu).toHaveBeenCalledTimes(1);
    });

    it('opens no menu on the spinner shown while the chapter loads', async () => {
      // The default chapter is the loading placeholder, so the editor is not mounted yet.
      await renderEditor({ isChapterLoading: true });
      expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();

      await expectNoRequestOn(document.querySelector('svg.tw\\:animate-spin'));
    });

    it('opens no menu on the banner shown while a setting cannot be read', async () => {
      projectSettings.set(ALLOW_INVISIBLE_KEY, newPlatformError('project unavailable'));
      await renderEditor();
      expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();

      await expectNoRequestOn(screen.getByRole('status'));
    });

    it('opens no menu on the empty-chapter view of a Simple-mode tab', async () => {
      chapterUsjValue.current = {
        ...chapterWithText,
        content: chapterWithText.content.slice(0, 1),
      };
      stubEditor();
      await renderEditor();
      // Positive control: the editor tree is mounted, only hidden behind the empty-chapter view.
      expect(screen.getByTestId('editorial')).toBeInTheDocument();

      await expectNoRequestOn(wrapperContent());
    });

    it('opens the menu on a blank chapter in Power mode, which shows the empty editor', async () => {
      appSettings.set('platform.interfaceMode', 'power');
      chapterUsjValue.current = {
        ...chapterWithText,
        content: chapterWithText.content.slice(0, 1),
      };
      stubEditor();
      await renderEditor();

      await rightClick(wrapperContent());

      expect(mockShowContextMenu).toHaveBeenCalledTimes(1);
    });
  });

  it('opens no menu for a right-click on a header alert', async () => {
    stubEditor();
    await renderEditor({
      state: { decorations: { headers: { 'header-1': { title: '%header_title%' } } } },
    });
    // Positive control: the editor itself is served, so the silence below is not vacuous.
    await rightClick(screen.getByTestId('editorial'));
    expect(mockShowContextMenu).toHaveBeenCalledTimes(1);
    mockShowContextMenu.mockClear();

    const alert = screen.queryByRole('alert');
    expect(alert).toBeInTheDocument();
    if (alert) await rightClick(alert);

    expect(mockShowContextMenu).not.toHaveBeenCalled();
  });

  it('opens no menu for a right-click in the footnotes pane', async () => {
    stubEditor();
    chapterUsjValue.current = chapterWithFootnote;
    await renderEditor({ state: { footnotesPaneVisible: true } });
    // Positive control: the editor itself is served.
    await rightClick(screen.getByTestId('editorial'));
    expect(mockShowContextMenu).toHaveBeenCalledTimes(1);
    mockShowContextMenu.mockClear();

    await rightClick(screen.getAllByRole('option')[0]);

    expect(mockShowContextMenu).not.toHaveBeenCalled();
  });

  describe('a picked clipboard command', () => {
    const SELECTED = { start: { jsonPath: '$.content[2].content[1]', offset: 2 } };

    /** Mounts, captures the caret as focus leaves the editor, then lets the blur drop it. */
    const mountWithCapturedCaret = async (dropSelection: boolean) => {
      const stub = stubEditor({}, { emulateLexicalFocus: true });
      await renderEditor();
      stub.setLiveSelection(SELECTED);
      fireEvent.focusOut(screen.getByTestId('editor-input'));
      if (dropSelection) stub.setLiveSelection(undefined);
      stub.calls.length = 0;
      return stub;
    };

    it('puts back the caret the menu dropped, then focuses, then copies', async () => {
      mockShowContextMenu.mockResolvedValue(COPY);
      const { calls } = await mountWithCapturedCaret(true);

      await rightClick(screen.getByTestId('editorial'));

      expect(calls.slice(0, 3)).toEqual(['setSelection', 'focus', 'copy']);
    });

    it('puts back the caret before Paste as plain text lands', async () => {
      mockShowContextMenu.mockResolvedValue('platformScriptureEditor.pasteAsPlainTextAtSelection');
      const { calls } = await mountWithCapturedCaret(true);

      await rightClick(screen.getByTestId('editorial'));

      expect(calls.slice(0, 3)).toEqual(['setSelection', 'focus', 'pastePlainText']);
    });

    it('restores nothing when the editor still has its selection', async () => {
      mockShowContextMenu.mockResolvedValue(COPY);
      const { calls } = await mountWithCapturedCaret(false);

      await rightClick(screen.getByTestId('editorial'));

      expect(calls.slice(0, 2)).toEqual(['focus', 'copy']);
      expect(calls).not.toContain('setSelection');
    });

    /**
     * Runs the refocus the action schedules for the next frame at once, and records the frame's own
     * `window.focus()`, which focuses the tab without touching the selection.
     */
    const watchFocus = (calls: string[]) => {
      vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
        callback(0);
        return 0;
      });
      vi.stubGlobal(
        'focus',
        vi.fn(() => {
          calls.push('frameFocus');
        }),
      );
    };

    it('never focuses the editor when it has no selection to land on, only the frame', async () => {
      // No caret was ever captured, so the restore has nothing to put back, and the editor's
      // focus() would place a caret at the end of the chapter and move the reference there.
      mockShowContextMenu.mockResolvedValue(COPY);
      const { calls, setLiveSelection } = stubEditor({}, { emulateLexicalFocus: true });
      await renderEditor();
      // Mounting focuses the editor once, which gives the stand-in a selection; drop it.
      setLiveSelection(undefined);
      calls.length = 0;
      watchFocus(calls);

      await rightClick(screen.getByTestId('editorial'));

      expect(calls).toContain('copy');
      expect(calls).not.toContain('focus');
      expect(calls[0]).toBe('frameFocus');
    });

    it('never focuses a read-only editor around a Copy, only the frame', async () => {
      // A read-only editor's text cannot take focus, and its focus() re-reads the browser
      // selection, which the copy itself leaves at the end of the chapter.
      mockShowContextMenu.mockResolvedValue(COPY);
      const stub = stubEditor({}, { emulateLexicalFocus: true });
      await renderEditor({ state: { isReadOnly: true } });
      stub.setLiveSelection(SELECTED);
      stub.calls.length = 0;
      watchFocus(stub.calls);

      await rightClick(screen.getByTestId('editorial'));

      expect(stub.calls).toEqual(['frameFocus', 'copy', 'frameFocus']);
    });

    it('leaves the browser selection where it was after a Copy that moved it', async () => {
      // The editor's copy selects a hidden element it appends at the end of the document and
      // leaves the browser selection there; a read-only editor then takes that as its selection.
      mockShowContextMenu.mockResolvedValue(COPY);
      stubEditor({
        copy: () => {
          const input = screen.getByTestId('editor-input');
          const hidden = document.createElement('span');
          hidden.textContent = '#';
          input.append(hidden);
          window.getSelection()?.selectAllChildren(hidden);
          hidden.remove();
        },
      });
      await renderEditor({ state: { isReadOnly: true } });
      const input = screen.getByTestId('editor-input');
      input.textContent = 'grace and truth';
      const text = input.firstChild;
      if (!text) throw new Error('missing text node');
      window.getSelection()?.setBaseAndExtent(text, 0, text, 5);

      await rightClick(input);

      expect(window.getSelection()?.toString()).toBe('grace');
    });

    it('focuses an editable editor holding a selection before and after the Copy (control)', async () => {
      mockShowContextMenu.mockResolvedValue(COPY);
      const stub = stubEditor({}, { emulateLexicalFocus: true });
      await renderEditor();
      stub.setLiveSelection(SELECTED);
      stub.calls.length = 0;
      watchFocus(stub.calls);

      await rightClick(screen.getByTestId('editorial'));

      expect(stub.calls).toEqual(['focus', 'copy', 'focus']);
    });
  });

  it('opens Find with the arguments Ctrl+F sends, from the selection', async () => {
    stubEditor();
    mockShowContextMenu.mockResolvedValue('platformScripture.openFind');
    await renderEditor();
    const input = screen.getByTestId('editor-input');
    input.textContent = 'grace ';
    window.getSelection()?.selectAllChildren(input);

    await rightClick(input);

    expect(mockShowContextMenu.mock.lastCall?.[2]).toMatchObject({
      contextKeys: { 'platformScriptureEditor.contextMenu.hasSelection': true },
    });
    expect(mockSendCommand).toHaveBeenCalledExactlyOnceWith(
      'platformScripture.openFind',
      WEB_VIEW_ID,
      'grace',
      PROJECT_ID,
    );
  });

  it('respells the editor’s no-break space stand-in the project’s way for Find', async () => {
    // Standard view with invisible characters allowed holds a no-break space as U+001A.
    appSettings.set('platform.interfaceMode', 'power');
    projectSettings.set(ALLOW_INVISIBLE_KEY, true);
    stubEditor();
    mockShowContextMenu.mockResolvedValue('platformScripture.openFind');
    await renderEditor({ state: { viewType: 'standard' } });
    const input = screen.getByTestId('editor-input');
    input.textContent = 'Mr.\u001AAbraham';
    window.getSelection()?.selectAllChildren(input);

    await rightClick(input);

    expect(mockSendCommand).toHaveBeenCalledExactlyOnceWith(
      'platformScripture.openFind',
      WEB_VIEW_ID,
      'Mr. Abraham',
      PROJECT_ID,
    );
  });

  describe('a menu that shows no pick', () => {
    beforeEach(() => mockLoggerDebug.mockReset());

    it('logs a request the platform rejected, with its code, naming the web view', async () => {
      stubEditor();
      mockShowContextMenu.mockRejectedValue(
        newPlatformError('Overlay request dropped by debounce cooldown', RESOURCE_EXHAUSTED),
      );
      await renderEditor();

      await rightClick(screen.getByTestId('editorial'));

      expect(mockLoggerDebug).toHaveBeenCalledWith(
        expect.stringMatching(new RegExp(`${WEB_VIEW_ID}.*${RESOURCE_EXHAUSTED}.*debounce`)),
      );
    });

    it('logs a menu that closed without a pick, naming the web view', async () => {
      stubEditor();
      mockShowContextMenu.mockResolvedValue(undefined);
      await renderEditor();

      await rightClick(screen.getByTestId('editorial'));

      expect(mockLoggerDebug).toHaveBeenCalledWith(
        expect.stringMatching(new RegExp(`${WEB_VIEW_ID}.*without a pick`)),
      );
    });
  });

  it('sends any other picked command with the web view id', async () => {
    stubEditor();
    mockShowContextMenu.mockResolvedValue('platformScriptureEditor.insertFootnoteAtSelection');
    await renderEditor();

    await rightClick(screen.getByTestId('editorial'));

    expect(mockSendCommand).toHaveBeenCalledExactlyOnceWith(
      'platformScriptureEditor.insertFootnoteAtSelection',
      WEB_VIEW_ID,
    );
  });

  describe('the keys the editor acts on', () => {
    // Standard view's palettes exist in Power mode only.
    beforeEach(() => appSettings.set('platform.interfaceMode', 'power'));

    /** Right-clicks with a menu that never answers: the request stays pending for good. */
    const openPendingMenu = async () => {
      mockShowContextMenu.mockReturnValue(new Promise(() => {}));
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      await rightClick(screen.getByTestId('editorial'));
    };

    /** Lets the hook's two-second key claim lapse while the request is still pending. */
    const letClaimLapse = () =>
      act(async () => {
        vi.advanceTimersByTime(2100);
      });

    const press = async (init: KeyboardEventInit) => {
      const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
      await act(async () => {
        window.dispatchEvent(event);
      });
      return event;
    };

    const KEYS = [
      ['Enter', { key: 'Enter' }, 'getMarkerMenuContext', false],
      ['backslash', { key: '\\' }, 'getMarkerMenuContext', false],
      ['Ctrl+T', { key: 't', ctrlKey: true }, 'insertMarker', true],
    ] as const;

    describe.each(KEYS)('%s', (_name, init, effect, isConsumedWhenActing) => {
      const setup = async () => {
        const stub = stubEditor();
        await renderEditor({ state: { viewType: 'standard' } });
        return { acted: () => stub[effect].mock.calls.length > 0 };
      };

      it('does nothing while the menu claims the keyboard', async () => {
        const { acted } = await setup();
        await openPendingMenu();

        const event = await press(init);

        expect(acted()).toBe(false);
        // Every key is consumed while the menu claims the keyboard.
        expect(event.defaultPrevented).toBe(true);
      });

      it('acts as with no menu once the claim lapsed, although the request is still pending', async () => {
        const { acted } = await setup();
        await openPendingMenu();
        await letClaimLapse();
        // Positive control: a key no gate handles is no longer claimed, so the claim has lapsed.
        expect((await press({ key: 'x' })).defaultPrevented).toBe(false);

        const event = await press(init);

        expect(acted()).toBe(true);
        // Acting is the editor's own handling: Enter and the backslash only pass through here (no
        // context to open a palette on), the note chord consumes its key.
        expect(event.defaultPrevented).toBe(isConsumedWhenActing);
      });

      it('acts when no menu was opened', async () => {
        const { acted } = await setup();

        await press(init);

        expect(acted()).toBe(true);
      });
    });
  });

  describe('a menu left open', () => {
    const openPendingMenu = async () => {
      mockShowContextMenu.mockReturnValue(new Promise(() => {}));
      await rightClick(screen.getByTestId('editorial'));
      expect(mockDismissContextMenu).not.toHaveBeenCalled();
    };

    it('closes when the chapter changes', async () => {
      stubEditor();
      const { rerender } = await renderEditor();
      await openPendingMenu();

      await rerender({ chapterNum: 2 });

      expect(mockDismissContextMenu).toHaveBeenCalledWith(WEB_VIEW_ID);
    });

    it('closes when the book changes and the chapter number stays', async () => {
      stubEditor();
      const { rerender } = await renderEditor();
      await openPendingMenu();

      await rerender({ book: 'EXO' });

      expect(mockDismissContextMenu).toHaveBeenCalledWith(WEB_VIEW_ID);
    });

    it('closes when the Scripture view type changes', async () => {
      appSettings.set('platform.interfaceMode', 'power');
      stubEditor();
      const { rerender } = await renderEditor({ state: { viewType: 'standard' } });
      await openPendingMenu();

      await rerender({ state: { viewType: 'formatted' } });

      expect(mockDismissContextMenu).toHaveBeenCalledWith(WEB_VIEW_ID);
    });

    it('closes when the project changes', async () => {
      stubEditor();
      const { rerender } = await renderEditor({ projectId: PROJECT_ID });
      await openPendingMenu();

      await rerender({ projectId: 'PROJECT2' });

      expect(mockDismissContextMenu).toHaveBeenCalledWith(WEB_VIEW_ID);
    });
  });

  describe('with the footnotes pane’s row editor open', () => {
    const NOTE_OP = {
      insert: { note: { style: 'f', caller: '+', contents: [{ text: 'A footnote text' }] } },
    };

    /** Clicks the note's caller in the main text, as the editor reports it to the web view. */
    const clickNoteCaller = () => {
      const options = editorialOptions.current;
      const nodes = typeof options === 'object' && options && 'nodes' in options && options.nodes;
      const onClick =
        typeof nodes === 'object' && nodes && 'noteCallerOnClick' in nodes
          ? nodes.noteCallerOnClick
          : undefined;
      if (typeof onClick !== 'function') throw new Error('The editor was given no caller handler');
      return act(async () => {
        Reflect.apply(onClick, nodes, [
          new Event('click'),
          'note-key',
          true,
          () => '+',
          vi.fn(),
          () => [NOTE_OP],
          () => 0,
        ]);
      });
    };

    const openRowEditor = async () => {
      stubEditor();
      chapterUsjValue.current = chapterWithFootnote;
      appSettings.set('platform.interfaceMode', 'power');
      await renderEditor({ state: { footnotesPaneVisible: true, viewType: 'standard' } });
      await clickNoteCaller();
      // The row editor is a second editor in the pane; the main text is the first.
      expect(screen.getAllByTestId('editor-input')).toHaveLength(2);
      return screen.getAllByTestId('editor-input');
    };

    it('serves one right-click in the row editor once, as a note editor, not as the main text', async () => {
      const [, rowInput] = await openRowEditor();

      await rightClick(rowInput);

      expect(mockShowContextMenu).toHaveBeenCalledExactlyOnceWith(
        'platformScriptureEditor.react',
        WEB_VIEW_ID,
        expect.objectContaining({
          contextKeys: expect.objectContaining({
            'platformScriptureEditor.contextMenu.isMainEditor': false,
          }),
        }),
      );
    });

    it('serves one right-click in the main text once, as the main text', async () => {
      const [mainInput] = await openRowEditor();

      await rightClick(mainInput);

      expect(mockShowContextMenu).toHaveBeenCalledExactlyOnceWith(
        'platformScriptureEditor.react',
        WEB_VIEW_ID,
        expect.objectContaining({
          contextKeys: expect.objectContaining({
            'platformScriptureEditor.contextMenu.isMainEditor': true,
          }),
        }),
      );
    });
  });
});
