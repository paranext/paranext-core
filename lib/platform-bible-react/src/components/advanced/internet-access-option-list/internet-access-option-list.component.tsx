import { Info, TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn-ui/alert';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  formatReplacementString,
  type LanguageStrings,
  type LocalizeKey,
} from 'platform-bible-utils';
import { useId } from 'react';

/**
 * How the app is permitted to use the internet. Local alias — identical string literals to the
 * extension's `InternetUse` type, defined here so platform-bible-react does not depend on the
 * paratext-registration extension package.
 *
 * SYNC WARNING: Keep this alias identical to `InternetUse` in
 * extensions/src/paratext-registration/src/types/paratext-registration.d.ts and the matching C#
 * enum. Structural typing makes them mutually assignable today, but divergence (e.g. C# adding a
 * new value) will silently break the settings panel's prop wiring. Update this alias whenever the
 * authoritative type changes.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type InternetUse = 'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly';

type OptionRow = {
  value: InternetUse;
  labelKey: LocalizeKey;
  descriptionKey: LocalizeKey;
  isEnabled: boolean;
};

/**
 * Hover dwell before a row's description tooltip opens. TooltipProvider defaults to 0, which makes
 * tooltips flash on every pointer sweep down this stack of rows.
 */
const TOOLTIP_DELAY_MS = 300;

const OPTION_ROWS = [
  {
    value: 'Enabled',
    labelKey: '%paratextRegistration_description_internetUse_option_Enabled_2%',
    descriptionKey: '%paratextRegistration_description_internetUse_option_Enabled_details_2%',
    isEnabled: true,
  },
  // The `VpnRequired_2` label key is named for the value this text was first written for. It says
  // "some" services because `Disabled` switches off ParatextData's internet use only — the app's
  // other processes keep theirs. Once the app can block them too, this option becomes "Disable all
  // Internet access", as its description says.
  {
    value: 'Disabled',
    labelKey: '%paratextRegistration_description_internetUse_option_VpnRequired_2%',
    descriptionKey:
      '%paratextRegistration_description_internetUse_option_DisableSomeServices_details%',
    isEnabled: true,
  },
  // As in Paratext 9, `VpnRequired` means blocking only where the machine's location is flagged as
  // sensitive.
  {
    value: 'VpnRequired',
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
] as const satisfies readonly OptionRow[];

const isInternetUse = (value: string): value is InternetUse =>
  OPTION_ROWS.some((row) => row.value === value);

/**
 * Whether the app can honor this internet-use value.
 *
 * `InternetSettings.xml` is seeded once from a co-installed Paratext 9 on first launch (the two
 * apps keep separate copies thereafter), so a stored value may name an option this app does not
 * implement yet (the "Coming soon" rows). Such a value is shown selected and called out in a banner
 * rather than swapped for another row. (The data provider replaces a stored `VpnRequired` with
 * `Disabled` at startup, so in practice this is `ProxyOnly`.)
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function isSupportedInternetUse(value: InternetUse): boolean {
  return OPTION_ROWS.some((row) => row.value === value && row.isEnabled);
}

/** @experimental This export is unstable and may change shape or disappear without notice */
// Derived from OPTION_ROWS so adding a new row automatically includes its strings.
export const INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: LocalizeKey[] = [
  ...OPTION_ROWS.flatMap((row) => [row.labelKey, row.descriptionKey]),
  '%paratextRegistration_internetUse_comingSoon%',
  '%paratextRegistration_internetUse_unsupportedSelection_title_2%',
  '%paratextRegistration_internetUse_unsupportedSelection_description_2%',
];

/** @experimental This export is unstable and may change shape or disappear without notice */
export type InternetAccessOptionListProps = {
  /** Localized strings; pass strings resolved from `INTERNET_ACCESS_OPTION_LIST_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /**
   * The currently selected internet use value, or `undefined` to select no option — for a caller
   * that needs the user to make an explicit choice rather than accept the stored value.
   */
  value: InternetUse | undefined;
  /** Called when the user selects an active (non-coming-soon) option. */
  onChange: (value: InternetUse) => void;
  /** When true, all rows are non-interactive (loading or saving in progress). */
  disabled: boolean;
};

/**
 * The internet-access options as radio rows. Each row's description sits behind an info icon
 * button, revealed as a tooltip on hover or keyboard focus.
 *
 * The descriptions run to two sentences — longer than `Guidelines/Tooltips` allows a tooltip on a
 * control, and within the one-to-two sentences the guidelines allow an info icon button's tooltip.
 * That allowance and the info icon button pattern are defined in `Guidelines/Providing Help`, added
 * by paranext-core PR #2787 (open as of 2026-09-11).
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function InternetAccessOptionList({
  localizedStrings,
  value,
  onChange,
  disabled,
}: InternetAccessOptionListProps) {
  // Instance-scoped so two lists on one page (e.g. a Storybook autodocs page) don't collide on
  // duplicate ids, which would point a row's label and aria-describedby at the other list's row.
  const idPrefix = useId();
  const radioId = (optionValue: OptionRow['value']) => `${idPrefix}-${optionValue}`;
  const descriptionId = (optionValue: OptionRow['value']) => `${radioId(optionValue)}-description`;

  // A stored value the app cannot honor still selects its row, so the user can see exactly which
  // setting is carried over, and this banner says why nothing will act on it. A value with no row
  // at all — which selects nothing and would otherwise leave nothing on screen explaining why — is
  // announced too. Such a value can only be named by its raw form.
  const selectedRow = OPTION_ROWS.find((row) => row.value === value);
  const isUnsupported = value !== undefined && !isSupportedInternetUse(value);
  const unsupportedOptionName = selectedRow
    ? (localizedStrings[selectedRow.labelKey] ?? selectedRow.value)
    : value;

  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      {isUnsupported && (
        // role="status" (polite), overriding Alert's assertive default: this reports a setting that
        // was already stored before the user arrived, not a change they just caused, so it should
        // not interrupt whatever a screen reader is currently reading.
        <Alert role="status" className="tw:mb-2">
          <TriangleAlert />
          <AlertTitle>
            {formatReplacementString(
              localizedStrings['%paratextRegistration_internetUse_unsupportedSelection_title_2%'] ??
                '',
              { selectedOption: unsupportedOptionName },
            )}
          </AlertTitle>
          <AlertDescription>
            {formatReplacementString(
              localizedStrings[
                '%paratextRegistration_internetUse_unsupportedSelection_description_2%'
              ] ?? '',
              { selectedOption: unsupportedOptionName },
            )}
          </AlertDescription>
        </Alert>
      )}
      <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
        <RadioGroup
          // '' rather than `undefined` for no selection: Radix treats an undefined `value` as
          // uncontrolled, and would then select the clicked row itself instead of leaving that to
          // the caller's `onChange`.
          value={value ?? ''}
          onValueChange={(v) => {
            if (isInternetUse(v)) onChange(v);
          }}
          disabled={disabled}
        >
          {OPTION_ROWS.map((row) => (
            // `tw:relative` anchors the label's row-wide click target below.
            <div
              key={row.value}
              className={cn(
                'tw:relative tw:flex tw:w-full tw:items-start tw:gap-2 tw:rounded tw:px-2 tw:py-1.5',
                !disabled && row.isEnabled && 'tw:hover:bg-accent',
              )}
            >
              <RadioGroupItem
                value={row.value}
                id={radioId(row.value)}
                aria-describedby={descriptionId(row.value)}
                disabled={disabled || !row.isEnabled}
                className="tw:mt-0.5"
              />
              <div className="tw:flex tw:flex-1 tw:flex-col">
                <div className="tw:flex tw:items-center tw:justify-between tw:gap-2">
                  <div className="tw:flex-1 tw:text-sm">
                    {/* The label's `::after` stretches over the whole row, so clicking anywhere on
                        the row selects its option and the row-wide hover highlight matches what is
                        actually clickable. The label itself stays inline so that, when a label
                        wraps — as several do in a narrow column — the info
                        button trails its last word instead of parking at the row's edge against
                        the "Coming soon" badge.
                        A raw <label> rather than the shadcn Label used in DeveloperSection —
                        Label's disabled treatment rides on `tw:peer-disabled:`, a *sibling*
                        combinator, and this label is nested two levels below the RadioGroupItem,
                        so it would never match. Hence the explicit disabled classes here. */}
                    <label
                      htmlFor={radioId(row.value)}
                      aria-disabled={!row.isEnabled || undefined}
                      className={cn(
                        'tw:font-medium tw:after:absolute tw:after:inset-0',
                        row.isEnabled && !disabled
                          ? 'tw:cursor-pointer'
                          : 'tw:cursor-not-allowed tw:text-muted-foreground',
                      )}
                    >
                      {localizedStrings[row.labelKey]}
                    </label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {/* Outside the label: inside, its name would be absorbed into the radio's
                            accessible name. `tw:relative` lifts it above the label's row-wide
                            click target, so a click meant for the description does not select
                            the option. Its aria-label carries the whole description, as the info
                            icon button pattern asks. Never disabled — the description explains
                            the option rather than being part of the setting, so it stays
                            reachable while the list loads or saves, and on the "Coming soon" rows
                            whose disabled radios never take focus. */}
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={localizedStrings[row.descriptionKey]}
                          className="tw:relative tw:ms-1 tw:size-5 tw:align-middle"
                        >
                          <Info className="tw:size-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{localizedStrings[row.descriptionKey]}</TooltipContent>
                    </Tooltip>
                  </div>
                  {!row.isEnabled && (
                    <Badge variant="muted">
                      {localizedStrings['%paratextRegistration_internetUse_comingSoon%']}
                    </Badge>
                  )}
                </div>
                {/* The tooltip belongs to the info button, so a screen-reader user moving through
                    the radios with the arrow keys would otherwise hear no description. This hidden
                    copy is what describes each radio. Outside the label on purpose: inside, it
                    would be absorbed into the radio's accessible name. */}
                <span id={descriptionId(row.value)} className="tw:sr-only">
                  {localizedStrings[row.descriptionKey]}
                </span>
              </div>
            </div>
          ))}
        </RadioGroup>
      </TooltipProvider>
    </div>
  );
}

export default InternetAccessOptionList;
