import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, Checkbox, Label } from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface EncoderOption {
  name: string;
  displayName: string;
  isBidirectional: boolean;
}

// ============================================================================
// LOCALIZED STRING KEYS
// ============================================================================

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%webView_chooseEncoding_title%',
  '%webView_chooseEncoding_field_encoding%',
  '%webView_chooseEncoding_field_reverseDirection%',
  '%webView_chooseEncoding_button_ok%',
  '%webView_chooseEncoding_button_cancel%',
  '%webView_chooseEncoding_placeholder_selectEncoder%',
];

// ============================================================================
// HELPERS
// ============================================================================

/** Type guard for EncoderOption */
function isEncoderOption(item: unknown): item is EncoderOption {
  if (!item || typeof item !== 'object') return false;
  return (
    'name' in item &&
    typeof item.name === 'string' &&
    'displayName' in item &&
    typeof item.displayName === 'string' &&
    'isBidirectional' in item &&
    typeof item.isBidirectional === 'boolean'
  );
}

/** Parse encoders from web view state, handling JSON string or object */
function parseEncoders(raw: unknown): EncoderOption[] {
  if (!raw) return [];
  let arr: unknown[];
  if (typeof raw === 'string') {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      arr = parsed;
    } catch {
      return [];
    }
  } else if (Array.isArray(raw)) {
    arr = raw;
  } else {
    return [];
  }
  return arr.filter(isEncoderOption);
}

/** Get localized string with fallback */
function loc(strings: LanguageStrings, key: LocalizeKey, fallback: string): string {
  return strings[key] ?? fallback;
}

// ============================================================================
// COMPONENT
// ============================================================================

global.webViewComponent = function ChooseEncodingWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRING_KEYS, []));

  // Read encoder list from web view state (populated by provider)
  const [encodersRaw] = useWebViewState<string>('encoders', '[]');
  const [initialEncoderName] = useWebViewState<string>('initialEncoderName', '');
  const [initialReverseDirection] = useWebViewState<boolean>('initialReverseDirection', false);

  const encoders = useMemo(() => parseEncoders(encodersRaw), [encodersRaw]);

  // Form state
  const [encoderName, setEncoderName] = useState<string>(initialEncoderName || '');
  const [reverseDirection, setReverseDirection] = useState<boolean>(initialReverseDirection);

  // Derived state
  const selectedEncoder = useMemo(
    () => encoders.find((e) => e.name === encoderName),
    [encoders, encoderName],
  );

  const isBidirectional = selectedEncoder?.isBidirectional ?? false;
  const isEncoderSelected = encoderName !== '';

  // ---- Event Handlers ----

  const handleEncoderChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newName = e.target.value;
      setEncoderName(newName);

      // If new encoder is not bidirectional, reset reverse direction
      const newEncoder = encoders.find((enc) => enc.name === newName);
      if (!newEncoder?.isBidirectional) {
        setReverseDirection(false);
      }
    },
    [encoders],
  );

  const handleReverseDirectionChange = useCallback((checked: boolean | 'indeterminate') => {
    setReverseDirection(checked === true);
  }, []);

  const handleSubmit = useCallback(() => {
    if (isEncoderSelected) {
      // In integration phase, this would send the result back to the parent
      // via papi.commands or web view messaging with encoderName and reverseDirection
    }
  }, [isEncoderSelected]);

  const handleCancel = useCallback(() => {
    // In integration phase, this would close the web view
  }, []);

  return (
    <div
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-bg-background tw-p-4"
      data-testid="choose-encoding-form"
    >
      {/* Title */}
      <h2 className="tw-text-lg tw-font-semibold tw-text-foreground tw-mb-4">
        {loc(localizedStrings, '%webView_chooseEncoding_title%', 'Select Character Encoding')}
      </h2>

      {/* Form Content */}
      <div className="tw-flex tw-flex-col tw-gap-4 tw-flex-1">
        {/* Encoding Dropdown */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="encoding">
            {loc(localizedStrings, '%webView_chooseEncoding_field_encoding%', 'Encoding:')}
          </Label>
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            id="encoding"
            value={encoderName}
            onChange={handleEncoderChange}
            className="tw-w-full tw-rounded tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm"
            aria-label={loc(
              localizedStrings,
              '%webView_chooseEncoding_field_encoding%',
              'Encoding',
            )}
          >
            <option value="" disabled>
              {loc(
                localizedStrings,
                '%webView_chooseEncoding_placeholder_selectEncoder%',
                'Select an encoder...',
              )}
            </option>
            {encoders.map((encoder) => (
              <option key={encoder.name} value={encoder.name}>
                {encoder.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* Reverse Direction Checkbox */}
        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="reverseDirection"
            checked={reverseDirection}
            onCheckedChange={handleReverseDirectionChange}
            disabled={!isBidirectional}
          />
          <Label
            htmlFor="reverseDirection"
            className={`tw-cursor-pointer ${!isBidirectional ? 'tw-text-muted-foreground' : ''}`}
          >
            {loc(
              localizedStrings,
              '%webView_chooseEncoding_field_reverseDirection%',
              'Reverse Direction',
            )}
          </Label>
        </div>
      </div>

      {/* Dialog Actions */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t tw-border-border">
        <Button type="button" variant="outline" onClick={handleCancel}>
          {loc(localizedStrings, '%webView_chooseEncoding_button_cancel%', 'Cancel')}
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={!isEncoderSelected}>
          {loc(localizedStrings, '%webView_chooseEncoding_button_ok%', 'OK')}
        </Button>
      </div>
    </div>
  );
};
