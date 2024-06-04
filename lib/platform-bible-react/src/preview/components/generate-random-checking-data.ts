import { ScriptureItemDetail } from 'platform-bible-utils';

export default function generateRandomCheckingData(details: string[]): ScriptureItemDetail[] {
  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const numberOfResults = getRandomNumber(1, 10);
  const results: ScriptureItemDetail[] = [];

  for (let i = 0; i < numberOfResults; i++) {
    const randomOffset = getRandomNumber(0, 300);
    const randomBookNum = getRandomNumber(1, 66);
    const randomChapterNum = getRandomNumber(1, 150);
    const randomVerseNum = getRandomNumber(1, 175);
    const randomDetail = details[getRandomNumber(0, details.length - 1)];

    results.push({
      start: {
        jsonPath: '',
        offset: randomOffset,
        bookNum: randomBookNum,
        chapterNum: randomChapterNum,
        verseNum: randomVerseNum,
      },
      detail: randomDetail,
    });
  }

  return results;
}
