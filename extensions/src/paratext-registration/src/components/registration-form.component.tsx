import { UseWebViewStateHook } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Spinner,
  usePromise,
} from 'platform-bible-react';
import { getErrorMessage, LocalizeKey, wait } from 'platform-bible-utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SaveState, scrollToRef } from '../utils/helpers';
import { Grid } from './grid.component';
import { Section } from './section.component';
import { AlertCircle, CircleCheck } from 'lucide-react';

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
  '%paratextRegistration_alert_updatedRegistration%',
  '%paratextRegistration_alert_updatedRegistration_description%',
  '%paratextRegistration_button_saveAndRestart%',
  '%paratextRegistration_label_emailAddress%',
  '%paratextRegistration_label_registrationCode%',
  '%paratextRegistration_label_registrationName%',
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
  }, [currentRegistrationData, setName, setRegistrationCode, setEmail, setSupporter]);

  // Automatically adds slashes to the ends of the size letter sequences
  useEffect(() => {
    if (
      !registrationCode.match(REGISTRATION_CODE_REGEX_STRING) &&
      registrationCode.match(REGISTRATION_CODE_INSERT_DASH_REGEX_STRING)
    ) {
      setRegistrationCode(registrationCode + '-');
    }
  }, [registrationCode, setRegistrationCode]);

  // #endregion

  // How much progress the form has made in saving registration data
  const [saveState, setSaveState] = useState(SaveState.HasNotSaved);
  const [saveError, setSaveError] = useState('');

  // whether any form fields have changed
  const hasUnsavedChanges =
    currentRegistrationData.name !== name ||
    currentRegistrationData.code !== registrationCode ||
    currentRegistrationData.email !== email ||
    currentRegistrationData.supporterName !== supporter;

  const saveAndRestart = async () => {
    setSaveState(SaveState.IsSaving);
    setSaveError('');

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

      if (isMounted.current) setSaveState(SaveState.HasSaved);
    } catch (err: unknown) {
      logger.warn(`Failed to save Paratext Registration information ${err}`);
      setSaveError(getErrorMessage(err));
      setSaveState(SaveState.HasNotSaved);
    }
  };

  // Whether you should be able to type into the form
  const isFormDisabled =
    isLoadingCurrentRegistrationData ||
    saveState === SaveState.IsSaving ||
    saveState === SaveState.HasSaved;

  // whether various fields seem valid according to a quick check
  const isCodeValid = !!registrationCode.match(REGISTRATION_CODE_REGEX_STRING);
  const isContentValid = isCodeValid;

  return (
    <>
      <div>
        <Grid>
          <span>{localizedStrings['%paratextRegistration_label_registrationName%']}</span>
          <Input value={name} disabled={isFormDisabled} onChange={(e) => setName(e.target.value)} />
          <span>{localizedStrings['%paratextRegistration_label_registrationCode%']}</span>
          <Input
            className="tw-font-mono tw-max-w-[34ch] tw-box-content tw-h-6 invalid:tw-border-destructive"
            maxLength={REGISTRATION_CODE_LENGTH_WITH_DASHES}
            pattern={REGISTRATION_CODE_REGEX_STRING}
            required
            value={registrationCode}
            disabled={isFormDisabled}
            onChange={(e) => setRegistrationCode(e.target.value)}
          />
        </Grid>
        {/* UX said to remove supporter info until we are using it in P10S. Leaving here for uncommenting when the time is right */}
        {/* <Section>Please specify who provides Paratext support to you:</Section>
          <Grid className="tw-mt-8">
            <span>Supporter name</span>
            <Input value={supporter} disabled={isFormDisabled} onChange={(e) => setSupporter(e.target.value)} />
          </Grid> */}
      </div>
      <div>
        {saveState === SaveState.HasSaved && (
          <Section className="tw-my-4">
            <Alert ref={scrollToRef}>
              <CircleCheck className="tw-h-4 tw-w-4" />
              <AlertTitle>
                {localizedStrings['%paratextRegistration_alert_updatedRegistration%']}
              </AlertTitle>
              <AlertDescription>
                {localizedStrings['%paratextRegistration_alert_updatedRegistration_description%']}
              </AlertDescription>
            </Alert>
          </Section>
        )}
        {saveError && (
          <Section className="tw-my-4">
            <Alert ref={scrollToRef} variant="destructive">
              <AlertCircle className="tw-h-4 tw-w-4" />
              <AlertTitle>{localizedStrings['%general_error_title%']}</AlertTitle>
              <AlertDescription>{saveError}</AlertDescription>
            </Alert>
          </Section>
        )}
        <Grid className="tw-grid-cols-[1fr_auto] tw-items-end">
          <span />
          <Button
            variant="destructive"
            disabled={isFormDisabled || !hasUnsavedChanges || !isContentValid}
            onClick={saveAndRestart}
          >
            {saveState === SaveState.IsSaving ? (
              <Spinner />
            ) : (
              localizedStrings['%paratextRegistration_button_saveAndRestart%']
            )}
          </Button>
        </Grid>
      </div>
    </>
  );
}
