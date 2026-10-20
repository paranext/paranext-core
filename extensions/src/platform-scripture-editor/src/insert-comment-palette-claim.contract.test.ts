import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Guards WHERE the insert-comment chord is checked against an open marker palette, in
 * `platform-scripture-editor.web-view.tsx`. The file is a 3 900+-line web view that cannot be
 * mounted in jsdom (it depends on the editor iframe, PAPI services, and a reverse portal — see
 * `content-zoom-markers.contract.test.ts`), so this is a source-reading contract test rather than a
 * render test, the same shape as `insert-comment-anchor-guard.contract.test.ts`.
 *
 * The chord must be claimed by the CAPTURE-phase listener while the session still exists. The key
 * table treats it as an ordinary chord — dismiss the palette, decline the key — and a declined key
 * keeps propagating, with the session cleared synchronously on the way out. A check in the
 * bubble-phase handler therefore always sees no session and inserts the comment anyway, and the
 * dismissal's refocus then pulls focus out of the comment box the user is typing in.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_VIEW_FILE = path.join(SRC_DIR, 'platform-scripture-editor.web-view.tsx');

/** Whitespace-insensitive haystack, so formatting alone can't fail this. */
function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ');
}

describe('insert-comment chord vs. an open marker palette (platform-scripture-editor.web-view.tsx)', () => {
  const source = collapseWhitespace(readFileSync(WEB_VIEW_FILE, 'utf-8'));

  it('decides the chord BEFORE the key table runs, while the session still exists', () => {
    const decideIndex = source.indexOf('const closesPaletteOnly = isInsertCommentChord(event);');
    const routeIndex = source.indexOf('runPaletteSessionKeyRef.current(event);');

    expect(decideIndex).toBeGreaterThan(-1);
    expect(routeIndex).toBeGreaterThan(-1);
    // Read first: the table clears the session synchronously, so a read afterwards is always false.
    expect(decideIndex).toBeLessThan(routeIndex);
  });

  it('claims the chord so it cannot reach the bubble-phase handler', () => {
    // stopPropagation at the window CAPTURE listener keeps the event from reaching the same
    // window's bubble listener, which is what would otherwise insert the comment.
    expect(source).toContain(
      'if (closesPaletteOnly) { event.preventDefault(); event.stopPropagation(); }',
    );
  });

  it('does not gate the bubble-phase branch on the palette session', () => {
    // Such a gate cannot fire — by then the session is gone — and reads as protection that is not
    // there. The capture-phase claim above is what actually stops it.
    expect(source).toContain('if (isInsertCommentChord(event)) {');
    expect(source).not.toContain('isInsertCommentChord(event) && !paletteSession.current');
    expect(source).not.toContain('isInsertCommentHotkey && !paletteSession.current');
  });

  it('shares ONE chord predicate between the two listeners', () => {
    // Two copies would let the capture claim and the bubble action drift apart, so the chord could
    // be claimed and never inserted, or inserted and never claimed.
    const definitions = source.match(/const isInsertCommentChord = /g) ?? [];
    expect(definitions).toHaveLength(1);
  });
});
