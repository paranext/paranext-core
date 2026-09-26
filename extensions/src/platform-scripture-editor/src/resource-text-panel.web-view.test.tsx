// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import type { DblResourceData } from 'platform-bible-utils';
import type { UseWebViewScrollGroupScrRefHook, WebViewProps } from '@papi/core';
import { usePromise } from 'platform-bible-react';
import type { PickerResource } from './downloaded-resources.utils';

// ---------------------------------------------------------------------------
// Hoisted mocks — must be before any import that touches the component
// ---------------------------------------------------------------------------

const {
  mockUseEffectiveResourceReferenceList,
  mockUseDblResourceAutoInstall,
  mockUseDblResourceCatalog,
  mockUseResourcePickerResources,
  mockUseInstallDblResource,
  mockUseProjectData,
  mockUseProjectDataProvider,
  mockFindCachedDblResource,
  capturedResourceTextPanelProps,
  realUsePromise,
} = vi.hoisted(() => ({
  mockUseEffectiveResourceReferenceList: vi.fn(),
  mockUseDblResourceAutoInstall: vi.fn(),
  mockUseDblResourceCatalog: vi.fn(),
  mockUseResourcePickerResources: vi.fn(),
  mockUseInstallDblResource: vi.fn(),
  mockUseProjectData: vi.fn(),
  mockUseProjectDataProvider: vi.fn(),
  mockFindCachedDblResource: vi.fn(),
  /** Collects the props passed to `ResourceTextPanel` on every render. */
  capturedResourceTextPanelProps: vi.fn(),
  /** The real `usePromise`, which the copy-limit tests need in place of the stub below. */
  realUsePromise: { current: undefined as unknown },
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
    projectLookup: {
      getMetadataForProject: vi.fn(async () => ({
        projectInterfaces: ['platformScripture.USJ_Chapter', 'platformScripture.CopyLimit'],
      })),
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
      '%webView_resourcePanel_installedButUnavailable%': "Installed, but couldn't be opened.",
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
  useProjectDataProvider: (...args: unknown[]) => mockUseProjectDataProvider(...args),
  useProjectData: (...args: unknown[]) => mockUseProjectData(...args),
  useProjectSetting: vi.fn(() => ['ltr', false]),
  useSetting: vi.fn(() => ['simple', false]),
  useDialogCallback: vi.fn(() => vi.fn()),
  usePromise: vi.fn(() => [undefined, false]),
}));

// platform-bible-react — keep UI components real; stub hooks that hit runtime
vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  realUsePromise.current = original.usePromise;
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

/**
 * Records every `setUsj` the panel pushes into the editor, across editor instances.
 *
 * Shared rather than created per instance because the panel unmounts `Editorial` for its message
 * states and remounts it on the way back to content. With a per-instance spy nobody captures, "the
 * editor is on screen" is the only observable fact, which a permanently blank editor also
 * satisfies.
 */
const setUsjSpy = vi.fn();

// @eten-tech-foundation/platform-editor — stub the editor so jsdom never needs to render it
vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: React.forwardRef((_props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    React.useImperativeHandle(ref, () => ({ setUsj: setUsjSpy }));
    return <div data-testid="editorial" />;
  }),
}));

// Captures the props handed to the real ResourceTextPanel component on every render, then renders
// it for real — so the other tests below keep exercising real behavior while the copy-limit
// tests can assert on the prop the web view computed.
vi.mock('./resource-text-panel.component', async (importOriginal) => {
  const original = await importOriginal<typeof import('./resource-text-panel.component')>();
  return {
    ...original,
    ResourceTextPanel: (props: React.ComponentProps<typeof original.ResourceTextPanel>) => {
      capturedResourceTextPanelProps(props);
      return <original.ResourceTextPanel {...props} />;
    },
  };
});

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
  useInstallDblResource: (...args: unknown[]) => mockUseInstallDblResource(...args),
  default: (...args: unknown[]) => mockUseInstallDblResource(...args),
}));

vi.mock('./use-is-online.hook', () => ({
  useIsOnline: vi.fn(() => true),
  default: vi.fn(() => true),
}));

vi.mock('./select-dbl-resource', () => ({
  selectTextConnection: vi.fn(),
}));

vi.mock('./scripture-text-grid/dbl-resource-lookup.utils', () => ({
  findCachedDblResource: (...args: unknown[]) => mockFindCachedDblResource(...args),
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
    installFailureReason: undefined,
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
  mockUseInstallDblResource.mockImplementation(() => vi.fn(async () => {}));
  mockUseProjectData.mockReturnValue({
    ChapterUSJ: vi.fn(() => [undefined, false]),
    BookCopyLimits: vi.fn(() => [undefined, vi.fn(), false]),
  });
  mockUseProjectDataProvider.mockReturnValue(undefined);
  mockFindCachedDblResource.mockReturnValue(undefined);
  // Module-scoped, so it outlives `restoreAllMocks` and has to be cleared explicitly.
  setUsjSpy.mockClear();
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
      installFailureReason: 'installRejected',
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

describe('ResourceTextPanel — install against a stale catalog', () => {
  const UNINSTALLED_WEB: DblResourceData = {
    dblEntryUid: 'uid-web',
    displayName: 'WEB',
    fullName: 'World English Bible',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1200,
    installed: false,
    updateAvailable: false,
    projectId: '',
  };
  const INSTALLED_WEB: DblResourceData = { ...UNINSTALLED_WEB, installed: true, projectId: 'WEB1' };
  const CHAPTER_USJ: Usj = {
    type: 'USJ',
    version: '3.1',
    content: [
      { type: 'chapter', marker: 'c', number: '1' },
      {
        type: 'para',
        marker: 'p',
        content: [{ type: 'verse', marker: 'v', number: '1' }, 'In the beginning'],
      },
    ],
  };

  it('shows the text in the same panel once a retry re-reads a catalog that has caught up', async () => {
    // The real auto-install hook and catalog lookup, so the failure, the retry and the recovery are
    // this panel's own behaviour rather than values the test hands it.
    const actualAutoInstall = await vi.importActual<
      typeof import('./use-dbl-resource-auto-install.hook')
    >('./use-dbl-resource-auto-install.hook');
    mockUseDblResourceAutoInstall.mockImplementation(actualAutoInstall.useDblResourceAutoInstall);
    const actualLookup = await vi.importActual<
      typeof import('./scripture-text-grid/dbl-resource-lookup.utils')
    >('./scripture-text-grid/dbl-resource-lookup.utils');
    mockFindCachedDblResource.mockImplementation(actualLookup.findCachedDblResource);
    // One identity for the whole test: the hook reads a new installer as a reason to install again.
    const installResource = vi.fn(async () => {});
    mockUseInstallDblResource.mockReturnValue(installResource);
    // The chapter is read through the provider resolved for the resource's project.
    const chapterProviders = new Map<string, { projectId: string }>();
    mockUseProjectDataProvider.mockImplementation(
      (projectInterface: string, resourceProjectId: string | undefined) => {
        if (projectInterface !== 'platformScripture.USJ_Chapter' || !resourceProjectId)
          return undefined;
        let provider = chapterProviders.get(resourceProjectId);
        if (!provider) {
          provider = { projectId: resourceProjectId };
          chapterProviders.set(resourceProjectId, provider);
        }
        return provider;
      },
    );
    mockUseProjectData.mockImplementation((_projectInterface: unknown, chapterProvider) => ({
      ChapterUSJ: () => [chapterProvider ? CHAPTER_USJ : undefined, vi.fn(), false],
      BookCopyLimits: () => [undefined, vi.fn(), false],
    }));
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.0.0', items: [] },
    });

    const refetchCatalog = vi.fn();
    /** The catalog as the panel's re-read returns it, and the picker row derived from it. */
    const setCatalog = (resources: DblResourceData[]) => {
      mockUseDblResourceCatalog.mockReturnValue({
        dblResources: resources,
        isLoadingResources: false,
        isCatalogReady: true,
        hasCatalogError: false,
        refetchCatalog,
      });
      const webRow = resources.find((resource) => resource.dblEntryUid === 'uid-web');
      mockUseResourcePickerResources.mockReturnValue([
        [
          {
            reference: { type: 'dblResource', id: 'uid-web', name: 'WEB' },
            source: 'user',
            isAdminLocked: false,
            type: 'ScriptureResource',
            installed: webRow?.installed ?? false,
            projectId: webRow?.installed ? webRow.projectId : undefined,
          },
        ],
        false,
      ]);
    };

    const ResourceTextPanel = getResourceTextPanel();
    const props = makeProps();
    setCatalog([UNINSTALLED_WEB]);
    const { rerender } = render(<ResourceTextPanel {...props} />);
    await waitFor(() => expect(installResource).toHaveBeenCalledWith('uid-web'));

    // The install succeeded as a no-op, and the re-read it triggers comes back still stale.
    setCatalog([]);
    rerender(<ResourceTextPanel {...props} />);
    setCatalog([{ ...UNINSTALLED_WEB }]);
    rerender(<ResourceTextPanel {...props} />);
    expect(await screen.findByText("Installed, but couldn't be opened.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(refetchCatalog).toHaveBeenCalledTimes(1);
    // The re-read the retry started: the catalog empties while in flight, then comes back current.
    setCatalog([]);
    rerender(<ResourceTextPanel {...props} />);
    setCatalog([INSTALLED_WEB]);
    rerender(<ResourceTextPanel {...props} />);

    await waitFor(() => expect(setUsjSpy).toHaveBeenCalledWith(CHAPTER_USJ));
    const chapterReads = mockUseProjectData.mock.calls.filter(
      ([projectInterface]) => projectInterface === 'platformScripture.USJ_Chapter',
    );
    expect(chapterReads.at(-1)).toEqual([
      'platformScripture.USJ_Chapter',
      chapterProviders.get('WEB1'),
    ]);
    expect(chapterProviders.get('WEB1')).toBeDefined();
  });
});

/** A Bible text the picker offers, so the panel shows its chapter and asks for its copy limits. */
const SELECTED_RESOURCE: PickerResource = {
  reference: { type: 'project', name: 'RES', id: 'resource-project-id' },
  source: 'user',
  isAdminLocked: false,
  type: 'ScriptureResource',
  installed: true,
  projectId: 'resource-project-id',
};

/**
 * Renders the panel showing `SELECTED_RESOURCE` at `chapterNum` with the given `useProjectData`
 * methods, and returns a function that renders it again at another chapter.
 */
function renderSelectedResource(projectDataMethods: Record<string, unknown>, chapterNum: number) {
  mockUseProjectData.mockReturnValue(projectDataMethods);
  mockUseResourcePickerResources.mockReturnValue([[SELECTED_RESOURCE], false]);
  vi.mocked(usePromise).mockImplementation(
    // The copy limit waits on a metadata lookup through `usePromise`, which this file stubs for
    // the resource catalog; the hoisted holder can only type the real hook as `unknown`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    realUsePromise.current as typeof usePromise,
  );
  mockUseEffectiveResourceReferenceList.mockReturnValue({
    status: 'ready',
    list: { dataVersion: '1.0.0', items: [] },
  });

  const propsAt = (chapter: number) =>
    makeProps({
      useWebViewScrollGroupScrRef: vi.fn<UseWebViewScrollGroupScrRefHook>(() => [
        { book: 'GEN', chapterNum: chapter, verseNum: 1, versificationStr: 'English' },
        vi.fn(),
        undefined,
        vi.fn(),
        undefined,
      ]),
    });
  const ResourceTextPanel = getResourceTextPanel();
  const { rerender } = render(<ResourceTextPanel {...propsAt(chapterNum)} />);
  return (chapter: number) => rerender(<ResourceTextPanel {...propsAt(chapter)} />);
}

const STALE_USJ = { type: 'USJ', version: '3.1', content: [] };

describe('ResourceTextPanel — copy limit', () => {
  afterEach(() => {
    vi.mocked(usePromise).mockImplementation(() => [undefined, false]);
  });

  it('passes the chapter copy limit resolved by the hook down to the panel component', async () => {
    renderSelectedResource(
      {
        ChapterUSJ: vi.fn(() => [STALE_USJ, vi.fn(), false]),
        BookCopyLimits: vi.fn(() => [[undefined, 9], vi.fn(), false]),
      },
      1,
    );

    await waitFor(() =>
      expect(capturedResourceTextPanelProps).toHaveBeenLastCalledWith(
        expect.objectContaining({ copyLimit: 9 }),
      ),
    );
  });

  // `useChapterCopyLimit` resolves the NEW chapter's limit immediately (book-level limits are
  // pre-loaded), but `useProjectData` keeps serving the PREVIOUS chapter's text
  // (`usjPossiblyError`) until its own fetch resolves — and unlike the Scripture Text Grid's
  // `ResourceCell`, this panel's content-state resolution does not hide the editor while that
  // fetch is in flight (`resolveResourceContentState` only inspects the USJ value, never the
  // loading flag), so the stale chapter stays mounted and would otherwise be copyable under the
  // new chapter's — possibly larger — limit for the whole round trip.
  it('forces the copy limit to 0 while this chapter is loading, even though the limit is already known', async () => {
    // A defined (non-`undefined`, non-error) value — the PREVIOUS chapter's stale USJ, which
    // `useProjectData` keeps serving while `isUsjLoading` is true — so `resolveResourceContentState`
    // resolves `'ready'` rather than `'loading'`, matching what actually keeps the editor mounted.
    const methods = {
      ChapterUSJ: vi.fn(() => [STALE_USJ, vi.fn(), false]),
      BookCopyLimits: vi.fn(() => [[undefined, 9], vi.fn(), false]),
    };
    const renderAtChapter = renderSelectedResource(methods, 1);
    await waitFor(() =>
      expect(capturedResourceTextPanelProps).toHaveBeenLastCalledWith(
        expect.objectContaining({ copyLimit: 9 }),
      ),
    );

    methods.ChapterUSJ.mockImplementation(() => [STALE_USJ, vi.fn(), true]);
    renderAtChapter(1);

    expect(capturedResourceTextPanelProps).toHaveBeenLastCalledWith(
      expect.objectContaining({ copyLimit: 0 }),
    );
  });

  it('blocks copying on the render that changes chapter, before the new chapter text is asked for', async () => {
    // The mocked fetch never reports loading, as on the render before `useProjectData`'s effect
    // marks the new chapter as loading.
    const renderAtChapter = renderSelectedResource(
      {
        ChapterUSJ: vi.fn(() => [STALE_USJ, vi.fn(), false]),
        BookCopyLimits: vi.fn(() => [[undefined, 9, 12], vi.fn(), false]),
      },
      1,
    );
    await waitFor(() =>
      expect(capturedResourceTextPanelProps).toHaveBeenLastCalledWith(
        expect.objectContaining({ copyLimit: 9 }),
      ),
    );
    const rendersBeforeChange = capturedResourceTextPanelProps.mock.calls.length;

    renderAtChapter(2);

    const [[propsOnChange]] = capturedResourceTextPanelProps.mock.calls.slice(rendersBeforeChange);
    expect(propsOnChange).toEqual(expect.objectContaining({ copyLimit: 0 }));
    renderAtChapter(2);
    expect(capturedResourceTextPanelProps).toHaveBeenLastCalledWith(
      expect.objectContaining({ copyLimit: 12 }),
    );
  });
});
