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
    expect(source).toMatch(
      /<InPortal node={editorPortalNode}> <PortalContents> <ContentZoomRoot className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0">/,
    );
  });

  it('wraps the footnote editor popover in a ContentZoomRoot', () => {
    // An optional JSX comment may sit between the popover and the marker (explaining why this
    // `main`-area marker isn't nested under the editor's), so it's tolerated but not required.
    expect(source).toMatch(
      /<PopoverContent className="tw:w-max tw:min-w-\[500px\] tw:p-\[10px\]"> (?:\{\/\*.*?\*\/\} )?<ContentZoomRoot> <FootnoteEditor/,
    );
  });

  it('marks both areas as `main` (neither ContentZoomRoot carries an `area` prop)', () => {
    expect(source).not.toContain('<ContentZoomRoot area=');
  });

  it('leaves the editor scroll container untouched and unmarked', () => {
    expect(source).toMatch(
      /<div ref={editorContainerRef} className="tw:h-auto tw:flex-1 tw:min-h-0 tw:overflow-auto"/,
    );
  });
});
