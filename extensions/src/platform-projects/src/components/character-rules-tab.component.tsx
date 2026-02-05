/**
 * === NEW IN PT10 === Reason: React component - Tab components don't exist in PT9's WinForms
 * architecture. Maps to: UI-PKG-003
 */

import {
  Button,
  Input,
  Label,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import React, { useCallback } from 'react';

/** Character validation error from VAL-013 */
export interface CharacterValidationError {
  type: 'invalid-syntax' | 'capitalization' | 'duplicate';
  character?: string;
  message: string;
  position?: number;
}

/** Props for the Character Rules Tab component */
export interface CharacterRulesTabProps {
  /** Separator character between character groups */
  separator: string;
  /** ICU collation rules for character ordering */
  characterRules: string;
  /** Whether fields are read-only (non-admin) */
  isReadOnly: boolean;
  /** Validation errors for character rules (VAL-013) */
  validationErrors: CharacterValidationError[];
  /** Whether validation is in progress */
  isValidating: boolean;
  /** Localized strings */
  localizedStrings: Record<string, string>;
  /** Callback when separator changes */
  onSeparatorChange: (separator: string) => void;
  /** Callback when character rules change */
  onCharacterRulesChange: (rules: string) => void;
  /** Callback when copy from button is clicked */
  onCopyFromClick: () => void;
  /** Whether copy from functionality is available */
  copyFromEnabled: boolean;
}

/**
 * Character Rules (Alphabetic Characters) tab component for the Language Settings form. Allows
 * configuration of character sorting rules using ICU collation syntax.
 */
export function CharacterRulesTab({
  separator,
  characterRules,
  isReadOnly,
  validationErrors,
  isValidating,
  localizedStrings,
  onSeparatorChange,
  onCharacterRulesChange,
  onCopyFromClick,
  copyFromEnabled,
}: CharacterRulesTabProps) {
  // Handle separator change
  const handleSeparatorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSeparatorChange(e.target.value);
    },
    [onSeparatorChange],
  );

  // Handle character rules change
  const handleCharacterRulesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onCharacterRulesChange(e.target.value);
    },
    [onCharacterRulesChange],
  );

  // Format validation errors for display
  const errorMessages = validationErrors.map((error) => error.message);
  const hasErrors = errorMessages.length > 0;

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Separator input */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="separator">
          {localizedStrings['%webView_languageSettings_field_separator%'] || 'Separator:'}
        </Label>
        <Input
          id="separator"
          type="text"
          value={separator}
          onChange={handleSeparatorChange}
          disabled={isReadOnly}
          className="tw-w-20"
          maxLength={1}
          aria-label={localizedStrings['%webView_languageSettings_ariaLabel_separatorInput%']}
        />
        <Label className="tw-text-sm tw-text-muted-foreground">
          {localizedStrings['%webView_languageSettings_help_separator%'] ||
            'Character used to separate groups in the alphabet'}
        </Label>
      </div>

      {/* Character rules textarea */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <div className="tw-flex tw-justify-between tw-items-center">
          <Label htmlFor="characterRules">
            {localizedStrings['%webView_languageSettings_field_characters%'] || 'Characters:'}
          </Label>
          {isValidating && (
            <Label className="tw-text-sm tw-text-muted-foreground">
              {localizedStrings['%webView_languageSettings_validating%'] || 'Validating...'}
            </Label>
          )}
        </div>
        <Textarea
          id="characterRules"
          value={characterRules}
          onChange={handleCharacterRulesChange}
          disabled={isReadOnly}
          className={`tw-min-h-[200px] tw-font-mono ${hasErrors ? 'tw-border-destructive' : ''}`}
          placeholder={
            localizedStrings['%webView_languageSettings_placeholder_characterRules%'] ||
            'Enter ICU collation rules...'
          }
          aria-label={
            localizedStrings['%webView_languageSettings_ariaLabel_characterRulesTextarea%']
          }
          aria-invalid={hasErrors}
          aria-describedby={hasErrors ? 'characterRules-errors' : undefined}
        />

        {/* Validation errors (VAL-013) */}
        {hasErrors && (
          <div
            id="characterRules-errors"
            className="tw-flex tw-flex-col tw-gap-1 tw-mt-1"
            role="alert"
          >
            {errorMessages.map((message, index) => (
              <Label
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="tw-text-sm tw-text-destructive"
              >
                {message}
              </Label>
            ))}
          </div>
        )}

        {/* Help text for ICU rules */}
        <Label className="tw-text-sm tw-text-muted-foreground tw-mt-1">
          {localizedStrings['%webView_languageSettings_help_characterRules%'] ||
            'Enter character sorting rules using ICU collation syntax. Each character or multigraph on a separate line or separated by spaces.'}
        </Label>
      </div>

      {/* Copy from button */}
      <div className="tw-mt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCopyFromClick}
                  disabled={!copyFromEnabled || isReadOnly}
                >
                  {localizedStrings['%webView_languageSettings_button_copyFrom%'] || 'Copy from...'}
                </Button>
              </span>
            </TooltipTrigger>
            {!copyFromEnabled && (
              <TooltipContent>
                {localizedStrings['%webView_languageSettings_tooltip_copyFromNotAvailable%'] ||
                  'Copy from other projects is not yet available'}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default CharacterRulesTab;
