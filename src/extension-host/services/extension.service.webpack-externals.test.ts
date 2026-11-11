import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  BASE_CONFIG_FILE_NAME,
  CHANGING_THE_EXTERNALS,
  externalsOfBuild,
  parseExternals,
  readExternals,
  readSuppliedModuleSpecifiers,
} from './webpack-externals.test-utils';

/*
 * Pins the webpack `externals` list: the modules every extension build leaves to the hosts instead
 * of bundling. Those are the modules an extension reaches Platform.Bible through at run time, which
 * is what the license exception (`LICENSE-EXCEPTION.md`) is defined by - so the list has to match
 * what the hosts supply, in every extension's own build as in the combined one. The hosts' own
 * allowlists are pinned in `extension.service.module-allowlist.test.ts`.
 */

const REPO = path.join(__dirname, '..', '..', '..');

/**
 * Modules the hosts supply that extension builds bundle anyway instead of leaving to the host.
 *
 * The renderer supplies `platform-bible-react` to web views, but extensions built from the
 * templates bundle their own copy, as the table of `lib/` packages in `LICENSING.md` states. No
 * permission depends on it: the library is also published under the MIT License. Making it an
 * external is a product decision (smaller extensions, against tying every extension to the
 * platform's copy and its styles), not something to change silently here.
 */
const SUPPLIED_BUT_BUNDLED_MODULES = ['platform-bible-react'];

const EXTENSION_SOURCES_DIR = path.join(REPO, 'extensions', 'src');
/** The webpack folder of the combined build that packs every extension into the installer. */
const COMBINED_WEBPACK_DIR = path.join(REPO, 'extensions', 'webpack');

/**
 * The webpack folder of each extension's own build. Each comes from the extension templates, so
 * each is where a template change takes effect.
 */
function perExtensionWebpackDirs(): string[] {
  return readdirSync(EXTENSION_SOURCES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(EXTENSION_SOURCES_DIR, entry.name, 'webpack'))
    .filter((folder) => existsSync(folder));
}

describe('the modules extension builds leave to the hosts (webpack `externals`)', () => {
  it(`are the same in every extension's own build as in the combined build — ${CHANGING_THE_EXTERNALS}`, () => {
    // Keyed by folder, so a failure names every build that differs, not only the first.
    const combined = readExternals(COMBINED_WEBPACK_DIR);
    const perExtension = Object.fromEntries(
      perExtensionWebpackDirs().map((folder) => [
        path.relative(REPO, folder),
        readExternals(folder),
      ]),
    );

    expect(Object.keys(perExtension).length).toBeGreaterThan(0);
    expect(perExtension).toEqual(
      Object.fromEntries(Object.keys(perExtension).map((folder) => [folder, combined])),
    );
  });

  it(`are the modules either host supplies, apart from the ones extensions bundle — ${CHANGING_THE_EXTERNALS}`, () => {
    // Adding an external makes every extension rely on the host's copy of that module instead of
    // carrying one; removing one makes every extension carry its own. Either changes what extensions
    // reach Platform.Bible through, and the license exception is defined by that.
    //
    // This pins the union of the two hosts, not each one: the main and web-view bundles share one
    // list, so `react` is external in an extension's main bundle too, though only the renderer
    // supplies it. An extension's `main.ts` that imports React therefore fails when it activates.
    const supplied = readSuppliedModuleSpecifiers();

    expect(readExternals(COMBINED_WEBPACK_DIR)).toEqual(
      supplied.filter((module) => !SUPPLIED_BUT_BUNDLED_MODULES.includes(module)),
    );
    expect(SUPPLIED_BUT_BUNDLED_MODULES.filter((module) => !supplied.includes(module))).toEqual([]);
  });
});

describe('reading the `externals` list a webpack build declares', () => {
  const read = (text: string) => parseExternals('config.ts', text);

  it('reads the module names, whatever the comments around them hold', () => {
    expect(
      read(
        "export default { externals: [/* ] */ 'react', // ]\n 'crypto'], externalsType: 'commonjs' };",
      ),
    ).toEqual(['crypto', 'react']);
  });

  it('finds no list in a config that declares none', () => {
    expect(read("export default { target: 'web' };")).toBeUndefined();
  });

  it.each([
    ['a regular expression', 'export default { externals: [/^react/] };'],
    ['a spread', 'export default { externals: [...more] };'],
    ['a template string', 'export default { externals: [`react`] };'],
    ['a function', 'export default { externals: ({ request }, callback) => callback() };'],
    ['a list held in a variable', 'const externals = []; export default { externals };'],
    ['a list assigned afterwards', "config.externals = ['react'];"],
    ['a list pushed onto afterwards', "config.externals.push('react');"],
    ['`externalsPresets`', 'export default { externalsPresets: { node: true } };'],
    ['a second list', "export const a = { externals: ['react'] }, b = { externals: ['crypto'] };"],
  ])('refuses %s', (_, text) => {
    expect(() => read(text)).toThrow(CHANGING_THE_EXTERNALS);
  });

  it('refuses a list declared outside the base config, which would be appended to it', () => {
    expect(() =>
      externalsOfBuild('webpack', [
        { name: BASE_CONFIG_FILE_NAME, text: "export default { externals: ['react'] };" },
        { name: 'webpack.config.main.ts', text: "export default { externals: ['lodash'] };" },
      ]),
    ).toThrow(CHANGING_THE_EXTERNALS);
  });

  it('refuses a build whose base config declares no list', () => {
    expect(() =>
      externalsOfBuild('webpack', [{ name: 'webpack.config.main.ts', text: 'export default {};' }]),
    ).toThrow(CHANGING_THE_EXTERNALS);
  });
});
