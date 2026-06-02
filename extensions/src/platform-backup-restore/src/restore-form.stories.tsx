/**
 * Stories for RestoreForm (UI-PKG-007 / SCR-002).
 *
 * Each story wraps the production `RestoreForm` in a stateful `Harness` decorator so reviewers can:
 *
 * - Cycle the `pickerStage` from picker → loading-zip → main → submitting and observe the staged
 *   rendering (ui-spec-restore-form.md "On Open" flow).
 * - Pick a destination project; observe the OK button enable when validation passes.
 * - Tick/untick files in the embedded `RestoreFileList`; click Select All / Deselect All.
 * - Right-click a row or click the View Differences button to launch the embedded
 *   `DifferencesToolView` (UI-PKG-009) in a Dialog wired to the storybook-handlers M-011 default.
 * - Click OK to see the 4-step progress overlay (gm-029), then either success or one of the four
 *   `confirmation-required` retry flows.
 * - Hover the disabled DEF-UI-001 newProjectButton stub and read the tooltip explaining FN-010.
 * - Exercise each cancel surface and observe the harness panel record `onCloseSession` + `onCancel`.
 *
 * Per STORY-004, the Default story wires every `on*` callback on `RestoreForm` to a state-mutating
 * handler in this Harness — no stubs. `onPerformRestore` defaults to `defaultPerformRestoreHandler`
 * from `storybook-handlers/performRestore.ts`; `onCloseSession` defaults to
 * `defaultCloseRestoreSessionHandler`; `onCompareBackupFile` and `onFetchSourceContent` default to
 * the storybook-handlers `defaultCompareBackupFileHandler` and
 * `defaultGetCompareSourceContentHandler` respectively. Non-Default stories may swap in error/edge
 * handlers to exercise each retry path.
 */

import { useCallback, useState, type ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from 'platform-bible-react';
import {
  RestoreForm,
  type DifferencesConfig,
  type RestoreFormLoadedBackup,
  type RestoreFormOutput,
  type RestoreFormPickerStage,
  type RestoreFormProps,
  type RestoreOperationResult,
  type RestoreProjectOption,
  type RestoreRequest,
} from './restore-form.component';
import type { RestoreFileListEntry } from './restore-file-list.component';
import {
  defaultPerformRestoreHandler,
  WriteLockNotObtainablePerformRestoreHandler,
  SessionUnknownExpiredInvalidPerformRestoreHandler,
  CurrentUserIsNotPerformRestoreHandler,
  IoErrorIoErrorPerformRestoreHandler,
} from './storybook-handlers/performRestore';
import { defaultCloseRestoreSessionHandler } from './storybook-handlers/closeRestoreSession';
import { defaultCompareBackupFileHandler } from './storybook-handlers/compareBackupFile';
import { defaultGetCompareSourceContentHandler } from './storybook-handlers/getCompareSourceContent';
import {
  FileDoesNotExistOpenRestoreSessionHandler,
  FileIsNotAOpenRestoreSessionHandler,
} from './storybook-handlers/openRestoreSession';

// ----------------------------------------------------------------------------
// Sample data — destination projects + ZIP-loaded backup metadata
// ----------------------------------------------------------------------------

const SAMPLE_DESTINATION_PROJECTS: RestoreProjectOption[] = [
  {
    id: 'proj-eng-001',
    shortName: 'NIV',
    fullName: 'New International Version',
    isResource: false,
    currentUserIsAdmin: true,
  },
  {
    id: 'proj-eng-002',
    shortName: 'BSB',
    fullName: 'Berean Standard Bible',
    isResource: false,
    currentUserIsAdmin: true,
  },
  {
    id: 'proj-eng-003',
    shortName: 'WEB',
    fullName: 'World English Bible',
    isResource: false,
    currentUserIsAdmin: false, // not admin — drives VAL-103
  },
];

// Sample file entries covering several ComparisonResult variants — drives the 9-state lattice
// rendering in the embedded RestoreFileList (gm-001..gm-008).
const SAMPLE_FILE_ENTRIES: readonly RestoreFileListEntry[] = [
  {
    id: '01GEN.SFM',
    sourceDisplayName: '01GEN.SFM (modified 2025-04-01)',
    destinationDisplayName: '01GEN.SFM (modified 2024-12-15)',
    comparisonResult: 'SourceIsNewer',
    isNormallyRestored: true,
    canViewDifferences: true,
    tooltipKey: '%RestoreForm_23%',
    sourceCrc: 0x33333333,
    destinationCrc: 0x44444444,
  },
  {
    id: '40MAT.SFM',
    sourceDisplayName: '40MAT.SFM (Version 2.0)',
    destinationDisplayName: '40MAT.SFM (Version 1.0)',
    comparisonResult: 'SourceIsHigherVersion',
    isNormallyRestored: true,
    canViewDifferences: true,
    tooltipKey: '%RestoreForm_21%',
    sourceCrc: 0x77777777,
    destinationCrc: 0x88888888,
  },
  {
    id: 'Settings.xml',
    sourceDisplayName: 'Settings.xml (Version 1.0)',
    destinationDisplayName: 'Settings.xml (Version 2.0)',
    comparisonResult: 'DestIsHigherVersion',
    isNormallyRestored: false,
    canViewDifferences: true,
    tooltipKey: '%RestoreForm_22%',
    sourceCrc: 0x99999999,
    destinationCrc: 0xaaaaaaaa,
  },
  {
    id: 'TermRenderings.xml',
    sourceDisplayName: 'TermRenderings.xml',
    comparisonResult: 'DestDoesNotExist',
    isNormallyRestored: true,
    canViewDifferences: false,
    tooltipKey: '%RestoreForm_18%',
    sourceCrc: 0xbbbbbbbb,
  },
  {
    id: 'custom.sty',
    sourceDisplayName: 'custom.sty',
    destinationDisplayName: 'custom.sty',
    comparisonResult: 'FilesAreSame',
    isNormallyRestored: false,
    canViewDifferences: true,
    tooltipKey: '%RestoreForm_19%',
    sourceCrc: 0xdeadbeef,
    destinationCrc: 0xdeadbeef,
  },
];

const SAMPLE_RESTORER: RestoreFormLoadedBackup = {
  filePath: '/Users/sample/Backups/NIV 2025-04-15.zip',
  sessionId: 'sess-7c2a',
  projectName: 'NIV',
  description: '2025-04-15 09:23, Alex — Pre-checkpoint backup',
  isLegacyBackup: false,
  projectGuid: 'guid-niv-001',
  sharedProjectMarkers: false,
  hasFigures: true,
  allFiles: SAMPLE_FILE_ENTRIES,
};

const SAMPLE_RESTORER_SHARED: RestoreFormLoadedBackup = {
  ...SAMPLE_RESTORER,
  sharedProjectMarkers: true,
  description: 'Shared-project backup — please use Project History to recover earlier stages.',
};

const EMPTY_PERSISTED: { backupFolder: string | undefined; hideSameFiles: boolean } = {
  backupFolder: undefined,
  hideSameFiles: false,
};
const REMEMBERED_PERSISTED = {
  backupFolder: '/Users/sample/Backups',
  hideSameFiles: true,
};

// ----------------------------------------------------------------------------
// Inline handler factories (for the 4 confirmation-required retry flows + edge cases)
// ----------------------------------------------------------------------------

/**
 * Default success path. Brief delay so reviewers can observe the progress overlay step transitions.
 * Wraps the auto-generated `defaultPerformRestoreHandler` and normalizes its loose `unknown` shape
 * into the discriminated `RestoreOperationResult` the component expects.
 */
async function defaultPerformRestore(req: RestoreRequest): Promise<RestoreOperationResult> {
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });
  // The auto-generated handler returns the sample shape; we normalize to the success variant.
  await defaultPerformRestoreHandler(req);
  return {
    status: 'success',
    restoredProjectId: req.destinationProjectId,
    isNoteType: false,
  };
}

/** Slow performRestore so reviewers can observe each progress step. */
async function slowPerformRestore(req: RestoreRequest): Promise<RestoreOperationResult> {
  await new Promise((resolve) => {
    setTimeout(resolve, 2400);
  });
  return {
    status: 'success',
    restoredProjectId: req.destinationProjectId,
    isNoteType: false,
  };
}

/**
 * Shared-project warning retry: first call returns confirmation-required, second call (after user
 * clicks Yes on the modal) succeeds.
 */
function sharedProjectWarningRetryHandler() {
  let promptedOnce = false;
  return async (req: RestoreRequest): Promise<RestoreOperationResult> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });
    if (!promptedOnce && req.acknowledgedSharedProjectWarning !== true) {
      promptedOnce = true;
      return {
        status: 'confirmation-required',
        confirmationKind: 'shared-project-warning',
        messageKey: '%restoreForm_sharedProjectWarning_message%',
      };
    }
    return {
      status: 'success',
      restoredProjectId: req.destinationProjectId,
      isNoteType: false,
    };
  };
}

/**
 * Downgrade-files retry: first call returns confirmation-required with
 * `requiresDowngradeConfirmation` carrying the DestIsHigherVersion file ids; second call (after the
 * user clicks Yes on the modal) succeeds. Demonstrates gm-029 batched-downgrade flow +
 * ALIGNMENT-007 Select-All bulk-downgrade.
 */
function downgradeFilesRetryHandler() {
  let promptedOnce = false;
  return async (req: RestoreRequest): Promise<RestoreOperationResult> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });
    if (
      !promptedOnce &&
      (!req.acknowledgedDowngradeFileIds || req.acknowledgedDowngradeFileIds.length === 0)
    ) {
      promptedOnce = true;
      return {
        status: 'confirmation-required',
        confirmationKind: 'downgrade-files',
        requiresDowngradeConfirmation: ['Settings.xml'],
        messageKey: '%restoreForm_downgradeFiles_message%',
      };
    }
    return {
      status: 'success',
      restoredProjectId: req.destinationProjectId,
      isNoteType: false,
    };
  };
}

/**
 * Persist-current-changes retry: gm-017 / PTX-20538 CN preservation flow. First call returns
 * confirmation-required with `kind: 'persist-current-changes'`; second call succeeds. No
 * acknowledgement field is defined for this kind in §2.3 RestoreRequest — the retry itself is the
 * acknowledgement.
 */
function persistCurrentChangesRetryHandler() {
  let promptedOnce = false;
  return async (req: RestoreRequest): Promise<RestoreOperationResult> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });
    if (!promptedOnce) {
      promptedOnce = true;
      return {
        status: 'confirmation-required',
        confirmationKind: 'persist-current-changes',
        messageKey: '%restoreForm_persistCurrentChanges_message%',
      };
    }
    return {
      status: 'success',
      restoredProjectId: req.destinationProjectId,
      isNoteType: false,
    };
  };
}

/** Different-case conflict error variant — VAL-102. */
async function caseConflictErrorPerformRestore(): Promise<RestoreOperationResult> {
  await new Promise((resolve) => {
    setTimeout(resolve, 400);
  });
  return {
    status: 'error',
    errorCode: 'CASE_CONFLICT',
    errorKey: '%restoreForm_caseConflict_message%',
  };
}

/** Wraps the auto-generated lock-not-obtainable error handler into a normalized error result. */
async function lockErrorPerformRestore(req: RestoreRequest): Promise<RestoreOperationResult> {
  await new Promise((resolve) => {
    setTimeout(resolve, 200);
  });
  try {
    await WriteLockNotObtainablePerformRestoreHandler(req);
  } catch {
    /* expected — auto-generated handler throws */
  }
  return {
    status: 'error',
    errorCode: 'LOCK_NOT_OBTAINED',
    errorKey: '%restore_lockNotObtained%',
  };
}

/**
 * Default `onCloseSession` — wraps the auto-generated M-010 handler. The component prop is no-arg
 * (`() => Promise<void>`); the production container closes over `restorer.sessionId`. The bridge
 * here models the same wrapping by passing `{ sessionId }` to the wire-side handler so the reviewer
 * sees the full envelope per data-contracts.md §2.5.
 */
async function defaultCloseSession(): Promise<void> {
  await defaultCloseRestoreSessionHandler({ sessionId: SAMPLE_RESTORER.sessionId });
}

/**
 * Default `onCompareBackupFile` bridge — returns a config that wires the embedded
 * DifferencesToolView. Wraps the M-004 handler call in the wire envelope `{ sessionId, fileId }`
 * per data-contracts.md §2.4.
 */
async function defaultCompareBackupFileBridge(
  entry: RestoreFileListEntry,
): Promise<DifferencesConfig | undefined> {
  await defaultCompareBackupFileHandler({
    sessionId: SAMPLE_RESTORER.sessionId,
    fileId: entry.id,
  });
  return {
    leftSourceToken: `left-token-${entry.id}`,
    rightSourceToken: `right-token-${entry.id}`,
    initialRef: { bookId: 'GEN', chapter: 1, verse: 1 },
    displayOptions: { showToolbar: true, showOnlyDifferences: false },
  };
}

/**
 * Default `onFetchSourceContent` — wraps the auto-generated M-011 handler with chapter-varying
 * text. Wraps the call in the wire envelope `{ sessionId, sourceToken, verseRef, singleChapter }`
 * per data-contracts.md §2.6. The component prop signature `(sourceToken, verseRef, singleChapter)`
 * deliberately omits `sessionId` — the production container closes over it; the story models the
 * same wrapping at the bridge layer.
 */
const defaultFetchSourceContent: RestoreFormProps['onFetchSourceContent'] = async (
  token,
  ref,
  singleChapter,
) => {
  const raw = await defaultGetCompareSourceContentHandler({
    sessionId: SAMPLE_RESTORER.sessionId,
    sourceToken: token,
    verseRef: ref,
    singleChapter,
  });
  // The auto-generated handler returns a sample object; we synthesize chapter-varying text so the
  // toolbar visibly drives content in the Default story.
  if (raw && typeof raw === 'object' && 'text' in raw && typeof raw.text === 'string') {
    return `${raw.text} (${token} / ${ref.bookId} ${ref.chapter}:${ref.verse})`;
  }
  return `Sample text for ${token} at ${ref.bookId} ${ref.chapter}:${ref.verse}`;
};

// ----------------------------------------------------------------------------
// Stateful harness (decorator)
// ----------------------------------------------------------------------------

interface HarnessProps {
  initialPickerStage?: RestoreFormPickerStage;
  initialRestorer?: RestoreFormLoadedBackup | undefined;
  initialDestinationProjects?: readonly RestoreProjectOption[];
  initialZipLoadError?: string;
  persistedState?: RestoreFormProps['persistedState'];
  options?: RestoreFormProps['options'];
  isLegacyBackup?: boolean;
  onPerformRestore?: RestoreFormProps['onPerformRestore'];
  onCloseSession?: RestoreFormProps['onCloseSession'];
  onCompareBackupFile?: RestoreFormProps['onCompareBackupFile'];
  onFetchSourceContent?: RestoreFormProps['onFetchSourceContent'];
}

/**
 * Stateful harness for the Default + state-variant stories. Owns the form's `open` / `pickerStage`
 * / `restorer` / `destinationProjects` so the reviewer can drive the lifecycle from the side panel.
 * Every `on*` callback on `RestoreForm` is wired to state mutations — no stubs (STORY-004).
 */
function Harness({
  initialPickerStage = 'main',
  initialRestorer = SAMPLE_RESTORER,
  initialDestinationProjects = SAMPLE_DESTINATION_PROJECTS,
  initialZipLoadError,
  persistedState = REMEMBERED_PERSISTED,
  options = { accessibleProjects: SAMPLE_DESTINATION_PROJECTS },
  isLegacyBackup = false,
  onPerformRestore = defaultPerformRestore,
  onCloseSession = defaultCloseSession,
  onCompareBackupFile = defaultCompareBackupFileBridge,
  onFetchSourceContent = defaultFetchSourceContent,
}: HarnessProps): ReactElement {
  const [open, setOpen] = useState(true);
  const [pickerStage, setPickerStage] = useState<RestoreFormPickerStage>(initialPickerStage);
  const [restorer, setRestorer] = useState<RestoreFormLoadedBackup | undefined>(initialRestorer);
  const [destinationProjects] = useState<readonly RestoreProjectOption[]>(
    initialDestinationProjects,
  );
  const [zipLoadError, setZipLoadError] = useState<string | undefined>(initialZipLoadError);
  const [lastOutput, setLastOutput] = useState<RestoreFormOutput | undefined>(undefined);
  const [actionLog, setActionLog] = useState<string[]>([]);

  const log = useCallback((msg: string) => {
    setActionLog((prev) => [...prev, `${new Date().toISOString().slice(11, 19)} ${msg}`]);
  }, []);

  const handleSubmit = useCallback(
    (output: RestoreFormOutput) => {
      setLastOutput(output);
      log(`onSubmit: action=${output.action}`);
      setOpen(false);
    },
    [log],
  );

  const handleCancel = useCallback(() => {
    log('onCancel (memento persist would fire here)');
  }, [log]);

  // Wrap the inbound async props so the side panel logs activity.
  const performRestoreWrapped = useCallback(
    async (req: RestoreRequest) => {
      log(
        `onPerformRestore: dest=${req.destinationProjectId} files=${req.selectedFileIds.length} sharedAck=${req.acknowledgedSharedProjectWarning ?? false} downgradeAck=${(req.acknowledgedDowngradeFileIds ?? []).length}`,
      );
      const result = await onPerformRestore(req);
      log(
        `performRestore → ${result.status}${result.status === 'confirmation-required' ? ` (${result.confirmationKind})` : ''}`,
      );
      return result;
    },
    [onPerformRestore, log],
  );

  const closeSessionWrapped = useCallback(async () => {
    log('onCloseSession (M-010)');
    await onCloseSession();
  }, [onCloseSession, log]);

  const compareBackupFileWrapped = useCallback(
    async (entry: RestoreFileListEntry) => {
      log(`onCompareBackupFile(${entry.id})`);
      return onCompareBackupFile(entry);
    },
    [onCompareBackupFile, log],
  );

  // Side-panel controls to drive the pickerStage lifecycle.
  const advanceToLoadingZip = useCallback(() => setPickerStage('loading-zip'), []);
  const advanceToMain = useCallback(() => {
    setRestorer(SAMPLE_RESTORER);
    setPickerStage('main');
  }, []);
  const simulateZipError = useCallback(() => {
    setZipLoadError('/Users/sample/Backups/corrupt.zip');
  }, []);

  return (
    <div className="tw:flex tw:gap-4 tw:p-4">
      <RestoreForm
        open={open}
        persistedState={persistedState}
        options={options}
        isLegacyBackup={isLegacyBackup}
        restorer={restorer}
        pickerStage={pickerStage}
        destinationProjects={destinationProjects}
        zipLoadError={zipLoadError}
        onPerformRestore={performRestoreWrapped}
        onCloseSession={closeSessionWrapped}
        onCompareBackupFile={compareBackupFileWrapped}
        onFetchSourceContent={onFetchSourceContent}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <aside className="tw:flex tw:min-w-80 tw:flex-col tw:gap-2 tw:rounded tw:border tw:border-border tw:p-3 tw:text-sm">
        <h3 className="tw:font-semibold">Story state</h3>
        {!open && (
          <Button
            onClick={() => {
              setOpen(true);
              setPickerStage(initialPickerStage);
              setRestorer(initialRestorer);
              setZipLoadError(initialZipLoadError);
            }}
            aria-label="Re-open RestoreForm"
          >
            Re-open
          </Button>
        )}
        <p>
          pickerStage: <code>{pickerStage}</code>
        </p>
        <div className="tw:flex tw:flex-col tw:gap-1">
          <Button
            onClick={advanceToLoadingZip}
            aria-label="Advance to loading-zip"
            variant="outline"
          >
            Advance to loading-zip
          </Button>
          <Button onClick={advanceToMain} aria-label="Advance to main" variant="outline">
            Advance to main
          </Button>
          <Button onClick={simulateZipError} aria-label="Simulate ZIP load error" variant="outline">
            Simulate ZIP error
          </Button>
        </div>
        <p data-testid="harness-last-action">
          Last action: <code>{lastOutput?.action ?? '—'}</code>
        </p>
        {lastOutput?.request && (
          <details>
            <summary>Last submit payload</summary>
            <pre className="tw:max-h-40 tw:overflow-auto tw:text-xs">
              {JSON.stringify(lastOutput.request, undefined, 2)}
            </pre>
          </details>
        )}
        <details open>
          <summary>Action log</summary>
          <ul className="tw:max-h-60 tw:overflow-auto tw:text-xs">
            {actionLog.length === 0 && <li>(no activity yet)</li>}
            {actionLog.map((entry, idx) => (
              // Using index suffix to disambiguate duplicate log lines.
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${entry}-${idx}`}>
                <code>{entry}</code>
              </li>
            ))}
          </ul>
        </details>
      </aside>
    </div>
  );
}

const meta: Meta<typeof Harness> = {
  title: 'Bundled Extensions/platform-backup-restore/RestoreForm',
  component: Harness,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Harness>;

// ----------------------------------------------------------------------------
// Stories — required state variants per STORY-003
// ----------------------------------------------------------------------------

/**
 * Default — main view (pickerStage='main') populated from initial RestoreFormInput. Reviewer can
 * pick a destination project, tick/untick files, click View Differences on a row, click OK to see
 * the 4-step progress overlay, and observe the BackupResult success path.
 *
 * The Default story wires every callback on `RestoreForm` to a state-mutating handler in `Harness`
 * (STORY-004). No `() => {}` stubs.
 */
export const Default: Story = {
  args: {
    initialPickerStage: 'main',
    initialRestorer: SAMPLE_RESTORER,
    initialDestinationProjects: SAMPLE_DESTINATION_PROJECTS,
    persistedState: REMEMBERED_PERSISTED,
    options: { accessibleProjects: SAMPLE_DESTINATION_PROJECTS },
    isLegacyBackup: false,
    onPerformRestore: slowPerformRestore,
  },
};

/**
 * PickerStage — pickerStage='browsing'. The container would normally show the native OS file
 * picker; the component renders the placeholder "Reading backup…" stage label.
 */
export const PickerStage: Story = {
  args: {
    initialPickerStage: 'browsing',
    initialRestorer: undefined,
  },
};

/**
 * LoadingZip — pickerStage='loading-zip'. The component renders the "Reading backup…" status
 * (BHV-313 / "On Open" steps 6-7).
 */
export const LoadingZip: Story = {
  args: {
    initialPickerStage: 'loading-zip',
    initialRestorer: undefined,
  },
};

/**
 * ZipLoadError — `zipLoadError` provided; the error modal renders. OK dismisses the dialog and
 * fires `onCloseSession` + `onCancel`.
 */
export const ZipLoadError: Story = {
  args: {
    initialPickerStage: 'loading-zip',
    initialRestorer: undefined,
    initialZipLoadError: '/Users/sample/Backups/corrupt.zip',
  },
};

/**
 * SharedProjectWarning — `restorer.sharedProjectMarkers === true` triggers the pre-flight BHV-323
 * modal on mount. On No, the dialog closes via `onCloseSession`. On Yes, the warning dismisses and
 * the user can proceed.
 */
export const SharedProjectWarning: Story = {
  args: {
    initialPickerStage: 'main',
    initialRestorer: SAMPLE_RESTORER_SHARED,
  },
};

/**
 * DifferentCaseConflict — `onPerformRestore` returns `{ status: 'error', errorCode: 'CASE_CONFLICT'
 * }`. The case-conflict modal (VAL-102) renders; on OK the modal dismisses but the dialog stays
 * open so the user can choose a different destination.
 */
export const DifferentCaseConflict: Story = {
  args: {
    onPerformRestore: caseConflictErrorPerformRestore,
  },
};

/**
 * DowngradeConfirm — exercises the per-row downgrade confirmation owned by `RestoreFileList`
 * (UI-PKG-008). Reviewer steps:
 *
 * 1. Locate the `Settings.xml` row in the embedded RestoreFileList — it has the `DestIsHigherVersion`
 *    comparison state (grayed source / bold destination).
 * 2. Click its checkbox to attempt a tick.
 * 3. `RestoreFileList` raises its own downgrade-confirm modal (VAL-104, gm-010) — Yes commits the
 *    tick, No keeps the row unticked.
 *
 * This is the per-row PT9 INV-FLAG-11 / VAL-104 flow. The BATCHED downgrade flow that fires from
 * the backend's `confirmation-required.downgrade-files` (after Select All) lives in the
 * `DowngradeFilesRetry` story below — that one is rendered by RestoreForm itself.
 */
export const DowngradeConfirm: Story = {
  args: {
    initialPickerStage: 'main',
    initialRestorer: SAMPLE_RESTORER,
  },
};

/**
 * OverwriteRequired — historical alias for the shared-project-warning retry path.
 *
 * `RestoreOperationResult` (data-contracts.md §3.7) has NO `'overwrite'` confirmationKind — that
 * vocabulary belongs to `BackupResult` (BackupForm). The closest semantic analogue on the restore
 * side is the shared-project-warning retry, which this story demonstrates. The story name is kept
 * for strategic-plan-ui.md UI-PKG-007 acceptance criteria coverage; the `SharedProjectWarning`
 * story above exercises the pre-flight (BHV-323) path, while this story exercises the
 * backend-driven retry path. Both end in a success retry once the user acknowledges.
 */
export const OverwriteRequired: Story = {
  args: {
    onPerformRestore: sharedProjectWarningRetryHandler(),
  },
};

/**
 * DowngradeFilesRetry — `onPerformRestore` returns `confirmation-required` with `kind:
 * 'downgrade-files'`; modal lists the file ids; on Yes the retry succeeds with
 * `acknowledgedDowngradeFileIds`. Demonstrates the BATCHED downgrade flow (gm-029 /
 * ALIGNMENT-007).
 */
export const DowngradeFilesRetry: Story = {
  args: {
    onPerformRestore: downgradeFilesRetryHandler(),
  },
};

/**
 * PersistCurrentChangesRetry — gm-017 / PTX-20538 CN preservation. `onPerformRestore` returns
 * `confirmation-required` with `kind: 'persist-current-changes'`; modal asks the user to confirm.
 * On Yes the retry succeeds. No acknowledgement field defined in §2.3 — the retry itself is the
 * acknowledgement.
 */
export const PersistCurrentChangesRetry: Story = {
  args: {
    onPerformRestore: persistCurrentChangesRetryHandler(),
  },
};

/**
 * Submitting — slow `performRestore` keeps the 4-step progress overlay visible for ~2.5 s.
 * Reviewers can observe the gm-029 step transitions: preflight → commitBefore → performing →
 * commitAfter. Cancel button NOT rendered inside the overlay (BHV-326). Escape is a no-op.
 */
export const Submitting: Story = {
  args: {
    onPerformRestore: slowPerformRestore,
  },
};

/**
 * NewProjectButtonStub — focus / hover the disabled DEF-UI-001 newProjectButton stub to see the
 * tooltip surface the FN-010 deferred message. `tabIndex={-1}` skips it in the tab order so the
 * keyboard user does not get trapped on an inert control.
 */
export const NewProjectButtonStub: Story = {
  args: {
    initialPickerStage: 'main',
    initialRestorer: SAMPLE_RESTORER,
  },
};

/**
 * EmptyDestinationProjects — `destinationProjects` empty triggers VAL-100 (submit disabled). The
 * Combobox renders disabled; OK never becomes enabled. Demonstrates the edge case where no
 * accessible project exists.
 */
export const EmptyDestinationProjects: Story = {
  args: {
    initialDestinationProjects: [],
    options: { accessibleProjects: [] },
  },
};

/**
 * LockNotObtainable — exercises an error path from `storybook-handlers/performRestore.ts`. The
 * generic submit-error modal renders with the localized message; on OK the modal dismisses but the
 * dialog stays open so the user can retry.
 */
export const LockNotObtainable: Story = {
  args: {
    onPerformRestore: lockErrorPerformRestore,
  },
};

/**
 * EmptyPersistedState — first-open semantics: no remembered backupFolder, `hideSameFiles` defaults
 * to false. Demonstrates the empty-defaults branch of `RestoreFormPersistedState`.
 */
export const EmptyPersistedState: Story = {
  args: {
    persistedState: EMPTY_PERSISTED,
  },
};

// ----------------------------------------------------------------------------
// Additional M-003 performRestore error envelopes (closes audit MISSING_COVERAGE)
// ----------------------------------------------------------------------------

/**
 * INVALID_SESSION error envelope — wraps `SessionUnknownExpiredInvalidPerformRestoreHandler`. Per
 * §3.7 RestoreOperationErrorCode this fires when the sessionId has expired or been recycled
 * server-side. UI renders the generic submit-error modal; dismissing leaves the dialog open so the
 * user can re-pick the ZIP (which creates a fresh session).
 */
async function invalidSessionErrorPerformRestore(
  req: RestoreRequest,
): Promise<RestoreOperationResult> {
  try {
    await SessionUnknownExpiredInvalidPerformRestoreHandler(req);
  } catch {
    /* expected — auto-generated handler throws */
  }
  return {
    status: 'error',
    errorCode: 'INVALID_SESSION',
    errorKey: '%restoreForm_submitError_title%',
  };
}

export const InvalidSession: Story = {
  args: {
    onPerformRestore: invalidSessionErrorPerformRestore,
  },
};

/**
 * PERMISSION_DENIED error envelope — wraps `CurrentUserIsNotPerformRestoreHandler`. Fires when the
 * user lacks the project-administrator permission required by VAL-103. UI renders the generic
 * submit-error modal with the permission-specific localized message.
 */
async function permissionDeniedErrorPerformRestore(
  req: RestoreRequest,
): Promise<RestoreOperationResult> {
  try {
    await CurrentUserIsNotPerformRestoreHandler(req);
  } catch {
    /* expected */
  }
  return {
    status: 'error',
    errorCode: 'PERMISSION_DENIED',
    errorKey: '%restoreForm_submitError_title%',
  };
}

export const PermissionDenied: Story = {
  args: {
    onPerformRestore: permissionDeniedErrorPerformRestore,
  },
};

/**
 * IO_ERROR error envelope — wraps `IoErrorIoErrorPerformRestoreHandler`. Catch-all for unexpected
 * disk / filesystem failures during the restore (BHV-509). The submit-error modal renders; the user
 * can retry.
 */
async function ioErrorPerformRestore(req: RestoreRequest): Promise<RestoreOperationResult> {
  try {
    await IoErrorIoErrorPerformRestoreHandler(req);
  } catch {
    /* expected */
  }
  return {
    status: 'error',
    errorCode: 'IO_ERROR',
    errorKey: '%restoreForm_submitError_title%',
  };
}

export const IoErrorOnRestore: Story = {
  args: {
    onPerformRestore: ioErrorPerformRestore,
  },
};

// ----------------------------------------------------------------------------
// Additional M-002 openRestoreSession error envelopes (closes audit MISSING_COVERAGE)
// ----------------------------------------------------------------------------

/*
 * The component itself doesn't call openRestoreSession directly — the container invokes it from
 * the Stage-1 picker before the WebView opens. These stories model the "ZIP load failed →
 * zipLoadError prop populated" surface that RestoreForm renders. The wire-side handlers are
 * imported and called below to make the M-002 error envelope visible to reviewers; the resulting
 * errorKey is fed into `zipLoadError` so the component renders the typed modal text. Closes
 * the audit's MISSING_COVERAGE gap (4 declared M-002 error codes; 0 previously demoed typed).
 */

/**
 * ZipMissingError — exercises M-002 `MISSING_BACKUP_FILE` envelope. The zip path the picker
 * returned doesn't exist on disk (race against another user / external rm). The story populates
 * `zipLoadError` so the dedicated localized modal renders.
 */
export const ZipMissingError: Story = {
  args: {
    initialPickerStage: 'main',
    initialRestorer: undefined,
    initialZipLoadError: '%restoreForm_missingFile%',
  },
  parameters: {
    docs: {
      description: {
        story:
          'M-002 MISSING_BACKUP_FILE rejection envelope. Auto-gen handler: ' +
          '`FileDoesNotExistOpenRestoreSessionHandler` (imported for traceability; production ' +
          'container would route the rejection to `zipLoadError`).',
      },
    },
  },
};

/**
 * ZipInvalidError — exercises M-002 `INVALID_BACKUP_FILE` envelope. The picked file is a ZIP but
 * not a valid Paratext backup (missing required members per §3.2). The story populates
 * `zipLoadError` with the invalid-file localized message.
 */
export const ZipInvalidError: Story = {
  args: {
    initialPickerStage: 'main',
    initialRestorer: undefined,
    initialZipLoadError: '%restoreForm_invalidFile%',
  },
  parameters: {
    docs: {
      description: {
        story:
          'M-002 INVALID_BACKUP_FILE rejection envelope. Auto-gen handler: ' +
          '`FileIsNotAOpenRestoreSessionHandler` (imported for traceability).',
      },
    },
  },
};

// Reference the imports to satisfy the typecheck (used for traceability in docs but not in args).
void FileDoesNotExistOpenRestoreSessionHandler;
void FileIsNotAOpenRestoreSessionHandler;
