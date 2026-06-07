import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { InternetSettings } from 'paratext-registration';
import { usePromise } from 'platform-bible-react';
import { deepEqual, getErrorMessage, wait } from 'platform-bible-utils';
import { useEffect, useRef, useState } from 'react';
import { SaveState } from './utils';
import { INTERNET_SETTINGS_STRING_KEYS, InternetSettingsForm } from './internet-settings.component';

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

  const [localizedStrings] = useLocalizedStrings(INTERNET_SETTINGS_STRING_KEYS);

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
        } catch {
          logger.warn(
            `Failed to restart after saving Internet settings! The user will need to restart manually`,
          );
        }
      })();

      if (isMounted.current) setSaveState(SaveState.IsRestarting);
    } catch (err: unknown) {
      logger.warn(`Failed to save Internet settings ${err}`);

      const errMessage = getErrorMessage(err);
      setSaveError(errMessage);
      setSaveState(SaveState.HasNotSaved);
    }
  };

  return (
    <InternetSettingsForm
      localizedStrings={localizedStrings}
      internetSettings={internetSettings}
      onInternetSettingsChange={setInternetSettings}
      isFormDisabled={isFormDisabled}
      isSaveDisabled={isButtonDisabled}
      saveState={saveState}
      saveError={saveError}
      onSaveAndRestart={saveAndRestart}
    />
  );
};
