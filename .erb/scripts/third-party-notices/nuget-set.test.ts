import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  mergeRidResults,
  DOTNET_MIN_PACKAGES,
  assertFloor,
  attachLicenseFiles,
  isFrameworkPackage,
  missingDirectReferences,
  parsePackageFolders,
  resolvePackageDir,
  parseShippingSet,
  assertClosureCoversShippingSet,
  normalizeValidationErrors,
  readDirectPackageReferences,
} from './nuget-set';

/**
 * Registers tsx in the child, so it can `require` this pipeline's `.ts` modules.
 *
 * The same loader `npm run build:third-party-notices` runs the generator with, so what these cases
 * drive is the shipped entry point rather than a separately compiled copy of it.
 */
const TSX = ['--import', 'tsx'];

// nuget-license's real ValidationErrors shape is `{ Error, Context }[]`, not `string[]` - Context
// is the absolute project path, the same for every entry in a single-project run. See
// normalizeValidationErrors, which strips it down to the string policy.ts's contract expects.
const validationError = (message: string) => ({
  Error: message,
  Context: '/home/lyonsm/paranext-core/c-sharp/ParanextDataProvider.csproj',
});

const pkg = (
  PackageId: string,
  License: string | null,
  LicenseInformationOrigin = 0,
  ValidationErrors: { Error: string; Context: string }[] = [],
) => ({
  PackageId,
  PackageVersion: '1.0.0',
  License,
  // nuget-license's JSON output represents an absent field as null (this fixture mirrors the CLI's
  // actual output shape, not application data), so the fixture must use null rather than undefined
  // to stay faithful to what mergeRidResults really receives.
  // eslint-disable-next-line no-null/no-null
  LicenseUrl: null,
  // Same as LicenseUrl above: nuget-license reports an absent Copyright as null.
  // eslint-disable-next-line no-null/no-null
  Copyright: null,
  LicenseInformationOrigin,
  ValidationErrors,
});

describe('mergeRidResults', () => {
  it('unions packages across runtime identifiers', () => {
    // nuget-license reads project.assets.json from the LAST restore, so each RID is a separate
    // restore-then-run pair. Windows-only packages exist in no other RID's result.
    const merged = mergeRidResults([
      { rid: 'linux-x64', packages: [pkg('Common', 'MIT')] },
      { rid: 'win-x64', packages: [pkg('Common', 'MIT'), pkg('WindowsOnly', 'MIT')] },
    ]);
    expect(merged.map((p) => p.name).sort()).toEqual(['Common', 'WindowsOnly']);
  });

  it('records which runtime identifiers each package came from', () => {
    const merged = mergeRidResults([
      { rid: 'linux-x64', packages: [pkg('Common', 'MIT')] },
      { rid: 'win-x64', packages: [pkg('Common', 'MIT'), pkg('WindowsOnly', 'MIT')] },
    ]);
    // Optional chaining rather than `!`: the non-null assertion operator is banned by
    // `no-type-assertion/no-type-assertion`. `undefined` fails the assertion just as loudly.
    expect(merged.find((p) => p.name === 'WindowsOnly')?.rids).toEqual(['win-x64']);
    expect(merged.find((p) => p.name === 'Common')?.rids).toEqual(['linux-x64', 'win-x64']);
  });

  it('keeps distinct versions of the same package separate', () => {
    const merged = mergeRidResults([
      { rid: 'linux-x64', packages: [{ ...pkg('P', 'MIT'), PackageVersion: '1.0.0' }] },
      { rid: 'win-x64', packages: [{ ...pkg('P', 'MIT'), PackageVersion: '2.0.0' }] },
    ]);
    expect(merged).toHaveLength(2);
  });

  it('orders by byte comparison and NUMERIC version, not ICU collation', () => {
    // `compare.ts` exists because this pipeline's output is committed and byte-compared: ICU
    // collation varies with the machine's locale and with the ICU version Node was built against,
    // and both `localeCompare` and plain string order put '10.0.0' before '9.0.0'. NuGet versions
    // run to four components and really do cross 9 to 10 here (ParatextData is at 9.5.0.24), so
    // this term is exercised in production. `render.ts` re-sorts before anything is written, so
    // this ordering is not what the artifact rests on - but nothing else pinned it either.
    const merged = mergeRidResults([
      {
        rid: 'linux-x64',
        packages: [
          { ...pkg('P', 'MIT'), PackageVersion: '10.0.0' },
          { ...pkg('P', 'MIT'), PackageVersion: '9.0.0' },
        ],
      },
    ]);
    expect(merged.map((p) => p.version)).toEqual(['9.0.0', '10.0.0']);
  });

  it('carries LicenseInformationOrigin Unknown through as an undeclared license', () => {
    // Origin 2 means nuget-license could not establish the license. It must not become a
    // permissive result; policy.ts blocks on an undeclared field with no text. nuget-license
    // reports an unresolved License as null, not undefined, so the fixture must match that shape.
    // eslint-disable-next-line no-null/no-null
    const [merged] = mergeRidResults([{ rid: 'linux-x64', packages: [pkg('P', null, 2)] }]);
    expect(merged.declaredField).toBeUndefined();
  });

  it('carries validation errors through as readable strings, not the raw {Error, Context} shape', () => {
    const [merged] = mergeRidResults([
      {
        rid: 'linux-x64',
        packages: [pkg('P', 'MIT', 0, [validationError('could not resolve license url')])],
      },
    ]);
    // Not `[object Object]`: this is the one path where the message IS the entire value of the
    // tool, so a raw object stringifying uselessly would defeat the whole point of carrying it.
    expect(merged.validationErrors).toEqual(['could not resolve license url']);
  });

  it('carries the assemblies collectNugetPackages attached from the shipping filter', () => {
    const withAssemblies = {
      ...pkg('SharpZipLib', 'MIT'),
      Assemblies: ['ICSharpCode.SharpZipLib.dll'],
    };
    const [merged] = mergeRidResults([{ rid: 'linux-x64', packages: [withAssemblies] }]);
    expect(merged.assemblies).toEqual(['ICSharpCode.SharpZipLib.dll']);
  });

  it('defaults assemblies to an empty array when the caller did not attach any', () => {
    const [merged] = mergeRidResults([{ rid: 'linux-x64', packages: [pkg('P', 'MIT')] }]);
    expect(merged.assemblies).toEqual([]);
  });
});

describe('assertFloor', () => {
  it('throws when the closure is implausibly small', () => {
    // A believable restore closure for the data provider is well over a hundred packages. Anything
    // near the eight direct PackageReference entries means the assets file is stale or partial, and
    // a short .NET section is precisely the failure this generator exists to prevent.
    expect(() => assertFloor(new Array(5).fill(pkg('P', 'MIT')))).toThrow(/at least 40/);
  });

  it('accepts a plausible closure', () => {
    expect(() => assertFloor(new Array(DOTNET_MIN_PACKAGES).fill(pkg('P', 'MIT')))).not.toThrow();
  });

  it('names the scope when one is given, so a per-RID failure says which RID', () => {
    expect(() => assertFloor([], 'win-x64')).toThrow(/closure for win-x64 has 0 packages/);
    expect(() => assertFloor([])).toThrow(/^NuGet closure has 0 packages/);
  });
});

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');

describe('collectNugetPackages checks each RID before merging them', () => {
  // `assertFloor` on the post-merge union alone CANNOT see a partial or empty result for one RID:
  // the other three keep the union far above the floor, and the only thing lost is that RID's
  // UNIQUE packages - the six Windows-only shims `win-x64` alone contributes, which is the entire
  // reason the four-RID union exists (`adr-notices-derived-from-what-ships`). Silently, with a
  // healthy-looking count.
  //
  // Driven in a child process because `nuget-set.ts` destructures `execFileSync` at module load, so
  // the fakes have to be in place BEFORE it is required - the same technique degradation.test.ts
  // uses for `bundle exec ruby`. `dotnet` is never invoked; the only thing faked is the two shell
  // calls and the one file (`project.assets.json`) they would have produced.
  const SHORT_RID = 'win-x64';

  function runCollect(shortRidCount: number) {
    const script = `
      const cp = require('child_process');
      const fs = require('fs');
      const path = require('path');
      const REPO = ${JSON.stringify(path.resolve(__dirname, '..', '..', '..'))};
      const ASSETS = path.join(REPO, 'c-sharp', 'obj', 'project.assets.json');
      const SHORT_RID = ${JSON.stringify(SHORT_RID)};
      const SHORT_COUNT = ${shortRidCount};
      const FULL_COUNT = 50;

      let currentRid = '';
      const names = (count) =>
        Array.from({ length: count }, (unused, index) => 'Fake.Package.' + index);

      // A real package folder with a real (empty) directory unpacked under it for every fake
      // package. attachLicenseFiles refuses a restore whose package folders do not exist, and
      // equally one whose individual PACKAGE folder does not, and neither refusal is what these two
      // cases are about. The directories hold no licence file, so every fake package simply
      // ships none.
      const PACKAGE_FOLDER = fs.mkdtempSync(
        path.join(require('os').tmpdir(), 'notices-nuget-fake-'),
      );
      names(FULL_COUNT).forEach((name) =>
        fs.mkdirSync(path.join(PACKAGE_FOLDER, name.toLowerCase(), '1.0.0'), { recursive: true }),
      );

      cp.execFileSync = (file, args) => {
        // \`dotnet tool restore\` is the first call collectNugetPackages makes - it is what puts the
        // pinned nuget-license on PATH. Answered explicitly rather than falling through to the
        // nuget-license branch below, which would look for an \`-fo\` flag that is not there and
        // write a file called \`tool\` into the working directory.
        if (args[0] === 'tool') return '';
        if (args[0] === 'restore') {
          currentRid = args[args.indexOf('-r') + 1];
          return '';
        }
        // The short RID's packages are a SUBSET of the others', so the merged union stays at
        // FULL_COUNT - above the floor - which is exactly the shape a union-only check cannot see.
        const count = currentRid === SHORT_RID ? SHORT_COUNT : FULL_COUNT;
        fs.writeFileSync(
          args[args.indexOf('-fo') + 1],
          JSON.stringify(
            names(count).map((name) => ({
              PackageId: name,
              PackageVersion: '1.0.0',
              License: 'MIT',
              LicenseInformationOrigin: 0,
            })),
          ),
        );
        return '';
      };

      // The tree's own \`project.assets.json\` is never read, written or removed. \`collectNugetPackages\`
      // reads the file it is about to replace so it can put the bytes back afterwards, and with only
      // the read faked it captured the SYNTHETIC document through the stub and wrote THAT over the
      // developer's restore in its own \`finally\` - a 50-package fake closure left on disk under a
      // gitignored path, which \`dotnet test\` then runs against. Every mutating call is faked for
      // this one path for the same reason the read is.
      const realReadFileSync = fs.readFileSync;
      const realWriteFileSync = fs.writeFileSync;
      const realRmSync = fs.rmSync;
      fs.writeFileSync = (file, ...rest) =>
        file === ASSETS ? undefined : realWriteFileSync(file, ...rest);
      fs.rmSync = (file, ...rest) => (file === ASSETS ? undefined : realRmSync(file, ...rest));
      fs.readFileSync = (file, ...rest) => {
        if (file !== ASSETS) return realReadFileSync(file, ...rest);
        const count = currentRid === SHORT_RID ? SHORT_COUNT : FULL_COUNT;
        const entries = {};
        names(count).forEach((name) => {
          entries[name + '/1.0.0'] = { runtime: { ['lib/net8.0/' + name + '.dll']: {} } };
        });
        return JSON.stringify({
          targets: { 'net8.0': entries, ['net8.0/' + currentRid]: entries },
          packageFolders: { [PACKAGE_FOLDER]: {} },
        });
      };

      const { collectNugetPackages } = require(
        path.join(${JSON.stringify(__dirname)}, 'nuget-set.ts'),
      );
      try {
        console.log('RESOLVED:' + collectNugetPackages().length);
      } catch (error) {
        console.log('THREW:' + error.message);
      } finally {
        fs.rmSync(PACKAGE_FOLDER, { recursive: true, force: true });
      }
    `;
    return spawnSync(process.execPath, [...TSX, '-e', script], { encoding: 'utf8' }).stdout.trim();
  }

  it('throws naming the RID whose own closure came back short', () => {
    const output = runCollect(3);
    expect(output).toContain('THREW:');
    expect(output).toContain('closure for win-x64 has 3 packages');
  });

  it('resolves when every RID is above the floor', () => {
    // The permissiveness control: the per-RID check must not reject a healthy four-RID run.
    expect(runCollect(50)).toBe('RESOLVED:50');
  });

  it('leaves the tree\u2019s own project.assets.json exactly as it found it', () => {
    // The fakes above stand in for a file this repository really has, under a path `.gitignore`
    // covers - so a run that wrote its synthetic closure there would leave 50 nonexistent packages
    // on disk with nothing in `git status` to show it, and `dotnet test` would then read them.
    // `collectNugetPackages` restores the bytes it captured, which is a guarantee only as good as
    // the fakes standing between it and the real path.
    const assets = path.join(REPO_ROOT, 'c-sharp', 'obj', 'project.assets.json');
    if (!fs.existsSync(assets)) return;
    const before = fs.readFileSync(assets);
    runCollect(50);
    expect(fs.readFileSync(assets).equals(before)).toBe(true);
  });
});

// Minimal project.assets.json `targets` fixtures. `nuget-license -t` answers "what is in the
// restore closure"; parseShippingSet answers the narrower, repo-specific question "what actually
// ships", applying two filters (shipsSomething, isFrameworkPackage) to whichever RID's assets file
// the caller just restored.
const assetsWithTarget = (entries: Record<string, object>) => ({
  targets: { 'net8.0/linux-x64': entries },
});

describe('parseShippingSet', () => {
  it('includes a package that ships a real runtime asset, keyed by lowercased id@version', () => {
    const assets = assetsWithTarget({
      'Newtonsoft.Json/13.0.3': { runtime: { 'lib/net8.0/Newtonsoft.Json.dll': {} } },
    });
    const ships = parseShippingSet(assets, 'linux-x64');
    expect(ships.has('newtonsoft.json@13.0.3')).toBe(true);
  });

  it('excludes a package whose asset groups are all NuGet placeholder entries', () => {
    // `_._` is NuGet's "this package deliberately contributes nothing to this group" placeholder -
    // used by analyzer-only and MSBuild-tooling packages, which the restore closure includes but no
    // file under `dotnet/` ever comes from.
    const assets = assetsWithTarget({
      'SomeAnalyzer/1.0.0': { runtime: { 'lib/net8.0/_._': {} } },
    });
    const ships = parseShippingSet(assets, 'linux-x64');
    expect(ships.has('someanalyzer@1.0.0')).toBe(false);
  });

  it('excludes a package with no runtime, runtimeTargets, native, or resource group at all', () => {
    // A compile-only / analyzer entry: it has a `compile` group but never contributes a shipped
    // file, the same as an all-placeholder entry above.
    const assets = assetsWithTarget({
      'CompileOnly/1.0.0': { compile: { 'lib/net8.0/CompileOnly.dll': {} } },
    });
    const ships = parseShippingSet(assets, 'linux-x64');
    expect(ships.has('compileonly@1.0.0')).toBe(false);
  });

  it('excludes a package the .NET 8 shared framework supersedes', () => {
    // Delegates to isFrameworkPackage (below in this module) rather than re-deriving the override
    // table here; `runtime.*` ids are always
    // superseded regardless of version, which keeps this fixture stable if the override table
    // itself is ever refreshed for a later .NET version.
    const assets = assetsWithTarget({
      'runtime.linux-x64.Microsoft.NETCore.App/8.0.0': {
        runtime: { 'runtimes/linux-x64/lib/net8.0/System.Private.CoreLib.dll': {} },
      },
    });
    const ships = parseShippingSet(assets, 'linux-x64');
    expect(ships.has('runtime.linux-x64.microsoft.netcore.app@8.0.0')).toBe(false);
  });

  it('records assemblies a package ships under a name other than its own id', () => {
    // The real case: SharpZipLib ships ICSharpCode.SharpZipLib.dll.
    const assets = assetsWithTarget({
      'SharpZipLib/1.4.2': {
        runtime: {
          'lib/net8.0/ICSharpCode.SharpZipLib.dll': {},
          // Same id as the package (case-insensitive, extension-insensitive): excluded from the
          // recorded mismatches, since a reader does not need a "ships itself" note.
          'lib/net8.0/SharpZipLib.dll': {},
          'lib/net8.0/_._': {},
        },
      },
    });
    const ships = parseShippingSet(assets, 'linux-x64');
    expect(ships.get('sharpziplib@1.4.2')).toEqual(['ICSharpCode.SharpZipLib.dll']);
  });

  it('throws when the assets file has no target for the requested RID', () => {
    const assets = assetsWithTarget({});
    expect(() => parseShippingSet(assets, 'win-x64')).toThrow(/win-x64/);
  });

  it('includes a package that ships only via the RID-agnostic target, not the RID-specific one', () => {
    // The real Icu4c.Win.Min@59.1.7 case: its native win7-x64 ICU DLLs resolve under
    // runtimeTargets on the RID-agnostic "net8.0" target. The package's "net8.0/win-x64" entry
    // contributes only a `_._` placeholder - reading that target alone would miss it entirely,
    // which is exactly the bug this fixture pins against a regression.
    const assets = {
      targets: {
        'net8.0/win-x64': {
          'Icu4c.Win.Min/59.1.7': { build: { 'build/_._': {} } },
        },
        // Sorts before "net8.0/win-x64", matching Object.keys(...).sort() order in production.
        'net8.0': {
          'Icu4c.Win.Min/59.1.7': {
            build: { 'build/_._': {} },
            runtimeTargets: {
              'runtimes/win7-x64/native/icuuc59.dll': { assetType: 'native', rid: 'win7-x64' },
            },
          },
        },
      },
    };
    const ships = parseShippingSet(assets, 'win-x64');
    expect(ships.has('icu4c.win.min@59.1.7')).toBe(true);
  });
});

describe('normalizeValidationErrors', () => {
  it("extracts the Error message from nuget-license's real {Error, Context} shape", () => {
    expect(normalizeValidationErrors([validationError('No license information found')])).toEqual([
      'No license information found',
    ]);
  });

  it('drops Context, which is a local machine path repeated on every entry', () => {
    const errors = [validationError('No license information found')];
    expect(normalizeValidationErrors(errors)[0]).not.toContain('/home/');
  });

  it('deduplicates identical messages', () => {
    // nuget-license reports the same finding once per resolved target in the restore; repeating an
    // identical reason in a block message is noise, not new information.
    const errors = [
      validationError('No license information found'),
      validationError('No license information found'),
    ];
    expect(normalizeValidationErrors(errors)).toEqual(['No license information found']);
  });

  it('returns an empty array for an absent value, which means the tool reported nothing', () => {
    // Both shapes an omitted field takes once it has been through JSON: the key missing entirely,
    // and the key present with a JSON null. `JSON.parse` rather than the literal, which this
    // repository bans (`no-null/no-null`).
    expect(normalizeValidationErrors(undefined)).toEqual([]);
    expect(normalizeValidationErrors(JSON.parse('{"ValidationErrors":null}').ValidationErrors)) //
      .toEqual([]);
  });

  // These strings are the only channel by which "No license information found" reaches the policy
  // gate. Reading a shape the pipeline does not recognise as "no findings" clears every SIL package
  // - the ones whose nuspecs establish nothing - past the copyleft gate, and `policy.ts`'s own
  // malformed-value block can never fire because this had already flattened the value away.
  it('throws when ValidationErrors is present in a shape it cannot read', () => {
    expect(() => normalizeValidationErrors('not an array')).toThrow(/not an array/);
    expect(() => normalizeValidationErrors({ Error: 'No license information found' })).toThrow(
      /not an array/,
    );
  });

  it('throws on an entry it cannot read rather than dropping it', () => {
    expect(() =>
      normalizeValidationErrors([validationError('No license information found'), { Message: 42 }]),
    ).toThrow(/cannot read/);
  });
});

describe('assertClosureCoversShippingSet', () => {
  const entry = (id: string, version: string) => ({ PackageId: id, PackageVersion: version });

  it('accepts a closure that reports every package the restore says ships', () => {
    const shipping = new Map([['sharpziplib@1.4.2', []]]);
    expect(() =>
      assertClosureCoversShippingSet(
        [entry('SharpZipLib', '1.4.2'), entry('Newtonsoft.Json', '13.0.3')],
        shipping,
        'linux-x64',
      ),
    ).not.toThrow();
  });

  // `assertFloor` counts, and a closure short by exactly the RID-unique packages the four-RID union
  // exists to capture stays far above a floor set for the whole closure. The assets file is the
  // independent second source that can see the loss.
  it('refuses a closure missing a package the restore resolved', () => {
    const shipping = new Map([
      ['sharpziplib@1.4.2', []],
      ['icu4c.win.min@59.1.7', []],
    ]);
    expect(() =>
      assertClosureCoversShippingSet([entry('SharpZipLib', '1.4.2')], shipping, 'win-x64'),
    ).toThrow(/icu4c.win.min@59.1.7/);
  });

  it('matches ids and versions case-insensitively, as NuGet does', () => {
    const shipping = new Map([['sharpziplib@1.4.2', []]]);
    expect(() =>
      assertClosureCoversShippingSet([entry('SHARPZIPLIB', '1.4.2')], shipping, 'osx-x64'),
    ).not.toThrow();
  });
});

describe('isFrameworkPackage', () => {
  const FRAMEWORK: [string, string][] = [
    // Per-RID asset shims carry no code of their own; their payload belongs to the .NET runtime.
    ['runtime.linux-x64.Microsoft.NETCore.App', '8.0.0'],
    ['runtime.native.System.IO.Ports', '7.0.0'],
    // Superseded up to and including the version the override names, which is the comparison the
    // SDK's own PackageOverrides handling makes.
    ['System.Buffers', '4.4.0'],
    ['System.Buffers', '4.3.0'],
    ['System.Net.Http', '4.3.0'],
    ['Microsoft.CSharp', '4.4.0'],
    // The override list is matched case-insensitively, as NuGet ids are.
    ['system.buffers', '4.4.0'],
  ];

  it.each(FRAMEWORK)('reports %s@%s as superseded by the shared framework', (id, version) => {
    expect(isFrameworkPackage(id, version)).toBe(true);
  });

  const SHIPPED: [string, string][] = [
    ['System.Security.Cryptography.Xml', '9.0.0'],
    ['System.Collections.Immutable', '8.0.0'],
    ['Newtonsoft.Json', '13.0.3'],
    ['SharpZipLib', '1.4.2'],
    // Anything NEWER than the version the override names is not superseded: its assembly is the one
    // that lands in the publish output. Comparing majors alone drops these before they ever reach
    // the copyleft gate, and no count in the generated file reveals the loss.
    ['System.Buffers', '4.6.1'],
    ['System.Net.Http', '4.3.4'],
    ['System.ValueTuple', '4.6.1'],
    ['Microsoft.CSharp', '4.7.0'],
    ['System.Security.Cryptography.Xml', '4.7.1'],
    // A version this comparison cannot order. `compareVersions` is a total order, so a component
    // it cannot read sorts as 0 and `4.4.x` compares EQUAL to the 4.4.0 the framework supersedes -
    // which `<=` reads as superseded. Dropping is the irreversible direction: the package leaves
    // the closure before the copyleft gate sees it, and no count reveals the loss.
    ['System.Buffers', '4.4.x'],
    ['Microsoft.CSharp', '4.4.0final'],
  ];

  it.each(SHIPPED)('reports %s@%s as a package that still ships', (id, version) => {
    expect(isFrameworkPackage(id, version)).toBe(false);
  });
});

describe('readDirectPackageReferences', () => {
  // See the matching note in `bundled license files`: this helper leaked a temp directory per case.
  const created: string[] = [];
  afterAll(() => created.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true })));

  const projectFile = (xml: string) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-csproj-'));
    created.push(dir);
    const file = path.join(dir, 'Test.csproj');
    fs.writeFileSync(file, xml);
    return file;
  };

  it('reads each reference regardless of attribute order', () => {
    // MSBuild does not treat attribute order as significant, and a reference this pattern misses is
    // one the cross-check cannot notice the absence of.
    const file = projectFile(
      [
        '<Project><ItemGroup>',
        '  <PackageReference Include="icu.net" Version="3.0.1" />',
        '  <PackageReference Version="2.22.11" Include="StreamJsonRpc" />',
        '</ItemGroup></Project>',
      ].join('\n'),
    );
    expect(readDirectPackageReferences(file)).toEqual([
      { id: 'icu.net', version: '3.0.1', shipsRuntimeAssets: true },
      { id: 'StreamJsonRpc', version: '2.22.11', shipsRuntimeAssets: true },
    ]);
  });

  // `Version="$(ParatextPackageVersion)"` is a property reference, not a version. Reporting the
  // literal would put `$(...)` in a legal artifact.
  it('reports an MSBuild property reference as no version at all', () => {
    const file = projectFile(
      '<Project><ItemGroup><PackageReference Include="ParatextData" Version="$(Pin)" />' +
        '</ItemGroup></Project>',
    );
    expect(readDirectPackageReferences(file)).toEqual([
      { id: 'ParatextData', version: undefined, shipsRuntimeAssets: true },
    ]);
  });

  it('reads the real project file, which must declare the conditioned ICU runtime', () => {
    // The one reference the four-RID union can never resolve on Linux, and the reason `alwaysList`
    // exists. If this ever stops being declared, the override in notices-policy.json is stale.
    const references = readDirectPackageReferences();
    expect(references.find((reference) => reference.id === 'Microsoft.ICU.ICU4C.Runtime')).toEqual({
      id: 'Microsoft.ICU.ICU4C.Runtime',
      version: '72.1.0.3',
      shipsRuntimeAssets: true,
    });
  });

  it('does not read a reference out of an XML COMMENT', () => {
    // MSBuild never sees a commented-out reference, so no restore can resolve it and nothing can
    // ever appear in the closure to satisfy it - the cross-check reported it missing and refused to
    // write the artifact. Commenting one out while debugging a build is an ordinary thing to do,
    // and this project file already carries four comment blocks around its ItemGroups.
    const file = projectFile(
      [
        '<Project><ItemGroup>',
        '  <!-- <PackageReference Include="Was.Debugging.This" Version="1.0.0" /> -->',
        '  <PackageReference Include="icu.net" Version="3.0.1" />',
        '</ItemGroup></Project>',
      ].join('\n'),
    );
    expect(readDirectPackageReferences(file).map((reference) => reference.id)).toEqual(['icu.net']);
  });

  it('reads single-quoted attributes, which MSBuild accepts', () => {
    // The failure this cross-check exists to prevent, arrived at from the other direction: a
    // reference the scan cannot see is one whose absence from the closure nothing reports.
    const file = projectFile(
      "<Project><ItemGroup><PackageReference Include='StreamJsonRpc' Version='2.22.11' />" +
        '</ItemGroup></Project>',
    );
    expect(readDirectPackageReferences(file)).toEqual([
      { id: 'StreamJsonRpc', version: '2.22.11', shipsRuntimeAssets: true },
    ]);
  });

  it('reads a reference that carries its metadata as CHILD ELEMENTS', () => {
    // `<PrivateAssets>all</PrivateAssets>` and `PrivateAssets="all"` mean the same thing to
    // MSBuild; a scan that sees only the opening tag reads the first as carrying no metadata.
    const file = projectFile(
      [
        '<Project><ItemGroup>',
        '  <PackageReference Include="Some.Analyzer" Version="1.2.3">',
        '    <ExcludeAssets>runtime</ExcludeAssets>',
        '  </PackageReference>',
        '</ItemGroup></Project>',
      ].join('\n'),
    );
    expect(readDirectPackageReferences(file)).toEqual([
      { id: 'Some.Analyzer', version: '1.2.3', shipsRuntimeAssets: false },
    ]);
  });

  it('reads NuGet\u2019s asset model to decide whether a reference can ship a file', () => {
    // How an analyzer or source generator is declared. A reference that excludes runtime assets
    // contributes nothing to the publish output by definition, so it can never appear in the
    // shipping closure - and requiring it to would make adding one a permanent build failure.
    const file = projectFile(
      [
        '<Project><ItemGroup>',
        '  <PackageReference Include="Excludes.All" Version="1.0.0" ExcludeAssets="all" />',
        '  <PackageReference Include="Analyzer.Only" Version="1.0.0" IncludeAssets="analyzers;build" />',
        '  <PackageReference Include="Includes.Runtime" Version="1.0.0" IncludeAssets="runtime;build" />',
        '  <PackageReference Include="Private.But.Shipping" Version="1.0.0" PrivateAssets="all" />',
        '</ItemGroup></Project>',
      ].join('\n'),
    );
    expect(
      Object.fromEntries(
        readDirectPackageReferences(file).map((reference) => [
          reference.id,
          reference.shipsRuntimeAssets,
        ]),
      ),
      // `PrivateAssets` controls what FLOWS to consumers, not what ships here - so it stays strict.
    ).toEqual({
      'Excludes.All': false,
      'Analyzer.Only': false,
      'Includes.Runtime': true,
      'Private.But.Shipping': true,
    });
  });
});

describe('missingDirectReferences', () => {
  const references = [
    { id: 'ParatextData', version: '9.5.0.24' },
    { id: 'Microsoft.ICU.ICU4C.Runtime', version: '72.1.0.3' },
  ];

  // assertFloor cannot see this failure: losing one internal-feed package takes 88 packages to 87,
  // far above the plausibility floor and entirely silent.
  it('says nothing about a reference that cannot ship a file at all', () => {
    // An analyzer contributes nothing to the publish output, so its absence from the shipping
    // closure is the expected state rather than a discrepancy. Requiring it made adding a Roslyn
    // analyzer a permanent build failure whose only escape was `alwaysList`, an instrument reserved
    // for platform-conditional packages.
    expect(
      missingDirectReferences([], [{ id: 'Some.Analyzer', shipsRuntimeAssets: false }]),
    ).toEqual([]);
  });

  it('names a direct reference the closure does not contain', () => {
    expect(missingDirectReferences([], references)).toEqual([
      'ParatextData',
      'Microsoft.ICU.ICU4C.Runtime',
    ]);
  });

  it('matches case-insensitively, as NuGet ids are', () => {
    expect(missingDirectReferences([{ name: 'paratextdata' }], references)).toEqual([
      'Microsoft.ICU.ICU4C.Runtime',
    ]);
  });

  // Only alwaysList overrides are exempt, and only because those are referenced under a platform
  // condition. Exempting every override would exempt ParatextData, the package most worth checking.
  it('exempts only the packages the caller names', () => {
    expect(
      missingDirectReferences([{ name: 'ParatextData' }], references, [
        'Microsoft.ICU.ICU4C.Runtime',
      ]),
    ).toEqual([]);
  });
});

describe('bundled license files', () => {
  // Every other suite in this file cleans up after itself; these two helpers did not, and each case
  // that called one left a directory behind under the system temp directory for every `npm test`.
  const created: string[] = [];
  afterAll(() => created.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true })));

  /** A throwaway NuGet packages root holding `<id>/<version>/<file>` entries. */
  const packagesRoot = (packages: Record<string, Record<string, string>>) => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-nupkg-'));
    created.push(root);
    Object.entries(packages).forEach(([idAndVersion, files]) => {
      const dir = path.join(root, ...idAndVersion.split('/'));
      fs.mkdirSync(dir, { recursive: true });
      Object.entries(files).forEach(([name, text]) => fs.writeFileSync(path.join(dir, name), text));
    });
    return root;
  };

  describe('parsePackageFolders', () => {
    it('keeps only the folders that exist on this machine', () => {
      const root = packagesRoot({});
      const assets = { packageFolders: { [root]: {}, '/definitely/not/here': {} } };
      expect(parsePackageFolders(assets)).toEqual([root]);
    });

    it('reports none when the assets file names no folders at all', () => {
      expect(parsePackageFolders({})).toEqual([]);
    });
  });

  describe('resolvePackageDir', () => {
    // NuGet lowercases both path segments on disk, while ids and versions are matched
    // case-insensitively, so the lookup has to lowercase rather than use the id as given.
    it('finds a package under its lowercased id and version', () => {
      const root = packagesRoot({ 'newtonsoft.json/13.0.4': { 'LICENSE.md': 'mit' } });
      expect(resolvePackageDir([root], 'Newtonsoft.Json', '13.0.4')).toBe(
        path.join(root, 'newtonsoft.json', '13.0.4'),
      );
    });

    it('reports nothing when no folder holds the package', () => {
      const root = packagesRoot({});
      expect(resolvePackageDir([root], 'Absent', '1.0.0')).toBeUndefined();
    });
  });

  describe('attachLicenseFiles', () => {
    // A package that bundles a license file must have THAT text reproduced. Substituting the
    // canonical SPDX text loses the copyright notice the bundled file carries - the notice MIT,
    // BSD and ISC oblige to travel with copies - and replaces it with SPDX's placeholder.
    it("attaches a package's own bundled license text", () => {
      const root = packagesRoot({
        'microsoft.bcl.asyncinterfaces/5.0.0': {
          'LICENSE.TXT': 'The MIT License (MIT)\n\nCopyright (c) .NET Foundation and Contributors',
        },
      });
      const [attached] = attachLicenseFiles(
        [{ name: 'Microsoft.Bcl.AsyncInterfaces', version: '5.0.0' }],
        [root],
      );
      expect(attached.licenseFiles).toHaveLength(1);
      expect(attached.licenseFiles[0].text).toContain('.NET Foundation and Contributors');
    });

    it('attaches an empty list for a package that bundles none, so canonical text takes over', () => {
      const root = packagesRoot({ 'csvhelper/33.1.0': { 'readme.md': 'hi' } });
      const [attached] = attachLicenseFiles([{ name: 'CsvHelper', version: '33.1.0' }], [root]);
      expect(attached.licenseFiles).toEqual([]);
    });

    it('leaves every other field untouched', () => {
      const root = packagesRoot({ 'x/1.0.0': {} });
      const [attached] = attachLicenseFiles(
        [{ name: 'X', version: '1.0.0', declaredField: 'MIT', assemblies: ['A.dll'] }],
        [root],
      );
      expect(attached.declaredField).toBe('MIT');
      expect(attached.assemblies).toEqual(['A.dll']);
    });

    // The all-or-nothing case (no package folder exists at all) was already refused. This is the
    // per-package one, which fails the same way for the same reason: a package whose folder is not
    // there reads as a package that bundles no licence file, and the document then says so and
    // substitutes SPDX's `<copyright holders>` placeholder for a real notice that MIT obliges to
    // travel with copies.
    it('refuses a package whose own folder is not under any package folder', () => {
      const root = packagesRoot({ 'present/1.0.0': { 'LICENSE.TXT': 'mit' } });
      expect(() =>
        attachLicenseFiles(
          [
            { name: 'Present', version: '1.0.0' },
            { name: 'Absent', version: '2.0.0' },
          ],
          [root],
        ),
      ).toThrow(/Absent@2\.0\.0/);
    });

    it("attaches a grant whose filename does not begin with the word 'license'", () => {
      // `System.Net.Http` 4.3.4's own grant is `dotnet_library_license.txt` - the artifact asserted
      // the package bundles none and reproduced nothing, while the text sat in the package folder.
      const root = packagesRoot({
        'system.net.http/4.3.4': {
          'dotnet_library_license.txt': 'MICROSOFT SOFTWARE LICENSE TERMS\nMICROSOFT .NET LIBRARY',
        },
      });
      const [attached] = attachLicenseFiles(
        [{ name: 'System.Net.Http', version: '4.3.4' }],
        [root],
      );
      expect(attached.licenseFiles.map((file: { name: string }) => file.name)).toEqual([
        'dotnet_library_license.txt',
      ]);
    });

    it('attaches a NOTICE, so the NuGet half can discharge Apache-2.0 section 4(d)', () => {
      // Notices have to be read on the NuGet side too, or `render.ts`'s NOTICE section can never
      // fire for a NuGet package. Four in the current closure ship one - all MIT today, so none is
      // owed, but two NuGet packages here are Apache-2.0.
      const root = packagesRoot({
        'streamjsonrpc/2.22.11': { LICENSE: 'MIT', NOTICE: 'Portions copyright somebody else' },
      });
      const [attached] = attachLicenseFiles(
        [{ name: 'StreamJsonRpc', version: '2.22.11' }],
        [root],
      );
      expect(attached.notices).toEqual([
        { name: 'NOTICE', text: 'Portions copyright somebody else' },
      ]);
    });

    it('attaches an empty notice list for a package shipping none', () => {
      const root = packagesRoot({ 'csvhelper/33.1.0': { 'readme.md': 'hi' } });
      const [attached] = attachLicenseFiles([{ name: 'CsvHelper', version: '33.1.0' }], [root]);
      expect(attached.notices).toEqual([]);
    });

    // Reporting every package as bundling nothing looks identical to a closure where none does,
    // and would silently drop ~60 packages' own notices from a legal artifact.
    it('throws rather than silently reporting that nothing bundles a license', () => {
      expect(() => attachLicenseFiles([{ name: 'X', version: '1.0.0' }], [])).toThrow(
        /package folders/,
      );
    });
  });
});
