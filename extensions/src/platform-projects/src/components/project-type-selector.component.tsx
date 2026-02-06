import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { ProjectType, ProjectTypeOption, PROJECT_TYPE_OPTIONS } from '../project-properties.utils';

export interface ProjectTypeSelectorProps {
  value: ProjectType | undefined;
  onChange: (projectType: ProjectType) => void;
  label: string;
  disabled?: boolean;
  error?: string;
}

export default function ProjectTypeSelector({
  value,
  onChange,
  label,
  disabled = false,
  error,
}: ProjectTypeSelectorProps) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-1">
      <Label htmlFor="projectType">{label}</Label>
      <Select
        value={value}
        onValueChange={(val: string) => onChange(val as ProjectType)}
        disabled={disabled}
      >
        <SelectTrigger
          id="projectType"
          className={error ? 'tw-border-destructive' : undefined}
          aria-invalid={!!error}
          aria-describedby={error ? 'projectType-error' : undefined}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PROJECT_TYPE_OPTIONS.map((option: ProjectTypeOption) => (
            <SelectItem key={option.type} value={option.type}>
              {option.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <Label id="projectType-error" className="tw-text-sm tw-text-destructive" role="alert">
          {error}
        </Label>
      ) : undefined}
    </div>
  );
}
