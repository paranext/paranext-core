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
import { ProjectType, ProjectTypeKey } from './types/project-type';

export type ProjectResourceFilterValue = ProjectTypeKey | 'all';
export type ProjectResourceFilterProps = {
  value?: ProjectResourceFilterValue;
  onChange: (value: ProjectResourceFilterValue) => void;
  types: ProjectType[];
  localizedAllText: string;
};

export default function ProjectResourceFilter({
  value = 'all',
  onChange,
  types,
  localizedAllText,
}: ProjectResourceFilterProps) {
  const isFiltered = value !== 'all';
  const selectedType = isFiltered ? types.find((type) => type.key === value) : null;
  const Icon = selectedType ? selectedType.icon : Filter;

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
          {types.map((type: ProjectType) => {
            const TypeIcon = type.icon;
            return (
              <DropdownMenuRadioItem value={type.key} key={type.key}>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <TypeIcon className="tw-h-4 tw-w-4" />
                  <span>{type.localizedName}</span>
                </div>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
