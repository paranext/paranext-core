import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));

function source(relativePath: string): string {
  return readFileSync(path.join(SRC_DIR, relativePath), 'utf-8').replace(/\s+/g, ' ');
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

  it('marks exactly three areas — main, entries, footnotes — with no others added', () => {
    const areaAttrs = [...webView.matchAll(/<ContentZoomRoot(?:\s+area="([a-z-]+)")?[ >]/g)].map(
      (m) => m[1] ?? 'main',
    );
    expect(areaAttrs.sort()).toEqual(['entries', 'main']);
    expect(footnotesPane.match(/<ContentZoomRoot area="footnotes"/g)).toHaveLength(1);
  });

  it('keeps the ribbons, toolbar, tab bar and resize handle outside every area', () => {
    // WarningRibbons and the top toolbar sit before the first ContentZoomRoot; the resize handle
    // and tab bar sit between the two ContentZoomRoot elements — never inside one — so they stay
    // at interface scale while the panes zoom.
    const firstOpenIndex = webView.indexOf('<ContentZoomRoot');
    const firstCloseIndex = webView.indexOf('</ContentZoomRoot>');
    const secondOpenIndex = webView.indexOf('<ContentZoomRoot', firstCloseIndex);
    const beforeFirstArea = webView.slice(0, firstOpenIndex);
    const betweenAreas = webView.slice(firstCloseIndex, secondOpenIndex);

    expect(beforeFirstArea).toContain('<WarningRibbons');
    expect(beforeFirstArea).toContain('<EnhancedResourceTopToolbar');
    expect(betweenAreas).toContain('<ResizableHandle withHandle />');
    expect(betweenAreas).toContain('<EnhancedResourceTabBar');
  });
});
