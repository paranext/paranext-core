// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { getErrorMessage } from 'platform-bible-utils';
import type { ResourceAction } from './get-resources.component';
import { renderGetResourcesWebView } from './get-resources.web-view.test-utils';

const mocks = vi.hoisted(() => {
  /** Rejection messages the table saw, which is how the dialog reports a failure to the user. */
  const actionErrors: string[] = [];
  return {
    sendCommand: vi.fn(),
    installDblResource: vi.fn(async () => {}),
    uninstallDblResource: vi.fn(async () => {}),
    openResourceFrom: vi.fn<(where: string, projectId: string) => Promise<void>>(async () => {}),
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

vi.mock('./open-home-item', () => ({ openResourceFrom: mocks.openResourceFrom }));

// Stand in for the resource table: this test is about which uid the dialog reports after an action,
// not about how the table renders. The two buttons are the table's two actions.
vi.mock('./get-resources.component', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./get-resources.component')>();
  return {
    ...actual,
    GetResources: ({
      onInstallOrRemoveResource,
      onOpenResource,
      idsBeingHandled,
    }: {
      onInstallOrRemoveResource?: (dblEntryUid: string, action: ResourceAction) => unknown;
      onOpenResource?: (projectId: string) => unknown;
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
          <button type="button" onClick={() => onOpenResource?.('proj-1')}>
            open
          </button>
          {/* The rows showing a spinner: the real table renders one per id in this list. */}
          <span data-testid="handling">{(idsBeingHandled ?? []).join(',')}</span>
        </div>
      );
    },
  };
});

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
  const rendered = renderGetResourcesWebView();
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

/*
 * Each Open queues a whole show behind any already running, so a resource still opening ignores
 * further opens, as in Home.
 */
describe('GetResourcesDialog opening a resource', () => {
  it('ignores repeat opens of a resource that is still opening', async () => {
    mocks.sendCommand.mockImplementation(async () => undefined);
    let finishOpen: () => void = () => {};
    mocks.openResourceFrom.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          finishOpen = resolve;
        }),
    );
    renderGetResourcesWebView();

    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    fireEvent.click(screen.getByRole('button', { name: 'open' }));
    expect(mocks.openResourceFrom).toHaveBeenCalledTimes(1);

    finishOpen();
    // Lets the finished open release the resource before it is opened again.
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    fireEvent.click(screen.getByRole('button', { name: 'open' }));

    expect(mocks.openResourceFrom).toHaveBeenCalledTimes(2);
    expect(mocks.openResourceFrom).toHaveBeenCalledWith('Get Resources', 'proj-1');
  });
});
