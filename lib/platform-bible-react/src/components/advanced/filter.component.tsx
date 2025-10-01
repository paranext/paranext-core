import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { Label } from '@/components/shadcn-ui/label';
import { X } from 'lucide-react';
import { MultiSelectComboBox, MultiSelectComboBoxProps } from './multi-select-combo-box.component';

interface FilterProps extends MultiSelectComboBoxProps {
  /**
   * Placeholder text that will be displayed when no items are selected. It will appear at the
   * location where the badges would be if any items were selected.
   */
  badgesPlaceholder: string;
  /** Optional id for the component */
  id?: string;
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
  commandEmptyMessage,
  customSelectedText,
  isDisabled,
  sortSelected,
  icon,
  className,
  badgesPlaceholder,
  id,
}: FilterProps) {
  return (
    <div id={id} className="tw-flex tw-items-center tw-gap-2">
      <MultiSelectComboBox
        entries={entries}
        selected={selected}
        onChange={onChange}
        placeholder={placeholder}
        commandEmptyMessage={commandEmptyMessage}
        customSelectedText={customSelectedText}
        isDisabled={isDisabled}
        sortSelected={sortSelected}
        icon={icon}
        className={className}
      />
      {selected.length > 0 ? (
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
          {selected.map((type) => (
            <Badge key={type} variant="muted" className="tw-flex tw-items-center tw-gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent"
                onClick={() => onChange(selected.filter((selectedType) => selectedType !== type))}
              >
                <X className="tw-h-3 tw-w-3" />
              </Button>
              {entries.find((entry) => entry.value === type)?.label}
            </Badge>
          ))}
        </div>
      ) : (
        <Label>{badgesPlaceholder}</Label>
      )}
    </div>
  );
}

export default Filter;
