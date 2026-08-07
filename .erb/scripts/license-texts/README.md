# Canonical license texts

One file per SPDX license identifier, holding that license's canonical text. `.txt` because these are
verbatim legal text, not Markdown, and nothing is allowed to reflow them.

`generate-third-party-notices.js` reproduces these when a dependency **declares** a license identifier
but **ships** no license file of its own. Most permissive licenses require their own text to travel
with the software ("this permission notice shall be included in all copies"), and an identifier in a
table does not discharge that. Roughly a quarter of the NuGet closure and a handful of npm packages
are in that position, so without these files the notices file would name a license it never
reproduces.

## Why they are checked in rather than fetched

`npm run build:third-party-notices` has to be hermetic. CI regenerates `THIRD-PARTY-NOTICES.md` on
every pull request and fails if the committed copy differs, so a generator that reached the network
would make a legal artifact depend on a third-party host being reachable and on whatever it happened
to serve that day. **Nothing in the generation path opens a socket, and nothing added here may
change that.**

## Provenance

Each file is the `licenseText` field of the matching entry in the official SPDX license list, at tag
`v3.28.0`:

```
https://github.com/spdx/license-list-data/blob/v3.28.0/json/details/<SPDX-ID>.json
```

Two mechanical normalizations are applied and nothing else: line endings to LF, and trailing
whitespace stripped (SPDX's `BSD-2-Clause.txt` carries one such line, an artifact of its XML-to-text
conversion). No word of any license is edited.

**The placeholders are SPDX's own and must stay as they are** — `<year>`, `<copyright holders>`,
`<owner>`, `[yyyy]`, `[name of copyright owner]`. They are what makes the text recognizable as the
license itself rather than as some particular package's copy of it. The generator pairs each
reproduction with the declaring package's own copyright notice instead of filling them in, so no
copyright holder is ever invented.

Where the same text also ships verbatim inside `node_modules`, that was used as an independent
cross-check that the SPDX form matches what upstream projects actually distribute:

| File               | Covers                                                                        | Cross-checked against                                                                                          |
| ------------------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `MIT.txt`          | The MIT-declaring npm and NuGet packages that ship no license file            | `node_modules/jiti/LICENSE` (body identical; only the copyright line differs)                                  |
| `Apache-2.0.txt`   | `Microsoft.Extensions.ObjectPool`, `rc-new-window`, and `CsvHelper` (elected) | `node_modules/spdx-correct/LICENSE` (identical, placeholders included)                                         |
| `BSD-2-Clause.txt` | `Markdig.Signed`                                                              | `node_modules/normalize-package-data/LICENSE` and six others (body identical; only the copyright line differs) |
| `Zlib.txt`         | `Spart`                                                                       | No verbatim copy in the tree — SPDX only                                                                       |
| `Unicode-3.0.txt`  | `Microsoft.ICU.ICU4C.Runtime` (Windows-only)                                  | No verbatim copy in the tree — SPDX only                                                                       |

## Adding one

Add a file only when the generator needs it — that is, when a package that ships no license file
starts declaring an identifier not listed above. The generated file names the packages it could not
reproduce a text for, so the gap reports itself rather than having to be remembered.

1. Take the `licenseText` verbatim from `https://github.com/spdx/license-list-data` at a **tagged**
   release, not from `main` and not from a search result.
2. Name the file exactly as the SPDX identifier, plus `.txt` (the generator matches
   case-insensitively, so `MIT.txt` resolves `MIT` and `mit` alike).
3. Update the table above with what it covers and how it was cross-checked.
4. Regenerate and read the diff: the new text should appear under "Canonical license texts for
   declared identifiers", and the package should drop out of the "reproduce no license text at all"
   list.
