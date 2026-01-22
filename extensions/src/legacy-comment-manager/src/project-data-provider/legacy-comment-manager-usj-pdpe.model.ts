import { ProjectDataProviderEngine, logger } from '@papi/backend';
import { IProjectDataProviderEngine } from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { NewLegacyCommentUsj } from 'legacy-comment-manager';
import type { ProjectDataProviderInterfaces } from 'papi-shared-types';
import { formatScrRef, getErrorMessage, UsjDocumentLocation } from 'platform-bible-utils';
import { extractCommentScriptureText } from './legacy-comment-manager-usj.utils';

/** The `projectInterface`s the Comment USJ PDPF serves */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const LEGACY_COMMENT_USJ_PROJECT_INTERFACES = [
  'legacyCommentManager.commentsUsj',
] as const satisfies ['legacyCommentManager.commentsUsj'];

/** The project interfaces the Comment USJ PDPF layers over */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const LEGACY_COMMENT_USJ_OVERLAY_PROJECT_INTERFACES = [
  'platformScripture.USJ_Chapter',
  'legacyCommentManager.comments',
] as const satisfies ['platformScripture.USJ_Chapter', 'legacyCommentManager.comments'];

export type LegacyCommentUsjOverlayPDPs = {
  [ProjectInterface in (typeof LEGACY_COMMENT_USJ_OVERLAY_PROJECT_INTERFACES)[number]]: ProjectDataProviderInterfaces[ProjectInterface];
};

export class LegacyCommentUsjProjectDataProviderEngine
  extends ProjectDataProviderEngine<['legacyCommentManager.commentsUsj']>
  implements IProjectDataProviderEngine<['legacyCommentManager.commentsUsj']>
{
  constructor(
    private readonly projectId: string,
    /** The PDPs this layering PDP needs to function */
    private readonly pdps: LegacyCommentUsjOverlayPDPs,
  ) {
    super();
  }

  async createComment(
    comment: NewLegacyCommentUsj,
    verseRef?: SerializedVerseRef,
    selectedTextStart?: UsjDocumentLocation,
    selectedTextEnd?: UsjDocumentLocation,
  ): Promise<string> {
    try {
      let selectedText: string | undefined;
      let startPosition: number | undefined;

      const usjChapter = verseRef
        ? await this.pdps['platformScripture.USJ_Chapter'].getChapterUSJ(verseRef)
        : undefined;

      // Proceed with comment creation even if scripture context extraction fails. Comments
      // without scripture context won't have the selected text highlighting and positioning
      // information. This follows how `ParatextProjectDataProvider.createComment` works, though TJ
      // is not sure if this is how ParatextData.dll wants it to work
      if (!usjChapter || !selectedTextStart || !selectedTextEnd || !verseRef) {
        logger.warn(
          `Cannot extract scripture text in Legacy Comment USJ PDP ${this.projectId} for comment ${JSON.stringify(comment)}${
            verseRef ? ` at ${formatScrRef(verseRef)}` : ''
          }: USJ not available. Comment will be created without scripture context.`,
        );
      } else {
        const extraction = await extractCommentScriptureText(
          selectedTextStart,
          selectedTextEnd,
          usjChapter,
          verseRef.book,
        );

        if (!extraction) {
          logger.warn(
            `Cannot extract scripture text in Legacy Comment USJ PDP ${this.projectId} for comment ${JSON.stringify(comment)} at ${formatScrRef(
              verseRef,
            )}: Extraction failed. Comment will be created without scripture context.`,
          );
        } else {
          selectedText = extraction.selectedText;
          startPosition = extraction.startPosition;
        }
      }

      const newCommentId = await this.pdps['legacyCommentManager.comments'].createComment({
        ...comment,
        verseRef: verseRef ? formatScrRef(verseRef) : undefined,
        selectedText,
        startPosition,
      });

      return newCommentId;
    } catch (error) {
      logger.error(
        `Error in Legacy Comment USJ PDP ${this.projectId} createComment: ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}
