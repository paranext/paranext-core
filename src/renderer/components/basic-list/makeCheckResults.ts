import { faker } from '@faker-js/faker';

export type checkResult = {
  book: string;
  chapter: number;
  verse: number;
  issueDescription: string;
  subRows?: checkResult[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newCheckResult = (): checkResult => {
  return {
    book: faker.person.firstName(),
    chapter: faker.number.int(40),
    verse: faker.number.int(40),
    issueDescription: faker.person.jobTitle(),
  };
};

export function makeCheckResults(...lens: number[]) {
  const makeDataLevel = (depth = 0): checkResult[] => {
    const len = lens && lens[depth];
    return range(len).map((): checkResult => {
      return {
        ...newCheckResult(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
