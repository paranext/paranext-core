import {
  ALL_ENGLISH_BOOK_NAMES,
  getLocalizedBookId,
  getLocalizedBookName,
} from 'platform-bible-utils';

export function generateCommandValue(
  bookId: string,
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>,
  chapter?: number,
): string {
  return `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}${localizedBookNames ? ` ${getLocalizedBookId(bookId, localizedBookNames)} ${getLocalizedBookName(bookId, localizedBookNames)}` : ''}${chapter ? ` ${chapter}` : ''}`;
}
