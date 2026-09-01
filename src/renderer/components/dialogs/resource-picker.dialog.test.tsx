import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

  it('reports a failed catalog fetch instead of claiming there are no results', async () => {
    vi.mocked(sendCommand).mockRejectedValue(new Error('the data provider is not up'));

    renderWrapper();

    await waitFor(() =>
      expect(screen.getByText('%resourcePicker_load_error%')).toBeInTheDocument(),
    );
    expect(screen.queryByText('%resourcePicker_no_results%')).not.toBeInTheDocument();
  });

  // `getCachedResources` signals a failed on-demand fetch by RESOLVING undefined on one path and by
  // rejecting on another, so watching only for a rejection still shows the empty state for half its
  // failures.
  it('treats a resolved-undefined catalog as a failure, not an empty catalog', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);

    renderWrapper();

    await waitFor(() =>
      expect(screen.getByText('%resourcePicker_load_error%')).toBeInTheDocument(),
    );
  });

  it('offers a retry that re-drives the fetch after a failure', async () => {
    vi.mocked(sendCommand).mockRejectedValue(new Error('the data provider is not up'));

    renderWrapper();

    const retryButton = await screen.findByRole('button', { name: '%resourcePicker_retry%' });
    expect(vi.mocked(sendCommand)).toHaveBeenCalledTimes(1);

    retryButton.click();

    await waitFor(() => expect(vi.mocked(sendCommand)).toHaveBeenCalledTimes(2));
  });

  it('reports a genuinely empty catalog as empty, not as a failure', async () => {
    vi.mocked(sendCommand).mockResolvedValue([]);

    renderWrapper();

    await waitFor(() =>
      expect(screen.getByText('%resourcePicker_no_results%')).toBeInTheDocument(),
    );
    expect(screen.queryByText('%resourcePicker_load_error%')).not.toBeInTheDocument();
  });
});
