import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { FormEvent, useCallback, useEffect, useId, useRef, useState } from 'react';

/**
 * Localization keys used by the Marker Settings Dialog. Import this constant, pass it to the
 * platform's `useLocalizedStrings` hook in the web-view wiring layer, and forward the result as
 * `localizedStringsWithLoadingState` to the component. Storybook stories may pass English fallbacks
 * directly.
 */
export const MARKER_SETTINGS_STRING_KEYS = Object.freeze([
  '%markers_checklist_settings_title%',
  '%markers_checklist_settings_description%',
  '%markers_checklist_settings_equivalentMarkersLabel%',
  '%markers_checklist_settings_markerFilterLabel%',
  '%markers_checklist_settings_ok%',
  '%markers_checklist_settings_cancel%',
  '%markers_checklist_settings_validationErrorTitle%',
  '%markers_checklist_settings_validationErrorDescription%',
  '%markers_checklist_settings_validationErrorOk%',
  '%markers_checklist_settings_close%',
] as const);

type MarkerSettingsLocalizedStringKey = (typeof MARKER_SETTINGS_STRING_KEYS)[number];

/**
 * Map of localization keys to resolved strings. Keys are optional because the platform's
 * localization hook returns partial results while loading.
 */
export type MarkerSettingsLocalizedStrings = {
  [key in MarkerSettingsLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Result passed to `onSubmit` after successful VAL-100 validation. Mirrors `MarkerSettingsOutput`
 * from `ui-state-contracts.md` (minus the discriminated-union wrapper — the dialog emits the
 * success case; cancel goes through `onCancel`).
 */
export type MarkerSettingsSubmitResult = {
  /** Equivalent-marker pairs string with consecutive whitespace collapsed to single spaces. */
  equivalentMarkers: string;
  /** Marker-filter string with surrounding whitespace trimmed. */
  markerFilter: string;
};

/** Props for `MarkerSettingsDialog` — a pure presentational modal. */
export type MarkerSettingsDialogProps = {
  /** Whether the dialog is visible. Parent controls this — the component never toggles it. */
  open: boolean;
  /**
   * Seed value for the `equivalentMarkers` text input. Parent reads this from the
   * `checklistEquivalentMarkers` `useWebViewState` slot.
   */
  initialEquivalentMarkers?: string;
  /**
   * Seed value for the `markerFilter` text input. Parent reads this from the
   * `checklistMarkerFilter` `useWebViewState` slot.
   */
  initialMarkerFilter?: string;
  /**
   * Called after the user clicks OK AND VAL-100 validation passes. The payload is already
   * normalized (spaces collapsed in `equivalentMarkers`, `markerFilter` trimmed). Parent commits
   * these back to its `useWebViewState` slots.
   */
  onSubmit?: (result: MarkerSettingsSubmitResult) => void;
  /** Called when the user clicks Cancel or dismisses the dialog (Escape / close button). */
  onCancel?: () => void;
  /**
   * Tuple of `[localizedStrings, isLoading]` — same shape as the platform `useLocalizedStrings`
   * return value. Stories pass English defaults.
   */
  localizedStringsWithLoadingState?: [MarkerSettingsLocalizedStrings, boolean];
};

/**
 * Validation result shape — matches the `ValidationResult` interface in
 * `ui-specifications/ui-state-contracts.md`.
 */
export type MarkerSettingsValidationResult = {
  isValid: boolean;
  /** Localization key for the error message (empty when `isValid` is true). */
  errorKey?: MarkerSettingsLocalizedStringKey;
};

/**
 * Validates equivalent marker mappings per PT9 VAL-100 (see
 * `ui-specifications/ui-spec-marker-settings.md`).
 *
 * Format: space-separated pairs, each pair is `marker1/marker2`. Empty string is valid (means "no
 * mappings"). Each non-empty token must contain exactly one `/` with both sides non-empty.
 */
export function validateEquivalentMarkers(mappings: string): MarkerSettingsValidationResult {
  const tokens = mappings.split(/\s+/).filter((token) => token.length > 0);
  const isValid = tokens.every((token) => {
    const parts = token.split('/');
    return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
  });
  return isValid
    ? { isValid: true }
    : { isValid: false, errorKey: '%markers_checklist_settings_validationErrorDescription%' };
}

/**
 * Collapses runs of whitespace inside `equivalentMarkers` to a single space (VAL-100.3) and trims
 * leading/trailing whitespace.
 */
function normalizeEquivalentMarkers(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

/**
 * Presentational Marker Settings dialog (SCR-002 in ui-specifications). Renders a shadcn `Dialog`
 * with two text inputs (equivalent markers + marker filter), OK/Cancel actions, and a nested
 * blocking alert dialog for VAL-100 validation errors.
 *
 * The nested alert is implemented as a second `Dialog` annotated with `role="alertdialog"` and
 * `aria-describedby` wired to the description node — mirroring shadcn's `AlertDialog` semantics
 * without requiring an additional Radix primitive (which is not exported by `platform-bible-react`
 * at this time). Per the T-R-2 spec revision, this behaviour is blocking: the user must dismiss the
 * alert before the surrounding dialog becomes interactive again.
 *
 * **Architecture**: zero PAPI coupling. All data flows through props; the component never touches
 * `useWebViewState`, `useData`, or any `papi.*` API. Visibility is controlled by the `open` prop;
 * the wiring layer (phase-3-ui) decides when to open the dialog (typically in response to the
 * `platformScripture.openMarkersChecklistSettings` command) and where to persist the emitted
 * values.
 */
export function MarkerSettingsDialog({
  open,
  initialEquivalentMarkers = '',
  initialMarkerFilter = '',
  onSubmit = () => {},
  onCancel = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: MarkerSettingsDialogProps) {
  const getLocalizedString = useCallback(
    (localizeKey: MarkerSettingsLocalizedStringKey): string => {
      const value = localizedStringsWithLoadingState[0][localizeKey];
      // Fall back to the key itself so the raw token surfaces during development / unlocalized
      // Storybook runs — the identical pattern used by `home.component.tsx`.
      return typeof value === 'string' ? value : localizeKey;
    },
    [localizedStringsWithLoadingState],
  );

  // Local form state — seeded from props each time the dialog transitions from closed → open.
  const [equivalentMarkers, setEquivalentMarkers] = useState<string>(initialEquivalentMarkers);
  const [markerFilter, setMarkerFilter] = useState<string>(initialMarkerFilter);
  const [isValidationAlertOpen, setIsValidationAlertOpen] = useState<boolean>(false);

  // Re-seed inputs whenever the dialog re-opens so stale values from a previous session don't
  // leak through (the component is mounted for the entire parent lifetime; `open` flips it on/off).
  const previousOpenRef = useRef<boolean>(open);
  useEffect(() => {
    if (open && !previousOpenRef.current) {
      setEquivalentMarkers(initialEquivalentMarkers);
      setMarkerFilter(initialMarkerFilter);
      setIsValidationAlertOpen(false);
    }
    previousOpenRef.current = open;
  }, [open, initialEquivalentMarkers, initialMarkerFilter]);

  // Stable ids so Label→Input associations survive re-renders and avoid collisions when multiple
  // dialogs coexist in Storybook autodocs.
  const equivalentMarkersInputId = useId();
  const markerFilterInputId = useId();
  const validationDescriptionId = useId();
  const validationTitleId = useId();

  // useRef requires null as the initial value when used with a DOM element ref
  // eslint-disable-next-line no-null/no-null
  const equivalentMarkersInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = validateEquivalentMarkers(equivalentMarkers);
      if (!result.isValid) {
        setIsValidationAlertOpen(true);
        return;
      }
      onSubmit({
        equivalentMarkers: normalizeEquivalentMarkers(equivalentMarkers),
        markerFilter: markerFilter.trim(),
      });
    },
    [equivalentMarkers, markerFilter, onSubmit],
  );

  const handleDialogOpenChange = useCallback(
    (nextOpen: boolean) => {
      // Radix emits `open = false` on Escape, overlay click, and the built-in close button. Treat
      // every one of those as a Cancel so focus can return to the trigger per the spec.
      if (!nextOpen) onCancel();
    },
    [onCancel],
  );

  const handleValidationAlertOpenChange = useCallback((nextOpen: boolean) => {
    setIsValidationAlertOpen(nextOpen);
  }, []);

  // Return focus to the equivalentMarkers input after the validation alert dismisses so the user
  // can correct the offending value without reaching for the mouse (spec Acc row 5).
  useEffect(() => {
    if (!isValidationAlertOpen && open && equivalentMarkersInputRef.current) {
      // Defer focus so Radix can finish its own focus-restoration before we override it.
      const animationFrameId = requestAnimationFrame(() => {
        equivalentMarkersInputRef.current?.focus();
      });
      return () => cancelAnimationFrame(animationFrameId);
    }
    return undefined;
  }, [isValidationAlertOpen, open]);

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent
        className="tw-max-w-md"
        // Localize the screen-reader close-button label injected by `DialogContent`.
        aria-label={getLocalizedString('%markers_checklist_settings_title%')}
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{getLocalizedString('%markers_checklist_settings_title%')}</DialogTitle>
            <DialogDescription className="tw-sr-only">
              {getLocalizedString('%markers_checklist_settings_description%')}
            </DialogDescription>
          </DialogHeader>

          <div className="tw-flex tw-flex-col tw-gap-4 tw-py-4">
            <div className="tw-flex tw-flex-col tw-gap-2">
              <Label htmlFor={equivalentMarkersInputId}>
                {getLocalizedString('%markers_checklist_settings_equivalentMarkersLabel%')}
              </Label>
              <Input
                ref={equivalentMarkersInputRef}
                id={equivalentMarkersInputId}
                data-testid="marker-settings-equivalent-markers"
                value={equivalentMarkers}
                onChange={(event) => setEquivalentMarkers(event.target.value)}
                autoFocus
              />
            </div>

            <div className="tw-flex tw-flex-col tw-gap-2">
              <Label htmlFor={markerFilterInputId}>
                {getLocalizedString('%markers_checklist_settings_markerFilterLabel%')}
              </Label>
              <Input
                id={markerFilterInputId}
                data-testid="marker-settings-marker-filter"
                value={markerFilter}
                onChange={(event) => setMarkerFilter(event.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              data-testid="marker-settings-cancel"
            >
              {getLocalizedString('%markers_checklist_settings_cancel%')}
            </Button>
            <Button type="submit" data-testid="marker-settings-ok">
              {getLocalizedString('%markers_checklist_settings_ok%')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      {/* Validation error — a nested blocking alert. shadcn does not export an `AlertDialog`
          primitive yet (Radix's alert-dialog package is not a dependency of platform-bible-react),
          so we implement the same semantics on the existing Dialog primitive: `role="alertdialog"`,
          `aria-describedby` wired to the description node, and Radix's built-in focus trap + Escape
          handling. This satisfies the spec's Acc row 5 while avoiding a new library dependency. */}
      <Dialog open={isValidationAlertOpen} onOpenChange={handleValidationAlertOpenChange}>
        <DialogContent
          className="tw-max-w-sm"
          role="alertdialog"
          aria-labelledby={validationTitleId}
          aria-describedby={validationDescriptionId}
          aria-label={getLocalizedString('%markers_checklist_settings_validationErrorTitle%')}
        >
          <DialogHeader>
            <DialogTitle id={validationTitleId}>
              {getLocalizedString('%markers_checklist_settings_validationErrorTitle%')}
            </DialogTitle>
            <DialogDescription id={validationDescriptionId}>
              {getLocalizedString('%markers_checklist_settings_validationErrorDescription%')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsValidationAlertOpen(false)}
              data-testid="marker-settings-validation-ok"
              autoFocus
            >
              {getLocalizedString('%markers_checklist_settings_validationErrorOk%')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
