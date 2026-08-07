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

Those declarations were corrected to `dependencies` on 2026-08-07 so they match reality, but the
lesson stands: check what the bundler does, not what the manifest says. For extensions that means
reading the `externals` list in `extensions/webpack/webpack.config.base.ts` — it is a fixed list of
modules Platform.Bible supplies at runtime, and **anything not named there is compiled into the
extension.** `platform-bible-utils` is on that list and `platform-bible-react` is not, which is why
the two reach a third-party extension by different routes and arrive at the same answer.

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

No dependency obstructs this. `npm run build:third-party-notices` scans both shipped dependency
graphs — the full npm production closure and the full NuGet closure of the .NET data provider, not
only its direct `PackageReference` entries — and fails the build on any strong-copyleft component.
It finds no GPL- or LGPL-only components in either. The only copyleft-adjacent packages that ship
are dual-licensed, and Platform.Bible elects their permissive branch (`jszip` → MIT, `dompurify` →
Apache-2.0, `CsvHelper` → Apache-2.0); the MPL-2.0 packages found (`axe-core`, `lightningcss`) are
build-time only and are not distributed.

### Why `CsvHelper` is taken under Apache-2.0 and not MS-PL

`CsvHelper` declares `MS-PL OR Apache-2.0`, and the two branches are not interchangeable here.
MS-PL is not compatible with the GPL family: its reciprocity terms cannot be satisfied at the same
time as the GPL's, which is why the FSF lists it as a GPL-incompatible free software license.
`CsvHelper` links into `ParanextDataProvider`, whose own source is AGPL-3.0-or-later, so electing
MS-PL would combine GPL-incompatible code into an AGPL tree. Apache-2.0 is explicitly compatible
with GPLv3 and AGPLv3, and it additionally carries an express patent grant that MS-PL's narrower
patent language does not match. The election is recorded in `DOTNET_ELECTED_LICENSES` in
`.erb/scripts/generate-third-party-notices.js` — the NuGet counterpart of the `ELECTED_LICENSES`
map that records the npm elections — and it is rendered into the notices file beside the expression
it was elected from, so the choice is visible in the artifact rather than only in the generator.

Three .NET components declare no SPDX license, and all three are first-party rather than unresolved:
`ParatextCorePluginInterfaces` ships alongside `ParatextData` and `ParatextChecks`, and although its
nuspec declares no license and its copyright notice reserves all rights, it is code of the same SIL
Global / United Bible Societies team that owns Platform.Bible, published from a different product
release on the same internal feed. No third-party disclosure obligation attaches to any of them; the
notices file records all three as proprietary first-party components and lists them so a reader can
map every assembly under `dotnet/` to a row.

The `System.Net.WebSockets` 4.3.0 NuGet reference was removed from `ParanextDataProvider.csproj` as
part of this work. It carried the pre-MIT "MICROSOFT .NET LIBRARY" license rather than an SPDX
expression, and it was a netstandard1.3 compatibility shim that .NET 8 does not need: the runtime
supplies `System.Net.WebSockets` from its shared framework, so the SDK was already discarding the
package's assembly. Removing it left the published output byte-identical apart from
`ParanextDataProvider.dll` itself. Do not reintroduce it — doing so adds a redistribution question
without adding any code to the build.

Two things still have to follow the binary:

- **An end-user license** embedded in the installers (electron-builder `nsis.license` / `dmg`
  license); no such configuration exists in `electron-builder.json5` yet.
- **Third-party notices**, which carry the attribution obligations of the bundled MIT/BSD/ISC/Apache
  dependencies — npm and NuGet alike, since the whole .NET publish directory is copied into the
  packaged app. These apply to the binary regardless of the terms it ships under.

  [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md) is **not** that artifact. It is a reference
  covering this repository's own redistributable closure, and it is not packaged by
  `electron-builder.json5`. A shipped product built on paranext-core adds its own dependencies and
  is built per-platform, so it has to generate notices covering its full closure on the platform it
  ships for; this file is an input to that, not a substitute for it. What is committed here is
  generated on Linux, so the NuGet side is the Linux restore closure.

  Where a dependency ships no license file of its own but declares an SPDX identifier, the notices
  file reproduces the canonical text of that license from `.erb/scripts/license-texts/` — verbatim
  SPDX texts checked into this repository — paired with that dependency's own copyright notice and
  labelled as SPDX's text rather than the package's, since an identifier in a table does not
  discharge "this permission notice shall be included in all copies". Those texts are checked in
  rather than fetched because the generator must stay hermetic: it runs in CI on every pull request
  and must not depend on a third-party host.

  Regenerate it with `npm run build:third-party-notices` whenever production dependencies change; it
  needs `c-sharp/obj/project.assets.json`, so run `dotnet restore c-sharp/ParanextDataProvider.csproj`
  first if the .NET project has never been restored. CI regenerates it on Linux and fails if the
  committed copy is stale, which is also what runs the strong-copyleft gate on every pull request.

  A package that production source imports ships even when it is declared as a `devDependency` —
  the same trap described under "MIT" above, seen from the notices side. Neither build derives what
  it bundles from a `devDependencies`/`dependencies` split: for the app, webpack's `externals` come
  from `release/app/package.json` `dependencies`, which declares none, so nothing is externalized;
  for extensions, `externals` is a fixed list in `extensions/webpack/webpack.config.base.ts`.
  Anything imported from `src/` or `extensions/src/*/src/` and not named in the relevant `externals`
  is compiled into the shipped bundle, and must therefore live in `dependencies`, or it is
  distributed with no notice.

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
