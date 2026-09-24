import { AlertCircle, CircleCheck, PenIcon } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  cn,
  Input,
  Spinner,
} from 'platform-bible-react';
import type { LanguageStrings } from 'platform-bible-utils';
import { ChangeEvent, useEffect, useState } from 'react';
import { SaveState, scrollToRef } from '../utils';
import { Grid } from './grid.component';

export const REGISTRATION_CODE_LENGTH_WITH_DASHES = 34;
export const REGISTRATION_CODE_REGEX_STRING =
  '^(?:[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}|\\*{6}-\\*{6}-\\*{6}-\\*{6}-\\*{6})$';

/**
 * How long to wait after the last keystroke before flagging a malformed registration code, so the
 * field doesn't flash invalid while the user is still typing it out.
 */
const SHOW_INVALID_CODE_DEBOUNCE_MS = 1000;

export type RegistrationFormViewProps = {
  /** Localized strings for the form. */
  localizedStrings: LanguageStrings;
  /** Whether the form is in editing mode (inputs) vs. read-only display. */
  isEditing: boolean;
  /** Current value of the registration name field. */
  name: string;
  /** Current value of the registration code field. */
  registrationCode: string;
  /** The persisted registration name (shown when not editing). */
  savedName: string;
  /** The persisted registration code (shown when not editing). */
  savedCode: string;
  /** Whether the persisted registration code is non-empty (controls the Cancel button). */
  hasSavedCode: boolean;
  /** Whether the form fields are disabled (loading, saving, restarting, or not editing). */
  isFormDisabled: boolean;
  /** Progress of the save/restart flow; drives the success alert and button label. */
  saveState: SaveState;
  /** Whether the registration code is currently being validated against the backend. */
  isLoading: boolean;
  /**
   * Whether the backend confirmed the current name + code is a real registration (drives the
   * success alert and enables saving). Supplied by the container's validation command (mocked in
   * stories). The code's _format_ validity is derived in this component, not here.
   */
  registrationIsValid: boolean;
  /** Error alert title, or empty for none. */
  error: string;
  /** Error alert description. */
  errorDescription: string;
  /** Called when the name input changes. */
  onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Called when the registration code input changes. */
  onRegistrationCodeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Called when the user clicks "Change" to enter editing mode. */
  onClickChange: () => void;
  /** Called when the user cancels editing. */
  onCancelEditing: () => void;
  /** Called when the user clicks save-and-restart. */
  onSaveAndRestart: () => void;
};

/**
 * Presentational Paratext registration form: name/code fields (editable or read-only), validation
 * hints, success/error alerts, and the change / save-and-restart buttons. It owns the field-level
 * validation (the code-format check and the save-enabled gating); the container supplies the
 * backend-dependent signals (whether the name + code is a recognized registration, loading, and
 * errors).
 */
export function RegistrationFormView({
  localizedStrings,
  isEditing,
  name,
  registrationCode,
  savedName,
  savedCode,
  hasSavedCode,
  isFormDisabled,
  saveState,
  isLoading,
  registrationIsValid,
  error,
  errorDescription,
  onNameChange,
  onRegistrationCodeChange,
  onClickChange,
  onCancelEditing,
  onSaveAndRestart,
}: RegistrationFormViewProps) {
  // Flag a malformed registration code (debounced so it doesn't flash while the user is typing).
  const [showInvalidCode, setShowInvalidCode] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowInvalidCode(
        registrationCode.length > 0 && !registrationCode.match(REGISTRATION_CODE_REGEX_STRING),
      );
    }, SHOW_INVALID_CODE_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [registrationCode]);

  // Save is allowed only for an unsaved, backend-confirmed registration that isn't mid-operation.
  const hasUnsavedChanges = name !== savedName || registrationCode !== savedCode;
  const isSaveDisabled =
    isFormDisabled || !hasUnsavedChanges || isLoading || !registrationIsValid || !!error;

  const formatSuccessAlertDescription = () => {
    if (saveState === SaveState.IsRestarting) {
      return localizedStrings['%paratextRegistration_alert_updatedRegistration_description%'];
    }

    if (saveState === SaveState.HasSaved) {
      return localizedStrings[
        '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%'
      ];
    }

    return localizedStrings['%paratextRegistration_alert_validRegistration_description%'];
  };

  return (
    <div className="tw:rounded-md tw:border tw:p-4 tw:shadow-md">
      <div className="tw:flex tw:flex-col">
        <Grid>
          {!isEditing && (
            <>
              <h1 className="tw:font-semibold tw:text-lg">
                {localizedStrings['%paratextRegistration_label_yourRegistration%']}
              </h1>
              <span />
            </>
          )}
          <span className={cn({ 'tw:font-semibold': !isEditing })}>
            {localizedStrings['%paratextRegistration_label_registrationName%']}
          </span>
          {isEditing ? (
            <Input
              className="tw:max-w-[260px]"
              value={name}
              required
              // Use shadcn's field-validation styling (destructive border + ring) for the required
              // name when it's empty.
              aria-invalid={name.trim().length === 0}
              disabled={isFormDisabled}
              onChange={onNameChange}
            />
          ) : (
            <span>{savedName}</span>
          )}
          <span className={cn({ 'tw:font-semibold': !isEditing })}>
            {localizedStrings['%paratextRegistration_label_registrationCode%']}
          </span>
          {isEditing ? (
            <Input
              className="tw:font-mono tw:box-content tw:h-6 tw:max-w-[350px]"
              pattern={REGISTRATION_CODE_REGEX_STRING}
              maxLength={REGISTRATION_CODE_LENGTH_WITH_DASHES}
              placeholder="XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX"
              required
              // Use shadcn's field-validation styling (destructive border + ring) when the entered
              // code fails the length/format check.
              aria-invalid={showInvalidCode}
              value={registrationCode}
              disabled={isFormDisabled}
              onChange={onRegistrationCodeChange}
            />
          ) : (
            <span>{savedCode}</span>
          )}
          <span />
          {showInvalidCode && (
            <p className="tw:text-muted-foreground">
              {localizedStrings['%paratextRegistration_warning_invalid_registration_length%']}
            </p>
          )}
        </Grid>
        {/* UX said to remove supporter info until we are using it in P10S. Leaving here for uncommenting when the time is right */}
        {/* <Section>Please specify who provides Paratext support to you:</Section>
          <Grid className="tw:mt-8">
            <span>Supporter name</span>
            <Input value={supporter} disabled={isFormDisabled} onChange={(e) => setSupporter(e.target.value)} />
          </Grid> */}
      </div>
      <div>
        {!error &&
          (saveState === SaveState.IsRestarting ||
            saveState === SaveState.HasSaved ||
            (!isLoading && registrationIsValid)) && (
            <div className="tw:mx-2 tw:my-4">
              <Alert ref={scrollToRef}>
                <CircleCheck className="tw:h-4 tw:w-4" />
                <AlertTitle>
                  {saveState === SaveState.IsRestarting || saveState === SaveState.HasSaved
                    ? localizedStrings['%paratextRegistration_alert_updatedRegistration%']
                    : localizedStrings['%paratextRegistration_alert_validRegistration%']}
                </AlertTitle>
                <AlertDescription>{formatSuccessAlertDescription()}</AlertDescription>
              </Alert>
            </div>
          )}
        {error && (
          <div className="tw:mx-2 tw:my-4">
            <Alert ref={scrollToRef} variant="destructive">
              <AlertCircle className="tw:h-4 tw:w-4" />
              <AlertTitle>{error}</AlertTitle>
              <AlertDescription>{errorDescription}</AlertDescription>
            </Alert>
          </div>
        )}
        <Grid className="tw:grid-cols-[1fr_auto] tw:items-end">
          <span />
          {isEditing ? (
            <div className="tw:flex tw:gap-3">
              {hasSavedCode && (
                <Button variant="outline" onClick={onCancelEditing}>
                  {localizedStrings['%general_cancel%']}
                </Button>
              )}
              <Button variant="default" disabled={isSaveDisabled} onClick={onSaveAndRestart}>
                {saveState === SaveState.IsRestarting ? (
                  <>
                    <Spinner /> {localizedStrings['%paratextRegistration_button_restarting%']}
                  </>
                ) : (
                  localizedStrings['%paratextRegistration_button_saveAndRestart%']
                )}
              </Button>
            </div>
          ) : (
            <Button variant="default" onClick={onClickChange}>
              <PenIcon /> {localizedStrings['%paratextRegistration_button_change%']}
            </Button>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default RegistrationFormView;
