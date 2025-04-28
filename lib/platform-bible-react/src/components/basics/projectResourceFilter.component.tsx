import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { cn } from '@/utils/shadcn-ui.util';
import { BookOpen, ScrollText } from 'lucide-react';

export type ProjectResourceFilterProps = {
  defaultValue?: 'projects' | 'resources' | 'all';
  onChange: (value: string) => void;
  variant?: 'default' | 'ghost';
};

export default function ProjectResourceFilter({
  defaultValue,
  onChange,
  variant,
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
        <SelectItem value="projects">
          <div className="tw-align-center tw-flex tw-justify-start tw-gap-2">
            <div>
              <ScrollText className="tw-w-4" />
            </div>
            <div>Projects</div>
          </div>
        </SelectItem>
        <SelectItem value="resources">
          <div className="tw-align-center tw-flex tw-justify-start tw-gap-2">
            <div>
              <BookOpen className="tw-w-4" />
            </div>
            <div>Resources</div>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
