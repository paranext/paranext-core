/**
 * === NEW IN PT10 === Reason: React component for Platform.Bible UI Maps to: UI-PKG-003 PT9 Source
 * Reference: LanguageSettingsForm.cs (Graphite tab)
 *
 * NOTE: This is a placeholder implementation. Graphite font feature configuration is a complex
 * feature that may be deferred to a later release.
 */
import { Button, Label, Textarea } from 'platform-bible-react';

/** Props for the Graphite Tab component */
export interface GraphiteTabProps {
  /** Current font features string */
  fontFeatures: string;
  /** Whether the selected font has Graphite features */
  hasGraphiteFeatures: boolean;
  /** Whether user can edit settings */
  canUpdateAllSettings: boolean;
  /** Localized strings */
  localizedStrings: Record<string, string>;
  /** Callback when font features change */
  onFontFeaturesChange: (features: string) => void;
}

/**
 * Graphite Tab component for the Language Settings dialog. Displays and configures Graphite font
 * features.
 *
 * Currently a placeholder - full Graphite feature configuration will be implemented in a future
 * update.
 */
export function GraphiteTab({
  fontFeatures,
  hasGraphiteFeatures,
  canUpdateAllSettings,
  localizedStrings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFontFeaturesChange,
}: GraphiteTabProps) {
  const placeholderMessage =
    localizedStrings['%webView_languageSettings_graphite_placeholder%'] ||
    'Graphite font feature configuration will be added in a future update.';

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Font Features display */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label>
          {localizedStrings['%webView_languageSettings_graphite_features_label%'] ||
            'Font Features'}
        </Label>
        <Textarea
          value={fontFeatures}
          readOnly
          className="tw-min-h-20 tw-font-mono tw-text-sm"
          placeholder="No font features configured"
        />
      </div>

      {/* Configure button (disabled placeholder) */}
      <div className="tw-flex tw-gap-2">
        <Button variant="outline" disabled={!hasGraphiteFeatures || !canUpdateAllSettings}>
          {localizedStrings['%webView_languageSettings_graphite_configure%'] || 'Configure...'}
        </Button>
      </div>

      {/* Placeholder message */}
      <div className="tw-p-4 tw-bg-muted tw-rounded-md tw-text-muted-foreground tw-text-sm">
        {placeholderMessage}
      </div>
    </div>
  );
}
