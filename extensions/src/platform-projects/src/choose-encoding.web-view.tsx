/**
 * === NEW IN PT10 === Reason: React component pattern for Platform.Bible web views Maps to:
 * UI-PKG-004, SCR-004, BHV-109, VAL-008
 */
import type { EncoderOption } from 'platform-projects';
import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

// #region Localized String Keys

const CHOOSE_ENCODING_STRING_KEYS: LocalizeKey[] = [
  '%webView_chooseEncoding_title%',
  '%webView_chooseEncoding_encoding_label%',
  '%webView_chooseEncoding_encoding_placeholder%',
  '%webView_chooseEncoding_reverseDirection_label%',
  '%webView_chooseEncoding_button_ok%',
  '%webView_chooseEncoding_button_cancel%',
];

// #endregion

// #region Types

/** Note: ChooseEncodingState documents the web view state structure (passed via useWebViewState) */
type ChooseEncodingState = {
  encoders: EncoderOption[];
  initialEncoderName?: string;
  initialReverseDirection?: boolean;
};

// Export to prevent unused warning - used for documentation of state shape
export type { ChooseEncodingState };

interface ChooseEncodingFormOutput {
  action: 'submit' | 'cancel';
  data?: {
    encoderName: string;
    reverseDirection: boolean;
  };
}

// #endregion

/**
 * Choose Encoding Form Web View
 *
 * Simple dialog for selecting an encoding converter when creating a TransliterationWithEncoder
 * project type. Allows users to select from installed encoding converters and optionally reverse
 * the conversion direction.
 *
 * EXPLANATION:
 *
 * - Encoder dropdown populated from backend via state passed from provider
 * - Reverse direction checkbox only enabled for bidirectional encoders
 * - OK button disabled until an encoder is selected (VAL-008)
 * - Returns selected encoder and direction to parent
 *
 * Maps to: UI-PKG-004, SCR-004, BHV-109, VAL-008
 */
globalThis.webViewComponent = function ChooseEncodingWebView({ useWebViewState }: WebViewProps) {
  // #region Localization

  const [localizedStrings] = useLocalizedStrings(useMemo(() => CHOOSE_ENCODING_STRING_KEYS, []));

  const titleText = localizedStrings['%webView_chooseEncoding_title%'];
  const encodingLabelText = localizedStrings['%webView_chooseEncoding_encoding_label%'];
  const encodingPlaceholderText = localizedStrings['%webView_chooseEncoding_encoding_placeholder%'];
  const reverseDirectionLabelText =
    localizedStrings['%webView_chooseEncoding_reverseDirection_label%'];
  const okButtonText = localizedStrings['%webView_chooseEncoding_button_ok%'];
  const cancelButtonText = localizedStrings['%webView_chooseEncoding_button_cancel%'];

  // #endregion

  // #region State

  // Get initial state from web view provider
  const [encoders] = useWebViewState<EncoderOption[]>('encoders', []);
  const [initialEncoderName] = useWebViewState<string | undefined>('initialEncoderName', undefined);
  const [initialReverseDirection] = useWebViewState<boolean>('initialReverseDirection', false);

  // Form state
  const [encoderName, setEncoderName] = useState<string | undefined>(initialEncoderName);
  const [reverseDirection, setReverseDirection] = useState<boolean>(initialReverseDirection);

  // Output state for parent to read
  const [, setOutput] = useWebViewState<ChooseEncodingFormOutput | undefined>('output', undefined);

  // Initialize form with initial values when they change
  useEffect(() => {
    if (initialEncoderName !== undefined) {
      setEncoderName(initialEncoderName);
    }
    setReverseDirection(initialReverseDirection);
  }, [initialEncoderName, initialReverseDirection]);

  // #endregion

  // #region Computed State

  // Find the currently selected encoder to check if bidirectional
  const selectedEncoder = useMemo(() => {
    if (!encoderName) return undefined;
    return encoders.find((e) => e.name === encoderName);
  }, [encoders, encoderName]);

  // Reverse direction is only meaningful for bidirectional encoders
  const isBidirectional = selectedEncoder?.isBidirectional ?? false;

  // OK button is disabled until an encoder is selected (VAL-008)
  const isOkDisabled = !encoderName;

  // #endregion

  // #region Handlers

  const handleEncoderChange = useCallback(
    (value: string) => {
      setEncoderName(value);
      // Reset reverse direction when encoder changes if not bidirectional
      const encoder = encoders.find((e) => e.name === value);
      if (!encoder?.isBidirectional) {
        setReverseDirection(false);
      }
    },
    [encoders],
  );

  const handleReverseDirectionChange = useCallback((checked: boolean) => {
    setReverseDirection(checked);
  }, []);

  const handleOk = useCallback(() => {
    if (!encoderName) return;
    setOutput({
      action: 'submit',
      data: {
        encoderName,
        reverseDirection,
      },
    });
  }, [encoderName, reverseDirection, setOutput]);

  const handleCancel = useCallback(() => {
    setOutput({
      action: 'cancel',
    });
  }, [setOutput]);

  // #endregion

  // #region Render

  return (
    <div className="pr-twp tw-flex tw-h-full tw-flex-col">
      <Card className="tw-flex tw-h-full tw-flex-col tw-rounded-none tw-border-0">
        <CardHeader className="tw-flex-shrink-0 tw-pb-4">
          <CardTitle className="tw-text-lg">{titleText}</CardTitle>
        </CardHeader>

        <CardContent className="tw-flex tw-flex-grow tw-flex-col tw-gap-6 tw-px-6">
          {/* Encoding Dropdown */}
          <div className="tw-flex tw-flex-col tw-gap-2">
            <Label htmlFor="encoder-select">{encodingLabelText}</Label>
            <Select value={encoderName ?? ''} onValueChange={handleEncoderChange}>
              <SelectTrigger id="encoder-select" className="tw-w-full">
                <SelectValue placeholder={encodingPlaceholderText} />
              </SelectTrigger>
              <SelectContent>
                {encoders.map((encoder) => (
                  <SelectItem key={encoder.name} value={encoder.name}>
                    {encoder.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reverse Direction Checkbox */}
          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="reverse-direction"
              checked={reverseDirection}
              onCheckedChange={handleReverseDirectionChange}
              disabled={!isBidirectional}
            />
            <Label
              htmlFor="reverse-direction"
              className={!isBidirectional ? 'tw-text-muted-foreground' : ''}
            >
              {reverseDirectionLabelText}
            </Label>
          </div>
        </CardContent>

        <CardFooter className="tw-flex tw-flex-shrink-0 tw-justify-end tw-gap-2 tw-border-t tw-p-4">
          <Button variant="outline" onClick={handleCancel}>
            {cancelButtonText}
          </Button>
          <Button onClick={handleOk} disabled={isOkDisabled}>
            {okButtonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  // #endregion
};
