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
// `use-project-picker-data.hook.ts` -> `papi-frontend.service.ts`, whose module-level
// `theme.service-host.ts` initialization calls `window.matchMedia`, which jsdom does not
// implement. Mock this PAPI service boundary (matching the precedent in
// `use-project-picker-data.hook.test.ts`) since this smoke test only checks registration
// metadata and never exercises project-picker behavior.
vi.mock('@renderer/services/papi-frontend.service', () => ({
  webViews: {
    getAllOpenWebViewDefinitions: vi.fn(async () => []),
  },
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
};

const mockState: MockState = {
  referencedProjectsAndResources: EMPTY_RESOURCE_LIST,
  setReferencedProjectsAndResources: vi.fn(),
  modelTexts: EMPTY_RESOURCE_LIST,
  setModelTexts: vi.fn(),
  sharedLayoutDefaultTab: '',
  setSharedLayoutDefaultTab: vi.fn(),
  canWritePromise: undefined,
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
    if (key === 'platformScripture.referencedProjectsAndResources')
      return [
        mockState.referencedProjectsAndResources,
        mockState.setReferencedProjectsAndResources,
        vi.fn(),
        false,
      ];
    if (key === 'platformScripture.modelTexts')
      return [mockState.modelTexts, mockState.setModelTexts, vi.fn(), false];
    if (key === 'platformScripture.sharedLayoutDefaultTab')
      return [
        mockState.sharedLayoutDefaultTab,
        mockState.setSharedLayoutDefaultTab,
        vi.fn(),
        false,
      ];
    return [undefined, vi.fn(), vi.fn(), false];
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
  render(
    <Dialog open modal={false}>
      <SHARE_LAYOUT_DIALOG.Component
        isDialog
        projectId="proj-1"
        submitDialog={submitDialog}
        cancelDialog={cancelDialog}
        rejectDialog={rejectDialog}
      />
    </Dialog>,
  );
  return { submitDialog, cancelDialog, rejectDialog };
}

beforeEach(() => {
  mockState.referencedProjectsAndResources = EMPTY_RESOURCE_LIST;
  mockState.setReferencedProjectsAndResources = vi.fn();
  mockState.modelTexts = EMPTY_RESOURCE_LIST;
  mockState.setModelTexts = vi.fn();
  mockState.sharedLayoutDefaultTab = '';
  mockState.setSharedLayoutDefaultTab = vi.fn();
  mockState.canWritePromise = undefined;
  mockTextConnectionsProvider.canUserWriteProjectTextConnectionSettings.mockClear();
  mockTextConnectionsProvider.getUserReferencedProjectsAndResources.mockClear();
  mockTextConnectionsProvider.getUserModelTexts.mockClear();
  vi.mocked(sendCommand).mockReset();
  vi.mocked(sendCommand).mockResolvedValue([]);
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
        return [makeDblResource({ dblEntryUid: 'esv-uid', type: 'ScriptureResource' })];
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
