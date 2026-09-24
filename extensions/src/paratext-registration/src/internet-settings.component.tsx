import { AlertCircle, CircleCheck } from 'lucide-react';
import { InternetSettings } from 'paratext-registration';
import { Alert, AlertDescription, AlertTitle, Button, Spinner } from 'platform-bible-react';
import {
  DeveloperSection,
  DEVELOPER_SECTION_STRING_KEYS,
  InternetAccessOptionList,
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
} from 'platform-bible-react/experimental';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { deepEqual } from 'platform-bible-utils';
import { useEffect, useRef } from 'react';
import { scrollToRef, SaveState } from './utils';

/**
 * All localization keys used by InternetSettingsForm and its sub-components — including keys from
 * `InternetAccessOptionList` and `DeveloperSection`. Callers need only pass this one constant into
 * the platform's localization hook and forward the resolved map into the `localizedStrings` prop.
 */
export const INTERNET_SETTINGS_STRING_KEYS: LocalizeKey[] = [
  '%general_error_title%',
  '%internetSettings_webView_subtitle%',
  '%internetSettings_webView_title_2%',
  '%paratextRegistration_alert_updatedInternetSettings_2%',
  '%paratextRegistration_alert_updatedRegistration_description%',
  '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%',
  '%paratextRegistration_button_reset%',
  '%paratextRegistration_button_restarting%',
  '%paratextRegistration_button_saveAndRestart%',
  ...INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  ...DEVELOPER_SECTION_STRING_KEYS,
];

export type InternetSettingsFormProps = {
  /** Localized strings; import `INTERNET_SETTINGS_STRING_KEYS` to resolve them. */
  localizedStrings: LanguageStrings;
  /** The current (user-edited, staged) internet settings shown in the form. */
  internetSettings: InternetSettings;
  /** The last-persisted settings from PAPI; `undefined` while the initial fetch is in flight. */
  savedInternetSettings: InternetSettings | undefined;
  /** Called whenever a field changes with the next staged settings object. */
  onInternetSettingsChange: (s: InternetSettings) => void;
  /** True while loading or while saveState === IsSaving. */
  isFormDisabled: boolean;
  /** Progress of the save/restart flow; drives the success alert and button label. */
  saveState: SaveState;
  /** A save error message to show in a destructive alert, or empty string for none. */
  saveError: string;
  /** Called when "Save and restart" is clicked. */
  onSaveAndRestart: () => void;
};

/**
 * Presentational half of the Internet settings web view. Renders the option list, developer
 * section, alerts, and Reset / Save and restart buttons. The web view owns PAPI fetch/save; this
 * component is fully controlled.
 */
export function InternetSettingsForm({
  localizedStrings,
  internetSettings,
  savedInternetSettings,
  onInternetSettingsChange,
  isFormDisabled,
  saveState,
  saveError,
  onSaveAndRestart,
}: InternetSettingsFormProps) {
  const hasUnsavedChanges =
    savedInternetSettings !== undefined && !deepEqual(internetSettings, savedInternetSettings);

  const areButtonsDisabled = !hasUnsavedChanges || isFormDisabled;

  const radioGroupContainerRef = useRef<HTMLDivElement | undefined>(undefined);
  const successAlertRef = useRef<HTMLDivElement | undefined>(undefined);
  const errorAlertRef = useRef<HTMLDivElement | undefined>(undefined);

  // Focus the selected radio button when the form first becomes interactive (fetch complete).
  const prevIsFormDisabledRef = useRef(true);
  useEffect(() => {
    const wasDisabled = prevIsFormDisabledRef.current;
    prevIsFormDisabledRef.current = isFormDisabled;
    if (wasDisabled && !isFormDisabled) {
      const checked = radioGroupContainerRef.current?.querySelector<HTMLElement>(
        'button[data-state="checked"]:not(:disabled)',
      );
      checked?.focus();
    }
  }, [isFormDisabled]);

  // Focus the success alert when the save-triggered state transition first appears.
  const prevSaveStateRef = useRef(saveState);
  useEffect(() => {
    const prev = prevSaveStateRef.current;
    prevSaveStateRef.current = saveState;
    if (
      prev !== saveState &&
      (saveState === SaveState.IsRestarting || saveState === SaveState.HasSaved)
    ) {
      successAlertRef.current?.focus();
    }
  }, [saveState]);

  // Focus the error alert when a save error first appears.
  const prevSaveErrorRef = useRef(saveError);
  useEffect(() => {
    const prev = prevSaveErrorRef.current;
    prevSaveErrorRef.current = saveError;
    if (!prev && saveError) {
      errorAlertRef.current?.focus();
    }
  }, [saveError]);

  return (
    <div className="tw:flex tw:h-screen tw:flex-col tw:gap-4 tw:overflow-y-auto tw:p-4">
      <div>
        <h2 className="tw:text-lg tw:font-semibold">
          {localizedStrings['%internetSettings_webView_title_2%']}
        </h2>
        <p className="tw:text-sm tw:text-muted-foreground">
          {localizedStrings['%internetSettings_webView_subtitle%']}
        </p>
      </div>

      <div
        ref={(el) => {
          radioGroupContainerRef.current = el ?? undefined;
        }}
      >
        <InternetAccessOptionList
          localizedStrings={localizedStrings}
          value={internetSettings.permittedInternetUse}
          onChange={(v) =>
            onInternetSettingsChange({ ...internetSettings, permittedInternetUse: v })
          }
          disabled={isFormDisabled}
        />
      </div>

      <DeveloperSection
        localizedStrings={localizedStrings}
        selectedServer={internetSettings.selectedServer}
        onServerChange={(s) => onInternetSettingsChange({ ...internetSettings, selectedServer: s })}
        disabled={isFormDisabled}
      />

      {saveError && (
        <Alert
          ref={(el: HTMLDivElement | null) => {
            scrollToRef(el);
            errorAlertRef.current = el ?? undefined;
          }}
          // tabIndex={-1} makes the alert programmatically focusable so focus can move here after a save error
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={-1}
          variant="destructive"
        >
          <AlertCircle className="tw:h-4 tw:w-4" />
          <AlertTitle>{localizedStrings['%general_error_title%']}</AlertTitle>
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}

      {!saveError && (saveState === SaveState.IsRestarting || saveState === SaveState.HasSaved) && (
        <Alert
          ref={(el: HTMLDivElement | null) => {
            scrollToRef(el);
            successAlertRef.current = el ?? undefined;
          }}
          // tabIndex={-1} makes the alert programmatically focusable so focus can move here after save
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={-1}
        >
          <CircleCheck className="tw:h-4 tw:w-4" />
          <AlertTitle>
            {localizedStrings['%paratextRegistration_alert_updatedInternetSettings_2%']}
          </AlertTitle>
          <AlertDescription>
            {saveState === SaveState.IsRestarting
              ? localizedStrings['%paratextRegistration_alert_updatedRegistration_description%']
              : localizedStrings[
                  '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%'
                ]}
          </AlertDescription>
        </Alert>
      )}

      <div className="tw:flex tw:justify-end tw:gap-2">
        <Button
          variant="outline"
          disabled={areButtonsDisabled}
          onClick={() => {
            if (savedInternetSettings) onInternetSettingsChange(savedInternetSettings);
          }}
        >
          {localizedStrings['%paratextRegistration_button_reset%']}
        </Button>
        <Button disabled={areButtonsDisabled} onClick={onSaveAndRestart}>
          {saveState === SaveState.IsRestarting ? (
            <>
              <Spinner /> {localizedStrings['%paratextRegistration_button_restarting%']}
            </>
          ) : (
            localizedStrings['%paratextRegistration_button_saveAndRestart%']
          )}
        </Button>
      </div>
    </div>
  );
}

export default InternetSettingsForm;
