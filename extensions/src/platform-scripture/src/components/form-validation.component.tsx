import { useCallback, useRef, useMemo } from 'react';
import { Alert, AlertDescription, cn } from 'platform-bible-react';
import { AlertCircle } from 'lucide-react';

// =====================================================
// INTERFACES
// =====================================================

/**
 * Represents a form validation error with field association and localization support. Maps to
 * ui-state-contracts.md ValidationError interface.
 */
export interface FormValidationError {
  /** Field identifier that this error applies to */
  field: string;
  /** Error code for categorization (e.g., 'SHORTNAME_TOO_SHORT') */
  code: string;
  /** Human-readable error message or localization key */
  message: string;
  /** Optional parameters for localized message templating */
  messageParams?: Record<string, string>;
}

/**
 * Localized strings for form validation components. Pass these via useLocalizedStrings hook from
 * the extension.
 */
export interface FormValidationLocalizedStrings {
  /** Label for error count in ribbon (e.g., "{count} errors") */
  '%form_validation_error_count%'?: string;
  /** Label for single error in ribbon (e.g., "1 error") */
  '%form_validation_error_single%'?: string;
  /** Accessible label for error ribbon */
  '%form_validation_errors_title%'?: string;
}

/** Keys for localizing form validation components. */
export const FORM_VALIDATION_STRING_KEYS = Object.freeze([
  '%form_validation_error_count%',
  '%form_validation_error_single%',
  '%form_validation_errors_title%',
] as const);

// =====================================================
// FORM VALIDATION RIBBON COMPONENT
// =====================================================

export interface FormValidationRibbonProps {
  /** List of validation errors to display */
  errors: FormValidationError[];
  /** Optional localized strings for the component */
  localizedStrings?: FormValidationLocalizedStrings;
  /** Optional callback when an error is clicked (for focus navigation) */
  onErrorClick?: (error: FormValidationError) => void;
  /** Optional CSS class name for styling */
  className?: string;
  /** Maximum height for the error list before scrolling (default: 150px) */
  maxHeight?: number;
}

/**
 * Error ribbon component displayed at the form level. Shows a scrollable list of validation errors
 * with destructive styling. Clicking an error can trigger focus navigation to the associated
 * field.
 */
export function FormValidationRibbon({
  errors,
  localizedStrings,
  onErrorClick,
  className,
  maxHeight = 150,
}: FormValidationRibbonProps) {
  if (errors.length === 0) {
    return null;
  }

  const errorCountText = useMemo(() => {
    if (errors.length === 1) {
      return localizedStrings?.['%form_validation_error_single%'] ?? '1 error';
    }
    const template = localizedStrings?.['%form_validation_error_count%'] ?? '{count} errors';
    return template.replace('{count}', String(errors.length));
  }, [errors.length, localizedStrings]);

  const title =
    localizedStrings?.['%form_validation_errors_title%'] ?? 'Please correct the following errors:';

  return (
    <Alert
      variant="destructive"
      className={cn('tw-mb-4', className)}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="tw-h-4 tw-w-4" />
      <AlertDescription>
        <div className="tw-font-semibold tw-mb-2">
          {title} ({errorCountText})
        </div>
        <ul
          className="tw-list-disc tw-pl-5 tw-overflow-y-auto tw-space-y-1"
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {errors.map((error, index) => (
            <li key={`${error.field}-${error.code}-${index}`}>
              {onErrorClick ? (
                <button
                  type="button"
                  className="tw-text-left tw-underline tw-cursor-pointer hover:tw-opacity-80 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-destructive focus:tw-ring-offset-1"
                  onClick={() => onErrorClick(error)}
                  aria-label={`Go to ${error.field}: ${error.message}`}
                >
                  {error.message}
                </button>
              ) : (
                <span>{error.message}</span>
              )}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}

// =====================================================
// FIELD ERROR COMPONENT
// =====================================================

export interface FieldErrorProps {
  /** Error message to display */
  message?: string;
  /** Optional CSS class name for styling */
  className?: string;
  /** Optional id for accessibility (should match aria-describedby on input) */
  id?: string;
}

/**
 * Inline field error display component. Shows error message below a form field with appropriate
 * styling.
 */
export function FieldError({ message, className, id }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p
      id={id}
      className={cn('tw-text-sm tw-text-destructive tw-mt-1', className)}
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  );
}

// =====================================================
// FIELD WRAPPER COMPONENT
// =====================================================

export interface ValidationFieldWrapperProps {
  /** The form field to wrap */
  children: React.ReactNode;
  /** Error for this field (if any) */
  error?: FormValidationError;
  /** Field identifier for ref registration */
  fieldId: string;
  /** Ref callback to register the field element for focus management */
  registerRef?: (fieldId: string, element: HTMLElement | null) => void;
  /** Optional CSS class name for the wrapper */
  className?: string;
}

/**
 * Wrapper component that adds error styling and displays field-level errors. Use this to wrap form
 * inputs that need validation display.
 */
export function ValidationFieldWrapper({
  children,
  error,
  fieldId,
  registerRef,
  className,
}: ValidationFieldWrapperProps) {
  const wrapperRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (registerRef && element) {
        // Find the first focusable element within the wrapper
        const focusable = element.querySelector<HTMLElement>(
          'input, select, textarea, button, [tabindex]:not([tabindex="-1"])',
        );
        registerRef(fieldId, focusable || element);
      }
    },
    [fieldId, registerRef],
  );

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'tw-relative',
        {
          '[&_input]:tw-border-destructive [&_select]:tw-border-destructive [&_textarea]:tw-border-destructive':
            !!error,
        },
        className,
      )}
    >
      {children}
      {error && <FieldError message={error.message} id={`${fieldId}-error`} className="tw-mt-1" />}
    </div>
  );
}

// =====================================================
// USE FORM VALIDATION HOOK
// =====================================================

export interface UseFormValidationOptions {
  /** Callback to scroll an element into view (customize for virtualized lists) */
  scrollIntoView?: (element: HTMLElement) => void;
}

export interface UseFormValidationReturn {
  /** Map of field IDs to their DOM element refs */
  fieldRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  /** Register a field ref for focus management */
  registerFieldRef: (fieldId: string, element: HTMLElement | null) => void;
  /** Focus the first field that has an error */
  focusFirstError: (errors: FormValidationError[]) => void;
  /** Focus a specific field by ID */
  focusField: (fieldId: string) => void;
  /** Get error for a specific field from error array */
  getFieldError: (
    fieldId: string,
    errors: FormValidationError[],
  ) => FormValidationError | undefined;
  /** Check if form has any errors */
  hasErrors: (errors: FormValidationError[]) => boolean;
  /** Get errors grouped by field */
  getErrorsByField: (errors: FormValidationError[]) => Map<string, FormValidationError[]>;
  /** Create an onErrorClick handler for FormValidationRibbon */
  createErrorClickHandler: () => (error: FormValidationError) => void;
}

/**
 * Hook for managing form validation state and focus. Provides ref registration, focus management,
 * and error aggregation utilities.
 *
 * @example
 *
 * ```tsx
 * const { registerFieldRef, focusFirstError, getFieldError } = useFormValidation();
 *
 * // In your form submission handler:
 * const errors = validateForm(formData);
 * if (errors.length > 0) {
 *   focusFirstError(errors);
 *   return;
 * }
 *
 * // In your field rendering:
 * <ValidationFieldWrapper
 *   fieldId="shortName"
 *   error={getFieldError('shortName', errors)}
 *   registerRef={registerFieldRef}
 * >
 *   <Input id="shortName" {...props} />
 * </ValidationFieldWrapper>;
 * ```
 */
export function useFormValidation(options: UseFormValidationOptions = {}): UseFormValidationReturn {
  const fieldRefs = useRef<Map<string, HTMLElement>>(new Map());

  const { scrollIntoView = defaultScrollIntoView } = options;

  const registerFieldRef = useCallback((fieldId: string, element: HTMLElement | null) => {
    if (element) {
      fieldRefs.current.set(fieldId, element);
    } else {
      fieldRefs.current.delete(fieldId);
    }
  }, []);

  const focusField = useCallback(
    (fieldId: string) => {
      const element = fieldRefs.current.get(fieldId);
      if (element) {
        scrollIntoView(element);
        // Small delay to ensure scroll completes before focus
        setTimeout(() => {
          element.focus();
        }, 100);
      }
    },
    [scrollIntoView],
  );

  const focusFirstError = useCallback(
    (errors: FormValidationError[]) => {
      if (errors.length === 0) return;

      // Focus the first error's field
      const firstError = errors[0];
      focusField(firstError.field);
    },
    [focusField],
  );

  const getFieldError = useCallback(
    (fieldId: string, errors: FormValidationError[]): FormValidationError | undefined => {
      return errors.find((error) => error.field === fieldId);
    },
    [],
  );

  const hasErrors = useCallback((errors: FormValidationError[]): boolean => {
    return errors.length > 0;
  }, []);

  const getErrorsByField = useCallback(
    (errors: FormValidationError[]): Map<string, FormValidationError[]> => {
      const errorMap = new Map<string, FormValidationError[]>();
      errors.forEach((error) => {
        const existing = errorMap.get(error.field) || [];
        existing.push(error);
        errorMap.set(error.field, existing);
      });
      return errorMap;
    },
    [],
  );

  const createErrorClickHandler = useCallback(() => {
    return (error: FormValidationError) => {
      focusField(error.field);
    };
  }, [focusField]);

  return {
    fieldRefs,
    registerFieldRef,
    focusFirstError,
    focusField,
    getFieldError,
    hasErrors,
    getErrorsByField,
    createErrorClickHandler,
  };
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/** Default scroll into view behavior. */
function defaultScrollIntoView(element: HTMLElement): void {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Creates a localized error message from an error code and params. Use this with your localization
 * system to generate user-facing messages.
 *
 * @param _errorCode - The error code (e.g., 'SHORTNAME_TOO_SHORT') - for logging/debugging
 * @param messageTemplate - The localized message template (e.g., 'Name must be at least {min}
 *   characters')
 * @param params - Parameters to substitute in the template
 * @returns The formatted error message
 */
export function formatErrorMessage(
  _errorCode: string,
  messageTemplate: string,
  params?: Record<string, string>,
): string {
  if (!params) {
    return messageTemplate;
  }

  let result = messageTemplate;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  });

  return result;
}

/**
 * Creates a FormValidationError from validation result data. Helper function for converting backend
 * validation results to UI errors.
 *
 * @param field - Field identifier
 * @param code - Error code
 * @param message - Error message (or localized message)
 * @param messageParams - Optional parameters for message templating
 * @returns FormValidationError object
 */
export function createValidationError(
  field: string,
  code: string,
  message: string,
  messageParams?: Record<string, string>,
): FormValidationError {
  return {
    field,
    code,
    message,
    messageParams,
  };
}
