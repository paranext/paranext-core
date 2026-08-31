import { Button, buttonVariants } from '@/components/shadcn-ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { cn } from '@/utils/shadcn-ui/utils';
import { Check, ChevronsUpDown, Star } from 'lucide-react';
import { ReactNode, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { type VariantProps } from 'class-variance-authority';

/**
 * Tracks whether the scrollable element matching `selector` inside `containerRef` still has content
 * below the fold.
 *
 * A long option list clipped flush at a row boundary looks complete, and the scrollbar alone is a
 * weak signal — with a few hundred options the thumb is only a few pixels tall, and on platforms
 * with overlay scrollbars it reserves no width at all. Callers use this to draw an explicit cue.
 *
 * Resolves the scroller by query rather than by holding a ref to it directly, because the scroller
 * is a vendored component whose ref forwarding is not ours to rely on.
 */
function useHasContentBelow(containerRef: RefObject<HTMLElement | null>, selector: string) {
  const [hasContentBelow, setHasContentBelow] = useState(false);

  useEffect(() => {
    const element = containerRef.current?.querySelector<HTMLElement>(selector);
    if (!element) {
      setHasContentBelow(false);
      return undefined;
    }
    const update = () => {
      // Sub-pixel layout can leave a fractional remainder at the very bottom; 1px of slack keeps
      // the cue from lingering once the user has actually reached the end.
      setHasContentBelow(element.scrollTop + element.clientHeight < element.scrollHeight - 1);
    };
    update();
    element.addEventListener('scroll', update);
    // The scroller's own box never changes (its height is capped), so a resize observer on it only
    // catches viewport-driven changes. Filtering the list changes the CONTENT height instead, which
    // is why the mutation observer below is needed as well.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);
    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(element, { childList: true, subtree: true });
    return () => {
      element.removeEventListener('scroll', update);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [containerRef, selector]);

  return hasContentBelow;
}

/**
 * Wraps the option list and draws a fade at its bottom edge while more options remain below the
 * fold.
 *
 * Its own component (rather than markup inline in {@link MultiSelectComboBox}) so that its effect
 * runs when the popover's content mounts. The combo box does not re-render when Radix mounts the
 * portal, so an effect living up there measures a list that has not been attached yet and concludes
 * there is nothing to scroll.
 */
function OptionListScrollCue({ children }: { children: ReactNode }) {
  // ref.current expects null not undefined for div ref
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  const hasContentBelow = useHasContentBelow(containerRef, '[data-slot="command-list"]');

  return (
    <div className="tw:relative" ref={containerRef}>
      {children}
      {hasContentBelow && (
        <div
          data-slot="command-list-scroll-cue"
          aria-hidden
          className="tw:pointer-events-none tw:absolute tw:inset-x-0 tw:bottom-0 tw:h-6 tw:bg-gradient-to-t tw:from-popover tw:to-transparent"
        />
      )}
    </div>
  );
}

export type MultiSelectComboBoxEntry = {
  value: string;
  label: string;
  secondaryLabel?: string;
  starred?: boolean;
};

/**
 * Props for MultiSelectComboBox component that provides a UI for selecting multiple items from a
 * list. It supports displaying a placeholder, custom selected text, and an optional icon. Users can
 * search through options and view starred items prominently.
 */
export interface MultiSelectComboBoxProps {
  /** The list of entries to select from. */
  entries: MultiSelectComboBoxEntry[];
  /** The currently selected values. */
  selected: string[];
  /** Callback function to handle changes in selection. */
  onChange: (values: string[]) => void;
  /** Placeholder text when no items are selected. */
  placeholder: string;
  /**
   * Placeholder for the search box inside the dropdown. Localize it in the caller — this component
   * cannot build one, because composing a sentence around {@link placeholder} only works in English.
   * Defaults to {@link placeholder}.
   */
  searchPlaceholder?: string;
  /** Whether to show select all/clear all buttons. */
  hasToggleAllFeature?: boolean;
  /** Text for the select all button. */
  selectAllText?: string;
  /** Text for the clear all button. */
  clearAllText?: string;
  /** Message displayed when no entries are found. */
  commandEmptyMessage?: string;
  /** Custom text to display when items are selected. */
  customSelectedText?: string;
  /** Whether the dropdown is open (for controlled usage). */
  isOpen?: boolean;
  /** Handler that is called when the dropdown's open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Flag to disable the component. */
  isDisabled?: boolean;
  /** Flag to sort selected items. */
  sortSelected?: boolean;
  /** Optional icon to display in the button. */
  icon?: ReactNode;
  /** Additional class names for styling. */
  className?: string;
  /** Button variant to use for the trigger button. */
  variant?: VariantProps<typeof buttonVariants>['variant'];
  /** Optional ID for the component. */
  id?: string;
}

/** MultiSelectComboBox component for selecting multiple items from a list. */
export function MultiSelectComboBox({
  entries,
  selected,
  onChange,
  placeholder,
  searchPlaceholder,
  hasToggleAllFeature = false,
  selectAllText = 'Select All',
  clearAllText = 'Clear All',
  commandEmptyMessage = 'No entries found',
  customSelectedText,
  isOpen = undefined,
  onOpenChange = undefined,
  isDisabled = false,
  sortSelected = false,
  icon = undefined,
  className = undefined,
  variant = 'ghost',
  id,
}: MultiSelectComboBoxProps) {
  const [isOpenLocal, setIsOpenLocal] = useState(false);

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

  const handleSelectAll = () => {
    onChange(entries.map((entry) => entry.value));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const actualIsOpen = isOpen ?? isOpenLocal;
  const actualOnOpenChange = onOpenChange ?? setIsOpenLocal;

  return (
    <div id={id} className={className}>
      <Popover open={actualIsOpen} onOpenChange={actualOnOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant={variant}
            role="combobox"
            aria-expanded={actualIsOpen}
            className="tw:group tw:w-full tw:justify-between"
            disabled={isDisabled}
          >
            <div className="tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2">
              {icon && (
                <div className="tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50">
                  <span className="tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center">
                    {icon}
                  </span>
                </div>
              )}
              <span
                className={cn(
                  'tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal',
                )}
              >
                {getPlaceholderText()}
              </span>
            </div>
            <ChevronsUpDown className="tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="tw:w-full tw:p-0">
          <Command>
            <CommandInput
              placeholder={searchPlaceholder ?? placeholder}
              // Picker semantics: the option list is the whole point of this control and a leading
              // space in the search box is meaningless, so Space picks the highlighted option.
              spaceSelectsHighlightedItem
            />
            {hasToggleAllFeature && (
              <div className="tw:flex tw:justify-between tw:border-b tw:p-2">
                <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                  {selectAllText}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClearAll}>
                  {clearAllText}
                </Button>
              </div>
            )}
            <OptionListScrollCue>
              <CommandList>
                <CommandEmpty>{commandEmptyMessage}</CommandEmpty>
                <CommandGroup>
                  {sortedOptions.map((option) => {
                    return (
                      <CommandItem
                        key={option.label}
                        value={option.label}
                        onSelect={handleSelect}
                        className="tw:flex tw:items-center tw:gap-2"
                      >
                        <div className="w-4">
                          <Check
                            className={cn(
                              'tw:h-4 tw:w-4',
                              selected.includes(option.value) ? 'tw:opacity-100' : 'tw:opacity-0',
                            )}
                          />
                        </div>
                        {option.starred && <Star className="tw:h-4 tw:w-4" />}
                        <div className="tw:flex-grow">{option.label}</div>
                        {option.secondaryLabel && (
                          <div className="tw:text-end tw:text-muted-foreground">
                            {option.secondaryLabel}
                          </div>
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </OptionListScrollCue>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default MultiSelectComboBox;
