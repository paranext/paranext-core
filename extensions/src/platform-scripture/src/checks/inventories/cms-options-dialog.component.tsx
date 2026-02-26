import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import type { InventoryOptionValue } from 'platform-scripture';

/** Metadata for a CMS option (BHV-106, BHV-119) */
export type CMSOptionInfo = {
  /** Internal option name */
  name: string;
  /** Description of what this option controls */
  description: string;
  /** Whether this option is a Yes/No toggle */
  isYesNo: boolean;
  /** Default value */
  defaultValue: string;
};

/** Matched Pairs check options configuration (BHV-106) */
const MATCHED_PAIRS_OPTIONS: CMSOptionInfo[] = [
  {
    name: 'PairedPunctuation',
    description:
      'Define punctuation pairs that should be matched. Enter pairs as open/close characters separated by slash, e.g., (/) [/] {/}',
    isYesNo: false,
    defaultValue: '(/) [/] {/}',
  },
  {
    name: 'ClosedByParagraph',
    description: 'Whether unmatched pairs at paragraph end are flagged as errors.',
    isYesNo: true,
    defaultValue: 'No',
  },
  {
    name: 'PoeticStyles',
    description: 'Which markers are treated as poetic and will not trigger paragraph closure.',
    isYesNo: false,
    defaultValue: 'ib iq iq1 iq2 iq3 q q1 q2 q3 q4 qc qr qs qa qac qm qm1 qm2 qm3 b',
  },
  {
    name: 'IntroductionOutlineStyles',
    description:
      'Which markers are treated as introduction outlines (first-word closing punctuation exempt).',
    isYesNo: false,
    defaultValue: 'io io1 io2 io3 io4',
  },
];

/** NullValue sentinel used by ParatextData for empty option values (BHV-119) */
const NULL_VALUE_SENTINEL = 'NullValue';

const CMS_OPTIONS_DIALOG_STRING_KEYS: LocalizeKey[] = [
  '%webView_matchedPairsInventory_optionsDialog_title%',
  '%webView_matchedPairsInventory_optionsDialog_optionName%',
  '%webView_matchedPairsInventory_optionsDialog_description%',
  '%webView_matchedPairsInventory_optionsDialog_value%',
  '%webView_matchedPairsInventory_optionsDialog_ok%',
  '%webView_matchedPairsInventory_optionsDialog_cancel%',
  '%webView_matchedPairsInventory_optionsDialog_yes%',
  '%webView_matchedPairsInventory_optionsDialog_no%',
  '%webView_matchedPairsInventory_optionsDialog_invalidPair%',
  '%webView_matchedPairsInventory_optionsDialog_multiCharError%',
];

/**
 * Validates paired punctuation format (VAL-001, VAL-002). Format: Space-delimited pairs where each
 * pair is "opener/closer" Each half must be exactly one character.
 */
function validatePairsString(value: string): { valid: boolean; error?: string } {
  if (!value.trim()) return { valid: true };

  const pairs = value.trim().split(/\s+/);
  for (const pair of pairs) {
    const parts = pair.split('/');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      return { valid: false, error: `Invalid Pair: ${pair}` };
    }
    // VAL-002: Each half must be exactly one character
    if ([...parts[0]].length > 1 || [...parts[1]].length > 1) {
      return {
        valid: false,
        error:
          'Multiple character punctuation marks are not allowed. Each side of a pair must be a single character.',
      };
    }
  }
  return { valid: true };
}

type CMSOptionsDialogProps = {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback to close the dialog */
  onClose: () => void;
  /** Current option values from the data provider */
  optionValues: InventoryOptionValue[];
  /** Callback to save changed option values */
  onSave: (changedValues: InventoryOptionValue[]) => void;
  /** Whether the project is write-protected (VAL-005) */
  isProtected?: boolean;
};

/**
 * CMS Options Dialog component (SCR-002). Allows users to configure check-specific inventory
 * options for the Matched Pairs check. Renders as a modal overlay within the inventory web view.
 */
export function CMSOptionsDialog({
  isOpen,
  onClose,
  optionValues,
  onSave,
  isProtected = false,
}: CMSOptionsDialogProps) {
  const [localizedStrings] = useLocalizedStrings(CMS_OPTIONS_DIALOG_STRING_KEYS);

  const titleLabel =
    localizedStrings['%webView_matchedPairsInventory_optionsDialog_title%'] || 'Options';
  const optionNameLabel =
    localizedStrings['%webView_matchedPairsInventory_optionsDialog_optionName%'] || 'Option Name';
  const descriptionLabel =
    localizedStrings['%webView_matchedPairsInventory_optionsDialog_description%'] || 'Description';
  const valueLabel =
    localizedStrings['%webView_matchedPairsInventory_optionsDialog_value%'] || 'Value';
  const okLabel = localizedStrings['%webView_matchedPairsInventory_optionsDialog_ok%'] || 'OK';
  const cancelLabel =
    localizedStrings['%webView_matchedPairsInventory_optionsDialog_cancel%'] || 'Cancel';
  const yesLabel = localizedStrings['%webView_matchedPairsInventory_optionsDialog_yes%'] || 'Yes';
  const noLabel = localizedStrings['%webView_matchedPairsInventory_optionsDialog_no%'] || 'No';

  // State: selected option index
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  // State: working copy of edited values
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  // State: validation error message
  const [validationError, setValidationError] = useState<string | null>(null);

  // Initialize edited values from option values when dialog opens
  useEffect(() => {
    if (isOpen) {
      const values: Record<string, string> = {};
      for (const option of MATCHED_PAIRS_OPTIONS) {
        const optionValue = optionValues.find((ov) => ov.optionName === option.name);
        let val = optionValue ? String(optionValue.optionValue) : option.defaultValue;
        // BHV-119: NullValue sentinel handling
        if (val === NULL_VALUE_SENTINEL) {
          val = '';
        }
        values[option.name] = val;
      }
      setEditedValues(values);
      setSelectedOptionIndex(0);
      setValidationError(null);
    }
  }, [isOpen, optionValues]);

  const selectedOption = useMemo(
    () => MATCHED_PAIRS_OPTIONS[selectedOptionIndex],
    [selectedOptionIndex],
  );

  const currentValue = useMemo(
    () => editedValues[selectedOption.name] ?? selectedOption.defaultValue,
    [editedValues, selectedOption],
  );

  const handleOptionSelect = useCallback((index: number) => {
    setSelectedOptionIndex(index);
    setValidationError(null);
  }, []);

  const handleValueChange = useCallback(
    (newValue: string) => {
      setEditedValues((prev) => ({
        ...prev,
        [selectedOption.name]: newValue,
      }));
      setValidationError(null);
    },
    [selectedOption],
  );

  const handleOk = useCallback(() => {
    // VAL-005: Write-protected projects close silently without saving
    if (isProtected) {
      onClose();
      return;
    }

    // Validate PairedPunctuation format (VAL-001, VAL-002)
    const pairsValue = editedValues.PairedPunctuation;
    if (pairsValue !== undefined) {
      const validation = validatePairsString(pairsValue);
      if (!validation.valid) {
        setValidationError(validation.error ?? 'Invalid format');
        // Ensure we're on the PairedPunctuation option to show the error
        const pairsIdx = MATCHED_PAIRS_OPTIONS.findIndex((o) => o.name === 'PairedPunctuation');
        if (pairsIdx >= 0) setSelectedOptionIndex(pairsIdx);
        return;
      }
    }

    // Build changed values array
    const changedValues: InventoryOptionValue[] = [];
    for (const option of MATCHED_PAIRS_OPTIONS) {
      const originalValue = optionValues.find((ov) => ov.optionName === option.name);
      const originalStr = originalValue ? String(originalValue.optionValue) : option.defaultValue;
      const editedStr = editedValues[option.name] ?? option.defaultValue;
      if (editedStr !== originalStr) {
        changedValues.push({
          optionName: option.name,
          optionValue: option.isYesNo ? editedStr : editedStr,
        });
      }
    }

    onSave(changedValues);
    onClose();
  }, [isProtected, editedValues, optionValues, onSave, onClose]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  // Keyboard shortcuts: Enter = OK, Escape = Cancel
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleOk();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleCancel, handleOk]);

  if (!isOpen) return null;

  return (
    <div
      className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label={titleLabel}
    >
      <div
        data-testid="cms-options-form"
        className="tw-bg-background tw-border tw-border-border tw-rounded-lg tw-shadow-xl tw-w-full tw-max-w-2xl tw-mx-4 tw-flex tw-flex-col tw-max-h-[80vh]"
      >
        {/* Dialog header */}
        <div className="tw-px-4 tw-py-3 tw-border-b tw-border-border tw-font-semibold tw-text-lg">
          {titleLabel}
        </div>

        {/* Dialog body */}
        <div className="tw-flex tw-flex-1 tw-overflow-hidden tw-p-4 tw-gap-4">
          {/* Left column: option list */}
          <div className="tw-flex tw-flex-col tw-w-1/3">
            <div className="tw-text-sm tw-font-medium tw-mb-1">{optionNameLabel}</div>
            <div
              role="listbox"
              aria-label={optionNameLabel}
              className="tw-border tw-border-border tw-rounded tw-flex-1 tw-overflow-y-auto"
            >
              {MATCHED_PAIRS_OPTIONS.map((option, index) => (
                <div
                  key={option.name}
                  role="option"
                  aria-selected={index === selectedOptionIndex}
                  className={`tw-px-3 tw-py-2 tw-cursor-pointer tw-text-sm ${
                    index === selectedOptionIndex
                      ? 'tw-bg-primary tw-text-primary-foreground'
                      : 'hover:tw-bg-muted'
                  }`}
                  onClick={() => handleOptionSelect(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOptionSelect(index);
                    }
                  }}
                  tabIndex={index === selectedOptionIndex ? 0 : -1}
                >
                  {option.name}
                </div>
              ))}
            </div>
          </div>

          {/* Right column: description and value */}
          <div className="tw-flex tw-flex-col tw-w-2/3 tw-gap-3">
            {/* Description (read-only) */}
            <div className="tw-flex tw-flex-col">
              <div className="tw-text-sm tw-font-medium tw-mb-1">{descriptionLabel}</div>
              <div
                data-testid="option-description"
                className="tw-border tw-border-border tw-rounded tw-p-2 tw-text-sm tw-min-h-[80px] tw-bg-muted/30"
              >
                {selectedOption.description}
              </div>
            </div>

            {/* Value input (adaptive based on option type) */}
            <div className="tw-flex tw-flex-col">
              <div className="tw-text-sm tw-font-medium tw-mb-1">{valueLabel}</div>
              {selectedOption.isYesNo ? (
                <select
                  data-testid="option-value-input"
                  className="tw-border tw-border-border tw-rounded tw-px-2 tw-py-1.5 tw-text-sm tw-bg-background"
                  value={currentValue}
                  onChange={(e) => handleValueChange(e.target.value)}
                >
                  <option value="Yes">{yesLabel}</option>
                  <option value="No">{noLabel}</option>
                </select>
              ) : (
                <input
                  data-testid="option-value-input"
                  type="text"
                  className="tw-border tw-border-border tw-rounded tw-px-2 tw-py-1.5 tw-text-sm tw-bg-background"
                  value={currentValue}
                  onChange={(e) => handleValueChange(e.target.value)}
                />
              )}
            </div>

            {/* Validation error */}
            {validationError && (
              <div className="tw-text-sm tw-text-destructive tw-mt-1">{validationError}</div>
            )}
          </div>
        </div>

        {/* Dialog footer with OK/Cancel buttons */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-px-4 tw-py-3 tw-border-t tw-border-border">
          <button
            type="button"
            className="tw-px-4 tw-py-1.5 tw-rounded tw-border tw-border-border tw-text-sm hover:tw-bg-muted"
            onClick={handleCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="tw-px-4 tw-py-1.5 tw-rounded tw-bg-primary tw-text-primary-foreground tw-text-sm hover:tw-bg-primary/90"
            onClick={handleOk}
          >
            {okLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CMSOptionsDialog;
