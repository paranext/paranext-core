import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { deserialize, serialize } from 'platform-bible-utils';
import { CheckRunResult } from 'platform-scripture';

export type PersistedCheckRunResult = {
  /** Type of check result */
  checkResultType: string;
  /** Single verse reference identifying where the check result occurred */
  verseRef: SerializedVerseRef;
  /** Project text that was selected in the check result */
  selectedText: string;
  /** Distinct ID for this check result if it might occur more than once in a single verse */
  checkResultUniqueId?: string;
};

export class PersistedCheckRunResults {
  /** Map of book number to chapter number to array of PersistedCheckRunResult */
  private results: Record<number, Record<number, PersistedCheckRunResult[]>> = {};

  /**
   * @param serializedResults Return value of a previous call to `serialize` on a
   *   `PersistedCheckRunResults` object
   */
  constructor(serializedResults?: string) {
    if (serializedResults) this.results = deserialize(serializedResults);
  }

  /**
   * Serialize the contents of this object to a string
   *
   * @returns JSON string representing this object
   */
  serialize(): string {
    return serialize(this.results);
  }

  /**
   * Adds a PersistedCheckRunResult to the set
   *
   * @param result Item to add to the set
   * @returns `true` if the item did not already exist and was added to the set, `false` if the item
   *   already existed in the set
   */
  addResult(result: PersistedCheckRunResult): boolean {
    if (this.containsResult(result)) return false;
    const { book, chapterNum } = result.verseRef;
    const bookNum = Canon.bookIdToNumber(book);
    if (!this.results[bookNum]) this.results[bookNum] = {};
    if (!this.results[bookNum][chapterNum]) this.results[bookNum][chapterNum] = [];
    this.results[bookNum][chapterNum].push(result);
    return true;
  }

  /**
   * Removes a PersistedCheckRunResult from the set
   *
   * @param result Item to remove from the set
   * @returns `true` if the item was removed from the set, `false` otherwise
   */
  removeResult(result: PersistedCheckRunResult): boolean {
    const { book, chapterNum } = result.verseRef;
    const bookNum = Canon.bookIdToNumber(book);
    const chapterResults = this.results[bookNum]?.[chapterNum];
    if (!chapterResults) return false;

    const index = chapterResults.findIndex((existingResult) => {
      return (
        existingResult.checkResultType === result.checkResultType &&
        existingResult.verseRef.verse === result.verseRef.verse &&
        existingResult.selectedText === result.selectedText &&
        existingResult.checkResultUniqueId === result.checkResultUniqueId
      );
    });
    if (index === -1) return false;

    chapterResults.splice(index, 1);
    if (chapterResults.length === 0) delete this.results[bookNum][chapterNum];
    if (Object.keys(this.results[bookNum]).length === 0) delete this.results[bookNum];

    return true;
  }

  /**
   * Check if the provided item is already represented in the existing set of results
   *
   * @param result Item to query for existence in the set
   * @returns `true` if the result already exists in the set, `false` if it does not already exist
   */
  containsResult(result: CheckRunResult | PersistedCheckRunResult): boolean {
    const possibleMatches = this.getPersistedCheckRunResults(
      result.verseRef.book,
      result.verseRef.chapterNum,
    );

    return !!possibleMatches.find((possibleMatch) => {
      return (
        possibleMatch.checkResultType === result.checkResultType &&
        possibleMatch.verseRef.verse === result.verseRef.verse &&
        possibleMatch.selectedText === result.selectedText &&
        possibleMatch.checkResultUniqueId === result.checkResultUniqueId
      );
    });
  }

  /**
   * Get all persisted check run results as a single array
   *
   * @returns Array of all PersistedCheckRunResult objects
   */
  getAllPersistedCheckRunResults(): PersistedCheckRunResult[] {
    const allResults: PersistedCheckRunResult[] = [];
    Object.values(this.results).forEach((chapters) => {
      Object.values(chapters).forEach((results) => {
        allResults.push(...results);
      });
    });
    return allResults;
  }

  private getPersistedCheckRunResults(book: string, chapterNum: number): PersistedCheckRunResult[] {
    const bookNum = Canon.bookIdToNumber(book);
    return this.results[bookNum]?.[chapterNum] || [];
  }
}
