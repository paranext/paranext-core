import { InternetUse } from 'paratext-registration';
import { Badge, cn, RadioGroup, RadioGroupItem } from 'platform-bible-react';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';

type OptionRow = {
  // BlockInSensitiveLocations is included here as a UI-only option that the UX spec requires
  // showing in this list, but it is not part of the InternetUse type that PAPI persists — the
  // onChange handler filters it out before calling the caller (see the if-guard below).
  value: InternetUse | 'BlockInSensitiveLocations';
  labelKey: LocalizeKey;
  descriptionKey: LocalizeKey;
  isEnabled: boolean;
};

const OPTION_ROWS: OptionRow[] = [
  {
    value: 'Enabled',
    labelKey: '%paratextRegistration_description_internetUse_option_Enabled_2%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_Enabled_details%',
    isEnabled: true,
  },
  {
    value: 'VpnRequired',
    labelKey: '%paratextRegistration_description_internetUse_option_VpnRequired_2%',
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
    labelKey: '%paratextRegistration_description_internetUse_option_ProxyOnly_2%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_ProxyOnly_details%',
    isEnabled: false,
  },
];

// Derived from OPTION_ROWS so adding a new row automatically includes its strings.
export const INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: LocalizeKey[] = [
  ...OPTION_ROWS.flatMap((row) => [row.labelKey, row.descriptionKey]),
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
        onValueChange={(v) => {
          // Narrow v to InternetUse before calling onChange. BlockInSensitiveLocations is
          // not an InternetUse member; this check makes the cast below sound.
          if (v === 'BlockInSensitiveLocations') return;
          onChange(v as InternetUse);
        }}
        disabled={disabled}
      >
        {OPTION_ROWS.map((row) => (
          <div
            key={row.value}
            className={cn(
              'tw:flex tw:w-full tw:items-start tw:gap-2 tw:rounded tw:px-2 tw:py-1.5',
              !disabled && row.isEnabled && 'tw:hover:bg-accent',
            )}
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
                  aria-disabled={!row.isEnabled || undefined}
                  className={cn(
                    'tw:text-sm tw:font-medium',
                    row.isEnabled && !disabled
                      ? 'tw:cursor-pointer'
                      : 'tw:cursor-not-allowed tw:text-muted-foreground',
                  )}
                >
                  {localizedStrings[row.labelKey]}
                </label>
                {!row.isEnabled && (
                  <Badge variant="muted">
                    {localizedStrings['%paratextRegistration_internetUse_comingSoon%']}
                  </Badge>
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
