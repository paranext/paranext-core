import { useData, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { includeCurrentLanguages } from '@renderer/services/include-current-languages';
import { offerRestartAfterInterfaceLanguageChange } from '@renderer/services/interface-language-restart-prompt';
import {
  getOfferedLanguageDefaults,
  switchInterfaceLanguage,
} from '@shared/data/interface-languages.data';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import { DEFAULT_ZOOM_FACTOR } from '@shared/models/content-zoom.model';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import { SettingDataTypes } from '@shared/services/settings.service-model';
import {
  ProjectSettingNames,
  ProjectSettingTypes,
  SettingNames,
  SettingTypes,
} from 'papi-shared-types';
import {
  ERROR_POPOVER_STRING_KEYS,
  ErrorPopover,
  Input,
  Label,
  Switch,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  UiLanguageSelector,
} from 'platform-bible-react';
import {
  debounce,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  PlatformError,
} from 'platform-bible-utils';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ZoomStepper } from './zoom-stepper.component';
import './settings.component.scss';

/** What the language selector offers while the offered languages load, or if they cannot be read. */
const OFFERED_LANGUAGE_DEFAULTS = getOfferedLanguageDefaults();

/** Props shared between the user and project setting components */
type BaseSettingProps<TSettingKey, TSettingValue> = {
  /** Key of the setting */
  settingKey: TSettingKey;
  /** Setting label */
  label: string;
  /** Setting description */
  description?: string;
  /** Default value of the setting */
  defaultSetting: TSettingValue;
  /** Additional css classes to help with unique styling of the Settings component */
  className?: string;
  /**
   * When true, the setting's editor is rendered read-only (disabled). Used to make a project's
   * settings read-only while an automatic Send/Receive is blocking edits on that project. Defaults
   * to `false`.
   */
  disabled?: boolean;
};

/**
 * Combines properties and controls with optional validation functions for both project and user
 * settings
 */
type SettingProps<TProps, TControls, TValidateProject, TValidateOther> = TProps &
  TControls & { validateProjectSetting?: TValidateProject; validateOtherSetting?: TValidateOther };

/** Values of ProjectSettingTypes */
export type ProjectSettingValues = ProjectSettingTypes[keyof ProjectSettingTypes];

/** Props for the ProjectSetting component */
export type ProjectSettingProps = BaseSettingProps<ProjectSettingNames, ProjectSettingValues> & {
  projectId: string;
};

/** Values from the useProjectSetting hook to manage the setting */
type ProjectSettingsControls = {
  setting: ProjectSettingValues | PlatformError;
  // Necessary for flexibility in handleChangeSetting, ProjectSettingValues and
  // UserSettingValues are not the same so it couldn't assign
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSetting: ((newSetting: any) => Promise<unknown>) | undefined;
  isLoading: boolean;
};

/** Values of SettingTypes */
export type OtherSettingValues = SettingTypes[keyof SettingTypes];

/**
 * Props for the UserSetting component. `disabled` is omitted from `BaseSettingProps`: only project
 * settings go read-only during an automatic Send/Receive, and `OtherSetting` does not forward
 * `disabled` — so the type must not advertise a capability the component silently drops.
 */
export type OtherSettingProps = Omit<
  BaseSettingProps<SettingNames, OtherSettingValues>,
  'disabled'
>;

/** Values from the useSetting hook to manage the setting */
// Necessary for flexibility in handleChangeSetting, ProjectSettingValues and UserSettingValues are
// not the same so it couldn't assign
/* eslint-disable @typescript-eslint/no-explicit-any */
type OtherSettingsControls = {
  setting: OtherSettingValues | PlatformError;
  setSetting:
    | ((newSetting: any) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>)
    | undefined;
  isLoading: boolean;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Represents either project or user settings, includes properties, controls, and validation
 * function
 */
type CombinedSettingProps =
  | SettingProps<
      Omit<ProjectSettingProps, 'defaultSetting' | 'projectId'>,
      ProjectSettingsControls,
      // Necessary for flexibility in handleChangeSetting, couldn't use unknown
      // and keep types in ProjectSetting component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (settingKey: any, newValue: any, currentValue: any) => Promise<boolean>,
      never
    >
  | SettingProps<
      // `disabled` is re-added here (it is omitted from the public `OtherSettingProps` so the
      // OtherSetting wrapper doesn't advertise a prop it drops) because the shared `Setting`
      // renderer reads `disabled` uniformly for both variants; only ProjectSetting ever passes it.
      Omit<OtherSettingProps, 'defaultSetting'> & { disabled?: boolean },
      OtherSettingsControls,
      never,
      // Necessary for flexibility in handleChangeSetting, couldn't use unknown
      // and keep types in ProjectSetting component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (settingKey: any, newValue: any, currentValue: any) => Promise<boolean>
    >;

/** How long a control waits after the last edit before the setting is validated and written. */
const SETTING_WRITE_DEBOUNCE_MS = 500;

/**
 * The stepper's own, shorter wait. Its buttons and its readout move on the press, so the wait the
 * typed controls use would leave every pane it scales visibly trailing the number on screen, while
 * still being long enough to collapse a burst of presses into one write.
 */
const STEPPER_WRITE_DEBOUNCE_MS = 150;

/**
 * Marks a validated change that has no writer to send it to, so the catch below can show the
 * localized `%settings_errorMessages_notWritableYet%` message instead of the English sentence it
 * builds around `getErrorMessage` for a genuinely unexpected write failure.
 */
class SettingWriterUnavailableError extends Error {}

const LOCALIZE_SETTING_KEYS: LocalizeKey[] = [
  '%settings_defaultMessage_loadingOneSetting%',
  '%settings_defaultMessage_noSettingComponent%',
  '%settings_platform_webViewContentZoom_atDefault%',
  '%settings_platform_webViewContentZoom_atMaximum%',
  '%settings_platform_webViewContentZoom_atMinimum%',
  '%settings_platform_webViewContentZoom_decrease%',
  '%settings_platform_webViewContentZoom_increase%',
  '%settings_platform_webViewContentZoom_reset%',
  '%settings_errorMessages_invalidNumber%',
  '%settings_errorMessages_invalidJSON%',
  '%settings_errorMessages_invalidValue%',
  '%settings_errorMessages_notWritableYet%',
  '%settings_errorMessages_errorOccurred%',
  '%settings_errorMessages_viewError%',
  '%settings_uiLanguageSelector_fallbackLanguages%',
  ...ERROR_POPOVER_STRING_KEYS,
];

/**
 * Renders a setting component based on the type of setting (string, number, boolean, or object) and
 * includes validating the setting and displaying errors
 */
export function Setting({
  settingKey,
  setting,
  setSetting,
  isLoading,
  validateOtherSetting,
  validateProjectSetting,
  label,
  className,
  description,
  disabled = false,
}: CombinedSettingProps) {
  const validateSetting = validateOtherSetting || validateProjectSetting;

  const [offeredLanguagesPossiblyError] = useData(
    localizationService.dataProviderName,
  ).AvailableInterfaceLanguages(undefined, OFFERED_LANGUAGE_DEFAULTS);

  // The user's current languages are always listed, even when not offered, so the selector never
  // shows a blank selection and the user can see what they have and switch away from it.
  const knownUiLanguages = useMemo(
    () =>
      includeCurrentLanguages(
        isPlatformError(offeredLanguagesPossiblyError)
          ? OFFERED_LANGUAGE_DEFAULTS
          : offeredLanguagesPossiblyError,
        Array.isArray(setting) && settingKey === 'platform.interfaceLanguage'
          ? setting.filter((tag): tag is string => typeof tag === 'string')
          : [],
      ),
    [offeredLanguagesPossiblyError, setting, settingKey],
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    setErrorMessage(isPlatformError(setting) ? setting.message : undefined);
  }, [setting]);

  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZE_SETTING_KEYS, []));

  /**
   * Validate and change a setting
   *
   * @param event `ChangeEvent<HTMLInputElement>` is for `Input`; `boolean | 'indeterminate'` is for
   *   `Switch`; a raw `number` is for `ZoomStepper`, which already knows the new factor and has no
   *   change event to parse one out of
   */
  const handleChangeSetting = useCallback(
    async (
      event: ChangeEvent<HTMLInputElement> | string[] | boolean | 'indeterminate' | number,
    ) => {
      let newValue: unknown;

      if (typeof event === 'string')
        // This event came from a `Switch` component. It should not be indeterminate
        logger.warn(`Setting checkbox attempted to set to 'indeterminate' for some reason`);
      else if (typeof event === 'boolean') {
        // This event came from a `Switch` component
        newValue = event;
      } else if (typeof event === 'number') {
        // A `ZoomStepper` emits the new factor itself rather than a change event, so there is
        // nothing to parse out of a target.
        newValue = event;
      } else if (Array.isArray(event)) {
        // This event came from a `UiLanguageSelector` component, which reports the chosen language
        // first. The pickers share one rule for what the rest of the list becomes.
        newValue =
          event.length > 0 && Array.isArray(setting)
            ? switchInterfaceLanguage(
                setting.filter((tag): tag is string => typeof tag === 'string'),
                event[0],
              )
            : event;
      } else {
        // This event came from an `Input` component
        const { value } = event.target;
        if (typeof setting === 'number') {
          const numericValue = parseFloat(value);
          if (Number.isNaN(numericValue)) {
            setErrorMessage(localizedStrings['%settings_errorMessages_invalidNumber%']);
            return;
          }
          newValue = numericValue;
        } else if (typeof setting === 'boolean' || typeof setting === 'string') {
          newValue = value;
        } else if (typeof setting === 'object') {
          try {
            newValue = JSON.parse(value);
          } catch {
            setErrorMessage(localizedStrings['%settings_errorMessages_invalidJSON%']);
            return;
          }
        } else {
          newValue = value;
        }
      }

      try {
        if (validateSetting && (await validateSetting(settingKey, newValue, setting))) {
          // A setting whose data provider has not handed back a writer cannot be changed. That is a
          // failure, not a silent no-op: reporting it is what keeps an error on screen and stops a
          // control announcing a value it was never able to write.
          if (!setSetting) throw new SettingWriterUnavailableError();
          // Await so a rejected write (e.g. the Send/Receive write-gate) reaches the catch below
          // and surfaces as an error message instead of vanishing as an unhandled rejection.
          await setSetting(newValue);
          // Only a completed write earns a clear screen.
          setErrorMessage(undefined);
          if (
            settingKey === 'platform.interfaceLanguage' &&
            Array.isArray(setting) &&
            Array.isArray(newValue)
          )
            await offerRestartAfterInterfaceLanguageChange(setting, newValue);
        } else {
          setErrorMessage(localizedStrings['%settings_errorMessages_invalidValue%']);
        }
      } catch (error) {
        if (error instanceof SettingWriterUnavailableError) {
          // The user-facing message stays localized and setting-key-free; the setting key still
          // reaches the log for whoever debugs it.
          logger.warn(`Setting ${settingKey} changed before a writer was available for it`);
          setErrorMessage(localizedStrings['%settings_errorMessages_notWritableYet%']);
          return;
        }
        const message = `Error changing setting ${settingKey}: ${getErrorMessage(error)}`;
        // The error message below only reaches a mounted component, so a failure landing after the
        // settings tab is closed — a rejected write is at least a debounce plus a round trip behind
        // the edit that caused it — would otherwise leave no trace at all.
        logger.warn(message);
        setErrorMessage(message);
      }
    },
    [localizedStrings, setting, settingKey, setSetting, validateSetting],
  );

  // One debounce mechanism, two waits. Every control collapses a burst of edits into a single
  // validate-and-write, so a burst is one cross-process write rather than a race between several.
  const debouncedHandleChange = useMemo(
    () => debounce(handleChangeSetting, SETTING_WRITE_DEBOUNCE_MS),
    [handleChangeSetting],
  );
  const debouncedHandleStepperChange = useMemo(
    () => debounce(handleChangeSetting, STEPPER_WRITE_DEBOUNCE_MS),
    [handleChangeSetting],
  );

  const generateComponent = useCallback(() => {
    let component = <p>{localizedStrings['%settings_defaultMessage_noSettingComponent%']}</p>;

    // The default pane zoom stores a factor but is edited as a percentage; the generic number
    // branch below would put a raw decimal in a text box instead.
    if (settingKey === 'platform.webViewContentZoom' && typeof setting === 'number')
      component = (
        <ZoomStepper
          key={settingKey}
          value={setting}
          defaultValue={DEFAULT_ZOOM_FACTOR}
          // Without a writer the stepper has nothing to send a press to, and its readout moves and
          // is announced (`aria-live`) the moment a button is pressed. Gating the buttons keeps the
          // number on screen honest instead of reporting a percentage that was never written.
          disabled={disabled || !setSetting}
          groupLabel={label}
          labels={{
            increase: localizedStrings['%settings_platform_webViewContentZoom_increase%'],
            decrease: localizedStrings['%settings_platform_webViewContentZoom_decrease%'],
            reset: localizedStrings['%settings_platform_webViewContentZoom_reset%'],
            atMaximum: localizedStrings['%settings_platform_webViewContentZoom_atMaximum%'],
            atMinimum: localizedStrings['%settings_platform_webViewContentZoom_atMinimum%'],
            atDefault: localizedStrings['%settings_platform_webViewContentZoom_atDefault%'],
          }}
          onChange={debouncedHandleStepperChange}
        />
      );
    else if (typeof setting === 'string' || typeof setting === 'number')
      component = (
        <Input
          key={settingKey}
          onChange={debouncedHandleChange}
          defaultValue={setting}
          disabled={disabled}
        />
      );
    else if (typeof setting === 'boolean')
      component = (
        <Switch
          key={settingKey}
          onCheckedChange={debouncedHandleChange}
          defaultChecked={setting}
          disabled={disabled}
        />
      );
    else if (typeof setting === 'object')
      if (Array.isArray(setting) && settingKey === 'platform.interfaceLanguage') {
        // interfaceLanguage is a user (not project) setting, so it is never subject to per-project
        // Send/Receive edit-blocking; UiLanguageSelector exposes no `disabled` prop, so none is passed.
        component = (
          <UiLanguageSelector
            className="language-selector"
            key={settingKey}
            knownUiLanguages={knownUiLanguages}
            primaryLanguage={setting[0]}
            fallbackLanguages={setting.slice(1)}
            onLanguagesChange={debouncedHandleChange}
            localizedStrings={localizedStrings}
          />
        );
      } else {
        component = (
          <Input
            key={settingKey}
            onChange={debouncedHandleChange}
            defaultValue={JSON.stringify(setting, undefined, 2)}
            disabled={disabled}
          />
        );
      }

    return (
      <div className="setting-container">
        {component}
        {errorMessage && (
          <>
            <Label className="error-label">
              {localizedStrings['%settings_errorMessages_errorOccurred%']}
            </Label>
            <ErrorPopover errorDetails={errorMessage} localizedStrings={localizedStrings}>
              <Label className="error-view-link">
                {localizedStrings['%settings_errorMessages_viewError%']}
              </Label>
            </ErrorPopover>
          </>
        )}
      </div>
    );
  }, [
    localizedStrings,
    setting,
    settingKey,
    label,
    debouncedHandleChange,
    debouncedHandleStepperChange,
    errorMessage,
    knownUiLanguages,
    disabled,
    setSetting,
  ]);

  return (
    <div className={className}>
      {isLoading ? (
        <Label className="loading-label">
          {localizedStrings['%settings_defaultMessage_loadingOneSetting%']}
        </Label>
      ) : (
        <div className="setting-label-container">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label htmlFor={settingKey} className="setting-label">
                  {label}
                </Label>
              </TooltipTrigger>
              {description && <TooltipContent>{description}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
          {generateComponent()}
        </div>
      )}
    </div>
  );
}

export default Setting;
