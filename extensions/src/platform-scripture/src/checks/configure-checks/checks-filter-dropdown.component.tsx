import { ChevronDown } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Separator,
} from 'platform-bible-react';
import { PropsWithChildren } from 'react';

/** Props for the ChecksFilterDropdown component */
type ChecksFilterDropdownProps = PropsWithChildren & {
  /** The selected value of the radio group */
  selectedValue: string;
  /** The label for the radio group */
  radioGroupLabel: string;
  /** A callback function that returns a string that is the label for the given item */
  getSelectedValueLabel: (value: string) => string;
  /** Whether or not the popover trigger should be disabled. Default is false */
  shouldDisableButton?: boolean;
  /** CSS color of the separator bar between the label and dropdown content. Optional. */
  separatorColorCss?: string;
};

/**
 * Component for the filter and configure dropdowns in the checks side panel
 *
 * The component renders a dropdown with a button showing the currently selected value and a chevron
 * down icon. When the button is clicked, a menu is displayed with a label and the children passed
 * to the component.
 */
export default function ChecksFilterDropdown({
  selectedValue,
  radioGroupLabel,
  getSelectedValueLabel,
  shouldDisableButton,
  separatorColorCss,
  children,
}: ChecksFilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="tw-max-w-sm" align="start">
        <DropdownMenuLabel>{radioGroupLabel}</DropdownMenuLabel>
        <Separator className={separatorColorCss ?? ''} />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
