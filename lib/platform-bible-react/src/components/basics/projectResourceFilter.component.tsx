import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { cn } from '@/utils/shadcn-ui.util';
import { ProjectType, ProjectTypeKey } from 'platform-bible-utils';

export type ProjectResourceFilterValue = ProjectTypeKey | 'all';
export type ProjectResourceFilterProps = {
  defaultValue?: ProjectResourceFilterValue;
  onChange: (value: ProjectResourceFilterValue) => void;
  variant?: 'default' | 'ghost';
  types: ProjectType[];
};

export default function ProjectResourceFilter({
  defaultValue,
  onChange,
  variant,
  types,
}: ProjectResourceFilterProps) {
  return (
    <Select defaultValue={defaultValue ?? 'all'} onValueChange={onChange}>
      <SelectTrigger
        className={cn('tw-w-16 [&>svg]:tw-min-w-4', {
          'tw-border-none tw-bg-transparent hover:tw-bg-secondary hover:tw-text-secondary-foreground':
            variant === 'ghost',
        })}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="all">All</SelectItem>
        {types.map((type: ProjectType) => {
          const Icon = type.icon;
          return (
            <SelectItem value={type.key} key={type.key}>
              <div className="tw-align-center tw-flex tw-justify-start tw-gap-2">
                <div>
                  <Icon className="tw-h-4 tw-pr-0" />
                </div>
                <div>{type.localizedName}</div>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
