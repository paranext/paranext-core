import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { ProjectDataProviderEngine, logger } from '@papi/backend';
import { IProjectDataProviderEngine } from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { NewLegacyCommentUsj } from 'legacy-comment-manager';
import type { ProjectDataProviderInterfaces } from 'papi-shared-types';
import {
  formatScrRef,
  getErrorMessage,
  UsjReaderWriter,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjDocumentLocation,
} from 'platform-bible-utils';

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

// #region Comment Scripture Text Extraction from USJ to USFM

/** Result of extracting scripture text snippets from a range */
interface ExtractedCommentScriptureText {
  /** Text within the selection range (no limit) */
  selectedText: string;
  /**
   * Index in USFM of the start of the selected text relative to the beginning of the specified
   * verse (the backslash on the `\v` verse marker)
   */
  startPosition: number;
}

/**
 * Get the USFM text snippets for a comment and its context based on the selected text range in a
 * USJ chapter
 *
 * @param selectedTextStart The start location of the selected text in the USJ document
 * @param selectedTextEnd The end location of the selected text in the USJ document
 * @param usjChapter The USJ chapter containing the selected text
 * @param bookId The book ID for the USJ chapter
 * @returns Information about the selection and its context that are used to create a comment
 */
async function extractCommentScriptureText(
  selectedTextStart: UsjDocumentLocation,
  selectedTextEnd: UsjDocumentLocation,
  usjChapter: Usj,
  bookId: string,
): Promise<ExtractedCommentScriptureText | undefined> {
  try {
    const usjRW = new UsjReaderWriter(usjChapter, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });

    // Get the verse ref and offset for the start and end of the selected text
    const selectedTextStartUsfmLocation = usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(
      selectedTextStart,
      bookId,
    );
    const selectedTextEndUsfmLocation = usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(
      selectedTextEnd,
      bookId,
    );

    // Get the USFM indices for the verse and selection so we can extract the USFM text for them
    const selectionStartIndex = usjRW.usfmVerseLocationToIndexInUsfm(selectedTextStartUsfmLocation);
    const selectionEndIndex = usjRW.usfmVerseLocationToIndexInUsfm(selectedTextEndUsfmLocation);

    const usfmText = usjRW.toUsfm();

    // Pull the selected text out from the USFM
    const selectedText = usfmText.substring(selectionStartIndex, selectionEndIndex);

    return {
      selectedText,
      startPosition: selectedTextStartUsfmLocation.offset ?? 0,
    };
  } catch (error) {
    logger.error(`Error extracting scripture text range: ${getErrorMessage(error)}`);
    throw error;
  }
}

// #endregion Comment Scripture Text Extraction from USJ to USFM

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

      if (!usjChapter || !selectedTextStart || !selectedTextEnd || !verseRef) {
        logger.warn(
          `Cannot extract scripture text in Legacy Comment USJ PDP ${this.projectId} for comment ${JSON.stringify(comment)}${
            verseRef ? ` at ${formatScrRef(verseRef)}` : ''
          }: USJ not available`,
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
            )}: Extraction failed`,
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
