// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';
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
      return <div data-testid="editorial" />;
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

describe('Scripture editor "Change footnote pane location" request', () => {
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

  /** Every write the web view made to its web-view state, in order, as `[key, value]`. */
  let stateWrites: [string, unknown][] = [];

  beforeEach(() => {
    stateWrites = [];
  });

  /**
   * Props whose web-view state is kept per key across renders, starting from `initialState`, and
   * whose writes are recorded in {@link stateWrites}.
   */
  function makeStatefulProps(initialState: Record<string, unknown>): WebViewProps {
    const props = makeProps('', initialState);
    return {
      ...props,
      // useWebViewState is generic (key → TState) but this stand-in can't express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      useWebViewState: (key: string, defaultValue: any) => {
        const [value, setValue] = React.useState(
          key in initialState ? initialState[key] : defaultValue,
        );
        return [
          value,
          (stateValue: unknown) => {
            stateWrites.push([key, stateValue]);
            setValue(stateValue);
          },
          () => setValue(defaultValue),
        ];
      },
    };
  }

  async function requestLocationChange() {
    await act(async () => {
      window.dispatchEvent(
        new MessageEvent('message', { data: { method: 'changeFootnotesPaneLocation' } }),
      );
    });
  }

  it('opens a hidden footnotes pane in the new position', async () => {
    chapterUsjValue.current = chapterWithFootnote;
    const EditorWebView = getEditorWebView();
    await act(async () => {
      render(
        <EditorWebView
          {...makeStatefulProps({ footnotesPaneVisible: false, isReadOnly: false })}
        />,
      );
    });
    // Positive control: the pane starts closed, so its footnote row is not listed.
    expect(screen.getByTestId('editorial')).toBeInTheDocument();
    expect(screen.queryByRole('option')).not.toBeInTheDocument();

    await requestLocationChange();

    expect(screen.getAllByRole('option')).toHaveLength(1);
    // The pane starts at the bottom (the default), so it opens beside the text.
    expect(stateWrites).toContainEqual(['footnotesPanePosition', 'trailing']);
  });

  it('keeps a shown footnotes pane open', async () => {
    chapterUsjValue.current = chapterWithFootnote;
    const EditorWebView = getEditorWebView();
    await act(async () => {
      render(
        <EditorWebView {...makeStatefulProps({ footnotesPaneVisible: true, isReadOnly: false })} />,
      );
    });
    expect(screen.getAllByRole('option')).toHaveLength(1);

    await requestLocationChange();

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

  it('publishes hasSelection false when new text from outside replaces the open chapter', async () => {
    // A mounted editor, so incoming text is applied to it; every method is a no-op.
    const setUsj = vi.fn();
    editorHandle.current = new Proxy(
      {},
      { get: (_target, property) => (property === 'setUsj' ? setUsj : vi.fn()) },
    );
    chapterUsjValue.current = chapterWithText;
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(webViewElement(1));
    });
    await selectInEditor(selectionRange);
    // Positive control: the same chapter re-rendered with the same text keeps the key on.
    await act(async () => {
      result?.rerender(webViewElement(1));
    });
    expect(publishedValues()).toEqual([false, true]);
    const setUsjCallsBeforeUpdate = setUsj.mock.calls.length;

    // A background update of the same chapter, such as an in-place resource update.
    chapterUsjValue.current = {
      ...chapterWithText,
      content: [
        ...chapterWithText.content,
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '2' }, 'More'],
        },
      ],
    };
    await act(async () => {
      result?.rerender(webViewElement(1));
    });

    // The update really replaced the editor's content.
    expect(setUsj.mock.calls.length).toBeGreaterThan(setUsjCallsBeforeUpdate);
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
    // Held back while platform.isPublished loads; the same props send the title once it settles
    // (below).
    expect(props.updateWebViewDefinition).not.toHaveBeenCalled();

    loadingProjectSettings.delete('platform.isPublished');
    projectSettings.set('platform.isPublished', true);
    await rerenderTab(result, props);

    expect(props.updateWebViewDefinition).toHaveBeenCalledWith({ title: 'engWEBUS' });
    // The tab has no icon yet, so the resource's book icon is sent separately.
    expect(props.updateWebViewDefinition).toHaveBeenCalledWith({ iconName: 'book-open' });
    expect(props.updateWebViewDefinition).toHaveBeenCalledTimes(2);
  });

  it('keeps the read-only indicator in the title of a read-only project', async () => {
    projectSettings.set('platform.name', 'engWEBUS');
    projectSettings.set('platform.isPublished', false);
    const props = titleProps();

    await renderTab(props);

    expect(props.updateWebViewDefinition).toHaveBeenCalledWith({ title: '(Read-only) engWEBUS' });
  });

  /** The `iconName` values sent through `updateWebViewDefinition`, in call order. */
  const sentIconNames = (props: WebViewProps) =>
    vi
      .mocked(props.updateWebViewDefinition)
      .mock.calls.filter(([update]) => 'iconName' in update)
      .map(([update]) => update.iconName);

  it('gives a resource tab the book icon once the published setting is read', async () => {
    loadingProjectSettings.add('platform.isPublished');
    const props: WebViewProps = { ...makeProps(''), iconName: undefined };

    const result = await renderTab(props);
    expect(sentIconNames(props)).toEqual([]);

    loadingProjectSettings.delete('platform.isPublished');
    projectSettings.set('platform.isPublished', true);
    await rerenderTab(result, props);

    expect(sentIconNames(props)).toEqual(['book-open']);
  });

  it('sends no icon to a resource tab that already shows the book icon', async () => {
    projectSettings.set('platform.name', 'engWEBUS');
    projectSettings.set('platform.isPublished', true);
    const props: WebViewProps = { ...titleProps(), iconName: 'book-open' };

    await renderTab(props);

    // Positive control: the tab is read as a resource, as its title without "(Read-only)" shows.
    expect(props.updateWebViewDefinition).toHaveBeenCalledWith({ title: 'engWEBUS' });
    expect(sentIconNames(props)).toEqual([]);
  });

  it('never takes the book icon away from a tab, for a project or when the setting cannot be read', async () => {
    projectSettings.set('platform.isPublished', false);
    const projectProps: WebViewProps = { ...makeProps(''), iconName: 'book-open' };
    const projectResult = await renderTab(projectProps);
    expect(sentIconNames(projectProps)).toEqual([]);
    projectResult?.unmount();

    projectSettings.set('platform.isPublished', newPlatformError('project unavailable'));
    const failedProps: WebViewProps = { ...makeProps(''), iconName: 'book-open' };
    await renderTab(failedProps);
    expect(sentIconNames(failedProps)).toEqual([]);

    // Positive control: a resource tab without the icon does get one under the same props.
    projectSettings.set('platform.isPublished', true);
    const resourceProps: WebViewProps = { ...makeProps(''), iconName: undefined };
    await renderTab(resourceProps);
    expect(sentIconNames(resourceProps)).toEqual(['book-open']);
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

  const renderEditor = async (state: Record<string, unknown> = {}, chapterNum = 1) => {
    chapterUsjValue.current = chapterWithText;
    const EditorWebView = getEditorWebView();
    const elementFor = (chapter: number, viewState: Record<string, unknown>) => (
      <EditorWebView {...makeProps('', { isReadOnly: false, ...viewState }, 'GEN', chapter)} />
    );
    let result: ReturnType<typeof render> | undefined;
    await act(async () => {
      result = render(elementFor(chapterNum, state));
    });
    return {
      rerender: (chapter: number, viewState: Record<string, unknown> = state) =>
        act(async () => {
          result?.rerender(elementFor(chapter, viewState));
        }),
    };
  };

  const rightClick = (target: Element) =>
    act(async () => {
      fireEvent.contextMenu(target, { button: 2, clientX: 10, clientY: 20 });
    });

  /**
   * What the stubbed editor exposes: the named methods record their call into `calls`, and any
   * other method the web view reaches for does nothing.
   */
  const stubEditor = (overrides: Record<string, unknown> = {}) => {
    const calls: string[] = [];
    const getMarkerMenuContext = vi.fn();
    const insertMarker = vi.fn();
    const record = (name: string) =>
      vi.fn(() => {
        calls.push(name);
      });
    const known: Record<string, unknown> = {
      focus: record('focus'),
      copy: record('copy'),
      cut: record('cut'),
      paste: record('paste'),
      pastePlainText: record('pastePlainText'),
      isFocused: () => true,
      getSelection: () => undefined,
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
    return { calls, getMarkerMenuContext, insertMarker };
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

  it('opens no menu for a right-click on a header alert', async () => {
    stubEditor();
    await renderEditor({ decorations: { headers: { 'header-1': { title: '%header_title%' } } } });
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
    const EditorWebView = getEditorWebView();
    await act(async () => {
      render(
        <EditorWebView {...makeProps('', { footnotesPaneVisible: true, isReadOnly: false })} />,
      );
    });
    // Positive control: the editor itself is served.
    await rightClick(screen.getByTestId('editorial'));
    expect(mockShowContextMenu).toHaveBeenCalledTimes(1);
    mockShowContextMenu.mockClear();

    await rightClick(screen.getAllByRole('option')[0]);

    expect(mockShowContextMenu).not.toHaveBeenCalled();
  });

  it('focuses the editor before a picked Copy runs', async () => {
    const { calls } = stubEditor();
    mockShowContextMenu.mockResolvedValue(COPY);
    await renderEditor();
    // The web view focuses the editor itself while mounting; only the pick's calls matter here.
    calls.length = 0;

    await rightClick(screen.getByTestId('editorial'));

    expect(calls.slice(0, 2)).toEqual(['focus', 'copy']);
  });

  it('runs a picked Paste as plain text on the editor', async () => {
    const { calls } = stubEditor();
    mockShowContextMenu.mockResolvedValue('platformScriptureEditor.pasteAsPlainTextAtSelection');
    await renderEditor();
    calls.length = 0;

    await rightClick(screen.getByTestId('editorial'));

    expect(calls.slice(0, 2)).toEqual(['focus', 'pastePlainText']);
  });

  it('opens Find with the arguments Ctrl+F sends, from the selection', async () => {
    stubEditor();
    mockShowContextMenu.mockResolvedValue('platformScripture.openFind');
    await renderEditor();
    const editorial = screen.getByTestId('editorial');
    editorial.textContent = 'grace ';
    window.getSelection()?.selectAllChildren(editorial);

    await rightClick(editorial);

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

  describe('while the menu request is pending', () => {
    // Standard view's palettes exist in Power mode only.
    beforeEach(() => appSettings.set('platform.interfaceMode', 'power'));

    /** Right-clicks with a menu that never answers, then lets the hook's own key claim lapse. */
    const openPendingMenu = async () => {
      mockShowContextMenu.mockReturnValue(new Promise(() => {}));
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      await rightClick(screen.getByTestId('editorial'));
      await act(async () => {
        vi.advanceTimersByTime(2100);
      });
    };

    const press = (init: KeyboardEventInit) =>
      act(async () => {
        window.dispatchEvent(
          new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init }),
        );
      });

    it('leaves Enter to the menu instead of opening the paragraph palette, and opens it once none is pending', async () => {
      const { getMarkerMenuContext: getContext } = stubEditor();
      await renderEditor({ viewType: 'standard' });
      // Control: with no menu pending the same key reaches the palette's context lookup.
      await press({ key: 'Enter' });
      expect(getContext).toHaveBeenCalledTimes(1);
      getContext.mockClear();

      await openPendingMenu();
      await press({ key: 'Enter' });

      expect(getContext).not.toHaveBeenCalled();
    });

    it('claims the backslash so it is not typed behind the menu', async () => {
      stubEditor();
      await renderEditor({ viewType: 'standard' });
      const unclaimed = new KeyboardEvent('keydown', {
        key: '\\',
        bubbles: true,
        cancelable: true,
      });
      await act(async () => {
        window.dispatchEvent(unclaimed);
      });
      // Control: with nothing pending and nothing to offer, the key is left alone.
      expect(unclaimed.defaultPrevented).toBe(false);

      await openPendingMenu();
      const claimed = new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true });
      await act(async () => {
        window.dispatchEvent(claimed);
      });

      expect(claimed.defaultPrevented).toBe(true);
    });

    it('does not insert a footnote from the keyboard, and does once none is pending', async () => {
      const { insertMarker } = stubEditor();
      await renderEditor({ viewType: 'standard' });
      // Control: Ctrl+T inserts a footnote when no menu is pending.
      await press({ key: 't', ctrlKey: true });
      expect(insertMarker).toHaveBeenCalledTimes(1);
      insertMarker.mockClear();

      await openPendingMenu();
      await press({ key: 't', ctrlKey: true });

      expect(insertMarker).not.toHaveBeenCalled();
    });
  });

  it('closes a pending menu when the chapter changes, and not before', async () => {
    stubEditor();
    mockShowContextMenu.mockReturnValue(new Promise(() => {}));
    const { rerender } = await renderEditor();
    await rightClick(screen.getByTestId('editorial'));
    expect(mockDismissContextMenu).not.toHaveBeenCalled();

    await rerender(2);

    expect(mockDismissContextMenu).toHaveBeenCalledWith(WEB_VIEW_ID);
  });

  it('closes a pending menu when the Scripture view type changes', async () => {
    appSettings.set('platform.interfaceMode', 'power');
    stubEditor();
    mockShowContextMenu.mockReturnValue(new Promise(() => {}));
    const { rerender } = await renderEditor({ viewType: 'standard' });
    await rightClick(screen.getByTestId('editorial'));
    expect(mockDismissContextMenu).not.toHaveBeenCalled();

    await rerender(1, { viewType: 'formatted' });

    expect(mockDismissContextMenu).toHaveBeenCalledWith(WEB_VIEW_ID);
  });
});
