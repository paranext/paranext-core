import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * These four Resources panes cannot be mounted in jsdom — they depend on PAPI services, the editor
 * iframe and a live data provider — so their content-zoom opt-in is guarded by reading the source,
 * the same shape as `content-zoom-markers.contract.test.ts` beside it. The `ContentZoomRoot`
 * markers *are* the entire opt-in: nothing else in the repo would notice a refactor that dropped
 * one.
 */

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));

/** Whitespace-insensitive haystack, so formatting alone can't fail this. */
function source(fileName: string): string {
  return readFileSync(path.join(SRC_DIR, fileName), 'utf-8').replace(/\s+/g, ' ');
}

/**
 * Every `.ts`/`.tsx` file under `dir`, excluding test files. Used below to sweep the whole
 * extension for `ContentZoomRoot` usages rather than trusting the five files that happen to carry
 * markers today — a `ContentZoomRoot` added later inside `resource-cell-view.component.tsx`,
 * `scripture-text-grid.component.tsx`, or a second one inside either panel's own `renderContent()`
 * subtree would nest, be silently ignored by the platform, and leave every test above (each reading
 * only its own named file) green. Test files are excluded by name pattern rather than one at a
 * time: this extension carries two content-zoom contract tests (this file and
 * `content-zoom-markers.contract.test.ts`), and both quote the literal `<ContentZoomRoot` inside
 * their own regex patterns, which a naive sweep would misread as a real marker.
 */
function listSourceFiles(dir: string): string[] {
  const files: string[] = [];
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listSourceFiles(fullPath));
    } else if (/\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) {
      files.push(fullPath);
    }
  });
  return files;
}

/**
 * How many `<ContentZoomRoot` markers each file is allowed to carry. `resource-text-panel.
 * component.tsx` picks its area id from a variable (`area={contentZoomArea}`, covered by its own
 * test above), so this map pins presence and count per file rather than the area id itself — the id
 * for that one file cannot be read out of the source text.
 */
const ALLOWED_CONTENT_ZOOM_ROOT_COUNTS: Readonly<Record<string, number>> = {
  'model-text-panel.component.tsx': 1,
  'platform-scripture-editor-footnotes.component.tsx': 1,
  'platform-scripture-editor.web-view.tsx': 1,
  'resource-text-panel.component.tsx': 1,
  'scripture-text-grid.web-view.tsx': 1,
};

describe('content zoom markers (Text Collection grid)', () => {
  const grid = source('scripture-text-grid.web-view.tsx');

  it('marks the grid body, not the outer element that also holds the View Options row', () => {
    expect(grid).toMatch(
      /<ContentZoomRoot area="text-collection" className="tw:flex-1 tw:overflow-hidden">/,
    );
  });

  it('keeps the View Options header outside the marked area', () => {
    // The header is the sibling above the marked body; if it moved inside, it would scale with the
    // content, which is exactly what marking a content root is for avoiding.
    const headerIndex = grid.indexOf('tw:flex tw:items-center tw:justify-end tw:border-b tw:p-1');
    const areaIndex = grid.indexOf('<ContentZoomRoot');
    expect(headerIndex).toBeGreaterThan(-1);
    expect(areaIndex).toBeGreaterThan(headerIndex);
  });
});

describe('content zoom markers (Bible Texts / Commentaries panel)', () => {
  const panel = source('resource-text-panel.component.tsx');

  it('picks its area id from the resource type it was opened for', () => {
    // Both web-view types share this component and share a memory identity (their container
    // project), so the area id is the only thing that keeps their remembered levels apart.
    expect(panel).toMatch(/resourceType === 'ScriptureResource' \? 'bible-texts' : 'commentaries'/);
  });

  it('marks the content below the selector and copyright notice, keeping both fixed', () => {
    expect(panel).toMatch(
      /<ResourceSelectorDropdown[\s\S]*?\/> {copyrightNotice} <ContentZoomRoot area={contentZoomArea} className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0" ?> {renderContent\(\)} <\/ContentZoomRoot>/,
    );
  });

  it('hands the editor no right-click menu container, so the menu stays at interface scale', () => {
    // Positive control: the editor options are still built in this file.
    expect(panel).toContain('const options: EditorOptions = useMemo(');
    expect(panel).not.toContain('contextMenuContainer');
    expect(panel).not.toContain('zoomRootRef');
  });
});

describe('content zoom markers (Model Text panel)', () => {
  const panel = source('model-text-panel.component.tsx');

  it('marks the content below the label row, keeping the 42 px header fixed', () => {
    expect(panel).toMatch(
      /<ContentZoomRoot area="model-text" className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0" ?> {renderContent\(\)} <\/ContentZoomRoot>/,
    );
  });

  it('hands the editor no right-click menu container, so the menu stays at interface scale', () => {
    // Positive control: the editor options are still built in this file.
    expect(panel).toContain('const options: EditorOptions = useMemo(');
    expect(panel).not.toContain('contextMenuContainer');
    expect(panel).not.toContain('zoomRootRef');
  });

  it('leaves the label row outside the marked area', () => {
    // The row's height is pinned to 42 px to line its bottom edge up with the editor's toolbar and
    // Column 3's tab bar; scaling it with the content would break that alignment at every level
    // but 100 %.
    const labelIndex = panel.indexOf('tw:h-[42px]');
    const areaIndex = panel.indexOf('<ContentZoomRoot');
    expect(labelIndex).toBeGreaterThan(-1);
    expect(areaIndex).toBeGreaterThan(labelIndex);
  });
});

describe('content zoom markers (whole extension)', () => {
  it('marks ContentZoomRoot in exactly the files that opt into content zoom, once each, with no others added anywhere in the extension', () => {
    const actualCounts: Record<string, number> = {};
    listSourceFiles(SRC_DIR).forEach((filePath) => {
      const fileSource = readFileSync(filePath, 'utf-8');
      const matches = fileSource.match(/<ContentZoomRoot\b/g);
      if (matches) actualCounts[path.relative(SRC_DIR, filePath)] = matches.length;
    });
    expect(actualCounts).toEqual(ALLOWED_CONTENT_ZOOM_ROOT_COUNTS);
  });
});
