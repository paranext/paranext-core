import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import papi, { logger } from '@papi/frontend';
import {
  Button,
  Label,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Alert,
  AlertDescription,
  cn,
  usePromise,
} from 'platform-bible-react';
import { getErrorMessage, LocalizeKey, formatReplacementString } from 'platform-bible-utils';
import { AlertCircle, Search } from 'lucide-react';
import type {
  LanguageSelectionFormProps,
  LanguageSelectionResult,
  LanguageSelection,
  ValidationResult,
  ScriptOption,
  RegionOption,
} from 'paratext-project-creation';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectCreation_languageSelection_title%',
  '%projectCreation_languageSelection_search%',
  '%projectCreation_languageSelection_languageName%',
  '%projectCreation_languageSelection_script%',
  '%projectCreation_languageSelection_region%',
  '%projectCreation_languageSelection_variant%',
  '%projectCreation_languageSelection_selected%',
  '%projectCreation_validation_languageNameRequired%',
  '%projectCreation_validation_languageNameExists%',
  '%projectCreation_validation_variantInvalidChars%',
  '%general_ok%',
  '%general_cancel%',
];

/** Debounce time for search in milliseconds */
const SEARCH_DEBOUNCE_MS = 300;

/** Debounce time for validation in milliseconds */
const VALIDATION_DEBOUNCE_MS = 500;

// Common script options
const COMMON_SCRIPTS: ScriptOption[] = [
  { code: '', name: '(None)' },
  { code: 'Latn', name: 'Latin' },
  { code: 'Cyrl', name: 'Cyrillic' },
  { code: 'Arab', name: 'Arabic' },
  { code: 'Deva', name: 'Devanagari' },
  { code: 'Thai', name: 'Thai' },
  { code: 'Hans', name: 'Simplified Chinese' },
  { code: 'Hant', name: 'Traditional Chinese' },
  { code: 'Ethi', name: 'Ethiopic' },
  { code: 'Grek', name: 'Greek' },
  { code: 'Hebr', name: 'Hebrew' },
];

// Common region options
const COMMON_REGIONS: RegionOption[] = [
  { code: '', name: '(None)' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'IN', name: 'India' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brazil' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' },
  { code: 'ZA', name: 'South Africa' },
];

async function getAvailableLanguages(searchQuery?: string): Promise<LanguageSelection[]> {
  try {
    return await papi.commands.sendCommand(
      'paratextProjectCreation.getAvailableLanguages',
      searchQuery,
    );
  } catch (error) {
    logger.warn(`Failed to get available languages: ${getErrorMessage(error)}`);
    // Return some common languages as fallback
    return [
      { languageId: 'eng', languageName: 'English', baseCode: 'eng' },
      { languageId: 'fra', languageName: 'French', baseCode: 'fra' },
      { languageId: 'spa', languageName: 'Spanish', baseCode: 'spa' },
      { languageId: 'deu', languageName: 'German', baseCode: 'deu' },
      { languageId: 'por', languageName: 'Portuguese', baseCode: 'por' },
    ];
  }
}

/** Build full BCP-47 language code from components */
function buildLanguageCode(
  baseCode: string,
  script?: string,
  region?: string,
  variant?: string,
): string {
  let code = baseCode;
  if (script) code += `-${script}`;
  if (region) code += `-${region}`;
  if (variant) code += `-${variant}`;
  return code;
}

/** Parse BCP-47 language code into components */
function parseLanguageCode(code: string): {
  baseCode: string;
  script?: string;
  region?: string;
  variant?: string;
} {
  const parts = code.split('-');
  const result: {
    baseCode: string;
    script?: string;
    region?: string;
    variant?: string;
  } = { baseCode: parts[0] };

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    // Script is 4 letters, region is 2 letters or 3 digits, variant is 5-8 chars
    if (part.length === 4 && /^[A-Z][a-z]{3}$/.test(part)) {
      result.script = part;
    } else if (part.length === 2 && /^[A-Z]{2}$/.test(part)) {
      result.region = part;
    } else if (part.length >= 5 && /^[a-z0-9]+$/.test(part)) {
      result.variant = part;
    }
  }

  return result;
}

/**
 * Language Selection Form (CAP-UI-003)
 *
 * A dialog that allows users to select or create a language identifier for their project. It
 * provides a searchable list of known languages from the SIL language database, with options to
 * customize the script, region, and variant components of the BCP-47 language tag.
 */
export function LanguageSelectionDialog({
  currentLanguageId,
  projectName,
  isNewLanguage,
  isRegistered,
  onConfirm,
  onCancel,
}: LanguageSelectionFormProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Selection state
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageSelection | null>(null);
  const [languageName, setLanguageName] = useState('');
  const [script, setScript] = useState('');
  const [region, setRegion] = useState('');
  const [variant, setVariant] = useState('');

  // Validation state
  const [languageNameError, setLanguageNameError] = useState<string | null>(null);
  const [variantError, setVariantError] = useState<string | null>(null);

  // Timers
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();
  const validationTimer = useRef<ReturnType<typeof setTimeout>>();

  // Load languages
  const [languages] = usePromise(
    useCallback(() => getAvailableLanguages(debouncedSearchQuery), [debouncedSearchQuery]),
    useMemo(() => [], []),
  );

  // Initialize from current language ID
  useEffect(() => {
    if (currentLanguageId && !isNewLanguage) {
      const parsed = parseLanguageCode(currentLanguageId);

      // Find matching language in list
      const match = languages.find((l) => l.baseCode === parsed.baseCode);
      if (match) {
        setSelectedLanguage(match);
        setLanguageName(match.languageName);
      }

      setScript(parsed.script || '');
      setRegion(parsed.region || '');
      setVariant(parsed.variant || '');
    }
  }, [currentLanguageId, isNewLanguage, languages]);

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);

    // Debounce search
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    searchTimer.current = setTimeout(() => {
      setDebouncedSearchQuery(value);
    }, SEARCH_DEBOUNCE_MS);
  }, []);

  // Handle language selection from table
  const handleLanguageSelect = useCallback((language: LanguageSelection) => {
    setSelectedLanguage(language);
    setLanguageName(language.languageName);

    // Set default script/region from language if available
    if (language.script) {
      setScript(language.script);
    }
    if (language.region) {
      setRegion(language.region);
    }
  }, []);

  // Validate language name
  const validateLanguageName = useCallback(
    async (name: string) => {
      if (!name.trim()) {
        setLanguageNameError(localizedStrings['%projectCreation_validation_languageNameRequired%']);
        return false;
      }

      try {
        const fullCode = selectedLanguage
          ? buildLanguageCode(selectedLanguage.baseCode, script, region, variant)
          : '';

        const result: ValidationResult = await papi.commands.sendCommand(
          'paratextProjectCreation.validateLanguage',
          fullCode,
          name,
          currentLanguageId,
        );

        if (!result.isValid && result.errorCode) {
          const messageKey =
            result.errorCode === 'LANGUAGE_NAME_EXISTS'
              ? '%projectCreation_validation_languageNameExists%'
              : '%projectCreation_validation_languageNameRequired%';
          setLanguageNameError(localizedStrings[messageKey]);
          return false;
        }
        setLanguageNameError(null);
        return true;
      } catch (error) {
        logger.warn(`Language validation failed: ${getErrorMessage(error)}`);
        setLanguageNameError(null);
        return true;
      }
    },
    [selectedLanguage, script, region, variant, currentLanguageId, localizedStrings],
  );

  // Handle language name change
  const handleLanguageNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setLanguageName(value);

      // Debounce validation
      if (validationTimer.current) {
        clearTimeout(validationTimer.current);
      }
      validationTimer.current = setTimeout(() => {
        validateLanguageName(value);
      }, VALIDATION_DEBOUNCE_MS);
    },
    [validateLanguageName],
  );

  // Handle variant change
  const handleVariantChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLowerCase();

      // Validate variant characters
      if (value && !/^[a-z0-9]*$/.test(value)) {
        setVariantError(localizedStrings['%projectCreation_validation_variantInvalidChars%']);
      } else {
        setVariantError(null);
      }

      setVariant(value);
    },
    [localizedStrings],
  );

  // Build full language code
  const fullLanguageCode = useMemo(() => {
    if (!selectedLanguage) return '';
    return buildLanguageCode(selectedLanguage.baseCode, script, region, variant);
  }, [selectedLanguage, script, region, variant]);

  // Selected display text
  const selectedDisplay = useMemo(() => {
    if (!selectedLanguage || !languageName) return '';
    return formatReplacementString(
      localizedStrings['%projectCreation_languageSelection_selected%'],
      {
        name: languageName,
        code: fullLanguageCode,
      },
    );
  }, [selectedLanguage, languageName, fullLanguageCode, localizedStrings]);

  // Check if registry warning should be shown
  const showRegistryWarning = useMemo(() => {
    return isRegistered && fullLanguageCode !== currentLanguageId;
  }, [isRegistered, fullLanguageCode, currentLanguageId]);

  // Handle OK button click
  const handleOk = useCallback(async () => {
    // Final validation
    if (!selectedLanguage) return;

    const isValid = await validateLanguageName(languageName);
    if (!isValid) return;

    if (variantError) return;

    const result: LanguageSelectionResult = {
      languageId: fullLanguageCode,
      languageName,
    };
    onConfirm(result);
  }, [
    selectedLanguage,
    languageName,
    fullLanguageCode,
    variantError,
    validateLanguageName,
    onConfirm,
  ]);

  // Check if form is valid
  const canSubmit = useMemo(() => {
    return selectedLanguage && languageName.trim() && !languageNameError && !variantError;
  }, [selectedLanguage, languageName, languageNameError, variantError]);

  // Handle keyboard events - Enter to submit
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && canSubmit && !e.defaultPrevented) {
        e.preventDefault();
        handleOk();
      }
    },
    [canSubmit, handleOk],
  );

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
      if (validationTimer.current) {
        clearTimeout(validationTimer.current);
      }
    };
  }, []);

  const title = projectName
    ? `${localizedStrings['%projectCreation_languageSelection_title%']} for ${projectName}`
    : localizedStrings['%projectCreation_languageSelection_title%'];

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="tw-flex tw-min-w-[500px] tw-flex-col tw-gap-4 tw-p-4" onKeyDown={handleKeyDown}>
      {/* Title */}
      <h2 className="tw-text-lg tw-font-semibold">{title}</h2>

      {/* Search */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="language-search">
          {localizedStrings['%projectCreation_languageSelection_search%']}
        </Label>
        <div className="tw-relative">
          <Search className="tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-text-muted-foreground" />
          <Input
            id="language-search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search languages..."
            className="tw-pl-9"
            autoFocus
          />
        </div>
      </div>

      {/* Language List */}
      <div className="tw-max-h-[200px] tw-overflow-auto tw-rounded-md tw-border">
        <table className="tw-w-full tw-text-sm">
          <thead className="tw-sticky tw-top-0 tw-bg-muted">
            <tr>
              <th className="tw-w-20 tw-px-3 tw-py-2 tw-text-left tw-font-medium">Code</th>
              <th className="tw-px-3 tw-py-2 tw-text-left tw-font-medium">Language Name</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang) => (
              <tr
                key={lang.languageId || lang.baseCode}
                onClick={() => handleLanguageSelect(lang)}
                className={cn(
                  'tw-cursor-pointer tw-border-b last:tw-border-b-0 hover:tw-bg-muted/50',
                  selectedLanguage?.baseCode === lang.baseCode && 'tw-bg-muted',
                )}
              >
                <td className="tw-px-3 tw-py-2">{lang.baseCode}</td>
                <td className="tw-px-3 tw-py-2">{lang.languageName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Language Name */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="language-name">
          {localizedStrings['%projectCreation_languageSelection_languageName%']}
        </Label>
        <Input
          id="language-name"
          value={languageName}
          onChange={handleLanguageNameChange}
          disabled={!selectedLanguage}
          className={cn({ 'tw-border-destructive': languageNameError })}
        />
        {languageNameError && <p className="tw-text-sm tw-text-destructive">{languageNameError}</p>}
      </div>

      {/* Script, Region, Variant */}
      <div className="tw-grid tw-grid-cols-3 tw-gap-4">
        {/* Script */}
        <div className="tw-flex tw-flex-col tw-gap-2">
          <Label htmlFor="script">
            {localizedStrings['%projectCreation_languageSelection_script%']}
          </Label>
          <Select value={script} onValueChange={setScript} disabled={!selectedLanguage}>
            <SelectTrigger id="script">
              <SelectValue placeholder="(None)" />
            </SelectTrigger>
            <SelectContent>
              {COMMON_SCRIPTS.map((s) => (
                <SelectItem key={s.code} value={s.code}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Region */}
        <div className="tw-flex tw-flex-col tw-gap-2">
          <Label htmlFor="region">
            {localizedStrings['%projectCreation_languageSelection_region%']}
          </Label>
          <Select value={region} onValueChange={setRegion} disabled={!selectedLanguage}>
            <SelectTrigger id="region">
              <SelectValue placeholder="(None)" />
            </SelectTrigger>
            <SelectContent>
              {COMMON_REGIONS.map((r) => (
                <SelectItem key={r.code} value={r.code}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Variant */}
        <div className="tw-flex tw-flex-col tw-gap-2">
          <Label htmlFor="variant">
            {localizedStrings['%projectCreation_languageSelection_variant%']}
          </Label>
          <Input
            id="variant"
            value={variant}
            onChange={handleVariantChange}
            disabled={!selectedLanguage}
            placeholder="Optional"
            className={cn({ 'tw-border-destructive': variantError })}
          />
          {variantError && <p className="tw-text-sm tw-text-destructive">{variantError}</p>}
        </div>
      </div>

      {/* Selected Display */}
      {selectedDisplay && <p className="tw-text-sm tw-text-muted-foreground">{selectedDisplay}</p>}

      {/* Registry Warning */}
      {showRegistryWarning && (
        <Alert variant="destructive">
          <AlertCircle className="tw-h-4 tw-w-4" />
          <AlertDescription>
            Changing the language will update the project on the Paratext Registry.
          </AlertDescription>
        </Alert>
      )}

      {/* Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4">
        <Button variant="outline" onClick={onCancel}>
          {localizedStrings['%general_cancel%']}
        </Button>
        <Button variant="default" onClick={handleOk} disabled={!canSubmit}>
          {localizedStrings['%general_ok%']}
        </Button>
      </div>
    </div>
  );
}

export default LanguageSelectionDialog;
