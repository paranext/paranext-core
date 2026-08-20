import type { InternetSettings, IInternetSettingsDataProvider } from 'paratext-registration';
import { Alert, AlertDescription, Button } from 'platform-bible-react';
import {
  DeveloperSection,
  DEVELOPER_SECTION_STRING_KEYS,
  InternetAccessOptionList,
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
} from 'platform-bible-react/experimental';
import { useData, useDataProvider, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useDelayedFlag } from '@renderer/hooks/use-delayed-flag.hook';
import { logger } from '@shared/services/logger.service';
import {
  getErrorMessage,
  isPlatformError,
  type LanguageStrings,
  type LocalizeKey,
} from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FirstRunStepProps } from '../first-run-step-props.model';
import { StepLoading } from '../step-loading.component';
import { WizardStepHeading } from '../wizard-step-heading.component';

const INTERNET_SETTINGS_DATA_PROVIDER = 'paratextRegistration.internetSettingsDataProvider';

// `internetSettings_*` keys come from the paratext-registration extension, `firstRun_*` from core
// (assets/localization). Both merge in the combiner, so the extension keys need no en.json entry.
const STRING_KEYS: LocalizeKey[] = [
  '%internetSettings_button_retry%',
  // Same headline the standalone Internet & Connectivity web view shows, so the two surfaces match.
  '%internetSettings_webView_title_2%',
  // The dialog's subtitle clipped to its first sentence: the wizard has a footer to keep in view, so
  // it drops the app-scope/Paratext-9 caveats the roomier dialog spells out.
  '%internetSettings_subtitle_short%',
  '%firstRun_step_internetSettings_connecting%',
  '%firstRun_step_internetSettings_loadError%',
  ...INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  ...DEVELOPER_SECTION_STRING_KEYS,
];

// `useData`'s defaultValue is typed as the data type's getData (InternetSettings), so it cannot be
// undefined. This value is never shown to the user — the spinner covers the load. Intentionally
// duplicated in the standalone dialog (internet-settings.web-view.tsx): the two consumers sit on
// opposite sides of the core/extension boundary and `paratext-registration` is a types-only module,
// so there is no shared runtime module to hoist this into.
const DEFAULT_INTERNET_SETTINGS: InternetSettings = {
  permittedInternetUse: 'VpnRequired',
  selectedServer: 'Production',
  proxyPort: 0,
};

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
  const showConnectingMessage = useDelayedFlag(provider === undefined);
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  useEffect(() => {
    if (provider === undefined) setCanProceed?.(false);
  }, [provider, setCanProceed]);

  return (
    // The heading wraps every state so it holds its place instead of popping in once the provider
    // resolves. This step keeps its own layout rather than using WizardStepForm because it relies on
    // the shell's footer, not a primary button — so it renders the shared heading directly.
    <div className="tw:flex tw:flex-col tw:gap-3">
      {/* Heading and lead-in share one wrapper so the outer gap-3 doesn't split them apart —
          same pairing the standalone dialog uses. */}
      <div>
        <WizardStepHeading>
          {localizedStrings['%internetSettings_webView_title_2%']}
        </WizardStepHeading>
        <p className="tw:text-sm tw:text-muted-foreground">
          {localizedStrings['%internetSettings_subtitle_short%']}
        </p>
      </div>
      {provider === undefined ? (
        <StepLoading
          message={
            showConnectingMessage
              ? localizedStrings['%firstRun_step_internetSettings_connecting%']
              : undefined
          }
        />
      ) : (
        <InternetSettingsLoaded
          key={retryCount}
          provider={provider}
          localizedStrings={localizedStrings}
          setCanProceed={setCanProceed}
          onRetry={() => setRetryCount((c) => c + 1)}
        />
      )}
    </div>
  );
}

type LoadedProps = {
  provider: IInternetSettingsDataProvider;
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

  // When loading, value is the default placeholder, never a PlatformError — so gate on isLoading alone.
  const showConnectingMessage = useDelayedFlag(isLoading);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Sync the local mirror from the provider value. While loading (value is still the default) or
  // while a save is pending/failed, handleChange and the loading render own the state — defer. Once
  // a real value is in, enable Next; if the read is an error, keep Next disabled so the wizard can't
  // advance past an unloaded step.
  useEffect(() => {
    if (isLoading || isSaving || saveError) return;
    if (isPlatformError(value)) {
      setCanProceed?.(false);
      return;
    }
    setSettings(value);
    lastGood.current = value;
    setCanProceed?.(true);
  }, [value, isLoading, isSaving, saveError, setCanProceed]);

  const handleChange = useCallback(
    async (next: InternetSettings) => {
      if (isSaving) return;
      if (!setData) {
        // Defensive: InternetSettingsLoaded renders only once `provider` is defined, so `setData` is
        // always defined here. Bail rather than reporting a save that never actually persisted.
        logger.warn('Internet settings provider unavailable; ignoring selection change.');
        return;
      }
      setSettings(next); // optimistic
      setSaveError('');
      setIsSaving(true);
      setCanProceed?.(false);
      try {
        await setData(next);
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
