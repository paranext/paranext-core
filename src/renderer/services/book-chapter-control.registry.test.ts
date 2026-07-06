import { describe, expect, test } from 'vitest';
import {
  getBookChapterControlHandle,
  registerBookChapterControlHandle,
  TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID,
} from '@renderer/services/book-chapter-control.registry';

describe('book chapter control registry', () => {
  test('registers, resolves, and unregisters handles by owner id', () => {
    const handle = { open: () => {} };
    const unsubscribe = registerBookChapterControlHandle('web-view-1', handle);

    expect(getBookChapterControlHandle('web-view-1')).toBe(handle);
    expect(getBookChapterControlHandle('other')).toBeUndefined();

    expect(unsubscribe()).toBe(true);
    expect(getBookChapterControlHandle('web-view-1')).toBeUndefined();
  });

  test('exposes the top toolbar owner id', () => {
    expect(TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID).toBe('top-toolbar');
  });
});
