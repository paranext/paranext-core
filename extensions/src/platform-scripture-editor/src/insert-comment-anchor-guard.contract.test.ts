import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Guards `insertCommentAtCurrentSelection` in `platform-scripture-editor.web-view.tsx` against
 * opening the comment-editor popover with nothing to anchor it to. The file is a 3 900+-line web
 * view that cannot be mounted in jsdom (it depends on the editor iframe, PAPI services, and a
 * reverse portal — see `content-zoom-markers.contract.test.ts`), so this is a source-reading
 * contract test rather than a render test, the same shape as `editor-character-marker-contract.test.ts`.
 *
 * `insertCommentAtCurrentSelection` looks up `.usfm` to anchor the popover; when the book has no
 * rendered content (no `.usfm` element) there is nothing to anchor to, and opening the popover
 * anyway pins it at the pane's origin or a stale previous anchor. The guard must return before the
 * popover opens, not merely before the anchor is computed.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_VIEW_FILE = path.join(SRC_DIR, 'platform-scripture-editor.web-view.tsx');

/** Whitespace-insensitive haystack, so formatting alone can't fail this. */
function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ');
}

describe('insertCommentAtCurrentSelection anchor guard (platform-scripture-editor.web-view.tsx)', () => {
  const source = collapseWhitespace(readFileSync(WEB_VIEW_FILE, 'utf-8'));

  const callbackMatch = source.match(
    /const insertCommentAtCurrentSelection = useCallback\(\(\) => \{(.*?)\}, \[scrRef, canUserCreateComments, isSyncBlocked, notifySyncEditBlocked, commentPopoverAnchor\]\);/,
  );
  if (!callbackMatch) throw new Error('insertCommentAtCurrentSelection callback not found');
  const [, callbackBody] = callbackMatch;

  it('returns before opening the popover when there is no `.usfm` element to anchor to', () => {
    const guardIndex = callbackBody.indexOf('if (!editorContainer) return;');
    const openIndex = callbackBody.indexOf('setShowCommentEditor(true);');

    expect(guardIndex).toBeGreaterThan(-1);
    expect(openIndex).toBeGreaterThan(-1);
    // The guard must precede the open call, not just the anchor computation, so a missing `.usfm`
    // element skips setShowCommentEditor entirely instead of opening at a stale or origin anchor.
    expect(guardIndex).toBeLessThan(openIndex);
  });

  it("derives the guard from the same '.usfm' lookup the anchor itself uses", () => {
    const queryIndex = callbackBody.indexOf(
      "const editorContainer = document.querySelector<HTMLElement>('.usfm');",
    );
    const guardIndex = callbackBody.indexOf('if (!editorContainer) return;');

    expect(queryIndex).toBeGreaterThan(-1);
    expect(guardIndex).toBeGreaterThan(queryIndex);
  });
});
