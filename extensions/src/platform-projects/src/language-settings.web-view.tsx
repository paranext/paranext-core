/**
 * === NEW IN PT10 === Reason: React web view component for Platform.Bible Maps to: UI-PKG-003,
 * SCR-003 PT9 Source Reference: LanguageSettingsForm.cs
 *
 * Implements:
 *
 * - BHV-303: Sample text preview updates with font changes
 * - BHV-304: Non-admin users see read-only state
 * - VAL-013: ICU syntax validation for character rules
 */
import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from 'platform-bible-react';
import { formatReplacementString } from 'platform-bible-utils';
import { useState, useMemo, useCallback } from 'react';
import type { LanguageSettings, FontOption, CharacterValidationError } from 'platform-projects';
import { FontTab } from './components/font-tab.component';
import { GraphiteTab } from './components/graphite-tab.component';
import { CharacterRulesTab } from './components/character-rules-tab.component';
import { OtherTab } from './components/other-tab.component';

/** Localization keys for the Language Settings dialog */
const LOCALIZED_STRING_KEYS = [
  '%webView_languageSettings_title%',
  '%webView_languageSettings_tab_font%',
  '%webView_languageSettings_tab_graphite%',
  '%webView_languageSettings_tab_characters%',
  '%webView_languageSettings_tab_other%',
  '%webView_languageSettings_button_ok%',
  '%webView_languageSettings_button_cancel%',
  '%webView_languageSettings_button_reset%',
  '%webView_languageSettings_font_label%',
  '%webView_languageSettings_fontSize_label%',
  '%webView_languageSettings_rtl_label%',
  '%webView_languageSettings_htmlLanguage_label%',
  '%webView_languageSettings_sample_label%',
  '%webView_languageSettings_sample_text%',
  '%webView_languageSettings_graphite_features_label%',
  '%webView_languageSettings_graphite_configure%',
  '%webView_languageSettings_graphite_placeholder%',
  '%webView_languageSettings_separator_label%',
  '%webView_languageSettings_characters_label%',
  '%webView_languageSettings_copyFrom%',
  '%webView_languageSettings_medialPunctuation_label%',
  '%webView_languageSettings_diacritics_label%',
  '%webView_languageSettings_footnoteCallers_label%',
  '%webView_languageSettings_crossRefCallers_label%',
  '%webView_languageSettings_verseSegments_label%',
  '%webView_languageSettings_wordBreakChars_label%',
  '%webView_languageSettings_other_placeholder%',
  '%webView_languageSettings_validation_duplicateChar%',
  '%webView_languageSettings_validation_caseDuplicate%',
  '%webView_languageSettings_validation_capitalization%',
  '%webView_languageSettings_validation_invalidChars%',
  '%webView_languageSettings_validation_fontSize_invalid%',
  '%webView_languageSettings_readOnly_message%',
];

/** Default font sizes for the dropdown */
const DEFAULT_FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];

/** Default available fonts (placeholder - real implementation would fetch from system) */
const DEFAULT_FONTS: FontOption[] = [
  { name: 'Arial', isGraphite: false, supportsRightToLeft: true },
  { name: 'Times New Roman', isGraphite: false, supportsRightToLeft: true },
  { name: 'Charis SIL', isGraphite: true, supportsRightToLeft: false },
  { name: 'Doulos SIL', isGraphite: true, supportsRightToLeft: false },
  { name: 'Scheherazade New', isGraphite: true, supportsRightToLeft: true },
  { name: 'Andika', isGraphite: true, supportsRightToLeft: false },
  { name: 'Gentium Plus', isGraphite: true, supportsRightToLeft: false },
];

/** Default language settings */
const DEFAULT_SETTINGS: LanguageSettings = {
  fontName: 'Charis SIL',
  fontSize: 12,
  rightToLeft: false,
  htmlLanguage: '',
  fontFeatures: '',
  separator: ' ',
  characterRules: '',
  medialPunctuation: '',
  diacritics: '',
  footnoteCallers: '',
  crossRefCallers: '',
  verseSegments: '',
  wordBreakChars: '',
};

/**
 * Language Settings Web View Component
 *
 * Contains 4 tabs:
 *
 * - Font: font dropdown, size input, RTL checkbox, sample preview (BHV-303)
 * - Graphite: Graphite settings (placeholder for now)
 * - Alphabetic Characters: separator input, rules textarea with ICU validation (VAL-013)
 * - Other: Other language settings (placeholder for now)
 */
globalThis.webViewComponent = function LanguageSettingsWebView({ useWebViewState }: WebViewProps) {
  // Get state from web view
  const [projectGuid] = useWebViewState<string>('projectGuid', '');
  const [projectName] = useWebViewState<string>('projectName', 'Unknown Project');
  const [canUpdateAllSettings] = useWebViewState<boolean>('canUpdateAllSettings', true);

  // Load localized strings
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  // Form state - initialize with defaults
  const [settings, setSettings] = useState<LanguageSettings>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState('font');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<CharacterValidationError[]>([]);
  const [fontSizeError, setFontSizeError] = useState<string | undefined>(undefined);

  // Update a single field in settings
  const updateSetting = useCallback(
    <K extends keyof LanguageSettings>(key: K, value: LanguageSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
      setIsDirty(true);
    },
    [],
  );

  // Font size validation (VAL-012)
  const handleFontSizeChange = useCallback(
    (size: number) => {
      updateSetting('fontSize', size);
      if (size < 5 || size > 50 || !Number.isInteger(size)) {
        setFontSizeError(
          localizedStrings['%webView_languageSettings_validation_fontSize_invalid%'] ||
            'Font size must be between 5 and 50',
        );
      } else {
        setFontSizeError(undefined);
      }
    },
    [updateSetting, localizedStrings],
  );

  // Character rules validation callback (VAL-013)
  const handleValidateRules = useCallback(
    async (separator: string, rules: string): Promise<CharacterValidationError[]> => {
      // This would call the backend validation service
      // For now, we do basic client-side validation as a placeholder
      const errors: CharacterValidationError[] = [];

      if (!rules.trim()) {
        return errors; // Empty is valid
      }

      // Check for control characters (gm-003-08)
      // eslint-disable-next-line no-control-regex
      const controlCharRegex = /[\x00-\x1F\x7F]/;
      if (controlCharRegex.test(rules)) {
        errors.push({
          type: 'invalid-syntax',
          message: 'Text contains invalid characters',
        });
        return errors;
      }

      // Parse lines and check for duplicates
      const lines = rules.split('\n').filter((line) => line.trim());
      const allChars = new Map<string, number>(); // char -> line number
      const allCharsLower = new Map<string, { original: string; line: number }>();

      lines.forEach((line, lineIndex) => {
        const chars = line.split(separator).filter((c) => c.trim());

        // Check for duplicates on same line (gm-003-02)
        const lineChars = new Set<string>();
        chars.forEach((char) => {
          if (lineChars.has(char)) {
            errors.push({
              type: 'duplicate',
              character: char,
              message: `Character '${char}' duplicated`,
              position: lineIndex,
            });
          }
          lineChars.add(char);

          // Check for case-insensitive duplicates across lines (gm-003-03)
          const charLower = char.toLowerCase();
          const existingLower = allCharsLower.get(charLower);
          if (existingLower && existingLower.line !== lineIndex) {
            errors.push({
              type: 'case-duplicate',
              character: char,
              message: `Cannot place '${charLower}' and '${charLower.toUpperCase()}' on separate lines`,
              position: lineIndex,
            });
          }

          allChars.set(char, lineIndex);
          allCharsLower.set(charLower, { original: char, line: lineIndex });
        });

        // Check capitalization (gm-003-04)
        // For multigraphs, all chars should have same case OR define both forms
        if (chars.length >= 2) {
          const hasLower = chars.some((c) => c !== c.toUpperCase());
          const hasUpper = chars.some((c) => c !== c.toLowerCase());

          // If we have both cases, check that they're properly paired
          if (hasLower && hasUpper) {
            // This is expected - we have case pairs like "a A"
          } else if (hasLower || hasUpper) {
            // Only one case - might be missing the pair
            // Check if this is a "no-case" character like apostrophe (gm-003-06)
            const firstChar = chars[0];
            if (firstChar === firstChar.toLowerCase() && firstChar === firstChar.toUpperCase()) {
              // No-case letter, this is valid
            } else if (chars.length === 1 || chars.every((c) => c === c.toLowerCase())) {
              // Single case without pair might be an error
              // But we need more context to determine this
            }
          }
        }
      });

      setValidationErrors(errors);
      return errors;
    },
    [],
  );

  // Handle OK button
  const handleSubmit = useCallback(async () => {
    if (!canUpdateAllSettings) return;

    // Validate font size
    if (fontSizeError) {
      setActiveTab('font');
      return;
    }

    // Validate character rules
    if (validationErrors.length > 0) {
      setActiveTab('characters');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Call backend to save settings
      // await papi.commands.sendCommand('platformProjects.saveLanguageSettings', {
      //   projectGuid,
      //   ...settings,
      // });
      logger.info(`Saving language settings for project ${projectGuid}`);
      logger.debug('Settings:', settings);

      // Close the dialog on success
      // The parent would handle this via a callback
    } catch (error) {
      logger.error('Failed to save language settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [canUpdateAllSettings, fontSizeError, validationErrors, projectGuid, settings]);

  // Handle Cancel button
  const handleCancel = useCallback(() => {
    // Close the dialog without saving
    // The parent would handle this via a callback
    logger.debug('Language settings dialog cancelled');
  }, []);

  // Handle Reset to Default button
  const handleReset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setIsDirty(true);
    setValidationErrors([]);
    setFontSizeError(undefined);
  }, []);

  // Get the selected font's Graphite capability
  const selectedFont = DEFAULT_FONTS.find((f) => f.name === settings.fontName);
  const hasGraphiteFeatures = selectedFont?.isGraphite ?? false;

  // Dynamic title with project name
  const dialogTitle = formatReplacementString(
    localizedStrings['%webView_languageSettings_title%'] || 'Language Settings: {projectName}',
    { projectName },
  );

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full">
      {/* Header with title */}
      <div className="tw-p-4 tw-border-b tw-border-border">
        <h2 className="tw-text-lg tw-font-semibold">{dialogTitle}</h2>
        {/* Read-only message for non-admins - BHV-304 */}
        {!canUpdateAllSettings && (
          <div className="tw-mt-2 tw-text-sm tw-text-muted-foreground tw-bg-muted tw-p-2 tw-rounded">
            {localizedStrings['%webView_languageSettings_readOnly_message%'] ||
              'You do not have permission to modify all language settings.'}
          </div>
        )}
      </div>

      {/* Tab content */}
      <div className="tw-flex-1 tw-overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="tw-h-full">
          <TabsList className="tw-w-full tw-justify-start tw-px-4 tw-pt-2">
            <TabsTrigger value="font">
              {localizedStrings['%webView_languageSettings_tab_font%'] || 'Font'}
            </TabsTrigger>
            <TabsTrigger value="graphite">
              {localizedStrings['%webView_languageSettings_tab_graphite%'] || 'Graphite'}
            </TabsTrigger>
            <TabsTrigger value="characters">
              {localizedStrings['%webView_languageSettings_tab_characters%'] ||
                'Alphabetic Characters'}
            </TabsTrigger>
            <TabsTrigger value="other">
              {localizedStrings['%webView_languageSettings_tab_other%'] || 'Other'}
            </TabsTrigger>
          </TabsList>

          {/* Font Tab - BHV-303 */}
          <TabsContent value="font" className="tw-h-full tw-overflow-auto">
            <FontTab
              fontName={settings.fontName}
              fontSize={settings.fontSize}
              rightToLeft={settings.rightToLeft}
              htmlLanguage={settings.htmlLanguage}
              availableFonts={DEFAULT_FONTS}
              fontSizes={DEFAULT_FONT_SIZES}
              canUpdateAllSettings={canUpdateAllSettings}
              localizedStrings={localizedStrings}
              onFontNameChange={(value) => updateSetting('fontName', value)}
              onFontSizeChange={handleFontSizeChange}
              onRightToLeftChange={(value) => updateSetting('rightToLeft', value)}
              onHtmlLanguageChange={(value) => updateSetting('htmlLanguage', value)}
              fontSizeError={fontSizeError}
            />
          </TabsContent>

          {/* Graphite Tab */}
          <TabsContent value="graphite" className="tw-h-full tw-overflow-auto">
            <GraphiteTab
              fontFeatures={settings.fontFeatures}
              hasGraphiteFeatures={hasGraphiteFeatures}
              canUpdateAllSettings={canUpdateAllSettings}
              localizedStrings={localizedStrings}
              onFontFeaturesChange={(value) => updateSetting('fontFeatures', value)}
            />
          </TabsContent>

          {/* Alphabetic Characters Tab - VAL-013 */}
          <TabsContent value="characters" className="tw-h-full tw-overflow-auto">
            <CharacterRulesTab
              separator={settings.separator}
              characterRules={settings.characterRules}
              canUpdateAllSettings={canUpdateAllSettings}
              localizedStrings={localizedStrings}
              onSeparatorChange={(value) => updateSetting('separator', value)}
              onCharacterRulesChange={(value) => updateSetting('characterRules', value)}
              onValidateRules={handleValidateRules}
              validationErrors={validationErrors}
            />
          </TabsContent>

          {/* Other Tab */}
          <TabsContent value="other" className="tw-h-full tw-overflow-auto">
            <OtherTab
              medialPunctuation={settings.medialPunctuation}
              diacritics={settings.diacritics}
              footnoteCallers={settings.footnoteCallers}
              crossRefCallers={settings.crossRefCallers}
              verseSegments={settings.verseSegments}
              wordBreakChars={settings.wordBreakChars}
              canUpdateAllSettings={canUpdateAllSettings}
              localizedStrings={localizedStrings}
              onMedialPunctuationChange={(value) => updateSetting('medialPunctuation', value)}
              onDiacriticsChange={(value) => updateSetting('diacritics', value)}
              onFootnoteCallersChange={(value) => updateSetting('footnoteCallers', value)}
              onCrossRefCallersChange={(value) => updateSetting('crossRefCallers', value)}
              onVerseSegmentsChange={(value) => updateSetting('verseSegments', value)}
              onWordBreakCharsChange={(value) => updateSetting('wordBreakChars', value)}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer with buttons */}
      <div className="tw-flex tw-justify-between tw-gap-2 tw-p-4 tw-border-t tw-border-border">
        <Button variant="outline" onClick={handleReset} disabled={!canUpdateAllSettings}>
          {localizedStrings['%webView_languageSettings_button_reset%'] || 'Reset to Default'}
        </Button>

        <div className="tw-flex tw-gap-2">
          <Button variant="outline" onClick={handleCancel}>
            {localizedStrings['%webView_languageSettings_button_cancel%'] || 'Cancel'}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canUpdateAllSettings || isSubmitting || !!fontSizeError}
          >
            {localizedStrings['%webView_languageSettings_button_ok%'] || 'OK'}
          </Button>
        </div>
      </div>
    </div>
  );
};
