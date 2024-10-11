import { split } from 'platform-bible-utils';

/**
 * Extracts characters from scripture text. If a target is provided, only extracts occurrences of
 * the provided target
 *
 * @param text The scripture text from which the characters will be extracted
 * @returns An array of characters extracted from the provided scripture text
 */
export const extractCharacters = (text: string): string[] => {
  return split(text, '');
};

/**
 * Extracts repeated words from scripture text. If a target is provided, only extracts occurences of
 * the provided target
 *
 * @param text The scripture text from which the characters will be extracted
 * @returns An array of repeated words extracted from the provided scripture text
 */
export const extractRepeatedWords = (text: string): string[] => {
  // Finds repeated words, and captures the first occurrence of the word
  return text.match(/\b(\p{L}+)\b(?= \b\1\b)/gu) || [];
};
