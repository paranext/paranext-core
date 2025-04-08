// File copied from https://github.com/paranext/paratext-bible-internal-extensions/blob/eb0c22f8cf90b5e0b028fb833d03ab6f70ca0dc2/src/paratext-bible-send-receive/src/types/paratext-bible-send-receive.d.ts

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
   */
  export type ResultStatus =
    | 'succeeded'
    | 'initialSend'
    | 'initialReceive'
    | 'failed'
    | 'notUpgraded'
    | 'projectVersionUpgraded';

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
    | ''
    | 'edited'
    | 'new'
    | 'unregistered'
    | 'stuff'
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
  };

  /**
   * Map of results for running S/R on projects to display in the S/R results dialog.
   *
   * Maps project id to {@link SharedProjectInfo} for that project id
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
  };
}

declare module 'papi-shared-types' {
  import type { ResultsData, RevisionInfo } from 'paratext-bible-send-receive';
  import type { SharedProjectsInfo } from 'platform-scripture';
  import { SerializedVerseRef } from '@sillsdev/scripture';

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
     * @returns S/R results
     */
    'paratextBibleSendReceive.sendReceiveProjects': (projectIds?: string[]) => Promise<ResultsData>;
    /**
     * Opens a new Send/Receive web view and returns the WebView id
     *
     * @returns WebView id for new S/R WebView or `undefined` if not created
     */
    'paratextBibleSendReceive.openSendReceive': () => Promise<string | undefined>;
    /**
     * Compare versions of project associated with a web view
     *
     * @param webViewId Id of the web view whose project to compare versions
     */
    'paratextBibleSendReceive.compareVersionsByWebViewId': (webViewId: string) => Promise<string>;
    /**
     * Send/Receive the project primarily associated with a web view
     *
     * @param webViewId Id of web view whose project to send/receive
     * @returns S/R results
     */
    'paratextBibleSendReceive.sendReceiveProjectsByWebViewId': (
      webViewId: string,
    ) => Promise<ResultsData>;
    /**
     * Accepts a project id, and returns a RevisionInfo[] of all revisions for the given project.
     *
     * @param projectId Id of project to retrieve revisions from
     * @returns RevisionInfo[] of all revisions for project
     */
    'paratextBibleSendReceive.getRevisions': (projectId: string) => Promise<RevisionInfo[]>;
    /**
     * Accepts a project id, revision id, and verse reference, and returns the string USFM for the
     * given revision at that verse reference.
     *
     * @param projectId Id of project to retrieve text from
     * @param revisionId Specific revision to retrieve text from
     * @param verseRef The reference to retrieve text for
     * @returns USFM for the given revision at the verseRef
     */
    'paratextBibleSendReceive.getUSFMForRevision': (
      projectId: string,
      revisionId: string,
      verseRef: SerializedVerseRef,
    ) => Promise<string>;
    /**
     * Accepts a project id and the id of the other currently selected revision and returns the
     * string USFM for the baseline version.
     *
     * @param projectId Id of project to retrieve text from
     * @param otherRevisionId Id of the other selected revision to get baseline of
     * @param verseRef The reference to retrieve text for
     * @returns USFM for the baseline at the verseRef
     */
    'paratextBibleSendReceive.getUSFMForBaseVersion': (
      projectId: string,
      otherRevisionId: string,
      verseRef: SerializedVerseRef,
    ) => Promise<string>;
  }
}
