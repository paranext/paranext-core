import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  Button,
  cn,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import type { ChooseEncodingFormProps, EncodingInfo } from 'paratext-project-creation';

/** Default encoding (UTF-8) used as fallback when fetching encodings fails. */
const DEFAULT_UTF8_ENCODING: EncodingInfo = {
  codePage: 65001,
  name: 'UTF-8',
  displayName: 'Unicode (UTF-8)',
};

/** Default sample text shown when none is provided. */
const DEFAULT_SAMPLE_TEXT = `\\id MAT
\\c 1
\\v 1 Sample text in the project's language...`;

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%paratextProjectCreation_chooseEncodingForm_title%',
  '%paratextProjectCreation_chooseEncodingForm_encoding%',
  '%paratextProjectCreation_chooseEncodingForm_sampleText%',
  '%paratextProjectCreation_chooseEncodingForm_test%',
  '%paratextProjectCreation_chooseEncodingForm_ok%',
  '%paratextProjectCreation_chooseEncodingForm_cancel%',
  '%paratextProjectCreation_chooseEncodingForm_loading%',
  '%paratextProjectCreation_chooseEncodingForm_testPassed%',
  '%paratextProjectCreation_chooseEncodingForm_testFailed%',
];

/**
 * Modal dialog for selecting a text encoding for project files. Displays a dropdown of available
 * encodings, a sample text preview, and a test button to verify round-trip encoding.
 */
export function ChooseEncodingForm({
  currentEncoding,
  sampleText: providedSampleText,
  onConfirm,
  onCancel,
}: ChooseEncodingFormProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // Loading state for initial encoding fetch
  const [isLoadingEncodings, setIsLoadingEncodings] = useState(true);
  const [availableEncodings, setAvailableEncodings] = useState<EncodingInfo[]>([]);
  const [selectedEncoding, setSelectedEncoding] = useState<EncodingInfo>(currentEncoding);

  // Sample text (read-only preview)
  const sampleText = providedSampleText || DEFAULT_SAMPLE_TEXT;

  // Test state
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const isMountedRef = useRef(true);
  const selectTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Fetch available encodings on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const encodings = await papi.commands.sendCommand(
          'paratextProjectCreation.getAvailableEncodings',
        );
        if (!cancelled && isMountedRef.current) {
          setAvailableEncodings(encodings);
        }
      } catch (err: unknown) {
        logger.warn(
          `Failed to fetch available encodings: ${getErrorMessage(err)}. Using UTF-8 default.`,
        );
        if (!cancelled && isMountedRef.current) {
          setAvailableEncodings([DEFAULT_UTF8_ENCODING]);
        }
      } finally {
        if (!cancelled && isMountedRef.current) {
          setIsLoadingEncodings(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Focus encoding select on mount after loading
  useEffect(() => {
    if (!isLoadingEncodings) {
      selectTriggerRef.current?.focus();
    }
  }, [isLoadingEncodings]);

  // Handle encoding selection change
  const handleEncodingChange = useCallback(
    (codePageStr: string) => {
      const codePage = Number(codePageStr);
      const encoding = availableEncodings.find((e) => e.codePage === codePage);
      if (encoding) {
        setSelectedEncoding(encoding);
        // Clear previous test result when encoding changes
        setTestResult(null);
      }
    },
    [availableEncodings],
  );

  // Handle test button click
  const handleTest = useCallback(async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await papi.commands.sendCommand(
        'paratextProjectCreation.testEncodingRoundTrip',
        selectedEncoding,
        sampleText,
      );
      if (isMountedRef.current) {
        setTestResult(result);
      }
    } catch (err: unknown) {
      logger.warn(`Encoding round-trip test failed: ${getErrorMessage(err)}`);
      if (isMountedRef.current) {
        setTestResult({
          success: false,
          message: 'Encoding test failed. Could not complete round-trip test.',
        });
      }
    } finally {
      if (isMountedRef.current) {
        setIsTesting(false);
      }
    }
  }, [selectedEncoding, sampleText]);

  // Handle OK
  const handleConfirm = useCallback(() => {
    onConfirm(selectedEncoding);
  }, [selectedEncoding, onConfirm]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        // Don't submit when focus is inside the select dropdown
        const target = e.target as HTMLElement;
        if (target.getAttribute('role') !== 'option') {
          e.preventDefault();
          handleConfirm();
        }
      }
    },
    [onCancel, handleConfirm],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      className="pr-twp tw-flex tw-flex-col tw-gap-4 tw-p-4"
      role="dialog"
      aria-label={
        localizedStrings['%paratextProjectCreation_chooseEncodingForm_title%'] || 'Choose Encoding'
      }
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      {/* Title */}
      <h2 className="tw-text-lg tw-font-semibold">
        {localizedStrings['%paratextProjectCreation_chooseEncodingForm_title%'] ||
          'Choose Encoding'}
      </h2>

      {/* Encoding Dropdown */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="encoding-select">
          {localizedStrings['%paratextProjectCreation_chooseEncodingForm_encoding%'] || 'Encoding'}
        </Label>
        {isLoadingEncodings ? (
          <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-muted-foreground">
            <Loader2 className="tw-h-4 tw-w-4 tw-animate-spin" />
            {localizedStrings['%paratextProjectCreation_chooseEncodingForm_loading%'] ||
              'Loading encodings...'}
          </div>
        ) : (
          <Select value={String(selectedEncoding.codePage)} onValueChange={handleEncodingChange}>
            <SelectTrigger ref={selectTriggerRef} id="encoding-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableEncodings.map((encoding) => (
                <SelectItem key={encoding.codePage} value={String(encoding.codePage)}>
                  {encoding.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Sample Text Preview */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="sample-text-preview">
          {localizedStrings['%paratextProjectCreation_chooseEncodingForm_sampleText%'] ||
            'Sample text'}
        </Label>
        <Textarea
          id="sample-text-preview"
          value={sampleText}
          readOnly
          className="tw-min-h-[100px] tw-font-mono tw-text-sm"
          aria-readonly="true"
        />
      </div>

      {/* Test Result */}
      {testResult && (
        <Alert variant={testResult.success ? 'default' : 'destructive'}>
          {testResult.success ? (
            <CheckCircle2 className="tw-h-4 tw-w-4" />
          ) : (
            <AlertCircle className="tw-h-4 tw-w-4" />
          )}
          <AlertDescription>{testResult.message}</AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Button variant="outline" onClick={handleTest} disabled={isTesting || isLoadingEncodings}>
          {isTesting && <Loader2 className="tw-mr-2 tw-h-4 tw-w-4 tw-animate-spin" />}
          {localizedStrings['%paratextProjectCreation_chooseEncodingForm_test%'] || 'Test'}
        </Button>
        <div className="tw-flex-1" />
        <Button variant="outline" onClick={onCancel}>
          {localizedStrings['%paratextProjectCreation_chooseEncodingForm_cancel%'] || 'Cancel'}
        </Button>
        <Button variant="default" onClick={handleConfirm} disabled={isLoadingEncodings}>
          {localizedStrings['%paratextProjectCreation_chooseEncodingForm_ok%'] || 'OK'}
        </Button>
      </div>
    </div>
  );
}
