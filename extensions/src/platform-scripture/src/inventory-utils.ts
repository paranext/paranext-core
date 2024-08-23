import { split } from 'platform-bible-utils';

/**
 * Extracts characters from scripture text. If a target is provided, only extracts occurrences of
 * the provided target
 *
 * @param text The scripture text from which the characters will be extracted
 * @param target (Optional) If provided, the function only extracts exact matches of this character
 * @returns An array of characters extracted from the provided scripture text
 */
export const extractCharacters = (
  text: string,
  target: string | undefined = undefined,
): string[] => {
  let characters: string[] = split(text, '');
  if (target) characters = characters.filter((character) => character === target);
  return characters;
};

/**
 * Extracts repeated words from scripture text. If a target is provided, only extracts occurences of
 * the provided target
 *
 * @param text The scripture text from which the characters will be extracted
 * @param target (Optional) If provided, the function only extracts exact matches of this words
 * @returns An array of repeated words extracted from the provided scripture text
 */
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
