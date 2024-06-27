import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import '@/components/combo-box.component.css';
import { cn } from '@/utils/shadcn-ui.util';
import { Popover, PopoverContent, PopoverTrigger } from './shadcn-ui/popover';
import { Button } from './shadcn-ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './shadcn-ui/command';

export type ComboBoxLabelOption = { label: string };
export type ComboBoxOption = string | number | ComboBoxLabelOption;

export type ComboBoxProps<T> = {
  /** Optional unique identifier */
  id?: string;
  /** Text label title for combobox */
  /** List of available options for the dropdown menu */
  options?: readonly T[];
  /** Additional css classes to help with unique styling of the combo box */
  className?: string;
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
  testPlaceholder?: string;
};

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
 * Dropdown selector displaying various options from which to choose
 *
 * Thanks to Shadcn for heavy inspiration and documentation
 * https://ui.shadcn.com/docs/components/combobox
 */
function ComboBox<T extends ComboBoxOption = ComboBoxOption>({
  id,
  options = [],
  className,
  value,
  onChange = () => {},
  getOptionLabel = getOptionLabelDefault,
  buttonPlaceholder = '',
  testPlaceholder = '',
}: ComboBoxProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          id={id}
          className={cn('pr-w-[200px] pr-justify-between', className)}
        >
          {value ? getOptionLabel(value) : buttonPlaceholder}
          <ChevronsUpDown className="pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="pr-w-[200px] pr-p-0">
        <Command>
          <CommandInput placeholder={testPlaceholder} className="pr-text-inherit" />
          <CommandEmpty>No framework found.</CommandEmpty>
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
                  className={cn(
                    'pr-mr-2 pr-h-4 pr-w-4',
                    !value || getOptionLabel(value) === getOptionLabel(option)
                      ? 'pr-opacity-100'
                      : 'pr-opacity-0',
                  )}
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
