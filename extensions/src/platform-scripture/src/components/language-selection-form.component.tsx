import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Alert,
  AlertDescription,
  Input,
  Button,
  Label,
  cn,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { AlertTriangle, Search } from 'lucide-react';
import {
  FormValidationRibbon,
  FormValidationError,
  ValidationFieldWrapper,
  useFormValidation,
} from './form-validation.component';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

/**
 * Language information from the language database. Matches LanguageInfo from
 * ui-spec-language-selection-form.md
 */
export interface LanguageInfo {
  /** ISO 639-3 code */
  code: string;
  /** Primary language name */
  name: string;
  /** Alternative names for the language */
  altNames: string[];
  /** Common scripts for this language (ISO 15924 codes) */
  scripts: string[];
  /** Common regions for this language (ISO 3166-1 alpha-2 codes) */
  regions: string[];
}

/** Script option for dropdown. */
export interface ScriptOption {
  /** ISO 15924 code (4 letters) */
  code: string;
  /** Display name (e.g., "Latin") */
  name: string;
}

/** Region option for dropdown. */
export interface RegionOption {
  /** ISO 3166-1 alpha-2 code */
  code: string;
  /** Display name (e.g., "United States") */
  name: string;
}

/**
 * Props passed to LanguageSelectionForm. Based on ui-state-contracts.md LanguageSelectionFormProps
 * interface.
 */
export interface LanguageSelectionFormProps {
  /** Current language ID (BCP-47 tag) if editing */
  currentLanguageId?: string;
  /** Current language name if editing */
  currentLanguageName?: string;
  /** Project name (shown in dialog title) */
  projectName?: string;
  /** Whether this is creating a new language entry */
  isNewLanguage: boolean;
  /** Whether the project is registered with the Paratext Registry */
  isRegistered: boolean;
  /** List of available languages to choose from */
  languages: LanguageInfo[];
  /** List of available script options */
  scriptOptions: ScriptOption[];
  /** List of available region options */
  regionOptions: RegionOption[];
  /** Callback when form is submitted with selected language */
  onSubmit?: (result: LanguageSelectionResult) => void;
  /** Callback when form is cancelled */
  onCancel?: () => void;
  /** Optional external validation function for language name uniqueness check */
  validateLanguageNameUniqueness?: (languageName: string) => Promise<boolean>;
  /** Optional localized strings for the component */
  localizedStrings?: LanguageSelectionFormLocalizedStrings;
  /** Optional CSS class name for styling */
  className?: string;
}

/** Result returned when form is submitted successfully. */
export interface LanguageSelectionResult {
  /** Full BCP-47 language tag */
  languageId: string;
  /** User-specified display name for the language */
  languageName: string;
}

/** Localized strings for the LanguageSelectionForm component. */
export interface LanguageSelectionFormLocalizedStrings {
  /** Dialog title */
  '%language_dialog_title%'?: string;
  /** Dialog title with project name */
  '%language_dialog_title_with_name%'?: string;
  /** Search placeholder */
  '%language_search_placeholder%'?: string;
  /** Code column header */
  '%language_column_code%'?: string;
  /** Name column header */
  '%language_column_name%'?: string;
  /** Language name label */
  '%language_name_label%'?: string;
  /** Script label */
  '%language_script_label%'?: string;
  /** Region label */
  '%language_region_label%'?: string;
  /** Variant label */
  '%language_variant_label%'?: string;
  /** Selected preview label */
  '%language_selected_label%'?: string;
  /** Registry warning message */
  '%language_registry_warning%'?: string;
  /** No script selected */
  '%language_no_script%'?: string;
  /** No region selected */
  '%language_no_region%'?: string;
  /** No variant */
  '%language_no_variant%'?: string;
  /** OK button text */
  '%language_ok%'?: string;
  /** Cancel button text */
  '%language_cancel%'?: string;
  /** Error: Name required */
  '%language_error_name_required%'?: string;
  /** Error: Name not unique */
  '%language_error_name_not_unique%'?: string;
  /** Error: Invalid variant chars */
  '%language_error_variant_invalid%'?: string;
  /** Error: No language selected */
  '%language_error_no_selection%'?: string;
  /** No results found */
  '%language_no_results%'?: string;
}

/** Keys for localizing language selection form components. */
export const LANGUAGE_SELECTION_FORM_STRING_KEYS = Object.freeze([
  '%language_dialog_title%',
  '%language_dialog_title_with_name%',
  '%language_search_placeholder%',
  '%language_column_code%',
  '%language_column_name%',
  '%language_name_label%',
  '%language_script_label%',
  '%language_region_label%',
  '%language_variant_label%',
  '%language_selected_label%',
  '%language_registry_warning%',
  '%language_no_script%',
  '%language_no_region%',
  '%language_no_variant%',
  '%language_ok%',
  '%language_cancel%',
  '%language_error_name_required%',
  '%language_error_name_not_unique%',
  '%language_error_variant_invalid%',
  '%language_error_no_selection%',
  '%language_no_results%',
] as const);

// =====================================================
// VALIDATION CONSTANTS
// =====================================================

/** Valid characters pattern for variant (a-z, 0-9 only per VAL-012). */
const VARIANT_VALID_CHARS_PATTERN = /^[a-z0-9]*$/;

/** Height of each row in the language list (for virtualization). */
const LIST_ROW_HEIGHT = 36;

/** Number of visible rows in the language list. */
const LIST_VISIBLE_ROWS = 8;

/** Debounce delay for search input (ms). */
const SEARCH_DEBOUNCE_MS = 300;

// =====================================================
// VALIDATION FUNCTIONS
// =====================================================

/** Validation error codes matching data-contracts.md error handling tables. */
export type LanguageValidationError =
  | 'Language_NameRequired'
  | 'Language_NameNotUnique'
  | 'Language_VariantInvalidChars'
  | 'Language_NoSelection';

/**
 * Validates a language name against all validation rules.
 *
 * @param languageName - The language name to validate
 * @returns Error code if invalid, undefined if valid
 */
export function validateLanguageName(languageName: string): LanguageValidationError | undefined {
  // VAL-010: Language name cannot be blank
  if (!languageName || languageName.trim().length === 0) {
    return 'Language_NameRequired';
  }

  return undefined;
}

/**
 * Validates a variant string against the character set rules.
 *
 * @param variant - The variant string to validate
 * @returns Error code if invalid, undefined if valid
 */
export function validateVariant(variant: string): LanguageValidationError | undefined {
  // VAL-012: Variant characters must be a-z or 0-9
  if (variant && !VARIANT_VALID_CHARS_PATTERN.test(variant)) {
    return 'Language_VariantInvalidChars';
  }

  return undefined;
}

// =====================================================
// BCP-47 ASSEMBLY
// =====================================================

/**
 * Assembles a full BCP-47 language code from components.
 *
 * @example AssembleBcp47("eng", "Latn", "US", "") // "eng-Latn-US" assembleBcp47("fra", undefined,
 * "CA", "fonipa") // "fra-CA-fonipa"
 *
 * @param baseCode - ISO 639-3 base code (e.g., "eng")
 * @param script - Optional ISO 15924 script code (e.g., "Latn")
 * @param region - Optional ISO 3166-1 alpha-2 region code (e.g., "US")
 * @param variant - Optional variant (e.g., "fonipa")
 * @returns Full BCP-47 tag
 */
export function assembleBcp47(
  baseCode: string,
  script: string | undefined,
  region: string | undefined,
  variant: string | undefined,
): string {
  let code = baseCode;

  if (script) {
    code += `-${script}`;
  }

  if (region) {
    code += `-${region}`;
  }

  if (variant) {
    code += `-${variant}`;
  }

  return code;
}

/**
 * Parses a BCP-47 language code into components.
 *
 * @param languageId - Full BCP-47 tag
 * @returns Object with baseCode, script, region, variant
 */
export function parseBcp47(languageId: string): {
  baseCode: string;
  script: string | undefined;
  region: string | undefined;
  variant: string | undefined;
} {
  const parts = languageId.split('-');
  const baseCode = parts[0] || '';

  let script: string | undefined;
  let region: string | undefined;
  let variant: string | undefined;

  // Parse remaining parts
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];

    // Script: 4 letters, first uppercase (e.g., "Latn")
    if (!script && part.length === 4 && /^[A-Z][a-z]{3}$/.test(part)) {
      script = part;
    }
    // Region: 2 uppercase letters (e.g., "US") or 3 digits (e.g., "001")
    else if (!region && (/^[A-Z]{2}$/.test(part) || /^\d{3}$/.test(part))) {
      region = part;
    }
    // Variant: everything else
    else {
      variant = variant ? `${variant}-${part}` : part;
    }
  }

  return { baseCode, script, region, variant };
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
  errorCode: LanguageValidationError,
  localizedStrings?: LanguageSelectionFormLocalizedStrings,
): string {
  const defaultMessages: Record<LanguageValidationError, string> = {
    Language_NameRequired: 'Language name is required',
    Language_NameNotUnique: 'This language name is already in use by another project',
    Language_VariantInvalidChars:
      'Variant can only contain lowercase letters (a-z) and numbers (0-9)',
    Language_NoSelection: 'Please select a language from the list',
  };

  const localizationKeyMap: Record<
    LanguageValidationError,
    keyof LanguageSelectionFormLocalizedStrings
  > = {
    Language_NameRequired: '%language_error_name_required%',
    Language_NameNotUnique: '%language_error_name_not_unique%',
    Language_VariantInvalidChars: '%language_error_variant_invalid%',
    Language_NoSelection: '%language_error_no_selection%',
  };

  const key = localizationKeyMap[errorCode];
  return localizedStrings?.[key] ?? defaultMessages[errorCode];
}

// =====================================================
// COMPONENT
// =====================================================

/**
 * Language Selection Form component. Allows selecting a language from a searchable list and
 * customizing the BCP-47 tag with script, region, and variant components.
 *
 * @remarks
 * This component implements behaviors:
 *
 * - BHV-009: Language ID validated for BCP-47 compliance and non-reserved status
 * - BHV-032: Full language selection UI with search, script/region/variant customization, uniqueness
 *   validation
 *
 * @example
 *
 * ```tsx
 * <LanguageSelectionForm
 *   languages={languageList}
 *   scriptOptions={scripts}
 *   regionOptions={regions}
 *   isNewLanguage={false}
 *   isRegistered={false}
 *   currentLanguageId="eng"
 *   onSubmit={(result) => console.log(result)}
 *   onCancel={() => console.log('Cancelled')}
 * />;
 * ```
 */
export function LanguageSelectionForm({
  currentLanguageId,
  currentLanguageName,
  projectName,
  // isNewLanguage is available for future use to customize behavior for new vs existing languages
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isNewLanguage: _isNewLanguage,
  isRegistered,
  languages,
  scriptOptions,
  regionOptions,
  onSubmit,
  onCancel,
  validateLanguageNameUniqueness,
  localizedStrings,
  className,
}: LanguageSelectionFormProps) {
  // Parse initial values from currentLanguageId
  const initialParsed = useMemo(() => {
    if (!currentLanguageId) {
      return { baseCode: '', script: undefined, region: undefined, variant: undefined };
    }
    return parseBcp47(currentLanguageId);
  }, [currentLanguageId]);

  // Form state
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string | undefined>(
    initialParsed.baseCode || undefined,
  );
  const [languageName, setLanguageName] = useState(currentLanguageName || '');
  const [script, setScript] = useState<string | undefined>(initialParsed.script);
  const [region, setRegion] = useState<string | undefined>(initialParsed.region);
  const [variant, setVariant] = useState(initialParsed.variant || '');

  // List scroll state for virtualization
  const [scrollTop, setScrollTop] = useState(0);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Debounce timer for search
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Debounce timer for uniqueness check
  const uniquenessCheckTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Validation state
  const [languageNameError, setLanguageNameError] = useState<FormValidationError | undefined>(
    undefined,
  );
  const [variantError, setVariantError] = useState<FormValidationError | undefined>(undefined);
  const [selectionError, setSelectionError] = useState<FormValidationError | undefined>(undefined);
  const [isCheckingUniqueness, setIsCheckingUniqueness] = useState(false);

  // Track if values have changed from initial (for registry warning)
  const hasChanged = useMemo(() => {
    if (!currentLanguageId) return false;
    const newCode = assembleBcp47(selectedLanguageCode || '', script, region, variant);
    return newCode !== currentLanguageId || languageName !== currentLanguageName;
  }, [
    currentLanguageId,
    currentLanguageName,
    selectedLanguageCode,
    script,
    region,
    variant,
    languageName,
  ]);

  // Show registry warning when registered project language is changed
  const showRegistryWarning = useMemo(() => isRegistered && hasChanged, [isRegistered, hasChanged]);

  // Form validation hook
  const { registerFieldRef, focusFirstError, createErrorClickHandler } = useFormValidation();

  // Collect all validation errors
  const validationErrors = useMemo(() => {
    const errors: FormValidationError[] = [];
    if (selectionError) errors.push(selectionError);
    if (languageNameError) errors.push(languageNameError);
    if (variantError) errors.push(variantError);
    return errors;
  }, [selectionError, languageNameError, variantError]);

  // Can submit when no validation errors and language is selected
  const canSubmit = useMemo(
    () =>
      validationErrors.length === 0 && selectedLanguageCode !== undefined && !isCheckingUniqueness,
    [validationErrors.length, selectedLanguageCode, isCheckingUniqueness],
  );

  // Filtered languages based on search query
  const filteredLanguages = useMemo(() => {
    if (!debouncedSearchQuery) {
      return languages;
    }

    const query = debouncedSearchQuery.toLowerCase();
    return languages.filter((lang) => {
      // Match code (exact or prefix)
      if (lang.code.toLowerCase().startsWith(query)) {
        return true;
      }

      // Match primary name (contains)
      if (lang.name.toLowerCase().includes(query)) {
        return true;
      }

      // Match alternative names (contains)
      if (lang.altNames.some((alt) => alt.toLowerCase().includes(query))) {
        return true;
      }

      return false;
    });
  }, [languages, debouncedSearchQuery]);

  // Computed BCP-47 code
  const fullLanguageCode = useMemo(() => {
    if (!selectedLanguageCode) return '';
    return assembleBcp47(selectedLanguageCode, script, region, variant);
  }, [selectedLanguageCode, script, region, variant]);

  // Selected language display
  const selectedLanguageInfo = useMemo(() => {
    if (!selectedLanguageCode) return undefined;
    return languages.find((lang) => lang.code === selectedLanguageCode);
  }, [languages, selectedLanguageCode]);

  // Available scripts for selected language
  const availableScripts = useMemo(() => {
    if (!selectedLanguageInfo) return scriptOptions;
    // Prioritize scripts associated with the selected language
    const langScripts = new Set(selectedLanguageInfo.scripts);
    const prioritized = scriptOptions.filter((s) => langScripts.has(s.code));
    const others = scriptOptions.filter((s) => !langScripts.has(s.code));
    return [...prioritized, ...others];
  }, [selectedLanguageInfo, scriptOptions]);

  // Available regions for selected language
  const availableRegions = useMemo(() => {
    if (!selectedLanguageInfo) return regionOptions;
    // Prioritize regions associated with the selected language
    const langRegions = new Set(selectedLanguageInfo.regions);
    const prioritized = regionOptions.filter((r) => langRegions.has(r.code));
    const others = regionOptions.filter((r) => !langRegions.has(r.code));
    return [...prioritized, ...others];
  }, [selectedLanguageInfo, regionOptions]);

  // Virtualization calculations
  const totalHeight = filteredLanguages.length * LIST_ROW_HEIGHT;
  const startIndex = Math.floor(scrollTop / LIST_ROW_HEIGHT);
  const endIndex = Math.min(
    startIndex + LIST_VISIBLE_ROWS + 2, // Buffer rows
    filteredLanguages.length,
  );
  const visibleLanguages = filteredLanguages.slice(startIndex, endIndex);
  const offsetY = startIndex * LIST_ROW_HEIGHT;

  // Debounce search query
  useEffect(() => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, [searchQuery]);

  // Validate language name
  const validateLanguageNameField = useCallback(
    async (value: string) => {
      // Clear any pending uniqueness check
      if (uniquenessCheckTimerRef.current) {
        clearTimeout(uniquenessCheckTimerRef.current);
        uniquenessCheckTimerRef.current = undefined;
      }

      // Local validation first
      const error = validateLanguageName(value);
      if (error) {
        setLanguageNameError({
          field: 'languageName',
          code: error,
          message: getErrorMessage(error, localizedStrings),
        });
        return;
      }

      // Check uniqueness if validation function provided
      if (validateLanguageNameUniqueness) {
        setIsCheckingUniqueness(true);

        uniquenessCheckTimerRef.current = setTimeout(async () => {
          try {
            const isUnique = await validateLanguageNameUniqueness(value);
            if (!isUnique) {
              setLanguageNameError({
                field: 'languageName',
                code: 'Language_NameNotUnique',
                message: getErrorMessage('Language_NameNotUnique', localizedStrings),
              });
            } else {
              setLanguageNameError(undefined);
            }
          } catch {
            // If uniqueness check fails, assume it's unique (fail open)
            setLanguageNameError(undefined);
          } finally {
            setIsCheckingUniqueness(false);
          }
        }, SEARCH_DEBOUNCE_MS);
      } else {
        setLanguageNameError(undefined);
      }
    },
    [validateLanguageNameUniqueness, localizedStrings],
  );

  // Validate variant
  const validateVariantField = useCallback(
    (value: string) => {
      const error = validateVariant(value);
      if (error) {
        setVariantError({
          field: 'variant',
          code: error,
          message: getErrorMessage(error, localizedStrings),
        });
      } else {
        setVariantError(undefined);
      }
    },
    [localizedStrings],
  );

  // Validate selection
  const validateSelection = useCallback(() => {
    if (!selectedLanguageCode) {
      setSelectionError({
        field: 'languageList',
        code: 'Language_NoSelection',
        message: getErrorMessage('Language_NoSelection', localizedStrings),
      });
      return false;
    }
    setSelectionError(undefined);
    return true;
  }, [selectedLanguageCode, localizedStrings]);

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  // Handle language selection
  const handleLanguageSelect = useCallback(
    (langCode: string) => {
      setSelectedLanguageCode(langCode);
      setSelectionError(undefined);

      // Set default language name from selected language
      const lang = languages.find((l) => l.code === langCode);
      if (lang) {
        setLanguageName(lang.name);
        validateLanguageNameField(lang.name);
      }
    },
    [languages, validateLanguageNameField],
  );

  // Handle language name change
  const handleLanguageNameChange = useCallback(
    (value: string) => {
      setLanguageName(value);
      validateLanguageNameField(value);
    },
    [validateLanguageNameField],
  );

  // Handle script change
  const handleScriptChange = useCallback((value: string) => {
    setScript(value === 'none' ? undefined : value);
  }, []);

  // Handle region change
  const handleRegionChange = useCallback((value: string) => {
    setRegion(value === 'none' ? undefined : value);
  }, []);

  // Handle variant change
  const handleVariantChange = useCallback(
    (value: string) => {
      setVariant(value);
      validateVariantField(value);
    },
    [validateVariantField],
  );

  // Handle scroll for virtualization
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(() => {
    // Validate all fields
    validateSelection();
    validateLanguageNameField(languageName);
    validateVariantField(variant);

    // Focus first error if any
    if (validationErrors.length > 0) {
      focusFirstError(validationErrors);
      return;
    }

    // Additional check for selection
    if (!selectedLanguageCode) {
      setSelectionError({
        field: 'languageList',
        code: 'Language_NoSelection',
        message: getErrorMessage('Language_NoSelection', localizedStrings),
      });
      return;
    }

    // Call onSubmit callback
    if (onSubmit) {
      onSubmit({
        languageId: fullLanguageCode,
        languageName,
      });
    }
  }, [
    selectedLanguageCode,
    fullLanguageCode,
    languageName,
    variant,
    validationErrors,
    validateSelection,
    validateLanguageNameField,
    validateVariantField,
    focusFirstError,
    onSubmit,
    localizedStrings,
  ]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  // Initial validation on mount
  useEffect(() => {
    if (currentLanguageName) {
      validateLanguageNameField(currentLanguageName);
    }
    if (initialParsed.variant) {
      validateVariantField(initialParsed.variant);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
      if (uniquenessCheckTimerRef.current) {
        clearTimeout(uniquenessCheckTimerRef.current);
      }
    };
  }, []);

  // Localized strings with defaults
  const dialogTitle = projectName
    ? (localizedStrings?.['%language_dialog_title_with_name%']?.replace('{name}', projectName) ??
      `Choose Language Identifier for ${projectName}`)
    : (localizedStrings?.['%language_dialog_title%'] ?? 'Choose Language Identifier');
  const searchPlaceholder =
    localizedStrings?.['%language_search_placeholder%'] ?? 'Search languages...';
  const codeColumnHeader = localizedStrings?.['%language_column_code%'] ?? 'Code';
  const nameColumnHeader = localizedStrings?.['%language_column_name%'] ?? 'Language Name';
  const languageNameLabel = localizedStrings?.['%language_name_label%'] ?? 'Language name:';
  const scriptLabel = localizedStrings?.['%language_script_label%'] ?? 'Script:';
  const regionLabel = localizedStrings?.['%language_region_label%'] ?? 'Region:';
  const variantLabel = localizedStrings?.['%language_variant_label%'] ?? 'Variant:';
  const selectedLabel = localizedStrings?.['%language_selected_label%'] ?? 'Selected:';
  const registryWarning =
    localizedStrings?.['%language_registry_warning%'] ??
    'Changing the language of a registered project may affect how it appears in the Paratext Registry.';
  const noScript = localizedStrings?.['%language_no_script%'] ?? '(none)';
  const noRegion = localizedStrings?.['%language_no_region%'] ?? '(none)';
  const okText = localizedStrings?.['%language_ok%'] ?? 'OK';
  const cancelText = localizedStrings?.['%language_cancel%'] ?? 'Cancel';
  const noResultsText = localizedStrings?.['%language_no_results%'] ?? 'No languages found';

  return (
    <div className={cn('tw-flex tw-flex-col tw-gap-4 tw-min-w-[300px]', className)}>
      {/* Dialog Title */}
      <h2 className="tw-text-lg tw-font-semibold">{dialogTitle}</h2>

      {/* Validation Errors Ribbon */}
      <FormValidationRibbon errors={validationErrors} onErrorClick={createErrorClickHandler()} />

      {/* Search Box */}
      <div className="tw-relative">
        <Search className="tw-absolute tw-left-3 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-h-4 tw-w-4 tw-text-muted-foreground" />
        <Input
          id="languageSearch"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="tw-pl-10"
          aria-label={searchPlaceholder}
        />
      </div>

      {/* Language List */}
      <ValidationFieldWrapper
        fieldId="languageList"
        error={selectionError ?? undefined}
        registerRef={registerFieldRef}
        className="tw-flex tw-flex-col tw-gap-1"
      >
        {/* Column Headers */}
        <div className="tw-flex tw-gap-2 tw-px-2 tw-py-1 tw-bg-muted tw-font-medium tw-text-sm tw-border-b">
          <div className="tw-w-16">{codeColumnHeader}</div>
          <div className="tw-flex-1">{nameColumnHeader}</div>
        </div>

        {/* Scrollable List with Virtualization */}
        <div
          ref={listContainerRef}
          className={cn(
            'tw-overflow-auto tw-border tw-rounded',
            selectionError && 'tw-border-destructive',
          )}
          style={{ height: LIST_VISIBLE_ROWS * LIST_ROW_HEIGHT }}
          onScroll={handleScroll}
          role="listbox"
          aria-label="Language list"
          tabIndex={0}
        >
          {filteredLanguages.length === 0 ? (
            <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground">
              {noResultsText}
            </div>
          ) : (
            <div style={{ height: totalHeight, position: 'relative' }}>
              <div style={{ transform: `translateY(${offsetY}px)` }}>
                {visibleLanguages.map((lang) => (
                  <div
                    key={lang.code}
                    className={cn(
                      'tw-flex tw-gap-2 tw-px-2 tw-cursor-pointer tw-items-center',
                      'hover:tw-bg-accent',
                      selectedLanguageCode === lang.code &&
                        'tw-bg-primary tw-text-primary-foreground',
                    )}
                    style={{ height: LIST_ROW_HEIGHT }}
                    role="option"
                    aria-selected={selectedLanguageCode === lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLanguageSelect(lang.code);
                      }
                    }}
                    tabIndex={-1}
                  >
                    <div className="tw-w-16 tw-font-mono tw-text-sm">{lang.code}</div>
                    <div className="tw-flex-1 tw-truncate">{lang.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ValidationFieldWrapper>

      {/* Language Name Field */}
      <ValidationFieldWrapper
        fieldId="languageName"
        error={languageNameError ?? undefined}
        registerRef={registerFieldRef}
        className="tw-flex tw-flex-col tw-gap-1"
      >
        <Label htmlFor="languageName">{languageNameLabel}</Label>
        <Input
          id="languageName"
          value={languageName}
          onChange={(e) => handleLanguageNameChange(e.target.value)}
          className={cn({ 'tw-border-destructive': languageNameError })}
          aria-describedby={languageNameError ? 'languageName-error' : undefined}
          aria-invalid={!!languageNameError}
        />
        {isCheckingUniqueness && (
          <span className="tw-text-sm tw-text-muted-foreground">Checking availability...</span>
        )}
      </ValidationFieldWrapper>

      {/* BCP-47 Component Selectors */}
      <div className="tw-grid tw-grid-cols-3 tw-gap-2">
        {/* Script */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="script">{scriptLabel}</Label>
          <Select
            value={script || 'none'}
            onValueChange={handleScriptChange}
            disabled={!selectedLanguageCode}
          >
            <SelectTrigger id="script">
              <SelectValue placeholder={noScript} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{noScript}</SelectItem>
              {availableScripts.map((s) => (
                <SelectItem key={s.code} value={s.code}>
                  {s.code} - {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Region */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="region">{regionLabel}</Label>
          <Select
            value={region || 'none'}
            onValueChange={handleRegionChange}
            disabled={!selectedLanguageCode}
          >
            <SelectTrigger id="region">
              <SelectValue placeholder={noRegion} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{noRegion}</SelectItem>
              {availableRegions.map((r) => (
                <SelectItem key={r.code} value={r.code}>
                  {r.code} - {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Variant */}
        <ValidationFieldWrapper
          fieldId="variant"
          error={variantError ?? undefined}
          registerRef={registerFieldRef}
          className="tw-flex tw-flex-col tw-gap-1"
        >
          <Label htmlFor="variant">{variantLabel}</Label>
          <Input
            id="variant"
            value={variant}
            onChange={(e) => handleVariantChange(e.target.value.toLowerCase())}
            placeholder="fonipa"
            disabled={!selectedLanguageCode}
            className={cn({ 'tw-border-destructive': variantError })}
            aria-describedby={variantError ? 'variant-error' : undefined}
            aria-invalid={!!variantError}
          />
        </ValidationFieldWrapper>
      </div>

      {/* Selected Preview */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-p-2 tw-bg-muted tw-rounded">
        <span className="tw-font-medium">{selectedLabel}</span>
        {selectedLanguageInfo ? (
          <span>
            {languageName || selectedLanguageInfo.name} ({fullLanguageCode})
          </span>
        ) : (
          <span className="tw-text-muted-foreground">-</span>
        )}
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

export default LanguageSelectionForm;
