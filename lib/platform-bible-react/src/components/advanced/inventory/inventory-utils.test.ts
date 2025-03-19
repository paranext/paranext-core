import { getNumberFromUSFM, getLinesFromUSFM, getBookIdFromUSFM } from './inventory-utils';

test('Get lines from USFM string', async () => {
  const input: string = `Input text line 1\nThis is line 2\\v This is line 3\\c This is line 4\\id This is line 5\nThis is line 6
This is line 7\rThis is line 8`;
  const lines: string[] = getLinesFromUSFM(input);
  expect(lines).toEqual([
    'Input text line 1',
    'This is line 2',
    '\\v This is line 3',
    '\\c This is line 4',
    '\\id This is line 5',
    'This is line 6',
    'This is line 7',
    'This is line 8',
  ]);
});

test('Get number from USFM verse string', async () => {
  const input: string =
    '\\v 1 Dis letta from Peter. Jesus Christ wen sen me all ova da place fo tell peopo da Good Stuff from him.';
  const number: number | undefined = getNumberFromUSFM(input);
  expect(number).toEqual(1);
});

test('Get number from USFM chapter string', async () => {
  const input: string = '\\c 3';
  const number: number | undefined = getNumberFromUSFM(input);
  expect(number).toEqual(3);
});

test('Get number from USFM chapter string with value of 0', async () => {
  const input: string = '\\c 0';
  const number: number | undefined = getNumberFromUSFM(input);
  expect(number).toEqual(0);
});

test('Unsuccessfully trying to get number from USFM string', async () => {
  const input: string = '\\c There is no number here';
  const number: number | undefined = getNumberFromUSFM(input);
  expect(number).toEqual(undefined);
});

test('Unsuccessfully trying to get number from random string', async () => {
  const input: string =
    'This string does not contain a chapter or verse marker followed by a number';
  const number: number | undefined = getNumberFromUSFM(input);
  expect(number).toEqual(undefined);
});

test('Get book number for Exodus from USFM string', async () => {
  const input: string = '\\id EXO this is Exodus';
  const id: string = getBookIdFromUSFM(input);
  expect(id).toEqual('EXO');
});

test('Get book number for Matthew from USFM string', async () => {
  const input: string = '\\id MAT this is Matthew';
  const id: string = getBookIdFromUSFM(input);
  expect(id).toEqual('MAT');
});

test('Get book number for Psalms from USFM string with lower case ID', async () => {
  const input: string = '\\id psa';
  const id: string = getBookIdFromUSFM(input);
  expect(id).toEqual('psa');
});

test('Get book number for Job from USFM string with mixed case ID', async () => {
  const input: string = '\\id jOb';
  const id: string = getBookIdFromUSFM(input);
  expect(id).toEqual('jOb');
});

test('Try to get book number for non-existing ID from USFM string', async () => {
  const input: string = '\\id ABC this ID does not exist';
  const id: string = getBookIdFromUSFM(input);
  expect(id).toEqual('ABC');
});

test('Try to get book number for empty ID marker from USFM string', async () => {
  const input: string = '\\id';
  const id: string = getBookIdFromUSFM(input);
  expect(id).toEqual('');
});

test('Try to get book number for random (non-USFM) string', async () => {
  const input: string = 'No USFM here';
  const id: string = getBookIdFromUSFM(input);
  expect(id).toEqual('');
});
