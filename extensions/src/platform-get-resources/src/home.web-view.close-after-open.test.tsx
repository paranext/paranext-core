// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentType } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { openHomeItem } from './open-home-item';
// Defines `globalThis.webViewComponent` as a side effect. Vitest hoists the `vi.mock` calls below
// above these imports, so the web view loads with them.
import './home.web-view';

/*
 * In Simple mode Home closes once a project opened from it has opened, even while a Get or Sync it
 * started is still running. The editor does the closing, before its "Updating project view" cover
 * lifts, so Home is never seen in front of the project: Home only names itself on every open and
 * never closes itself.
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
  openHomeItem: vi.fn(async () => {}),
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

function getHomeWebView(): ComponentType<Record<string, unknown>> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<
    Record<string, unknown>
  >;
}

const callsTo = (command: string) =>
  mockSendCommand.mock.calls.filter((call: unknown[]) => call[0] === command);

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
    vi.mocked(openHomeItem).mockImplementation(async () => {});
    mockSendCommand.mockImplementation(async (...args: unknown[]) => {
      const [commandName] = args;
      if (commandName === IS_AVAILABLE) return true;
      if (commandName === GET_SHARED_PROJECTS) return {};
      if (commandName === GET_SYNC_ACTIVITY) return { isSyncing: false, projectIds: [] };
      if (commandName === GET_SYNC_QUEUE) return { waitingProjectIds: [], runningProjectIds: [] };
      // Never settles: the sync is still running for the rest of the test.
      if (commandName === REQUEST_SYNC) return new Promise(() => {});
      return undefined;
    });
  });

  it('names itself as the view to close when it opens a project', async () => {
    await renderHome();

    await click('open project');

    expect(openHomeItem).toHaveBeenCalledWith('P1', false, 'home-1');
  });

  it('leaves the closing to the editor', async () => {
    await renderHome();

    await click('open project');

    expect(openHomeItem).toHaveBeenCalled();
    expect(mockCloseWebView).not.toHaveBeenCalled();
  });

  it('names itself while a Get or Sync it started is still running', async () => {
    await renderHome();
    await click('sync');
    expect(callsTo(REQUEST_SYNC)).toHaveLength(1);

    await click('open project');

    expect(openHomeItem).toHaveBeenCalledWith('P1', false, 'home-1');
  });
});
