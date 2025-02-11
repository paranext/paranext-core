import { ChevronDown } from 'lucide-react';
import { Popover, PopoverTrigger, Button, PopoverContent, Separator } from 'platform-bible-react';
import { PropsWithChildren } from 'react';

/** Props for the FilterPopover component */
type FilterPopoverProps = PropsWithChildren & {
  /** The selected value of the radio group */
  selectedValue: string;
  /** The label for the radio group */
  radioGroupLabel: string;
  /** A callback function that returns a string that is the label for the given item */
  getSelectedValueLabel: (value: string) => string;
  /** Whether or not the popover trigger should be disabled. Default is false */
  shouldDisableButton?: boolean;
};

/**
 * A Popover component that displays a group of items. The `children` prop should be a `RadioGroup`
 * or set of Checkbox`es and `Label` components.
 */
export default function FilterPopover({
  selectedValue,
  radioGroupLabel,
  getSelectedValueLabel,
  shouldDisableButton = false,
  children,
}: FilterPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="tw-w-full tw-shadow-sm tw-inline-flex tw-items-center tw-justify-between"
          disabled={shouldDisableButton}
        >
          <div className="tw-text-start tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal">
            {getSelectedValueLabel(selectedValue)}
          </div>
          <ChevronDown size={16} className="tw-shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-p-0" align="start">
        <div className="tw-p-3">
          <h4 className="tw-font-medium tw-text-sm">{radioGroupLabel}</h4>
        </div>
        <Separator />
        {children}
      </PopoverContent>
    </Popover>
  );
}
