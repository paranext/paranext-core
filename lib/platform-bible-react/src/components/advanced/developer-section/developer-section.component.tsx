import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Label } from '@/components/shadcn-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { cn } from '@/utils/shadcn-ui/utils';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useId, useState } from 'react';

// Local alias — identical string literals to the extension's ServerType type.
// Defined here so platform-bible-react does not depend on the paratext-registration
// extension package.
//
// SYNC WARNING: Keep this alias identical to `ServerType` in
// extensions/src/paratext-registration/src/types/paratext-registration.d.ts
// and the matching C# enum. Structural typing makes them mutually assignable today,
// but divergence (e.g. C# adding a new value) will silently break the wizard step's
// prop wiring. Update this alias whenever the authoritative type changes.
type ServerType = 'Production' | 'QualityAssurance' | 'Development' | 'Test';

/** @experimental This export is unstable and may change shape or disappear without notice */
export const DEVELOPER_SECTION_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_developer_section_label%',
  '%paratextRegistration_label_serverType_option_Production%',
  '%paratextRegistration_label_serverType_option_Development%',
  '%paratextRegistration_label_serverType_option_Test%',
];

/** @experimental This export is unstable and may change shape or disappear without notice */
export type DeveloperSectionProps = {
  /** Localized strings; pass strings resolved from `DEVELOPER_SECTION_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /** The currently selected server type. QA values display as Production; Test displays as Test. */
  selectedServer: ServerType;
  /** Called when the user switches to Production, Development, or Test. */
  onServerChange: (server: ServerType) => void;
  /** When true, the radio items are non-interactive (loading or saving in progress). */
  disabled: boolean;
};

/** The three server environments this UI offers, in display order. */
const SERVER_ROWS = [
  {
    value: 'Production',
    labelKey: '%paratextRegistration_label_serverType_option_Production%',
    testId: 'server-type-production',
  },
  {
    value: 'Development',
    labelKey: '%paratextRegistration_label_serverType_option_Development%',
    testId: 'server-type-development',
  },
  {
    value: 'Test',
    labelKey: '%paratextRegistration_label_serverType_option_Test%',
    testId: 'server-type-test',
  },
] as const satisfies readonly { value: ServerType; labelKey: LocalizeKey; testId: string }[];

/** Whether a persisted value has a row of its own, rather than collapsing to the Production row. */
const isSurfaced = (server: ServerType) => SERVER_ROWS.some((row) => row.value === server);

/** QA is the only value not surfaced in this UI; it displays as Production. */
const toDisplayValue = (server: ServerType) => (isSurfaced(server) ? server : 'Production');

/** @experimental This export is unstable and may change shape or disappear without notice */
export function DeveloperSection({
  localizedStrings,
  selectedServer,
  onServerChange,
  disabled,
}: DeveloperSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayValue = toDisplayValue(selectedServer);
  // Instance-scoped so two sections on one page (e.g. a Storybook autodocs page) don't collide on
  // duplicate ids, which would wire the second section's labels to the first section's radios.
  const idPrefix = useId();
  const headerId = `${idPrefix}-header`;
  const contentId = `${idPrefix}-content`;
  const radioId = (value: ServerType) => `${idPrefix}-${value}`;

  // A radio fires no change event when the already-checked item is clicked, so a QA user — who
  // sees Production checked — would have no one-click route to the real Production server.
  // (The old ToggleGroup got this free from Radix's deselect-fires-empty-string behavior.)
  // Gated on isSurfaced rather than a value list: a user already on a surfaced server (including
  // Test) must NOT be silently re-routed to Production by clicking their own checked row.
  const persistProductionForHiddenServer = () => {
    if (!isSurfaced(selectedServer)) onServerChange('Production');
  };

  return (
    <div className="tw:border-t tw:pt-2">
      <Button
        id={headerId}
        variant="ghost"
        size="sm"
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className="tw:flex tw:w-full tw:items-center tw:justify-between tw:px-2 tw:font-normal tw:text-muted-foreground"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <span>{localizedStrings['%paratextRegistration_developer_section_label%']}</span>
        <ChevronDown
          className={cn('tw:size-4', 'tw:transition-transform', isExpanded && 'tw:rotate-180')}
        />
      </Button>
      <div id={contentId} className="tw:mt-2 tw:px-2" hidden={!isExpanded}>
        {/* Labelled by the disclosure button above rather than an aria-label, so the group gets an
            accessible name without introducing a new localized string. */}
        <RadioGroup
          aria-labelledby={headerId}
          value={displayValue}
          onValueChange={(v) => {
            if (v === 'Production' || v === 'Development' || v === 'Test') onServerChange(v);
          }}
          disabled={disabled}
        >
          {SERVER_ROWS.map((row) => (
            <div
              key={row.value}
              className={cn(
                'tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded tw:px-2 tw:py-1.5',
                !disabled && 'tw:hover:bg-accent',
              )}
            >
              <RadioGroupItem
                value={row.value}
                id={radioId(row.value)}
                data-testid={row.testId}
                disabled={disabled}
                onClick={row.value === 'Production' ? persistProductionForHiddenServer : undefined}
              />
              {/* Label (not a raw <label>) for pr-twp scope isolation and the peer-disabled
                  dimming every other RadioGroupItem row in the library gets — RadioGroupItem
                  carries `tw:peer`, so the disabled styling needs no branch here. */}
              <Label htmlFor={radioId(row.value)} className="tw:flex-1 tw:cursor-pointer">
                {localizedStrings[row.labelKey]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default DeveloperSection;
