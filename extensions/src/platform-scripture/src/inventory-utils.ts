import { split } from 'platform-bible-utils';

export const extractCharacters = (text: string, item: string | undefined = undefined): string[] => {
  let characters: string[] = split(text, '');
  if (item) characters = characters.filter((character) => character === item);
  return characters;
};

export const extractRepeatedWords = (
  text: string,
  target: string | undefined = undefined,
): string[] => {
  const repeatedWords: string[] = [];
  const words = split(text, /[\s]+/);
  words.forEach((word, index, allWords) => {
    if (target && word !== target) return;
    if (index + 1 < allWords.length && word === allWords[index + 1]) repeatedWords.push(word);
  });
  return repeatedWords;
};
