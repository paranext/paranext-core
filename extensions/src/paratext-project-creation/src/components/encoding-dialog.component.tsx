import { useCallback, useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import papi, { logger } from '@papi/frontend';
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Alert,
  AlertDescription,
  Spinner,
  usePromise,
} from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { CircleCheck, AlertCircle } from 'lucide-react';
import type { EncodingInfo, ChooseEncodingFormProps } from 'paratext-project-creation';

const DEFAULT_SAMPLE_TEXT = `\\id MAT
\\c 1
\\v 1 Sample text in the project's language...`;

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectCreation_chooseEncoding_title%',
  '%projectCreation_chooseEncoding_encoding%',
  '%projectCreation_chooseEncoding_sampleText%',
  '%projectCreation_chooseEncoding_test%',
  '%projectCreation_chooseEncoding_testSuccess%',
  '%projectCreation_chooseEncoding_testFailure%',
  '%general_ok%',
  '%general_cancel%',
];

async function getAvailableEncodings(): Promise<EncodingInfo[]> {
  try {
    return await papi.commands.sendCommand('paratextProjectCreation.getAvailableEncodings');
  } catch (error) {
    logger.warn(`Failed to get available encodings: ${getErrorMessage(error)}`);
    // Return common encodings as fallback
    return [
      { codePage: 65001, name: 'UTF-8', displayName: 'Unicode (UTF-8)' },
      { codePage: 1200, name: 'UTF-16 LE', displayName: 'Unicode (UTF-16 Little Endian)' },
      { codePage: 1201, name: 'UTF-16 BE', displayName: 'Unicode (UTF-16 Big Endian)' },
      { codePage: 1252, name: 'Windows-1252', displayName: 'Western European (Windows)' },
      { codePage: 28591, name: 'ISO-8859-1', displayName: 'Western European (ISO)' },
    ];
  }
}

/**
 * Choose Encoding Form (CAP-UI-004)
 *
 * A dialog that allows users to select the text encoding for their project files. Displays a
 * dropdown of available encodings and provides a live preview of how sample text will appear with
 * the selected encoding. A "Test" button allows users to verify that the encoding can correctly
 * round-trip the sample text.
 */
export function EncodingDialog({
  currentEncoding,
  sampleText,
  onConfirm,
  onCancel,
}: ChooseEncodingFormProps) {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  // State
  const [selectedEncoding, setSelectedEncoding] = useState<EncodingInfo>(currentEncoding);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Load available encodings
  const [availableEncodings, isLoadingEncodings] = usePromise(
    getAvailableEncodings,
    useMemo(() => [currentEncoding], [currentEncoding]),
  );

  // Reset test result when encoding changes
  useEffect(() => {
    setTestResult(null);
  }, [selectedEncoding]);

  // Handle encoding selection
  const handleEncodingChange = useCallback(
    (codePage: string) => {
      const encoding = availableEncodings.find((e) => e.codePage.toString() === codePage);
      if (encoding) {
        setSelectedEncoding(encoding);
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
        sampleText || DEFAULT_SAMPLE_TEXT,
      );
      setTestResult(result);
    } catch (error) {
      logger.warn(`Encoding test failed: ${getErrorMessage(error)}`);
      setTestResult({
        success: false,
        message: localizedStrings['%projectCreation_chooseEncoding_testFailure%'],
      });
    } finally {
      setIsTesting(false);
    }
  }, [selectedEncoding, sampleText, localizedStrings]);

  // Handle OK button click
  const handleOk = useCallback(() => {
    onConfirm(selectedEncoding);
  }, [selectedEncoding, onConfirm]);

  // Handle keyboard events - Enter to submit
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && !e.defaultPrevented) {
        e.preventDefault();
        handleOk();
      }
    },
    [handleOk],
  );

  const displaySampleText = sampleText || DEFAULT_SAMPLE_TEXT;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4" onKeyDown={handleKeyDown}>
      {/* Title */}
      <h2 className="tw-text-lg tw-font-semibold">
        {localizedStrings['%projectCreation_chooseEncoding_title%']}
      </h2>

      {/* Encoding Dropdown */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="encoding-select">
          {localizedStrings['%projectCreation_chooseEncoding_encoding%']}
        </Label>
        <Select
          value={selectedEncoding.codePage.toString()}
          onValueChange={handleEncodingChange}
          disabled={isLoadingEncodings}
        >
          <SelectTrigger id="encoding-select" className="tw-w-full">
            <SelectValue placeholder="Select encoding..." />
          </SelectTrigger>
          <SelectContent>
            {availableEncodings.map((encoding) => (
              <SelectItem key={encoding.codePage} value={encoding.codePage.toString()}>
                {encoding.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sample Text Preview */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="sample-text">
          {localizedStrings['%projectCreation_chooseEncoding_sampleText%']}
        </Label>
        <Textarea
          id="sample-text"
          className="tw-min-h-[120px] tw-font-mono"
          value={displaySampleText}
          readOnly
        />
      </div>

      {/* Test Result */}
      {testResult && (
        <Alert variant={testResult.success ? 'default' : 'destructive'}>
          {testResult.success ? (
            <CircleCheck className="tw-h-4 tw-w-4" />
          ) : (
            <AlertCircle className="tw-h-4 tw-w-4" />
          )}
          <AlertDescription>
            {testResult.success
              ? localizedStrings['%projectCreation_chooseEncoding_testSuccess%']
              : testResult.message ||
                localizedStrings['%projectCreation_chooseEncoding_testFailure%']}
          </AlertDescription>
        </Alert>
      )}

      {/* Buttons */}
      <div className="tw-flex tw-justify-between tw-pt-4">
        <Button variant="outline" onClick={handleTest} disabled={isTesting}>
          {isTesting ? (
            <>
              <Spinner className="tw-mr-2" />
              {localizedStrings['%projectCreation_chooseEncoding_test%']}
            </>
          ) : (
            localizedStrings['%projectCreation_chooseEncoding_test%']
          )}
        </Button>
        <div className="tw-flex tw-gap-2">
          <Button variant="outline" onClick={onCancel}>
            {localizedStrings['%general_cancel%']}
          </Button>
          <Button variant="default" onClick={handleOk}>
            {localizedStrings['%general_ok%']}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EncodingDialog;
