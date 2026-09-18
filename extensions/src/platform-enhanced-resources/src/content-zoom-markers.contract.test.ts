import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const THIS_FILE = fileURLToPath(import.meta.url);

function source(relativePath: string): string {
  return readFileSync(path.join(SRC_DIR, relativePath), 'utf-8').replace(/\s+/g, ' ');
}

/**
 * Every `.ts`/`.tsx` file under `dir`, excluding `excludeFile` (an absolute path). Used to sweep
 * the whole extension for `ContentZoomRoot` usages rather than trusting the two files that happen
 * to carry markers today — a `ContentZoomRoot` added later inside any other component (a tab, the
 * scripture pane, the article viewer) would nest inside `main` or `entries`, which the platform
 * silently ignores and logs once, so the guard has to see every file that could introduce one.
 */
function listSourceFiles(dir: string, excludeFile: string): string[] {
  const files: string[] = [];
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listSourceFiles(fullPath, excludeFile));
    } else if (fullPath !== excludeFile && /\.tsx?$/.test(entry.name)) {
      files.push(fullPath);
    }
  });
  return files;
}

describe('content zoom markers (Enhanced Resources)', () => {
  const webView = source('web-views/enhanced-resource.web-view.tsx');
  const footnotesPane = source('components/footnotes-pane/footnotes-pane.component.tsx');

  it('marks the Bible text as the view’s main area', () => {
    expect(webView).toMatch(
      /<ContentZoomRoot className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0"> <EnhancedScripturePane/,
    );
  });

  it('marks the entries panel, keeping the tab bar outside it', () => {
    expect(webView).toMatch(
      /<EnhancedResourceTabBar[\s\S]*?\/> <ContentZoomRoot area="entries" className="tw:flex tw:flex-1 tw:flex-col tw:min-h-0"> <Tabs value={activeTab}/,
    );
  });

  it('marks the footnotes list as its own area', () => {
    expect(footnotesPane).toMatch(
      /<ContentZoomRoot area="footnotes" className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0"> <FootnoteList/,
    );
  });

  it('does not mark the wrapper around all three, which would nest them', () => {
    // A marked element inside another marked element is ignored by the platform and logged once,
    // so marking the wrapper would leave the viewer with one area and no way to tell.
    expect(webView).not.toMatch(
      /<ContentZoomRoot[^>]*> <div className="tw:flex tw:min-h-0 tw:flex-1">/,
    );
    expect(webView).not.toMatch(/<ContentZoomRoot className="tw:flex tw:min-h-0 tw:flex-1">/);
  });

  it('marks exactly three areas across the whole extension — main, entries, footnotes — with no others added anywhere', () => {
    // Scoped to the two files known to carry markers today, a new ContentZoomRoot dropped into any
    // other component (a tab, the scripture pane, the article viewer) would nest inside `main` or
    // `entries` and go undetected — the platform ignores and logs a nested marker, it does not
    // error. Sweeping every source file in the extension is what actually guards against that.
    const areaAttrs = listSourceFiles(SRC_DIR, THIS_FILE).flatMap((filePath) => {
      const fileSource = readFileSync(filePath, 'utf-8').replace(/\s+/g, ' ');
      return [...fileSource.matchAll(/<ContentZoomRoot(?:\s+area="([a-z-]+)")?[ >]/g)].map(
        (m) => m[1] ?? 'main',
      );
    });
    expect(areaAttrs.sort()).toEqual(['entries', 'footnotes', 'main']);
  });

  it('keeps the ribbons, toolbar, tab bar and both resize handles outside every area', () => {
    // WarningRibbons and the top toolbar sit before the first ContentZoomRoot; the resize handle
    // and tab bar sit between the two ContentZoomRoot elements in the web view — never inside one —
    // so they stay at interface scale while the panes zoom. The footnotes pane's own resize handle,
    // between its two ResizablePanels, sits before its ContentZoomRoot for the same reason.
    //
    // Known limitation: if only the `entries` marker were removed, `betweenAreas` would run to
    // end-of-file and this assertion alone would stay green on that case. Coverage is not lost —
    // "marks the entries panel" and "marks exactly three areas" both catch it — and restructuring
    // this assertion to close the gap would add more complexity than the overlap is worth.
    const firstOpenIndex = webView.indexOf('<ContentZoomRoot');
    const firstCloseIndex = webView.indexOf('</ContentZoomRoot>');
    const secondOpenIndex = webView.indexOf('<ContentZoomRoot', firstCloseIndex);
    const beforeFirstArea = webView.slice(0, firstOpenIndex);
    const betweenAreas = webView.slice(firstCloseIndex, secondOpenIndex);

    expect(beforeFirstArea).toContain('<WarningRibbons');
    expect(beforeFirstArea).toContain('<EnhancedResourceTopToolbar');
    expect(betweenAreas).toContain('<ResizableHandle withHandle />');
    expect(betweenAreas).toContain('<EnhancedResourceTabBar');

    expect(footnotesPane).toContain('<ResizableHandle />');
    expect(footnotesPane.indexOf('<ResizableHandle />')).toBeLessThan(
      footnotesPane.indexOf('<ContentZoomRoot area="footnotes"'),
    );
  });
});
