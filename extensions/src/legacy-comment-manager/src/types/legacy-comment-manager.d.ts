declare module 'legacy-comment-manager' {
  import {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
    // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';
  import type { UnsubscriberAsync } from 'platform-bible-utils';

  export type LegacyCommentSelector = {
    bookId: string;
    chapterNum?: number;
    verseNum?: number;
    commentId?: string;
  };

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

  /** Provides comment data */
  export type LegacyCommentProjectInterfaceDataTypes = {
    /** Called "Project Notes" in Paratext 9 */
    Comments: DataProviderDataType<LegacyCommentSelector, LegacyComment[], LegacyComment[]>;
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
       * @param callback Function to run with the updated comments for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeComments(
        selector: LegacyCommentSelector,
        callback: (comments: LegacyComment[]) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };
}

declare module 'papi-shared-types' {
  import type { ILegacyCommentProjectDataProvider } from 'legacy-comment-manager';

  export interface ProjectDataProviderInterfaces {
    'legacyCommentManager.comments': ILegacyCommentProjectDataProvider;
  }
}
