import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { newPlatformError } from 'platform-bible-utils';
import { InternetSettingsStep } from './internet-settings-step.component';
// Deep relative (not aliased) so the story drives the webpack-aliased mocks without pulling them
// into tsc typecheck. Mirrors how the language step reaches its own mock channel.
import {
  resetCommandServiceMock,
  setCommandServiceMock,
} from '../../../../../.storybook/mocks/command-service-mock-channel';
import { withInternetSettings } from '../../../../../.storybook/mocks/internet-settings-mock-channel';

// The step reads its settings through `useDataProvider`/`useData`, which have no PAPI backend in
// Storybook. Both are replaced by `.storybook/mocks/renderer-papi-hooks.tsx`, and each story names
// what they answer through the decorator below. Spying on those exports is not an option: they
// belong to an ES module namespace, which is not configurable, so a `spyOn` throws and Storybook
// renders its error overlay in place of the step. Commands go through the command-service mock
// channel for the same reason.

/**
 * Answers the step's commands without the network Storybook does not have: the Paratext 9 lookup
 * with `paratext9InternetUse`, and "Close <product name>" with nothing, so it does not quit
 * anything. Returns a cleanup that restores the default responder.
 */
function mockCommands(paratext9InternetUse?: string) {
  setCommandServiceMock((command) =>
    command === 'paratextRegistration.getParatext9InternetUse' ? paratext9InternetUse : undefined,
  );
  return () => resetCommandServiceMock();
}

const meta: Meta<typeof InternetSettingsStep> = {
  title: 'First run/InternetSettingsStep',
  component: InternetSettingsStep,
  tags: ['autodocs', 'test'],
  args: {
    onNext: () => {},
    setCanProceed: () => {},
  },
  // Default: provider available, settings loaded, no Paratext 9.
  decorators: [withInternetSettings()],
  beforeEach() {
    return mockCommands();
  },
};
export default meta;

type Story = StoryObj<typeof InternetSettingsStep>;

/**
 * The data provider hasn't registered yet (`useDataProvider` answers `undefined`) — the natural
 * availability signal. The spinner shows; after a short delay the "Getting things ready…" message
 * appears below it.
 */
export const ProviderRegistering: Story = {
  decorators: [withInternetSettings({ isProviderRegistered: false })],
};

/** Provider registered but the first read is still in flight (`isLoading`): spinner. */
export const Loading: Story = {
  decorators: [withInternetSettings({ isLoading: true })],
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
    return mockCommands('Disabled');
  },
};

/** A Paratext 9 user whose setting is "Disable Internet use in sensitive locations". */
export const Paratext9DisablesInSensitiveLocations: Story = {
  beforeEach() {
    return mockCommands('VpnRequired');
  },
};

/** A Paratext 9 user whose setting is "Use a proxy". */
export const Paratext9UsesAProxy: Story = {
  beforeEach() {
    return mockCommands('ProxyOnly');
  },
};

/** The read failed (a `PlatformError` from the provider): friendly error alert and a Retry button. */
export const LoadError: Story = {
  decorators: [withInternetSettings({ value: newPlatformError('Connection refused') })],
};
