import { useCallback, useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import type { ProjectType, VersificationType } from 'paratext-project-creation';
import { useProjectCreation } from '../../context/project-creation-context';
import { useProjectCreationCommands } from '../../hooks/use-project-creation';
import { RegistrationSelectionControl } from '../registration-selection-control.component';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectCreation_general_projectName%',
  '%projectCreation_general_fullName%',
  '%projectCreation_general_shortName%',
  '%projectCreation_general_copyright%',
  '%projectCreation_general_edit%',
  '%projectCreation_general_language%',
  '%projectCreation_general_languageSettings%',
  '%projectCreation_general_newLanguage%',
  '%projectCreation_general_versification%',
  '%projectCreation_general_versificationCustomized%',
  '%projectCreation_general_projectType%',
  '%projectCreation_general_basedOn%',
  '%projectCreation_general_openBaseProject%',
  '%projectCreation_general_registration%',
  '%projectCreation_general_registerSeparately%',
  '%projectCreation_general_encoding%',
  '%projectCreation_general_encoderReverse%',
  '%projectCreation_general_minVersion%',
  '%projectCreation_type_notSelected%',
  '%projectCreation_type_standard%',
  '%projectCreation_type_backTranslation%',
  '%projectCreation_type_daughter%',
  '%projectCreation_type_transliterationManual%',
  '%projectCreation_type_transliterationEncoder%',
  '%projectCreation_type_studyBibleAdditions%',
  '%projectCreation_type_auxiliary%',
  '%projectCreation_type_consultantNotes%',
  '%projectCreation_versification_original%',
  '%projectCreation_versification_septuagint%',
  '%projectCreation_versification_vulgate%',
  '%projectCreation_versification_english%',
  '%projectCreation_versification_russianOrthodox%',
  '%projectCreation_versification_russianProtestant%',
];

/** Project type options for new projects */
const PROJECT_TYPE_OPTIONS: Array<{ value: ProjectType; labelKey: LocalizeKey }> = [
  { value: 'NotSelected', labelKey: '%projectCreation_type_notSelected%' },
  { value: 'Standard', labelKey: '%projectCreation_type_standard%' },
  { value: 'BackTranslation', labelKey: '%projectCreation_type_backTranslation%' },
  { value: 'Daughter', labelKey: '%projectCreation_type_daughter%' },
  { value: 'TransliterationManual', labelKey: '%projectCreation_type_transliterationManual%' },
  {
    value: 'TransliterationWithEncoder',
    labelKey: '%projectCreation_type_transliterationEncoder%',
  },
  { value: 'StudyBibleAdditions', labelKey: '%projectCreation_type_studyBibleAdditions%' },
  { value: 'Auxiliary', labelKey: '%projectCreation_type_auxiliary%' },
  { value: 'ConsultantNotes', labelKey: '%projectCreation_type_consultantNotes%' },
];

/** Versification options */
const VERSIFICATION_OPTIONS: Array<{ value: VersificationType; labelKey: LocalizeKey }> = [
  { value: 'Original', labelKey: '%projectCreation_versification_original%' },
  { value: 'Septuagint', labelKey: '%projectCreation_versification_septuagint%' },
  { value: 'Vulgate', labelKey: '%projectCreation_versification_vulgate%' },
  { value: 'English', labelKey: '%projectCreation_versification_english%' },
  { value: 'RussianOrthodox', labelKey: '%projectCreation_versification_russianOrthodox%' },
  { value: 'RussianProtestant', labelKey: '%projectCreation_versification_russianProtestant%' },
];

/**
 * General Tab Component (part of CAP-UI-001)
 *
 * The main tab containing project name, language, versification, type, base project, and
 * registration settings. This is the most important tab for project creation.
 */
export function GeneralTab() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { state, dispatch, isDerivedType, showEncodingFields } = useProjectCreation();
  const { handleProjectTypeChange, handleBaseProjectChange } = useProjectCreationCommands();

  // Open project name dialog
  const handleEditName = useCallback(() => {
    dispatch({ type: 'SHOW_NAME_DIALOG', show: true });
  }, [dispatch]);

  // Open language dialog
  const handleEditLanguage = useCallback(() => {
    dispatch({ type: 'SHOW_LANGUAGE_DIALOG', show: false });
    dispatch({ type: 'SHOW_LANGUAGE_DIALOG', show: true });
  }, [dispatch]);

  // Open language dialog for new language
  const handleNewLanguage = useCallback(() => {
    dispatch({ type: 'SHOW_LANGUAGE_DIALOG', show: true });
  }, [dispatch]);

  // Handle project type change
  const handleTypeChange = useCallback(
    (value: string) => {
      handleProjectTypeChange(value as ProjectType);
    },
    [handleProjectTypeChange],
  );

  // Handle versification change
  const handleVersificationChange = useCallback(
    (value: string) => {
      dispatch({ type: 'SET_VERSIFICATION', versification: value as VersificationType });
    },
    [dispatch],
  );

  // Handle base project change
  const handleBaseChange = useCallback(
    (value: string) => {
      handleBaseProjectChange(value || null);
    },
    [handleBaseProjectChange],
  );

  // Handle encoder reverse checkbox
  const handleEncoderReverseChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_ENCODER_REVERSE', reverse: checked });
    },
    [dispatch],
  );

  // Handle allow derived registration checkbox
  const handleAllowDerivedRegChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_ALLOW_DERIVED_REGISTRATION', allow: checked });
    },
    [dispatch],
  );

  // Check if versification should be disabled (derived types inherit from base)
  const versificationDisabled = useMemo(() => {
    return isDerivedType && state.baseProjectGuid !== null;
  }, [isDerivedType, state.baseProjectGuid]);

  // Check if we should show registration for derived projects
  const showDerivedRegistrationOption = useMemo(() => {
    return state.typeConfiguration?.sharesParentRegistration && state.baseProject?.isRegistered;
  }, [state.typeConfiguration, state.baseProject]);

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-p-4">
      {/* Project Name Section */}
      <div className="tw-rounded-md tw-border tw-p-4">
        <Label className="tw-mb-3 tw-block tw-font-semibold">
          {localizedStrings['%projectCreation_general_projectName%'] || 'Project Name'}
        </Label>

        <div className="tw-grid tw-grid-cols-[auto_1fr_auto] tw-items-center tw-gap-4">
          {/* Full Name */}
          <Label htmlFor="full-name-display">
            {localizedStrings['%projectCreation_general_fullName%'] || 'Full Name:'}
          </Label>
          <div
            id="full-name-display"
            className="tw-min-h-[36px] tw-rounded-md tw-bg-muted tw-px-3 tw-py-2"
          >
            {state.fullName || '(Not set)'}
          </div>
          <Button variant="outline" size="sm" onClick={handleEditName}>
            {localizedStrings['%projectCreation_general_edit%'] || 'Edit'}
          </Button>
          {/* Short Name */}
          <Label htmlFor="short-name-display">
            {localizedStrings['%projectCreation_general_shortName%'] || 'Short Name:'}
          </Label>
          <div
            id="short-name-display"
            className="tw-min-h-[36px] tw-rounded-md tw-bg-muted tw-px-3 tw-py-2"
          >
            {state.shortName || '(Not set)'}
          </div>
          <div /> {/* Empty cell for alignment */}
          {/* Copyright */}
          <Label htmlFor="copyright-display">
            {localizedStrings['%projectCreation_general_copyright%'] || 'Copyright:'}
          </Label>
          <div
            id="copyright-display"
            className="tw-min-h-[36px] tw-truncate tw-rounded-md tw-bg-muted tw-px-3 tw-py-2 tw-text-sm"
          >
            {state.copyright || '(Not set)'}
          </div>
          <div /> {/* Empty cell for alignment */}
        </div>
      </div>

      {/* Language Section */}
      <div className="tw-rounded-md tw-border tw-p-4">
        <Label className="tw-mb-3 tw-block tw-font-semibold">
          {localizedStrings['%projectCreation_general_language%'] || 'Language'}
        </Label>

        <div className="tw-flex tw-items-center tw-gap-4">
          <Label htmlFor="language-display">
            {localizedStrings['%projectCreation_general_language%'] || 'Language:'}
          </Label>
          <div
            id="language-display"
            className="tw-min-h-[36px] tw-flex-1 tw-rounded-md tw-bg-muted tw-px-3 tw-py-2"
          >
            {state.languageName ? `${state.languageName} (${state.languageId})` : '(Not selected)'}
          </div>
          <Button variant="outline" size="sm" onClick={handleEditLanguage}>
            {localizedStrings['%projectCreation_general_edit%'] || 'Edit'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleNewLanguage}>
            {localizedStrings['%projectCreation_general_newLanguage%'] || 'New'}
          </Button>
        </div>

        <Button variant="link" className="tw-mt-2 tw-h-auto tw-p-0">
          {localizedStrings['%projectCreation_general_languageSettings%'] || 'Language settings...'}
        </Button>
      </div>

      {/* Versification */}
      <div className="tw-flex tw-items-center tw-gap-4">
        <Label htmlFor="versification">
          {localizedStrings['%projectCreation_general_versification%'] || 'Versification:'}
        </Label>
        <Select
          value={state.versification}
          onValueChange={handleVersificationChange}
          disabled={versificationDisabled}
        >
          <SelectTrigger id="versification" className="tw-w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {VERSIFICATION_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {localizedStrings[option.labelKey] || option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.hasCustomVersification && (
          <span className="tw-text-sm tw-text-muted-foreground">
            {localizedStrings['%projectCreation_general_versificationCustomized%'] ||
              '(Customized)'}
          </span>
        )}
      </div>

      {/* Project Type */}
      <div className="tw-flex tw-items-center tw-gap-4">
        <Label htmlFor="project-type">
          {localizedStrings['%projectCreation_general_projectType%'] || 'Type of Project:'}
        </Label>
        <Select
          value={state.projectType}
          onValueChange={handleTypeChange}
          disabled={state.mode === 'edit'}
        >
          <SelectTrigger id="project-type" className="tw-w-[300px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PROJECT_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {localizedStrings[option.labelKey] || option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Based On (for derived types) */}
      {state.typeConfiguration?.baseProjectRequired && (
        <div className="tw-flex tw-items-center tw-gap-4">
          <Label htmlFor="based-on">
            {localizedStrings['%projectCreation_general_basedOn%'] || 'Based on:'}
          </Label>
          <Select value={state.baseProjectGuid || ''} onValueChange={handleBaseChange}>
            <SelectTrigger id="based-on" className="tw-w-[300px]">
              <SelectValue placeholder="Select a project..." />
            </SelectTrigger>
            <SelectContent>
              {state.availableBaseProjects.map((project) => (
                <SelectItem key={project.guid} value={project.guid}>
                  {project.fullName} ({project.shortName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state.baseProject && (
            <Button variant="link" className="tw-h-auto tw-p-0">
              {localizedStrings['%projectCreation_general_openBaseProject%'] ||
                `Open ${state.baseProject.shortName}`}
            </Button>
          )}
        </div>
      )}

      {/* Registration Section */}
      <div className="tw-rounded-md tw-border tw-p-4">
        <Label className="tw-mb-3 tw-block tw-font-semibold">
          {localizedStrings['%projectCreation_general_registration%'] || 'Registration'}
        </Label>

        <RegistrationSelectionControl
          projectType={state.projectType}
          baseProject={state.baseProject}
          isNewProject={state.mode === 'new'}
          projectGuid={state.projectGuid}
          currentRegistration={null}
          onOfflineConfirmChange={(confirmed) =>
            dispatch({ type: 'SET_OFFLINE_CONFIRMED', confirmed })
          }
        />

        {showDerivedRegistrationOption && (
          <div className="tw-mt-4 tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="allow-derived-reg"
              checked={state.allowDerivedProjectRegistration}
              onCheckedChange={handleAllowDerivedRegChange}
            />
            <Label htmlFor="allow-derived-reg" className="tw-cursor-pointer">
              {localizedStrings['%projectCreation_general_registerSeparately%'] ||
                'Register this derived project separately'}
            </Label>
          </div>
        )}
      </div>

      {/* SIL Encoding (for transliteration types) */}
      {showEncodingFields && (
        <div className="tw-flex tw-flex-col tw-gap-4">
          <div className="tw-flex tw-items-center tw-gap-4">
            <Label htmlFor="encoding">
              {localizedStrings['%projectCreation_general_encoding%'] || 'SIL Encoding:'}
            </Label>
            <Select
              value={state.encodingConverter || ''}
              onValueChange={(value) =>
                dispatch({ type: 'SET_ENCODING_CONVERTER', converter: value || null })
              }
            >
              <SelectTrigger id="encoding" className="tw-w-[300px]">
                <SelectValue placeholder="Select encoding converter..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Select encoding converter...</SelectItem>
                {/* Encoding options would be populated from PAPI */}
              </SelectContent>
            </Select>
          </div>

          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="encoder-reverse"
              checked={state.encoderReverseDirection}
              onCheckedChange={handleEncoderReverseChange}
            />
            <Label htmlFor="encoder-reverse" className="tw-cursor-pointer">
              {localizedStrings['%projectCreation_general_encoderReverse%'] ||
                'Apply encoding converter in reverse direction'}
            </Label>
          </div>
        </div>
      )}

      {/* Minimum Paratext Version */}
      <div className="tw-text-sm tw-text-muted-foreground">
        {localizedStrings['%projectCreation_general_minVersion%'] || 'Minimum Paratext Version:'}{' '}
        {state.minParatextVersion}
      </div>
    </div>
  );
}

export default GeneralTab;
