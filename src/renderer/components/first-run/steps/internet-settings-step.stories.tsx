import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { spyOn, restoreAllMocks } from 'storybook/test';
import { newPlatformError } from 'platform-bible-utils';
import * as papiHooks from '@renderer/hooks/papi-hooks';
import * as commandService from '@shared/services/command.service';
import { InternetSettingsStep } from './internet-settings-step.component';

const MOCK_SETTINGS = {
  permittedInternetUse: 'Disabled' as const,
  selectedServer: 'Production' as const,
  proxyPort: 0,
};

// Stands in for the resolved data-provider object; the component only forwards it to useData, which
// is mocked here and ignores it.
const PROVIDER = { __brand: 'internetSettingsDataProvider' };

/**
 * Point useDataProvider/useData at a chosen state, mirroring how the component consumes them, and
 * answer the step's commands without the network Storybook does not have: the Paratext 9 lookup
 * with `paratext9InternetUse`, and "Close <product name>" with nothing, so it does not quit
 * anything. `provider: undefined` simulates the provider not yet registered (the outer spinner);
 * otherwise useData yields `[value, setData, isLoading]`. Returns a cleanup that restores the
 * spies.
 */
function mockHooks(
  config: {
    provider?: unknown;
    value?: unknown;
    isLoading?: boolean;
    paratext9InternetUse?: string;
  } = {},
) {
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
  // The command's generic signature is keyed by command name; the stand-in answers only the two
  // this step sends.
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Storybook mock stand-in
  spyOn(commandService, 'sendCommand').mockImplementation((async (command: string) =>
    command === 'paratextRegistration.getParatext9InternetUse'
      ? config.paratext9InternetUse
      : undefined) as never);
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
    // Default: provider available, settings loaded, no Paratext 9.
    return mockHooks();
  },
};
export default meta;

type Story = StoryObj<typeof InternetSettingsStep>;

/**
 * The data provider hasn't registered yet (`useDataProvider` returns `undefined`) — the natural
 * availability signal. The spinner shows; after a short delay the "Getting things ready…" message
 * appears below it.
 */
export const ProviderRegistering: Story = {
  beforeEach() {
    return mockHooks({ provider: undefined });
  },
};

/** Provider registered but the first read is still in flight (`isLoading`): spinner. */
export const Loading: Story = {
  beforeEach() {
    return mockHooks({ isLoading: true });
  },
};

/**
 * A new user, or a Paratext 9 user whose setting is "Allow unrestricted Internet use": the
 * sensitive-countries warning and the two choices.
 */
export const Default: Story = {};

/**
 * A Paratext 9 user whose setting is "Disable all Internet use". The step names it as not supported
 * yet before the two choices.
 */
export const Paratext9DisablesAllInternetUse: Story = {
  beforeEach() {
    return mockHooks({ paratext9InternetUse: 'Disabled' });
  },
};

/** A Paratext 9 user whose setting is "Disable Internet use in sensitive locations". */
export const Paratext9DisablesInSensitiveLocations: Story = {
  beforeEach() {
    return mockHooks({ paratext9InternetUse: 'VpnRequired' });
  },
};

/** A Paratext 9 user whose setting is "Use a proxy". */
export const Paratext9UsesAProxy: Story = {
  beforeEach() {
    return mockHooks({ paratext9InternetUse: 'ProxyOnly' });
  },
};

/** The read failed (a `PlatformError` from the provider): friendly error alert and a Retry button. */
export const LoadError: Story = {
  beforeEach() {
    return mockHooks({ value: newPlatformError('Connection refused') });
  },
};
