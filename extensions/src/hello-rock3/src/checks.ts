import { logger, projectDataProviders } from '@papi/backend';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  Check,
  CheckCreatorFunction,
  CheckDetails,
  CheckRunResult,
  IUSFMBookProjectDataProvider,
  ScriptureRange,
} from 'platform-scripture';

export const checkDetails: CheckDetails = Object.freeze({
  checkName: 'helloWordSimpleCheck',
  checkDescription: 'find the word "sheep"',
});

class HelloCheck implements Check {
  targetProjectId: string | undefined;
  pdp: IUSFMBookProjectDataProvider | undefined;

  async initialize(projectId: string): Promise<string[]> {
    try {
      this.targetProjectId = projectId;
      this.pdp = await projectDataProviders.get('platformScripture.USFM_Book', projectId);
      this.pdp.onDidDispose(this.dispose);
    } catch (error) {
      return [JSON.stringify(error)];
    }
    return [];
  }

  async dispose(): Promise<boolean> {
    this.targetProjectId = undefined;
    this.pdp = undefined;
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  getCheckDetails(): CheckDetails {
    return checkDetails;
  }

  // NOTE: This is a hacky example that just demonstrates the API for a check. It just looks for
  // the word "sheep" in the USFM text and returns a result for each occurrence. It doesn't properly
  // handle USFM parsing, and it only understands chapter granularity, not verse granularity. A real
  // check will require more work.
  async getCheckResults(range: ScriptureRange): Promise<CheckRunResult[]> {
    if (range.end && range.end.book !== range.start.book)
      throw new Error('This only supports checks within a single book right now');
    if (!this.pdp) throw new Error('Check not initialized');

    const usfm = await this.pdp?.getBookUSFM(range.start);
    if (!usfm)
      throw new Error(`Could not load ${JSON.stringify(range.start)} from ${this.targetProjectId}`);

    logger.debug(
      `Getting test check results for ${JSON.stringify(range)} on ${this.targetProjectId} (length ${usfm.length})`,
    );

    let results: CheckRunResult[] = [];
    let startingPoint = 0;
    startingPoint = usfm.indexOf(`\\c ${range.start.chapterNum.toString()}`, 0);
    let stoppingPoint = 0;
    if (!range.end) stoppingPoint = usfm.length - 1;
    else {
      stoppingPoint = usfm.indexOf(`\\c ${range.end.chapterNum.toString()}`, 0);
      let nextChapter = usfm.indexOf('\\c ', startingPoint + 1);
      nextChapter = nextChapter > 0 ? nextChapter : 0;
      let nextVerse = usfm.indexOf('\\v ', startingPoint + 1);
      nextVerse = nextVerse > 0 ? nextVerse : 0;
      stoppingPoint = Math.max(stoppingPoint, nextChapter, nextVerse);
    }
    let cursor = startingPoint;
    while (cursor <= stoppingPoint) {
      cursor = usfm.indexOf('sheep', cursor);
      if (cursor < 0 || cursor > stoppingPoint) break;
      const chapterIndex = usfm.lastIndexOf('\\c ', cursor) + 3;
      const inChapter = parseInt(usfm.slice(chapterIndex, chapterIndex + 4), 10);
      const verseIndex = usfm.lastIndexOf('\\v ', cursor) + 3;
      const inVerse = parseInt(usfm.slice(verseIndex, verseIndex + 4), 10);
      const offset = cursor - verseIndex - inVerse.toString().length - 1;
      const verseRef: SerializedVerseRef = {
        book: range.start.book,
        chapterNum: inChapter,
        verseNum: inVerse,
      };
      const previousResult = results.at(-1);
      const previousUniqueIdForThisVerse =
        previousResult &&
        previousResult.verseRef.chapterNum === inChapter &&
        previousResult.verseRef.verseNum === inVerse
          ? previousResult.checkResultUniqueId
          : '0';
      const newResult: CheckRunResult = {
        checkId: 'sheep',
        checkResultType: 'sheep',
        checkResultUniqueId: (parseInt(previousUniqueIdForThisVerse ?? '0', 10) + 1).toString(),
        isDenied: false,
        projectId: this.targetProjectId ?? '',
        messageFormatString: 'Found the word "sheep"',
        itemText: 'sheep',
        verseRef,
        verseText: 'And lo, there were sheep in the field.',
        start: { verseRef, offset },
        end: {
          verseRef,
          offset: offset + 5,
        },
      };
      results = results.concat([newResult]);
      cursor += 1;
    }
    logger.debug(`Returning ${results.length} check results with "sheep"`);
    return results;
  }
}

export const createHelloCheck: CheckCreatorFunction = async () => {
  return new HelloCheck();
};
