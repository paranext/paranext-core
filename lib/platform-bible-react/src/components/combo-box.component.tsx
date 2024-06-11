import React, { FocusEventHandler } from 'react';
import '@/components/combo-box.component.css';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './shadcn-ui/popover';
import { ComposableTextField } from './text-field.component';
import { cn } from '@/utils/shadcn-ui.util';

export type ComboBoxLabelOption = { label: string };
export type ComboBoxOption = string | number | ComboBoxLabelOption;

export type ComboBoxProps<T> = {
  /** Optional unique identifier */
  id?: string;
  /** Text label title for combobox */
  title?: string;
  /**
   * If `true`, the component is disabled.
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * If `true`, the component can be cleared, and will have a button to do so
   *
   * @default true
   */
  isClearable?: boolean;
  /**
   * True when (input related to) switch is erroneous
   *
   * @default false
   */
  hasError?: boolean;
  /**
   * If `true`, the input will take up the full width of its container.
   *
   * @default false
   */
  isFullWidth?: boolean;
  /** Width of the combobox in pixels. Setting this prop overrides the `isFullWidth` prop */
  width?: number;
  /** List of available options for the dropdown menu */
  options?: readonly T[];
  /** Additional css classes to help with unique styling of the combo box */
  className?: string;
  /**
   * The selected value that the combo box currently holds. Must be shallow equal to one of the
   * options entries.
   */
  value: T;
  /** Triggers when content of textfield is changed */
  onChange?: (value: T) => void;
  /** Triggers when textfield gets focus */
  onFocus?: FocusEventHandler<HTMLDivElement>; // Storybook crashes when giving the combo box focus
  /** Triggers when textfield loses focus */
  onBlur?: FocusEventHandler<HTMLDivElement>;
  /** Used to determine the string value for a given option. */
  getOptionLabel?: (option: ComboBoxOption) => string;
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
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
function ComboBox<T extends ComboBoxOption = ComboBoxOption>({
  id,
  title,
  isDisabled = false,
  isClearable = true,
  hasError = false,
  isFullWidth = false,
  width,
  options = [],
  className,
  value,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  getOptionLabel = getOptionLabelDefault,
}: ComboBoxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [textValue, setTextValue] = React.useState(getOptionLabel(value));
  return (
    <Command id={id} className={cn({ 'pr-w-full': isFullWidth })}>
      <Popover open={open}>
        <PopoverTrigger asChild>
          <CommandInput asChild onValueChange={setTextValue}>
            <ComposableTextField
              className={className}
              value={open ? textValue : getOptionLabel(value)}
              label={title}
              width={width}
              isFullWidth={isFullWidth}
              disabled={isDisabled}
              hasError={hasError}
              onFocus={(event) => {
                setTextValue(getOptionLabel(value));
                setOpen(true);
                event.target.select();
                onFocus(event);
              }}
              onBlur={(event) => {
                setOpen(false);
                onBlur(event);
              }}
            />
          </CommandInput>
        </PopoverTrigger>
        <PopoverContent
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <CommandList>
            <CommandEmpty>No options</CommandEmpty>
            {options.map((option) => (
              <CommandItem
                onSelect={() => {
                  onChange(option);
                }}
              >
                {getOptionLabel(option)}
              </CommandItem>
            ))}
          </CommandList>
        </PopoverContent>
      </Popover>
    </Command>
  );
}

export default ComboBox;
