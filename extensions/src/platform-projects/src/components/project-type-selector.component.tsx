/**
 * === NEW IN PT10 === Reason: React component for project type selection Maps to: UI-PKG-001
 * (GeneralTab)
 */

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';
import { isProjectType, PROJECT_TYPES, ProjectType } from '../project-properties.utils';

export interface ProjectTypeSelectorProps {
  /** Currently selected project type */
  value: ProjectType | undefined;
  /** Callback when selection changes */
  onChange: (value: ProjectType) => void;
  /** Localized strings */
  localizedStrings: LanguageStrings;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
}

/** Display names for project types */
const PROJECT_TYPE_DISPLAY_NAMES: Record<ProjectType, string> = {
  Standard: 'Standard Translation',
  BackTranslation: 'Back Translation',
  Daughter: 'Daughter',
  Auxiliary: 'Auxiliary',
  StudyBibleAdditions: 'Study Bible Additions',
  TransliterationManual: 'Transliteration (Manual)',
  TransliterationWithEncoder: 'Transliteration (With Encoder)',
  ConsultantNotes: 'Consultant Notes',
};

/** ProjectTypeSelector component for selecting project type */
export function ProjectTypeSelector({
  value,
  onChange,
  localizedStrings,
  disabled = false,
  placeholder,
}: ProjectTypeSelectorProps) {
  return (
    <Select
      value={value ?? undefined}
      onValueChange={(val) => {
        if (isProjectType(val)) {
          onChange(val);
        }
      }}
      disabled={disabled}
    >
      <SelectTrigger
        className="tw-w-full"
        aria-label={localizedStrings['%webView_projectProperties_ariaLabel_projectTypeSelect%']}
      >
        <SelectValue
          placeholder={
            placeholder ||
            localizedStrings['%webView_projectProperties_placeholder_selectProjectType%']
          }
        />
      </SelectTrigger>
      <SelectContent>
        {PROJECT_TYPES.map((type) => (
          <SelectItem key={type} value={type}>
            {PROJECT_TYPE_DISPLAY_NAMES[type]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ProjectTypeSelector;
