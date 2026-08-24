import { Info } from 'lucide-react';
import { Badge } from '@/components/shadcn-ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { cn } from '@/utils/shadcn-ui/utils';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useEffect, useId, useRef } from 'react';

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

/**
 * Tracks whether the last user input was a key press, so a focus handler can tell a keyboard focus
 * from a programmatic one.
 *
 * Radix opens a tooltip on _any_ focus, including the programmatic focus the standalone settings
 * panel puts on the checked radio once its fetch resolves — which would pop a description open with
 * no user gesture. `:focus-visible` cannot separate the two: Chromium reports it as true for a
 * programmatic `.focus()` in a document that has seen no pointer input, which is exactly the
 * panel's situation, because the click that opened the panel landed in the host document rather
 * than the panel's own iframe.
 *
 * Listens on the document in the capture phase, since a Tab press that moves focus _into_ this list
 * fires its keydown on whatever held focus before — usually something outside the list. One gap
 * follows from that: tabbing straight from the host document into the panel's iframe fires its
 * keydown in a document this listener cannot see, so the first row focused that way reveals no
 * tooltip until the next key press. Screen readers are unaffected — they read the `sr-only`
 * description wired to each radio via `aria-describedby`, not the tooltip.
 */
function useLastInputWasKeyboardRef() {
  const lastInputWasKeyboard = useRef(false);
  useEffect(() => {
    const onKeyDown = () => {
      lastInputWasKeyboard.current = true;
    };
    const onPointerDown = () => {
      lastInputWasKeyboard.current = false;
    };
    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('pointerdown', onPointerDown, true);
    };
  }, []);
  return lastInputWasKeyboard;
}

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
];

function isInternetUse(value: string): value is InternetUse {
  return OPTION_ROWS.some(
    (row) => row.value !== 'BlockInSensitiveLocations' && row.value === value,
  );
}

/** @experimental This export is unstable and may change shape or disappear without notice */
// Derived from OPTION_ROWS so adding a new row automatically includes its strings.
export const INTERNET_ACCESS_OPTION_LIST_STRING_KEYS: LocalizeKey[] = [
  ...OPTION_ROWS.flatMap((row) => [row.labelKey, row.descriptionKey]),
  '%paratextRegistration_internetUse_comingSoon%',
  '%paratextRegistration_internetUse_footer%',
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
   * heading and Next button compete for the same fold) — the per-row "Coming soon" badges still
   * convey that those options are not yet available.
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
  // Instance-scoped so two lists on one page (e.g. a Storybook autodocs page) don't collide on
  // duplicate ids, which would point a row's label and aria-describedby at the other list's row.
  const idPrefix = useId();
  const radioId = (optionValue: OptionRow['value']) => `${idPrefix}-${optionValue}`;
  const descriptionId = (optionValue: OptionRow['value']) => `${radioId(optionValue)}-description`;
  const lastInputWasKeyboard = useLastInputWasKeyboardRef();

  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
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
                  // Suppresses Radix's own focus handler, leaving hover and keyboard focus as the
                  // only ways in. See useLastInputWasKeyboardRef for why the modality is tracked.
                  if (!lastInputWasKeyboard.current) event.preventDefault();
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
      {showFooter && (
        <p className="tw:px-2 tw:text-xs tw:text-muted-foreground">
          {localizedStrings['%paratextRegistration_internetUse_footer%']}
        </p>
      )}
    </div>
  );
}

export default InternetAccessOptionList;
