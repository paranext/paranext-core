import { ScriptureItemDetail } from 'platform-bible-react';

function generateRandomCheckingData(details: string[]): ScriptureItemDetail[] {
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

export const FIRST_TAB_ID = 'About';

function createTestCheck(id: string, displayName: string, possibleErrors: string[]) {
  const check = {
    id: `test.${id}`,
    displayName,
  };

  let data = generateRandomCheckingData(possibleErrors);

  return {
    source: check,
    data,
    reRun() {
      data = generateRandomCheckingData(possibleErrors);
      this.data = data; // Update the data property
    },
  };
}

export const badLeftoversCheck = createTestCheck('badLeftovers', 'Bad Leftovers', [
  'Moldy lasagna',
  'Iffy meatloaf',
  'Dried out chicken',
  'Stinky cheese',
]);

export const engineProblemsCheck = createTestCheck('engineProblems', 'Engine problems', [
  'Dirty spark plugs',
  'Low oil',
  'Stuck valves',
]);
