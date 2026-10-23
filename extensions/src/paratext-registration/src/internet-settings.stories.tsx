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
  permittedInternetUse: 'Disabled',
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
  canEditServer?: boolean;
  /** Whether the saved Disabled is the user's choice of "Disable access…". Defaults to true. */
  savedHasChosenDisableSomeServices?: boolean;
};

/** Wraps the form in state so the radio list and developer toggle remain interactive. */
function createDecorator(config: DecoratorConfig) {
  return function InternetSettingsDecorator(
    Story: (update?: { args: InternetSettingsFormProps }) => ReactElement,
  ) {
    const [internetSettings, setInternetSettings] = useState<InternetSettings>(
      config.initialSettings ?? defaultSettings,
    );
    const savedHasChosenDisableSomeServices = config.savedHasChosenDisableSomeServices ?? true;
    const [hasChosenDisableSomeServices, setHasChosenDisableSomeServices] = useState(
      savedHasChosenDisableSomeServices,
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
          canEditServer: config.canEditServer ?? true,
          onSaveAndRestart: () =>
            alertCommand(
              'paratextRegistration.internetSettingsDataProvider → setInternetSettings',
              internetSettings,
            ),
          hasChosenDisableSomeServices,
          savedHasChosenDisableSomeServices,
          onHasChosenDisableSomeServicesChange: setHasChosenDisableSomeServices,
        }}
      />
    );
  };
}

/**
 * Default: "Disable access to some Bible translation services" selected, Reset and Save buttons
 * disabled (no changes yet).
 */
export const Default: Story = {
  decorators: [createDecorator({})],
};

/**
 * The stored setting names an option this app does not implement yet. `InternetSettings.xml` is
 * seeded once from a co-installed Paratext 9 on first launch, so this is what an inherited file can
 * look like. The row stays selected — the panel never silently swaps it — and a banner says why
 * nothing acts on it until the user picks an available option.
 */
export const UnsupportedStoredValue: Story = {
  decorators: [
    createDecorator({
      initialSettings: { ...defaultSettings, permittedInternetUse: 'ProxyOnly' },
      savedInternetSettings: { ...defaultSettings, permittedInternetUse: 'ProxyOnly' },
    }),
  ],
};

/**
 * A saved `Disabled` the user did not choose here, such as one carried over from Paratext 9, where
 * it means "Disable all Internet access". That row is selected under the banner; choosing "Disable
 * access to some Bible translation services" keeps the value but counts as a change to save.
 */
export const DisabledNotChosenHere: Story = {
  decorators: [createDecorator({ savedHasChosenDisableSomeServices: false })],
};

/** Initial load in flight — `savedInternetSettings` is undefined; both buttons are disabled. */
export const Loading: Story = {
  decorators: [createDecorator({ savedInternetSettings: undefined, isFormDisabled: true })],
};

/**
 * User has changed the selection (Unrestricted vs the saved "Disable access…"). Reset and Save and
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

/**
 * Server selection hidden — the default state for everyone except a Shift-click/Shift-Enter on
 * "Internet & connectivity" (or an already non-Production server). No locked label, no hint of any
 * kind: the control is simply absent.
 */
export const ServerSelectionHidden: Story = {
  decorators: [createDecorator({ canEditServer: false })],
};

/** Developer section expanded — Production/Development toggle visible. */
export const DeveloperSectionExpanded: Story = {
  decorators: [createDecorator({})],
  play: async ({ canvasElement, userEvent }) => {
    const button = Array.from(canvasElement.querySelectorAll<HTMLButtonElement>('button')).find(
      (el) => /Developer only/i.test(el.textContent ?? ''),
    );
    if (button) await userEvent.click(button);
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
