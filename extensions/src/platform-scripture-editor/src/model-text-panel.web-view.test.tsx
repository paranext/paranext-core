// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { render } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReferenceList } from 'platform-scripture';
import { useDblResourceCatalog } from './use-dbl-resource-catalog.hook';

// ---------------------------------------------------------------------------
// Hoisted mocks — must be before any import that touches the component
// ---------------------------------------------------------------------------

const {
  mockUseEffectiveResourceReferenceList,
  mockGetProjectDataProvider,
  mockLoggerWarn,
  mockUseChapterCopyLimit,
  capturedGetResourceChapter,
  capturedResourceCopyLimit,
} = vi.hoisted(() => ({
  mockUseEffectiveResourceReferenceList: vi.fn(),
  mockGetProjectDataProvider: vi.fn(),
  mockLoggerWarn: vi.fn(),
  mockUseChapterCopyLimit: vi.fn(),
  /**
   * Collects the `getResourceChapter` callback the web view builds, so tests can invoke it
   * directly.
   */
  capturedGetResourceChapter: vi.fn(),
  /** Collects the `resourceCopyLimit` prop the web view passes on each render. */
  capturedResourceCopyLimit: vi.fn(),
}));

// @papi/frontend — papi default export used for projectDataProviders.get
vi.mock('@papi/frontend', () => ({
  default: {
    projectDataProviders: {
      get: (...args: unknown[]) => mockGetProjectDataProvider(...args),
    },
    dialogs: {
      showDialog: vi.fn(),
    },
  },
  logger: { warn: mockLoggerWarn, error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

// @papi/frontend/react — all PAPI hooks used by the web view
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}, false],
  useDataProvider: vi.fn(() => undefined),
  useProjectDataProvider: vi.fn(() => undefined),
  useScrollGroupScrRef: vi.fn(() => [
    { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
    vi.fn(),
  ]),
}));

// Local hooks — mock at module boundaries so tests don't need real PAPI subscriptions
vi.mock('./use-effective-resource-reference-list.hook', () => ({
  useEffectiveResourceReferenceList: (...args: unknown[]) =>
    mockUseEffectiveResourceReferenceList(...args),
  default: (...args: unknown[]) => mockUseEffectiveResourceReferenceList(...args),
}));

vi.mock('./use-dbl-resource-catalog.hook', () => ({
  useDblResourceCatalog: vi.fn(() => ({
    dblResources: [],
    isCatalogReady: true,
    hasCatalogError: false,
    refetchCatalog: vi.fn(),
  })),
  default: vi.fn(() => ({
    dblResources: [],
    isCatalogReady: true,
    hasCatalogError: false,
    refetchCatalog: vi.fn(),
  })),
}));

vi.mock('./use-install-dbl-resource.hook', () => ({
  useInstallDblResource: vi.fn(() => vi.fn(async () => {})),
  default: vi.fn(() => vi.fn(async () => {})),
}));

vi.mock('./copy-limit/use-chapter-copy-limit.hook', () => ({
  useChapterCopyLimit: (...args: unknown[]) => mockUseChapterCopyLimit(...args),
}));

vi.mock('./use-open-find-shortcut.hook', () => ({
  useOpenFindShortcut: vi.fn(),
  default: vi.fn(),
}));

// Captures the `getResourceChapter` callback and the `resourceCopyLimit` the web view hands to
// `ModelTextPanel`, without rendering the real (editor-dependent) component.
vi.mock('./model-text-panel.component', () => ({
  ModelTextPanel: ({
    getResourceChapter,
    resourceCopyLimit,
  }: {
    getResourceChapter: unknown;
    resourceCopyLimit: unknown;
  }) => {
    capturedGetResourceChapter(getResourceChapter);
    capturedResourceCopyLimit(resourceCopyLimit);
    return React.createElement('div', { 'data-testid': 'model-text-panel-stub' });
  },
  MODEL_TEXT_PANEL_STRING_KEYS: [],
}));

// ---------------------------------------------------------------------------
// Import the component AFTER all mocks are set up.
// The file assigns to globalThis.webViewComponent as its side effect.
// ---------------------------------------------------------------------------
// eslint-disable-next-line import/first
import './model-text-panel.web-view';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeProps(overrides: Partial<WebViewProps> = {}): WebViewProps {
  // The object literal only provides the minimum props needed for testing — the double cast
  // avoids satisfying every optional field of WebViewProps in each helper.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    id: 'model-text-panel-1',
    projectId: 'container-project-id',
    scrollGroupScrRef: { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
    updateWebViewDefinition: vi.fn(),
    useWebViewState: vi.fn(
      // useWebViewState is generic (key → TState) but mocks can't express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_key: string, defaultValue: any): [any, (val: any) => void] => [defaultValue, vi.fn()],
    ),
    ...overrides,
  } as unknown as WebViewProps;
}

function getWebViewComponent(): React.ComponentType<WebViewProps> {
  // globalThis is a special interface; cast to Record<string, unknown> to access a property added
  // at runtime.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>)
    .webViewComponent as React.ComponentType<WebViewProps>;
}

/** Renders the web view once and returns the `getResourceChapter` callback it built. */
function getResourceChapterCallback() {
  mockUseEffectiveResourceReferenceList.mockReturnValue({
    status: 'ready',
    list: { dataVersion: '1.0.0', items: [] },
  });
  mockUseChapterCopyLimit.mockReturnValue(undefined);
  const ModelTextPanelWebView = getWebViewComponent();
  render(<ModelTextPanelWebView {...makeProps()} />);
  const [callback] = capturedGetResourceChapter.mock.lastCall ?? [];
  // The mock captures an `unknown`-typed argument; the callback's real signature is known from
  // `model-text-panel.component.tsx`'s `getResourceChapter` prop.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return callback as (
    resourceProjectId: string,
    ref: SerializedVerseRef,
  ) => Promise<{ usj: unknown; textDirection: string }>;
}

const ref: SerializedVerseRef = {
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
  versificationStr: 'English',
};

describe('ModelTextPanelWebView getResourceChapter', () => {
  it('requests the text and the text direction without waiting on each other', async () => {
    function deferred<T>() {
      let resolveDeferred: (value: T) => void = () => {};
      const promise = new Promise<T>((resolve) => {
        resolveDeferred = resolve;
      });
      return { promise, resolve: resolveDeferred };
    }
    const chapterUsj = deferred<undefined>();
    const textDirection = deferred<string>();
    const getChapterUSJ = vi.fn(() => chapterUsj.promise);
    const getSetting = vi.fn(() => textDirection.promise);
    mockGetProjectDataProvider.mockImplementation(async (dataType: string) => {
      if (dataType === 'platform.base') return { getSetting };
      if (dataType === 'platformScripture.USJ_Chapter') return { getChapterUSJ };
      throw new Error(`unexpected data type ${dataType}`);
    });

    const getResourceChapter = getResourceChapterCallback();
    const resultPromise = getResourceChapter('resource-project-id', ref);
    await vi.waitFor(() => {
      expect(getChapterUSJ).toHaveBeenCalled();
      expect(getSetting).toHaveBeenCalled();
    });

    chapterUsj.resolve(undefined);
    textDirection.resolve('rtl');
    const result = await resultPromise;
    expect(result.textDirection).toBe('rtl');
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });
});

const INSTALLED_RESOURCE: DblResourceData = {
  dblEntryUid: 'uid-web',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1200,
  installed: true,
  updateAvailable: false,
  projectId: 'project-web',
};

const LOCAL_NON_DBL_RESOURCE: DblResourceData = {
  dblEntryUid: 'proj-local',
  projectId: 'proj-local',
  displayName: 'LocalRes',
  fullName: 'LocalRes',
  bestLanguageName: '',
  type: 'ScriptureResource',
  size: 0,
  installed: true,
  updateAvailable: false,
};

/** Renders the web view with `list` as the configured model texts and `dblResources` as the catalog. */
function renderWithModelText(
  list: EffectiveResourceReferenceList,
  dblResources: DblResourceData[],
) {
  mockUseEffectiveResourceReferenceList.mockReturnValue({ status: 'ready', list });
  vi.mocked(useDblResourceCatalog).mockReturnValue({
    dblResources,
    isCatalogReady: true,
    isLoadingResources: false,
    hasCatalogError: false,
    refetchCatalog: vi.fn(),
  });
  mockUseChapterCopyLimit.mockReturnValue(8);
  const ModelTextPanelWebView = getWebViewComponent();
  render(<ModelTextPanelWebView {...makeProps()} />);
}

describe('ModelTextPanelWebView — copy limit', () => {
  it("passes the copy limit of the configured DBL resource's project to the panel", () => {
    renderWithModelText(
      {
        dataVersion: '1.0.0',
        items: [{ type: 'dblResource', id: 'uid-web', name: 'WEB', source: 'admin' }],
      },
      [INSTALLED_RESOURCE],
    );

    expect(mockUseChapterCopyLimit).toHaveBeenLastCalledWith(
      'project-web',
      ref,
      'applied-by-caller',
    );
    expect(capturedResourceCopyLimit).toHaveBeenLastCalledWith(8);
  });

  it('passes the copy limit of a configured local resource to the panel', () => {
    renderWithModelText(
      {
        dataVersion: '1.0.0',
        items: [{ type: 'project', id: 'proj-local', name: 'LocalRes', source: 'admin' }],
      },
      [LOCAL_NON_DBL_RESOURCE],
    );

    expect(mockUseChapterCopyLimit).toHaveBeenLastCalledWith(
      'proj-local',
      ref,
      'applied-by-caller',
    );
    expect(capturedResourceCopyLimit).toHaveBeenLastCalledWith(8);
  });
});
