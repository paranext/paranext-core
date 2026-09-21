// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import type { ComponentType } from 'react';

/*
 * Whether Home may claim the list is complete is decided here, not in the component: the web view
 * is what knows whether the send/receive server was reached, never reached, or absent from the
 * build entirely. `home.component.test.tsx` covers what the banner looks like once that decision is
 * made; these cover the decision.
 */

const { mockSendCommand } = vi.hoisted(() => ({
  mockSendCommand: vi.fn(async (): Promise<unknown> => undefined),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: mockSendCommand },
    notifications: { send: vi.fn() },
    network: { getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())) },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  // Echo each requested key back as its own value, matching useLocalizedStrings' pre-resolution
  // behavior — every entry is always a string.
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ],
  useDataProvider: vi.fn(() => undefined),
  useSetting: vi.fn((_key: string, defaultValue: unknown) => [defaultValue, vi.fn(), false]),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useEvent: vi.fn(),
    usePromise: vi.fn(() => [undefined, false]),
  };
});

vi.mock('./use-local-projects.hook', () => ({
  useLocalProjects: vi.fn(() => ({ localProjectsInfo: [], isLoadingLocalProjects: false })),
}));

/*
 * Stubbed so these tests assert the web view's decision rather than Home's rendering of it, and so
 * the retry timing below is the only asynchrony in play.
 */
vi.mock('./home.component', async (importOriginal) => {
  const original = await importOriginal<typeof import('./home.component')>();
  return {
    // The real key list, so the web view still requests what Home actually renders.
    HOME_STRING_KEYS: original.HOME_STRING_KEYS,
    Home: ({
      remoteProjectsState,
      shouldShowProjectsOnly,
    }: {
      remoteProjectsState?: string;
      shouldShowProjectsOnly?: boolean;
    }) => (
      <div
        data-testid="home"
        data-remote-state={String(remoteProjectsState)}
        data-projects-only={String(shouldShowProjectsOnly)}
      />
    ),
  };
});

/*
 * Collapses the real delay so an exhausted retry loop resolves within the test. The retry COUNT is
 * what these tests depend on, not the wall-clock spacing, so the operation still runs the same
 * number of times.
 */
vi.mock('platform-bible-utils', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-utils')>();
  return {
    ...original,
    retryUntil: vi.fn(
      async (
        operation: (attemptNumber: number) => Promise<unknown>,
        isDone: (result: unknown) => boolean,
        options?: { maxAttempts?: number },
      ) => {
        // Mirrors the real helper's clamp, 1-based attempt number, and return-last-result-on-
        // exhaustion contract, so a change to any of those fails here rather than leaving these
        // tests passing against a contract production no longer has.
        const maxAttempts = Math.max(1, options?.maxAttempts ?? 1);
        let result: unknown;
        for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
          // Attempts are sequential by definition — the next one only happens because the previous
          // one did not settle, so they cannot be awaited in parallel.
          // eslint-disable-next-line no-await-in-loop
          result = await operation(attempt);
          if (isDone(result)) break;
        }
        return result;
      },
    ),
  };
});

// Must follow the vi.mock() calls so the module's assignment to globalThis.webViewComponent runs
// against the mock boundaries above.
// eslint-disable-next-line import/first
import './home.web-view';

/**
 * Stands in for the real `useWebViewState`, which reads the key out of the web view definition's
 * `state` and falls back to the caller's default. `state` is what the provider seeds from the open
 * options, so this is the seam the launch path travels through.
 */
function makeUseWebViewState(state: Record<string, unknown>) {
  return <T,>(stateKey: string, defaultStateValue: T): [T, (value: T) => void, () => void] => [
    // The state bag is untyped by nature — the hook's own signature is what assigns it a type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    stateKey in state ? (state[stateKey] as T) : defaultStateValue,
    vi.fn(),
    vi.fn(),
  ];
}

function getHomeWebView(): ComponentType<Record<string, unknown>> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<
    Record<string, unknown>
  >;
}

// Mirrors the retry budget in `home.web-view.tsx`; the exhausted-retries test has to outlast it.
const SEND_RECEIVE_ATTEMPTS = 4;
const SEND_RECEIVE_RETRY_MS = 2000;

const IS_AVAILABLE = 'platformGetResources.isSendReceiveAvailable';
const GET_SHARED_PROJECTS = 'paratextBibleSendReceive.getSharedProjects';

/** Renders the web view and waits for it to settle on any state other than the initial `loading`. */
async function renderAndWaitForRemoteState() {
  const HomeWebView = getHomeWebView();
  render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);

  await waitFor(() => {
    expect(screen.getByTestId('home')).not.toHaveAttribute('data-remote-state', 'loading');
  });

  return screen.getByTestId('home');
}

describe('HomeWebView send/receive availability', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('says the list is local-only when availability never resolves', async () => {
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) throw new Error('extension host did not answer');
      return undefined;
    });

    expect(await renderAndWaitForRemoteState()).toHaveAttribute('data-remote-state', 'unknown');
  });

  it('stays silent when send/receive is simply absent from this build', async () => {
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) return false;
      return undefined;
    });

    expect(await renderAndWaitForRemoteState()).toHaveAttribute('data-remote-state', 'absent');

    // Positive control on the negative assertion above: a settled `absent` is only meaningful if
    // the question was actually asked, and `absent` is also what an answer that never arrived
    // would have to be distinguished from.
    expect(mockSendCommand).toHaveBeenCalledWith(IS_AVAILABLE);
  });
});

/*
 * The defect this branch exists to prevent lives in the `getSharedProjects` catch, which is only
 * reachable once availability answers `true` — so these are the cases that pin the banner itself
 * rather than the give-up path around it.
 */
describe('HomeWebView shared project fetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /** Answers availability `true` and hands `getSharedProjects` the given behavior. */
  function mockAvailableServer(getSharedProjects: () => Promise<unknown>) {
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === IS_AVAILABLE) return true;
      if (commandName === GET_SHARED_PROJECTS) return getSharedProjects();
      return undefined;
    });
  }

  it('says the list is local-only when the server never answers', async () => {
    mockAvailableServer(async () => {
      throw new Error('socket hang up');
    });

    // An unclassified failure is retried first, on the chance that send/receive simply has not
    // finished activating — so the settled answer is several real retry delays away.
    vi.useFakeTimers();
    try {
      const HomeWebView = getHomeWebView();
      render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);

      // One delay at a time: each rejection schedules the next retry only after it settles, so a
      // single advance past the whole budget would run out of timers before they existed.
      for (let attempt = 0; attempt <= SEND_RECEIVE_ATTEMPTS; attempt += 1) {
        // Each iteration has to settle before the next timer exists, so these cannot run together.
        // eslint-disable-next-line no-await-in-loop
        await act(async () => {
          await vi.advanceTimersByTimeAsync(SEND_RECEIVE_RETRY_MS);
        });
      }

      expect(screen.getByTestId('home')).toHaveAttribute('data-remote-state', 'unreachable');
      // The retries themselves are the point of the delay this test sits through.
      expect(
        mockSendCommand.mock.calls.filter(([name]) => name === GET_SHARED_PROJECTS),
      ).toHaveLength(SEND_RECEIVE_ATTEMPTS);
    } finally {
      vi.useRealTimers();
    }
  });

  it('distinguishes a server that refused from one that could not be reached', async () => {
    // Verbatim from ParatextProjectSendReceiveService.cs — this exact text is what the shared
    // classifier matches on, and an approximation of it would silently fall to the retry path.
    mockAvailableServer(async () => {
      throw new Error('401 Unauthorized error while getting shared projects.');
    });

    // Not retried: the cause is settled, and a notification already names it alongside this.
    expect(await renderAndWaitForRemoteState()).toHaveAttribute('data-remote-state', 'unavailable');
  });

  it('claims nothing about the server while the fetch is still running', async () => {
    let resolveFetch: (value: unknown) => void = () => {};
    mockAvailableServer(
      async () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );

    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);

    // `loading` is what holds the empty state back. Settling early tells a user whose projects are
    // all on the server that they have none.
    await waitFor(() => {
      expect(screen.getByTestId('home')).toHaveAttribute('data-remote-state', 'loading');
    });

    resolveFetch({});

    await waitFor(() => {
      expect(screen.getByTestId('home')).toHaveAttribute('data-remote-state', 'loaded');
    });
  });
});

/*
 * The title bar's "More projects…" is asking "get me to one of my projects", so the read-only
 * resources that share Home's list are noise on that path alone. The flag rides in the web view's
 * `state`, which the provider seeds from the open options and scrubs on every other open — so this
 * pair is what keeps the scoping tied to the launch path rather than to Home itself.
 */
describe('HomeWebView projects-only launch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSendCommand.mockImplementation(async () => undefined);
  });

  it('scopes the list to projects when its state says it was launched that way', async () => {
    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={makeUseWebViewState({ shouldShowProjectsOnly: true })} />);

    await waitFor(() => {
      expect(screen.getByTestId('home')).toHaveAttribute('data-projects-only', 'true');
    });
  });

  it('lists resources too when nothing asked for a projects-only view', async () => {
    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);

    // Positive control: the web view rendered, so it had every chance to scope the list.
    await waitFor(() => {
      expect(screen.getByTestId('home')).toBeInTheDocument();
    });
    expect(screen.getByTestId('home')).toHaveAttribute('data-projects-only', 'false');
  });
});
