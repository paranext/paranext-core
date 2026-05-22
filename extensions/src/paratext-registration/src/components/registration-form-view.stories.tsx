import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ReactElement, useState } from 'react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { alertCommand } from '../../../../../.storybook/story.utils';
import {
  REGISTRATION_CODE_REGEX_STRING,
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
    | 'saveState'
    | 'isLoading'
    | 'error'
    | 'errorDescription'
  >
> & {
  initialName?: string;
  initialCode?: string;
};

/**
 * Backs the form with thin in-memory state so the whole flow is interactive: "Change" enters edit
 * mode (revealing the editable name/code fields), typing updates the fields, Cancel reverts to the
 * saved values, and Save persists them back to the read-only view (and announces the command the
 * web view would run — saving registration restarts the app).
 */
function createDecorator(config: DecoratorConfig) {
  return function RegistrationFormViewDecorator(
    Story: (update?: { args: RegistrationFormViewProps }) => ReactElement,
  ) {
    const [savedName, setSavedName] = useState(config.savedName ?? '');
    const [savedCode, setSavedCode] = useState(config.savedCode ?? '');
    const [name, setName] = useState(config.initialName ?? config.savedName ?? '');
    const [registrationCode, setRegistrationCode] = useState(
      config.initialCode ?? config.savedCode ?? '',
    );
    const [isEditing, setIsEditing] = useState(config.isEditing ?? true);

    // Reproduce the container's field validation so the form validates live in the story like the
    // app does: a non-empty code that doesn't match the registration-code format is flagged
    // (red field + length warning), and the registration is "valid" only with a name and a
    // well-formed code. (The app additionally validates the code against the backend; the story
    // treats a well-formed code + name as valid.)
    const isCodeWellFormed = !!registrationCode.match(REGISTRATION_CODE_REGEX_STRING);
    const showInvalidCode = isEditing && registrationCode.length > 0 && !isCodeWellFormed;
    const registrationIsValid = isEditing && name.trim().length > 0 && isCodeWellFormed;
    const isFormDisabled = (config.isFormDisabled ?? false) || !isEditing;
    const hasUnsavedChanges = name !== savedName || registrationCode !== savedCode;
    const error = config.error ?? '';
    const isSaveDisabled =
      config.isSaveDisabled ??
      (isFormDisabled || !hasUnsavedChanges || !registrationIsValid || !!error);

    return (
      <div className="tw:max-w-2xl tw:p-4">
        <Story
          args={{
            localizedStrings,
            isEditing,
            name,
            registrationCode,
            savedName,
            savedCode,
            hasSavedCode: config.hasSavedCode ?? savedCode.length > 0,
            isFormDisabled,
            isSaveDisabled,
            showInvalidCode,
            saveState: config.saveState ?? SaveState.HasNotSaved,
            isLoading: config.isLoading ?? false,
            registrationIsValid,
            error,
            errorDescription: config.errorDescription ?? '',
            onNameChange: (e) => setName(e.target.value),
            onRegistrationCodeChange: (e) => setRegistrationCode(e.target.value),
            onClickChange: () => setIsEditing(true),
            onCancelEditing: () => {
              setName(savedName);
              setRegistrationCode(savedCode);
              setIsEditing(false);
            },
            onSaveAndRestart: () => {
              // Saving registration restarts the app in the real web view — announce the command.
              alertCommand('paratextRegistration.setParatextRegistrationData', {
                name,
                code: registrationCode,
              });
              setSavedName(name);
              setSavedCode(registrationCode);
              setIsEditing(false);
            },
          }}
        />
      </div>
    );
  };
}

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

/** First-time registration: empty editable fields, no saved registration to cancel back to. */
export const InitialRegistration: Story = {
  decorators: [createDecorator({ isEditing: true })],
};

/** Editing a valid registration code — the success alert is shown (validity is computed live). */
export const ValidRegistration: Story = {
  decorators: [
    createDecorator({
      isEditing: true,
      initialName: 'Jane Translator',
      initialCode: SAMPLE_CODE,
      // A previous (different) valid code so there are unsaved changes and Save is enabled.
      savedName: 'Jane Translator',
      savedCode: 'ZZZ999-YYY888-XXX777-WWW666-VVV555',
      hasSavedCode: true,
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
