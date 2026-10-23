import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Guards the chapter save in `platform-scripture-editor.web-view.tsx` passing the editor's caret to
 * `prepareUsjForChapterSave`. The web view cannot be mounted in jsdom (see
 * `insert-comment-anchor-guard.contract.test.ts`), so this reads the source.
 *
 * The caret is optional, so dropping it still compiles and every unit test of the repair still
 * passes, while a caret in what is left of a chapter line (`\ 2`, `\sc 2`) is then not kept in
 * that line when the repair moves it.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_VIEW_FILE = path.join(SRC_DIR, 'platform-scripture-editor.web-view.tsx');

/** Whitespace-insensitive haystack, with line comments dropped, so formatting can't fail this. */
function normalize(text: string): string {
  return text.replace(/\/\/[^\n]*/g, '').replace(/\s+/g, ' ');
}

describe('chapter save caret (platform-scripture-editor.web-view.tsx)', () => {
  const source = normalize(readFileSync(WEB_VIEW_FILE, 'utf-8'));

  it("passes the editor's caret", () => {
    expect(source).toContain(
      'prepareUsjForChapterSave( correctEditorUsjVersion(usjFromEditor), usjFromPdp, savedChapterSelector.chapterNum, editorRef.current?.getSelection(), )',
    );
  });
});
