// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useCallback, useState, type ComponentType } from 'react';
import type { WebViewProps } from '@papi/core';

/*
 * Pins the fix for review finding #7 on PR #2913: `canEditServer` must be captured once from the
 * first successful read, not recomputed from the live `dpValue` on every render. Before the fix, a
 * provider push that lands after a save (the save's own echo, or another window) would immediately
 * hide the server-selection control — these tests simulate exactly that push and assert the control
 * stays visible, both after a successful save and after a failed queued restart.
 */

const { dpState, mockSetData, mockSendCommand, mockWait } = vi.hoisted(() => ({
  dpState: { value: undefined as unknown },
  mockSetData: vi.fn(async () => true),
  mockSendCommand: vi.fn(async () => undefined),
  // Never resolves by default, so the fire-and-forget restart branch doesn't run mid-test; the
  // restart-failure test overrides this once with a rejection.
  mockWait: vi.fn(() => new Promise<void>(() => {})),
}));

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: mockSendCommand } },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((key) => [key, key])),
    false,
  ],
  // Ignores the data provider name and selector: every caller in this web view reads the one
  // InternetSettings type, and the test drives its value directly through `dpState`.
  useData: () => ({
    InternetSettings: () => [dpState.value, mockSetData, false],
  }),
}));

vi.mock('platform-bible-utils', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-utils')>();
  return { ...original, wait: mockWait };
});

vi.mock('./internet-settings.component', async (importOriginal) => {
  const original = await importOriginal<typeof import('./internet-settings.component')>();
  return {
    INTERNET_SETTINGS_STRING_KEYS: original.INTERNET_SETTINGS_STRING_KEYS,
    // Stands in for the real form so these tests assert the web view's canEditServer DECISION, not
    // the form's rendering of it — matching how home.web-view.test.tsx separates the two.
    InternetSettingsForm: ({
      canEditServer,
      saveError,
      onSaveAndRestart,
    }: {
      canEditServer: boolean;
      saveError: string;
      onSaveAndRestart: () => void;
    }) => (
      <div>
        <div data-testid="can-edit-server">{String(canEditServer)}</div>
        <div data-testid="save-error">{saveError}</div>
        <button type="button" data-testid="save-and-restart" onClick={onSaveAndRestart}>
          Save and restart
        </button>
      </div>
    ),
  };
});

// Must follow the vi.mock() calls so the side effect runs against the mock boundaries above.
// eslint-disable-next-line import/first
import './internet-settings.web-view';

function getInternetSettingsWebView(): ComponentType<WebViewProps> {
  // globalThis is a special interface; cast to a record to read the property the module added.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (globalThis as Record<string, unknown>).webViewComponent as ComponentType<WebViewProps>;
}

/** Props for the web view with a stateful `useWebViewState`, mirroring the platform's real hook. */
function makeProps() {
  // The literal supplies only the props this web view reads; the double cast avoids restating
  // every optional field of WebViewProps.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    id: 'internet-settings-1',
    useWebViewState: (_key: string, defaultValue: unknown) => {
      // Stateful so the web view's own writes feed straight back in, as the platform's real
      // useWebViewState does. Hooks inside a mock callback are the only way to get that, and the
      // callback is only ever called during render.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(defaultValue);
      // Stable, like the real setter, so effects keyed on it don't re-run every render.
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const write = useCallback((next: unknown) => setValue(next), []);
      return [value, write];
    },
  } as unknown as WebViewProps;
}

const QUALITY_ASSURANCE_SETTINGS = {
  permittedInternetUse: 'VpnRequired',
  selectedServer: 'QualityAssurance',
  proxyPort: 0,
};

const PRODUCTION_SETTINGS = {
  permittedInternetUse: 'VpnRequired',
  selectedServer: 'Production',
  proxyPort: 0,
};

describe('Internet Settings web view — canEditServer is captured once, not read live', () => {
  beforeEach(() => {
    mockSetData.mockClear();
    mockSendCommand.mockClear();
    mockWait.mockClear();
    mockWait.mockImplementation(() => new Promise<void>(() => {}));
  });

  it('keeps the server section visible after a save pushes Production back from the provider', async () => {
    dpState.value = QUALITY_ASSURANCE_SETTINGS;
    const InternetSettingsWebView = getInternetSettingsWebView();
    const props = makeProps();
    const { rerender } = render(<InternetSettingsWebView {...props} />);

    expect(await screen.findByTestId('can-edit-server')).toHaveTextContent('true');

    fireEvent.click(screen.getByTestId('save-and-restart'));
    await waitFor(() => expect(mockSetData).toHaveBeenCalledWith(QUALITY_ASSURANCE_SETTINGS));

    // Simulate the data provider echoing the just-saved Production value back (the same shape a
    // push from another window would take), after the one-shot sync has already run. `rerender`
    // (not a fresh `render`) keeps the same component instance, so `hasSyncedFetch` stays set.
    dpState.value = PRODUCTION_SETTINGS;
    rerender(<InternetSettingsWebView {...props} />);

    expect(screen.getByTestId('can-edit-server')).toHaveTextContent('true');
  });

  it('keeps the server section visible after a save succeeds but the queued restart fails', async () => {
    dpState.value = QUALITY_ASSURANCE_SETTINGS;
    mockWait.mockImplementationOnce(() => Promise.reject(new Error('restart failed')));
    const InternetSettingsWebView = getInternetSettingsWebView();
    const props = makeProps();
    const { rerender } = render(<InternetSettingsWebView {...props} />);

    expect(await screen.findByTestId('can-edit-server')).toHaveTextContent('true');

    fireEvent.click(screen.getByTestId('save-and-restart'));
    await waitFor(() => expect(mockSetData).toHaveBeenCalledWith(QUALITY_ASSURANCE_SETTINGS));

    // The provider echoes the just-saved Production value while the restart is still pending.
    dpState.value = PRODUCTION_SETTINGS;
    rerender(<InternetSettingsWebView {...props} />);

    await waitFor(() =>
      expect(screen.getByTestId('save-error')).toHaveTextContent('restart failed'),
    );

    expect(screen.getByTestId('can-edit-server')).toHaveTextContent('true');
  });

  it('stays hidden while the first read is still loading', () => {
    dpState.value = PRODUCTION_SETTINGS;
    const InternetSettingsWebView = getInternetSettingsWebView();
    // useData's isLoading is hardcoded false in this mock, so this exercises `canEditServer`'s
    // initial `false` default directly: before the one-shot sync effect has run (synchronously on
    // first render, before the test awaits anything), the captured state has not been set yet.
    render(<InternetSettingsWebView {...makeProps()} />);

    expect(screen.getByTestId('can-edit-server')).toHaveTextContent('false');
  });
});
