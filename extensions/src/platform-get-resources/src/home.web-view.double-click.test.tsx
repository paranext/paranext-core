// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type { ComponentType } from 'react';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
// Vitest hoists the `vi.mock` calls below above these imports, so the web view loads with them.
import { ROW_CLICK_SETTLE_MS } from './home.component';
// Defines `globalThis.webViewComponent` as a side effect.
import './home.web-view';

/*
 * The real Home inside the real web view, so a double-click on a row's action goes through the
 * click handlers and the per-row settle window as a user's would. `home.web-view.test.tsx` stubs
 * Home and covers what the web view hands it.
 */

const { mockSendCommand, syncActivityEvents, syncQueueEvents } = vi.hoisted(() => {
  const createEvents = (): { handlers: ((payload: unknown) => void)[] } => ({ handlers: [] });
  return {
    mockSendCommand: vi.fn(async (): Promise<unknown> => undefined),
    syncActivityEvents: createEvents(),
    syncQueueEvents: createEvents(),
  };
});

function subscribeInto(events: { handlers: ((payload: unknown) => void)[] }) {
  return vi.fn((handler: (payload: unknown) => void) => {
    events.handlers.push(handler);
    return vi.fn(() => {
      events.handlers = events.handlers.filter((h) => h !== handler);
    });
  });
}

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: mockSendCommand },
    notifications: { send: vi.fn() },
    network: {
      getNetworkEvent: vi.fn((eventName: string) => {
        if (eventName === 'paratextBibleSendReceive.onSyncActivityChanged')
          return subscribeInto(syncActivityEvents);
        if (eventName === 'paratextBibleSendReceive.onSyncQueueChanged')
          return subscribeInto(syncQueueEvents);
        return vi.fn(() => vi.fn());
      }),
    },
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

const IS_AVAILABLE = 'platformGetResources.isSendReceiveAvailable';
const GET_SHARED_PROJECTS = 'paratextBibleSendReceive.getSharedProjects';
const GET_SYNC_ACTIVITY = 'paratextBibleSendReceive.getSyncActivity';
const GET_SYNC_QUEUE = 'paratextBibleSendReceive.getSyncQueue';
const REQUEST_SYNC = 'paratextBibleSendReceive.requestSync';
const REMOVE_FROM_SYNC_QUEUE = 'paratextBibleSendReceive.removeFromSyncQueue';

// With the key-echoing localization above, a button's text and name are the localize keys.
const GET_LABEL = '%resources_get%';
const WAITING_NAME = '%resources_syncWaiting_remove_format%';

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
});
afterAll(() => {
  vi.unstubAllGlobals();
});

function getHomeWebView(): ComponentType<Record<string, unknown>> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<
    Record<string, unknown>
  >;
}

const callsTo = (command: string) =>
  mockSendCommand.mock.calls.filter(([name]) => name === command);

async function emit(events: { handlers: ((payload: unknown) => void)[] }, payload: unknown) {
  await act(async () => {
    events.handlers.forEach((handler) => handler(payload));
  });
}

describe('HomeWebView double-click on a row action', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    syncActivityEvents.handlers = [];
    syncQueueEvents.handlers = [];
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) return true;
      if (commandName === GET_SHARED_PROJECTS)
        return {
          RH2: {
            id: 'RH2',
            name: 'RH2',
            fullName: 'RH2 full name',
            language: 'en',
            editedStatus: '',
            lastSendReceiveDate: '2026-08-16T00:00:00.000Z',
          },
        };
      if (commandName === GET_SYNC_ACTIVITY) return { isSyncing: false, projectIds: [] };
      if (commandName === GET_SYNC_QUEUE) return { waitingProjectIds: [], runningProjectIds: [] };
      if (commandName === REQUEST_SYNC) return new Promise(() => {});
      return undefined;
    });
  });

  async function renderWithRow() {
    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={() => ['all', vi.fn(), vi.fn()]} />);
    const getButton = await screen.findByRole('button', { name: GET_LABEL });
    await waitFor(() => {
      expect(syncActivityEvents.handlers.length).toBeGreaterThan(0);
      expect(syncQueueEvents.handlers.length).toBeGreaterThan(0);
    });
    // The seed reads of the queue and the activity have settled.
    await act(async () => {});
    return getButton;
  }

  it('does not remove the project from the queue when the queue reports it waiting between the clicks', async () => {
    const getButton = await renderWithRow();

    fireEvent.click(getButton);
    await waitFor(() => expect(callsTo(REQUEST_SYNC)).toHaveLength(1));
    // The queue holds the project for the next run before the second click arrives.
    await emit(syncQueueEvents, { waitingProjectIds: ['RH2'], runningProjectIds: ['RH3'] });
    const waitingButton = screen.getByRole('button', { name: WAITING_NAME });

    fireEvent.click(waitingButton);

    expect(callsTo(REQUEST_SYNC)).toHaveLength(1);
    expect(callsTo(REMOVE_FROM_SYNC_QUEUE)).toHaveLength(0);
  });

  it('removes the project from the queue for a click made after the settle window', async () => {
    const getButton = await renderWithRow();
    fireEvent.click(getButton);
    await waitFor(() => expect(callsTo(REQUEST_SYNC)).toHaveLength(1));
    await emit(syncQueueEvents, { waitingProjectIds: ['RH2'], runningProjectIds: ['RH3'] });

    // Positive control: the same button works once the window has passed.
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, ROW_CLICK_SETTLE_MS + 100);
      });
    });
    fireEvent.click(within(document.body).getByRole('button', { name: WAITING_NAME }));

    await waitFor(() => expect(callsTo(REMOVE_FROM_SYNC_QUEUE)).toHaveLength(1));
  });
});
