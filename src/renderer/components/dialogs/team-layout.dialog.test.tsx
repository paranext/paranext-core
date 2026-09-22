import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { newPlatformError } from 'platform-bible-utils';
import type { DblResourceData, PlatformError } from 'platform-bible-utils';
import type { ResourceReference, ResourceReferenceList } from 'platform-scripture';
import { Dialog } from 'platform-bible-react';
import { SHARE_LAYOUT_DIALOG_TYPE } from '@renderer/components/dialogs/dialog-definition.model';
import { DIALOGS } from '@renderer/components/dialogs/index';
import { TEAM_LAYOUT_DIALOG } from '@renderer/components/dialogs/team-layout.dialog';
import { sendCommand } from '@shared/services/command.service';
import { useProjectDataProvider } from '@renderer/hooks/papi-hooks';

// Importing the real `DIALOGS` map transitively pulls in `project-picker.dialog.tsx` ->
// `use-project-picker-data.hook.ts` -> the renderer web view host and `papi-frontend.service.ts`,
// which start most of the renderer's services at module load. Mock both service boundaries
// (matching the precedent in `use-project-picker-data.hook.test.ts`) since this smoke test only
// checks registration metadata and never exercises project-picker behavior.
vi.mock('@renderer/services/papi-frontend.service', () => ({
  webViews: {
    getAllOpenWebViewDefinitions: vi.fn(async () => []),
  },
}));
vi.mock('@renderer/services/web-view.service-shard', () => ({
  getAllOpenWebViewDefinitionsSync: vi.fn(() => []),
}));

const EMPTY_RESOURCE_LIST: ResourceReferenceList = { dataVersion: '1.0.0', items: [] };

/**
 * Closure-referenced mock state, mutated by individual tests. Mirrors the precedent in
 * `platform-bible-toolbar.test.tsx` / `user-profile-popover.test.tsx`: a mutable object the
 * `vi.mock` factories close over, instead of per-test `mockReturnValue` casts, so the mock
 * factories stay strongly typed while tests still vary behavior between cases.
 */
type MockState = {
  /**
   * Admits `PlatformError` because an unreadable read is the case that matters here: it maps to
   * `undefined`, `seedResourceList` then falls back to the admin's PERSONAL list, and the per-field
   * seed comparison does NOT catch it — both sides are the personal list. Only the explicit
   * `isProjectResourcesUnknown` / `isProjectModelTextsUnknown` guards do.
   */
  referencedProjectsAndResources: ResourceReferenceList | PlatformError;
  setReferencedProjectsAndResources: ReturnType<typeof vi.fn>;
  modelTexts: ResourceReferenceList | PlatformError;
  setModelTexts: ReturnType<typeof vi.fn>;
  sharedLayoutDefaultTab: string;
  setSharedLayoutDefaultTab: ReturnType<typeof vi.fn>;
  structureProtected: boolean | PlatformError;
  setStructureProtected: ReturnType<typeof vi.fn>;
  /**
   * Makes `useProjectSetting` return NO setter for the team lock, which is what it really does for
   * as long as its data provider is unresolved — a window the mount gate is deliberately latched
   * across, so the body can be live and interactive while the setter is missing.
   */
  isStructureProtectedSetterUnavailable: boolean;
  /**
   * The two settings the heading is composed from. Through `mockState` like the rest, so a test can
   * vary them — the composition rule (skip the full name when it is absent or equal to the short
   * name) is otherwise unexercised.
   */
  projectShortName: string;
  projectFullName: string;
  /**
   * The promise `canUserWriteProjectTextConnectionSettings` returns. Tests assign a fresh
   * controllable promise (or an already-resolved one) before rendering so they can drive the
   * admin-gate's loading -> resolved transition explicitly.
   */
  canWritePromise: Promise<boolean> | undefined;
  /**
   * `useProjectSetting`'s 4th element, per setting key. Hard-coding it to `false` would make every
   * test render against settings that have already been delivered — the one state in which the
   * mount gate cannot be wrong — and sharing one flag across all three keys would let a gate that
   * checks only one of them still look correct.
   */
  loadingProjectSettingKeys: Set<string>;
};

const mockState: MockState = {
  referencedProjectsAndResources: EMPTY_RESOURCE_LIST,
  setReferencedProjectsAndResources: vi.fn(),
  modelTexts: EMPTY_RESOURCE_LIST,
  setModelTexts: vi.fn(),
  sharedLayoutDefaultTab: '',
  setSharedLayoutDefaultTab: vi.fn(),
  structureProtected: false,
  setStructureProtected: vi.fn(),
  isStructureProtectedSetterUnavailable: false,
  projectShortName: 'HNF',
  projectFullName: 'Hanif Bible',
  canWritePromise: undefined,
  loadingProjectSettingKeys: new Set<string>(),
};

const mockTextConnectionsProvider = {
  canUserWriteProjectTextConnectionSettings: vi.fn(() => mockState.canWritePromise),
  getUserReferencedProjectsAndResources: vi.fn(async () => EMPTY_RESOURCE_LIST),
  getUserModelTexts: vi.fn(async () => EMPTY_RESOURCE_LIST),
};

// Mock only the three PAPI hooks `TeamLayoutDialogWrapper` actually calls
// (`useLocalizedStrings`, `useProjectSetting`, `useProjectDataProvider`). `usePromise` and
// `RESOURCE_PICKER_DIALOG_STRING_KEYS` come from the real `platform-bible-react` package (as in
// `team-layout.component.test.tsx`, which renders the same dialog content against the real
// package with no extra mocking needed) so the admin-gate's loading -> resolved race is exercised
// for real instead of simulated.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{}, false]),
  useProjectSetting: vi.fn((_projectDataProviderSource: unknown, key: string) => {
    const isProjectSettingLoading = mockState.loadingProjectSettingKeys.has(key);
    if (key === 'platformScripture.referencedProjectsAndResources')
      return [
        mockState.referencedProjectsAndResources,
        mockState.setReferencedProjectsAndResources,
        vi.fn(),
        isProjectSettingLoading,
      ];
    if (key === 'platformScripture.modelTexts')
      return [mockState.modelTexts, mockState.setModelTexts, vi.fn(), isProjectSettingLoading];
    if (key === 'platformScripture.sharedLayoutDefaultTab')
      return [
        mockState.sharedLayoutDefaultTab,
        mockState.setSharedLayoutDefaultTab,
        vi.fn(),
        isProjectSettingLoading,
      ];
    if (key === 'platformScripture.structureProtected')
      return [
        mockState.structureProtected,
        mockState.isStructureProtectedSetterUnavailable
          ? undefined
          : mockState.setStructureProtected,
        vi.fn(),
        isProjectSettingLoading,
      ];
    // The project's own name, rendered straight through rather than snapshotted, so it is not
    // part of the mount gate and needs no per-key loading flag.
    if (key === 'platform.name') return [mockState.projectShortName, vi.fn(), vi.fn(), false];
    if (key === 'platform.fullName') return [mockState.projectFullName, vi.fn(), vi.fn(), false];
    return [undefined, vi.fn(), vi.fn(), isProjectSettingLoading];
  }),
  useProjectDataProvider: vi.fn(() => mockTextConnectionsProvider),
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(async () => []),
}));

function makeDblResource(overrides: Partial<DblResourceData>): DblResourceData {
  return {
    dblEntryUid: 'uid',
    displayName: 'name',
    fullName: 'full name',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 100,
    installed: true,
    updateAvailable: false,
    projectId: 'proj',
    ...overrides,
  };
}

function renderWrapper(
  overrides: {
    submitDialog?: ReturnType<typeof vi.fn>;
    cancelDialog?: ReturnType<typeof vi.fn>;
  } = {},
) {
  const submitDialog = overrides.submitDialog ?? vi.fn();
  const cancelDialog = overrides.cancelDialog ?? vi.fn();
  const rejectDialog = vi.fn();
  // Mirror the real `DIALOG_BASE.loadDialog` (`dialog-base.data.ts`), which always wraps a
  // dialog's `Component` output in a non-modal `Dialog` root so Radix primitives like
  // `DialogTitle`/`DialogDescription` used inside the dialog content have the required context.
  // Built fresh on each call: React bails out of reconciliation when handed the very same element
  // reference, so a re-render would not re-read the mocked hook state a test just changed.
  const buildElement = () => (
    <Dialog open modal={false}>
      <TEAM_LAYOUT_DIALOG.Component
        isDialog
        projectId="proj-1"
        submitDialog={submitDialog}
        cancelDialog={cancelDialog}
        rejectDialog={rejectDialog}
      />
    </Dialog>
  );
  const { rerender } = render(buildElement());
  // Re-renders the SAME component instance so a test can flip the mocked hook state a real
  // delivery would flip, without mounting a second copy of the dialog beside the first.
  return { submitDialog, cancelDialog, rejectDialog, rerender: () => rerender(buildElement()) };
}

/**
 * Answers successive `getCachedResources` calls with `responses` in turn, the last one repeating.
 * Keyed on the command name rather than call order: the dialog refreshes the resource flags before
 * reading the catalog, so an order-based mock hands the catalog's answer to that refresh instead.
 */
function mockCatalogResponses(...responses: unknown[]) {
  let catalogCallCount = 0;
  vi.mocked(sendCommand).mockImplementation(async (commandName: unknown) => {
    if (commandName !== 'platformGetResources.getCachedResources') return undefined;
    const response = responses[Math.min(catalogCallCount, responses.length - 1)];
    catalogCallCount += 1;
    return response;
  });
}

beforeEach(() => {
  mockState.referencedProjectsAndResources = EMPTY_RESOURCE_LIST;
  mockState.setReferencedProjectsAndResources = vi.fn();
  mockState.modelTexts = EMPTY_RESOURCE_LIST;
  mockState.setModelTexts = vi.fn();
  mockState.sharedLayoutDefaultTab = '';
  mockState.setSharedLayoutDefaultTab = vi.fn();
  mockState.structureProtected = false;
  mockState.setStructureProtected = vi.fn();
  mockState.isStructureProtectedSetterUnavailable = false;
  mockState.projectShortName = 'HNF';
  mockState.projectFullName = 'Hanif Bible';
  mockState.canWritePromise = undefined;
  mockState.loadingProjectSettingKeys = new Set<string>();
  mockTextConnectionsProvider.canUserWriteProjectTextConnectionSettings.mockClear();
  // `mockReset` rather than `mockClear`: a test that installs a never-resolving implementation and
  // fails before restoring it would otherwise leak that pending promise into every test after it,
  // turning one real regression into a cascade of five-second timeouts pointing at the wrong tests.
  mockTextConnectionsProvider.getUserReferencedProjectsAndResources.mockReset();
  mockTextConnectionsProvider.getUserReferencedProjectsAndResources.mockImplementation(
    async () => EMPTY_RESOURCE_LIST,
  );
  mockTextConnectionsProvider.getUserModelTexts.mockReset();
  mockTextConnectionsProvider.getUserModelTexts.mockImplementation(async () => EMPTY_RESOURCE_LIST);
  vi.mocked(sendCommand).mockReset();
  vi.mocked(sendCommand).mockResolvedValue({ status: 'available', resources: [] });
});

/**
 * Toggles a resource row's text-collection checkbox — the cheapest real edit to the resource lists.
 *
 * `handleConfirm` writes a setting only when its field actually changed, so a test that confirms
 * without editing anything asserts nothing about the write path. See the change-detection comment
 * in `team-layout.dialog.tsx`.
 */
function editResourceList() {
  act(() => {
    screen.getAllByRole('checkbox')[0].click();
  });
}

/** Clicks Save and flushes the awaited setter promises `handleConfirm` now waits on. */
async function confirmDialog() {
  const confirmButton = screen.getByText('%shareLayoutDialog_saveForTeam_label%');
  await act(async () => {
    confirmButton.click();
  });
  // The confirm path is async on both sides of the boundary — the body awaits `onConfirm`, which
  // awaits `Promise.allSettled` over the writes — so a single microtask tick lands mid-chain and
  // the dialog has neither submitted nor reported a failure yet. A macrotask turn drains both.
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  });
}

describe('TeamLayoutDialogWrapper catalog gate', () => {
  it('waits for the catalog before mounting the body, so Confirm cannot erase the saved resource list', async () => {
    mockState.canWritePromise = Promise.resolve(true);

    const savedResource: ResourceReference = { type: 'dblResource', name: 'ESV', id: 'esv-uid' };
    mockState.referencedProjectsAndResources = { dataVersion: '2.0.0', items: [savedResource] };

    let resolveCatalog: (value: unknown) => void = () => {};
    vi.mocked(sendCommand).mockImplementation(async (commandName: unknown) => {
      if (commandName === 'platformGetResources.getCachedResources')
        return new Promise((resolve) => {
          resolveCatalog = resolve;
        });
      return undefined;
    });

    renderWrapper();

    // The body must not mount yet. `TeamLayoutDialogContent` snapshots its initial lists in
    // `useState` at mount, and without a catalog `splitResourcesByTab` cannot classify a saved
    // dblResource reference — every one lands in `otherResources`, so the snapshot would be empty.
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.queryByText('%shareLayoutDialog_modelText_label%')).not.toBeInTheDocument();

    await act(async () => {
      resolveCatalog({
        status: 'available',
        resources: [makeDblResource({ dblEntryUid: 'esv-uid', type: 'ScriptureResource' })],
      });
      await Promise.resolve();
    });

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    editResourceList();
    await confirmDialog();

    // Mounting early would make this an empty list: the memo recomputes `otherResources` to empty
    // once the catalog lands, while the body's snapshot stays empty too, and Confirm writes both.
    expect(mockState.setReferencedProjectsAndResources).toHaveBeenCalledWith({
      dataVersion: '2.0.0',
      items: [{ ...savedResource, isInTextCollection: true }],
    });
  });

  it('waits for the project setting to be delivered, so Confirm cannot erase the saved resource list', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    // What `createUseDataHook` returns while a project setting is in flight: the default value,
    // byte-identical to a genuinely empty shared list. Only the loading flag tells them apart.
    mockState.referencedProjectsAndResources = EMPTY_RESOURCE_LIST;
    // Only this one setting is in flight: a gate that waits on a different setting instead would
    // still look correct if they all reported loading together.
    mockState.loadingProjectSettingKeys = new Set([
      'platformScripture.referencedProjectsAndResources',
    ]);
    // A catalog entry for the saved reference, so it renders as an editable row below.
    vi.mocked(sendCommand).mockResolvedValue({
      status: 'available',
      resources: [makeDblResource({ dblEntryUid: 'esv-uid', type: 'ScriptureResource' })],
    });

    const { rerender } = renderWrapper();

    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.queryByText('%shareLayoutDialog_modelText_label%')).not.toBeInTheDocument();

    const savedResource: ResourceReference = { type: 'dblResource', name: 'ESV', id: 'esv-uid' };
    mockState.referencedProjectsAndResources = { dataVersion: '2.0.0', items: [savedResource] };
    mockState.loadingProjectSettingKeys = new Set<string>();
    // The delivery a real subscription would make; the body mounts and snapshots the real list.
    await act(async () => {
      rerender();
      await Promise.resolve();
    });

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    editResourceList();
    await confirmDialog();

    expect(mockState.setReferencedProjectsAndResources).toHaveBeenCalledWith({
      dataVersion: '2.0.0',
      items: [{ ...savedResource, isInTextCollection: true }],
    });
  });

  it('waits for the personal resource list too, so Save cannot share it before the project list arrives', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    let resolvePersonal: (value: ResourceReferenceList) => void = () => {};
    mockTextConnectionsProvider.getUserReferencedProjectsAndResources.mockImplementation(
      async () =>
        new Promise<ResourceReferenceList>((resolve) => {
          resolvePersonal = resolve;
        }),
    );

    renderWrapper();

    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.queryByText('%shareLayoutDialog_modelText_label%')).not.toBeInTheDocument();

    await act(async () => {
      resolvePersonal(EMPTY_RESOURCE_LIST);
      await Promise.resolve();
    });

    await screen.findByText('%shareLayoutDialog_modelText_label%');
  });

  it('renders the dialog with a stated count and a retry when the catalog fetch failed', async () => {
    // `usePromise` logs every rejection it sees; this one rejects on purpose.
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = {
      dataVersion: '2.0.0',
      items: [{ type: 'dblResource', name: 'ESV', id: 'esv-uid' }],
    };

    vi.mocked(sendCommand).mockImplementation(async (commandName: unknown) => {
      if (commandName === 'platformGetResources.getCachedResources')
        throw new Error('the catalog fetch failed');
      return undefined;
    });

    // `finally` so a failing assertion below cannot leave `console.error` stubbed for every test
    // after this one, swallowing the React warnings a reviewer relies on.
    try {
      renderWrapper();

      // The dialog still opens: the tab and model-text settings have nothing to do with DBL, and
      // replacing the whole dialog would put them out of reach over a transient fetch.
      await screen.findByText('%shareLayoutDialog_modelText_label%');
      // The saved DBL reference cannot be classified without a catalog, so it is absent from the
      // rows — said out loud rather than left for the admin to notice.
      expect(screen.getByText('%shareLayoutDialog_hiddenResources_loadError%')).toBeInTheDocument();
      expect(screen.getByText('%shareLayoutDialog_retry%')).toBeInTheDocument();
    } finally {
      vi.restoreAllMocks();
    }
  });

  it('states the hidden count without a retry when this installation has no DBL credentials', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = {
      dataVersion: '2.0.0',
      items: [{ type: 'dblResource', name: 'ESV', id: 'esv-uid' }],
    };
    vi.mocked(sendCommand).mockResolvedValue({ status: 'unavailable', reason: 'notConfigured' });

    renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    expect(screen.getByText('%shareLayoutDialog_hiddenResources_unavailable%')).toBeInTheDocument();
    // Nothing to retry — the credentials are not coming.
    expect(screen.queryByText('%shareLayoutDialog_retry%')).not.toBeInTheDocument();
  });

  it('preserves references it could not classify when the catalog never arrives', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    // A `dblResource` with no catalog row has no knowable type, so it lands in `otherResources` —
    // neither displayed nor editable, but it must survive the write-back or it is lost for good.
    const unclassifiable: ResourceReference = { type: 'dblResource', name: 'ESV', id: 'esv-uid' };
    // A `project` reference is classified without the catalog, so it renders as an editable row —
    // which is what makes the write fire at all, and therefore what makes this test falsifiable.
    const editableResource: ResourceReference = { type: 'project', name: 'HNF' };
    mockState.referencedProjectsAndResources = {
      dataVersion: '2.0.0',
      items: [unclassifiable, editableResource],
    };
    vi.mocked(sendCommand).mockResolvedValue({ status: 'unavailable', reason: 'notConfigured' });

    renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    editResourceList();
    await confirmDialog();

    expect(mockState.setReferencedProjectsAndResources).toHaveBeenCalledWith({
      dataVersion: '2.0.0',
      items: [{ ...editableResource, isInTextCollection: true }, unclassifiable],
    });
  });

  // Without a catalog `splitResourcesByTab` cannot tell a Bible text from a commentary, so every
  // saved `dblResource` lands in `otherResources` and both tab lists mount EMPTY. The body
  // snapshots those empty lists and never re-syncs — so a successful retry has to remount it, or
  // the dialog goes on showing nothing for a project that has several resources, and the button
  // the admin clicked cannot do what they clicked it for.
  it('re-seeds the body when a retry finally delivers the catalog and nothing has been edited', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = {
      dataVersion: '2.0.0',
      items: [{ type: 'dblResource', name: 'ESV', id: 'esv-uid' }],
    };
    mockCatalogResponses(
      { status: 'unavailable', reason: 'notReady' },
      {
        status: 'available',
        resources: [makeDblResource({ dblEntryUid: 'esv-uid', displayName: 'ESV' })],
      },
    );

    renderWrapper();

    const retry = await screen.findByText('%shareLayoutDialog_retry%');
    await screen.findByText('%shareLayoutDialog_modelText_label%');
    // Nothing classifiable, so no rows — the state the hint is there to explain.
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
    expect(screen.getByText('%shareLayoutDialog_hiddenResources_loadError%')).toBeInTheDocument();

    await act(async () => {
      retry.click();
      await Promise.resolve();
    });

    // The saved reference is classifiable now, so it belongs in the list the admin is reviewing.
    await waitFor(() => {
      expect(screen.queryAllByRole('checkbox')).toHaveLength(1);
    });
    expect(
      screen.queryByText('%shareLayoutDialog_hiddenResources_loadError%'),
    ).not.toBeInTheDocument();
  });

  // The other side of that: a dirty body must NOT be remounted, because its edits live in
  // `useState`. The hint then has to keep reporting what the lists are not showing — computed live
  // it would drop to zero the moment the catalog landed, leaving an empty review pane reading as
  // the truth with no caveat at all.
  it('keeps the hidden-resource caveat after a retry when the admin has already edited something', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = {
      dataVersion: '2.0.0',
      items: [{ type: 'dblResource', name: 'ESV', id: 'esv-uid' }],
    };
    mockCatalogResponses(
      { status: 'unavailable', reason: 'notReady' },
      {
        status: 'available',
        resources: [makeDblResource({ dblEntryUid: 'esv-uid', displayName: 'ESV' })],
      },
    );

    renderWrapper();

    const retry = await screen.findByText('%shareLayoutDialog_retry%');
    await screen.findByText('%shareLayoutDialog_modelText_label%');

    // An edit the remount would discard. The lists are empty here, so the lock is the only control
    // there is to touch — which is exactly the state this case is about.
    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });

    await act(async () => {
      retry.click();
      await Promise.resolve();
    });

    // The edit survives, and the caveat still describes the lists actually on screen.
    expect(
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }),
    ).toBeChecked();
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
    expect(screen.getByText('%shareLayoutDialog_hiddenResources_loadError%')).toBeInTheDocument();
  });

  it('keeps the mounted body through a retry, so edits made in the dialog survive it', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = {
      dataVersion: '2.0.0',
      items: [{ type: 'dblResource', name: 'ESV', id: 'esv-uid' }],
    };
    // The retry's fetch stays IN FLIGHT, which is the state the gate would react to: a retry that
    // resolves before the assertion would let a gate reading the live settled flag look correct.
    let catalogCallCount = 0;
    vi.mocked(sendCommand).mockImplementation(async (commandName: unknown) => {
      if (commandName !== 'platformGetResources.getCachedResources') return undefined;
      catalogCallCount += 1;
      if (catalogCallCount === 1) return { status: 'unavailable', reason: 'notReady' };
      return new Promise(() => {});
    });

    renderWrapper();

    const retry = await screen.findByText('%shareLayoutDialog_retry%');
    await screen.findByText('%shareLayoutDialog_modelText_label%');

    await act(async () => {
      retry.click();
      await Promise.resolve();
    });

    // The mount gate consumed the FIRST settle only. Unmounting here would discard the tab,
    // model-text and resource edits the admin has made since the dialog opened.
    expect(screen.getByText('%shareLayoutDialog_saveForTeam_label%')).toBeInTheDocument();
  });
});

describe('TeamLayoutDialogWrapper heading', () => {
  // The heading is the only thing telling an admin which project they are about to change
  // team-wide settings for, and the composition rule is shared with `ProjectSelector`'s
  // `shortNameAndFullName` branch — so both of its paths are pinned here.
  it('heads the dialog with the short and full project name', async () => {
    mockState.canWritePromise = Promise.resolve(true);

    renderWrapper();

    expect(await screen.findByText('HNF - Hanif Bible')).toBeInTheDocument();
  });

  it('shows the short name alone when the full name adds nothing', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.projectFullName = mockState.projectShortName;

    renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    expect(screen.getByText('HNF')).toBeInTheDocument();
    expect(screen.queryByText('HNF - HNF')).not.toBeInTheDocument();
  });
});

describe('TeamLayoutDialogWrapper admin-gate failure paths', () => {
  // `usePromise` reports a REJECTION as `isLoading: false` with the value left `undefined`, which is
  // indistinguishable from "not decided yet" — so a dialog gating on that alone waits on a skeleton
  // forever, and the skeleton is convincing enough (real title, real description, disabled buttons)
  // to read as a slow load rather than a failure.
  it('closes rather than waiting forever when the permission check fails', async () => {
    mockState.canWritePromise = Promise.reject(new Error('the permission check failed'));

    const { cancelDialog } = renderWrapper();

    await waitFor(() => {
      expect(cancelDialog).toHaveBeenCalled();
    });
  });

  it('does not close the dialog during the renders before the provider resolves', async () => {
    // The provider is unresolved, so the optional-chained permission call resolves immediately to
    // `undefined` and `hasSettled` flips true on the first render. An effect keyed on `hasSettled`
    // alone would close the dialog on open.
    vi.mocked(useProjectDataProvider).mockReturnValueOnce(undefined);
    mockState.canWritePromise = Promise.resolve(true);

    const { cancelDialog } = renderWrapper();

    await act(async () => {
      await Promise.resolve();
    });
    expect(cancelDialog).not.toHaveBeenCalled();
  });
});

describe('TeamLayoutDialogWrapper mount-gate latches', () => {
  // `useProjectSetting` flips `isLoading` back to `true` whenever its data provider's identity
  // changes, and installing, updating or removing ANY extension reloads them all and churns those
  // network objects. Without a settled-once latch that reopens the gate, unmounts the body, and
  // destroys every edit the admin has staged.
  it("keeps the admin's staged edits through a background provider reconnect", async () => {
    mockState.canWritePromise = Promise.resolve(true);

    const { rerender } = renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });
    expect(
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }),
    ).toBeChecked();

    // The reconnect: a setting reports loading again, then settles.
    mockState.loadingProjectSettingKeys = new Set(['platformScripture.modelTexts']);
    await act(async () => {
      rerender();
      await Promise.resolve();
    });
    mockState.loadingProjectSettingKeys = new Set<string>();
    await act(async () => {
      rerender();
      await Promise.resolve();
    });

    // Unmounting for the reconnect would have discarded this back to its persisted `false`.
    expect(
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }),
    ).toBeChecked();
  });
});

describe('TEAM_LAYOUT_DIALOG registration', () => {
  it('has the expected tabType', () => {
    expect(TEAM_LAYOUT_DIALOG.tabType).toBe('platform.shareLayoutDialog');
  });

  it('is registered in the DIALOGS map under its own tabType', () => {
    expect(DIALOGS[SHARE_LAYOUT_DIALOG_TYPE]).toBe(TEAM_LAYOUT_DIALOG);
  });

  // The tab title and the DialogTitle inside the dialog body are separate strings that must name
  // the dialog identically; nothing but this ties them together.
  it('titles its tab with the team layout name', () => {
    expect(TEAM_LAYOUT_DIALOG.defaultTitle).toBe('%shareLayoutDialog_teamLayout_title%');
  });

  // The component renders both halves itself, so the modal shell must render neither. Without
  // these the shell adds a second title and a second description under the same ids, and because
  // this dialog carries no `prompt` the shell's description falls back to the TITLE and wins on
  // document order — so a screen-reader user hears the title as the description and never hears
  // `%shareLayoutDialog_reviewAndSyncNotice%`. The shell's own tests cover the mechanism; nothing
  // but this covers the wiring, which is how the flag came to be set on one dialog and not this
  // one.
  it('declares that it provides its own title and description', () => {
    expect(TEAM_LAYOUT_DIALOG.providesOwnTitle).toBe(true);
    expect(TEAM_LAYOUT_DIALOG.providesOwnDescription).toBe(true);
  });
});

describe('TeamLayoutDialogWrapper admin gate', () => {
  it('does not render the dialog content or write any settings while canWrite is loading, and still does not after it resolves false', async () => {
    let resolveCanWrite: (value: boolean) => void = () => {};
    mockState.canWritePromise = new Promise<boolean>((resolve) => {
      resolveCanWrite = resolve;
    });

    const { cancelDialog } = renderWrapper();

    // Still loading: nothing resembling the real dialog content is rendered, and no settings
    // have been written.
    expect(screen.queryByText('%shareLayoutDialog_modelText_label%')).not.toBeInTheDocument();
    expect(mockState.setReferencedProjectsAndResources).not.toHaveBeenCalled();
    expect(mockState.setModelTexts).not.toHaveBeenCalled();
    expect(mockState.setSharedLayoutDefaultTab).not.toHaveBeenCalled();
    // The team lock especially: this dialog is its only control, and the write reaches every
    // translator on the project.
    expect(mockState.setStructureProtected).not.toHaveBeenCalled();
    expect(cancelDialog).not.toHaveBeenCalled();

    await act(async () => {
      resolveCanWrite(false);
      await Promise.resolve();
    });

    await waitFor(() => expect(cancelDialog).toHaveBeenCalledTimes(1));
    expect(screen.queryByText('%shareLayoutDialog_modelText_label%')).not.toBeInTheDocument();
    expect(mockState.setReferencedProjectsAndResources).not.toHaveBeenCalled();
    expect(mockState.setModelTexts).not.toHaveBeenCalled();
    expect(mockState.setSharedLayoutDefaultTab).not.toHaveBeenCalled();
    // The team lock especially: this dialog is its only control, and the write reaches every
    // translator on the project.
    expect(mockState.setStructureProtected).not.toHaveBeenCalled();
  });

  it('calls cancelDialog only after canWrite resolves to false, not during the loading window', async () => {
    let resolveCanWrite: (value: boolean) => void = () => {};
    mockState.canWritePromise = new Promise<boolean>((resolve) => {
      resolveCanWrite = resolve;
    });

    const { cancelDialog } = renderWrapper();

    // Flush several microtask turns while the promise is still pending. If the gate ever fired
    // based on the transient `canWrite === undefined` loading value instead of waiting for a
    // confirmed `false`, this would already have called cancelDialog.
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });
    expect(cancelDialog).not.toHaveBeenCalled();

    resolveCanWrite(false);
    await waitFor(() => expect(cancelDialog).toHaveBeenCalledTimes(1));
  });

  it('does not call cancelDialog when canWrite resolves true', async () => {
    mockState.canWritePromise = Promise.resolve(true);

    const { cancelDialog } = renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    expect(cancelDialog).not.toHaveBeenCalled();
  });
});

describe('TeamLayoutDialogWrapper loading state', () => {
  // The modal host sizes the dialog from its content, so a loading state with nothing in it
  // collapses the whole dialog to a ~30px sliver showing only the close button, runs the open
  // animation at that height, then snaps to full size. The skeleton holds the real footprint.
  it('shows the dialog at its real size while the settings are still in flight', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.loadingProjectSettingKeys = new Set([
      'platformScripture.referencedProjectsAndResources',
    ]);

    renderWrapper();

    await act(async () => {
      await Promise.resolve();
    });

    // Titled and framed like the loaded dialog...
    expect(screen.getByText('%shareLayoutDialog_teamLayout_title%')).toBeInTheDocument();
    expect(screen.getByText('%shareLayoutDialog_saveForTeam_label%')).toBeInTheDocument();
    // ...but with no content mounted, and no action that could write from an unloaded snapshot.
    expect(screen.queryByText('%shareLayoutDialog_modelText_label%')).not.toBeInTheDocument();
    expect(screen.getByText('%shareLayoutDialog_saveForTeam_label%')).toBeDisabled();
  });

  it('cannot write project settings from the loading state', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.loadingProjectSettingKeys = new Set([
      'platformScripture.referencedProjectsAndResources',
    ]);

    renderWrapper();

    await act(async () => {
      await Promise.resolve();
    });
    // Asserted as "the actions are disabled", not just "clicking wrote nothing": the skeleton's
    // buttons carry no handler at all, so a bare click assertion passes however the code changes —
    // including if someone wired the real `onConfirm` into the skeleton and left it enabled.
    const saveButton = screen.getByRole('button', {
      name: '%shareLayoutDialog_saveForTeam_label%',
    });
    const cancelButton = screen.getByRole('button', { name: '%shareLayoutDialog_cancel_label%' });
    expect(saveButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();

    act(() => {
      saveButton.click();
    });

    expect(mockState.setReferencedProjectsAndResources).not.toHaveBeenCalled();
    expect(mockState.setStructureProtected).not.toHaveBeenCalled();
  });
});

describe('TeamLayoutDialogWrapper team structure lock', () => {
  // The lock resolves to `false` while it is still loading — byte-identical to a project that is
  // genuinely unlocked. Mounting the body before it is delivered would snapshot that `false` and a
  // save would unlock the project's structure for the whole team.
  it('waits for the team lock to be delivered before mounting the body', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.loadingProjectSettingKeys = new Set(['platformScripture.structureProtected']);

    renderWrapper();

    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.queryByText('%shareLayoutDialog_modelText_label%')).not.toBeInTheDocument();
  });

  it('writes the team lock on save', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.structureProtected = false;

    renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });
    await confirmDialog();

    expect(mockState.setStructureProtected).toHaveBeenCalledWith(true);
  });

  it('does not write the team lock eagerly when the switch is toggled', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.structureProtected = false;

    renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });

    expect(mockState.setStructureProtected).not.toHaveBeenCalled();
  });

  // The lock is a project-wide setting an admin can flip for the whole team, and this dialog is now
  // its only control — so a Cancel path that writes it, easy to introduce by routing Cancel through
  // a shared handler, would ship silently. The test above only proves the toggle is not eager; this
  // one actually presses Cancel.
  it('does not write the team lock when the dialog is cancelled', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.structureProtected = false;

    const { cancelDialog, submitDialog } = renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });
    await act(async () => {
      screen.getByText('%shareLayoutDialog_cancel_label%').click();
      await Promise.resolve();
    });

    expect(cancelDialog).toHaveBeenCalled();
    expect(submitDialog).not.toHaveBeenCalled();
    expect(mockState.setStructureProtected).not.toHaveBeenCalled();
  });
});

describe('TeamLayoutDialogWrapper confirm-write logic', () => {
  // On a project that has never shared a layout, `seedResourceList` seeds the team lists from the
  // admin's PERSONAL list — so a Save that writes an untouched resource field publishes one
  // person's selections to the whole team. The per-field seed comparison is what prevents that,
  // and it only works if it compares against the seed the BODY was mounted with. A catalog retry
  // driven from inside the open dialog gives the wrapper's live memos a fresh identity, which
  // would fail the comparison for a field nobody touched.
  it('does not write the resource lists after a catalog retry when only the lock was changed', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = EMPTY_RESOURCE_LIST;
    const personalResource: ResourceReference = {
      type: 'dblResource',
      name: 'Personal ESV',
      id: 'personal-esv-uid',
    };
    mockTextConnectionsProvider.getUserReferencedProjectsAndResources.mockImplementation(
      async () => ({ dataVersion: '2.0.0', items: [personalResource] }),
    );
    // The catalog is unavailable at mount — the state that puts the Retry button on screen — and
    // the retry then succeeds.
    mockCatalogResponses(
      { status: 'unavailable', reason: 'notReady' },
      {
        status: 'available',
        resources: [
          makeDblResource({ dblEntryUid: 'personal-esv-uid', displayName: 'Personal ESV' }),
        ],
      },
    );

    renderWrapper();
    const retry = await screen.findByText('%shareLayoutDialog_retry%');
    await screen.findByText('%shareLayoutDialog_modelText_label%');

    // A retry from inside the open dialog: a fresh catalog object, so `allResources` — and every
    // memo that takes it as a dep — takes a new identity.
    await act(async () => {
      retry.click();
      await Promise.resolve();
    });

    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });
    await confirmDialog();

    expect(mockState.setStructureProtected).toHaveBeenCalledWith(true);
    expect(mockState.setReferencedProjectsAndResources).not.toHaveBeenCalled();
    expect(mockState.setModelTexts).not.toHaveBeenCalled();
  });

  // An unreadable read maps to `undefined`, so `seedResourceList` falls back to the admin's
  // personal list — and the seed comparison cannot catch it, because both sides ARE the personal
  // list. Only the explicit unknown-guards stop the personal list being published to the team.
  it('never writes the resource lists back when their current value could not be read', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = newPlatformError('could not read the resources');
    mockState.modelTexts = newPlatformError('could not read the model texts');
    const personalResource: ResourceReference = {
      type: 'dblResource',
      name: 'Personal ESV',
      id: 'personal-esv-uid',
    };
    mockTextConnectionsProvider.getUserReferencedProjectsAndResources.mockImplementation(
      async () => ({ dataVersion: '2.0.0', items: [personalResource] }),
    );
    vi.mocked(sendCommand).mockResolvedValue({
      status: 'available',
      resources: [
        makeDblResource({ dblEntryUid: 'personal-esv-uid', displayName: 'Personal ESV' }),
      ],
    });

    renderWrapper();
    await screen.findByText('%shareLayoutDialog_modelText_label%');

    // Edit the list, so an unguarded Confirm would definitely write it.
    editResourceList();
    await confirmDialog();

    expect(mockState.setReferencedProjectsAndResources).not.toHaveBeenCalled();
    expect(mockState.setModelTexts).not.toHaveBeenCalled();
  });

  // `useProjectSetting` returns NO setter while its data provider is unresolved, and the mount gate
  // is deliberately latched open across exactly that window — so the body can be live with a
  // missing setter. Skipping it silently would close the dialog reporting a save that never
  // reached the project.
  // The default tab is compared like every other field — against the seed the body mounted with,
  // not against the live subscription. Read live, another admin's write or an S/R delivery landing
  // while this dialog is open makes the untouched tab fail its comparison, and Save pushes this
  // admin's stale value over the newer one.
  it('does not write the default tab when it changed under an open dialog and the admin never touched it', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.sharedLayoutDefaultTab = 'ScriptureResource';

    const { rerender } = renderWrapper();
    await screen.findByText('%shareLayoutDialog_modelText_label%');

    // A concurrent change to the same setting, delivered by the subscription the wrapper reads.
    mockState.sharedLayoutDefaultTab = 'Comments';
    await act(async () => {
      rerender();
      await Promise.resolve();
    });

    // The admin changes something else entirely and saves.
    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });
    await confirmDialog();

    expect(mockState.setStructureProtected).toHaveBeenCalledWith(true);
    expect(mockState.setSharedLayoutDefaultTab).not.toHaveBeenCalled();
  });

  // Skipping the write of an unreadable setting is right; reporting success is not. The admin's
  // resource edits are discarded, and they are told the team layout was saved.
  it('reports failure rather than success when the admin edited a resource list that cannot be written', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = newPlatformError('could not read the resources');
    mockTextConnectionsProvider.getUserReferencedProjectsAndResources.mockImplementation(
      async () => ({
        dataVersion: '2.0.0',
        items: [{ type: 'project', name: 'HNF' } satisfies ResourceReference],
      }),
    );
    vi.mocked(sendCommand).mockResolvedValue({ status: 'available', resources: [] });

    const { submitDialog } = renderWrapper();
    await screen.findByText('%shareLayoutDialog_modelText_label%');

    editResourceList();
    await confirmDialog();

    expect(mockState.setReferencedProjectsAndResources).not.toHaveBeenCalled();
    expect(submitDialog).not.toHaveBeenCalled();
    expect(screen.getByText('%shareLayoutDialog_saveFailed%')).toBeInTheDocument();
  });

  // The other half of that rule: an unreadable resource list must not block a save that never
  // touched it, or an admin could not use the lock at all while the read is failing.
  it('still saves the team lock when a resource list cannot be read but was never edited', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = newPlatformError('could not read the resources');
    vi.mocked(sendCommand).mockResolvedValue({ status: 'available', resources: [] });

    const { submitDialog } = renderWrapper();
    await screen.findByText('%shareLayoutDialog_modelText_label%');

    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });
    await confirmDialog();

    expect(mockState.setStructureProtected).toHaveBeenCalledWith(true);
    expect(submitDialog).toHaveBeenCalledWith(true);
    expect(screen.queryByText('%shareLayoutDialog_saveFailed%')).not.toBeInTheDocument();
  });

  it('reports failure rather than success when a setter it intends to call is unavailable', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.structureProtected = false;

    const { submitDialog, rerender } = renderWrapper();
    await screen.findByText('%shareLayoutDialog_modelText_label%');

    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });
    // The provider churns and the setter goes away while the body stays mounted. The gate is
    // latched, so the body keeps its staged edit and its live Save button across this.
    mockState.isStructureProtectedSetterUnavailable = true;
    await act(async () => {
      rerender();
    });
    await confirmDialog();

    expect(submitDialog).not.toHaveBeenCalled();
    expect(await screen.findByText('%shareLayoutDialog_saveFailed%')).toBeInTheDocument();
  });

  it('writes referencedProjectsAndResources, modelTexts, and sharedLayoutDefaultTab, preserving otherResources the dialog does not model', async () => {
    mockState.canWritePromise = Promise.resolve(true);

    const scriptureItem: ResourceReference = { type: 'dblResource', name: 'ESV', id: 'esv-uid' };
    // A reference type the dialog doesn't display or let the admin edit (the
    // `otherResources` bucket). Confirming without touching anything must still preserve it in
    // the write-back instead of silently dropping it.
    const otherItem: ResourceReference = { type: 'xmlResource', name: 'Some XML' };
    mockState.referencedProjectsAndResources = {
      dataVersion: '2.0.0',
      items: [scriptureItem, otherItem],
    };
    mockState.sharedLayoutDefaultTab = 'ScriptureResource';

    vi.mocked(sendCommand).mockImplementation(async (commandName: unknown) => {
      if (commandName === 'platformGetResources.getCachedResources') {
        return {
          status: 'available',
          resources: [makeDblResource({ dblEntryUid: 'esv-uid', type: 'ScriptureResource' })],
        };
      }
      return undefined;
    });

    renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    editResourceList();
    await confirmDialog();

    expect(mockState.setReferencedProjectsAndResources).toHaveBeenCalledWith({
      dataVersion: '2.0.0',
      items: [{ ...scriptureItem, isInTextCollection: true }, otherItem],
    });
    // Untouched, so not written. An admin who opens this dialog only to flip the team lock must not
    // publish their own model text and default tab to the team as a side effect.
    expect(mockState.setModelTexts).not.toHaveBeenCalled();
    expect(mockState.setSharedLayoutDefaultTab).not.toHaveBeenCalled();
  });

  // On a project that has never shared a layout, `seedResourceList` seeds the resource lists from
  // the ADMIN'S PERSONAL selections — so writing them unconditionally would publish one person's
  // resource list to the whole team as a side effect of flipping an unrelated switch.
  it('does not publish the personal resource list when only the team lock is changed', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = EMPTY_RESOURCE_LIST;
    mockTextConnectionsProvider.getUserReferencedProjectsAndResources.mockImplementation(
      async (): Promise<ResourceReferenceList> => ({
        dataVersion: '2.0.0',
        items: [{ type: 'dblResource', name: 'ESV', id: 'esv-uid' }],
      }),
    );

    renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });
    await confirmDialog();

    expect(mockState.setStructureProtected).toHaveBeenCalledWith(true);
    expect(mockState.setReferencedProjectsAndResources).not.toHaveBeenCalled();
    expect(mockState.setModelTexts).not.toHaveBeenCalled();
  });

  it('calls submitDialog(true) after a successful confirm', async () => {
    mockState.canWritePromise = Promise.resolve(true);

    const { submitDialog } = renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    await confirmDialog();

    expect(submitDialog).toHaveBeenCalledWith(true);
  });

  // A project-setting write can be REFUSED — the Send/Receive write gate rejects during an
  // automatic sync. Closing the dialog then would tell the admin the team lock was saved when
  // nothing was, and this dialog is the lock's only UI, so there is no second place to notice.
  it('keeps the dialog open and reports the failure when a write is refused', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.setStructureProtected = vi.fn(async () => {
      throw new Error('(SR_EDIT_BLOCKED)');
    });

    const { submitDialog } = renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    act(() => {
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }).click();
    });
    await confirmDialog();

    expect(submitDialog).not.toHaveBeenCalled();
    expect(screen.getByText('%shareLayoutDialog_saveFailed%')).toBeInTheDocument();
  });

  // A delivered `PlatformError` clears the loading flag exactly like a real value, so the mount gate
  // passes and the switch renders its `false` fallback. Writing that back would silently unlock USFM
  // structure for every translator on the project.
  it('never writes the team lock back when its current value could not be read', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.structureProtected = newPlatformError('could not read the setting');

    renderWrapper();

    await screen.findByText('%shareLayoutDialog_modelText_label%');
    expect(
      screen.getByRole('switch', { name: '%shareLayoutDialog_teamLock_label%' }),
    ).toBeDisabled();

    await confirmDialog();

    expect(mockState.setStructureProtected).not.toHaveBeenCalled();
  });
});
