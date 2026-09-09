import { Info, TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn-ui/alert';
import { Badge } from '@/components/shadcn-ui/badge';
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
import { useInteractionModalityRef } from '@/hooks/use-interaction-modality.hook';

/**
 * How the app is permitted to use the internet. Local alias — identical string literals to the
 * extension's `InternetUse` type, defined here so platform-bible-react does not depend on the
 * paratext-registration extension package.
 *
 * SYNC WARNING: Keep this alias identical to `InternetUse` in
 * extensions/src/paratext-registration/src/types/paratext-registration.d.ts and the matching C#
 * enum. Structural typing makes them mutually assignable today, but divergence (e.g. C# adding a
 * new value) will silently break the wizard step's prop wiring. Update this alias whenever the
 * authoritative type changes.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type InternetUse = 'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly';

type OptionRow = {
  // BlockInSensitiveLocations is included here as a UI-only option that the UX spec requires
  // showing in this list, but it is not part of the InternetUse type that PAPI persists — the
  // onChange handler filters it out before calling the caller (see the if-guard below).
  value: InternetUse | 'BlockInSensitiveLocations';
  labelKey: LocalizeKey;
  descriptionKey: LocalizeKey;
  isEnabled: boolean;
};

/**
 * Hover dwell before a row's description tooltip opens. TooltipProvider defaults to 0, which makes
 * tooltips flash on every pointer sweep down this five-row stack.
 */
const TOOLTIP_DELAY_MS = 300;

const OPTION_ROWS = [
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
    labelKey: '%paratextRegistration_description_internetUse_option_Disabled_2%',
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
] as const satisfies readonly OptionRow[];

const isInternetUse = (value: string): value is InternetUse =>
  OPTION_ROWS.some((row) => row.value !== 'BlockInSensitiveLocations' && row.value === value);

/**
 * Whether the app can honor this internet-use value.
 *
 * `InternetSettings.xml` is seeded once from a co-installed Paratext 9 on first launch (the two
 * apps keep separate copies thereafter), so a stored value may name an option this app does not
 * implement yet (the "Coming soon" rows). Such a value is shown selected and called out in a banner
 * rather than silently replaced — callers that gate on a usable selection (the first-run wizard's
 * Next button) should refuse to advance until this returns true.
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
  '%paratextRegistration_internetUse_unsupportedSelection_title%',
  '%paratextRegistration_internetUse_unsupportedSelection_description%',
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
};

/**
 * The five internet-access options as radio rows, each with its description behind a hover- or
 * keyboard-revealed tooltip.
 *
 * Two deliberate deviations, recorded here so a later reader does not read them as oversights. Both
 * are UX calls made when the descriptions moved off the page; revisit them with UX rather than
 * quietly, since either change costs new localized strings:
 *
 * - **Tooltip length.** `Guidelines/Tooltips` asks that tooltip copy be a hint, supplemental to a UI
 *   that reads without it. These descriptions run 100–190 characters and are what explains each
 *   option, so they exceed that. Shortening them means new strings; the descriptions were kept
 *   whole and the info icon added so the content at least announces itself.
 * - **Keyboard reach on the "Coming soon" rows.** Those rows' only focusable child is a `disabled`
 *   radio, so they take no tab stop and a sighted keyboard-only user cannot open their tooltip.
 *   Screen-reader users are unaffected — the `sr-only` copy below reaches them on every row.
 *   Closing the gap means either making the info icon a real focusable trigger (a new accessible
 *   name, plus five extra tab stops) or `aria-disabled` rows that arrow-keys can land on and
 *   select.
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
  const interactionModality = useInteractionModalityRef();

  // A stored value the app cannot honor still selects its row, so the user can see exactly which
  // setting is carried over, and this banner says why nothing will act on it. Derived from the
  // value rather than from a matching row, so a value with no row at all — which selects nothing
  // and would otherwise leave the wizard's Next disabled with nothing on screen explaining why —
  // is announced too. Such a value can only be named by its raw form.
  const isUnsupported = !isSupportedInternetUse(value);
  const unsupportedRow = OPTION_ROWS.find((row) => row.value === value);

  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      {isUnsupported && (
        // role="status" (polite), overriding Alert's assertive default: this reports a setting that
        // was already stored before the user arrived, not a change they just caused, so it should
        // not interrupt whatever a screen reader is currently reading.
        <Alert role="status" className="tw:mb-2">
          <TriangleAlert />
          <AlertTitle>
            {localizedStrings['%paratextRegistration_internetUse_unsupportedSelection_title%']}
          </AlertTitle>
          <AlertDescription>
            {formatReplacementString(
              localizedStrings[
                '%paratextRegistration_internetUse_unsupportedSelection_description%'
              ] ?? '',
              {
                selectedOption: unsupportedRow
                  ? (localizedStrings[unsupportedRow.labelKey] ?? unsupportedRow.value)
                  : value,
              },
            )}
          </AlertDescription>
        </Alert>
      )}
      <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
        <RadioGroup
          value={value}
          onValueChange={(v) => {
            // BlockInSensitiveLocations is UI-only; isInternetUse excludes it.
            if (isInternetUse(v)) onChange(v);
          }}
          disabled={disabled}
        >
          {OPTION_ROWS.map((row) => (
            // The row — not the radio — is the tooltip trigger, so hovering the radio OR the label
            // reveals the description. Keyboard reach is free: React delegates onFocus via focusin,
            // which bubbles up from the radio. No tabIndex here; that would add a second tab stop
            // in front of every radio.
            <Tooltip key={row.value}>
              <TooltipTrigger
                asChild
                onFocus={(event) => {
                  // Radix opens a tooltip on any focus, including the programmatic one the
                  // standalone panel puts on the checked radio when its fetch resolves — which
                  // would pop a description open with no user gesture. Preventing the default
                  // suppresses Radix's focus handler, leaving hover and a keyboard arrival as the
                  // only ways in. See useInteractionModalityRef for why modality, not
                  // `:focus-visible`, is what tells those apart.
                  if (interactionModality.current !== 'keyboard') event.preventDefault();
                }}
              >
                <div
                  className={cn(
                    'tw:flex tw:w-full tw:items-start tw:gap-2 tw:rounded tw:px-2 tw:py-1.5',
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
                    <div className="tw:flex tw:items-center tw:justify-between">
                      {/* flex-1 so the label spans the row: the row-wide hover highlight then
                          matches what is actually clickable, instead of highlighting dead space.
                          A raw <label> rather than the shadcn Label used in DeveloperSection —
                          Label's disabled treatment rides on `tw:peer-disabled:`, a *sibling*
                          combinator, and this label is nested two levels below the RadioGroupItem,
                          so it would never match. Hence the explicit disabled classes here. */}
                      <label
                        htmlFor={radioId(row.value)}
                        aria-disabled={!row.isEnabled || undefined}
                        className={cn(
                          'tw:flex-1 tw:text-sm tw:font-medium',
                          row.isEnabled && !disabled
                            ? 'tw:cursor-pointer'
                            : 'tw:cursor-not-allowed tw:text-muted-foreground',
                        )}
                      >
                        {localizedStrings[row.labelKey]}
                        {/* Visible affordance that a description exists — without it nothing on the
                            row hints at hidden content, so anyone clicking straight through never
                            learns what the options mean. In the text flow rather than a flex item
                            beside it, so that a label long enough to wrap — as several do in the
                            first-run wizard's narrow column — keeps the icon trailing its last
                            word instead of parking it at the row's edge against the "Coming soon"
                            badge. `tw:inline` overrides the preflight's `svg { display: block }`.
                            aria-hidden, so it adds no tab stop and does not leak into the radio's
                            accessible name; assistive tech gets the text from the sr-only copy
                            below instead. */}
                        <Info
                          aria-hidden
                          className="tw:ms-1.5 tw:inline tw:size-3.5 tw:align-middle"
                        />
                      </label>
                      {!row.isEnabled && (
                        <Badge variant="muted">
                          {localizedStrings['%paratextRegistration_internetUse_comingSoon%']}
                        </Badge>
                      )}
                    </div>
                    {/* Radix puts aria-describedby on the trigger (the row), which screen readers
                        never announce — focus lands on the radio inside it, and coming-soon rows
                        aren't focusable at all. So the tooltip is sighted-hover only, and this
                        hidden copy is what reaches assistive tech. Outside the label on purpose:
                        inside, it would be absorbed into the radio's accessible name. */}
                    <span id={descriptionId(row.value)} className="tw:sr-only">
                      {localizedStrings[row.descriptionKey]}
                    </span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>{localizedStrings[row.descriptionKey]}</TooltipContent>
            </Tooltip>
          ))}
        </RadioGroup>
      </TooltipProvider>
    </div>
  );
}

export default InternetAccessOptionList;
