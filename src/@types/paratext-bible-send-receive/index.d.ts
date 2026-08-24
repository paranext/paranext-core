// Core's copy of the type seam with the closed-source `paratext-bible-send-receive` extension
// (shipped with Paratext 10 Studio). It declares the subset of that extension's contract that this
// repository consumes — commands, network events, and the payload types they reference — so core
// and its bundled extensions can talk to Send/Receive with real types.
//
// Derived from
// https://github.com/paranext/paratext-bible-internal-extensions/blob/b50ebb16505f8069fd517af39dea29de7d7569bb/src/paratext-bible-send-receive/src/types/paratext-bible-send-receive.d.ts
// TODO(PT-4233): Update the SHA above to the companion PR's merged commit once it lands.
// When the Send/Receive contract changes, re-sync the parts declared here from that file.
// NOTE: Preserve any types that exist here but not in the upstream file (structural refinements
// added in core before the upstream adopts them). Do not replace the module block wholesale.
// Likewise for declarations that exist in BOTH copies: a re-sync must not downgrade a richer
// declaration here (extra doc detail or type refinements) to a poorer upstream one — merge the
// two, and upstream the improvement instead.
// DELIBERATE DIVERGENCE — do not "restore" these to match upstream on a re-sync. Each is optional
// here and required upstream because a shipped Paratext 10 Studio build answers without it; making
// it required again turns each consumer's `?? fallback` into a lint-flagged unnecessary coalesce,
// and removing that coalesce crashes an older Studio build on the missing value:
//   * `SyncState.syncingProjectIds`
//
// Why this lives in `src/@types` and not under an extension's `src/types`:
//
// - This folder is a `typeRoots` entry for core and for every bundled extension, so one copy here
//   is ambient in all of this repo's TypeScript programs (see `src/@types/react-19-compat`, which
//   uses the same mechanism). A copy under one extension's `src` is only in that extension's own
//   program, which is how this repo previously ended up with two drifting copies.
// - Extension repos developed against core (including `paratext-bible-internal-extensions` itself)
//   list core's `extensions/src` — but not core's `src/@types` — in their `typeRoots`. Anything
//   send-receive declared in a core extension's advertised types file (e.g.
//   `platform-get-resources.d.ts`) therefore merges into the Send/Receive extension's own program,
//   where it collides with the authoritative declarations (duplicate identifiers for the module's
//   types, TS2717 for any command whose signature drifts). Declaring the seam here keeps it out of
//   those programs entirely.

declare module 'paratext-bible-send-receive' {
  /**
   * Overall resulting state of the S/R performed on a project
   *
   * - `succeeded` = S/R succeeded with no particulars of other statuses
   * - `initialSend` = S/R succeeded. This was the first time this project was sent and created on the
   *   server
   * - `initialReceive` = S/R succeeded. This was the first time this project was received on this
   *   computer
   * - `failed` = S/R failed with no particulars of other statuses
   * - `notUpgraded` = S/R failed. A PT7 project was not able to be upgraded to a PT9 project. An
   *   administrator must upgrade it
   * - `projectVersionUpgraded` = S/R sort-of failed. The project was upgraded to a higher version of
   *   Paratext. You must update Paratext to open the project
   *
   * For granular detail about what was sent/received, see {@link ResultChangeStatus} and
   * {@link ResultInfo.resultStatuses}.
   */
  export type ResultStatus =
    | 'succeeded'
    | 'initialSend'
    | 'initialReceive'
    | 'failed'
    | 'notUpgraded'
    | 'projectVersionUpgraded';

  /**
   * Granular change-tracking status for a single S/R result. Supplements (does not replace)
   * {@link ResultStatus} on {@link ResultInfo.resultStatus}.
   *
   * Exactly one send-axis value applies (`sentChanges` or `noChangesToSend`) and exactly one
   * receive-axis value applies (`receivedChanges` or `noChangesReceived`), so two values appear in
   * {@link ResultInfo.resultStatuses} simultaneously when both axes are present.
   *
   * - `sentChanges` = S/R sent ≥1 non-merge revision
   * - `receivedChanges` = S/R received ≥1 revision (RevisionsReceived.Count > 0)
   * - `noChangesToSend` = S/R sent no non-merge revisions
   * - `noChangesReceived` = S/R received no revisions (RevisionsReceived is empty)
   *
   * @experimental The set of values in this type may change
   */
  export type ResultChangeStatus =
    | 'sentChanges'
    | 'receivedChanges'
    | 'noChangesToSend'
    | 'noChangesReceived';

  /** Base information common to multiple types of revisions */
  type RevisionBase = {
    id: string;
    commitTimeStamp: string;
  };

  /** Information about a project revision from S/R */
  export type RevisionInfo = RevisionBase & {
    /** User who made this revision */
    userName: string;
    /** Summary comment on the revision */
    revisionComment?: string;
    /**
     * List of users who made the direct parent revisions. More than one parent indicates this is a
     * merge revision
     */
    parentRevisionUserNames: string[];
    fileChangesInfo: FileChangesInfo;
  };

  /** Map of project file types to a list of file changes of that type. */
  export type FileChangesInfo = { [projectFileType in ProjectFileType]?: FileChangeInfo[] };

  /**
   * Types of files that are considered part of a Paratext project
   *
   * - `notAProjectFile` = File is not used by the project
   * - `autocorrect` = Autocorrect.txt
   * - `bookNames` = BookNames.xml
   * - `books` = Any file containing book text
   * - `canons` = Canons.xml
   * - `denials` = Denials.xml (or the legacy Denials{projectName}.xml)
   * - `figures` = Any file in the figures directory
   * - `hyphenation` = hyphenatedWords.txt
   * - `interlinear` = Any file name that starts with "Interlinear_"
   * - `languageSettings` = Any file with an LDML extension (or the legacy LDS extension)
   * - `lexicon` = Lexicon.xml or WordAnalyses.xml
   * - `moduleSpecifications` = Any file in the Modules directory
   * - `notes` = Any file name that starts with "Notes_" (or the legacy "Comments_")
   * - `noteTags` = CommentTags.xml
   * - `noteLanguages` = NoteLanguages.xml
   * - `paratextUpdate` = ParatextVersionForUsers.xml
   * - `passages` = ParallelPassageStatus.xml
   * - `pluginData` = PluginDataMergeKeys.xml or any file in the pluginData directory
   * - `projectUpdate` = ProjectUpdates.xml
   * - `progress` = ProjectProgress.xml
   * - `propertiesAndSettings` = Settings.xml (or the legacy SSF file)
   * - `renderings` = TermRenderings.xml (or the legacy RenderingAuxiliaryInfo.xml or
   *   BiblicalTerms{projectName}.xml)
   * - `rolesPermissions` = ProjectUserAccess.xml (or the legacy ProjectUsers.xml or
   *   ProjectUserFields.xml)
   * - `rubyGlosses` = RubyGlosses.xml
   * - `savedFilters` = Any file in the CustomFilters directory
   * - `sharedFiles` = Any file in the shared directory
   * - `spelling` = SpellingStatus.xml
   * - `statusCheckBoxes` = DerivedTranslationStatus.xml
   * - `studyBibleAdditions` = StudyBibleAdditions.xml
   * - `studyBibleAdditionBooks` = Book files in the Additions folder
   * - `stylesheet` = Any file with an STY extension
   * - `terms` = Any file name that ends with "BiblicalTerms"
   * - `versification` = Any file with a VRS extension
   * - `unspecified` = Any other project file
   * - `xmlResourceProject` = Xml Resource project file
   * - `autoreplace` = Autoreplace.txt
   */
  export type ProjectFileType =
    | 'notAProjectFile'
    | 'autocorrect'
    | 'bookNames'
    | 'books'
    | 'canons'
    | 'denials'
    | 'figures'
    | 'hyphenation'
    | 'interlinear'
    | 'languageSettings'
    | 'lexicon'
    | 'moduleSpecifications'
    | 'notes'
    | 'noteTags'
    | 'noteLanguages'
    | 'paratextUpdate'
    | 'passages'
    | 'pluginData'
    | 'projectUpdate'
    | 'progress'
    | 'propertiesAndSettings'
    | 'renderings'
    | 'rolesPermissions'
    | 'rubyGlosses'
    | 'savedFilters'
    | 'sharedFiles'
    | 'spelling'
    | 'statusCheckBoxes'
    | 'studyBibleAdditions'
    | 'studyBibleAdditionBooks'
    | 'stylesheet'
    | 'terms'
    | 'versification'
    | 'unspecified'
    | 'xmlResourceProject'
    | 'autoreplace';

  export type FileChangeInfo = {
    /**
     * Which Scripture book number is associated with the file changed. Positive number if this is a
     * {@link ProjectFileType} "books" or "studyBibleAdditionBooks" change. 0 if some other type
     */
    bookNum: number;
    /**
     * Whether the change to the file has been undone by another revision that happened later.
     *
     * Note: Because we weren't storing the information needed for this calculation until Paratext
     * 7.6, there is no real guarantee that this change has not been undone even if this comes back
     * as false.
     */
    wasUndone: boolean;
  };

  /** Information about a project revision conflict from S/R */
  export type ConflictInfo = RevisionBase & {
    numConflicts: number;
  };

  /** Information about what happened during a S/R on a project. Used to report results to the user */
  export type ResultInfo = {
    id: string;
    name: string;
    fullName: string;
    language: string;
    resultStatus: ResultStatus;
    revisionsSent: RevisionInfo[];
    revisionsReceived: RevisionInfo[];
    conflictsInfo: ConflictInfo[];
    /** Additional information provided in some cases when a S/R fails */
    failureMessage?: string;
    /**
     * Granular change-tracking statuses ({@link ResultChangeStatus}); multiple can apply, e.g., sent
     * AND received
     *
     * @experimental The set of possible statuses may change
     */
    resultStatuses?: ResultChangeStatus[];
    /** Total conflict count computed by C# */
    conflictCount?: number;
  };

  /**
   * Map of results for running S/R on projects to display in the S/R results dialog.
   *
   * Maps project id to {@link ResultInfo} for that project id
   */
  export type ResultsInfo = { [projectId: string]: ResultInfo };

  /**
   * All information about a Send/Receive operation on a number of projects necessary for displaying
   * the results
   */
  export type ResultsData = {
    /** DateTimeOffset of when the S/R was performed */
    sendReceiveDate: string;
    resultsInfo: ResultsInfo;
    /**
     * Non-fatal warnings from secondary operations (e.g. connected-resource scans, DBL installs)
     * that did not prevent the primary S/R from completing. Includes warning-level alerts captured
     * from ParatextData during the sync.
     */
    warnings?: string[];
    /**
     * Unexpected error conditions from secondary operations that likely indicate a program error
     * but did not prevent the primary S/R from completing. Includes error-level alerts captured
     * from ParatextData during the sync.
     */
    errors?: string[];
  };

  /** Event payload emitted by the `paratextBibleSendReceive.onSyncStateChanged` network event */
  export type SyncProgressEvent = {
    /**
     * Whether any sync is running as of this event.
     *
     * `true` does NOT mean "a sync just started". It is also emitted when one claim releases while
     * another still holds — i.e. when the set of syncing projects SHRANK — so the projects covered
     * can change while this stays `true` and the set never passes through "not syncing". A consumer
     * naming what is syncing must therefore re-read {@link SyncState.syncingProjectIds} on every
     * `true` event and must not carry the previous set forward while that read is in flight, or it
     * will name a project that has already stopped.
     */
    isSyncing: boolean;
  };

  /**
   * Snapshot of Send/Receive activity returned by `paratextBibleSendReceive.getSyncState`. Lets a
   * consumer that mounts mid-sync (or after a renderer reload) seed its state instead of waiting
   * for the next `onSyncStateChanged` event, which may not arrive for the rest of the sync.
   *
   * Reflects only syncs run through the Send/Receive extension's own wrappers (`runManualSync`,
   * `syncOpenProjects`, `runScheduledSessionSync`, and the auto-sync engine), which claim through
   * its state controller. Callers that reach the dotnet `syncProjects`/`sendReceiveProjects`
   * commands directly are invisible here — nothing in `c-sharp/` emits `onSyncStateChanged` — so
   * treat this as best-effort rather than ground truth. Making this authoritative would take a
   * signal derived from the C# sync semaphore itself, which is upstream work in the Send/Receive
   * extension; see ADR-0020 in `.context/standards/Architecture-Decisions.md`.
   *
   * Two core paths are on the invisible side today, both worth knowing before relying on this for a
   * startup status:
   *
   * - **Simple mode startup sync** (`main/startup-tasks.ts`) calls `syncProjects` directly.
   * - **The picker's per-project sync** (`syncOnProjectSwitch` in `platform-scripture-editor`) calls
   *   `syncProjects`/`sendReceiveProjects` directly.
   *
   * Power mode's session-boundary sync IS visible: it goes through `runScheduledSessionSync`.
   */
  export type SyncState = {
    /** Whether any sync is running right now */
    isSyncing: boolean;
    /** Results of the last COMPLETED sync, if one has completed this session */
    lastResults?: ResultsData;
    /**
     * Project ids of the last COMPLETED sync (the one {@link SyncState.lastResults} describes). A
     * sync that failed before producing results does not update this, so a consumer pairing it with
     * `lastResults` always sees a matching request/results pair.
     *
     * NOT the projects of a sync currently running — for that see
     * {@link SyncState.syncingProjectIds}. While `isSyncing` is `true` this still describes the
     * PREVIOUS sync, so labelling an in-progress sync with it names the wrong projects.
     */
    lastRequestedProjectIds: string[];
    /**
     * Project ids of the sync(s) running RIGHT NOW. Empty exactly when `isSyncing` is `false`.
     * Overlapping syncs are unioned.
     *
     * Consumer notes:
     *
     * - A {@link SyncProgressEvent} with `isSyncing: true` may mean the set SHRANK rather than a new
     *   sync starting (see {@link SyncProgressEvent.isSyncing}), so re-read this on every such
     *   event.
     * - Order is claim order and carries no meaning. It can differ between reads of the SAME set — a
     *   project that releases and re-claims moves to the end — so sort before rendering a list that
     *   should stay stable.
     * - A fresh array is built on every `getSyncState` call, so compare by value; an identity check
     *   reports a change on every read.
     *
     * Optional in core's copy only: it was added to the Send/Receive contract after the version
     * shipping in some builds, so a Paratext 10 Studio build predating that change answers
     * `getSyncState` without it. Consumers must handle it being absent (fall back to a status that
     * names no projects) rather than assuming an empty array means "nothing syncing".
     */
    syncingProjectIds?: string[];
  };

  /**
   * Payload emitted by the `paratextBibleSendReceive.onSyncProgress` network event during a sync.
   * Fire-and-forget; subscribers use it to drive progress UI.
   */
  export type SyncProgressDetail = {
    /**
     * Current status text. For determinate progress this is the bare current item (e.g. a project
     * name like "GreekNT"), which the subscriber formats together with the percent; for
     * indeterminate progress it is a complete localized message shown verbatim (e.g.
     * "Reconnecting…").
     */
    progressText: string;
    /** 0–1 fraction; null/undefined ⇒ indeterminate. */
    progressValue?: number | null;
  };

  /**
   * Backend-authoritative snapshot of which projects an automatic Send/Receive is blocking edits on
   * (the wire shape of the C# `SendReceiveBlockState`). Carried identically by both the
   * `paratextBibleSendReceive.onSyncWriteLockChanged` network event and the
   * `paratextBibleSendReceive.getAutoSyncBlocking` command return.
   *
   * @experimental This type is unstable and may change shape or disappear without notice
   */
  export type SyncWriteLockSnapshot = {
    /** Whether the S/R write gate is currently blocking edits on any project */
    isBlocking: boolean;
    /** Ids of the blocked projects. `isBlocking` false always pairs with an empty array. */
    projectIds: string[];
  };
}

declare module 'papi-shared-types' {
  import type {
    ResultsData,
    SyncProgressDetail,
    SyncProgressEvent,
    SyncState,
    SyncWriteLockSnapshot,
  } from 'paratext-bible-send-receive';
  import type { SharedProjectsInfo } from 'platform-scripture';

  export interface SettingTypes {
    /** Selected project ids in the send receive dialog */
    'paratextBibleSendReceive.selectedProjectIds': string[];
    // This is here because having it in `papi-shared-types` was causing too many conflicts in P10S.
    // The namespace is still `platform` because `derivesFrom` is not implemented yet. We need to
    // implement `derivesFrom` to change the namespace to `paratextBibleSendReceive`.
    /**
     * Absolute file path to Mercurial (hg) executable if not installed in the default location
     * (Windows: `C:/Program Files/Mercurial/hg.exe`; Linux and Mac: `/usr/local/bin/hg`). hg
     * versions 4.3 through 6.1.4 are supported (4.8.2 recommended). Download from
     * https://wiki.mercurial-scm.org/Download
     *
     * Full setup instructions at
     * https://github.com/paranext/paranext/wiki/Set-up-Send-Receive-Functionality
     */
    'platform.hgExecutablePath': string;
  }

  export interface CommandHandlers {
    /**
     * Returns a list of all the Send/Receive-able Paratext projects
     *
     * Note: this command is served from the dotnet process.
     *
     * @returns Paratext projects eligible for Send/Receive
     */
    'paratextBibleSendReceive.getSharedProjects': () => Promise<SharedProjectsInfo>;

    /**
     * Send/Receive Paratext projects
     *
     * Note: this command is served from the dotnet process.
     *
     * @param projectIds Ids of projects to send/receive
     * @param suppressNotification When `true`, the dotnet process skips its own progress toast (the
     *   caller — e.g. the open S/R dialog — shows its own progress + Cancel). Defaults to `false`.
     * @returns S/R results
     */
    'paratextBibleSendReceive.sendReceiveProjects': (
      projectIds: string[],
      suppressNotification?: boolean,
    ) => Promise<ResultsData>;

    /**
     * Opens the sync status web view and returns its WebView id
     *
     * @returns WebView id for the sync status WebView or `undefined` if not created
     */
    'paratextBibleSendReceive.openSyncStatus': () => Promise<string | undefined>;

    /**
     * Returns the current {@link SyncState} so a consumer can seed its sync status on mount rather
     * than waiting for the next `paratextBibleSendReceive.onSyncStateChanged` event — which, for a
     * sync already in progress, has already fired and will not fire again until that sync ends.
     *
     * An in-memory read in the extension host; cheap enough to call on mount and on each state
     * change. Rejects if the Send/Receive extension has not registered its commands yet (a cold
     * start), so callers should keep their existing state on failure rather than assuming idle. A
     * cold-start rejection is not fast — the RPC layer retries a missing handler ten times a second
     * apart before rejecting — so a caller seeding on mount should retry rather than treat one
     * rejection as the final answer.
     *
     * @returns The current {@link SyncState}. Its `syncingProjectIds` may be ABSENT: a Paratext 10
     *   Studio build predating that field answers without it, so treat missing as "the syncing
     *   projects are unknown" rather than as "nothing is syncing" — `isSyncing` is what answers the
     *   latter.
     */
    'paratextBibleSendReceive.getSyncState': () => Promise<SyncState>;

    /**
     * Commits changes in the specified project to the version history. Unless `forceCommit` is
     * `true`, will only commit if there are changes/revisions detected.
     *
     * @param projectId Id of the project
     * @param comment Specified comment describing the change/revisions
     * @param forceCommit Whether to force a commit even if there are no changes
     * @returns Whether or not changes were committed
     */
    'paratextBibleSendReceive.commitChanges': (
      projectId: string,
      comment: string,
      forceCommit?: boolean,
    ) => Promise<boolean>;

    /**
     * Commits changes only if it's been a day since the last commit.
     *
     * @param projectId Id of the project
     */
    'paratextBibleSendReceive.commitDaily': (projectId: string) => Promise<void>;

    /**
     * Syncs projects: sends/receives each project, then reads each project's connected resources
     * and projects (one level deep — connections of connections are not included) and
     * sends/receives connected translation projects or DBL-updates connected resources as needed.
     * Unknown project IDs are skipped. Deduplication is handled internally.
     *
     * This signature matches this repository's C# stub (`String[]? projectIds`, no return value),
     * which core itself calls (e.g. the startup sync passes `undefined` to mean "sync all"). The
     * Send/Receive extension's own declaration also returns the S/R results; core does not consume
     * them.
     *
     * @param projectIds IDs of the projects to sync. If omitted, all shared projects that are
     *   already present locally (i.e., not new) are synced. If provided, only projects already
     *   present locally are synced; new projects (not yet received) and unknown IDs are skipped.
     * @throws `PlatformUnimplementedException` if not running in an application that implements
     *   this command (e.g., Paratext 10 Studio)
     */
    'paratextBibleSendReceive.syncProjects': (projectIds?: string[]) => Promise<void>;
    /**
     * Runs the Send/Receive sync scheduled for a session boundary ("On startup/shutdown") for the
     * projects the user scheduled for that boundary. The extension owns the schedule, running the
     * sync, and — on startup only — raising/clearing the block on editing a project while it is
     * syncing; core only triggers it at the corresponding session boundary.
     *
     * Handles its own errors internally and always resolves (never rejects for an internal
     * failure), reporting the outcome via the return value so the triggering side can log it
     * truthfully.
     *
     * @param boundary Which session boundary is being triggered.
     * @returns `'synced'` if a scheduled sync ran and completed, `'failed'` if one ran but did not
     *   complete successfully, or `'skipped'` if nothing ran (nothing scheduled, not due, or
     *   another sync already in progress).
     * @experimental This command is unstable and may change or disappear without notice
     */
    'paratextBibleSendReceive.runScheduledSessionSync': (
      boundary: 'startup' | 'shutdown',
    ) => Promise<'synced' | 'failed' | 'skipped'>;
    /**
     * Gets all open webview project IDs and calls `paratextBibleSendReceive.syncProjects` with
     * them.
     *
     * @throws `PlatformUnimplementedException` if not running in an application that implements
     *   this command (e.g., Paratext 10 Studio)
     */
    'paratextBibleSendReceive.syncOpenProjects': () => Promise<void>;

    /**
     * Cancels an in-progress sync operation if one is running. The process will finish dealing with
     * the current project/resource and then it will abort. It will not undo what has been done.
     *
     * @param notificationId ID of the notification that triggered this cancel, if any.
     *   Implementations may use this to validate that the cancel is for the expected sync
     *   operation. ABSENT means "cancel whatever sync is in progress" and implementations must
     *   honour it as such: a caller that raised no notification has no id to give, and an
     *   implementation that silently ignored an id-less cancel would leave that caller's UI
     *   reporting a cancel it never performed. Core's toolbar sync popover is such a caller.
     * @throws `PlatformUnimplementedException` if not running in an application that implements
     *   this command (e.g., Paratext 10 Studio)
     */
    'paratextBibleSendReceive.cancelSync': (notificationId?: string | number) => Promise<void>;

    /**
     * Breaks (releases) the Send/Receive server lock for each given project and reports per-project
     * success. Recovery for a project whose lock is held by the current user THEMSELVES (this same
     * person on another computer, or a previous interrupted sync). The server only permits breaking
     * a lock you own, so this can never break another user's lock.
     *
     * This is the **server-side repository lock** held on the S/R server — unrelated to the local
     * in-process sync write gate reported by the neighboring
     * `paratextBibleSendReceive.onSyncWriteLockChanged` event /
     * `paratextBibleSendReceive.getAutoSyncBlocking` command.
     *
     * Note: this command is served from the dotnet process.
     *
     * @param projectIds Ids of the projects whose server lock to break. An empty array is a no-op:
     *   it resolves to an empty map without contacting the server. A null array is out of contract
     *   (the type is `string[]`); implementations treat it like the empty array. Null/blank ids are
     *   skipped and omitted from the result map. Ids are trimmed, and case-variant duplicates
     *   collapse to a single upper-cased key (first occurrence wins)
     * @returns Map of project id → whether that project's lock was broken. Keys are upper-cased —
     *   index the map with upper-cased ids. `false` means "not broken", not "attempt failed": an
     *   attempt may not have been made at all (e.g. the request was refused while a sync was in
     *   progress), and a later retry can succeed
     * @throws `PlatformUnimplementedException` if not running in an application that implements
     *   this command (e.g., Paratext 10 Studio)
     * @experimental This command is unstable and may change or disappear without notice
     */
    'paratextBibleSendReceive.breakSyncLock': (
      projectIds: string[],
    ) => Promise<{ [projectId: string]: boolean }>;

    /**
     * Returns the S/R write gate's current {@link SyncWriteLockSnapshot} so subscribers can seed
     * their blocking state on init instead of assuming unblocked (e.g. after a renderer reload
     * during an in-flight sync).
     *
     * Note: this command is served from the dotnet process. Unlike most Send/Receive commands it is
     * registered by core's own `SendReceiveBlockNotifierService` rather than the extension, so it
     * is answered on plain Platform.Bible too (always not-blocking there — only Paratext 10 Studio
     * arms the gate). The realistic failure mode is a cold-start race: if the dotnet process has
     * not registered the command within main's retry budget (~9s), the request rejects — callers
     * should keep their fail-safe not-blocking default, and there is no re-query until PT-4265
     * lands.
     *
     * @returns The write gate's current snapshot
     * @experimental This command is unstable and may change or disappear without notice
     */
    'paratextBibleSendReceive.getAutoSyncBlocking': () => Promise<SyncWriteLockSnapshot>;
  }

  export interface NetworkEvents {
    /** Emitted whenever a sync starts or ends */
    'paratextBibleSendReceive.onSyncStateChanged': SyncProgressEvent;
    /** Emitted repeatedly during a sync with the current project name or reconnect status */
    'paratextBibleSendReceive.onSyncProgress': SyncProgressDetail;
    /**
     * Emitted by the dotnet process whenever the S/R write gate arms or disarms, carrying the
     * gate's full current {@link SyncWriteLockSnapshot}. Fires for ALL sync types (manual +
     * scheduled + session). The gate only ever arms in Paratext 10 Studio builds — never in plain
     * Platform.Bible, where the only emission is a single not-blocking baseline snapshot each time
     * the backend (re)starts (every build emits that baseline).
     *
     * @experimental This event is unstable and may change or disappear without notice
     */
    'paratextBibleSendReceive.onSyncWriteLockChanged': SyncWriteLockSnapshot;
  }
}
