declare module 'legacy-comment-manager' {
  import {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
    // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';
  import { ScriptureRange } from 'platform-scripture';
  import { PlatformError, UnsubscriberAsync } from 'platform-bible-utils';

  // #region Enums

  /** Possible status of a comment/note as defined in Paratext 9 */
  export type CommentStatus = 'Unspecified' | 'Todo' | 'Done' | 'Resolved';

  /**
   * Possible types of comment/note as defined in Paratext 9 For conflict subtypes, see
   * {@link CommentConflictType}
   */
  export type CommentType = 'Unspecified' | 'Normal' | 'Conflict';

  /** Possible types of conflicts for a comment/note as defined in Paratext 9 */
  export type CommentConflictType =
    | 'None'
    | 'VerseTextConflict'
    | 'InvalidVerses'
    | 'VerseBridgeDifferences'
    | 'DuplicateVerses'
    | 'ReadError'
    | 'VerseOrderError'
    | 'StudyBibleChangeConflict'
    | 'StudyBibleOverlappingChanges'
    | 'StudyBibleChangeDeleteConflict';

  // #endregion

  // #region Scripture Range Types

  /**
   * Represents a selection of scripture text for comment filtering
   *
   * Extends the ScriptureRange type from platform-scripture with granularity information
   */
  export type CommentScriptureRange = ScriptureRange & {
    /**
     * Specifies how granular the VerseRefs should be interpreted
     *
     * - `book` = Range covers entire book(s)
     * - `chapter` = Range covers entire chapter(s)
     * - `verse` = Range covers specific verse(s)
     *
     * @default 'verse'
     */
    granularity?: 'book' | 'chapter' | 'verse';
  };

  // #endregion

  // #region Date Filter Types

  /**
   * Filter for comment dates using ISO 8601 date strings
   *
   * Can specify exact date, date range, or before/after a date
   */
  export type DateFilter =
    | {
        /** Exact date match */
        exact: string;
      }
    | {
        /** Date range filter */
        range: {
          /** Start date (inclusive) */
          start: string;
          /** End date (inclusive) */
          end: string;
        };
      }
    | {
        /** Comments on or before this date */
        before: string;
      }
    | {
        /** Comments on or after this date */
        after: string;
      };

  // #endregion

  // #region Selector Types

  export type LegacyCommentSelector = {
    bookId: string;
    chapterNum?: number;
    verseNum?: number;
    commentId?: string;
    threadId?: string;
  };

  /**
   * Selector for retrieving comment threads
   *
   * All properties are optional - if none are specified, returns all threads
   */
  export type CommentThreadSelector = {
    /** Filter by note status */
    status?: CommentStatus;
    /** Filter by note type */
    type?: CommentType;
    /** Filter by thread ID */
    threadId?: string;
    /** Filter by date */
    dateFilter?: DateFilter;
    /** Filter by user who created comments */
    user?: string;
    /** Filter by user to whom comments are assigned */
    assignedTo?: string;
    /** Filter by scripture range */
    scriptureRanges?: CommentScriptureRange[];
  };

  // #endregion

  // #region Legacy Types

  export type LegacyComment = {
    assignedUser?: string;
    biblicalTermId?: string;
    conflictType?: string;
    contents: string;
    contextAfter?: string;
    contextBefore?: string;
    date: string;
    deleted: boolean;
    extraHeadingInfo?: string;
    hideInTextWindow: boolean;
    id: string;
    language: string;
    replyToUser?: string;
    selectedText?: string;
    shared?: string;
    startPosition: number;
    status?: string;
    tagAdded?: string;
    tagRemoved?: string;
    thread: string;
    type?: string;
    user: string;
    verse?: string;
    verseRef: string;
  };

  /**
   * Represents a comment thread - a collection of related comments
   *
   * This is the C# CommentThread type from Paratext.Data.ProjectComments
   */
  export type CommentThread = {
    /** Thread identifier (from first comment) */
    id: string;
    /** All comments in this thread */
    comments: LegacyComment[];
    /** Only non-deleted comments */
    activeComments: LegacyComment[];
    /** Thread status (aggregated from most recent non-Unspecified comment) */
    status: CommentStatus;
    /** Thread type (from first comment) */
    type: CommentType;
    /** User to whom the thread is assigned */
    assignedUser: string;
    /** User to reply to */
    replyToUser: string;
    /** Last modified date (ISO 8601 string) */
    modifiedDate: string;
    /** Scripture reference for this thread */
    verseRef: string;
    /** Original selected verse text */
    originalVerseText: string;
    /** Name of the context scripture text */
    contextScrTextName?: string;
    /** Whether this is a spelling note */
    isSpellingNote: boolean;
    /** Whether this is a back translation note */
    isBTNote: boolean;
    /** Whether this is a consultant note */
    isConsultantNote: boolean;
    /** Biblical term ID if this is a biblical term note */
    biblicalTermId?: string;
  };

  // #endregion

  // #region Data Provider Types

  /** Provides comment data */
  export type LegacyCommentProjectInterfaceDataTypes = {
    /** Called "Project Notes" in Paratext 9 */
    Comments: DataProviderDataType<LegacyCommentSelector, LegacyComment[], LegacyComment[]>;
    /** Comment threads matching the selector criteria */
    CommentThreads: DataProviderDataType<CommentThreadSelector, CommentThread[], never>;
  };

  /** Provides comments from project team members in a way that is compatible with Paratext 9 */
  export type ILegacyCommentProjectDataProvider =
    IProjectDataProvider<LegacyCommentProjectInterfaceDataTypes> & {
      /** Gets the specified comments by ID or all comments in given portion of scripture */
      getComments(selector: LegacyCommentSelector): Promise<LegacyComment[]>;
      /** Sets all comments or just the comment with the given ID */
      setComments(
        selector: LegacyCommentSelector,
        comments: LegacyComment[],
      ): Promise<DataProviderUpdateInstructions<LegacyCommentProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the comments data changes
       *
       * @param selector Tells the provider what changes to listen for (which comments)
       * @param callback Function to run with the updated comments for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeComments(
        selector: LegacyCommentSelector,
        callback: (comments: LegacyComment[] | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
      /**
       * Gets comment threads matching the specified selector criteria
       *
       * @param selector Filter criteria for comment threads. If not provided or all properties are
       *   undefined, returns all threads
       * @returns Promise that resolves to an array of comment threads
       */
      getCommentThreads(selector?: CommentThreadSelector): Promise<CommentThread[]>;

      /**
       * Creates a new comment. The comment ID and thread ID are automatically generated.
       *
       * @param selector Specifies the location and content of the new comment. BookId, ChapterNum,
       *   and VerseNum are required. CommentId should contain the comment text content.
       * @returns Promise that resolves to the auto-generated comment ID (format:
       *   "threadId/userName/date")
       */
      createComment(selector: LegacyCommentSelector): Promise<string>;

      /**
       * Deletes a comment by its ID
       *
       * @param commentId The unique ID of the comment to delete
       * @returns Promise that resolves to update instructions indicating which data types were
       *   affected, or `false` if the comment was not found
       */
      deleteComment(
        commentId: string,
      ): Promise<DataProviderUpdateInstructions<LegacyCommentProjectInterfaceDataTypes> | false>;

      /**
       * Updates the content of an existing comment
       *
       * @param commentId The unique ID of the comment to update
       * @param updatedContent The new text content for the comment
       * @returns Promise that resolves to update instructions indicating which data types were
       *   affected, or `false` if the comment was not found
       */
      updateComment(
        commentId: string,
        updatedContent: string,
      ): Promise<DataProviderUpdateInstructions<LegacyCommentProjectInterfaceDataTypes> | false>;

      // #endregion
    };

  // #endregion
}

declare module 'papi-shared-types' {
  import type { ILegacyCommentProjectDataProvider } from 'legacy-comment-manager';

  export interface ProjectDataProviderInterfaces {
    'legacyCommentManager.comments': ILegacyCommentProjectDataProvider;
  }
}
