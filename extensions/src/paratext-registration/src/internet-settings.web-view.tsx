import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useData, useLocalizedStrings } from '@papi/frontend/react';
import { InternetSettings } from 'paratext-registration';
import { getErrorMessage, isPlatformError, wait } from 'platform-bible-utils';
import { useEffect, useRef, useState } from 'react';
import { INTERNET_SETTINGS_STRING_KEYS, InternetSettingsForm } from './internet-settings.component';
import { SaveState } from './utils';

/** Time in milliseconds to wait before restarting the application after changing internet settings. */
const INTERNET_SETTINGS_RESTART_DELAY_MS = 5 * 1000;

const INTERNET_SETTINGS_DATA_PROVIDER = 'paratextRegistration.internetSettingsDataProvider';

// Intentionally duplicated in the first-run wizard (internet-settings-step.component.tsx): the two
// consumers sit on opposite sides of the core/extension boundary and `paratext-registration` is a
// types-only module, so there is no shared runtime module to hoist this into.
const DEFAULT_INTERNET_SETTINGS: InternetSettings = {
  permittedInternetUse: 'VpnRequired',
  selectedServer: 'Production',
  proxyPort: 0,
};

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
    DEFAULT_INTERNET_SETTINGS,
  );

  // Last-persisted settings from PAPI: undefined while the fetch is in flight.
  const [savedInternetSettings, setSavedInternetSettings] = useState<
    InternetSettings | undefined
  >();

  const [dpValue, setData, isLoadingSettings] = useData(
    INTERNET_SETTINGS_DATA_PROVIDER,
  ).InternetSettings(undefined, DEFAULT_INTERNET_SETTINGS);

  // Once the staged draft + saved baseline have been synced from the first successful read.
  const hasSyncedFetch = useRef(false);

  // `setData` is undefined until the provider resolves, so it doubles as the readiness signal (no
  // separate useDataProvider needed). While unresolved or the first read is in flight, defer. On a
  // load error, surface it via saveError. Otherwise sync the staged draft AND the saved baseline
  // exactly once: this is a stage-then-commit dialog, so the Reset target and dirty-state must stay
  // anchored to what was loaded (or last saved locally, via handleSaveAndRestart) rather than
  // shifting under the user when another window changes settings via a live provider push.
  useEffect(() => {
    if (!setData || isLoadingSettings) return;
    if (isPlatformError(dpValue)) {
      if (isMounted.current) setSaveError(getErrorMessage(dpValue));
      return;
    }
    if (!hasSyncedFetch.current) {
      hasSyncedFetch.current = true;
      setInternetSettings(dpValue);
      setSavedInternetSettings(dpValue);
    }
  }, [setData, isLoadingSettings, dpValue, setInternetSettings]);

  const isFormDisabled =
    savedInternetSettings === undefined ||
    saveState === SaveState.IsSaving ||
    saveState === SaveState.IsRestarting;

  const handleSaveAndRestart = async () => {
    if (!setData) {
      // Defensive: the Save button is disabled (isFormDisabled) until the provider is ready, so this
      // is unreachable via the UI. Bail without restarting or marking saved rather than persisting
      // nothing; log for the theoretical programmatic caller.
      logger.warn('Internet settings provider unavailable; ignoring Save and restart.');
      setSaveState(SaveState.HasNotSaved);
      return;
    }
    setSaveState(SaveState.IsSaving);
    setSaveError('');
    try {
      await setData(internetSettings);
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
