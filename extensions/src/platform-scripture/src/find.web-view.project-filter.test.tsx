// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { type ComponentType } from 'react';
import type { WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import type { FindProject, FindProps } from './find/find.component';
import { useOpenProjectTabs } from './hooks/use-open-project-tabs';

// Which projects the web view offers, searches and moves to, read from the props it passes `Find`
// (mocked, so they can be asserted directly) and the calls it makes. Which rows a `projects` array
// produces is covered in find/find.component.test.tsx.

const { capturedFindProps, findPdp } = vi.hoisted(() => {
  const captured: { value: FindProps | undefined } = { value: undefined };
  return {
    capturedFindProps: captured,
    /**
     * The find provider for every project. One object for the whole run, as the real hook keeps one
     * per project: a new identity every render would re-run every effect keyed on it.
     */
    findPdp: {
      beginFindJob: vi.fn(async () => 'job-1'),
      abandonFindJob: vi.fn(async () => true),
      stopFindJob: vi.fn(async () => true),
      retrieveFindJobUpdate: vi.fn(async (): Promise<unknown> => undefined),
    },
  };
});

// jsdom has no IntersectionObserver; find.web-view.tsx's real (unmocked) `useViewVisibility` call
// needs one to exist, even though `Find` — the only thing it would otherwise gate — is mocked away.
beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: vi.fn(() => []),
    })),
  );
});

vi.mock('@papi/frontend', () => ({
  default: {
    window: { dataProviderName: 'platform.window', setFocus: vi.fn(async () => undefined) },
    localization: { dataProviderName: 'platform.localizationDataServiceDataProvider' },
    projectLookup: {
      getMetadataForAllProjects: vi.fn(async () => [{ id: 'P1' }]),
    },
    projectDataProviders: {
      get: vi.fn(async () => ({ getSetting: vi.fn(async () => undefined) })),
    },
    commands: { sendCommand: vi.fn(async () => undefined) },
    notifications: { send: vi.fn(async () => undefined) },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  network: { getNetworkEvent: vi.fn(() => () => () => true) },
}));

vi.mock('@papi/frontend/react', () => {
  /** Keys that resolve to real text; every other key echoes itself, as an unresolved one does. */
  const translations: Record<string, string> = {
    '%project_unsupported_studyBibleAdditions%':
      "Study Bible Additions projects aren't supported yet.",
  };
  const localize = (keys: string[]) =>
    Object.fromEntries(keys.map((key) => [key, translations[key] ?? key]));
  /**
   * Every data type any `useData(...)` call reads resolves to the default it was given, except the
   * localization data type, which the refusal message reads through `useData`.
   */
  const dataTypes = new Proxy(
    {},
    {
      get: (_target, dataType) =>
        dataType === 'LocalizedStrings'
          ? ({ localizeKeys }: { localizeKeys: string[] }) => [
              localize(localizeKeys),
              vi.fn(),
              false,
            ]
          : (_selector: unknown, defaultValue: unknown) => [defaultValue, vi.fn(), false],
    },
  );
  return {
    useLocalizedStrings: (keys: string[]) => [localize(keys), false],
    useData: vi.fn(() => dataTypes),
    useDataProvider: vi.fn(() => undefined),
    useProjectData: vi.fn(() => dataTypes),
    useProjectDataProvider: (projectInterface: string) =>
      projectInterface === 'platformScripture.findInScripture' ? findPdp : undefined,
    useProjectSetting: (_projectId: unknown, _key: string, defaultValue: unknown) => [
      defaultValue,
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
      projectId: 'P1',
      scrollGroupId: 0,
      webViewType: 'platformScriptureEditor.react',
      projectSource: 'container',
    },
  ]),
}));

vi.mock('./hooks/use-project-recency-map', () => {
  // One map for every render, as the real hook keeps: a new one each render would make the picker's
  // project list, and the reassignment effect keyed on it, change on every render.
  const recencyMap = new Map();
  return { useProjectRecencyMap: vi.fn(() => recencyMap) };
});

vi.mock('./find/find.component', () => ({
  Find: (props: FindProps) => {
    capturedFindProps.value = props;
    return undefined;
  },
  FIND_LOCALIZED_STRING_KEYS: [],
}));

// ---------------------------------------------------------------------------
// Import the web view AFTER the mocks. It assigns to global.webViewComponent.
// ---------------------------------------------------------------------------
// eslint-disable-next-line import/first
import './find.web-view';

function getFindWebView(): ComponentType<WebViewProps> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<WebViewProps>;
}

/**
 * Renders Find bound to `projectId`, with `searchTerm` already in its search box. Returns the
 * `updateWebViewDefinition` spy, which is how Find moves itself to another project; the spy does
 * not feed the new id back in, so the bound project stays what the test gave it.
 */
function renderFind({
  projectId = 'P1',
  searchTerm = '',
}: { projectId?: string; searchTerm?: string } = {}) {
  const FindWebView = getFindWebView();
  const updateWebViewDefinition = vi.fn(() => true);
  // Stable per key, like the real setters: a new setter every render changes the identity of every
  // callback built on one, and the effects keyed on those would re-run on every render.
  const webViewStateSetters = new Map<string, () => void>();
  const getWebViewStateSetter = (key: string) => {
    const existing = webViewStateSetters.get(key);
    if (existing) return existing;
    const setter = vi.fn();
    webViewStateSetters.set(key, setter);
    return setter;
  };
  const scrollGroupScrRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
  const setScrollGroupScrRef = vi.fn();
  const setScrollGroupId = vi.fn();
  // The literal supplies only the props the web view reads; the double cast avoids restating every
  // optional field of WebViewProps.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const props = {
    id: 'find-1',
    projectId,
    updateWebViewDefinition,
    useWebViewScrollGroupScrRef: () => [
      scrollGroupScrRef,
      setScrollGroupScrRef,
      0,
      setScrollGroupId,
    ],
    useWebViewState: (key: string, defaultValue: unknown) => [
      key === 'findSearchTerm' ? searchTerm : defaultValue,
      getWebViewStateSetter(key),
    ],
  } as unknown as WebViewProps;
  render(<FindWebView {...props} />);
  return { updateWebViewDefinition };
}

const SBA_REASON_KEY = '%project_unsupported_studyBibleAdditions%';
const SBA_REASON_TEXT = "Study Bible Additions projects aren't supported yet.";

function editorTab(projectId: string, scrollGroupId: number) {
  return {
    webViewId: `editor-${projectId}`,
    projectId,
    scrollGroupId,
    webViewType: 'platformScriptureEditor.react',
    projectSource: 'container' as const,
  };
}

/** Metadata for P1 and P2, with P2 marked as a project that cannot be opened unless told not to. */
function mockMetadata({ isP2Unsupported = true }: { isP2Unsupported?: boolean } = {}) {
  vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockResolvedValue([
    { id: 'P1', projectInterfaces: [], pdpFactoryInfo: {} },
    {
      id: 'P2',
      projectInterfaces: [],
      pdpFactoryInfo: {},
      ...(isP2Unsupported ? { unsupportedReason: SBA_REASON_KEY } : {}),
    },
  ]);
}

function findProjectIds(): string[] | undefined {
  return capturedFindProps.value?.projects.map((project: FindProject) => project.id);
}

describe('Find web view — project picker leaves out a project that cannot be opened', () => {
  beforeEach(() => {
    capturedFindProps.value = undefined;
    vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockClear();
    vi.mocked(useOpenProjectTabs).mockReturnValue([
      {
        webViewId: 'editor-p1',
        projectId: 'P1',
        scrollGroupId: 0,
        webViewType: 'platformScriptureEditor.react',
        projectSource: 'container',
      },
      {
        webViewId: 'editor-p2',
        projectId: 'P2',
        scrollGroupId: 1,
        webViewType: 'platformScriptureEditor.react',
        projectSource: 'container',
      },
    ]);
    vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockResolvedValue([
      { id: 'P1', projectInterfaces: [], pdpFactoryInfo: {} },
      {
        id: 'P2',
        projectInterfaces: [],
        pdpFactoryInfo: {},
        unsupportedReason: '%project_unsupported_studyBibleAdditions%',
      },
    ]);
  });

  it('offers only the openable project, even though both are open in a tab', async () => {
    renderFind();

    await waitFor(() => expect(findProjectIds()).toEqual(['P1']));
  });

  it('does not trigger an extra metadata refetch for the open-but-unsupported project', async () => {
    renderFind();

    await waitFor(() => expect(findProjectIds()).toEqual(['P1']));

    // The picker filters P2 out downstream of the fetch, so P2 still counts as "known" to the
    // refetch-on-missing-metadata effect; that effect must not treat it as missing and re-fetch.
    expect(papi.projectLookup.getMetadataForAllProjects).toHaveBeenCalledTimes(1);
  });
});

describe('Find web view — never searches a project that cannot be opened', () => {
  beforeEach(() => {
    capturedFindProps.value = undefined;
    vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockClear();
    Object.values(findPdp).forEach((mockFunction) => mockFunction.mockClear());
    findPdp.retrieveFindJobUpdate.mockResolvedValue(undefined);
  });

  describe('when the bound project has no open tab left', () => {
    beforeEach(() => {
      vi.mocked(useOpenProjectTabs).mockReturnValue([editorTab('P2', 0), editorTab('P1', 1)]);
    });

    it('moves to an openable project rather than the unopenable one sorted first', async () => {
      mockMetadata();

      const { updateWebViewDefinition } = renderFind({ projectId: 'P3' });

      await waitFor(() =>
        expect(updateWebViewDefinition).toHaveBeenCalledWith({ projectId: 'P1' }),
      );
      expect(updateWebViewDefinition).not.toHaveBeenCalledWith({ projectId: 'P2' });
    });

    it('moves to the project sorted first when every project can be opened', async () => {
      mockMetadata({ isP2Unsupported: false });

      const { updateWebViewDefinition } = renderFind({ projectId: 'P3' });

      await waitFor(() =>
        expect(updateWebViewDefinition).toHaveBeenCalledWith({ projectId: 'P2' }),
      );
    });
  });

  it('reports no open projects when the only open tab cannot be opened', async () => {
    mockMetadata();
    vi.mocked(useOpenProjectTabs).mockReturnValue([editorTab('P2', 0)]);

    renderFind();

    await waitFor(() => expect(capturedFindProps.value?.isLoadingProjects).toBe(false));
    expect(capturedFindProps.value?.noOpenProjects).toBe(true);
  });

  it('reports an open project when the only open tab can be opened', async () => {
    mockMetadata();
    vi.mocked(useOpenProjectTabs).mockReturnValue([editorTab('P1', 0)]);

    renderFind();

    await waitFor(() => expect(capturedFindProps.value?.isLoadingProjects).toBe(false));
    expect(capturedFindProps.value?.noOpenProjects).toBe(false);
  });

  // Find can still be bound to such a project, for instance by a layout saved before the project was
  // known to be unsupported.
  it('moves off a bound project that cannot be opened, without searching it', async () => {
    mockMetadata();
    vi.mocked(useOpenProjectTabs).mockReturnValue([editorTab('P2', 0), editorTab('P1', 1)]);

    // The spy does not feed the new id back in, so Find stays bound to P2 for the whole test: any
    // search it began would be a search of P2.
    const { updateWebViewDefinition } = renderFind({ projectId: 'P2', searchTerm: 'grace' });

    await waitFor(() => expect(updateWebViewDefinition).toHaveBeenCalledWith({ projectId: 'P1' }));
    expect(findPdp.beginFindJob).not.toHaveBeenCalled();
  });

  it('never searches a bound project that cannot be opened when no other project is open', async () => {
    mockMetadata();
    vi.mocked(useOpenProjectTabs).mockReturnValue([editorTab('P2', 0)]);

    renderFind({ projectId: 'P2', searchTerm: 'grace' });

    await waitFor(() => expect(capturedFindProps.value?.noOpenProjects).toBe(true));
    expect(findPdp.beginFindJob).not.toHaveBeenCalled();
  });

  it('searches a bound project that can be opened', async () => {
    mockMetadata();
    vi.mocked(useOpenProjectTabs).mockReturnValue([editorTab('P1', 0)]);

    renderFind({ projectId: 'P1', searchTerm: 'grace' });

    await waitFor(() => expect(findPdp.beginFindJob).toHaveBeenCalled());
    expect(capturedFindProps.value?.searchError).toBe(undefined);
  });

  it('shows the reason when the backend refuses the search', async () => {
    mockMetadata({ isP2Unsupported: false });
    vi.mocked(useOpenProjectTabs).mockReturnValue([editorTab('P1', 0)]);
    findPdp.retrieveFindJobUpdate.mockResolvedValue({
      jobId: 'job-1',
      status: 'errored',
      percentComplete: 0,
      totalResultsCount: 0,
      error: `JSON-RPC Request error (-32000): Project 'P1' can't be opened in Platform.Bible: ${SBA_REASON_KEY} (PROJECT_OPEN_BLOCKED)`,
    });

    renderFind({ projectId: 'P1', searchTerm: 'grace' });

    await waitFor(() => expect(capturedFindProps.value?.openBlockedMessage).toBe(SBA_REASON_TEXT));
    // The raw refusal is not shown as a generic error as well.
    expect(capturedFindProps.value?.searchError).toBeUndefined();
  });

  it('shows any other job error as it arrives', async () => {
    mockMetadata({ isP2Unsupported: false });
    vi.mocked(useOpenProjectTabs).mockReturnValue([editorTab('P1', 0)]);
    findPdp.retrieveFindJobUpdate.mockResolvedValue({
      jobId: 'job-1',
      status: 'errored',
      percentComplete: 0,
      totalResultsCount: 0,
      error: 'Invalid regular expression',
    });

    renderFind({ projectId: 'P1', searchTerm: 'grace' });

    await waitFor(() =>
      expect(capturedFindProps.value?.searchError).toBe('Invalid regular expression'),
    );
  });
});
