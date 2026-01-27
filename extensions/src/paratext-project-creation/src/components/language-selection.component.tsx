import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  Button,
  cn,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { type KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import type {
  LanguageSelectionFormProps,
  LanguageSelectionResult,
  LanguageInfo,
  ScriptOption,
  RegionOption,
  VariantOption,
  ValidationResult,
} from 'paratext-project-creation';

/** Debounce delay in ms for search queries. */
const SEARCH_DEBOUNCE_MS = 300;

/** Placeholder value for "none selected" in dropdowns. */
const NONE_VALUE = '__none__';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%paratextProjectCreation_languageSelection_title%',
  '%paratextProjectCreation_languageSelection_search%',
  '%paratextProjectCreation_languageSelection_code%',
  '%paratextProjectCreation_languageSelection_languageName%',
  '%paratextProjectCreation_languageSelection_nameLabel%',
  '%paratextProjectCreation_languageSelection_script%',
  '%paratextProjectCreation_languageSelection_region%',
  '%paratextProjectCreation_languageSelection_variant%',
  '%paratextProjectCreation_languageSelection_selected%',
  '%paratextProjectCreation_languageSelection_ok%',
  '%paratextProjectCreation_languageSelection_cancel%',
  '%paratextProjectCreation_languageSelection_loading%',
  '%paratextProjectCreation_languageSelection_registryWarning%',
  '%paratextProjectCreation_languageSelection_nameRequired%',
  '%paratextProjectCreation_languageSelection_variantInvalidChars%',
  '%paratextProjectCreation_languageSelection_none%',
];

/** Known script options. Populated from selected language data. */
const COMMON_SCRIPTS: ScriptOption[] = [
  { code: 'Latn', name: 'Latin' },
  { code: 'Cyrl', name: 'Cyrillic' },
  { code: 'Arab', name: 'Arabic' },
  { code: 'Deva', name: 'Devanagari' },
  { code: 'Hans', name: 'Simplified Chinese' },
  { code: 'Hant', name: 'Traditional Chinese' },
  { code: 'Grek', name: 'Greek' },
  { code: 'Hebr', name: 'Hebrew' },
  { code: 'Thai', name: 'Thai' },
  { code: 'Ethi', name: 'Ethiopic' },
];

/** Known region options. */
const COMMON_REGIONS: RegionOption[] = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'IN', name: 'India' },
  { code: 'CN', name: 'China' },
];

/** Variant regex: only lowercase alphanumeric. */
const VARIANT_REGEX = /^[a-z0-9]*$/;

/**
 * Parse a BCP-47 language tag into its components.
 *
 * @param tag The BCP-47 tag (e.g., "eng-Latn-US-fonipa")
 * @returns Parsed components
 */
function parseBcp47(tag: string): {
  baseCode: string;
  script: string | undefined;
  region: string | undefined;
  variant: string | undefined;
} {
  const parts = tag.split('-');
  const baseCode = parts[0];
  let script: string | undefined;
  let region: string | undefined;
  let variant: string | undefined;

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    // Script: exactly 4 letters, first uppercase
    if (!script && part.length === 4 && /^[A-Z][a-z]{3}$/.test(part)) {
      script = part;
    }
    // Region: exactly 2 uppercase letters
    else if (!region && part.length === 2 && /^[A-Z]{2}$/.test(part)) {
      region = part;
    }
    // Variant: everything else
    else {
      variant = part;
    }
  }

  return { baseCode, script, region, variant };
}

/**
 * Assemble a BCP-47 language tag from components.
 *
 * @param baseCode ISO 639-3 base code
 * @param script Optional script subtag
 * @param region Optional region subtag
 * @param variant Optional variant subtag
 * @returns Full BCP-47 tag
 */
function assembleBcp47(
  baseCode: string,
  script?: string | null,
  region?: string | null,
  variant?: string | null,
): string {
  let tag = baseCode;
  if (script) tag += `-${script}`;
  if (region) tag += `-${region}`;
  if (variant) tag += `-${variant}`;
  return tag;
}

/**
 * Modal dialog for selecting or creating a language identifier for a project. Provides a searchable
 * list of known languages with BCP-47 component selectors for script, region, and variant. For
 * registered projects, displays a warning when the language is changed.
 */
export function LanguageSelectionForm({
  currentLanguageId,
  projectName,
  isNewLanguage,
  isRegistered,
  onConfirm,
  onCancel,
}: LanguageSelectionFormProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // --- State ---
  const [isLoading, setIsLoading] = useState(true);
  const [languages, setLanguages] = useState<LanguageInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string | null>(null);
  const [chosenLanguageName, setChosenLanguageName] = useState('');
  const [script, setScript] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>(null);

  const [languageNameError, setLanguageNameError] = useState<string | null>(null);
  const [serverValidationError, setServerValidationError] = useState<string | null>(null);
  const [variantError, setVariantError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const isMountedRef = useRef(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const initialLanguageIdRef = useRef(currentLanguageId);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // --- Debounced search ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // --- Fetch languages ---
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        const result = await papi.commands.sendCommand(
          'paratextProjectCreation.getAvailableLanguages',
          debouncedQuery || undefined,
        );
        if (!cancelled && isMountedRef.current) {
          // Map LanguageSelection[] to LanguageInfo[] for display
          const languageInfos: LanguageInfo[] = result.map((lang) => ({
            code: lang.baseCode,
            name: lang.languageName,
            altNames: [],
            scripts: lang.script ? [lang.script] : [],
            regions: lang.region ? [lang.region] : [],
          }));
          setLanguages(languageInfos);
        }
      } catch (err: unknown) {
        logger.warn(`Failed to fetch languages: ${getErrorMessage(err)}`);
        if (!cancelled && isMountedRef.current) {
          setLanguages([]);
        }
      } finally {
        if (!cancelled && isMountedRef.current) {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  // --- Parse initial language ID ---
  useEffect(() => {
    if (currentLanguageId && !isNewLanguage) {
      const parsed = parseBcp47(currentLanguageId);
      setSelectedLanguageCode(parsed.baseCode);
      setScript(parsed.script ?? null);
      setRegion(parsed.region ?? null);
      setVariant(parsed.variant ?? null);
    }
  }, [currentLanguageId, isNewLanguage]);

  // --- Focus search on mount ---
  useEffect(() => {
    if (!isLoading) {
      searchInputRef.current?.focus();
    }
  }, [isLoading]);

  // --- Set language name when selection changes ---
  useEffect(() => {
    if (selectedLanguageCode) {
      const found = languages.find((l) => l.code === selectedLanguageCode);
      if (found && !chosenLanguageName) {
        setChosenLanguageName(found.name);
      }
    }
    // Only run when selectedLanguageCode changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguageCode, languages]);

  // --- Available script/region options from selected language ---
  const availableScripts: ScriptOption[] = useMemo(() => {
    if (!selectedLanguageCode) return [];
    const found = languages.find((l) => l.code === selectedLanguageCode);
    if (found && found.scripts.length > 0) {
      return found.scripts.map(
        (s) => COMMON_SCRIPTS.find((cs) => cs.code === s) ?? { code: s, name: s },
      );
    }
    return COMMON_SCRIPTS;
  }, [selectedLanguageCode, languages]);

  const availableRegions: RegionOption[] = useMemo(() => {
    if (!selectedLanguageCode) return [];
    const found = languages.find((l) => l.code === selectedLanguageCode);
    if (found && found.regions.length > 0) {
      return found.regions.map(
        (r) => COMMON_REGIONS.find((cr) => cr.code === r) ?? { code: r, name: r },
      );
    }
    return COMMON_REGIONS;
  }, [selectedLanguageCode, languages]);

  // --- Derived: full language code ---
  const fullLanguageCode = useMemo(
    () =>
      selectedLanguageCode ? assembleBcp47(selectedLanguageCode, script, region, variant) : '',
    [selectedLanguageCode, script, region, variant],
  );

  // --- Derived: selected display ---
  const selectedDisplay = useMemo(() => {
    if (!selectedLanguageCode) return '';
    return `${chosenLanguageName} (${fullLanguageCode})`;
  }, [selectedLanguageCode, chosenLanguageName, fullLanguageCode]);

  // --- Derived: has changed from initial ---
  const hasChanged = useMemo(
    () => fullLanguageCode !== '' && fullLanguageCode !== initialLanguageIdRef.current,
    [fullLanguageCode],
  );

  // --- Derived: show registry warning ---
  const showRegistryWarning = isRegistered && hasChanged;

  // --- Variant validation ---
  useEffect(() => {
    if (variant && !VARIANT_REGEX.test(variant)) {
      setVariantError('Variant may only contain lowercase letters and digits');
    } else {
      setVariantError(null);
    }
  }, [variant]);

  // --- Language name validation ---
  useEffect(() => {
    // Clear server validation error when user edits the name
    setServerValidationError(null);
    if (chosenLanguageName.trim() === '' && selectedLanguageCode) {
      setLanguageNameError('Language name is required');
    } else {
      setLanguageNameError(null);
    }
  }, [chosenLanguageName, selectedLanguageCode]);

  // --- Can submit ---
  // Combined name error: field-level or server validation
  const displayedNameError = languageNameError || serverValidationError;

  const canSubmit =
    !!selectedLanguageCode &&
    chosenLanguageName.trim() !== '' &&
    !variantError &&
    !languageNameError &&
    !serverValidationError &&
    !isValidating;

  // --- Handlers ---
  const handleLanguageSelect = useCallback(
    (code: string) => {
      setSelectedLanguageCode(code);
      const found = languages.find((l) => l.code === code);
      if (found) {
        setChosenLanguageName(found.name);
      }
      // Reset BCP-47 components on new selection
      setScript(null);
      setRegion(null);
      setVariant(null);
    },
    [languages],
  );

  const handleConfirm = useCallback(async () => {
    if (!canSubmit) return;

    setIsValidating(true);
    try {
      const result: ValidationResult = await papi.commands.sendCommand(
        'paratextProjectCreation.validateLanguage',
        fullLanguageCode,
        chosenLanguageName,
      );
      if (!isMountedRef.current) return;

      if (!result.isValid) {
        setServerValidationError(result.errorCode ?? 'Validation failed');
        return;
      }

      const selectionResult: LanguageSelectionResult = {
        languageId: fullLanguageCode,
        languageName: chosenLanguageName,
      };
      onConfirm(selectionResult);
    } catch (err: unknown) {
      logger.warn(`Language validation failed: ${getErrorMessage(err)}`);
      if (isMountedRef.current) {
        // Graceful fallback: allow submission if validation service is unavailable
        const selectionResult: LanguageSelectionResult = {
          languageId: fullLanguageCode,
          languageName: chosenLanguageName,
        };
        onConfirm(selectionResult);
      }
    } finally {
      if (isMountedRef.current) {
        setIsValidating(false);
      }
    }
  }, [canSubmit, fullLanguageCode, chosenLanguageName, onConfirm]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        const target = e.target as HTMLElement;
        // Don't submit from within select dropdowns or list
        if (target.getAttribute('role') === 'option' || target.getAttribute('role') === 'row') {
          return;
        }
        e.preventDefault();
        handleConfirm();
      }
    },
    [onCancel, handleConfirm],
  );

  const handleScriptChange = useCallback((value: string) => {
    setScript(value === NONE_VALUE ? null : value);
  }, []);

  const handleRegionChange = useCallback((value: string) => {
    setRegion(value === NONE_VALUE ? null : value);
  }, []);

  const handleVariantChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVariant(e.target.value || null);
  }, []);

  // --- Dialog title ---
  const title = projectName
    ? localizedStrings['%paratextProjectCreation_languageSelection_title%'] ||
      `Choose Language Identifier for ${projectName}`
    : 'Choose Language Identifier';

  const noneLabel =
    localizedStrings['%paratextProjectCreation_languageSelection_none%'] || '(None)';

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className="pr-twp tw-flex tw-flex-col tw-gap-4 tw-p-4"
      role="dialog"
      aria-label={title}
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      {/* Title */}
      <h2 className="tw-text-lg tw-font-semibold">{title}</h2>

      {/* Search */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="language-search">
          {localizedStrings['%paratextProjectCreation_languageSelection_search%'] || 'Search'}
        </Label>
        <Input
          ref={searchInputRef}
          id="language-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by code or name..."
        />
      </div>

      {/* Language List */}
      <div
        className="tw-border tw-rounded-md tw-overflow-hidden"
        role="table"
        aria-label="Languages"
      >
        <div className="tw-flex tw-border-b tw-bg-muted tw-px-3 tw-py-2 tw-text-sm tw-font-medium">
          <div className="tw-w-24">
            {localizedStrings['%paratextProjectCreation_languageSelection_code%'] || 'Code'}
          </div>
          <div className="tw-flex-1">
            {localizedStrings['%paratextProjectCreation_languageSelection_languageName%'] ||
              'Language Name'}
          </div>
        </div>
        <div className="tw-max-h-48 tw-overflow-y-auto" role="rowgroup">
          {isLoading ? (
            <div className="tw-flex tw-items-center tw-gap-2 tw-p-3 tw-text-sm tw-text-muted-foreground">
              <Loader2 className="tw-h-4 tw-w-4 tw-animate-spin" />
              {localizedStrings['%paratextProjectCreation_languageSelection_loading%'] ||
                'Loading languages...'}
            </div>
          ) : languages.length === 0 ? (
            <div className="tw-p-3 tw-text-sm tw-text-muted-foreground">No languages found</div>
          ) : (
            languages.map((lang) => (
              <div
                key={lang.code}
                role="row"
                tabIndex={0}
                className={cn(
                  'tw-flex tw-px-3 tw-py-1.5 tw-text-sm tw-cursor-pointer hover:tw-bg-accent',
                  selectedLanguageCode === lang.code && 'tw-bg-accent tw-font-medium',
                )}
                onClick={() => handleLanguageSelect(lang.code)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLanguageSelect(lang.code);
                  }
                }}
                aria-selected={selectedLanguageCode === lang.code}
              >
                <div className="tw-w-24 tw-font-mono">{lang.code}</div>
                <div className="tw-flex-1">{lang.name}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Language Name */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="language-name">
          {localizedStrings['%paratextProjectCreation_languageSelection_nameLabel%'] ||
            'Language name'}
        </Label>
        <Input
          id="language-name"
          type="text"
          value={chosenLanguageName}
          onChange={(e) => setChosenLanguageName(e.target.value)}
          disabled={!selectedLanguageCode}
          aria-invalid={!!displayedNameError}
          aria-describedby={displayedNameError ? 'language-name-error' : undefined}
        />
        {displayedNameError && (
          <p id="language-name-error" className="tw-text-sm tw-text-destructive">
            {displayedNameError}
          </p>
        )}
      </div>

      {/* BCP-47 Component Selectors */}
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-3 tw-gap-3">
        {/* Script */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="script-select">
            {localizedStrings['%paratextProjectCreation_languageSelection_script%'] || 'Script'}
          </Label>
          <Select
            value={script ?? NONE_VALUE}
            onValueChange={handleScriptChange}
            disabled={!selectedLanguageCode}
          >
            <SelectTrigger id="script-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NONE_VALUE}>{noneLabel}</SelectItem>
              {availableScripts.map((s) => (
                <SelectItem key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Region */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="region-select">
            {localizedStrings['%paratextProjectCreation_languageSelection_region%'] || 'Region'}
          </Label>
          <Select
            value={region ?? NONE_VALUE}
            onValueChange={handleRegionChange}
            disabled={!selectedLanguageCode}
          >
            <SelectTrigger id="region-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NONE_VALUE}>{noneLabel}</SelectItem>
              {availableRegions.map((r) => (
                <SelectItem key={r.code} value={r.code}>
                  {r.name} ({r.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Variant */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="variant-input">
            {localizedStrings['%paratextProjectCreation_languageSelection_variant%'] || 'Variant'}
          </Label>
          <Input
            id="variant-input"
            type="text"
            value={variant ?? ''}
            onChange={handleVariantChange}
            disabled={!selectedLanguageCode}
            placeholder="e.g. fonipa"
            aria-invalid={!!variantError}
            aria-describedby={variantError ? 'variant-error' : undefined}
          />
          {variantError && (
            <p id="variant-error" className="tw-text-sm tw-text-destructive">
              {variantError}
            </p>
          )}
        </div>
      </div>

      {/* Selected Preview */}
      {selectedDisplay && (
        <div className="tw-text-sm">
          <span className="tw-font-medium">
            {localizedStrings['%paratextProjectCreation_languageSelection_selected%'] || 'Selected'}
            :{' '}
          </span>
          {selectedDisplay}
        </div>
      )}

      {/* Registry Warning */}
      {showRegistryWarning && (
        <Alert variant="destructive">
          <AlertCircle className="tw-h-4 tw-w-4" />
          <AlertDescription>
            {localizedStrings['%paratextProjectCreation_languageSelection_registryWarning%'] ||
              'This project is registered. Changing the language may affect its registry status.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="tw-flex tw-items-center tw-justify-end tw-gap-2">
        <Button variant="outline" onClick={onCancel}>
          {localizedStrings['%paratextProjectCreation_languageSelection_cancel%'] || 'Cancel'}
        </Button>
        <Button variant="default" onClick={handleConfirm} disabled={!canSubmit}>
          {isValidating && <Loader2 className="tw-mr-2 tw-h-4 tw-w-4 tw-animate-spin" />}
          {localizedStrings['%paratextProjectCreation_languageSelection_ok%'] || 'OK'}
        </Button>
      </div>
    </div>
  );
}
