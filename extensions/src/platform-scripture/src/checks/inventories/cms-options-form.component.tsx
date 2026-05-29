import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  TextField,
} from 'platform-bible-react';
import { useMemo, useState } from 'react';

// Provenance (do NOT move into TSDoc): UI-PKG-002 / CAP-UI-002 / SCR-002.
// Source spec: ui-spec-cms-options-form.md + ui-state-contracts.md (SCR-002).
// Behaviors: BHV-108 (CMSOption model), BHV-329 (layout), BHV-330 (selection repopulates),
// BHV-331 (Cancel discards), BHV-605 (3 canonical option keys). EXT-115 / EXT-116.

/**
 * Descriptor for one configurable inventory option. The dialog renders one selectable row per
 * descriptor, showing its localized name in the option list and its localized description when
 * selected. Every descriptor here is a free-text option (no yes/no or project-pointer modes).
 */
export type CmsOptionDescriptor = {
  /**
   * Literal settings key for this option. Round-trips verbatim to and from project settings — it is
   * the on-disk parameter name, not a display label. Used as the key into the value maps below.
   */
  parmName: string;
  /** Display text shown for this option in the option list. */
  localizedName: string;
  /** Display text shown in the description pane when this option is selected. */
  localizedDescription: string;
  /** Value applied when the option has never been given an explicit value. */
  defaultValue: string;
  /** When true the option is omitted from the list. */
  hide: boolean;
};

/**
 * Props for the inventory options editor dialog.
 *
 * The component is purely presentational: it receives all data through props and reports the user's
 * choices through {@link CmsOptionsFormProps.onSubmit} / {@link CmsOptionsFormProps.onCancel}. It
 * performs no data fetching or persistence — the caller resolves initial values, supplies
 * autocomplete suggestions, and persists the returned changed values.
 *
 * @example
 *
 * ```tsx
 * <CmsOptionsForm
 *   open={isOpen}
 *   options={descriptors}
 *   initialValues={{ UncapitalizedPrefixes: 'i x' }}
 *   autocompleteSuggestions={{ UncapitalizedPrefixes: ['a', 'i', 'x'] }}
 *   canPersist
 *   t={(key, fallback) => localized[key] ?? fallback}
 *   onSubmit={(changed) => save(changed)}
 *   onCancel={() => setIsOpen(false)}
 * />;
 * ```
 */
export type CmsOptionsFormProps = {
  /** Whether the dialog is open. */
  open: boolean;
  /** The configurable options to edit. The first non-hidden option is selected on open. */
  options: CmsOptionDescriptor[];
  /** Current persisted value per option, keyed by {@link CmsOptionDescriptor.parmName}. */
  initialValues: Record<string, string>;
  /**
   * Autocomplete suggestions per option, keyed by {@link CmsOptionDescriptor.parmName}. Offered as a
   * filterable list under the value field; the field still accepts any free-text value.
   */
  autocompleteSuggestions: Record<string, string[]>;
  /** When false the confirm action is disabled (the user lacks permission to persist). */
  canPersist: boolean;
  /** Localized-strings lookup helper supplied by the caller. */
  t: (key: string, fallback: string) => string;
  /** Called with the values that changed from their initial value when the user confirms. */
  onSubmit: (changedValues: Record<string, string>) => void;
  /** Called when the user dismisses the dialog without saving. */
  onCancel: () => void;
};

/** Resolve the displayed value for an option: pending edit, else initial, else empty. */
function resolveValue(
  parmName: string,
  pendingValues: Record<string, string>,
  initialValues: Record<string, string>,
): string {
  if (parmName in pendingValues) return pendingValues[parmName];
  return initialValues[parmName] ?? '';
}

/** Compute only the options whose pending value differs from the initial value. */
function computeChangedValues(
  pendingValues: Record<string, string>,
  initialValues: Record<string, string>,
): Record<string, string> {
  const changed: Record<string, string> = {};
  Object.keys(pendingValues).forEach((parmName) => {
    if (pendingValues[parmName] !== (initialValues[parmName] ?? '')) {
      changed[parmName] = pendingValues[parmName];
    }
  });
  return changed;
}

/**
 * Modal dialog for editing an inventory's configurable options. Shows a list of options on the
 * left, the selected option's description on the right, and a free-text value field with
 * autocomplete suggestions below. Confirming reports only the values that changed; cancelling
 * discards all edits.
 */
export function CmsOptionsForm({
  open,
  options,
  initialValues,
  autocompleteSuggestions,
  canPersist,
  t,
  onSubmit,
  onCancel,
}: CmsOptionsFormProps) {
  const visibleOptions = useMemo(() => options.filter((o) => !o.hide), [options]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  // Pending edits keyed by parmName; lazily populated as the user types / navigates.
  const [pendingValues, setPendingValues] = useState<Record<string, string>>({});

  const selectedOption = visibleOptions[selectedIndex];
  const liveValue = selectedOption
    ? resolveValue(selectedOption.parmName, pendingValues, initialValues)
    : '';

  const suggestions = selectedOption
    ? (autocompleteSuggestions[selectedOption.parmName] ?? []).filter(
        (s) => s !== liveValue && s.toLowerCase().includes(liveValue.toLowerCase()),
      )
    : [];

  const captureValue = (value: string) => {
    if (!selectedOption) return;
    setPendingValues((prev) => ({ ...prev, [selectedOption.parmName]: value }));
  };

  const handleSelectOption = (index: number) => {
    // Capture the current value before navigating (SaveValueInOptionValues pattern).
    captureValue(liveValue);
    setSelectedIndex(index);
  };

  const handleConfirm = () => {
    // Capture the current field, then report only changed values.
    const finalPending = selectedOption
      ? { ...pendingValues, [selectedOption.parmName]: liveValue }
      : pendingValues;
    onSubmit(computeChangedValues(finalPending, initialValues));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onCancel();
      }}
    >
      <DialogContent className="tw:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {t(
              '%mixedCapitalizationInventory_cmsOptionsForm_title%',
              'Mixed Capitalization Options',
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="tw:flex tw:flex-col tw:gap-4">
          <div className="tw:flex tw:flex-row tw:gap-4">
            {/* Option list (left) */}
            <div className="tw:flex tw:w-1/2 tw:flex-col tw:gap-1">
              <Label>
                {t('%mixedCapitalizationInventory_cmsOptionsForm_optionName%', 'Option Name')}
              </Label>
              <ul
                role="listbox"
                aria-label={t(
                  '%mixedCapitalizationInventory_cmsOptionsForm_optionName%',
                  'Option Name',
                )}
                className="tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-1"
              >
                {visibleOptions.map((option, index) => (
                  <li key={option.parmName} role="option" aria-selected={index === selectedIndex}>
                    <Button
                      variant={index === selectedIndex ? 'secondary' : 'ghost'}
                      className="tw:w-full tw:justify-start"
                      onClick={() => handleSelectOption(index)}
                    >
                      {option.localizedName}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description (right) */}
            <div className="tw:flex tw:w-1/2 tw:flex-col tw:gap-1">
              <Label>
                {t('%mixedCapitalizationInventory_cmsOptionsForm_description%', 'Description')}
              </Label>
              <p
                data-testid="cms-options-description"
                aria-live="polite"
                className="tw:min-h-24 tw:rounded-md tw:border tw:p-2 tw:text-sm tw:text-muted-foreground"
              >
                {selectedOption?.localizedDescription ?? ''}
              </p>
            </div>
          </div>

          {/* Value field (free-text) + autocomplete suggestions */}
          <div className="tw:flex tw:flex-col tw:gap-1">
            <TextField
              isFullWidth
              label={t('%mixedCapitalizationInventory_cmsOptionsForm_value%', 'Value')}
              value={liveValue}
              onChange={(e) => captureValue(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul
                aria-label={t(
                  '%mixedCapitalizationInventory_cmsOptionsForm_valueSuggestions%',
                  'Value suggestions',
                )}
                className="tw:flex tw:flex-wrap tw:gap-1 tw:pt-1"
              >
                {suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        captureValue(liveValue ? `${liveValue} ${suggestion}` : suggestion)
                      }
                    >
                      {suggestion}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>
            {t('%mixedCapitalizationInventory_cmsOptionsForm_cancel%', 'Cancel')}
          </Button>
          <Button disabled={!canPersist} aria-disabled={!canPersist} onClick={handleConfirm}>
            {t('%mixedCapitalizationInventory_cmsOptionsForm_ok%', 'OK')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CmsOptionsForm;
