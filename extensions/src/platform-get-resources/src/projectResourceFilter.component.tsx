import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from 'platform-bible-react';
import { ChevronDown, Filter } from 'lucide-react';
import { ComponentType, SVGProps } from 'react';

export type FilterOption = {
  key: 'paratextProject' | 'resource';
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type ProjectResourceFilterValue = FilterOption['key'] | 'all';
export type ProjectResourceFilterProps = {
  value?: ProjectResourceFilterValue;
  onChange: (value: ProjectResourceFilterValue) => void;
  options: FilterOption[];
  localizedAllText: string;
};

export default function ProjectResourceFilter({
  value = 'all',
  onChange,
  options,
  localizedAllText,
}: ProjectResourceFilterProps) {
  const isFiltered = value !== 'all';
  const selectedOption = isFiltered ? options.find((opt) => opt.key === value) : null;
  const Icon = selectedOption ? selectedOption.icon : Filter;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToggleGroup
          type="single"
          variant="outline"
          value={isFiltered ? 'active' : ''}
          className="tw-shrink-0"
        >
          <ToggleGroupItem value="active" aria-label="Filter">
            <Icon className="tw-h-4 tw-w-4" />
            <ChevronDown className="tw-h-3 tw-w-3 tw-opacity-50" />
          </ToggleGroupItem>
        </ToggleGroup>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => onChange(v as ProjectResourceFilterValue)}
        >
          <DropdownMenuRadioItem value="all">
            <div className="tw-flex tw-items-center tw-gap-2">
              <Filter className="tw-h-4 tw-w-4" />
              <span>{localizedAllText}</span>
            </div>
          </DropdownMenuRadioItem>
          {options.map((option) => {
            const OptionIcon = option.icon;
            return (
              <DropdownMenuRadioItem value={option.key} key={option.key}>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <OptionIcon className="tw-h-4 tw-w-4" />
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
