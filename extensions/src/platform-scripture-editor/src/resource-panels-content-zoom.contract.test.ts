import { readFileSync } from 'node:fs';
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
