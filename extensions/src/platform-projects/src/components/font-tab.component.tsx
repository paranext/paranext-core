import React, { useCallback, useMemo } from 'react';
import {
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';

/** Common font sizes displayed in the dropdown */
const COMMON_FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];

/** Common system fonts available for selection */
const DEFAULT_FONTS = [
  'Arial',
  'Calibri',
  'Cambria',
  'Charis SIL',
  'Courier New',
  'Doulos SIL',
  'Gentium Plus',
  'Georgia',
  'Noto Sans',
  'Noto Serif',
  'Open Sans',
  'Roboto',
  'Segoe UI',
  'Tahoma',
  'Times New Roman',
  'Verdana',
];

export interface FontTabProps {
  fontName: string;
  fontSize: number;
  rightToLeft: boolean;
  htmlLanguage: string;
  validationErrors: Record<string, string>;
  readOnly: boolean;
  localizedStrings: LanguageStrings;
  onFontNameChange: (value: string) => void;
  onFontSizeChange: (value: number) => void;
  onRightToLeftChange: (checked: boolean) => void;
  onHtmlLanguageChange: (value: string) => void;
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

function FontTab({
  fontName,
  fontSize,
  rightToLeft,
  htmlLanguage,
  validationErrors,
  readOnly,
  localizedStrings,
  onFontNameChange,
  onFontSizeChange,
  onRightToLeftChange,
  onHtmlLanguageChange,
}: FontTabProps) {
  const l = useCallback(
    (key: LocalizeKey, fallback: string): string =>
      getLocalizedValue(localizedStrings, key, fallback),
    [localizedStrings],
  );

  const sampleText = useMemo(
    () =>
      l(
        '%platformProjects_languageSettings_sampleText%',
        'The quick brown fox jumps over the lazy dog',
      ),
    [l],
  );

  const handleFontSizeInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseInt(e.target.value, 10);
      if (!Number.isNaN(parsed)) {
        onFontSizeChange(parsed);
      }
    },
    [onFontSizeChange],
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Font Name */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="fontName">
          {l('%platformProjects_languageSettings_fontLabel%', 'Font:')}
        </Label>
        <Select value={fontName} onValueChange={onFontNameChange} disabled={readOnly}>
          <SelectTrigger id="fontName">
            <SelectValue
              placeholder={l('%platformProjects_languageSettings_selectFont%', 'Select font...')}
            />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_FONTS.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Size */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="fontSize">
          {l('%platformProjects_languageSettings_sizeLabel%', 'Size:')}
        </Label>
        <div className="tw-flex tw-gap-2 tw-items-center">
          <Select
            value={String(fontSize)}
            onValueChange={(val: string) => onFontSizeChange(parseInt(val, 10))}
            disabled={readOnly}
          >
            <SelectTrigger className="tw-w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COMMON_FONT_SIZES.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {String(size)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="fontSize"
            type="number"
            min={5}
            max={50}
            value={String(fontSize)}
            onChange={handleFontSizeInputChange}
            className="tw-w-20"
            disabled={readOnly}
            aria-label={l('%platformProjects_languageSettings_sizeLabel%', 'Size')}
          />
        </div>
        {validationErrors.fontSize && (
          <span className="tw-text-sm tw-text-destructive">{validationErrors.fontSize}</span>
        )}
      </div>

      {/* Right-to-Left */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
          id="rightToLeft"
          checked={rightToLeft}
          onCheckedChange={(checked: boolean | 'indeterminate') => {
            if (typeof checked === 'boolean') onRightToLeftChange(checked);
          }}
          disabled={readOnly}
        />
        <Label htmlFor="rightToLeft">
          {l('%platformProjects_languageSettings_rtlLabel%', 'Right-to-left')}
        </Label>
      </div>

      {/* Sample Text Preview */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label>{l('%platformProjects_languageSettings_sampleLabel%', 'Sample:')}</Label>
        <div
          className="tw-border tw-rounded tw-p-3 tw-min-h-[60px] tw-bg-muted/30"
          // ADR exception: inline styles required for runtime-dynamic font preview
          // (fontFamily, fontSize, direction are user-selected values that Tailwind cannot express)
          style={{
            fontFamily: fontName || 'inherit',
            fontSize: `${fontSize}px`,
            direction: rightToLeft ? 'rtl' : 'ltr',
          }}
        >
          {sampleText}
        </div>
      </div>

      {/* HTML Language (BCP 47) */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="htmlLanguage">
          {l('%platformProjects_languageSettings_htmlLanguageLabel%', 'Language (BCP 47):')}
        </Label>
        <Input
          id="htmlLanguage"
          value={htmlLanguage}
          onChange={(e) => onHtmlLanguageChange(e.target.value)}
          disabled={readOnly}
          aria-label={l(
            '%platformProjects_languageSettings_htmlLanguageLabel%',
            'Language (BCP 47)',
          )}
        />
      </div>
    </div>
  );
}

export default FontTab;
