import { InternetUse } from 'paratext-registration';
import { RadioGroup, RadioGroupItem } from 'platform-bible-react';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';

type OptionRow = {
  value: InternetUse | 'BlockInSensitiveLocations';
  labelKey: LocalizeKey;
  descriptionKey: LocalizeKey;
  isEnabled: boolean;
};

const OPTION_ROWS: OptionRow[] = [
  {
    value: 'Enabled',
    labelKey: '%paratextRegistration_description_internetUse_option_Enabled%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_Enabled_details%',
    isEnabled: true,
  },
  {
    value: 'VpnRequired',
    labelKey: '%paratextRegistration_description_internetUse_option_VpnRequired%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_VpnRequired_details%',
    isEnabled: true,
  },
  {
    value: 'Disabled',
    labelKey: '%paratextRegistration_description_internetUse_option_Disabled%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_Disabled_details%',
    isEnabled: false,
  },
  {
    value: 'BlockInSensitiveLocations',
    labelKey: '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%',
    descriptionKey:
      '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%',
    isEnabled: false,
  },
  {
    value: 'ProxyOnly',
    labelKey: '%paratextRegistration_description_internetUse_option_ProxyOnly%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_ProxyOnly_details%',
    isEnabled: false,
  },
];

export const INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_description_internetUse_option_Enabled%',
  '%paratextRegistration_description_internetUse_option_Enabled_details%',
  '%paratextRegistration_description_internetUse_option_VpnRequired%',
  '%paratextRegistration_description_internetUse_option_VpnRequired_details%',
  '%paratextRegistration_description_internetUse_option_Disabled%',
  '%paratextRegistration_description_internetUse_option_Disabled_details%',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%',
  '%paratextRegistration_description_internetUse_option_ProxyOnly%',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_details%',
  '%paratextRegistration_internetUse_comingSoon%',
  '%paratextRegistration_internetUse_footer%',
];

export type InternetAccessOptionListProps = {
  /** Localized strings; pass strings resolved from `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /** The currently selected internet use value. */
  value: InternetUse;
  /** Called when the user selects an active (non-coming-soon) option. */
  onChange: (v: InternetUse) => void;
  /** When true, all rows are non-interactive (loading or saving in progress). */
  disabled: boolean;
};

export function InternetAccessOptionList({
  localizedStrings,
  value,
  onChange,
  disabled,
}: InternetAccessOptionListProps) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      <RadioGroup
        value={value}
        // BlockInSensitiveLocations rows are always disabled, so only InternetUse values fire here
        onValueChange={(v) => onChange(v as InternetUse)}
        disabled={disabled}
      >
        {OPTION_ROWS.map((row) => (
          <div
            key={row.value}
            className="tw:flex tw:w-full tw:items-start tw:gap-2 tw:rounded tw:px-2 tw:py-1.5 tw:hover:bg-accent"
          >
            <RadioGroupItem
              value={row.value}
              id={`internet-option-${row.value}`}
              disabled={disabled || !row.isEnabled}
              className="tw:mt-0.5"
            />
            <div className="tw:flex tw:flex-1 tw:flex-col">
              <div className="tw:flex tw:items-center tw:justify-between">
                <label
                  htmlFor={`internet-option-${row.value}`}
                  className={`tw:cursor-pointer tw:text-sm tw:font-medium${!row.isEnabled ? ' tw:cursor-not-allowed tw:text-muted-foreground' : ''}`}
                >
                  {localizedStrings[row.labelKey]}
                </label>
                {!row.isEnabled && (
                  <span className="tw:shrink-0 tw:rounded tw:bg-muted tw:px-1.5 tw:py-0.5 tw:text-xs tw:text-muted-foreground">
                    {localizedStrings['%paratextRegistration_internetUse_comingSoon%']}
                  </span>
                )}
              </div>
              <p className="tw:text-xs tw:text-muted-foreground">
                {localizedStrings[row.descriptionKey]}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>
      <p className="tw:px-2 tw:text-xs tw:text-muted-foreground">
        {localizedStrings['%paratextRegistration_internetUse_footer%']}
      </p>
    </div>
  );
}

export default InternetAccessOptionList;
