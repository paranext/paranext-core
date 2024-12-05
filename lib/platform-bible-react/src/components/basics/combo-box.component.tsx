import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';
import { PopoverProps } from '@radix-ui/react-popover';

export type ComboBoxLabelOption = { label: string };
export type ComboBoxOption = string | number | ComboBoxLabelOption;

export type ComboBoxProps<T> = {
  /** Optional unique identifier */
  id?: string;
  /** Text label title for combobox */
  /** List of available options for the dropdown menu */
  options?: readonly T[];
  /** @deprecated 3 December 2024. Renamed to {@link buttonClassName} */
  className?: string;
  /** Additional css classes to help with unique styling of the combo box button */
  buttonClassName?: string;
  /** Additional css classes to help with unique styling of the combo box popover */
  popoverContentClassName?: string;
  /**
   * The selected value that the combo box currently holds. Must be shallow equal to one of the
   * options entries.
   */
  value?: T;
  /** Triggers when content of textfield is changed */
  onChange?: (newValue: T) => void;
  /** Used to determine the string value for a given option. */
  getOptionLabel?: (option: ComboBoxOption) => string;
  /** Text displayed on button if `value` is undefined */
  buttonPlaceholder?: string;
  /** Placeholder text for text field */
  textPlaceholder?: string;
  /** Text to display when no options match input */
  commandEmptyMessage?: string;
  /** Variant of button */
  buttonVariant?: ButtonProps['variant'];
  /** Text direction ltr or rtl */
  dir?: Direction;
  /** Optional boolean to set if trigger should be disabled */
  isDisabled?: boolean;
} & PopoverProps;

type Direction = 'ltr' | 'rtl';

function getOptionLabelDefault(option: ComboBoxOption): string {
  if (typeof option === 'string') {
    return option;
  }
  if (typeof option === 'number') {
    return option.toString();
  }
  return option.label;
}

/**
 * Autocomplete input and command palette with a list of suggestions.
 *
 * Thanks to Shadcn for heavy inspiration and documentation
 * https://ui.shadcn.com/docs/components/combobox
 */
function ComboBox<T extends ComboBoxOption = ComboBoxOption>({
  id,
  options = [],
  className,
  buttonClassName,
  popoverContentClassName,
  value,
  onChange = () => {},
  getOptionLabel = getOptionLabelDefault,
  buttonPlaceholder = '',
  textPlaceholder = '',
  commandEmptyMessage = 'No option found',
  buttonVariant = 'outline',
  dir = 'ltr',
  isDisabled = false,
  ...props
}: ComboBoxProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant={buttonVariant}
          role="combobox"
          aria-expanded={open}
          id={id}
          className={cn('tw-w-[200px] tw-justify-between', buttonClassName ?? className)}
          disabled={isDisabled}
        >
          <span className="tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap">
            {value ? getOptionLabel(value) : buttonPlaceholder}
          </span>
          <ChevronsUpDown className="tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('tw-w-[200px] tw-p-0', popoverContentClassName)} dir={dir}>
        <Command>
          <CommandInput dir={dir} placeholder={textPlaceholder} className="tw-text-inherit" />
          <CommandEmpty>{commandEmptyMessage}</CommandEmpty>
          <CommandList>
            {options.map((option) => (
              <CommandItem
                key={getOptionLabel(option)}
                value={getOptionLabel(option)}
                onSelect={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn('tw-me-2 tw-h-4 tw-w-4', {
                    'tw-opacity-0': !value || getOptionLabel(value) !== getOptionLabel(option),
                  })}
                />
                {getOptionLabel(option)}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboBox;
