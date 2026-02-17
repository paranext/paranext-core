import { WebViewProps } from '@papi/core';
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
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useReducer } from 'react';
import FontTab from './components/font-tab.component';
import CharacterRulesTab from './components/character-rules-tab.component';

// ============================================================================
// Localized string keys
// ============================================================================

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  // Title
  '%platformProjects_languageSettings_title%',
  // Tab labels
  '%platformProjects_languageSettings_tabFont%',
  '%platformProjects_languageSettings_tabGraphite%',
  '%platformProjects_languageSettings_tabAlphabetic%',
  '%platformProjects_languageSettings_tabOther%',
  // Font tab
  '%platformProjects_languageSettings_fontLabel%',
  '%platformProjects_languageSettings_sizeLabel%',
  '%platformProjects_languageSettings_selectFont%',
  '%platformProjects_languageSettings_rtlLabel%',
  '%platformProjects_languageSettings_sampleLabel%',
  '%platformProjects_languageSettings_sampleText%',
  '%platformProjects_languageSettings_htmlLanguageLabel%',
  // Graphite tab
  '%platformProjects_languageSettings_fontFeaturesLabel%',
  '%platformProjects_languageSettings_configureButton%',
  // Alphabetic Characters tab
  '%platformProjects_languageSettings_separatorLabel%',
  '%platformProjects_languageSettings_charactersLabel%',
  '%platformProjects_languageSettings_copyFromButton%',
  // Other tab
  '%platformProjects_languageSettings_medialPunctuationLabel%',
  '%platformProjects_languageSettings_diacriticsLabel%',
  '%platformProjects_languageSettings_footnoteCallersLabel%',
  '%platformProjects_languageSettings_crossRefCallersLabel%',
  '%platformProjects_languageSettings_verseSegmentsLabel%',
  '%platformProjects_languageSettings_wordBreakCharsLabel%',
  // Action buttons
  '%platformProjects_button_ok%',
  '%platformProjects_button_cancel%',
  '%platformProjects_languageSettings_resetButton%',
  // Validation
  '%platformProjects_languageSettings_validation_fontSizeRange%',
  '%platformProjects_languageSettings_validation_fontSizeInteger%',
  '%platformProjects_languageSettings_validation_invalidCharacters%',
  // Disabled tooltip
  '%platformProjects_comingSoon%',
];

// ============================================================================
// State types and reducer
// ============================================================================

interface LanguageSettingsFormState {
  // Font tab
  fontName: string;
  fontSize: number;
  rightToLeft: boolean;
  htmlLanguage: string;

  // Graphite tab
  fontFeatures: string;

  // Alphabetic Characters tab
  separator: string;
  characterRules: string;

  // Other tab
  medialPunctuation: string;
  diacritics: string;
  footnoteCallers: string;
  crossRefCallers: string;
  verseSegments: string;
  wordBreakChars: string;

  // UI state
  activeTab: string;
  isDirty: boolean;
  validationErrors: Record<string, string>;
  isSubmitting: boolean;
}

type LanguageSettingsAction =
  | { type: 'SET_FONT_NAME'; payload: string }
  | { type: 'SET_FONT_SIZE'; payload: number }
  | { type: 'SET_RIGHT_TO_LEFT'; payload: boolean }
  | { type: 'SET_HTML_LANGUAGE'; payload: string }
  | { type: 'SET_SEPARATOR'; payload: string }
  | { type: 'SET_CHARACTER_RULES'; payload: string }
  | { type: 'SET_MEDIAL_PUNCTUATION'; payload: string }
  | { type: 'SET_DIACRITICS'; payload: string }
  | { type: 'SET_FOOTNOTE_CALLERS'; payload: string }
  | { type: 'SET_CROSS_REF_CALLERS'; payload: string }
  | { type: 'SET_VERSE_SEGMENTS'; payload: string }
  | { type: 'SET_WORD_BREAK_CHARS'; payload: string }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_VALIDATION_ERRORS'; payload: Record<string, string> }
  | { type: 'RESET_TO_DEFAULT' };

function createInitialState(): LanguageSettingsFormState {
  return {
    fontName: 'Charis SIL',
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
    activeTab: 'font',
    isDirty: false,
    validationErrors: {},
    isSubmitting: false,
  };
}

function languageSettingsReducer(
  state: LanguageSettingsFormState,
  action: LanguageSettingsAction,
): LanguageSettingsFormState {
  switch (action.type) {
    case 'SET_FONT_NAME':
      return { ...state, fontName: action.payload, isDirty: true };

    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload, isDirty: true };

    case 'SET_RIGHT_TO_LEFT':
      return { ...state, rightToLeft: action.payload, isDirty: true };

    case 'SET_HTML_LANGUAGE':
      return { ...state, htmlLanguage: action.payload, isDirty: true };

    case 'SET_SEPARATOR':
      return { ...state, separator: action.payload, isDirty: true };

    case 'SET_CHARACTER_RULES':
      return { ...state, characterRules: action.payload, isDirty: true };

    case 'SET_MEDIAL_PUNCTUATION':
      return { ...state, medialPunctuation: action.payload, isDirty: true };

    case 'SET_DIACRITICS':
      return { ...state, diacritics: action.payload, isDirty: true };

    case 'SET_FOOTNOTE_CALLERS':
      return { ...state, footnoteCallers: action.payload, isDirty: true };

    case 'SET_CROSS_REF_CALLERS':
      return { ...state, crossRefCallers: action.payload, isDirty: true };

    case 'SET_VERSE_SEGMENTS':
      return { ...state, verseSegments: action.payload, isDirty: true };

    case 'SET_WORD_BREAK_CHARS':
      return { ...state, wordBreakChars: action.payload, isDirty: true };

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };

    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };

    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload };

    case 'RESET_TO_DEFAULT':
      return {
        ...state,
        fontName: 'Charis SIL',
        fontSize: 12,
        isDirty: true,
      };

    default:
      return state;
  }
}

// ============================================================================
// Validation
// ============================================================================

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

/** VAL-012: Font size validation */
function validateFontSize(fontSize: number, localizedStrings: LanguageStrings): string | undefined {
  if (!Number.isInteger(fontSize)) {
    return getLocalizedValue(
      localizedStrings,
      '%platformProjects_languageSettings_validation_fontSizeInteger%',
      'Font size must be a valid integer',
    );
  }
  if (fontSize < 5 || fontSize > 50) {
    return getLocalizedValue(
      localizedStrings,
      '%platformProjects_languageSettings_validation_fontSizeRange%',
      'Font size must be between 5 and 50',
    );
  }
  return undefined;
}

function validateForm(
  state: LanguageSettingsFormState,
  localizedStrings: LanguageStrings,
): Record<string, string> {
  const errors: Record<string, string> = {};

  // VAL-012: Font size
  const fontSizeError = validateFontSize(state.fontSize, localizedStrings);
  if (fontSizeError) {
    errors.fontSize = fontSizeError;
  }

  // VAL-013: Character rules (basic client-side check - full validation delegated to backend)
  // For now, we do a simple check for obviously invalid characters
  if (state.characterRules.trim().length > 0) {
    // Check for unbalanced brackets/parentheses as a basic syntax check
    const openBrackets = (state.characterRules.match(/\[/g) || []).length;
    const closeBrackets = (state.characterRules.match(/\]/g) || []).length;
    if (openBrackets !== closeBrackets) {
      errors.characterRules = getLocalizedValue(
        localizedStrings,
        '%platformProjects_languageSettings_validation_invalidCharacters%',
        'Text contains invalid characters',
      );
    }
  }

  return errors;
}

// ============================================================================
// Main Component
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
global.webViewComponent = function LanguageSettingsWebView(_webViewProps: WebViewProps) {
  const [state, dispatch] = useReducer(languageSettingsReducer, undefined, createInitialState);
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  const l = useCallback(
    (key: LocalizeKey, fallback: string): string =>
      getLocalizedValue(localizedStrings, key, fallback),
    [localizedStrings],
  );

  // Config flags (in production these would come from input props/PAPI)
  const canUpdateAllSettings = true;
  const defaultFontResetEnabled = true;
  const hasGraphiteFeatures = false;

  // Handlers
  const handleFontNameChange = useCallback((value: string) => {
    dispatch({ type: 'SET_FONT_NAME', payload: value });
  }, []);

  const handleFontSizeChange = useCallback(
    (value: number) => {
      dispatch({ type: 'SET_FONT_SIZE', payload: value });
      // VAL-012: Validate on-change
      const error = validateFontSize(value, localizedStrings);
      if (error) {
        dispatch({
          type: 'SET_VALIDATION_ERRORS',
          payload: { ...state.validationErrors, fontSize: error },
        });
      } else {
        const updatedErrors = { ...state.validationErrors };
        delete updatedErrors.fontSize;
        dispatch({ type: 'SET_VALIDATION_ERRORS', payload: updatedErrors });
      }
    },
    [localizedStrings, state.validationErrors],
  );

  const handleRightToLeftChange = useCallback((checked: boolean) => {
    dispatch({ type: 'SET_RIGHT_TO_LEFT', payload: checked });
  }, []);

  const handleHtmlLanguageChange = useCallback((value: string) => {
    dispatch({ type: 'SET_HTML_LANGUAGE', payload: value });
  }, []);

  const handleSeparatorChange = useCallback((value: string) => {
    dispatch({ type: 'SET_SEPARATOR', payload: value });
  }, []);

  const handleCharacterRulesChange = useCallback((value: string) => {
    dispatch({ type: 'SET_CHARACTER_RULES', payload: value });
  }, []);

  const handleMedicalPunctuationChange = useCallback((value: string) => {
    dispatch({ type: 'SET_MEDIAL_PUNCTUATION', payload: value });
  }, []);

  const handleDiacriticsChange = useCallback((value: string) => {
    dispatch({ type: 'SET_DIACRITICS', payload: value });
  }, []);

  const handleFootnoteCallersChange = useCallback((value: string) => {
    dispatch({ type: 'SET_FOOTNOTE_CALLERS', payload: value });
  }, []);

  const handleCrossRefCallersChange = useCallback((value: string) => {
    dispatch({ type: 'SET_CROSS_REF_CALLERS', payload: value });
  }, []);

  const handleVerseSegmentsChange = useCallback((value: string) => {
    dispatch({ type: 'SET_VERSE_SEGMENTS', payload: value });
  }, []);

  const handleWordBreakCharsChange = useCallback((value: string) => {
    dispatch({ type: 'SET_WORD_BREAK_CHARS', payload: value });
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  }, []);

  const handleResetToDefault = useCallback(() => {
    dispatch({ type: 'RESET_TO_DEFAULT' });
  }, []);

  const handleSubmit = useCallback(() => {
    const errors = validateForm(state, localizedStrings);
    dispatch({ type: 'SET_VALIDATION_ERRORS', payload: errors });

    if (Object.keys(errors).length > 0) {
      // Switch to tab with first error
      if (errors.fontSize) {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: 'font' });
      } else if (errors.characterRules) {
        dispatch({ type: 'SET_ACTIVE_TAB', payload: 'alphabetic' });
      }
      return;
    }

    dispatch({ type: 'SET_SUBMITTING', payload: true });

    // In production: call platformProjects.saveLanguageSettings via PAPI
    setTimeout(() => {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }, 1000);
  }, [state, localizedStrings]);

  const handleCancel = useCallback(() => {
    // In production: close the dialog
  }, []);

  const comingSoonText = l('%platformProjects_comingSoon%', 'Coming soon - not yet implemented');
  const readOnly = !canUpdateAllSettings;

  return (
    <div className="pr-twp">
      <div className="tw-flex tw-flex-col tw-h-full tw-gap-4 tw-p-4">
        {/* Title */}
        <h2 className="tw-text-xl tw-font-semibold">
          {l('%platformProjects_languageSettings_title%', 'Language Settings')}
        </h2>

        {/* Tabs */}
        <Tabs value={state.activeTab} onValueChange={handleTabChange} defaultValue="font">
          <TabsList>
            <TabsTrigger value="font">
              {l('%platformProjects_languageSettings_tabFont%', 'Font')}
            </TabsTrigger>
            <TabsTrigger value="graphite">
              {l('%platformProjects_languageSettings_tabGraphite%', 'Graphite')}
            </TabsTrigger>
            <TabsTrigger value="alphabetic">
              {l('%platformProjects_languageSettings_tabAlphabetic%', 'Alphabetic Characters')}
            </TabsTrigger>
            <TabsTrigger value="other">
              {l('%platformProjects_languageSettings_tabOther%', 'Other')}
            </TabsTrigger>
          </TabsList>

          {/* Font Tab */}
          <TabsContent value="font">
            <FontTab
              fontName={state.fontName}
              fontSize={state.fontSize}
              rightToLeft={state.rightToLeft}
              htmlLanguage={state.htmlLanguage}
              validationErrors={state.validationErrors}
              readOnly={readOnly}
              localizedStrings={localizedStrings}
              onFontNameChange={handleFontNameChange}
              onFontSizeChange={handleFontSizeChange}
              onRightToLeftChange={handleRightToLeftChange}
              onHtmlLanguageChange={handleHtmlLanguageChange}
            />
          </TabsContent>

          {/* Graphite Tab */}
          <TabsContent value="graphite">
            <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label>
                  {l('%platformProjects_languageSettings_fontFeaturesLabel%', 'Font Features:')}
                </Label>
                <div className="tw-border tw-rounded tw-p-3 tw-min-h-[40px] tw-bg-muted/30 tw-text-muted-foreground">
                  {state.fontFeatures ||
                    l('%platformProjects_comingSoon%', 'No font features configured')}
                </div>
              </div>
              <div className="tw-flex tw-justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button type="button" variant="outline" disabled={!hasGraphiteFeatures}>
                          {l('%platformProjects_languageSettings_configureButton%', 'Configure...')}
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{comingSoonText}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </TabsContent>

          {/* Alphabetic Characters Tab */}
          <TabsContent value="alphabetic">
            <CharacterRulesTab
              separator={state.separator}
              characterRules={state.characterRules}
              validationErrors={state.validationErrors}
              readOnly={readOnly}
              localizedStrings={localizedStrings}
              onSeparatorChange={handleSeparatorChange}
              onCharacterRulesChange={handleCharacterRulesChange}
            />
          </TabsContent>

          {/* Other Tab */}
          <TabsContent value="other">
            <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
              {/* Medial Punctuation */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="medialPunctuation">
                  {l(
                    '%platformProjects_languageSettings_medialPunctuationLabel%',
                    'Medial Punctuation:',
                  )}
                </Label>
                <Input
                  id="medialPunctuation"
                  value={state.medialPunctuation}
                  onChange={(e) => handleMedicalPunctuationChange(e.target.value)}
                  disabled={readOnly}
                  aria-label={l(
                    '%platformProjects_languageSettings_medialPunctuationLabel%',
                    'Medial Punctuation',
                  )}
                />
              </div>

              {/* Diacritics */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="diacritics">
                  {l('%platformProjects_languageSettings_diacriticsLabel%', 'Diacritics:')}
                </Label>
                <Input
                  id="diacritics"
                  value={state.diacritics}
                  onChange={(e) => handleDiacriticsChange(e.target.value)}
                  disabled={readOnly}
                  className="tw-tracking-widest"
                  aria-label={l(
                    '%platformProjects_languageSettings_diacriticsLabel%',
                    'Diacritics',
                  )}
                />
              </div>

              {/* Footnote Callers */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="footnoteCallers">
                  {l(
                    '%platformProjects_languageSettings_footnoteCallersLabel%',
                    'Footnote Callers:',
                  )}
                </Label>
                <Input
                  id="footnoteCallers"
                  value={state.footnoteCallers}
                  onChange={(e) => handleFootnoteCallersChange(e.target.value)}
                  disabled={readOnly}
                  aria-label={l(
                    '%platformProjects_languageSettings_footnoteCallersLabel%',
                    'Footnote Callers',
                  )}
                />
              </div>

              {/* Cross-ref Callers */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="crossRefCallers">
                  {l(
                    '%platformProjects_languageSettings_crossRefCallersLabel%',
                    'Cross-ref Callers:',
                  )}
                </Label>
                <Input
                  id="crossRefCallers"
                  value={state.crossRefCallers}
                  onChange={(e) => handleCrossRefCallersChange(e.target.value)}
                  disabled={readOnly}
                  aria-label={l(
                    '%platformProjects_languageSettings_crossRefCallersLabel%',
                    'Cross-ref Callers',
                  )}
                />
              </div>

              {/* Verse Segments */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="verseSegments">
                  {l('%platformProjects_languageSettings_verseSegmentsLabel%', 'Verse Segments:')}
                </Label>
                <Input
                  id="verseSegments"
                  value={state.verseSegments}
                  onChange={(e) => handleVerseSegmentsChange(e.target.value)}
                  disabled={readOnly}
                  aria-label={l(
                    '%platformProjects_languageSettings_verseSegmentsLabel%',
                    'Verse Segments',
                  )}
                />
              </div>

              {/* Word Break Characters */}
              <div className="tw-flex tw-flex-col tw-gap-1">
                <Label htmlFor="wordBreakChars">
                  {l(
                    '%platformProjects_languageSettings_wordBreakCharsLabel%',
                    'Word Break Characters:',
                  )}
                </Label>
                <Input
                  id="wordBreakChars"
                  value={state.wordBreakChars}
                  onChange={(e) => handleWordBreakCharsChange(e.target.value)}
                  disabled={readOnly}
                  aria-label={l(
                    '%platformProjects_languageSettings_wordBreakCharsLabel%',
                    'Word Break Characters',
                  )}
                />
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
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResetToDefault}
                    disabled={!defaultFontResetEnabled || state.isSubmitting || readOnly}
                  >
                    {l('%platformProjects_languageSettings_resetButton%', 'Reset to Default')}
                  </Button>
                </span>
              </TooltipTrigger>
              {!defaultFontResetEnabled && <TooltipContent>{comingSoonText}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={state.isSubmitting}
          >
            {l('%platformProjects_button_cancel%', 'Cancel')}
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={state.isSubmitting}>
            {state.isSubmitting ? <Spinner /> : l('%platformProjects_button_ok%', 'OK')}
          </Button>
        </div>
      </div>
    </div>
  );
};
