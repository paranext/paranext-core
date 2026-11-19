import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Pins that every key the main editor acts on stands down while the platform context menu is
 * pending. Two of the five sites (the inline markers menu, the insert-comment chord) cannot be
 * observed from the mounted web view's tests, so this reads the source, like
 * `insert-comment-palette-claim.contract.test.ts`.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const read = (file: string) => readFileSync(path.join(SRC_DIR, file), 'utf-8').replace(/\s+/g, ' ');

describe('keyboard gates while the main editor’s context menu is pending', () => {
  const source = read('platform-scripture-editor.web-view.tsx');

  it('reads the hook for the inline markers menu', () => {
    expect(source).toContain('if (!isEditorContextMenuPending()) showInlineMarkersMenu();');
  });

  it('reads the hook for the insert-comment chord', () => {
    expect(source).toContain(
      'if (!isEditorContextMenuPending()) insertCommentAtCurrentSelection();',
    );
  });

  it('reads the hook for the backslash trigger, the Enter trigger and the note chords', () => {
    expect(
      source.match(/if \(isEditorContextMenuPending\(\)\) \{ event\.preventDefault\(\);/g),
    ).toHaveLength(1);
    expect(source.match(/if \(isEditorContextMenuPending\(\)\) return;/g)).toHaveLength(2);
  });

  it('re-subscribes the key listeners with the hook’s pending reader', () => {
    expect(source).toContain('dismissPaletteSessionIfOpen, isEditorContextMenuPending, ]);');
  });

  it('no longer reads the built-in menu’s DOM attribute', () => {
    expect(source).not.toContain('isEditorContextMenuOpen(');
    expect(read('platform-scripture-editor.web-view.utils.ts')).not.toContain(
      'export function isEditorContextMenuOpen(',
    );
  });
});
