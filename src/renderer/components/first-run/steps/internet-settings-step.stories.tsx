import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { ComponentType } from 'react';
import { newPlatformError } from 'platform-bible-utils';
import { InternetSettingsStep } from './internet-settings-step.component';
// Deep relative (not aliased) so the story drives the webpack-aliased renderer-hooks mock without
// pulling it into tsc typecheck. Mirrors how the language step reaches its own mock channel.
import {
  DEFAULT_INTERNET_SETTINGS,
  type InternetSettingsMock,
  InternetSettingsMockContext,
} from '../../../../../.storybook/mocks/internet-settings-mock-channel';

// The step reads its settings through `useDataProvider`/`useData`, which have no PAPI backend in
// Storybook. Both are replaced by `.storybook/mocks/renderer-papi-hooks.tsx`, and each story names
// what they answer through the context below. Spying on those exports is not an option: they belong
// to an ES module namespace, which is not configurable, so a `spyOn` throws and Storybook renders
// its error overlay in place of the step.

/**
 * Points the replaced hooks at one state. Defaults to the ordinary case — provider registered,
 * settings loaded — so each story names only what it changes.
 */
function withInternetSettings(mock: Partial<InternetSettingsMock> = {}) {
  const value: InternetSettingsMock = {
    isProviderRegistered: true,
    value: DEFAULT_INTERNET_SETTINGS,
    isLoading: false,
    ...mock,
  };
  return function StoryDecorator(Story: ComponentType) {
    return (
      <InternetSettingsMockContext.Provider value={value}>
        <Story />
      </InternetSettingsMockContext.Provider>
    );
  };
}

const meta: Meta<typeof InternetSettingsStep> = {
  title: 'First run/InternetSettingsStep',
  component: InternetSettingsStep,
  tags: ['autodocs', 'test'],
  args: {
    onNext: () => {},
    setCanProceed: () => {},
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

/** Settings loaded, VPN Required selected, Next enabled. */
export const Default: Story = {
  decorators: [withInternetSettings()],
};

/** Enabled (unrestricted internet) option pre-selected. */
export const Enabled: Story = {
  decorators: [
    withInternetSettings({
      value: { ...DEFAULT_INTERNET_SETTINGS, permittedInternetUse: 'Enabled' },
    }),
  ],
};

/** The read failed (a `PlatformError` from the provider): friendly error alert and a Retry button. */
export const LoadError: Story = {
  decorators: [withInternetSettings({ value: newPlatformError('Connection refused') })],
};
