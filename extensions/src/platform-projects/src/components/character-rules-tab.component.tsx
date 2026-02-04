/**
 * === NEW IN PT10 === Reason: React component for Platform.Bible UI Maps to: UI-PKG-003, VAL-013
 * PT9 Source Reference: LanguageSettingsForm.cs (Alphabetic Characters tab)
 *
 * Implements character rules validation per gm-003 golden master:
 *
 * - Gm-003-01: Valid character rules with proper case pairs
 * - Gm-003-02: Duplicate character on same line
 * - Gm-003-03: Case-insensitive duplicate across lines
 * - Gm-003-04: Capitalization not defined correctly
 * - Gm-003-05: Valid multigraph
 * - Gm-003-06: No-case letter (apostrophe)
 * - Gm-003-07: Empty rules text
 * - Gm-003-08: Control character in rules
 */
import { Button, Input, Label, Textarea } from 'platform-bible-react';
import { useState, useCallback, useEffect } from 'react';
import type { CharacterValidationError } from 'platform-projects';
import { formatReplacementString, LanguageStrings } from 'platform-bible-utils';

/** Props for the Character Rules Tab component */
export interface CharacterRulesTabProps {
  /** Character separator (e.g., ' ' or '/') */
  separator: string;
  /** Character rules text (ICU collation format) */
  characterRules: string;
  /** Whether user can edit settings */
  canUpdateAllSettings: boolean;
  /** Localized strings */
  localizedStrings: LanguageStrings;
  /** Callback when separator changes */
  onSeparatorChange: (separator: string) => void;
  /** Callback when character rules change */
  onCharacterRulesChange: (rules: string) => void;
  /** Callback to validate rules (calls backend) */
  onValidateRules?: (separator: string, rules: string) => Promise<CharacterValidationError[]>;
  /** Current validation errors */
  validationErrors?: CharacterValidationError[];
}

/**
 * Character Rules Tab component for the Language Settings dialog. Configures alphabetic character
 * rules with ICU validation.
 *
 * VAL-013: ICU syntax validation for character rules
 */
export function CharacterRulesTab({
  separator,
  characterRules,
  canUpdateAllSettings,
  localizedStrings,
  onSeparatorChange,
  onCharacterRulesChange,
  onValidateRules,
  validationErrors = [],
}: CharacterRulesTabProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [localErrors, setLocalErrors] = useState<CharacterValidationError[]>([]);

  // Use provided errors or local errors
  const displayErrors = validationErrors.length > 0 ? validationErrors : localErrors;

  // Debounced validation
  const validateRulesDebounced = useCallback(
    async (sep: string, rules: string) => {
      if (!onValidateRules || !rules.trim()) {
        setLocalErrors([]);
        return;
      }

      setIsValidating(true);
      try {
        const errors = await onValidateRules(sep, rules);
        setLocalErrors(errors);
      } catch (error) {
        // If validation fails, show generic error
        setLocalErrors([
          {
            type: 'icu-error',
            message:
              localizedStrings['%webView_languageSettings_validation_invalidChars%'] ||
              'Text contains invalid characters',
          },
        ]);
      } finally {
        setIsValidating(false);
      }
    },
    [onValidateRules, localizedStrings],
  );

  // Validate on rules change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateRulesDebounced(separator, characterRules);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [separator, characterRules, validateRulesDebounced]);

  /** Format an error message using localized strings */
  const formatErrorMessage = (error: CharacterValidationError): string => {
    switch (error.type) {
      case 'duplicate':
        return formatReplacementString(
          localizedStrings['%webView_languageSettings_validation_duplicateChar%'] ||
            "Character '{char}' duplicated",
          { char: error.character || '?' },
        );
      case 'case-duplicate':
        return formatReplacementString(
          localizedStrings['%webView_languageSettings_validation_caseDuplicate%'] ||
            "Cannot place '{char}' and '{charUpper}' on separate lines since Paratext ignores case when sorting.",
          {
            char: error.character?.toLowerCase() || '?',
            charUpper: error.character?.toUpperCase() || '?',
          },
        );
      case 'capitalization':
        return formatReplacementString(
          localizedStrings['%webView_languageSettings_validation_capitalization%'] ||
            'Capitalization is not defined correctly for: {char}',
          { char: error.character || '?' },
        );
      case 'invalid-syntax':
      case 'icu-error':
        return (
          localizedStrings['%webView_languageSettings_validation_invalidChars%'] ||
          'Text contains invalid characters'
        );
      default:
        return error.message || 'Validation error';
    }
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Separator input */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="separator">
          {localizedStrings['%webView_languageSettings_separator_label%'] || 'Separator'}
        </Label>
        <Input
          id="separator"
          value={separator}
          onChange={(e) => onSeparatorChange(e.target.value)}
          className="tw-w-20 tw-font-mono"
          maxLength={1}
          disabled={!canUpdateAllSettings}
          placeholder="/"
        />
      </div>

      {/* Character rules textarea */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="characterRules">
          {localizedStrings['%webView_languageSettings_characters_label%'] || 'Characters'}
        </Label>
        <Textarea
          id="characterRules"
          value={characterRules}
          onChange={(e) => onCharacterRulesChange(e.target.value)}
          className="tw-min-h-48 tw-font-mono tw-text-sm"
          disabled={!canUpdateAllSettings}
          placeholder="a A&#10;b B&#10;c C"
        />
        <div className="tw-text-xs tw-text-muted-foreground">
          Enter one character group per line. Use the separator to separate lowercase and uppercase
          forms.
        </div>
      </div>

      {/* Validation errors - VAL-013 */}
      {displayErrors.length > 0 && (
        <div className="tw-flex tw-flex-col tw-gap-1">
          {displayErrors.map((error, index) => (
            <Label
              key={`error-${error.type}-${error.character || index}`}
              className="tw-text-sm tw-text-destructive"
            >
              {formatErrorMessage(error)}
            </Label>
          ))}
        </div>
      )}

      {/* Validation status */}
      {isValidating && <div className="tw-text-sm tw-text-muted-foreground">Validating...</div>}

      {/* Copy from button */}
      <div className="tw-flex tw-gap-2 tw-mt-2">
        <Button variant="outline" disabled={!canUpdateAllSettings}>
          {localizedStrings['%webView_languageSettings_copyFrom%'] || 'Copy from...'}
        </Button>
      </div>
    </div>
  );
}
