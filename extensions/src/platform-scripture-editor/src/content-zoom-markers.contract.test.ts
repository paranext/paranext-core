import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Guards the text marker, and that nothing puts the popovers beside it in a zoom area, in
 * `platform-scripture-editor.web-view.tsx` — the file is a 3 981-line web view that cannot be
 * mounted in jsdom (it depends on the editor iframe, PAPI services, and a reverse portal), so
 * this is a source-reading contract test rather than a render test, the same shape as
 * `editor-character-marker-contract.test.ts`. These markers *are* the entire zoom opt-in for
 * this view: a refactor that silently drops one leaves no other signal anywhere that the text
 * stopped zooming or that a popover started to.
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

  it('marks the editor tree itself, not the reverse-portal wrapper around every editor state', () => {
    // The portal wrapper is a plain div: the no-project, loading and book-not-available states
    // rendered inside it are UI, not project text.
    // Prettier keeps the wrapper and its only child on one line when they fit, so the optional
    // spaces accept either layout.
    expect(source).toMatch(
      /<InPortal node={editorPortalNode}> <PortalContents> <div className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0"> ?{renderEditor\(\)} ?<\/div>/,
    );
    expect(source).toMatch(
      /const editorTree = \( <TwoStepDeleteTooltipOverlay> (?:\{\/\*.*?\*\/\} )?<ContentZoomRoot> <EditorKeyboardShortcuts editorRef={editorRef}>/,
    );
  });

  it('keeps every control and non-text state outside the text area', () => {
    const open = source.indexOf('<ContentZoomRoot>');
    const close = source.indexOf('</ContentZoomRoot>', open);
    expect(open).toBeGreaterThan(-1);
    expect(close).toBeGreaterThan(open);
    const inside = source.slice(open, close);

    expect(inside).toContain('<Editorial');
    [
      'CharacterMarkerBar',
      'EmptyChapterView',
      'BookNotAvailableView',
      'ResourceBookNotAvailable',
      '<Spinner',
      'TwoStepDeleteTooltipOverlay',
      'ParagraphMarkerTooltipOverlay',
      '{workaround}',
    ].forEach((control) => expect(inside).not.toContain(control));
  });

  it('hands the editor no context-menu container, so its right-click menu stays at interface scale', () => {
    // Positive control: the editor options are still built in this file.
    expect(source).toContain('const options = useMemo<EditorOptions>(');
    expect(source).not.toContain('contextMenuContainer');
    expect(source).not.toContain('editorZoomRootRef');
  });

  it('renders the three popovers beside the editor without naming a zoom area for them', () => {
    // Pop-ups stay at interface scale. Positive control: the three popovers are still here.
    expect(source).toMatch(
      /<Popover open={showMarkersMenu}>.*<Popover open={showFootnoteEditor}>.*<Popover open={showCommentEditor}>/,
    );
    expect(source).not.toContain('ContentZoomAreaProvider');
  });

  it('lets the footnote editor popover’s 500 px minimum width yield to the pane’s available width', () => {
    // A plain `min-w-[500px]` would push the popover past a narrow pane. The `100vw` fallback keeps
    // the minimum defined before Radix publishes the available width, on the first layout the
    // footnote editor locks its width on. Inline, because the web view's style pipeline drops this
    // value as a Tailwind class.
    expect(source).toContain("'min(500px, var(--radix-popover-content-available-width, 100vw))'");
    expect(source).not.toContain('--platform-content-zoom-popup-factor');
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

  it('marks both areas as `main` (no ContentZoomRoot carries an `area` prop)', () => {
    expect(source).not.toContain('<ContentZoomRoot area=');
  });

  it('leaves the editor scroll container present and unmarked, not a ContentZoomRoot', () => {
    // Matching the literal `<div` (rather than `<ContentZoomRoot`) proves the element itself is a
    // plain div; its class list is styling, not part of the zoom contract this test guards.
    expect(source).toMatch(/<div ref={editorContainerRef}/);
  });
});
