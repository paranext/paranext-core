import { indexOf } from './string-util';

const STRING_TO_TEST =
  'This is a really long string to test our functions with. It is really long.';

test('indexOf without position', () => {
  const result = indexOf(STRING_TO_TEST, 'really');
  expect(result).toEqual(10);
});

test('indexOf with position', () => {
  const result = indexOf(STRING_TO_TEST, 'really', 20);
  expect(result).toEqual(63);
});
