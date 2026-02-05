/**
 * === NEW IN PT10 === Reason: Web views don't exist in PT9's WinForms architecture. Maps to:
 * UI-PKG-004
 *
 * Choose Encoding Form - Simple dialog for selecting an encoding converter when creating a
 * TransliterationWithEncoder project type. Implements BHV-109 (encoder selection), VAL-008 (encoder
 * required)
 */

import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// #region Localized string keys

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%webView_chooseEncoding_title%',
  '%webView_chooseEncoding_field_encoding%',
  '%webView_chooseEncoding_field_reverseDirection%',
  '%webView_chooseEncoding_placeholder_selectEncoder%',
  '%webView_chooseEncoding_ariaLabel_encodingSelect%',
  '%webView_chooseEncoding_ariaLabel_reverseDirectionCheckbox%',
  '%webView_projectProperties_button_ok%',
  '%webView_projectProperties_button_cancel%',
];

// #endregion

// #region Types

/** Represents an encoding converter option */
export interface EncoderOption {
  /** Internal name of the encoder */
  name: string;
  /** Display name shown to user */
  displayName: string;
  /** If true, the encoder can work in both directions */
  isBidirectional: boolean;
}

/** Input configuration for the Choose Encoding form */
export interface ChooseEncodingFormInput {
  /** Available encoder options */
  options: {
    encoders: EncoderOption[];
  };
  /** Initial values for edit mode */
  initialValues?: {
    encoderName: string;
    reverseDirection: boolean;
  };
}

/** Internal form state */
interface ChooseEncodingFormState {
  encoderName: string | undefined;
  reverseDirection: boolean;
}

/** Output returned when form closes */
export interface ChooseEncodingFormOutput {
  action: 'submit' | 'cancel';
  data?: {
    encoderName: string;
    reverseDirection: boolean;
  };
}

// #endregion

// #region Helper functions

/**
 * Get a localized string with fallback
 *
 * @param localizedStrings - The localized strings object
 * @param key - The localization key
 * @param fallback - Fallback value if key not found
 * @returns The localized string or fallback
 */
function getLocalizedString(
  localizedStrings: LanguageStrings,
  key: LocalizeKey,
  fallback: string,
): string {
  const value = localizedStrings[key];
  return typeof value === 'string' ? value : fallback;
}

// #endregion

// #region Component

globalThis.webViewComponent = function ChooseEncodingForm({
  useWebViewState,
  updateWebViewDefinition,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // Get input from web view state
  const [options] = useWebViewState<ChooseEncodingFormInput['options']>('options', {
    encoders: [],
  });

  const [initialValues] = useWebViewState<ChooseEncodingFormInput['initialValues'] | undefined>(
    'initialValues',
    undefined,
  );

  // Track output (for submit/cancel)
  const [, setOutput] = useWebViewState<ChooseEncodingFormOutput | undefined>('output', undefined);

  // Form state
  const [formState, setFormState] = useState<ChooseEncodingFormState>(() => ({
    encoderName: initialValues?.encoderName,
    reverseDirection: initialValues?.reverseDirection ?? false,
  }));

  // Ref for focus management
  // eslint-disable-next-line no-null/no-null -- useRef requires null for DOM refs
  const selectTriggerRef = useRef<HTMLButtonElement>(null);

  // Focus encoding dropdown on mount
  useEffect(() => {
    selectTriggerRef.current?.focus();
  }, []);

  // Sync with initial values when they change
  useEffect(() => {
    if (initialValues) {
      setFormState({
        encoderName: initialValues.encoderName,
        reverseDirection: initialValues.reverseDirection,
      });
    }
  }, [initialValues]);

  // Get the currently selected encoder
  const selectedEncoder = useMemo(() => {
    if (!formState.encoderName) return undefined;
    return options.encoders.find((e) => e.name === formState.encoderName);
  }, [formState.encoderName, options.encoders]);

  // Handle encoder selection change
  const handleEncoderChange = useCallback(
    (value: string) => {
      const encoder = options.encoders.find((e) => e.name === value);

      setFormState((prev) => ({
        ...prev,
        encoderName: value || undefined,
        // Reset reverse direction if encoder is not bidirectional
        reverseDirection: encoder?.isBidirectional ? prev.reverseDirection : false,
      }));
    },
    [options.encoders],
  );

  // Handle reverse direction change
  const handleReverseDirectionChange = useCallback((checked: boolean | 'indeterminate') => {
    setFormState((prev) => ({
      ...prev,
      reverseDirection: checked === true,
    }));
  }, []);

  // Handle submit
  const handleSubmit = useCallback(() => {
    if (!formState.encoderName) return;

    const output: ChooseEncodingFormOutput = {
      action: 'submit',
      data: {
        encoderName: formState.encoderName,
        reverseDirection: formState.reverseDirection,
      },
    };

    setOutput(output);
    updateWebViewDefinition({ state: { output } });
  }, [formState.encoderName, formState.reverseDirection, setOutput, updateWebViewDefinition]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    const output: ChooseEncodingFormOutput = {
      action: 'cancel',
    };

    setOutput(output);
    updateWebViewDefinition({ state: { output } });
  }, [setOutput, updateWebViewDefinition]);

  // Check if OK button should be disabled (VAL-008.1: encoder required)
  const isOkDisabled = !formState.encoderName;

  return (
    <div className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4">
      {/* Form Content */}
      <div className="tw-flex tw-flex-col tw-gap-4 tw-flex-1">
        {/* Encoding Field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="encoding">
            {getLocalizedString(
              localizedStrings,
              '%webView_chooseEncoding_field_encoding%',
              'Encoding:',
            )}
            <span aria-hidden="true" className="tw-text-destructive">
              {' '}
              *
            </span>
            <span className="tw-sr-only"> (required)</span>
          </Label>
          <Select value={formState.encoderName} onValueChange={handleEncoderChange}>
            <SelectTrigger
              ref={selectTriggerRef}
              className="tw-w-full"
              aria-label={getLocalizedString(
                localizedStrings,
                '%webView_chooseEncoding_ariaLabel_encodingSelect%',
                'Encoding selection',
              )}
            >
              <SelectValue
                placeholder={getLocalizedString(
                  localizedStrings,
                  '%webView_chooseEncoding_placeholder_selectEncoder%',
                  'Select encoder...',
                )}
              />
            </SelectTrigger>
            <SelectContent>
              {options.encoders.map((encoder) => (
                <SelectItem key={encoder.name} value={encoder.name}>
                  {encoder.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reverse Direction Checkbox - only shown for bidirectional encoders */}
        {selectedEncoder?.isBidirectional && (
          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="reverseDirection"
              checked={formState.reverseDirection}
              onCheckedChange={handleReverseDirectionChange}
              aria-label={getLocalizedString(
                localizedStrings,
                '%webView_chooseEncoding_ariaLabel_reverseDirectionCheckbox%',
                'Reverse direction checkbox',
              )}
            />
            <Label htmlFor="reverseDirection" className="tw-cursor-pointer">
              {getLocalizedString(
                localizedStrings,
                '%webView_chooseEncoding_field_reverseDirection%',
                'Reverse Direction',
              )}
            </Label>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-mt-4 tw-pt-4 tw-border-t tw-border-border">
        <Button type="button" variant="outline" onClick={handleCancel}>
          {getLocalizedString(
            localizedStrings,
            '%webView_projectProperties_button_cancel%',
            'Cancel',
          )}
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={isOkDisabled}>
          {getLocalizedString(localizedStrings, '%webView_projectProperties_button_ok%', 'OK')}
        </Button>
      </div>
    </div>
  );
};

// #endregion
