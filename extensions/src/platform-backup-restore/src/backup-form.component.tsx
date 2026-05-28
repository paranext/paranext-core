/**
 * BackupForm — main backup dialog (UI-PKG-004 / SCR-001).
 *
 * Pure presentational React component:
 *
 * - Accepts the `BackupFormInput` shape (project list, persisted state, USB hints) via props.
 * - Surfaces submit / cancel via `onSubmit` / `onCancel`, and side-effects (validate / createBackup /
 *   browse-for-destination) via injected async callbacks.
 * - Embeds the `BookChooser` sub-modal (UI-PKG-005, SUBFLOW-001).
 *
 * No PAPI imports. The web view container (UI-PKG-003 in phase-3-ui) injects the production
 * callbacks; Storybook stories wire defaults that exercise the full interactive surface.
 *
 * Source-of-truth specifications:
 *
 * - `ui-specifications/ui-spec-backup-form.md` (Abstract Element Inventory, Layout Wireframes, State
 *   Contract, Validation Rules, Conditional UI Rules, Data Flow, Accessibility Requirements, Test
 *   Contract).
 * - `ui-specifications/ui-state-contracts.md` (`BackupFormInput`, `BackupProjectOption`,
 *   `BackupFormState`, `BackupFormSubmitPayload`, `BackupFormOutput`, `BackupFormPersistedState`).
 *
 * Decisions encoded here:
 *
 * - `chkIncludeSettings` is NOT rendered (ALIGNMENT-001 / Decision EXT-107).
 * - `descriptionPreview` is derived via `useMemo` — NO 1Hz polling timer (BHV-307).
 * - Default focus lands on `destinationPath` (project pre-selected) or `projectSelector` (no project
 *   pre-selected) — NEVER the OK button (INV-FLAG-1 / UISPEC-BACKUP-001).
 * - `includeFigures` row is rendered iff `BackupProjectOption.hasFiguresFolder === true` (BHV-309).
 * - VAL-004 books-required is waived when the selected project is Notes-type (gm-023).
 */

import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from 'react';
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
  Textarea,
  type ComboBoxLabelOption,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { BookChooser, type BookSet } from './book-chooser.component';

// ----------------------------------------------------------------------------
// Localization keys + fallbacks (component chrome only — caller can override
// via `localizedStrings` prop; stories pass English defaults).
// ----------------------------------------------------------------------------

/**
 * Localization keys consumed by `BackupForm` chrome (field labels, button labels, aria labels,
 * group titles, progress overlay copy, validation error messages). Keep this list frozen so tooling
 * and contributions/localizedStrings.json stay in sync.
 */
export const BACKUP_FORM_STRING_KEYS = Object.freeze([
  // Dialog chrome
  '%backup_form_title%',
  '%backup_form_description%',
  // Field labels
  '%backup_form_project_label%',
  '%backup_form_books_label%',
  '%backup_form_destination_label%',
  '%backup_form_include_figures_label%',
  '%backup_form_user_name_label%',
  '%backup_form_description_group_label%',
  '%backup_form_user_comment_placeholder%',
  // Button labels
  '%backup_form_choose_books%',
  '%backup_form_browse%',
  '%backup_form_submit%',
  '%backup_form_cancel%',
  // BookChooser caption + help (PT9 BackupForm_1 / BackupForm_2)
  '%backup_form_book_chooser_caption%',
  '%backup_form_book_chooser_help_text%',
  // Progress overlay (PT9 BackupForm_4)
  '%backup_form_progress_title%',
  '%backup_form_progress_message%',
  // Validation messages (PT9 BackupForm_6/7/8/9)
  '%backup_form_error_resource_project%',
  '%backup_form_error_user_name_required%',
  '%backup_form_error_invalid_path%',
  // Overwrite-required modal (PT9 Backup_2)
  '%backup_form_overwrite_title%',
  '%backup_form_overwrite_message%',
  '%backup_form_overwrite_confirm%',
  // Generic error modal
  '%backup_form_error_title%',
  '%backup_form_error_ok%',
] as const);

type BackupFormLocalizedStringKey = (typeof BACKUP_FORM_STRING_KEYS)[number];
type BackupFormLocalizedStrings = {
  [key in BackupFormLocalizedStringKey]?: LocalizedStringValue;
};

/** English fallbacks used when a localization key is missing from the strings map. */
const FALLBACK_STRINGS: Record<BackupFormLocalizedStringKey, string> = Object.freeze({
  '%backup_form_title%': 'Backup',
  '%backup_form_description%': 'Create a ZIP backup of the selected project.',
  '%backup_form_project_label%': 'Project',
  '%backup_form_books_label%': 'Books',
  '%backup_form_destination_label%': 'To',
  '%backup_form_include_figures_label%': 'Include full size figures',
  '%backup_form_user_name_label%': 'Your name',
  '%backup_form_description_group_label%': 'Backup Description',
  '%backup_form_user_comment_placeholder%': 'Optional comment',
  '%backup_form_choose_books%': 'Choose…',
  '%backup_form_browse%': 'Browse…',
  '%backup_form_submit%': 'OK',
  '%backup_form_cancel%': 'Cancel',
  '%backup_form_book_chooser_caption%': 'Books to Backup',
  '%backup_form_book_chooser_help_text%': 'Choose the books which will be backed up.',
  '%backup_form_progress_title%': 'Creating backup',
  '%backup_form_progress_message%': 'Creating backup…',
  '%backup_form_error_resource_project%':
    'Resource projects contain copyrighted content.\nThis text cannot be backed up.',
  '%backup_form_error_user_name_required%': 'Please enter your name',
  '%backup_form_error_invalid_path%': 'Invalid file or folder name',
  '%backup_form_overwrite_title%': 'Overwrite existing backup?',
  '%backup_form_overwrite_message%':
    'A backup already exists at this path. Do you want to overwrite it?',
  '%backup_form_overwrite_confirm%': 'Overwrite',
  '%backup_form_error_title%': 'Backup failed',
  '%backup_form_error_ok%': 'OK',
});

// ----------------------------------------------------------------------------
// Public types (mirrored from ui-state-contracts.md + data-contracts.md).
// ----------------------------------------------------------------------------

/** PT9 IncludeFiguresFlags — flag enum (BHV-101, EXT-106). Mirrors data-contracts.md §2.1. */
export const IncludeFiguresFlags = Object.freeze({
  None: 0,
  Figures: 1,
  LocalFigures: 2,
  All: 3,
} as const);
export type IncludeFiguresFlagsValue =
  (typeof IncludeFiguresFlags)[keyof typeof IncludeFiguresFlags];

/** Cross-platform storage device hint (BHV-301 / BHV-506). Mirrors ui-state-contracts.md. */
export interface UsbDeviceHint {
  rootPath: string;
  label: string;
  isRemovable: boolean;
}

/**
 * Project option extended for the BackupForm. Mirrors ui-state-contracts.md `BackupProjectOption` —
 * adds `hasFiguresFolder`, `isNotesType`, `defaultBookSet` to the base `ProjectOption` shape.
 */
export interface BackupProjectOption {
  id: string;
  shortName: string;
  fullName: string;
  isResource: boolean;
  hasFiguresFolder: boolean;
  isNotesType: boolean;
  defaultBookSet: BookSet;
}

/** Submit payload — mirrors ui-state-contracts.md `BackupFormSubmitPayload`. */
export interface BackupFormSubmitPayload {
  projectId: string;
  destinationPath: string;
  selectedBooks: BookSet;
  includeFigures: boolean;
  /** Concatenated final description: `${descriptionPreview} - ${userComment}` (EXT-105). */
  description: string;
}

/** Surface returned to the caller when the dialog dismisses. */
export interface BackupFormOutput {
  action: 'submit' | 'cancel';
  request?: BackupFormSubmitPayload;
}

/**
 * Request payload sent to the backend `createBackup` command — mirrors data-contracts.md §2.1
 * `BackupRequest`. The component constructs this on submit and hands it to `onCreateBackup`.
 */
export interface BackupRequest {
  projectId: string;
  destinationPath: string;
  selectedBookIds?: string[];
  includeFiguresFlags?: IncludeFiguresFlagsValue;
  description: string;
  confirmOverwrite: boolean;
  userName: string;
}

/** Result returned by `onCreateBackup`. Mirrors data-contracts.md §3.1 (discriminated union). */
export type BackupResult =
  | {
      status: 'success';
      destinationPath: string;
      fileSizeBytes: number;
      backupLogEntryWritten: boolean;
    }
  | { status: 'overwrite-required'; existingPath: string }
  | {
      status: 'error';
      errorCode?: string;
      errorKey?: string;
      errorField?: 'destinationPath' | 'projectId' | 'userName';
      errorArgs?: string[];
      message?: string;
    };

/**
 * Validation request handed to `onValidate` (the M-009 wire equivalent). Caller's container may
 * debounce; the component re-runs validation on every relevant state change.
 */
export interface BackupValidationRequest {
  projectId: string | undefined;
  destinationPath: string;
  userName: string;
  selectedBookIds: string[];
  isNotesType: boolean;
}

/** Result returned from server-side validation. Echoes ui-state-contracts.md `ValidationResult`. */
export interface BackupValidationResult {
  isValid: boolean;
  errors: Partial<Record<'projectId' | 'destinationPath' | 'userName', string>>;
}

/** Props accepted by `BackupForm`. Field names mirror BackupFormInput from ui-state-contracts. */
export interface BackupFormProps {
  /** Whether the form dialog is open. Controlled by the caller (WebView container). */
  open: boolean;

  /** Pre-selected project id, or null/undefined if the user must pick one. */
  initialProjectId: string | undefined;

  /** Editable, non-resource-filtered project list (resources are flagged via VAL-001). */
  options: { projects: BackupProjectOption[] };

  /** Cross-session persisted defaults (BHV-300 / EXT-104). */
  persistedState: { backupFolder: string | undefined; userName: string };

  /** OS-discovered USB drives (BHV-301, BHV-506, ALIGNMENT-003). */
  storageHints: { usbDevices: UsbDeviceHint[] };

  /**
   * M-009 `validateBackup` — server-authoritative validation. Stories may pass a pass-through. The
   * component re-runs validation on every form state change (BHV-308 composite gate).
   */
  onValidate: (req: BackupValidationRequest) => Promise<BackupValidationResult>;

  /**
   * M-001 `createBackup` — submit action. Returns a `BackupResult` discriminated union; on
   * `'overwrite-required'` the component prompts and retries with `confirmOverwrite: true`.
   */
  onCreateBackup: (req: BackupRequest) => Promise<BackupResult>;

  /**
   * Browse… → OS save-file picker. Returns the chosen absolute path, or `null` on cancel. The
   * caller wraps `papi.webViewServices.showSaveDialog` in production.
   */
  onBrowseDestination: (initialPath: string) => Promise<string | undefined>;

  /** Final dismissal — fires after a successful submit OR a cancel. */
  onSubmit?: (output: BackupFormOutput) => void;
  onCancel?: () => void;

  /** Component-chrome localization map. */
  localizedStrings?: BackupFormLocalizedStrings;
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

/**
 * Compute the default backup filename for a project. PT9 source: `BackupForm.cs:138`
 * `defaultBackupFileName` — strips invalid path chars from `FullName`, appends `"
 * YYYY-MM-DD.zip"`.
 *
 * @param project Selected project (uses `fullName`).
 * @param now Reference date — passed in for testability and stable Storybook output.
 */
function defaultBackupFileName(project: BackupProjectOption, now: Date): string {
  // Strip OS-invalid filename chars. PT9 uses a platform-specific table; we use a conservative
  // cross-platform replacement covering the visible Windows-illegal chars plus path separators.
  const safe = project.fullName.replace(/[<>:"/\\|?*]/g, '_').trim();
  const iso = now.toISOString().slice(0, 10); // YYYY-MM-DD (UTC; matches PT9 ISO-date convention)
  return `${safe} ${iso}.zip`;
}

/**
 * Compute the default `backupFolder` per the data-flow rules:
 *
 * 1. Use `persistedState.backupFolder` when present.
 * 2. Else use a single attached USB drive root.
 * 3. Else empty string (user must Browse).
 */
function computeDefaultBackupFolder(
  persistedFolder: string | undefined,
  usbDevices: readonly UsbDeviceHint[],
): string {
  if (persistedFolder !== undefined && persistedFolder.trim() !== '') return persistedFolder;
  if (usbDevices.length === 1) return usbDevices[0].rootPath;
  return '';
}

/**
 * Compose the full destination path from a folder and filename. Uses `/` as the separator (the
 * production WebView container normalizes per OS; PT10 uses POSIX paths in IPC).
 */
function joinPath(folder: string, fileName: string): string {
  if (folder === '') return fileName;
  return folder.endsWith('/') ? `${folder}${fileName}` : `${folder}/${fileName}`;
}

/** Extract the directory portion of a path (everything before the last `/`). */
function dirname(p: string): string {
  const i = p.lastIndexOf('/');
  return i <= 0 ? '' : p.slice(0, i);
}

/**
 * Cross-platform path-syntax check — PT9 `FileUtils.FileSpecIsValid` equivalent. Rejects empty
 * strings, control chars, and Windows-illegal chars. (Server may reject more — UI-only first-pass
 * check; the authoritative gate is `onValidate`.)
 */
function isFileSpecLocallyValid(spec: string): boolean {
  if (spec.trim() === '') return false;
  for (let i = 0; i < spec.length; i += 1) {
    if (spec.charCodeAt(i) <= 31) return false;
  }
  // Windows illegal chars: <>:"|?* (forward slash is allowed as separator)
  if (/[<>"|?*]/.test(spec)) return false;
  return true;
}

/** Map IncludeFigures boolean → IncludeFiguresFlags enum per data-contracts.md §2.1 default. */
function mapIncludeFigures(includeFigures: boolean): IncludeFiguresFlagsValue {
  return includeFigures ? IncludeFiguresFlags.All : IncludeFiguresFlags.None;
}

/**
 * Format the descriptionPreview timestamp portion. Uses `Intl.DateTimeFormat` so the rendered date
 * follows the browser locale; falls back to ISO-shape `YYYY-MM-DD HH:MM` if `Intl` is unavailable
 * (matches PT9 "s"-format minus seconds). Phase-3-ui may pass an explicit locale via the WebView
 * container's locale plumbing; until then the runtime locale is used.
 */
function formatTimestamp(now: Date): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(now);
  } catch {
    const yyyy = now.getUTCFullYear();
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(now.getUTCDate()).padStart(2, '0');
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const min = String(now.getUTCMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  }
}

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

/** Pure presentational BackupForm. See file-level TSDoc for the UI-PKG-004 wiring contract. */
export function BackupForm({
  open,
  initialProjectId,
  options,
  persistedState,
  storageHints,
  onValidate,
  onCreateBackup,
  onBrowseDestination,
  onSubmit = () => undefined,
  onCancel = () => undefined,
  localizedStrings = {},
}: BackupFormProps) {
  const t = useCallback(
    (key: BackupFormLocalizedStringKey): string => {
      const v = localizedStrings[key];
      if (typeof v === 'string') return v;
      return FALLBACK_STRINGS[key];
    },
    [localizedStrings],
  );

  // ---- Form state ----
  const [projectId, setProjectId] = useState<string | undefined>(initialProjectId ?? undefined);
  const selectedProject = useMemo<BackupProjectOption | undefined>(
    () => options.projects.find((p) => p.id === projectId),
    [options.projects, projectId],
  );

  const [selectedBooks, setSelectedBooks] = useState<BookSet>(
    () => selectedProject?.defaultBookSet ?? { bookIds: [], summary: '' },
  );

  const [backupFolder, setBackupFolder] = useState<string>(() =>
    computeDefaultBackupFolder(persistedState.backupFolder, storageHints.usbDevices),
  );
  const [destinationPath, setDestinationPath] = useState<string>(() => {
    if (!selectedProject) return '';
    return joinPath(
      computeDefaultBackupFolder(persistedState.backupFolder, storageHints.usbDevices),
      defaultBackupFileName(selectedProject, new Date()),
    );
  });

  const [includeFigures, setIncludeFigures] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(persistedState.userName ?? '');
  const [userComment, setUserComment] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<BackupValidationResult['errors']>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  // Overwrite-confirmation modal state.
  const [overwritePrompt, setOverwritePrompt] = useState<{ existingPath: string } | undefined>(
    undefined,
  );

  // BookChooser sub-modal open state.
  const [bookChooserOpen, setBookChooserOpen] = useState<boolean>(false);

  // Track the destination-path input element via a callback ref stored in `useState`. This avoids
  // the standard React `useRef<T | null>(null)` DOM-ref pattern (the project's `no-null/no-null`
  // lint rule forbids inline null sentinels). The projectSelector trigger is focused by DOM id
  // lookup since ComboBox does not expose a `ref` prop.
  const [destinationPathEl, setDestinationPathEl] = useState<HTMLInputElement | undefined>(
    undefined,
  );

  // ---- Effects: project change → regenerate defaults (Data Flow → On Project Change) ----
  useEffect(() => {
    if (!selectedProject) return;
    setSelectedBooks(selectedProject.defaultBookSet);
    setIncludeFigures(false); // BHV-309 / INV-FLAG-5
    setDestinationPath((prev) => {
      // Only regenerate filename; preserve user-edited folder portion when possible.
      const folder = dirname(prev) || backupFolder;
      return joinPath(folder, defaultBackupFileName(selectedProject, new Date()));
    });
    // backupFolder unchanged here — preserved across project switches.
  }, [selectedProject, backupFolder]);

  // ---- Effects: re-run server-side validation whenever inputs change ----
  useEffect(() => {
    let cancelled = false;
    const req: BackupValidationRequest = {
      projectId: projectId ?? undefined,
      destinationPath,
      userName,
      selectedBookIds: selectedBooks.bookIds,
      isNotesType: selectedProject?.isNotesType ?? false,
    };
    onValidate(req)
      .then((result) => {
        if (!cancelled) setValidationErrors(result.errors);
        return undefined;
      })
      .catch(() => {
        /* Validation transport errors are non-blocking — UI keeps last-known errors. */
      });
    return () => {
      cancelled = true;
    };
  }, [projectId, destinationPath, userName, selectedBooks, selectedProject, onValidate]);

  // ---- Effects: default focus on open (A11Y-002 / INV-FLAG-1) ----
  useEffect(() => {
    if (!open) return;
    // RAF to wait for the Dialog portal to mount before focusing.
    const id = requestAnimationFrame(() => {
      if (projectId !== undefined) {
        destinationPathEl?.focus();
      } else {
        // ComboBox doesn't forward a typed ref prop; look up the trigger by its id and focus.
        const trigger = document.getElementById('backup-form-project');
        if (trigger) trigger.focus();
      }
    });
    return () => cancelAnimationFrame(id);
  }, [open, projectId, destinationPathEl]);

  // ---- Derived state ----

  // BHV-307: descriptionPreview derived via useMemo — NO 1Hz polling timer.
  // Re-derives on `userName` change; timestamp captured at render time, not via interval.
  const descriptionPreview = useMemo(() => {
    const ts = formatTimestamp(new Date());
    return `${ts}, ${userName}`;
  }, [userName]);

  // VAL-001..VAL-004 local pre-checks. Server validation (`onValidate`) is authoritative; this
  // is the immediate-feedback layer.
  const isResourceProject = selectedProject?.isResource === true;
  const isNotesType = selectedProject?.isNotesType === true;
  const isUserNameEmpty = userName.trim() === '';
  const isDestinationEmpty = destinationPath.trim() === '';
  const isDestinationLocallyInvalid =
    !isDestinationEmpty && !isFileSpecLocallyValid(destinationPath);
  const isBooksRequirementUnmet = selectedBooks.bookIds.length === 0 && !isNotesType;

  const canSubmit = useMemo(() => {
    if (isSubmitting) return false;
    if (!selectedProject) return false;
    if (isResourceProject) return false;
    if (isDestinationEmpty || isDestinationLocallyInvalid) return false;
    if (isUserNameEmpty) return false;
    if (isBooksRequirementUnmet) return false;
    // Server validation must also pass.
    if (
      validationErrors.projectId ||
      validationErrors.destinationPath ||
      validationErrors.userName
    ) {
      return false;
    }
    return true;
  }, [
    isSubmitting,
    selectedProject,
    isResourceProject,
    isDestinationEmpty,
    isDestinationLocallyInvalid,
    isUserNameEmpty,
    isBooksRequirementUnmet,
    validationErrors,
  ]);

  const showIncludeFigures = selectedProject?.hasFiguresFolder === true;

  // Project options for ComboBox — extend ComboBoxLabelOption with a private `projectId`
  // discriminant so we can recover the project id from the selected option.
  type ProjectComboOption = ComboBoxLabelOption & { projectId: string };

  const projectComboOptions = useMemo<ProjectComboOption[]>(
    () =>
      options.projects.map((p) => ({
        label: `${p.shortName} — ${p.fullName}`,
        projectId: p.id,
      })),
    [options.projects],
  );

  const selectedProjectOption = useMemo<ProjectComboOption | undefined>(
    () => projectComboOptions.find((o) => o.projectId === projectId),
    [projectComboOptions, projectId],
  );

  // Inline error messages (combine local + server).
  const projectErrorText = isResourceProject
    ? t('%backup_form_error_resource_project%')
    : undefined;
  const destinationErrorText = isDestinationLocallyInvalid
    ? t('%backup_form_error_invalid_path%')
    : validationErrors.destinationPath;
  const userNameErrorText = isUserNameEmpty
    ? t('%backup_form_error_user_name_required%')
    : validationErrors.userName;

  // ---- Handlers ----
  const handleProjectChange = useCallback((value: string | undefined) => {
    setProjectId(value);
  }, []);

  const handleDestinationChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDestinationPath(e.target.value);
    // BHV-305: re-derive backupFolder from the typed value's directory portion.
    setBackupFolder(dirname(e.target.value));
  }, []);

  const handleUserNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }, []);

  const handleUserCommentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserComment(e.target.value);
  }, []);

  const handleIncludeFiguresChange = useCallback((checked: boolean | 'indeterminate') => {
    setIncludeFigures(checked === true);
  }, []);

  const handleOpenBookChooser = useCallback(() => {
    setBookChooserOpen(true);
  }, []);

  const handleBookChooserSubmit = useCallback(
    ({ selectedBooks: chosen }: { selectedBooks: BookSet }) => {
      // BookChooser emits an empty summary by design — caller authoritatively computes it.
      const summary =
        chosen.bookIds.length === selectedProject?.defaultBookSet.bookIds.length
          ? (selectedProject?.defaultBookSet.summary ?? '')
          : `${chosen.bookIds.length} book(s)`;
      setSelectedBooks({ bookIds: chosen.bookIds, summary });
      setBookChooserOpen(false);
    },
    [selectedProject],
  );

  const handleBookChooserCancel = useCallback(() => {
    setBookChooserOpen(false);
  }, []);

  const handleBrowse = useCallback(async () => {
    const chosen = await onBrowseDestination(destinationPath);
    if (chosen !== undefined) {
      setDestinationPath(chosen);
      setBackupFolder(dirname(chosen));
    }
  }, [destinationPath, onBrowseDestination]);

  const buildSubmitRequest = useCallback(
    (confirmOverwrite: boolean): BackupRequest | undefined => {
      if (!selectedProject) return undefined;
      return {
        projectId: selectedProject.id,
        destinationPath,
        selectedBookIds: selectedBooks.bookIds,
        includeFiguresFlags: mapIncludeFigures(includeFigures),
        description: `${descriptionPreview} - ${userComment}`,
        confirmOverwrite,
        userName,
      };
    },
    [
      selectedProject,
      destinationPath,
      selectedBooks,
      includeFigures,
      descriptionPreview,
      userComment,
      userName,
    ],
  );

  const submitOnce = useCallback(
    async (confirmOverwrite: boolean): Promise<void> => {
      const req = buildSubmitRequest(confirmOverwrite);
      if (!req) return;
      setSubmitError(undefined);
      setIsSubmitting(true);
      try {
        const result = await onCreateBackup(req);
        if (result.status === 'success') {
          // Emit submit output. The container persists state + closes the WebView.
          onSubmit({
            action: 'submit',
            request: {
              projectId: req.projectId,
              destinationPath: req.destinationPath,
              selectedBooks,
              includeFigures,
              description: req.description,
            },
          });
        } else if (result.status === 'overwrite-required') {
          setOverwritePrompt({ existingPath: result.existingPath });
        } else {
          // status === 'error'
          setSubmitError(result.errorKey ?? result.message ?? 'Backup failed');
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setSubmitError(msg);
      } finally {
        setIsSubmitting(false);
      }
    },
    [buildSubmitRequest, onCreateBackup, onSubmit, selectedBooks, includeFigures],
  );

  const handleSubmit = useCallback(() => {
    submitOnce(false).catch(() => {
      /* errors are surfaced via submitError state */
    });
  }, [submitOnce]);

  const handleOverwriteConfirm = useCallback(() => {
    setOverwritePrompt(undefined);
    submitOnce(true).catch(() => {
      /* errors are surfaced via submitError state */
    });
  }, [submitOnce]);

  const handleOverwriteCancel = useCallback(() => {
    setOverwritePrompt(undefined);
  }, []);

  const handleCancel = useCallback(() => {
    onCancel();
    onSubmit({ action: 'cancel' });
  }, [onCancel, onSubmit]);

  const handleErrorModalDismiss = useCallback(() => {
    setSubmitError(undefined);
  }, []);

  // ---- Render ----

  // BookChooser strings derived from the parent's localization map.
  const bookChooserLocalized = useMemo(
    () => ({
      '%book_chooser_submit%': t('%backup_form_submit%'),
      '%book_chooser_cancel%': t('%backup_form_cancel%'),
    }),
    [t],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !isSubmitting) handleCancel();
      }}
    >
      <DialogContent
        className="tw:flex tw:max-h-[90vh] tw:max-w-2xl tw:flex-col tw:gap-4"
        data-testid="backup-form-root"
      >
        <DialogHeader>
          <DialogTitle>{t('%backup_form_title%')}</DialogTitle>
          <DialogDescription>{t('%backup_form_description%')}</DialogDescription>
        </DialogHeader>

        {/* Form body — tab order follows source order top-to-bottom (A11Y-003). */}
        <div
          className="tw:flex tw:flex-col tw:gap-3"
          role="form"
          aria-label={t('%backup_form_title%')}
        >
          {/* Project row */}
          <div className="tw:flex tw:flex-col tw:gap-1">
            <Label htmlFor="backup-form-project">{t('%backup_form_project_label%')}</Label>
            <ComboBox<ProjectComboOption>
              id="backup-form-project"
              options={projectComboOptions}
              value={selectedProjectOption}
              onChange={(opt) => handleProjectChange(opt?.projectId)}
              ariaLabel={t('%backup_form_project_label%')}
              isDisabled={isSubmitting}
              buttonClassName="tw:w-full"
            />
            {projectErrorText && (
              <p
                data-testid="error-projectSelector"
                className="tw:text-sm tw:text-destructive tw:whitespace-pre-line"
                id="error-project"
              >
                {projectErrorText}
              </p>
            )}
          </div>

          {/* Books row */}
          <div className="tw:flex tw:flex-col tw:gap-1">
            <Label htmlFor="backup-form-books">{t('%backup_form_books_label%')}</Label>
            <div className="tw:flex tw:items-center tw:gap-2">
              <Input
                id="backup-form-books"
                data-testid="backup-books-summary"
                value={selectedBooks.summary}
                readOnly
                tabIndex={-1}
                aria-label={t('%backup_form_books_label%')}
                className="tw:flex-1"
              />
              <Button
                onClick={handleOpenBookChooser}
                variant="outline"
                disabled={!selectedProject || isSubmitting}
                aria-label={t('%backup_form_choose_books%')}
              >
                {t('%backup_form_choose_books%')}
              </Button>
            </div>
          </div>

          {/* Destination row */}
          <div className="tw:flex tw:flex-col tw:gap-1">
            <Label htmlFor="backup-form-destination">{t('%backup_form_destination_label%')}</Label>
            <div className="tw:flex tw:items-center tw:gap-2">
              <Input
                id="backup-form-destination"
                ref={(el) => {
                  setDestinationPathEl(el ?? undefined);
                }}
                value={destinationPath}
                onChange={handleDestinationChange}
                aria-label={t('%backup_form_destination_label%')}
                aria-invalid={destinationErrorText ? true : undefined}
                aria-describedby={destinationErrorText ? 'error-destinationPath' : undefined}
                disabled={isSubmitting}
                className="tw:flex-1"
              />
              <Button
                onClick={handleBrowse}
                variant="outline"
                disabled={!selectedProject || isSubmitting}
                aria-label={t('%backup_form_browse%')}
              >
                {t('%backup_form_browse%')}
              </Button>
            </div>
            {destinationErrorText && (
              <p
                data-testid="error-destinationPath"
                id="error-destinationPath"
                className="tw:text-sm tw:text-destructive"
              >
                {destinationErrorText}
              </p>
            )}
          </div>

          {/* Include Figures row — BHV-309 conditional visibility */}
          {showIncludeFigures && (
            <div className="tw:flex tw:items-center tw:gap-2">
              <Checkbox
                id="backup-form-include-figures"
                checked={includeFigures}
                onCheckedChange={handleIncludeFiguresChange}
                disabled={isSubmitting}
                aria-label={t('%backup_form_include_figures_label%')}
              />
              <Label htmlFor="backup-form-include-figures">
                {t('%backup_form_include_figures_label%')}
              </Label>
            </div>
          )}

          {/* User Name row */}
          <div className="tw:flex tw:flex-col tw:gap-1">
            <Label htmlFor="backup-form-user-name">{t('%backup_form_user_name_label%')}</Label>
            <Input
              id="backup-form-user-name"
              value={userName}
              onChange={handleUserNameChange}
              aria-label={t('%backup_form_user_name_label%')}
              aria-invalid={userNameErrorText ? true : undefined}
              aria-describedby={userNameErrorText ? 'error-userName' : undefined}
              disabled={isSubmitting}
            />
            {userNameErrorText && (
              <p
                data-testid="error-userName"
                id="error-userName"
                className="tw:text-sm tw:text-destructive"
              >
                {userNameErrorText}
              </p>
            )}
          </div>

          {/* Backup Description group */}
          <fieldset
            className="tw:flex tw:flex-col tw:gap-2 tw:rounded tw:border tw:border-border tw:p-2"
            aria-label={t('%backup_form_description_group_label%')}
          >
            <legend className="tw:px-1 tw:text-sm tw:font-medium">
              {t('%backup_form_description_group_label%')}
            </legend>
            <div className="tw:flex tw:gap-2">
              <Input
                data-testid="backup-description-preview"
                value={descriptionPreview}
                readOnly
                tabIndex={-1}
                aria-label={t('%backup_form_description_group_label%')}
                className="tw:flex-1"
              />
              <Textarea
                data-testid="backup-user-comment"
                value={userComment}
                onChange={handleUserCommentChange}
                placeholder={t('%backup_form_user_comment_placeholder%')}
                aria-label={t('%backup_form_user_comment_placeholder%')}
                disabled={isSubmitting}
                rows={2}
                className="tw:flex-1"
              />
            </div>
          </fieldset>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            aria-label={t('%backup_form_cancel%')}
          >
            {t('%backup_form_cancel%')}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            aria-label={t('%backup_form_submit%')}
            data-testid="backup-form-submit"
          >
            {t('%backup_form_submit%')}
          </Button>
        </DialogFooter>

        {/* Progress overlay */}
        {isSubmitting && (
          <Dialog open>
            <DialogContent
              role="dialog"
              aria-label={t('%backup_form_progress_title%')}
              data-testid="backup-form-progress"
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
              showCloseButton={false}
            >
              <DialogHeader>
                <DialogTitle>{t('%backup_form_progress_title%')}</DialogTitle>
              </DialogHeader>
              <p aria-live="polite" className="tw:text-sm">
                {t('%backup_form_progress_message%')}
              </p>
            </DialogContent>
          </Dialog>
        )}

        {/* Overwrite-required confirmation modal */}
        {overwritePrompt && (
          <Dialog open onOpenChange={(next) => !next && handleOverwriteCancel()}>
            <DialogContent
              role="dialog"
              aria-label={t('%backup_form_overwrite_title%')}
              data-testid="backup-form-overwrite-modal"
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
            >
              <DialogHeader>
                <DialogTitle>{t('%backup_form_overwrite_title%')}</DialogTitle>
                <DialogDescription>{t('%backup_form_overwrite_message%')}</DialogDescription>
              </DialogHeader>
              <p className="tw:text-sm tw:break-all">{overwritePrompt.existingPath}</p>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleOverwriteCancel}
                  aria-label={t('%backup_form_cancel%')}
                >
                  {t('%backup_form_cancel%')}
                </Button>
                <Button
                  onClick={handleOverwriteConfirm}
                  aria-label={t('%backup_form_overwrite_confirm%')}
                  data-testid="backup-form-overwrite-confirm"
                >
                  {t('%backup_form_overwrite_confirm%')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Error modal */}
        {submitError && (
          <Dialog open onOpenChange={(next) => !next && handleErrorModalDismiss()}>
            <DialogContent
              role="dialog"
              aria-label={t('%backup_form_error_title%')}
              data-testid="backup-form-error-modal"
              className="tw:flex tw:max-w-md tw:flex-col tw:gap-3"
            >
              <DialogHeader>
                <DialogTitle>{t('%backup_form_error_title%')}</DialogTitle>
              </DialogHeader>
              <p className="tw:text-sm">{submitError}</p>
              <DialogFooter>
                <Button onClick={handleErrorModalDismiss} aria-label={t('%backup_form_error_ok%')}>
                  {t('%backup_form_error_ok%')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>

      {/* BookChooser sub-modal (UI-PKG-005 / SUBFLOW-001) */}
      <BookChooser
        open={bookChooserOpen}
        availableBooks={selectedProject?.defaultBookSet ?? { bookIds: [], summary: '' }}
        selectedBooks={selectedBooks}
        caption={t('%backup_form_book_chooser_caption%')}
        helpText={t('%backup_form_book_chooser_help_text%')}
        onSubmit={handleBookChooserSubmit}
        onCancel={handleBookChooserCancel}
        localizedStrings={bookChooserLocalized}
      />
    </Dialog>
  );
}
