declare module 'legacy-comment-manager' {
  import {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
    NetworkableObject,
    // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';
  import { ScriptureRange } from 'platform-scripture';
  import type { SerializedVerseRef } from '@sillsdev/scripture';
  import type { UsjDocumentLocation } from 'platform-bible-utils';
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
   * properties omitted (`id`, `user`, `date`, `thread`).Besides `contents`, all properties are
   * optional.
   *
   * This is used when creating a new comment via the
   * {@link ILegacyCommentProjectDataProvider.createComment} method.
   */
  export type NewLegacyComment = Prettify<
    Partial<Omit<LegacyComment, 'id' | 'user' | 'date' | 'thread'>> & { contents: string }
  >;

  /**
   * Represents a new comment to be created in a USJ context. It is a subtype of
   * {@link NewLegacyComment} with `verseRef` and properties related to USFM omitted (`verse`,
   * `selectedText`, `contextBefore`, `contextAfter`, `startPosition`). These properties will be
   * filled in automatically based on the USJ document and the selected text range.
   *
   * This is used when creating a new comment via the
   * {@link ILegacyCommentUsjProjectDataProvider.createComment} method in a USJ context.
   */
  export type NewLegacyCommentUsj = Prettify<
    Omit<
      NewLegacyComment,
      'verse' | 'verseRef' | 'selectedText' | 'contextBefore' | 'contextAfter' | 'startPosition'
    >
  >;

  /**
   * Represents a comment to add to an existing thread. It is a subtype of {@link LegacyComment} with
   * some properties omitted (`id`, `user`, `date`). The `thread` property is required.
   *
   * This is used when adding a comment to an existing thread via the
   * {@link ILegacyCommentProjectDataProvider.addCommentToThread} method.
   */
  export type LegacyCommentReply = Prettify<
    Partial<Omit<LegacyComment, 'id' | 'user' | 'date'>> & { thread: string }
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
       * Creates a new comment (which will automatically also create a new thread). Use
       * `addCommentToThread` to add a comment to an existing thread.
       *
       * @param comment Comment data to create a new comment through ParatextData. Besides
       *   `contents`, all properties are optional, and the 'thread', 'id', 'user', and 'date'
       *   properties are omitted as they will be auto-generated and should not be provided.
       * @returns Promise that resolves to the auto-generated comment ID (format:
       *   "threadId/userName/date")
       */
      createComment(comment: NewLegacyComment): Promise<string>;

      /**
       * Adds a comment to an existing thread. The thread must already exist.
       *
       * Can also be used to modify thread-level properties (status, assignedUser) without adding
       * comment content by omitting the `contents` property.
       *
       * @param comment Comment data. Must have a valid `thread` ID that exists.
       * @returns Promise that resolves to the auto-generated comment ID (format:
       *   "threadId/userName/date")
       * @throws If the thread ID is missing or doesn't exist
       * @throws If trying to resolve/unresolve without permission
       * @throws If the assignedUser is not a valid assignable user for this project
       */
      addCommentToThread(comment: LegacyCommentReply): Promise<string>;

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
       * Finds the list of users that can be assigned to comment threads in this project
       *
       * @returns Promise that resolves to an array of usernames that can be assigned to threads.
       *   Includes special values: "Team" for team assignment, and "" (empty string) for
       *   unassigned.
       */
      findAssignableUsers(): Promise<string[]>;

      // #region Permission Check Functions

      /**
       * Determines if the current user can create new comment threads in this project
       *
       * @param allowInSba Allow creating comments in Study Bible Additions projects (default:
       *   false)
       * @returns Promise that resolves to true if the user can create comments, false otherwise
       */
      canUserCreateComments(allowInSba?: boolean): Promise<boolean>;

      /**
       * Determines if the current user can add comments to existing threads in this project. This
       * is slightly different from canUserCreateComments - it allows adding to threads in resource
       * projects that aren't global note types.
       *
       * @returns Promise that resolves to true if the user can add comments to threads, false
       *   otherwise
       */
      canUserAddCommentToThread(): Promise<boolean>;

      /**
       * Determines if the current user can change the assigned user on a specific thread
       *
       * @param threadId The ID of the thread to check
       * @returns Promise that resolves to true if the user can assign the thread, false otherwise
       */
      canUserAssignThread(threadId: string): Promise<boolean>;

      /**
       * Determines if the current user can resolve or re-open a specific thread
       *
       * @param threadId The ID of the thread to check
       * @returns Promise that resolves to true if the user can resolve the thread, false otherwise
       */
      canUserResolveThread(threadId: string): Promise<boolean>;

      /**
       * Determines if the current user can edit or delete a specific comment. In Paratext 9, edit
       * and delete have identical permission requirements.
       *
       * @param commentId The ID of the comment to check
       * @returns Promise that resolves to true if the user can edit or delete the comment, false
       *   otherwise
       */
      canUserEditOrDeleteComment(commentId: string): Promise<boolean>;

      // #endregion
    };

  /** Provides comment creation via USJ locations */
  export type LegacyCommentUsjProjectInterfaceDataTypes = {};

  /**
   * Provides comments from project team members in a way that is compatible with Paratext 9.
   * Locations are specified using USJ rather than USFM.
   */
  export type ILegacyCommentUsjProjectDataProvider =
    IProjectDataProvider<LegacyCommentUsjProjectInterfaceDataTypes> & {
      /**
       * Creates a new comment for the specified project at the selected USJ range. Transforms to
       * USFM internally
       *
       * @param comment The information for the new comment excluding the USFM-specific fields that
       *   will be filled in internally
       * @param verseRef The verse reference for the selected text
       * @param start The start location of the selected text in the USJ
       * @param end The end location of the selected text in the USJ
       * @returns The ID of the new comment thread
       */
      createComment(
        comment: NewLegacyCommentUsj,
        verseRef?: SerializedVerseRef,
        start?: UsjDocumentLocation,
        end?: UsjDocumentLocation,
      ): Promise<string>;
    };

  // #endregion

  // #region Comment list WebView types

  /** Web view controller for the Comment List web view */
  export type CommentListWebViewController = NetworkableObject<{
    /**
     * Scroll the comment list to show a specific thread and select it.
     *
     * @param threadId The ID of the thread to scroll to and select
     */
    selectThread(threadId: string): Promise<void>;
  }>;

  export type OpenCommentListWebViewOptions = {
    /** ID of the thread to select and scroll to in the comment list */
    threadIdToSelect?: string | undefined;
  };

  // #endregion Comment list WebView types
}

declare module 'papi-shared-types' {
  import type {
    CommentListWebViewController,
    ILegacyCommentProjectDataProvider,
    ILegacyCommentUsjProjectDataProvider,
    OpenCommentListWebViewOptions,
  } from 'legacy-comment-manager';

  export interface ProjectDataProviderInterfaces {
    'legacyCommentManager.comments': ILegacyCommentProjectDataProvider;
    'legacyCommentManager.commentsUsj': ILegacyCommentUsjProjectDataProvider;
  }

  export interface CommandHandlers {
    /**
     * Open or focus the Comment List WebView for the project ID associated with the specified
     * WebView ID
     *
     * @param webViewId The ID of the WebView whose project comments to display
     * @param options Additional options for opening the comment list WebView
     * @returns The ID of the comment list WebView that was opened or focused, or `undefined` if no
     *   project ID could be determined
     * @throws If something goes wrong with selecting the provided thread ID
     */
    'legacyCommentManager.openCommentList': (
      webViewId?: string | undefined,
      options?: OpenCommentListWebViewOptions,
    ) => Promise<string | undefined>;
  }

  export interface WebViewControllers {
    'legacyCommentManager.commentList': CommentListWebViewController;
  }
}
