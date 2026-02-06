/**
 * === NEW IN PT10 === Reason: React component for General tab of Project Properties form Maps to:
 * UI-PKG-001
 */

import {
  Button,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';
import { useCallback } from 'react';
import {
  isDerivedType,
  isVersificationType,
  ProjectType,
  requiresEncoder,
  requiresLanguage,
  VersificationType,
  VERSIFICATION_TYPES,
} from '../project-properties.utils';
import { ProjectTypeSelector } from './project-type-selector.component';

export interface LanguageOption {
  id: string;
  name: string;
  isRightToLeft: boolean;
}

export interface ProjectReference {
  guid: string;
  shortName: string;
  fullName: string;
  projectType: ProjectType;
}

export interface EncoderOption {
  name: string;
  displayName: string;
  isBidirectional: boolean;
}

export interface GeneralTabProps {
  // Field values
  fullName: string;
  shortName: string;
  projectType: ProjectType | undefined;
  languageId: string | undefined;
  versification: VersificationType | undefined;
  baseProjectGuid: string | undefined;
  editable: boolean;
  encoderName: string | undefined;
  encoderReverseDirection: boolean;

  // Options
  languages: LanguageOption[];
  baseProjects: ProjectReference[];
  encoders: EncoderOption[];

  // Validation errors
  validationErrors: Record<string, string>;

  // Callbacks
  onFullNameChange: (value: string) => void;
  onProjectTypeChange: (value: ProjectType) => void;
  onLanguageChange: (value: string | undefined) => void;
  onVersificationChange: (value: VersificationType) => void;
  onBaseProjectChange: (value: string | undefined) => void;
  onEditableChange: (value: boolean) => void;
  onEncoderChange: (value: string | undefined) => void;
  onEncoderReverseDirectionChange: (value: boolean) => void;
  onEditNameClick: () => void;
  onLanguageSettingsClick: () => void;

  // Localized strings
  localizedStrings: LanguageStrings;

  // Mode
  isEditMode: boolean;
}

/** GeneralTab component for the General tab of Project Properties form */
export function GeneralTab({
  fullName,
  shortName,
  projectType,
  languageId,
  versification,
  baseProjectGuid,
  editable,
  encoderName,
  encoderReverseDirection,
  languages,
  baseProjects,
  encoders,
  validationErrors,
  onFullNameChange,
  onProjectTypeChange,
  onLanguageChange,
  onVersificationChange,
  onBaseProjectChange,
  onEditableChange,
  onEncoderChange,
  onEncoderReverseDirectionChange,
  onEditNameClick,
  onLanguageSettingsClick,
  localizedStrings,
  isEditMode,
}: GeneralTabProps) {
  // Derived visibility states
  const showBaseProject = isDerivedType(projectType);
  const showEncoderFields = requiresEncoder(projectType);
  const languageRequired = requiresLanguage(projectType);

  // Filter base projects based on project type
  const filteredBaseProjects = useCallback(() => {
    if (!projectType) return baseProjects;

    // Apply filtering rules per EXT-001
    return baseProjects.filter((proj) => {
      switch (projectType) {
        case 'BackTranslation':
        case 'Daughter':
        case 'TransliterationManual':
        case 'TransliterationWithEncoder':
          // Scripture types only, not resources
          return ['Standard', 'BackTranslation', 'Daughter'].includes(proj.projectType);
        case 'Auxiliary':
          // Standard type only
          return proj.projectType === 'Standard';
        case 'StudyBibleAdditions':
          // Scripture types only, NOT StudyBible type
          return (
            ['Standard', 'BackTranslation', 'Daughter'].includes(proj.projectType) &&
            proj.projectType !== 'StudyBibleAdditions'
          );
        default:
          return true;
      }
    });
  }, [projectType, baseProjects])();

  const renderFieldError = (fieldName: string) => {
    const error = validationErrors[fieldName];
    if (!error) return undefined;
    return (
      <Label className="tw-text-sm tw-text-destructive" role="alert">
        {error}
      </Label>
    );
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Full Name */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="fullName">
          {localizedStrings['%webView_projectProperties_field_fullName%']}{' '}
          <span aria-hidden="true">*</span>
          <span className="tw-sr-only">(required)</span>
        </Label>
        <div className="tw-flex tw-gap-2">
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            disabled={isEditMode}
            aria-invalid={!!validationErrors.fullName}
            aria-describedby={validationErrors.fullName ? 'fullName-error' : undefined}
            aria-label={localizedStrings['%webView_projectProperties_ariaLabel_fullNameInput%']}
            className="tw-flex-1"
          />
          <Button type="button" variant="outline" onClick={onEditNameClick}>
            {localizedStrings['%webView_projectProperties_button_editName%']}
          </Button>
        </div>
        {validationErrors.fullName && (
          <Label id="fullName-error" className="tw-text-sm tw-text-destructive" role="alert">
            {validationErrors.fullName}
          </Label>
        )}
      </div>

      {/* Short Name (read-only display) */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="shortName">
          {localizedStrings['%webView_projectProperties_field_shortName%']}{' '}
          <span aria-hidden="true">*</span>
          <span className="tw-sr-only">(required)</span>
        </Label>
        <Input
          id="shortName"
          value={shortName}
          disabled
          aria-label={localizedStrings['%webView_projectProperties_ariaLabel_shortNameInput%']}
        />
        {renderFieldError('shortName')}
      </div>

      {/* Project Type */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="projectType">
          {localizedStrings['%webView_projectProperties_field_projectType%']}{' '}
          <span aria-hidden="true">*</span>
          <span className="tw-sr-only">(required)</span>
        </Label>
        <ProjectTypeSelector
          value={projectType}
          onChange={onProjectTypeChange}
          localizedStrings={localizedStrings}
          disabled={isEditMode}
        />
        {renderFieldError('projectType')}
      </div>

      {/* Language */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="language">
          {localizedStrings['%webView_projectProperties_field_language%']}
          {languageRequired && (
            <>
              {' '}
              <span aria-hidden="true">*</span>
              <span className="tw-sr-only">(required)</span>
            </>
          )}
        </Label>
        <div className="tw-flex tw-gap-2">
          <Select
            value={languageId ?? undefined}
            onValueChange={(val) => onLanguageChange(val || undefined)}
          >
            <SelectTrigger
              className="tw-flex-1"
              aria-label={localizedStrings['%webView_projectProperties_ariaLabel_languageSelect%']}
            >
              <SelectValue
                placeholder={
                  localizedStrings['%webView_projectProperties_placeholder_selectLanguage%']
                }
              />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onLanguageSettingsClick}
                    disabled
                  >
                    {localizedStrings['%webView_projectProperties_button_languageSettings%']}
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {localizedStrings['%webView_projectProperties_tooltip_featureNotAvailable%']}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {renderFieldError('language')}
      </div>

      {/* Versification */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="versification">
          {localizedStrings['%webView_projectProperties_field_versification%']}{' '}
          <span aria-hidden="true">*</span>
          <span className="tw-sr-only">(required)</span>
        </Label>
        <Select
          value={versification ?? undefined}
          onValueChange={(val) => {
            if (isVersificationType(val)) {
              onVersificationChange(val);
            }
          }}
          disabled={showBaseProject && !!baseProjectGuid}
        >
          <SelectTrigger
            className="tw-w-full"
            aria-label={
              localizedStrings['%webView_projectProperties_ariaLabel_versificationSelect%']
            }
          >
            <SelectValue
              placeholder={
                localizedStrings['%webView_projectProperties_placeholder_selectVersification%']
              }
            />
          </SelectTrigger>
          <SelectContent>
            {VERSIFICATION_TYPES.map((vers) => (
              <SelectItem key={vers} value={vers}>
                {vers}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {renderFieldError('versification')}
      </div>

      {/* Base Project (conditional) */}
      {showBaseProject && (
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="baseProject">
            {localizedStrings['%webView_projectProperties_field_baseProject%']}{' '}
            <span aria-hidden="true">*</span>
            <span className="tw-sr-only">(required)</span>
          </Label>
          <Select
            value={baseProjectGuid ?? undefined}
            onValueChange={(val) => onBaseProjectChange(val || undefined)}
          >
            <SelectTrigger
              className="tw-w-full"
              aria-label={
                localizedStrings['%webView_projectProperties_ariaLabel_baseProjectSelect%']
              }
            >
              <SelectValue
                placeholder={
                  localizedStrings['%webView_projectProperties_placeholder_selectBaseProject%']
                }
              />
            </SelectTrigger>
            <SelectContent>
              {filteredBaseProjects.map((proj) => (
                <SelectItem key={proj.guid} value={proj.guid}>
                  {proj.shortName} - {proj.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {renderFieldError('baseProject')}
        </div>
      )}

      {/* Editable Checkbox */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
          id="editable"
          checked={editable}
          onCheckedChange={(checked) => onEditableChange(checked === true)}
          disabled={showEncoderFields}
          aria-label={localizedStrings['%webView_projectProperties_ariaLabel_editableCheckbox%']}
        />
        <Label htmlFor="editable" className="tw-cursor-pointer">
          {localizedStrings['%webView_projectProperties_field_editable%']}
        </Label>
      </div>

      {/* Encoder Fields (conditional for TransliterationWithEncoder) */}
      {showEncoderFields && (
        <>
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="encoder">
              {localizedStrings['%webView_projectProperties_field_encodingConverter%']}{' '}
              <span aria-hidden="true">*</span>
              <span className="tw-sr-only">(required)</span>
            </Label>
            <Select
              value={encoderName ?? undefined}
              onValueChange={(val) => onEncoderChange(val || undefined)}
            >
              <SelectTrigger className="tw-w-full">
                <SelectValue
                  placeholder={
                    localizedStrings['%webView_projectProperties_placeholder_selectEncoder%']
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {encoders.map((enc) => (
                  <SelectItem key={enc.name} value={enc.name}>
                    {enc.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {renderFieldError('encoder')}
          </div>

          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="reverseDirection"
              checked={encoderReverseDirection}
              onCheckedChange={(checked) => onEncoderReverseDirectionChange(checked === true)}
              disabled={
                !encoderName || !encoders.find((e) => e.name === encoderName)?.isBidirectional
              }
            />
            <Label htmlFor="reverseDirection" className="tw-cursor-pointer">
              {localizedStrings['%webView_projectProperties_field_reverseDirection%']}
            </Label>
          </div>
        </>
      )}
    </div>
  );
}

export default GeneralTab;
