import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Alert, AlertDescription, Input, Textarea, Button, Label, cn } from 'platform-bible-react';
import { AlertTriangle } from 'lucide-react';
import {
  FormValidationRibbon,
  FormValidationError,
  ValidationFieldWrapper,
  useFormValidation,
} from './form-validation.component';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

/** Props passed to ProjectNameForm. Based on ui-state-contracts.md ProjectNameFormProps interface. */
export interface ProjectNameFormProps {
  /** Current full project name */
  fullName: string;
  /** Current short project name */
  shortName: string;
  /** Current copyright text */
  copyright: string;
  /** Whether this is a new project (true) or editing existing (false) */
  isNewProject: boolean;
  /** Whether the project is registered with the Paratext Registry */
  isRegistered: boolean;
  /** Callback when form is submitted with new values */
  onSubmit?: (result: ProjectNameFormResult) => void;
  /** Callback when form is cancelled */
  onCancel?: () => void;
  /** Optional external validation function for short name uniqueness check */
  validateShortNameUniqueness?: (shortName: string) => Promise<boolean>;
  /** Optional localized strings for the component */
  localizedStrings?: ProjectNameFormLocalizedStrings;
  /** Optional CSS class name for styling */
  className?: string;
}

/** Result returned when form is submitted successfully. */
export interface ProjectNameFormResult {
  fullName: string;
  shortName: string;
  copyright: string;
}

/** Localized strings for the ProjectNameForm component. */
export interface ProjectNameFormLocalizedStrings {
  /** Dialog title */
  '%project_name_dialog_title%'?: string;
  /** Full name label */
  '%project_name_full_name_label%'?: string;
  /** Short name label */
  '%project_name_short_name_label%'?: string;
  /** Short name hint */
  '%project_name_short_name_hint%'?: string;
  /** Copyright label */
  '%project_name_copyright_label%'?: string;
  /** Registry warning message */
  '%project_name_registry_warning%'?: string;
  /** OK button text */
  '%project_name_ok%'?: string;
  /** Cancel button text */
  '%project_name_cancel%'?: string;
  /** Error: Short name too short */
  '%project_name_error_too_short%'?: string;
  /** Error: Short name too long */
  '%project_name_error_too_long%'?: string;
  /** Error: Invalid characters */
  '%project_name_error_invalid_chars%'?: string;
  /** Error: Contains spaces */
  '%project_name_error_has_spaces%'?: string;
  /** Error: Reserved name */
  '%project_name_error_reserved%'?: string;
  /** Error: Already exists */
  '%project_name_error_exists%'?: string;
  /** Error: Full name required */
  '%project_name_error_full_name_required%'?: string;
}

/** Keys for localizing project name form components. */
export const PROJECT_NAME_FORM_STRING_KEYS = Object.freeze([
  '%project_name_dialog_title%',
  '%project_name_full_name_label%',
  '%project_name_short_name_label%',
  '%project_name_short_name_hint%',
  '%project_name_copyright_label%',
  '%project_name_registry_warning%',
  '%project_name_ok%',
  '%project_name_cancel%',
  '%project_name_error_too_short%',
  '%project_name_error_too_long%',
  '%project_name_error_invalid_chars%',
  '%project_name_error_has_spaces%',
  '%project_name_error_reserved%',
  '%project_name_error_exists%',
  '%project_name_error_full_name_required%',
] as const);

// =====================================================
// VALIDATION CONSTANTS
// =====================================================

/** Minimum length for short name */
const SHORT_NAME_MIN_LENGTH = 3;

/** Maximum length for short name */
const SHORT_NAME_MAX_LENGTH = 8;

/** Valid characters pattern for short name (A-Za-z0-9_) */
const SHORT_NAME_VALID_CHARS_PATTERN = /^[A-Za-z0-9_]+$/;

/** Pattern to detect whitespace */
const WHITESPACE_PATTERN = /\s/;

/** Windows reserved file names (case-insensitive) */
const RESERVED_NAMES = new Set([
  'CON',
  'PRN',
  'AUX',
  'NUL',
  'COM1',
  'COM2',
  'COM3',
  'COM4',
  'COM5',
  'COM6',
  'COM7',
  'COM8',
  'COM9',
  'LPT1',
  'LPT2',
  'LPT3',
  'LPT4',
  'LPT5',
  'LPT6',
  'LPT7',
  'LPT8',
  'LPT9',
]);

// =====================================================
// VALIDATION FUNCTIONS
// =====================================================

/** Validation error codes matching data-contracts.md error handling tables. */
export type ShortNameValidationError =
  | 'ShortName_TooShort'
  | 'ShortName_TooLong'
  | 'ShortName_InvalidChars'
  | 'ShortName_HasSpaces'
  | 'ShortName_ReservedName'
  | 'ShortName_AlreadyExists';

export type FullNameValidationError = 'FullName_Required';

/**
 * Validates a short name against all client-side validation rules. This performs local validation
 * only - uniqueness checking requires a backend call.
 *
 * @param shortName - The short name to validate
 * @returns Error code if invalid, undefined if valid
 */
export function validateShortNameLocal(shortName: string): ShortNameValidationError | undefined {
  // VAL-003: No whitespace
  if (WHITESPACE_PATTERN.test(shortName)) {
    return 'ShortName_HasSpaces';
  }

  // VAL-001: Length 3-8 characters
  if (shortName.length < SHORT_NAME_MIN_LENGTH) {
    return 'ShortName_TooShort';
  }

  if (shortName.length > SHORT_NAME_MAX_LENGTH) {
    return 'ShortName_TooLong';
  }

  // VAL-002: Valid characters only
  if (!SHORT_NAME_VALID_CHARS_PATTERN.test(shortName)) {
    return 'ShortName_InvalidChars';
  }

  // VAL-004: Not a reserved name
  if (RESERVED_NAMES.has(shortName.toUpperCase())) {
    return 'ShortName_ReservedName';
  }

  return undefined;
}

/**
 * Validates a full name against all validation rules.
 *
 * @param fullName - The full name to validate
 * @returns Error code if invalid, undefined if valid
 */
export function validateFullName(fullName: string): FullNameValidationError | undefined {
  // VAL-021, VAL-022: Full name cannot be empty or whitespace only
  if (!fullName || fullName.trim().length === 0) {
    return 'FullName_Required';
  }

  return undefined;
}

// =====================================================
// SHORT NAME AUTO-GENERATION (BHV-030)
// =====================================================

/**
 * Generates a short name from a full name following the algorithm from BHV-030.
 *
 * Algorithm:
 *
 * 1. Extract first letter of each word (valid chars only: A-Za-z)
 * 2. Extract digits separately (last 2 only)
 * 3. Combine: letters + digits
 * 4. Truncate to max 8 chars
 * 5. Pad to min 3 chars using 'X' if needed
 *
 * @example GenerateShortName("My Paratext Project") // "MPP" generateShortName("Translation 2024")
 * // "T24" generateShortName("My Paratext Project 2024") // "MPP24" generateShortName("A") // "AXX"
 * (padded)
 *
 * @param fullName - The full project name
 * @returns Generated short name (3-8 characters)
 */
export function generateShortName(fullName: string): string {
  if (!fullName || fullName.trim().length === 0) {
    return '';
  }

  // Extract words (split by whitespace)
  const words = fullName.trim().split(/\s+/);

  // Extract first letter of each word (only valid chars: A-Za-z)
  const letters = words
    .map((word) => {
      const firstLetter = word.match(/[A-Za-z]/);
      return firstLetter ? firstLetter[0].toUpperCase() : '';
    })
    .filter((letter) => letter !== '');

  // Extract all digits from the full name
  const allDigits = fullName.match(/\d/g);
  let digitsSuffix = '';
  if (allDigits && allDigits.length > 0) {
    // Take last 2 digits
    const lastDigits = allDigits.slice(-2).join('');
    digitsSuffix = lastDigits;
  }

  // Combine letters + digits
  let result = letters.join('') + digitsSuffix;

  // Truncate to max 8 chars
  if (result.length > SHORT_NAME_MAX_LENGTH) {
    result = result.substring(0, SHORT_NAME_MAX_LENGTH);
  }

  // Pad to min 3 chars using 'X' if needed
  while (result.length < SHORT_NAME_MIN_LENGTH) {
    result += 'X';
  }

  return result;
}

// =====================================================
// ERROR MESSAGE HELPERS
// =====================================================

/**
 * Gets a human-readable error message for a validation error code.
 *
 * @param errorCode - The validation error code
 * @param localizedStrings - Optional localized strings
 * @returns Human-readable error message
 */
function getErrorMessage(
  errorCode: ShortNameValidationError | FullNameValidationError,
  localizedStrings?: ProjectNameFormLocalizedStrings,
): string {
  const defaultMessages: Record<ShortNameValidationError | FullNameValidationError, string> = {
    ShortName_TooShort: `Short name must be at least ${SHORT_NAME_MIN_LENGTH} characters`,
    ShortName_TooLong: `Short name must be at most ${SHORT_NAME_MAX_LENGTH} characters`,
    ShortName_InvalidChars: 'Short name can only contain letters, numbers, and underscores',
    ShortName_HasSpaces: 'Short name cannot contain spaces',
    ShortName_ReservedName: 'This name is reserved by the operating system',
    ShortName_AlreadyExists: 'A project with this name already exists',
    FullName_Required: 'Full name is required',
  };

  const localizationKeyMap: Record<
    ShortNameValidationError | FullNameValidationError,
    keyof ProjectNameFormLocalizedStrings
  > = {
    ShortName_TooShort: '%project_name_error_too_short%',
    ShortName_TooLong: '%project_name_error_too_long%',
    ShortName_InvalidChars: '%project_name_error_invalid_chars%',
    ShortName_HasSpaces: '%project_name_error_has_spaces%',
    ShortName_ReservedName: '%project_name_error_reserved%',
    ShortName_AlreadyExists: '%project_name_error_exists%',
    FullName_Required: '%project_name_error_full_name_required%',
  };

  const key = localizationKeyMap[errorCode];
  return localizedStrings?.[key] ?? defaultMessages[errorCode];
}

// =====================================================
// COMPONENT
// =====================================================

/**
 * Project Name Form component. Allows editing project full name, short name, and copyright.
 * Provides real-time validation, auto-generation of short name, and registry warning for registered
 * projects.
 *
 * @remarks
 * This component implements behaviors:
 *
 * - BHV-029: Real-time validation of short name
 * - BHV-030: Auto-generation of short name from full name
 * - BHV-035: Registry warning for registered projects
 * - BHV-056: Comprehensive short name validation
 *
 * @example
 *
 * ```tsx
 * <ProjectNameForm
 *   fullName="My Project"
 *   shortName="MPR"
 *   copyright="(c) 2024"
 *   isNewProject={true}
 *   isRegistered={false}
 *   onSubmit={(result) => console.log(result)}
 *   onCancel={() => console.log('Cancelled')}
 * />;
 * ```
 */
export function ProjectNameForm({
  fullName: initialFullName,
  shortName: initialShortName,
  copyright: initialCopyright,
  isNewProject,
  isRegistered,
  onSubmit,
  onCancel,
  validateShortNameUniqueness,
  localizedStrings,
  className,
}: ProjectNameFormProps) {
  // Form state
  const [fullName, setFullName] = useState(initialFullName);
  const [shortName, setShortName] = useState(initialShortName);
  const [copyright, setCopyright] = useState(initialCopyright);

  // Track if short name was manually edited (to prevent auto-generation from overwriting)
  const [shortNameManuallyEdited, setShortNameManuallyEdited] = useState(
    initialShortName.length > 0,
  );

  // Track last auto-generated short name
  const lastAutoGeneratedRef = useRef<string | undefined>(undefined);

  // Debounce timer for uniqueness check
  const uniquenessCheckTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Validation state
  const [shortNameError, setShortNameError] = useState<FormValidationError | undefined>(undefined);
  const [fullNameError, setFullNameError] = useState<FormValidationError | undefined>(undefined);
  const [isCheckingUniqueness, setIsCheckingUniqueness] = useState(false);

  // Track if full name has been changed from initial (for registry warning)
  const fullNameChanged = useMemo(() => fullName !== initialFullName, [fullName, initialFullName]);

  // Show registry warning when registered project name is changed
  const showRegistryWarning = useMemo(
    () => isRegistered && fullNameChanged,
    [isRegistered, fullNameChanged],
  );

  // Short name is editable only for new projects
  const shortNameEditable = isNewProject;

  // Form validation hook
  const { registerFieldRef, focusFirstError, createErrorClickHandler } = useFormValidation();

  // Collect all validation errors
  const validationErrors = useMemo(() => {
    const errors: FormValidationError[] = [];
    if (fullNameError) errors.push(fullNameError);
    if (shortNameError) errors.push(shortNameError);
    return errors;
  }, [fullNameError, shortNameError]);

  // Can submit when no validation errors
  const canSubmit = useMemo(
    () => validationErrors.length === 0 && !isCheckingUniqueness,
    [validationErrors.length, isCheckingUniqueness],
  );

  // Validate full name
  const validateFullNameField = useCallback(
    (value: string) => {
      const error = validateFullName(value);
      if (error) {
        setFullNameError({
          field: 'fullName',
          code: error,
          message: getErrorMessage(error, localizedStrings),
        });
      } else {
        setFullNameError(undefined);
      }
    },
    [localizedStrings],
  );

  // Validate short name (client-side only)
  const validateShortNameField = useCallback(
    async (value: string) => {
      // Clear any pending uniqueness check
      if (uniquenessCheckTimerRef.current) {
        clearTimeout(uniquenessCheckTimerRef.current);
        uniquenessCheckTimerRef.current = undefined;
      }

      // Local validation first
      const error = validateShortNameLocal(value);
      if (error) {
        setShortNameError({
          field: 'shortName',
          code: error,
          message: getErrorMessage(error, localizedStrings),
        });
        return;
      }

      // For new projects, check uniqueness if validation function provided
      if (isNewProject && validateShortNameUniqueness) {
        setIsCheckingUniqueness(true);

        // Debounce uniqueness check
        uniquenessCheckTimerRef.current = setTimeout(async () => {
          try {
            const isUnique = await validateShortNameUniqueness(value);
            if (!isUnique) {
              setShortNameError({
                field: 'shortName',
                code: 'ShortName_AlreadyExists',
                message: getErrorMessage('ShortName_AlreadyExists', localizedStrings),
              });
            } else {
              setShortNameError(undefined);
            }
          } catch {
            // If uniqueness check fails, assume it's unique (fail open)
            setShortNameError(undefined);
          } finally {
            setIsCheckingUniqueness(false);
          }
        }, 300);
      } else {
        setShortNameError(undefined);
      }
    },
    [isNewProject, validateShortNameUniqueness, localizedStrings],
  );

  // Handle full name change
  const handleFullNameChange = useCallback(
    (value: string) => {
      setFullName(value);
      validateFullNameField(value);

      // Auto-generate short name if not manually edited and is new project
      if (isNewProject && !shortNameManuallyEdited) {
        const generated = generateShortName(value);
        lastAutoGeneratedRef.current = generated;
        setShortName(generated);
        validateShortNameField(generated);
      }
    },
    [isNewProject, shortNameManuallyEdited, validateFullNameField, validateShortNameField],
  );

  // Handle short name change
  const handleShortNameChange = useCallback(
    (value: string) => {
      setShortName(value);
      setShortNameManuallyEdited(true);
      validateShortNameField(value);
    },
    [validateShortNameField],
  );

  // Handle copyright change
  const handleCopyrightChange = useCallback((value: string) => {
    setCopyright(value);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(() => {
    // Re-validate all fields
    validateFullNameField(fullName);
    validateShortNameField(shortName);

    // Focus first error if any
    if (validationErrors.length > 0) {
      focusFirstError(validationErrors);
      return;
    }

    // Call onSubmit callback
    if (onSubmit) {
      onSubmit({ fullName, shortName, copyright });
    }
  }, [
    fullName,
    shortName,
    copyright,
    validationErrors,
    validateFullNameField,
    validateShortNameField,
    focusFirstError,
    onSubmit,
  ]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  // Initial validation on mount
  useEffect(() => {
    validateFullNameField(initialFullName);
    validateShortNameField(initialShortName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (uniquenessCheckTimerRef.current) {
        clearTimeout(uniquenessCheckTimerRef.current);
      }
    };
  }, []);

  // Localized strings with defaults
  const dialogTitle = localizedStrings?.['%project_name_dialog_title%'] ?? 'Edit project name';
  const fullNameLabel = localizedStrings?.['%project_name_full_name_label%'] ?? 'Full Name:';
  const shortNameLabel = localizedStrings?.['%project_name_short_name_label%'] ?? 'Short Name:';
  const shortNameHint = localizedStrings?.['%project_name_short_name_hint%'] ?? '(3-8 characters)';
  const copyrightLabel = localizedStrings?.['%project_name_copyright_label%'] ?? 'Copyright:';
  const registryWarning =
    localizedStrings?.['%project_name_registry_warning%'] ??
    'Changing the name of a registered project may affect how it appears in the Paratext Registry.';
  const okText = localizedStrings?.['%project_name_ok%'] ?? 'OK';
  const cancelText = localizedStrings?.['%project_name_cancel%'] ?? 'Cancel';

  return (
    <div className={cn('tw-flex tw-flex-col tw-gap-4', className)}>
      {/* Dialog Title */}
      <h2 className="tw-text-lg tw-font-semibold">{dialogTitle}</h2>

      {/* Validation Errors Ribbon */}
      <FormValidationRibbon errors={validationErrors} onErrorClick={createErrorClickHandler()} />

      {/* Full Name Field */}
      <ValidationFieldWrapper
        fieldId="fullName"
        error={fullNameError ?? undefined}
        registerRef={registerFieldRef}
        className="tw-flex tw-flex-col tw-gap-1"
      >
        <Label htmlFor="fullName">{fullNameLabel}</Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => handleFullNameChange(e.target.value)}
          className={cn({ 'tw-border-destructive': fullNameError })}
          aria-describedby={fullNameError ? 'fullName-error' : undefined}
          aria-invalid={!!fullNameError}
        />
      </ValidationFieldWrapper>

      {/* Short Name Field */}
      <ValidationFieldWrapper
        fieldId="shortName"
        error={shortNameError ?? undefined}
        registerRef={registerFieldRef}
        className="tw-flex tw-flex-col tw-gap-1"
      >
        <div className="tw-flex tw-items-baseline tw-gap-2">
          <Label htmlFor="shortName">{shortNameLabel}</Label>
          <span className="tw-text-sm tw-text-muted-foreground">{shortNameHint}</span>
        </div>
        <Input
          id="shortName"
          value={shortName}
          onChange={(e) => handleShortNameChange(e.target.value)}
          maxLength={SHORT_NAME_MAX_LENGTH}
          disabled={!shortNameEditable}
          className={cn({ 'tw-border-destructive': shortNameError })}
          aria-describedby={shortNameError ? 'shortName-error' : undefined}
          aria-invalid={!!shortNameError}
        />
        {isCheckingUniqueness && (
          <span className="tw-text-sm tw-text-muted-foreground">Checking availability...</span>
        )}
      </ValidationFieldWrapper>

      {/* Copyright Field */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="copyright">{copyrightLabel}</Label>
        <Textarea
          id="copyright"
          value={copyright}
          onChange={(e) => handleCopyrightChange(e.target.value)}
          rows={3}
        />
      </div>

      {/* Registry Warning */}
      {showRegistryWarning && (
        <Alert variant="default" className="tw-border-yellow-500 tw-bg-yellow-50">
          <AlertTriangle className="tw-h-4 tw-w-4 tw-text-yellow-600" />
          <AlertDescription className="tw-text-yellow-800">{registryWarning}</AlertDescription>
        </Alert>
      )}

      {/* Form Actions */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t">
        <Button variant="outline" onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          {okText}
        </Button>
      </div>
    </div>
  );
}

export default ProjectNameForm;
