import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { BUNDLED_EXTENSION_LICENSE } from '../../../extensions/lib/git.util';
import { inCi } from './main';
import { isLicenseTextFileName } from './package-files';

const REPO = path.resolve(__dirname, '..', '..', '..');
const DIST = path.join(REPO, 'extensions', 'dist');

/**
 * Every extension bundled in this repository is stamped with `BUNDLED_EXTENSION_LICENSE`
 * (`stampExtensionLicense` in `extensions/lib/git.util.ts`). That declaration is not merely
 * descriptive of the whole application: an extension folder is an independently installable unit -
 * `extension.service.ts` loads extensions from a raw folder or a `.zip` via the
 * installed-extensions directory, `--extensionDirs` and `--extensions`, and `installExtension`
 * downloads and installs a `.zip` from a URL with no involvement from the rest of the application.
 * A folder or zip that travels alone with an AGPL declaration and no license text states an
 * obligation (AGPL section 4: "convey a copy of this License along with the Program") without
 * discharging it, so a top-level `LICENSE` shipped beside the app does not cover it: that copy
 * travels with the app, not with an extension redistributed on its own.
 *
 * Folder-level, not REUSE (FSF Europe's file-header convention): that would touch every source file
 * in the repo to buy a guarantee at a granularity this does not need - a declared per-folder
 * license is enough to identify the terms an extension distributed alone carries.
 */
const built = fs.existsSync(DIST)
  ? fs.readdirSync(DIST).filter((d) => fs.statSync(path.join(DIST, d)).isDirectory())
  : [];

// A skip on a dev checkout that has not built the extensions is honest - there is nothing on disk
// to check. A skip in CI is not: every platform's leg runs `npm run build` before `npm test`
// (`.github/workflows/test.yml`), so an empty `extensions/dist` there means the build changed shape
// and this suite stopped covering anything, which is the state it is least able to report on its
// own. `npm run package` also deletes `extensions/dist` (see `clean.ts`), so "green because there
// was nothing to look at" is a reachable local state too.
describe.skipIf(built.length === 0 && !inCi())(
  'packaged extensions carry their license texts',
  () => {
    // A plain loop rather than `it.each`, which throws on an empty list: with nothing built in CI
    // this suite must register no per-extension cases and fail on the guard below instead.
    built.forEach((name) => {
      it(`${name} declares a license and ships its text`, () => {
        const dir = path.join(DIST, name);
        const manifestPath = path.join(dir, 'manifest.json');
        // Thrown, never skipped: a packaged extension folder with no manifest is not loadable,
        // and one that declares no license is one this repository stopped stamping - while still
        // being redistributable on its own. Returning early on either would pass having checked
        // nothing.
        if (!fs.existsSync(manifestPath))
          throw new Error(`${name} is packaged into extensions/dist with no manifest.json`);

        const manifest: unknown = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        const license =
          manifest && typeof manifest === 'object' && 'license' in manifest
            ? manifest.license
            : undefined;
        if (!license)
          throw new Error(
            `${name}'s manifest.json declares no license. Every extension bundled here is stamped ` +
              `${BUNDLED_EXTENSION_LICENSE} (stampExtensionLicense in extensions/lib/git.util.ts), ` +
              'and an extension folder is redistributable on its own.',
          );

        // A NAME match alone is not proof of TEXT: `copy-webpack-plugin` guesses `toType: 'dir'` for
        // any extensionless destination unless told otherwise (see `webpack.util.ts`'s `LICENSE`
        // entry), which nests the real file inside a newly created `LICENSE/` directory of the same
        // name that a name match happily accepts. So the matching entry must also be a non-empty
        // REGULAR FILE: a directory, a zero-byte file, and a dangling symlink (whose target
        // `statSync` cannot resolve) all have to fail here, not just an absent name.
        const licenseFiles = fs.readdirSync(dir).filter((f) => {
          // The generator's own predicate, never a local copy of it: it pairs the filename match
          // with a NOT_LICENSE_TEXT exclusion, so half of it would accept a `LICENSE.js` or
          // `LICENSE.svg` the generator refuses to reproduce - and a copy would go on asserting the
          // old definition after the real one changed. Its looseness about WHERE the word sits is
          // sound here for the same reason it is in the NuGet reproduction path: the declared
          // `manifest.json` licence, asserted below, is the second signal that decides the terms.
          if (!isLicenseTextFileName(f)) return false;
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

        // A file NAMED like a licence is not proof of the licence DECLARED. The mechanism that puts
        // a mismatched pair here is real and specific: `stampExtensionLicense` corrects the `license`
        // FIELD of a folder merged from the MIT extension template, so without a text comparison the
        // folder keeps whatever `LICENSE` the merge brought - declaring AGPL-3.0-or-later while
        // shipping the MIT text, which states one obligation and discharges another. Checked only
        // for the license this repository stamps (an extension deliberately given other terms
        // carries its own text), and against the stamper's own constant rather than a second
        // spelling of it, which would silently stop matching if the two diverged.
        if (license === BUNDLED_EXTENSION_LICENSE) {
          const texts = licenseFiles.map((f) => fs.readFileSync(path.join(dir, f), 'utf8'));
          if (!texts.some((text) => /GNU AFFERO GENERAL PUBLIC LICENSE/i.test(text)))
            throw new Error(
              `${name} declares "${BUNDLED_EXTENSION_LICENSE}" but none of its license files ` +
                `(${licenseFiles.join(', ')}) is the AGPL text`,
            );
        }
      });
    });

    it('found at least one extension declaring the license this repository stamps', () => {
      // A guard against the whole suite quietly asserting nothing. The per-extension cases above are
      // registered from what is on disk, and the text comparison is taken only for a folder declaring
      // `BUNDLED_EXTENSION_LICENSE` - so "nothing was built" and "nothing declares the value this
      // repository stamps" would both leave the suite green having checked nothing at all. Every
      // extension here is stamped, so this must find at least one.
      const declaresStampedLicense = (name: string) => {
        const manifestPath = path.join(DIST, name, 'manifest.json');
        if (!fs.existsSync(manifestPath)) return false;
        const manifest: unknown = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        return !!(
          manifest &&
          typeof manifest === 'object' &&
          'license' in manifest &&
          manifest.license === BUNDLED_EXTENSION_LICENSE
        );
      };
      expect(built.filter(declaresStampedLicense).length).toBeGreaterThan(0);
    });
  },
);
