import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { InternetSettings } from 'paratext-registration';
import { usePromise } from 'platform-bible-react';
import { getErrorMessage, wait } from 'platform-bible-utils';
import { useEffect, useRef, useState } from 'react';
import { INTERNET_SETTINGS_STRING_KEYS, InternetSettingsForm } from './internet-settings.component';
import { SaveState } from './utils';

/** Time in milliseconds to wait before restarting the application after changing internet settings. */
const INTERNET_SETTINGS_RESTART_DELAY_MS = 5 * 1000;

// #region PAPI helpers

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

  const [saveState, setSaveState] = useWebViewState(
    'internetSettingsSaveState',
    SaveState.HasNotSaved,
  );
  const [saveError, setSaveError] = useState('');

  // If the app just finished restarting, transition from IsRestarting to HasSaved.
  useEffect(() => {
    if (saveState === SaveState.IsRestarting) setSaveState(SaveState.HasSaved);
    // This hook must only run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Staged settings: what the user has edited in the form (persisted in web view state).
  const [internetSettings, setInternetSettings] = useWebViewState<InternetSettings>(
    'internetSettings',
    { permittedInternetUse: 'VpnRequired', selectedServer: 'Production', proxyPort: 0 },
  );

  // Last-persisted settings from PAPI: undefined while the fetch is in flight.
  const [savedInternetSettings, setSavedInternetSettings] = useState<
    InternetSettings | undefined
  >();

  // Fetch current settings from PAPI on mount; undefined until resolved.
  const [fetchedInternetSettings] = usePromise(getInternetSettings, undefined);

  // When fetch resolves, update both staged and saved baselines.
  useEffect(() => {
    if (fetchedInternetSettings === undefined) return;
    setInternetSettings(fetchedInternetSettings);
    setSavedInternetSettings(fetchedInternetSettings);
  }, [fetchedInternetSettings, setInternetSettings]);

  const isFormDisabled = savedInternetSettings === undefined || saveState === SaveState.IsSaving;

  const handleSaveAndRestart = async () => {
    setSaveState(SaveState.IsSaving);
    setSaveError('');
    try {
      await saveInternetSettings(internetSettings);
      // Update the saved baseline so Reset reflects the just-persisted state.
      setSavedInternetSettings(internetSettings);
      // Queue restart asynchronously so the UI can update first.
      (async () => {
        try {
          await wait(INTERNET_SETTINGS_RESTART_DELAY_MS);
          await papi.commands.sendCommand('platform.restart');
        } catch {
          logger.warn(
            'Failed to restart after saving Internet settings! The user will need to restart manually.',
          );
        }
      })();
      if (isMounted.current) setSaveState(SaveState.IsRestarting);
    } catch (err: unknown) {
      logger.warn(`Failed to save Internet settings ${err}`);
      setSaveError(getErrorMessage(err));
      setSaveState(SaveState.HasNotSaved);
    }
  };

  return (
    <InternetSettingsForm
      localizedStrings={localizedStrings}
      internetSettings={internetSettings}
      savedInternetSettings={savedInternetSettings}
      onInternetSettingsChange={setInternetSettings}
      isFormDisabled={isFormDisabled}
      saveState={saveState}
      saveError={saveError}
      onSaveAndRestart={handleSaveAndRestart}
    />
  );
};
