import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { AlertCircle, CircleCheck } from 'lucide-react';
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
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';

type GenericComponentProps = PropsWithChildren<{ className?: string }>;

/** Representation of whether the user has saved changes */
enum SaveState {
  HasNotSaved,
  IsSaving,
  HasSaved,
}

const REGISTRATION_CODE_LENGTH_WITH_DASHES = 34;
const REGISTRATION_CODE_REGEX_STRING =
  '^(?:[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}-[a-zA-Z0-9]{6}|\\*{6}-\\*{6}-\\*{6}-\\*{6}-\\*{6})$';
const EMAIL_REGEX_STRING = '^.+@.+\\..+$';

/** Just a div with some margins to give some space around parts of the web view */
function Section({ children, className }: GenericComponentProps) {
  return <div className={cn('tw-m-2', className)}>{children}</div>;
}

/** Two-column grid layout div */
function Grid({ children, className }: GenericComponentProps) {
  return (
    <div
      className={cn(
        'tw-grid tw-grid-cols-[1fr_2fr] max-[300px]:tw-grid-cols-1 tw-gap-2 tw-items-center [&>*:nth-child(odd)]:tw-justify-self-end',
        className,
      )}
    >
      {children}
    </div>
  );
}

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

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%general_error_title%',
  '%paratextRegistration_alert_updatedRegistration%',
  '%paratextRegistration_alert_updatedRegistration_description%',
  '%paratextRegistration_button_saveAndRestart%',
  '%paratextRegistration_label_registrationName%',
  '%paratextRegistration_label_registrationCode%',
  '%paratextRegistration_label_emailAddress%',
];

globalThis.webViewComponent = function ParatextRegistration({ useWebViewState }: WebViewProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

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

  // How much progress the form has made in saving registration data
  const [saveState, setSaveState] = useState(SaveState.HasNotSaved);
  const [saveError, setSaveError] = useState('');

  const saveAndRestart = async () => {
    setSaveState(SaveState.IsSaving);
    setSaveError('');

    try {
      await saveRegistrationInformation(name, registrationCode, email, supporter);
      setSaveState(SaveState.HasSaved);
    } catch (e) {
      logger.warn(`Failed to save Paratext Registration information! ${e}`);
      if (isMounted) {
        setSaveError(getErrorMessage(e));
        setSaveState(SaveState.HasNotSaved);
      }
    }
  };

  // Whether you should be able to type into the form
  const isFormDisabled =
    isLoadingCurrentRegistrationData ||
    saveState === SaveState.IsSaving ||
    saveState === SaveState.HasSaved;
  // whether any form fields have changed
  const hasUnsavedChanges =
    currentRegistrationData.name !== name ||
    currentRegistrationData.code !== registrationCode ||
    currentRegistrationData.email !== email ||
    currentRegistrationData.supporterName !== supporter;
  // whether the code and email seem valid according to a quick check
  const isCodeValid = !!registrationCode.match(REGISTRATION_CODE_REGEX_STRING);
  const isEmailValid = !!email.match(EMAIL_REGEX_STRING);

  return (
    <div className="tw-p-2 tw-flex tw-flex-col tw-justify-between tw-h-screen">
      <div>
        <Section>
          <Grid>
            <span>{localizedStrings['%paratextRegistration_label_registrationName%']}</span>
            <Input
              value={name}
              disabled={isFormDisabled}
              onChange={(e) => setName(e.target.value)}
            />
            <span>{localizedStrings['%paratextRegistration_label_registrationCode%']}</span>
            <Input
              className="tw-font-mono tw-max-w-[34ch] tw-box-content tw-h-6 invalid:tw-border-destructive"
              maxLength={REGISTRATION_CODE_LENGTH_WITH_DASHES}
              pattern={REGISTRATION_CODE_REGEX_STRING}
              value={registrationCode}
              disabled={isFormDisabled}
              onChange={(e) => setRegistrationCode(e.target.value)}
            />
            <span>{localizedStrings['%paratextRegistration_label_emailAddress%']}</span>
            <Input
              className="invalid:tw-border-destructive"
              pattern={EMAIL_REGEX_STRING}
              value={email}
              disabled={isFormDisabled}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Section>
        {/* UX said to remove supporter info until we are using it in P10S. Leaving here for uncommenting when the time is right */}
        {/* <Section>Please specify who provides Paratext support to you:</Section>
        <Section className="tw-mt-8">
          <Grid>
            <span>Supporter name</span>
            <Input value={supporter} disabled={isFormDisabled} onChange={(e) => setSupporter(e.target.value)} />
          </Grid>
        </Section> */}
      </div>
      <Section>
        {saveState === SaveState.HasSaved && (
          <Section className="tw-my-4">
            <Alert>
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
            <Alert variant="destructive">
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
            disabled={isFormDisabled || !hasUnsavedChanges || !isCodeValid || !isEmailValid}
            onClick={saveAndRestart}
          >
            {saveState === SaveState.IsSaving ? (
              <Spinner />
            ) : (
              localizedStrings['%paratextRegistration_button_saveAndRestart%']
            )}
          </Button>
        </Grid>
      </Section>
    </div>
  );
};
