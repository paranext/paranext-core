import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Checkbox,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

// ============================================================================
// LOCALIZED STRING KEYS
// ============================================================================

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%webView_languageSettings_title%',
  '%webView_languageSettings_tab_font%',
  '%webView_languageSettings_tab_graphite%',
  '%webView_languageSettings_tab_characters%',
  '%webView_languageSettings_tab_other%',
  '%webView_languageSettings_field_fontName%',
  '%webView_languageSettings_field_fontSize%',
  '%webView_languageSettings_field_sample%',
  '%webView_languageSettings_field_rightToLeft%',
  '%webView_languageSettings_field_htmlLanguage%',
  '%webView_languageSettings_field_separator%',
  '%webView_languageSettings_field_characters%',
  '%webView_languageSettings_button_ok%',
  '%webView_languageSettings_button_cancel%',
  '%webView_languageSettings_button_resetDefault%',
  '%webView_languageSettings_button_copyFrom%',
  '%webView_languageSettings_error_fontSizeRange%',
  '%webView_languageSettings_error_fontSizeInteger%',
  '%webView_languageSettings_error_invalidCharacters%',
  '%webView_languageSettings_error_duplicateCharacter%',
  '%webView_languageSettings_error_capitalization%',
  '%webView_languageSettings_tooltip_notImplemented%',
  '%webView_languageSettings_sample_defaultText%',
];

// ============================================================================
// CONSTANTS
// ============================================================================

const COMMON_FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];

const FONT_SIZE_MIN = 5;
const FONT_SIZE_MAX = 50;

const DEFAULT_SAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog. 0123456789';

// Default available fonts (in a real integration, these come from the system)
const DEFAULT_FONTS = [
  'Arial',
  'Charis SIL',
  'Doulos SIL',
  'Gentium Plus',
  'Noto Sans',
  'Noto Serif',
  'Times New Roman',
];

// ============================================================================
// VALIDATION
// ============================================================================

/** VAL-012: Validate font size is an integer between 5 and 50 */
function validateFontSize(value: string, localizedStrings: LanguageStrings): string | undefined {
  const num = Number(value);
  if (value.trim() === '' || Number.isNaN(num)) {
    return (
      localizedStrings['%webView_languageSettings_error_fontSizeInteger%'] ??
      'Font size must be a valid integer'
    );
  }
  if (!Number.isInteger(num)) {
    return (
      localizedStrings['%webView_languageSettings_error_fontSizeInteger%'] ??
      'Font size must be a valid integer'
    );
  }
  if (num < FONT_SIZE_MIN || num > FONT_SIZE_MAX) {
    return (
      localizedStrings['%webView_languageSettings_error_fontSizeRange%'] ??
      'Font size must be between 5 and 50'
    );
  }
  return undefined;
}

/**
 * VAL-013: Basic character rules validation. Checks for duplicate characters and basic syntax
 * issues. Full ICU validation would use the backend command
 * platformProjects.validateCharacterRules.
 */
function validateCharacterRules(
  rules: string,
  localizedStrings: LanguageStrings,
): string | undefined {
  if (!rules || rules.trim() === '') return undefined;

  // Check for duplicate characters (basic check)
  const lines = rules.split('\n');
  const seenChars = new Set<string>();
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    // Simple duplicate detection: split by separator and check each token
    const tokens = trimmed.split(/\s+/);
    for (const token of tokens) {
      // Skip ICU operators
      if (token === '<' || token === '<<' || token === '<<<' || token === '&') continue;
      if (token.length === 1 || (token.length > 1 && !token.includes('<'))) {
        if (seenChars.has(token.toLowerCase())) {
          const msg =
            localizedStrings['%webView_languageSettings_error_duplicateCharacter%'] ??
            "Character '{char}' duplicated";
          return msg.replace('{char}', token);
        }
        seenChars.add(token.toLowerCase());
      }
    }
  }

  return undefined;
}

// ============================================================================
// TAB IDENTIFIERS
// ============================================================================

const TAB_FONT = 'font';
const TAB_GRAPHITE = 'graphite';
const TAB_CHARACTERS = 'characters';
const TAB_OTHER = 'other';

// ============================================================================
// COMPONENT
// ============================================================================

global.webViewComponent = function LanguageSettingsWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  // Read config from web view state
  const [canUpdateAllSettings] = useWebViewState<boolean>('canUpdateAllSettings', true);
  const [projectName] = useWebViewState<string>('projectName', '');

  // Font tab state
  const [fontName, setFontName] = useState<string>(DEFAULT_FONTS[0]);
  const [fontSizeInput, setFontSizeInput] = useState<string>('12');
  const [rightToLeft, setRightToLeft] = useState<boolean>(false);
  const [htmlLanguage, setHtmlLanguage] = useState<string>('');

  // Character rules tab state
  const [separator, setSeparator] = useState<string>('/');
  const [characterRules, setCharacterRules] = useState<string>('');

  // Validation state
  const [fontSizeError, setFontSizeError] = useState<string | undefined>(undefined);
  const [characterRulesError, setCharacterRulesError] = useState<string | undefined>(undefined);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Derived values
  const fontSize = useMemo(() => {
    const num = Number(fontSizeInput);
    return Number.isNaN(num) || num < FONT_SIZE_MIN ? 12 : num;
  }, [fontSizeInput]);

  const sampleText = useMemo(
    () => localizedStrings['%webView_languageSettings_sample_defaultText%'] ?? DEFAULT_SAMPLE_TEXT,
    [localizedStrings],
  );

  const hasErrors = useMemo(
    () => !!fontSizeError || !!characterRulesError,
    [fontSizeError, characterRulesError],
  );

  const isReadOnly = !canUpdateAllSettings;

  // ---- Event Handlers ----

  const handleFontNameChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setFontName(e.target.value);
  }, []);

  const handleFontSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFontSizeInput(value);
      setFontSizeError(validateFontSize(value, localizedStrings));
    },
    [localizedStrings],
  );

  const handleFontSizePreset = useCallback(
    (size: number) => {
      const value = String(size);
      setFontSizeInput(value);
      setFontSizeError(validateFontSize(value, localizedStrings));
    },
    [localizedStrings],
  );

  const handleRtlChange = useCallback((checked: boolean | 'indeterminate') => {
    setRightToLeft(checked === true);
  }, []);

  const handleHtmlLanguageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setHtmlLanguage(e.target.value);
  }, []);

  const handleSeparatorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSeparator(e.target.value);
  }, []);

  const handleCharacterRulesChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setCharacterRules(value);
      setCharacterRulesError(validateCharacterRules(value, localizedStrings));
    },
    [localizedStrings],
  );

  const handleResetToDefault = useCallback(() => {
    setFontName(DEFAULT_FONTS[0]);
    setFontSizeInput('12');
    setFontSizeError(undefined);
    setRightToLeft(false);
  }, []);

  const handleSubmit = useCallback(() => {
    // Run all validation before submit
    const fontSizeErr = validateFontSize(fontSizeInput, localizedStrings);
    const charRulesErr = validateCharacterRules(characterRules, localizedStrings);

    setFontSizeError(fontSizeErr);
    setCharacterRulesError(charRulesErr);

    if (fontSizeErr || charRulesErr) {
      return;
    }

    setIsSubmitting(true);

    // In a real integration, this would call:
    // papi.commands.sendCommand('platformProjects.saveLanguageSettings', { ... })
    // For now, we just simulate the submit and reset
    setIsSubmitting(false);
  }, [fontSizeInput, characterRules, localizedStrings]);

  const handleCancel = useCallback(() => {
    // In a real integration, this would close the web view
  }, []);

  // ---- Tab Content Renderers ----

  const notImplementedTooltip =
    localizedStrings['%webView_languageSettings_tooltip_notImplemented%'] ??
    'This feature is not yet implemented';

  const titleDisplay = projectName
    ? (
        localizedStrings['%webView_languageSettings_title%'] ?? 'Language Settings: {projectName}'
      ).replace('{projectName}', projectName)
    : (localizedStrings['%webView_languageSettings_title%'] ?? 'Language Settings');

  return (
    <TooltipProvider>
      <div
        className="pr-twp tw-flex tw-flex-col tw-h-full tw-bg-background"
        data-testid="language-settings-form"
      >
        {/* Title */}
        <div className="tw-px-4 tw-pt-4 tw-pb-2">
          <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">{titleDisplay}</h2>
        </div>

        {/* Tabs */}
        <div className="tw-flex-1 tw-overflow-hidden tw-px-4">
          <Tabs defaultValue={TAB_FONT} className="tw-flex tw-flex-col tw-h-full">
            <TabsList>
              <TabsTrigger value={TAB_FONT}>
                {localizedStrings['%webView_languageSettings_tab_font%'] ?? 'Font'}
              </TabsTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <TabsTrigger value={TAB_GRAPHITE} disabled>
                      {localizedStrings['%webView_languageSettings_tab_graphite%'] ?? 'Graphite'}
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent>{notImplementedTooltip}</TooltipContent>
              </Tooltip>
              <TabsTrigger value={TAB_CHARACTERS}>
                {localizedStrings['%webView_languageSettings_tab_characters%'] ??
                  'Alphabetic Characters'}
              </TabsTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <TabsTrigger value={TAB_OTHER} disabled>
                      {localizedStrings['%webView_languageSettings_tab_other%'] ?? 'Other'}
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent>{notImplementedTooltip}</TooltipContent>
              </Tooltip>
            </TabsList>

            {/* Font Tab */}
            <TabsContent value={TAB_FONT} className="tw-flex-1 tw-overflow-y-auto tw-py-4">
              <div className="tw-flex tw-flex-col tw-gap-4">
                {/* Font Name */}
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <Label htmlFor="fontName">
                    {localizedStrings['%webView_languageSettings_field_fontName%'] ?? 'Font:'}
                  </Label>
                  {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                  <select
                    id="fontName"
                    value={fontName}
                    onChange={handleFontNameChange}
                    disabled={isReadOnly || isSubmitting}
                    className="tw-w-full tw-rounded tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm"
                    aria-label={
                      localizedStrings['%webView_languageSettings_field_fontName%'] ?? 'Font'
                    }
                  >
                    {DEFAULT_FONTS.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size */}
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <Label htmlFor="fontSize">
                    {localizedStrings['%webView_languageSettings_field_fontSize%'] ?? 'Size:'}
                  </Label>
                  <div className="tw-flex tw-gap-2 tw-items-center">
                    <Input
                      id="fontSize"
                      type="number"
                      min={FONT_SIZE_MIN}
                      max={FONT_SIZE_MAX}
                      value={fontSizeInput}
                      onChange={handleFontSizeChange}
                      readOnly={isReadOnly}
                      disabled={isSubmitting}
                      className="tw-w-24"
                      aria-invalid={!!fontSizeError}
                      aria-describedby={fontSizeError ? 'fontSize-error' : undefined}
                    />
                    <div className="tw-flex tw-flex-wrap tw-gap-1">
                      {COMMON_FONT_SIZES.map((size) => (
                        <Button
                          key={size}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="tw-px-2 tw-py-0 tw-h-7 tw-text-xs"
                          onClick={() => handleFontSizePreset(size)}
                          disabled={isReadOnly || isSubmitting}
                        >
                          {String(size)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {fontSizeError ? (
                    <Label
                      id="fontSize-error"
                      className="tw-text-sm tw-text-destructive"
                      role="alert"
                    >
                      {fontSizeError}
                    </Label>
                  ) : undefined}
                </div>

                {/* Sample Text Preview (BHV-303) */}
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <Label>
                    {localizedStrings['%webView_languageSettings_field_sample%'] ?? 'Sample:'}
                  </Label>
                  <div
                    className="tw-rounded tw-border tw-border-input tw-bg-muted tw-p-3 tw-min-h-[60px]"
                    style={{
                      fontFamily: fontName,
                      fontSize: `${fontSize}px`,
                      direction: rightToLeft ? 'rtl' : 'ltr',
                    }}
                    aria-label={`${localizedStrings['%webView_languageSettings_field_sample%'] ?? 'Sample'}: ${fontName} ${fontSize}px`}
                  >
                    {sampleText}
                  </div>
                </div>

                {/* Right-to-Left Checkbox */}
                <div className="tw-flex tw-items-center tw-gap-2">
                  <Checkbox
                    id="rightToLeft"
                    checked={rightToLeft}
                    onCheckedChange={handleRtlChange}
                    disabled={isReadOnly || isSubmitting}
                  />
                  <Label htmlFor="rightToLeft" className="tw-cursor-pointer">
                    {localizedStrings['%webView_languageSettings_field_rightToLeft%'] ??
                      'Right-to-left'}
                  </Label>
                </div>

                {/* HTML Language (BCP 47) */}
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <Label htmlFor="htmlLanguage">
                    {localizedStrings['%webView_languageSettings_field_htmlLanguage%'] ??
                      'Language (BCP 47):'}
                  </Label>
                  <Input
                    id="htmlLanguage"
                    value={htmlLanguage}
                    onChange={handleHtmlLanguageChange}
                    readOnly={isReadOnly}
                    disabled={isSubmitting}
                    className="tw-w-48"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Graphite Tab (disabled - deferred) */}
            <TabsContent value={TAB_GRAPHITE} className="tw-flex-1 tw-overflow-y-auto tw-py-4">
              <div className="tw-text-muted-foreground tw-text-sm">{notImplementedTooltip}</div>
            </TabsContent>

            {/* Alphabetic Characters Tab */}
            <TabsContent value={TAB_CHARACTERS} className="tw-flex-1 tw-overflow-y-auto tw-py-4">
              <div className="tw-flex tw-flex-col tw-gap-4">
                {/* Separator */}
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <Label htmlFor="separator">
                    {localizedStrings['%webView_languageSettings_field_separator%'] ?? 'Separator:'}
                  </Label>
                  <Input
                    id="separator"
                    value={separator}
                    onChange={handleSeparatorChange}
                    readOnly={isReadOnly}
                    disabled={isSubmitting}
                    className="tw-w-24"
                  />
                </div>

                {/* Character Rules */}
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <Label htmlFor="characterRules">
                    {localizedStrings['%webView_languageSettings_field_characters%'] ??
                      'Characters:'}
                  </Label>
                  <Textarea
                    id="characterRules"
                    value={characterRules}
                    onChange={handleCharacterRulesChange}
                    disabled={isReadOnly || isSubmitting}
                    className="tw-min-h-[200px] tw-font-mono"
                    aria-invalid={!!characterRulesError}
                    aria-describedby={characterRulesError ? 'characterRules-error' : undefined}
                  />
                  {characterRulesError ? (
                    <Label
                      id="characterRules-error"
                      className="tw-text-sm tw-text-destructive"
                      role="alert"
                    >
                      {characterRulesError}
                    </Label>
                  ) : undefined}
                </div>

                {/* Copy From Button (disabled - deferred) */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="tw-inline-block tw-w-fit">
                      <Button type="button" variant="outline" disabled>
                        {localizedStrings['%webView_languageSettings_button_copyFrom%'] ??
                          'Copy from...'}
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{notImplementedTooltip}</TooltipContent>
                </Tooltip>
              </div>
            </TabsContent>

            {/* Other Tab (disabled - deferred) */}
            <TabsContent value={TAB_OTHER} className="tw-flex-1 tw-overflow-y-auto tw-py-4">
              <div className="tw-text-muted-foreground tw-text-sm">{notImplementedTooltip}</div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Dialog Actions */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t tw-border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleResetToDefault}
            disabled={isReadOnly || isSubmitting}
          >
            {localizedStrings['%webView_languageSettings_button_resetDefault%'] ??
              'Reset to Default'}
          </Button>
          <div className="tw-flex-1" />
          <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            {localizedStrings['%webView_languageSettings_button_cancel%'] ?? 'Cancel'}
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={hasErrors || isSubmitting}>
            {localizedStrings['%webView_languageSettings_button_ok%'] ?? 'OK'}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};
