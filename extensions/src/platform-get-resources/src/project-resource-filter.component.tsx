import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { ChevronDown, Filter } from 'lucide-react';
import { formatReplacementString } from 'platform-bible-utils';
import { ComponentType, SVGProps } from 'react';

/**
 * Which items Home lists. `paratextProject` and `resource` split on `isPublished`: a published item
 * is a resource, anything else is a Paratext project.
 */
export type ProjectResourceFilterValue = 'all' | 'paratextProject' | 'resource';

export type ProjectResourceFilterOption = {
  key: Exclude<ProjectResourceFilterValue, 'all'>;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

/** Whether a value — a Radix radio group's string, or a saved web view state value — is a filter. */
export function isProjectResourceFilterValue(value: unknown): value is ProjectResourceFilterValue {
  return value === 'all' || value === 'paratextProject' || value === 'resource';
}

/** Whether an item passes the filter, given whether it is a published resource. */
export function isShownByProjectResourceFilter(
  filter: ProjectResourceFilterValue,
  isPublished: boolean,
): boolean {
  if (filter === 'all') return true;
  return (filter === 'resource') === isPublished;
}

export type ProjectResourceFilterProps = {
  value: ProjectResourceFilterValue;
  onChange: (value: ProjectResourceFilterValue) => void;
  options: ProjectResourceFilterOption[];
  localizedAllText: string;
  /**
   * Accessible name and tooltip text for the trigger, which shows only an icon. A format string
   * whose `{filter}` is replaced with the selected option's label, e.g. "Filter by: {filter}".
   */
  localizedFilterByValueText: string;
};

/**
 * Icon-only dropdown that picks one of "all", Paratext projects, or resources. The trigger shows
 * the selected option's icon, and switches to the filled `secondary` look while anything is
 * filtered out, so a narrowed list is visible at a glance. Its label is in a tooltip, which icon
 * buttons require, and in `aria-label`.
 */
export function ProjectResourceFilter({
  value,
  onChange,
  options,
  localizedAllText,
  localizedFilterByValueText,
}: ProjectResourceFilterProps) {
  const selectedOption = options.find((option) => option.key === value);
  const Icon = selectedOption?.icon ?? Filter;
  const triggerLabel = formatReplacementString(localizedFilterByValueText, {
    filter: selectedOption?.label ?? localizedAllText,
  });

  return (
    // `modal={false}` because a modal Radix menu sets `pointer-events: none` on the page, and this one
    // sits beside the search box: the first click into it would only close the menu.
    <DropdownMenu modal={false}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectedOption ? 'secondary' : 'outline'}
                className="tw:shrink-0 tw:gap-1 tw:px-2"
                aria-label={triggerLabel}
              >
                <Icon className="tw:size-4" />
                {/* `size-3` rather than `h-3 w-3`: Button sizes any svg without a `size-` class. */}
                <ChevronDown className="tw:size-3 tw:opacity-50" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>{triggerLabel}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(newValue) => {
            if (isProjectResourceFilterValue(newValue)) onChange(newValue);
          }}
        >
          <DropdownMenuRadioItem value="all">
            <div className="tw:flex tw:items-center tw:gap-2">
              <Filter className="tw:h-4 tw:w-4" />
              <span>{localizedAllText}</span>
            </div>
          </DropdownMenuRadioItem>
          {options.map((option) => {
            const OptionIcon = option.icon;
            return (
              <DropdownMenuRadioItem key={option.key} value={option.key}>
                <div className="tw:flex tw:items-center tw:gap-2">
                  <OptionIcon className="tw:h-4 tw:w-4" />
                  <span>{option.label}</span>
                </div>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
