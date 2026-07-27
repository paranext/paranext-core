import type { InternetSettings } from 'paratext-registration';
import { Alert, AlertDescription, Button, Spinner } from 'platform-bible-react';
import {
  DeveloperSection,
  DEVELOPER_SECTION_STRING_KEYS,
  InternetAccessOptionList,
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
} from 'platform-bible-react/experimental';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { getErrorMessage, type LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FirstRunStepProps } from '../first-run-step-props.model';

const STRING_KEYS: LocalizeKey[] = [
  '%internetSettings_button_retry%',
  ...INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  ...DEVELOPER_SECTION_STRING_KEYS,
];

async function fetchInternetSettings() {
  return sendCommand('paratextRegistration.getParatextDataInternetSettings');
}

async function persistInternetSettings(settings: InternetSettings) {
  return sendCommand('paratextRegistration.setParatextDataInternetSettings', settings);
}

/**
 * First-run wizard step that lets the user configure internet access before registration. Saves
 * immediately on each selection change (immediate-apply model). The identify step's restart applies
 * the chosen setting — no second restart is needed here.
 *
 * Save concurrency: only one save is in flight at a time. A second selection while a save is
 * pending is ignored (the control is disabled). This prevents out-of-order saves from leaving
 * persisted state inconsistent with the displayed state.
 */
export function InternetSettingsStep({ setCanProceed }: FirstRunStepProps) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);
  const [settings, setSettings] = useState<InternetSettings | undefined>();
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setCanProceed?.(false);
    setLoadError('');
    try {
      const loaded = await fetchInternetSettings();
      if (!isMounted.current) return;
      setSettings(loaded);
      setCanProceed?.(true);
    } catch (err: unknown) {
      if (!isMounted.current) return;
      setLoadError(getErrorMessage(err));
    }
  }, [setCanProceed]);

  useEffect(() => {
    load();
  }, [load]);

  const handleChange = useCallback(
    async (next: InternetSettings) => {
      if (isSaving) return;
      setSettings(next);
      setSaveError('');
      setIsSaving(true);
      setCanProceed?.(false);
      try {
        await persistInternetSettings(next);
        if (!isMounted.current) return;
        setIsSaving(false);
        setCanProceed?.(true);
      } catch (err: unknown) {
        if (!isMounted.current) return;
        setIsSaving(false);
        setSaveError(getErrorMessage(err));
        setCanProceed?.(false);
      }
    },
    [setCanProceed, isSaving],
  );

  if (loadError) {
    return (
      <div className="tw:flex tw:flex-col tw:gap-4">
        <Alert variant="destructive">
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={load}>
          {localizedStrings['%internetSettings_button_retry%']}
        </Button>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="tw:flex tw:justify-center tw:py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      {saveError && (
        <Alert variant="destructive">
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}
      <InternetAccessOptionList
        localizedStrings={localizedStrings}
        value={settings.permittedInternetUse}
        onChange={(v) => handleChange({ ...settings, permittedInternetUse: v })}
        disabled={isSaving}
      />
      <DeveloperSection
        localizedStrings={localizedStrings}
        selectedServer={settings.selectedServer}
        onServerChange={(s) => handleChange({ ...settings, selectedServer: s })}
        disabled={isSaving}
      />
    </div>
  );
}

export default InternetSettingsStep;
