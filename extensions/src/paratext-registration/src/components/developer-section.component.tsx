import { ChevronDown } from 'lucide-react';
import { ServerType } from 'paratext-registration';
import { Button, ToggleGroup, ToggleGroupItem } from 'platform-bible-react';
import type { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useState } from 'react';

export const DEVELOPER_SECTION_STRING_KEYS: LocalizeKey[] = [
  '%paratextRegistration_developer_section_label%',
  '%paratextRegistration_label_serverType_option_Production%',
  '%paratextRegistration_label_serverType_option_Development%',
];

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
        aria-expanded={isExpanded}
        aria-controls="developer-section-content"
        className="tw:flex tw:w-full tw:items-center tw:justify-between tw:px-2 tw:font-normal tw:text-muted-foreground"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <span>{localizedStrings['%paratextRegistration_developer_section_label%']}</span>
        <ChevronDown
          className={`tw:size-4 tw:transition-transform${isExpanded ? ' tw:rotate-180' : ''}`}
        />
      </Button>
      <div id="developer-section-content" className="tw:mt-2 tw:px-2" hidden={!isExpanded}>
        <ToggleGroup
          type="single"
          value={displayValue}
          onValueChange={(v) => {
            if (!v) return; // Ignore deselect attempts — the toggle must always have a value.
            onServerChange(v as 'Production' | 'Development');
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
