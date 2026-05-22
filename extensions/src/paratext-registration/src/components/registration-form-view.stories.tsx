import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ReactElement, useState } from 'react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { alertCommand } from '../../../../../.storybook/story.utils';
import {
  RegistrationFormView,
  RegistrationFormViewProps,
} from './registration-form-view.component';
import { SaveState } from '../utils';

/**
 * `RegistrationFormView` is the presentational Paratext registration form. The `RegistrationForm`
 * container owns all state, debounced backend validation, and PAPI calls; this view only renders
 * from props, so these stories drive it with local state and mocked callbacks.
 */

const localizedStrings = getLocalizedStrings([
  '%general_cancel%',
  '%paratextRegistration_alert_updatedRegistration%',
  '%paratextRegistration_alert_updatedRegistration_description%',
  '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%',
  '%paratextRegistration_alert_validRegistration%',
  '%paratextRegistration_alert_validRegistration_description%',
  '%paratextRegistration_button_change%',
  '%paratextRegistration_button_restarting%',
  '%paratextRegistration_button_saveAndRestart%',
  '%paratextRegistration_label_registrationCode%',
  '%paratextRegistration_label_registrationName%',
  '%paratextRegistration_label_yourRegistration%',
  '%paratextRegistration_warning_invalid_registration_length%',
]);

const SAMPLE_CODE = 'ABC123-DEF456-GHI789-JKL012-MNO345';

const meta: Meta<typeof RegistrationFormView> = {
  title: 'Bundled Extensions/paratext-registration/RegistrationFormView',
  component: RegistrationFormView,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RegistrationFormView>;

type DecoratorConfig = Partial<
  Pick<
    RegistrationFormViewProps,
    | 'isEditing'
    | 'savedName'
    | 'savedCode'
    | 'hasSavedCode'
    | 'isFormDisabled'
    | 'isSaveDisabled'
    | 'showInvalidCode'
    | 'saveState'
    | 'isLoading'
    | 'registrationIsValid'
    | 'error'
    | 'errorDescription'
  >
> & {
  initialName?: string;
  initialCode?: string;
};

/** Holds the name/code fields in local state so typing works (validation lives in the container). */
function createDecorator(config: DecoratorConfig) {
  return function RegistrationFormViewDecorator(
    Story: (update?: { args: RegistrationFormViewProps }) => ReactElement,
  ) {
    const [name, setName] = useState(config.initialName ?? '');
    const [registrationCode, setRegistrationCode] = useState(config.initialCode ?? '');

    return (
      <div className="tw:max-w-2xl tw:p-4">
        <Story
          args={{
            localizedStrings,
            isEditing: config.isEditing ?? true,
            name,
            registrationCode,
            savedName: config.savedName ?? '',
            savedCode: config.savedCode ?? '',
            hasSavedCode: config.hasSavedCode ?? false,
            isFormDisabled: config.isFormDisabled ?? false,
            isSaveDisabled: config.isSaveDisabled ?? false,
            showInvalidCode: config.showInvalidCode ?? false,
            saveState: config.saveState ?? SaveState.HasNotSaved,
            isLoading: config.isLoading ?? false,
            registrationIsValid: config.registrationIsValid ?? false,
            error: config.error ?? '',
            errorDescription: config.errorDescription ?? '',
            onNameChange: (e) => setName(e.target.value),
            onRegistrationCodeChange: (e) => setRegistrationCode(e.target.value),
            onClickChange: () => alertCommand('registration.edit'),
            onCancelEditing: () => alertCommand('registration.cancel'),
            onSaveAndRestart: () =>
              alertCommand('paratextRegistration.setParatextRegistrationData', {
                name,
                code: registrationCode,
              }),
          }}
        />
      </div>
    );
  };
}

/** First-time registration: empty editable fields, no saved registration to cancel back to. */
export const InitialRegistration: Story = {
  decorators: [createDecorator({ isEditing: true })],
};

/** An existing registration shown read-only with a Change button. */
export const ExistingRegistration: Story = {
  decorators: [
    createDecorator({
      isEditing: false,
      savedName: 'Jane Translator',
      savedCode: SAMPLE_CODE,
      hasSavedCode: true,
    }),
  ],
};

/** Editing a valid registration code — the success alert is shown. */
export const ValidRegistration: Story = {
  decorators: [
    createDecorator({
      isEditing: true,
      initialName: 'Jane Translator',
      initialCode: SAMPLE_CODE,
      savedName: 'Jane Translator',
      savedCode: SAMPLE_CODE,
      hasSavedCode: true,
      registrationIsValid: true,
    }),
  ],
};

/** A save failure surfaces the error in a destructive alert. */
export const SaveError: Story = {
  decorators: [
    createDecorator({
      isEditing: true,
      initialName: 'Jane Translator',
      initialCode: SAMPLE_CODE,
      hasSavedCode: true,
      error: 'Registration failed',
      errorDescription: 'The registration code is not valid for this name.',
    }),
  ],
};

/** Mid-restart: fields disabled, button shows the restarting spinner. */
export const Restarting: Story = {
  decorators: [
    createDecorator({
      isEditing: true,
      initialName: 'Jane Translator',
      initialCode: SAMPLE_CODE,
      hasSavedCode: true,
      isFormDisabled: true,
      isSaveDisabled: true,
      saveState: SaveState.IsRestarting,
    }),
  ],
};
