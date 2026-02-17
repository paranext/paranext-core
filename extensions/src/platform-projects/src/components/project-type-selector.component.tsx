import { Label } from 'platform-bible-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';

/** All supported project types matching PT9 */
export type ProjectType =
  | 'Standard'
  | 'BackTranslation'
  | 'Daughter'
  | 'Auxiliary'
  | 'StudyBibleAdditions'
  | 'TransliterationManual'
  | 'TransliterationWithEncoder'
  | 'ConsultantNotes';

/** Derived project types that require a base project */
export const DERIVED_PROJECT_TYPES: ProjectType[] = [
  'BackTranslation',
  'Daughter',
  'Auxiliary',
  'StudyBibleAdditions',
  'TransliterationManual',
  'TransliterationWithEncoder',
];

/** Check if a project type is derived (requires base project) */
export function isDerivedType(type: ProjectType | undefined): boolean {
  if (!type) return false;
  return DERIVED_PROJECT_TYPES.includes(type);
}

/** Project type rules derived from the state machine */
export interface ProjectTypeRules {
  showBaseProject: boolean;
  showEncoderFields: boolean;
  languageRequired: boolean;
  baseProjectRequired: boolean;
  editableDefault: boolean;
}

/** Get rules for a given project type per EXT-001 state machine */
export function getProjectTypeRules(type: ProjectType | undefined): ProjectTypeRules {
  if (!type) {
    return {
      showBaseProject: false,
      showEncoderFields: false,
      languageRequired: true,
      baseProjectRequired: false,
      editableDefault: true,
    };
  }

  switch (type) {
    case 'Standard':
    case 'ConsultantNotes':
      return {
        showBaseProject: false,
        showEncoderFields: false,
        languageRequired: true,
        baseProjectRequired: false,
        editableDefault: true,
      };
    case 'BackTranslation':
    case 'Daughter':
    case 'TransliterationManual':
      return {
        showBaseProject: true,
        showEncoderFields: false,
        languageRequired: true,
        baseProjectRequired: true,
        editableDefault: true,
      };
    case 'Auxiliary':
      return {
        showBaseProject: true,
        showEncoderFields: false,
        languageRequired: true,
        baseProjectRequired: true,
        editableDefault: true,
      };
    case 'StudyBibleAdditions':
      return {
        showBaseProject: true,
        showEncoderFields: false,
        languageRequired: false,
        baseProjectRequired: true,
        editableDefault: true,
      };
    case 'TransliterationWithEncoder':
      return {
        showBaseProject: true,
        showEncoderFields: true,
        languageRequired: true,
        baseProjectRequired: true,
        editableDefault: false,
      };
    default:
      return {
        showBaseProject: false,
        showEncoderFields: false,
        languageRequired: true,
        baseProjectRequired: false,
        editableDefault: true,
      };
  }
}

/** Display names for project types used in localization key lookup */
export const PROJECT_TYPE_DISPLAY_KEYS: Record<ProjectType, LocalizeKey> = {
  Standard: '%platformProjects_projectType_standard%',
  BackTranslation: '%platformProjects_projectType_backTranslation%',
  Daughter: '%platformProjects_projectType_daughter%',
  Auxiliary: '%platformProjects_projectType_auxiliary%',
  StudyBibleAdditions: '%platformProjects_projectType_studyBibleAdditions%',
  TransliterationManual: '%platformProjects_projectType_transliterationManual%',
  TransliterationWithEncoder: '%platformProjects_projectType_transliterationWithEncoder%',
  ConsultantNotes: '%platformProjects_projectType_consultantNotes%',
};

const ALL_PROJECT_TYPES: ProjectType[] = [
  'Standard',
  'BackTranslation',
  'Daughter',
  'Auxiliary',
  'StudyBibleAdditions',
  'TransliterationManual',
  'TransliterationWithEncoder',
  'ConsultantNotes',
];

const PROJECT_TYPE_SET = new Set<string>(ALL_PROJECT_TYPES);

function isProjectType(val: string): val is ProjectType {
  return PROJECT_TYPE_SET.has(val);
}

export interface ProjectTypeSelectorProps {
  value: ProjectType | undefined;
  onChange: (type: ProjectType) => void;
  disabled?: boolean;
  localizedStrings: LanguageStrings;
  labelText: string;
}

export default function ProjectTypeSelector({
  value,
  onChange,
  disabled = false,
  localizedStrings,
  labelText,
}: ProjectTypeSelectorProps) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-1">
      <Label>{labelText}</Label>
      <Select
        value={value}
        onValueChange={(val: string) => {
          if (isProjectType(val)) {
            onChange(val);
          }
        }}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue
            placeholder={(() => {
              const val = localizedStrings['%platformProjects_selectProjectType%'];
              return typeof val === 'string' ? val : 'Select project type...';
            })()}
          />
        </SelectTrigger>
        <SelectContent>
          {ALL_PROJECT_TYPES.map((pt) => {
            const keyStr = PROJECT_TYPE_DISPLAY_KEYS[pt];
            // keyStr is always a valid LocalizeKey pattern (%...%), so direct lookup works
            const displayValue = localizedStrings[keyStr];
            return (
              <SelectItem key={pt} value={pt}>
                {typeof displayValue === 'string' ? displayValue : pt}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
