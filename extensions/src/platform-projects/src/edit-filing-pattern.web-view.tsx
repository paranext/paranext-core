/**
 * === NEW IN PT10 === Reason: React component pattern for Platform.Bible web views Maps to:
 * UI-PKG-005, SCR-005, BHV-514, VAL-006, VAL-014
 */
import type { PatternPreviewContext } from 'platform-projects';
import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// #region Localized String Keys

const EDIT_FILING_PATTERN_STRING_KEYS: LocalizeKey[] = [
  '%webView_editFilingPattern_title%',
  '%webView_editFilingPattern_pattern_label%',
  '%webView_editFilingPattern_pattern_placeholder%',
  '%webView_editFilingPattern_preview_label%',
  '%webView_editFilingPattern_legend_title%',
  '%webView_editFilingPattern_legend_bbb%',
  '%webView_editFilingPattern_legend_nn%',
  '%webView_editFilingPattern_legend_project%',
  '%webView_editFilingPattern_button_ok%',
  '%webView_editFilingPattern_button_cancel%',
  '%webView_editFilingPattern_error_required%',
  '%webView_editFilingPattern_error_noPtx%',
  '%webView_editFilingPattern_error_invalidChars%',
];

// #endregion

// #region Types

interface EditFilingPatternFormOutput {
  action: 'submit' | 'cancel';
  data?: {
    pattern: string;
  };
}

// #endregion

// #region Pattern Resolution

/**
 * Characters not allowed in filename patterns Platform-specific (Windows is most restrictive)
 *
 * EXPLANATION:
 *
 * - < > : " / \ | ? * are Windows reserved characters
 * - \x00-\x1F are control characters (ASCII 0-31)
 * - Placeholders {BBB}, {nn}, {project} are removed before validation since they will be replaced
 *   with valid characters at runtime
 *
 * Maps to: VAL-014.3
 */
// eslint-disable-next-line no-control-regex
const INVALID_FILENAME_CHARS = /[<>:"/\\|?*\x00-\x1F]/;

/**
 * Resolve pattern to actual filename for preview
 *
 * EXPLANATION: PT9 Source: ProjectSettings.GetBookFileName and related
 *
 * - {BBB} is replaced with the 3-letter book ID (e.g., "MAT")
 * - {nn} is replaced with the 2-digit zero-padded book number (e.g., "41")
 * - {project} is replaced with the project short name
 *
 * @param pattern - The pattern with placeholders
 * @param context - Values for placeholder substitution
 * @returns Resolved filename
 *
 *   Maps to: BHV-514
 */
function resolvePattern(pattern: string, context: PatternPreviewContext): string {
  return pattern
    .replace(/\{BBB\}/g, context.sampleBookId)
    .replace(/\{nn\}/g, context.sampleBookNumber.toString().padStart(2, '0'))
    .replace(/\{project\}/g, context.projectShortName);
}

/**
 * Check if pattern contains invalid filename characters
 *
 * EXPLANATION: Removes placeholder markers before checking since placeholders will be replaced with
 * valid characters at runtime.
 *
 * @param pattern - The pattern to validate
 * @returns True if pattern contains invalid characters
 *
 *   Maps to: VAL-014.3
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

/**
 * Edit Filing Pattern Form Web View
 *
 * Dialog for customizing the book file naming pattern with live preview. Shows how the pattern
 * resolves to actual filenames using placeholder substitution ({BBB}, {nn}, {project}).
 *
 * EXPLANATION:
 *
 * - Pattern input allows users to define the file naming convention
 * - Live preview updates as user types, showing resolved filename
 * - Validation ensures valid filename characters and no .ptx extension
 * - OK button disabled until pattern is valid (VAL-014)
 * - Returns pattern to parent on submit
 *
 * Maps to: UI-PKG-005, SCR-005, BHV-514, VAL-006, VAL-014
 */
globalThis.webViewComponent = function EditFilingPatternWebView({ useWebViewState }: WebViewProps) {
  // #region Localization

  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => EDIT_FILING_PATTERN_STRING_KEYS, []),
  );

  const titleText = localizedStrings['%webView_editFilingPattern_title%'];
  const patternLabelText = localizedStrings['%webView_editFilingPattern_pattern_label%'];
  const patternPlaceholderText =
    localizedStrings['%webView_editFilingPattern_pattern_placeholder%'];
  const previewLabelText = localizedStrings['%webView_editFilingPattern_preview_label%'];
  const legendTitleText = localizedStrings['%webView_editFilingPattern_legend_title%'];
  const legendBbbText = localizedStrings['%webView_editFilingPattern_legend_bbb%'];
  const legendNnText = localizedStrings['%webView_editFilingPattern_legend_nn%'];
  const legendProjectText = localizedStrings['%webView_editFilingPattern_legend_project%'];
  const okButtonText = localizedStrings['%webView_editFilingPattern_button_ok%'];
  const cancelButtonText = localizedStrings['%webView_editFilingPattern_button_cancel%'];
  const errorRequiredText = localizedStrings['%webView_editFilingPattern_error_required%'];
  const errorNoPtxText = localizedStrings['%webView_editFilingPattern_error_noPtx%'];
  const errorInvalidCharsText = localizedStrings['%webView_editFilingPattern_error_invalidChars%'];

  // #endregion

  // #region State

  // Get initial state from web view provider
  const [initialPattern] = useWebViewState<string>('initialPattern', '{nn}{BBB}{project}.SFM');
  const [previewContext] = useWebViewState<PatternPreviewContext>('previewContext', {
    projectShortName: 'PROJECT',
    sampleBookId: 'MAT',
    sampleBookNumber: 41,
  });

  // Form state
  const [pattern, setPattern] = useState<string>(initialPattern);

  // Output state for parent to read
  const [, setOutput] = useWebViewState<EditFilingPatternFormOutput | undefined>(
    'output',
    undefined,
  );

  // Initialize form with initial values when they change
  useEffect(() => {
    setPattern(initialPattern);
  }, [initialPattern]);

  // #endregion

  // #region Validation

  /**
   * Validate the pattern and return error message if invalid
   *
   * Maps to: VAL-014
   */
  const validationError = useMemo((): string | undefined => {
    // VAL-014.1: Required
    if (!pattern || pattern.trim().length === 0) {
      return errorRequiredText;
    }

    // VAL-014.2: No .ptx extension
    if (pattern.toLowerCase().endsWith('.ptx')) {
      return errorNoPtxText;
    }

    // VAL-014.3: Valid filename characters
    if (containsInvalidFilenameChars(pattern)) {
      return errorInvalidCharsText;
    }

    return undefined;
  }, [pattern, errorRequiredText, errorNoPtxText, errorInvalidCharsText]);

  // #endregion

  // #region Computed State

  // Compute preview text from pattern
  const previewText = useMemo(() => {
    if (!pattern || validationError) {
      return '';
    }
    return resolvePattern(pattern, previewContext);
  }, [pattern, previewContext, validationError]);

  // OK button is disabled if pattern is invalid
  const isOkDisabled = !!validationError;

  // #endregion

  // #region Handlers

  const handlePatternChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPattern(e.target.value);
  }, []);

  const handleOk = useCallback(() => {
    if (validationError) return;
    setOutput({
      action: 'submit',
      data: {
        pattern,
      },
    });
  }, [pattern, validationError, setOutput]);

  const handleCancel = useCallback(() => {
    setOutput({
      action: 'cancel',
    });
  }, [setOutput]);

  // #endregion

  // #region Render

  return (
    <div className="pr-twp tw-flex tw-h-full tw-flex-col">
      <Card className="tw-flex tw-h-full tw-flex-col tw-rounded-none tw-border-0">
        <CardHeader className="tw-flex-shrink-0 tw-pb-4">
          <CardTitle className="tw-text-lg">{titleText}</CardTitle>
        </CardHeader>

        <CardContent className="tw-flex tw-flex-grow tw-flex-col tw-gap-4 tw-px-6">
          {/* Pattern Input */}
          <div className="tw-flex tw-flex-col tw-gap-2">
            <Label htmlFor="pattern-input">{patternLabelText}</Label>
            <Input
              id="pattern-input"
              value={pattern}
              onChange={handlePatternChange}
              placeholder={patternPlaceholderText}
              aria-invalid={!!validationError}
              aria-describedby={validationError ? 'pattern-error' : undefined}
              autoFocus
            />
            {validationError && (
              <Label id="pattern-error" className="tw-text-sm tw-text-destructive" role="alert">
                {validationError}
              </Label>
            )}
          </div>

          {/* Preview */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label className="tw-font-medium">{previewLabelText}</Label>
            <div className="tw-rounded tw-border tw-border-border tw-bg-muted tw-px-3 tw-py-2 tw-font-mono tw-text-sm">
              {previewText || '\u00A0'}
            </div>
          </div>

          {/* Legend */}
          <div className="tw-flex tw-flex-col tw-gap-2 tw-rounded tw-border tw-border-border tw-bg-muted/50 tw-p-3">
            <Label className="tw-text-sm tw-font-medium">{legendTitleText}</Label>
            <div className="tw-flex tw-flex-col tw-gap-1 tw-text-sm tw-text-muted-foreground">
              <span>
                <code className="tw-rounded tw-bg-muted tw-px-1">{'{BBB}'}</code> {legendBbbText}
              </span>
              <span>
                <code className="tw-rounded tw-bg-muted tw-px-1">{'{nn}'}</code> {legendNnText}
              </span>
              <span>
                <code className="tw-rounded tw-bg-muted tw-px-1">{'{project}'}</code>{' '}
                {legendProjectText}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="tw-flex tw-flex-shrink-0 tw-justify-end tw-gap-2 tw-border-t tw-p-4">
          <Button variant="outline" onClick={handleCancel}>
            {cancelButtonText}
          </Button>
          <Button onClick={handleOk} disabled={isOkDisabled}>
            {okButtonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  // #endregion
};
