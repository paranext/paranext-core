import { Badge } from '@/components/shadcn-ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { cn } from '@/utils/shadcn-ui/utils';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';

// Local alias — identical string literals to the extension's InternetUse type.
// Defined here so platform-bible-react does not depend on the paratext-registration
// extension package.
//
// SYNC WARNING: Keep this alias identical to `InternetUse` in
// extensions/src/paratext-registration/src/types/paratext-registration.d.ts
// and the matching C# enum. Structural typing makes them mutually assignable today,
// but divergence (e.g. C# adding a new value) will silently break the wizard step's
// prop wiring. Update this alias whenever the authoritative type changes.
type InternetUse = 'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly';

type OptionRow = {
  value: InternetUse;
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
    // ParatextData blocks for this value only where the machine's location is flagged as sensitive
    // or cannot be determined at all; everywhere else it behaves like `Enabled`. The label and
    // description must keep saying so.
    value: 'VpnRequired',
    labelKey: '%paratextRegistration_description_internetUse_option_VpnRequired_3%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_VpnRequired_details_2%',
    isEnabled: true,
  },
  {
    value: 'Disabled',
    labelKey: '%paratextRegistration_description_internetUse_option_Disabled_2%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_Disabled_details%',
    isEnabled: true,
  },
  {
    value: 'ProxyOnly',
    labelKey: '%paratextRegistration_description_internetUse_option_ProxyOnly_2%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_ProxyOnly_details%',
    isEnabled: false,
  },
];

// Radix reports the selection as a plain string; narrowing it against the rows keeps `onChange`
// typed without a type assertion.
function isInternetUse(value: string): value is InternetUse {
  return OPTION_ROWS.some((row) => row.value === value);
}

/** @experimental This export is unstable and may change shape or disappear without notice */
// Derived from OPTION_ROWS so adding a new row automatically includes its strings.
export const INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: LocalizeKey[] = [
  ...OPTION_ROWS.flatMap((row) => [row.labelKey, row.descriptionKey]),
  '%paratextRegistration_internetUse_comingSoon%',
  '%paratextRegistration_internetUse_footer_2%',
];

/** @experimental This export is unstable and may change shape or disappear without notice */
export type InternetAccessOptionListProps = {
  /** Localized strings; pass strings resolved from `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /** The currently selected internet use value. */
  value: InternetUse;
  /** Called when the user selects an active (non-coming-soon) option. */
  onChange: (value: InternetUse) => void;
  /** When true, all rows are non-interactive (loading or saving in progress). */
  disabled: boolean;
  /**
   * Whether to show the "disabled options are planned for future updates" note below the rows.
   * Defaults to true. Set false where vertical space is tight (the first-run wizard step, whose
   * heading and Next button compete for the same fold) — a "Coming soon" badge still marks any
   * option that is not yet available.
   */
  showFooter?: boolean;
};

/** @experimental This export is unstable and may change shape or disappear without notice */
export function InternetAccessOptionList({
  localizedStrings,
  value,
  onChange,
  disabled,
  showFooter = true,
}: InternetAccessOptionListProps) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      <RadioGroup
        value={value}
        onValueChange={(v) => {
          if (isInternetUse(v)) onChange(v);
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
              // Each option's description qualifies what it does — most of all the sensitive-locations
              // one — so it has to reach assistive tech, which announces the label alone by default.
              aria-describedby={`internet-option-${row.value}-description`}
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
              <p
                id={`internet-option-${row.value}-description`}
                className="tw:text-xs tw:text-muted-foreground"
              >
                {localizedStrings[row.descriptionKey]}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>
      {showFooter && (
        <p className="tw:px-2 tw:text-xs tw:text-muted-foreground">
          {localizedStrings['%paratextRegistration_internetUse_footer_2%']}
        </p>
      )}
    </div>
  );
}

export default InternetAccessOptionList;
