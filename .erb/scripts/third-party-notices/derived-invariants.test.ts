import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it, vi } from 'vitest';
import { REQUIRED_BUNDLES } from './shipping-set';
import {
  ELECTRON_BUILDER,
  assertCopiedPlatformLibrariesRecorded,
  assertCopiedPlatformLibraryIdsAllowed,
  assertSnapStagePackagesClassified,
} from './main';
import { RIDS, copiedPlatformLibraryStems, readDirectPackageReferences } from './nuget-set';
import { STATIC_TREES, WHOLESALE_COPIED_EXTENSIONS } from './static-assets';
import { assertExternalExtensionsRecorded, externalExtensionFolders } from './external-extensions';
import { assertProductMatchesPackaging, readPackagingConfig } from './product';
import { assertSeparateProgramsRecorded } from './separate-programs';

const REPO = path.resolve(__dirname, '..', '..', '..');

/**
 * Invariants that are stated in one place and depended on in another, checked by DERIVING the
 * second from the first rather than restating it.
 *
 * A test that asserts a constant equals a copy of itself passes for exactly as long as someone
 * remembers to change both - which is the failure mode these invariants have, since none of them is
 * visible in the diff that breaks it.
 */

/** Every webpack config that could carry an `EmitShippedModulesPlugin`. */
const CONFIG_FILES = [
  ...fs
    .readdirSync(path.join(REPO, '.erb', 'configs'))
    .filter((name) => name.startsWith('webpack.config.') && name.endsWith('.ts'))
    .map((name) => path.join(REPO, '.erb', 'configs', name)),
  ...fs
    .readdirSync(path.join(REPO, 'extensions', 'webpack'))
    .filter((name) => name.startsWith('webpack.config.') && name.endsWith('.ts'))
    .map((name) => path.join(REPO, 'extensions', 'webpack', name)),
];

/**
 * Every webpack config `npm run build` actually runs, read from the BUILD SCRIPTS.
 *
 * This is the independent half of the invariant below, and it has to come from somewhere other than
 * the plugin registrations. Deriving the expected bundles by grepping for `new
 * EmitShippedModulesPlugin` would be a tautology in the one direction that matters: a sixth
 * production bundle added WITHOUT the plugin leaves both sides unchanged and passes - precisely the
 * mistake `REQUIRED_BUNDLES` exists to fail on. The build scripts know what ships; the configs'
 * plugin lists are what is being checked against them.
 *
 * `build` fans out through `concurrently` to `npm:build:*`; the webpack legs of that name their
 * config with `--config`, and `build:extensions` delegates to `extensions/webpack.config.ts`, whose
 * imports name the two extension configs.
 */
function builtWebpackConfigs(): string[] {
  const { scripts }: { scripts: Record<string, string> } = JSON.parse(
    fs.readFileSync(path.join(REPO, 'package.json'), 'utf8'),
  );
  const fannedOut = [...scripts.build.matchAll(/npm:(build:[\w-]+)/g)].map((match) => match[1]);
  const configs = fannedOut.flatMap((name) => {
    const flag = /--config\s+(\S+)/.exec(scripts[name] || '');
    return flag ? [path.resolve(REPO, flag[1])] : [];
  });

  // `build:extensions` runs bare `webpack`, which loads `extensions/webpack.config.ts` - an array
  // of the configs it imports, so the imports are the list.
  const extensionsEntry = path.join(REPO, 'extensions', 'webpack.config.ts');
  const extensionConfigs = [
    ...fs.readFileSync(extensionsEntry, 'utf8').matchAll(/from '(\.\/webpack\/[^']+)'/g),
  ].map((match) => path.resolve(path.dirname(extensionsEntry), `${match[1]}.ts`));

  return [...configs, ...extensionConfigs];
}

describe('REQUIRED_BUNDLES is derived from the build graph, not restated', () => {
  // `REQUIRED_BUNDLES` has to be checked against the build graph, not against a copy of itself:
  // adding a sixth production bundle without wiring the plugin AND without touching the array emits
  // no manifest, requires none, leaves every stamp agreeing and the floor unmoved, and exits 0 -
  // which is the exact mistake the list exists to fail on.
  const bundleNamesIn = (file: string) =>
    [
      ...fs
        .readFileSync(file, 'utf8')
        .matchAll(/new EmitShippedModulesPlugin\(\{\s*bundleName:\s*'([^']+)'/g),
    ].map((match) => match[1]);

  const built = builtWebpackConfigs();
  const declared = CONFIG_FILES.flatMap(bundleNamesIn).sort();

  it('runs a webpack config for every bundle, and every one of them emits a manifest', () => {
    // The direction the grep-only derivation could not see. Each config `npm run build` runs is a
    // bundle that SHIPS, so each has to write the manifest the notices generator unions - and a new
    // one that does not fails here rather than silently shortening a legal document.
    expect(built.length).toBeGreaterThan(0);
    const withoutPlugin = built.filter((file) => bundleNamesIn(file).length === 0);
    expect(withoutPlugin.map((file) => path.relative(REPO, file))).toEqual([]);
  });

  it('requires exactly the bundles the build graph produces', () => {
    expect(built.flatMap(bundleNamesIn).sort()).toEqual(REQUIRED_BUNDLES.slice().sort());
  });

  it('finds a bundleName for every config that instantiates the plugin', () => {
    // Guards the regex itself: if it stopped matching, every assertion below would compare two
    // empty sets and pass.
    expect(declared.length).toBeGreaterThan(0);
    const instantiations = CONFIG_FILES.flatMap((file) => [
      ...fs.readFileSync(file, 'utf8').matchAll(/new EmitShippedModulesPlugin\(/g),
    ]);
    expect(declared).toHaveLength(instantiations.length);
  });

  it('matches what the webpack configs actually emit', () => {
    expect(REQUIRED_BUNDLES.slice().sort()).toEqual(declared);
  });

  it('names each bundle exactly once', () => {
    // Two configs claiming one bundleName means the later compilation overwrites the earlier one's
    // manifest, and the union silently loses whatever the overwritten bundle reached.
    expect(new Set(declared).size).toBe(declared.length);
  });
});

describe('the extension-host config carries only its own plugin instance', () => {
  // This config merges the fully-constructed mainConfig, whose plugins array already holds an
  // instance bound to 'main'. Left in place it would also apply to this compiler, and
  // .notices/modules/main.json would be overwritten with the extension-host module graph - both
  // files present, non-empty, same buildId, cache cold, every guard green. What prevents it is an
  // `instanceof` filter inside a webpack-merge callback, which a merge-shape change (a different
  // key, plugins moved under `optimization`, a wrapped instance) can silently defeat.
  //
  // Both config modules run `checkNodeEnv('production')` and `deleteSourceMaps()` at import time,
  // and the second DELETES FILES - so importing one to inspect it has to neutralise them first.
  // They are mocked rather than the config being read as text, because the thing worth checking is
  // what the merge PRODUCES, which no amount of reading the source can establish.
  it('holds exactly one EmitShippedModulesPlugin, bound to extension-host', async () => {
    vi.resetModules();
    // Paths are resolved relative to THIS file, not to the config that imports them.
    vi.doMock('../check-node-env', () => ({ default: () => {} }));
    vi.doMock('../delete-source-maps', () => ({ default: () => {} }));

    const { EmitShippedModulesPlugin } = await import('../../configs/emit-shipped-modules-plugin');
    const { default: config } = await import('../../configs/webpack.config.extension-host.prod');

    const emitters = (config.plugins ?? []).filter(
      (plugin) => plugin instanceof EmitShippedModulesPlugin,
    );
    expect(emitters).toHaveLength(1);
    // Reading the private field the constructor stored: the bundleName is the whole point of the
    // instance, and there is no accessor for it.
    expect(emitters.map((plugin) => Reflect.get(plugin, 'options')?.bundleName)).toEqual([
      'extension-host',
    ]);

    vi.doUnmock('../check-node-env');
    vi.doUnmock('../delete-source-maps');
    vi.resetModules();
  });
});

describe('LICENSING.md agrees with what the packages declare', () => {
  // The document calls the runtime-linking boundary "load-bearing", and it is: getting a package's
  // side wrong makes the AGPL viral for third-party extension authors, or gives away a package that
  // was meant to stay AGPL. The table is prose, so nothing else would fail on a relicensing commit
  // that moved a package without moving its row.
  const licensing = fs.readFileSync(path.join(REPO, 'LICENSING.md'), 'utf8');

  const tabulated = [
    ...licensing.matchAll(/^\|\s*`([a-z0-9-]+)`\s*\|\s*(MIT|AGPL-3\.0-or-later)\s*\|/gm),
  ].map((match) => [match[1], match[2]]);

  it('tabulates every package under lib/', () => {
    const onDisk = fs
      .readdirSync(path.join(REPO, 'lib'))
      .filter((name) => fs.existsSync(path.join(REPO, 'lib', name, 'package.json')))
      .sort();
    expect(tabulated.map(([name]) => name).sort()).toEqual(onDisk);
  });

  it.each([
    ['browserslist-config-detect-electron'],
    ['eslint-plugin-paranext'],
    ['papi-dts'],
    ['platform-bible-react'],
    ['platform-bible-utils'],
  ])('%s declares the license the table records', (name) => {
    const row = tabulated.find(([tableName]) => tableName === name);
    expect(row).toBeDefined();
    const manifest = JSON.parse(
      fs.readFileSync(path.join(REPO, 'lib', name, 'package.json'), 'utf8'),
    );
    expect(manifest.license).toBe(row?.[1]);
  });

  it('supplies as a webpack external every package the table says is supplied as one', () => {
    // The MIT side of the rule rests on runtime linking, and for platform-bible-utils the mechanism
    // IS the externals list - the table says so in as many words. Dropping it from `externals` would
    // bundle it instead: the license answer is unchanged, but the table's stated reason would stop
    // describing what actually happens.
    const externals = fs.readFileSync(
      path.join(REPO, 'extensions', 'webpack', 'webpack.config.base.ts'),
      'utf8',
    );
    const suppliedByHost = [
      ...licensing.matchAll(
        /^\|\s*`([a-z0-9-]+)`[^|]*\|[^|]*\|[^|]*supplied by the host as a webpack external/gm,
      ),
    ].map((match) => match[1]);
    expect(suppliedByHost.length).toBeGreaterThan(0);
    suppliedByHost.forEach((name) => expect(externals).toContain(`'${name}'`));
  });
});

describe('the snap section is written from the policy, not from prose', () => {
  // The "Linux snap" section is generated from `snapStagePackages`, so every library the installer
  // stages is named in it by construction. Hand-written prose over the same list cannot be checked
  // against it: a staged library missing from a sentence is invisible in a diff, and so is the next
  // one added.
  const policy = JSON.parse(fs.readFileSync(path.join(__dirname, 'notices-policy.json'), 'utf8'));
  const staged = (() => {
    const text = fs.readFileSync(path.join(REPO, 'electron-builder.json5'), 'utf8');
    const block = /stagePackages:\s*\[(.*?)\]/s.exec(text);
    return [...(block?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1]);
  })();

  it('reads a non-empty staged set from electron-builder.json5', () => {
    // Otherwise every assertion below compares two empty sets and passes.
    expect(staged.length).toBeGreaterThan(0);
  });

  it('classifies every library the installer stages', () => {
    expect(() => assertSnapStagePackagesClassified(staged, policy.snapStagePackages)).not.toThrow();
  });

  it('refuses a staged library the policy does not classify', () => {
    expect(() =>
      assertSnapStagePackagesClassified([...staged, 'libnewthing1'], policy.snapStagePackages),
    ).toThrow(/libnewthing1/);
  });

  it('refuses a classification for a library no longer staged', () => {
    // A determination about something that is not shipped would be reproduced in the document as
    // though it were.
    expect(() =>
      assertSnapStagePackagesClassified(staged, {
        ...policy.snapStagePackages,
        libgone2: { classification: 'permissive' },
      }),
    ).toThrow(/libgone2/);
  });

  it('refuses an entry whose classification is not one of the three', () => {
    // The pinned `copyright` is kept: dropping it would trip the separate "no copyright file"
    // refusal first, and this case is about the classification value.
    const bent = {
      ...policy.snapStagePackages,
      [staged[0]]: { ...policy.snapStagePackages[staged[0]], classification: 'probably fine' },
    };
    expect(() => assertSnapStagePackagesClassified(staged, bent)).toThrow(/does not classify/);
  });
});

describe('the RID list matches the runtimes the build publishes for', () => {
  // `RIDS` decides how many `dotnet restore` passes the NuGet closure is unioned from. A publish
  // target added to the build scripts and not here produces a document narrower than what ships,
  // with no new restore, no warning and no count that reveals the loss.
  const published = (() => {
    const { scripts }: { scripts: Record<string, string> } = JSON.parse(
      fs.readFileSync(path.join(REPO, 'package.json'), 'utf8'),
    );
    return [
      ...new Set(
        Object.entries(scripts)
          .filter(([name]) => name.startsWith('build:data-release:'))
          .flatMap(([, command]) => [...command.matchAll(/-r\s+(\S+)/g)].map((match) => match[1])),
      ),
    ].sort();
  })();

  it('reads a non-empty published set from the build scripts', () => {
    // Otherwise the comparison below is two empty sets.
    expect(published.length).toBeGreaterThan(0);
  });

  it('publishes for exactly the runtimes the NuGet closure is collected for', () => {
    expect(published).toEqual(RIDS.slice().sort());
  });
});

describe('the packed static trees match what webpack copies', () => {
  // `STATIC_TREES` and `WHOLESALE_COPIED_EXTENSIONS` restate `webpack.util.ts`'s copy rules. A
  // fourth copied directory added there and not here ships a third-party attribution file that no
  // gate reads - the failure `static-assets.ts` exists to prevent, arrived at from the other side.
  const util = fs.readFileSync(path.join(REPO, 'extensions', 'webpack', 'webpack.util.ts'), 'utf8');

  /** The `from` of every `staticFiles` entry copied as a DIRECTORY rather than as a named file. */
  const copiedTrees = (() => {
    const block = /const staticFiles:[\s\S]*?\}\[\] = \[([\s\S]*?)\n\];/.exec(util);
    if (!block) throw new Error('could not find the staticFiles list in webpack.util.ts');
    return [...block[1].matchAll(/\{[^{}]*\}/g)]
      .map((match) => match[0])
      .filter((entry) => !entry.includes("toType: 'file'"))
      .flatMap((entry) => {
        const from = /from: '([^']+)'/.exec(entry);
        // A `from` carrying an extension or a `<placeholder>` names one file, not a tree.
        return from && !from[1].includes('.') && !from[1].includes('<') ? [from[1]] : [];
      })
      .sort();
  })();

  const notBundled = (() => {
    const declaration = /const extensionsNotBundled: string\[\] = \[([^\]]*)\]/.exec(util);
    if (!declaration) throw new Error('could not find extensionsNotBundled in webpack.util.ts');
    return [...declaration[1].matchAll(/'([^']+)'/g)].map((match) => match[1]).sort();
  })();

  it('reads a non-empty copy list from webpack.util.ts', () => {
    // Both regexes above are the kind that stops matching after an unrelated reformat, and two
    // empty sets compare equal.
    expect(copiedTrees.length).toBeGreaterThan(0);
    expect(notBundled.length).toBeGreaterThan(0);
  });

  it('scans exactly the trees copy-webpack-plugin copies wholesale', () => {
    expect(copiedTrees).toEqual(STATIC_TREES.slice().sort());
  });

  it('scans the whole source directory of exactly the extensions webpack does not bundle', () => {
    expect(notBundled).toEqual(WHOLESALE_COPIED_EXTENSIONS.slice().sort());
  });
});

describe('every copied platform library names terms the corpus can reproduce', () => {
  // The document reproduces the CANONICAL text of each identifier on the library's behalf, and the
  // corpus index holds exactly the identifiers a verdict can reach - which `allowed` drives and this
  // table does not. An identifier here and nowhere else would leave the section stating an
  // obligation and reproducing nothing.
  const policy = JSON.parse(fs.readFileSync(path.join(__dirname, 'notices-policy.json'), 'utf8'));

  it('reads a non-empty table from the shipped policy', () => {
    // Otherwise the case below asserts nothing.
    expect(Object.keys(policy.copiedPlatformLibraries)).not.toHaveLength(0);
  });

  it('accepts the shipped policy', () => {
    expect(() => assertCopiedPlatformLibraryIdsAllowed(policy)).not.toThrow();
  });

  it('accepts the shipped policy against the copy rules the project actually states', () => {
    expect(() =>
      assertCopiedPlatformLibrariesRecorded(policy, copiedPlatformLibraryStems()),
    ).not.toThrow();
  });

  // The direction the staleness report cannot cover, and the one with a consequence: a stale entry
  // over-describes, a missing one means a native library reaches every installer with nothing in
  // the document saying so and no other gate able to see it.
  it('refuses a copy rule that no policy entry discloses', () => {
    expect(() => assertCopiedPlatformLibrariesRecorded(policy, ['libicu', 'libfoo'])).toThrow(
      /libfoo/,
    );
  });

  it('refuses an identifier that is not on the allow list', () => {
    expect(() =>
      assertCopiedPlatformLibraryIdsAllowed({
        ...policy,
        copiedPlatformLibraries: {
          'libsomething (Linux)': {
            platforms: 'Linux',
            copiedBy: 'a csproj Content rule',
            spdx: ['NotAnAllowedIdentifier'],
            reason: 'x',
          },
        },
      }),
    ).toThrow(/NotAnAllowedIdentifier/);
  });
});

describe('this repository ships none of the downstream-product instruments', () => {
  // The three instruments the downstream overlay drives are all OFF here, and each is off by being
  // EMPTY rather than by being absent from the code path - so a value that arrives in the committed
  // policy by accident (a merge, a copied entry, a rebase) changes what this repository's own
  // document says about itself. Checked against the real policy and the real packaging config
  // because that pair is what a build reads; asserting the shapes alone would pass on either one
  // having moved.
  const policy = JSON.parse(fs.readFileSync(path.join(__dirname, 'notices-policy.json'), 'utf8'));
  const config = readPackagingConfig(ELECTRON_BUILDER);

  it('declares no product block, so the document keeps its reference wording', () => {
    expect(policy.product).toBeUndefined();
  });

  it('records no separate programs and no external extensions', () => {
    expect(policy.separatePrograms).toEqual({});
    expect(policy.externalExtensions).toEqual({});
  });

  it('maps no folder other than its own extensions/dist into ./extensions', () => {
    expect(externalExtensionFolders(config)).toEqual([]);
  });

  it('accepts the shipped policy against the shipped packaging config', () => {
    expect(() =>
      assertExternalExtensionsRecorded([], policy.externalExtensions || {}),
    ).not.toThrow();
    expect(() => assertSeparateProgramsRecorded(REPO, policy.separatePrograms || {})).not.toThrow();
    expect(() =>
      assertProductMatchesPackaging(policy.product, config, 'electron-builder.json5'),
    ).not.toThrow();
  });
});

describe('the two Microsoft compatibility shims contribute nothing to the derived closure', () => {
  // LICENSING.md records the determination: neither package's assembly reaches the publish output,
  // so neither may contribute one - a package that DID would carry the pre-MIT "Excluded License"
  // clause into the derived closure and therefore into THIRD-PARTY-NOTICES.md, raising a question
  // nobody has answered. The `System.Net.Http` reference exists precisely to say "no assets":
  // `SIL.Core` pulls it in transitively, and without the exclusion the restore assets file resolves
  // its netstandard1.6 assembly even though publish discards it.
  const SHIMS = ['System.Net.Http', 'System.Net.WebSockets'];

  // The CLOSURE, not the declaration. The invariant is that neither assembly ships, and a shim the
  // csproj does not name at all satisfies that as fully as one referenced with `ExcludeAssets`. A
  // check that only iterated the declared references therefore asserts NOTHING about a shim nobody
  // declares - it passes by finding no reference to look at. `THIRD-PARTY-NOTICES.lock.json` is the
  // committed record of what a real restore produced, which is exactly the set at issue.
  const lock = JSON.parse(
    fs.readFileSync(path.join(REPO, 'THIRD-PARTY-NOTICES.lock.json'), 'utf8'),
  );
  const closure = new Set<string>(
    lock.packages
      .filter((row: { ecosystem: string }) => row.ecosystem === 'nuget')
      .map((row: { name: string }) => row.name.toLowerCase()),
  );

  it('reads a non-empty NuGet closure from the committed lock', () => {
    // Otherwise the cases below assert nothing, which is the failure they exist to correct.
    expect(closure.size).toBeGreaterThan(0);
  });

  it.each(SHIMS)('keeps %s out of the notices document entirely', (id) => {
    expect(closure.has(id.toLowerCase())).toBe(false);
  });

  it.each(SHIMS)('excludes the assets of %s wherever the project does declare it', (id) => {
    // The mechanism that keeps the closure clean where the reference exists at all, checked so that
    // deleting `ExcludeAssets="all"` fails here rather than only on the next regeneration.
    readDirectPackageReferences()
      .filter((reference) => reference.id.toLowerCase() === id.toLowerCase())
      .forEach((reference) => expect(reference.shipsRuntimeAssets).toBe(false));
  });
});

describe('the Terms of Service document is spelled the same in all three places', () => {
  // Three independent spellings of one filename, with nothing tying them together:
  // `terms-of-service-window.ts` opens it, `electron-builder.json5` packs it into `resources/`, and
  // `release/app/package.json` declares the application licensed under it. `resolveLicenseDisplay`
  // maps that declaration to a display
  // string by prefix and discards the filename, so a rename passes every other test in the tree
  // while leaving the About dialog opening a file that is not there.
  const NAME_FROM_MANIFEST = /"license"\s*:\s*"SEE LICENSE IN ([^"]+)"/;

  const manifest = fs.readFileSync(path.join(REPO, 'release', 'app', 'package.json'), 'utf8');
  const declared = NAME_FROM_MANIFEST.exec(manifest)?.[1];

  it('declares the application licensed under a named document', () => {
    // Otherwise every case below compares against `undefined` and passes on absence.
    expect(declared).toBeDefined();
  });

  it('ships that exact document in the repository', () => {
    expect(fs.existsSync(path.join(REPO, declared ?? ''))).toBe(true);
  });

  it('packs it into the installer as extraResources', () => {
    const builder = fs.readFileSync(path.join(REPO, 'electron-builder.json5'), 'utf8');
    expect(builder).toContain(`'./${declared}'`);
  });

  it("records that name in release/app's lockfile", () => {
    // npm copies the root package's `license` into `packages[""]` of the lockfile and rewrites it
    // on install, so a rename that misses the lockfile passes every test here and fails CI's
    // changed-files check after the build instead.
    const lockfile: unknown = JSON.parse(
      fs.readFileSync(path.join(REPO, 'release', 'app', 'package-lock.json'), 'utf8'),
    );
    /** A property of an unknown value, narrowed rather than asserted */
    const field = (value: unknown, key: string): unknown =>
      value && typeof value === 'object' && key in value ? value[key] : undefined;
    expect(field(field(field(lockfile, 'packages'), ''), 'license')).toBe(
      `SEE LICENSE IN ${declared}`,
    );
  });

  it('opens that name from the main process', () => {
    const opener = fs.readFileSync(
      path.join(REPO, 'src', 'main', 'terms-of-service-window.ts'),
      'utf8',
    );
    expect(opener).toContain(`TERMS_OF_SERVICE_FILE_NAME = '${declared}'`);
  });
});

describe('the Terms of Service document keeps the properties its window relies on', () => {
  // The window shows this document and nothing else: `terms-of-service-window.ts` denies every
  // window-open and prevents every navigation, handing the URL to main's `openExternal` instead,
  // which admits only `https:`, `mailto:` and the application's own scheme. The document is
  // hand-regenerated and prettier-ignored, so a dropped CSP or a reintroduced `http://` link would
  // surface as a link that silently does nothing when a reader clicks it - the file's own header
  // comment asks a regenerator to keep both, and this is what holds them to it.
  //
  // Derived from the manifest's filename, like the block above, so a rename cannot leave this
  // checking a document the application no longer ships.
  const NAME_FROM_MANIFEST = /"license"\s*:\s*"SEE LICENSE IN ([^"]+)"/;
  const manifest = fs.readFileSync(path.join(REPO, 'release', 'app', 'package.json'), 'utf8');
  const declared = NAME_FROM_MANIFEST.exec(manifest)?.[1];
  // Thrown rather than defaulted to `''`: this runs at describe scope, so `path.join(REPO, '')` is
  // the repository directory and `readFileSync` on it fails the whole FILE with an EISDIR at
  // collection - one assertion's worth of drift taking out every test here, with a message about
  // the wrong thing. If the manifest stops declaring a license the block above is what says so.
  if (!declared) throw new Error('release/app/package.json declares no "SEE LICENSE IN <file>"');
  const document = fs.readFileSync(path.join(REPO, declared), 'utf8');

  /**
   * Every `href` the document carries, however it is quoted.
   *
   * Deliberately broader than the schemes under test: it matches the attribute rather than the
   * values expected to be there, so a link spelled in a way this file has not seen before is a
   * failure to look at rather than a line the pattern skips. It does not match an unquoted
   * attribute value, which the generated document does not produce.
   */
  const hrefs = [...document.matchAll(/href\s*=\s*["']([^"']*)["']/gi)].map((match) => match[1]);

  it('carries links at all, so the cases below are not passing on an empty set', () => {
    expect(hrefs.length).toBeGreaterThan(0);
  });

  it('declares a Content-Security-Policy that denies every default source', () => {
    expect(document).toMatch(/<meta[^>]+http-equiv\s*=\s*["']Content-Security-Policy["'][^>]*>/i);
    expect(document).toContain("default-src 'none'");
    // Both halves of the policy the document's own header asks a regenerator to keep. `default-src
    // 'none'` blocks the inline <style> too, so a regeneration that emitted the first directive
    // alone would pass every other assertion here and ship this document as unstyled black-on-white
    // text in a 900px window - with no console the reader can see.
    expect(document).toContain("style-src 'unsafe-inline'");
  });

  it('leaves the application only through a scheme openExternal admits', () => {
    // A fragment stays in the document - Electron fires no `will-navigate` for a same-document
    // navigation - so a table of contents remains open to the document's authors. Anything else,
    // including a relative path to another file, is a link this window cannot follow.
    const unreachable = hrefs.filter(
      (href) => !/^https:\/\//i.test(href) && !/^mailto:/i.test(href) && !href.startsWith('#'),
    );
    expect(unreachable).toEqual([]);
  });
});
