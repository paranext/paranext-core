import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Button, Input, Label, Textarea, cn } from 'platform-bible-react';

/**
 * === NEW IN PT10 === Reason: React component for project name editing dialog Maps to: UI-PKG-002,
 * BHV-601, BHV-306, BHV-307, VAL-001
 */

/** Props passed to the web view via state */
interface ProjectNameFormInput {
  initialValues: {
    fullName: string;
    shortName: string;
    copyright: string;
  };
  config: {
    allowShortNameEdit: boolean;
    allowFullNameEdit: boolean;
    allowCopyrightEdit: boolean;
    showRegistryMessage: boolean;
  };
  existingProjectNames: string[];
}

/** Output returned from the dialog */
interface ProjectNameFormOutput {
  action: 'submit' | 'cancel';
  data?: {
    fullName: string;
    shortName: string;
    copyright: string;
  };
}

/** Localization keys for this dialog */
const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%webView_projectName_title%',
  '%webView_projectName_field_fullName_label%',
  '%webView_projectName_field_shortName_label%',
  '%webView_projectName_field_copyright_label%',
  '%webView_projectName_registryMessage%',
  '%webView_projectName_button_ok%',
  '%webView_projectName_button_cancel%',
  '%webView_projectName_error_fullName_required%',
  '%webView_projectName_error_shortName_tooShort%',
  '%webView_projectName_error_shortName_tooLong%',
  '%webView_projectName_error_shortName_invalidChars%',
  '%webView_projectName_error_shortName_noSpaces%',
  '%webView_projectName_error_shortName_exists%',
];

/**
 * Generate short name abbreviation from full name
 *
 * === PORTED FROM PT9 === Source: PT9/Paratext/ToolsMenu/ProjectNameForm.cs:80-126 Method:
 * FormTextNameAbbrev()
 *
 * Maps to: BHV-601, EXT-005
 *
 * Algorithm:
 *
 * 1. Extract first valid character from each "word" (space/hyphen/underscore delimited)
 * 2. Extract all digits from input
 * 3. Combine: letters + last 2 digits
 * 4. If length < 3: pad with chars from end of last word
 * 5. If length > 8: truncate to 8
 *
 * @param fullName - The full project name
 * @returns Auto-generated short name (max 8 characters)
 */
function generateAbbreviation(fullName: string): string {
  if (!fullName || fullName.trim().length === 0) {
    return '';
  }

  // Split into words by spaces, hyphens, or underscores (word delimiters only)
  const words = fullName.split(/[\s\-_]+/).filter((w) => w.length > 0);
  if (words.length === 0) {
    return '';
  }

  // Track collected first letters and all digits
  const firstLetters: string[] = [];
  const digits: string[] = [];

  // Track valid chars from the last word for padding (need chars from END of word)
  let lastWordValidChars: string[] = [];

  words.forEach((word) => {
    let foundFirstChar = false;
    const wordValidChars: string[] = [];

    word.split('').forEach((char) => {
      // Skip punctuation like apostrophe, parentheses, etc.
      // Only consider letters and digits
      if (/[A-Za-z]/.test(char)) {
        wordValidChars.push(char);
        if (!foundFirstChar) {
          firstLetters.push(char);
          foundFirstChar = true;
        }
      } else if (/[0-9]/.test(char)) {
        if (!foundFirstChar) {
          firstLetters.push(char);
          foundFirstChar = true;
        }
        digits.push(char);
      }
      // Other chars (punctuation) are skipped but don't end the word
    });

    if (wordValidChars.length > 0) {
      lastWordValidChars = wordValidChars;
    }
  });

  // Take last 2 digits (if any)
  const digitSuffix = digits.slice(-2).join('');

  // Combine first letters and digit suffix
  let result = firstLetters.join('') + digitSuffix;

  // Pad to minimum 3 characters using chars from END of last word
  // We need chars from the end of the word, but already used index 0 for first letter
  const charsNeeded = 3 - result.length;
  if (charsNeeded > 0 && lastWordValidChars.length > 0) {
    // Get the last N chars from the word (excluding index 0 which is first letter)
    // E.g., "Monkey" -> lastWordValidChars = ['M','o','n','k','e','y']
    // We need last 2 chars for padding: 'k','y'
    const availableForPadding = lastWordValidChars.slice(1); // Remove first letter
    const startIdx = Math.max(0, availableForPadding.length - charsNeeded);
    const padChars = availableForPadding.slice(startIdx);

    // Add padding chars in lowercase
    padChars.forEach((c) => {
      result += c.toLowerCase();
    });

    // If we still need more, repeat the last char
    while (result.length < 3 && lastWordValidChars.length > 0) {
      result += lastWordValidChars[lastWordValidChars.length - 1].toLowerCase();
    }
  }

  // Truncate to maximum 8 characters
  if (result.length > 8) {
    result = result.substring(0, 8);
  }

  return result;
}

/**
 * Validate short name according to VAL-001 rules
 *
 * === PORTED FROM PT9 === Source: PT9/ParatextBase/ParatextUtils.cs Maps to: VAL-001
 *
 * Rules:
 *
 * - VAL-001.1: Required (non-empty)
 * - VAL-001.2: Min length 3
 * - VAL-001.3: Max length 8
 * - VAL-001.4: Character set [A-Za-z0-9_]
 * - VAL-001.5: No spaces
 * - VAL-001.6: Unique (case-insensitive)
 */
function validateShortName(
  shortName: string,
  existingNames: string[],
  localizedStrings: LanguageStrings,
): string | undefined {
  // VAL-001.1: Required
  if (!shortName || shortName.trim().length === 0) {
    return (
      localizedStrings['%webView_projectName_error_shortName_tooShort%'] || 'Short name is required'
    );
  }

  // VAL-001.5: No spaces
  if (/\s/.test(shortName)) {
    return (
      localizedStrings['%webView_projectName_error_shortName_noSpaces%'] ||
      'Short name must not contain spaces'
    );
  }

  // VAL-001.2 & VAL-001.3: Length 3-8
  if (shortName.length < 3 || shortName.length > 8) {
    return shortName.length < 3
      ? localizedStrings['%webView_projectName_error_shortName_tooShort%'] ||
          'Short name must be at least 3 characters'
      : localizedStrings['%webView_projectName_error_shortName_tooLong%'] ||
          'Short name must not exceed 8 characters';
  }

  // VAL-001.4: Valid characters only
  if (!/^[A-Za-z0-9_]+$/.test(shortName)) {
    return (
      localizedStrings['%webView_projectName_error_shortName_invalidChars%'] ||
      'Short name can only contain letters A-Z, digits 0-9, and underscores'
    );
  }

  // VAL-001.6: Unique (case-insensitive)
  const upperName = shortName.toUpperCase();
  if (existingNames.some((name) => name.toUpperCase() === upperName)) {
    return (
      localizedStrings['%webView_projectName_error_shortName_exists%'] ||
      'A project with this name already exists'
    );
  }

  return undefined;
}

/**
 * ProjectNameWebView - Focused dialog for editing project name fields
 *
 * === NEW IN PT10 === Reason: React component pattern for Platform.Bible Maps to: UI-PKG-002
 *
 * Key features:
 *
 * - Auto-generation of short name from full name (BHV-601)
 * - Backslash to forward slash replacement (BHV-306)
 * - User typing in short name disables auto-generation (BHV-307)
 * - Real-time validation (VAL-001)
 */
globalThis.webViewComponent = function ProjectNameWebView({
  useWebViewState,
  updateWebViewDefinition,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  // Get initial values from web view state
  const [inputData] = useWebViewState<ProjectNameFormInput | undefined>('inputData', undefined);

  // Form state
  const [fullName, setFullName] = useState(inputData?.initialValues?.fullName ?? '');
  const [shortName, setShortName] = useState(inputData?.initialValues?.shortName ?? '');
  const [copyright, setCopyright] = useState(inputData?.initialValues?.copyright ?? '');

  // UI state
  const [userTypedShortName, setUserTypedShortName] = useState(false);
  const [fullNameError, setFullNameError] = useState<string | undefined>(undefined);
  const [shortNameError, setShortNameError] = useState<string | undefined>(undefined);
  const [isDirty, setIsDirty] = useState(false);

  // Config from input
  const config = inputData?.config ?? {
    allowShortNameEdit: true,
    allowFullNameEdit: true,
    allowCopyrightEdit: true,
    showRegistryMessage: false,
  };

  // Memoize existingProjectNames to avoid triggering useCallback dependencies on every render
  const existingProjectNames = useMemo(
    () => inputData?.existingProjectNames ?? [],
    [inputData?.existingProjectNames],
  );

  // Initialize from input data when it becomes available
  useEffect(() => {
    if (inputData?.initialValues) {
      setFullName(inputData.initialValues.fullName);
      setShortName(inputData.initialValues.shortName);
      setCopyright(inputData.initialValues.copyright);
      setUserTypedShortName(!!inputData.initialValues.shortName);
    }
  }, [inputData]);

  /**
   * Handle full name change - Replace backslash with forward slash (BHV-306), Auto-generate short
   * name if user hasn't typed (BHV-601)
   */
  const handleFullNameChange = useCallback(
    (value: string) => {
      // BHV-306: Replace backslash with forward slash
      const sanitized = value.replace(/\\/g, '/');
      setFullName(sanitized);
      setIsDirty(true);

      // Clear full name error
      setFullNameError(undefined);

      // BHV-601: Auto-generate short name if user hasn't typed in it
      if (!userTypedShortName) {
        const generated = generateAbbreviation(sanitized);
        setShortName(generated);

        // Validate the generated short name
        const error = validateShortName(generated, existingProjectNames, localizedStrings);
        setShortNameError(error);
      }
    },
    [userTypedShortName, existingProjectNames, localizedStrings],
  );

  /** Handle short name keypress - Set userTypedShortName flag to disable auto-generation (BHV-307) */
  const handleShortNameKeyPress = useCallback(() => {
    // BHV-307: User typing in short name disables auto-generation
    setUserTypedShortName(true);
  }, []);

  /** Handle short name change - Validate the short name (VAL-001) */
  const handleShortNameChange = useCallback(
    (value: string) => {
      setShortName(value);
      setIsDirty(true);

      // Validate the short name
      const error = validateShortName(value, existingProjectNames, localizedStrings);
      setShortNameError(error);
    },
    [existingProjectNames, localizedStrings],
  );

  /** Handle copyright change */
  const handleCopyrightChange = useCallback((value: string) => {
    setCopyright(value);
    setIsDirty(true);
  }, []);

  /** Validate full name */
  const validateFullName = useCallback((): boolean => {
    if (!fullName || fullName.trim().length === 0) {
      setFullNameError(
        localizedStrings['%webView_projectName_error_fullName_required%'] ||
          'Full name is required',
      );
      return false;
    }
    setFullNameError(undefined);
    return true;
  }, [fullName, localizedStrings]);

  /** Check if form is valid */
  const isFormValid = useMemo(() => {
    // Full name is required
    if (!fullName || fullName.trim().length === 0) return false;

    // Short name must pass validation
    if (shortNameError) return false;

    // Short name is required
    if (!shortName || shortName.trim().length === 0) return false;

    return true;
  }, [fullName, shortName, shortNameError]);

  /** Handle submit */
  const handleSubmit = useCallback(() => {
    // Validate full name
    const fullNameValid = validateFullName();
    if (!fullNameValid) return;

    // Validate short name
    const error = validateShortName(shortName, existingProjectNames, localizedStrings);
    if (error) {
      setShortNameError(error);
      return;
    }

    // Build output
    const output: ProjectNameFormOutput = {
      action: 'submit',
      data: {
        fullName,
        shortName,
        copyright,
      },
    };

    // Update web view state with result and close
    // Note: In a real implementation, we would use a callback or event to communicate
    // the result back to the parent. For now, we store it in state.
    // The parent can listen for changes or we can use postMessage.
    updateWebViewDefinition({ state: { result: output } });
  }, [
    fullName,
    shortName,
    copyright,
    existingProjectNames,
    localizedStrings,
    validateFullName,
    updateWebViewDefinition,
  ]);

  /** Handle cancel */
  const handleCancel = useCallback(() => {
    const output: ProjectNameFormOutput = {
      action: 'cancel',
    };
    updateWebViewDefinition({ state: { result: output } });
  }, [updateWebViewDefinition]);

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4 tw-bg-background">
      <h1 className="tw-text-lg tw-font-semibold tw-mb-4 tw-text-foreground">
        {localizedStrings['%webView_projectName_title%'] || 'Project Identification'}
      </h1>

      <div className="tw-flex tw-flex-col tw-gap-4 tw-flex-1">
        {/* Full Name field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="fullName" className="tw-text-foreground">
            {localizedStrings['%webView_projectName_field_fullName_label%'] || 'Full Name'}
            <span className="tw-text-destructive" aria-hidden="true">
              {' '}
              *
            </span>
          </Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => handleFullNameChange(e.target.value)}
            onBlur={validateFullName}
            disabled={!config.allowFullNameEdit}
            className={cn('tw-w-full', fullNameError && 'tw-border-destructive')}
            aria-invalid={!!fullNameError}
            aria-describedby={fullNameError ? 'fullName-error' : undefined}
          />
          {fullNameError && (
            <Label id="fullName-error" className="tw-text-sm tw-text-destructive" role="alert">
              {fullNameError}
            </Label>
          )}
        </div>

        {/* Short Name field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="shortName" className="tw-text-foreground">
            {localizedStrings['%webView_projectName_field_shortName_label%'] || 'Short Name'}
            <span className="tw-text-destructive" aria-hidden="true">
              {' '}
              *
            </span>
          </Label>
          <Input
            id="shortName"
            value={shortName}
            onKeyDown={handleShortNameKeyPress}
            onChange={(e) => handleShortNameChange(e.target.value)}
            disabled={!config.allowShortNameEdit}
            maxLength={8}
            className={cn('tw-w-full tw-font-mono', shortNameError && 'tw-border-destructive')}
            aria-invalid={!!shortNameError}
            aria-describedby={shortNameError ? 'shortName-error' : undefined}
          />
          {shortNameError && (
            <Label id="shortName-error" className="tw-text-sm tw-text-destructive" role="alert">
              {shortNameError}
            </Label>
          )}
        </div>

        {/* Copyright field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="copyright" className="tw-text-foreground">
            {localizedStrings['%webView_projectName_field_copyright_label%'] || 'Copyright'}
          </Label>
          <Textarea
            id="copyright"
            value={copyright}
            onChange={(e) => handleCopyrightChange(e.target.value)}
            disabled={!config.allowCopyrightEdit}
            className="tw-w-full tw-min-h-[80px]"
            rows={3}
          />
        </div>

        {/* Registry change message (for restricted projects) */}
        {config.showRegistryMessage && (
          <div className="tw-p-3 tw-bg-muted tw-rounded-md tw-text-sm tw-text-muted-foreground">
            {localizedStrings['%webView_projectName_registryMessage%'] ||
              'Changes to this name may require updating the project registry.'}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-mt-4 tw-pt-4 tw-border-t tw-border-border">
        <Button variant="outline" onClick={handleCancel}>
          {localizedStrings['%webView_projectName_button_cancel%'] || 'Cancel'}
        </Button>
        <Button onClick={handleSubmit} disabled={!isFormValid || !isDirty}>
          {localizedStrings['%webView_projectName_button_ok%'] || 'OK'}
        </Button>
      </div>
    </div>
  );
};
