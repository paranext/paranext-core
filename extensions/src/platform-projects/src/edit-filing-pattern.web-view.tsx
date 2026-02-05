/**
 * === NEW IN PT10 === Reason: Web views don't exist in PT9's WinForms architecture. Maps to:
 * UI-PKG-005
 *
 * Edit Filing Pattern Form - Dialog for editing book file naming patterns with live preview.
 * Implements VAL-014 (pattern validation), BHV-514 (pattern resolution)
 */

import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Input, Label } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// #region Localized string keys

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%webView_editFilingPattern_title%',
  '%webView_editFilingPattern_field_pattern%',
  '%webView_editFilingPattern_field_preview%',
  '%webView_editFilingPattern_legend_title%',
  '%webView_editFilingPattern_legend_bbb%',
  '%webView_editFilingPattern_legend_nn%',
  '%webView_editFilingPattern_legend_project%',
  '%webView_editFilingPattern_error_required%',
  '%webView_editFilingPattern_error_noPtx%',
  '%webView_editFilingPattern_error_invalidChars%',
  '%webView_editFilingPattern_ariaLabel_patternInput%',
  '%webView_projectProperties_button_ok%',
  '%webView_projectProperties_button_cancel%',
];

// #endregion

// #region Types

/** Context needed for resolving pattern placeholders in preview */
export interface PreviewContext {
  /** Project short name (e.g., "TEST") */
  projectShortName: string;
  /** Sample book ID for preview (e.g., "MAT") */
  sampleBookId: string;
  /** Sample book number for preview (e.g., 41) */
  sampleBookNumber: number;
}

/** Input configuration for the Edit Filing Pattern form */
export interface EditFilingPatternFormInput {
  /** Initial pattern value */
  initialPattern: string;
  /** Context for preview generation */
  previewContext: PreviewContext;
}

/** Internal form state */
interface EditFilingPatternFormState {
  /** Current pattern value */
  pattern: string;
  /** Validation error message, if any */
  validationError: string | undefined;
}

/** Output returned when form closes */
export interface EditFilingPatternFormOutput {
  action: 'submit' | 'cancel';
  data?: {
    pattern: string;
  };
}

// #endregion

// #region Validation constants

/**
 * Characters not allowed in filename patterns (Windows is most restrictive). Excludes: < > : " / \
 *
 * | ? \* and control characters (ASCII 0-31)
 */
// eslint-disable-next-line no-control-regex -- Control characters intentionally excluded from filenames
const INVALID_FILENAME_CHARS = /[<>:"/\\|?*\x00-\x1F]/;

/** Default pattern when none is provided */
const DEFAULT_PATTERN = '{nn}{BBB}{project}.SFM';

// #endregion

// #region Helper functions

/**
 * Get a localized string with fallback
 *
 * @param localizedStrings - The localized strings object
 * @param key - The localization key
 * @param fallback - Fallback value if key not found
 * @returns The localized string or fallback
 */
function getLocalizedString(
  localizedStrings: LanguageStrings,
  key: LocalizeKey,
  fallback: string,
): string {
  const value = localizedStrings[key];
  return typeof value === 'string' ? value : fallback;
}

/**
 * Resolve pattern to actual filename for preview. PT9 Source: ProjectSettings.GetBookFileName and
 * related
 *
 * @param pattern - The pattern with placeholders
 * @param context - Values for placeholder substitution
 * @returns Resolved filename
 */
function resolvePattern(pattern: string, context: PreviewContext): string {
  return pattern
    .replace(/\{BBB\}/g, context.sampleBookId)
    .replace(/\{nn\}/g, context.sampleBookNumber.toString().padStart(2, '0'))
    .replace(/\{project\}/g, context.projectShortName);
}

/**
 * Check if pattern contains invalid filename characters. Removes placeholder markers before
 * checking.
 *
 * @param pattern - The pattern to validate
 * @returns True if pattern contains invalid characters
 */
function containsInvalidFilenameChars(pattern: string): boolean {
  // Remove placeholder markers before checking
  const withoutPlaceholders = pattern
    .replace(/\{BBB\}/g, '')
    .replace(/\{nn\}/g, '')
    .replace(/\{project\}/g, '');

  return INVALID_FILENAME_CHARS.test(withoutPlaceholders);
}

// #endregion

// #region Component

globalThis.webViewComponent = function EditFilingPatternForm({
  useWebViewState,
  updateWebViewDefinition,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // Get input from web view state
  const [initialPattern] = useWebViewState<string>('initialPattern', DEFAULT_PATTERN);

  const [previewContext] = useWebViewState<PreviewContext>('previewContext', {
    projectShortName: 'project',
    sampleBookId: 'MAT',
    sampleBookNumber: 41,
  });

  // Track output (for submit/cancel)
  const [, setOutput] = useWebViewState<EditFilingPatternFormOutput | undefined>(
    'output',
    undefined,
  );

  // Form state
  const [formState, setFormState] = useState<EditFilingPatternFormState>(() => ({
    pattern: initialPattern,
    validationError: undefined,
  }));

  // Ref for focus management
  // eslint-disable-next-line no-null/no-null -- useRef requires null for DOM refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus pattern input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sync with initial pattern when it changes
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      pattern: initialPattern,
    }));
  }, [initialPattern]);

  /** Validate pattern against VAL-014 rules. Returns error message or undefined if valid. */
  const validatePattern = useCallback(
    (pattern: string): string | undefined => {
      // VAL-014.1: Pattern is required
      if (!pattern || pattern.trim().length === 0) {
        return getLocalizedString(
          localizedStrings,
          '%webView_editFilingPattern_error_required%',
          'Pattern is required',
        );
      }

      // VAL-014.2: No .ptx extension
      if (pattern.toLowerCase().endsWith('.ptx')) {
        return getLocalizedString(
          localizedStrings,
          '%webView_editFilingPattern_error_noPtx%',
          'Pattern cannot end with .ptx extension',
        );
      }

      // VAL-014.3: Valid filename characters
      if (containsInvalidFilenameChars(pattern)) {
        return getLocalizedString(
          localizedStrings,
          '%webView_editFilingPattern_error_invalidChars%',
          'Pattern contains invalid filename characters',
        );
      }

      return undefined;
    },
    [localizedStrings],
  );

  // Handle pattern change with validation
  const handlePatternChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPattern = e.target.value;
      const error = validatePattern(newPattern);

      setFormState({
        pattern: newPattern,
        validationError: error,
      });
    },
    [validatePattern],
  );

  // Compute preview text
  const previewText = useMemo(() => {
    if (!formState.pattern || formState.validationError) {
      return '';
    }
    return resolvePattern(formState.pattern, previewContext);
  }, [formState.pattern, formState.validationError, previewContext]);

  // Check if OK button should be disabled
  const isOkDisabled = !formState.pattern || !!formState.validationError;

  // Handle submit
  const handleSubmit = useCallback(() => {
    if (isOkDisabled) return;

    const output: EditFilingPatternFormOutput = {
      action: 'submit',
      data: {
        pattern: formState.pattern,
      },
    };

    setOutput(output);
    updateWebViewDefinition({ state: { output } });
  }, [formState.pattern, isOkDisabled, setOutput, updateWebViewDefinition]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    const output: EditFilingPatternFormOutput = {
      action: 'cancel',
    };

    setOutput(output);
    updateWebViewDefinition({ state: { output } });
  }, [setOutput, updateWebViewDefinition]);

  return (
    <div
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4"
      data-testid="edit-filing-pattern-form"
    >
      {/* Form Content */}
      <div className="tw-flex tw-flex-col tw-gap-4 tw-flex-1">
        {/* Pattern Input Field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="pattern">
            {getLocalizedString(
              localizedStrings,
              '%webView_editFilingPattern_field_pattern%',
              'Pattern Format:',
            )}
            <span aria-hidden="true" className="tw-text-destructive">
              {' '}
              *
            </span>
            <span className="tw-sr-only"> (required)</span>
          </Label>
          <Input
            ref={inputRef}
            id="pattern"
            value={formState.pattern}
            onChange={handlePatternChange}
            className={formState.validationError ? 'tw-border-destructive' : ''}
            aria-invalid={!!formState.validationError}
            aria-describedby={formState.validationError ? 'pattern-error' : undefined}
            aria-label={getLocalizedString(
              localizedStrings,
              '%webView_editFilingPattern_ariaLabel_patternInput%',
              'Pattern input',
            )}
          />
          {formState.validationError && (
            <Label id="pattern-error" className="tw-text-sm tw-text-destructive" role="alert">
              {formState.validationError}
            </Label>
          )}
        </div>

        {/* Preview Display */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label>
            {getLocalizedString(
              localizedStrings,
              '%webView_editFilingPattern_field_preview%',
              'Preview:',
            )}
          </Label>
          <div
            className="tw-p-2 tw-bg-muted tw-rounded tw-font-mono tw-text-sm"
            aria-live="polite"
            aria-atomic="true"
          >
            {previewText || '\u00A0'}
          </div>
        </div>

        {/* Legend */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label className="tw-font-semibold">
            {getLocalizedString(
              localizedStrings,
              '%webView_editFilingPattern_legend_title%',
              'Placeholders:',
            )}
          </Label>
          <div className="tw-text-sm tw-text-muted-foreground tw-space-y-0.5">
            <div>
              {getLocalizedString(
                localizedStrings,
                '%webView_editFilingPattern_legend_bbb%',
                '{BBB} = Book ID (e.g., MAT, GEN)',
              )}
            </div>
            <div>
              {getLocalizedString(
                localizedStrings,
                '%webView_editFilingPattern_legend_nn%',
                '{nn} = Book number (01-66)',
              )}
            </div>
            <div>
              {getLocalizedString(
                localizedStrings,
                '%webView_editFilingPattern_legend_project%',
                '{project} = Project short name',
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-mt-4 tw-pt-4 tw-border-t tw-border-border">
        <Button type="button" variant="outline" onClick={handleCancel}>
          {getLocalizedString(
            localizedStrings,
            '%webView_projectProperties_button_cancel%',
            'Cancel',
          )}
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={isOkDisabled}>
          {getLocalizedString(localizedStrings, '%webView_projectProperties_button_ok%', 'OK')}
        </Button>
      </div>
    </div>
  );
};

// #endregion
