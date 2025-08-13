import { Usj } from '@biblionexus-foundation/scripture-utilities';
import { logger } from '@papi/frontend';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { serialize, UsjReaderWriter } from 'platform-bible-utils';

/**
 * Get the JSON path to the first string after the verse marker in a specific verse in a USJ
 * chapter.
 *
 * Can't just get the verse marker itself because the editor doesn't yet seem to support setting
 * cursor on the verse marker itself and doing something meaningful
 *
 * @param usjChapter USJ content to find the verse in
 * @param verseRef Verse location to find the JSON path for
 * @returns The JSON path to the verse in the USJ chapter
 */
export function getJsonPathFromVerse(usjChapter: Usj, verseRef: SerializedVerseRef): string {
  const usjRW = new UsjReaderWriter(usjChapter);

  // Get the location of the verse marker
  const verseLocation = usjRW.verseRefToUsjContentLocation(verseRef);

  // Find the first string after the verse marker
  const firstStringLocationAfterVerseMarker = usjRW.findNextLocationOfMatchingText(
    verseLocation,
    '',
  );
  if (!firstStringLocationAfterVerseMarker) {
    logger.warn(
      `Could not find next content string after verse location ${serialize(verseLocation.jsonPath)} in USJ chapter`,
    );
    return verseLocation.jsonPath;
  }
  return firstStringLocationAfterVerseMarker.jsonPath;
}
