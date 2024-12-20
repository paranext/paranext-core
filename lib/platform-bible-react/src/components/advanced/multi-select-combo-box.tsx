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

type MultiSelectComboBoxEntry = {
  value: string;
  label: string;
  starred?: boolean;
};

interface MultiSelectComboBoxProps {
  entries: MultiSelectComboBoxEntry[];
  getEntriesCount?: (option: MultiSelectComboBoxEntry) => number;
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  commandEmptyMessage?: string;
  customSelectedText?: string;
  sortSelected?: boolean;
  icon?: ReactNode;
}

function MultiSelectComboBox({
  entries,
  getEntriesCount = undefined,
  selected,
  onChange,
  placeholder,
  commandEmptyMessage = 'No entries found',
  customSelectedText,
  sortSelected = false,
  icon = undefined,
}: MultiSelectComboBoxProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (value: string) => {
      onChange(
        selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value],
      );
    },
    [selected, onChange],
  );

  const getPlaceholderText = () => {
    if (selected.length === 1)
      return entries.find((option) => option.value === selected[0])?.label ?? placeholder;
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'tw-w-full tw-justify-between',
            selected.length > 0 && selected.length < entries.length && 'tw-border-primary',
            'tw-group',
          )}
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
              {getPlaceholderText()}
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
                    key={option.value}
                    value={option.value}
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
  );
}

export default MultiSelectComboBox;
