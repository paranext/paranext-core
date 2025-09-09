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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SaveState, scrollToRef } from '../utils/helpers';
import { Grid } from './grid.component';
import { Section } from './section.component';
import { AlertCircle, CircleCheck, PenIcon } from 'lucide-react';

const REGISTRATION_CODE_LENGTH_WITH_DASHES = 34;
const REGISTRATION_CODE_REGEX_STRING =
  '^(?:[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}|\\*{6}-\\*{6}-\\*{6}-\\*{6}-\\*{6})$';
const REGISTRATION_CODE_INSERT_DASH_REGEX_STRING = '[a-zA-Z0-9]{6}$';
const EMAIL_REGEX_STRING = '^.+@.+\\..+$';
/**
 * Time in milliseconds to wait before restarting the application after changing Paratext
 * registration information
 */
const REGISTRATION_CHANGE_RESTART_DELAY_MS = 5 * 1000;

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
  '%paratextRegistration_warning_invalid_registration_format%',
];

// #endregion

interface RegistrationFormProps {
  useWebViewState: UseWebViewStateHook;
}

export function RegistrationForm({ useWebViewState }: RegistrationFormProps) {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // #region RegistrationData

  const [name, setName] = useWebViewState('name', '');
  const [registrationCode, setRegistrationCode] = useWebViewState('registrationCode', '');
  const [email, setEmail] = useWebViewState('email', '');
  const [supporter, setSupporter] = useWebViewState('supporter', '');

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
    setRegistrationCode(currentRegistrationData.code);
    setEmail(currentRegistrationData.email);
    setSupporter(currentRegistrationData.supporterName);
    // If the registration code is unset, then by default the form should be editing
    setIsEditing(currentRegistrationData.code === '');
  }, [currentRegistrationData, setName, setRegistrationCode, setEmail, setSupporter]);

  // #endregion

  // Automatically adds slashes to the ends of the size letter sequences
  // useEffect(() => {
  //   if (
  //     !registrationCode.match(REGISTRATION_CODE_REGEX_STRING) &&
  //     registrationCode.match(REGISTRATION_CODE_INSERT_DASH_REGEX_STRING)
  //   ) {
  //     setRegistrationCode(registrationCode + '-');
  //   }
  // }, [registrationCode, setRegistrationCode]);

  // How much progress the form has made in saving registration data
  const [saveState, setSaveState] = useWebViewState('saveState', SaveState.HasNotSaved);
  const [error, setError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  // If the app just got done with restarting, then changes the save state to `HasSaved`
  useEffect(() => {
    if (saveState === SaveState.IsRestarting) {
      setSaveState(SaveState.HasSaved);
    }
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
    saveState === SaveState.HasSaved ||
    !isEditing;

  // whether various fields seem valid according to a quick check
  const isCodeValid = !!registrationCode.match(REGISTRATION_CODE_REGEX_STRING);
  const isContentValid = isCodeValid;

  // As the registration becomes the correct form, validates it with the backend
  const [registrationIsValid, isLoading] = usePromise(
    useCallback(async () => {
      if (isCodeValid && hasUnsavedChanges) {
        try {
          return papi.commands.sendCommand(
            'paratextRegistration.validateParatextRegistrationData',
            { name, code: registrationCode, email, supporterName: supporter },
          );
        } catch (err: unknown) {
          logger.warn(
            'An error occurred while validating paratext registration:',
            getErrorMessage(err),
          );
        }
      }
      return true;
    }, [registrationCode, hasUnsavedChanges]),
    true,
  );

  // If the registration code validation promise returns false, then indicates the error
  useEffect(() => {
    if (registrationIsValid && error) {
      setError('');
      setErrorDescription('');
    } else if (!registrationIsValid) {
      setError(localizedStrings['%paratextRegistration_alert_invalidRegistration%']);
      setErrorDescription(
        localizedStrings['%paratextRegistration_alert_invalidRegistration_description%'],
      );
    }
  }, [registrationIsValid]);

  const isButtonDisabled =
    isFormDisabled || !hasUnsavedChanges || !isContentValid || (!isLoading && !registrationIsValid);

  const formatSuccessAlertDescription = () => {
    if (saveState === SaveState.IsRestarting) {
      return localizedStrings['%paratextRegistration_alert_updatedRegistration_description%'];
    } else if (saveState === SaveState.HasSaved) {
      return localizedStrings[
        '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%'
      ];
    }
    return localizedStrings['%paratextRegistration_alert_validRegistration_description%'];
  };

  const cancelEditing = () => {
    setName(currentRegistrationData.name);
    setRegistrationCode(currentRegistrationData.code);
    setIsEditing(false);
  };

  const onRegistrationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newRegistrationCode = event.target.value;
    if (
      !newRegistrationCode.match(REGISTRATION_CODE_REGEX_STRING) &&
      newRegistrationCode.match(REGISTRATION_CODE_INSERT_DASH_REGEX_STRING) &&
      !registrationCode.endsWith('-')
    ) {
      newRegistrationCode += '-';
    }
    setRegistrationCode(newRegistrationCode);
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
              disabled={isFormDisabled}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span>{currentRegistrationData.name}</span>
          )}
          <span className={cn({ 'tw-font-semibold': !isEditing })}>
            {localizedStrings['%paratextRegistration_label_registrationCode%']}
          </span>
          {isEditing ? (
            <Input
              className="tw-font-mono tw-box-content tw-h-5 tw-max-w-[350px] invalid:tw-border-destructive"
              maxLength={REGISTRATION_CODE_LENGTH_WITH_DASHES}
              pattern={REGISTRATION_CODE_REGEX_STRING}
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
          {registrationCode && !isCodeValid && (
            <p className="tw-text-muted-foreground">
              {localizedStrings['%paratextRegistration_warning_invalid_registration_format%']}
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
            !isButtonDisabled) && (
            <Section className="tw-my-4">
              <Alert ref={scrollToRef}>
                <CircleCheck className="tw-h-4 tw-w-4" />
                <AlertTitle>
                  {saveState === SaveState.IsRestarting || saveState === SaveState.HasSaved
                    ? localizedStrings['%paratextRegistration_alert_updatedRegistration%']
                    : localizedStrings['%paratextRegistration_alert_validRegistration%']}
                </AlertTitle>
                <AlertDescription>{formatSuccessAlertDescription()}</AlertDescription>
              </Alert>
            </Section>
          )}
        {error && (
          <Section className="tw-my-4">
            <Alert ref={scrollToRef} variant="destructive">
              <AlertCircle className="tw-h-4 tw-w-4" />
              <AlertTitle>{error}</AlertTitle>
              <AlertDescription>{errorDescription}</AlertDescription>
            </Alert>
          </Section>
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
            <Button variant="default" onClick={() => setIsEditing(true)}>
              <PenIcon /> Change
            </Button>
          )}
        </Grid>
      </div>
    </div>
  );
}
