/**
 * === NEW IN PT10 === Reason: Web views don't exist in PT9's WinForms architecture. Maps to:
 * UI-PKG-002
 *
 * Project Name Form - Focused dialog for editing project identification fields. Implements BHV-601
 * (auto-generation), BHV-305 (trigger), BHV-306 (backslash), BHV-307 (manual override), VAL-001
 * (short name), VAL-002 (full name)
 */

import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Input, Label, Textarea } from 'platform-bible-react';
import { debounce, LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// #region Localized string keys

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectName_label_fullName%',
  '%projectName_label_shortName%',
  '%projectName_label_copyright%',
  '%projectName_message_registryChange%',
  '%projectName_error_fullNameRequired%',
  '%projectName_error_shortNameRequired%',
  '%projectName_error_shortNameLength%',
  '%projectName_error_shortNameCharacters%',
  '%projectName_error_shortNameSpaces%',
  '%projectName_error_shortNameExists%',
  '%general_ok%',
  '%general_cancel%',
];

// #endregion

// #region Types

interface ProjectNameFormConfig {
  allowShortNameEdit: boolean;
  allowFullNameEdit: boolean;
  allowCopyrightEdit: boolean;
  showRegistryMessage: boolean;
}

interface ProjectNameFormInitialValues {
  fullName: string;
  shortName: string;
  copyright: string;
}

interface ProjectNameFormOutput {
  action: 'submit' | 'cancel';
  data?: {
    fullName: string;
    shortName: string;
    copyright: string;
  };
}

interface ProjectNameFormState {
  fullName: string;
  shortName: string;
  copyright: string;
  userTypedShortName: boolean;
  validationErrors: Record<string, string>;
  isSubmitting: boolean;
}

// #endregion

// #region Validation functions

/** Valid characters for project short name (VAL-001.4) */
const SHORT_NAME_PATTERN = /^[A-Za-z0-9_]*$/;

/**
 * Generate short name from full name (BHV-601, FormTextNameAbbrev algorithm)
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

  // Multiple words: take first letter of each word using reduce
  let result = words.reduce((acc, word) => {
    if (acc.length >= 8) return acc;

    // Take first character (letter or digit)
    const firstChar = word[0];
    if (/[A-Za-z0-9]/.test(firstChar)) {
      return acc + firstChar.toUpperCase();
    }
    return acc;
  }, '');

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
 * Validate short name according to VAL-001 rules
 *
 * @param shortName - The short name to validate
 * @param existingNames - Existing project names for uniqueness check
 * @param localizedStrings - Localized error messages
 * @returns Error message or empty string if valid
 */
function validateShortName(
  shortName: string,
  existingNames: string[],
  localizedStrings: LanguageStrings,
): string {
  // VAL-001.2 & VAL-001.3: Length check (3-8 characters)
  if (shortName.length > 0 && (shortName.length < 3 || shortName.length > 8)) {
    return getLocalizedString(
      localizedStrings,
      '%projectName_error_shortNameLength%',
      'Short name must not be less than 3 or more than 8 characters in length',
    );
  }

  // VAL-001.5: No spaces
  if (/\s/.test(shortName)) {
    return getLocalizedString(
      localizedStrings,
      '%projectName_error_shortNameSpaces%',
      'Short name must not contain spaces',
    );
  }

  // VAL-001.4: Character set
  if (!SHORT_NAME_PATTERN.test(shortName)) {
    return getLocalizedString(
      localizedStrings,
      '%projectName_error_shortNameCharacters%',
      'Short name can only contain letters A-Z, digits 0-9, and underscores.',
    );
  }

  // VAL-001.6: Uniqueness
  if (existingNames.map((n) => n.toUpperCase()).includes(shortName.toUpperCase())) {
    return getLocalizedString(
      localizedStrings,
      '%projectName_error_shortNameExists%',
      'A project with this name already exists.',
    );
  }

  return '';
}

/**
 * Validate full name according to VAL-002 rules
 *
 * @param fullName - The full name to validate
 * @param localizedStrings - Localized error messages
 * @returns Error message or empty string if valid
 */
function validateFullName(fullName: string, localizedStrings: LanguageStrings): string {
  // VAL-002.1: Required
  if (!fullName || fullName.trim().length === 0) {
    return getLocalizedString(
      localizedStrings,
      '%projectName_error_fullNameRequired%',
      'You must enter a full name',
    );
  }

  return '';
}

// #endregion

// #region Component

globalThis.webViewComponent = function ProjectNameForm({
  useWebViewState,
  updateWebViewDefinition,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // Get state from web view
  const [initialValues] = useWebViewState<ProjectNameFormInitialValues>('initialValues', {
    fullName: '',
    shortName: '',
    copyright: '',
  });

  const [config] = useWebViewState<ProjectNameFormConfig>('config', {
    allowShortNameEdit: true,
    allowFullNameEdit: true,
    allowCopyrightEdit: true,
    showRegistryMessage: false,
  });

  const [existingProjectNames] = useWebViewState<string[]>('existingProjectNames', []);

  // Track whether output has been set (to handle submit/cancel)
  const [, setOutput] = useWebViewState<ProjectNameFormOutput | undefined>('output', undefined);

  // Form state
  const [formState, setFormState] = useState<ProjectNameFormState>(() => ({
    fullName: initialValues.fullName,
    shortName: initialValues.shortName,
    copyright: initialValues.copyright,
    userTypedShortName: false,
    validationErrors: {},
    isSubmitting: false,
  }));

  // Ref for focus management
  // eslint-disable-next-line no-null/no-null -- useRef requires null for DOM refs
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  // Focus full name on mount
  useEffect(() => {
    fullNameInputRef.current?.focus();
  }, []);

  // Sync with initial values when they change
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      fullName: initialValues.fullName,
      shortName: initialValues.shortName,
      copyright: initialValues.copyright,
      userTypedShortName: false,
    }));
  }, [initialValues]);

  // Debounced backend validation for short name uniqueness
  const validateShortNameAsync = useMemo(
    () =>
      debounce(async (shortName: string) => {
        if (!shortName || shortName.length < 3) return;
        // Try to use backend validation if available
        // Note: This command may not be registered yet
        logger.debug(`Validating short name: ${shortName}`);
      }, 300),
    [],
  );

  // Handle full name change (BHV-305, BHV-306)
  const handleFullNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // BHV-306: Replace backslash with forward slash
      const newFullName = e.target.value.replace(/\\/g, '/');

      setFormState((prev) => {
        const updates: Partial<ProjectNameFormState> = {
          fullName: newFullName,
        };

        // BHV-305: Auto-generate short name if user hasn't typed
        if (!prev.userTypedShortName && config.allowShortNameEdit) {
          updates.shortName = generateShortName(newFullName);
        }

        return { ...prev, ...updates };
      });
    },
    [config.allowShortNameEdit],
  );

  // Handle short name keypress (BHV-307)
  const handleShortNameKeyDown = useCallback(() => {
    // BHV-307: Set flag when user manually types in short name
    setFormState((prev) => ({
      ...prev,
      userTypedShortName: true,
    }));
  }, []);

  // Handle short name change
  const handleShortNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newShortName = e.target.value;

      setFormState((prev) => {
        // Validate on change (VAL-001.2-5)
        const shortNameError = validateShortName(
          newShortName,
          existingProjectNames,
          localizedStrings,
        );

        return {
          ...prev,
          shortName: newShortName,
          validationErrors: {
            ...prev.validationErrors,
            shortName: shortNameError,
          },
        };
      });

      // Debounced backend validation
      validateShortNameAsync(newShortName);
    },
    [existingProjectNames, localizedStrings, validateShortNameAsync],
  );

  // Handle copyright change
  const handleCopyrightChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCopyright = e.target.value;
    setFormState((prev) => ({
      ...prev,
      copyright: newCopyright,
    }));
  }, []);

  // Handle full name blur (VAL-002.1)
  const handleFullNameBlur = useCallback(() => {
    setFormState((prev) => {
      const fullNameError = validateFullName(prev.fullName, localizedStrings);
      return {
        ...prev,
        validationErrors: {
          ...prev.validationErrors,
          fullName: fullNameError,
        },
      };
    });
  }, [localizedStrings]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      // Validate all fields
      const fullNameError = validateFullName(formState.fullName, localizedStrings);
      const shortNameError =
        formState.shortName.trim().length === 0
          ? getLocalizedString(
              localizedStrings,
              '%projectName_error_shortNameRequired%',
              'Short name is required',
            )
          : validateShortName(formState.shortName, existingProjectNames, localizedStrings);

      const errors: Record<string, string> = {};
      if (fullNameError) errors.fullName = fullNameError;
      if (shortNameError) errors.shortName = shortNameError;

      if (Object.keys(errors).length > 0) {
        setFormState((prev) => ({
          ...prev,
          validationErrors: errors,
          isSubmitting: false,
        }));

        // Focus first error field
        if (errors.fullName) {
          fullNameInputRef.current?.focus();
        } else if (errors.shortName) {
          document.getElementById('shortName')?.focus();
        }
        return;
      }

      // Return data to parent via state
      const output: ProjectNameFormOutput = {
        action: 'submit',
        data: {
          fullName: formState.fullName,
          shortName: formState.shortName,
          copyright: formState.copyright,
        },
      };

      // Update web view state with result - parent form can read this
      setOutput(output);
      updateWebViewDefinition({ state: { output } });
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  }, [
    formState.fullName,
    formState.shortName,
    formState.copyright,
    existingProjectNames,
    localizedStrings,
    setOutput,
    updateWebViewDefinition,
  ]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    const output: ProjectNameFormOutput = {
      action: 'cancel',
    };

    // Update web view state with result
    setOutput(output);
    updateWebViewDefinition({ state: { output } });
  }, [setOutput, updateWebViewDefinition]);

  // Check if form has validation errors
  const hasErrors = Object.values(formState.validationErrors).some((error) => error.length > 0);

  // Check if OK button should be disabled
  const isOkDisabled =
    formState.isSubmitting ||
    hasErrors ||
    formState.fullName.trim().length === 0 ||
    formState.shortName.trim().length === 0;

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4">
      {/* Form Content */}
      <div className="tw-flex tw-flex-col tw-gap-4 tw-flex-1">
        {/* Full Name Field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="fullName">
            {getLocalizedString(localizedStrings, '%projectName_label_fullName%', 'Full Name:')}
            <span aria-hidden="true" className="tw-text-destructive">
              {' '}
              *
            </span>
            <span className="tw-sr-only"> (required)</span>
          </Label>
          <Input
            id="fullName"
            ref={fullNameInputRef}
            value={formState.fullName}
            onChange={handleFullNameChange}
            onBlur={handleFullNameBlur}
            readOnly={!config.allowFullNameEdit}
            aria-invalid={!!formState.validationErrors.fullName}
            aria-describedby={formState.validationErrors.fullName ? 'fullName-error' : undefined}
            aria-readonly={!config.allowFullNameEdit}
          />
          {formState.validationErrors.fullName && (
            <Label id="fullName-error" className="tw-text-sm tw-text-destructive" role="alert">
              {formState.validationErrors.fullName}
            </Label>
          )}
        </div>

        {/* Short Name Field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="shortName">
            {getLocalizedString(localizedStrings, '%projectName_label_shortName%', 'Short Name:')}
            <span aria-hidden="true" className="tw-text-destructive">
              {' '}
              *
            </span>
            <span className="tw-sr-only"> (required)</span>
          </Label>
          <Input
            id="shortName"
            value={formState.shortName}
            onChange={handleShortNameChange}
            onKeyDown={handleShortNameKeyDown}
            readOnly={!config.allowShortNameEdit}
            maxLength={8}
            aria-invalid={!!formState.validationErrors.shortName}
            aria-describedby={formState.validationErrors.shortName ? 'shortName-error' : undefined}
            aria-readonly={!config.allowShortNameEdit}
          />
          {formState.validationErrors.shortName && (
            <Label id="shortName-error" className="tw-text-sm tw-text-destructive" role="alert">
              {formState.validationErrors.shortName}
            </Label>
          )}
        </div>

        {/* Copyright Field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="copyright">
            {getLocalizedString(localizedStrings, '%projectName_label_copyright%', 'Copyright:')}
          </Label>
          <Textarea
            id="copyright"
            value={formState.copyright}
            onChange={handleCopyrightChange}
            disabled={!config.allowCopyrightEdit}
            rows={3}
            aria-disabled={!config.allowCopyrightEdit}
          />
        </div>

        {/* Registry Change Message */}
        {config.showRegistryMessage && (
          <div className="tw-rounded tw-border tw-border-border tw-bg-muted tw-p-3">
            <Label className="tw-text-sm tw-text-muted-foreground">
              {getLocalizedString(
                localizedStrings,
                '%projectName_message_registryChange%',
                'Changes to this project require registry updates.',
              )}
            </Label>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-mt-4 tw-pt-4 tw-border-t tw-border-border">
        <Button type="button" variant="outline" onClick={handleCancel}>
          {getLocalizedString(localizedStrings, '%general_cancel%', 'Cancel')}
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={isOkDisabled}>
          {getLocalizedString(localizedStrings, '%general_ok%', 'OK')}
        </Button>
      </div>
    </div>
  );
};

// #endregion
