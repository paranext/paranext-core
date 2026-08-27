import * as fs from 'fs';
import * as path from 'path';
import JSON5 from 'json5';
import { describe, expect, it } from 'vitest';
import { extensionCacheDirectory } from '../../../extensions/webpack/webpack.util';

const REPO = path.resolve(__dirname, '..', '..', '..');
const config = JSON5.parse(fs.readFileSync(path.join(REPO, 'electron-builder.json5'), 'utf8'));

const extraResources: unknown[] = config.extraResources || [];

// A narrowing helper rather than `(r as { from: string }).from`: this repo bans type assertions
// (`no-type-assertion/no-type-assertion`) and does not exempt test files.
function resourcePath(entry: unknown): string {
  if (typeof entry === 'string') return entry;
  if (entry && typeof entry === 'object' && 'from' in entry && typeof entry.from === 'string')
    return entry.from;
  return '';
}

const asStrings = extraResources.map(resourcePath);

describe('electron-builder packaging', () => {
  it('ships THIRD-PARTY-NOTICES.md', () => {
    // Third-party attribution obligations apply to the binary regardless of the terms it ships
    // under, so the notices travel with the installer rather than living only in the repository.
    expect(asStrings.some((r) => r.includes('THIRD-PARTY-NOTICES.md'))).toBe(true);
  });

  it('ships LICENSE', () => {
    // The file itself, not a substring: `includes('LICENSE')` is satisfied by anything whose path
    // merely contains the word, so the assertion below cannot be met by a different file that
    // happens to be named for it.
    expect(asStrings.some((r) => /(^|\/)LICENSE$/.test(r))).toBe(true);
  });

  it('ships LICENSING.md, which reconciles the two rights statements in the installer', () => {
    // `resources/LICENSE` is the AGPL text; the application itself is licensed to the user under
    // the Terms of Service. Both are accurate about different things - the SOURCE and the BINARY -
    // and LICENSING.md is the only place that says which applies to what.
    // Without it a user has two contradictory-looking statements and nothing to resolve them.
    // Its own case because it is its own file: it is NOT matched by the LICENSE assertion above
    // ('LICENSING.md'.includes('LICENSE') is false), so shipping one is no evidence of the other.
    expect(asStrings.some((r) => r.includes('LICENSING.md'))).toBe(true);
  });

  it("ships TERMS-OF-SERVICE.md, which the binary's declared license points at", () => {
    // `release/app/package.json` declares `SEE LICENSE IN TERMS-OF-SERVICE.md`. That declaration is
    // only meaningful if the file travels with the binary, and it is the terms the application is
    // actually licensed to the user under - so it has to be packed, not merely present in the repo.
    expect(asStrings.some((r) => r.includes('TERMS-OF-SERVICE.md'))).toBe(true);
    const releaseApp = JSON.parse(
      fs.readFileSync(path.join(REPO, 'release', 'app', 'package.json'), 'utf8'),
    );
    expect(releaseApp.license).toBe('SEE LICENSE IN TERMS-OF-SERVICE.md');
    expect(fs.existsSync(path.join(REPO, 'TERMS-OF-SERVICE.md'))).toBe(true);
  });

  it('ships LICENSE-EXCEPTION.md, which modifies the license text beside it', () => {
    // An additional permission under AGPL section 7 is part of the license a recipient received,
    // not a repository-only document: someone who takes the binary and goes on to build an
    // extension has to be able to read the grant from what they were given.
    expect(asStrings.some((r) => r.includes('LICENSE-EXCEPTION.md'))).toBe(true);
    expect(fs.existsSync(path.join(REPO, 'LICENSE-EXCEPTION.md'))).toBe(true);
  });

  it('does not configure an installer EULA', () => {
    // nsis.license / dmg license is a DIFFERENT artifact - an end-user license shown during
    // install - and acceptance of the Terms of Service happens at account creation instead (Terms
    // section 1). Adding one here would gate installation on a document the user accepts elsewhere.
    // Windows AND macOS both, since each has its own key: checking one would leave the other free to
    // configure a EULA with this test still green.
    expect(config.nsis?.license).toBeUndefined();
    expect(config.dmg?.license).toBeUndefined();
  });

  it('leaves no license file where electron-builder would auto-detect one as the EULA', () => {
    // The config keys above are not the only way an installer EULA appears. electron-builder ALSO
    // picks one up by CONVENTION, from a `license.txt`/`.rtf`/`.html` (or a localized
    // `license_<lang>.*`) in `directories.buildResources` - with no config key involved at all. So
    // the two assertions above would stay green while every Windows and macOS installer showed a
    // click-through license, which is not how this application's terms are accepted.
    // Checked against the configured buildResources directory rather than a hardcoded 'assets', so
    // moving that directory cannot move the check off the folder it is about.
    const buildResources = path.join(REPO, config.directories?.buildResources || 'build');
    const autoDetected = fs.existsSync(buildResources)
      ? fs
          .readdirSync(buildResources)
          .filter((name) => /^license(_[a-z-]+)?\.(txt|rtf|html)$/i.test(name))
      : [];
    expect(autoDetected).toEqual([]);
  });
});

describe('where the per-platform notices check may run', () => {
  // `--verify-shipping-set` reads the module manifests webpack wrote, and a manifest written over a
  // WARM webpack cache can be short (a module restored from cache does not re-run its loaders - see
  // `isWarmFilesystemCache`). It is therefore only meaningful straight after a build whose cache was
  // cold, and it REFUSES to answer otherwise.
  //
  // It must verify the graph the job PACKAGES. A release job builds development extensions
  // (`npm run build`) and then production ones from the same commit, so it belongs AFTER the
  // production build - between the two it would verify a graph that never ships. That ordering is
  // only cold because `extensionCacheDirectory` gives each bundle its own directory per mode.
  //
  // The `package` script cannot host it at all: its build is by construction a rebuild - CI's
  // `check packaging` step runs `npm run package` after the job has already built once - so the
  // caches are warm and the shipping-set half would fail on every leg. It runs `--verify-document`
  // instead, which compares two committed files and reads no manifest, so no cache state can stop
  // it answering - and the document is what electron-builder packs.
  //
  // Neither placement is visible in a diff, and the release one would only fail at release time, so
  // both are pinned here.
  const script = (name: string) => {
    const manifest = JSON.parse(fs.readFileSync(path.join(REPO, 'package.json'), 'utf8'));
    return String(manifest.scripts[name] ?? '');
  };
  const workflow = (name: string) =>
    fs.readFileSync(path.join(REPO, '.github', 'workflows', name), 'utf8');

  it('is not run by the package script, whose build is always a rebuild', () => {
    expect(script('package')).toContain('electron-builder');
    expect(script('package')).not.toContain('verify:third-party-notices:shipping-set');
  });

  it('checks the document itself before packaging it, which no cache state can prevent', () => {
    // THIRD-PARTY-NOTICES.md is in `extraResources`, so `npm run package` embeds it into every
    // installer. The shipping-set half cannot run here (warm caches), but `--verify-document`
    // can, so this path is checked by that one rather than left unchecked. It has to run BEFORE
    // electron-builder, or it verifies a file that has already been packaged.
    const packageScript = script('package');
    expect(packageScript).toContain('verify:third-party-notices:document');
    expect(packageScript.indexOf('verify:third-party-notices:document')).toBeLessThan(
      packageScript.indexOf('electron-builder'),
    );
  });

  it.each(['publish.yml', 'package-main.yml'])(
    'runs after the production extension build in %s, so it verifies what is packaged',
    (name) => {
      const text = workflow(name);
      const check = text.indexOf('npm run verify:third-party-notices:shipping-set');
      const productionExtensions = text.indexOf('npm run build:extensions:production');
      // Both present, or this asserts nothing: a workflow that stopped running either step would
      // otherwise pass on two -1s.
      expect(check).toBeGreaterThan(-1);
      expect(productionExtensions).toBeGreaterThan(-1);
      expect(check).toBeGreaterThan(productionExtensions);
    },
  );

  // The ordering above is only safe because each extension bundle gets its own cache directory,
  // per bundle AND per mode. Sharing one across modes leaves the production build's manifests warm
  // after the development build; sharing one across bundles stamps `extension-main` warm on a cold
  // build, because it starts only after `extension-web-view` has written its entries.
  it('gives each extension bundle its own cache directory, per bundle and per mode', () => {
    const nodeEnv = process.env.NODE_ENV;
    try {
      process.env.NODE_ENV = 'development';
      const devMain = extensionCacheDirectory('main');
      const devWebView = extensionCacheDirectory('web-view');
      process.env.NODE_ENV = 'production';
      const prodMain = extensionCacheDirectory('main');
      expect(new Set([devMain, devWebView, prodMain]).size).toBe(3);
    } finally {
      process.env.NODE_ENV = nodeEnv;
    }
  });

  it('is the directory both extension configs actually cache in', () => {
    ['webpack.config.main.ts', 'webpack.config.web-view.ts'].forEach((configFile) => {
      const text = fs.readFileSync(path.join(REPO, 'extensions', 'webpack', configFile), 'utf8');
      // Either import style is fine; what this pins is that the config caches in the directory
      // `extensionCacheDirectory` hands out, not one webpack picked. `web-view` reaches it through a
      // namespace import so that its paranext-core-only import stays outside the shared region.
      expect(text).toMatch(/cacheDirectory: (?:\w+\.)?extensionCacheDirectory\(/);
    });
  });
});

describe('the notices gate every pull request has to pass', () => {
  // `test.yml` is the only workflow a pull request runs, so these three steps ARE the gate for
  // anything that is not a release: `publish.yml` and `package-main.yml` run at release time, and
  // `npm run package` only ever sees the already-committed document. Nothing else in the repository
  // references them, so deleting any one of them leaves every other test here green while the check
  // it carried is simply gone.
  //
  // Read as text and cut on the `- name:` lines - the same way the release-ordering cases above
  // read `publish.yml`. Each step's `if:` is read from INSIDE its own block, because two of the
  // three are deliberately confined to one leg of the OS matrix: a step that quietly moved legs
  // would still satisfy a condition matched anywhere in the file.
  const testWorkflow = fs.readFileSync(path.join(REPO, '.github', 'workflows', 'test.yml'), 'utf8');
  const stepMarker = '\n      - name: ';
  const startOf = (name: string) => testWorkflow.indexOf(`${stepMarker}${name}\n`);
  const step = (name: string) => {
    const at = startOf(name);
    if (at === -1) return '';
    const body = testWorkflow.slice(at + stepMarker.length + name.length);
    const next = body.indexOf(stepMarker);
    return next === -1 ? body : body.slice(0, next);
  };

  // Carries the explanation into the COMPARED VALUE. `expect(value, message)` is unavailable here -
  // `vitest/valid-expect` allows one argument - and an explanation that lives only in a comment is
  // not printed by the run that fails, which is the one moment it is needed. Collected into a list
  // so one case can state every way it broke rather than only the first.
  const unless = (holds: boolean, whatDeletingItCosts: string) =>
    holds ? [] : [whatDeletingItCosts];

  it('runs the full check on the Linux leg, where the whole gate lives', () => {
    const full = step('verify third-party notices against the committed lock');
    expect([
      ...unless(
        // Anchored, or `:shipping-set` below would satisfy it.
        /^ *run: npm run verify:third-party-notices$/m.test(full),
        'test.yml no longer runs `npm run verify:third-party-notices`. That step is the only place ' +
          '`classify` and the strong-copyleft block run on a pull request, and the only ' +
          'byte-for-byte comparison of THIRD-PARTY-NOTICES.md against what this tree derives - so ' +
          'without it a hand-edited document, a license text that changed under an unchanged ' +
          'name@version, and a newly copyleft dependency would each merge green.',
      ),
      ...unless(
        full.includes('matrix.os == env.OS_LINUX'),
        'the full notices check is no longer confined to the Linux leg. It needs Ruby and the ' +
          'four-RID dotnet restore, which the Windows and macOS legs install neither of, and the ' +
          'NuGet section is RID-dependent - so exactly one leg has to be canonical or the three ' +
          'would each derive a different document.',
      ),
    ]).toEqual([]);
  });

  it("checks each other platform's own npm shipping set, which Linux cannot answer for", () => {
    const perPlatform = step('verify npm shipping set matches this platform');
    expect([
      ...unless(
        perPlatform.includes('npm run verify:third-party-notices:shipping-set'),
        'test.yml no longer runs `npm run verify:third-party-notices:shipping-set`. npm installs ' +
          'an optional dependency only where its os/cpu constraints match, so the npm closure is ' +
          'the one part of the document the Linux leg cannot answer for - and this is the only ' +
          'notices check the Windows and macOS legs run at all: without it a package that ships ' +
          'only on those platforms could reach their installers with no row in the document those ' +
          'installers carry.',
      ),
      ...unless(
        perPlatform.includes('matrix.os != env.OS_LINUX'),
        'the per-platform shipping-set check is no longer confined to the non-Linux legs. On ' +
          'Linux it would only repeat, more cheaply and far less completely, what the full check ' +
          'above has already established.',
      ),
    ]).toEqual([]);
  });

  it('builds the extensions the installers carry, on every leg', () => {
    const production = step('Build extensions for production');
    expect([
      ...unless(
        production.includes('npm run build:extensions:production'),
        'test.yml no longer runs `npm run build:extensions:production`. `npm run build` leaves its ' +
          'extensions leg in DEVELOPMENT mode, and `collectShippedPackages` refuses a manifest set ' +
          'that mixes webpack modes - so both notices checks would fail on the mismatch rather ' +
          'than describe the graph the installers actually carry.',
      ),
      ...unless(
        !/^ *if:/m.test(production),
        'the production extension build was confined to one leg of the OS matrix. Every leg runs ' +
          'a notices check that reads the manifests it writes, so every leg has to write them.',
      ),
    ]).toEqual([]);
  });

  it('builds them BEFORE both checks, so neither verifies a graph that never ships', () => {
    const production = startOf('Build extensions for production');
    const full = startOf('verify third-party notices against the committed lock');
    const perPlatform = startOf('verify npm shipping set matches this platform');
    // All three present, or this asserts nothing: a workflow that dropped one would otherwise pass
    // on a comparison between two -1s. The cases above are what report WHICH one went missing.
    expect(Math.min(production, full, perPlatform)).toBeGreaterThan(-1);
    expect(full).toBeGreaterThan(production);
    expect(perPlatform).toBeGreaterThan(production);
  });
});
