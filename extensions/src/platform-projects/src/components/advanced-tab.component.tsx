import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo } from 'react';
import type { ProjectPropertiesFormState, NormalizationType } from 'platform-projects';

// #region Constants

/** Available normalization options */
const NORMALIZATION_OPTIONS: { value: NormalizationType; label: string }[] = [
  { value: 'Undefined', label: 'Undefined' },
  { value: 'NFD', label: 'NFD (Canonical Decomposition)' },
  { value: 'NFC', label: 'NFC (Canonical Composition)' },
];

/** Pattern placeholder replacements */
const PATTERN_PLACEHOLDERS = [
  { placeholder: '{BBB}', description: 'Three-letter book code (e.g., MAT, GEN)' },
  { placeholder: '{nn}', description: 'Two-digit book number (e.g., 01, 40)' },
  { placeholder: '{project}', description: 'Project short name' },
];

// #endregion

// #region Localized Strings

const ADVANCED_TAB_LOCALIZED_KEYS: LocalizeKey[] = [
  '%webView_projectProperties_advancedTab_filePattern_label%',
  '%webView_projectProperties_advancedTab_filePattern_placeholder%',
  '%webView_projectProperties_advancedTab_filePattern_edit%',
  '%webView_projectProperties_advancedTab_filePattern_preview%',
  '%webView_projectProperties_advancedTab_normalization_label%',
  '%webView_projectProperties_advancedTab_validation_required%',
  '%webView_projectProperties_advancedTab_validation_noPtx%',
];

// #endregion

// #region Types

interface AdvancedTabProps {
  formState: ProjectPropertiesFormState;
  onFieldChange: (field: keyof ProjectPropertiesFormState, value: unknown) => void;
  validationErrors: Record<string, string>;
  isDisabled: boolean;
}

// #endregion

// #region Helper Functions

/**
 * Generate a preview of the file naming pattern
 *
 * @param pattern The pattern string
 * @param projectName The project short name
 * @returns A preview string showing what a filename would look like
 */
function generatePatternPreview(pattern: string, projectName: string): string {
  // Example: "41MAT{project}.SFM" -> "41MATTEST.SFM"
  let preview = pattern;
  preview = preview.replace('{BBB}', 'MAT');
  preview = preview.replace('{nn}', '40');
  preview = preview.replace('{project}', projectName || 'PROJ');
  return preview;
}

/**
 * Validate the file naming pattern
 *
 * @param pattern The pattern to validate
 * @returns Error message or undefined if valid
 */
function validatePattern(pattern: string): string | undefined {
  if (!pattern || pattern.trim().length === 0) {
    return 'File naming pattern is required';
  }
  if (pattern.toLowerCase().endsWith('.ptx')) {
    return 'File naming pattern cannot end with .ptx';
  }
  return undefined;
}

// #endregion

export function AdvancedTab({
  formState,
  onFieldChange,
  validationErrors,
  isDisabled,
}: AdvancedTabProps) {
  const [localizedStrings] = useLocalizedStrings(ADVANCED_TAB_LOCALIZED_KEYS);

  // Handle file pattern change
  const handleFilePatternChange = useCallback(
    (value: string) => {
      onFieldChange('fileNameForm', value);
    },
    [onFieldChange],
  );

  // Handle normalization change
  const handleNormalizationChange = useCallback(
    (value: string) => {
      // Type guard for NormalizationType
      const isValidNormalizationType = (v: string): v is NormalizationType =>
        v === 'Undefined' || v === 'NFD' || v === 'NFC';

      if (isValidNormalizationType(value)) {
        onFieldChange('normalization', value);
      }
    },
    [onFieldChange],
  );

  // Generate preview
  const patternPreview = useMemo(
    () => generatePatternPreview(formState.fileNameForm, formState.shortName),
    [formState.fileNameForm, formState.shortName],
  );

  // Validate pattern
  const patternError = useMemo(
    () => validatePattern(formState.fileNameForm),
    [formState.fileNameForm],
  );

  // Combined error (from local validation or parent)
  const displayError = patternError ?? validationErrors.fileNameForm;

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-p-4">
      {/* File Naming Pattern Section */}
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-border-b tw-border-border tw-pb-2">
          <Label className="tw-text-base tw-font-semibold">
            {localizedStrings['%webView_projectProperties_advancedTab_filePattern_label%']}
          </Label>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-items-center tw-gap-2">
            <Input
              id="fileNameForm"
              value={formState.fileNameForm}
              onChange={(e) => handleFilePatternChange(e.target.value)}
              placeholder={
                localizedStrings['%webView_projectProperties_advancedTab_filePattern_placeholder%']
              }
              disabled={isDisabled}
              className={`tw-max-w-[300px] tw-font-mono ${displayError ? 'tw-border-destructive' : ''}`}
              aria-invalid={!!displayError}
              aria-describedby={displayError ? 'filePattern-error' : undefined}
            />
            <Button
              variant="outline"
              size="sm"
              disabled={isDisabled}
              onClick={() => {
                // TODO: Open EditFilingPatternForm dialog
                // For now, this is a placeholder
              }}
            >
              {localizedStrings['%webView_projectProperties_advancedTab_filePattern_edit%']}
            </Button>
          </div>

          {displayError && (
            <Label id="filePattern-error" className="tw-text-sm tw-text-destructive" role="alert">
              {displayError}
            </Label>
          )}

          {/* Preview */}
          <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm">
            <span className="tw-text-muted-foreground">
              {localizedStrings['%webView_projectProperties_advancedTab_filePattern_preview%']}:
            </span>
            <span className="tw-font-mono tw-text-foreground">{patternPreview}</span>
          </div>

          {/* Placeholder Legend */}
          <div className="tw-mt-2 tw-rounded-md tw-border tw-border-border tw-bg-muted/30 tw-p-3">
            <Label className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
              Available placeholders:
            </Label>
            <ul className="tw-space-y-1 tw-text-sm tw-text-muted-foreground">
              {PATTERN_PLACEHOLDERS.map((item) => (
                <li key={item.placeholder}>
                  <code className="tw-rounded tw-bg-muted tw-px-1 tw-font-mono">
                    {item.placeholder}
                  </code>{' '}
                  - {item.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Normalization Section */}
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-border-b tw-border-border tw-pb-2">
          <Label className="tw-text-base tw-font-semibold">
            {localizedStrings['%webView_projectProperties_advancedTab_normalization_label%']}
          </Label>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-1.5">
          <Select
            value={formState.normalization}
            onValueChange={handleNormalizationChange}
            disabled={isDisabled}
          >
            <SelectTrigger id="normalization" className="tw-max-w-[300px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {NORMALIZATION_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {validationErrors.normalization && (
            <Label className="tw-text-sm tw-text-destructive" role="alert">
              {validationErrors.normalization}
            </Label>
          )}

          <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
            Normalization determines how Unicode characters are stored. NFC (composed) is
            recommended for most languages. NFD (decomposed) may be needed for some complex scripts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdvancedTab;
