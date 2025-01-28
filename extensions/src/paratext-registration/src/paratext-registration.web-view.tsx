import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { AlertCircle, ChevronDown, CircleCheck } from 'lucide-react';
import { InternetSettings, InternetUse, ServerType } from 'paratext-registration';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
  cn,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  usePromise,
} from 'platform-bible-react';
import { deepEqual, getErrorMessage, LocalizeKey, wait } from 'platform-bible-utils';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';

type GenericComponentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

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
/**
 * Time in milliseconds to wait before restarting the application after changing Paratext
 * registration information
 */
const REGISTRATION_CHANGE_RESTART_DELAY_MS = 5 * 1000;

const SERVER_TYPE_OPTIONS: ServerType[] = ['Production', 'QualityAssurance', 'Development', 'Test'];
const INTERNET_USE_OPTIONS: InternetUse[] = ['Enabled', 'VpnRequired', 'Disabled', 'ProxyOnly'];
// For some reason, these aren't an enum in C#. So just following the existing conventions. Maybe
// there can be other values, but let's just keep it to these for now.
// InternetAccess.httpProxyMode, InternetAccess.socksProxyMode
const PROXY_MODE_OPTIONS = ['Http', 'Socks'];

// #region helper components

/** Just a div with some margins to give some space around parts of the web view */
function Section({ children, className, title, ...props }: GenericComponentProps) {
  return (
    // Making a wrapper component and passing all props down
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cn('tw-m-2', className)} title={title} {...props}>
      {children}
    </div>
  );
}

/** Two-column grid layout div */
function Grid({ children, className, title, ...props }: GenericComponentProps) {
  return (
    <Section
      className={cn(
        'tw-grid tw-grid-cols-[1fr_2fr] max-[300px]:tw-grid-cols-1 tw-gap-2 tw-items-center [&>*:nth-child(odd)]:min-[300px]:tw-justify-self-end',
        className,
      )}
      title={title}
      {...props}
    >
      {children}
    </Section>
  );
}

// #endregion

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

// #region InternetSettings functions

async function getInternetSettings() {
  return papi.commands.sendCommand('paratextRegistration.getParatextDataInternetSettings');
}

async function saveInternetSettings(internetSettings: InternetSettings) {
  return papi.commands.sendCommand(
    'paratextRegistration.setParatextDataInternetSettings',
    internetSettings,
  );
}

// #endregion

// #region other functions

function scrollToRef(ref: HTMLElement | null) {
  ref?.scrollIntoView({
    block: 'nearest',
    inline: 'nearest',
  });
}

// #endregion

// #region localized strings

function getLocalizeKeyForInternetUse(option: InternetUse): LocalizeKey {
  return `%paratextRegistration_description_internetUse_option_${option}%`;
}

function getLocalizeKeyForServerType(option: ServerType): LocalizeKey {
  return `%paratextRegistration_label_serverType_option_${option}%`;
}

function getLocalizeKeyForProxyMode(option: string): LocalizeKey {
  return `%paratextRegistration_label_proxyMode_option_${option}%`;
}

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%general_error_title%',
  '%paratextRegistration_alert_updatedRegistration%',
  '%paratextRegistration_alert_updatedRegistration_description%',
  '%paratextRegistration_button_saveAndRestart%',
  '%paratextRegistration_description_internetUse_disclaimer%',
  ...INTERNET_USE_OPTIONS.map(getLocalizeKeyForInternetUse),
  '%paratextRegistration_description_shared_with_paratext_9%',
  '%paratextRegistration_label_emailAddress%',
  '%paratextRegistration_label_proxyHost%',
  '%paratextRegistration_label_proxyMode%',
  ...PROXY_MODE_OPTIONS.map(getLocalizeKeyForProxyMode),
  '%paratextRegistration_label_proxyPassword%',
  '%paratextRegistration_label_proxyPort%',
  '%paratextRegistration_label_proxyUsername%',
  '%paratextRegistration_label_registrationCode%',
  '%paratextRegistration_label_registrationName%',
  '%paratextRegistration_label_selectedServer%',
  ...SERVER_TYPE_OPTIONS.map(getLocalizeKeyForServerType),
  '%paratextRegistration_section_internetSettings%',
  '%paratextRegistration_section_internetSettings_tooltip%',
  '%paratextRegistration_section_proxySettings%',
];

// #endregion

globalThis.webViewComponent = function ParatextRegistration({ useWebViewState }: WebViewProps) {
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

  // #endregion

  // #region InternetSettings

  const [isInternetSettingsOpen, setIsInternetSettingsOpen] = useWebViewState(
    'isInternetSettingsOpen',
    false,
  );
  const [internetSettings, setInternetSettings] = useWebViewState<InternetSettings>(
    'internetSettings',
    {
      permittedInternetUse: 'VpnRequired',
      selectedServer: 'Production',
      proxyPort: 0,
    },
  );

  const [currentInternetSettings, isLoadingCurrentInternetSettings] = usePromise(
    getInternetSettings,
    internetSettings,
  );

  // Set the form to show the current internet settings when we receive it
  useEffect(() => {
    setInternetSettings(currentInternetSettings);
  }, [currentInternetSettings, setInternetSettings]);

  // #endregion

  // How much progress the form has made in saving registration data and internet settings
  const [saveState, setSaveState] = useState(SaveState.HasNotSaved);
  const [saveError, setSaveError] = useState('');

  const hasUnsavedRegistrationDataChanges =
    currentRegistrationData.name !== name ||
    currentRegistrationData.code !== registrationCode ||
    currentRegistrationData.email !== email ||
    currentRegistrationData.supporterName !== supporter;
  const hasUnsavedInternetSettingsChanges = !deepEqual(currentInternetSettings, internetSettings);
  // whether any form fields have changed
  const hasUnsavedChanges = hasUnsavedRegistrationDataChanges || hasUnsavedInternetSettingsChanges;

  const saveAndRestart = async () => {
    try {
      setSaveState(SaveState.IsSaving);
      setSaveError('');

      if (!hasUnsavedChanges) return;

      const savePromises = [];
      let internetSettingsIndex = -1;
      if (hasUnsavedInternetSettingsChanges) {
        savePromises.push(saveInternetSettings(internetSettings));
        internetSettingsIndex = 0;
      }
      if (hasUnsavedRegistrationDataChanges)
        savePromises.push(saveRegistrationInformation(name, registrationCode, email, supporter));

      const results = await Promise.allSettled(savePromises);
      // Filtering out the successful results, so all that's left is rejected
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const failedResults = results.filter((result, i) => {
        if (result.status !== 'rejected') return false;
        logger.warn(
          `Failed to save ${i === internetSettingsIndex ? 'Paratext Internet Settings' : 'Paratext Registration information'}! ${result.reason}`,
        );
        return true;
      }) as PromiseRejectedResult[];

      if (failedResults.length === 0) {
        // Queue up the restart
        (async () => {
          try {
            await wait(REGISTRATION_CHANGE_RESTART_DELAY_MS);
            await papi.commands.sendCommand('platform.restart');
          } catch (e) {
            logger.warn(
              `Failed to restart after saving Paratext registration information and internet settings! The user will need to restart manually`,
            );
          }
        })();

        if (isMounted.current) setSaveState(SaveState.HasSaved);
      } else if (isMounted.current) {
        setSaveError(failedResults.map((result) => getErrorMessage(result.reason)).join('\n\n'));
        setSaveState(SaveState.HasNotSaved);
      }
    } catch (e) {
      logger.warn(`Paratext registration web view failed to run saveAndRestart: ${e}`);
    }
  };

  // Whether you should be able to type into the form
  const isFormDisabled =
    isLoadingCurrentRegistrationData ||
    isLoadingCurrentInternetSettings ||
    saveState === SaveState.IsSaving ||
    saveState === SaveState.HasSaved;
  // whether various fields seem valid according to a quick check
  const isCodeValid = !!registrationCode.match(REGISTRATION_CODE_REGEX_STRING);
  const isEmailValid = !!email.match(EMAIL_REGEX_STRING);
  const isProxyHostValid =
    internetSettings.permittedInternetUse !== 'ProxyOnly' || !!internetSettings.proxyHost;

  const isContentValid = isCodeValid && isEmailValid && isProxyHostValid;

  return (
    <div className="tw-p-2 tw-flex tw-flex-col tw-justify-between tw-h-screen">
      <div>
        <div className="tw-ms-2 tw-text-sm tw-text-muted-foreground">
          {localizedStrings['%paratextRegistration_description_shared_with_paratext_9%']}
        </div>
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
          <span>{localizedStrings['%paratextRegistration_label_emailAddress%']}</span>
          <Input
            className="invalid:tw-border-destructive"
            pattern={EMAIL_REGEX_STRING}
            required
            value={email}
            disabled={isFormDisabled}
            onChange={(e) => setEmail(e.target.value)}
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
        <button
          type="button"
          className={cn('tw-flex tw-justify-between tw-text-muted-foreground tw-w-full tw-p-2', {
            'tw-text-foreground': isInternetSettingsOpen,
          })}
          title={localizedStrings['%paratextRegistration_section_internetSettings_tooltip%']}
          onClick={() => setIsInternetSettingsOpen(!isInternetSettingsOpen)}
        >
          <span>{localizedStrings['%paratextRegistration_section_internetSettings%']}</span>
          <ChevronDown
            className={cn('tw-transition-transform tw-duration-200', {
              'tw-rotate-90': !isInternetSettingsOpen,
            })}
          />
        </button>
        {isInternetSettingsOpen && (
          <>
            <Section className="tw-text-muted-foreground">
              {localizedStrings['%paratextRegistration_description_internetUse_disclaimer%']}
            </Section>
            <Section>
              <Select
                disabled={isFormDisabled}
                value={internetSettings.permittedInternetUse}
                onValueChange={(newInternetUse: InternetUse) =>
                  setInternetSettings({ ...internetSettings, permittedInternetUse: newInternetUse })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  // Need to get over the floating web view z-index 200
                  style={{ zIndex: 250 }}
                >
                  {INTERNET_USE_OPTIONS.map((internetUseOption) => (
                    <SelectItem key={internetUseOption} value={internetUseOption}>
                      {localizedStrings[getLocalizeKeyForInternetUse(internetUseOption)]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Section>
            {internetSettings.permittedInternetUse === 'ProxyOnly' && (
              <Card className="tw-m-2">
                <CardHeader>
                  {localizedStrings['%paratextRegistration_section_proxySettings%']}
                </CardHeader>
                <CardContent>
                  <Grid className="tw-m-0">
                    <span>{localizedStrings['%paratextRegistration_label_proxyMode%']}</span>
                    <Select
                      disabled={isFormDisabled}
                      value={internetSettings.proxyMode}
                      onValueChange={(newProxyMode: string) =>
                        setInternetSettings({ ...internetSettings, proxyMode: newProxyMode })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        // Need to get over the floating web view z-index 200
                        style={{ zIndex: 250 }}
                      >
                        {PROXY_MODE_OPTIONS.map((proxyModeOption) => (
                          <SelectItem key={proxyModeOption} value={proxyModeOption}>
                            {localizedStrings[getLocalizeKeyForProxyMode(proxyModeOption)]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>{localizedStrings['%paratextRegistration_label_proxyHost%']}</span>
                    <Input
                      className="invalid:tw-border-destructive"
                      minLength={1}
                      required
                      value={internetSettings.proxyHost}
                      disabled={isFormDisabled}
                      onChange={(e) =>
                        setInternetSettings({ ...internetSettings, proxyHost: e.target.value })
                      }
                    />
                    <span>{localizedStrings['%paratextRegistration_label_proxyPort%']}</span>
                    <Input
                      type="number"
                      value={internetSettings.proxyPort}
                      disabled={isFormDisabled}
                      onChange={(e) =>
                        setInternetSettings({
                          ...internetSettings,
                          proxyPort: e.target.value.length > 0 ? parseInt(e.target.value, 10) : 0,
                        })
                      }
                    />
                    <span>{localizedStrings['%paratextRegistration_label_proxyUsername%']}</span>
                    <Input
                      value={internetSettings.proxyUsername}
                      disabled={isFormDisabled}
                      onChange={(e) =>
                        setInternetSettings({ ...internetSettings, proxyUsername: e.target.value })
                      }
                    />
                    <span>{localizedStrings['%paratextRegistration_label_proxyPassword%']}</span>
                    <Input
                      type="password"
                      value={internetSettings.proxyPassword}
                      disabled={isFormDisabled}
                      onChange={(e) =>
                        setInternetSettings({ ...internetSettings, proxyPassword: e.target.value })
                      }
                    />
                  </Grid>
                </CardContent>
              </Card>
            )}
            <Grid>
              <span>{localizedStrings['%paratextRegistration_label_selectedServer%']}</span>
              <Select
                disabled={isFormDisabled}
                value={internetSettings.selectedServer}
                onValueChange={(newSelectedServer: ServerType) =>
                  setInternetSettings({ ...internetSettings, selectedServer: newSelectedServer })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  // Need to get over the floating web view z-index 200
                  style={{ zIndex: 250 }}
                >
                  {SERVER_TYPE_OPTIONS.map((serverTypeOption) => (
                    <SelectItem key={serverTypeOption} value={serverTypeOption}>
                      {localizedStrings[getLocalizeKeyForServerType(serverTypeOption)]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Grid>
          </>
        )}
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
    </div>
  );
};
