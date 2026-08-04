import type { InternetSettings } from 'paratext-registration';
import { Alert, AlertDescription, Button } from 'platform-bible-react';
import {
  DeveloperSection,
  DEVELOPER_SECTION_STRING_KEYS,
  InternetAccessOptionList,
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
} from 'platform-bible-react/experimental';
import { useData, useDataProvider, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useDelayedFlag } from '@renderer/hooks/use-delayed-flag.hook';
import {
  getErrorMessage,
  isPlatformError,
  type LanguageStrings,
  type LocalizeKey,
} from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FirstRunStepProps } from '../first-run-step-props.model';
import { StepLoading } from '../step-loading.component';

const INTERNET_SETTINGS_DATA_PROVIDER = 'paratextRegistration.internetSettingsDataProvider';

// `internetSettings_*` keys come from the paratext-registration extension, `firstRun_*` from core
// (assets/localization). Both merge in the combiner, so the extension keys need no en.json entry.
const STRING_KEYS: LocalizeKey[] = [
  '%internetSettings_button_retry%',
  '%firstRun_step_internetSettings_connecting%',
  '%firstRun_step_internetSettings_loadError%',
  ...INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  ...DEVELOPER_SECTION_STRING_KEYS,
];

// `useData`'s defaultValue is typed as the data type's getData (InternetSettings), so it cannot be
// undefined. This value is never shown to the user — the spinner covers the load. Mirrors the
// standalone dialog's default.
const DEFAULT_INTERNET_SETTINGS: InternetSettings = {
  permittedInternetUse: 'VpnRequired',
  selectedServer: 'Production',
  proxyPort: 0,
};

// Show the "getting ready" message after this much elapsed loading time.
const CONNECTING_MESSAGE_DELAY_MS = 2_000;

/**
 * First-run wizard step that lets the user configure internet access before registration. Saves
 * immediately on each selection change (immediate-apply model). The identify step's restart applies
 * the chosen setting — no second restart is needed here.
 *
 * Availability: `useDataProvider` returns `undefined` until the C# InternetSettingsDataProvider
 * registers, giving a natural spinner without any startup-race retry heuristics.
 */
export function InternetSettingsStep(props: FirstRunStepProps) {
  const { setCanProceed } = props;
  const provider = useDataProvider(INTERNET_SETTINGS_DATA_PROVIDER);
  // Bumped by Retry to remount the loaded subcomponent and re-subscribe from scratch.
  const [retryCount, setRetryCount] = useState(0);

  // While the provider is not yet registered, show the loading panel. Disable Next here so the
  // wizard can't advance before settings are readable.
  const showConnectingMessage = useDelayedFlag(provider === undefined, CONNECTING_MESSAGE_DELAY_MS);
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  useEffect(() => {
    if (provider === undefined) setCanProceed?.(false);
  }, [provider, setCanProceed]);

  if (provider === undefined) {
    return (
      <StepLoading
        message={
          showConnectingMessage
            ? localizedStrings['%firstRun_step_internetSettings_connecting%']
            : undefined
        }
      />
    );
  }

  return (
    <InternetSettingsLoaded
      key={retryCount}
      provider={provider}
      localizedStrings={localizedStrings}
      setCanProceed={setCanProceed}
      onRetry={() => setRetryCount((c) => c + 1)}
    />
  );
}

type LoadedProps = {
  provider: NonNullable<ReturnType<typeof useDataProvider<typeof INTERNET_SETTINGS_DATA_PROVIDER>>>;
  localizedStrings: LanguageStrings;
  setCanProceed: FirstRunStepProps['setCanProceed'];
  onRetry: () => void;
};

/**
 * Rendered only once the provider is available. Reads via `useData` (live cross-window updates) and
 * keeps a thin local mirror so the radio responds instantly on selection (optimistic apply), while
 * the actual persist goes through `setData`.
 */
function InternetSettingsLoaded({
  provider,
  localizedStrings,
  setCanProceed,
  onRetry,
}: LoadedProps) {
  const [value, setData, isLoading] = useData(provider).InternetSettings(
    undefined,
    DEFAULT_INTERNET_SETTINGS,
  );

  const [settings, setSettings] = useState<InternetSettings | undefined>();
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);
  // Last value we successfully displayed, so a failed optimistic save can revert to it.
  const lastGood = useRef<InternetSettings | undefined>(undefined);

  const showConnectingMessage = useDelayedFlag(
    isLoading && !isPlatformError(value),
    CONNECTING_MESSAGE_DELAY_MS,
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Sync the local mirror from the provider value whenever it changes and no save is pending/failed.
  useEffect(() => {
    if (isPlatformError(value) || isSaving || saveError) return;
    setSettings(value);
    lastGood.current = value;
    setCanProceed?.(true);
  }, [value, isSaving, saveError, setCanProceed]);

  const handleChange = useCallback(
    async (next: InternetSettings) => {
      if (isSaving) return;
      setSettings(next); // optimistic
      setSaveError('');
      setIsSaving(true);
      setCanProceed?.(false);
      try {
        await setData?.(next);
        if (!isMounted.current) return;
        lastGood.current = next;
        setIsSaving(false);
        setCanProceed?.(true);
      } catch (err: unknown) {
        if (!isMounted.current) return;
        setSettings(lastGood.current); // revert
        setIsSaving(false);
        setSaveError(getErrorMessage(err));
        setCanProceed?.(false);
      }
    },
    [isSaving, setData, setCanProceed],
  );

  if (isPlatformError(value)) {
    return (
      <div className="tw:flex tw:flex-col tw:gap-4">
        <Alert variant="destructive">
          <AlertDescription>
            {localizedStrings['%firstRun_step_internetSettings_loadError%']}
          </AlertDescription>
        </Alert>
        <Button variant="outline" onClick={onRetry}>
          {localizedStrings['%internetSettings_button_retry%']}
        </Button>
      </div>
    );
  }

  if (isLoading || !settings) {
    return (
      <StepLoading
        message={
          showConnectingMessage
            ? localizedStrings['%firstRun_step_internetSettings_connecting%']
            : undefined
        }
      />
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
