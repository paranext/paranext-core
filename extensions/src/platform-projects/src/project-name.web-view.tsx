import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Input, Label, Textarea } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';

// ============================================================================
// Localized string keys
// ============================================================================

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  // Title
  '%platformProjects_projectName_title%',
  // Labels
  '%platformProjects_label_fullName%',
  '%platformProjects_label_shortName%',
  '%platformProjects_label_copyright%',
  // Buttons
  '%platformProjects_button_ok%',
  '%platformProjects_button_cancel%',
  // Validation messages
  '%platformProjects_validation_fullNameRequired%',
  '%platformProjects_validation_shortNameRequired%',
  '%platformProjects_validation_shortNameLength%',
  '%platformProjects_validation_shortNameChars%',
  '%platformProjects_validation_shortNameNoSpaces%',
  '%platformProjects_validation_shortNameDuplicate%',
];

// ============================================================================
// Short Name Auto-Generation Algorithm (BHV-601, EXT-005)
// ============================================================================

/**
 * Generate short name from full name (FormTextNameAbbrev algorithm) PT9 Source:
 * ProjectNameForm.cs:80-126
 *
 * @param fullName - The full project name
 * @returns Auto-generated short name (max 8 characters)
 */
function generateShortName(fullName: string): string {
  // 1. Replace backslashes with forward slashes (BHV-306)
  const normalized = fullName.replace(/\\/g, '/');

  // 2. Split into words (by spaces, hyphens, underscores)
  const words = normalized.split(/[\s\-_]+/).filter(Boolean);

  if (words.length === 0) {
    return '';
  }

  if (words.length === 1) {
    // Single word: take first 8 characters, uppercase
    return words[0].substring(0, 8).toUpperCase();
  }

  // Multiple words: take first letter of each word
  let result = '';
  for (const word of words) {
    if (result.length >= 8) break;

    // Take first character (letter or digit)
    const firstChar = word[0];
    if (/[A-Za-z0-9]/.test(firstChar)) {
      result += firstChar.toUpperCase();
    }
  }

  // 3. Ensure minimum 3 characters by padding from first word
  if (result.length < 3 && words.length > 0) {
    const firstWord = words[0].toUpperCase();
    result = firstWord.substring(0, Math.max(3, result.length));
  }

  // 4. Ensure only valid characters
  result = result.replace(/[^A-Za-z0-9_]/g, '');

  // 5. Ensure max 8 characters
  return result.substring(0, 8);
}

// ============================================================================
// Validation
// ============================================================================

/** Valid character pattern for project short name */
const SHORT_NAME_PATTERN = /^[A-Za-z0-9_]*$/;

/** Get a localized string value or return fallback */
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
 * Validate the short name field on-change
 *
 * @param shortName - Current short name value
 * @param localizedStrings - Localized strings for error messages
 * @returns Error message string or undefined if valid
 */
function validateShortName(
  shortName: string,
  localizedStrings: LanguageStrings,
): string | undefined {
  const lv = (key: LocalizeKey, fallback: string) =>
    getLocalizedValue(localizedStrings, key, fallback);

  if (shortName.length === 0) {
    return undefined; // Don't show required error on-change, only on-submit
  }

  // VAL-001.5: No spaces
  if (/\s/.test(shortName)) {
    return lv(
      '%platformProjects_validation_shortNameNoSpaces%',
      'Short name must not contain spaces',
    );
  }

  // VAL-001.4: Character set
  if (!SHORT_NAME_PATTERN.test(shortName)) {
    return lv(
      '%platformProjects_validation_shortNameChars%',
      'Short name can only contain letters A-Z, digits 0-9, and underscores.',
    );
  }

  // VAL-001.2/001.3: Length check
  if (shortName.length < 3 || shortName.length > 8) {
    return lv(
      '%platformProjects_validation_shortNameLength%',
      'Short name must not be less than 3 or more than 8 characters in length',
    );
  }

  return undefined;
}

/**
 * Validate the full name field on-blur
 *
 * @param fullName - Current full name value
 * @param localizedStrings - Localized strings for error messages
 * @returns Error message string or undefined if valid
 */
function validateFullName(fullName: string, localizedStrings: LanguageStrings): string | undefined {
  if (!fullName || fullName.trim().length === 0) {
    return getLocalizedValue(
      localizedStrings,
      '%platformProjects_validation_fullNameRequired%',
      'You must enter a full name',
    );
  }
  return undefined;
}

// ============================================================================
// Main Component
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
global.webViewComponent = function ProjectNameWebView(_webViewProps: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  // Form state
  const [fullName, setFullName] = useState('');
  const [shortName, setShortName] = useState('');
  const [copyright, setCopyright] = useState('');

  // UI state
  const [userTypedShortName, setUserTypedShortName] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Helper for localized strings
  const l = useCallback(
    (key: LocalizeKey, fallback: string): string =>
      getLocalizedValue(localizedStrings, key, fallback),
    [localizedStrings],
  );

  // BHV-306: Replace backslash with forward slash, then auto-generate short name
  const handleFullNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // BHV-306: Replace backslash with forward slash
      const sanitized = e.target.value.replace(/\\/g, '/');
      setFullName(sanitized);

      // Clear full name validation error on change
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next.fullName;
        return next;
      });

      // BHV-601, BHV-305: Auto-generate short name if user hasn't typed in it
      if (!userTypedShortName) {
        const generated = generateShortName(sanitized);
        setShortName(generated);

        // Run validation on auto-generated short name
        if (generated.length > 0) {
          const error = validateShortName(generated, localizedStrings);
          setValidationErrors((prev) => {
            const next = { ...prev };
            if (error) {
              next.shortName = error;
            } else {
              delete next.shortName;
            }
            return next;
          });
        } else {
          setValidationErrors((prev) => {
            const next = { ...prev };
            delete next.shortName;
            return next;
          });
        }
      }
    },
    [userTypedShortName, localizedStrings],
  );

  // BHV-307: Track manual short name editing
  const handleShortNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setUserTypedShortName(true);
      setShortName(value);

      // VAL-001: Validate on-change
      const error = validateShortName(value, localizedStrings);
      setValidationErrors((prev) => {
        const next = { ...prev };
        if (error) {
          next.shortName = error;
        } else {
          delete next.shortName;
        }
        return next;
      });
    },
    [localizedStrings],
  );

  // Full name blur validation (VAL-002.1)
  const handleFullNameBlur = useCallback(() => {
    const error = validateFullName(fullName, localizedStrings);
    setValidationErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next.fullName = error;
      } else {
        delete next.fullName;
      }
      return next;
    });
  }, [fullName, localizedStrings]);

  const handleCopyrightChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCopyright(e.target.value);
  }, []);

  // Submit handler
  const handleSubmit = useCallback(() => {
    const errors: Record<string, string> = {};

    // VAL-002.1: Full name required
    const fullNameError = validateFullName(fullName, localizedStrings);
    if (fullNameError) {
      errors.fullName = fullNameError;
    }

    // VAL-001.1: Short name required
    if (!shortName || shortName.trim().length === 0) {
      errors.shortName = getLocalizedValue(
        localizedStrings,
        '%platformProjects_validation_shortNameRequired%',
        'Short name is required',
      );
    } else {
      // Run remaining short name validations
      const shortNameError = validateShortName(shortName, localizedStrings);
      if (shortNameError) {
        errors.shortName = shortNameError;
      }
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Return form data - in production this would use PAPI or web view state
    // For now, the form data is available in the component state
  }, [fullName, shortName, localizedStrings]);

  const handleCancel = useCallback(() => {
    // In production: close the dialog via PAPI
  }, []);

  return (
    <div className="pr-twp">
      <div className="tw-flex tw-flex-col tw-h-full tw-gap-4 tw-p-4">
        {/* Title */}
        <h2 className="tw-text-xl tw-font-semibold">
          {l('%platformProjects_projectName_title%', 'Project Identification')}
        </h2>

        {/* Full Name */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="fullName">{l('%platformProjects_label_fullName%', 'Full Name:')}</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={handleFullNameChange}
            onBlur={handleFullNameBlur}
            aria-label={l('%platformProjects_label_fullName%', 'Full Name')}
            aria-invalid={!!validationErrors.fullName}
          />
          {validationErrors.fullName && (
            <span className="tw-text-sm tw-text-destructive" role="alert">
              {validationErrors.fullName}
            </span>
          )}
        </div>

        {/* Short Name */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="shortName">
            {l('%platformProjects_label_shortName%', 'Short Name:')}
          </Label>
          <Input
            id="shortName"
            value={shortName}
            onChange={handleShortNameChange}
            aria-label={l('%platformProjects_label_shortName%', 'Short Name')}
            aria-invalid={!!validationErrors.shortName}
          />
          {validationErrors.shortName && (
            <span className="tw-text-sm tw-text-destructive" role="alert">
              {validationErrors.shortName}
            </span>
          )}
        </div>

        {/* Copyright */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="copyright">{l('%platformProjects_label_copyright%', 'Copyright:')}</Label>
          <Textarea
            id="copyright"
            value={copyright}
            onChange={handleCopyrightChange}
            rows={3}
            aria-label={l('%platformProjects_label_copyright%', 'Copyright')}
          />
        </div>

        {/* Action Buttons */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t tw-mt-auto">
          <Button type="button" variant="outline" onClick={handleCancel}>
            {l('%platformProjects_button_cancel%', 'Cancel')}
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {l('%platformProjects_button_ok%', 'OK')}
          </Button>
        </div>
      </div>
    </div>
  );
};
