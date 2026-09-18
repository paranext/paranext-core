// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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
vi.mock('./home.component', () => ({
  HOME_STRING_KEYS: ['%resources_serverUnreachable_title%'],
  Home: ({
    didRemoteProjectsFailToLoad,
    shouldShowProjectsOnly,
  }: {
    didRemoteProjectsFailToLoad?: boolean;
    shouldShowProjectsOnly?: boolean;
  }) => (
    <div
      data-testid="home"
      data-remote-failed={String(didRemoteProjectsFailToLoad)}
      data-projects-only={String(shouldShowProjectsOnly)}
    />
  ),
}));

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
        operation: () => Promise<unknown>,
        isDone: (result: unknown) => boolean,
        { maxAttempts }: { maxAttempts: number },
      ) => {
        let result: unknown;
        for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
          // Attempts are sequential by definition — the next one only happens because the previous
          // one did not settle, so they cannot be awaited in parallel.
          // eslint-disable-next-line no-await-in-loop
          result = await operation();
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

describe('HomeWebView send/receive availability', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('says the list is local-only when availability never resolves', async () => {
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable')
        throw new Error('extension host did not answer');
      return undefined;
    });

    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);

    await waitFor(() => {
      expect(screen.getByTestId('home')).toHaveAttribute('data-remote-failed', 'true');
    });
  });

  it('stays silent when send/receive is simply absent from this build', async () => {
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable') return false;
      return undefined;
    });

    const HomeWebView = getHomeWebView();
    render(<HomeWebView useWebViewState={makeUseWebViewState({})} />);

    // Positive control: the web view settled (it rendered), so it had every chance to raise the
    // banner — a definite "no server here" is the whole truth, not a missing half.
    await waitFor(() => {
      expect(screen.getByTestId('home')).toBeInTheDocument();
    });
    expect(screen.getByTestId('home')).toHaveAttribute('data-remote-failed', 'false');
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
