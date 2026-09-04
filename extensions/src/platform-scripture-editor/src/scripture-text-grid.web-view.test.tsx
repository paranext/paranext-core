// @vitest-environment jsdom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';
import type { WebViewProps } from '@papi/core';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReferenceList } from 'platform-scripture';
// Importing the web view assigns its component to `globalThis.webViewComponent` — that assignment
// is the module's only "export", so this import is loaded for its side effect.
import './scripture-text-grid.web-view';
import type { TextCollectionSources } from './scripture-text-grid-contents.utils';
import type { GridResource } from './scripture-text-grid/resource-cell.component';

/**
 * Covers the behaviors of the Scripture Text Grid web view that only exist once the whole view is
 * assembled: the View Options disabled reason, the chapter-context split's lifetime across a
 * project change, the reorder write gate, and first-open overlay seeding. Each of those is a
 * decision the web view itself makes from what `useTextCollectionSources` reports, so that hook is
 * the lever these tests pull.
 *
 * The web view assigns its component to `globalThis.webViewComponent` (the contract Platform.Bible
 * loads a React web view through) rather than exporting it, so the module is imported for its side
 * effect and the component is read off the global below. No other web view in this repo has a test
 * yet, so this harness is the first of its kind — keep it minimal.
 */

const ScriptureTextGridWebView = globalThis.webViewComponent;

/** The minimal per-user text-connection PDP surface the web view reads and writes through. */
function createFakeTextConnectionPdp() {
  return {
    initializeTextCollectionOverlay: vi.fn(() => Promise.resolve(true)),
    setUserReferencedProjectsAndResources: vi.fn(() => Promise.resolve(true)),
    setTextCollectionOverlay: vi.fn(() => Promise.resolve(true)),
    setCellOrder: vi.fn(() => Promise.resolve(true)),
  };
}
type FakeTextConnectionPdp = ReturnType<typeof createFakeTextConnectionPdp>;

/** What the mocked `useTextCollectionSources` hands back for a given project id. */
type TextCollectionSourcesResult = {
  sources: TextCollectionSources | undefined;
  textConnectionPdp: FakeTextConnectionPdp | undefined;
  textConnectionState: { status: 'noSource' | 'loading' | 'unavailable' | 'ready' };
  isOrderPending: boolean;
};

/** Props the grid stand-in below reads; a subset of the real `ScriptureTextGrid`'s. */
type GridStandInProps = {
  resources: GridResource[];
  chapterContext?: GridResource;
  onChapterContextChange?: (context: GridResource) => void;
  onReorder?: (newShownIdSequence: string[]) => void;
};

/**
 * Per-project hook results for the render in flight, keyed by the project id the web view asks for.
 * Keyed (rather than a single value) because the project-change tests need the incoming project to
 * report something different from the outgoing one.
 */
let hookResultsByProjectId = new Map<string | undefined, TextCollectionSourcesResult>();
/** Result for any project id not in the map above. */
let fallbackHookResult: TextCollectionSourcesResult;
/** The resource the Get Resources dialog "returns" when the picker is opened. */
let pickerResult: DblResourceData | undefined;
/** Stands in for the `platformGetResources.dblResourcesProvider` data provider. */
let dblResourcesProvider: { installDblResource: (dblEntryUid: string) => Promise<unknown> };

function readHookResult(projectId: string | undefined): TextCollectionSourcesResult {
  return hookResultsByProjectId.get(projectId) ?? fallbackHookResult;
}

/** The English strings for every key the web view renders, so assertions read like the UI does. */
const STRINGS: Record<string, string> = {
  '%webView_scriptureTextGrid_title_multiple%': 'Text Collection',
  '%webView_scriptureTextGrid_viewOptions_openPanel%': 'View Options',
  '%webView_resourcePanel_noProject%': 'No project selected.',
  '%general_loading%': 'Loading',
  '%webView_scriptureTextGrid_viewOptions_notSupported%':
    'Text Collection settings are not available for this project.',
  '%webView_scriptureTextGrid_viewOptions_settingsUnavailable%':
    "Couldn't load your texts. They will appear once they're available.",
  '%webView_scriptureTextGrid_chapterContext_close%': 'Close chapter view',
  '%webView_scriptureTextGrid_emptyState_prompt%':
    'No texts to display. Open {viewOptionsLabel} to choose which texts to show.',
  '%webView_scriptureTextGrid_cell_accessibleName%': '{resourceName}, {reference}',
  '%webView_scriptureTextGrid_aria_chapterContextOpened%':
    'Chapter view opened for {resourceReference}',
  '%webView_scriptureTextGrid_aria_chapterContextClosed%': 'Chapter view closed',
  '%webView_scriptureTextGrid_cell_zoomIn%': 'Zoom in',
  '%webView_scriptureTextGrid_cell_zoomOut%': 'Zoom out',
  '%webView_scriptureTextGrid_cell_resetZoom%': 'Reset zoom',
  '%webView_scriptureTextGrid_cell_zoomOptions%': 'Zoom options for {resourceName}',
  '%webView_scriptureTextGrid_cell_reorderAnnouncement%':
    'Moved {resourceName} to position {position} of {total}',
  '%webView_scriptureTextGrid_cell_reorderHandle%': 'Reorder {resourceName}',
  '%webView_scriptureTextGrid_cell_reorderHint%': 'Drag or press arrow keys to reorder',
  '%webView_scriptureTextGrid_viewOptions_viewHeader%': 'View',
  '%webView_scriptureTextGrid_viewOptions_verse%': 'Verse',
  '%webView_scriptureTextGrid_viewOptions_chapter%': 'Chapter',
  '%webView_scriptureTextGrid_viewOptions_comingSoon%': 'Coming soon',
  '%webView_scriptureTextGrid_viewOptions_textsHeader%': 'Texts',
  '%webView_scriptureTextGrid_viewOptions_emptyState_prompt%':
    'No texts added yet. Use {getResourcesLabel} to add them.',
  '%webView_scriptureTextGrid_viewOptions_getResources%': 'Get resources…',
  '%webView_scriptureTextGrid_viewOptions_adminSharedLock%': 'Shared by administrator',
  '%webView_scriptureTextGrid_viewOptions_removeFromList%': 'Remove {resourceName} from list',
  '%webView_scriptureTextGrid_viewOptions_installing%': 'Installing {resourceName}…',
};

const VIEW_OPTIONS_LABEL = 'View Options';
const TEXTS_HEADER = 'Texts';
const GET_RESOURCES_LABEL = 'Get resources…';

/**
 * Stands in for `papi.commands.sendCommand`; the cached-DBL-resource fetch is the only command this
 * render path reaches.
 */
const sendCommand = vi.fn<(commandName: string) => Promise<unknown[]>>();
const notify = vi.fn();

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: (commandName: string) => sendCommand(commandName) },
    notifications: { send: (...args: unknown[]) => notify(...args) },
    // The web view swaps its tab icon on theme change; these tests never exercise that, so the
    // subscription resolves to a no-op unsubscriber and never delivers a theme.
    themes: { subscribeCurrentTheme: () => Promise.resolve(() => undefined) },
  },
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useDataProvider: () => dblResourcesProvider,
  useLocalizedStrings: () => [STRINGS, false],
  // The real hook opens a modal dialog and invokes `callback` with what the user picked. The
  // returned opener stands in for that whole round trip, so a click on Get Resources lands the
  // queued `pickerResult` in the web view's own handler.
  useDialogCallback:
    (
      _dialogType: string,
      _options: unknown,
      callback: (result: DblResourceData | undefined) => void,
    ) =>
    () =>
      callback(pickerResult),
}));

vi.mock('./use-text-collection-sources.hook', () => ({
  useTextCollectionSources: (projectId: string | undefined) => readHookResult(projectId),
  default: (projectId: string | undefined) => readHookResult(projectId),
}));

vi.mock('./scripture-text-grid/scripture-text-grid.component', () => ({
  // The real grid renders a live Scripture editor per cell. This stand-in exposes only the two
  // gestures these tests need — a verse click that opens the chapter split, and a completed
  // reorder — and reports whether the split is currently open.
  ScriptureTextGrid: ({
    resources,
    chapterContext,
    onChapterContextChange,
    onReorder,
  }: GridStandInProps) => (
    <div>
      <button
        type="button"
        data-testid="open-chapter-split"
        onClick={() => {
          const first = resources[0];
          if (first) onChapterContextChange?.(first);
        }}
      >
        open chapter split
      </button>
      {/* Mirrors the real grid, which keys the grip, the `draggable` attribute, and both gesture
          handlers off `onReorder` (see `showDragHandle={onReorder ? true : undefined}`): with no
          handler there is no reorder affordance to operate at all. */}
      {onReorder ? (
        <button
          type="button"
          data-testid="reverse-resource-order"
          onClick={() => onReorder([...resources].reverse().map((resource) => resource.resourceId))}
        >
          reverse resource order
        </button>
      ) : undefined}
      {chapterContext ? <div data-testid="chapter-split">{chapterContext.label}</div> : undefined}
    </div>
  ),
}));

// jsdom implements none of ResizeObserver, IntersectionObserver, matchMedia, or scrollIntoView, and
// this render path touches all four: `useTabIconSelection` observes the body's intersection to
// learn whether its tab is active, and platform-bible-react's Popover/Tooltip/ToggleGroup wire
// ResizeObservers and query media features. No-op stubs keep rendering from throwing so these tests
// can assert on what is rendered.
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

  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = vi.fn();
  // Radix's PopoverContent calls scrollTo when it focuses its children.
  if (!Element.prototype.scrollTo) Element.prototype.scrollTo = vi.fn();
});

const EMPTY_LIST: ResourceReferenceList = { dataVersion: '1.1.0', items: [] };

const ALPHA = { id: 'projectAlpha', name: 'Alpha' };
const BETA = { id: 'projectBeta', name: 'Beta' };

/** A per-user list holding the given Bible-text projects, all shown in the text collection. */
function userList(...projects: Array<{ id: string; name: string }>): ResourceReferenceList {
  return {
    dataVersion: '1.1.0',
    items: projects.map(({ id, name }) => ({
      type: 'project',
      id,
      name,
      isInTextCollectionForUser: true,
    })),
  };
}

/** Sources for a user who shows Alpha and Beta, with `order` as their saved cell order. */
function twoResourceSources(order: string[]): TextCollectionSources {
  return { adminReferenced: EMPTY_LIST, userReferenced: userList(ALPHA, BETA), overlay: {}, order };
}

/** A bound project whose settings have arrived: sources assembled and a PDP to write through. */
function readyResult(
  sources: TextCollectionSources,
  pdp: FakeTextConnectionPdp,
  isOrderPending = false,
): TextCollectionSourcesResult {
  return {
    sources,
    textConnectionPdp: pdp,
    textConnectionState: { status: 'ready' },
    isOrderPending,
  };
}

/** No project bound / nothing assembled yet, reported under the given provider status. */
function unboundResult(
  status: 'noSource' | 'loading' | 'unavailable',
): TextCollectionSourcesResult {
  return {
    sources: undefined,
    textConnectionPdp: undefined,
    textConnectionState: { status },
    isOrderPending: true,
  };
}

const SCR_REF = { book: 'GEN', chapterNum: 1, verseNum: 1 };

const useScrollGroupScrRefStub: WebViewProps['useWebViewScrollGroupScrRef'] = () => [
  SCR_REF,
  () => undefined,
  undefined,
  () => undefined,
  undefined,
];

/**
 * Stands in for the platform's per-web-view state store. Plain `useState` per key is enough here:
 * no test asserts on persistence across remounts.
 */
function useWebViewStateStub<T>(
  _stateKey: string,
  defaultStateValue: T,
): [T, (value: T) => void, () => void] {
  const [value, setValue] = useState(defaultStateValue);
  return [value, setValue, () => setValue(defaultStateValue)];
}

function makeProps(overrides: Partial<WebViewProps> = {}): WebViewProps {
  return {
    id: 'webViewId',
    webViewType: 'platformScriptureEditor.scriptureTextGrid',
    updateWebViewDefinition: () => true,
    useWebViewState: useWebViewStateStub,
    useWebViewScrollGroupScrRef: useScrollGroupScrRefStub,
    ...overrides,
  };
}

/**
 * Renders the web view and waits until the cached-DBL-resource fetch has settled, so no test races
 * the loading window that gates the grid body.
 */
async function renderWebView(overrides: Partial<WebViewProps> = {}) {
  const result = render(<ScriptureTextGridWebView {...makeProps(overrides)} />);
  await screen.findByRole('button', { name: VIEW_OPTIONS_LABEL });
  return result;
}

/** Opens the View Options popover the way the user does — by clicking its header button. */
async function openViewOptions() {
  fireEvent.click(screen.getByRole('button', { name: VIEW_OPTIONS_LABEL }));
  await screen.findByText(TEXTS_HEADER);
}

/** The polite live region the web view announces chapter-split open/close through. */
function liveRegionText() {
  return screen.getByRole('status').textContent;
}

const UNINSTALLED_RESOURCE: DblResourceData = {
  dblEntryUid: 'uid-web',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1200,
  installed: false,
  updateAvailable: false,
  projectId: 'projectWeb',
};

beforeEach(() => {
  hookResultsByProjectId = new Map();
  fallbackHookResult = unboundResult('noSource');
  pickerResult = undefined;
  dblResourcesProvider = { installDblResource: () => Promise.resolve(true) };
  sendCommand.mockResolvedValue([]);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('View Options disabled reason', () => {
  // Every provider status must produce a sentence. A status that falls through with no message
  // renders the TEXTS header over an empty, greyed-out panel with no explanation —
  // indistinguishable from a broken panel — so a bound-but-still-loading project needs one too.
  it.each([
    ['noSource', 'No project selected.'],
    ['unavailable', 'Text Collection settings are not available for this project.'],
    ['loading', 'Loading'],
  ] as const)('names a reason while the provider status is %s', async (status, expectedMessage) => {
    fallbackHookResult = unboundResult(status);

    await renderWebView();
    await openViewOptions();

    expect(screen.getByText(TEXTS_HEADER)).toBeInTheDocument();
    expect(screen.getByText(expectedMessage)).toBeInTheDocument();
  });

  it('never shows the TEXTS header with nothing under it', async () => {
    // The same guarantee stated as the user-visible rule rather than as a status mapping: whenever
    // the panel is disabled, the header is accompanied by an explanation.
    fallbackHookResult = unboundResult('loading');

    await renderWebView();
    await openViewOptions();

    const textsSection = screen.getByText(TEXTS_HEADER).parentElement;
    expect(textsSection).not.toBeNull();
    expect(textsSection?.textContent).not.toBe(TEXTS_HEADER);
  });
});

describe('chapter-context split across a project change', () => {
  it('closes the split and announces the close when the project changes', async () => {
    const alphaPdp = createFakeTextConnectionPdp();
    const betaPdp = createFakeTextConnectionPdp();
    hookResultsByProjectId.set('projectOne', readyResult(twoResourceSources([]), alphaPdp));
    hookResultsByProjectId.set('projectTwo', readyResult(twoResourceSources([]), betaPdp));

    const { rerender } = await renderWebView({ projectId: 'projectOne' });

    fireEvent.click(screen.getByTestId('open-chapter-split'));
    expect(screen.getByTestId('chapter-split')).toHaveTextContent('Alpha');
    expect(liveRegionText()).toBe('Chapter view opened for Alpha');

    rerender(<ScriptureTextGridWebView {...makeProps({ projectId: 'projectTwo' })} />);

    // The split named a resource in the collection that just went away, so it cannot stay open…
    await waitFor(() => expect(screen.queryByTestId('chapter-split')).not.toBeInTheDocument());
    // …and a screen reader must not be left holding the stale "opened" message.
    expect(liveRegionText()).toBe('Chapter view closed');
  });

  it('leaves in-flight installs running when the project changes', async () => {
    // `installing` rows track downloads that are still running and are removed by their own
    // `finally`, so a project change must not wipe them the way it wipes the split.
    const pdp = createFakeTextConnectionPdp();
    hookResultsByProjectId.set('projectOne', readyResult(twoResourceSources([]), pdp));
    hookResultsByProjectId.set('projectTwo', readyResult(twoResourceSources([]), pdp));
    pickerResult = UNINSTALLED_RESOURCE;
    // Never settles: the install is still in flight for the whole test.
    dblResourcesProvider = {
      installDblResource: () =>
        new Promise(() => {
          // Deliberately never settles: the install stays in flight for the whole test.
        }),
    };

    const { rerender } = await renderWebView({ projectId: 'projectOne' });
    await openViewOptions();

    fireEvent.click(screen.getByRole('button', { name: GET_RESOURCES_LABEL }));
    expect(await screen.findByText('Installing WEB…')).toBeInTheDocument();

    rerender(<ScriptureTextGridWebView {...makeProps({ projectId: 'projectTwo' })} />);

    expect(screen.getByText('Installing WEB…')).toBeInTheDocument();
  });
});

describe('reorder affordance', () => {
  it('offers no reorder at all while the saved cell order has not arrived', async () => {
    // `sources.order` is the empty stand-in until the real order is read, and reordering against
    // it would persist only the resources on screen and drop every hidden resource's saved slot.
    // Withholding the affordance — rather than accepting the gesture and dropping it — is what
    // keeps the control's availability honest and keeps the grid from announcing a move that
    // never happened.
    const pdp = createFakeTextConnectionPdp();
    hookResultsByProjectId.set(
      'projectOne',
      readyResult(twoResourceSources([]), pdp, /* isOrderPending */ true),
    );

    await renderWebView({ projectId: 'projectOne' });

    expect(screen.queryByTestId('reverse-resource-order')).not.toBeInTheDocument();
    expect(pdp.setCellOrder).not.toHaveBeenCalled();
  });

  it('offers a reorder and persists it once the saved cell order has arrived', async () => {
    // The companion to the test above: with the real order in hand the affordance is present and
    // the gesture does write, so the absence above is provably about pendingness rather than
    // reorder being broken outright.
    const pdp = createFakeTextConnectionPdp();
    hookResultsByProjectId.set(
      'projectOne',
      readyResult(twoResourceSources([ALPHA.id, BETA.id]), pdp),
    );

    await renderWebView({ projectId: 'projectOne' });

    fireEvent.click(screen.getByTestId('reverse-resource-order'));

    expect(pdp.setCellOrder).toHaveBeenCalledWith([BETA.id, ALPHA.id]);
  });
});

describe('first-open overlay initialization', () => {
  it('seeds the overlay once per provider, not once per project id', async () => {
    // One provider can answer for more than one project id in a row. Keying the "already
    // initialized" record by project id would let a switch mark the incoming project done while the
    // call went to the outgoing project's provider, leaving the incoming overlay unseeded.
    const sharedPdp = createFakeTextConnectionPdp();
    hookResultsByProjectId.set('projectOne', readyResult(twoResourceSources([]), sharedPdp));
    hookResultsByProjectId.set('projectTwo', readyResult(twoResourceSources([]), sharedPdp));

    const { rerender } = await renderWebView({ projectId: 'projectOne' });
    await waitFor(() => expect(sharedPdp.initializeTextCollectionOverlay).toHaveBeenCalledTimes(1));

    rerender(<ScriptureTextGridWebView {...makeProps({ projectId: 'projectTwo' })} />);

    expect(sharedPdp.initializeTextCollectionOverlay).toHaveBeenCalledTimes(1);
  });

  it('seeds the overlay again when a genuinely different provider resolves', async () => {
    const firstPdp = createFakeTextConnectionPdp();
    const secondPdp = createFakeTextConnectionPdp();
    hookResultsByProjectId.set('projectOne', readyResult(twoResourceSources([]), firstPdp));
    hookResultsByProjectId.set('projectTwo', readyResult(twoResourceSources([]), secondPdp));

    const { rerender } = await renderWebView({ projectId: 'projectOne' });
    await waitFor(() => expect(firstPdp.initializeTextCollectionOverlay).toHaveBeenCalledTimes(1));

    rerender(<ScriptureTextGridWebView {...makeProps({ projectId: 'projectTwo' })} />);

    await waitFor(() => expect(secondPdp.initializeTextCollectionOverlay).toHaveBeenCalledTimes(1));
  });
});
