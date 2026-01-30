import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { Alert, AlertDescription, AlertTitle, Button, Label } from 'platform-bible-react';
import { AlertTriangle } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { TaskList } from './components/interlinear/task-list.component';
import { CreateTaskMenu } from './components/interlinear/create-task-menu.component';
import { SettingsPanel } from './components/interlinear/settings-panel.component';
import type {
  InterlinearSetupItem,
  InterlinearTaskType,
  InterlinearSetupInput,
  InterlinearSetupOutput,
  ValidationError,
} from './types/interlinear-setup.types';
import {
  getVisibilityForTaskType,
  getDefaultProjectTypeForTask,
} from './types/interlinear-setup.types';

/** Mock data for development - will be replaced with actual PAPI data */
const MOCK_INPUT: InterlinearSetupInput = {
  projectName: 'Sample Project',
  projectGuid: 'sample-guid-123',
  isRegistered: true,
  existingSetups: [
    {
      id: '1',
      taskType: 'Glossing',
      sourceProjectName: 'Sample Project',
      modelTextName: 'English Reference',
      modelTextCode: 'eng',
      displayText: 'Glosses for Sample Project, Model text: English Reference (eng)',
    },
    {
      id: '2',
      taskType: 'BackTranslation',
      sourceProjectName: 'Sample Project',
      modelTextName: 'English Reference',
      outputProjectName: 'Sample BT',
      modelTextCode: 'eng',
      displayText:
        'Back translation of Sample Project, Model text: English Reference, Output: Sample BT (eng)',
    },
  ],
  options: {
    availableProjects: [
      { name: 'ENG', guid: 'eng-guid', displayName: 'English Reference' },
      { name: 'SPA', guid: 'spa-guid', displayName: 'Spanish Reference' },
      { name: 'FRA', guid: 'fra-guid', displayName: 'French Reference' },
    ],
    availableLanguages: [
      { id: 'en', code: 'en', displayName: 'English', isRTL: false },
      { id: 'es', code: 'es', displayName: 'Spanish', isRTL: false },
      { id: 'fr', code: 'fr', displayName: 'French', isRTL: false },
    ],
  },
  userContext: {
    isRegistered: true,
    canRegisterProjects: true,
    isOnline: true,
    isGuest: false,
    isObserver: false,
  },
};

/**
 * InterlinearSetupWebView is the main component for configuring interlinear tasks. Accessed from
 * Tab menu > Tools > Interlinearizer.
 */
global.webViewComponent = function InterlinearSetupWebView({ useWebViewState }: WebViewProps) {
  // Get input data from web view state (with mock fallback for development)
  const [inputDataRaw] = useWebViewState<InterlinearSetupInput | undefined>('inputData', undefined);
  const inputData = inputDataRaw ?? MOCK_INPUT;

  const { projectName, projectGuid, isRegistered, existingSetups, options, userContext } =
    inputData;

  // Selection state
  const [selectedSetup, setSelectedSetup] = useState<InterlinearSetupItem | undefined>(undefined);
  const [creatingNewTask, setCreatingNewTask] = useState(false);
  const [newTaskType, setNewTaskType] = useState<InterlinearTaskType | undefined>(undefined);

  // Settings panel values
  const [modelText, setModelText] = useState<string | undefined>(undefined);
  const [relatedLanguages, setRelatedLanguages] = useState(false);
  const [destination, setDestination] = useState<string | undefined>(undefined);
  const [glossLanguage, setGlossLanguage] = useState<string | undefined>(undefined);
  const [outputGlosses, setOutputGlosses] = useState(false);

  // UI state
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  // Determine active task type
  const activeTaskType = creatingNewTask ? newTaskType : selectedSetup?.taskType;

  // Compute visibility based on task type and outputGlosses
  const visibility = useMemo(
    () => getVisibilityForTaskType(activeTaskType, outputGlosses),
    [activeTaskType, outputGlosses],
  );

  // Check for missing projects in existing setups
  const missingProjects = useMemo(() => {
    const missing: string[] = [];

    existingSetups.forEach((setup) => {
      if (setup.modelTextName) {
        const modelProject = options.availableProjects.find(
          (p) => p.displayName === setup.modelTextName,
        );
        if (!modelProject) {
          missing.push(setup.modelTextName);
        }
      }
      if (setup.outputProjectName) {
        const outputProject = options.availableProjects.find(
          (p) => p.displayName === setup.outputProjectName,
        );
        if (!outputProject) {
          missing.push(setup.outputProjectName);
        }
      }
    });

    return [...new Set(missing)]; // Remove duplicates
  }, [existingSetups, options.availableProjects]);

  // Convert validation errors array to record for settings panel
  const validationErrorsRecord = useMemo(() => {
    const record: Record<string, string> = {};
    validationErrors.forEach((err) => {
      record[err.field] = err.message;
    });
    return record;
  }, [validationErrors]);

  // Handle selecting an existing setup
  const handleSelectSetup = useCallback(
    (setup: InterlinearSetupItem) => {
      setSelectedSetup(setup);
      setCreatingNewTask(false);
      setNewTaskType(undefined);

      // Populate settings from selected setup
      const modelProject = options.availableProjects.find(
        (p) => p.displayName === setup.modelTextName,
      );
      setModelText(modelProject?.guid);

      const outputProject = options.availableProjects.find(
        (p) => p.displayName === setup.outputProjectName,
      );
      setDestination(outputProject?.guid);

      setGlossLanguage(setup.languageId);
      setRelatedLanguages(false);
      setOutputGlosses(!!setup.outputProjectName);
      setIsDirty(false);
      setValidationErrors([]);
    },
    [options.availableProjects],
  );

  // Handle selecting a new task type from the create menu
  const handleSelectTaskType = useCallback((taskType: InterlinearTaskType) => {
    setCreatingNewTask(true);
    setNewTaskType(taskType);
    setSelectedSetup(undefined);

    // Reset settings
    setModelText(undefined);
    setRelatedLanguages(false);
    setDestination(undefined);
    setGlossLanguage(undefined);
    setOutputGlosses(false);
    setIsDirty(false);
    setValidationErrors([]);
  }, []);

  // Handle settings field changes
  const handleSettingChange = useCallback(() => {
    setIsDirty(true);
    setValidationErrors([]);
  }, []);

  const handleModelTextChange = useCallback(
    (value: string | undefined) => {
      setModelText(value);
      handleSettingChange();
    },
    [handleSettingChange],
  );

  const handleRelatedLanguagesChange = useCallback(
    (checked: boolean) => {
      setRelatedLanguages(checked);
      handleSettingChange();
    },
    [handleSettingChange],
  );

  const handleDestinationChange = useCallback(
    (value: string | undefined) => {
      setDestination(value);
      handleSettingChange();
    },
    [handleSettingChange],
  );

  const handleGlossLanguageChange = useCallback(
    (value: string | undefined) => {
      setGlossLanguage(value);
      handleSettingChange();
    },
    [handleSettingChange],
  );

  const handleOutputGlossesChange = useCallback(
    (checked: boolean) => {
      setOutputGlosses(checked);
      // Clear destination if unchecking for glossing tasks
      if (
        !checked &&
        (activeTaskType === 'Glossing' || activeTaskType === 'GlossingWithoutModel')
      ) {
        setDestination(undefined);
      }
      handleSettingChange();
    },
    [activeTaskType, handleSettingChange],
  );

  // Handle "New project..." selection in destination dropdown
  const handleNewProjectRequested = useCallback(() => {
    if (!activeTaskType) return;

    // Build context for ProjectPropertiesDialog
    const createProjectContext = {
      sourceProjectName: projectName,
      sourceProjectGuid: projectGuid,
      taskType: activeTaskType,
      presetProjectType: getDefaultProjectTypeForTask(activeTaskType),
      lockBasedOn: true,
    };

    // Log the context (production would open ProjectPropertiesDialog)
    logger.info(
      `Open ProjectPropertiesDialog with context: ${JSON.stringify(createProjectContext)}`,
    );

    // TODO: Implement actual navigation to ProjectPropertiesDialog
    // This would use papi.webViews.openWebView() or a callback prop
  }, [activeTaskType, projectName, projectGuid]);

  // Validate the form
  const validate = useCallback((): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!activeTaskType) {
      return errors;
    }

    // Model text required for Glossing and BackTranslation
    if ((activeTaskType === 'Glossing' || activeTaskType === 'BackTranslation') && !modelText) {
      errors.push({
        field: 'modelText',
        message: 'Model text is required',
        severity: 'error',
      });
    }

    // Gloss language required for GlossingWithoutModel
    if (activeTaskType === 'GlossingWithoutModel' && !glossLanguage) {
      errors.push({
        field: 'glossLanguage',
        message: 'Glossing language is required',
        severity: 'error',
      });
    }

    // Destination required for BackTranslation, Adaptation, or when outputGlosses is checked
    const destinationRequired =
      activeTaskType === 'BackTranslation' || activeTaskType === 'Adaptation' || outputGlosses;

    if (destinationRequired && !destination) {
      errors.push({
        field: 'destination',
        message: 'Output project is required',
        severity: 'error',
      });
    }

    return errors;
  }, [activeTaskType, modelText, glossLanguage, destination, outputGlosses]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    const errors = validate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (!activeTaskType) return;

    setIsSubmitting(true);

    try {
      const output: InterlinearSetupOutput = {
        action: selectedSetup ? 'open' : 'save',
        setupData: {
          taskType: activeTaskType,
          sourceProjectGuid: projectGuid,
          modelTextGuid: modelText,
          outputProjectGuid: destination,
          languageId: glossLanguage,
          relatedLanguages: relatedLanguages || undefined,
          outputGlosses: outputGlosses || undefined,
        },
      };

      // Log the output (production would send via PAPI)
      logger.info(`Submit output: ${JSON.stringify(output)}`);

      // TODO: Implement actual submission via papi.commands.sendCommand()
    } finally {
      setIsSubmitting(false);
    }
  }, [
    validate,
    selectedSetup,
    activeTaskType,
    projectGuid,
    modelText,
    destination,
    glossLanguage,
    relatedLanguages,
    outputGlosses,
  ]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    // Log cancel (production would close the web view)
    logger.info('Cancel interlinear setup');
    // TODO: Implement actual close via web view API
  }, []);

  // Determine button label and enabled state
  const submitLabel = selectedSetup ? 'Open' : 'Save';
  const isFormValid = validate().length === 0;
  const canSubmit = (selectedSetup || (creatingNewTask && isDirty)) && isFormValid && !isSubmitting;

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-gap-4 tw-p-4">
      {/* Title */}
      <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">
        Choose interlinear: {projectName}
      </h2>

      {/* Registration Warning */}
      {!isRegistered && (
        <Alert variant="destructive">
          <AlertTriangle className="tw-h-4 tw-w-4" />
          <AlertTitle>Registration Required</AlertTitle>
          <AlertDescription>
            This project is not registered. Some features may be limited.
          </AlertDescription>
        </Alert>
      )}

      {/* Missing Projects Warning */}
      {missingProjects.length > 0 && (
        <Alert variant="default" className="tw-border-yellow-500 tw-bg-yellow-50">
          <AlertTriangle className="tw-h-4 tw-w-4 tw-text-yellow-600" />
          <AlertTitle className="tw-text-yellow-800">Missing Projects</AlertTitle>
          <AlertDescription className="tw-text-yellow-700">
            The following referenced projects are not available: {missingProjects.join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Existing Tasks Section */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label className="tw-font-medium">Choose task:</Label>
        <TaskList
          items={existingSetups}
          selectedItem={selectedSetup}
          onSelectItem={handleSelectSetup}
        />
      </div>

      {/* Create Menu */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <CreateTaskMenu
          projectName={projectName}
          onSelectTaskType={handleSelectTaskType}
          disabled={isSubmitting}
        />
      </div>

      {/* Settings Panel */}
      {(selectedSetup || creatingNewTask) && activeTaskType && (
        <SettingsPanel
          taskType={activeTaskType}
          visibility={visibility}
          modelText={modelText}
          availableProjects={options.availableProjects}
          onModelTextChange={handleModelTextChange}
          relatedLanguages={relatedLanguages}
          onRelatedLanguagesChange={handleRelatedLanguagesChange}
          destination={destination}
          onDestinationChange={handleDestinationChange}
          onNewProjectRequested={handleNewProjectRequested}
          glossLanguage={glossLanguage}
          availableLanguages={options.availableLanguages}
          onGlossLanguageChange={handleGlossLanguageChange}
          outputGlosses={outputGlosses}
          onOutputGlossesChange={handleOutputGlossesChange}
          isObserver={userContext.isObserver}
          validationErrors={validationErrorsRecord}
        />
      )}

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-mt-auto tw-pt-4 tw-border-t tw-border-border">
        <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          {isSubmitting ? 'Processing...' : submitLabel}
        </Button>
      </div>
    </div>
  );
};
