import { Button } from '@/components/shadcn-ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { cn } from '@/utils/shadcn-ui.util';
import { Check, ChevronsUpDown, Star } from 'lucide-react';
import { ReactNode, useCallback, useMemo, useState } from 'react';

export type MultiSelectComboBoxEntry = {
  value: string;
  label: string;
  starred?: boolean;
};

export interface MultiSelectComboBoxProps {
  entries: MultiSelectComboBoxEntry[];
  getEntriesCount?: (option: MultiSelectComboBoxEntry) => number;
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  commandEmptyMessage?: string;
  customSelectedText?: string;
  isDisabled?: boolean;
  sortSelected?: boolean;
  icon?: ReactNode;
  className?: string;
}

/**
 * MultiSelectComboBox is a component that provides a UI for selecting multiple items from a list.
 * It supports displaying a placeholder, custom selected text, and an optional icon. Users can
 * search through options and view starred items prominently.
 *
 * @param {MultiSelectComboBoxProps} props
 * @param {MultiSelectComboBoxEntry[]} props.entries - The list of entries to select from.
 * @param {function} [props.getEntriesCount] - Optional function to get the count of entries.
 * @param {string[]} props.selected - The currently selected values.
 * @param {function} props.onChange - Callback function to handle changes in selection.
 * @param {string} props.placeholder - Placeholder text when no items are selected.
 * @param {string} [props.commandEmptyMessage] - Message displayed when no entries are found.
 * @param {string} [props.customSelectedText] - Custom text to display when items are selected.
 * @param {boolean} [props.isDisabled] - Flag to disable the component.
 * @param {boolean} [props.sortSelected] - Flag to sort selected items.
 * @param {ReactNode} [props.icon] - Optional icon to display in the button.
 * @param {string} [props.className] - Additional class names for styling.
 */
export function MultiSelectComboBox({
  entries,
  getEntriesCount = undefined,
  selected,
  onChange,
  placeholder,
  commandEmptyMessage = 'No entries found',
  customSelectedText,
  isDisabled = false,
  sortSelected = false,
  icon = undefined,
  className = undefined,
}: MultiSelectComboBoxProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (label: string) => {
      const value = entries.find((entry) => entry.label === label)?.value;
      if (!value) return;
      onChange(
        selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value],
      );
    },
    [entries, selected, onChange],
  );

  const getPlaceholderText = () => {
    if (customSelectedText) return customSelectedText;
    return placeholder;
  };

  const sortedOptions = useMemo(() => {
    if (!sortSelected) return entries;

    const starredItems = entries
      .filter((opt) => opt.starred)
      .sort((a, b) => a.label.localeCompare(b.label));
    const nonStarredItems = entries
      .filter((opt) => !opt.starred)
      .sort((a, b) => {
        const aSelected = selected.includes(a.value);
        const bSelected = selected.includes(b.value);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return a.label.localeCompare(b.label);
      });

    return [...starredItems, ...nonStarredItems];
  }, [entries, selected, sortSelected]);

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'tw-w-full tw-justify-between',
              selected.length > 0 && selected.length < entries.length && 'tw-border-primary',
              'tw-group',
            )}
            disabled={isDisabled}
          >
            <div className="tw-flex tw-items-center tw-gap-2">
              <div className="tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50">
                <span className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center">
                  {icon}
                </span>
              </div>
              <div
                className={cn({
                  'tw-text-muted-foreground group-hover:tw-text-secondary-foreground':
                    selected.length === 0 || selected.length === entries.length,
                })}
              >
                <div className="tw-font-normal">{getPlaceholderText()}</div>
              </div>
            </div>
            <ChevronsUpDown className="tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="tw-w-full tw-p-0">
          <Command>
            <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>{commandEmptyMessage}</CommandEmpty>
              <CommandGroup>
                {sortedOptions.map((option) => {
                  const count: number | undefined = getEntriesCount
                    ? getEntriesCount(option)
                    : undefined;
                  return (
                    <CommandItem
                      key={option.label}
                      value={option.label}
                      onSelect={handleSelect}
                      className="tw-flex tw-items-center tw-gap-2"
                    >
                      <div className="w-4">
                        <Check
                          className={cn(
                            'tw-h-4 tw-w-4',
                            selected.includes(option.value) ? 'tw-opacity-100' : 'tw-opacity-0',
                          )}
                        />
                      </div>
                      <div className="tw-w-4">
                        {option.starred && <Star className="tw-h-4 tw-w-4" />}
                      </div>
                      <div className="tw-flex-grow">{option.label}</div>
                      {getEntriesCount && (
                        <div className="tw-w-10 tw-text-end tw-text-muted-foreground">{count}</div>
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MultiSelectComboBox;
