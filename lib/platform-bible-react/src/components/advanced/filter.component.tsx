import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { Label } from '@/components/shadcn-ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { resolveLocalizedString } from '@/utils/localization.util';
import { X } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import { MultiSelectComboBox, MultiSelectComboBoxProps } from './multi-select-combo-box.component';

interface FilterProps extends MultiSelectComboBoxProps {
  /**
   * Placeholder text that will be displayed when no items are selected. It will appear at the
   * location where the badges would be if any items were selected.
   */
  badgesPlaceholder: string;
  /** Optional id for the component */
  id?: string;
  /**
   * Localized accessible name and tooltip of the ✕ button on each badge. `{item}` is replaced with
   * the label of the entry the button removes. Defaults to `Remove {item}`.
   */
  removeItemLabel?: string;
}

/**
 * This is a variant of the {@link MultiSelectComboBox}, that shows a {@link Badge} component for each
 * selected item in the combo box. Clicking the 'X' icon on the badge will clear the item from the
 * selected options. A placeholder text must be provided through 'badgesPlaceholder'. This will be
 * displayed if no items are selected,
 */
export function Filter({
  entries,
  selected,
  onChange,
  placeholder,
  searchPlaceholder,
  commandEmptyMessage,
  customSelectedText,
  isDisabled,
  sortSelected,
  showScrollCue,
  icon,
  className,
  badgesPlaceholder,
  id,
  removeItemLabel,
}: FilterProps) {
  const removeItemLabelFormat = resolveLocalizedString(removeItemLabel, 'Remove {item}');
  return (
    <TooltipProvider>
      <div id={id} className="tw:flex tw:items-center tw:gap-2">
        <MultiSelectComboBox
          entries={entries}
          selected={selected}
          onChange={onChange}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          commandEmptyMessage={commandEmptyMessage}
          customSelectedText={customSelectedText}
          isDisabled={isDisabled}
          sortSelected={sortSelected}
          showScrollCue={showScrollCue}
          icon={icon}
          className={className}
        />
        {selected.length > 0 ? (
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
            {selected.map((type) => {
              const entryLabel = entries.find((entry) => entry.value === type)?.label;
              const removeLabel = formatReplacementString(removeItemLabelFormat, {
                item: entryLabel ?? type,
              });
              return (
                <Badge key={type} variant="muted" className="tw:flex tw:items-center tw:gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent"
                        aria-label={removeLabel}
                        onClick={() =>
                          onChange(selected.filter((selectedType) => selectedType !== type))
                        }
                      >
                        <X className="tw:h-3 tw:w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{removeLabel}</TooltipContent>
                  </Tooltip>
                  {entryLabel}
                </Badge>
              );
            })}
          </div>
        ) : (
          <Label>{badgesPlaceholder}</Label>
        )}
      </div>
    </TooltipProvider>
  );
}

export default Filter;
