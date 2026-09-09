// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';

// ---------------------------------------------------------------------------
// Hoisted mocks — must be before any import that touches the component
// ---------------------------------------------------------------------------

const {
  mockUseEffectiveResourceReferenceList,
  mockUseDblResourceAutoInstall,
  mockUseDblResourceCatalog,
  mockUseResourcePickerResources,
} = vi.hoisted(() => ({
  mockUseEffectiveResourceReferenceList: vi.fn(),
  mockUseDblResourceAutoInstall: vi.fn(),
  mockUseDblResourceCatalog: vi.fn(),
  mockUseResourcePickerResources: vi.fn(),
}));

// @papi/frontend — papi default export used for themes subscription and commands
vi.mock('@papi/frontend', () => ({
  default: {
    themes: {
      subscribeCurrentTheme: vi.fn(() => Promise.resolve(vi.fn())),
    },
    commands: {
      sendCommand: vi.fn(() => Promise.resolve([])),
    },
  },
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

// @papi/frontend/react — all PAPI hooks used by the component
vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [
    {
      '%webView_resourcePanel_noProject%': 'No project.',
      '%webView_resourcePanel_installing%': 'Installing…',
      '%webView_resourcePanel_selecting%': 'Selecting…',
      '%webView_resourcePanel_installFailed%': "Couldn't install.",
      '%webView_resourcePanel_installFailedOffline%': "Couldn't install. Check your connection.",
      '%webView_resourcePanel_retry%': 'Try again',
      '%webView_resourcePanel_downloadResources%': 'Download resources',
      '%webView_resourcePanel_bibleTexts_emptyState_moreInfo%': 'More info',
      '%webView_resourcePanel_bibleTexts_emptyState_lessInfo%': 'Less info',
      '%webView_resourcePanel_bibleTexts_emptyState_moreInfo_body%': 'Bible texts detail here.',
      '%webView_resourcePanel_bibleTexts_emptyState_prompt%': 'No Bible texts configured.',
      '%webView_resourcePanel_bibleTexts_pick%': 'Pick Bible text…',
      '%webView_resourcePanel_bibleTexts_title%': 'Bible Texts',
      '%webView_resourcePanel_bibleTexts_title_withResource%': 'Bible Texts ({textName})',
      '%webView_resourcePanel_commentaries_emptyState_prompt%': 'No commentaries configured.',
      '%webView_resourcePanel_commentaries_pick%': 'Pick commentary…',
      '%webView_resourcePanel_commentaries_title%': 'Commentaries',
      '%webView_resourcePanel_commentaries_title_withResource%': 'Commentaries ({textName})',
    },
    false,
  ],
  useDataProvider: vi.fn(() => undefined),
  useProjectDataProvider: vi.fn(() => undefined),
  useProjectData: vi.fn(() => ({
    ChapterUSJ: vi.fn(() => [undefined, false]),
  })),
  useProjectSetting: vi.fn(() => ['ltr', false]),
  useSetting: vi.fn(() => ['simple', false]),
  useDialogCallback: vi.fn(() => vi.fn()),
  usePromise: vi.fn(() => [undefined, false]),
}));

// platform-bible-react — keep UI components real; stub hooks that hit runtime
vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useExtraValidMarkers: () => [],
    useTabIconSelection: () => 'papi-extension://platformScriptureEditor/assets/book-open.svg',
    // The real hook builds an IntersectionObserver, which jsdom does not implement. These
    // renders stand in for a visible panel; visibility gates only the reveal-scroll effect,
    // never which empty state — or disclosure — is rendered.
    useViewVisibility: () => true,
    usePromise: vi.fn(() => [undefined, false]),
  };
});

// @eten-tech-foundation/platform-editor — stub the editor so jsdom never needs to render it
vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: React.forwardRef((_props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    React.useImperativeHandle(ref, () => ({ setUsj: vi.fn() }));
    return <div data-testid="editorial" />;
  }),
}));

// Local hooks — mock at module boundaries so tests control the data the component sees
vi.mock('./use-effective-resource-reference-list.hook', () => ({
  useEffectiveResourceReferenceList: (...args: unknown[]) =>
    mockUseEffectiveResourceReferenceList(...args),
  default: (...args: unknown[]) => mockUseEffectiveResourceReferenceList(...args),
}));

// The picker list is a source the panel waits on: while it is loading the panel renders a spinner
// instead of any empty state, so it has to be settled for the disclosure to be reachable at all.
vi.mock('./use-resource-picker-resources.hook', () => ({
  useResourcePickerResources: (...args: unknown[]) => mockUseResourcePickerResources(...args),
  default: (...args: unknown[]) => mockUseResourcePickerResources(...args),
}));

vi.mock('./use-commentary-marker-styles.hook', () => ({
  useCommentaryMarkerStyles: vi.fn(),
  default: vi.fn(),
}));

vi.mock('./use-dbl-resource-auto-install.hook', () => ({
  useDblResourceAutoInstall: (...args: unknown[]) => mockUseDblResourceAutoInstall(...args),
  default: (...args: unknown[]) => mockUseDblResourceAutoInstall(...args),
}));

vi.mock('./use-dbl-resource-catalog.hook', () => ({
  useDblResourceCatalog: (...args: unknown[]) => mockUseDblResourceCatalog(...args),
  default: (...args: unknown[]) => mockUseDblResourceCatalog(...args),
}));

vi.mock('./use-install-dbl-resource.hook', () => ({
  useInstallDblResource: vi.fn(() => vi.fn(async () => {})),
  default: vi.fn(() => vi.fn(async () => {})),
}));

vi.mock('./use-is-online.hook', () => ({
  useIsOnline: vi.fn(() => true),
  default: vi.fn(() => true),
}));

vi.mock('./select-dbl-resource', () => ({
  selectTextConnection: vi.fn(),
}));

vi.mock('./scripture-text-grid/dbl-resource-lookup.utils', () => ({
  findCachedDblResource: vi.fn(() => undefined),
}));

// NOTE: './panel-state-views.component' is deliberately NOT mocked. The disclosure tests below
// assert on expand/collapse, `hidden`, and `aria-expanded` — a stand-in reimplementation would
// make them assertions about the mock, passing even if the real ExpandableInfo were broken.

// ---------------------------------------------------------------------------
// Import the component AFTER all mocks are set up.
// The file assigns to globalThis.webViewComponent as its side effect.
// ---------------------------------------------------------------------------
// Must follow vi.mock() calls so the side effect runs against the mock boundaries above.
// Vitest's hoisting ensures execution order is correct regardless of static position.
// eslint-disable-next-line import/first
import './resource-text-panel.web-view';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal WebViewProps for zero-state renders (no resources, with projectId). */
function makeProps(
  overrides: Partial<WebViewProps> = {},
  resourceType: 'ScriptureResource' | 'Commentary' = 'ScriptureResource',
): WebViewProps {
  // The object literal only provides the minimum props needed for testing — the double cast
  // avoids satisfying every optional field of WebViewProps in each helper.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    projectId: 'test-project-id',
    updateWebViewDefinition: vi.fn(),
    useWebViewState: vi.fn(
      // useWebViewState is generic (key → TState) but mocks can't express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key: string, defaultValue: any): [any, (val: any) => void] => {
        if (key === 'resourceType') return [resourceType, vi.fn()];
        return [defaultValue, vi.fn()];
      },
    ),
    useWebViewScrollGroupScrRef: vi.fn(() => [
      { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
      vi.fn(),
    ]),
    ...overrides,
  } as unknown as WebViewProps;
}

/** Reads the component set by the web view file's side effect. */
function getResourceTextPanel(): React.ComponentType<WebViewProps> {
  // globalThis is a special interface; cast to Record<string, unknown> to access a property added at runtime.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>)
    .webViewComponent as React.ComponentType<WebViewProps>;
}

/** Renders the component with zero-state (empty filteredResources list). */
function renderZeroState(resourceType: 'ScriptureResource' | 'Commentary' = 'ScriptureResource') {
  // The list has arrived — `ready` is the only status that lets a panel render an empty prompt —
  // and it carries no items, which is the genuine "nothing is configured" state.
  mockUseEffectiveResourceReferenceList.mockReturnValue({
    status: 'ready',
    list: { dataVersion: '1.0.0', items: [] },
  });

  const props = makeProps({
    useWebViewState: vi.fn(
      // useWebViewState is generic (key → TState) but mocks can't express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key: string, defaultValue: any): [any, (val: any) => void] => {
        if (key === 'resourceType') return [resourceType, vi.fn()];
        return [defaultValue, vi.fn()];
      },
    ),
  });

  const ResourceTextPanel = getResourceTextPanel();
  return render(<ResourceTextPanel {...props} />);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

/**
 * Resets the two hooks this file drives to their inert defaults — nothing installing, a settled but
 * empty catalog — so each test opts into only the state it is about.
 */
function resetPanelHooks() {
  mockUseDblResourceAutoInstall.mockReturnValue({
    isInstalling: false,
    installFailed: false,
    retryInstall: vi.fn(),
    clearInstallFailure: vi.fn(),
    markInstallFailed: vi.fn(),
  });
  mockUseDblResourceCatalog.mockReturnValue({
    dblResources: [],
    isLoadingResources: false,
    isCatalogReady: false,
    hasCatalogError: false,
    refetchCatalog: vi.fn(),
  });
  mockUseResourcePickerResources.mockReturnValue([[], false]);
}

beforeEach(resetPanelHooks);

afterEach(() => {
  vi.restoreAllMocks();
});

// The disclosure's own expand/collapse, `hidden` and `aria-expanded` behaviour is covered directly
// in panel-state-views.component.test.tsx. What belongs to this consumer — and only to it — is
// which resource types get a disclosure at all.
describe('ResourceTextPanel — More info disclosure', () => {
  it('renders the disclosure for Bible texts, carrying the panel’s own body copy', () => {
    renderZeroState('ScriptureResource');
    expect(screen.getByRole('button', { name: 'More info' })).toBeInTheDocument();
    expect(screen.getByText('Bible texts detail here.')).toBeInTheDocument();
  });

  it('renders no disclosure for commentaries, whose prompt is self-explanatory', () => {
    renderZeroState('Commentary');
    expect(screen.queryByRole('button', { name: 'More info' })).not.toBeInTheDocument();
  });
});

describe('ResourceTextPanel — failed install recovery', () => {
  it('hands the catalog refetch to the auto-install hook, so its retry can re-read', () => {
    // The retry is composed inside the hook (refresh + re-attempt); this panel's job is only to
    // supply the refresh. Without it the retry replays the same install against the same snapshot.
    const retryInstall = vi.fn();
    const refetchCatalog = vi.fn();
    mockUseDblResourceAutoInstall.mockReturnValue({
      isInstalling: false,
      installFailed: true,
      retryInstall,
      clearInstallFailure: vi.fn(),
      markInstallFailed: vi.fn(),
    });
    mockUseDblResourceCatalog.mockReturnValue({
      dblResources: [],
      isLoadingResources: false,
      isCatalogReady: true,
      hasCatalogError: false,
      refetchCatalog,
    });
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.0.0', items: [] },
    });
    // One Bible-text row is what carries the panel past its front states — the install-failed
    // branch is only reachable once the panel has something to display.
    mockUseResourcePickerResources.mockReturnValue([
      [
        {
          reference: { type: 'dblResource', id: 'uid-web' },
          source: 'user',
          isAdminLocked: false,
          type: 'ScriptureResource',
          installed: false,
          projectId: undefined,
        },
      ],
      false,
    ]);

    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...makeProps()} />);

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(retryInstall).toHaveBeenCalledTimes(1);
    // ...and it was handed this panel's catalog refetch as the list-refresher that retry uses.
    const [, , optionsPassedToHook] = mockUseDblResourceAutoInstall.mock.lastCall ?? [];
    expect(optionsPassedToHook).toMatchObject({ refreshResourceList: refetchCatalog });
  });
});
