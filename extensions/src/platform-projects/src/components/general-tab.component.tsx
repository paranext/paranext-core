import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
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
import { LocalizeKey, getErrorMessage, debounce } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  ProjectOptionsResponse,
  ProjectPropertiesFormState,
  ProjectType,
  ValidationResult,
  VersificationType,
} from 'platform-projects';

// #region Localized Strings

const GENERAL_TAB_LOCALIZED_KEYS: LocalizeKey[] = [
  '%webView_projectProperties_field_fullName_label%',
  '%webView_projectProperties_field_fullName_placeholder%',
  '%webView_projectProperties_field_shortName_label%',
  '%webView_projectProperties_field_shortName_placeholder%',
  '%webView_projectProperties_field_projectType_label%',
  '%webView_projectProperties_field_language_label%',
  '%webView_projectProperties_field_language_placeholder%',
  '%webView_projectProperties_field_versification_label%',
  '%webView_projectProperties_field_baseProject_label%',
  '%webView_projectProperties_field_baseProject_placeholder%',
  '%webView_projectProperties_field_editable_label%',
  '%webView_projectProperties_field_encoder_label%',
  '%webView_projectProperties_field_encoder_placeholder%',
  '%webView_projectProperties_field_encoderReverse_label%',
  '%webView_projectProperties_required%',
];

// #endregion

// #region Validation

const SHORT_NAME_VALIDATION_DEBOUNCE_MS = 300;

async function validateShortName(shortName: string): Promise<ValidationResult> {
  // Note: This command will be registered by the backend
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
  const commands = papi.commands as any;
  return commands.sendCommand('paratextProjectCreation.validateShortName', {
    shortName,
    isNewProject: true,
  });
}

// #endregion

// #region Types

interface GeneralTabProps {
  formState: ProjectPropertiesFormState;
  projectOptions: ProjectOptionsResponse;
  onFieldChange: (field: keyof ProjectPropertiesFormState, value: unknown) => void;
  onProjectTypeChange: (projectType: ProjectType) => void;
  validationErrors: Record<string, string>;
  isDisabled: boolean;
  mode: 'create' | 'edit';
}

/** ComboBox option type for languages */
type LanguageEntry = {
  id: string;
  name: string;
  isRightToLeft: boolean;
  label: string;
  secondaryLabel?: string;
};

/** ComboBox option type for base projects */
type BaseProjectEntry = {
  guid: string;
  shortName: string;
  fullName: string;
  label: string;
  secondaryLabel?: string;
};

/** ComboBox option type for encoders */
type EncoderEntry = {
  name: string;
  displayName: string;
  isBidirectional: boolean;
  label: string;
};

// #endregion

export function GeneralTab({
  formState,
  projectOptions,
  onFieldChange,
  onProjectTypeChange,
  validationErrors,
  isDisabled,
  mode,
}: GeneralTabProps) {
  const [localizedStrings] = useLocalizedStrings(GENERAL_TAB_LOCALIZED_KEYS);

  // Track if component is mounted
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Short name validation state
  const [shortNameError, setShortNameError] = useState<string | undefined>(undefined);
  const [isValidatingShortName, setIsValidatingShortName] = useState(false);

  // Debounced short name validation
  const debouncedValidateShortName = useMemo(
    () =>
      debounce(async (shortName: string) => {
        if (!shortName) {
          setShortNameError(undefined);
          return;
        }

        setIsValidatingShortName(true);
        try {
          const result = await validateShortName(shortName);
          if (isMountedRef.current) {
            setShortNameError(result.isValid ? undefined : (result.errorMessage ?? undefined));
          }
        } catch (error) {
          logger.error(`Failed to validate short name: ${getErrorMessage(error)}`);
          if (isMountedRef.current) {
            setShortNameError(undefined);
          }
        } finally {
          if (isMountedRef.current) {
            setIsValidatingShortName(false);
          }
        }
      }, SHORT_NAME_VALIDATION_DEBOUNCE_MS),
    [],
  );

  // Handle short name change with validation
  const handleShortNameChange = useCallback(
    (value: string) => {
      // Only allow valid characters: A-Za-z0-9_
      const sanitizedValue = value.replace(/[^A-Za-z0-9_]/g, '').toUpperCase();
      // Limit to 8 characters
      const truncatedValue = sanitizedValue.slice(0, 8);
      onFieldChange('shortName', truncatedValue);
      debouncedValidateShortName(truncatedValue);
    },
    [onFieldChange, debouncedValidateShortName],
  );

  // Handle full name change
  const handleFullNameChange = useCallback(
    (value: string) => {
      onFieldChange('fullName', value);
    },
    [onFieldChange],
  );

  // Handle project type change
  const handleProjectTypeSelect = useCallback(
    (value: string) => {
      // Type guard for ProjectType
      const isValidProjectType = (v: string): v is ProjectType =>
        v === 'Standard' ||
        v === 'BackTranslation' ||
        v === 'Daughter' ||
        v === 'Auxiliary' ||
        v === 'StudyBibleAdditions' ||
        v === 'TransliterationManual' ||
        v === 'TransliterationWithEncoder' ||
        v === 'ConsultantNotes';

      if (isValidProjectType(value)) {
        onProjectTypeChange(value);
      }
    },
    [onProjectTypeChange],
  );

  // Handle language change
  const handleLanguageChange = useCallback(
    (option: LanguageEntry) => {
      onFieldChange('languageId', option.id);
    },
    [onFieldChange],
  );

  // Handle versification change
  const handleVersificationChange = useCallback(
    (value: string) => {
      // Type guard for VersificationType
      const isValidVersificationType = (v: string): v is VersificationType =>
        v === 'English' ||
        v === 'Septuagint' ||
        v === 'Original' ||
        v === 'Vulgate' ||
        v === 'RussianOrthodox' ||
        v === 'RussianProtestant';

      if (isValidVersificationType(value)) {
        onFieldChange('versification', value);
      }
    },
    [onFieldChange],
  );

  // Handle base project change
  const handleBaseProjectChange = useCallback(
    (option: BaseProjectEntry) => {
      onFieldChange('baseProjectGuid', option.guid);
    },
    [onFieldChange],
  );

  // Handle editable change
  const handleEditableChange = useCallback(
    (checked: boolean) => {
      onFieldChange('editable', checked);
    },
    [onFieldChange],
  );

  // Handle encoder change
  const handleEncoderChange = useCallback(
    (option: EncoderEntry) => {
      onFieldChange('encoderName', option.name);
    },
    [onFieldChange],
  );

  // Handle encoder reverse direction change
  const handleEncoderReverseChange = useCallback(
    (checked: boolean) => {
      onFieldChange('encoderReverseDirection', checked);
    },
    [onFieldChange],
  );

  // Convert options to ComboBox entries
  const languageOptions: LanguageEntry[] = useMemo(
    () =>
      projectOptions.languages.map((lang) => ({
        id: lang.id,
        name: lang.name,
        isRightToLeft: lang.isRightToLeft,
        label: lang.name,
        secondaryLabel: lang.id,
      })),
    [projectOptions.languages],
  );

  const baseProjectOptions: BaseProjectEntry[] = useMemo(
    () =>
      projectOptions.baseProjects.map((proj) => ({
        guid: proj.guid,
        shortName: proj.shortName,
        fullName: proj.fullName,
        label: proj.shortName,
        secondaryLabel: proj.fullName,
      })),
    [projectOptions.baseProjects],
  );

  const encoderOptions: EncoderEntry[] = useMemo(
    () =>
      projectOptions.encoders.map((enc) => ({
        name: enc.name,
        displayName: enc.displayName,
        isBidirectional: enc.isBidirectional,
        label: enc.displayName,
      })),
    [projectOptions.encoders],
  );

  // Get selected options for ComboBox
  const selectedLanguage = useMemo(
    () => languageOptions.find((opt) => opt.id === formState.languageId),
    [languageOptions, formState.languageId],
  );

  const selectedBaseProject = useMemo(
    () => baseProjectOptions.find((opt) => opt.guid === formState.baseProjectGuid),
    [baseProjectOptions, formState.baseProjectGuid],
  );

  const selectedEncoder = useMemo(
    () => encoderOptions.find((opt) => opt.name === formState.encoderName),
    [encoderOptions, formState.encoderName],
  );

  // Combine validation errors
  const shortNameDisplayError = shortNameError ?? validationErrors.shortName;
  const fullNameDisplayError = validationErrors.fullName;

  // Determine if fields should be disabled in edit mode
  const isShortNameDisabled = isDisabled || mode === 'edit';
  const isProjectTypeDisabled = isDisabled || mode === 'edit';

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Full Name */}
      <div className="tw-flex tw-flex-col tw-gap-1.5">
        <Label htmlFor="fullName" className="tw-font-medium">
          {localizedStrings['%webView_projectProperties_field_fullName_label%']}{' '}
          <span className="tw-text-destructive" aria-hidden="true">
            *
          </span>
          <span className="tw-sr-only">
            {localizedStrings['%webView_projectProperties_required%']}
          </span>
        </Label>
        <Input
          id="fullName"
          value={formState.fullName}
          onChange={(e) => handleFullNameChange(e.target.value)}
          placeholder={localizedStrings['%webView_projectProperties_field_fullName_placeholder%']}
          disabled={isDisabled}
          aria-invalid={!!fullNameDisplayError}
          aria-describedby={fullNameDisplayError ? 'fullName-error' : undefined}
          className={fullNameDisplayError ? 'tw-border-destructive' : ''}
        />
        {fullNameDisplayError && (
          <Label id="fullName-error" className="tw-text-sm tw-text-destructive" role="alert">
            {fullNameDisplayError}
          </Label>
        )}
      </div>

      {/* Short Name */}
      <div className="tw-flex tw-flex-col tw-gap-1.5">
        <Label htmlFor="shortName" className="tw-font-medium">
          {localizedStrings['%webView_projectProperties_field_shortName_label%']}{' '}
          <span className="tw-text-destructive" aria-hidden="true">
            *
          </span>
          <span className="tw-sr-only">
            {localizedStrings['%webView_projectProperties_required%']}
          </span>
        </Label>
        <div className="tw-flex tw-items-center tw-gap-2">
          <Input
            id="shortName"
            value={formState.shortName}
            onChange={(e) => handleShortNameChange(e.target.value)}
            placeholder={
              localizedStrings['%webView_projectProperties_field_shortName_placeholder%']
            }
            disabled={isShortNameDisabled}
            aria-invalid={!!shortNameDisplayError}
            aria-describedby={shortNameDisplayError ? 'shortName-error' : undefined}
            className={`tw-max-w-[150px] tw-font-mono ${shortNameDisplayError ? 'tw-border-destructive' : ''}`}
            maxLength={8}
          />
          {isValidatingShortName && (
            <span className="tw-text-sm tw-text-muted-foreground">Validating...</span>
          )}
        </div>
        {shortNameDisplayError && (
          <Label id="shortName-error" className="tw-text-sm tw-text-destructive" role="alert">
            {shortNameDisplayError}
          </Label>
        )}
      </div>

      {/* Project Type */}
      <div className="tw-flex tw-flex-col tw-gap-1.5">
        <Label htmlFor="projectType" className="tw-font-medium">
          {localizedStrings['%webView_projectProperties_field_projectType_label%']}{' '}
          <span className="tw-text-destructive" aria-hidden="true">
            *
          </span>
          <span className="tw-sr-only">
            {localizedStrings['%webView_projectProperties_required%']}
          </span>
        </Label>
        <Select
          value={formState.projectType ?? undefined}
          onValueChange={handleProjectTypeSelect}
          disabled={isProjectTypeDisabled}
        >
          <SelectTrigger id="projectType" className="tw-max-w-[300px]">
            <SelectValue
              placeholder={localizedStrings['%webView_projectProperties_field_projectType_label%']}
            />
          </SelectTrigger>
          <SelectContent>
            {projectOptions.projectTypes.map((type) => (
              <SelectItem key={type.type} value={type.type}>
                {type.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Language - Conditional based on languageRequired */}
      {formState.languageRequired && (
        <div className="tw-flex tw-flex-col tw-gap-1.5">
          <Label htmlFor="language" className="tw-font-medium">
            {localizedStrings['%webView_projectProperties_field_language_label%']}{' '}
            <span className="tw-text-destructive" aria-hidden="true">
              *
            </span>
            <span className="tw-sr-only">
              {localizedStrings['%webView_projectProperties_required%']}
            </span>
          </Label>
          <ComboBox<LanguageEntry>
            options={languageOptions}
            value={selectedLanguage}
            onChange={handleLanguageChange}
            buttonPlaceholder={
              localizedStrings['%webView_projectProperties_field_language_placeholder%']
            }
            isDisabled={isDisabled}
            buttonClassName="tw-max-w-[300px]"
          />
        </div>
      )}

      {/* Versification */}
      <div className="tw-flex tw-flex-col tw-gap-1.5">
        <Label htmlFor="versification" className="tw-font-medium">
          {localizedStrings['%webView_projectProperties_field_versification_label%']}{' '}
          <span className="tw-text-destructive" aria-hidden="true">
            *
          </span>
          <span className="tw-sr-only">
            {localizedStrings['%webView_projectProperties_required%']}
          </span>
        </Label>
        <Select
          value={formState.versification ?? undefined}
          onValueChange={handleVersificationChange}
          disabled={isDisabled || (formState.showBaseProject && !!formState.baseProjectGuid)}
        >
          <SelectTrigger id="versification" className="tw-max-w-[300px]">
            <SelectValue
              placeholder={
                localizedStrings['%webView_projectProperties_field_versification_label%']
              }
            />
          </SelectTrigger>
          <SelectContent>
            {projectOptions.versifications.map((vers) => (
              <SelectItem key={vers.type} value={vers.type}>
                {vers.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Base Project - Conditional based on showBaseProject */}
      {formState.showBaseProject && (
        <div className="tw-flex tw-flex-col tw-gap-1.5">
          <Label htmlFor="baseProject" className="tw-font-medium">
            {localizedStrings['%webView_projectProperties_field_baseProject_label%']}{' '}
            {formState.baseProjectRequired && (
              <>
                <span className="tw-text-destructive" aria-hidden="true">
                  *
                </span>
                <span className="tw-sr-only">
                  {localizedStrings['%webView_projectProperties_required%']}
                </span>
              </>
            )}
          </Label>
          <ComboBox<BaseProjectEntry>
            options={baseProjectOptions}
            value={selectedBaseProject}
            onChange={handleBaseProjectChange}
            buttonPlaceholder={
              localizedStrings['%webView_projectProperties_field_baseProject_placeholder%']
            }
            isDisabled={isDisabled}
            buttonClassName="tw-max-w-[300px]"
          />
        </div>
      )}

      {/* Editable Checkbox */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
          id="editable"
          checked={formState.editable}
          onCheckedChange={handleEditableChange}
          disabled={isDisabled}
        />
        <Label htmlFor="editable" className="tw-cursor-pointer">
          {localizedStrings['%webView_projectProperties_field_editable_label%']}
        </Label>
      </div>

      {/* Encoder Fields - Conditional based on showEncoderFields */}
      {formState.showEncoderFields && (
        <>
          <div className="tw-flex tw-flex-col tw-gap-1.5">
            <Label htmlFor="encoder" className="tw-font-medium">
              {localizedStrings['%webView_projectProperties_field_encoder_label%']}{' '}
              <span className="tw-text-destructive" aria-hidden="true">
                *
              </span>
              <span className="tw-sr-only">
                {localizedStrings['%webView_projectProperties_required%']}
              </span>
            </Label>
            <ComboBox<EncoderEntry>
              options={encoderOptions}
              value={selectedEncoder}
              onChange={handleEncoderChange}
              buttonPlaceholder={
                localizedStrings['%webView_projectProperties_field_encoder_placeholder%']
              }
              isDisabled={isDisabled}
              buttonClassName="tw-max-w-[300px]"
            />
          </div>

          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="encoderReverse"
              checked={formState.encoderReverseDirection}
              onCheckedChange={handleEncoderReverseChange}
              disabled={isDisabled}
            />
            <Label htmlFor="encoderReverse" className="tw-cursor-pointer">
              {localizedStrings['%webView_projectProperties_field_encoderReverse_label%']}
            </Label>
          </div>
        </>
      )}
    </div>
  );
}
