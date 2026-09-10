import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import { cn } from '@/utils/shadcn-ui/utils';
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

/** @experimental This export is unstable and may change shape or disappear without notice */
export const DEVELOPER_SECTION_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_developer_section_label%',
  '%paratextRegistration_label_serverType_option_Production%',
  '%paratextRegistration_label_serverType_option_QualityAssurance%',
  '%paratextRegistration_label_serverType_option_Development%',
  '%paratextRegistration_label_serverType_option_Test%',
];

/** @experimental This export is unstable and may change shape or disappear without notice */
export type DeveloperSectionProps = {
  /** Localized strings; pass strings resolved from `DEVELOPER_SECTION_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /** The currently selected server type. Every `ServerType` has its own item in the toggle. */
  selectedServer: ServerType;
  /** Called when the user switches to a different server type. */
  onServerChange: (server: ServerType) => void;
  /** When true, the toggle items are non-interactive (loading or saving in progress). */
  disabled: boolean;
};

/** @experimental This export is unstable and may change shape or disappear without notice */
export function DeveloperSection({
  localizedStrings,
  selectedServer,
  onServerChange,
  disabled,
}: DeveloperSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="tw:border-t tw:pt-2">
      <Button
        variant="ghost"
        size="sm"
        aria-expanded={isExpanded}
        aria-controls="developer-section-content"
        className="tw:flex tw:w-full tw:items-center tw:justify-between tw:px-2 tw:font-normal tw:text-muted-foreground"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <span>{localizedStrings['%paratextRegistration_developer_section_label%']}</span>
        <ChevronDown
          className={cn('tw:size-4', 'tw:transition-transform', isExpanded && 'tw:rotate-180')}
        />
      </Button>
      <div id="developer-section-content" className="tw:mt-2 tw:px-2" hidden={!isExpanded}>
        {/* Every ServerType has its own item, so `selectedServer` is always representable and the
            group is never blank — no placeholder value and no escape hatch are needed. */}
        <ToggleGroup
          type="single"
          value={selectedServer}
          onValueChange={(v) => {
            // Radix single-toggle fires '' when the already-selected item is clicked (deselect).
            // Ignore it: exactly one server is always in effect, so there is no "no server" state
            // to represent.
            if (
              v === 'Production' ||
              v === 'QualityAssurance' ||
              v === 'Development' ||
              v === 'Test'
            )
              onServerChange(v);
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
            value="QualityAssurance"
            variant="outline"
            data-testid="server-type-quality-assurance"
          >
            {localizedStrings['%paratextRegistration_label_serverType_option_QualityAssurance%']}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Development"
            variant="outline"
            data-testid="server-type-development"
          >
            {localizedStrings['%paratextRegistration_label_serverType_option_Development%']}
          </ToggleGroupItem>
          <ToggleGroupItem value="Test" variant="outline" data-testid="server-type-test">
            {localizedStrings['%paratextRegistration_label_serverType_option_Test%']}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

export default DeveloperSection;
