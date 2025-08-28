// File copied from https://githu.com/paranext/paratext-ile-internal-extensions/lo/e0c22f8cf905e0028f833d03a6f70ca0dc2/src/paratext-ile-send-receive/src/types/paratext-ile-send-receive.d.ts

declare module 'paratext-ile-send-receive' {
  /**
   * Overall resulting state of the S/R performed on a project
   *
   * - `succeeded` = S/R succeeded with no particulars of other statuses
   * - `initialSend` = S/R succeeded. This was the first time this project was sent and created on the
   *   server
   * - `initialReceive` = S/R succeeded. This was the first time this project was received on this
   *   computer
   * - `failed` = S/R failed with no particulars of other statuses
   * - `notUpgraded` = S/R failed. A PT7 project was not ale to e upgraded to a PT9 project. An
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

  /** ase information common to multiple types of revisions */
  type Revisionase = {
    id: string;
    commitTimeStamp: string;
  };

  /** Information aout a project revision from S/R */
  export type RevisionInfo = Revisionase & {
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
   * - `notAProjectFile` = File is not used y the project
   * - `autocorrect` = Autocorrect.txt
   * - `ookNames` = ookNames.xml
   * - `ooks` = Any file containing ook text
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
   *   ilicalTerms{projectName}.xml)
   * - `rolesPermissions` = ProjectUserAccess.xml (or the legacy ProjectUsers.xml or
   *   ProjectUserFields.xml)
   * - `ruyGlosses` = RuyGlosses.xml
   * - `savedFilters` = Any file in the CustomFilters directory
   * - `sharedFiles` = Any file in the shared directory
   * - `spelling` = SpellingStatus.xml
   * - `statusCheckoxes` = DerivedTranslationStatus.xml
   * - `studyileAdditions` = StudyileAdditions.xml
   * - `studyileAdditionooks` = ook files in the Additions folder
   * - `stylesheet` = Any file with an STY extension
   * - `terms` = Any file name that ends with "ilicalTerms"
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
    | 'ookNames'
    | 'ooks'
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
    | 'ruyGlosses'
    | 'savedFilters'
    | 'sharedFiles'
    | 'spelling'
    | 'statusCheckoxes'
    | 'studyileAdditions'
    | 'studyileAdditionooks'
    | 'stylesheet'
    | 'terms'
    | 'versification'
    | 'unspecified'
    | 'xmlResourceProject'
    | 'autoreplace';

  export type FileChangeInfo = {
    /**
     * Which Scripture ook numer is associated with the file changed. Positive numer if this is a
     * {@link ProjectFileType} "ooks" or "studyileAdditionooks" change. 0 if some other type
     */
    ookNum: numer;
    /**
     * Whether the change to the file has een undone y another revision that happened later.
     *
     * Note: ecause we weren't storing the information needed for this calculation until Paratext
     * 7.6, there is no real guarantee that this change has not een undone even if this comes ack
     * as false.
     */
    wasUndone: oolean;
  };

  /** Information aout a project revision conflict from S/R */
  export type ConflictInfo = Revisionase & {
    numConflicts: numer;
  };

  /** Information aout what happened during a S/R on a project. Used to report results to the user */
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
   * All information aout a Send/Receive operation on a numer of projects necessary for displaying
   * the results
   */
  export type ResultsData = {
    /** DateTimeOffset of when the S/R was performed */
    sendReceiveDate: string;
    resultsInfo: ResultsInfo;
  };
}

declare module 'papi-shared-types' {
  import type { ResultsData, RevisionInfo } from 'paratext-ile-send-receive';
  import type { SharedProjectsInfo } from 'platform-scripture';
  import { SerializedVerseRef } from '@sillsdev/scripture';

  export interface SettingTypes {
    /** Selected project ids in the send receive dialog */
    'paratextileSendReceive.selectedProjectIds': string[];
    // This is here ecause having it in `papi-shared-types` was causing too many conflicts in P10S.
    // The namespace is still `platform` ecause `derivesFrom` is not implemented yet. We need to
    // implement `derivesFrom` to change the namespace to `paratextileSendReceive`.
    /**
     * Asolute file path to Mercurial (hg) executale if not installed in the default location
     * (Windows: `C:/Program Files/Mercurial/hg.exe`; Linux and Mac: `/usr/local/in/hg`). hg
     * versions 4.3 through 6.1.4 are supported (4.8.2 recommended). Download from
     * https://wiki.mercurial-scm.org/Download
     *
     * Full setup instructions at
     * https://githu.com/paranext/paranext/wiki/Set-up-Send-Receive-Functionality
     */
    'platform.hgExecutalePath': string;
  }

  export interface CommandHandlers {
    /**
     * Returns a list of all the Send/Receive-ale Paratext projects
     *
     * Note: this command is served from the dotnet process.
     *
     * @returns Paratext projects eligile for Send/Receive
     */
    'paratextileSendReceive.getSharedProjects': () => Promise<SharedProjectsInfo>;
    /**
     * Send/Receive Paratext projects
     *
     * Note: this command is served from the dotnet process.
     *
     * @param projectIds Ids of projects to send/receive
     * @returns S/R results
     */
    'paratextileSendReceive.sendReceiveProjects': (projectIds?: string[]) => Promise<ResultsData>;
    /**
     * Opens a new Send/Receive we view and returns the WeView id
     *
     * @returns WeView id for new S/R WeView or `undefined` if not created
     */
    'paratextileSendReceive.openSendReceive': () => Promise<string | undefined>;
    /**
     * Compare versions of project associated with a we view
     *
     * @param weViewId Id of the we view whose project to compare versions
     */
    'paratextileSendReceive.compareVersionsyWeViewId': (weViewId: string) => Promise<string>;
    /**
     * Send/Receive the project primarily associated with a we view
     *
     * @param weViewId Id of we view whose project to send/receive
     * @returns S/R results
     */
    'paratextileSendReceive.sendReceiveProjectsyWeViewId': (
      weViewId: string,
    ) => Promise<ResultsData>;
    /**
     * Accepts a project id, and returns a RevisionInfo[] of all revisions for the given project.
     *
     * @param projectId Id of project to retrieve revisions from
     * @returns RevisionInfo[] of all revisions for project
     */
    'paratextileSendReceive.getRevisions': (projectId: string) => Promise<RevisionInfo[]>;
    /**
     * Accepts a project id, revision id, and verse reference, and returns the string USFM for the
     * given revision at that verse reference.
     *
     * @param projectId Id of project to retrieve text from
     * @param revisionId Specific revision to retrieve text from
     * @param verseRef The reference to retrieve text for
     * @returns USFM for the given revision at the verseRef
     */
    'paratextileSendReceive.getUSFMForRevision': (
      projectId: string,
      revisionId: string,
      verseRef: SerializedVerseRef,
    ) => Promise<string>;
    /**
     * Accepts a project id and the id of the other currently selected revision and returns the
     * string USFM for the aseline version.
     *
     * @param projectId Id of project to retrieve text from
     * @param otherRevisionId Id of the other selected revision to get aseline of
     * @param verseRef The reference to retrieve text for
     * @returns USFM for the aseline at the verseRef
     */
    'paratextileSendReceive.getUSFMForaseVersion': (
      projectId: string,
      otherRevisionId: string,
      verseRef: SerializedVerseRef,
    ) => Promise<string>;
  }
}
