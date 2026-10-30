// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { newPlatformError, type DblResourceData, type PlatformError } from 'platform-bible-utils';
import type { DialogTypes, WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import { useDialogCallback } from '@papi/frontend/react';
import { usePromise } from 'platform-bible-react';
import { NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY } from 'platform-bible-utils/experimental';
import type { EffectiveResourceReference } from 'platform-scripture';
import type { PickerResource } from './downloaded-resources.utils';
import { selectTextConnection } from './select-dbl-resource';
import { resetCopyLimitLookupsBeforeEach } from './copy-limit/copy-limit.test-utils';
import { RESOURCE_TEXT_WAITING_TEST_ID } from './resource-text-panel.component';
import {
  getResourceSelection,
  getResourceSelectionKey,
  NO_PROJECT_SELECTION_KEY,
  RESOURCE_SELECTION_SETTING_KEY,
  updateResourceSelectionsByPanel,
  type ResourcePanelType,
  type ResourceSelectionsByPanel,
  type StoredResourceSelection,
} from './resource-selection-state.utils';
import { SELECTION_NOT_STORED_KEY } from './use-project-resource-selection.hook';

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
  mockUseScrollGroupScrRef,
  copyrightNoticesByProject,
  interfaceMode,
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
  mockUseScrollGroupScrRef: vi.fn(),
  copyrightNoticesByProject: new Map<string, unknown>(),
  /** What `platform.interfaceMode` reads as, and whether that read is still in flight. */
  interfaceMode: { current: 'simple', isLoading: false },
}));

// @papi/frontend — papi default export used for commands and project lookup
vi.mock('@papi/frontend', () => ({
  default: {
    commands: {
      sendCommand: (...args: Parameters<typeof fakeSendCommand>) => fakeSendCommand(...args),
    },
    projectLookup: {
      getMetadataForProject: vi.fn(async () => ({
        projectInterfaces: ['platformScripture.USJ_Chapter', 'platformScripture.CopyLimit'],
      })),
    },
    notifications: { send: vi.fn() },
  },
  logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() },
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
      '%webView_resourcePanel_loading%': 'Loading…',
      '%webView_resourcePanel_resourceRemoved%': '{resourceName} was removed from your list.',
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
      '%platformScripture_copyrightNotice_restrictedLicense_banner%':
        '{label}: The {name} is for reference only.',
      '%platformScripture_copyrightNotice_moreInfo%': 'More info',
      '%platformScripture_copyrightNotice_dismiss%': 'Dismiss copyright notice',
      '%platformScripture_copyrightNotice_details_title%': 'Copyright for {name}',
    },
    false,
  ],
  useDataProvider: vi.fn(() => undefined),
  useProjectDataProvider: (...args: unknown[]) => mockUseProjectDataProvider(...args),
  useProjectData: (...args: unknown[]) => mockUseProjectData(...args),
  useProjectSetting: vi.fn((projectId: string | undefined, key: string, fallback: unknown) => {
    if (key === 'platformScripture.copyrightNotice')
      return [
        (projectId && copyrightNoticesByProject.get(projectId)) ?? fallback,
        vi.fn(),
        vi.fn(),
        false,
      ];
    return ['ltr', false];
  }),
  useSetting: (key: string, defaultValue: unknown) => fakeUseSetting(key, defaultValue),
  useDialogCallback: vi.fn(() => vi.fn()),
  usePromise: vi.fn(() => [undefined, false]),
  useScrollGroupScrRef: (...args: unknown[]) => mockUseScrollGroupScrRef(...args),
}));

// platform-bible-react — keep UI components real; stub hooks that hit runtime
vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  realUsePromise.current = original.usePromise;
  return {
    ...original,
    useExtraValidMarkers: () => [],
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

// Only the add is stubbed: it installs, which these tests cannot do. The id lookups and the removal
// are this panel's own logic run against the mocked settings provider, so they stay real.
vi.mock('./select-dbl-resource', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./select-dbl-resource')>()),
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

/** The project `makeProps` gives the panel unless a test names another. */
const DEFAULT_PROJECT_ID = 'test-project-id';

/**
 * The resource selection setting, as the settings service holds it. The panel reads it through
 * `useSetting` and changes it through `platformScriptureEditor.updateResourceSelection`; the mocks
 * above route both here, so a selection stored while one panel is mounted is what the next one
 * reads, as across a project switch or a restart.
 */
/** One change the panel asked to store, with the arguments it sent the command. */
type SelectionWrite = {
  resourceType: ResourcePanelType;
  projectId: string | undefined;
  update: StoredResourceSelection;
};

const selectionSetting: {
  value: ResourceSelectionsByPanel;
  /** Whether the setting's first read is still in flight */
  isLoading: boolean;
  /** What reading the setting fails with, if it does */
  readError: PlatformError | undefined;
  /** Whether a stored change is reported back only by {@link reportStoredSelections} */
  isReportingLater: boolean;
  /** Stored changes not reported back yet */
  unreportedValue: ResourceSelectionsByPanel | undefined;
  /** Whether storing a change fails */
  doWritesFail: boolean;
  /** Every change the panel asked to store, in order */
  writes: SelectionWrite[];
  listeners: Set<() => void>;
} = {
  value: {},
  isLoading: false,
  readError: undefined,
  isReportingLater: false,
  unreportedValue: undefined,
  doWritesFail: false,
  writes: [],
  listeners: new Set(),
};

function setSelectionSetting(value: ResourceSelectionsByPanel) {
  selectionSetting.value = value;
  selectionSetting.listeners.forEach((listener) => listener());
}

function subscribeToSelectionSetting(listener: () => void) {
  selectionSetting.listeners.add(listener);
  return () => {
    selectionSetting.listeners.delete(listener);
  };
}

/** Reports back the changes stored while {@link selectionSetting}`.isReportingLater` was set. */
function reportStoredSelections() {
  const { unreportedValue } = selectionSetting;
  selectionSetting.unreportedValue = undefined;
  if (unreportedValue) act(() => setSelectionSetting(unreportedValue));
}

/**
 * Stands in for `useSetting`: the selection setting reads as its default until it has loaded, and
 * re-renders the panel when it changes; any other setting reads as the interface mode.
 */
function fakeUseSetting(key: string, defaultValue: unknown) {
  // Called as a hook by the panel, once per key in the same order on every render.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const selections = React.useSyncExternalStore(
    subscribeToSelectionSetting,
    () => selectionSetting.value,
  );
  if (key === RESOURCE_SELECTION_SETTING_KEY) {
    if (selectionSetting.isLoading) return [defaultValue, vi.fn(), vi.fn(), true];
    return [selectionSetting.readError ?? selections, vi.fn(), vi.fn(), false];
  }
  return [interfaceMode.current, vi.fn(), vi.fn(), interfaceMode.isLoading];
}

/**
 * Stands in for `sendCommand`: stores a selection change, and answers any other command with `[]`.
 * Typed as `updateResourceSelection`'s arguments, the only command whose arguments it reads.
 */
async function fakeSendCommand(
  command: string,
  resourceType: ResourcePanelType,
  projectId: string | undefined,
  update: StoredResourceSelection,
) {
  if (command !== 'platformScriptureEditor.updateResourceSelection') return [];
  const write: SelectionWrite = { resourceType, projectId, update };
  selectionSetting.writes.push(write);
  if (selectionSetting.doWritesFail) throw new Error('could not store the selection');
  const next = updateResourceSelectionsByPanel(
    selectionSetting.unreportedValue ?? selectionSetting.value,
    write.resourceType,
    write.projectId,
    write.update,
  );
  if (selectionSetting.isReportingLater) selectionSetting.unreportedValue = next;
  else setSelectionSetting(next);
  return undefined;
}

/**
 * Stores a project's selection before the panel renders, as an earlier session would have.
 *
 * @param selection The project's selection
 * @param projectId The project; {@link NO_PROJECT_SELECTION_KEY} for no project open
 * @param resourceType The panel the selection belongs to
 */
function seedSelection(
  selection: StoredResourceSelection,
  projectId: string | undefined = DEFAULT_PROJECT_ID,
  resourceType: ResourcePanelType = 'ScriptureResource',
) {
  selectionSetting.value = updateResourceSelectionsByPanel(
    selectionSetting.value,
    resourceType,
    projectId,
    selection,
  );
}

/**
 * A project's selection as stored now.
 *
 * @param projectId The project; {@link NO_PROJECT_SELECTION_KEY} for no project open
 * @param resourceType The panel the selection belongs to
 */
function storedSelection(
  projectId: string | undefined = DEFAULT_PROJECT_ID,
  resourceType: ResourcePanelType = 'ScriptureResource',
): StoredResourceSelection {
  return getResourceSelection(selectionSetting.value, resourceType, projectId);
}

/**
 * Each change the panel asked to store for a project, in order.
 *
 * @param projectId The project; {@link NO_PROJECT_SELECTION_KEY} for no project open
 */
function writtenSelections(
  projectId: string | undefined = DEFAULT_PROJECT_ID,
): StoredResourceSelection[] {
  return selectionSetting.writes
    .filter(
      (write) => getResourceSelectionKey(write.projectId) === getResourceSelectionKey(projectId),
    )
    .map((write) => write.update);
}

/** Minimal WebViewProps for zero-state renders (no resources, with projectId). */
function makeProps(
  overrides: Partial<WebViewProps> = {},
  resourceType: 'ScriptureResource' | 'Commentary' | 'CommentaryResource' = 'ScriptureResource',
  /** Web view state the panel reads, by key, and the setter it gets for each */
  state: Record<string, unknown> = {},
  setState: (key: string, value: unknown) => void = () => {},
): WebViewProps {
  // The object literal only provides the minimum props needed for testing — the double cast
  // avoids satisfying every optional field of WebViewProps in each helper.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    projectId: DEFAULT_PROJECT_ID,
    updateWebViewDefinition: vi.fn(),
    useWebViewState: vi.fn(
      // useWebViewState is generic (key → TState) but mocks can't express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key: string, defaultValue: any): [any, (val: any) => void] => {
        if (key === 'resourceType') return [resourceType, vi.fn()];
        if (key in state) return [state[key], (value: unknown) => setState(key, value)];
        return [defaultValue, vi.fn()];
      },
    ),
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

/**
 * A `useWebViewState` stub that records every setter it hands out, keyed by state key, so a test
 * can assert what a render published without re-deriving `usePublishNavigableProjectIds`'s own
 * logic. `persisted` seeds what a key reads back, standing in for earlier saved state.
 */
function makeTrackedWebViewState(
  resourceType: 'ScriptureResource' | 'Commentary',
  persisted: Record<string, unknown> = {},
) {
  const setters = new Map<string, ReturnType<typeof vi.fn>>();
  const useWebViewState = vi.fn(
    // useWebViewState is generic (key → TState) and its real return tuple also carries a
    // resetWebViewState function, which none of these tests need — mocks can't express the
    // genericity, so the reset slot is a no-op `vi.fn()` purely to keep the tuple's shape.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key: string, defaultValue: any): [any, (val: any) => void, () => void] => {
      if (key === 'resourceType') return [resourceType, vi.fn(), vi.fn()];
      let setter = setters.get(key);
      if (!setter) {
        setter = vi.fn();
        setters.set(key, setter);
      }
      return [key in persisted ? persisted[key] : defaultValue, setter, vi.fn()];
    },
  );
  return { useWebViewState, setters };
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
  // Delivered, not just loaded: a selection that has left the list is fallen back from only once
  // the catalog has settled (see `canResolveResourceSelection`).
  mockUseDblResourceCatalog.mockReturnValue({
    dblResources: [],
    isLoadingResources: false,
    isCatalogReady: true,
    hasCatalogError: false,
    refetchCatalog: vi.fn(),
  });
  mockUseResourcePickerResources.mockReturnValue([[], false]);
  mockUseInstallDblResource.mockImplementation(() => vi.fn(async () => {}));
  mockUseProjectData.mockReturnValue({
    // The real hook's contract: until a delivery lands it hands back the default value it was
    // given, still loading.
    ChapterUSJ: vi.fn((_selector: unknown, defaultValue: unknown) => [defaultValue, vi.fn(), true]),
    BookCopyLimits: vi.fn(() => [undefined, vi.fn(), false]),
  });
  mockUseProjectDataProvider.mockReturnValue(undefined);
  mockFindCachedDblResource.mockReturnValue(undefined);
  mockUseScrollGroupScrRef.mockReturnValue([
    { book: 'GEN', chapterNum: 1, verseNum: 1, versificationStr: 'English' },
    vi.fn(),
  ]);
  // Module-scoped, so it outlives `restoreAllMocks` and has to be cleared explicitly.
  setUsjSpy.mockClear();
}

// jsdom ships no ResizeObserver, which the copyright notice banner measures itself with
class NoopResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

resetCopyLimitLookupsBeforeEach();
beforeEach(() => {
  vi.stubGlobal('ResizeObserver', NoopResizeObserver);
  resetPanelHooks();
  copyrightNoticesByProject.clear();
  interfaceMode.current = 'simple';
  interfaceMode.isLoading = false;
  selectionSetting.value = {};
  selectionSetting.isLoading = false;
  selectionSetting.readError = undefined;
  selectionSetting.isReportingLater = false;
  selectionSetting.unreportedValue = undefined;
  selectionSetting.doWritesFail = false;
  selectionSetting.writes = [];
  selectionSetting.listeners.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
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

/**
 * Renders the panel with a `useWebViewState` backed by real React state, so a selection the panel
 * persists is read back on its next render. Returns every value persisted so far, by state key.
 *
 * @param savedState Web view state the panel starts with, by state key
 * @param options The panel's project, and the kind of resource it lists
 */
function renderWithWebViewState(
  savedState: Record<string, unknown> = {},
  options: {
    /** The panel's project; `undefined` for none open. Defaults to {@link DEFAULT_PROJECT_ID}. */
    projectId?: string;
    resourceType?: 'ScriptureResource' | 'CommentaryResource';
  } = {},
) {
  const projectId = 'projectId' in options ? options.projectId : DEFAULT_PROJECT_ID;
  const { resourceType = 'ScriptureResource' } = options;
  const persisted: Record<string, unknown> = {};
  const props = makeProps({
    projectId,
    useWebViewState: vi.fn(
      // useWebViewState is generic (key → TState) but mocks can't express that genericity.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (key: string, defaultValue: any): [any, (val: any) => void] => {
        // Called as a hook by the panel, in the same order on every render.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = React.useState(
          key === 'resourceType' ? resourceType : (savedState[key] ?? defaultValue),
        );
        return [
          value,
          (next: unknown) => {
            persisted[key] = next;
            setValue(next);
          },
        ];
      },
    ),
  });
  const ResourceTextPanel = getResourceTextPanel();
  const { rerender, unmount } = render(<ResourceTextPanel {...props} />);
  return {
    persisted,
    rerender: () => rerender(<ResourceTextPanel {...props} />),
    unmount,
    /** The selection stored for the panel's project so far */
    persistedSelection: () => storedSelection(projectId, resourceType),
  };
}

const lastSelectedRef = (): PickerResource | undefined =>
  capturedResourceTextPanelProps.mock.lastCall?.[0].selectedRef;

describe('ResourceTextPanel — selection when a configured resource arrives', () => {
  const DOWNLOADED_WEB: PickerResource = {
    reference: { type: 'project', name: 'WEB', id: 'web-project-id' },
    source: 'downloaded',
    isAdminLocked: false,
    type: 'ScriptureResource',
    installed: true,
    projectId: 'web-project-id',
  };
  const CONFIGURED: PickerResource = {
    reference: { type: 'project', name: 'CFG', id: 'configured-project-id' },
    source: 'admin',
    isAdminLocked: false,
    type: 'ScriptureResource',
    installed: true,
    projectId: 'configured-project-id',
  };

  beforeEach(() => {
    capturedResourceTextPanelProps.mockClear();
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.0.0', items: [] },
    });
    mockUseResourcePickerResources.mockReturnValue([[DOWNLOADED_WEB], false]);
  });

  it('moves from the downloaded fallback to the configured resource once it is listed', async () => {
    const { persistedSelection, rerender } = renderWithWebViewState();
    await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('web-project-id'));

    mockUseResourcePickerResources.mockReturnValue([[CONFIGURED, DOWNLOADED_WEB], false]);
    rerender();

    await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('configured-project-id'));
    expect(persistedSelection().selectedResourceId).toBe('project:configured-project-id');
  });

  it('keeps a downloaded resource the user picked once a configured resource is listed', async () => {
    const { persistedSelection, rerender } = renderWithWebViewState();
    await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('web-project-id'));
    React.act(() => {
      capturedResourceTextPanelProps.mock.lastCall?.[0].onSelectResource('project:web-project-id');
    });

    mockUseResourcePickerResources.mockReturnValue([[CONFIGURED, DOWNLOADED_WEB], false]);
    rerender();

    await waitFor(() =>
      expect(persistedSelection().selectedResourceId).toBe('project:web-project-id'),
    );
    expect(lastSelectedRef()?.projectId).toBe('web-project-id');
  });

  it('keeps a downloaded resource picked through the resource picker once a configured resource is listed', async () => {
    vi.mocked(selectTextConnection).mockImplementation(async (...args) => {
      const onWritten = args[4];
      onWritten?.({ type: 'project', name: 'WEB', id: 'web-project-id' });
    });
    const { persistedSelection, rerender } = renderWithWebViewState();
    await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('web-project-id'));
    const onPickerClosed = vi.mocked(useDialogCallback).mock.lastCall?.[2];
    await React.act(async () => {
      // Only the resource's identity matters here: `selectTextConnection` is mocked to report the
      // reference it wrote, which is what the panel waits for.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      onPickerClosed?.({ dblEntryUid: 'web' } as DblResourceData, 'platform.resourcePicker', {
        resourceType: 'ScriptureResource',
        selectedResourceIds: [],
        isModal: true,
      });
    });
    await waitFor(() =>
      expect(persistedSelection().userPickedResourceId).toBe('project:web-project-id'),
    );

    mockUseResourcePickerResources.mockReturnValue([[CONFIGURED, DOWNLOADED_WEB], false]);
    rerender();

    await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('web-project-id'));
    expect(persistedSelection().selectedResourceId).toBe('project:web-project-id');
  });

  describe('what the panel offers to global navigation', () => {
    beforeEach(() => {
      // Nothing is published until every source the displayed ids come from has loaded.
      mockUseDblResourceCatalog.mockReturnValue({
        dblResources: [],
        isLoadingResources: false,
        isCatalogReady: true,
        hasCatalogError: false,
        refetchCatalog: vi.fn(),
      });
    });

    it('offers a downloaded resource it fell back to, and the configured one that replaces it', async () => {
      // Find searches what the panel declares, so a resource on screen but undeclared would send
      // Ctrl+F in this panel to some other project.
      const { persisted, rerender } = renderWithWebViewState();
      await waitFor(() => expect(persisted.navigableProjectIds).toEqual(['web-project-id']));

      mockUseResourcePickerResources.mockReturnValue([[CONFIGURED, DOWNLOADED_WEB], false]);
      rerender();
      await waitFor(() => expect(persisted.navigableProjectIds).toEqual(['configured-project-id']));
    });
  });

  it('keeps showing its downloaded fallback when a resource that sorts before it is installed', async () => {
    const DOWNLOADED_ASV: PickerResource = {
      ...DOWNLOADED_WEB,
      reference: { type: 'project', name: 'ASV', id: 'asv-project-id' },
      projectId: 'asv-project-id',
    };
    const { persistedSelection, rerender } = renderWithWebViewState();
    await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('web-project-id'));

    mockUseResourcePickerResources.mockReturnValue([[DOWNLOADED_ASV, DOWNLOADED_WEB], false]);
    rerender();

    expect(lastSelectedRef()?.projectId).toBe('web-project-id');
    expect(persistedSelection().selectedResourceId).toBeUndefined();
  });

  describe('a saved downloaded selection that is not the user’s pick', () => {
    const CONFIGURED_DBL: PickerResource = {
      reference: { type: 'dblResource', name: 'ESV', id: 'uid-esv' },
      source: 'admin',
      isAdminLocked: false,
      type: 'ScriptureResource',
      installed: true,
      projectId: 'esv-project-id',
    };

    it('gives way to an installed configured DBL resource', async () => {
      mockUseResourcePickerResources.mockReturnValue([[CONFIGURED_DBL, DOWNLOADED_WEB], false]);
      seedSelection({ selectedResourceId: 'project:web-project-id' });
      const { persistedSelection } = renderWithWebViewState();

      await waitFor(() => expect(persistedSelection().selectedResourceId).toBe('dbl:uid-esv'));
      expect(lastSelectedRef()?.projectId).toBe('esv-project-id');
    });

    it('is kept while the user’s own list cannot be read', async () => {
      // WEB may be in that list, and be listed as downloaded only until it can be read again.
      mockUseEffectiveResourceReferenceList.mockReturnValue({
        status: 'ready',
        list: { dataVersion: '1.0.0', items: [] },
        isUserLayerMissing: true,
      });
      mockUseResourcePickerResources.mockReturnValue([[CONFIGURED_DBL, DOWNLOADED_WEB], false]);
      seedSelection({ selectedResourceId: 'project:web-project-id' });
      renderWithWebViewState();

      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('web-project-id'));
      expect(writtenSelections()).toEqual([]);
    });

    it('is kept when it was opened from Home', async () => {
      // `buildResourceTextPanelState` records a resource opened from Home as the user's pick.
      mockUseResourcePickerResources.mockReturnValue([[CONFIGURED_DBL, DOWNLOADED_WEB], false]);
      seedSelection({
        selectedResourceId: 'project:web-project-id',
        userPickedResourceId: 'project:web-project-id',
      });
      renderWithWebViewState();

      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('web-project-id'));
      expect(writtenSelections()).toEqual([]);
    });
  });
});

/*
 * A Simple-mode project switch reloads the panel into a new document, and Simple mode builds the
 * panel afresh at every launch. A remount reading the same stored setting stands in for both here.
 */
describe.each(['ScriptureResource', 'CommentaryResource'] as const)(
  'ResourceTextPanel (%s) — the selection belongs to the project it was made in',
  (resourceType) => {
    const makeRow = (id: string, source: PickerResource['source']): PickerResource => ({
      reference: { type: 'project', name: id, id },
      source,
      isAdminLocked: false,
      type: resourceType,
      installed: true,
      projectId: id,
    });
    const A_TEAM_TEXT = makeRow('a-team-text', 'admin');
    const B_TEAM_TEXT = makeRow('b-team-text', 'admin');
    // Listed only in B, after B's default
    const B_OWN_TEXT = makeRow('b-own-text', 'user');
    // Downloaded, so it is listed in every project
    const SHARED_TEXT = makeRow('shared-text', 'downloaded');

    const pick = (rowId: string) =>
      React.act(() => {
        capturedResourceTextPanelProps.mock.lastCall?.[0].onSelectResource(rowId);
      });

    beforeEach(() => {
      capturedResourceTextPanelProps.mockClear();
      mockUseEffectiveResourceReferenceList.mockReturnValue({
        status: 'ready',
        list: { dataVersion: '1.0.0', items: [] },
      });
      const rowsByProject = new Map<string | undefined, PickerResource[]>([
        ['project-a', [A_TEAM_TEXT, SHARED_TEXT]],
        ['project-b', [B_TEAM_TEXT, B_OWN_TEXT, SHARED_TEXT]],
        // With no project, only the downloaded resources are listed
        [undefined, [SHARED_TEXT]],
      ]);
      mockUseResourcePickerResources.mockImplementation((projectId: string | undefined) => [
        rowsByProject.get(projectId),
        false,
      ]);
    });

    it('shows each project’s own pick when switching back to it', async () => {
      // Neither project picks its own default, so a pick that followed the user into the other
      // project would show there, and a pick that was dropped would show the project's default.
      const inA = renderWithWebViewState({}, { projectId: 'project-a', resourceType });
      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('a-team-text'));
      pick('project:shared-text');
      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('shared-text'));
      inA.unmount();

      const inB = renderWithWebViewState({}, { projectId: 'project-b', resourceType });
      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('b-team-text'));
      pick('project:b-own-text');
      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('b-own-text'));
      inB.unmount();

      const backInA = renderWithWebViewState({}, { projectId: 'project-a', resourceType });
      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('shared-text'));
      backInA.unmount();

      renderWithWebViewState({}, { projectId: 'project-b', resourceType });
      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('b-own-text'));
      expect(storedSelection('project-a', resourceType).userPickedResourceId).toBe(
        'project:shared-text',
      );
    });

    it('carries no project’s pick over to the panel with no project open', async () => {
      const inA = renderWithWebViewState({}, { projectId: 'project-a', resourceType });
      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('a-team-text'));
      pick('project:shared-text');
      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('shared-text'));
      inA.unmount();

      renderWithWebViewState({}, { projectId: undefined, resourceType });

      expect(await screen.findByText('No project.')).toBeInTheDocument();
      expect(lastSelectedRef()).toBeUndefined();
    });

    it('stores nothing for the next project while it still lists the previous project’s resources', async () => {
      // During a switch the outgoing document can render once more with the incoming project's id
      // before it is replaced, while its resources are still the outgoing project's.
      seedSelection({ selectedResourceId: 'project:b-team-text' }, 'project-b', resourceType);
      mockUseResourcePickerResources.mockReturnValue([[A_TEAM_TEXT, SHARED_TEXT], false]);
      const props = makeProps({ projectId: 'project-a' }, resourceType);
      const ResourceTextPanel = getResourceTextPanel();
      const { rerender } = render(<ResourceTextPanel {...props} />);
      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('a-team-text'));

      capturedResourceTextPanelProps.mockClear();
      rerender(<ResourceTextPanel {...props} projectId="project-b" />);
      await waitFor(() => expect(capturedResourceTextPanelProps).toHaveBeenCalled());

      expect(writtenSelections('project-b')).toEqual([]);
      expect(storedSelection('project-b', resourceType)).toEqual({
        selectedResourceId: 'project:b-team-text',
        userPickedResourceId: undefined,
      });
    });

    it('shows nothing, and stores nothing, until the stored selection has been read', async () => {
      seedSelection(
        { selectedResourceId: 'project:shared-text', userPickedResourceId: 'project:shared-text' },
        'project-a',
        resourceType,
      );
      selectionSetting.isLoading = true;
      const props = makeProps({ projectId: 'project-a' }, resourceType);
      const ResourceTextPanel = getResourceTextPanel();
      const { rerender } = render(<ResourceTextPanel {...props} />);

      expect(capturedResourceTextPanelProps.mock.lastCall?.[0]).toEqual(
        expect.objectContaining({ readiness: 'loading', selectedRef: undefined }),
      );
      expect(selectionSetting.writes).toEqual([]);

      selectionSetting.isLoading = false;
      rerender(<ResourceTextPanel {...props} />);
      await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('shared-text'));
    });
  },
);

describe('ResourceTextPanel — storing the selection', () => {
  const STORED_TEXT: PickerResource = {
    reference: { type: 'project', name: 'STORED', id: 'stored-project-id' },
    source: 'user',
    isAdminLocked: false,
    type: 'ScriptureResource',
    installed: true,
    projectId: 'stored-project-id',
  };
  const PICKED_TEXT: PickerResource = {
    ...STORED_TEXT,
    reference: { type: 'project', name: 'PICKED', id: 'picked-project-id' },
    projectId: 'picked-project-id',
  };

  /** Picks `PICKED_TEXT` in the resource picker, which stores it in the user's list first. */
  const pickInPicker = () =>
    React.act(async () => {
      vi.mocked(selectTextConnection).mockImplementation(async (...args) => {
        const onWritten = args[4];
        onWritten?.({ type: 'project', name: 'PICKED', id: 'picked-project-id' });
      });
      const onPickerClosed = vi.mocked(useDialogCallback).mock.lastCall?.[2];
      await onPickerClosed?.(
        // Only the resource's identity matters here: `selectTextConnection` is mocked to report the
        // reference it wrote, which is what the panel waits for.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        { dblEntryUid: 'picked' } as DblResourceData,
        'platform.resourcePicker',
        {
          resourceType: 'ScriptureResource',
          selectedResourceIds: [],
          isModal: true,
        },
      );
    });

  beforeEach(() => {
    capturedResourceTextPanelProps.mockClear();
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.0.0', items: [] },
    });
    mockUseResourcePickerResources.mockReturnValue([[STORED_TEXT, PICKED_TEXT], false]);
    seedSelection({
      selectedResourceId: 'project:stored-project-id',
      userPickedResourceId: 'project:stored-project-id',
    });
  });

  it('stores no fallback over the pick while the stored selection cannot be read', async () => {
    selectionSetting.value = {};
    seedSelection({
      selectedResourceId: 'project:picked-project-id',
      userPickedResourceId: 'project:picked-project-id',
    });
    selectionSetting.readError = newPlatformError('settings unavailable');
    renderWithWebViewState();
    await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('stored-project-id'));

    expect(selectionSetting.writes).toEqual([]);
    // A pick is the user's own, so it is still stored.
    React.act(() => {
      capturedResourceTextPanelProps.mock.lastCall?.[0].onSelectResource(
        'project:picked-project-id',
      );
    });
    await waitFor(() =>
      expect(writtenSelections()).toEqual([
        {
          selectedResourceId: 'project:picked-project-id',
          userPickedResourceId: 'project:picked-project-id',
        },
      ]),
    );
  });

  it('keeps showing a resource picked in the picker until the stored selection reports it', async () => {
    selectionSetting.isReportingLater = true;
    renderWithWebViewState();
    await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('stored-project-id'));
    const rendersBeforePick = capturedResourceTextPanelProps.mock.calls.length;

    await pickInPicker();
    await waitFor(() => expect(writtenSelections()).toHaveLength(1));
    reportStoredSelections();
    await waitFor(() =>
      expect(storedSelection().selectedResourceId).toBe('project:picked-project-id'),
    );

    const shownSincePick = capturedResourceTextPanelProps.mock.calls
      .slice(rendersBeforePick)
      .map(([props]) => props.selectedRef?.projectId);
    const firstShown = shownSincePick.indexOf('picked-project-id');
    expect(firstShown).not.toBe(-1);
    expect(new Set(shownSincePick.slice(firstShown))).toEqual(new Set(['picked-project-id']));
  });

  it('tells the user, and goes back to the stored resource, when a pick cannot be stored', async () => {
    selectionSetting.doWritesFail = true;
    renderWithWebViewState();
    await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('stored-project-id'));

    await pickInPicker();

    await waitFor(() =>
      expect(papi.notifications.send).toHaveBeenCalledWith({
        message: SELECTION_NOT_STORED_KEY,
        severity: 'error',
      }),
    );
    await waitFor(() => expect(lastSelectedRef()?.projectId).toBe('stored-project-id'));
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

  // The panel follows the scroll group through `useScrollGroupScrRef` (in the displayed resource's
  // versification), so the chapter is set on that mock rather than through a web-view prop.
  const propsAt = (chapter: number) => {
    mockUseScrollGroupScrRef.mockReturnValue([
      { book: 'GEN', chapterNum: chapter, verseNum: 1, versificationStr: 'English' },
      vi.fn(),
    ]);
    return makeProps();
  };
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

// ---------------------------------------------------------------------------
// Versification conversion frame
// ---------------------------------------------------------------------------

/**
 * A picker row for a project-reference resource whose project is `projectId` — i.e. a resource that
 * lives in a DIFFERENT project from the panel's own container project.
 */
function makeProjectRow(projectId: string | undefined): PickerResource {
  return {
    reference: { type: 'project', name: 'Vulgate', id: 'resource-reference-id' },
    source: 'user',
    isAdminLocked: false,
    type: 'ScriptureResource',
    installed: true,
    projectId,
  };
}

/** Renders the panel over `rows`, with the referenced list settled so selection can resolve. */
function renderWithRows(rows: PickerResource[], propOverrides: Partial<WebViewProps> = {}) {
  mockUseEffectiveResourceReferenceList.mockReturnValue({
    status: 'ready',
    list: { dataVersion: '1.0.0', items: [] },
  });
  mockUseResourcePickerResources.mockReturnValue([rows, false]);

  const ResourceTextPanel = getResourceTextPanel();
  return render(<ResourceTextPanel {...makeProps(propOverrides)} />);
}

/** The conversion-frame argument of every `useScrollGroupScrRef` call made during a render. */
function conversionFrames(): unknown[] {
  return mockUseScrollGroupScrRef.mock.calls.map((call) => call[2]);
}

// The panel's own `projectId` prop is the CONTAINER project whose reference list is shown; the
// chapter on screen comes from the selected resource's project, which may use a different
// versification. Converting into the container's frame would show the wrong verse and would stamp
// the container as the scroll group's source on a verse click. Asserted on the conversion-frame
// argument rather than on rendered text because the conversion itself lives in the platform hook,
// which is mocked here — what belongs to this consumer is which project it asks to convert into.
describe('ResourceTextPanel — versification conversion frame', () => {
  it('follows the scroll group in the displayed resource’s versification, not the container project’s', () => {
    renderWithRows([makeProjectRow('resource-project-id')]);

    expect(mockUseScrollGroupScrRef).toHaveBeenCalled();
    expect(conversionFrames()).toContain('resource-project-id');
    expect(conversionFrames()).not.toContain('test-project-id');
  });

  it('passes no conversion frame before a resource resolves', () => {
    renderWithRows([]);

    expect(mockUseScrollGroupScrRef).toHaveBeenCalled();
    conversionFrames().forEach((frame) => expect(frame).toBeUndefined());
  });

  // A row can be in the list with no local project yet (a DBL resource still installing). There is
  // nothing to convert into, and passing the container project would reintroduce the wrong frame.
  it('passes no conversion frame for a selected row that has no project yet', () => {
    renderWithRows([makeProjectRow(undefined)]);

    expect(mockUseScrollGroupScrRef).toHaveBeenCalled();
    conversionFrames().forEach((frame) => expect(frame).toBeUndefined());
  });

  // The hook falls back to scroll group 0 when its first argument is `undefined`, so a panel set to
  // another group would silently follow group 0; and an independent-reference write that never
  // reaches the definition is lost on the next render.
  it('follows its own scroll group and writes changes back to its definition', () => {
    const updateWebViewDefinition = vi.fn(() => true);
    renderWithRows([], { scrollGroupScrRef: 1, updateWebViewDefinition });

    const [scrollGroupArg, setScrollGroupScrRef] = mockUseScrollGroupScrRef.mock.calls[0];
    expect(scrollGroupArg).toBe(1);
    setScrollGroupScrRef(2);
    expect(updateWebViewDefinition).toHaveBeenCalledWith({ scrollGroupScrRef: 2 });
  });
});

/*
 * Resources never open in Simple mode's middle column, so with no project open the panel shows a
 * resource it was asked to show (one opened from Home), from the downloaded resources alone. It
 * never picks one by itself: there is no list of the user's texts to pick from.
 */
describe('ResourceTextPanel — no project open', () => {
  function renderWithoutProject(selectedResourceId: string | undefined) {
    mockUseResourcePickerResources.mockReturnValue([[SELECTED_RESOURCE], false]);
    // There is no project, so its referenced list never arrives.
    mockUseEffectiveResourceReferenceList.mockReturnValue({ status: 'loading' });
    seedSelection({ selectedResourceId }, NO_PROJECT_SELECTION_KEY);
    const props = makeProps({ projectId: undefined });
    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...props} />);
    return { panelProps: capturedResourceTextPanelProps.mock.lastCall?.[0] };
  }

  it('shows the resource it was asked to show', () => {
    const { panelProps } = renderWithoutProject('project:resource-project-id');

    expect(panelProps).toEqual(
      expect.objectContaining({
        hasProject: false,
        readiness: 'configured',
        selectedRef: SELECTED_RESOURCE,
      }),
    );
  });

  it('picks nothing by itself when it was asked for nothing', () => {
    const { panelProps } = renderWithoutProject(undefined);

    expect(panelProps).toEqual(expect.objectContaining({ selectedRef: undefined }));
    expect(writtenSelections(NO_PROJECT_SELECTION_KEY)).toEqual([]);
  });

  describe('while the catalog is down', () => {
    beforeEach(() => {
      mockUseDblResourceCatalog.mockReturnValue({
        dblResources: [],
        isLoadingResources: false,
        isCatalogReady: false,
        hasCatalogError: true,
        refetchCatalog: vi.fn(),
      });
    });

    it('says the catalog is unavailable when the resource it was asked for has no row without it', () => {
      // A DBL resource is listed only once the catalog resolves it; "open a project" would mislead.
      const { panelProps } = renderWithoutProject('dbl:uid-not-downloaded');

      expect(panelProps).toEqual(
        expect.objectContaining({ readiness: 'catalogError', selectedRef: undefined }),
      );
    });

    it('still shows a downloaded resource it was asked for', () => {
      const { panelProps } = renderWithoutProject('project:resource-project-id');

      expect(panelProps).toEqual(
        expect.objectContaining({ readiness: 'configured', selectedRef: SELECTED_RESOURCE }),
      );
    });
  });
});

describe('ResourceTextPanel — copyright notice', () => {
  it("shows the notice of the resource on screen, not of the panel's own project", () => {
    copyrightNoticesByProject.set('niv-project', {
      kind: 'restrictedLicense',
      name: 'NIV11',
      fullName: 'New International Version 2011',
      copyrightYears: '2011',
    });
    copyrightNoticesByProject.set('test-project-id', {
      kind: 'restrictedLicense',
      name: 'OWN',
      fullName: 'The panel project',
      copyrightYears: '2011',
    });
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.0.0', items: [] },
    });
    mockUseResourcePickerResources.mockReturnValue([
      [
        {
          reference: { type: 'project', id: 'niv-project', name: 'NIV11' },
          source: 'downloaded',
          isAdminLocked: false,
          type: 'ScriptureResource',
          installed: true,
          projectId: 'niv-project',
        },
      ],
      false,
    ]);

    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...makeProps()} />);

    expect(screen.getByRole('note')).toHaveTextContent(/^NIV11:/);
  });
});

// A configured DBL reference the (failed) catalog would otherwise be needed to resolve. Its
// presence is what makes readiness `catalogError` rather than `empty` — see
// `getResourcePanelReadiness`.
const CONFIGURED_DBL_REFERENCE: EffectiveResourceReference = {
  type: 'dblResource',
  name: 'Configured DBL Resource',
  id: 'abc123',
  source: 'admin',
};

/** A locally-installed project the picker resolved without the catalog (a `downloaded` row). */
const DOWNLOADED_ROW: PickerResource = {
  reference: { type: 'project', name: 'Local Project', id: 'local-project-1' },
  source: 'downloaded',
  isAdminLocked: false,
  type: 'ScriptureResource',
  installed: true,
  projectId: 'local-project-1',
};

/** A catalog that already failed, with nothing resolved from it. */
const FAILED_CATALOG = {
  dblResources: [],
  isLoadingResources: false,
  isCatalogReady: false,
  hasCatalogError: true,
  refetchCatalog: vi.fn(),
};

describe('ResourceTextPanel — catalog failure keeps resolved rows visible', () => {
  it('renders a row that resolved locally, and publishes its project id, when the catalog failed', () => {
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.1.0', items: [CONFIGURED_DBL_REFERENCE] },
    });
    mockUseDblResourceCatalog.mockReturnValue(FAILED_CATALOG);
    mockUseResourcePickerResources.mockReturnValue([[DOWNLOADED_ROW], false]);

    seedSelection({ selectedResourceId: `project:${DOWNLOADED_ROW.projectId}` });
    const { useWebViewState, setters } = makeTrackedWebViewState('ScriptureResource');
    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...makeProps({ useWebViewState })} />);

    // Not the catalog-error view: its message has no translation in this test's localized-strings
    // mock, so it would render its own raw key if shown.
    expect(
      screen.queryByText('%webView_resourcePanel_catalogUnavailable%'),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Local Project/ })).toBeInTheDocument();
    expect(screen.getByTestId(RESOURCE_TEXT_WAITING_TEST_ID)).toBeInTheDocument();

    expect(setters.get(NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY)).toHaveBeenCalledWith([
      DOWNLOADED_ROW.projectId,
    ]);
    // Without the catalog the user's own DBL resources resolve as downloads, so the selector must
    // know not to split them off as other resources.
    expect(capturedResourceTextPanelProps.mock.lastCall?.[0]).toEqual(
      expect.objectContaining({ isCatalogUnavailable: true }),
    );
  });

  it('still shows the catalog-error view when the catalog failed and nothing resolved locally', () => {
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.1.0', items: [CONFIGURED_DBL_REFERENCE] },
    });
    mockUseDblResourceCatalog.mockReturnValue(FAILED_CATALOG);

    const { useWebViewState, setters } = makeTrackedWebViewState('ScriptureResource', {
      [NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY]: ['persisted-project'],
    });
    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...makeProps({ useWebViewState })} />);

    expect(screen.getByText('%webView_resourcePanel_catalogUnavailable%')).toBeInTheDocument();
    // A failed catalog is no answer about what is displayed, so the saved list is kept.
    const setNavigableProjectIds = setters.get(NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY);
    expect(setNavigableProjectIds).toBeDefined();
    expect(setNavigableProjectIds).not.toHaveBeenCalled();
  });

  it('waits for local rows still loading instead of showing the catalog-error view', () => {
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.1.0', items: [CONFIGURED_DBL_REFERENCE] },
    });
    mockUseDblResourceCatalog.mockReturnValue(FAILED_CATALOG);
    mockUseResourcePickerResources.mockReturnValue([undefined, true]);

    const { useWebViewState } = makeTrackedWebViewState('ScriptureResource');
    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...makeProps({ useWebViewState })} />);

    expect(
      screen.queryByText('%webView_resourcePanel_catalogUnavailable%'),
    ).not.toBeInTheDocument();
    // The still-loading picker rows are what the wait is for, so the loading view (the live region
    // `LoadingView` renders) must be what's shown instead of the catalog-error view being absent.
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows the catalog-error view, and keeps a saved DBL selection, when only an unrelated resource resolved', () => {
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.1.0', items: [CONFIGURED_DBL_REFERENCE] },
    });
    mockUseDblResourceCatalog.mockReturnValue(FAILED_CATALOG);
    mockUseResourcePickerResources.mockReturnValue([[DOWNLOADED_ROW], false]);

    seedSelection({ selectedResourceId: `dbl:${CONFIGURED_DBL_REFERENCE.id}` });
    const { useWebViewState } = makeTrackedWebViewState('ScriptureResource');
    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...makeProps({ useWebViewState })} />);

    expect(screen.getByText('%webView_resourcePanel_catalogUnavailable%')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Local Project/ })).not.toBeInTheDocument();
    expect(writtenSelections()).toEqual([]);
  });

  it('reads no text for the first downloaded row while the catalog-error view covers it', () => {
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.1.0', items: [CONFIGURED_DBL_REFERENCE] },
    });
    mockUseDblResourceCatalog.mockReturnValue(FAILED_CATALOG);
    mockUseResourcePickerResources.mockReturnValue([[DOWNLOADED_ROW], false]);

    seedSelection({ selectedResourceId: `dbl:${CONFIGURED_DBL_REFERENCE.id}` });
    const { useWebViewState } = makeTrackedWebViewState('ScriptureResource');
    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...makeProps({ useWebViewState })} />);

    expect(screen.getByText('%webView_resourcePanel_catalogUnavailable%')).toBeInTheDocument();
    // Positive control: the chapter text is asked for, just not for the row the error view hides.
    expect(mockUseProjectDataProvider).toHaveBeenCalledWith(
      'platformScripture.USJ_Chapter',
      undefined,
    );
    expect(mockUseProjectDataProvider).not.toHaveBeenCalledWith(
      'platformScripture.USJ_Chapter',
      DOWNLOADED_ROW.projectId,
    );
  });

  it('still migrates a legacy bare selection id while the catalog has failed', () => {
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.1.0', items: [CONFIGURED_DBL_REFERENCE] },
    });
    mockUseDblResourceCatalog.mockReturnValue(FAILED_CATALOG);
    mockUseResourcePickerResources.mockReturnValue([[DOWNLOADED_ROW], false]);

    seedSelection({ selectedResourceId: DOWNLOADED_ROW.projectId });
    const { useWebViewState } = makeTrackedWebViewState('ScriptureResource');
    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...makeProps({ useWebViewState })} />);

    expect(writtenSelections()).toContainEqual(
      expect.objectContaining({ selectedResourceId: `project:${DOWNLOADED_ROW.projectId}` }),
    );
  });

  it('shows the catalog-error view for a saved DBL selection even when nothing is referenced', () => {
    // A downloaded DBL resource picked while online is saved as `dbl:`, without being referenced.
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.1.0', items: [] },
    });
    mockUseDblResourceCatalog.mockReturnValue(FAILED_CATALOG);
    mockUseResourcePickerResources.mockReturnValue([[DOWNLOADED_ROW], false]);

    seedSelection({ selectedResourceId: 'dbl:downloaded-dbl-uid' });
    const { useWebViewState } = makeTrackedWebViewState('ScriptureResource');
    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...makeProps({ useWebViewState })} />);

    expect(screen.getByText('%webView_resourcePanel_catalogUnavailable%')).toBeInTheDocument();
    expect(writtenSelections()).toEqual([]);
  });

  it('renders a saved selection that resolved locally when the catalog failed', () => {
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.1.0', items: [CONFIGURED_DBL_REFERENCE] },
    });
    mockUseDblResourceCatalog.mockReturnValue(FAILED_CATALOG);
    mockUseResourcePickerResources.mockReturnValue([[DOWNLOADED_ROW], false]);

    seedSelection({ selectedResourceId: `project:${DOWNLOADED_ROW.projectId}` });
    const { useWebViewState } = makeTrackedWebViewState('ScriptureResource');
    const ResourceTextPanel = getResourceTextPanel();
    render(<ResourceTextPanel {...makeProps({ useWebViewState })} />);

    expect(
      screen.queryByText('%webView_resourcePanel_catalogUnavailable%'),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Local Project/ })).toBeInTheDocument();
    expect(writtenSelections()).toEqual([]);
  });
});

// Power mode has no notion of team resources, so its selector lists every row together.
describe('ResourceTextPanel — interface mode', () => {
  it.each([
    ['simple', true],
    ['power', false],
  ] as const)('in %s mode, groups the selector: %s', (mode, isGrouped) => {
    interfaceMode.current = mode;
    renderWithRows([DOWNLOADED_ROW]);

    expect(capturedResourceTextPanelProps.mock.lastCall?.[0]).toEqual(
      expect.objectContaining({ isGrouped }),
    );
  });

  // The setting reads as its 'simple' default while it loads, so a Power session must not take
  // that as Simple, even for a frame.
  it('does not group the selector while the interface mode is still loading', () => {
    interfaceMode.isLoading = true;
    renderWithRows([DOWNLOADED_ROW]);

    expect(capturedResourceTextPanelProps).toHaveBeenCalled();
    const groupedPerRender = capturedResourceTextPanelProps.mock.calls.map(
      ([props]) => props.isGrouped,
    );
    expect(groupedPerRender.every((isGrouped) => isGrouped === false)).toBe(true);
  });
});

/**
 * A settled, configured panel showing one installed Bible text, reading its chapter through
 * `chapterUsj`.
 */
function renderWithResource(chapterUsj: (selector: unknown, defaultValue: unknown) => unknown[]) {
  mockUseDblResourceCatalog.mockReturnValue({
    dblResources: [],
    isLoadingResources: false,
    isCatalogReady: true,
    hasCatalogError: false,
    refetchCatalog: vi.fn(),
  });
  mockUseEffectiveResourceReferenceList.mockReturnValue({
    status: 'ready',
    list: {
      dataVersion: '1.0.0',
      items: [{ type: 'project', name: 'WEB', id: 'web-id', source: 'user' }],
    },
  });
  mockUseResourcePickerResources.mockReturnValue([
    [
      {
        reference: { type: 'project', name: 'WEB', id: 'web-id' },
        source: 'user',
        isAdminLocked: false,
        type: 'ScriptureResource',
        installed: true,
        projectId: 'web-id',
      },
    ],
    false,
  ]);
  mockUseProjectData.mockReturnValue({
    ChapterUSJ: chapterUsj,
    BookCopyLimits: vi.fn(() => [undefined, vi.fn(), false]),
  });

  const ResourceTextPanel = getResourceTextPanel();
  return render(<ResourceTextPanel {...makeProps()} />);
}

/** A chapter carrying a `chapter` node, so `isBlankChapterOnScreen` does not report it empty. */
const ARRIVED_CHAPTER: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [{ type: 'chapter', marker: 'c', number: '1' }],
};

// What the panel puts in its content area before the first chapter of a resource has arrived.
// Two branches answer this — `resolveResourceContentState`'s `'loading'` and the render's
// `!usjFromPdp` spinner — and both depend on the subscription being seeded with `undefined`: a
// blank USJ is neither `undefined` nor falsy, so it reaches neither, and `Editorial` mounts holding
// nothing, painting Lexical's "Enter some Scripture…" prompt — an invitation to type in a text the
// reader cannot edit.
describe('ResourceTextPanel — content area before the first chapter arrives', () => {
  it('mounts the editor once a chapter has actually arrived', () => {
    // Positive control for the assertion below: without it, "no editor" would pass against a panel
    // that rendered nothing at all, or that never reached its content area.
    renderWithResource(() => [ARRIVED_CHAPTER, vi.fn(), false]);
    expect(screen.getByTestId('editorial')).toBeInTheDocument();
  });

  it('shows a labelled waiting state instead of an empty editor while the chapter is on its way', () => {
    // Mirrors the real hook's contract: until a delivery lands it hands back the DEFAULT VALUE it
    // was given, so what the panel seeds the subscription with is what the panel renders. Asserted
    // through the live region and its text rather than the spinner's utility class: the
    // announcement IS the behaviour here, and `role="status"` does not take its name from content.
    renderWithResource((_selector, defaultValue) => [defaultValue, vi.fn(), true]);
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Loading…');
  });

  it('feeds the arrived chapter into the editor', () => {
    // The editor holds no content of its own, so a mounted editor that was never fed shows
    // Lexical's "Enter some Scripture…" prompt. Guards the feed against being dropped or having its
    // dependencies narrowed; it does NOT pin WHEN the feed runs relative to paint, which jsdom
    // cannot observe (see the panel's `useLayoutEffect` comment).
    renderWithResource(() => [ARRIVED_CHAPTER, vi.fn(), false]);
    expect(setUsjSpy).toHaveBeenCalledWith(ARRIVED_CHAPTER);
  });
});

// A pick is an `await` chain over a settings write and an install, and nothing stops the user
// picking again while one runs. `isSelecting` gates more than the label: it suppresses
// `useDblResourceAutoInstall`, so releasing it while a pick is still working re-arms auto-install
// alongside that pick's own install of a different resource.
describe('ResourceTextPanel — overlapping resource picks', () => {
  /** A pick whose completion the test controls. */
  function deferred() {
    let settle: () => void = () => {};
    const promise = new Promise<void>((resolve) => {
      settle = resolve;
    });
    return { promise, settle };
  }

  it('keeps reporting "Selecting…" until the pick the user made LAST finishes', async () => {
    const first = deferred();
    const second = deferred();
    vi.mocked(selectTextConnection)
      .mockImplementationOnce(async () => first.promise)
      .mockImplementationOnce(async () => second.promise);

    renderWithResource(() => [ARRIVED_CHAPTER, vi.fn(), false]);
    const onPickerClosed = vi.mocked(useDialogCallback).mock.lastCall?.[2];
    const pick = (dblEntryUid: string) =>
      // Only the resource's identity matters here: `selectTextConnection` is mocked.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      onPickerClosed?.({ dblEntryUid } as DblResourceData, 'platform.resourcePicker', {
        resourceType: 'ScriptureResource',
        selectedResourceIds: [],
        isModal: true,
      });

    await act(async () => {
      pick('a');
      pick('b');
    });
    expect(screen.getByRole('status')).toHaveTextContent('Selecting…');

    // The superseded pick settles first. It does not own the flag, so it must not clear it.
    await act(async () => {
      first.settle();
      await first.promise;
    });
    expect(screen.getByRole('status')).toHaveTextContent('Selecting…');

    await act(async () => {
      second.settle();
      await second.promise;
    });
    expect(screen.queryByText('Selecting…')).not.toBeInTheDocument();
  });
});

// A chapter read can fail transiently — a resource still installing, a provider that recovers — so
// the named failure carries a way out. The retry has to produce a genuinely NEW subscription, not
// just a repaint: `useData` keys its subscription on the selector by reference, so the assertion
// is that the panel hands `ChapterUSJ` a selector object it has not seen before.
describe('ResourceTextPanel — retrying a failed chapter read', () => {
  it('re-subscribes with a fresh selector for the same reference', async () => {
    const chapterUsj = vi.fn<(selector: unknown, defaultValue: unknown) => unknown[]>(() => [
      newPlatformError(new Error('Could not read chapter.')),
      vi.fn(),
      false,
    ]);
    renderWithResource(chapterUsj);

    const selectorsBefore = chapterUsj.mock.calls.map((call) => call[0]);
    const retry = screen.getByRole('button', { name: 'Try again' });

    await act(async () => {
      retry.click();
    });

    const selectorAfter = chapterUsj.mock.calls.at(-1)?.[0];
    // Same reference being read...
    expect(selectorAfter).toEqual(selectorsBefore.at(-1));
    // ...but never an object the hook was already subscribed to, which is what forces a resubscribe.
    expect(selectorsBefore).not.toContain(selectorAfter);
  });
});

describe('ResourceTextPanel — removing a resource in the picker', () => {
  type PickerOptions = DialogTypes['platform.resourcePicker']['options'];
  type PickerResolve = (
    result: DialogTypes['platform.resourcePicker']['responseType'] | undefined,
  ) => void;

  const catalogRow = (dblEntryUid: string, projectId: string): DblResourceData => ({
    dblEntryUid,
    displayName: dblEntryUid,
    fullName: dblEntryUid,
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1,
    installed: true,
    updateAvailable: false,
    projectId,
  });
  const TEAM = catalogRow('team-uid', 'team-project');
  const MINE = catalogRow('mine-uid', 'mine-project');
  const OTHER = catalogRow('other-uid', 'other-project');

  const row = (
    resource: DblResourceData,
    source: PickerResource['source'],
    id = resource.dblEntryUid,
  ): PickerResource => ({
    reference: { type: 'dblResource', name: resource.displayName, id },
    source,
    isAdminLocked: false,
    type: 'ScriptureResource',
    installed: true,
    projectId: resource.projectId,
  });
  // The team's uid is stored upper-cased, as some sources spell it.
  const ROWS = [row(TEAM, 'admin', 'TEAM-UID'), row(MINE, 'user'), row(OTHER, 'downloaded')];

  const catalogState = (hasCatalogError: boolean) => ({
    dblResources: hasCatalogError ? [] : [TEAM, MINE, OTHER],
    isLoadingResources: false,
    isCatalogReady: !hasCatalogError,
    hasCatalogError,
    refetchCatalog: vi.fn(),
  });

  /**
   * Renders the panel and returns what it last handed `useDialogCallback` for the resource picker,
   * plus a way to re-render with other picker rows.
   */
  function renderWithPicker(props: Partial<WebViewProps> = {}) {
    let options: PickerOptions | undefined;
    let resolve: PickerResolve | undefined;
    vi.mocked(useDialogCallback).mockImplementation(
      // The mock stands in for every overload; these tests read only the picker's arguments.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_type: any, hookOptions: any, resolveCallback: any) => {
        options = hookOptions;
        resolve = resolveCallback;
        return vi.fn();
      },
    );
    mockUseEffectiveResourceReferenceList.mockReturnValue({
      status: 'ready',
      list: { dataVersion: '1.1.0', items: [] },
    });
    mockUseDblResourceCatalog.mockReturnValue(catalogState(false));
    mockUseResourcePickerResources.mockReturnValue([ROWS, false]);
    const ResourceTextPanel = getResourceTextPanel();
    const view = render(<ResourceTextPanel {...makeProps(props)} />);
    const current = () => {
      if (!options || !resolve) throw new Error('the panel did not set up the resource picker');
      return { options, resolve };
    };
    return {
      ...current(),
      // Opens the picker from the panel, as its menu item does.
      open: () =>
        act(() => {
          capturedResourceTextPanelProps.mock.lastCall?.[0].onShowResourcePicker?.();
        }),
      rerender: () => {
        view.rerender(<ResourceTextPanel {...makeProps(props)} />);
        return current();
      },
    };
  }

  /** The user's list as the settings provider holds it; returns the provider's setter. */
  function mockUserList(items: { type: 'dblResource'; name: string; id: string }[]) {
    const setUserReferencedProjectsAndResources = vi.fn(async () => true);
    mockUseProjectDataProvider.mockReturnValue({
      getUserReferencedProjectsAndResources: vi.fn(async () => ({ dataVersion: '1.1.0', items })),
      setUserReferencedProjectsAndResources,
    });
    return setUserReferencedProjectsAndResources;
  }

  it("offers the team's resources locked and the user's own as removable, as the catalog spells them", () => {
    mockUserList([]);
    const { options } = renderWithPicker();
    expect(options.selectedResourceIds).toEqual(['team-uid', 'mine-uid']);
    expect(options.teamResourceIds).toEqual(['team-uid']);
    expect(options.allowRemove).toBe(true);
  });

  it('offers nothing to remove with no project open', () => {
    mockUserList([]);
    const { options } = renderWithPicker({ projectId: undefined });
    expect(options.allowRemove).toBe(false);
    expect(options.teamResourceIds).toBeUndefined();
  });

  // Team resources exist only in Simple.
  it('keeps the picker as it was in Power: one selected section, nothing to remove', () => {
    interfaceMode.current = 'power';
    mockUserList([]);
    const { options } = renderWithPicker();
    // Positive control: the selected ids are still sent, so the missing split is a real answer.
    expect(options.selectedResourceIds).toEqual(['team-uid', 'mine-uid']);
    expect(options.teamResourceIds).toBeUndefined();
    expect(options.allowRemove).toBe(false);
  });

  // Until the mode is known it might be Power, which has no team resources.
  it('keeps the picker as it was until the interface mode is known', () => {
    interfaceMode.isLoading = true;
    mockUserList([]);
    const { options } = renderWithPicker();
    // Positive control: the selected ids are still sent, so the missing split is a real answer.
    expect(options.selectedResourceIds).toEqual(['team-uid', 'mine-uid']);
    expect(options.teamResourceIds).toBeUndefined();
    expect(options.allowRemove).toBe(false);
  });

  // Until the provider arrives there is nowhere to write a removal, so offering one would close
  // the dialog and change nothing.
  it('offers nothing to remove until the settings provider arrives', () => {
    mockUseProjectDataProvider.mockReturnValue(undefined);
    const { options } = renderWithPicker();
    expect(options.allowRemove).toBe(false);
  });

  it("removes a picked selected resource from the user's list, leaving the rest", async () => {
    const setUserList = mockUserList([
      { type: 'dblResource', name: 'mine', id: 'mine-uid' },
      { type: 'dblResource', name: 'keep', id: 'keep-uid' },
    ]);
    const { open, resolve } = renderWithPicker();

    open();
    resolve({ resource: MINE, action: 'remove' });

    await waitFor(() =>
      expect(setUserList).toHaveBeenCalledWith(
        expect.objectContaining({
          items: [{ type: 'dblResource', name: 'keep', id: 'keep-uid' }],
        }),
      ),
    );
    expect(selectTextConnection).not.toHaveBeenCalled();
    // The dialog has closed and the resource may still be on screen, so the change is announced.
    expect(papi.notifications.send).toHaveBeenCalledWith({
      message: 'mine-uid was removed from your list.',
      severity: 'info',
    });
  });

  it('adds a resource the picker returned as an add, even if it joined the list while open', async () => {
    const setUserList = mockUserList([{ type: 'dblResource', name: 'other', id: 'other-uid' }]);
    const { open, rerender } = renderWithPicker();
    open();
    // While the dialog is open, the resource reaches the user's list from elsewhere.
    mockUseResourcePickerResources.mockReturnValue([
      [row(TEAM, 'admin', 'TEAM-UID'), row(MINE, 'user'), row(OTHER, 'user')],
      false,
    ]);
    const { options: optionsNow, resolve } = rerender();
    // Positive control: the panel now counts it as the user's, so only the returned action keeps
    // this an add.
    expect(optionsNow.selectedResourceIds).toContain('other-uid');

    resolve({ resource: OTHER, action: 'add' });

    await waitFor(() => expect(selectTextConnection).toHaveBeenCalled());
    expect(setUserList).not.toHaveBeenCalled();
  });

  // A catalog refetch, as finishing an install starts, empties the rows until it reloads.
  it('removes what the picker showed, even if the rows emptied while it was open', async () => {
    const setUserList = mockUserList([{ type: 'dblResource', name: 'mine', id: 'mine-uid' }]);
    const { open, rerender } = renderWithPicker();
    open();
    mockUseResourcePickerResources.mockReturnValue([undefined, true]);
    const { options: optionsNow, resolve } = rerender();
    // Positive control: the panel no longer lists the resource as the user's.
    expect(optionsNow.selectedResourceIds).not.toContain('mine-uid');

    resolve({ resource: MINE, action: 'remove' });

    await waitFor(() =>
      expect(setUserList).toHaveBeenCalledWith(expect.objectContaining({ items: [] })),
    );
    expect(papi.notifications.send).toHaveBeenCalledWith({
      message: 'mine-uid was removed from your list.',
      severity: 'info',
    });
  });

  it('says so when the removal could not be saved', async () => {
    const setUserList = mockUserList([{ type: 'dblResource', name: 'mine', id: 'mine-uid' }]);
    setUserList.mockRejectedValue(new Error('the settings could not be written'));
    const { open, resolve } = renderWithPicker();

    open();
    resolve({ resource: MINE, action: 'remove' });

    await waitFor(() =>
      expect(papi.notifications.send).toHaveBeenCalledWith({
        message: '%webView_resourcePanel_removeFailed%',
        severity: 'error',
      }),
    );
  });

  // Another tab removed it while the dialog was open: what the user asked for already holds.
  it('treats a resource already off the list as removed', async () => {
    const setUserList = mockUserList([]);
    const { open, resolve } = renderWithPicker();

    open();
    resolve({ resource: MINE, action: 'remove' });

    await waitFor(() =>
      expect(papi.notifications.send).toHaveBeenCalledWith({
        message: 'mine-uid was removed from your list.',
        severity: 'info',
      }),
    );
    expect(setUserList).not.toHaveBeenCalled();
    expect(papi.notifications.send).not.toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error' }),
    );
  });

  // The dialog has already closed, so a removal that could not happen must not pass silently.
  it('says so when the list could not be read', async () => {
    const setUserReferencedProjectsAndResources = vi.fn(async () => true);
    mockUseProjectDataProvider.mockReturnValue({
      getUserReferencedProjectsAndResources: vi.fn(async () => undefined),
      setUserReferencedProjectsAndResources,
    });
    const { open, resolve } = renderWithPicker();

    open();
    resolve({ resource: MINE, action: 'remove' });

    await waitFor(() =>
      expect(papi.notifications.send).toHaveBeenCalledWith({
        message: '%webView_resourcePanel_removeFailed%',
        severity: 'error',
      }),
    );
    expect(setUserReferencedProjectsAndResources).not.toHaveBeenCalled();
  });

  it('merges the dropdown groups only while the DBL catalog failed or is not ready', () => {
    mockUserList([]);
    const { rerender } = renderWithPicker();
    expect(capturedResourceTextPanelProps).toHaveBeenLastCalledWith(
      expect.objectContaining({ isCatalogUnavailable: false }),
    );

    mockUseDblResourceCatalog.mockReturnValue(catalogState(true));
    rerender();
    expect(capturedResourceTextPanelProps).toHaveBeenLastCalledWith(
      expect.objectContaining({ isCatalogUnavailable: true }),
    );
  });

  // With no DBL credentials there will never be a catalog, and merging would leave a resource the
  // user removed listed under their own.
  it('keeps the dropdown groups on an installation with no DBL credentials', () => {
    mockUserList([]);
    const { rerender } = renderWithPicker();
    mockUseDblResourceCatalog.mockReturnValue({ ...catalogState(false), dblResources: [] });
    rerender();
    expect(capturedResourceTextPanelProps).toHaveBeenLastCalledWith(
      expect.objectContaining({ isCatalogUnavailable: false }),
    );
  });
});
