import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { ALIGNED_GRID_STYLESHEET } from './aligned-grid.styles';

/**
 * The aligned grid positions elements the Scripture editor renders, addressed by class name and
 * data attribute. Those names belong to `@eten-tech-foundation/platform-editor`, not to this repo,
 * and if one changes the grid keeps rendering — just unaligned, or blank. Nothing else notices: the
 * stylesheet test compares our own generated string against our own constants, the Storybook story
 * reproduces the markup by hand, and the geometry e2e test is local-only.
 *
 * So this reads the editor package as installed and fails when a name the layout depends on is no
 * longer in it. It reads the built bundle rather than importing the package: importing pulls the
 * whole editor (and its Lexical tree) into a jsdom test for two string checks.
 */

const CONTRACT = {
  'verse-block': 'the class on each verse wrapper, which the row rules select',
  'data-verse-start': 'the first verse a block covers, which decides its grid row',
  'data-verse-end': 'the last verse a block covers, which lets a bridge span rows',
  'editor-container': 'an editor wrapper the subgrid chain has to flatten',
  'editor-inner': 'an editor wrapper the subgrid chain has to flatten',
  'editor-input': 'the editable root the subgrid chain has to flatten',
};

/**
 * The editor package's built bundle, as installed.
 *
 * @returns The bundle source, or `undefined` when the package has no built entry — a dev link that
 *   was published without building, which is a setup problem rather than a contract break.
 */
function readInstalledEditorBundle(): string | undefined {
  const require = createRequire(import.meta.url);
  const packageRoot = dirname(
    require.resolve('@eten-tech-foundation/platform-editor/package.json'),
  );
  try {
    return readFileSync(join(packageRoot, 'dist', 'index.js'), 'utf8');
  } catch {
    return undefined;
  }
}

describe('platform-editor DOM contract', () => {
  const bundle = readInstalledEditorBundle();

  it('ships a built entry to check against', () => {
    // A source-only yalc link produces no dist, and every assertion below would pass vacuously.
    // If this fails, the editor package was installed without being built: re-run `npm install`.
    expect(bundle).toBeTypeOf('string');
  });

  Object.entries(CONTRACT).forEach(([name, why]) => {
    it(`still renders ${name} — ${why}`, () => {
      expect(bundle).toContain(name);
      // Nothing forces the two to agree, so a name dropped from our stylesheet is just as broken as
      // one dropped upstream.
      expect(ALIGNED_GRID_STYLESHEET).toContain(name);
    });
  });
});
