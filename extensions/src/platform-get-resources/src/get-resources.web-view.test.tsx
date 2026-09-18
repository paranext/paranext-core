// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';
import type { ResourceAction } from './get-resources.component';

const mocks = vi.hoisted(() => ({
  sendCommand: vi.fn(),
  installDblResource: vi.fn(async () => {}),
  uninstallDblResource: vi.fn(async () => {}),
}));

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: mocks.sendCommand } },
  logger: { warn: vi.fn(), debug: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}, false],
  useDataProvider: () => ({
    installDblResource: mocks.installDblResource,
    uninstallDblResource: mocks.uninstallDblResource,
  }),
}));

// Stand in for the resource table: this test is about which uid the dialog reports after an action,
// not about how the table renders. The two buttons are the table's two actions.
vi.mock('./get-resources.component', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./get-resources.component')>();
  return {
    ...actual,
    GetResources: ({
      onInstallOrRemoveResource,
    }: {
      onInstallOrRemoveResource?: (dblEntryUid: string, action: ResourceAction) => unknown;
    }) => (
      <div>
        <button type="button" onClick={() => onInstallOrRemoveResource?.('uid-1', 'install')}>
          install
        </button>
        <button type="button" onClick={() => onInstallOrRemoveResource?.('uid-1', 'remove')}>
          remove
        </button>
      </div>
    ),
  };
});

// The file assigns to globalThis.webViewComponent as its side effect, so it must be imported after
// the mocks above; vitest hoists those regardless of position.
// eslint-disable-next-line import/first
import './get-resources.web-view';

/** Reads the component set by the web view file's side effect. */
function getResourcesDialog(): React.ComponentType<WebViewProps> {
  // globalThis is a special interface; cast to access a property added at runtime.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>)
    .webViewComponent as React.ComponentType<WebViewProps>;
}

/** Every uid this dialog reported to `refreshResourceFlags`, in order. */
function refreshedUids(): unknown[] {
  return mocks.sendCommand.mock.calls
    .filter(([command]) => command === 'platformGetResources.refreshResourceFlags')
    .map(([, uid]) => uid);
}

/**
 * Renders the dialog and waits out the refresh it runs once per mount to correct update badges.
 * That one names no resource, so leaving it in flight would let an assertion about the action's
 * refresh read the mount's instead.
 */
async function renderDialogAndSettle() {
  // `useWebViewState` backs the type and language filters; the stub table reads neither.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const props = { useWebViewState: () => [[], vi.fn()] } as unknown as WebViewProps;
  const GetResourcesDialog = getResourcesDialog();
  const rendered = render(<GetResourcesDialog {...props} />);
  await waitFor(() => expect(refreshedUids()).toEqual([undefined]));
  return rendered;
}

describe('GetResourcesDialog action reporting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.sendCommand.mockImplementation(async (command: string) =>
      command === 'platformGetResources.getCachedResources'
        ? { status: 'available', resources: [] }
        : undefined,
    );
  });

  it('names the resource it removed so the removal can be believed straight away', async () => {
    await renderDialogAndSettle();

    fireEvent.click(screen.getByRole('button', { name: 'remove' }));

    await waitFor(() => expect(mocks.uninstallDblResource).toHaveBeenCalledWith('uid-1'));
    await waitFor(() => expect(refreshedUids()).toHaveLength(2));
    expect(refreshedUids().at(-1)).toBe('uid-1');
  });

  it('names nothing after an install, whose resource may still be registering', async () => {
    // Update runs through this same 'install' action. Naming the uid tells the sync to read the
    // resource's absence from the project list as removal, which after an install or an update is
    // the registration race — it would rewrite a resource that is on disk as uninstalled.
    await renderDialogAndSettle();

    fireEvent.click(screen.getByRole('button', { name: 'install' }));

    await waitFor(() => expect(mocks.installDblResource).toHaveBeenCalledWith('uid-1'));
    // Waiting for the second refresh is what keeps this from passing before the action reports at
    // all, which is the only way a negative assertion here could hold for the wrong reason.
    await waitFor(() => expect(refreshedUids()).toHaveLength(2));
    expect(refreshedUids().at(-1)).toBeUndefined();
  });
});
