import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Guards the text marker and the provider around the popovers beside it in
 * `platform-scripture-editor.web-view.tsx` — the file is a 3 981-line web view that cannot be
 * mounted in jsdom (it depends on the editor iframe, PAPI services, and a reverse portal), so
 * this is a source-reading contract test rather than a render test, the same shape as
 * `editor-character-marker-contract.test.ts`. These markers *are* the entire zoom opt-in for
 * this view: a refactor that silently drops one leaves no other signal anywhere that the text
 * or the popovers beside it stopped zooming.
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

  it('hands the editor the text area as its context-menu container', () => {
    // The editor's right-click menu is drawn by the editor library and portals out of this tree, so
    // it only follows the zoom if the library is told which element to render into. Three separate
    // pieces, each silent on its own if dropped — the menu just reverts to interface size against
    // `document.body` with nothing to notice it by. The empty dependency list is part of the
    // contract, not incidental: a changing dependency here rebuilds the `options` memo, which
    // re-fires `LoadStatePlugin` and wipes the editor's undo/redo history.
    expect(source).toContain('<ContentZoomRoot ref={editorZoomRootRef}');
    expect(source).toContain(
      'const getEditorZoomRoot = useCallback(() => editorZoomRootRef.current ?? undefined, []);',
    );
    expect(source).toContain('contextMenuContainer: getEditorZoomRoot');
  });

  it('puts the three popovers rendered beside the editor in the text area', () => {
    // The markers menu, footnote editor and comment editor popovers sit beside the editor in the
    // tree, outside its ContentZoomRoot, so they name the text area through the provider and zoom
    // with the text. An optional JSX comment may precede the first popover.
    expect(source).toMatch(
      /<ContentZoomAreaProvider> (?:\{\/\*.*?\*\/\} )?(?:\{\/\*\* Inline markers menu components \*\/\} )?<Popover open={showMarkersMenu}>.*<Popover open={showFootnoteEditor}>.*<Popover open={showCommentEditor}>.*?<\/Popover> <\/ContentZoomAreaProvider>/,
    );
  });

  it('lets the footnote editor popover’s minimum width yield to the zoomed width cap', () => {
    // A plain `min-w-[500px]` zooms to 1000 px at 200 % and beats the cap's `max-width`, so the
    // popover would overflow a narrow pane. The `100vw` fallback keeps the minimum defined before
    // Radix publishes the available width, on the first layout the footnote editor locks its width
    // on. Inline, because the web view's style pipeline drops this value as a Tailwind class.
    expect(source).toContain(
      "'min(500px, calc(var(--radix-popover-content-available-width, 100vw) / var(--platform-content-zoom-popup-factor, 1)))'",
    );
    expect(source).toContain('style={{ minWidth: FOOTNOTE_POPOVER_MIN_WIDTH }}');
    expect(source).not.toContain('tw:min-w-[500px]');
    expect(source).not.toContain('tw:min-w-[min(');
  });

  it('anchors all three popovers to live positions in the text', () => {
    // A positioned anchor element keeps the rect captured on open, so the popover stays put while
    // the text scrolls or reflows under a zoom change.
    expect(source).toContain('<PopoverAnchor virtualRef={markersMenuAnchor.virtualRef} />');
    expect(source).toContain('<PopoverAnchor virtualRef={notePopoverAnchor.virtualRef} />');
    expect(source).toContain('<PopoverAnchor virtualRef={commentPopoverAnchor.virtualRef} />');
    expect(source.match(/<PopoverAnchor /g)).toHaveLength(3);
  });

  it('does not nest a second marker inside the footnote editor popover', () => {
    expect(source).not.toMatch(/<PopoverContent[^>]*> (?:\{\/\*.*?\*\/\} )?<ContentZoomRoot>/);
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
