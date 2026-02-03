import { Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  UsjReaderWriter,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjDocumentLocation,
} from 'platform-bible-utils';

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
export function extractCommentScriptureText(
  selectedTextStart: UsjDocumentLocation,
  selectedTextEnd: UsjDocumentLocation,
  usjChapter: Usj,
  bookId: string,
): ExtractedCommentScriptureText {
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
}

// #endregion Comment Scripture Text Extraction from USJ to USFM
