import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { InternetSettings, InternetUse, ServerType } from 'paratext-registration';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
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
import { useEffect, useRef, useState } from 'react';
import { AlertCircle, CircleCheck } from 'lucide-react';
import { Grid } from './components/grid.component';
import { scrollToRef, SaveState } from './utils';

const SAVE_SETTINGS_DELAY_MS = 1000;

const SERVER_TYPE_OPTIONS: ServerType[] = ['Production', 'QualityAssurance', 'Development', 'Test'];
const INTERNET_USE_OPTIONS: InternetUse[] = ['Enabled', 'VpnRequired', 'Disabled', 'ProxyOnly'];
// For some reason, these aren't an enum in C#. So just following the existing conventions. Maybe
// there can be other values, but let's just keep it to these for now.
// InternetAccess.httpProxyMode, InternetAccess.socksProxyMode
const PROXY_MODE_OPTIONS = ['Http', 'Socks'];

/**
 * Time in milliseconds to wait before restarting the application after changing Paratext
 * registration information
 */
const INTERNET_SETTINGS_RESTART_DELAY_MS = 5 * 1000;

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
  '%paratextRegistration_button_saveAndRestart%',
  '%paratextRegistration_button_restarting%',
  '%paratextRegistration_description_internetUse_disclaimer%',
  ...INTERNET_USE_OPTIONS.map(getLocalizeKeyForInternetUse),
  '%paratextRegistration_label_proxyHost%',
  '%paratextRegistration_label_proxyMode%',
  ...PROXY_MODE_OPTIONS.map(getLocalizeKeyForProxyMode),
  '%paratextRegistration_label_proxyPassword%',
  '%paratextRegistration_label_proxyPort%',
  '%paratextRegistration_label_proxyUsername%',
  '%paratextRegistration_label_selectedServer%',
  ...SERVER_TYPE_OPTIONS.map(getLocalizeKeyForServerType),
  '%paratextRegistration_section_internetSettings%',
  '%paratextRegistration_section_internetSettings_tooltip%',
  '%paratextRegistration_section_proxySettings%',
  '%paratextRegistration_alert_updatedRegistration%',
  '%paratextRegistration_alert_updatedRegistration_description%',
  '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%',
];

// #endregion

globalThis.webViewComponent = function InternetSettingsComponent({
  useWebViewState,
}: WebViewProps) {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // How much progress the form has made in saving registration data
  const [saveState, setSaveState] = useWebViewState(
    'internetSettingsSaveState',
    SaveState.HasNotSaved,
  );
  const [saveError, setSaveError] = useState('');

  // If the app just got done with restarting, then changes the save state to `HasSaved`
  useEffect(() => {
    if (saveState === SaveState.IsRestarting) {
      setSaveState(SaveState.HasSaved);
    }
    // This hook needs to only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // #region InternetSettings

  const [internetSettings, setInternetSettings] = useWebViewState<InternetSettings>(
    'internetSettings',
    {
      permittedInternetUse: 'VpnRequired',
      selectedServer: 'Production',
      proxyPort: 0,
    },
  );

  const [fetchedInternetSettings, isLoadingCurrentInternetSettings] = usePromise(
    getInternetSettings,
    internetSettings,
  );
  const [currentInternetSettings, setCurrentInternetSettings] = useState<
    InternetSettings | undefined
  >();

  // Set the form to show the current internet settings when we receive it
  useEffect(() => {
    setInternetSettings(fetchedInternetSettings);
    setCurrentInternetSettings(fetchedInternetSettings);
  }, [fetchedInternetSettings, setCurrentInternetSettings, setInternetSettings]);

  // #endregion

  // Whether you should be able to type into the form
  const isFormDisabled = isLoadingCurrentInternetSettings || saveState === SaveState.IsSaving;

  const isProxyHostValid =
    internetSettings.permittedInternetUse !== 'ProxyOnly' || !!internetSettings.proxyHost;

  const hasUnsavedChanges = !deepEqual(currentInternetSettings, internetSettings);

  const isButtonDisabled =
    isFormDisabled ||
    isLoadingCurrentInternetSettings ||
    !hasUnsavedChanges ||
    !isProxyHostValid ||
    saveState === SaveState.IsRestarting;

  const saveAndRestart = async () => {
    if (!hasUnsavedChanges) return;

    setSaveState(SaveState.IsSaving);
    setSaveError('');

    try {
      await saveInternetSettings(internetSettings);
      // Queue up the restart
      (async () => {
        try {
          await wait(INTERNET_SETTINGS_RESTART_DELAY_MS);
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
      setSaveError(errMessage);
      setSaveState(SaveState.HasNotSaved);
    }
  };

  // Hook to try to update the internet settings as they change
  // useEffect(() => {
  //   // If the settings are able to be updated
  //   if (
  //     !isFormDisabled &&
  //     !isLoadingCurrentInternetSettings &&
  //     hasUnsavedChanges &&
  //     isProxyHostValid
  //   ) {
  //     // If there is an existing timeout, cancels that timeout
  //     if (saveTimeout) {
  //       clearTimeout(saveTimeout.current);
  //     }

  //     // Starts the save settings timeout
  //     const newSaveTimeout = setTimeout(async () => {
  //       try {
  //         setSaveState(SaveState.IsSaving);
  //         setSaveError('');
  //         await saveInternetSettings(internetSettings);

  //         if (isMounted.current) {
  //           setCurrentInternetSettings(internetSettings);
  //           setSaveState(SaveState.HasSaved);
  //         }

  //         papi.notifications.send({
  //           severity: 'info',
  //           message: '%paratextRegistration_alert_updatedInternetSettings%',
  //         });
  //       } catch (err: unknown) {
  //         logger.warn(`Failed to save Paratext Registration information ${err}`);
  //         setSaveError(getErrorMessage(err));
  //         setSaveState(SaveState.HasNotSaved);
  //       }

  //       saveTimeout.current = undefined;
  //     }, SAVE_SETTINGS_DELAY_MS);
  //     saveTimeout.current = newSaveTimeout;
  //   }

  //   // If the component unmounts early, clears the timeout if it exists
  //   return () => {
  //     if (saveTimeout) {
  //       clearTimeout(saveTimeout.current);
  //     }
  //   };
  // }, [
  //   isLoadingCurrentInternetSettings,
  //   internetSettings,
  //   hasUnsavedChanges,
  //   isFormDisabled,
  //   isProxyHostValid,
  //   saveTimeout,
  // ]);

  const formatSuccessAlertDescription = () => {
    if (saveState === SaveState.IsRestarting) {
      return localizedStrings['%paratextRegistration_alert_updatedRegistration_description%'];
    }

    return localizedStrings[
      '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%'
    ];
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-2 tw-h-screen tw-p-4">
      <div className="tw-m-2">
        {localizedStrings['%paratextRegistration_description_internetUse_disclaimer%']}
      </div>
      <div className="tw-m-2">
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
          <SelectContent>
            {INTERNET_USE_OPTIONS.map((internetUseOption) => (
              <SelectItem key={internetUseOption} value={internetUseOption}>
                {localizedStrings[getLocalizeKeyForInternetUse(internetUseOption)]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
                <SelectContent>
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
          <SelectContent>
            {SERVER_TYPE_OPTIONS.map((serverTypeOption) => (
              <SelectItem key={serverTypeOption} value={serverTypeOption}>
                {localizedStrings[getLocalizeKeyForServerType(serverTypeOption)]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Grid>
      <div>
        {!saveError &&
          (saveState === SaveState.IsRestarting || saveState === SaveState.HasSaved) && (
            <div className="tw-mx-2 tw-my-4">
              <Alert ref={scrollToRef}>
                <CircleCheck className="tw-h-4 tw-w-4" />
                <AlertTitle>
                  {localizedStrings['%paratextRegistration_alert_updatedRegistration%']}
                </AlertTitle>
                <AlertDescription>{formatSuccessAlertDescription()}</AlertDescription>
              </Alert>
            </div>
          )}
        {saveError && (
          <div className="tw-mx-2 tw-my-4">
            <Alert ref={scrollToRef} variant="destructive">
              <AlertCircle className="tw-h-4 tw-w-4" />
              <AlertTitle>{localizedStrings['%general_error_title%']}</AlertTitle>
              <AlertDescription>{saveError}</AlertDescription>
            </Alert>
          </div>
        )}
        <Grid className="tw-grid-cols-[1fr_auto] tw-items-end">
          <span />
          <Button variant="default" disabled={isButtonDisabled} onClick={saveAndRestart}>
            {saveState === SaveState.IsRestarting ? (
              <>
                <Spinner /> {localizedStrings['%paratextRegistration_button_restarting%']}
              </>
            ) : (
              localizedStrings['%paratextRegistration_button_saveAndRestart%']
            )}
          </Button>
        </Grid>
      </div>
    </div>
  );
};
