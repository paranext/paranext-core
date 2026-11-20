// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentType } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@papi/frontend';
import { isSimpleMode, openHomeItem } from './open-home-item';
// Defines `globalThis.webViewComponent` as a side effect. Vitest hoists the `vi.mock` calls below
// above these imports, so the web view loads with them.
import './home.web-view';

/*
 * In Simple mode Home closes once a project opened from it has opened, since Simple shows one
 * project at a time, even while a Get or Sync it started is still running. It stays open when
 * nothing opened, for a resource, and in Power mode.
 */

const { mockSendCommand, mockCloseWebView } = vi.hoisted(() => ({
  mockSendCommand: vi.fn(async (): Promise<unknown> => undefined),
  mockCloseWebView: vi.fn(async (): Promise<boolean> => true),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: mockSendCommand },
    webViews: { closeWebView: mockCloseWebView },
    notifications: { send: vi.fn() },
    network: { getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())) },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ],
  useDataProvider: vi.fn(() => undefined),
  useSetting: vi.fn((_key: string, defaultValue: unknown) => [defaultValue, vi.fn(), false]),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return { ...original, useEvent: vi.fn(), usePromise: vi.fn(() => [undefined, false]) };
});

vi.mock('./use-local-projects.hook', () => ({
  useLocalProjects: vi.fn(() => ({ localProjectsInfo: [], isLoadingLocalProjects: false })),
}));

vi.mock('./open-home-item', () => ({
  openHomeItem: vi.fn(async () => true),
  isSimpleMode: vi.fn(async () => true),
}));

/* Stands in for Home: one button opens an item, the other starts a sync of project A. */
vi.mock('./home.component', async (importOriginal) => {
  const original = await importOriginal<typeof import('./home.component')>();
  return {
    HOME_STRING_KEYS: original.HOME_STRING_KEYS,
    Home: ({
      remoteProjectsState,
      onOpenProject,
      onSendReceiveProject,
    }: {
      remoteProjectsState?: string;
      onOpenProject?: (projectId: string, isPublished: boolean) => void | Promise<unknown>;
      onSendReceiveProject?: (projectId: string) => void | Promise<void>;
    }) => (
      <div data-testid="home" data-remote-state={String(remoteProjectsState)}>
        <button type="button" onClick={() => onOpenProject?.('P1', false)}>
          open project
        </button>
        <button type="button" onClick={() => onOpenProject?.('P2', false)}>
          open other project
        </button>
        <button type="button" onClick={() => onOpenProject?.('R1', true)}>
          open resource
        </button>
        <button
          type="button"
          // The real Home catches a rejected sync and shows it in its "Sync failed" alert.
          onClick={() => Promise.resolve(onSendReceiveProject?.('A')).catch(() => {})}
        >
          sync
        </button>
      </div>
    ),
  };
});

const IS_AVAILABLE = 'platformGetResources.isSendReceiveAvailable';
const GET_SHARED_PROJECTS = 'paratextBibleSendReceive.getSharedProjects';
const GET_SYNC_ACTIVITY = 'paratextBibleSendReceive.getSyncActivity';
const GET_SYNC_QUEUE = 'paratextBibleSendReceive.getSyncQueue';
const REQUEST_SYNC = 'paratextBibleSendReceive.requestSync';

/** A promise and the functions that settle it. */
function deferred<T>() {
  let settleResolve: (value: T) => void = () => {};
  let settleReject: (reason: unknown) => void = () => {};
  const promise = new Promise<T>((resolve, reject) => {
    settleResolve = resolve;
    settleReject = reject;
  });
  return { promise, resolve: settleResolve, reject: settleReject };
}

function getHomeWebView(): ComponentType<Record<string, unknown>> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<
    Record<string, unknown>
  >;
}

const callsTo = (command: string) =>
  mockSendCommand.mock.calls.filter((call: unknown[]) => call[0] === command);

let syncRequest = deferred<undefined>();

/** Renders Home and waits until it knows Send/Receive is available, so a sync click is sent. */
async function renderHome() {
  const HomeWebView = getHomeWebView();
  const view = render(
    <HomeWebView id="home-1" useWebViewState={() => ['all', vi.fn(), vi.fn()]} />,
  );
  await waitFor(() => {
    expect(screen.getByTestId('home')).toHaveAttribute('data-remote-state', 'loaded');
  });
  return view;
}

async function click(name: string) {
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name }));
  });
}

describe('HomeWebView closes after a project opens', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    syncRequest = deferred<undefined>();
    vi.mocked(openHomeItem).mockImplementation(async () => true);
    vi.mocked(isSimpleMode).mockImplementation(async () => true);
    mockCloseWebView.mockImplementation(async () => true);
    mockSendCommand.mockImplementation(async (...args: unknown[]) => {
      const [commandName] = args;
      if (commandName === IS_AVAILABLE) return true;
      if (commandName === GET_SHARED_PROJECTS) return {};
      if (commandName === GET_SYNC_ACTIVITY) return { isSyncing: false, projectIds: [] };
      if (commandName === GET_SYNC_QUEUE) return { waitingProjectIds: [], runningProjectIds: [] };
      if (commandName === REQUEST_SYNC) return syncRequest.promise;
      return undefined;
    });
  });

  it('closes Home after a project opens in Simple mode', async () => {
    await renderHome();

    await click('open project');

    expect(openHomeItem).toHaveBeenCalledWith('P1', false);
    expect(mockCloseWebView).toHaveBeenCalledWith('home-1');
  });

  it('stays open when the open failed', async () => {
    vi.mocked(openHomeItem).mockImplementation(async () => false);
    await renderHome();

    await click('open project');

    expect(openHomeItem).toHaveBeenCalledWith('P1', false);
    expect(mockCloseWebView).not.toHaveBeenCalled();
  });

  it('stays open after opening a resource', async () => {
    await renderHome();

    await click('open resource');

    expect(openHomeItem).toHaveBeenCalledWith('R1', true);
    expect(mockCloseWebView).not.toHaveBeenCalled();
  });

  it('stays open in Power mode', async () => {
    vi.mocked(isSimpleMode).mockImplementation(async () => false);
    await renderHome();

    await click('open project');

    expect(openHomeItem).toHaveBeenCalledWith('P1', false);
    expect(mockCloseWebView).not.toHaveBeenCalled();
  });

  it('reads the interface mode while the open is still running', async () => {
    // Home shows in front of the project from the moment the editor's overlay lifts until it
    // closes, so the mode is not left to a round trip after the open returns.
    const open = deferred<boolean>();
    vi.mocked(openHomeItem).mockImplementation(() => open.promise);
    await renderHome();

    await click('open project');

    expect(isSimpleMode).toHaveBeenCalled();
    expect(mockCloseWebView).not.toHaveBeenCalled();
    await act(async () => {
      open.resolve(true);
    });
    expect(mockCloseWebView).toHaveBeenCalledWith('home-1');
  });

  it('closes while a Get or Sync Home started before the open is still running', async () => {
    await renderHome();
    await click('sync');
    expect(callsTo(REQUEST_SYNC)).toHaveLength(1);

    await click('open project');

    expect(mockCloseWebView).toHaveBeenCalledWith('home-1');
  });

  it('closes while a Get or Sync Home started during the open is still running', async () => {
    const open = deferred<boolean>();
    vi.mocked(openHomeItem).mockImplementation(() => open.promise);
    await renderHome();
    await click('open project');

    await click('sync');
    expect(callsTo(REQUEST_SYNC)).toHaveLength(1);
    await act(async () => {
      open.resolve(true);
    });

    expect(mockCloseWebView).toHaveBeenCalledWith('home-1');
  });

  describe('with two opens running at once', () => {
    // Closing tears Home down, and an open still waiting for its answer in Home would then never
    // record its project as recent or report that it failed.

    /** Makes each open wait until the test settles it, keyed by the item's id. */
    function holdOpens(...ids: string[]) {
      const opens = new Map(ids.map((id) => [id, deferred<boolean>()]));
      vi.mocked(openHomeItem).mockImplementation((id: string) => {
        const open = opens.get(id);
        if (!open) throw new Error(`No held open for ${id}`);
        return open.promise;
      });
      return async (id: string, didProjectOpen: boolean) => {
        await act(async () => {
          opens.get(id)?.resolve(didProjectOpen);
        });
      };
    }

    it('closes only once the second project open has finished too', async () => {
      const finishOpen = holdOpens('P1', 'P2');
      await renderHome();
      await click('open project');
      await click('open other project');

      await finishOpen('P1', true);
      expect(mockCloseWebView).not.toHaveBeenCalled();

      await finishOpen('P2', true);
      expect(mockCloseWebView).toHaveBeenCalledTimes(1);
      expect(mockCloseWebView).toHaveBeenCalledWith('home-1');
    });

    it('closes once a resource open finishes after a project opened', async () => {
      const finishOpen = holdOpens('P1', 'R1');
      await renderHome();
      await click('open project');
      await click('open resource');

      await finishOpen('P1', true);
      expect(mockCloseWebView).not.toHaveBeenCalled();

      await finishOpen('R1', false);
      expect(mockCloseWebView).toHaveBeenCalledWith('home-1');
    });

    it('stays open when neither open opened a project', async () => {
      const finishOpen = holdOpens('P1', 'R1');
      await renderHome();
      await click('open project');
      await click('open resource');

      await finishOpen('P1', false);
      await finishOpen('R1', false);

      expect(mockCloseWebView).not.toHaveBeenCalled();
    });
  });

  it('does nothing if Home unmounted during the open', async () => {
    const open = deferred<boolean>();
    vi.mocked(openHomeItem).mockImplementation(() => open.promise);
    const { unmount } = await renderHome();
    await click('open project');

    unmount();
    await act(async () => {
      open.resolve(true);
    });

    expect(mockCloseWebView).not.toHaveBeenCalled();
  });

  it('logs when no window has Home open to close', async () => {
    mockCloseWebView.mockImplementation(async () => false);
    await renderHome();

    await click('open project');

    expect(mockCloseWebView).toHaveBeenCalledWith('home-1');
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('could not find itself'));
  });

  it('logs, rather than rejecting, when the close fails', async () => {
    mockCloseWebView.mockImplementation(async () => {
      throw new Error('some windows were unreachable');
    });
    await renderHome();

    await click('open project');

    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining('some windows were unreachable'),
    );
  });
});
