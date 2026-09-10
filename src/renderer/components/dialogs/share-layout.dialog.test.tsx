import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { ResourceReference, ResourceReferenceList } from 'platform-scripture';
import { Dialog } from 'platform-bible-react';
import { SHARE_LAYOUT_DIALOG_TYPE } from '@renderer/components/dialogs/dialog-definition.model';
import { DIALOGS } from '@renderer/components/dialogs/index';
import { SHARE_LAYOUT_DIALOG } from '@renderer/components/dialogs/share-layout.dialog';
import { sendCommand } from '@shared/services/command.service';

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
  referencedProjectsAndResources: ResourceReferenceList;
  setReferencedProjectsAndResources: ReturnType<typeof vi.fn>;
  modelTexts: ResourceReferenceList;
  setModelTexts: ReturnType<typeof vi.fn>;
  sharedLayoutDefaultTab: string;
  setSharedLayoutDefaultTab: ReturnType<typeof vi.fn>;
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
  canWritePromise: undefined,
  loadingProjectSettingKeys: new Set<string>(),
};

const mockTextConnectionsProvider = {
  canUserWriteProjectTextConnectionSettings: vi.fn(() => mockState.canWritePromise),
  getUserReferencedProjectsAndResources: vi.fn(async () => EMPTY_RESOURCE_LIST),
  getUserModelTexts: vi.fn(async () => EMPTY_RESOURCE_LIST),
};

// Mock only the three PAPI hooks `ShareLayoutDialogWrapper` actually calls
// (`useLocalizedStrings`, `useProjectSetting`, `useProjectDataProvider`). `usePromise` and
// `RESOURCE_PICKER_DIALOG_STRING_KEYS` come from the real `platform-bible-react` package (as in
// `share-layout.component.test.tsx`, which renders the same dialog content against the real
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
      <SHARE_LAYOUT_DIALOG.Component
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

beforeEach(() => {
  mockState.referencedProjectsAndResources = EMPTY_RESOURCE_LIST;
  mockState.setReferencedProjectsAndResources = vi.fn();
  mockState.modelTexts = EMPTY_RESOURCE_LIST;
  mockState.setModelTexts = vi.fn();
  mockState.sharedLayoutDefaultTab = '';
  mockState.setSharedLayoutDefaultTab = vi.fn();
  mockState.canWritePromise = undefined;
  mockState.loadingProjectSettingKeys = new Set<string>();
  mockTextConnectionsProvider.canUserWriteProjectTextConnectionSettings.mockClear();
  mockTextConnectionsProvider.getUserReferencedProjectsAndResources.mockClear();
  mockTextConnectionsProvider.getUserModelTexts.mockClear();
  vi.mocked(sendCommand).mockReset();
  vi.mocked(sendCommand).mockResolvedValue({ status: 'available', resources: [] });
});

describe('ShareLayoutDialogWrapper catalog gate', () => {
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

    // The body must not mount yet. `ShareLayoutDialogContent` snapshots its initial lists in
    // `useState` at mount, and without a catalog `splitResourcesByTab` cannot classify a saved
    // dblResource reference — every one lands in `otherResources`, so the snapshot would be empty.
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.queryByText('%shareLayoutDialog_confirm_label%')).not.toBeInTheDocument();

    await act(async () => {
      resolveCatalog({
        status: 'available',
        resources: [makeDblResource({ dblEntryUid: 'esv-uid', type: 'ScriptureResource' })],
      });
      await Promise.resolve();
    });

    const confirmButton = await screen.findByText('%shareLayoutDialog_confirm_label%');
    act(() => {
      confirmButton.click();
    });

    // Mounting early would make this an empty list: the memo recomputes `otherResources` to empty
    // once the catalog lands, while the body's snapshot stays empty too, and Confirm writes both.
    expect(mockState.setReferencedProjectsAndResources).toHaveBeenCalledWith({
      dataVersion: '2.0.0',
      items: [savedResource],
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

    const { rerender } = renderWrapper();

    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.queryByText('%shareLayoutDialog_confirm_label%')).not.toBeInTheDocument();

    const savedResource: ResourceReference = { type: 'dblResource', name: 'ESV', id: 'esv-uid' };
    mockState.referencedProjectsAndResources = { dataVersion: '2.0.0', items: [savedResource] };
    mockState.loadingProjectSettingKeys = new Set<string>();
    // The delivery a real subscription would make; the body mounts and snapshots the real list.
    await act(async () => {
      rerender();
      await Promise.resolve();
    });

    const confirmButton = await screen.findByText('%shareLayoutDialog_confirm_label%');
    act(() => {
      confirmButton.click();
    });

    expect(mockState.setReferencedProjectsAndResources).toHaveBeenCalledWith({
      dataVersion: '2.0.0',
      items: [savedResource],
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
    expect(screen.queryByText('%shareLayoutDialog_confirm_label%')).not.toBeInTheDocument();

    await act(async () => {
      resolvePersonal(EMPTY_RESOURCE_LIST);
      await Promise.resolve();
    });

    await screen.findByText('%shareLayoutDialog_confirm_label%');
    mockTextConnectionsProvider.getUserReferencedProjectsAndResources.mockImplementation(
      async () => EMPTY_RESOURCE_LIST,
    );
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

    renderWrapper();

    // The dialog still opens: the tab and model-text settings have nothing to do with DBL, and
    // replacing the whole dialog would put them out of reach over a transient fetch.
    await screen.findByText('%shareLayoutDialog_confirm_label%');
    // The saved DBL reference cannot be classified without a catalog, so it is absent from the
    // rows — said out loud rather than left for the admin to notice.
    expect(screen.getByText('%shareLayoutDialog_hiddenResources_loadError%')).toBeInTheDocument();
    expect(screen.getByText('%shareLayoutDialog_retry%')).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it('states the hidden count without a retry when this installation has no DBL credentials', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = {
      dataVersion: '2.0.0',
      items: [{ type: 'dblResource', name: 'ESV', id: 'esv-uid' }],
    };
    vi.mocked(sendCommand).mockResolvedValue({ status: 'unavailable', reason: 'notConfigured' });

    renderWrapper();

    await screen.findByText('%shareLayoutDialog_confirm_label%');
    expect(screen.getByText('%shareLayoutDialog_hiddenResources_unavailable%')).toBeInTheDocument();
    // Nothing to retry — the credentials are not coming.
    expect(screen.queryByText('%shareLayoutDialog_retry%')).not.toBeInTheDocument();
  });

  it('preserves references it could not classify when the catalog never arrives', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    const savedResource: ResourceReference = { type: 'dblResource', name: 'ESV', id: 'esv-uid' };
    mockState.referencedProjectsAndResources = { dataVersion: '2.0.0', items: [savedResource] };
    vi.mocked(sendCommand).mockResolvedValue({ status: 'unavailable', reason: 'notConfigured' });

    renderWrapper();

    const confirmButton = await screen.findByText('%shareLayoutDialog_confirm_label%');
    act(() => {
      confirmButton.click();
    });

    expect(mockState.setReferencedProjectsAndResources).toHaveBeenCalledWith({
      dataVersion: '2.0.0',
      items: [savedResource],
    });
  });

  it('keeps the mounted body through a retry, so edits made in the dialog survive it', async () => {
    mockState.canWritePromise = Promise.resolve(true);
    mockState.referencedProjectsAndResources = {
      dataVersion: '2.0.0',
      items: [{ type: 'dblResource', name: 'ESV', id: 'esv-uid' }],
    };
    // The retry's fetch stays IN FLIGHT, which is the state the gate would react to: a retry that
    // resolves before the assertion would let a gate reading the live settled flag look correct.
    vi.mocked(sendCommand)
      .mockResolvedValueOnce({ status: 'unavailable', reason: 'notReady' })
      .mockImplementation(async () => new Promise(() => {}));

    renderWrapper();

    const retry = await screen.findByText('%shareLayoutDialog_retry%');
    await screen.findByText('%shareLayoutDialog_confirm_label%');

    await act(async () => {
      retry.click();
      await Promise.resolve();
    });

    // The mount gate consumed the FIRST settle only. Unmounting here would discard the tab,
    // model-text and resource edits the admin has made since the dialog opened.
    expect(screen.getByText('%shareLayoutDialog_confirm_label%')).toBeInTheDocument();
  });
});

describe('SHARE_LAYOUT_DIALOG registration', () => {
  it('has the expected tabType', () => {
    expect(SHARE_LAYOUT_DIALOG.tabType).toBe('platform.shareLayoutDialog');
  });

  it('is registered in the DIALOGS map under its own tabType', () => {
    expect(DIALOGS[SHARE_LAYOUT_DIALOG_TYPE]).toBe(SHARE_LAYOUT_DIALOG);
  });

  it('defines a Component to render', () => {
    expect(typeof SHARE_LAYOUT_DIALOG.Component).toBe('function');
  });
});

describe('ShareLayoutDialogWrapper admin gate', () => {
  it('does not render the dialog content or write any settings while canWrite is loading, and still does not after it resolves false', async () => {
    let resolveCanWrite: (value: boolean) => void = () => {};
    mockState.canWritePromise = new Promise<boolean>((resolve) => {
      resolveCanWrite = resolve;
    });

    const { cancelDialog } = renderWrapper();

    // Still loading: nothing resembling the real dialog content is rendered, and no settings
    // have been written.
    expect(screen.queryByText('%shareLayoutDialog_confirm_label%')).not.toBeInTheDocument();
    expect(mockState.setReferencedProjectsAndResources).not.toHaveBeenCalled();
    expect(mockState.setModelTexts).not.toHaveBeenCalled();
    expect(mockState.setSharedLayoutDefaultTab).not.toHaveBeenCalled();
    expect(cancelDialog).not.toHaveBeenCalled();

    await act(async () => {
      resolveCanWrite(false);
      await Promise.resolve();
    });

    await waitFor(() => expect(cancelDialog).toHaveBeenCalledTimes(1));
    expect(screen.queryByText('%shareLayoutDialog_confirm_label%')).not.toBeInTheDocument();
    expect(mockState.setReferencedProjectsAndResources).not.toHaveBeenCalled();
    expect(mockState.setModelTexts).not.toHaveBeenCalled();
    expect(mockState.setSharedLayoutDefaultTab).not.toHaveBeenCalled();
  });

  it('calls cancelDialog only after canWrite resolves to false, not during the loading window (regression: took 3 review rounds to get right)', async () => {
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

    await screen.findByText('%shareLayoutDialog_confirm_label%');
    expect(cancelDialog).not.toHaveBeenCalled();
  });
});

describe('ShareLayoutDialogWrapper confirm-write logic', () => {
  it('writes referencedProjectsAndResources, modelTexts, and sharedLayoutDefaultTab, preserving otherResources the dialog does not model', async () => {
    mockState.canWritePromise = Promise.resolve(true);

    const scriptureItem: ResourceReference = { type: 'dblResource', name: 'ESV', id: 'esv-uid' };
    // A reference type the dialog doesn't display or let the admin edit (Finding 1's
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

    const confirmButton = await screen.findByText('%shareLayoutDialog_confirm_label%');
    act(() => {
      confirmButton.click();
    });

    expect(mockState.setReferencedProjectsAndResources).toHaveBeenCalledWith({
      dataVersion: '2.0.0',
      items: [scriptureItem, otherItem],
    });
    expect(mockState.setModelTexts).toHaveBeenCalledWith({
      dataVersion: EMPTY_RESOURCE_LIST.dataVersion,
      items: [],
    });
    expect(mockState.setSharedLayoutDefaultTab).toHaveBeenCalledWith('ScriptureResource');
  });

  it('calls submitDialog(true) after a successful confirm', async () => {
    mockState.canWritePromise = Promise.resolve(true);

    const { submitDialog } = renderWrapper();

    const confirmButton = await screen.findByText('%shareLayoutDialog_confirm_label%');
    act(() => {
      confirmButton.click();
    });

    expect(submitDialog).toHaveBeenCalledWith(true);
  });
});
