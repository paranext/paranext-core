import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Guards the chapter save in `platform-scripture-editor.web-view.tsx` passing the on-screen
 * chapter-line signal to `prepareUsjForChapterSave`. The web view cannot be mounted in jsdom (see
 * `insert-comment-anchor-guard.contract.test.ts`), so this reads the source.
 *
 * The signal has a `false` default, so dropping it still compiles and every unit test of the repair
 * still passes, while a caret in what is left of a chapter line (`\ 2`, `\sc 2`) is then read as
 * if it did not count the line's marker bytes, and lands after them instead of where it was.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_VIEW_FILE = path.join(SRC_DIR, 'platform-scripture-editor.web-view.tsx');

/** Whitespace-insensitive haystack, with line comments dropped, so formatting can't fail this. */
function normalize(text: string): string {
  return text.replace(/\/\/[^\n]*/g, '').replace(/\s+/g, ' ');
}

describe('chapter save caret signal (platform-scripture-editor.web-view.tsx)', () => {
  const source = normalize(readFileSync(WEB_VIEW_FILE, 'utf-8'));

  it("passes the editor's caret and whether it is on a chapter line on screen", () => {
    expect(source).toContain(
      'prepareUsjForChapterSave( correctEditorUsjVersion(usjFromEditor), usjFromPdp, savedChapterSelector.chapterNum, editorRef.current?.getSelection(), isSelectionInChapterLine(document.getSelection()), )',
    );
  });
});
