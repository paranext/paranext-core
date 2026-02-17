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
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback } from 'react';

export interface CharacterRulesTabProps {
  separator: string;
  characterRules: string;
  validationErrors: Record<string, string>;
  readOnly: boolean;
  localizedStrings: LanguageStrings;
  onSeparatorChange: (value: string) => void;
  onCharacterRulesChange: (value: string) => void;
}

/** Get a localized string value or return fallback */
function getLocalizedValue(
  localizedStrings: LanguageStrings,
  key: LocalizeKey,
  fallback: string,
): string {
  const value = localizedStrings[key];
  if (typeof value === 'string') return value;
  return fallback;
}

function CharacterRulesTab({
  separator,
  characterRules,
  validationErrors,
  readOnly,
  localizedStrings,
  onSeparatorChange,
  onCharacterRulesChange,
}: CharacterRulesTabProps) {
  const l = useCallback(
    (key: LocalizeKey, fallback: string): string =>
      getLocalizedValue(localizedStrings, key, fallback),
    [localizedStrings],
  );

  const comingSoonText = l('%platformProjects_comingSoon%', 'Coming soon - not yet implemented');

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Separator */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="separator">
          {l('%platformProjects_languageSettings_separatorLabel%', 'Separator:')}
        </Label>
        <Input
          id="separator"
          value={separator}
          onChange={(e) => onSeparatorChange(e.target.value)}
          disabled={readOnly}
          className="tw-w-24"
          aria-label={l('%platformProjects_languageSettings_separatorLabel%', 'Separator')}
        />
      </div>

      {/* Characters (ICU Collation Rules) */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="characterRules">
          {l('%platformProjects_languageSettings_charactersLabel%', 'Characters:')}
        </Label>
        <Textarea
          id="characterRules"
          value={characterRules}
          onChange={(e) => onCharacterRulesChange(e.target.value)}
          disabled={readOnly}
          rows={8}
          className="tw-font-mono"
          aria-label={l('%platformProjects_languageSettings_charactersLabel%', 'Characters')}
        />
        {validationErrors.characterRules && (
          <span className="tw-text-sm tw-text-destructive">{validationErrors.characterRules}</span>
        )}
      </div>

      {/* Copy From Button (placeholder) */}
      <div className="tw-flex tw-justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button type="button" variant="outline" disabled>
                  {l('%platformProjects_languageSettings_copyFromButton%', 'Copy from...')}
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>{comingSoonText}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default CharacterRulesTab;
