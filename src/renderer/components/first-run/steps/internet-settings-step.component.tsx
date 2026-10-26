import type {
  InternetSettings,
  InternetUse,
  IInternetSettingsDataProvider,
} from 'paratext-registration';
import { Alert, AlertDescription, Button } from 'platform-bible-react';
import { useData, useDataProvider, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useDelayedFlag } from '@renderer/hooks/use-delayed-flag.hook';
import { markInternetUseChoiceSaved } from '@renderer/services/internet-use-choice-store';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import {
  noteInternetSettingsLoaded,
  noteInternetSettingsSaved,
} from '@renderer/services/first-run-store';
import {
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  type LanguageStrings,
  type LocalizeKey,
} from 'platform-bible-utils';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  DEFAULT_INTERNET_SETTINGS,
  INTERNET_SETTINGS_DATA_PROVIDER,
} from '@renderer/components/internet-settings.constants';
import type { FirstRunStepProps } from '../first-run-step-props.model';
import { StepLoading } from '../step-loading.component';
import { WizardStepHeading } from '../wizard-step-heading.component';

/**
 * The Paratext 9 settings this app does not support yet, each named with Paratext 9's own label so
 * the user recognizes it.
 */
const UNSUPPORTED_PARATEXT9_SETTING_KEYS: Partial<Record<InternetUse, LocalizeKey>> = {
  Disabled: '%firstRun_step_internetSettings_paratext9Setting_Disabled%',
  VpnRequired: '%firstRun_step_internetSettings_paratext9Setting_VpnRequired%',
  ProxyOnly: '%firstRun_step_internetSettings_paratext9Setting_ProxyOnly%',
};

// `firstRun_*` keys come from core (assets/localization), `internetSettings_*` from the
// paratext-registration extension. Both merge in the combiner, so the extension keys need no en.json
// entry.
const STRING_KEYS: LocalizeKey[] = [
  '%internetSettings_button_retry%',
  '%firstRun_step_internetSettings_heading%',
  '%firstRun_step_internetSettings_body_2%',
  '%firstRun_step_internetSettings_connecting%',
  '%firstRun_step_internetSettings_loadError%',
  '%firstRun_step_internetSettings_restartNote%',
  '%firstRun_step_internetSettings_paratext9Unsupported%',
  ...Object.values(UNSUPPORTED_PARATEXT9_SETTING_KEYS),
  '%firstRun_step_internetSettings_sensitiveCountries%',
  '%firstRun_step_internetSettings_useWithInternet%',
  '%firstRun_step_internetSettings_closeApp%',
  // Referenced via {%product_name%} in the choices and the warnings; formatReplacementString
  // expands it.
  '%product_name%',
];

/**
 * Looks up Paratext 9's own internet setting. Resolves `undefined` when Paratext 9 is not
 * installed, its setting cannot be read, or the lookup fails: the step then just leaves out the
 * sentence about it.
 */
async function lookUpParatext9InternetUse(): Promise<InternetUse | undefined> {
  try {
    const internetUse = await sendCommand('paratextRegistration.getParatext9InternetUse');
    // "None" arrives from C# as `null`, which the declared type cannot express.
    return internetUse ?? undefined;
  } catch (e) {
    logger.warn(`Could not look up the Paratext 9 internet setting: ${getErrorMessage(e)}`);
    return undefined;
  }
}

/**
 * First-run wizard step that asks the user to allow the app unrestricted internet access before
 * registration, or to close it. Every other option needs a feature the app does not have yet, or
 * leaves the user unable to get any project but the bundled sample, so onboarding offers only these
 * two; "Disable access to some Bible translation services" stays available afterwards in the
 * Internet & connectivity settings.
 *
 * When Paratext 9's own setting is one the app does not support yet, the step names it, so a user
 * who relied on it knows it will not carry over. "Close <product name>" saves nothing, so the next
 * launch asks again.
 *
 * The step hides the shell's Next and moves on itself once "Use <product name> with internet
 * access" is saved. The setting takes effect after a restart, which the Identify step performs:
 * "Save and restart" when registering, or "Restart and continue" for an existing registration when
 * the saved settings differ from the ones this step first loaded. The step says so up front.
 *
 * Availability: `useDataProvider` returns `undefined` until the C# InternetSettingsDataProvider
 * registers, giving a natural spinner without any startup-race retry heuristics.
 */
export function InternetSettingsStep(props: FirstRunStepProps) {
  const { onNext, setCanProceed } = props;
  const provider = useDataProvider(INTERNET_SETTINGS_DATA_PROVIDER);
  // Bumped by Retry to remount the loaded subcomponent and re-subscribe from scratch.
  const [retryCount, setRetryCount] = useState(0);

  const showConnectingMessage = useDelayedFlag(provider === undefined);
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  // Before the first paint, so the shell's Next never flashes.
  useLayoutEffect(() => {
    setCanProceed?.(undefined);
  }, [setCanProceed]);

  return (
    // The heading wraps every state so it holds its place instead of popping in once the provider
    // resolves.
    <div className="tw:flex tw:flex-col tw:gap-3">
      {/* Heading and lead-in share one wrapper so the outer gap-3 doesn't split them apart —
          same pairing the standalone dialog uses. */}
      <div>
        <WizardStepHeading>
          {localizedStrings['%firstRun_step_internetSettings_heading%']}
        </WizardStepHeading>
        <p className="tw:text-sm tw:text-muted-foreground">
          {localizedStrings['%firstRun_step_internetSettings_body_2%']}
        </p>
        <p className="tw:text-sm tw:text-muted-foreground">
          {localizedStrings['%firstRun_step_internetSettings_restartNote%']}
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
          onNext={onNext}
          onRetry={() => setRetryCount((c) => c + 1)}
        />
      )}
    </div>
  );
}

type LoadedProps = {
  provider: IInternetSettingsDataProvider;
  localizedStrings: LanguageStrings;
  onNext: FirstRunStepProps['onNext'];
  onRetry: () => void;
};

/** Rendered only once the provider is available. */
function InternetSettingsLoaded({ provider, localizedStrings, onNext, onRetry }: LoadedProps) {
  const [value, setData, isLoading] = useData(provider).InternetSettings(
    undefined,
    DEFAULT_INTERNET_SETTINGS,
  );
  const [hasLookedUpParatext9, setHasLookedUpParatext9] = useState(false);
  const [paratext9InternetUse, setParatext9InternetUse] = useState<InternetUse | undefined>();
  const [actionError, setActionError] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const isMounted = useRef(false);

  // When loading, value is the default placeholder, never a PlatformError — so gate on isLoading alone.
  const showConnectingMessage = useDelayedFlag(isLoading || !hasLookedUpParatext9);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let isCurrent = true;
    (async () => {
      // Never rejects: a failed lookup resolves `undefined`.
      const internetUse = await lookUpParatext9InternetUse();
      if (!isCurrent) return;
      setParatext9InternetUse(internetUse);
      setHasLookedUpParatext9(true);
    })();
    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !isPlatformError(value)) noteInternetSettingsLoaded(value);
  }, [value, isLoading]);

  const continueWithInternetAccess = async () => {
    if (isLoading || isPlatformError(value)) return;
    if (!setData) {
      // Defensive: InternetSettingsLoaded renders only once `provider` is defined, so `setData` is
      // always defined here. Bail rather than moving on with nothing saved.
      logger.warn('Internet settings provider unavailable; not saving the internet choice.');
      return;
    }
    const next: InternetSettings = { ...value, permittedInternetUse: 'Enabled' };
    setActionError('');
    setIsBusy(true);
    try {
      await setData(next);
      noteInternetSettingsSaved(next);
      markInternetUseChoiceSaved();
      // The shell's Back stays available during the save. If the user left, this `onNext` would
      // move the wizard on from a step they are no longer on.
      if (!isMounted.current) return;
      onNext();
    } catch (err: unknown) {
      if (!isMounted.current) return;
      setActionError(getErrorMessage(err));
    }
    if (isMounted.current) setIsBusy(false);
  };

  const closeApp = async () => {
    setActionError('');
    setIsBusy(true);
    try {
      await sendCommand('platform.quit');
    } catch (err: unknown) {
      if (!isMounted.current) return;
      setActionError(getErrorMessage(err));
    }
    if (isMounted.current) setIsBusy(false);
  };

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

  if (isLoading || !hasLookedUpParatext9) {
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

  const unsupportedParatext9SettingKey =
    paratext9InternetUse && UNSUPPORTED_PARATEXT9_SETTING_KEYS[paratext9InternetUse];

  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      {/* Plain text rather than a warning banner: nothing is wrong yet, the user is being asked. */}
      <div className="tw:flex tw:flex-col tw:gap-2 tw:text-sm">
        {unsupportedParatext9SettingKey && (
          <p>
            {formatReplacementString(
              localizedStrings['%firstRun_step_internetSettings_paratext9Unsupported%'] ?? '',
              {
                ...localizedStrings,
                setting: localizedStrings[unsupportedParatext9SettingKey] ?? '',
              },
            )}
          </p>
        )}
        <p>
          {formatReplacementString(
            localizedStrings['%firstRun_step_internetSettings_sensitiveCountries%'] ?? '',
            localizedStrings,
          )}
        </p>
      </div>
      {actionError && (
        <Alert variant="destructive">
          <AlertDescription>{actionError}</AlertDescription>
        </Alert>
      )}
      <div className="tw:flex tw:flex-col tw:gap-2">
        <Button onClick={continueWithInternetAccess} disabled={isBusy}>
          {formatReplacementString(
            localizedStrings['%firstRun_step_internetSettings_useWithInternet%'] ?? '',
            localizedStrings,
          )}
        </Button>
        <Button variant="outline" onClick={closeApp} disabled={isBusy}>
          {formatReplacementString(
            localizedStrings['%firstRun_step_internetSettings_closeApp%'] ?? '',
            localizedStrings,
          )}
        </Button>
      </div>
    </div>
  );
}

export default InternetSettingsStep;
