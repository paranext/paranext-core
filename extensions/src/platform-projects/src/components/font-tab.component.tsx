/**
 * === NEW IN PT10 === Reason: React component - Tab components don't exist in PT9's WinForms
 * architecture. Maps to: UI-PKG-003
 */

import {
  Button,
  Checkbox,
  ComboBox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import React, { useCallback, useMemo } from 'react';

/** Font option for the font dropdown */
export interface FontOption {
  name: string;
  isGraphite: boolean;
  supportsRightToLeft: boolean;
}

/** Props for the Font Tab component */
export interface FontTabProps {
  /** Selected font name */
  fontName: string;
  /** Font size (5-50) */
  fontSize: number;
  /** Whether the text is right-to-left */
  rightToLeft: boolean;
  /** HTML language tag (BCP 47) */
  htmlLanguage: string;
  /** Available fonts for dropdown */
  availableFonts: FontOption[];
  /** Whether fields are read-only (non-admin) */
  isReadOnly: boolean;
  /** Font size validation error */
  fontSizeError?: string;
  /** Localized strings */
  localizedStrings: Record<string, string>;
  /** Callback when font name changes */
  onFontNameChange: (fontName: string) => void;
  /** Callback when font size changes */
  onFontSizeChange: (fontSize: number) => void;
  /** Callback when RTL checkbox changes */
  onRightToLeftChange: (rightToLeft: boolean) => void;
  /** Callback when HTML language changes */
  onHtmlLanguageChange: (htmlLanguage: string) => void;
  /** Callback when reset to default is clicked */
  onResetToDefault: () => void;
  /** Whether reset to default button is enabled */
  resetToDefaultEnabled: boolean;
}

/** Common font sizes for the dropdown */
const COMMON_FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];

/**
 * Font tab component for the Language Settings form. Allows configuration of font name, size, RTL
 * setting, and HTML language tag.
 */
export function FontTab({
  fontName,
  fontSize,
  rightToLeft,
  htmlLanguage,
  availableFonts,
  isReadOnly,
  fontSizeError,
  localizedStrings,
  onFontNameChange,
  onFontSizeChange,
  onRightToLeftChange,
  onHtmlLanguageChange,
  onResetToDefault,
  resetToDefaultEnabled,
}: FontTabProps) {
  // Convert fonts to ComboBox items
  const fontOptions = useMemo(
    () =>
      availableFonts.map((font) => ({
        label: font.name,
        value: font.name,
      })),
    [availableFonts],
  );

  // Get selected font option for ComboBox
  const selectedFont = useMemo(
    () => fontOptions.find((opt) => opt.value === fontName),
    [fontOptions, fontName],
  );

  // Handle font selection
  const handleFontSelect = useCallback(
    (option: { label: string; value: string } | undefined) => {
      if (option) {
        onFontNameChange(option.value);
      }
    },
    [onFontNameChange],
  );

  // Handle font size input change
  const handleFontSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (!Number.isNaN(value)) {
        onFontSizeChange(value);
      }
    },
    [onFontSizeChange],
  );

  // Handle font size select change
  const handleFontSizeSelectChange = useCallback(
    (value: string) => {
      const size = parseInt(value, 10);
      if (!Number.isNaN(size)) {
        onFontSizeChange(size);
      }
    },
    [onFontSizeChange],
  );

  // Handle RTL checkbox change
  const handleRightToLeftChange = useCallback(
    (checked: boolean) => {
      onRightToLeftChange(checked);
    },
    [onRightToLeftChange],
  );

  // Handle HTML language change
  const handleHtmlLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onHtmlLanguageChange(e.target.value);
    },
    [onHtmlLanguageChange],
  );

  // Sample text for font preview
  const sampleText =
    localizedStrings['%webView_languageSettings_sampleText%'] ||
    'The quick brown fox jumps over the lazy dog.';

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Font selection */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="fontName">
          {localizedStrings['%webView_languageSettings_field_font%'] || 'Font:'}
        </Label>
        <ComboBox
          options={fontOptions}
          value={selectedFont}
          onChange={handleFontSelect}
          getOptionLabel={(opt) => opt.label}
          buttonPlaceholder={
            localizedStrings['%webView_languageSettings_placeholder_selectFont%'] || 'Select font'
          }
          disabled={isReadOnly}
          aria-label={localizedStrings['%webView_languageSettings_ariaLabel_fontSelect%']}
        />
      </div>

      {/* Font size - combined input and dropdown */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="fontSize">
          {localizedStrings['%webView_languageSettings_field_fontSize%'] || 'Size:'}
        </Label>
        <div className="tw-flex tw-gap-2">
          <Input
            id="fontSize"
            type="number"
            min={5}
            max={50}
            value={fontSize}
            onChange={handleFontSizeChange}
            disabled={isReadOnly}
            className="tw-w-20"
            aria-label={localizedStrings['%webView_languageSettings_ariaLabel_fontSizeInput%']}
            aria-invalid={!!fontSizeError}
            aria-describedby={fontSizeError ? 'fontSize-error' : undefined}
          />
          <Select
            value={String(fontSize)}
            onValueChange={handleFontSizeSelectChange}
            disabled={isReadOnly}
          >
            <SelectTrigger className="tw-w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COMMON_FONT_SIZES.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {fontSizeError && (
          <Label id="fontSize-error" className="tw-text-sm tw-text-destructive" role="alert">
            {fontSizeError}
          </Label>
        )}
      </div>

      {/* Sample text preview (BHV-303) */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label>{localizedStrings['%webView_languageSettings_field_sample%'] || 'Sample:'}</Label>
        <div
          className="tw-p-3 tw-border tw-border-border tw-rounded-md tw-bg-background tw-min-h-[60px]"
          style={{
            fontFamily: fontName || 'inherit',
            fontSize: `${fontSize}px`,
            direction: rightToLeft ? 'rtl' : 'ltr',
          }}
          aria-label={localizedStrings['%webView_languageSettings_ariaLabel_samplePreview%']}
        >
          {sampleText}
        </div>
      </div>

      {/* Right-to-left checkbox */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
          id="rightToLeft"
          checked={rightToLeft}
          onCheckedChange={handleRightToLeftChange}
          disabled={isReadOnly}
          aria-label={localizedStrings['%webView_languageSettings_ariaLabel_rtlCheckbox%']}
        />
        <Label htmlFor="rightToLeft" className="tw-cursor-pointer">
          {localizedStrings['%webView_languageSettings_field_rightToLeft%'] || 'Right-to-left'}
        </Label>
      </div>

      {/* HTML Language (BCP 47) */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="htmlLanguage">
          {localizedStrings['%webView_languageSettings_field_htmlLanguage%'] ||
            'Language (BCP 47):'}
        </Label>
        <Input
          id="htmlLanguage"
          type="text"
          value={htmlLanguage}
          onChange={handleHtmlLanguageChange}
          disabled={isReadOnly}
          placeholder="en, es, zh-Hans, etc."
          aria-label={localizedStrings['%webView_languageSettings_ariaLabel_htmlLanguageInput%']}
        />
      </div>

      {/* Reset to Default button */}
      <div className="tw-mt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onResetToDefault}
                  disabled={!resetToDefaultEnabled || isReadOnly}
                >
                  {localizedStrings['%webView_languageSettings_button_resetToDefault%'] ||
                    'Reset to Default'}
                </Button>
              </span>
            </TooltipTrigger>
            {!resetToDefaultEnabled && (
              <TooltipContent>
                {localizedStrings['%webView_languageSettings_tooltip_resetNotAvailable%'] ||
                  'Reset to default is not available'}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default FontTab;
