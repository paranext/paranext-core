import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { spyOn, restoreAllMocks } from 'storybook/test';
import { newPlatformError } from 'platform-bible-utils';
import * as papiHooks from '@renderer/hooks/papi-hooks';
import { InternetSettingsStep } from './internet-settings-step.component';

const MOCK_SETTINGS = {
  permittedInternetUse: 'VpnRequired' as const,
  selectedServer: 'Production' as const,
  proxyPort: 0,
};

// Stands in for the resolved data-provider object; the component only forwards it to useData, which
// is mocked here and ignores it.
const PROVIDER = { __brand: 'internetSettingsDataProvider' };

/**
 * Point useDataProvider/useData at a chosen state, mirroring how the component consumes them.
 * `provider: undefined` simulates the provider not yet registered (the outer spinner); otherwise
 * useData yields `[value, setData, isLoading]`. Returns a cleanup that restores the spies.
 */
function mockHooks(config: { provider?: unknown; value?: unknown; isLoading?: boolean } = {}) {
  // `'provider' in config` so a story can force provider === undefined (not-yet-registered).
  const provider = 'provider' in config ? config.provider : PROVIDER;
  const value = config.value ?? MOCK_SETTINGS;
  const isLoading = config.isLoading ?? false;
  // Storybook mock stand-ins; the precise curried useDataProvider/useData types add no value here
  // and would couple the story to internal hook shapes.
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Storybook mock stand-in
  spyOn(papiHooks, 'useDataProvider').mockReturnValue(provider as never);
  // Same rationale as the useDataProvider mock above.
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Storybook mock stand-in
  spyOn(papiHooks, 'useData').mockReturnValue({
    InternetSettings: () => [value, async () => undefined, isLoading],
  } as never);
  return () => restoreAllMocks();
}

const meta: Meta<typeof InternetSettingsStep> = {
  title: 'First Run/InternetSettingsStep',
  component: InternetSettingsStep,
  tags: ['autodocs', 'test'],
  args: {
    onNext: () => {},
    setCanProceed: () => {},
  },
  beforeEach() {
    // Default: provider available, settings loaded (VPN Required).
    return mockHooks();
  },
};
export default meta;

type Story = StoryObj<typeof InternetSettingsStep>;

/**
 * The data provider hasn't registered yet (`useDataProvider` returns `undefined`) — the natural
 * availability signal. The spinner shows and Next is disabled; after a short delay the "Getting
 * things ready…" message appears below it.
 */
export const ProviderRegistering: Story = {
  beforeEach() {
    return mockHooks({ provider: undefined });
  },
};

/** Provider registered but the first read is still in flight (`isLoading`): spinner, Next disabled. */
export const Loading: Story = {
  beforeEach() {
    return mockHooks({ isLoading: true });
  },
};

/** Settings loaded, VPN Required selected, Next enabled. */
export const Default: Story = {};

/** Enabled (unrestricted internet) option pre-selected. */
export const Enabled: Story = {
  beforeEach() {
    return mockHooks({ value: { ...MOCK_SETTINGS, permittedInternetUse: 'Enabled' } });
  },
};

/** The read failed (a `PlatformError` from the provider): friendly error alert and a Retry button. */
export const LoadError: Story = {
  beforeEach() {
    return mockHooks({ value: newPlatformError('Connection refused') });
  },
};
