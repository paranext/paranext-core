import { useCallback, useState } from 'react';
import {
  Button,
  Checkbox,
  cn,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import type {
  EncodingInfo,
  LanguageSelectionResult,
  ProjectNameFormResult,
  ProjectReference,
  ProjectType,
  ProjectTypeConfiguration,
  RegistrationControlProps,
  RegistrationState,
  VersificationType,
} from 'paratext-project-creation';
import { ProjectNameForm } from './project-name-form.component';
import { LanguageSelectionForm } from './language-selection.component';
import { ChooseEncodingForm } from './choose-encoding.component';
import { RegistrationControl } from './registration-control.component';

// =====================================================
// Constants
// =====================================================

const PROJECT_TYPE_OPTIONS: { value: ProjectType; label: string }[] = [
  { value: 'NotSelected', label: '(Not selected)' },
  { value: 'Standard', label: 'Standard Translation' },
  { value: 'BackTranslation', label: 'Back Translation' },
  { value: 'Daughter', label: 'Daughter Translation' },
  { value: 'TransliterationManual', label: 'Transliteration (Manual)' },
  { value: 'TransliterationWithEncoder', label: 'Transliteration (using Encoding Converter)' },
  { value: 'StudyBibleAdditions', label: 'Study Bible Additions' },
  { value: 'Auxiliary', label: 'Auxiliary' },
  { value: 'ConsultantNotes', label: 'Consultant Notes' },
];

const VERSIFICATION_OPTIONS: { value: VersificationType; label: string }[] = [
  { value: 'Original', label: 'Original' },
  { value: 'Septuagint', label: 'Septuagint' },
  { value: 'Vulgate', label: 'Vulgate' },
  { value: 'English', label: 'English' },
  { value: 'RussianOrthodox', label: 'Russian Orthodox' },
  { value: 'RussianProtestant', label: 'Russian Protestant' },
];

// =====================================================
// Props
// =====================================================

export interface GeneralTabProps {
  // Project name
  fullName: string;
  shortName: string;
  copyright: string;
  onNameResult: (result: ProjectNameFormResult) => void;

  // Language
  languageId: string;
  languageName: string;
  onLanguageResult: (result: LanguageSelectionResult) => void;

  // Versification
  versification: VersificationType;
  onVersificationChange: (value: VersificationType) => void;
  hasCustomVersification: boolean;

  // Project type
  projectType: ProjectType;
  onProjectTypeChange: (value: ProjectType) => void;

  // Base project
  baseProjectGuid: string | null;
  availableBaseProjects: ProjectReference[];
  onBaseProjectChange: (guid: string | null) => void;

  // Type configuration (drives visibility)
  typeConfig: ProjectTypeConfiguration | null;

  // Registration
  registrationState: RegistrationState | null;
  registrationControlProps: Omit<RegistrationControlProps, 'projectType' | 'baseProject'>;

  // Encoding (transliteration)
  encodingConverter: string | null;
  encoderReverseDirection: boolean;
  onEncodingChange: (encoding: EncodingInfo | null) => void;
  onEncoderReverseChange: (reverse: boolean) => void;

  // Editable
  editable: boolean;
  onEditableChange: (value: boolean) => void;

  // Mode
  isNewProject: boolean;

  // Info
  minParatextVersion: string;
}

// =====================================================
// Component
// =====================================================

export function GeneralTab({
  fullName,
  shortName,
  copyright,
  onNameResult,
  languageId,
  languageName,
  onLanguageResult,
  versification,
  onVersificationChange,
  hasCustomVersification,
  projectType,
  onProjectTypeChange,
  baseProjectGuid,
  availableBaseProjects,
  onBaseProjectChange,
  typeConfig,
  registrationControlProps,
  encodingConverter,
  encoderReverseDirection,
  onEncodingChange,
  onEncoderReverseChange,
  editable,
  onEditableChange,
  isNewProject,
  minParatextVersion,
}: GeneralTabProps) {
  // Sub-dialog visibility
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showLanguageNewDialog, setShowLanguageNewDialog] = useState(false);
  const [showEncodingDialog, setShowEncodingDialog] = useState(false);

  const showEncodingFields = typeConfig?.encodingConverterRequired ?? false;
  const baseProjectRequired = typeConfig?.baseProjectRequired ?? false;

  const selectedBaseProject = availableBaseProjects.find((p) => p.guid === baseProjectGuid) ?? null;

  const handleNameConfirm = useCallback(
    (result: ProjectNameFormResult) => {
      onNameResult(result);
      setShowNameDialog(false);
    },
    [onNameResult],
  );

  const handleLanguageConfirm = useCallback(
    (result: LanguageSelectionResult) => {
      onLanguageResult(result);
      setShowLanguageDialog(false);
      setShowLanguageNewDialog(false);
    },
    [onLanguageResult],
  );

  const handleEncodingConfirm = useCallback(
    (encoding: EncodingInfo) => {
      onEncodingChange(encoding);
      setShowEncodingDialog(false);
    },
    [onEncodingChange],
  );

  return (
    <div className={cn('tw-flex tw-flex-col tw-gap-4')}>
      {/* ---- Project Name Section ---- */}
      <fieldset className="tw-border tw-border-border tw-rounded tw-p-3">
        <legend className="tw-text-sm tw-font-medium tw-px-1">Project Name</legend>
        <div className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-items-center tw-gap-2">
            <Label className="tw-w-24 tw-shrink-0">Full Name:</Label>
            <span className="tw-flex-1 tw-truncate" data-testid="full-name-display">
              {fullName || '(not set)'}
            </span>
            <Button variant="outline" size="sm" onClick={() => setShowNameDialog(true)}>
              Edit
            </Button>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <Label className="tw-w-24 tw-shrink-0">Short Name:</Label>
            <span data-testid="short-name-display">{shortName || '(not set)'}</span>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <Label className="tw-w-24 tw-shrink-0">Copyright:</Label>
            <span className="tw-flex-1 tw-truncate" data-testid="copyright-display">
              {copyright || '(not set)'}
            </span>
          </div>
        </div>
      </fieldset>

      {/* Name dialog overlay */}
      {showNameDialog && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-z-50 tw-flex tw-items-center tw-justify-center">
          <div className="tw-bg-background tw-rounded tw-shadow-lg tw-p-4 tw-max-w-lg tw-w-full">
            <ProjectNameForm
              fullName={fullName}
              shortName={shortName}
              copyright={copyright}
              isNewProject={isNewProject}
              isRegistered={false}
              onConfirm={handleNameConfirm}
              onCancel={() => setShowNameDialog(false)}
            />
          </div>
        </div>
      )}

      {/* ---- Language Section ---- */}
      <fieldset className="tw-border tw-border-border tw-rounded tw-p-3">
        <legend className="tw-text-sm tw-font-medium tw-px-1">Language</legend>
        <div className="tw-flex tw-items-center tw-gap-2">
          <Label className="tw-w-24 tw-shrink-0">Language:</Label>
          <span className="tw-flex-1 tw-truncate" data-testid="language-display">
            {languageName || languageId || '(not set)'}
          </span>
          <Button variant="outline" size="sm" onClick={() => setShowLanguageDialog(true)}>
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowLanguageNewDialog(true)}>
            New
          </Button>
        </div>
      </fieldset>

      {/* Language dialog overlay */}
      {(showLanguageDialog || showLanguageNewDialog) && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-z-50 tw-flex tw-items-center tw-justify-center">
          <div className="tw-bg-background tw-rounded tw-shadow-lg tw-p-4 tw-max-w-lg tw-w-full">
            <LanguageSelectionForm
              currentLanguageId={languageId || undefined}
              isNewLanguage={showLanguageNewDialog}
              isRegistered={false}
              onConfirm={handleLanguageConfirm}
              onCancel={() => {
                setShowLanguageDialog(false);
                setShowLanguageNewDialog(false);
              }}
            />
          </div>
        </div>
      )}

      {/* ---- Versification ---- */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label htmlFor="versification" className="tw-w-36 tw-shrink-0">
          Versification:
        </Label>
        <Select value={versification} onValueChange={onVersificationChange}>
          <SelectTrigger id="versification" className="tw-flex-1">
            <SelectValue placeholder="Select versification" />
          </SelectTrigger>
          <SelectContent>
            {VERSIFICATION_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasCustomVersification && (
          <span className="tw-text-sm tw-text-muted-foreground">(Customized)</span>
        )}
      </div>

      {/* ---- Type of Project ---- */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label htmlFor="project-type" className="tw-w-36 tw-shrink-0">
          Type of Project:
        </Label>
        <Select value={projectType} onValueChange={onProjectTypeChange}>
          <SelectTrigger id="project-type" className="tw-flex-1">
            <SelectValue placeholder="Select project type" />
          </SelectTrigger>
          <SelectContent>
            {PROJECT_TYPE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ---- Based on ---- */}
      {baseProjectRequired && (
        <div className="tw-flex tw-items-center tw-gap-2">
          <Label htmlFor="base-project" className="tw-w-36 tw-shrink-0">
            Based on:
          </Label>
          <Select
            value={baseProjectGuid ?? ''}
            onValueChange={(val) => onBaseProjectChange(val || null)}
          >
            <SelectTrigger id="base-project" className="tw-flex-1">
              <SelectValue placeholder="Select base project" />
            </SelectTrigger>
            <SelectContent>
              {availableBaseProjects.map((proj) => (
                <SelectItem key={proj.guid} value={proj.guid}>
                  {proj.fullName} ({proj.shortName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* ---- Registration ---- */}
      <fieldset className="tw-border tw-border-border tw-rounded tw-p-3">
        <legend className="tw-text-sm tw-font-medium tw-px-1">Registration</legend>
        <RegistrationControl
          {...registrationControlProps}
          projectType={projectType}
          baseProject={selectedBaseProject}
        />
      </fieldset>

      {/* ---- Encoding (TransliterationWithEncoder only) ---- */}
      {showEncodingFields && (
        <div className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-items-center tw-gap-2">
            <Label className="tw-w-36 tw-shrink-0">SIL Encoding:</Label>
            <span className="tw-flex-1" data-testid="encoding-display">
              {encodingConverter || '(none)'}
            </span>
            <Button variant="outline" size="sm" onClick={() => setShowEncodingDialog(true)}>
              Choose
            </Button>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2 tw-ml-36">
            <Checkbox
              id="encoder-reverse"
              checked={encoderReverseDirection}
              onCheckedChange={(checked) => onEncoderReverseChange(checked === true)}
            />
            <Label htmlFor="encoder-reverse">Apply encoding converter in reverse direction</Label>
          </div>
        </div>
      )}

      {/* Encoding dialog overlay */}
      {showEncodingDialog && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-z-50 tw-flex tw-items-center tw-justify-center">
          <div className="tw-bg-background tw-rounded tw-shadow-lg tw-p-4 tw-max-w-lg tw-w-full">
            <ChooseEncodingForm
              currentEncoding={{ codePage: 65001, name: 'utf-8', displayName: 'Unicode (UTF-8)' }}
              onConfirm={handleEncodingConfirm}
              onCancel={() => setShowEncodingDialog(false)}
            />
          </div>
        </div>
      )}

      {/* ---- Editable checkbox ---- */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
          id="editable"
          checked={editable}
          onCheckedChange={(checked) => onEditableChange(checked === true)}
        />
        <Label htmlFor="editable">Make project editable</Label>
      </div>

      {/* ---- Min Paratext Version ---- */}
      {minParatextVersion && (
        <p className="tw-text-sm tw-text-muted-foreground">
          Minimum Paratext Version: {minParatextVersion}
        </p>
      )}
    </div>
  );
}

export default GeneralTab;
