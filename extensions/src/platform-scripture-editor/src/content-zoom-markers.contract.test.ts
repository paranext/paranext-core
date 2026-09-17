import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Guards the two `ContentZoomRoot` markers in `platform-scripture-editor.web-view.tsx` — the
 * file is a 3 981-line web view that cannot be mounted in jsdom (it depends on the editor
 * iframe, PAPI services, and a reverse portal), so this is a source-reading contract test rather
 * than a render test, the same shape as `editor-character-marker-contract.test.ts`. The two
 * markers *are* the entire zoom opt-in for this view: a refactor that silently drops one leaves
 * no other signal anywhere that the text or footnote-editing popover stopped zooming.
 *
 * Behaviour (that the marked areas actually zoom, together with the platform's
 * `web-view-content-zoom` service) is covered by the e2e spec
 * `e2e-tests/tests/isolated/scripture-editor/content-zoom.spec.ts`.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_VIEW_FILE = path.join(SRC_DIR, 'platform-scripture-editor.web-view.tsx');

/** Whitespace-insensitive haystack, so formatting alone can't fail this. */
function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ');
}

describe('content zoom markers (platform-scripture-editor.web-view.tsx)', () => {
  const source = collapseWhitespace(readFileSync(WEB_VIEW_FILE, 'utf-8'));

  it('wraps the reverse-portal editor contents in a ContentZoomRoot', () => {
    // Structure only — the marker's own class list is styling, not part of the zoom contract this
    // test guards.
    expect(source).toMatch(
      /<InPortal node={editorPortalNode}> <PortalContents> <ContentZoomRoot[ >]/,
    );
  });

  it('wraps the footnote editor popover in a ContentZoomRoot', () => {
    // Structure only. The popover's own class list is styling and no part of the zoom contract, so
    // it stays out of the pattern — the sibling assertion above does the same. An optional JSX
    // comment may sit between the popover and the marker (explaining why this `main`-area marker
    // isn't nested under the editor's), so it's tolerated but not required.
    expect(source).toMatch(
      /<PopoverContent[^>]*> (?:\{\/\*.*?\*\/\} )?<ContentZoomRoot> <FootnoteEditor/,
    );
  });

  it('marks both areas as `main` (neither ContentZoomRoot carries an `area` prop)', () => {
    expect(source).not.toContain('<ContentZoomRoot area=');
  });

  it('leaves the editor scroll container present and unmarked, not a ContentZoomRoot', () => {
    // Matching the literal `<div` (rather than `<ContentZoomRoot`) proves the element itself is a
    // plain div; its class list is styling, not part of the zoom contract this test guards.
    expect(source).toMatch(/<div ref={editorContainerRef}/);
  });
});
