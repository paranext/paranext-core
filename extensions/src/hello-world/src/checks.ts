import { logger, projectDataProviders } from '@papi/backend';
import { VerseRef } from '@sillsdev/scripture';
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

  async getCheckResults(range: ScriptureRange): Promise<CheckRunResult[]> {
    if (range.end && range.end.bookNum !== range.start.bookNum)
      throw new Error('This only supports checks within a single book right now');

    const usfm = await this.pdp?.getBookUSFM(range.start);
    if (!usfm)
      throw new Error(`Could not load ${range.start.toString()} from ${this.targetProjectId}`);

    logger.debug(
      `Getting test check results for ${JSON.stringify(range)} on ${this.targetProjectId}`,
    );

    let results: CheckRunResult[] = [];
    let startingPoint = 0;
    startingPoint = usfm.indexOf(`\\c ${range.start.chapterNum.toString()}`, startingPoint);
    startingPoint = usfm.indexOf(`\\v ${range.start.verseNum.toString()}`, startingPoint);
    let stoppingPoint = 0;
    if (!range.end) stoppingPoint = usfm.length - 1;
    else {
      stoppingPoint = usfm.indexOf(`\\c ${range.end.chapterNum.toString()}`, startingPoint);
      stoppingPoint = usfm.indexOf(`\\v ${range.end.verseNum.toString()}`, stoppingPoint);
      let nextChapter = usfm.indexOf('\\c ', stoppingPoint);
      nextChapter = nextChapter > 0 ? nextChapter : 0;
      let nextVerse = usfm.indexOf('\\v ', stoppingPoint);
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
      const newResult: CheckRunResult = {
        projectId: this.targetProjectId ?? '',
        messageFormatString: 'Found the word "sheep"',
        start: {
          verseRef: new VerseRef(range.start.book, inChapter.toString(), inVerse.toString()),
          offset,
        },
        end: {
          verseRef: new VerseRef(range.start.book, inChapter.toString(), inVerse.toString()),
          offset: offset + 5,
        },
      };
      results = results.concat([newResult]);
      cursor += 1;
    }
    return results;
  }
}

export const createHelloCheck: CheckCreatorFunction = async () => {
  return new HelloCheck();
};
