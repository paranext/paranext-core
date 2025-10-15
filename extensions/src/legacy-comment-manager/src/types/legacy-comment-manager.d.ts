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

  /** Possible types of comment/note as defined in Paratext 9 */
  export type CommentType = 'Unspecified' | 'Normal' | 'Conflict';

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
   * Filter for comment dates using ISO 8601 date-time strings
   *
   * Can specify exact date, date range, or before/after a date
   *
   * **Important**: All date strings must be valid ISO 8601 date-time strings with timezone
   * information (e.g., `"2025-10-27T00:00:00Z"` or `"2025-10-27T14:30:00-05:00"`).
   *
   * **Timezone Behavior**:
   *
   * - For date-only filtering (ignoring time), use midnight UTC: `"2025-10-27T00:00:00Z"`
   * - For precise date-time filtering, include the full timestamp with timezone offset
   * - ParatextData code performs comparisons in UTC, so times are normalized across timezones
   *
   * **Filter Types**:
   *
   * - `exact`: Matches comments created on the same calendar date (in UTC). Only compares the date
   *   portion, ignoring time.
   * - `before`: Matches comments created on or before the specified date-time. To fully include the
   *   entire day, use midnight UTC for the end of the range (e.g., `"2025-10-27T23:59:59Z"`).
   * - `after`: Matches comments created on or after the specified date-time. To fully include the
   *   entire day, use midnight UTC for the start of the range (e.g., `"2025-10-27T00:00:00Z"`).
   * - `range`: Matches comments created between start and end date-times (inclusive on both ends)
   */
  export type DateFilter =
    | {
        /**
         * Exact date match (compares date only, ignores time)
         *
         * Even though the time is ignored, it requires a valid ISO 8601 date-time string with
         * timezone (e.g., `"2025-10-27T00:00:00Z"`).
         */
        exact: string;
      }
    | {
        /** Date range filter (compares full date-time) */
        range: {
          /**
           * Start date-time (inclusive)
           *
           * ISO 8601 date-time string with timezone (e.g., `"2025-10-18T00:00:00Z"`)
           */
          start: string;
          /**
           * End date-time (inclusive)
           *
           * ISO 8601 date-time string with timezone (e.g., `"2025-10-18T23:59:59Z"`)
           */
          end: string;
        };
      }
    | {
        /**
         * Comments on or before this date-time (inclusive, compares full date-time)
         *
         * ISO 8601 date-time string with timezone (e.g., `"2025-10-18T23:59:59Z"`)
         */
        before: string;
      }
    | {
        /**
         * Comments on or after this date-time (inclusive, compares full date-time)
         *
         * ISO 8601 date-time string with timezone (e.g., `"2025-10-18T00:00:00Z"`)
         */
        after: string;
      };

  // #endregion

  // #region Selector Types

  export type LegacyCommentSelector = {
    bookId: string;
    chapterNum: number;
    verseNum?: number;
    commentId?: string;
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
    author?: string;
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
       * Creates a new comment
       *
       * @param comment Comment data to create a new comment through ParatextData. 'id', 'user', and
       *   'date' properties will be auto-generated and should not be provided. If no 'thread' ID is
       *   provided, a new threadId will also be auto-generated.
       * @returns Promise that resolves to the auto-generated comment ID (format:
       *   "threadId/userName/date")
       */
      createComment(comment: Omit<LegacyComment, 'id' | 'user' | 'date'>): Promise<string>;

      /**
       * Deletes a comment by its ID
       *
       * @param commentId The unique ID of the comment to delete
       * @returns Promise that resolves to update instructions indicating which data types were
       *   affected, or `false` if the comment was not found
       * @throws If an error occurs during deletion, or if the comment is not owned by the current
       *   user
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
       * @throws If an error occurs during the update, or if the comment is not owned by the current
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
