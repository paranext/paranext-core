import {
  indexOf as stringzIndexOf,
  substring as stringzSubstring,
  length as stringzLength,
  toArray as stringzToArray,
  limit,
} from 'stringz';

export const indexOf = stringzIndexOf;
export const substring = stringzSubstring;
export const length = stringzLength;
export const toArray = stringzToArray;

export const padStart = (string: string, targetLength: number, padString?: string) => {
  limit(string, targetLength, padString, 'left');
};

export const padEnd = (string: string, targetLength: number, padString?: string) => {
  limit(string, targetLength, padString, 'right');
};

export const normalize = (string: string, form: 'NFC' | 'NFD' | 'none' = 'NFC') => {
  const upperCaseForm = form.toUpperCase();
  if (upperCaseForm === 'NONE') {
    return string;
  }
  return string.normalize(upperCaseForm);
};
