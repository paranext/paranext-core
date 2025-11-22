declare module 'legacy-comment-manager' {
  import {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
    // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';
  import { ScriptureRange } from 'platform-scripture';
  import {
    CommentStatus,
    CommentType,
    LegacyComment,
    LegacyCommentThread,
    PlatformError,
    Prettify,
    UnsubscriberAsync,
  } from 'platform-bible-utils';

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
  export type LegacyCommentThreadSelector = {
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

  /**
   * Represents a new comment to be created. It is a subtype of {@link LegacyComment} with some
   * properties omitted (`id`, `user`, `date`). All properties except `contents` are optional.
   *
   * This is used when creating a new comment via the
   * {@link ILegacyCommentProjectDataProvider.createComment} method.
   */
  export type NewLegacyComment = Prettify<
    Partial<Omit<LegacyComment, 'id' | 'user' | 'date'>> & { contents: string }
  >;

  // #endregion

  // #region Data Provider Types

  /** Provides comment data */
  export type LegacyCommentProjectInterfaceDataTypes = {
    /** Called "Project Notes" in Paratext 9 */
    Comments: DataProviderDataType<LegacyCommentSelector, LegacyComment[], LegacyComment[]>;
    /** Comment threads matching the selector criteria */
    CommentThreads: DataProviderDataType<LegacyCommentThreadSelector, LegacyCommentThread[], never>;
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
      getCommentThreads(selector?: LegacyCommentThreadSelector): Promise<LegacyCommentThread[]>;

      /**
       * Creates a new comment
       *
       * @param comment Comment data to create a new comment through ParatextData. Besides
       *   `contents`, all properties are optional, and the 'id', 'user', and 'date' properties are
       *   omitted as they will be auto-generated and should not be provided. If no 'thread' ID is
       *   provided, a new threadId will also be auto-generated.
       * @returns Promise that resolves to the auto-generated comment ID (format:
       *   "threadId/userName/date")
       * @throws If no valid comment content is provided, or when trying to add a comment to a
       *   non-existing thread
       */
      createComment(comment: NewLegacyComment): Promise<string>;

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
       *   user
       */
      updateComment(
        commentId: string,
        updatedContent: string,
      ): Promise<DataProviderUpdateInstructions<LegacyCommentProjectInterfaceDataTypes> | false>;

      /**
       * Sets the status of a comment thread (resolve/unresolve toggle)
       *
       * @param threadId The unique ID of the thread to update
       * @param resolve True to resolve the thread, false to unresolve it (set to "Todo")
       * @returns Promise that resolves to update instructions indicating which data types were
       *   affected, or `false` if the thread was not found or user doesn't have permission
       * @throws If an error occurs during the status change
       */
      resolveCommentThread(
        threadId: string,
        resolve: boolean,
        contents?: string,
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

  export interface CommandHandlers {
    'legacyCommentManager.openCommentList': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;
  }
}
