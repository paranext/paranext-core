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
 * scripture pane, the article viewer) would nest inside `main` or `footnotes`, which the platform
 * silently ignores and logs once, so the guard has to see every file that could introduce one. Test
 * files are skipped: they render markers and providers as fixtures, not as part of the view.
 */
function listSourceFiles(dir: string, excludeFile: string): string[] {
  const files: string[] = [];
  readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listSourceFiles(fullPath, excludeFile));
    } else if (
      fullPath !== excludeFile &&
      /\.tsx?$/.test(entry.name) &&
      !/\.test\.tsx?$/.test(entry.name)
    ) {
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
      /<ContentZoomRoot className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0" ?> <EnhancedScripturePane/,
    );
  });

  it('hands the Bible text pane no right-click menu container, so the menu stays at interface scale', () => {
    expect(webView).toContain('<EnhancedScripturePane');
    expect(webView).not.toContain('contextMenuContainer');
    expect(webView).not.toContain('scriptureZoomRootRef');
  });

  it('opts the entries panel into text marking without marking the panel itself, keeping the tab bar outside', () => {
    expect(webView).toMatch(
      /<EnhancedResourceTabBar[\s\S]*?\/> (?:\{\/\*.*?\*\/\} )?<ContentZoomTextProvider area="entries"> <div className="tw:flex tw:flex-1 tw:flex-col tw:min-h-0"> <Tabs value={activeTab}/,
    );
    expect(webView).not.toContain('<ContentZoomRoot area="entries"');
  });

  it('renders the semantic domain dialog outside the entries provider', () => {
    // The dialog renders hook consumers, and React context would reach them through the portal if
    // it were mounted inside the provider.
    const providerCloseIndex = webView.indexOf('</ContentZoomTextProvider>');
    const dialogIndex = webView.indexOf('<SemanticDomainViewer');
    expect(providerCloseIndex).toBeGreaterThan(-1);
    expect(dialogIndex).toBeGreaterThan(providerCloseIndex);
  });

  it('marks entry text in each component that renders it', () => {
    [
      'components/dictionary-tab/dictionary-display-item.component.tsx',
      'components/dictionary-tab/dictionary-entry-detail.component.tsx',
      'components/shared/dictionary-sense-item.component.tsx',
      'components/encyclopedia-tab/encyclopedia-display-item.component.tsx',
      'components/encyclopedia-tab/encyclopedia-entry-detail.component.tsx',
    ].forEach((file) => expect(source(file)).toContain('useContentZoomTextProps()'));
  });

  it('marks the footnotes list as its own area', () => {
    expect(footnotesPane).toMatch(
      /<ContentZoomRoot area="footnotes" className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0"> <FootnoteList/,
    );
  });

  it('uses exactly the main, entries and footnotes areas across the whole extension', () => {
    // Swept across every source file: a ContentZoomRoot added to any other component would nest
    // inside `main` or `footnotes`, and one around the entries provider would contain its text
    // markers. The platform ignores a nested marker and logs it rather than erroring.
    const files = listSourceFiles(SRC_DIR, THIS_FILE).map((filePath) =>
      readFileSync(filePath, 'utf-8').replace(/\s+/g, ' '),
    );
    const roots = files.flatMap((fileSource) =>
      [...fileSource.matchAll(/<ContentZoomRoot(?:\s+area="([a-z-]+)")?[ >]/g)].map(
        (m) => m[1] ?? 'main',
      ),
    );
    const providers = files.flatMap((fileSource) =>
      [...fileSource.matchAll(/<ContentZoomTextProvider(?:\s+area="([a-z-]+)")?[ >]/g)].map(
        (m) => m[1] ?? 'main',
      ),
    );
    expect(roots.sort()).toEqual(['footnotes', 'main']);
    expect(providers).toEqual(['entries']);
  });

  it('keeps the ribbons, toolbar, tab bar and both resize handles outside every area', () => {
    const firstOpenIndex = webView.indexOf('<ContentZoomRoot');
    const firstCloseIndex = webView.indexOf('</ContentZoomRoot>');
    const providerIndex = webView.indexOf('<ContentZoomTextProvider', firstCloseIndex);
    expect(providerIndex).toBeGreaterThan(firstCloseIndex);
    const beforeFirstArea = webView.slice(0, firstOpenIndex);
    const betweenAreas = webView.slice(firstCloseIndex, providerIndex);

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

describe('Enhanced Resources has no private zoom of its own', () => {
  const webView = source('web-views/enhanced-resource.web-view.tsx');
  const scripturePane = source('components/scripture-pane/scripture-pane.component.tsx');
  const toolbar = source('components/toolbar/toolbar.component.tsx');

  it('keeps F7 for footnotes', () => {
    expect(webView).toContain("event.key === 'F7'");
  });

  it('carries no zoom factor of its own in the view', () => {
    expect(webView).not.toContain('scripturePaneZoom');
  });

  it('carries no zoom factor of its own in the scripture pane', () => {
    expect(scripturePane).not.toContain('scripturePaneZoom');
  });

  it('handles none of the zoom chords in the view', () => {
    // The platform owns these chords. An in-view handler does not merely duplicate it: both listen
    // bubble-phase on `window` and neither stops propagation, so one keypress would drive both.
    // Match the modifier-gate SHAPE (Ctrl or Cmd held) rather than the specific keys, so a
    // reintroduced chord branch is caught however its keys are spelled.
    //
    // This reads source text, so it only catches the literal idiom `event.ctrlKey ||
    // event.metaKey` (either operand order, any whitespace). It does NOT catch a renamed or
    // destructured event parameter (`e.ctrlKey || e.metaKey`, `const { ctrlKey, metaKey } =
    // event`), a ternary or De Morgan spelling, a `getModifierState('Control')` gate, or a comment
    // sitting between the two operands. A regex over source cannot be a structural test and
    // chasing spellings is an infinite regress, so treat this as a guard against the idiom this
    // codebase actually writes — not as proof that no modifier gate exists.
    expect(webView).not.toMatch(
      /event\.ctrlKey\s*\|\|\s*event\.metaKey|event\.metaKey\s*\|\|\s*event\.ctrlKey/,
    );
  });

  it('offers no zoom items in its toolbar menu', () => {
    expect(toolbar).not.toContain('onZoomIn');
    expect(toolbar).not.toContain('onZoomOut');
    expect(toolbar).not.toContain('onZoomReset');
    expect(toolbar).not.toContain('toolbar_menu_zoom');
  });
});
