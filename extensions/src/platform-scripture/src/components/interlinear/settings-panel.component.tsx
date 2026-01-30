import { useMemo } from 'react';
import { Label, ComboBox, Checkbox, type ComboBoxLabelOption } from 'platform-bible-react';
import type {
  InterlinearTaskType,
  ProjectOption,
  LanguageOption,
  TaskTypeVisibility,
} from '../../types/interlinear-setup.types';
import { getDestinationLabel, getInstructionText } from '../../types/interlinear-setup.types';

/** Value for "New project..." option in destination dropdown */
export const NEW_PROJECT_OPTION_VALUE = '__NEW_PROJECT__';

export interface SettingsPanelProps {
  /** Current task type being configured */
  taskType: InterlinearTaskType | undefined;
  /** Visibility flags for each field */
  visibility: TaskTypeVisibility;
  /** Current model text selection (project GUID) */
  modelText: string | undefined;
  /** Available projects for model text dropdown */
  availableProjects: ProjectOption[];
  /** Callback when model text changes */
  onModelTextChange: (value: string | undefined) => void;
  /** Current related languages checkbox state */
  relatedLanguages: boolean;
  /** Callback when related languages changes */
  onRelatedLanguagesChange: (checked: boolean) => void;
  /** Current destination selection (project GUID) */
  destination: string | undefined;
  /** Callback when destination changes */
  onDestinationChange: (value: string | undefined) => void;
  /** Callback when "New project..." is selected */
  onNewProjectRequested: () => void;
  /** Current gloss language selection */
  glossLanguage: string | undefined;
  /** Available languages for gloss language dropdown */
  availableLanguages: LanguageOption[];
  /** Callback when gloss language changes */
  onGlossLanguageChange: (value: string | undefined) => void;
  /** Current output glosses checkbox state */
  outputGlosses: boolean;
  /** Callback when output glosses changes */
  onOutputGlossesChange: (checked: boolean) => void;
  /** Whether the user is an observer (cannot create projects) */
  isObserver: boolean;
  /** Validation errors by field name */
  validationErrors: Record<string, string>;
}

/** Extended option type with guid for lookup */
type ProjectComboOption = ComboBoxLabelOption & { guid: string };
/** Extended option type with id for lookup */
type LanguageComboOption = ComboBoxLabelOption & { id: string };

/**
 * SettingsPanel displays the configuration fields for an interlinear task. Fields are shown/hidden
 * based on the task type visibility matrix.
 */
export function SettingsPanel({
  taskType,
  visibility,
  modelText,
  availableProjects,
  onModelTextChange,
  relatedLanguages,
  onRelatedLanguagesChange,
  destination,
  onDestinationChange,
  onNewProjectRequested,
  glossLanguage,
  availableLanguages,
  onGlossLanguageChange,
  outputGlosses,
  onOutputGlossesChange,
  isObserver,
  validationErrors,
}: SettingsPanelProps) {
  // Build project options for dropdowns with guid as secondary data
  const projectOptions: ProjectComboOption[] = useMemo(
    () =>
      availableProjects.map((p) => ({
        label: p.displayName,
        guid: p.guid,
      })),
    [availableProjects],
  );

  // Build destination options with "New project..." option
  const destinationOptions: ProjectComboOption[] = useMemo(
    () => [
      ...projectOptions,
      ...(isObserver ? [] : [{ label: 'New project...', guid: NEW_PROJECT_OPTION_VALUE }]),
    ],
    [projectOptions, isObserver],
  );

  // Build language options for dropdown
  const languageOptions: LanguageComboOption[] = useMemo(
    () =>
      availableLanguages.map((l) => ({
        label: l.displayName,
        id: l.id,
      })),
    [availableLanguages],
  );

  // Find the selected project option by guid
  const selectedModelText = useMemo(
    () => projectOptions.find((p) => p.guid === modelText),
    [projectOptions, modelText],
  );

  // Find the selected destination option by guid
  const selectedDestination = useMemo(
    () => destinationOptions.find((p) => p.guid === destination),
    [destinationOptions, destination],
  );

  // Find the selected language option by id
  const selectedLanguage = useMemo(
    () => languageOptions.find((l) => l.id === glossLanguage),
    [languageOptions, glossLanguage],
  );

  // Handle model text change
  const handleModelTextChange = (option: ProjectComboOption) => {
    onModelTextChange(option.guid || undefined);
  };

  // Handle destination change, triggering new project callback if needed
  const handleDestinationChange = (option: ProjectComboOption) => {
    if (option.guid === NEW_PROJECT_OPTION_VALUE) {
      onNewProjectRequested();
    } else {
      onDestinationChange(option.guid || undefined);
    }
  };

  // Handle language change
  const handleLanguageChange = (option: LanguageComboOption) => {
    onGlossLanguageChange(option.id || undefined);
  };

  const instructionText = getInstructionText(taskType);
  const destinationLabel = getDestinationLabel(taskType);

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4 tw-border tw-border-border tw-rounded tw-bg-background">
      <h3 className="tw-font-semibold tw-text-foreground">Settings</h3>

      {instructionText && <p className="tw-text-sm tw-text-muted-foreground">{instructionText}</p>}

      {/* Model Text Field */}
      {visibility.showModelText && (
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="model-text">Model text:</Label>
          <ComboBox<ProjectComboOption>
            options={projectOptions}
            value={selectedModelText}
            onChange={handleModelTextChange}
            getOptionLabel={(option) => option.label}
            textPlaceholder="Select model text..."
            buttonPlaceholder="Select model text..."
            buttonClassName="tw-w-full"
          />
          {validationErrors.modelText && (
            <span className="tw-text-sm tw-text-destructive">{validationErrors.modelText}</span>
          )}
        </div>
      )}

      {/* Related Languages Checkbox */}
      {visibility.showRelatedLanguages && (
        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="related-languages"
            checked={relatedLanguages}
            onCheckedChange={(checked) => onRelatedLanguagesChange(checked === true)}
          />
          <Label htmlFor="related-languages" className="tw-cursor-pointer">
            Related languages
          </Label>
        </div>
      )}

      {/* Gloss Language Field */}
      {visibility.showGlossLanguage && (
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="gloss-language">Language:</Label>
          <ComboBox<LanguageComboOption>
            options={languageOptions}
            value={selectedLanguage}
            onChange={handleLanguageChange}
            getOptionLabel={(option) => option.label}
            textPlaceholder="Select language..."
            buttonPlaceholder="Select language..."
            buttonClassName="tw-w-full"
          />
          {validationErrors.glossLanguage && (
            <span className="tw-text-sm tw-text-destructive">{validationErrors.glossLanguage}</span>
          )}
        </div>
      )}

      {/* Output Glosses Checkbox */}
      {visibility.showOutputGlosses && (
        <div className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="output-glosses"
              checked={outputGlosses}
              onCheckedChange={(checked) => onOutputGlossesChange(checked === true)}
            />
            <Label htmlFor="output-glosses" className="tw-cursor-pointer">
              Output glosses
            </Label>
          </div>
          {outputGlosses && (
            <p className="tw-text-sm tw-text-muted-foreground tw-ml-6">
              Glosses will be saved to the destination project.
            </p>
          )}
        </div>
      )}

      {/* Destination Field */}
      {visibility.showDestination && (
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="destination">{destinationLabel}</Label>
          <ComboBox<ProjectComboOption>
            options={destinationOptions}
            value={selectedDestination}
            onChange={handleDestinationChange}
            getOptionLabel={(option) => option.label}
            textPlaceholder="Select destination..."
            buttonPlaceholder="Select destination..."
            buttonClassName="tw-w-full"
          />
          {validationErrors.destination && (
            <span className="tw-text-sm tw-text-destructive">{validationErrors.destination}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default SettingsPanel;
