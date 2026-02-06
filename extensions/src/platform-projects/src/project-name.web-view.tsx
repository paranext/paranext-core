import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Input, Label, Textarea } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { generateShortName, validateShortName } from './project-properties.utils';

// ============================================================================
// LOCALIZED STRING KEYS
// ============================================================================

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%webView_projectName_title%',
  '%webView_projectName_field_fullName%',
  '%webView_projectName_field_shortName%',
  '%webView_projectName_field_copyright%',
  '%webView_projectName_button_ok%',
  '%webView_projectName_button_cancel%',
  '%webView_projectName_error_fullNameRequired%',
  '%webView_projectName_error_shortNameRequired%',
  '%webView_projectName_error_shortNameLength%',
  '%webView_projectName_error_shortNameChars%',
  '%webView_projectName_error_shortNameSpaces%',
  '%webView_projectName_message_registryChange%',
];

// ============================================================================
// HELPERS
// ============================================================================

/** Replace backslashes with forward slashes in the full name (BHV-306). */
function sanitizeFullName(value: string): string {
  return value.replace(/\\/g, '/');
}

/** Get localized validation error for short name, or undefined if valid. */
function getShortNameError(value: string, localizedStrings: LanguageStrings): string | undefined {
  const rawError = validateShortName(value);
  if (!rawError) return undefined;

  // Map raw error messages to localized versions
  if (rawError.includes('less than 3 or more than 8')) {
    return localizedStrings['%webView_projectName_error_shortNameLength%'] ?? rawError;
  }
  if (rawError.includes('only contain letters')) {
    return localizedStrings['%webView_projectName_error_shortNameChars%'] ?? rawError;
  }
  if (rawError.includes('spaces')) {
    return localizedStrings['%webView_projectName_error_shortNameSpaces%'] ?? rawError;
  }
  return rawError;
}

// ============================================================================
// COMPONENT
// ============================================================================

global.webViewComponent = function ProjectNameWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  // Read initial values from web view state
  const [initialFullName] = useWebViewState<string>('fullName', '');
  const [initialShortName] = useWebViewState<string>('shortName', '');
  const [initialCopyright] = useWebViewState<string>('copyright', '');

  // Read config from web view state
  const [allowShortNameEdit] = useWebViewState<boolean>('allowShortNameEdit', true);
  const [allowFullNameEdit] = useWebViewState<boolean>('allowFullNameEdit', true);
  const [allowCopyrightEdit] = useWebViewState<boolean>('allowCopyrightEdit', true);
  const [showRegistryMessage] = useWebViewState<boolean>('showRegistryMessage', false);

  // Form state
  const [fullName, setFullName] = useState<string>(initialFullName);
  const [shortName, setShortName] = useState<string>(initialShortName);
  const [copyright, setCopyright] = useState<string>(initialCopyright);
  const [userTypedShortName, setUserTypedShortName] = useState<boolean>(false);

  // Validation state
  const [fullNameError, setFullNameError] = useState<string | undefined>(undefined);
  const [shortNameError, setShortNameError] = useState<string | undefined>(undefined);

  // ---- Event Handlers ----

  const handleFullNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitizeFullName(e.target.value);
      setFullName(sanitized);

      // Clear full name error on change
      setFullNameError(undefined);

      // Auto-generate short name if user hasn't manually typed (BHV-601)
      if (!userTypedShortName && allowShortNameEdit) {
        const generated = generateShortName(sanitized);
        setShortName(generated);
        // Validate generated short name
        setShortNameError(getShortNameError(generated, localizedStrings));
      }
    },
    [userTypedShortName, allowShortNameEdit, localizedStrings],
  );

  const handleFullNameBlur = useCallback(() => {
    // VAL-002.1: Full name required on blur
    if (!fullName || fullName.trim().length === 0) {
      setFullNameError(
        localizedStrings['%webView_projectName_error_fullNameRequired%'] ??
          'You must enter a full name',
      );
    }
  }, [fullName, localizedStrings]);

  const handleShortNameKeyDown = useCallback(() => {
    // BHV-307: User typing in short name disables auto-generation
    setUserTypedShortName(true);
  }, []);

  const handleShortNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setShortName(value);
      // VAL-001: Validate on change
      setShortNameError(getShortNameError(value, localizedStrings));
    },
    [localizedStrings],
  );

  const handleCopyrightChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setCopyright(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    // Run all validation
    let hasErrors = false;

    // VAL-002.1: Full name required
    if (!fullName || fullName.trim().length === 0) {
      setFullNameError(
        localizedStrings['%webView_projectName_error_fullNameRequired%'] ??
          'You must enter a full name',
      );
      hasErrors = true;
    }

    // VAL-001.1: Short name required
    if (!shortName || shortName.trim().length === 0) {
      setShortNameError(
        localizedStrings['%webView_projectName_error_shortNameRequired%'] ??
          'Short name is required',
      );
      hasErrors = true;
    } else {
      const error = getShortNameError(shortName, localizedStrings);
      if (error) {
        setShortNameError(error);
        hasErrors = true;
      }
    }

    if (hasErrors) {
      // Focus first error field - validation errors already set above
    }

    // Return data to parent via web view state
    // In a real integration, this would use PAPI or a callback mechanism
  }, [fullName, shortName, localizedStrings]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleCancel = useCallback(() => {}, []);

  // Determine if OK button should be disabled
  const isOkDisabled = useMemo(() => {
    if (!fullName || fullName.trim().length === 0) return true;
    if (!shortName || shortName.trim().length === 0) return true;
    if (validateShortName(shortName)) return true;
    return false;
  }, [fullName, shortName]);

  return (
    <div
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-bg-background"
      data-testid="project-name-form"
    >
      {/* Title */}
      <div className="tw-px-4 tw-pt-4 tw-pb-2">
        <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">
          {localizedStrings['%webView_projectName_title%']}
        </h2>
      </div>

      {/* Registry Change Message Banner */}
      {showRegistryMessage ? (
        <div
          className="tw-mx-4 tw-mb-2 tw-px-3 tw-py-2 tw-border tw-border-border tw-rounded tw-bg-muted"
          role="status"
        >
          <Label className="tw-text-sm tw-text-muted-foreground">
            {localizedStrings['%webView_projectName_message_registryChange%']}
          </Label>
        </div>
      ) : undefined}

      {/* Form Content */}
      <div className="tw-flex-1 tw-overflow-y-auto tw-px-4 tw-py-2">
        <div className="tw-flex tw-flex-col tw-gap-4">
          {/* Full Name Field */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="fullName">
              {localizedStrings['%webView_projectName_field_fullName%']}
              <span className="tw-text-destructive" aria-hidden="true">
                {' '}
                *
              </span>
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={handleFullNameChange}
              onBlur={handleFullNameBlur}
              readOnly={!allowFullNameEdit}
              aria-invalid={!!fullNameError}
              aria-describedby={fullNameError ? 'fullName-error' : undefined}
              aria-readonly={!allowFullNameEdit}
            />
            {fullNameError ? (
              <Label id="fullName-error" className="tw-text-sm tw-text-destructive" role="alert">
                {fullNameError}
              </Label>
            ) : undefined}
          </div>

          {/* Short Name Field */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="shortName">
              {localizedStrings['%webView_projectName_field_shortName%']}
              <span className="tw-text-destructive" aria-hidden="true">
                {' '}
                *
              </span>
            </Label>
            <Input
              id="shortName"
              value={shortName}
              onKeyDown={handleShortNameKeyDown}
              onChange={handleShortNameChange}
              readOnly={!allowShortNameEdit}
              aria-invalid={!!shortNameError}
              aria-describedby={shortNameError ? 'shortName-error' : undefined}
              aria-readonly={!allowShortNameEdit}
            />
            {shortNameError ? (
              <Label id="shortName-error" className="tw-text-sm tw-text-destructive" role="alert">
                {shortNameError}
              </Label>
            ) : undefined}
          </div>

          {/* Copyright Field */}
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="copyright">
              {localizedStrings['%webView_projectName_field_copyright%']}
            </Label>
            <Textarea
              id="copyright"
              value={copyright}
              onChange={handleCopyrightChange}
              disabled={!allowCopyrightEdit}
              className="tw-min-h-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Dialog Actions */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t tw-border-border">
        <Button type="button" variant="outline" onClick={handleCancel}>
          {localizedStrings['%webView_projectName_button_cancel%']}
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={isOkDisabled}>
          {localizedStrings['%webView_projectName_button_ok%']}
        </Button>
      </div>
    </div>
  );
};
