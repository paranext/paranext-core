/**
 * Stories for BackupForm (UI-PKG-004 / SCR-001).
 *
 * Each story wraps the production `BackupForm` in a stateful decorator (`Harness`) so reviewers
 * can:
 *
 * - Type into form fields and watch `descriptionPreview` re-derive.
 * - Click Choose… to open the embedded BookChooser sub-modal.
 * - Click Browse… and see destinationPath update from a mock save-file picker.
 * - Click OK to see the progress overlay, and observe the resulting BackupResult.
 * - Trigger the overwrite-required confirmation modal flow.
 *
 * Per the criteria template, the Default story wires every `on*` callback to a state-mutating
 * handler — no stubs. Storybook handler defaults from `./storybook-handlers/createBackup.ts` are
 * imported and used as the production `onCreateBackup` mock. `onValidate` is a local pass-through
 * since no `validateBackup` storybook-handler exists yet (phase-3-ui owns the M-009 handler).
 */

import { useCallback, useState, type ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from 'platform-bible-react';
import {
  BackupForm,
  type BackupFormProps,
  type BackupFormOutput,
  type BackupProjectOption,
  type BackupRequest,
  type BackupResult,
  type BackupValidationRequest,
  type BackupValidationResult,
} from './backup-form.component';
import { defaultCreateBackupHandler } from './storybook-handlers/createBackup';
import type { BookSet } from './book-chooser.component';

// ----------------------------------------------------------------------------
// Sample data
// ----------------------------------------------------------------------------

const OT_NT_BOOKS: BookSet = {
  bookIds: ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'MAT', 'MRK', 'LUK', 'JHN'],
  summary: '9 books',
};

const NOTES_BOOKS: BookSet = { bookIds: [], summary: '(notes)' };

const SAMPLE_PROJECTS: BackupProjectOption[] = [
  {
    id: 'proj-eng-001',
    shortName: 'NIV',
    fullName: 'New International Version',
    isResource: false,
    hasFiguresFolder: true,
    isNotesType: false,
    defaultBookSet: OT_NT_BOOKS,
  },
  {
    id: 'proj-nofig-002',
    shortName: 'BSB',
    fullName: 'Berean Standard Bible',
    isResource: false,
    hasFiguresFolder: false,
    isNotesType: false,
    defaultBookSet: OT_NT_BOOKS,
  },
  {
    id: 'proj-notes-003',
    shortName: 'NOTES',
    fullName: 'Translation Notes',
    isResource: false,
    hasFiguresFolder: false,
    isNotesType: true,
    defaultBookSet: NOTES_BOOKS,
  },
  {
    id: 'proj-resource-004',
    shortName: 'ESV',
    fullName: 'English Standard Version (Resource)',
    isResource: true,
    hasFiguresFolder: false,
    isNotesType: false,
    defaultBookSet: OT_NT_BOOKS,
  },
];

const SAMPLE_PERSISTED = { backupFolder: '/Users/sample/Backups', userName: 'Alex' };
const EMPTY_PERSISTED = { backupFolder: undefined, userName: '' };
const SAMPLE_USB = {
  usbDevices: [{ rootPath: '/Volumes/USB', label: 'USB Drive', isRemovable: true }],
};
const NO_USB = { usbDevices: [] };

// ----------------------------------------------------------------------------
// Inline default handlers (validateBackup / browse / createBackup variants)
// ----------------------------------------------------------------------------

/**
 * Inline default `onValidate` handler. Mirrors the local pre-check rules so the story exercises the
 * same gates as production validation. No `storybook-handlers/validateBackup.ts` exists yet
 * (phase-3-ui owns generating it).
 */
async function defaultValidateBackupHandler(
  req: BackupValidationRequest,
): Promise<BackupValidationResult> {
  const errors: BackupValidationResult['errors'] = {};
  if (req.destinationPath.trim() === '') errors.destinationPath = 'Destination is required';
  if (req.userName.trim() === '') errors.userName = 'Please enter your name';
  return { isValid: Object.keys(errors).length === 0, errors };
}

/** Pass-through validator that always reports valid (for stories that pre-fill everything). */
async function alwaysValidHandler(): Promise<BackupValidationResult> {
  return { isValid: true, errors: {} };
}

/** Mock save-file dialog that returns a synthesized path. */
async function defaultBrowseHandler(initial: string): Promise<string | undefined> {
  const ts = new Date().toISOString().slice(11, 19).replace(/:/g, '');
  if (initial === '') return `/Volumes/USB/backup-${ts}.zip`;
  return initial.replace(/\.zip$/, `-${ts}.zip`);
}

/** Browse handler that simulates the user cancelling the picker. */
async function browseCancelHandler(): Promise<string | undefined> {
  return undefined;
}

/** Loose shape returned by the auto-generated storybook handler. */
interface RawCreateBackupSample {
  destinationPath?: string;
  fileSizeBytes?: number;
  backupLogEntryWritten?: boolean;
}

/** Type guard for the auto-generated handler's loose response shape. */
function asRawCreateBackupSample(raw: unknown): RawCreateBackupSample {
  if (raw === undefined) return {};
  if (typeof raw !== 'object') return {};
  // `raw` is `object | null` here; treat any falsy value as empty.
  return raw ?? {};
}

/** Wrap the auto-generated handler so it returns the discriminated `BackupResult` shape. */
async function defaultCreateBackup(req: BackupRequest): Promise<BackupResult> {
  const raw = asRawCreateBackupSample(await defaultCreateBackupHandler(req));
  return {
    status: 'success',
    destinationPath: raw.destinationPath ?? req.destinationPath,
    fileSizeBytes: raw.fileSizeBytes ?? 0,
    backupLogEntryWritten: raw.backupLogEntryWritten ?? true,
  };
}

/** Slow `createBackup` so the reviewer can observe the progress overlay for several seconds. */
async function slowCreateBackup(req: BackupRequest): Promise<BackupResult> {
  await new Promise((resolve) => {
    setTimeout(resolve, 2500);
  });
  return defaultCreateBackup(req);
}

/**
 * First call returns `overwrite-required`; subsequent call (after confirm) succeeds. Demonstrates
 * the BackupResult overwrite-required → confirm → retry flow end-to-end.
 */
function overwriteRequiredCreateBackup() {
  let promptedOnce = false;
  return async (req: BackupRequest): Promise<BackupResult> => {
    if (!promptedOnce && !req.confirmOverwrite) {
      promptedOnce = true;
      await new Promise((resolve) => {
        setTimeout(resolve, 400);
      });
      return { status: 'overwrite-required', existingPath: req.destinationPath };
    }
    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });
    return {
      status: 'success',
      destinationPath: req.destinationPath,
      fileSizeBytes: 102_400,
      backupLogEntryWritten: true,
    };
  };
}

// ----------------------------------------------------------------------------
// Stateful harness (decorator)
// ----------------------------------------------------------------------------

interface HarnessProps {
  initialProjectId: BackupFormProps['initialProjectId'];
  options: BackupFormProps['options'];
  persistedState: BackupFormProps['persistedState'];
  storageHints: BackupFormProps['storageHints'];
  onValidate?: BackupFormProps['onValidate'];
  onCreateBackup?: BackupFormProps['onCreateBackup'];
  onBrowseDestination?: BackupFormProps['onBrowseDestination'];
}

/**
 * Stateful harness for the Default + state-variant stories. Owns the form's open state, the last
 * action / last submit payload, and lets the reviewer re-open the dialog after dismissal. Every
 * `on*` callback on `BackupForm` is wired here — no stubs (STORY-004).
 */
function Harness({
  initialProjectId,
  options,
  persistedState,
  storageHints,
  onValidate = defaultValidateBackupHandler,
  onCreateBackup = defaultCreateBackup,
  onBrowseDestination = defaultBrowseHandler,
}: HarnessProps): ReactElement {
  const [open, setOpen] = useState(true);
  const [lastOutput, setLastOutput] = useState<BackupFormOutput | undefined>(undefined);
  const [actionLog, setActionLog] = useState<string[]>([]);

  const log = useCallback((msg: string) => {
    setActionLog((prev) => [...prev, `${new Date().toISOString().slice(11, 19)} ${msg}`]);
  }, []);

  const handleSubmit = useCallback(
    (output: BackupFormOutput) => {
      setLastOutput(output);
      log(`onSubmit: action=${output.action}`);
      setOpen(false);
    },
    [log],
  );

  const handleCancel = useCallback(() => {
    log('onCancel');
  }, [log]);

  // Wrap the inbound onValidate/onCreateBackup/onBrowse so the reviewer sees activity in the log.
  const validateWrapped = useCallback(
    async (req: BackupValidationRequest) => {
      const result = await onValidate(req);
      // Don't spam the log on every keystroke; only log when validity changes.
      return result;
    },
    [onValidate],
  );

  const createBackupWrapped = useCallback(
    async (req: BackupRequest) => {
      log(`onCreateBackup: confirmOverwrite=${req.confirmOverwrite}`);
      const result = await onCreateBackup(req);
      log(`createBackup → ${result.status}`);
      return result;
    },
    [onCreateBackup, log],
  );

  const browseWrapped = useCallback(
    async (initial: string) => {
      log('onBrowseDestination');
      const chosen = await onBrowseDestination(initial);
      log(`browse → ${chosen ?? '(cancelled)'}`);
      return chosen;
    },
    [onBrowseDestination, log],
  );

  return (
    <div className="tw:flex tw:gap-4 tw:p-4">
      <BackupForm
        open={open}
        initialProjectId={initialProjectId}
        options={options}
        persistedState={persistedState}
        storageHints={storageHints}
        onValidate={validateWrapped}
        onCreateBackup={createBackupWrapped}
        onBrowseDestination={browseWrapped}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <aside className="tw:flex tw:min-w-80 tw:flex-col tw:gap-2 tw:rounded tw:border tw:border-border tw:p-3 tw:text-sm">
        <h3 className="tw:font-semibold">Story state</h3>
        {!open && (
          <Button onClick={() => setOpen(true)} aria-label="Re-open BackupForm">
            Re-open
          </Button>
        )}
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
            {actionLog.map((entry) => (
              <li key={entry}>
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
  title: 'Bundled Extensions/platform-backup-restore/BackupForm',
  component: Harness,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Harness>;

// ----------------------------------------------------------------------------
// Stories — required state variants per STORY-003
// ----------------------------------------------------------------------------

/**
 * Default — project pre-selected, persisted state populated, single USB attached. Reviewer can type
 * into fields and observe live validation, click Choose… to open the BookChooser, click Browse… to
 * mock-pick a path, click OK to see the progress overlay, and observe the resulting BackupResult.
 */
export const Default: Story = {
  args: {
    initialProjectId: 'proj-eng-001',
    options: { projects: SAMPLE_PROJECTS },
    persistedState: SAMPLE_PERSISTED,
    storageHints: SAMPLE_USB,
    onValidate: alwaysValidHandler,
    onCreateBackup: slowCreateBackup,
    onBrowseDestination: defaultBrowseHandler,
  },
};

/**
 * DefaultNoProject — no project pre-selected; initial focus moves to projectSelector. Demonstrates
 * the UISPEC-BACKUP-001 fallback behavior when the invoker doesn't know which project to use.
 */
export const DefaultNoProject: Story = {
  args: {
    initialProjectId: undefined,
    options: { projects: SAMPLE_PROJECTS },
    persistedState: EMPTY_PERSISTED,
    storageHints: NO_USB,
  },
};

/**
 * ValidationError — destination path empty AND userName empty. OK button disabled; inline error
 * messages render under each invalid field with `aria-invalid` + `aria-describedby` wired up.
 */
export const ValidationError: Story = {
  args: {
    initialProjectId: 'proj-eng-001',
    options: { projects: SAMPLE_PROJECTS },
    persistedState: { backupFolder: '', userName: '' },
    storageHints: NO_USB,
  },
};

/**
 * ResourceProject — selected project is a resource (isResource === true). VAL-001.2 error renders
 * beneath projectSelector with the two-line PT9 message; OK disabled.
 */
export const ResourceProject: Story = {
  args: {
    initialProjectId: 'proj-resource-004',
    options: { projects: SAMPLE_PROJECTS },
    persistedState: SAMPLE_PERSISTED,
    storageHints: NO_USB,
  },
};

/**
 * Submitting — a slow `createBackup` keeps the progress overlay visible for 2.5 s. Form fields
 * underneath are disabled; Cancel disabled.
 */
export const Submitting: Story = {
  args: {
    initialProjectId: 'proj-eng-001',
    options: { projects: SAMPLE_PROJECTS },
    persistedState: SAMPLE_PERSISTED,
    storageHints: SAMPLE_USB,
    onCreateBackup: slowCreateBackup,
  },
};

/**
 * FiguresNotAvailable — selected project has `hasFiguresFolder === false`. The entire
 * `includeFigures` row is omitted per BHV-309.
 */
export const FiguresNotAvailable: Story = {
  args: {
    initialProjectId: 'proj-nofig-002',
    options: { projects: SAMPLE_PROJECTS },
    persistedState: SAMPLE_PERSISTED,
    storageHints: NO_USB,
  },
};

/**
 * OverwriteRequired — first submit returns `BackupResult.overwrite-required`; the confirmation
 * modal appears with the existing path; pressing "Overwrite" retries with `confirmOverwrite: true`
 * and succeeds. Cancel keeps the dialog open.
 */
export const OverwriteRequired: Story = {
  args: {
    initialProjectId: 'proj-eng-001',
    options: { projects: SAMPLE_PROJECTS },
    persistedState: SAMPLE_PERSISTED,
    storageHints: SAMPLE_USB,
    onCreateBackup: overwriteRequiredCreateBackup(),
    onBrowseDestination: browseCancelHandler,
  },
};
