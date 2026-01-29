/**
 * GeneralTab - General settings tab for Project Properties dialog
 *
 * Contains: Name, Language, Versification, Type, Based On, Biblical Terms, Registration
 */

import { useCallback, useState } from 'react';
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
  cn,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from 'platform-bible-react';
import { Edit2, X } from 'lucide-react';
import type {
  ProjectPropertiesFormState,
  ProjectPropertiesOptions,
} from '../../types/project-properties.types';
import { ProjectNameDialog } from '../project-name-dialog.component';
import type {
  ProjectNameFormInput,
  ProjectNameFormOutput,
} from '../../hooks/use-project-name-form';
import { RegistrationStatusControl } from '../registration-status-control.component';
import type {
  RegistrationControlInput,
  RegistrationControlOutput,
  ProjectType,
} from '../../hooks/use-registration-status';

/** ComboBox option type for language and project selection */
type ComboBoxItem = { label: string; value: string };

/** Valid project types for runtime validation */
const VALID_PROJECT_TYPES: ProjectType[] = [
  'Standard',
  'BackTranslation',
  'Daughter',
  'Auxiliary',
  'StudyBibleAdditions',
  'TransliterationManual',
  'TransliterationWithEncoder',
  'ConsultantNotes',
];

/** String array for comparison (avoid type assertion) */
const VALID_PROJECT_TYPE_STRINGS: readonly string[] = VALID_PROJECT_TYPES;

/** Type guard for ProjectType */
function isValidProjectType(value: string): value is ProjectType {
  return VALID_PROJECT_TYPE_STRINGS.includes(value);
}

// =============================================================================
// PROPS
// =============================================================================

export interface GeneralTabProps {
  /** Form state */
  state: ProjectPropertiesFormState;

  /** Available options for dropdowns */
  options: ProjectPropertiesOptions;

  /** Mode: create or edit */
  mode: 'create' | 'edit';

  /** User context for registration */
  userContext: {
    isRegistered: boolean;
    canRegisterProjects: boolean;
    isOnline: boolean;
  };

  // Field change handlers
  onFullNameChange: (value: string) => void;
  onShortNameChange: (value: string) => void;
  onCopyrightChange: (value: string) => void;
  onLanguageChange: (value: string | undefined) => void;
  onVersificationChange: (value: string | undefined) => void;
  onProjectTypeChange: (value: string | undefined) => void;
  onBaseProjectChange: (value: string | undefined) => void;
  onBiblicalTermsListChange: (value: string) => void;
  onMatchBasedOnStemsChange: (value: boolean) => void;
  onEncodingConverterChange: (value: string | undefined) => void;
  onEncoderReverseDirectionChange: (value: boolean) => void;

  // Registration handlers
  onRegisterClick?: () => void;
  onManageClick?: () => void;
  onRegistrationStateChange?: (output: RegistrationControlOutput) => void;

  /** Optional className */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * GeneralTab - First tab in Project Properties dialog
 *
 * Implements behaviors:
 *
 * - BHV-100: Project type selection
 * - BHV-101: Derived type classification
 * - BHV-107: Versification locked for derived types
 * - BHV-110: Language selection
 * - BHV-200-203: Name editing via dialog
 * - BHV-205: Registration status display
 */
export function GeneralTab({
  state,
  options,
  mode,
  userContext,
  onFullNameChange,
  onShortNameChange,
  onCopyrightChange,
  onLanguageChange,
  onVersificationChange,
  onProjectTypeChange,
  onBaseProjectChange,
  onBiblicalTermsListChange,
  onMatchBasedOnStemsChange,
  onEncodingConverterChange,
  onEncoderReverseDirectionChange,
  onRegisterClick,
  onManageClick,
  onRegistrationStateChange,
  className,
}: GeneralTabProps) {
  // Dialog state for ProjectNameDialog
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);

  // Existing project names for validation
  const existingProjectNames = options.availableBaseProjects.map((p) => p.name);

  // Handle name dialog submit
  const handleNameDialogSubmit = useCallback(
    (output: ProjectNameFormOutput) => {
      if (output.action === 'submit' && output.nameData) {
        onFullNameChange(output.nameData.fullName);
        onShortNameChange(output.nameData.shortName);
        onCopyrightChange(output.nameData.copyright);
        setIsNameDialogOpen(false);
      }
    },
    [onFullNameChange, onShortNameChange, onCopyrightChange],
  );

  // Build ProjectNameDialog input
  const nameDialogInput: ProjectNameFormInput = {
    fullName: state.fullName,
    shortName: state.shortName,
    copyright: state.copyright,
    mode,
    isRestricted: false,
    allowShortNameEdit: mode === 'create',
    existingProjectNames,
  };

  // Build RegistrationControlInput
  // Convert project type string to ProjectType union (validated at runtime by enum)
  // Note: RegistrationControlInput.projectType expects ProjectType | null per spec
  const projectTypeValue: ProjectType | null =
    state.selectedProjectType && isValidProjectType(state.selectedProjectType)
      ? state.selectedProjectType
      : // eslint-disable-next-line no-null/no-null -- null is required by RegistrationControlInput spec
        null;

  const registrationInput: RegistrationControlInput = {
    projectType: projectTypeValue,
    baseProjectName: options.availableBaseProjects.find((p) => p.guid === state.selectedBaseProject)
      ?.name,
    baseProjectGuid: state.selectedBaseProject,
    isRegistered: false, // Will be determined by registration service
    registrationExists: false,
    isRevoked: false,
    baseProjectRegistrationStatus: undefined,
    userContext: {
      ...userContext,
      isGuest: false,
      isObserver: false,
    },
    mode,
  };

  // Convert language options to ComboBox format
  const languageItems: ComboBoxItem[] = options.languages.map((lang) => ({
    value: lang.id,
    label: lang.displayName,
  }));

  // Find current language selection as ComboBox option
  const selectedLanguageOption = languageItems.find(
    (item) => item.value === state.selectedLanguageId,
  );

  // Convert project options to ComboBox format for basedOn
  const baseProjectItems: ComboBoxItem[] = options.availableBaseProjects.map((proj) => ({
    value: proj.guid,
    label: proj.displayName,
  }));

  // Find current base project selection as ComboBox option
  const selectedBaseProjectOption = baseProjectItems.find(
    (item) => item.value === state.selectedBaseProject,
  );

  return (
    <div className={cn('pr-twp tw-flex tw-flex-col tw-gap-4', className)}>
      {/* Name Section */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <div className="tw-flex tw-items-end tw-gap-2">
          <div className="tw-flex-1">
            <Label className="tw-text-sm tw-text-muted-foreground">Full Name</Label>
            <div className="tw-font-medium tw-text-foreground">{state.fullName || '(not set)'}</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsNameDialogOpen(true)}
            className="tw-gap-1"
          >
            <Edit2 className="tw-h-3 tw-w-3" />
            Edit...
          </Button>
        </div>

        <div className="tw-grid tw-grid-cols-2 tw-gap-4">
          <div>
            <Label className="tw-text-sm tw-text-muted-foreground">Short Name</Label>
            <div className="tw-font-medium tw-text-foreground">
              {state.shortName || '(not set)'}
            </div>
          </div>
          <div>
            <Label className="tw-text-sm tw-text-muted-foreground">Copyright</Label>
            <div className="tw-text-sm tw-text-foreground tw-truncate">
              {state.copyright || '(none)'}
            </div>
          </div>
        </div>

        {state.validationErrors.fullName && (
          <span className="tw-text-sm tw-text-destructive" role="alert">
            {state.validationErrors.fullName}
          </span>
        )}
        {state.validationErrors.shortName && (
          <span className="tw-text-sm tw-text-destructive" role="alert">
            {state.validationErrors.shortName}
          </span>
        )}
      </div>

      {/* Language */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="language-select">
          Language <span className="tw-text-destructive">*</span>
        </Label>
        <ComboBox<ComboBoxItem>
          options={languageItems}
          value={selectedLanguageOption}
          onChange={(option) => onLanguageChange(option?.value)}
          getOptionLabel={(option) => option.label}
          textPlaceholder="Select language..."
          buttonPlaceholder="Select language..."
          buttonClassName="tw-w-full"
        />
        {state.validationErrors.selectedLanguageId && (
          <span className="tw-text-sm tw-text-destructive" role="alert">
            {state.validationErrors.selectedLanguageId}
          </span>
        )}
      </div>

      {/* Versification */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="versification-select">
          Versification <span className="tw-text-destructive">*</span>
        </Label>
        <Select
          value={state.selectedVersification}
          onValueChange={(value) => onVersificationChange(value)}
          disabled={state.isVersificationLocked}
        >
          <SelectTrigger
            id="versification-select"
            className={cn(state.isVersificationLocked && 'tw-bg-muted tw-cursor-not-allowed')}
          >
            <SelectValue placeholder="Select versification..." />
          </SelectTrigger>
          <SelectContent>
            {options.versifications.map((vers) => (
              <SelectItem key={vers.id} value={vers.id}>
                {vers.displayName}
                {vers.isCustomized && ' (Customized)'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.isVersificationLocked && (
          <span className="tw-text-sm tw-text-muted-foreground">
            Versification is inherited from base project
          </span>
        )}
        {state.validationErrors.selectedVersification && (
          <span className="tw-text-sm tw-text-destructive" role="alert">
            {state.validationErrors.selectedVersification}
          </span>
        )}
      </div>

      {/* Project Type (create mode only) */}
      {mode === 'create' && (
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="project-type-select">
            Type of Project <span className="tw-text-destructive">*</span>
          </Label>
          <Select
            value={state.selectedProjectType}
            onValueChange={(value) => onProjectTypeChange(value)}
          >
            <SelectTrigger id="project-type-select">
              <SelectValue placeholder="Select project type..." />
            </SelectTrigger>
            <SelectContent>
              {options.projectTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.validationErrors.selectedProjectType && (
            <span className="tw-text-sm tw-text-destructive" role="alert">
              {state.validationErrors.selectedProjectType}
            </span>
          )}
        </div>
      )}

      {/* Based On (derived types only, create mode) */}
      {mode === 'create' && state.isDerivedType && (
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="based-on-select">
            Based on <span className="tw-text-destructive">*</span>
          </Label>
          <ComboBox<ComboBoxItem>
            options={baseProjectItems}
            value={selectedBaseProjectOption}
            onChange={(option) => onBaseProjectChange(option?.value)}
            getOptionLabel={(option) => option.label}
            textPlaceholder="Select base project..."
            buttonPlaceholder="Select base project..."
            isDisabled={state.isBasedOnLocked}
            buttonClassName={cn('tw-w-full', state.isBasedOnLocked && 'tw-opacity-50')}
          />
          {state.isBasedOnLocked && (
            <span className="tw-text-sm tw-text-muted-foreground">
              Base project is set by interlinear context
            </span>
          )}
          {state.validationErrors.selectedBaseProject && (
            <span className="tw-text-sm tw-text-destructive" role="alert">
              {state.validationErrors.selectedBaseProject}
            </span>
          )}
        </div>
      )}

      {/* Encoding Converter (TransliterationWithEncoder only) */}
      {state.showEncodingConverter && (
        <>
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="encoding-converter-select">
              Encoding Converter <span className="tw-text-destructive">*</span>
            </Label>
            <Select
              value={state.encodingConverter}
              onValueChange={(value) => onEncodingConverterChange(value)}
            >
              <SelectTrigger id="encoding-converter-select">
                <SelectValue placeholder="Select encoding converter..." />
              </SelectTrigger>
              <SelectContent>
                {options.encodingConverters.map((enc) => (
                  <SelectItem key={enc.id} value={enc.id}>
                    {enc.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.validationErrors.encodingConverter && (
              <span className="tw-text-sm tw-text-destructive" role="alert">
                {state.validationErrors.encodingConverter}
              </span>
            )}
          </div>

          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="encoder-reverse"
              checked={state.encoderReverseDirection}
              onCheckedChange={(checked) => onEncoderReverseDirectionChange(checked === true)}
            />
            <Label htmlFor="encoder-reverse" className="tw-font-normal tw-cursor-pointer">
              Reverse direction
            </Label>
          </div>
        </>
      )}

      {/* Biblical Terms */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label>Biblical Terms List</Label>
        <div className="tw-flex tw-items-center tw-gap-2">
          <Input
            value={state.biblicalTermsListInfo}
            readOnly
            className="tw-flex-1 tw-bg-muted"
            placeholder="(default)"
          />
          <Button variant="outline" size="sm" onClick={() => onBiblicalTermsListChange('')}>
            Choose...
          </Button>
        </div>
      </div>

      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
          id="match-stems"
          checked={state.matchBasedOnStems}
          onCheckedChange={(checked) => onMatchBasedOnStemsChange(checked === true)}
        />
        <Label htmlFor="match-stems" className="tw-font-normal tw-cursor-pointer">
          Match based on stems
        </Label>
      </div>

      {/* Registration Status */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label>Registration</Label>
        <RegistrationStatusControl
          input={registrationInput}
          onRegisterClick={onRegisterClick}
          onManageClick={onManageClick}
          onStateChange={onRegistrationStateChange}
        />
      </div>

      {/* Name Dialog (using Drawer as modal alternative) */}
      <Drawer open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
        <DrawerContent>
          <DrawerHeader className="tw-flex tw-items-center tw-justify-between">
            <DrawerTitle>Project Name</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" className="tw-h-6 tw-w-6 tw-p-0">
                <X className="tw-h-4 tw-w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="tw-px-4 tw-pb-4">
            <ProjectNameDialog
              input={nameDialogInput}
              onSubmit={handleNameDialogSubmit}
              onCancel={() => setIsNameDialogOpen(false)}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default GeneralTab;
