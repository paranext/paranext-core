import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { InternetSettings } from 'paratext-registration';
import { ReactElement, useState } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { alertCommand } from '../../../../.storybook/story.utils';
import {
  INTERNET_SETTINGS_STRING_KEYS,
  InternetSettingsForm,
  InternetSettingsFormProps,
} from './internet-settings.component';
import { SaveState } from './utils';

/**
 * `InternetSettingsForm` is the presentational half of the Internet settings web view: the
 * internet-use selector, optional proxy settings, server selector, and the save-and-restart button
 * with success/error alerts. The web view loads and persists settings and runs the restart; this
 * component is fully controlled.
 */

const localizedStrings = getLocalizedStrings(INTERNET_SETTINGS_STRING_KEYS);

const defaultSettings: InternetSettings = {
  permittedInternetUse: 'VpnRequired',
  selectedServer: 'Production',
  proxyPort: 0,
};

const proxySettings: InternetSettings = {
  permittedInternetUse: 'ProxyOnly',
  selectedServer: 'Production',
  proxyMode: 'Http',
  proxyHost: 'proxy.example.org',
  proxyPort: 8080,
  proxyUsername: 'translator',
};

const meta: Meta<typeof InternetSettingsForm> = {
  title: 'Bundled Extensions/paratext-registration/InternetSettingsForm',
  component: InternetSettingsForm,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InternetSettingsForm>;

type DecoratorConfig = {
  initialSettings?: InternetSettings;
  isFormDisabled?: boolean;
  isSaveDisabled?: boolean;
  saveState?: SaveState;
  saveError?: string;
};

/** Holds the edited settings in local state so the selects and inputs are interactive. */
function createDecorator(config: DecoratorConfig) {
  return function InternetSettingsDecorator(
    Story: (update?: { args: InternetSettingsFormProps }) => ReactElement,
  ) {
    const [internetSettings, setInternetSettings] = useState<InternetSettings>(
      config.initialSettings ?? defaultSettings,
    );

    return (
      <Story
        args={{
          localizedStrings,
          internetSettings,
          onInternetSettingsChange: setInternetSettings,
          isFormDisabled: config.isFormDisabled ?? false,
          isSaveDisabled: config.isSaveDisabled ?? false,
          saveState: config.saveState ?? SaveState.HasNotSaved,
          saveError: config.saveError ?? '',
          onSaveAndRestart: () =>
            alertCommand('paratextRegistration.setParatextDataInternetSettings', internetSettings),
        }}
      />
    );
  };
}

/** Default: VPN-required internet use, no proxy. */
export const Default: Story = {
  decorators: [createDecorator({})],
};

/** Proxy-only internet use reveals the proxy settings card. */
export const ProxyOnly: Story = {
  decorators: [createDecorator({ initialSettings: proxySettings })],
};

/** Mid-restart: fields disabled, button shows the restarting spinner, success alert visible. */
export const Restarting: Story = {
  decorators: [
    createDecorator({
      isFormDisabled: true,
      isSaveDisabled: true,
      saveState: SaveState.IsRestarting,
    }),
  ],
};

/** A save failure surfaces the error in a destructive alert. */
export const SaveError: Story = {
  decorators: [
    createDecorator({
      saveError: 'Could not reach the registration server. Check your connection and try again.',
    }),
  ],
};
