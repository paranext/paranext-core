import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { newPlatformError } from 'platform-bible-utils';
import {
  markInternetUseChoiceSaved,
  resetInternetUseChoiceForTesting,
} from '@renderer/services/internet-use-choice-store';
import { InternetSettingsStep } from './internet-settings-step.component';
// Deep relative (not aliased) so the story drives the webpack-aliased renderer-hooks mock without
// pulling it into tsc typecheck. Mirrors how the language step reaches its own mock channel.
import {
  DEFAULT_INTERNET_SETTINGS,
  withInternetSettings,
} from '../../../../../.storybook/mocks/internet-settings-mock-channel';

// The step reads its settings through `useDataProvider`/`useData`, which have no PAPI backend in
// Storybook. Both are replaced by `.storybook/mocks/renderer-papi-hooks.tsx`, and each story names
// what they answer through the decorator below. Spying on those exports is not an option: they
// belong to an ES module namespace, which is not configurable, so a `spyOn` throws and Storybook
// renders its error overlay in place of the step.

const meta: Meta<typeof InternetSettingsStep> = {
  title: 'First run/InternetSettingsStep',
  component: InternetSettingsStep,
  tags: ['autodocs', 'test'],
  args: {
    onNext: () => {},
    setCanProceed: () => {},
  },
  beforeEach() {
    // Each story starts before the user has chosen, whatever was clicked in the story before it.
    resetInternetUseChoiceForTesting();
  },
};
export default meta;

type Story = StoryObj<typeof InternetSettingsStep>;

/**
 * The data provider hasn't registered yet (`useDataProvider` answers `undefined`) — the natural
 * availability signal. The spinner shows and Next is disabled; after a short delay the "Getting
 * things ready…" message appears below it.
 */
export const ProviderRegistering: Story = {
  decorators: [withInternetSettings({ isProviderRegistered: false })],
};

/** Provider registered but the first read is still in flight (`isLoading`): spinner, Next disabled. */
export const Loading: Story = {
  decorators: [withInternetSettings({ isLoading: true })],
};

/**
 * Settings loaded with VPN Required stored, as ParatextData saves on first startup. No option is
 * selected and Next stays disabled until the user picks one, so a stored value nobody chose is not
 * presented as their choice.
 */
export const Default: Story = {
  decorators: [withInternetSettings()],
};

/**
 * The user already chose "Unrestricted" this session and came back to the step: their choice shows
 * selected and Next is enabled.
 */
export const ChoiceAlreadyMade: Story = {
  beforeEach() {
    markInternetUseChoiceSaved();
  },
  decorators: [
    withInternetSettings({
      value: { ...DEFAULT_INTERNET_SETTINGS, permittedInternetUse: 'Enabled' },
    }),
  ],
};

/**
 * The stored setting names an option this app does not implement yet. `InternetSettings.xml` is
 * seeded once from a co-installed Paratext 9 on first launch, so the wizard can meet this on a
 * first run. The row stays selected under a banner, and the step holds Next shut until the user
 * picks an option that will actually take effect.
 */
export const UnsupportedStoredValue: Story = {
  decorators: [
    withInternetSettings({
      value: { ...DEFAULT_INTERNET_SETTINGS, permittedInternetUse: 'Disabled' },
    }),
  ],
};

/** The read failed (a `PlatformError` from the provider): friendly error alert and a Retry button. */
export const LoadError: Story = {
  decorators: [withInternetSettings({ value: newPlatformError('Connection refused') })],
};
