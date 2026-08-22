# Licensing

This repository is **dual-licensed by path**. This file is the authoritative map of which license
applies where. Where a directory contains its own `LICENSE` file, that file governs that directory
and everything beneath it.

Relicensed from MIT to AGPL-3.0-or-later on 2026-08-07. Releases published before that date remain
available under the MIT License they were distributed under; the AGPL applies to this codebase going
forward.

**The source and the distributed binary are licensed separately.** Everything in this file describes
the _source_. The built, distributed Platform.Bible application ships under separate terms — see
"The distributed application" below.

## AGPL-3.0-or-later

The core Platform.Bible application. Full license text: [`LICENSE`](./LICENSE).

| Path                                       | Contents                                    |
| ------------------------------------------ | ------------------------------------------- |
| `src/main/`                                | Electron main process                       |
| `src/renderer/`                            | React UI                                    |
| `src/extension-host/`                      | Extension host and PAPI backend             |
| `src/shared/`, `src/node/`                 | Cross-process shared code                   |
| `c-sharp/`, `c-sharp-tests/`               | .NET data provider                          |
| `extensions/`                              | The extensions bundled with the application |
| `release/app/`                             | Packaged application metadata               |
| `e2e-tests/`, `.erb/`, `tools/`            | Test and build infrastructure               |
| `lib/papi-dts/`                            | Generated PAPI type declarations            |
| `lib/browserslist-config-detect-electron/` | Build-time browserslist configuration       |
| `lib/eslint-plugin-paranext/`              | Lint-time ESLint rules                      |

Anything in this repository not listed under "MIT" below is AGPL-3.0-or-later.

Three of the five packages under `lib/` are AGPL. They are the ones that exist only while an
extension is being built and contribute nothing to what it ships; the "MIT" section below states the
rule that draws that line and applies it package by package. None of the three imposes an obligation
on a third-party extension author:

- **`lib/papi-dts`** is types-only (its `package.json` declares an empty `main` and
  `types: papi.d.ts`). TypeScript erases declaration files at compile time, so no part of it reaches
  a built extension and nothing about it is conveyed onward. It is also generated from the AGPL core
  by `npm run build:types`, so licensing a mechanical derivative of AGPL source as MIT would have
  been ambiguous at best.
- **`lib/browserslist-config-detect-electron`** is a browserslist configuration read by the build; it
  emits no code.
- **`lib/eslint-plugin-paranext`** runs only at lint time; it emits no code.

### What the AGPL adds over the GPL

AGPL section 13 extends the copyleft obligation to network use: if a modified version of this
software is made available to users over a network, those users must be offered the corresponding
source of the modified version. This has no effect on local desktop use of Platform.Bible, but it
does apply to any hosted or server-side deployment derived from this code.

## MIT

The two developer libraries a third-party extension links against at runtime. These stay MIT
deliberately, so that extensions built against them are **not** obligated to adopt the AGPL.

| Package                | Path                        |
| ---------------------- | --------------------------- |
| `platform-bible-react` | `lib/platform-bible-react/` |
| `platform-bible-utils` | `lib/platform-bible-utils/` |

Each carries its own `LICENSE` file containing the MIT text.

### The rule that draws the line

> **MIT if a third-party extension links against the package at runtime — whether webpack bundles it
> in or Platform.Bible supplies it as an external. AGPL-3.0-or-later if the package exists only while
> the extension is being built and the extension never links against it.**

The test is runtime linking, not bundling: an extension that calls into a library is combined with it
either way, and it is that combination — not the mechanics of how the bytes arrive — that would raise
the copyleft question. Applied to the five packages under `lib/`:

| Package                               | License           | Why                                                                         |
| ------------------------------------- | ----------------- | --------------------------------------------------------------------------- |
| `platform-bible-react`                | MIT               | Linked at runtime; webpack bundles it into the extension's own output       |
| `platform-bible-utils`                | MIT               | Linked at runtime; not bundled — supplied by the host as a webpack external |
| `papi-dts`                            | AGPL-3.0-or-later | Types only; declarations are erased at compile time                         |
| `browserslist-config-detect-electron` | AGPL-3.0-or-later | Build-time browserslist configuration; emits nothing                        |
| `eslint-plugin-paranext`              | AGPL-3.0-or-later | Lint-time only; emits nothing                                               |

**The rule keys on whether an extension links against the package at runtime — never on which
`package.json` section declares it.** That distinction is load-bearing, and it is worth stating
plainly because the wrong reading is the intuitive one:

> **A `devDependency` is not evidence that a package stays out of the build.**
>
> `platform-bible-react` was declared under `devDependencies` by every extension in this repository
> while extension source across all of them imported it at runtime and webpack bundled it into each
> one. Anyone applying "it is a `devDependency`, so it is build-time, so it can be AGPL" would have
> relicensed it and made the AGPL viral for third-party extension authors — precisely the outcome
> this carve-out exists to prevent.

Those declarations stay in `devDependencies`, which is what
[the code style guide](.context/standards/Code-Style-Guide.md) asks for — a bundled package is
consumed at build time — and nothing about licensing depends on the section: the notices generator
reads what production source imports, not what a manifest declares (see ADR-0022). Check what the
bundler does, not what the manifest says. For extensions that means reading the `externals` list in
`extensions/webpack/webpack.config.base.ts` — it is a fixed list of modules Platform.Bible supplies
at runtime, and **anything not named there is compiled into the extension.** `platform-bible-utils`
is on that list and `platform-bible-react` is not, which is why the two reach a third-party
extension by different routes and arrive at the same answer.

### Moving code across the boundary

The boundary is expressed by directory rather than by per-file headers, and it does **not** follow
`lib/` as a whole — three of the five packages under `lib/` are AGPL. The MIT side is exactly the two
directories in the table above.

**Moving a file into or out of those two directories changes its license.** Code moved out of them
into the AGPL tree becomes AGPL. Code moved _into_ them from the AGPL tree does **not** automatically
become MIT — that is a relicensing act requiring the copyright holders' agreement. Treat any such
move as a licensing decision, not a refactor.

A change that only looks like a build change can cross the same boundary. Adding a runtime import of
`eslint-plugin-paranext` or `browserslist-config-detect-electron` — or of anything else in the AGPL
tree — from extension source would put AGPL code into a third-party extension's distributed output.
That is a licensing decision too.

## The distributed application

The built application is **not** distributed under the AGPL. `release/app/package.json` declares
`"license": "UNLICENSED"` — npm's registered value meaning _no rights are granted to recipients_.
It is a deliberate placeholder while the end-user terms are being settled, not an oversight, and it
is the opposite of the similarly-named `Unlicense` (which dedicates work to the public domain).
Replace it with the real identifier once the end-user terms exist.

This split is lawful only because SIL Global and United Bible Societies control the copyright in the
source (see "Inbound contributions" below); it is the same dual-licensing arrangement used by any
open-core project. Distributing the binary under other terms does not retract anyone's AGPL rights
in the source: the AGPL grant on this repository is irrevocable, and anyone may build and
redistribute their own binary under the AGPL.

That grant covers this repository's code, and not everything the build pulls in beside it. The UBS
lexical database the `platform-lexical-tools` extension downloads is the exception that matters:
portions of that file are © United Bible Societies under no open licence, and UBS's permission to
distribute them is to **Paratext** specifically — not to Platform.Bible, and not to anyone building
from this repository. Whoever bundles the database is relying on that Paratext permission, not on
anything this repository grants, however freely the code around it may be redistributed. See
"Third-party content" below.

No dependency obstructs this. `npm run build:third-party-notices` scans both shipped dependency
graphs — the npm packages webpack actually compiled into `dist/` (plus the stylesheet-only packages
Tailwind inlines before webpack runs, and anything `release/app` ships unbundled beside the bundle),
and the full NuGet closure of the .NET data provider, not only its direct `PackageReference`
entries — and fails the build on any strong-copyleft component.
It finds no GPL- or LGPL-only components in either graph. The only copyleft-adjacent packages that
ship are dual-licensed, and Platform.Bible elects their permissive branch (`jszip` → MIT,
`dompurify` → Apache-2.0, `CsvHelper` → Apache-2.0); the MPL-2.0 packages found (`axe-core`,
`lightningcss`) are build-time only and are not distributed.

Read that as a statement about what those two scans see, which is narrower than "everything the
installer contains". The npm half is derived from what the compiler reports it bundled, so a package
reached only at runtime (a `require` resolved at run time, a native module, anything that never
passes through webpack) is outside it; `.erb/scripts/third-party-notices/shipping-set.js` sets out
why that source was chosen over a `package.json` closure, and what each of its three inputs covers.
It is also not a claim that nothing copyleft is in the Linux artifact. The snap stages Ubuntu shared libraries inside
itself (`electron-builder.json5` → `snap.stagePackages`), and several are copyleft — ALSA and
AppIndicator under the LGPL, NSS and NSPR under MPL-2.0. They obstruct nothing: they are unmodified
archive builds, linked dynamically, and both licences are compatible with AGPL source. But they are
redistributed inside the `.snap`, no scan in this repository reaches them, and the snap does not
currently carry their licence texts. THIRD-PARTY-NOTICES.md records that gap under "Linux snap".

### Why `CsvHelper` is taken under Apache-2.0 and not MS-PL

`CsvHelper` declares `MS-PL OR Apache-2.0`, and the two branches are not interchangeable here.
MS-PL is not compatible with the GPL family: its reciprocity terms cannot be satisfied at the same
time as the GPL's, which is why the FSF lists it as a GPL-incompatible free software license.
`CsvHelper` links into `ParanextDataProvider`, whose own source is AGPL-3.0-or-later, so electing
MS-PL would combine GPL-incompatible code into an AGPL tree. Apache-2.0 is explicitly compatible
with GPLv3 and AGPLv3, and it additionally carries an express patent grant that MS-PL's narrower
patent language does not match. The election is recorded as `nuget:CsvHelper` in the `elections`
map in `.erb/scripts/third-party-notices/notices-policy.json`, alongside the npm elections and with
its reasoning written out, and it is rendered into the notices file beside the expression it was
elected from, so the choice is visible in the artifact rather than only in the policy.

Five .NET components carry no SPDX identifier in the notices table. Three are first-party rather
than unresolved: `ParatextCorePluginInterfaces` ships alongside `ParatextData` and `ParatextChecks`,
and although its nuspec declares no license and its copyright notice reserves all rights, it is code
of the same SIL Global / United Bible Societies team that owns Platform.Bible, published from a
different product release on the same internal feed. No third-party disclosure obligation attaches to
any of the three; the notices file records them as proprietary first-party components and lists them
so a reader can map every assembly under `dotnet/` to a row.

The other two are third-party, and each is recorded as free text because its nuspec carries a
pre-SPDX `<licenseUrl>` rather than an expression:

- `Icu4c.Win.Min` — `ICU (Unicode-3.0)`. Which Unicode licence applies depends on the ICU release,
  and this closure resolves ICU 59; recording a bare `Unicode-3.0` would reproduce the wrong text on
  the package's behalf. Permissive either way, and its notice obligation is what the entry records.
- `System.Net.Http` 4.3.4 — `MICROSOFT .NET LIBRARY`, the pre-MIT Microsoft licence terms. It is the
  one remaining component whose terms are neither SPDX-identified nor first-party. Those terms carry
  an "Excluded License" clause — you may not "modify or distribute the source code of any
  Distributable Code so that any part of it becomes subject to" a licence requiring that "the code
  be disclosed or distributed in source code form" — which raises the same
  AGPL-compatibility question this section answers for `CsvHelper` above, and that question has not
  been answered here. The clause is written about Microsoft's own source rather than about linking a
  shipped binary, so it is not on its face an obstruction; it is recorded as open rather than
  cleared. The package bundles those terms as `dotnet_library_license.txt` and the notices file
  reproduces them in full. At this version the .NET 8 shared framework does not supersede it, so it
  does reach the publish output.

`ParanextDataProvider.csproj` carries no `System.Net.WebSockets` `PackageReference`, and must not:
the 4.3.0 package is licensed under the pre-MIT "MICROSOFT .NET LIBRARY" terms rather than an SPDX
expression, and it is a netstandard1.3 compatibility shim .NET 8 does not need — the runtime
supplies `System.Net.WebSockets` from its shared framework, so the SDK discards the package's
assembly anyway. Referencing it adds a redistribution question without adding any code to the
build.

Two things follow the binary:

- **Third-party notices.** [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) and
  [LICENSE](./LICENSE) are packaged into the installer via `electron-builder.json5`
  `extraResources`, and land beside the application. The attribution obligations of the bundled
  MIT/BSD/ISC/Apache dependencies - npm and NuGet alike, since the whole .NET publish directory is
  copied into the packaged app - apply to the binary regardless of the terms it ships under. They
  are installed files; they are deliberately not surfaced in the application UI.

  The committed file covers **this repository's** redistributable closure. A shipped product built
  on paranext-core adds its own dependencies, so it must generate notices covering its full closure;
  this file is an input to that, not a substitute for it. The NuGet closure is resolved across all
  four published runtime identifiers, and the npm closure - the one part of the closure that can
  genuinely differ by platform, since npm installs an optional dependency only where its `os`/`cpu`
  constraints match - is verified on all three CI platforms: regenerated and checked for staleness
  on Linux, and checked against the committed lock's npm entries on Windows and macOS
  (`--verify-shipping-set`; licence identification and the NuGet closure do not need re-checking per
  platform - see ADR-0024). Regenerate on Linux if any of this drifts, or the committed file will not
  match what CI produces.

  Where a dependency ships no license file of its own but declares an SPDX identifier, the notices
  file reproduces the canonical text of that license, read from the pinned `spdx-license-list`
  dependency and verified against the checksum index committed at
  `.erb/scripts/third-party-notices/spdx-corpus/index.json` (source, version, and a sha256 per
  license — see `.erb/scripts/third-party-notices/corpus.js`), paired with that dependency's own
  copyright notice and labelled as SPDX's text rather than the package's, since an identifier in a
  table does not discharge "this permission notice shall be included in all copies". The texts
  themselves are not vendored — the full SPDX corpus is 10+ MB for ~600 licenses, of which the
  current shipping set uses about 13 — but reading them stays hermetic: the dependency is resolved
  locally like any other, the generator never opens a socket, and a hash mismatch against the
  committed index fails loudly rather than silently reproducing whatever the dependency now
  contains.

  What the notices cover is derived from what is compiled into the shipped output, never from which
  `package.json` section declares a package (see ADR-0022). That means **stylesheets count**: webpack
  resolves a bare specifier in a CSS `@import` through `node_modules` and inlines what it finds, so
  `@import '@fontsource-variable/ibm-plex-sans'` embeds a typeface — with its own license — into the
  build. Those imports are scanned alongside JavaScript and TypeScript ones. A package reached only
  from a stylesheet is listed on its own, without its dependency closure: what ships is that
  package's CSS and the assets it references, not the build-time toolchain behind it.

  A dependency the generator cannot clear stops the run: nothing is written, and the failure names
  the package, both signals it read, and the exact policy entry to add. The recognized set is an
  explicit allowlist (`allowed` in `.erb/scripts/third-party-notices/notices-policy.json`), not a
  pattern over what an SPDX identifier looks like, because `Proprietary`, `BUSL-1.1` and
  `CC-BY-NC-4.0` are all well-formed identifiers. Adding a genuinely permissive license to that
  list, or recording a reviewed exception, is the intended response; suppressing it any other way is
  not. A reviewed exception records which license a package's unidentifiable text actually is - so
  the identifier it names is checked against that same allowlist and against the copyleft list, and
  an exception can never admit terms the lists do not. A new identifier has to be added to `allowed`
  first, which is a reviewable line in the policy rather than one buried in a per-package entry.

  Apache-style `NOTICE` files shipped by an npm package are reproduced when that package's own
  license requires it — Apache-2.0 section 4(d) — and otherwise recorded by name rather than
  inlined. Under MIT, BSD and ISC the obligation is to carry the copyright and permission notice,
  which the reproduced license text does; the NOTICE files those packages ship are vendors'
  aggregate notices describing their own dependency closures, which this file does not undertake to
  cover. A NuGet package's NOTICE is read on the same terms, from the same restored package folder
  its LICENSE file comes from: four packages in the current closure ship one, and none of the four
  is under terms that oblige reproducing it — but two NuGet packages in the closure ARE Apache-2.0
  (`CsvHelper` by election, `Microsoft.Extensions.ObjectPool`), so that is a fact about today's
  closure rather than a property of NuGet, and the mechanism that would catch the next one is live
  on both sides. A package's LICENSE file is read as well: a NuGet package's license is classified
  from its nuspec, but the text
  reproduced for it is the file it bundles, because that file carries the copyright notice the
  license obliges to travel with copies. Canonical SPDX text is the fallback for a package that
  bundles none, never a substitute for one that does.

  Regenerate it whenever production dependencies change - the procedure, including the cold-cache
  requirement and the two verification commands, is in the README under
  [Third-party notices](./README.md#third-party-notices). CI regenerates it on Linux and fails if
  the committed copy is stale, which is also what runs the copyleft gate on every pull request.
  Before regenerating, CI runs `npm run verify:third-party-notices`, which diffs the freshly derived
  set against the committed `THIRD-PARTY-NOTICES.lock.json` and fails naming what moved - so a
  license text that changed under an unchanged `name@version`, which nobody would otherwise re-read,
  has to be looked at and acknowledged rather than silently regenerated away.

  A package that production source imports ships even when it is declared as a `devDependency` —
  the same trap described under "MIT" above, seen from the notices side. Neither build derives what
  it bundles from a `devDependencies`/`dependencies` split: for the app, webpack's `externals` come
  from `release/app/package.json` `dependencies`, which declares none, so nothing is externalized;
  for extensions, `externals` is a fixed list in `extensions/webpack/webpack.config.base.ts`.
  Anything imported from `src/` or `extensions/src/*/src/` and not named in the relevant `externals`
  is compiled into the shipped bundle, and gets a notice on that basis alone — which section of
  `package.json` declares it changes nothing, in either direction. Do NOT move a package to
  `dependencies` to get it a notice: for `lib/*` that move would relicense the package under the
  AGPL and make it viral for third-party extension authors, which is precisely the trap described
  under "MIT" above.

- **An end-user licence** embedded in the installers (electron-builder `nsis.license` / `dmg`
  license). No such configuration exists yet, and none should be added until the end-user terms are
  settled - see "The distributed application" above.

## Inbound contributions

Contributions are accepted under the Paratext Contributor License Agreement, whose copyright grant
is broad enough to permit both this relicense and separate terms for the binary: contributors grant
a perpetual, worldwide, irrevocable license to reproduce, prepare derivative works of, **sublicense**,
and distribute their contributions. Sublicensing is the specific right that makes both possible.

## Third-party content

- `.context/research/paratext-manual/` — upstream content under its own MIT license; see
  `LICENSE-upstream.txt` in that directory.
- `.context/research/paratext-9-features/` — describes the closed-source Paratext 9 codebase.
  PT9-derived excerpts are reference material and are not covered by this repository's license.
- `extensions/src/platform-lexical-tools/assets/lexical-db/` — the UBS lexical database, downloaded
  at install time rather than committed, and shipped inside the packaged application. Portions are
  UBS material under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); the remainder
  is © United Bible Societies under no open licence, distributable under UBS's permission to
  Paratext and not by Platform.Bible or anyone else. The `LICENSE.md` and `SOURCE.md` downloaded
  beside the database are authoritative for the CC BY-SA portions; note that `SOURCE.md` as
  published upstream states the permission more broadly than this, and the narrower reading here is
  the one to rely on. [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) carries the attributions
  the CC BY-SA licence requires.
- Dependencies retain their own licenses; see
  [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md). Incorporated MIT-licensed code (including the
  `electron-react-boilerplate` foundation this project started from) remains under MIT; the AGPL
  applies to the combined work, and the original MIT notices must be retained.

## Copyright

Copyright © 2017-2026 [SIL Global](https://www.sil.org/) and
[United Bible Societies](https://unitedbiblesocieties.org/).

Individual components have carried narrower attributions, recorded here so they are not lost now
that the per-directory `LICENSE` files hold only the verbatim license text:

| Component                                     | Attribution                                        |
| --------------------------------------------- | -------------------------------------------------- |
| Repository as a whole                         | © 2017-2026 SIL Global and United Bible Societies |
| `lib/papi-dts/`                               | © 2017-2026 SIL Global and United Bible Societies |
| `lib/browserslist-config-detect-electron/`    | © 2017-2026 SIL Global and United Bible Societies |
| `lib/eslint-plugin-paranext/`                 | © 2017-2026 SIL Global and United Bible Societies |
| `extensions/`                                 | © 2022-2026 SIL Global and United Bible Societies |
| `extensions/src/hello-rock3/`                 | © 2023-2026 SIL Global and United Bible Societies |
| `extensions/src/hello-someone/`               | © 2023-2026 SIL Global and United Bible Societies |
| `extensions/src/quick-verse/`                 | © 2023-2026 SIL Global and United Bible Societies |
| `extensions/src/legacy-comment-manager/`      | © 2024-2026 SIL Global and United Bible Societies |
| `extensions/src/paratext-registration/`       | © 2024-2026 SIL Global and United Bible Societies |
| `extensions/src/platform-get-resources/`      | © 2023-2026 SIL Global and United Bible Societies |
| `extensions/src/platform-scripture/`          | © 2023-2026 SIL Global and United Bible Societies |
| `extensions/src/platform-scripture-editor/`   | © 2023-2026 SIL Global and United Bible Societies |
| `extensions/src/platform-lexical-tools/`      | © 2025-2026 SIL Global and United Bible Societies |
| `extensions/src/platform-enhanced-resources/` | © 2026 SIL Global and United Bible Societies      |
