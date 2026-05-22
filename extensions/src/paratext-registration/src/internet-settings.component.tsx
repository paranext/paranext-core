import { AlertCircle, CircleCheck } from 'lucide-react';
import { InternetSettings, InternetUse, ServerType } from 'paratext-registration';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from 'platform-bible-react';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { Grid } from './components/grid.component';
import { scrollToRef, SaveState } from './utils';

export const SERVER_TYPE_OPTIONS: ServerType[] = [
  'Production',
  'QualityAssurance',
  'Development',
  'Test',
];
export const INTERNET_USE_OPTIONS: InternetUse[] = [
  'Enabled',
  'VpnRequired',
  'Disabled',
  'ProxyOnly',
];
// For some reason, these aren't an enum in C#. So just following the existing conventions. Maybe
// there can be other values, but let's just keep it to these for now.
// InternetAccess.httpProxyMode, InternetAccess.socksProxyMode
export const PROXY_MODE_OPTIONS = ['Http', 'Socks'];

export function getLocalizeKeyForInternetUse(option: InternetUse): LocalizeKey {
  return `%paratextRegistration_description_internetUse_option_${option}%`;
}

export function getLocalizeKeyForServerType(option: ServerType): LocalizeKey {
  return `%paratextRegistration_label_serverType_option_${option}%`;
}

export function getLocalizeKeyForProxyMode(option: string): LocalizeKey {
  return `%paratextRegistration_label_proxyMode_option_${option}%`;
}

/**
 * All localization keys used by the InternetSettingsForm. Pass these into the Platform's
 * localization hook and forward the result into the `localizedStrings` prop.
 */
export const INTERNET_SETTINGS_STRING_KEYS: LocalizeKey[] = [
  '%general_error_title%',
  '%paratextRegistration_alert_updatedInternetSettings%',
  '%paratextRegistration_alert_updatedRegistration_description%',
  '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%',
  '%paratextRegistration_button_saveAndRestart%',
  '%paratextRegistration_button_restarting%',
  '%paratextRegistration_description_internetUse_disclaimer%',
  ...INTERNET_USE_OPTIONS.map(getLocalizeKeyForInternetUse),
  '%paratextRegistration_label_proxyHost%',
  '%paratextRegistration_label_proxyMode%',
  ...PROXY_MODE_OPTIONS.map(getLocalizeKeyForProxyMode),
  '%paratextRegistration_label_proxyPassword%',
  '%paratextRegistration_label_proxyPort%',
  '%paratextRegistration_label_proxyUsername%',
  '%paratextRegistration_label_selectedServer%',
  ...SERVER_TYPE_OPTIONS.map(getLocalizeKeyForServerType),
  '%paratextRegistration_section_internetSettings%',
  '%paratextRegistration_section_internetSettings_tooltip%',
  '%paratextRegistration_section_proxySettings%',
];

export type InternetSettingsFormProps = {
  /** Localized strings; import `INTERNET_SETTINGS_STRING_KEYS` to resolve them. */
  localizedStrings: LanguageStrings;
  /** The current (editable) internet settings shown in the form. */
  internetSettings: InternetSettings;
  /** Called whenever a field changes with the next settings object. */
  onInternetSettingsChange: (internetSettings: InternetSettings) => void;
  /** Whether the form fields are disabled (loading or saving). */
  isFormDisabled: boolean;
  /** Whether the save-and-restart button is disabled. */
  isSaveDisabled: boolean;
  /** Progress of the save/restart flow; drives the success alert and button label. */
  saveState: SaveState;
  /** A save error message to surface in a destructive alert, or empty for none. */
  saveError: string;
  /** Called when the user clicks save-and-restart. */
  onSaveAndRestart: () => void;
};

/**
 * Presentational half of the Internet settings web view: the internet-use selector, optional proxy
 * settings, server selector, save/restart button, and success/error alerts. The web view loads and
 * persists the settings and owns the save-and-restart flow; this component is fully controlled.
 */
export function InternetSettingsForm({
  localizedStrings,
  internetSettings,
  onInternetSettingsChange,
  isFormDisabled,
  isSaveDisabled,
  saveState,
  saveError,
  onSaveAndRestart,
}: InternetSettingsFormProps) {
  const formatSuccessAlertDescription = () => {
    if (saveState === SaveState.IsRestarting) {
      return localizedStrings['%paratextRegistration_alert_updatedRegistration_description%'];
    }

    return localizedStrings[
      '%paratextRegistration_alert_updatedRegistration_description_hasRestarted%'
    ];
  };

  return (
    <div className="tw:flex tw:flex-col tw:gap-2 tw:h-screen tw:overflow-y-auto tw:p-4">
      <div className="tw:m-2">
        {localizedStrings['%paratextRegistration_description_internetUse_disclaimer%']}
      </div>
      <div className="tw:m-2">
        <Select
          disabled={isFormDisabled}
          value={internetSettings.permittedInternetUse}
          onValueChange={(newInternetUse: InternetUse) =>
            onInternetSettingsChange({ ...internetSettings, permittedInternetUse: newInternetUse })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INTERNET_USE_OPTIONS.map((internetUseOption) => (
              <SelectItem key={internetUseOption} value={internetUseOption}>
                {localizedStrings[getLocalizeKeyForInternetUse(internetUseOption)]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {internetSettings.permittedInternetUse === 'ProxyOnly' && (
        <Card className="tw:m-2">
          <CardHeader>
            {localizedStrings['%paratextRegistration_section_proxySettings%']}
          </CardHeader>
          <CardContent>
            <Grid className="tw:m-0">
              <span>{localizedStrings['%paratextRegistration_label_proxyMode%']}</span>
              <Select
                disabled={isFormDisabled}
                value={internetSettings.proxyMode}
                onValueChange={(newProxyMode: string) =>
                  onInternetSettingsChange({ ...internetSettings, proxyMode: newProxyMode })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROXY_MODE_OPTIONS.map((proxyModeOption) => (
                    <SelectItem key={proxyModeOption} value={proxyModeOption}>
                      {localizedStrings[getLocalizeKeyForProxyMode(proxyModeOption)]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>{localizedStrings['%paratextRegistration_label_proxyHost%']}</span>
              <Input
                className="tw:invalid:border-destructive"
                minLength={1}
                required
                value={internetSettings.proxyHost}
                disabled={isFormDisabled}
                onChange={(e) =>
                  onInternetSettingsChange({ ...internetSettings, proxyHost: e.target.value })
                }
              />
              <span>{localizedStrings['%paratextRegistration_label_proxyPort%']}</span>
              <Input
                type="number"
                value={internetSettings.proxyPort}
                disabled={isFormDisabled}
                onChange={(e) =>
                  onInternetSettingsChange({
                    ...internetSettings,
                    proxyPort: e.target.value.length > 0 ? parseInt(e.target.value, 10) : 0,
                  })
                }
              />
              <span>{localizedStrings['%paratextRegistration_label_proxyUsername%']}</span>
              <Input
                value={internetSettings.proxyUsername}
                disabled={isFormDisabled}
                onChange={(e) =>
                  onInternetSettingsChange({ ...internetSettings, proxyUsername: e.target.value })
                }
              />
              <span>{localizedStrings['%paratextRegistration_label_proxyPassword%']}</span>
              <Input
                type="password"
                value={internetSettings.proxyPassword}
                disabled={isFormDisabled}
                onChange={(e) =>
                  onInternetSettingsChange({ ...internetSettings, proxyPassword: e.target.value })
                }
              />
            </Grid>
          </CardContent>
        </Card>
      )}
      <Grid>
        {/* Keep this label left-aligned: Grid right-aligns label columns for the multi-row forms,
            but this standalone row's label drifts far right on a wide panel, so override it. */}
        <span className="tw:!justify-self-start">
          {localizedStrings['%paratextRegistration_label_selectedServer%']}
        </span>
        <Select
          disabled={isFormDisabled}
          value={internetSettings.selectedServer}
          onValueChange={(newSelectedServer: ServerType) =>
            onInternetSettingsChange({ ...internetSettings, selectedServer: newSelectedServer })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SERVER_TYPE_OPTIONS.map((serverTypeOption) => (
              <SelectItem key={serverTypeOption} value={serverTypeOption}>
                {localizedStrings[getLocalizeKeyForServerType(serverTypeOption)]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Grid>
      <div>
        {!saveError &&
          (saveState === SaveState.IsRestarting || saveState === SaveState.HasSaved) && (
            <div className="tw:mx-2 tw:my-4">
              <Alert ref={scrollToRef}>
                <CircleCheck className="tw:h-4 tw:w-4" />
                <AlertTitle>
                  {localizedStrings['%paratextRegistration_alert_updatedInternetSettings%']}
                </AlertTitle>
                <AlertDescription>{formatSuccessAlertDescription()}</AlertDescription>
              </Alert>
            </div>
          )}
        {saveError && (
          <div className="tw:mx-2 tw:my-4">
            <Alert ref={scrollToRef} variant="destructive">
              <AlertCircle className="tw:h-4 tw:w-4" />
              <AlertTitle>{localizedStrings['%general_error_title%']}</AlertTitle>
              <AlertDescription>{saveError}</AlertDescription>
            </Alert>
          </div>
        )}
        <Grid className="tw:grid-cols-[1fr_auto] tw:items-end">
          <span />
          <Button variant="default" disabled={isSaveDisabled} onClick={onSaveAndRestart}>
            {saveState === SaveState.IsRestarting ? (
              <>
                <Spinner /> {localizedStrings['%paratextRegistration_button_restarting%']}
              </>
            ) : (
              localizedStrings['%paratextRegistration_button_saveAndRestart%']
            )}
          </Button>
        </Grid>
      </div>
    </div>
  );
}

export default InternetSettingsForm;
