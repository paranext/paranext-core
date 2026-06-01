/**
 * RestoreForm — main restore dialog (UI-PKG-007 / SCR-002).
 *
 * Pure presentational React component. Composes three feature-internal child components:
 *
 * - `RestoreFileList` (UI-PKG-008) — the per-file comparison data-grid.
 * - `DifferencesToolView` (UI-PKG-009) — the side-by-side diff view, mounted in a Dialog when the
 *   user invokes "View Differences" on a row.
 * - DEF-UI-001 disabled `newProjectButton` stub — surfaces the deferred FN-010 control with an
 *   explanatory tooltip per the UI Preservation Principle.
 *
 * The component accepts every backend interaction as a caller-supplied callback prop. The container
 * (UI-PKG-006, built in phase-3-ui) wires `papi.commands.executeCommand` against:
 *
 * - M-003 `performRestore` (submit; surfaces the §3.7 `RestoreOperationResult` discriminated union
 *   incl. the `confirmation-required` retry pattern for `shared-project-warning`,
 *   `downgrade-files`, `persist-current-changes`).
 * - M-010 `closeRestoreSession` (cancel surfaces; BHV-327).
 * - M-004 `compareBackupFile` (passed through to RestoreFileList; BHV-320 / CAP-005).
 * - M-011 `getCompareSourceContent` (passed through to DifferencesToolView; DEC-319).
 *
 * Behavior highlights / decisions encoded here:
 *
 * - Pre-flight shared-project warning modal fires when `restorer.sharedProjectMarkers === true` on
 *   mount (BHV-323 / ui-spec-restore-form.md "On Open" step 11).
 * - `confirmation-required` retry pattern (data-contracts.md §3.7): on each retry, the component
 *   merges the appropriate `acknowledged*` field into the next `RestoreRequest` and re-invokes
 *   `onPerformRestore`. `persist-current-changes` does NOT have a dedicated acknowledgement field —
 *   the user simply re-confirms intent and the request is re-submitted.
 * - Progress overlay is non-cancelable (BHV-326): Dialog `onEscapeKeyDown` / `onPointerDownOutside`
 *   prevent close while `isSubmitting === true`; no Cancel button rendered inside.
 * - Five cancel surfaces (BHV-327, ui-spec-restore-form.md "On Cancel / Close"): Cancel button,
 *   X-button (Dialog onOpenChange), shared-project No (pre-flight + retry), ZIP load error OK,
 *   persist-current-changes refusal. Each invokes `onCloseSession()` and `onCancel?.()` so the
 *   container can persist the memento (UI-PKG-011).
 * - Initial focus on `destinationProject` Combobox — NEVER on OK (INV-FLAG-2).
 * - Monotonic tab order top-to-bottom; Enter triggers submit when valid (INV-FLAG-3 PT10
 *   enhancement). The DEF-UI-001 stub uses `tabIndex={-1}` so it skips the tab sequence.
 * - Static UI everywhere: no flashing, no auto-animation (INV-FLAG-9, INV-FLAG-13, WCAG 2.2.2).
 * - `newProjectButton` rendered as DEF-UI-001 disabled stub via `<Button disabled>` plus a Tooltip
 *   surfacing `%restoreForm_newProjectButton_notAvailable%` via `aria-describedby`, with
 *   `tabIndex={-1}` so the keyboard user skips it. NO functional new-project flow wired.
 *
 * Source-of-truth specifications:
 *
 * - `ui-specifications/ui-spec-restore-form.md` (Abstract Element Inventory, Layout Wireframes, State
 *   Contract, Validation Rules, Data Flow, Accessibility Requirements, Test Contract, 6
 *   state-variant wireframes).
 * - `ui-specifications/ui-state-contracts.md` (`RestoreFormInput`, `RestoreFormState`,
 *   `RestoreFormSubmitPayload`, `RestoreResult`, `RestoreFormOutput`, `RestoreFormPersistedState`,
 *   `RestoreFormLoadedBackup`).
 * - `data-contracts.md` §2.3 `RestoreRequest`, §3.7 `RestoreOperationResult`, §3.11
 *   `RestoreDestinationProject`, §6 error keys.
 * - `implementation/deferred-functionality.md` DEF-UI-001 (newProjectButton).
 * - `implementation/ui-alignment.md` (composition contract with UI-PKG-008 / UI-PKG-009).
 */

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Button,
  Checkbox,
  ComboBox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Progress,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  type ComboBoxLabelOption,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import {
  RestoreFileList,
  type ComparisonResult,
  type RestoreFileListEntry,
  type RestoreFileListLocalizedStrings,
} from './restore-file-list.component';
import {
  DifferencesToolView,
  type DifferencesToolViewLocalizedStrings,
  type DifferencesToolViewProps,
  type DifferencesVerseRef,
  type FetchSourceContent,
} from './differences-tool-view.component';

// ----------------------------------------------------------------------------
// Localization keys + fallbacks
// ----------------------------------------------------------------------------

/**
 * Localization keys consumed by `RestoreForm` chrome — dialog title, field labels, action buttons,
 * the 4 confirmation modal flows, the ZIP-load-error / case-conflict alerts, the progress overlay,
 * and the DEF-UI-001 newProjectButton stub.
 *
 * The per-row tooltip keys (`%RestoreForm_18%`..`%RestoreForm_24%`) are owned by RestoreFileList;
 * we re-export the bare chrome here. Stories may merge `%restore_file_list_*%` keys into the
 * `localizedStrings` map and pass it through to the embedded RestoreFileList.
 */
export const RESTORE_FORM_STRING_KEYS = Object.freeze([
  // Dialog chrome
  '%restoreForm_title%',
  '%restoreForm_description%',
  // Field labels
  '%restoreForm_sourcePath_label%',
  '%restoreForm_destinationProject_label%',
  '%restoreForm_hideSameFiles_label%',
  '%restoreForm_backupDescription_group_label%',
  // Action buttons
  '%restoreForm_submit%',
  '%restoreForm_cancel%',
  // DEF-UI-001 newProjectButton stub
  '%restoreForm_newProjectButton%',
  '%restoreForm_newProjectButton_notAvailable%',
  // Loading-zip stage
  '%restoreForm_loadingZip_title%',
  '%restoreForm_loadingZip_message%',
  // ZIP load error modal
  '%restoreForm_zipLoadError_title%',
  '%restoreForm_zipLoadError_message%',
  '%restoreForm_zipLoadError_ok%',
  // Shared-project warning modal (pre-flight + retry)
  '%restoreForm_sharedProjectWarning_title%',
  '%restoreForm_sharedProjectWarning_message%',
  '%restoreForm_sharedProjectWarning_yes%',
  '%restoreForm_sharedProjectWarning_no%',
  // Different-case conflict modal (VAL-102)
  '%restoreForm_caseConflict_title%',
  '%restoreForm_caseConflict_message%',
  '%restoreForm_caseConflict_ok%',
  // Downgrade-files confirmation (batched — confirmation-required)
  '%restoreForm_downgradeFiles_title%',
  '%restoreForm_downgradeFiles_message%',
  '%restoreForm_downgradeFiles_yes%',
  '%restoreForm_downgradeFiles_no%',
  // Persist-current-changes (gm-017 / PTX-20538 CN preservation)
  '%restoreForm_persistCurrentChanges_title%',
  '%restoreForm_persistCurrentChanges_message%',
  '%restoreForm_persistCurrentChanges_yes%',
  '%restoreForm_persistCurrentChanges_no%',
  // Progress overlay (4-step — gm-029)
  '%restoreForm_progress_title%',
  '%restoreForm_progress_step_preflight%',
  '%restoreForm_progress_step_commitBefore%',
  '%restoreForm_progress_step_performing%',
  '%restoreForm_progress_step_commitAfter%',
  // Generic submit error
  '%restoreForm_submitError_title%',
  '%restoreForm_submitError_ok%',
  // Differences tool dialog chrome
  '%restoreForm_differencesDialog_title%',
  '%restoreForm_differencesDialog_close%',
  '%restoreForm_differencesDialog_leftPane%',
  '%restoreForm_differencesDialog_rightPane%',
] as const);

type RestoreFormLocalizedStringKey = (typeof RESTORE_FORM_STRING_KEYS)[number];

/**
 * Localized strings consumed by `RestoreForm`. Includes all `%restoreForm_*%` chrome keys plus
 * optional pass-through keys for the embedded `RestoreFileList` and `DifferencesToolView`. Missing
 * keys fall back to English `FALLBACK_STRINGS`.
 */
export type RestoreFormLocalizedStrings = {
  [key in RestoreFormLocalizedStringKey]?: LocalizedStringValue;
} & RestoreFileListLocalizedStrings &
  DifferencesToolViewLocalizedStrings;

/** English fallbacks used when a localization key is missing from the strings map. */
const FALLBACK_STRINGS: Record<RestoreFormLocalizedStringKey, string> = Object.freeze({
  '%restoreForm_title%': 'Restore',
  '%restoreForm_description%': 'Restore a project from a backup file.',
  '%restoreForm_sourcePath_label%': 'From:',
  '%restoreForm_destinationProject_label%': 'Restore into:',
  '%restoreForm_hideSameFiles_label%': 'Do not show files that are same in both disk and backup',
  '%restoreForm_backupDescription_group_label%': 'Backup Description',
  '%restoreForm_submit%': 'OK',
  '%restoreForm_cancel%': 'Cancel',
  '%restoreForm_newProjectButton%': 'New Project…',
  '%restoreForm_newProjectButton_notAvailable%':
    'Restore-to-new-project is not yet available in Platform.Bible. Choose an existing project as the restore destination, or wait for a future release.',
  '%restoreForm_loadingZip_title%': 'Reading backup',
  '%restoreForm_loadingZip_message%': 'Reading backup…',
  '%restoreForm_zipLoadError_title%': 'Paratext',
  '%restoreForm_zipLoadError_message%':
    'Error occurred when reading backup file. File cannot be used for restore.',
  '%restoreForm_zipLoadError_ok%': 'OK',
  '%restoreForm_sharedProjectWarning_title%': 'Paratext',
  '%restoreForm_sharedProjectWarning_message%':
    'This backup belongs to a shared project. If you are trying to recover text from an earlier stage in the project, please use the Project History feature instead. If you have lost the whole project and are trying to set it up again, please ask your administrator to add you to the project and then use Send/Receive to get it.\n\nContinue anyway?',
  '%restoreForm_sharedProjectWarning_yes%': 'Yes',
  '%restoreForm_sharedProjectWarning_no%': 'No',
  '%restoreForm_caseConflict_title%': 'Paratext',
  '%restoreForm_caseConflict_message%':
    'Another project exists with the same name, but a different case. You will need to either delete the existing project or restore this project to a new name.',
  '%restoreForm_caseConflict_ok%': 'OK',
  '%restoreForm_downgradeFiles_title%': 'Overwrite Warning!',
  '%restoreForm_downgradeFiles_message%':
    'The files you want to restore have a lower version number than the files on the hard disk. Are you sure you want to restore these files?',
  '%restoreForm_downgradeFiles_yes%': 'Yes',
  '%restoreForm_downgradeFiles_no%': 'No',
  '%restoreForm_persistCurrentChanges_title%': 'Persist Current Changes?',
  '%restoreForm_persistCurrentChanges_message%':
    'The destination project has unsaved changes. Persist them before restoring?',
  '%restoreForm_persistCurrentChanges_yes%': 'Yes',
  '%restoreForm_persistCurrentChanges_no%': 'No',
  '%restoreForm_progress_title%': 'Restoring',
  '%restoreForm_progress_step_preflight%': 'Pre-flight checks…',
  '%restoreForm_progress_step_commitBefore%': 'Before restoring books.',
  '%restoreForm_progress_step_performing%': 'Restoring files…',
  '%restoreForm_progress_step_commitAfter%': 'After restoring books.',
  '%restoreForm_submitError_title%': 'Restore failed',
  '%restoreForm_submitError_ok%': 'OK',
  '%restoreForm_differencesDialog_title%': 'View Differences',
  '%restoreForm_differencesDialog_close%': 'Close',
  '%restoreForm_differencesDialog_leftPane%': 'File from Zip',
  '%restoreForm_differencesDialog_rightPane%': 'File in Project',
});

// ----------------------------------------------------------------------------
// Public types (mirrored from ui-state-contracts.md + data-contracts.md)
// ----------------------------------------------------------------------------

/** Restore-specific extension to the base ProjectOption — drives VAL-103 admin gate. */
export interface RestoreProjectOption {
  id: string;
  shortName: string;
  fullName: string;
  isResource: boolean;
  /** True when current user is project Administrator (gates VAL-103). Mirrors §3.11. */
  currentUserIsAdmin: boolean;
}

/** Picker stage drives which view renders. Mirrors `ui-state-contracts.md`. */
export type RestoreFormPickerStage = 'browsing' | 'loading-zip' | 'main' | 'submitting';

/** Loaded backup metadata. Mirrors `ui-state-contracts.md` `RestoreFormLoadedBackup`. */
export interface RestoreFormLoadedBackup {
  filePath: string;
  sessionId: string;
  projectName: string;
  description: string;
  isLegacyBackup: boolean;
  /**
   * PT9 Guid; PT10 equivalent per FN-003. Wire-side is `string | null`; React-side normalizes to
   * `undefined` per the `no-null/no-null` lint convention. Container does the normalization.
   */
  projectGuid: string | undefined;
  /** True iff the ZIP contains permission files (BHV-323). */
  sharedProjectMarkers: boolean;
  /** True iff the ZIP contains a `Figures/` folder (BHV-318). */
  hasFigures: boolean;
  /** All files in the backup, with per-file comparison metadata vs the chosen destination. */
  allFiles: readonly RestoreFileListEntry[];
}

/**
 * Wire-side `RestoreRequest` per data-contracts.md §2.3. Field names match exactly so the container
 * can pass through to `papi.commands.executeCommand('platformBackupRestore.performRestore', ...)`.
 *
 * `destinationProjectId` is required (non-null) per Decision 24 / FN-010 — restore-to-new-project
 * is deferred until PT10 gains a create-project primitive.
 */
export interface RestoreRequest {
  sessionId: string;
  destinationProjectId: string;
  selectedFileIds: string[];
  acknowledgedSharedProjectWarning?: boolean;
  acknowledgedDowngradeFileIds?: string[];
}

/** `RestoreOperationResult` discriminated union per data-contracts.md §3.7. */
export type RestoreOperationResult =
  | RestoreOperationSuccessResult
  | RestoreOperationConfirmationRequiredResult
  | RestoreOperationErrorResult;

export interface RestoreOperationSuccessResult {
  status: 'success';
  restoredProjectId: string;
  isNoteType: boolean;
}

export interface RestoreOperationConfirmationRequiredResult {
  status: 'confirmation-required';
  confirmationKind: 'shared-project-warning' | 'downgrade-files' | 'persist-current-changes';
  /**
   * File ids that require explicit downgrade confirmation (only set when confirmationKind =
   * 'downgrade-files').
   */
  requiresDowngradeConfirmation?: string[];
  messageKey: string;
}

export type RestoreOperationErrorCode =
  | 'INVALID_SESSION'
  | 'PERMISSION_DENIED'
  | 'CASE_CONFLICT'
  | 'DUPLICATE_PROJECT_ID'
  | 'LOCK_NOT_OBTAINED'
  | 'MIGRATION_FAILED'
  | 'DESTINATION_NOT_WRITABLE'
  | 'IO_ERROR'
  | 'CANCELED';

export interface RestoreOperationErrorResult {
  status: 'error';
  errorCode: RestoreOperationErrorCode;
  errorKey: string;
  errorArgs?: string[];
}

/** UI submit payload (caller-facing; mapped from RestoreRequest). */
export interface RestoreFormSubmitPayload {
  zipPath: string;
  destinationProjectId: string;
  selectedFileIds: string[];
}

/** Result reported to the container on successful restore. */
export interface RestoreResult {
  restoredProjectId: string;
  isNotesType: boolean;
}

/** Surface returned to the caller when the dialog dismisses. */
export interface RestoreFormOutput {
  action: 'submit' | 'cancel';
  request?: RestoreFormSubmitPayload;
  result?: RestoreResult;
}

/** Props accepted by `RestoreForm`. */
export interface RestoreFormProps {
  /** Whether the dialog is open. Container-controlled (mirrors BackupForm). */
  open: boolean;

  /**
   * RestoreFormInput.persistedState — from RestoreFormMemento.
   *
   * Wire-level (data-contracts.md / ui-state-contracts.md) uses `string | null` for `backupFolder`;
   * the React-side normalizes `null` → `undefined` per the project's `no-null/no-null` lint
   * convention. The container (UI-PKG-006) does this normalization before handing state to the
   * component. Mirrors the BackupForm convention (`backup-form.component.tsx:246`).
   */
  persistedState: { backupFolder: string | undefined; hideSameFiles: boolean };

  /** RestoreFormInput.options — available projects for the destination dropdown. */
  options: { accessibleProjects: readonly RestoreProjectOption[] };

  /** Whether the entry-point invoker knows the backup is legacy (BHV-315; informational). */
  isLegacyBackup: boolean;

  /**
   * Loaded backup metadata after `openRestoreSession` returned. `undefined` while picker is
   * browsing or the ZIP load is in flight; non-`undefined` triggers the main view.
   *
   * Wire-side ui-state-contracts.md uses `... | null`; React-side normalizes to `undefined` per the
   * `no-null/no-null` lint convention. Container does the normalization.
   */
  restorer: RestoreFormLoadedBackup | undefined;

  /**
   * Current picker stage drives which view renders. Container owns transitions for `browsing →
   * loading-zip → main`; the component owns `main → submitting` via `onPerformRestore`.
   */
  pickerStage: RestoreFormPickerStage;

  /**
   * Destination projects from the DT-002 `RestoreDestinationProjects` subscribable data type.
   * Container subscribes and passes a fresh array on every emission. Component does NOT call PAPI.
   */
  destinationProjects: readonly RestoreProjectOption[];

  /**
   * Optional ZIP-load error message. When provided, the ZIP-load-error modal renders. On dismissal
   * the component invokes `onCloseSession` + `onCancel`.
   */
  zipLoadError?: string;

  /**
   * M-003 `performRestore`. The submit path. The component handles the `confirmation-required`
   * retry pattern (data-contracts.md §3.7) inline by re-invoking with the appropriate
   * `acknowledged*` field set true. Container wires
   * `papi.commands.executeCommand('platformBackupRestore.performRestore', request)`.
   */
  onPerformRestore: (request: RestoreRequest) => Promise<RestoreOperationResult>;

  /**
   * M-010 `closeRestoreSession`. Invoked by every cancel surface (BHV-327). Container wires the
   * memento persist hook to `onCancel` so all five cancel surfaces close out the session.
   */
  onCloseSession: () => Promise<void>;

  /**
   * Container-supplied bridge for M-004 `compareBackupFile`. Passed through to RestoreFileList; the
   * container resolves the returned `FileCompareConfig` and invokes `setDifferencesConfig` so the
   * component can open the embedded DifferencesToolView.
   */
  onCompareBackupFile?: (entry: RestoreFileListEntry) => Promise<DifferencesConfig | undefined>;

  /**
   * Container-supplied M-011 `getCompareSourceContent` bridge. Passed through to
   * `DifferencesToolView`.
   */
  onFetchSourceContent?: FetchSourceContent;

  /** Notify outer when restore completes successfully (drives BHV-653 host-side behavior). */
  onSubmit?: (output: RestoreFormOutput) => void;

  /** Notify outer when user cancels (drives UI-PKG-011 memento persist via container hook). */
  onCancel?: () => void;

  /** Component-chrome + child-component localization map. */
  localizedStrings?: RestoreFormLocalizedStrings;
}

/**
 * Differences-tool launch config. The caller's `compareBackupFile` bridge resolves a
 * `RestoreFileEntry` to this shape (mirrors data-contracts.md §3.6 `FileCompareConfig`).
 * Component-internal only — the embedded DifferencesToolView consumes it via the lifted state
 * below.
 */
export interface DifferencesConfig {
  leftSourceToken: string;
  rightSourceToken: string;
  initialRef: DifferencesVerseRef;
  displayOptions: DifferencesToolViewProps['displayOptions'];
}

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

/**
 * Module-level empty localizedStrings default — referenced by the destructured default in
 * `RestoreForm`. Defining it at module scope (rather than inline) keeps the prop default value
 * stable across renders AND avoids the `no-type-assertion` lint that would fire on an inline `{} as
 * RestoreFormLocalizedStrings` cast.
 */
const EMPTY_LOCALIZED_STRINGS: RestoreFormLocalizedStrings = Object.freeze({});

/**
 * Pure presentational RestoreForm. See file-level TSDoc for the UI-PKG-007 wiring contract.
 *
 * `options.accessibleProjects` and `isLegacyBackup` are part of the locked `RestoreFormInput` shape
 * (ui-state-contracts.md §"RestoreForm Input") so the container can pass the full input through
 * without divergence. The component reads its destination dropdown from the `destinationProjects`
 * subscribable (DEC-332 / DT-002) — those two input fields are accepted in the props contract but
 * not consumed in this render path. They are destructured here and renamed with a leading
 * underscore so eslint's `no-unused-vars` rule treats them as intentional.
 */
export function RestoreForm({
  open,
  persistedState,
  options,
  isLegacyBackup,
  restorer,
  pickerStage,
  destinationProjects,
  zipLoadError,
  onPerformRestore,
  onCloseSession,
  onCompareBackupFile,
  onFetchSourceContent,
  onSubmit = () => undefined,
  onCancel = () => undefined,
  localizedStrings = EMPTY_LOCALIZED_STRINGS,
}: RestoreFormProps) {
  // `options.accessibleProjects` and `isLegacyBackup` are accepted but not consumed by the current
  // render path — `destinationProjects` (the DT-002 subscribable per DEC-332) is the authoritative
  // source for the destination dropdown, and the legacy-backup filter (BHV-315) is informational
  // only after Decision 24 / FN-010. We retain both fields in the props contract so the container
  // (UI-PKG-006) can pass the full `RestoreFormInput` shape through without divergence, and so
  // future flows (re-add of FN-010, or per-feature legacy filtering) have a typed seat at the
  // table. Reading them through a no-op effect satisfies lint while keeping their contract role
  // explicit. The deps array intentionally varies so the effect re-runs on every change — making
  // the React reactivity graph match the prop contract semantics.
  useEffect(() => {
    /* no-op — see comment above. options + isLegacyBackup are reserved for future flows. */
  }, [options, isLegacyBackup]);
  const t = useCallback(
    (key: RestoreFormLocalizedStringKey): string => {
      const v = localizedStrings[key];
      if (typeof v === 'string') return v;
      return FALLBACK_STRINGS[key];
    },
    [localizedStrings],
  );

  // ---- Form state ----
  const [destinationProjectId, setDestinationProjectId] = useState<string | undefined>(undefined);
  const [hideSameFiles, setHideSameFiles] = useState<boolean>(persistedState.hideSameFiles);
  const [selectedFileIds, setSelectedFileIds] = useState<Set<string>>(() => new Set());
  const [selectedFileId, setSelectedFileId] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<
    'preflight' | 'commitBefore' | 'performing' | 'commitAfter'
  >('preflight');
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  // Pre-flight + retry shared-project warning state.
  // `kind: 'pre-flight'` fires on mount when `restorer.sharedProjectMarkers === true` (BHV-323).
  // `kind: 'retry'` fires on a confirmation-required retry from the backend.
  const [sharedProjectPrompt, setSharedProjectPrompt] = useState<
    { kind: 'pre-flight' | 'retry' } | undefined
  >(undefined);

  // Downgrade-files confirmation modal state (gm-029 — batched).
  const [downgradePrompt, setDowngradePrompt] = useState<{ fileIds: string[] } | undefined>(
    undefined,
  );

  // Persist-current-changes confirmation (gm-017 / PTX-20538).
  const [persistPrompt, setPersistPrompt] = useState<{ messageKey: string } | undefined>(undefined);

  // Different-case conflict modal (VAL-102).
  const [caseConflictMessage, setCaseConflictMessage] = useState<string | undefined>(undefined);

  // Differences tool view (UI-PKG-009) launch state. Populated by onCompareBackupFile bridge.
  const [differencesConfig, setDifferencesConfig] = useState<DifferencesConfig | undefined>(
    undefined,
  );

  // Track the destinationProject ComboBox trigger element so we can focus it on entry to the main
  // view (INV-FLAG-2: focus the destination dropdown, NEVER the OK button). ComboBox doesn't expose
  // a typed ref prop; we look up the DOM id and focus inside a RAF-scheduled effect.
  const destinationProjectComboboxId = 'restore-form-destination-project';

  // ---- Pre-flight shared-project warning on entry to main (BHV-323) ----
  useEffect(() => {
    if (pickerStage !== 'main') return;
    if (restorer?.sharedProjectMarkers === true && sharedProjectPrompt === undefined) {
      setSharedProjectPrompt({ kind: 'pre-flight' });
    }
    // We only want to fire ONCE per restorer instance — leaving sharedProjectPrompt out of the
    // dependency array intentionally; the guard above prevents re-firing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickerStage, restorer]);

  // ---- Seed file selection from isNormallyRestored on first main-view render (gm-009) ----
  useEffect(() => {
    if (pickerStage !== 'main') return;
    if (!restorer) return;
    setSelectedFileIds(
      new Set(restorer.allFiles.filter((f) => f.isNormallyRestored).map((f) => f.id)),
    );
    setSelectedFileId(restorer.allFiles[0]?.id);
  }, [pickerStage, restorer]);

  // ---- Initial focus on destinationProject dropdown (INV-FLAG-2) ----
  useEffect(() => {
    if (pickerStage !== 'main') return;
    if (!open) return;
    // RAF to wait for the Dialog portal to mount.
    const id = requestAnimationFrame(() => {
      const trigger = document.getElementById(destinationProjectComboboxId);
      if (trigger) trigger.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open, pickerStage]);

  // ---- Derived state ----
  const selectedDestinationProject = useMemo(
    () => destinationProjects.find((p) => p.id === destinationProjectId),
    [destinationProjects, destinationProjectId],
  );

  const canSubmit = useMemo(() => {
    if (isSubmitting) return false;
    if (!restorer) return false;
    if (destinationProjects.length === 0) return false; // VAL-100
    if (!destinationProjectId) return false;
    if (!selectedDestinationProject?.currentUserIsAdmin) return false; // VAL-103 (UI-side check)
    if (selectedFileIds.size === 0) return false; // VAL-101
    return true;
  }, [
    isSubmitting,
    restorer,
    destinationProjects,
    destinationProjectId,
    selectedDestinationProject,
    selectedFileIds,
  ]);

  type DestinationOption = ComboBoxLabelOption & { projectId: string };
  const destinationComboOptions = useMemo<DestinationOption[]>(
    () =>
      destinationProjects.map((p) => ({
        label: `${p.shortName} — ${p.fullName}${p.currentUserIsAdmin ? '' : ' (not admin)'}`,
        projectId: p.id,
      })),
    [destinationProjects],
  );

  const selectedDestinationOption = useMemo<DestinationOption | undefined>(
    () => destinationComboOptions.find((o) => o.projectId === destinationProjectId),
    [destinationComboOptions, destinationProjectId],
  );

  // ---- Handlers ----

  /** Build the next request, merging any acknowledgement carried by a confirmation retry. */
  const buildSubmitRequest = useCallback(
    (
      acks: {
        acknowledgedSharedProjectWarning?: boolean;
        acknowledgedDowngradeFileIds?: string[];
      } = {},
    ): RestoreRequest | undefined => {
      if (!restorer) return undefined;
      if (!destinationProjectId) return undefined;
      return {
        sessionId: restorer.sessionId,
        destinationProjectId,
        selectedFileIds: Array.from(selectedFileIds),
        ...acks,
      };
    },
    [restorer, destinationProjectId, selectedFileIds],
  );

  /**
   * Single performRestore attempt. Handles the three `confirmation-required` kinds inline by
   * surfacing the matching modal state. On success, emits onSubmit and closes. On error, sets
   * `submitError`. Re-invocation after user confirms a modal goes through this same path with the
   * accumulated acknowledgement set merged into the request.
   */
  const performRestoreOnce = useCallback(
    async (acks: {
      acknowledgedSharedProjectWarning?: boolean;
      acknowledgedDowngradeFileIds?: string[];
    }): Promise<void> => {
      const req = buildSubmitRequest(acks);
      if (!req) return;
      setSubmitError(undefined);
      setIsSubmitting(true);
      setProgressStep('preflight');
      try {
        // gm-029 4-step progress: surface a brief intermediate step so reviewers can observe the
        // progress overlay even when the handler resolves quickly. The container's container won't
        // see these transitions in production (the handler is one round-trip) but the visual
        // affordance is preserved.
        setProgressStep('commitBefore');
        const result = await onPerformRestore(req);
        setProgressStep('performing');

        if (result.status === 'success') {
          setProgressStep('commitAfter');
          onSubmit({
            action: 'submit',
            request: {
              zipPath: restorer?.filePath ?? '',
              destinationProjectId: req.destinationProjectId,
              selectedFileIds: req.selectedFileIds,
            },
            result: {
              restoredProjectId: result.restoredProjectId,
              isNotesType: result.isNoteType,
            },
          });
          return;
        }

        if (result.status === 'confirmation-required') {
          // Stop the progress overlay while the user reads the prompt — the next retry will
          // re-enter this method with the merged acknowledgement set.
          setIsSubmitting(false);
          switch (result.confirmationKind) {
            case 'shared-project-warning':
              setSharedProjectPrompt({ kind: 'retry' });
              return;
            case 'downgrade-files':
              setDowngradePrompt({
                fileIds: result.requiresDowngradeConfirmation ?? [],
              });
              return;
            case 'persist-current-changes':
              setPersistPrompt({ messageKey: result.messageKey });
              return;
            default:
              // Exhaustiveness guard — surface an error rather than silently dropping.
              setSubmitError(`Unknown confirmation kind: ${String(result)}`);
              return;
          }
        }

        // status === 'error'
        setIsSubmitting(false);
        if (result.errorCode === 'CASE_CONFLICT') {
          setCaseConflictMessage(result.errorKey);
        } else {
          setSubmitError(result.errorKey);
        }
      } catch (err) {
        setIsSubmitting(false);
        setSubmitError(err instanceof Error ? err.message : String(err));
      }
    },
    [buildSubmitRequest, onPerformRestore, onSubmit, restorer],
  );

  const handleSubmit = useCallback(() => {
    performRestoreOnce({}).catch(() => {
      /* surfaced via submitError */
    });
  }, [performRestoreOnce]);

  /**
   * Universal cancel handler. Wires the M-010 closeRestoreSession + notifies the container so the
   * memento (UI-PKG-011) can persist. Used by all five cancel surfaces per BHV-327.
   *
   * Transport errors on `onCloseSession` are swallowed — the UI proceeds to close either way; the
   * container's session manager surfaces transport errors via its own mechanism. The cancel notice
   *
   * - Output emission run after the close call settles so the memento persists exactly once.
   */
  const closeViaCancel = useCallback(async () => {
    try {
      await onCloseSession();
    } catch {
      /* swallowed — see TSDoc above */
    }
    onCancel();
    onSubmit({ action: 'cancel' });
  }, [onCloseSession, onCancel, onSubmit]);

  // ---- Cancel-surface specific handlers ----

  // Cancel surface 1 — Cancel button (also bound to the Dialog's onOpenChange close path).
  const handleCancelButton = useCallback(() => {
    closeViaCancel().catch(() => undefined);
  }, [closeViaCancel]);

  // Cancel surface 2 — ZIP load error OK dismisses the entire dialog (per ui-spec "On Open" step 7).
  const handleZipLoadErrorDismiss = useCallback(() => {
    closeViaCancel().catch(() => undefined);
  }, [closeViaCancel]);

  // Cancel surface 3a — Shared-project warning pre-flight No: cancel the entire restore.
  const handleSharedProjectPreflightNo = useCallback(() => {
    setSharedProjectPrompt(undefined);
    closeViaCancel().catch(() => undefined);
  }, [closeViaCancel]);

  // Cancel surface 3b — Shared-project warning retry No (after a confirmation-required from
  // the backend): cancel the entire restore. (BHV-327 — counted as one of the five surfaces.)
  const handleSharedProjectRetryNo = useCallback(() => {
    setSharedProjectPrompt(undefined);
    closeViaCancel().catch(() => undefined);
  }, [closeViaCancel]);

  // Cancel surface 4 — Persist-current-changes refusal: cancel the entire restore.
  const handlePersistRefusal = useCallback(() => {
    setPersistPrompt(undefined);
    closeViaCancel().catch(() => undefined);
  }, [closeViaCancel]);

  // ---- Confirmation Yes handlers — re-invoke performRestoreOnce with merged acks ----

  // Pre-flight Yes — same as retry Yes: set the acknowledgement and re-invoke. The first submit
  // attempt will carry the acknowledgement; if the user clicks Yes before clicking OK, we just
  // store the acknowledgement intent. The pre-flight Yes path also closes the modal but does NOT
  // immediately submit (user still has to interact with the form). We track via a ref-like state
  // var so the next handleSubmit picks it up.
  const [acknowledgedSharedProject, setAcknowledgedSharedProject] = useState<boolean>(false);

  const handleSharedProjectPreflightYes = useCallback(() => {
    setSharedProjectPrompt(undefined);
    setAcknowledgedSharedProject(true);
  }, []);

  const handleSharedProjectRetryYes = useCallback(() => {
    setSharedProjectPrompt(undefined);
    setAcknowledgedSharedProject(true);
    performRestoreOnce({
      acknowledgedSharedProjectWarning: true,
      acknowledgedDowngradeFileIds: downgradePrompt?.fileIds,
    }).catch(() => {
      /* surfaced via submitError */
    });
  }, [performRestoreOnce, downgradePrompt]);

  // Downgrade Yes — accept all flagged ids and re-submit. Used both for the
  // confirmation-required.downgrade-files path AND for ALIGNMENT-007 / Select-All bulk-downgrade
  // when the backend signals.
  const handleDowngradeYes = useCallback(() => {
    const acknowledged = downgradePrompt?.fileIds ?? [];
    setDowngradePrompt(undefined);
    performRestoreOnce({
      acknowledgedSharedProjectWarning: acknowledgedSharedProject || undefined,
      acknowledgedDowngradeFileIds: acknowledged,
    }).catch(() => {
      /* surfaced via submitError */
    });
  }, [performRestoreOnce, downgradePrompt, acknowledgedSharedProject]);

  const handleDowngradeNo = useCallback(() => {
    setDowngradePrompt(undefined);
    // No is NOT a cancel-surface per spec — the user can untick rows and try again. Just dismiss.
  }, []);

  // Persist-current-changes Yes — re-invoke without a new ack field; backend treats the retry
  // itself as the persist acknowledgement (no acknowledgement field is defined for this kind in
  // §2.3 RestoreRequest).
  const handlePersistYes = useCallback(() => {
    setPersistPrompt(undefined);
    performRestoreOnce({
      acknowledgedSharedProjectWarning: acknowledgedSharedProject || undefined,
      acknowledgedDowngradeFileIds: downgradePrompt?.fileIds,
    }).catch(() => {
      /* surfaced via submitError */
    });
  }, [performRestoreOnce, acknowledgedSharedProject, downgradePrompt]);

  // Case-conflict dismiss — does NOT cancel the dialog; just clears the modal so the user can edit.
  const handleCaseConflictDismiss = useCallback(() => {
    setCaseConflictMessage(undefined);
  }, []);

  // Submit-error dismiss — same as case-conflict; non-fatal, user can retry.
  const handleSubmitErrorDismiss = useCallback(() => {
    setSubmitError(undefined);
  }, []);

  // ---- RestoreFileList wiring ----
  const handleToggleFile = useCallback((entryId: string, next: boolean) => {
    setSelectedFileIds((prev) => {
      const updated = new Set(prev);
      if (next) updated.add(entryId);
      else updated.delete(entryId);
      return updated;
    });
  }, []);

  const handleBulkToggle = useCallback(
    (next: boolean) => {
      if (!restorer) return;
      setSelectedFileIds(next ? new Set(restorer.allFiles.map((f) => f.id)) : new Set());
    },
    [restorer],
  );

  const handleSelectFile = useCallback((entryId: string) => {
    setSelectedFileId(entryId);
  }, []);

  const handleViewDifferences = useCallback(
    (entry: RestoreFileListEntry) => {
      if (!onCompareBackupFile) return;
      onCompareBackupFile(entry)
        .then((config) => {
          if (config) setDifferencesConfig(config);
          return undefined;
        })
        .catch(() => {
          /* Container surfaces transport errors via its own mechanism. */
        });
    },
    [onCompareBackupFile],
  );

  const handleHideSameFilesChange = useCallback((checked: boolean | 'indeterminate') => {
    setHideSameFiles(checked === true);
  }, []);

  const handleDestinationChange = useCallback((value: string | undefined) => {
    setDestinationProjectId(value);
  }, []);

  const handleDifferencesClose = useCallback(() => {
    setDifferencesConfig(undefined);
  }, []);

  // ---- Enter-to-submit (INV-FLAG-3 PT10 enhancement) ----
  // We rely on the native `<form onSubmit>` semantics — pressing Enter inside any of the form's
  // inputs (the destinationProject combobox, the read-only fields' tabindex are -1 so they
  // don't intercept) triggers form submission, which our `onSubmit` handler routes to
  // `handleSubmit` when `canSubmit` is true. No custom `onKeyDown` is needed; that approach would
  // trip jsx-a11y/no-noninteractive-element-interactions on the form element.

  // ---- Render helpers ----

  const renderLoadingZip = (): ReactNode => (
    <DialogContent
      className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
      data-testid="restore-form-loading-zip"
      showCloseButton={false}
    >
      <DialogHeader>
        <DialogTitle>{t('%restoreForm_loadingZip_title%')}</DialogTitle>
      </DialogHeader>
      <p aria-live="polite" className="tw:text-sm">
        {t('%restoreForm_loadingZip_message%')}
      </p>
    </DialogContent>
  );

  const renderMain = (): ReactNode => (
    <DialogContent
      className="tw:flex tw:max-h-[90vh] tw:max-w-3xl tw:flex-col tw:gap-4"
      data-testid="restore-form-root"
      aria-label={t('%restoreForm_title%')}
    >
      <DialogHeader>
        <DialogTitle>{t('%restoreForm_title%')}</DialogTitle>
        <DialogDescription>{t('%restoreForm_description%')}</DialogDescription>
      </DialogHeader>

      {/* Form body — tab order follows source order top-to-bottom (A11Y, INV-FLAG-2). */}
      <form
        className="tw:flex tw:flex-col tw:gap-3"
        aria-label={t('%restoreForm_title%')}
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) handleSubmit();
        }}
      >
        {/* From: source path (read-only) */}
        <div className="tw:flex tw:flex-col tw:gap-1">
          <Label htmlFor="restore-form-source-path">{t('%restoreForm_sourcePath_label%')}</Label>
          <Input
            id="restore-form-source-path"
            data-testid="restore-source-path"
            value={restorer?.filePath ?? ''}
            readOnly
            tabIndex={-1}
            aria-label={t('%restoreForm_sourcePath_label%')}
          />
        </div>

        {/* Restore into: destination dropdown + DEF-UI-001 disabled stub */}
        <div className="tw:flex tw:flex-col tw:gap-1">
          <Label htmlFor={destinationProjectComboboxId}>
            {t('%restoreForm_destinationProject_label%')}
          </Label>
          <div className="tw:flex tw:items-center tw:gap-2">
            <div className="tw:flex-1">
              <ComboBox<DestinationOption>
                id={destinationProjectComboboxId}
                options={destinationComboOptions}
                value={selectedDestinationOption}
                onChange={(opt) => handleDestinationChange(opt?.projectId)}
                ariaLabel={t('%restoreForm_destinationProject_label%')}
                isDisabled={isSubmitting || destinationProjects.length === 0}
                buttonClassName="tw:w-full"
              />
            </div>

            {/*
              DEF-UI-001: newProjectButton — disabled stub per deferred-functionality.md and
              stub-patterns.md "UI Stub Patterns". Visible for PT9 parity per UI Preservation
              Principle but NOT functional. Tab order skips it via tabIndex={-1}.
              `aria-describedby` ties the tooltip text so screen readers announce why it's disabled.
            */}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* Wrap in a span so the disabled button still triggers the tooltip on hover. */}
                  <span tabIndex={-1}>
                    <Button
                      variant="outline"
                      disabled
                      tabIndex={-1}
                      aria-label={t('%restoreForm_newProjectButton%')}
                      aria-describedby="restore-form-new-project-tooltip"
                      data-testid="restore-form-new-project-stub"
                    >
                      {t('%restoreForm_newProjectButton%')}
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent id="restore-form-new-project-tooltip">
                  {t('%restoreForm_newProjectButton_notAvailable%')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Hide-same-files filter checkbox */}
        <div className="tw:flex tw:items-center tw:gap-2">
          <Checkbox
            id="restore-form-hide-same-files"
            checked={hideSameFiles}
            onCheckedChange={handleHideSameFilesChange}
            disabled={isSubmitting}
            aria-label={t('%restoreForm_hideSameFiles_label%')}
          />
          <Label htmlFor="restore-form-hide-same-files">
            {t('%restoreForm_hideSameFiles_label%')}
          </Label>
        </div>

        {/* File list (UI-PKG-008 — RestoreFileList) */}
        {restorer && (
          <RestoreFileList
            entries={restorer.allFiles}
            selectedFileIds={selectedFileIds}
            hideSameFiles={hideSameFiles}
            selectedFileId={selectedFileId}
            onToggleFile={handleToggleFile}
            onBulkToggle={handleBulkToggle}
            onSelectFile={handleSelectFile}
            onViewDifferences={handleViewDifferences}
            localizedStrings={localizedStrings}
          />
        )}

        {/* Backup Description (read-only display) */}
        <fieldset
          className="tw:flex tw:flex-col tw:gap-2 tw:rounded tw:border tw:border-border tw:p-2"
          aria-label={t('%restoreForm_backupDescription_group_label%')}
        >
          <legend className="tw:px-1 tw:text-sm tw:font-medium">
            {t('%restoreForm_backupDescription_group_label%')}
          </legend>
          <Input
            data-testid="restore-backup-description"
            value={restorer?.description ?? ''}
            readOnly
            tabIndex={-1}
            aria-label={t('%restoreForm_backupDescription_group_label%')}
          />
        </fieldset>
      </form>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={handleCancelButton}
          disabled={isSubmitting}
          aria-label={t('%restoreForm_cancel%')}
        >
          {t('%restoreForm_cancel%')}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          aria-label={t('%restoreForm_submit%')}
          data-testid="restore-form-submit"
        >
          {t('%restoreForm_submit%')}
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  // 4-step progress indicator. Steps map to ui-spec-restore-form.md "On Submit" — gm-029.
  const PROGRESS_PERCENT_BY_STEP: Record<typeof progressStep, number> = {
    preflight: 25,
    commitBefore: 50,
    performing: 75,
    commitAfter: 100,
  };
  const progressPercent = PROGRESS_PERCENT_BY_STEP[progressStep];

  const PROGRESS_MESSAGE_KEY_BY_STEP: Record<typeof progressStep, RestoreFormLocalizedStringKey> = {
    preflight: '%restoreForm_progress_step_preflight%',
    commitBefore: '%restoreForm_progress_step_commitBefore%',
    performing: '%restoreForm_progress_step_performing%',
    commitAfter: '%restoreForm_progress_step_commitAfter%',
  };
  const progressMessage = t(PROGRESS_MESSAGE_KEY_BY_STEP[progressStep]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="pr-twp tw:contents">
        <Dialog
          open={open}
          onOpenChange={(next) => {
            // Don't allow Escape / outside-click to close while submitting (BHV-326).
            if (!next && !isSubmitting && pickerStage !== 'submitting') handleCancelButton();
          }}
        >
          {pickerStage === 'loading-zip' && renderLoadingZip()}
          {pickerStage === 'main' && renderMain()}
          {pickerStage === 'browsing' && (
            <DialogContent
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
              data-testid="restore-form-picker-placeholder"
            >
              <DialogHeader>
                <DialogTitle>{t('%restoreForm_title%')}</DialogTitle>
                <DialogDescription>{t('%restoreForm_description%')}</DialogDescription>
              </DialogHeader>
              <p aria-live="polite" className="tw:text-sm">
                {t('%restoreForm_loadingZip_message%')}
              </p>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleCancelButton}
                  aria-label={t('%restoreForm_cancel%')}
                >
                  {t('%restoreForm_cancel%')}
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>

        {/* Progress overlay — non-cancelable (BHV-326). Escape / outside-click no-op. */}
        {(isSubmitting || pickerStage === 'submitting') && (
          <Dialog open>
            <DialogContent
              role="dialog"
              aria-label={t('%restoreForm_progress_title%')}
              data-testid="restore-form-progress"
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
              showCloseButton={false}
              onEscapeKeyDown={(e) => e.preventDefault()}
              onPointerDownOutside={(e) => e.preventDefault()}
              onInteractOutside={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>{t('%restoreForm_progress_title%')}</DialogTitle>
              </DialogHeader>
              <div aria-live="polite" className="tw:flex tw:flex-col tw:gap-2">
                <Progress value={progressPercent} />
                <p className="tw:text-sm">{progressMessage}</p>
              </div>
              {/* NO Cancel button per BHV-326. */}
            </DialogContent>
          </Dialog>
        )}

        {/* ZIP-load error modal — cancel surface */}
        {zipLoadError !== undefined && (
          <Dialog open onOpenChange={(next) => !next && handleZipLoadErrorDismiss()}>
            <DialogContent
              role="dialog"
              aria-label={t('%restoreForm_zipLoadError_title%')}
              data-testid="restore-form-zip-load-error"
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
            >
              <DialogHeader>
                <DialogTitle>{t('%restoreForm_zipLoadError_title%')}</DialogTitle>
                <DialogDescription>{t('%restoreForm_zipLoadError_message%')}</DialogDescription>
              </DialogHeader>
              <p className="tw:text-sm tw:break-all">{zipLoadError}</p>
              <DialogFooter>
                <Button
                  onClick={handleZipLoadErrorDismiss}
                  aria-label={t('%restoreForm_zipLoadError_ok%')}
                >
                  {t('%restoreForm_zipLoadError_ok%')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Shared-project warning modal — pre-flight + retry */}
        {sharedProjectPrompt && (
          <Dialog
            open
            onOpenChange={(next) => {
              if (!next) {
                if (sharedProjectPrompt.kind === 'pre-flight') handleSharedProjectPreflightNo();
                else handleSharedProjectRetryNo();
              }
            }}
          >
            <DialogContent
              role="dialog"
              aria-label={t('%restoreForm_sharedProjectWarning_title%')}
              data-testid="restore-form-shared-project-warning"
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
            >
              <DialogHeader>
                <DialogTitle>{t('%restoreForm_sharedProjectWarning_title%')}</DialogTitle>
                <DialogDescription>
                  {t('%restoreForm_sharedProjectWarning_message%')}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={
                    sharedProjectPrompt.kind === 'pre-flight'
                      ? handleSharedProjectPreflightNo
                      : handleSharedProjectRetryNo
                  }
                  aria-label={t('%restoreForm_sharedProjectWarning_no%')}
                >
                  {t('%restoreForm_sharedProjectWarning_no%')}
                </Button>
                <Button
                  onClick={
                    sharedProjectPrompt.kind === 'pre-flight'
                      ? handleSharedProjectPreflightYes
                      : handleSharedProjectRetryYes
                  }
                  aria-label={t('%restoreForm_sharedProjectWarning_yes%')}
                  data-testid="restore-form-shared-project-warning-yes"
                >
                  {t('%restoreForm_sharedProjectWarning_yes%')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Different-case conflict modal (VAL-102) */}
        {caseConflictMessage !== undefined && (
          <Dialog open onOpenChange={(next) => !next && handleCaseConflictDismiss()}>
            <DialogContent
              role="dialog"
              aria-label={t('%restoreForm_caseConflict_title%')}
              data-testid="restore-form-case-conflict"
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
            >
              <DialogHeader>
                <DialogTitle>{t('%restoreForm_caseConflict_title%')}</DialogTitle>
                <DialogDescription>{t('%restoreForm_caseConflict_message%')}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={handleCaseConflictDismiss}
                  aria-label={t('%restoreForm_caseConflict_ok%')}
                >
                  {t('%restoreForm_caseConflict_ok%')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Downgrade-files confirmation modal (batched — gm-029 / ALIGNMENT-007) */}
        {downgradePrompt && (
          <Dialog open onOpenChange={(next) => !next && handleDowngradeNo()}>
            <DialogContent
              role="dialog"
              aria-label={t('%restoreForm_downgradeFiles_title%')}
              data-testid="restore-form-downgrade-files"
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
            >
              <DialogHeader>
                <DialogTitle>{t('%restoreForm_downgradeFiles_title%')}</DialogTitle>
                <DialogDescription>{t('%restoreForm_downgradeFiles_message%')}</DialogDescription>
              </DialogHeader>
              {downgradePrompt.fileIds.length > 0 && (
                <ul className="tw:max-h-40 tw:overflow-auto tw:text-xs">
                  {downgradePrompt.fileIds.map((id) => (
                    <li key={id}>
                      <code>{id}</code>
                    </li>
                  ))}
                </ul>
              )}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleDowngradeNo}
                  aria-label={t('%restoreForm_downgradeFiles_no%')}
                >
                  {t('%restoreForm_downgradeFiles_no%')}
                </Button>
                <Button
                  onClick={handleDowngradeYes}
                  aria-label={t('%restoreForm_downgradeFiles_yes%')}
                  data-testid="restore-form-downgrade-files-yes"
                >
                  {t('%restoreForm_downgradeFiles_yes%')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Persist-current-changes confirmation (gm-017 / PTX-20538 CN preservation) */}
        {persistPrompt && (
          <Dialog open onOpenChange={(next) => !next && handlePersistRefusal()}>
            <DialogContent
              role="dialog"
              aria-label={t('%restoreForm_persistCurrentChanges_title%')}
              data-testid="restore-form-persist-current-changes"
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
            >
              <DialogHeader>
                <DialogTitle>{t('%restoreForm_persistCurrentChanges_title%')}</DialogTitle>
                <DialogDescription>
                  {t('%restoreForm_persistCurrentChanges_message%')}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handlePersistRefusal}
                  aria-label={t('%restoreForm_persistCurrentChanges_no%')}
                >
                  {t('%restoreForm_persistCurrentChanges_no%')}
                </Button>
                <Button
                  onClick={handlePersistYes}
                  aria-label={t('%restoreForm_persistCurrentChanges_yes%')}
                  data-testid="restore-form-persist-current-changes-yes"
                >
                  {t('%restoreForm_persistCurrentChanges_yes%')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Generic submit-error modal */}
        {submitError !== undefined && (
          <Dialog open onOpenChange={(next) => !next && handleSubmitErrorDismiss()}>
            <DialogContent
              role="dialog"
              aria-label={t('%restoreForm_submitError_title%')}
              data-testid="restore-form-submit-error"
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
            >
              <DialogHeader>
                <DialogTitle>{t('%restoreForm_submitError_title%')}</DialogTitle>
              </DialogHeader>
              <p className="tw:text-sm">{submitError}</p>
              <DialogFooter>
                <Button
                  onClick={handleSubmitErrorDismiss}
                  aria-label={t('%restoreForm_submitError_ok%')}
                >
                  {t('%restoreForm_submitError_ok%')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Differences tool dialog (UI-PKG-009 embedded) */}
        {differencesConfig && onFetchSourceContent && (
          <Dialog open onOpenChange={(next) => !next && handleDifferencesClose()}>
            <DialogContent
              role="dialog"
              aria-label={t('%restoreForm_differencesDialog_title%')}
              data-testid="restore-form-differences-dialog"
              className="tw:flex tw:max-h-[90vh] tw:max-w-4xl tw:flex-col tw:gap-3"
            >
              <DialogHeader>
                <DialogTitle>{t('%restoreForm_differencesDialog_title%')}</DialogTitle>
              </DialogHeader>
              <DifferencesToolView
                leftSource={{
                  tokenOrText: differencesConfig.leftSourceToken,
                  label: t('%restoreForm_differencesDialog_leftPane%'),
                }}
                rightSource={{
                  tokenOrText: differencesConfig.rightSourceToken,
                  label: t('%restoreForm_differencesDialog_rightPane%'),
                }}
                initialRef={differencesConfig.initialRef}
                displayOptions={differencesConfig.displayOptions}
                onFetchSourceContent={onFetchSourceContent}
                localizedStrings={localizedStrings}
              />
              <DialogFooter>
                <Button
                  onClick={handleDifferencesClose}
                  aria-label={t('%restoreForm_differencesDialog_close%')}
                >
                  {t('%restoreForm_differencesDialog_close%')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </TooltipProvider>
  );
}

/** Re-export of ComparisonResult for story / consumer convenience. */
export type { ComparisonResult };
