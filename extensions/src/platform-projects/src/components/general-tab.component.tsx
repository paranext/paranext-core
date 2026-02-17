import {
  Button,
  Checkbox,
  ComboBox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import ProjectTypeSelector, {
  ProjectType,
  ProjectTypeRules,
} from './project-type-selector.component';

/** Versification types matching PT9 */
export type VersificationType =
  | 'English'
  | 'Septuagint'
  | 'Original'
  | 'Vulgate'
  | 'RussianOrthodox'
  | 'RussianProtestant';

const VERSIFICATION_OPTIONS: VersificationType[] = [
  'English',
  'Septuagint',
  'Original',
  'Vulgate',
  'RussianOrthodox',
  'RussianProtestant',
];

const VERSIFICATION_SET = new Set<string>(VERSIFICATION_OPTIONS);

function isVersificationType(val: string): val is VersificationType {
  return VERSIFICATION_SET.has(val);
}

const VERSIFICATION_DISPLAY_KEYS: Record<VersificationType, LocalizeKey> = {
  English: '%platformProjects_versification_english%',
  Septuagint: '%platformProjects_versification_septuagint%',
  Original: '%platformProjects_versification_original%',
  Vulgate: '%platformProjects_versification_vulgate%',
  RussianOrthodox: '%platformProjects_versification_russianOrthodox%',
  RussianProtestant: '%platformProjects_versification_russianProtestant%',
};

export interface LanguageOption {
  id: string;
  name: string;
}

export interface ProjectReference {
  guid: string;
  shortName: string;
  fullName: string;
}

export interface GeneralTabProps {
  fullName: string;
  shortName: string;
  projectType: ProjectType | undefined;
  languageId: string | undefined;
  versification: VersificationType | undefined;
  baseProjectGuid: string | undefined;
  editable: boolean;
  typeRules: ProjectTypeRules;
  languages: LanguageOption[];
  filteredBaseProjects: ProjectReference[];
  validationErrors: Record<string, string>;
  localizedStrings: LanguageStrings;
  onFullNameChange: (value: string) => void;
  onProjectTypeChange: (type: ProjectType) => void;
  onLanguageChange: (languageId: string) => void;
  onVersificationChange: (versification: VersificationType) => void;
  onBaseProjectChange: (guid: string) => void;
  onEditableChange: (checked: boolean) => void;
  onEditNameClick: () => void;
}

export default function GeneralTab({
  fullName,
  shortName,
  projectType,
  languageId,
  versification,
  baseProjectGuid,
  editable,
  typeRules,
  languages,
  filteredBaseProjects,
  validationErrors,
  localizedStrings,
  onFullNameChange,
  onProjectTypeChange,
  onLanguageChange,
  onVersificationChange,
  onBaseProjectChange,
  onEditableChange,
  onEditNameClick,
}: GeneralTabProps) {
  const l = (key: LocalizeKey, fallback: string): string => {
    const value = localizedStrings[key];
    if (typeof value === 'string') return value;
    return fallback;
  };

  const languageOptions = languages.map((lang) => lang.name);
  const selectedLanguageName = languages.find((lang) => lang.id === languageId)?.name;

  const baseProjectOptions = filteredBaseProjects.map((p) => `${p.shortName} - ${p.fullName}`);
  const selectedBaseProjectLabel = filteredBaseProjects.find((p) => p.guid === baseProjectGuid);
  const selectedBaseProjectDisplay = selectedBaseProjectLabel
    ? `${selectedBaseProjectLabel.shortName} - ${selectedBaseProjectLabel.fullName}`
    : undefined;

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Full Name */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="fullName">{l('%platformProjects_label_fullName%', 'Full Name:')}</Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          aria-label={l('%platformProjects_label_fullName%', 'Full Name')}
        />
        {validationErrors.fullName && (
          <span className="tw-text-sm tw-text-destructive">{validationErrors.fullName}</span>
        )}
      </div>

      {/* Short Name */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="shortName">{l('%platformProjects_label_shortName%', 'Short Name:')}</Label>
        <div className="tw-flex tw-gap-2 tw-items-center">
          <Input
            id="shortName"
            value={shortName}
            readOnly
            className="tw-flex-1"
            aria-label={l('%platformProjects_label_shortName%', 'Short Name')}
          />
          <Button type="button" variant="outline" onClick={onEditNameClick}>
            {l('%platformProjects_button_editName%', 'Edit Name...')}
          </Button>
        </div>
        {validationErrors.shortName && (
          <span className="tw-text-sm tw-text-destructive">{validationErrors.shortName}</span>
        )}
      </div>

      {/* Project Type */}
      <ProjectTypeSelector
        value={projectType}
        onChange={onProjectTypeChange}
        localizedStrings={localizedStrings}
        labelText={l('%platformProjects_label_projectType%', 'Project Type:')}
      />
      {validationErrors.projectType && (
        <span className="tw-text-sm tw-text-destructive">{validationErrors.projectType}</span>
      )}

      {/* Language */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label>
          {l('%platformProjects_label_language%', 'Language:')}
          {typeRules.languageRequired && <span className="tw-text-destructive"> *</span>}
        </Label>
        <div className="tw-flex tw-gap-2 tw-items-center">
          <ComboBox
            options={languageOptions}
            value={selectedLanguageName}
            onChange={(newVal) => {
              const selected = languages.find((lang) => lang.name === newVal);
              if (selected) onLanguageChange(selected.id);
            }}
            buttonPlaceholder={l('%platformProjects_selectLanguage%', 'Select language...')}
            buttonClassName="tw-flex-1"
          />
        </div>
        {validationErrors.language && (
          <span className="tw-text-sm tw-text-destructive">{validationErrors.language}</span>
        )}
      </div>

      {/* Versification */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label>{l('%platformProjects_label_versification%', 'Versification:')}</Label>
        <Select
          value={versification}
          onValueChange={(val: string) => {
            if (isVersificationType(val)) {
              onVersificationChange(val);
            }
          }}
          disabled={typeRules.showBaseProject && !!baseProjectGuid}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={l('%platformProjects_selectVersification%', 'Select versification...')}
            />
          </SelectTrigger>
          <SelectContent>
            {VERSIFICATION_OPTIONS.map((v) => (
              <SelectItem key={v} value={v}>
                {l(VERSIFICATION_DISPLAY_KEYS[v], v)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {validationErrors.versification && (
          <span className="tw-text-sm tw-text-destructive">{validationErrors.versification}</span>
        )}
      </div>

      {/* Base Project (conditional) */}
      {typeRules.showBaseProject && (
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label>
            {l('%platformProjects_label_basedOn%', 'Based On:')}
            {typeRules.baseProjectRequired && <span className="tw-text-destructive"> *</span>}
          </Label>
          <ComboBox
            options={baseProjectOptions}
            value={selectedBaseProjectDisplay}
            onChange={(newVal) => {
              const selected = filteredBaseProjects.find(
                (p) => `${p.shortName} - ${p.fullName}` === newVal,
              );
              if (selected) onBaseProjectChange(selected.guid);
            }}
            buttonPlaceholder={l('%platformProjects_selectBaseProject%', 'Select base project...')}
          />
          {validationErrors.baseProject && (
            <span className="tw-text-sm tw-text-destructive">{validationErrors.baseProject}</span>
          )}
        </div>
      )}

      {/* Editable checkbox */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
          id="editable"
          checked={editable}
          onCheckedChange={(checked: boolean) => onEditableChange(checked)}
        />
        <Label htmlFor="editable">{l('%platformProjects_label_editable%', 'Editable')}</Label>
      </div>
    </div>
  );
}
