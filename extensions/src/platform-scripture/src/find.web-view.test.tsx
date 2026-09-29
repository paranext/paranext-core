// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCallback, useState, type ComponentType } from 'react';
import type { WebViewProps } from '@papi/core';
import { booksPresentFor } from './find/find-book-lists.test-utils';

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

const { mockBooksPresent } = vi.hoisted(() => {
  const booksPresent: { value: string } = { value: '' };
  return { mockBooksPresent: booksPresent };
});

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

vi.mock('@papi/frontend/react', () => {
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
    useProjectSetting: (_projectId: unknown, key: string, defaultValue: unknown) => [
      key === 'platformScripture.booksPresent' ? mockBooksPresent.value : defaultValue,
      vi.fn(),
      vi.fn(),
      false,
    ],
    useSetting: (_key: string, defaultValue: unknown) => [defaultValue, vi.fn(), vi.fn(), false],
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
