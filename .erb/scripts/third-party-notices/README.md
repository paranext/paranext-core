# Third-party notices generator

Generates `THIRD-PARTY-NOTICES.md` and its lock sidecar `THIRD-PARTY-NOTICES.lock.json` from what
the packaged application actually ships. Both are committed, both ship inside every installer, and
neither is ever edited by hand.

**This file is for maintaining the generator and its policy.** The day-to-day procedure — Ruby
setup, the cold-cache requirement, regenerating, `NOTICES_ACCEPT_SHRINK` — is in the root
[README](../../../README.md#third-party-notices). The reasoning behind the design is
`adr-notices-derived-from-what-ships` and `adr-disclosure-outside-package-graphs` in
[Architecture-Decisions.md](../../../.context/standards/Architecture-Decisions.md); the AGPL/MIT
boundary the document sits beside is [LICENSING.md](../../../LICENSING.md).

## What the document covers, and what it deliberately does not

Attribution obligations attach to the **distributed binary**, so the question is always "is this
redistributed inside an installer?" — never "is it in a `package.json`". A `dependencies` /
`devDependencies` section is not evidence in either direction (bundled dependencies live in
`devDependencies` here by convention; see the
[Code Style Guide](../../../.context/standards/Code-Style-Guide.md)).

Captured, each by an exact mechanism rather than a heuristic:

| What ships                                   | Found by                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------ |
| npm packages compiled into a bundle          | webpack's own module manifests (`.notices/modules/*.json`)                     |
| npm packages inlined into a prebuilt `lib/*` | the prebuilt-lib scan (vite has already flattened them; webpack sees one file) |
| npm packages reached only from a stylesheet  | the stylesheet leaf scan (Tailwind inlines `@import`/`@plugin` before webpack) |
| npm packages packed unbundled                | `release/app`'s own closure, which is what electron-builder packs              |
| npm packages only another platform installs  | `package-lock.json`, via `platformOnlyPackages`                                |
| NuGet packages                               | the union of the restore closure for all four published runtime identifiers    |
| Third-party files copied into an extension   | the static-asset scan, against `staticAssetNotices`                            |
| Ubuntu libraries staged inside the `.snap`   | `electron-builder.json5`, classified by `snapStagePackages`                    |

Deliberately **not** covered, each for a stated reason:

- **Anything that only exists while building or linting.** It is not in the binary.
- **First-party workspace packages.** A `file:` range links to code this repository owns.
- **.NET framework packages** (`runtime.*`, and packages superseded into the shared framework).
  Their payload belongs to the .NET runtime, which the document covers as a whole in prose.
- **Electron itself**, which ships its own notices inside the packaged app — described in prose.
- **Declared runtime dependencies that reach no bundle.** These need an explicit
  `unbundledDependencies` entry; silence is not accepted, because a missing row looks identical to
  a package that was dropped.
- **UI surfacing.** The notices ship as installed files and are not shown in the application. That
  is a decision, not an oversight.

## When the build blocks: which instrument

The generator fails closed. A package it cannot clear stops the run, nothing is written, and the
message names both signals it read plus the exact JSON to paste. Every instrument below lives in
[`notices-policy.json`](./notices-policy.json), each behind a `*Note` field describing it.

| Situation                                                                           | Instrument              | What the entry must establish                                                                      |
| ----------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| Package offers a **choice** of licences (`MIT OR GPL-3.0-or-later`)                 | `elections`             | Which branch this project takes, and why. The elected id must be on `allowed`, off `copyleft`.     |
| Licence **text cannot be identified**, and you have read it yourself                | `exceptions`            | What is actually in that file, a reviewer, a date. Pinned to one version AND one text hash.        |
| Package's own metadata **establishes nothing** (legacy `<licenseUrl>`, proprietary) | `overrides`             | The terms that apply. Free text must set `nonSpdx`, which records that nothing checked it.         |
| Package publishes its terms at a **URL** and bundles no copy                        | `licenseTexts`          | The text, checked in under `vendored-texts/`, hash-pinned and attributed to its source.            |
| Package ships **no readable licence file** at all                                   | `copyrightNotices`      | The notice read from that package's own licence file by whatever route it publishes one.           |
| A third-party file was added under an extension's `assets/`/`public/`               | `staticAssetNotices`    | Why it is there, plus a `sha256` (or `notTracked` if it is fetched at install time).               |
| A library was added to `snap.stagePackages`                                         | `snapStagePackages`     | `copyleft`, `permissive`, or `not-established`. Guessing a specific licence is worse than the gap. |
| A declared `dependencies` entry reaches no bundle                                   | `unbundledDependencies` | Why nothing this repository ships contains it.                                                     |
| A package ships only in another platform's installer                                | `platformOnlyPackages`  | Nothing beyond the name; CI's other legs fail if it is wrong.                                      |

An **allowed licence this project has simply never met** is not a per-package problem: add the
identifier to `allowed`, which is one reviewable line, rather than admitting it invisibly through a
per-package entry.

Any entry above that records an identifier the policy could not previously reach — a new `allowed`
line, but equally an `exceptions`, `elections` or SPDX `overrides` entry — also needs the canonical
text for it in the corpus index, or the document renders an empty licence block for it:

```bash
npm run build:third-party-notices:corpus   # then commit spdx-corpus/index.json with the policy
```

`corpus-texts.test.ts` fails until you do, so this cannot be forgotten silently.

### Choosing between `exceptions` and `overrides`

They answer different questions and are not interchangeable:

- An **exception** says "there IS a licence text here, I read it, and this is what it grants". It
  requires a text to pin to, and it may not override a text that positively identifies as copyleft —
  an exception records what an _unidentifiable_ text is, and that text is not unidentifiable.
- An **override** says "this package's own metadata establishes nothing". It applies only where
  nothing parseable is declared and no text identified. It may carry an `openQuestion` it does not
  settle, which is reported on every run without blocking.

Neither is bounded by a test over the committed policy — the bounds are in the mechanism, because a
data-level test cannot cover an entry added in the same pull request as the change it accompanies.

## Notes that do not block, and how to clear each

A run prints notes alongside its result. None of them fails the build; all of them mean something.
Leaving one standing indefinitely is how the next reader learns to skim past the one that matters.

**"N policy entr(ies) matched no package in this run"** — a recorded determination about a package
that has since left the shipping set. It decided nothing this run, and it would silently start
deciding again the moment that name came back. Delete the entry. Nothing is lost by deleting it: if
the package returns, the gate blocks and asks for the determination again, which is the point.

**"N curated override(s) record a question that has not been answered"** — an `openQuestion`. This
one is not clearable by editing the policy: the field exists so the pipeline says out loud that a
licensing question is open, and deleting it without answering the question is the exact failure the
field was added to prevent. It closes one of two ways — someone with the standing to decide answers
it, in which case record the determination in the entry's `reason` and in
[LICENSING.md](../../../LICENSING.md) and then drop `openQuestion`; or the dependency stops shipping,
in which case the whole entry goes.

**"N stylesheet specifier(s) resolve to no installed package"** — the stylesheet scan found
something shaped like a package reference that resolves against no `node_modules`. Check which it
is before doing anything. A genuinely missing CSS-only package (a pruned font, lockfile-vs-tree
drift in CI) is what the note exists to catch, and the artifact is short until it is installed. A
specifier that names first-party source belongs in `firstPartyStylesheetSpecifier`'s discount
instead — never in the policy, which has no instrument for "not a package at all".

## Governance

There is no named owner; the team maintains this. That is why the failure messages are self-service
and why every escape instrument is pinned.

- Adding an `exceptions` entry, an `overrides` entry, or an identifier to `allowed` is a **code
  review** question, not a build one. The gate treats a new entry exactly like any other.
- `reviewer` is the email of whoever read the package's licence file; `date` is the day they read
  it, not the day the template was pasted.
- An exception is pinned to one version and one text hash, so the block returns the moment the
  package changes its licence text — and the entry has to be reviewed again.
- Only one `exceptions` entry per package. Re-review edits the entry in place; appending a second
  leaves the stale one in force, and `loadPolicy` refuses the file.

## Module map

| File                       | Answers                                                                          |
| -------------------------- | -------------------------------------------------------------------------------- |
| `main.ts`                  | Entry point and wiring; `--verify`, `--verify-document`, `--verify-shipping-set` |
| `shipping-set.ts`          | Which npm packages ship, from the build rather than from manifests               |
| `nuget-set.ts`             | Which NuGet packages ship, unioned across all four runtime identifiers           |
| `static-assets.ts`         | Third-party files copied into an extension's packed output                       |
| `identify.ts`, `detect.rb` | What a licence text on disk is, per `licensee`                                   |
| `declared.ts`              | What a manifest declares, per `spdx-expression-parse`                            |
| `policy.ts`                | Reconciles those two signals into one verdict per package                        |
| `report.ts`                | The block message, and the paste-ready remedy for it                             |
| `render.ts`                | The document itself, including the prose sections nothing can scan               |
| `lock.ts`                  | The sidecar, and every drift comparison against it                               |
| `corpus.ts`                | Canonical SPDX texts, checksum-verified against a pinned `spdx-license-list`     |
| `build-corpus-index.ts`    | Writes that checksum index, for the identifiers the policy can reach and no more |

## Changing the generator

- **Every collector needs a floor.** An empty read is indistinguishable from "nothing ships", and
  reads downstream as a true-sounding claim. `NPM_MIN_PACKAGES`, `DOTNET_MIN_PACKAGES` and
  `SNAP_MIN_STAGE_PACKAGES` exist for that; a new collector needs its own.
- **No verdict path may permit from an absence of information.** Every admission is an allowlist.
- **Adding a production webpack bundle** means registering `EmitShippedModulesPlugin` in its config
  and adding it to `REQUIRED_BUNDLES`. `derived-invariants.test.ts` fails if you do one and not the
  other; a bundle with neither would emit no manifest, require none, and silently shorten the
  document.
- **CI never regenerates, only verifies.** `--verify` re-derives everything and byte-compares
  against the committed pair without writing; regeneration is a deliberate act on a developer's
  Linux machine, whose diff a human reads before committing.
