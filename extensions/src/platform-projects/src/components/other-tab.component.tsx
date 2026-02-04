/**
 * === NEW IN PT10 === Reason: React component for Platform.Bible UI Maps to: UI-PKG-003 PT9 Source
 * Reference: LanguageSettingsForm.cs (Other tab)
 *
 * NOTE: This is a placeholder implementation with basic fields. Full implementation will be added
 * in a future update.
 */
import { Button, Input, Label } from 'platform-bible-react';

/** Props for the Other Tab component */
export interface OtherTabProps {
  /** Medial punctuation characters */
  medialPunctuation: string;
  /** Diacritic characters */
  diacritics: string;
  /** Footnote caller sequence */
  footnoteCallers: string;
  /** Cross-reference caller sequence */
  crossRefCallers: string;
  /** Verse segment suffixes */
  verseSegments: string;
  /** Word break characters */
  wordBreakChars: string;
  /** Whether user can edit settings */
  canUpdateAllSettings: boolean;
  /** Localized strings */
  localizedStrings: Record<string, string>;
  /** Callbacks for field changes */
  onMedialPunctuationChange: (value: string) => void;
  onDiacriticsChange: (value: string) => void;
  onFootnoteCallersChange: (value: string) => void;
  onCrossRefCallersChange: (value: string) => void;
  onVerseSegmentsChange: (value: string) => void;
  onWordBreakCharsChange: (value: string) => void;
}

/** Other Tab component for the Language Settings dialog. Configures miscellaneous language settings. */
export function OtherTab({
  medialPunctuation,
  diacritics,
  footnoteCallers,
  crossRefCallers,
  verseSegments,
  wordBreakChars,
  canUpdateAllSettings,
  localizedStrings,
  onMedialPunctuationChange,
  onDiacriticsChange,
  onFootnoteCallersChange,
  onCrossRefCallersChange,
  onVerseSegmentsChange,
  onWordBreakCharsChange,
}: OtherTabProps) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Medial Punctuation */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="medialPunctuation">
          {localizedStrings['%webView_languageSettings_medialPunctuation_label%'] ||
            'Medial Punctuation'}
        </Label>
        <Input
          id="medialPunctuation"
          value={medialPunctuation}
          onChange={(e) => onMedialPunctuationChange(e.target.value)}
          disabled={!canUpdateAllSettings}
          className="tw-font-mono"
          placeholder="e.g., - '"
        />
      </div>

      {/* Diacritics */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="diacritics">
          {localizedStrings['%webView_languageSettings_diacritics_label%'] || 'Diacritics'}
        </Label>
        <Input
          id="diacritics"
          value={diacritics}
          onChange={(e) => onDiacriticsChange(e.target.value)}
          disabled={!canUpdateAllSettings}
          className="tw-font-mono"
          placeholder="Space-separated diacritics"
        />
      </div>

      {/* Footnote Callers */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="footnoteCallers">
          {localizedStrings['%webView_languageSettings_footnoteCallers_label%'] ||
            'Footnote Callers'}
        </Label>
        <Input
          id="footnoteCallers"
          value={footnoteCallers}
          onChange={(e) => onFootnoteCallersChange(e.target.value)}
          disabled={!canUpdateAllSettings}
          className="tw-font-mono"
          placeholder="e.g., a b c d e"
        />
      </div>

      {/* Cross-ref Callers */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="crossRefCallers">
          {localizedStrings['%webView_languageSettings_crossRefCallers_label%'] ||
            'Cross-ref Callers'}
        </Label>
        <Input
          id="crossRefCallers"
          value={crossRefCallers}
          onChange={(e) => onCrossRefCallersChange(e.target.value)}
          disabled={!canUpdateAllSettings}
          className="tw-font-mono"
          placeholder="e.g., + * #"
        />
      </div>

      {/* Verse Segments */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="verseSegments">
          {localizedStrings['%webView_languageSettings_verseSegments_label%'] || 'Verse Segments'}
        </Label>
        <Input
          id="verseSegments"
          value={verseSegments}
          onChange={(e) => onVerseSegmentsChange(e.target.value)}
          disabled={!canUpdateAllSettings}
          className="tw-font-mono"
          placeholder="e.g., a b c"
        />
      </div>

      {/* Word Break Characters */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="wordBreakChars">
          {localizedStrings['%webView_languageSettings_wordBreakChars_label%'] ||
            'Word Break Characters'}
        </Label>
        <Input
          id="wordBreakChars"
          value={wordBreakChars}
          onChange={(e) => onWordBreakCharsChange(e.target.value)}
          disabled={!canUpdateAllSettings}
          className="tw-font-mono"
          placeholder="Characters that separate words"
        />
      </div>

      {/* Copy from button */}
      <div className="tw-flex tw-gap-2 tw-mt-2">
        <Button variant="outline" disabled={!canUpdateAllSettings}>
          {localizedStrings['%webView_languageSettings_copyFrom%'] || 'Copy from...'}
        </Button>
      </div>
    </div>
  );
}
