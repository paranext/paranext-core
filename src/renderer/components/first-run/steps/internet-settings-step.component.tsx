import type { InternetSettings, IInternetSettingsDataProvider } from 'paratext-registration';
import { Alert, AlertDescription, Button } from 'platform-bible-react';
import {
  DeveloperSection,
  DEVELOPER_SECTION_STRING_KEYS,
  InternetAccessOptionList,
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  isSupportedInternetUse,
} from 'platform-bible-react/experimental';
import { useData, useDataProvider, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useDelayedFlag } from '@renderer/hooks/use-delayed-flag.hook';
import {
  hasSavedInternetUseChoice,
  markInternetUseChoiceSaved,
} from '@renderer/services/internet-use-choice-store';
import { logger } from '@shared/services/logger.service';
import {
  noteInternetSettingsLoaded,
  noteInternetSettingsSaved,
} from '@renderer/services/first-run-store';
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

// `firstRun_*` keys come from core (assets/localization), `internetSettings_*` and
// `paratextRegistration_*` from the paratext-registration extension. Both merge in the combiner, so
// the extension keys need no en.json entry.
const STRING_KEYS: LocalizeKey[] = [
  '%internetSettings_button_retry%',
  // The core wizard keys, not the extension's panel strings: these are translated in every language
  // core ships (fr, zh-hans, zh-hant as well as en/es), and their English already reads "Internet &
  // connectivity" — the same headline the standalone panel shows, so the two surfaces match.
  '%firstRun_step_internetSettings_heading%',
  // Asks the user to choose, since Next waits for a choice. Shorter than the panel's subtitle: the
  // wizard has a footer to keep in view, so it drops the app-scope/Paratext-9 caveats the roomier
  // panel spells out.
  '%firstRun_step_internetSettings_body_2%',
  '%firstRun_step_internetSettings_connecting%',
  '%firstRun_step_internetSettings_loadError%',
  '%firstRun_step_internetSettings_restartNote%',
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
 * Whether the wizard may move on with `permittedInternetUse` saved: only once the user has chosen
 * (see `internet-use-choice-store`), and only for an option the app actually implements.
 */
function canProceedWith(permittedInternetUse: InternetSettings['permittedInternetUse']): boolean {
  return hasSavedInternetUseChoice() && isSupportedInternetUse(permittedInternetUse);
}

/**
 * Selector for the selected radio in the option list. Matches the standalone panel's focus target
 * (`internet-settings.component.tsx`).
 */
const CHECKED_OPTION_SELECTOR = 'button[data-state="checked"]:not(:disabled)';

/**
 * First-run wizard step that lets the user configure internet access before registration. Saves
 * immediately on each selection change (immediate-apply model). The settings only take effect after
 * a restart, which the Identify step performs: "Save and restart" when registering, or "Restart and
 * continue" for an existing registration when the saved settings differ from the ones this step
 * first loaded. The step says so up front, so the restart is not a surprise.
 *
 * No option is selected, and Next stays disabled, until the user picks one (see
 * `internet-use-choice-store` for why). A stored value the app cannot honor is the exception: it
 * shows selected, under the list's banner, and holds Next back the same way until it is replaced.
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
  // Whether the list shows the internet-use choice as made. Unlike the saved choice
  // (hasSavedInternetUseChoice), it turns on as soon as the user picks, so the row stays selected
  // while the save is in flight; a failed save turns it back to the saved choice.
  const [isChoiceShown, setIsChoiceShown] = useState(hasSavedInternetUseChoice);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);
  const optionListContainer = useRef<HTMLDivElement | undefined>(undefined);
  // Whether focus was in the option list when the current save began. The list is disabled while
  // saving, which drops focus from the radio the user just picked, so it is put back afterwards.
  const shouldRefocusOptionList = useRef(false);
  // Last value we successfully displayed, so a failed optimistic save can revert to it.
  const lastGood = useRef<InternetSettings | undefined>(undefined);
  // The provider value last mirrored into `settings`. `setData` does not update `value`: the saved
  // value arrives later, through the provider's update. So mirror only a `value` not seen before —
  // re-mirroring when a save ends would briefly put the pre-save value back.
  const lastMirroredValue = useRef<typeof value | undefined>(undefined);

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
  // a real value is in, enable Next if the user has chosen; if the read is an error, keep Next
  // disabled so the wizard can't advance past an unloaded step. A stored value the app cannot honor
  // (see isSupportedInternetUse) also holds Next back: the list shows it selected under a banner,
  // and the user has to replace it with something that will actually take effect before the wizard
  // moves on.
  useEffect(() => {
    if (isLoading || isSaving || saveError) return;
    if (value === lastMirroredValue.current) return;
    lastMirroredValue.current = value;
    if (isPlatformError(value)) {
      setCanProceed?.(false);
      return;
    }
    noteInternetSettingsLoaded(value);
    setSettings(value);
    lastGood.current = value;
    // A choice saved by an earlier instance of this step (one the shell unmounted mid-save on Back)
    // lands here, so the list and Next agree on it.
    setIsChoiceShown(hasSavedInternetUseChoice());
    setCanProceed?.(canProceedWith(value.permittedInternetUse));
  }, [value, isLoading, isSaving, saveError, setCanProceed]);

  // Put focus back on the selected radio once a save started from the option list ends — unless the
  // user has since moved focus somewhere else.
  useEffect(() => {
    if (isSaving || !shouldRefocusOptionList.current) return;
    shouldRefocusOptionList.current = false;
    const container = optionListContainer.current;
    const focused = document.activeElement;
    if (!container || (focused && focused !== document.body && !container.contains(focused)))
      return;
    container.querySelector<HTMLElement>(CHECKED_OPTION_SELECTOR)?.focus();
  }, [isSaving]);

  const handleChange = useCallback(
    async (next: InternetSettings, { isInternetUseChoice }: { isInternetUseChoice: boolean }) => {
      if (isSaving) return;
      if (!setData) {
        // Defensive: InternetSettingsLoaded renders only once `provider` is defined, so `setData` is
        // always defined here. Bail rather than reporting a save that never actually persisted.
        logger.warn('Internet settings provider unavailable; ignoring selection change.');
        return;
      }
      setSettings(next); // optimistic
      if (isInternetUseChoice) setIsChoiceShown(true);
      setSaveError('');
      shouldRefocusOptionList.current =
        optionListContainer.current?.contains(document.activeElement) ?? false;
      setIsSaving(true);
      setCanProceed?.(false);
      try {
        await setData(next);
        noteInternetSettingsSaved(next);
        if (isInternetUseChoice) markInternetUseChoiceSaved();
        if (!isMounted.current) return;
        lastGood.current = next;
        setIsSaving(false);
        // Changing the server before choosing, or while an unsupported internet-use value is still
        // stored, must not unlock Next, so re-derive it from what was actually saved.
        setCanProceed?.(canProceedWith(next.permittedInternetUse));
      } catch (err: unknown) {
        if (!isMounted.current) return;
        setSettings(lastGood.current); // revert
        setIsChoiceShown(hasSavedInternetUseChoice());
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

  // Until the user chooses, select nothing rather than present the stored value as their choice —
  // unless the stored value is one the app cannot honor, which the list shows selected under its
  // banner so the user can see what was carried over.
  const shownInternetUse =
    isChoiceShown || !isSupportedInternetUse(settings.permittedInternetUse)
      ? settings.permittedInternetUse
      : undefined;

  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      {saveError && (
        <Alert variant="destructive">
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}
      <div
        ref={(el) => {
          optionListContainer.current = el ?? undefined;
        }}
      >
        <InternetAccessOptionList
          localizedStrings={localizedStrings}
          value={shownInternetUse}
          onChange={(v) =>
            handleChange({ ...settings, permittedInternetUse: v }, { isInternetUseChoice: true })
          }
          disabled={isSaving}
        />
      </div>
      <DeveloperSection
        localizedStrings={localizedStrings}
        selectedServer={settings.selectedServer}
        onServerChange={(s) =>
          handleChange({ ...settings, selectedServer: s }, { isInternetUseChoice: false })
        }
        disabled={isSaving}
      />
    </div>
  );
}

export default InternetSettingsStep;
