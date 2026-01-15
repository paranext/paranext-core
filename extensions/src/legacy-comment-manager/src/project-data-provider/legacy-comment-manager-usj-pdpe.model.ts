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
  UsfmVerseRefVerseLocation,
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

/** Result of extracting scripture text snippets from a range */
interface ExtractedCommentScriptureText {
  /** Full verse text (max 500 chars) */
  verse: string;
  /** Text within the selection range (no limit) */
  selectedText: string;
  /** Text before selection in verse (max 50 chars, closest to range start) */
  contextBefore: string;
  /** Text after selection in verse (max 50 chars, closest to range end) */
  contextAfter: string;
  /**
   * Index in USFM of the start of the selected text relative to the beginning of the specified
   * verse (the backslash on the `\v` verse marker)
   */
  startPosition: number;
}

// #region Comment Scripture Text Extraction from USJ to USFM

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

    // Find the start of the verse containing the selected text
    const verseStart: UsfmVerseRefVerseLocation = {
      verseRef: selectedTextStartUsfmLocation.verseRef,
      offset: 0,
    };

    // Find the next verse marker (any verse) after the selection end to determine end of current
    // verse context
    const selectedTextEndUsjNodeAndDocumentLocation = usjRW.jsonPathToUsjNodeAndDocumentLocation(
      selectedTextEnd.jsonPath,
    );
    const nextVerseNodeAndDoc = usjRW.findNextMatchingNode(
      selectedTextEndUsjNodeAndDocumentLocation,
      ({ node }) => {
        return typeof node === 'object' && node.type === 'verse';
      },
    );

    // Find the end of the verse containing the selected text
    let verseEnd: UsfmVerseRefVerseLocation;
    if (nextVerseNodeAndDoc?.documentLocation) {
      // There is a verse after this verse - use its start as the end of the current verse
      verseEnd = usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(
        nextVerseNodeAndDoc.documentLocation,
        bookId,
      );
    } else {
      // No next verse found - use end of USFM content
      const usfmLength = usjRW.toUsfm().length;
      verseEnd = {
        verseRef: selectedTextEndUsfmLocation.verseRef,
        offset:
          // Get the length of the rest of the USFM after the verse start
          usfmLength - usjRW.usfmVerseLocationToIndexInUsfm(selectedTextEndUsfmLocation.verseRef),
      };
    }

    // Get the USFM indices for the verse and selection so we can extract the USFM text for them
    const verseStartIndex = usjRW.usfmVerseLocationToIndexInUsfm(verseStart);
    const verseEndIndex = usjRW.usfmVerseLocationToIndexInUsfm(verseEnd);
    const selectionStartIndex = usjRW.usfmVerseLocationToIndexInUsfm(selectedTextStartUsfmLocation);
    const selectionEndIndex = usjRW.usfmVerseLocationToIndexInUsfm(selectedTextEndUsfmLocation);

    const usfmText = usjRW.toUsfm();

    // Pull the verse text out from the USFM
    let verse = usfmText.substring(verseStartIndex, verseEndIndex);
    if (verse.length > 500) {
      verse = verse.substring(0, 500);
    }

    // Pull the selected text out from the USFM
    const selectedText = usfmText.substring(selectionStartIndex, selectionEndIndex);

    // Pull context before and after the selected text, limiting to 50 characters each
    let contextBefore = usfmText.substring(verseStartIndex, selectionStartIndex);
    if (contextBefore.length > 50) {
      contextBefore = contextBefore.substring(contextBefore.length - 50);
    }

    let contextAfter = usfmText.substring(selectionEndIndex, verseEndIndex);
    if (contextAfter.length > 50) {
      contextAfter = contextAfter.substring(0, 50);
    }

    return {
      verse,
      selectedText,
      contextBefore,
      contextAfter,
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
      let verse: string | undefined;
      let selectedText: string | undefined;
      let contextBefore: string | undefined;
      let contextAfter: string | undefined;
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
          verse = extraction.verse;
          selectedText = extraction.selectedText;
          contextBefore = extraction.contextBefore;
          contextAfter = extraction.contextAfter;
          startPosition = extraction.startPosition;
        }
      }

      const newCommentId = await this.pdps['legacyCommentManager.comments'].createComment({
        ...comment,
        verse,
        verseRef: verseRef ? formatScrRef(verseRef) : undefined,
        selectedText,
        contextBefore,
        contextAfter,
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
