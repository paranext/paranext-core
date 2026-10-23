// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';
import { newPlatformError } from 'platform-bible-utils';

// ---------------------------------------------------------------------------
// Hoisted mocks — must be before any import that touches the component
// ---------------------------------------------------------------------------

const UNSUPPORTED_KEY = '%project_unsupported_studyBibleAdditions%';
const UNSUPPORTED_SENTENCE = "Study Bible Additions projects aren't supported yet.";
const GENERIC_KEY = '%project_unsupported_generic%';
const GENERIC_SENTENCE = "This project can't be opened.";
const PROJECT_ID = 'PROJECT1';

const { mockUseProjectData, mockUseLocalizedStrings, chapterUsjValue } = vi.hoisted(() => ({
  mockUseProjectData: vi.fn(),
  mockUseLocalizedStrings: vi.fn(),
  /** What the chapter subscription delivers instead of its default, when set. */
  chapterUsjValue: { current: undefined as unknown },
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
function dataHooks() {
  return new Proxy(
    {},
    {
      get: (_target, dataType) => (_selector: unknown, defaultValue: unknown) => [
        dataType === 'ChapterUSJ' && chapterUsjValue.current !== undefined
          ? chapterUsjValue.current
          : defaultValue,
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
  useProjectDataProvider: () => undefined,
  useProjectSetting: (_projectId: unknown, _key: unknown, defaultValue: unknown) => [
    defaultValue,
    vi.fn(),
    vi.fn(),
    false,
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
    Editorial: React.forwardRef(() => <div data-testid="editorial" />),
  };
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

/** WebViewProps for an editor tab whose saved state carries `unsupportedReason`. */
function makeProps(unsupportedReason: string): WebViewProps {
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
        return [defaultValue, vi.fn(), vi.fn()];
      },
    ),
    useWebViewScrollGroupScrRef: vi.fn(() => [
      { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
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
  chapterUsjValue.current = undefined;
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
