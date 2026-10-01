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
 * extension for `ContentZoomRoot` usages rather than trusting the files that happen to carry
 * markers today — a `ContentZoomRoot` added later around the cells in
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
  // One per cell layout (verse row and chapter column); each names its resource's own area.
  [path.join('scripture-text-grid', 'resource-cell-view.component.tsx')]: 2,
};

describe('content zoom markers (Text Collection grid)', () => {
  const GRID_DIR = path.join(SRC_DIR, 'scripture-text-grid');
  const grid = source('scripture-text-grid.web-view.tsx');
  const cell = source(path.join('scripture-text-grid', 'resource-cell-view.component.tsx'));
  /** The grid web view and every source file of the grid it renders. */
  const gridSources = [
    path.join(SRC_DIR, 'scripture-text-grid.web-view.tsx'),
    ...listSourceFiles(GRID_DIR),
  ].map((filePath) => ({
    filePath: path.relative(SRC_DIR, filePath),
    text: readFileSync(filePath, 'utf-8'),
  }));

  it('leaves the grid body unmarked, so the headers and grips inside it keep their size', () => {
    expect(grid).toContain(
      '<div className="tw:flex-1 tw:overflow-hidden"> {gridBodyState === \'catalogError\'',
    );
    expect(grid).not.toContain('<ContentZoomRoot');
  });

  it('marks each cell’s text with its resource’s own area and name, inside the unmarked scroll box, in both layouts', () => {
    expect(
      cell.match(
        /<ContentZoomRoot area={zoomArea} label={label}> ?{stateContent} ?<\/ContentZoomRoot>/g,
      ),
    ).toHaveLength(2);
    // The scroll box's overflow class is chosen per view (the Grid view hands scrolling to its root),
    // so the inline layout is pinned by the element's other classes.
    expect(cell).toMatch(
      /<div className={`tw:min-w-0 tw:flex-1 \$\{contentOverflowClass\}`} style={contentStyle}> <ContentZoomRoot area={zoomArea}/,
    );
    expect(cell).toContain(
      '<div data-cell-pad className="tw:p-2"> <ContentZoomRoot area={zoomArea}',
    );
    // The shared `text-collection` area is only the grid's fallback, never a literal in the cell.
    expect(cell).not.toContain('area="text-collection"');
  });

  it('gives the cell text no zoom of its own, so its content zoom area alone sizes it', () => {
    // Positive control: the file still renders the cell text this test is about.
    expect(cell).toContain('{stateContent}');
    expect(cell).not.toMatch(/\bzoom\s*:/);
  });

  it('handles no Ctrl/⌘+wheel of its own, so the wheel over a cell reaches the platform’s content zoom', () => {
    // Positive control: the sweep reads the grid component, which registers other listeners.
    expect(gridSources.map(({ filePath }) => filePath)).toContain(
      path.join('scripture-text-grid', 'scripture-text-grid.component.tsx'),
    );
    const wheelHandlers = gridSources
      .filter(({ text }) => /['"]wheel['"]|\bonWheel/.test(text))
      .map(({ filePath }) => filePath);
    expect(wheelHandlers).toEqual([]);
  });

  it('has no source that reads the retired per-resource zoom state key', () => {
    // A static sweep, not a mount: with no reader left, a level saved under this key has no effect.
    // Positive control: the sweep sees the web view's other state keys, spelled the same way.
    expect(grid).toMatch(/useWebViewState<ResourceCollectionViewMode>\( ?'viewMode'/);
    const readers = gridSources
      .filter(({ text }) => text.includes('zoomByResourceId'))
      .map(({ filePath }) => filePath);
    expect(readers).toEqual([]);
  });
});

describe('content zoom markers (Bible Texts / Commentaries panel)', () => {
  const panel = source('resource-text-panel.component.tsx');

  it('picks its area id from the resource type it was opened for', () => {
    // Both web-view types share this component and share a memory identity (their container
    // project), so the area id is the only thing that keeps their remembered levels apart.
    expect(panel).toMatch(/resourceType === 'ScriptureResource' \? 'bible-texts' : 'commentaries'/);
  });

  it('marks the editor inside its scroll box, keeping the selector and the messages unmarked', () => {
    expect(panel).toMatch(
      /data-testid={RESOURCE_TEXT_EDITOR_CONTAINER_TEST_ID} ?> <ContentZoomRoot area={contentZoomArea}> <Editorial/,
    );
    expect(panel).toMatch(
      /<ResourceSelectorDropdown[\s\S]*?\/> <div className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0">{renderContent\(\)}<\/div>/,
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

  it('marks the editor inside its scroll box, keeping the messages unmarked', () => {
    expect(panel).toMatch(
      /dir={options.textDirection} ?> (?:\{\/\*.*?\*\/\} )?<ContentZoomRoot area="model-text"> <Editorial/,
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
    // but 100 %. The only marker lives in `renderContent`, which renders after the row.
    const labelIndex = panel.indexOf('tw:h-[42px]');
    const contentIndex = panel.indexOf('{renderContent()}');
    expect(labelIndex).toBeGreaterThan(-1);
    expect(contentIndex).toBeGreaterThan(labelIndex);
    expect(panel.slice(labelIndex, contentIndex)).not.toContain('<ContentZoomRoot');
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
