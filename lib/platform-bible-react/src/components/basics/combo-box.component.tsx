import { ReactNode, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';
import { PopoverProps } from '@radix-ui/react-popover';

export type ComboBoxLabelOption = { label: string; secondaryLabel?: string };
export type ComboBoxOption = string | number | ComboBoxLabelOption;

/** Represents a group of options with an optional heading */
export type ComboBoxGroup<T> = {
  /** The heading text for this group of options */
  groupHeading: string;
  /** The options within this group */
  options: readonly T[];
};

export type ComboBoxProps<T> = {
  /** Optional unique identifier */
  id?: string;
  /**
   * List of available options for the dropdown menu. Can be either:
   *
   * - A flat array of options (single group, no heading)
   * - An array of group objects. Each group has a heading and an array of options
   */
  options?: readonly T[] | readonly ComboBoxGroup<T>[];
  /** @deprecated 3 December 2024. Renamed to `buttonClassName` */
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
  getOptionLabel?: (option: T) => string;
  /**
   * Used to determine the string value to display on the button for the selected value. If not
   * provided, falls back to `getOptionLabel`.
   */
  getButtonLabel?: (option: T) => string;
  /** Icon to be displayed on the trigger */
  icon?: ReactNode;
  /** Text displayed on button if `value` is undefined */
  buttonPlaceholder?: string;
  /** Placeholder text for text field */
  textPlaceholder?: string;
  /** Text to display when no options match input */
  commandEmptyMessage?: string;
  /** Variant of button */
  buttonVariant?: ButtonProps['variant'];
  /** Control how the popover menu should be aligned. Defaults to start */
  alignDropDown?: 'start' | 'center' | 'end';
  /** Optional boolean to set if trigger should be disabled */
  isDisabled?: boolean;
  /** Optional aria-label for the trigger button for accessibility */
  ariaLabel?: string;
} & PopoverProps;

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
export function ComboBox<T extends ComboBoxOption = ComboBoxOption>({
  id,
  options = [],
  className,
  buttonClassName,
  popoverContentClassName,
  value,
  onChange = () => {},
  getOptionLabel = getOptionLabelDefault,
  getButtonLabel,
  icon = undefined,
  buttonPlaceholder = '',
  textPlaceholder = '',
  commandEmptyMessage = 'No option found',
  buttonVariant = 'outline',
  alignDropDown = 'start',
  isDisabled = false,
  ariaLabel,
  ...props
}: ComboBoxProps<T>) {
  const [open, setOpen] = useState(false);

  const buttonLabel = getButtonLabel ?? getOptionLabel;

  const isGroupedOptions = (
    groupOptions: readonly T[] | readonly ComboBoxGroup<T>[],
  ): groupOptions is readonly ComboBoxGroup<T>[] => {
    return Boolean(
      groupOptions.length > 0 &&
        typeof groupOptions[0] === 'object' &&
        'options' in groupOptions[0],
    );
  };

  const renderCommandItem = (option: T, groupHeading?: string) => {
    const optionLabel = getOptionLabel(option);
    const secondaryLabel =
      typeof option === 'object' && 'secondaryLabel' in option ? option.secondaryLabel : undefined;

    const key = `${groupHeading ?? ''}${optionLabel}${secondaryLabel ?? ''}`;

    return (
      <CommandItem
        key={key}
        value={optionLabel}
        onSelect={() => {
          onChange(option);
          setOpen(false);
        }}
        className="tw-flex tw-items-center"
      >
        <Check
          className={cn('tw-me-2 tw-h-4 tw-w-4 tw-shrink-0', {
            'tw-opacity-0': !value || getOptionLabel(value) !== optionLabel,
          })}
        />
        <span className="tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap">
          {optionLabel}
          {secondaryLabel && <span className="tw-text-muted-foreground"> · {secondaryLabel}</span>}
        </span>
      </CommandItem>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant={buttonVariant}
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          id={id}
          className={cn(
            'tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden',
            buttonClassName ?? className,
          )}
          disabled={isDisabled}
        >
          <div className="tw-flex tw-flex-1 tw-items-center tw-overflow-hidden">
            {icon && <div className="tw-pe-2">{icon}</div>}
            <span className={cn('tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap')}>
              {value ? buttonLabel(value) : buttonPlaceholder}
            </span>
          </div>

          <ChevronsUpDown className="tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={alignDropDown}
        className={cn('tw-w-[200px] tw-p-0', popoverContentClassName)}
      >
        <Command>
          <CommandInput placeholder={textPlaceholder} className="tw-text-inherit" />
          <CommandEmpty>{commandEmptyMessage}</CommandEmpty>
          <CommandList>
            {isGroupedOptions(options)
              ? options.map((group) => (
                  <CommandGroup key={group.groupHeading} heading={group.groupHeading}>
                    {group.options.map((option) => renderCommandItem(option, group.groupHeading))}
                  </CommandGroup>
                ))
              : options.map((option) => renderCommandItem(option))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboBox;
