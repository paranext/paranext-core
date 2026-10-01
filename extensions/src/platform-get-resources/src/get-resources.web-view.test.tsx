// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { WebViewProps } from '@papi/core';
import { getErrorMessage } from 'platform-bible-utils';
import type { ResourceAction } from './get-resources.component';

const mocks = vi.hoisted(() => {
  /** Rejection messages the table saw, which is how the dialog reports a failure to the user. */
  const actionErrors: string[] = [];
  return {
    sendCommand: vi.fn(),
    installDblResource: vi.fn(async () => {}),
    uninstallDblResource: vi.fn(async () => {}),
    actionErrors,
  };
});

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
      idsBeingHandled,
    }: {
      onInstallOrRemoveResource?: (dblEntryUid: string, action: ResourceAction) => unknown;
      idsBeingHandled?: string[];
    }) => {
      // The real table awaits this call and renders whatever it rejects with; ignoring the promise
      // here would drop the outcome and leave the rejection unhandled.
      const act = (action: ResourceAction) => {
        Promise.resolve(onInstallOrRemoveResource?.('uid-1', action)).catch((error: unknown) => {
          // `getErrorMessage` as the real table does: a `PlatformError` is a plain object, so
          // reading `.message` off an `instanceof Error` check misses it entirely.
          mocks.actionErrors.push(getErrorMessage(error));
        });
      };
      return (
        <div>
          <button type="button" onClick={() => act('install')}>
            install
          </button>
          <button type="button" onClick={() => act('remove')}>
            remove
          </button>
          {/* The rows showing a spinner: the real table renders one per id in this list. */}
          <span data-testid="handling">{(idsBeingHandled ?? []).join(',')}</span>
        </div>
      );
    },
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

/** Every `refreshResourceFlags` call this dialog has made. */
function refreshCalls(): unknown[][] {
  return mocks.sendCommand.mock.calls.filter(
    ([command]) => command === 'platformGetResources.refreshResourceFlags',
  );
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
  await waitFor(() => expect(refreshCalls()).toHaveLength(1));
  return rendered;
}

describe('GetResourcesDialog action reporting', () => {
  /** Serves a catalog whose row carries `installed`, freshly built so each refetch is a new list. */
  function serveCatalogWithInstalled(...installedByFetch: boolean[]) {
    let fetchCount = 0;
    mocks.sendCommand.mockImplementation(async (command: string) => {
      if (command !== 'platformGetResources.getCachedResources') return undefined;
      const installed = installedByFetch[Math.min(fetchCount, installedByFetch.length - 1)];
      fetchCount += 1;
      return {
        status: 'available',
        resources: [
          {
            dblEntryUid: 'uid-1',
            displayName: 'WEB',
            fullName: 'World English Bible',
            bestLanguageName: 'English',
            type: 'ScriptureResource',
            size: 1,
            installed,
            updateAvailable: false,
            projectId: installed ? 'UID1AAA' : '',
          },
        ],
      };
    });
  }

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.actionErrors.length = 0;
    serveCatalogWithInstalled(false, true);
  });

  it('ends a row whose action the list never reflects, rather than spinning on', async () => {
    // Installing a resource already on disk succeeds as a no-op, so an install can complete with the
    // row still reporting itself uninstalled. The row's spinner stops only when the list agrees, so
    // before this the row span for as long as the dialog stayed open, with nothing to click.
    serveCatalogWithInstalled(false);
    await renderDialogAndSettle();

    fireEvent.click(screen.getByRole('button', { name: 'install' }));

    await waitFor(() => expect(mocks.actionErrors).toHaveLength(1));
    // A sentinel rather than prose: the table owns the localized text for it.
    expect(mocks.actionErrors[0]).toContain('platformGetResources.actionDidNotTakeEffect');
    expect(screen.getByTestId('handling')).toHaveTextContent('');
  });

  it('settles a removal on the opposite flag from an install', async () => {
    // The two actions read the same row and want contrary answers, so a branch that checked
    // `installed` for both would report every successful removal as a failure.
    serveCatalogWithInstalled(true, false);
    await renderDialogAndSettle();

    fireEvent.click(screen.getByRole('button', { name: 'remove' }));

    await waitFor(() => expect(mocks.uninstallDblResource).toHaveBeenCalledWith('uid-1'));
    await waitFor(() => expect(screen.getByTestId('handling')).toHaveTextContent(''));
    expect(mocks.actionErrors).toEqual([]);
  });

  it('ends a row when the refetch after its action fails', async () => {
    // `usePromise` keeps the previous value through a rejection, so a failed refetch leaves the list
    // at the same identity and the same contents: it will never agree with the action, and never
    // visibly disagree either. Waiting for the list alone waits for the life of the dialog.
    serveCatalogWithInstalled(false);
    await renderDialogAndSettle();
    mocks.sendCommand.mockImplementation(async (command: string) => {
      if (command === 'platformGetResources.getCachedResources')
        throw new Error('catalog fetch failed');
      return undefined;
    });

    fireEvent.click(screen.getByRole('button', { name: 'install' }));

    await waitFor(() => expect(mocks.actionErrors).toHaveLength(1));
    expect(mocks.actionErrors[0]).toContain('platformGetResources.actionDidNotTakeEffect');
    expect(screen.getByTestId('handling')).toHaveTextContent('');
  });

  it('reports no failure when the list does come to agree', async () => {
    // The same path as above, for a resource that genuinely installs: the row must settle quietly.
    serveCatalogWithInstalled(false, true);
    await renderDialogAndSettle();

    fireEvent.click(screen.getByRole('button', { name: 'install' }));

    await waitFor(() => expect(screen.getByTestId('handling')).toHaveTextContent(''));
    expect(mocks.actionErrors).toEqual([]);
  });
});
