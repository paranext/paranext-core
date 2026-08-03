import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { InternetSettings } from 'paratext-registration';
import { usePromise } from 'platform-bible-react';
import { getErrorMessage, wait } from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';
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

// Run once per renderer-process session. Ensures the post-restart detection in the mount
// effect does not misfire when the panel is reopened while a restart countdown is in progress.
let hasRunStartupRestartCheck = false;

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
  // The module-level flag ensures this fires exactly once per renderer session, not on every
  // panel reopen (e.g. the user closes and reopens the panel during the countdown window).
  useEffect(() => {
    if (!hasRunStartupRestartCheck) {
      hasRunStartupRestartCheck = true;
      if (saveState === SaveState.IsRestarting) setSaveState(SaveState.HasSaved);
    }
    // Intentionally empty deps: the module-level guard makes the check run once per session.
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

  // Stable wrapper so usePromise fires exactly once. Catches PAPI command errors and surfaces
  // them via saveError so the user sees an actionable message instead of a silent locked form.
  const getInternetSettingsSafe = useCallback(async () => {
    try {
      return await getInternetSettings();
    } catch (err: unknown) {
      if (isMounted.current) setSaveError(getErrorMessage(err));
      return undefined;
    }
  }, []); // stable: isMounted is a ref, setSaveError is a useState setter, getInternetSettings is module-level

  // Fetch current settings from PAPI on mount; undefined until resolved or on error.
  const [fetchedInternetSettings] = usePromise(getInternetSettingsSafe, undefined);

  // Guard against overwriting an in-progress user edit if the callback were ever replaced.
  const hasSyncedFetch = useRef(false);

  // When fetch resolves, update both staged and saved baselines.
  useEffect(() => {
    if (fetchedInternetSettings === undefined) return;
    if (!hasSyncedFetch.current) {
      hasSyncedFetch.current = true;
      setInternetSettings(fetchedInternetSettings);
    }
    setSavedInternetSettings(fetchedInternetSettings);
  }, [fetchedInternetSettings, setInternetSettings]);

  const isFormDisabled =
    savedInternetSettings === undefined ||
    saveState === SaveState.IsSaving ||
    saveState === SaveState.IsRestarting;

  const handleSaveAndRestart = async () => {
    setSaveState(SaveState.IsSaving);
    setSaveError('');
    try {
      await saveInternetSettings(internetSettings);
      // Update the saved baseline so Reset reflects the just-persisted state.
      if (isMounted.current) setSavedInternetSettings(internetSettings);
      // Queue restart asynchronously so the UI can update first.
      (async () => {
        try {
          await wait(INTERNET_SETTINGS_RESTART_DELAY_MS);
          // Guard: if the panel was closed before the timer fired, skip restart.
          if (isMounted.current) await papi.commands.sendCommand('platform.restart');
        } catch (err: unknown) {
          logger.warn(
            'Failed to restart after saving Internet settings! The user will need to restart manually.',
          );
          if (isMounted.current) {
            setSaveError(getErrorMessage(err));
            setSaveState(SaveState.HasNotSaved);
          }
        }
      })();
      if (isMounted.current) setSaveState(SaveState.IsRestarting);
    } catch (err: unknown) {
      logger.warn(`Failed to save Internet settings: ${getErrorMessage(err)}`);
      if (isMounted.current) {
        setSaveError(getErrorMessage(err));
        setSaveState(SaveState.HasNotSaved);
      }
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
