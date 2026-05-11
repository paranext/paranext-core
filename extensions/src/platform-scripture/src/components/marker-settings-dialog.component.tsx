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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { HelpCircle } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

/**
 * Localization keys used by the Marker Settings Dialog. Import this constant, pass it to the
 * platform's `useLocalizedStrings` hook in the web-view wiring layer, and forward the result as
 * `localizedStringsWithLoadingState` to the component. Storybook stories may pass English fallbacks
 * directly.
 */
export const MARKER_SETTINGS_STRING_KEYS = Object.freeze([
  '%markersChecklist_settings_title%',
  '%markersChecklist_settings_description%',
  '%markersChecklist_settings_equivalentMarkersLabel%',
  '%markersChecklist_settings_equivalentMarkersHelp%',
  '%markersChecklist_settings_markerFilterLabel%',
  '%markersChecklist_settings_markerFilterHelp%',
  '%markersChecklist_settings_ok%',
  '%markersChecklist_settings_cancel%',
  '%markersChecklist_errorInvalidMarkerPair%',
  '%markersChecklist_settings_helpIconAriaLabel%',
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
 * Result passed to `onSubmit` after the user clicks OK. Mirrors `MarkerSettingsOutput` from
 * `ui-state-contracts.md` (minus the discriminated-union wrapper — the dialog only emits the
 * accept-side; cancel goes through `onCancel`).
 *
 * The dialog submits raw values (with leading/trailing whitespace trimmed). Whitespace collapsing
 * inside `equivalentMarkers` and any other VAL-100 normalization is the wiring layer's
 * responsibility — see `marker-settings-dialog`-related code in `checklist.web-view.tsx`. This
 * keeps validation/normalization concerns out of the presentational component (per Sebastian PR
 * #2219 #3138226285).
 */
export type MarkerSettingsSubmitResult = {
  /** Equivalent-marker pairs string with leading/trailing whitespace trimmed. */
  equivalentMarkers: string;
  /** Marker-filter string with surrounding whitespace trimmed. */
  markerFilter: string;
};

/**
 * Parsed/validated equivalent-markers result, used by the Marker Settings Dialog. Previously lived
 * on the public `platform-scripture` contract (mirrored the C# `MarkerSettingsValidationResult`
 * DTO); the contract type was removed when the checklist NetworkObject was deleted, and the
 * dialog's adapter shape now lives here next to its only consumer.
 */
export type MarkerSettingsValidationResult = {
  /** True when the string is well-formed; false when `errorMessage` is set. */
  valid: boolean;
  /**
   * Parsed pairs when `valid` is true; `undefined` otherwise. Each entry is one marker pair as `{
   * marker1, marker2 }` (e.g. `{ marker1: 'p', marker2: 'q' }`).
   */
  parsedPairs: { marker1: string; marker2: string }[] | undefined;
  /**
   * Already-localized error message when `valid` is false; `undefined` otherwise. The wiring layer
   * resolves any localize-key produced by the underlying parser into a display string before
   * passing it here.
   */
  errorMessage: string | undefined;
};

/**
 * Validate-callback signature. The wiring layer wraps a pure-TS marker-settings parser (or, in
 * stories, a simple synchronous regex) and supplies the result. Returns the dialog's
 * `MarkerSettingsValidationResult` so `errorMessage` can be displayed inline without further
 * localization.
 */
export type MarkerSettingsValidate = (
  equivalentMarkers: string,
) => MarkerSettingsValidationResult | Promise<MarkerSettingsValidationResult>;

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
   * Validate the equivalent-markers input. The wiring layer hooks this up to the backend's
   * `validateMarkerSettings` PAPI command. Stories may pass a synchronous regex-based stand-in.
   * When omitted, the dialog assumes the input is always valid (useful for purely-visual Storybook
   * variants).
   */
  validate?: MarkerSettingsValidate;
  /**
   * Called after the user clicks OK. The payload carries trimmed but otherwise raw user input; the
   * wiring layer normalizes / persists. OK is only clickable when the most recent `validate` call
   * returned `valid: true`.
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

const VALIDATION_DEBOUNCE_MS = 150;

/**
 * Presentational Marker Settings dialog (SCR-002 in ui-specifications). Renders a shadcn `Dialog`
 * with two text inputs (equivalent markers + marker filter), help-icon Tooltips next to each label,
 * OK/Cancel actions, and INLINE validation feedback below the equivalent-markers input.
 *
 * **Architecture (per Sebastian PR #2219 #3137704709 + #3138226285 + #3138246720):**
 *
 * - The dialog is purely presentational — zero PAPI coupling. Validation runs through the `validate`
 *   prop, which the wiring layer wires to the backend's `validateMarkerSettings` PAPI command
 *   (`IChecklistService.validateMarkerSettings`).
 * - Inline validation drives a `data-invalid` / `aria-invalid` styled Input + a description span with
 *   `tw:text-destructive` class. The OK button is disabled while the input is invalid. This
 *   replaces the previous nested-Dialog "blocking alert" pattern entirely — there is no second
 *   dialog.
 * - Help icons (lucide `HelpCircle`) sit after each Label with a hover/focus Tooltip carrying the
 *   help-guide text quoted in Sebastian's review.
 *
 * Visibility is controlled by the `open` prop; the wiring layer (phase-3-ui) decides when to open
 * the dialog (typically in response to the `platformScripture.openMarkersChecklistSettings`
 * command) and where to persist the emitted values.
 */
export function MarkerSettingsDialog({
  open,
  initialEquivalentMarkers = '',
  initialMarkerFilter = '',
  validate,
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
  // `valid: true` until the first validate call completes; the OK button is enabled in this
  // optimistic-default state to avoid a blocking flash on initial open. Once the first validate
  // resolves, this reflects backend truth.
  const [validationResult, setValidationResult] = useState<MarkerSettingsValidationResult>({
    valid: true,
    parsedPairs: undefined,
    errorMessage: undefined,
  });

  // UX-2 finding #17: Radix Dialog's focus scope activates AFTER `autoFocus` has run on the
  // input, so the autoFocus prop alone doesn't reliably land focus inside the dialog (the trap
  // can yank focus back to the Dialog root on mount). Hold a ref to the equivalent-markers
  // input and focus it from the open-transition effect on the next animation frame, by which
  // time Radix's focus trap is active.
  // React's ref API expects `null` as the initial value (ref.current is typed `T | null`), so
  // the no-null rule must be suppressed for the ref initializer specifically.
  // eslint-disable-next-line no-null/no-null
  const equivalentMarkersInputRef = useRef<HTMLInputElement>(null);

  // Re-seed inputs whenever the dialog re-opens so stale values from a previous session don't
  // leak through (the component is mounted for the entire parent lifetime; `open` flips it on/off).
  const previousOpenRef = useRef<boolean>(open);
  useEffect(() => {
    const wasOpening = open && !previousOpenRef.current;
    if (wasOpening) {
      setEquivalentMarkers(initialEquivalentMarkers);
      setMarkerFilter(initialMarkerFilter);
      setValidationResult({ valid: true, parsedPairs: undefined, errorMessage: undefined });
    }
    previousOpenRef.current = open;
    if (!wasOpening) return undefined;
    // UX-2 finding #17: focus the equivalent-markers input on the next animation frame so the
    // Radix focus trap is active by the time we focus. Without this, Tab navigates outside
    // the dialog (because focus is still on the trigger when the trap mounts).
    const frameId = requestAnimationFrame(() => {
      equivalentMarkersInputRef.current?.focus();
    });
    return () => cancelAnimationFrame(frameId);
  }, [open, initialEquivalentMarkers, initialMarkerFilter]);

  // Stable ids so Label→Input associations survive re-renders and avoid collisions when multiple
  // dialogs coexist in Storybook autodocs.
  const equivalentMarkersInputId = useId();
  const equivalentMarkersErrorId = useId();
  const markerFilterInputId = useId();

  // Debounced validate effect. Runs whenever `equivalentMarkers` changes (and on first open).
  // The `validate` callback is async to accommodate the backend PAPI roundtrip; we cancel
  // stale results with a token-based check so a slow earlier call can't overwrite a faster
  // later result.
  useEffect(() => {
    if (!open || !validate) return undefined;
    let cancelled = false;
    const timer = setTimeout(() => {
      Promise.resolve(validate(equivalentMarkers))
        .then((result) => {
          if (!cancelled) setValidationResult(result);
          return undefined;
        })
        .catch(() => {
          // If the backend round-trip fails, fall back to "assume valid" rather than locking the
          // user out — typing a permissive value should still be possible.
          if (!cancelled) {
            setValidationResult({ valid: true, parsedPairs: undefined, errorMessage: undefined });
          }
        });
    }, VALIDATION_DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [equivalentMarkers, open, validate]);

  // Submit. Invoked by the OK button's onClick and by Enter in the inputs. Only fires when the
  // current state is valid — if the user hits Enter while invalid, we no-op and let the inline
  // error continue to communicate the problem.
  //
  // We deliberately DO NOT use a `<form onSubmit>` wrapper with `type="submit"` OK: Platform.Bible
  // web views run in sandboxed iframes without `allow-forms`, so the browser blocks form-submit
  // events before React's onSubmit handler can see them (`Blocked form submission to '' because the
  // form's frame is sandboxed and the 'allow-forms' permission is not set.`). Handling OK as a
  // plain button click with onClick sidesteps the sandbox restriction entirely.
  const handleCommit = useCallback(() => {
    if (!validationResult.valid) return;
    onSubmit({
      equivalentMarkers: equivalentMarkers.trim(),
      markerFilter: markerFilter.trim(),
    });
  }, [equivalentMarkers, markerFilter, onSubmit, validationResult.valid]);

  // Enter-to-submit on either input. Matches the form-submit semantics that users expect from a
  // traditional dialog, without actually using a <form>.
  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.isDefaultPrevented()) {
        event.preventDefault();
        handleCommit();
      }
    },
    [handleCommit],
  );

  const handleDialogOpenChange = useCallback(
    (nextOpen: boolean) => {
      // Radix emits `open = false` on Escape, overlay click, and the built-in close button. Treat
      // every one of those as a Cancel so focus can return to the trigger per the spec.
      if (!nextOpen) onCancel();
    },
    [onCancel],
  );

  const isInvalid = !validationResult.valid;
  // Backend returns its own `errorMessage` when validation fails. Fall back to the localized
  // generic description if the backend didn't supply one.
  const errorMessage =
    validationResult.errorMessage ??
    getLocalizedString('%markersChecklist_errorInvalidMarkerPair%');
  const helpIconAriaLabel = getLocalizedString('%markersChecklist_settings_helpIconAriaLabel%');

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent
        className="tw:max-w-md"
        // Localize the screen-reader close-button label injected by `DialogContent`.
        aria-label={getLocalizedString('%markersChecklist_settings_title%')}
      >
        <DialogHeader>
          <DialogTitle>{getLocalizedString('%markersChecklist_settings_title%')}</DialogTitle>
          <DialogDescription className="tw:sr-only">
            {getLocalizedString('%markersChecklist_settings_description%')}
          </DialogDescription>
        </DialogHeader>

        <TooltipProvider delayDuration={0}>
          <div className="tw:flex tw:flex-col tw:gap-4 tw:py-4">
            {/* Equivalent markers — with help icon + inline validation */}
            <div className="tw:flex tw:flex-col tw:gap-2">
              <div className="tw:flex tw:items-center tw:gap-2">
                <Label htmlFor={equivalentMarkersInputId}>
                  {getLocalizedString('%markersChecklist_settings_equivalentMarkersLabel%')}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={helpIconAriaLabel}
                      className="tw:text-muted-foreground tw:hover:text-foreground"
                      data-testid="marker-settings-equivalent-markers-help"
                    >
                      <HelpCircle className="tw:h-4 tw:w-4" aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="tw:max-w-xs tw:whitespace-pre-line">
                    {getLocalizedString('%markersChecklist_settings_equivalentMarkersHelp%')}
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id={equivalentMarkersInputId}
                ref={equivalentMarkersInputRef}
                data-testid="marker-settings-equivalent-markers"
                value={equivalentMarkers}
                onChange={(event) => setEquivalentMarkers(event.target.value)}
                onKeyDown={handleInputKeyDown}
                aria-invalid={isInvalid}
                aria-describedby={isInvalid ? equivalentMarkersErrorId : undefined}
                data-invalid={isInvalid ? '' : undefined}
                className={
                  isInvalid ? 'tw:border-destructive tw:focus-visible:ring-destructive' : undefined
                }
              />
              {isInvalid && (
                <span
                  id={equivalentMarkersErrorId}
                  className="tw:text-sm tw:text-destructive"
                  data-testid="marker-settings-equivalent-markers-error"
                >
                  {errorMessage}
                </span>
              )}
            </div>

            {/* Marker filter — with help icon */}
            <div className="tw:flex tw:flex-col tw:gap-2">
              <div className="tw:flex tw:items-center tw:gap-2">
                <Label htmlFor={markerFilterInputId}>
                  {getLocalizedString('%markersChecklist_settings_markerFilterLabel%')}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={helpIconAriaLabel}
                      className="tw:text-muted-foreground tw:hover:text-foreground"
                      data-testid="marker-settings-marker-filter-help"
                    >
                      <HelpCircle className="tw:h-4 tw:w-4" aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="tw:max-w-xs tw:whitespace-pre-line">
                    {getLocalizedString('%markersChecklist_settings_markerFilterHelp%')}
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id={markerFilterInputId}
                data-testid="marker-settings-marker-filter"
                value={markerFilter}
                onChange={(event) => setMarkerFilter(event.target.value)}
                onKeyDown={handleInputKeyDown}
              />
            </div>
          </div>
        </TooltipProvider>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            data-testid="marker-settings-cancel"
          >
            {getLocalizedString('%markersChecklist_settings_cancel%')}
          </Button>
          <Button
            type="button"
            onClick={handleCommit}
            disabled={isInvalid}
            data-testid="marker-settings-ok"
          >
            {getLocalizedString('%markersChecklist_settings_ok%')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
