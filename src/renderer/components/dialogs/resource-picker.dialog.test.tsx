import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Dialog } from 'platform-bible-react';
import { RESOURCE_PICKER_DIALOG } from '@renderer/components/dialogs/resource-picker.dialog';
import { sendCommand } from '@shared/services/command.service';

/*
 * The panels this dialog opens from distinguish a failed resource-catalog fetch from an empty one
 * and pair the failure with a retry (`getResourcePanelReadiness` / `PanelReadinessView`). The dialog
 * must agree with them: reporting a failure as "no results found" gives a user who is merely offline
 * a confident, wrong answer and no control that could change it.
 */

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));

// The wrapper's only PAPI dependency. Resolving each key to itself is what the picker's own
// missing-string fallback does anyway, so assertions read against the key.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn((keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ]),
}));

const { Component: ResourcePickerDialogWrapper } = RESOURCE_PICKER_DIALOG;

const DBL_CATALOG_COMMAND = 'platformGetResources.getCachedResources';
const LOCAL_RESOURCES_COMMAND = 'platformGetResources.getLocalNonDblResources';

/**
 * The wrapper draws from two independent sources, so a test that drives one must not depend on
 * which lands first, and a retry that re-drives only the DBL half must be counted against that half
 * rather than against every command the dialog sends.
 */
function countDblCatalogCalls() {
  return vi.mocked(sendCommand).mock.calls.filter(([command]) => command === DBL_CATALOG_COMMAND)
    .length;
}

/**
 * Routes each command to its own outcome, defaulting the local half to "nothing on disk".
 *
 * Both parameters are typed rather than inferred: an inferred `async () => []` default narrows to
 * `Promise<never[]>`, which then rejects every caller that supplies a populated list.
 */
function mockCommands(
  dblCatalog: () => Promise<unknown>,
  localResources: () => Promise<unknown> = async () => [],
) {
  vi.mocked(sendCommand).mockImplementation((command: unknown) =>
    command === LOCAL_RESOURCES_COMMAND ? localResources() : dblCatalog(),
  );
}

function renderWrapper() {
  render(
    <Dialog open>
      <ResourcePickerDialogWrapper
        isDialog
        resourceType="ScriptureResource"
        selectedResourceIds={[]}
        submitDialog={vi.fn()}
        cancelDialog={vi.fn()}
        rejectDialog={vi.fn()}
      />
    </Dialog>,
  );
}

describe('ResourcePickerDialogWrapper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // `usePromise` logs every rejection it sees; these tests reject on purpose.
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reports a failed catalog fetch instead of claiming there are no results', async () => {
    mockCommands(() => Promise.reject(new Error('the data provider is not up')));

    renderWrapper();

    await waitFor(() =>
      expect(screen.getByText('%resourcePicker_load_error%')).toBeInTheDocument(),
    );
    expect(screen.queryByText('%resourcePicker_no_results%')).not.toBeInTheDocument();
  });

  it('offers a retry that re-drives the fetch after a failure', async () => {
    mockCommands(() => Promise.reject(new Error('the data provider is not up')));

    renderWrapper();

    const retryButton = await screen.findByRole('button', { name: '%resourcePicker_retry%' });
    expect(countDblCatalogCalls()).toBe(1);

    await act(async () => {
      retryButton.click();
    });

    await waitFor(() => expect(countDblCatalogCalls()).toBe(2));
  });

  // The notice explains an incomplete list; the error state is for having nothing to show. A DBL
  // outage on a machine that has local resources must not hide a usable list behind an error card.
  it('keeps the locally-installed resources and explains the outage rather than replacing the list', async () => {
    const localResource = {
      dblEntryUid: 'VULGP83',
      displayName: 'VULGP83',
      fullName: 'Vulgate 1983',
      bestLanguageName: 'Latin',
      type: 'ScriptureResource',
      size: 0,
      installed: true,
      updateAvailable: false,
      projectId: 'VULGP83',
    };
    mockCommands(
      () => Promise.reject(new Error('the data provider is not up')),
      async () => [localResource],
    );

    renderWrapper();

    await waitFor(() => expect(screen.getByText('VULGP83')).toBeInTheDocument());
    // The list survives, so neither nothing-to-show state may claim the body.
    expect(screen.queryByText('%resourcePicker_load_error%')).not.toBeInTheDocument();
    expect(screen.queryByText('%resourcePicker_no_results%')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '%resourcePicker_retry%' }),
    ).not.toBeInTheDocument();
    // Which sentence the notice carries is `buildResourcePickerNotice`'s business and is covered in
    // `resource-picker.utils.test.ts`; this mock resolves every key to itself, which that builder
    // deliberately treats as an untranslated string and suppresses.
  });

  // An installation with no DBL credentials is not a failure, so it gets neither the error state nor
  // a retry that could not work — but it is also not a plain empty list, because the user would have
  // no way to tell why nothing is there.
  it('explains an installation that cannot download resources, without offering a retry', async () => {
    mockCommands(async () => ({ status: 'unavailable', reason: 'notConfigured' }));

    renderWrapper();

    await waitFor(() =>
      expect(screen.getByText('%resourcePicker_downloads_unavailable%')).toBeInTheDocument(),
    );
    expect(screen.queryByText('%resourcePicker_no_results%')).not.toBeInTheDocument();
    expect(screen.queryByText('%resourcePicker_load_error%')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '%resourcePicker_retry%' }),
    ).not.toBeInTheDocument();
  });

  // `notReady` means the data provider has not registered yet — genuinely transient, and `main.ts`
  // retries it ten times of its own accord. Rendering it as a plain empty list would strand the user
  // one click away from a working list.
  it('offers a retry when the catalog is only temporarily unavailable', async () => {
    vi.mocked(sendCommand).mockResolvedValue({ status: 'unavailable', reason: 'notReady' });

    renderWrapper();

    await waitFor(() =>
      expect(screen.getByText('%resourcePicker_load_error%')).toBeInTheDocument(),
    );
    expect(screen.getByRole('button', { name: '%resourcePicker_retry%' })).toBeInTheDocument();
  });

  it('reports a genuinely empty catalog as empty, not as a failure', async () => {
    vi.mocked(sendCommand).mockResolvedValue({ status: 'available', resources: [] });

    renderWrapper();

    await waitFor(() =>
      expect(screen.getByText('%resourcePicker_no_results%')).toBeInTheDocument(),
    );
    expect(screen.queryByText('%resourcePicker_load_error%')).not.toBeInTheDocument();
  });
});
