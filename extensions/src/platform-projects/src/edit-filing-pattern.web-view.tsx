import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Input, Label } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';

// ============================================================================
// Constants
// ============================================================================

/** Characters not allowed in filename patterns (Windows is most restrictive) */
const INVALID_FILENAME_CHARS = /[<>:"/\\|?*\x00-\x1F]/;

/** Default pattern for book file naming */
const DEFAULT_PATTERN = '{nn}{BBB}{project}.SFM';

/** Sample context for preview generation (Phase 3 - hardcoded) */
const PREVIEW_CONTEXT = {
  projectShortName: 'TEST',
  bookId: 'MAT',
  bookNumber: 41,
};

// ============================================================================
// Localized string keys
// ============================================================================

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%platformProjects_editFilingPattern_title%',
  '%platformProjects_editFilingPattern_patternLabel%',
  '%platformProjects_editFilingPattern_previewLabel%',
  '%platformProjects_editFilingPattern_legendTitle%',
  '%platformProjects_editFilingPattern_legendBBB%',
  '%platformProjects_editFilingPattern_legendNn%',
  '%platformProjects_editFilingPattern_legendProject%',
  '%platformProjects_editFilingPattern_errorRequired%',
  '%platformProjects_editFilingPattern_errorNoPtx%',
  '%platformProjects_editFilingPattern_errorInvalidChars%',
  '%platformProjects_button_ok%',
  '%platformProjects_button_cancel%',
];

// ============================================================================
// Helper functions
// ============================================================================

function getLocalizedValue(
  localizedStrings: LanguageStrings,
  key: LocalizeKey,
  fallback: string,
): string {
  const value = localizedStrings[key];
  if (typeof value === 'string') return value;
  return fallback;
}

/**
 * Check if a pattern contains invalid filename characters after removing placeholders. Placeholders
 * ({BBB}, {nn}, {project}) are stripped before validation.
 */
function containsInvalidFilenameChars(pattern: string): boolean {
  const withoutPlaceholders = pattern
    .replace(/\{BBB\}/g, '')
    .replace(/\{nn\}/g, '')
    .replace(/\{project\}/g, '');

  return INVALID_FILENAME_CHARS.test(withoutPlaceholders);
}

/**
 * Resolve pattern to actual filename for preview. PT9 Source: ProjectSettings.GetBookFileName and
 * related.
 */
function resolvePattern(
  pattern: string,
  context: { projectShortName: string; bookId: string; bookNumber: number },
): string {
  return pattern
    .replace(/\{BBB\}/g, context.bookId)
    .replace(/\{nn\}/g, context.bookNumber.toString().padStart(2, '0'))
    .replace(/\{project\}/g, context.projectShortName);
}

/** Validate the pattern and return an error message or undefined if valid. */
function validatePattern(
  pattern: string,
  l: (key: LocalizeKey, fallback: string) => string,
): string | undefined {
  // VAL-014.1: required
  if (!pattern || pattern.trim().length === 0) {
    return l('%platformProjects_editFilingPattern_errorRequired%', 'Pattern is required');
  }

  // VAL-014.2: no .ptx
  if (pattern.toLowerCase().endsWith('.ptx')) {
    return l(
      '%platformProjects_editFilingPattern_errorNoPtx%',
      'Pattern cannot end with .ptx extension',
    );
  }

  // VAL-014.3: valid filename chars
  if (containsInvalidFilenameChars(pattern)) {
    return l(
      '%platformProjects_editFilingPattern_errorInvalidChars%',
      'Pattern contains invalid filename characters',
    );
  }

  return undefined;
}

// ============================================================================
// Main Component
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
global.webViewComponent = function EditFilingPatternWebView(_webViewProps: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  const l = useCallback(
    (key: LocalizeKey, fallback: string): string =>
      getLocalizedValue(localizedStrings, key, fallback),
    [localizedStrings],
  );

  // Form state
  const [pattern, setPattern] = useState<string>(DEFAULT_PATTERN);

  // Validation
  const validationError = useMemo(() => validatePattern(pattern, l), [pattern, l]);
  const isValid = validationError === undefined;

  // Preview text (only computed when valid)
  const previewText = useMemo(() => {
    if (!isValid) return '';
    return resolvePattern(pattern, PREVIEW_CONTEXT);
  }, [pattern, isValid]);

  // Handlers
  const handlePatternChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPattern(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    // In production: return { action: 'submit', data: { pattern } }
    // For Phase 3, this is a no-op placeholder
  }, []);

  const handleCancel = useCallback(() => {
    // In production: return { action: 'cancel' }
  }, []);

  return (
    <div className="pr-twp">
      <div className="tw-flex tw-flex-col tw-h-full tw-gap-4 tw-p-4">
        {/* Pattern Input */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="pattern-input">
            {l('%platformProjects_editFilingPattern_patternLabel%', 'Pattern Format:')}
          </Label>
          <Input
            id="pattern-input"
            value={pattern}
            onChange={handlePatternChange}
            aria-label={l('%platformProjects_editFilingPattern_patternLabel%', 'Pattern Format')}
            aria-invalid={!isValid}
            aria-describedby={!isValid ? 'pattern-error' : undefined}
          />
          {!isValid && validationError ? (
            <p id="pattern-error" className="tw-text-sm tw-text-red-600">
              {validationError}
            </p>
          ) : undefined}
        </div>

        {/* Preview */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label>{l('%platformProjects_editFilingPattern_previewLabel%', 'Preview:')}</Label>
          <p className="tw-text-sm tw-font-mono tw-bg-muted tw-p-2 tw-rounded" aria-live="polite">
            {isValid ? previewText : '\u2014'}
          </p>
        </div>

        {/* Legend */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label>{l('%platformProjects_editFilingPattern_legendTitle%', 'Placeholders:')}</Label>
          <ul className="tw-text-sm tw-list-none tw-pl-0 tw-space-y-0.5">
            <li>
              <span className="tw-font-mono">{'{BBB}'}</span>
              {' = '}
              {l('%platformProjects_editFilingPattern_legendBBB%', 'Book ID (e.g., MAT, GEN)')}
            </li>
            <li>
              <span className="tw-font-mono">{'{nn}'}</span>
              {' = '}
              {l('%platformProjects_editFilingPattern_legendNn%', 'Book number (01-66)')}
            </li>
            <li>
              <span className="tw-font-mono">{'{project}'}</span>
              {' = '}
              {l('%platformProjects_editFilingPattern_legendProject%', 'Project short name')}
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t tw-mt-auto">
          <Button type="button" variant="outline" onClick={handleCancel}>
            {l('%platformProjects_button_cancel%', 'Cancel')}
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={!isValid}>
            {l('%platformProjects_button_ok%', 'OK')}
          </Button>
        </div>
      </div>
    </div>
  );
};
