import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { ALIGNED_GRID_STYLESHEET } from './aligned-grid.styles';

/**
 * The aligned grid positions elements the Scripture editor renders, addressed by class name and
 * data attribute, and asks for that layout through two of the editor's exports. All of those names
 * belong to `@eten-tech-foundation/platform-editor`, not to this repo. If a DOM name changes the
 * grid keeps rendering — just unaligned, or blank — and nothing else notices: the stylesheet test
 * compares our own generated string against our own constants, the Storybook story reproduces the
 * markup by hand, and the geometry e2e test is local-only. If an export goes, the failure is a
 * compile error rather than a silent one, but `resource-cell.component.test.tsx` mocks the whole
 * module, so no test observes it either.
 *
 * So this reads the editor package as installed and fails when a name the layout depends on is no
 * longer in it. It reads the built bundle rather than importing the package: importing pulls the
 * whole editor (and its Lexical tree) into a jsdom test for a handful of string checks. `toContain`
 * matches anywhere in the bundle, so a rename that leaves the old string behind in a comment still
 * passes — enough for a tripwire, not a proof.
 */

/** DOM names the stylesheet selects; the editor must still render them AND we must still name them. */
const DOM_CONTRACT = {
  'verse-block': 'the class on each verse wrapper, which the row rules select',
  'data-verse-start': 'the first verse a block covers, which decides its grid row',
  'data-verse-end': 'the last verse a block covers, which lets a bridge span rows',
  'editor-container': 'an editor wrapper the subgrid chain has to flatten',
  'editor-inner': 'an editor wrapper the subgrid chain has to flatten',
  'editor-input': 'the editable root the subgrid chain has to flatten',
  'editor-placeholder':
    'the editor’s "start typing" prompt, hidden so a read-only grid never invites edits',
};

/** Exports `resource-cell.component.tsx` imports to ask for the block-verse layout. */
const API_CONTRACT = {
  BLOCK_VERSE_VIEW_MODE: 'names the view mode that wraps each verse in a placeable block',
  getViewOptions: 'turns that mode into the editor options the cell passes down',
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

  Object.entries(DOM_CONTRACT).forEach(([name, why]) => {
    it(`still renders ${name} — ${why}`, () => {
      expect(bundle).toContain(name);
      // Nothing forces the two to agree, so a name dropped from our stylesheet is just as broken as
      // one dropped upstream.
      expect(ALIGNED_GRID_STYLESHEET).toContain(name);
    });
  });

  Object.entries(API_CONTRACT).forEach(([name, why]) => {
    it(`still exports ${name} — ${why}`, () => {
      // The installed editor is the one the app runs against, and it can be a yalc-linked build
      // rather than the version the manifests pin. Checking the bundle says whether the app will
      // actually get the block-verse layout, rather than whether a version number looks right.
      expect(bundle).toContain(name);
    });
  });
});
