// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { type ComponentType, useCallback, useState } from 'react';
import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useWebViewController } from '@papi/frontend/react';
import type { FindProject, FindProps } from './find/find.component';
import type { HidableFindResult } from './find/search-result.component';
import type {
  OpenProjectTabWithWebView,
  UseOpenProjectTabsOptions,
  WebViewFilter,
} from './hooks/use-open-project-tabs';

// Which projects the web view offers, searches and moves to, read from the props it passes `Find`
// (mocked, so they can be asserted directly) and the calls it makes. Which rows a `projects` array
// produces is covered in find/find.component.test.tsx.

const { capturedFindProps, findPdp, findPdpProjectIds, openTabs } = vi.hoisted(() => {
  const captured: { value: FindProps | undefined } = { value: undefined };
  const tabs: { value: readonly OpenProjectTabWithWebView[] } = { value: [] };
  const pdpProjectIds: Array<string | undefined> = [];
  return {
    capturedFindProps: captured,
    /** Every project id the web view asked for a find provider for, in order. */
    findPdpProjectIds: pdpProjectIds,
    /** The tabs `useOpenProjectTabs` sees as open, before the web view's filter. Set per test. */
    openTabs: tabs,
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
    useProjectDataProvider: (projectInterface: string, projectId: string | undefined) => {
      if (projectInterface !== 'platformScripture.findInScripture') return undefined;
      findPdpProjectIds.push(projectId);
      return findPdp;
    },
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

vi.mock('./hooks/use-open-project-tabs', () => {
  // The last filtered list, handed back while neither the tabs nor the arguments change, as the
  // real hook keeps one list in state: a new array every render would re-run every effect keyed on
  // it.
  let cache:
    | {
        tabs: readonly OpenProjectTabWithWebView[];
        filter: WebViewFilter | undefined;
        includeNavigableProjectIds: boolean;
        result: OpenProjectTabWithWebView[];
      }
    | undefined;
  return {
    // Applies the filter and options it is given, as the real hook does, so the web view's own
    // choice of which tabs count is part of what each test exercises: a project a tab declares
    // (`projectSource: 'declared'`) is reported only when the caller asks for declared projects.
    useOpenProjectTabs: vi.fn((filter?: WebViewFilter, options?: UseOpenProjectTabsOptions) => {
      const includeNavigableProjectIds = options?.includeNavigableProjectIds ?? false;
      if (
        cache?.tabs !== openTabs.value ||
        cache.filter !== filter ||
        cache.includeNavigableProjectIds !== includeNavigableProjectIds
      ) {
        cache = {
          tabs: openTabs.value,
          filter,
          includeNavigableProjectIds,
          result: openTabs.value.filter(
            (tab) =>
              (!filter || filter(tab)) &&
              (includeNavigableProjectIds || tab.projectSource !== 'declared'),
          ),
        };
      }
      return cache.result;
    }),
  };
});

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
 * not feed the new id back in, so the bound project stays what the test gave it. Also returns the
 * spy for Find's scroll-group reference setter, which is how "go to result" moves its group.
 */
function renderFind({
  projectId = 'P1',
  searchTerm = '',
}: { projectId?: string; searchTerm?: string } = {}) {
  const FindWebView = getFindWebView();
  const updateWebViewDefinition = vi.fn(() => true);
  const initialWebViewState: Record<string, unknown> = { findSearchTerm: searchTerm };
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
    useWebViewState: (key: string, defaultValue: unknown) => {
      // Stateful so the web view's own writes feed straight back in, as the platform's real
      // useWebViewState does: the scroll group Find selects is what lets it target an editor.
      // Hooks inside a mock callback are the only way to get that, and the callback is only ever
      // called during render.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(
        key in initialWebViewState ? initialWebViewState[key] : defaultValue,
      );
      // Stable, like the real setter, so effects keyed on it don't re-run every render.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const write = useCallback((next: unknown) => setValue(next), []);
      return [value, write];
    },
  } as unknown as WebViewProps;
  render(<FindWebView {...props} />);
  return { updateWebViewDefinition, setScrollGroupScrRef };
}

/** {@link renderFind}, then waits until the project picker has finished loading. */
async function renderSettledFind(options: Parameters<typeof renderFind>[0] = {}) {
  const rendered = renderFind(options);
  await waitFor(() => expect(capturedFindProps.value?.isLoadingProjects).toBe(false));
  return rendered;
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

// Resets shared by every test below; each `describe` sets up only what is particular to it.
beforeEach(() => {
  capturedFindProps.value = undefined;
  vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockClear();
  Object.values(findPdp).forEach((mockFunction) => mockFunction.mockClear());
  findPdp.retrieveFindJobUpdate.mockResolvedValue(undefined);
  findPdpProjectIds.length = 0;
});

function findProjectIds(): string[] | undefined {
  return capturedFindProps.value?.projects.map((project: FindProject) => project.id);
}

describe('Find web view — project picker leaves out a project that cannot be opened', () => {
  beforeEach(() => {
    openTabs.value = [
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
    ];
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
  describe('when the bound project has no open tab left', () => {
    beforeEach(() => {
      openTabs.value = [editorTab('P2', 0), editorTab('P1', 1)];
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
    openTabs.value = [editorTab('P2', 0)];

    await renderSettledFind();
    expect(capturedFindProps.value?.noOpenProjects).toBe(true);
  });

  it('reports an open project when the only open tab can be opened', async () => {
    mockMetadata();
    openTabs.value = [editorTab('P1', 0)];

    await renderSettledFind();
    expect(capturedFindProps.value?.noOpenProjects).toBe(false);
  });

  // Find can still be bound to such a project, for instance by a layout saved before the project was
  // known to be unsupported.
  it('moves off a bound project that cannot be opened, without searching it', async () => {
    mockMetadata();
    openTabs.value = [editorTab('P2', 0), editorTab('P1', 1)];

    // The spy does not feed the new id back in, so Find stays bound to P2 for the whole test: any
    // search it began would be a search of P2.
    const { updateWebViewDefinition } = renderFind({ projectId: 'P2', searchTerm: 'grace' });

    await waitFor(() => expect(updateWebViewDefinition).toHaveBeenCalledWith({ projectId: 'P1' }));
    expect(findPdp.beginFindJob).not.toHaveBeenCalled();
  });

  it('never searches a bound project that cannot be opened when no other project is open', async () => {
    mockMetadata();
    openTabs.value = [editorTab('P2', 0)];

    renderFind({ projectId: 'P2', searchTerm: 'grace' });

    await waitFor(() => expect(capturedFindProps.value?.noOpenProjects).toBe(true));
    expect(findPdp.beginFindJob).not.toHaveBeenCalled();
  });

  it('searches a bound project that can be opened', async () => {
    mockMetadata();
    openTabs.value = [editorTab('P1', 0)];

    renderFind({ projectId: 'P1', searchTerm: 'grace' });

    await waitFor(() => expect(findPdp.beginFindJob).toHaveBeenCalled());
    expect(capturedFindProps.value?.searchError).toBe(undefined);
  });

  it('shows the reason when the backend refuses the search', async () => {
    mockMetadata({ isP2Unsupported: false });
    openTabs.value = [editorTab('P1', 0)];
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
    openTabs.value = [editorTab('P1', 0)];
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

const TEXT_COLLECTION_TYPE = 'platformScriptureEditor.scriptureTextGrid';

/**
 * One project a Text Collection tab reports: its container project, or a resource it declares as
 * shown in one of its cells.
 */
function gridTab(projectId: string, source: 'declared' | 'container', scrollGroupId = 0) {
  return {
    webViewId: 'grid-1',
    projectId,
    scrollGroupId,
    webViewType: TEXT_COLLECTION_TYPE,
    projectSource: source,
  };
}

/** A reference panel tab displaying `projectId`, which it declares. */
function panelTab(webViewType: string, webViewId: string, projectId: string) {
  return {
    webViewId,
    projectId,
    scrollGroupId: 0,
    webViewType,
    projectSource: 'declared' as const,
  };
}

/** Metadata for the editable projects P1 and P2 and the resources R1 and R2, all openable. */
function mockResourceMetadata() {
  vi.mocked(papi.projectLookup.getMetadataForAllProjects).mockResolvedValue([
    { id: 'P1', projectInterfaces: [], pdpFactoryInfo: {} },
    { id: 'P2', projectInterfaces: [], pdpFactoryInfo: {} },
    { id: 'R1', name: 'RES1', projectInterfaces: [], pdpFactoryInfo: {} },
    { id: 'R2', name: 'RES2', projectInterfaces: [], pdpFactoryInfo: {} },
  ]);
}

describe('Find web view — Text Collection resources', () => {
  beforeEach(() => {
    mockResourceMetadata();
  });

  it('offers each resource the Text Collection declares, but not its container project', async () => {
    openTabs.value = [
      gridTab('P1', 'container'),
      gridTab('R1', 'declared'),
      gridTab('R2', 'declared'),
    ];

    renderFind({ projectId: 'R1' });

    await waitFor(() => expect(findProjectIds()?.sort()).toEqual(['R1', 'R2']));
    expect(
      capturedFindProps.value?.projects.find((project) => project.id === 'R1')?.shortName,
    ).toBe('RES1');
  });

  it('keeps a Text Collection resource that has no open editor tab', async () => {
    openTabs.value = [editorTab('P2', 0), gridTab('P1', 'container'), gridTab('R1', 'declared')];

    const { updateWebViewDefinition } = await renderSettledFind({
      projectId: 'R1',
      searchTerm: 'grace',
    });

    await waitFor(() => expect(findPdp.beginFindJob).toHaveBeenCalled());
    // The search ran against the resource the grid supplied, and Find never moved off it.
    expect(findPdpProjectIds.at(-1)).toBe('R1');
    expect(findPdpProjectIds).not.toContain('P1');
    expect(updateWebViewDefinition).not.toHaveBeenCalled();
  });
});

describe('Find web view — go to a result in the Text Collection', () => {
  const RESULT_VERSE = { book: 'GEN', chapterNum: 1, verseNum: 1 };
  const RESULT: HidableFindResult = {
    text: 'grace',
    start: { verseRef: RESULT_VERSE, offset: 0 },
    end: { verseRef: RESULT_VERSE, offset: 5 },
    matchedUsfm: 'grace',
  };
  const revealResource = vi.fn(async () => undefined);
  const editorController = {
    selectRange: vi.fn(async () => undefined),
    setAnnotation: vi.fn(async () => undefined),
    runAnnotationAction: vi.fn(async () => undefined),
  };
  /** What the Text Collection's controller hands Find; a test may swap in a revoked proxy. */
  let textCollectionController: unknown;
  /** What an editor's controller hands Find: nothing, unless a test drives an editor. */
  let scriptureEditorController: unknown;

  beforeEach(() => {
    vi.mocked(papi.window.setFocus).mockClear();
    vi.mocked(logger.warn).mockClear();
    revealResource.mockClear();
    Object.values(editorController).forEach((mockFunction) => mockFunction.mockClear());
    textCollectionController = { revealResource };
    scriptureEditorController = undefined;
    mockResourceMetadata();
    // Per type, and `undefined` until there is an id to look up, as the real hook answers. The
    // hook's generic signature cannot be restated by a plain function, hence the cast.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(useWebViewController).mockImplementation(((
      webViewType: string,
      webViewId: string | undefined,
    ) => {
      if (webViewId === undefined) return undefined;
      if (webViewType === TEXT_COLLECTION_TYPE) return textCollectionController;
      if (webViewType === 'platformScriptureEditor.react') return scriptureEditorController;
      return undefined;
    }) as unknown as typeof useWebViewController);
  });

  afterEach(() => {
    vi.mocked(useWebViewController).mockImplementation(() => undefined);
  });

  /** Renders Find bound to R1, waits for the picker to settle, then double-clicks the result. */
  async function goToResultInR1() {
    const { setScrollGroupScrRef } = await renderSettledFind({ projectId: 'R1' });
    await act(async () => {
      capturedFindProps.value?.onResultDoubleClick?.(RESULT, 0);
    });
    return { setScrollGroupScrRef };
  }

  it('brings the Text Collection forward and reveals the resource’s cell', async () => {
    openTabs.value = [gridTab('P1', 'container'), gridTab('R1', 'declared')];

    const { setScrollGroupScrRef } = await goToResultInR1();

    expect(papi.window.setFocus).toHaveBeenCalledWith({ focusType: 'webView', id: 'grid-1' });
    expect(revealResource).toHaveBeenCalledWith('R1');
    expect(setScrollGroupScrRef).toHaveBeenCalledWith(RESULT_VERSE);
  });

  it('activates the tab before it asks the Text Collection to reveal the cell', async () => {
    openTabs.value = [gridTab('P1', 'container'), gridTab('R1', 'declared')];

    await goToResultInR1();

    const setFocusOrder = vi.mocked(papi.window.setFocus).mock.invocationCallOrder[0];
    const revealOrder = revealResource.mock.invocationCallOrder[0];
    expect(setFocusOrder).toBeDefined();
    expect(revealOrder).toBeDefined();
    expect(setFocusOrder).toBeLessThan(revealOrder);
  });

  it('neither activates the tab nor reveals the cell on a single-click preview', async () => {
    openTabs.value = [gridTab('P1', 'container'), gridTab('R1', 'declared')];
    const { setScrollGroupScrRef } = await renderSettledFind({ projectId: 'R1' });

    await act(async () => {
      capturedFindProps.value?.onFocusedResultChange(RESULT, 0);
    });

    expect(setScrollGroupScrRef).toHaveBeenCalledWith(RESULT_VERSE);
    expect(papi.window.setFocus).not.toHaveBeenCalled();
    expect(revealResource).not.toHaveBeenCalled();
  });

  it('logs that the tab was activated without a reveal when the controller is not ready', async () => {
    textCollectionController = undefined;
    openTabs.value = [gridTab('P1', 'container'), gridTab('R1', 'declared')];
    vi.mocked(logger.debug).mockClear();

    await goToResultInR1();

    expect(papi.window.setFocus).toHaveBeenCalledWith({ focusType: 'webView', id: 'grid-1' });
    expect(revealResource).not.toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalledWith(expect.stringContaining('R1'));
  });

  it('reveals a Bible texts panel showing the same resource instead', async () => {
    openTabs.value = [
      gridTab('P1', 'container'),
      gridTab('R1', 'declared'),
      panelTab('platformScriptureEditor.bibleTexts', 'bible-texts-1', 'R1'),
    ];

    await goToResultInR1();

    expect(papi.window.setFocus).toHaveBeenCalledWith({
      focusType: 'webView',
      id: 'bible-texts-1',
    });
    expect(papi.window.setFocus).not.toHaveBeenCalledWith({ focusType: 'webView', id: 'grid-1' });
    expect(revealResource).not.toHaveBeenCalled();
  });

  it('activates nothing when the resource is shown in Model text', async () => {
    openTabs.value = [
      gridTab('P1', 'container'),
      gridTab('R1', 'declared'),
      panelTab('platformScriptureEditor.modelText', 'model-text-1', 'R1'),
    ];

    const { setScrollGroupScrRef } = await goToResultInR1();

    expect(setScrollGroupScrRef).toHaveBeenCalledWith(RESULT_VERSE);
    expect(papi.window.setFocus).not.toHaveBeenCalled();
    expect(revealResource).not.toHaveBeenCalled();
  });

  it('drives an editor showing the same resource instead', async () => {
    scriptureEditorController = editorController;
    openTabs.value = [gridTab('P1', 'container'), gridTab('R1', 'declared'), editorTab('R1', 0)];

    await goToResultInR1();

    expect(papi.window.setFocus).toHaveBeenCalledWith({ focusType: 'webView', id: 'editor-R1' });
    expect(editorController.selectRange).toHaveBeenCalled();
    expect(revealResource).not.toHaveBeenCalled();
  });

  it('contains a controller whose proxy has been revoked', async () => {
    textCollectionController = {
      get revealResource(): never {
        throw new TypeError('Cannot perform a get on a proxy that has been revoked');
      },
    };
    openTabs.value = [gridTab('P1', 'container'), gridTab('R1', 'declared')];

    await goToResultInR1();

    expect(papi.window.setFocus).toHaveBeenCalledWith({ focusType: 'webView', id: 'grid-1' });
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('proxy that has been revoked'),
    );
  });
});
