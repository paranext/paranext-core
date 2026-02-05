/**
 * === NEW IN PT10 === Reason: React component - WebViews don't exist in PT9's WinForms architecture
 * Maps to: UI-PKG-003
 */

import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Input,
  Label,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CharacterRulesTab,
  CharacterValidationError,
} from './components/character-rules-tab.component';
import { FontOption, FontTab } from './components/font-tab.component';

// ============================================================================
// LOCALIZED STRING KEYS
// ============================================================================

const LOCALIZED_STRINGS: LocalizeKey[] = [
  // Dialog
  '%webView_languageSettings_title%',
  // Tabs
  '%webView_languageSettings_tab_font%',
  '%webView_languageSettings_tab_graphite%',
  '%webView_languageSettings_tab_alphabeticCharacters%',
  '%webView_languageSettings_tab_other%',
  // Font tab fields
  '%webView_languageSettings_field_font%',
  '%webView_languageSettings_field_fontSize%',
  '%webView_languageSettings_field_sample%',
  '%webView_languageSettings_field_rightToLeft%',
  '%webView_languageSettings_field_htmlLanguage%',
  '%webView_languageSettings_sampleText%',
  '%webView_languageSettings_placeholder_selectFont%',
  // Graphite tab
  '%webView_languageSettings_field_fontFeatures%',
  '%webView_languageSettings_button_configure%',
  // Character rules tab
  '%webView_languageSettings_field_separator%',
  '%webView_languageSettings_field_characters%',
  '%webView_languageSettings_help_separator%',
  '%webView_languageSettings_help_characterRules%',
  '%webView_languageSettings_placeholder_characterRules%',
  '%webView_languageSettings_validating%',
  // Other tab
  '%webView_languageSettings_field_medialPunctuation%',
  '%webView_languageSettings_field_diacritics%',
  '%webView_languageSettings_field_footnoteCallers%',
  '%webView_languageSettings_field_crossRefCallers%',
  '%webView_languageSettings_field_verseSegments%',
  '%webView_languageSettings_field_wordBreakChars%',
  // Buttons
  '%webView_languageSettings_button_ok%',
  '%webView_languageSettings_button_cancel%',
  '%webView_languageSettings_button_resetToDefault%',
  '%webView_languageSettings_button_copyFrom%',
  // Tooltips
  '%webView_languageSettings_tooltip_resetNotAvailable%',
  '%webView_languageSettings_tooltip_copyFromNotAvailable%',
  '%webView_languageSettings_tooltip_tabNotImplemented%',
  '%webView_languageSettings_tooltip_featureNotAvailable%',
  // Validation errors
  '%webView_languageSettings_error_fontSizeRange%',
  '%webView_languageSettings_error_fontSizeInteger%',
  // Loading states
  '%webView_languageSettings_loading%',
  '%webView_languageSettings_saving%',
  // Aria labels
  '%webView_languageSettings_ariaLabel_fontSelect%',
  '%webView_languageSettings_ariaLabel_fontSizeInput%',
  '%webView_languageSettings_ariaLabel_samplePreview%',
  '%webView_languageSettings_ariaLabel_rtlCheckbox%',
  '%webView_languageSettings_ariaLabel_htmlLanguageInput%',
  '%webView_languageSettings_ariaLabel_separatorInput%',
  '%webView_languageSettings_ariaLabel_characterRulesTextarea%',
];

// ============================================================================
// INTERFACES
// ============================================================================

interface LanguageSettingsFormConfig {
  canUpdateAllSettings: boolean;
  defaultFontResetEnabled: boolean;
  hasGraphiteFeatures: boolean;
}

interface LanguageSettingsValues {
  fontName: string;
  fontSize: number;
  rightToLeft: boolean;
  htmlLanguage: string;
  fontFeatures: string;
  separator: string;
  characterRules: string;
  medialPunctuation: string;
  diacritics: string;
  footnoteCallers: string;
  crossRefCallers: string;
  verseSegments: string;
  wordBreakChars: string;
}

// ============================================================================
// WEB VIEW COMPONENT
// ============================================================================

global.webViewComponent = function LanguageSettingsWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

  // Get state from web view
  const [projectName] = useWebViewState<string>('projectName', 'Project');
  const [currentSettings] = useWebViewState<LanguageSettingsValues>('currentSettings', {
    fontName: '',
    fontSize: 12,
    rightToLeft: false,
    htmlLanguage: '',
    fontFeatures: '',
    separator: '/',
    characterRules: '',
    medialPunctuation: '',
    diacritics: '',
    footnoteCallers: '',
    crossRefCallers: '',
    verseSegments: '',
    wordBreakChars: '',
  });
  const [config] = useWebViewState<LanguageSettingsFormConfig>('config', {
    canUpdateAllSettings: true,
    defaultFontResetEnabled: true,
    hasGraphiteFeatures: false,
  });
  const [availableFonts] = useWebViewState<FontOption[]>('availableFonts', []);

  // Form state
  const [fontName, setFontName] = useState(currentSettings.fontName);
  const [fontSize, setFontSize] = useState(currentSettings.fontSize);
  const [rightToLeft, setRightToLeft] = useState(currentSettings.rightToLeft);
  const [htmlLanguage, setHtmlLanguage] = useState(currentSettings.htmlLanguage);
  const [fontFeatures] = useState(currentSettings.fontFeatures);
  const [separator, setSeparator] = useState(currentSettings.separator);
  const [characterRules, setCharacterRules] = useState(currentSettings.characterRules);
  const [medialPunctuation, setMedialPunctuation] = useState(currentSettings.medialPunctuation);
  const [diacritics, setDiacritics] = useState(currentSettings.diacritics);
  const [footnoteCallers, setFootnoteCallers] = useState(currentSettings.footnoteCallers);
  const [crossRefCallers, setCrossRefCallers] = useState(currentSettings.crossRefCallers);
  const [verseSegments, setVerseSegments] = useState(currentSettings.verseSegments);
  const [wordBreakChars, setWordBreakChars] = useState(currentSettings.wordBreakChars);

  // UI state
  const [activeTab, setActiveTab] = useState('font');
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingCharRules, setIsValidatingCharRules] = useState(false);
  const [fontSizeError, setFontSizeError] = useState<string | undefined>();
  const [characterRulesErrors, setCharacterRulesErrors] = useState<CharacterValidationError[]>([]);

  // Read-only mode for non-admin users (BHV-304)
  const isReadOnly = !config.canUpdateAllSettings;

  // ============================================================================
  // VALIDATION
  // ============================================================================

  // VAL-012: Font size validation
  const validateFontSize = useCallback(
    (size: number): boolean => {
      if (!Number.isInteger(size)) {
        setFontSizeError(
          localizedStrings['%webView_languageSettings_error_fontSizeInteger%'] ||
            'Font size must be a valid integer',
        );
        return false;
      }
      if (size < 5 || size > 50) {
        setFontSizeError(
          localizedStrings['%webView_languageSettings_error_fontSizeRange%'] ||
            'Font size must be between 5 and 50',
        );
        return false;
      }
      setFontSizeError(undefined);
      return true;
    },
    [localizedStrings],
  );

  // VAL-013: Character rules validation (calls backend)
  const validateCharacterRules = useCallback(async (rules: string): Promise<boolean> => {
    if (!rules || rules.trim().length === 0) {
      setCharacterRulesErrors([]);
      return true;
    }

    setIsValidatingCharRules(true);
    try {
      // Call backend validation service (CAP-006)
      const result = await papi.commands.sendCommand(
        'platformProjects.validateCharacterRules',
        rules,
      );

      if (result && !result.isValid && result.errors) {
        setCharacterRulesErrors(result.errors);
        return false;
      }

      setCharacterRulesErrors([]);
      return true;
    } catch (error) {
      // Backend not available - log and allow (will be validated on submit)
      logger.debug('Character rules validation failed:', error);
      setCharacterRulesErrors([]);
      return true;
    } finally {
      setIsValidatingCharRules(false);
    }
  }, []);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleFontNameChange = useCallback((value: string) => {
    setFontName(value);
    setIsDirty(true);
  }, []);

  const handleFontSizeChange = useCallback(
    (value: number) => {
      setFontSize(value);
      validateFontSize(value);
      setIsDirty(true);
    },
    [validateFontSize],
  );

  const handleRightToLeftChange = useCallback((value: boolean) => {
    setRightToLeft(value);
    setIsDirty(true);
  }, []);

  const handleHtmlLanguageChange = useCallback((value: string) => {
    setHtmlLanguage(value);
    setIsDirty(true);
  }, []);

  const handleSeparatorChange = useCallback((value: string) => {
    setSeparator(value);
    setIsDirty(true);
  }, []);

  const handleCharacterRulesChange = useCallback((value: string) => {
    setCharacterRules(value);
    setIsDirty(true);
    // Debounced validation will be triggered by useEffect
  }, []);

  // Debounced character rules validation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (characterRules) {
        validateCharacterRules(characterRules);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [characterRules, validateCharacterRules]);

  const handleOtherFieldChange = useCallback((field: string, value: string) => {
    switch (field) {
      case 'medialPunctuation':
        setMedialPunctuation(value);
        break;
      case 'diacritics':
        setDiacritics(value);
        break;
      case 'footnoteCallers':
        setFootnoteCallers(value);
        break;
      case 'crossRefCallers':
        setCrossRefCallers(value);
        break;
      case 'verseSegments':
        setVerseSegments(value);
        break;
      case 'wordBreakChars':
        setWordBreakChars(value);
        break;
      default:
        break;
    }
    setIsDirty(true);
  }, []);

  const handleResetToDefault = useCallback(() => {
    // Reset font to defaults
    logger.info('Reset to default clicked');
    // This would call backend to get default font for language
    // For now, just log
  }, []);

  const handleCopyFromClick = useCallback(() => {
    // This would open project selection dialog
    logger.info('Copy from clicked');
  }, []);

  const handleSubmit = useCallback(async () => {
    // Validate all fields
    if (!validateFontSize(fontSize)) {
      setActiveTab('font');
      return;
    }

    const charRulesValid = await validateCharacterRules(characterRules);
    if (!charRulesValid) {
      setActiveTab('alphabeticCharacters');
      return;
    }

    setIsSubmitting(true);

    try {
      const saveRequest = {
        fontName,
        fontSize,
        rightToLeft,
        htmlLanguage,
        fontFeatures,
        separator,
        characterRules,
        medialPunctuation,
        diacritics,
        footnoteCallers,
        crossRefCallers,
        verseSegments,
        wordBreakChars,
      };

      // Call backend to save settings (CAP-007)
      await papi.commands.sendCommand('platformProjects.saveLanguageSettings', saveRequest);
      logger.info('Language settings saved successfully');
      // Dialog would close on success
    } catch (error) {
      logger.error('Failed to save language settings:', error);
      // Show error to user
    } finally {
      setIsSubmitting(false);
    }
  }, [
    fontSize,
    characterRules,
    validateFontSize,
    validateCharacterRules,
    fontName,
    rightToLeft,
    htmlLanguage,
    fontFeatures,
    separator,
    medialPunctuation,
    diacritics,
    footnoteCallers,
    crossRefCallers,
    verseSegments,
    wordBreakChars,
  ]);

  const handleCancel = useCallback(() => {
    logger.info('Cancel clicked');
    // Close the web view
  }, []);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-bg-background">
      {/* Title */}
      <div className="tw-p-4 tw-border-b tw-border-border">
        <h1 className="tw-text-lg tw-font-semibold tw-text-foreground">
          {localizedStrings['%webView_languageSettings_title%']?.replace(
            '{projectName}',
            projectName,
          ) || `Language Settings: ${projectName}`}
        </h1>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="tw-flex-1 tw-flex tw-flex-col tw-overflow-hidden"
      >
        <TabsList className="tw-w-full tw-justify-start tw-border-b tw-border-border tw-bg-background tw-rounded-none">
          <TabsTrigger value="font">
            {localizedStrings['%webView_languageSettings_tab_font%'] || 'Font'}
          </TabsTrigger>
          <TabsTrigger value="graphite">
            {localizedStrings['%webView_languageSettings_tab_graphite%'] || 'Graphite'}
          </TabsTrigger>
          <TabsTrigger value="alphabeticCharacters">
            {localizedStrings['%webView_languageSettings_tab_alphabeticCharacters%'] ||
              'Alphabetic Characters'}
          </TabsTrigger>
          <TabsTrigger value="other">
            {localizedStrings['%webView_languageSettings_tab_other%'] || 'Other'}
          </TabsTrigger>
        </TabsList>

        {/* Tab content */}
        <div className="tw-flex-1 tw-overflow-auto">
          {/* Font Tab */}
          <TabsContent value="font" className="tw-mt-0 tw-h-full">
            <FontTab
              fontName={fontName}
              fontSize={fontSize}
              rightToLeft={rightToLeft}
              htmlLanguage={htmlLanguage}
              availableFonts={availableFonts}
              isReadOnly={isReadOnly}
              fontSizeError={fontSizeError}
              localizedStrings={localizedStrings}
              onFontNameChange={handleFontNameChange}
              onFontSizeChange={handleFontSizeChange}
              onRightToLeftChange={handleRightToLeftChange}
              onHtmlLanguageChange={handleHtmlLanguageChange}
              onResetToDefault={handleResetToDefault}
              resetToDefaultEnabled={config.defaultFontResetEnabled}
            />
          </TabsContent>

          {/* Graphite Tab */}
          <TabsContent value="graphite" className="tw-mt-0 tw-h-full">
            <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label>
                  {localizedStrings['%webView_languageSettings_field_fontFeatures%'] ||
                    'Font Features:'}
                </Label>
                <div className="tw-p-3 tw-border tw-border-border tw-rounded-md tw-bg-muted tw-min-h-[60px] tw-text-muted-foreground">
                  {fontFeatures || 'No font features configured'}
                </div>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={!config.hasGraphiteFeatures || isReadOnly}
                      >
                        {localizedStrings['%webView_languageSettings_button_configure%'] ||
                          'Configure...'}
                      </Button>
                    </span>
                  </TooltipTrigger>
                  {!config.hasGraphiteFeatures && (
                    <TooltipContent>
                      {localizedStrings['%webView_languageSettings_tooltip_featureNotAvailable%'] ||
                        'Graphite features are not available for this font'}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </TabsContent>

          {/* Alphabetic Characters Tab */}
          <TabsContent value="alphabeticCharacters" className="tw-mt-0 tw-h-full">
            <CharacterRulesTab
              separator={separator}
              characterRules={characterRules}
              isReadOnly={isReadOnly}
              validationErrors={characterRulesErrors}
              isValidating={isValidatingCharRules}
              localizedStrings={localizedStrings}
              onSeparatorChange={handleSeparatorChange}
              onCharacterRulesChange={handleCharacterRulesChange}
              onCopyFromClick={handleCopyFromClick}
              copyFromEnabled={false}
            />
          </TabsContent>

          {/* Other Tab */}
          <TabsContent value="other" className="tw-mt-0 tw-h-full">
            <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
              {/* Medial Punctuation */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="medialPunctuation">
                  {localizedStrings['%webView_languageSettings_field_medialPunctuation%'] ||
                    'Medial Punctuation:'}
                </Label>
                <Input
                  id="medialPunctuation"
                  type="text"
                  value={medialPunctuation}
                  onChange={(e) => handleOtherFieldChange('medialPunctuation', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>

              {/* Diacritics (BHV-308: displayed with spacing for readability) */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="diacritics">
                  {localizedStrings['%webView_languageSettings_field_diacritics%'] || 'Diacritics:'}
                </Label>
                <Input
                  id="diacritics"
                  type="text"
                  value={diacritics}
                  onChange={(e) => handleOtherFieldChange('diacritics', e.target.value)}
                  disabled={isReadOnly}
                  className="tw-tracking-widest"
                />
              </div>

              {/* Footnote Callers */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="footnoteCallers">
                  {localizedStrings['%webView_languageSettings_field_footnoteCallers%'] ||
                    'Footnote Callers:'}
                </Label>
                <Input
                  id="footnoteCallers"
                  type="text"
                  value={footnoteCallers}
                  onChange={(e) => handleOtherFieldChange('footnoteCallers', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>

              {/* Cross-ref Callers */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="crossRefCallers">
                  {localizedStrings['%webView_languageSettings_field_crossRefCallers%'] ||
                    'Cross-ref Callers:'}
                </Label>
                <Input
                  id="crossRefCallers"
                  type="text"
                  value={crossRefCallers}
                  onChange={(e) => handleOtherFieldChange('crossRefCallers', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>

              {/* Verse Segments */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="verseSegments">
                  {localizedStrings['%webView_languageSettings_field_verseSegments%'] ||
                    'Verse Segments:'}
                </Label>
                <Input
                  id="verseSegments"
                  type="text"
                  value={verseSegments}
                  onChange={(e) => handleOtherFieldChange('verseSegments', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>

              {/* Word Break Characters */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="wordBreakChars">
                  {localizedStrings['%webView_languageSettings_field_wordBreakChars%'] ||
                    'Word Break Characters:'}
                </Label>
                <Input
                  id="wordBreakChars"
                  type="text"
                  value={wordBreakChars}
                  onChange={(e) => handleOtherFieldChange('wordBreakChars', e.target.value)}
                  disabled={isReadOnly}
                />
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
                          onClick={handleCopyFromClick}
                          disabled={isReadOnly}
                        >
                          {localizedStrings['%webView_languageSettings_button_copyFrom%'] ||
                            'Copy from...'}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {localizedStrings[
                        '%webView_languageSettings_tooltip_copyFromNotAvailable%'
                      ] || 'Copy from other projects is not yet available'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Action buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t tw-border-border">
        <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
          {localizedStrings['%webView_languageSettings_button_cancel%'] || 'Cancel'}
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || isReadOnly || !isDirty}
        >
          {isSubmitting ? (
            <>
              <Spinner className="tw-mr-2 tw-h-4 tw-w-4" />
              {localizedStrings['%webView_languageSettings_saving%'] || 'Saving...'}
            </>
          ) : (
            localizedStrings['%webView_languageSettings_button_ok%'] || 'OK'
          )}
        </Button>
      </div>
    </div>
  );
};
