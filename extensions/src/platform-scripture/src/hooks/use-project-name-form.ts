import { useState, useCallback, useMemo, useEffect } from 'react';

// =============================================================================
// TYPES
// =============================================================================

/** Input state for Project Name form (from ui-state-contracts.md) */
export interface ProjectNameFormInput {
  fullName: string;
  shortName: string;
  copyright: string;
  mode: 'create' | 'edit';
  isRestricted: boolean;
  allowShortNameEdit: boolean;
  existingProjectNames: string[];
}

/** Validation error representation */
export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

/** Short name validation result */
export interface ShortNameValidation {
  isValid: boolean;
  error?: string;
}

/** Output state from Project Name form */
export interface ProjectNameFormOutput {
  action: 'submit' | 'cancel';
  nameData?: {
    fullName: string;
    shortName: string;
    copyright: string;
  };
}

// =============================================================================
// VALIDATION CONSTANTS
// =============================================================================

/** Reserved Windows file names that cannot be used as project short names (BHV-201) */
const RESERVED_WINDOWS_NAMES = [
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
];

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

/**
 * Validates short name according to PT9 rules (BHV-201)
 *
 * - 3-8 characters
 * - Alphanumeric only (no spaces)
 * - Not a reserved Windows name
 */
export function validateShortName(name: string, existingNames: string[] = []): ShortNameValidation {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Short name is required' };
  }

  if (name.length < 3 || name.length > 8) {
    return { isValid: false, error: 'Short name must be 3-8 characters' };
  }

  if (!/^[A-Za-z0-9]+$/.test(name)) {
    return { isValid: false, error: 'Short name must contain only letters and numbers' };
  }

  if (/\s/.test(name)) {
    return { isValid: false, error: 'Short name cannot contain spaces' };
  }

  // Case-insensitive check for reserved names
  if (RESERVED_WINDOWS_NAMES.includes(name.toUpperCase())) {
    return { isValid: false, error: `'${name}' is a reserved Windows name and cannot be used` };
  }

  // Check for uniqueness (case-insensitive)
  const normalizedName = name.toUpperCase();
  if (existingNames.some((existing) => existing.toUpperCase() === normalizedName)) {
    return { isValid: false, error: 'A project with this name already exists' };
  }

  return { isValid: true };
}

/**
 * Validates full name
 *
 * - Cannot be empty
 */
export function validateFullName(name: string): ShortNameValidation {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Full name is required' };
  }
  return { isValid: true };
}

/**
 * Replaces backslash with forward slash in full name (BHV-202) This is done silently to prevent
 * issues with file paths (FB 15254)
 */
export function sanitizeFullName(fullName: string): string {
  return fullName.replace(/\\/g, '/');
}

/**
 * Generates short name from full name using FormTextNameAbbrev algorithm (BHV-200)
 *
 * Algorithm:
 *
 * 1. Split fullName into words
 * 2. Take first letter of each word (uppercase)
 * 3. If fullName contains digits at end, append last 2 digits
 * 4. If result < 3 chars, pad with characters from first word
 * 5. If result > 8 chars, truncate to 8
 *
 * Examples:
 *
 * - "New Translation Project 2024" -> "NTP24"
 * - "My Bible" -> "MYB"
 * - "Test" -> "TES"
 * - "Very Long Project Name Here 99" -> "VLPNH99"
 */
export function generateShortName(fullName: string): string {
  if (!fullName || fullName.trim().length === 0) {
    return '';
  }

  const trimmedName = fullName.trim();

  // Split into words, filtering empty strings
  const words = trimmedName.split(/\s+/).filter((w) => w.length > 0);

  if (words.length === 0) {
    return '';
  }

  // Take first letter of each word (uppercase)
  let abbrev = words.map((w) => w[0]?.toUpperCase() || '').join('');

  // Extract trailing digits (last 2 digits if present)
  const digitMatch = trimmedName.match(/(\d{1,2})$/);
  if (digitMatch) {
    abbrev += digitMatch[1];
  }

  // Ensure minimum length of 3
  if (abbrev.length < 3 && words[0]) {
    const firstWord = words[0].toUpperCase();
    // Pad with characters from first word
    const neededChars = 3 - abbrev.length;
    const paddingChars = firstWord.substring(1, 1 + neededChars);
    // Insert padding after first character
    abbrev = abbrev[0] + paddingChars + abbrev.substring(1);
  }

  // Ensure maximum length of 8
  if (abbrev.length > 8) {
    abbrev = abbrev.substring(0, 8);
  }

  return abbrev;
}

// =============================================================================
// HOOK
// =============================================================================

export interface UseProjectNameFormReturn {
  // Form values
  fullName: string;
  shortName: string;
  copyright: string;

  // Validation state
  validationErrors: Record<string, string>;
  isValid: boolean;

  // UI state
  isDirty: boolean;
  isSubmitting: boolean;
  isShortNameEditable: boolean;
  showWarningBanner: boolean;
  userTypedShortName: boolean;

  // Handlers
  handleFullNameChange: (value: string) => void;
  handleShortNameChange: (value: string) => void;
  handleShortNameKeyPress: () => void;
  handleCopyrightChange: (value: string) => void;
  handleSubmit: () => ProjectNameFormOutput;
  handleCancel: () => ProjectNameFormOutput;

  // Validation
  validateForm: () => boolean;
}

/**
 * Custom hook for managing Project Name form state
 *
 * Implements behaviors:
 *
 * - BHV-200: Auto-generate short name from full name
 * - BHV-201: Validate short name
 * - BHV-202: Replace backslash with forward slash
 * - BHV-203: Track user typing in short name field
 */
export function useProjectNameForm(input: ProjectNameFormInput): UseProjectNameFormReturn {
  // Form values
  const [fullName, setFullName] = useState(input.fullName);
  const [shortName, setShortName] = useState(input.shortName);
  const [copyright, setCopyright] = useState(input.copyright);

  // Track if user has manually edited short name (BHV-203)
  const [userTypedShortName, setUserTypedShortName] = useState(false);

  // UI state
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Computed state
  const isShortNameEditable = useMemo(
    () => input.allowShortNameEdit && !input.isRestricted && input.mode === 'create',
    [input.allowShortNameEdit, input.isRestricted, input.mode],
  );

  const showWarningBanner = useMemo(() => input.isRestricted, [input.isRestricted]);

  // Validate the form
  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    // Validate full name
    const fullNameValidation = validateFullName(fullName);
    if (!fullNameValidation.isValid && fullNameValidation.error) {
      errors.fullName = fullNameValidation.error;
    }

    // Validate short name
    const shortNameValidation = validateShortName(shortName, input.existingProjectNames);
    if (!shortNameValidation.isValid && shortNameValidation.error) {
      errors.shortName = shortNameValidation.error;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [fullName, shortName, input.existingProjectNames]);

  // Check if form is valid
  const isValid = useMemo(() => {
    if (input.isRestricted) return false;

    const fullNameValid = validateFullName(fullName).isValid;
    const shortNameValid = validateShortName(shortName, input.existingProjectNames).isValid;

    return fullNameValid && shortNameValid;
  }, [fullName, shortName, input.existingProjectNames, input.isRestricted]);

  // Handle full name change (BHV-202: backslash replacement, BHV-200: auto-generation)
  const handleFullNameChange = useCallback(
    (value: string) => {
      // Sanitize: replace backslash with forward slash (BHV-202)
      const sanitized = sanitizeFullName(value);
      setFullName(sanitized);
      setIsDirty(true);

      // Auto-generate short name if user hasn't manually edited (BHV-200)
      if (!userTypedShortName && isShortNameEditable) {
        const generated = generateShortName(sanitized);
        setShortName(generated);
      }

      // Clear full name error on change
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated.fullName;
        return updated;
      });
    },
    [userTypedShortName, isShortNameEditable],
  );

  // Handle short name keypress - marks that user has typed (BHV-203)
  const handleShortNameKeyPress = useCallback(() => {
    if (isShortNameEditable && !userTypedShortName) {
      setUserTypedShortName(true);
    }
  }, [isShortNameEditable, userTypedShortName]);

  // Handle short name change
  const handleShortNameChange = useCallback(
    (value: string) => {
      if (!isShortNameEditable) return;

      // Mark as user-typed
      if (!userTypedShortName) {
        setUserTypedShortName(true);
      }

      setShortName(value);
      setIsDirty(true);

      // Validate on change
      const validation = validateShortName(value, input.existingProjectNames);
      setValidationErrors((prev) => {
        const updated = { ...prev };
        if (validation.isValid) {
          delete updated.shortName;
        } else if (validation.error) {
          updated.shortName = validation.error;
        }
        return updated;
      });
    },
    [isShortNameEditable, userTypedShortName, input.existingProjectNames],
  );

  // Handle copyright change
  const handleCopyrightChange = useCallback((value: string) => {
    setCopyright(value);
    setIsDirty(true);
  }, []);

  // Handle submit
  const handleSubmit = useCallback((): ProjectNameFormOutput => {
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return { action: 'cancel' };
    }

    return {
      action: 'submit',
      nameData: {
        fullName,
        shortName,
        copyright,
      },
    };
  }, [validateForm, fullName, shortName, copyright]);

  // Handle cancel
  const handleCancel = useCallback((): ProjectNameFormOutput => {
    return { action: 'cancel' };
  }, []);

  // Re-validate when dependencies change
  useEffect(() => {
    if (isDirty) {
      validateForm();
    }
  }, [isDirty, validateForm]);

  return {
    // Form values
    fullName,
    shortName,
    copyright,

    // Validation state
    validationErrors,
    isValid,

    // UI state
    isDirty,
    isSubmitting,
    isShortNameEditable,
    showWarningBanner,
    userTypedShortName,

    // Handlers
    handleFullNameChange,
    handleShortNameChange,
    handleShortNameKeyPress,
    handleCopyrightChange,
    handleSubmit,
    handleCancel,

    // Validation
    validateForm,
  };
}
