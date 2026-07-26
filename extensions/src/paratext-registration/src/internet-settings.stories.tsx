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
 * `InternetSettingsForm` orchestrates the radio option list, developer section, and Reset / Save
 * and restart buttons. The web view manages PAPI fetch/save; this component is fully controlled.
 */

const localizedStrings = getLocalizedStrings(INTERNET_SETTINGS_STRING_KEYS);

const defaultSettings: InternetSettings = {
  permittedInternetUse: 'VpnRequired',
  selectedServer: 'Production',
  proxyPort: 0,
};

const meta: Meta<typeof InternetSettingsForm> = {
  title: 'Bundled Extensions/paratext-registration/InternetSettingsForm',
  component: InternetSettingsForm,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof InternetSettingsForm>;

type DecoratorConfig = {
  initialSettings?: InternetSettings;
  savedInternetSettings?: InternetSettings | undefined;
  isFormDisabled?: boolean;
  saveState?: SaveState;
  saveError?: string;
};

/** Wraps the form in state so the radio list and developer toggle remain interactive. */
function createDecorator(config: DecoratorConfig) {
  return function InternetSettingsDecorator(
    Story: (update?: { args: InternetSettingsFormProps }) => ReactElement,
  ) {
    const [internetSettings, setInternetSettings] = useState<InternetSettings>(
      config.initialSettings ?? defaultSettings,
    );
    const saved =
      'savedInternetSettings' in config ? config.savedInternetSettings : defaultSettings;

    return (
      <Story
        args={{
          localizedStrings,
          internetSettings,
          savedInternetSettings: saved,
          onInternetSettingsChange: setInternetSettings,
          isFormDisabled: config.isFormDisabled ?? false,
          saveState: config.saveState ?? SaveState.HasNotSaved,
          saveError: config.saveError ?? '',
          onSaveAndRestart: () =>
            alertCommand('paratextRegistration.setParatextDataInternetSettings', internetSettings),
        }}
      />
    );
  };
}

/** Default: VPN-required selected, Reset and Save buttons disabled (no changes yet). */
export const Default: Story = {
  decorators: [createDecorator({})],
};

/** Initial load in flight — `savedInternetSettings` is undefined; both buttons are disabled. */
export const Loading: Story = {
  decorators: [createDecorator({ savedInternetSettings: undefined, isFormDisabled: true })],
};

/**
 * User has changed the selection (Unrestricted vs the saved VPN-required). Reset and Save and
 * restart are enabled.
 */
export const UnsavedChanges: Story = {
  decorators: [
    createDecorator({
      initialSettings: {
        permittedInternetUse: 'Enabled',
        selectedServer: 'Production',
        proxyPort: 0,
      },
      savedInternetSettings: defaultSettings,
    }),
  ],
};

/** Developer section expanded — Production/Development toggle visible. */
export const DeveloperSectionExpanded: Story = {
  decorators: [createDecorator({})],
  play: async ({ canvasElement }) => {
    const { userEvent, within } = await import('@storybook/testing-library');
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /Developer only/ }));
  },
};

/** Save in progress: form disabled, buttons disabled, no alert yet. */
export const Saving: Story = {
  decorators: [
    createDecorator({
      isFormDisabled: true,
      saveState: SaveState.IsSaving,
    }),
  ],
};

/** Mid-restart: buttons disabled, spinner visible, success alert showing. */
export const Restarting: Story = {
  decorators: [
    createDecorator({
      isFormDisabled: true,
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

/**
 * Post-restart: the app has come back up and the success alert shows a "restart completed" message
 * rather than the countdown message. Buttons are disabled — the settings are saved.
 */
export const HasSaved: Story = {
  decorators: [
    createDecorator({
      saveState: SaveState.HasSaved,
    }),
  ],
};
