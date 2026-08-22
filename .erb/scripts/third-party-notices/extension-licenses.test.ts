import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';

const REPO = path.resolve(__dirname, '..', '..', '..');
const DIST = path.join(REPO, 'extensions', 'dist');

/**
 * Every extension bundled in this repository is stamped `license: 'AGPL-3.0-or-later'`
 * (`BUNDLED_EXTENSION_LICENSE`, `stampExtensionLicense` in `extensions/lib/git.util.ts`). That
 * declaration is not merely descriptive of the whole application: an extension folder is an
 * independently installable unit - `extension.service.ts` loads extensions from a raw folder or a
 * `.zip` via the installed-extensions directory, `--extensionDirs` and `--extensions`, and
 * `installExtension` downloads and installs a `.zip` from a URL with no involvement from the rest
 * of the application. A folder or zip that travels alone with an AGPL declaration and no license
 * text states an obligation (AGPL section 4: "convey a copy of this License along with the
 * Program") without discharging it, so a top-level `LICENSE` shipped beside the app does not cover
 * it: that copy travels with the app, not with an extension redistributed on its own.
 *
 * Folder-level, not REUSE (FSF Europe's file-header convention): that would touch every source file
 * in the repo to buy a guarantee at a granularity this does not need - a declared per-folder
 * license is enough to identify the terms an extension distributed alone carries.
 */
const built = fs.existsSync(DIST)
  ? fs.readdirSync(DIST).filter((d) => fs.statSync(path.join(DIST, d)).isDirectory())
  : [];

// CI always runs `npm run build` before `npm test` on every platform (`.github/workflows/test.yml`),
// so this suite is not permanently skipped there. It only skips on a dev checkout that has not yet
// built the extensions.
describe.skipIf(built.length === 0)('packaged extensions carry their license texts', () => {
  it.each(built)('%s declares a license and ships its text', (name) => {
    const dir = path.join(DIST, name);
    const manifestPath = path.join(dir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) return;

    const manifest: unknown = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const license =
      manifest && typeof manifest === 'object' && 'license' in manifest
        ? manifest.license
        : undefined;
    if (!license) return;

    // A NAME match alone is not proof of TEXT: `copy-webpack-plugin` guesses `toType: 'dir'` for
    // any extensionless destination unless told otherwise (see `webpack.util.ts`'s `LICENSE`
    // entry), which nests the real file inside a newly created `LICENSE/` directory of the same
    // name - `fs.readdirSync(dir).some(f => regex.test(f))` alone matches that directory just as
    // happily as a real file, and eleven of twelve built extensions shipped exactly that way before
    // `toType: 'file'` was set. So this must also confirm the matching entry is a non-empty REGULAR
    // FILE: a directory, a zero-byte file, and a dangling symlink (whose target `statSync` cannot
    // resolve) must all fail here, not just an absent name.
    const licenseFiles = fs.readdirSync(dir).filter((f) => {
      if (!/^(LICEN[CS]E|COPYING)([._-].*)?$/i.test(f)) return false;
      try {
        const stat = fs.statSync(path.join(dir, f));
        return stat.isFile() && stat.size > 0;
      } catch {
        // Dangling symlink, or anything else statSync could not resolve: not usable license text.
        return false;
      }
    });
    // vitest's `expect` takes no message argument, so the "which extension and which declared
    // license" context has to come from a thrown error rather than from `expect` itself.
    if (licenseFiles.length === 0)
      throw new Error(`${name} declares "${String(license)}" but ships no license text`);
    expect(licenseFiles.length).toBeGreaterThan(0);

    // A file NAMED like a licence is not proof of the licence DECLARED. The mechanism that would
    // put a mismatched pair here is real and specific: `stampExtensionLicense` corrects the
    // `license` FIELD of a folder merged from the MIT extension template, and until it also
    // compared the text it left whatever `LICENSE` that merge brought with it - so a folder could
    // declare AGPL-3.0-or-later and ship the MIT text, which is the one state that states an
    // obligation while discharging a different one. Checked only for the license this repository
    // stamps; an extension deliberately given other terms carries its own text.
    if (license === 'AGPL-3.0-or-later') {
      const texts = licenseFiles.map((f) => fs.readFileSync(path.join(dir, f), 'utf8'));
      if (!texts.some((text) => /GNU AFFERO GENERAL PUBLIC LICENSE/i.test(text)))
        throw new Error(
          `${name} declares "AGPL-3.0-or-later" but none of its license files ` +
            `(${licenseFiles.join(', ')}) is the AGPL text`,
        );
    }
  });

  it('found at least one extension that actually declares a license', () => {
    // A guard against the whole suite quietly asserting nothing: if every extension stopped
    // declaring a license, every `it.each` case above would return early and pass having checked
    // nothing. Every extension in this repository is stamped AGPL-3.0-or-later today, so this
    // must find at least one.
    const declaresLicense = (name: string) => {
      const manifestPath = path.join(DIST, name, 'manifest.json');
      if (!fs.existsSync(manifestPath)) return false;
      const manifest: unknown = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      return !!(
        manifest &&
        typeof manifest === 'object' &&
        'license' in manifest &&
        manifest.license
      );
    };
    expect(built.filter(declaresLicense).length).toBeGreaterThan(0);
  });
});
