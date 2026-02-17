import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Checkbox, ComboBox, Label } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';

// ============================================================================
// Types
// ============================================================================

interface EncoderOption {
  name: string;
  displayName: string;
  isBidirectional: boolean;
}

// ============================================================================
// Mock data (Phase 3 - replaced by PAPI calls in Integration phase)
// ============================================================================

const MOCK_ENCODERS: EncoderOption[] = [
  { name: 'SIL-IPA93-2001', displayName: 'SIL IPA93 2001', isBidirectional: true },
  { name: 'SIL-UNICODE-2001', displayName: 'SIL Unicode 2001', isBidirectional: false },
  { name: 'SIL-ANNAPURNA-2003', displayName: 'SIL Annapurna 2003', isBidirectional: true },
  { name: 'SIL-STILL-2005', displayName: 'SIL Still 2005', isBidirectional: false },
];

// ============================================================================
// Localized string keys
// ============================================================================

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%platformProjects_chooseEncoding_title%',
  '%platformProjects_chooseEncoding_encodingLabel%',
  '%platformProjects_chooseEncoding_selectEncoder%',
  '%platformProjects_chooseEncoding_reverseDirection%',
  '%platformProjects_button_ok%',
  '%platformProjects_button_cancel%',
];

// ============================================================================
// Helper
// ============================================================================

function getLocalizedValue(
  localizedStrings: LanguageStrings,
  key: LocalizeKey,
  fallback: string,
): string {
  const value = localizedStrings[key];
  if (typeof value === 'string') return value;
  return fallback;
}

// ============================================================================
// Main Component
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
global.webViewComponent = function ChooseEncodingWebView(_webViewProps: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  const l = useCallback(
    (key: LocalizeKey, fallback: string): string =>
      getLocalizedValue(localizedStrings, key, fallback),
    [localizedStrings],
  );

  // Form state
  const [selectedEncoderName, setSelectedEncoderName] = useState<string | undefined>(undefined);
  const [reverseDirection, setReverseDirection] = useState<boolean>(false);

  // Derive selected encoder object
  const selectedEncoder = useMemo(
    () => MOCK_ENCODERS.find((enc) => enc.name === selectedEncoderName),
    [selectedEncoderName],
  );

  // ComboBox options as ComboBoxLabelOption[]
  const encoderOptions = useMemo(
    () => MOCK_ENCODERS.map((enc) => ({ label: enc.displayName })),
    [],
  );

  // Map from display name back to encoder name
  const displayNameToName = useMemo(() => {
    const map = new Map<string, string>();
    MOCK_ENCODERS.forEach((enc) => {
      map.set(enc.displayName, enc.name);
    });
    return map;
  }, []);

  // ComboBox selected value
  const selectedComboValue = useMemo(() => {
    if (!selectedEncoder) return undefined;
    return { label: selectedEncoder.displayName };
  }, [selectedEncoder]);

  // Handlers
  const handleEncoderChange = useCallback(
    (newValue: { label: string }) => {
      const encoderName = displayNameToName.get(newValue.label);
      setSelectedEncoderName(encoderName);

      // If encoder is not bidirectional, reset reverseDirection
      const encoder = MOCK_ENCODERS.find((enc) => enc.name === encoderName);
      if (encoder && !encoder.isBidirectional) {
        setReverseDirection(false);
      }
    },
    [displayNameToName],
  );

  const handleReverseDirectionChange = useCallback((checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      setReverseDirection(checked);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    // In production: send { action: 'submit', data: { encoderName: selectedEncoderName, reverseDirection } }
    // For Phase 3, this is a no-op placeholder
  }, []);

  const handleCancel = useCallback(() => {
    // In production: return { action: 'cancel' }
  }, []);

  // Determine if reverse direction checkbox should be shown
  const showReverseDirection = selectedEncoder?.isBidirectional ?? false;
  const isSubmitDisabled = !selectedEncoderName;

  return (
    <div className="pr-twp">
      <div className="tw-flex tw-flex-col tw-h-full tw-gap-4 tw-p-4">
        {/* Title */}
        <h2 className="tw-text-xl tw-font-semibold">
          {l('%platformProjects_chooseEncoding_title%', 'Select Character Encoding')}
        </h2>

        {/* Encoding dropdown */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="encoding-combobox">
            {l('%platformProjects_chooseEncoding_encodingLabel%', 'Encoding:')}
          </Label>
          <ComboBox
            id="encoding-combobox"
            options={encoderOptions}
            value={selectedComboValue}
            onChange={handleEncoderChange}
            buttonPlaceholder={l(
              '%platformProjects_chooseEncoding_selectEncoder%',
              'Select encoder...',
            )}
            ariaLabel={l('%platformProjects_chooseEncoding_encodingLabel%', 'Encoding')}
          />
        </div>

        {/* Reverse Direction checkbox - only shown for bidirectional encoders */}
        {showReverseDirection ? (
          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="reverse-direction"
              checked={reverseDirection}
              onCheckedChange={handleReverseDirectionChange}
              aria-label={l(
                '%platformProjects_chooseEncoding_reverseDirection%',
                'Reverse Direction',
              )}
            />
            <Label htmlFor="reverse-direction">
              {l('%platformProjects_chooseEncoding_reverseDirection%', 'Reverse Direction')}
            </Label>
          </div>
        ) : undefined}

        {/* Action Buttons */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t tw-mt-auto">
          <Button type="button" variant="outline" onClick={handleCancel}>
            {l('%platformProjects_button_cancel%', 'Cancel')}
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isSubmitDisabled}>
            {l('%platformProjects_button_ok%', 'OK')}
          </Button>
        </div>
      </div>
    </div>
  );
};
