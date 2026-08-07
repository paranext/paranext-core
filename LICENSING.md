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

| Path                            | Contents                                    |
| ------------------------------- | ------------------------------------------- |
| `src/main/`                     | Electron main process                       |
| `src/renderer/`                 | React UI                                    |
| `src/extension-host/`           | Extension host and PAPI backend             |
| `src/shared/`, `src/node/`      | Cross-process shared code                   |
| `c-sharp/`, `c-sharp-tests/`    | .NET data provider                          |
| `extensions/`                   | The extensions bundled with the application |
| `release/app/`                  | Packaged application metadata               |
| `e2e-tests/`, `.erb/`, `tools/` | Test and build infrastructure               |
| `lib/papi-dts/`                 | Generated PAPI type declarations            |

Anything in this repository not listed under "MIT" below is AGPL-3.0-or-later.

`lib/papi-dts` is AGPL despite living in `lib/` because `papi.d.ts` is generated from the AGPL core
by `npm run build:types` — licensing a mechanical derivative of AGPL source as MIT would have been
ambiguous at best. It carries no obligation for extension authors: it is a `devDependency`
everywhere (including the public extension template), TypeScript erases declaration files at compile
time, so no part of it reaches a built extension, and nothing about it is conveyed onward.

### What the AGPL adds over the GPL

AGPL section 13 extends the copyleft obligation to network use: if a modified version of this
software is made available to users over a network, those users must be offered the corresponding
source of the modified version. This has no effect on local desktop use of Platform.Bible, but it
does apply to any hosted or server-side deployment derived from this code.

## MIT

The developer libraries published to npm for extension authors. These stay MIT deliberately, so that
third-party extensions built against them are **not** obligated to adopt the AGPL.

| Package                               | Path                                       |
| ------------------------------------- | ------------------------------------------ |
| `platform-bible-react`                | `lib/platform-bible-react/`                |
| `platform-bible-utils`                | `lib/platform-bible-utils/`                |
| `eslint-plugin-paranext`              | `lib/eslint-plugin-paranext/`              |
| `browserslist-config-detect-electron` | `lib/browserslist-config-detect-electron/` |

Each carries its own `LICENSE` file containing the MIT text.

### Moving code across the boundary

Because the boundary is expressed by directory rather than by per-file headers, **moving a file
between `lib/` and the AGPL tree changes its license.** Code moved out of `lib/` into the core
application becomes AGPL. Code moved _into_ `lib/` from the core application does **not**
automatically become MIT — that is a relicensing act requiring the copyright holders' agreement.
Treat any such move as a licensing decision, not a refactor.

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

No dependency obstructs this. A scan of the production tree found no GPL- or LGPL-only components.
The only copyleft-adjacent packages that ship are dual-licensed, and Platform.Bible elects their
permissive branch (`jszip` → MIT, `dompurify` → Apache-2.0); the MPL-2.0 packages found
(`axe-core`, `lightningcss`) are build-time only and are not distributed.

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
- **[THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md)**, which carries the attribution obligations
  of the bundled MIT/BSD/ISC/Apache dependencies. These apply to the binary regardless of the terms
  it ships under. Regenerate it with `npm run build:third-party-notices` whenever production
  dependencies change.

## Inbound contributions

Contributions are accepted under the Paratext Contributor License Agreement, whose copyright grant
is broad enough to permit both this relicense and separate terms for the binary: contributors grant
a perpetual, worldwide, irrevocable license to reproduce, prepare derivative works of, **sublicense**,
and distribute their contributions. Sublicensing is the specific right that makes both possible.

Contributions predating the CLA programme arrived under the repository's then-current MIT License,
which itself grants the right to sublicense and to sell. That is the basis on which pre-CLA
contributions are carried into the AGPL source and into a differently-licensed binary. The
obligation that comes with it is notice retention: the MIT notice under which that code was
contributed must continue to be reproduced, which the copyright attributions in this file do.

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
