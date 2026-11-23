import { beforeEach } from 'vitest';
import { resetForTesting } from './use-chapter-copy-limit.hook';

/**
 * Makes every test in the calling file start without the copy-limit lookups earlier tests made.
 * `useChapterCopyLimit` keeps one lookup per project for the life of the web view, so without this
 * the first test's answer for a project is reused by every later one. Call it once, at the top
 * level of any test file that renders a view using the copy limit.
 */
export function resetCopyLimitLookupsBeforeEach() {
  beforeEach(() => resetForTesting());
}
