import { describe, expect, it } from 'vitest';
import {
  Z_INDEX_ABOVE_DOCK,
  Z_INDEX_ABOVE_POPOVER,
  Z_INDEX_FIRST_RUN,
  Z_INDEX_MODAL,
  Z_INDEX_MODAL_BACKDROP,
  Z_INDEX_OVERLAY,
} from '@/components/z-index';

describe('z-index scale', () => {
  // Radix portals a dropdown opened inside a popover to `document.body` instead of nesting it, so
  // the two are stacking SIBLINGS of each other and `PopoverContent`'s own Z_INDEX_ABOVE_DOCK
  // competes directly with the dropdown's. This ordering is the whole reason the constant exists;
  // losing it puts the footnote editor's note-type and caller dropdowns behind the popover they
  // belong to, which is what happened when Z_INDEX_ABOVE_DOCK was raised from 250 to 600 and
  // nothing pinned relative to it followed.
  it('keeps content portalled out of a popover above the popover layer', () => {
    expect(Z_INDEX_ABOVE_POPOVER).toBeGreaterThan(Z_INDEX_ABOVE_DOCK);
  });

  // The first-run wizard gates the entire app at startup; nothing may cover it.
  it('keeps the first-run gate above everything else', () => {
    expect(Z_INDEX_FIRST_RUN).toBeGreaterThan(Z_INDEX_ABOVE_POPOVER);
  });
});

describe('the SCSS twin of the scale', () => {
  // `src/renderer/styles/_vars.scss` restates this scale for SCSS consumers and names this file as
  // canonical, but nothing kept them in agreement — so when Z_INDEX_ABOVE_DOCK was raised from 250
  // to 600 here, the SCSS copy stayed at 250 and the two have disagreed since. A drifted twin is
  // worse than a duplicated one: it makes the scale unreadable, because neither copy can be trusted
  // to say what a layer's value actually is.
  it('agrees with the TypeScript constants', async () => {
    const { readFile } = await import('node:fs/promises');
    const { fileURLToPath } = await import('node:url');
    const { dirname, resolve } = await import('node:path');
    // Anchored to this file rather than to cwd, which differs between a workspace-scoped run and a
    // repo-root one.
    const here = dirname(fileURLToPath(import.meta.url));
    const vars = await readFile(
      resolve(here, '../../../../src/renderer/styles/_vars.scss'),
      'utf8',
    );
    const scssValue = (name: string) => {
      const match = new RegExp(`\\$z-index--${name}:\\s*(\\d+)`).exec(vars);
      return match ? Number(match[1]) : undefined;
    };

    expect(scssValue('above-dock')).toBe(Z_INDEX_ABOVE_DOCK);
    expect(scssValue('above-popover')).toBe(Z_INDEX_ABOVE_POPOVER);
    expect(scssValue('overlay')).toBe(Z_INDEX_OVERLAY);
    expect(scssValue('modal-backdrop')).toBe(Z_INDEX_MODAL_BACKDROP);
    expect(scssValue('modal')).toBe(Z_INDEX_MODAL);
  });
});
