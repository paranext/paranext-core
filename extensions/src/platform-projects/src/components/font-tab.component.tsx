/**
 * === NEW IN PT10 === Reason: React component for Platform.Bible UI Maps to: UI-PKG-003, BHV-303,
 * BHV-304 PT9 Source Reference: LanguageSettingsForm.cs (Font tab)
 */
import { Checkbox, ComboBox, Input, Label } from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';
import React, { useMemo } from 'react';
import type { FontOption } from 'platform-projects';

/** Props for the Font Tab component */
export interface FontTabProps {
  /** Selected font name */
  fontName: string;
  /** Font size in points */
  fontSize: number;
  /** Whether the text is right-to-left */
  rightToLeft: boolean;
  /** HTML language tag (BCP 47) */
  htmlLanguage: string;
  /** Available font options */
  availableFonts: FontOption[];
  /** Available font sizes */
  fontSizes: number[];
  /** Whether user can edit all settings */
  canUpdateAllSettings: boolean;
  /** Localized strings */
  localizedStrings: LanguageStrings;
  /** Callback when font name changes */
  onFontNameChange: (fontName: string) => void;
  /** Callback when font size changes */
  onFontSizeChange: (fontSize: number) => void;
  /** Callback when RTL setting changes */
  onRightToLeftChange: (rtl: boolean) => void;
  /** Callback when HTML language changes */
  onHtmlLanguageChange: (htmlLanguage: string) => void;
  /** Validation error for font size */
  fontSizeError?: string;
}

/**
 * Font Tab component for the Language Settings dialog. Allows configuration of font, size, RTL
 * direction, and shows a sample preview.
 *
 * BHV-303: Sample text preview updates with font changes BHV-304: Non-admin users see read-only
 * state
 */
export function FontTab({
  fontName,
  fontSize,
  rightToLeft,
  htmlLanguage,
  availableFonts,
  fontSizes,
  canUpdateAllSettings,
  localizedStrings,
  onFontNameChange,
  onFontSizeChange,
  onRightToLeftChange,
  onHtmlLanguageChange,
  fontSizeError,
}: FontTabProps) {
  // Convert font options to ComboBox items
  const fontOptions = useMemo(
    () =>
      availableFonts.map((font) => ({
        label: font.name,
        value: font.name,
      })),
    [availableFonts],
  );

  // Convert font sizes to ComboBox items
  const sizeOptions = useMemo(
    () =>
      fontSizes.map((size) => ({
        label: size.toString(),
        value: size.toString(),
      })),
    [fontSizes],
  );

  // Handle font size input (allow typing custom sizes)
  const handleFontSizeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!Number.isNaN(value)) {
      onFontSizeChange(value);
    }
  };

  // Sample text for preview - this will change with the selected font
  const sampleText =
    localizedStrings['%webView_languageSettings_sample_text%'] ||
    'The quick brown fox jumps over the lazy dog. 0123456789';

  // Create the dynamic font style for the sample preview
  const sampleStyle: React.CSSProperties = useMemo(
    () => ({
      fontFamily: fontName || 'inherit',
      fontSize: `${fontSize}pt`,
      direction: rightToLeft ? 'rtl' : 'ltr',
    }),
    [fontName, fontSize, rightToLeft],
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Font dropdown */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="fontName">
          {localizedStrings['%webView_languageSettings_font_label%'] || 'Font'}
        </Label>
        <ComboBox
          options={fontOptions}
          value={fontOptions.find((opt) => opt.value === fontName)}
          onChange={(value) => onFontNameChange(value?.value || '')}
          isDisabled={!canUpdateAllSettings}
          buttonClassName="tw-w-full"
        />
      </div>

      {/* Font size */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="fontSize">
          {localizedStrings['%webView_languageSettings_fontSize_label%'] || 'Size'}
        </Label>
        <div className="tw-flex tw-gap-2 tw-items-center">
          <Input
            id="fontSize"
            type="number"
            value={fontSize}
            onChange={handleFontSizeInputChange}
            className="tw-w-20"
            min={5}
            max={50}
            disabled={!canUpdateAllSettings}
          />
          <ComboBox
            options={sizeOptions}
            value={sizeOptions.find((opt) => opt.value === fontSize.toString())}
            onChange={(value) => onFontSizeChange(parseInt(value?.value || '12', 10))}
            isDisabled={!canUpdateAllSettings}
            buttonClassName="tw-w-24"
          />
        </div>
        {fontSizeError && <Label className="tw-text-sm tw-text-destructive">{fontSizeError}</Label>}
      </div>

      {/* Right-to-left checkbox */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
          id="rightToLeft"
          checked={rightToLeft}
          onCheckedChange={(checked) => onRightToLeftChange(checked === true)}
          disabled={!canUpdateAllSettings}
        />
        <Label htmlFor="rightToLeft" className="tw-cursor-pointer">
          {localizedStrings['%webView_languageSettings_rtl_label%'] || 'Right-to-left'}
        </Label>
      </div>

      {/* HTML Language (BCP 47) */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="htmlLanguage">
          {localizedStrings['%webView_languageSettings_htmlLanguage_label%'] || 'Language (BCP 47)'}
        </Label>
        <Input
          id="htmlLanguage"
          value={htmlLanguage}
          onChange={(e) => onHtmlLanguageChange(e.target.value)}
          placeholder="e.g., en, es, ar"
          disabled={!canUpdateAllSettings}
          className="tw-w-48"
        />
      </div>

      {/* Sample text preview - BHV-303 */}
      <div className="tw-flex tw-flex-col tw-gap-1 tw-mt-4">
        <Label>{localizedStrings['%webView_languageSettings_sample_label%'] || 'Sample'}</Label>
        <div
          className="tw-p-4 tw-border tw-border-border tw-rounded-md tw-bg-muted/50 tw-min-h-20"
          style={sampleStyle}
        >
          {sampleText}
        </div>
      </div>
    </div>
  );
}
