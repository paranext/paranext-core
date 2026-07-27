import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useState } from 'react';

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

/**
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const DEVELOPER_SECTION_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_developer_section_label%',
  '%paratextRegistration_label_serverType_option_Production%',
  '%paratextRegistration_label_serverType_option_Development%',
];

/**
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type DeveloperSectionProps = {
  /** Localized strings; pass strings resolved from `DEVELOPER_SECTION_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /** The currently selected server type. QA and Test values display as Production. */
  selectedServer: ServerType;
  /** Called when the user switches to Production or Development. */
  onServerChange: (s: ServerType) => void;
  /** When true, the toggle items are non-interactive (loading or saving in progress). */
  disabled: boolean;
};

/**
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function DeveloperSection({
  localizedStrings,
  selectedServer,
  onServerChange,
  disabled,
}: DeveloperSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // QA and Test are not surfaced in this UI; they display as Production.
  const displayValue = selectedServer === 'Development' ? 'Development' : 'Production';

  return (
    <div className="tw:border-t tw:pt-2">
      <Button
        variant="ghost"
        size="sm"
        disabled={disabled}
        aria-expanded={isExpanded}
        aria-controls="developer-section-content"
        className="tw:flex tw:w-full tw:items-center tw:justify-between tw:px-2 tw:font-normal tw:text-muted-foreground"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <span>{localizedStrings['%paratextRegistration_developer_section_label%']}</span>
        <ChevronDown
          className={['tw:size-4', 'tw:transition-transform', isExpanded && 'tw:rotate-180']
            .filter(Boolean)
            .join(' ')}
        />
      </Button>
      <div id="developer-section-content" className="tw:mt-2 tw:px-2" hidden={!isExpanded}>
        <ToggleGroup
          type="single"
          value={displayValue}
          onValueChange={(v) => {
            if (v === 'Production' || v === 'Development') onServerChange(v);
            // Radix single-toggle fires '' when the already-selected item is clicked (deselect).
            // If the user is on QA/Test (displayed as Production), that click should switch them
            // to actual Production so they're not stranded with no escape route.
            else if (v === '' && selectedServer !== 'Production' && selectedServer !== 'Development')
              onServerChange('Production');
          }}
          disabled={disabled}
        >
          <ToggleGroupItem
            value="Production"
            variant="outline"
            data-testid="server-type-production"
          >
            {localizedStrings['%paratextRegistration_label_serverType_option_Production%']}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Development"
            variant="outline"
            data-testid="server-type-development"
          >
            {localizedStrings['%paratextRegistration_label_serverType_option_Development%']}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

export default DeveloperSection;
