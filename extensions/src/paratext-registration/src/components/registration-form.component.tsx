import { UseWebViewStateHook } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  cn,
  Input,
  Spinner,
  usePromise,
} from 'platform-bible-react';
import { getErrorMessage, LocalizeKey, wait } from 'platform-bible-utils';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, CircleCheck, PenIcon } from 'lucide-react';
import { SaveState, scrollToRef } from '../utils';
import { Grid } from './grid.component';

const REGISTRATION_CODE_LENGTH_WITH_DASHES = 34;
const REGISTRATION_CODE_REGEX_STRING =
  '^(?:[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}|\\*{6}-\\*{6}-\\*{6}-\\*{6}-\\*{6})$';
const REGISTRATION_CODE_CHARACTER_VALIDATION_REGEX = '^[a-zA-Z0-9\\-]*$';
const REGISTRATION_CODE_INSERT_DASH_REGEX_STRING = '^[a-zA-Z0-9]{6}$|-[[a-zA-Z0-9\\-]{6}$';
/**
 * Time in milliseconds to wait before restarting the application after changing Paratext
 * registration information
 */
const REGISTRATION_CHANGE_RESTART_DELAY_MS = 5 * 1000;
/**
 * Time in milliseconds to debounce the validation of the registration code so that it's not always
 * validating
 */
const REGISTRATION_CODE_VALIDATION_DEBOUNCE_MS = 1000;

// #region RegistrationData functions

async function getRegistrationData() {
  return papi.commands.sendCommand('paratextRegistration.getParatextRegistrationData');
}

async function saveRegistrationInformation(
  name: string,
  registrationCode: string,
  email: string,
  supporter: string,
) {
  return papi.commands.sendCommand('paratextRegistration.setParatextRegistrationData', {
    name,
    code: registrationCode,
    email,
    supporterName: supporter,
  });
}

// #endregion

// #region localized strings

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%general_error_title%',
  '%paratextRegistration_alert_invalidRegistration%',
  '%paratextRegistration_alert_invalidRegistration_description%',
  '%paratextRegistration_alert_unchangedRegistration%',
  '%paratextRegistration_alert_unchangedRegistration_description%',
  '%paratextRegistration_alert_updatedRegistration%',
  '%paratextRegistration_alert_updatedRegistration_description%',
  '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%',
  '%paratextRegistration_alert_validRegistration%',
  '%paratextRegistration_alert_validRegistration_description%',
  '%paratextRegistration_button_saveAndRestart%',
  '%paratextRegistration_label_emailAddress%',
  '%paratextRegistration_label_registrationCode%',
  '%paratextRegistration_label_registrationName%',
  '%paratextRegistration_label_yourRegistration%',
  '%paratextRegistration_warning_invalid_registration_characters%',
  '%paratextRegistration_warning_invalid_registration_length%',
  '%paratextRegistration_warning_invalid_registration_format%',
  '%paratextRegistration_webView_title_2%',
  '%paratextRegistration_webView_tooltip%',
  '%paratextRegistrationProfile_webView_title%',
  '%paratextRegistrationProfile_webView_tooltip%',
];

// #endregion

interface RegistrationFormProps {
  useWebViewState: UseWebViewStateHook;
  handleFormTypeChange: (isInitial: boolean) => void;
}

export function RegistrationForm({ useWebViewState, handleFormTypeChange }: RegistrationFormProps) {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // #region RegistrationData

  const [name, setName] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [email, setEmail] = useState('');
  const [supporter, setSupporter] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const [currentRegistrationData, isLoadingCurrentRegistrationData] = usePromise(
    getRegistrationData,
    useMemo(
      () => ({ name, code: registrationCode, email, supporterName: supporter }),
      [name, registrationCode, email, supporter],
    ),
  );

  // Set the form to show the current registration data when we receive it
  useEffect(() => {
    setName(currentRegistrationData.name);
    setEmail(currentRegistrationData.email);
    setSupporter(currentRegistrationData.supporterName);

    // If there is no registration currently, then changes the form and dialog to reflect as such
    const isInitialRegistration =
      currentRegistrationData.code === '' || currentRegistrationData.name === '';
    setIsEditing(isInitialRegistration);
    // For some reason lint says this function is undefined when it is
    // eslint-disable-next-line no-undef
    updateWebViewDefinition({
      title: isInitialRegistration
        ? localizedStrings['%paratextRegistration_webView_title_2%']
        : localizedStrings['%paratextRegistrationProfile_webView_title%'],
      tooltip: isInitialRegistration
        ? localizedStrings['%paratextRegistration_webView_tooltip%']
        : localizedStrings['%paratextRegistrationProfile_webView_tooltip%'],
    });
    handleFormTypeChange(isInitialRegistration);
  }, [
    currentRegistrationData,
    handleFormTypeChange,
    localizedStrings,
    setName,
    setRegistrationCode,
    setEmail,
    setSupporter,
  ]);

  // #endregion

  // How much progress the form has made in saving registration data
  const [saveState, setSaveState] = useWebViewState('saveState', SaveState.HasNotSaved);
  const [error, setError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [showInvalidCode, setShowInvalidCode] = useState(false);
  const [registrationIsValid, setRegistrationIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationTimeout, setValidationTimeout] = useState<ReturnType<typeof setTimeout>>();

  // If the app just got done with restarting, then changes the save state to `HasSaved`
  useEffect(() => {
    if (saveState === SaveState.IsRestarting) {
      setSaveState(SaveState.HasSaved);
    }
    // This hook needs to only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // whether any form fields have changed
  const hasUnsavedChanges =
    currentRegistrationData.name !== name ||
    currentRegistrationData.code !== registrationCode ||
    currentRegistrationData.email !== email ||
    currentRegistrationData.supporterName !== supporter;

  const saveAndRestart = async () => {
    setSaveState(SaveState.IsSaving);
    setError('');

    if (!hasUnsavedChanges) return;

    try {
      await saveRegistrationInformation(name, registrationCode, email, supporter);
      // Queue up the restart
      (async () => {
        try {
          await wait(REGISTRATION_CHANGE_RESTART_DELAY_MS);
          await papi.commands.sendCommand('platform.restart');
        } catch (e) {
          logger.warn(
            `Failed to restart after saving Paratext registration information! The user will need to restart manually`,
          );
        }
      })();

      if (isMounted.current) setSaveState(SaveState.IsRestarting);
    } catch (err: unknown) {
      logger.warn(`Failed to save Paratext Registration information ${err}`);

      const errMessage = getErrorMessage(err);
      // Matches error code -32000,
      if (errMessage.match(/\(-32000\)/)) {
        setError(localizedStrings['%paratextRegistration_alert_unchangedRegistration%']);
        setErrorDescription(
          localizedStrings['%paratextRegistration_alert_unchangedRegistration_description%'],
        );
      } else {
        setError(localizedStrings['%general_error_title%']);
        setErrorDescription(getErrorMessage(err));
      }
      setSaveState(SaveState.HasNotSaved);
    }
  };

  // Whether you should be able to type into the form
  const isFormDisabled =
    isLoadingCurrentRegistrationData ||
    saveState === SaveState.IsSaving ||
    saveState === SaveState.IsRestarting ||
    !isEditing;

  const isButtonDisabled =
    isFormDisabled || !hasUnsavedChanges || isLoading || !registrationIsValid;

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

  const onEditingChange = () => {
    setSaveState(SaveState.HasNotSaved);
    setRegistrationIsValid(false);
    setError('');
    setErrorDescription('');
  };

  const cancelEditing = () => {
    setName(currentRegistrationData.name);
    setRegistrationCode('');
    setIsEditing(false);
    onEditingChange();
  };

  const onClickChange = () => {
    setIsEditing(true);
    onEditingChange();
  };

  const validateRegistration = (newRegistrationCode: string, newName: string) => {
    // Clears existing validation timeout
    if (validationTimeout) {
      clearTimeout(validationTimeout);
    }

    console.log('timeout is scheduled!');
    // Sets a debounced timeout for the validation
    const timeout = setTimeout(async () => {
      const newCodeIsValid = newRegistrationCode.match(REGISTRATION_CODE_REGEX_STRING);
      setShowInvalidCode(!!newRegistrationCode && !newCodeIsValid);
      console.log('timeout is running!');

      // If the new code is valid, then validates the code with the name on the backend
      if (newCodeIsValid && newName && !isLoading) {
        setIsLoading(true);
        try {
          const isValid = await papi.commands.sendCommand(
            'paratextRegistration.validateParatextRegistrationData',
            { name: newName, code: newRegistrationCode, email, supporterName: supporter },
          );

          if (isMounted.current) {
            setRegistrationIsValid(isValid);

            if (isValid && error) {
              setError('');
              setErrorDescription('');
            } else if (!isValid) {
              setError(localizedStrings['%paratextRegistration_alert_invalidRegistration%']);
              setErrorDescription(
                localizedStrings['%paratextRegistration_alert_invalidRegistration_description%'],
              );
            }
          }
        } catch (err: unknown) {
          logger.warn(
            'An error occurred while validating paratext registration:',
            getErrorMessage(err),
          );
          setRegistrationIsValid(false);
        } finally {
          setIsLoading(false);
        }
      } else if (registrationIsValid) {
        setRegistrationIsValid(false);
      } else if (!registrationIsValid) {
        setError('');
        setErrorDescription('');
      }
    }, REGISTRATION_CODE_VALIDATION_DEBOUNCE_MS);
    setValidationTimeout(timeout);
  };

  const onRegistrationCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newRegistrationCode = event.target.value;
    if (
      !newRegistrationCode.match(REGISTRATION_CODE_REGEX_STRING) &&
      newRegistrationCode.match(REGISTRATION_CODE_INSERT_DASH_REGEX_STRING) &&
      !registrationCode.endsWith('-')
    ) {
      newRegistrationCode += '-';
      // Account for when trying to backspace
    } else if (
      registrationCode.endsWith('-') &&
      newRegistrationCode.length < registrationCode.length
    ) {
      newRegistrationCode = newRegistrationCode.substring(0, registrationCode.length - 2);
    }

    // Prevent user from entering in invalid characters
    if (newRegistrationCode.match(REGISTRATION_CODE_CHARACTER_VALIDATION_REGEX)) {
      setRegistrationCode(newRegistrationCode);
      validateRegistration(newRegistrationCode, name);
    }
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    validateRegistration(registrationCode, newName);
  };

  return (
    <div className="tw-rounded-md tw-border tw-p-4 tw-shadow-md">
      <div className="tw-flex tw-flex-col">
        <Grid>
          {!isEditing && (
            <>
              <h1 className="tw-font-semibold tw-text-lg">
                {localizedStrings['%paratextRegistration_label_yourRegistration%']}
              </h1>
              <span />
            </>
          )}
          <span className={cn({ 'tw-font-semibold': !isEditing })}>
            {localizedStrings['%paratextRegistration_label_registrationName%']}
          </span>
          {isEditing ? (
            <Input
              className="tw-max-w-[260px]"
              value={name}
              required
              disabled={isFormDisabled}
              onChange={onNameChange}
            />
          ) : (
            <span>{currentRegistrationData.name}</span>
          )}
          <span className={cn({ 'tw-font-semibold': !isEditing })}>
            {localizedStrings['%paratextRegistration_label_registrationCode%']}
          </span>
          {isEditing ? (
            <Input
              className={cn('tw-font-mono tw-box-content tw-h-6 tw-max-w-[350px]', {
                'invalid:tw-border-destructive': showInvalidCode,
              })}
              pattern={REGISTRATION_CODE_REGEX_STRING}
              maxLength={REGISTRATION_CODE_LENGTH_WITH_DASHES}
              placeholder="XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX"
              required
              value={registrationCode}
              disabled={isFormDisabled}
              onChange={onRegistrationCodeChange}
            />
          ) : (
            <span>{currentRegistrationData.code}</span>
          )}
          <span />
          {showInvalidCode && (
            <p className="tw-text-muted-foreground">
              {localizedStrings['%paratextRegistration_warning_invalid_registration_length%']}
            </p>
          )}
        </Grid>
        {/* UX said to remove supporter info until we are using it in P10S. Leaving here for uncommenting when the time is right */}
        {/* <Section>Please specify who provides Paratext support to you:</Section>
          <Grid className="tw-mt-8">
            <span>Supporter name</span>
            <Input value={supporter} disabled={isFormDisabled} onChange={(e) => setSupporter(e.target.value)} />
          </Grid> */}
      </div>
      <div>
        {!error &&
          (saveState === SaveState.IsRestarting ||
            saveState === SaveState.HasSaved ||
            (!isLoading && registrationIsValid)) && (
            <div className="tw-mx-2 tw-my-4">
              <Alert ref={scrollToRef}>
                <CircleCheck className="tw-h-4 tw-w-4" />
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
          <div className="tw-mx-2 tw-my-4">
            <Alert ref={scrollToRef} variant="destructive">
              <AlertCircle className="tw-h-4 tw-w-4" />
              <AlertTitle>{error}</AlertTitle>
              <AlertDescription>{errorDescription}</AlertDescription>
            </Alert>
          </div>
        )}
        <Grid className="tw-grid-cols-[1fr_auto] tw-items-end">
          <span />
          {isEditing ? (
            <div className="tw-flex tw-gap-3">
              {currentRegistrationData.code !== '' && (
                <Button variant="outline" onClick={cancelEditing}>
                  Cancel
                </Button>
              )}
              <Button variant="default" disabled={isButtonDisabled} onClick={saveAndRestart}>
                {saveState === SaveState.IsRestarting ? (
                  <>
                    <Spinner /> Restarting...
                  </>
                ) : (
                  localizedStrings['%paratextRegistration_button_saveAndRestart%']
                )}
              </Button>
            </div>
          ) : (
            <Button variant="default" onClick={onClickChange}>
              <PenIcon /> Change
            </Button>
          )}
        </Grid>
      </div>
    </div>
  );
}
