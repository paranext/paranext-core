# PR #2654 - round 4 reply drafts

> **Draft only.** Nothing here has been posted. Written before the round-4 implementation landed, so
> every claim about what a change does is written in the present/future and every claim that would
> need evidence we do not yet have is marked `[VERIFY: ...]` for the parent session to reconcile.

- Repository: `paranext/paranext-core`, PR #2654 ("Relicense source to AGPL-3.0-or-later")
- Reviewed commit: `61858f6e2ba`
- Threads: 28 open (findings 1-6, 8, 10-25, 27-30)
- Source brief: `triage-brief-round4.md` in this directory

Disposition counts: **FIXED 20** · **PARTIAL 2** (10, 29) · **TICKETED 1** (3) · **DECLINED 5** (2, 18, 20, 26, 30)

---

## Summary comment (PR conversation level)

Round 4 triage. Every mechanism in the 28 open threads was re-derived against `61858f6e2ba`. 24 hold
exactly as written. Four moved: **2** is refuted, **10** is half stale, **21**'s mechanism is right
but its suggested fix reintroduces the crash the code it touches exists to prevent, and **26**'s
remedy would make a false statement in a case the docstring already names.

**Accepted and changed here (22):** 1, 4, 5, 6, 8, 10 (web-view half), 11, 12, 13, 14, 15, 16, 17,
19, 21, 22, 23, 24, 25, 27, 28, 29.

19 and 21 were pulled forward rather than ticketed because each is cheaper than the ticket that would
defer it - a deletion, and a two-line listener swap.

Three things triage found that you did not raise are in the same commit: the `TODO(PT-4560)` round 3
asked for in `.erb/scripts/third-party-notices/`; one sentence on why `electron-builder.json5:74`
still builds a snap nothing publishes; and one sentence in `adr-core-does-not-distribute-a-binary`
naming the S3 upload at `publish.yml:266` - the bucket is not public, so LICENSING.md:195 stands as
written and it was only the ADR's silence that needed closing.

**Ticketed (2).** 3 becomes PT-4560, "Inventory the packed static-asset trees by content, not by
filename" (https://paratextstudio.atlassian.net/browse/PT-4560), deliberately scoped to cover your
round-3 conversation item 3 as well, because they are the same gap: an inventory that sees only
notice-SHAPED filenames, and attribution files pinned and reproduced by nothing.

30 becomes PT-4572 (https://paratextstudio.atlassian.net/browse/PT-4572). You handed us that one as a
judgement call and we would rather not settle it by argument, so it was measured: `clean.ts`'s cache
glob costs **133s cold against 18-24s warm**, about 110 seconds and roughly 6x on every invocation,
paid by every local `npm run package` and every downstream `package-core`. That is not in the noise,
so your suggestion is taken - as its own change, because it alters the build entry point every
downstream repository calls. Details and methodology are on the thread and in the ticket.

**Declined, with reasons on the threads (4):** 2, 18, 20, 26 - plus the resolver half of 10.

18 and 20 are declined and deliberately not ticketed. Both mechanisms are confirmed. Both are latent
with no trigger anywhere in the tree, and both fixes change the path that decides which rows the
legal document carries - resolution order in one, lock-key resolution in the other. That is a cost
decision about latent defects rather than a disagreement, and a reason recorded on the thread is more
useful than a ticket sitting open against a case nobody can reach.

**Framing.** These findings are real, and three of them (4, 8, 22) are live in a committed or
published artifact. But the severity ceiling of this round is lower than round 3's, and it is worth
saying plainly: nothing here changes what a user receives, and nothing changes what license anything
ships under. 4 and 22 are a wrong row and wrong wording inside `THIRD-PARTY-NOTICES.md`; 8 is
release-page prose. The rest are gates that fail open on cases the tree does not currently contain,
or invariants that assert less than they claim. That is the difference between "this is not ready"
and "these are worth fixing before it lands", and this round is the second.

**Four defects our own round-4 changes introduced, found before committing rather than by you.**
Naming them because each is a fix being larger than the finding that prompted it, and because three
of the four are the fail-open shape this pipeline exists to refuse:

- Moving `packedExtensionNames` to `extensions/dist` (5) made "no extensions" a REACHABLE answer, and
  it returned `[]` - which drops every gated prose section from the document AND from the lock
  written in the same run, so the two agree and the byte-compare has nothing to catch. It throws.
- Opening the below-threshold case (12) meant the exception template was now printed there, filling
  `spdx` from `detected` - which in exactly that case is the inadmissible objecting-file id, the one
  value `applyException` always refuses. Handing over a paste-ready entry the gate rejects is worse
  than the withheld template we opened the case to avoid.
- Adding the staleness check (15) covered the harmless direction. A copy rule with NO policy entry -
  a native library shipping undisclosed - stayed open, and our own change is what made it closeable.
- The placeholder sweep (11) covered `reason`, `reviewer` and `note` but not `license`, and
  `nonSpdx: true` is precisely what stops that value being parsed again, so the template's own
  wording would have reached the document and the lock as a shipped package's terms.

All four have tests and were mutation-checked. Regenerating afterwards produced an identical artifact,
which is what confirms they are gate hardening rather than output changes.

**Verification.** `npm run typecheck` clean on all four legs. `npm run lint` exit 0, with the one
pre-existing warning in a file this change does not touch. `dotnet test c-sharp-tests/` 1725 passed,
0 failed. Every test passes: `test:core` 271 files / 4290 tests, and the workspace pass after it,
including `platform-lexical-tools`' 57 and `platform-bible-react`'s 1449.

`npm test` nonetheless exits 1, and the reason is worth stating plainly rather than reporting a green
run. Two pre-existing flakes, neither in code this branch touches:

- `test:core` intermittently raises an unhandled rejection in
  `src/renderer/services/web-view.service-shard.test.ts` ("Timeout reached when waiting for
  `web-view.service-shard.platformDockLayout` to settle"). Every test passes; the run exits 1 anyway.
  It fired on two of three full runs here.
- `platform-bible-react`'s `marketplace.stories.tsx > Extension More Info` timed out at 15s once and
  passed in 360ms on re-run. That workspace is untouched by this branch.

The first one has a consequence beyond its own noise, and it is how a test this branch broke stayed
invisible until it was checked by hand: `npm test` is `test:core && npm run test --workspaces`, so a
flake in the first half silently skips every workspace suite - all of `extensions/src`, `lib/` and
the rest. The failure names only the flake. Worth its own ticket; a flaky test that disables a whole
tier of the suite is a different problem from a flaky test. See the thread on 21.

The notices pipeline was run end to end from a cold cache - `build`, `build:extensions:production`,
`build:third-party-notices` - and `verify:third-party-notices` and
`verify:third-party-notices:document` both pass against the regenerated pair. The document diff is
+115/-148 and is exactly four effects: `@testing-library/react@16.2.0` out of the lock, the table,
the counts and license text section 11 with the renumbering that follows; the ICU split; the
`rc-new-window` wording; and two escaped holder strings. CI has not reported on the push yet at the
time of writing - I will say so on the thread if any leg comes back red.

_(AI-assisted, with my guidance)_

---

## Finding 1 - `statesTerms` uses an extension allowlist

- Comment id: `3960661388`
- Thread: `PRRT_kwDOIyvJf86gWRa3`
- Path: `.erb/scripts/third-party-notices/static-assets.ts:65`
- Disposition: **FIXED**

Accepted, and the table is reproducible: `COPYING.LESSER`, `LICENSE.GPL`, `LICENSE.MIT` and
`NOTICE.rtf` all return `false`, because `NOTICE_DOCUMENT` is tested against `path.extname(name)`
before either name pattern is consulted.

`isLicenseTextFileName` and `isNoticeFileName` are now consulted first, but as an ADDITIONAL
accepting branch rather than as a replacement - a straight swap would have traded one narrowing for
another. Neither predicate matches `ATTRIBUTION.md`, `SOURCE.md`, `CREDITS`, `AUTHORS` or
`COPYRIGHT`, because a package root has no need of that vocabulary and a copied asset tree does;
`extensions/src/quick-verse/assets/ATTRIBUTION.md` is the live entry this module was written for and
would have been dropped. So the denylist-plus-stem test accepts first, and the existing patterns
still run for what it does not reach.

One addition beyond your table: `NOTICE.rtf` still failed after that change, because
`package-files.ts` denies `rtf` - correctly, for its own question, since RTF markup reproduced inside
the document would be noise. `rtf` is added to `NOTICE_DOCUMENT` here with that distinction recorded:
that list decides what may be REPRODUCED, this one decides what has to be RECORDED, and a notice this
gate cannot see is a notice nobody has to account for.

Verified against the whole table you posted plus the guards the old shape existed for:
`COPYING.LESSER`, `LICENSE.GPL`, `LICENSE.MIT` and `NOTICE.rtf` are now `true`; `license.png`,
`IP-Country.zip`, `attributes.d.ts`, `IconCopyright.mjs` and `.gitattributes` are still `false`. The
found-set on this repository is unchanged at five files, all already recorded.

The `TODO(PT-4560)` you asked for in round-3 conversation item 3 lands in this file too - see the
reply on 3.

---

## Finding 2 - the terser fix reaching only the aggregate web-view config

- Comment id: `3960661393`
- Thread: `PRRT_kwDOIyvJf86gWRa8`
- Path: `extensions/webpack/webpack.config.web-view.ts:105`
- Disposition: **DECLINED** (refuted)

Checked, and this one does not hold. All ten `extensions/src/*/webpack/webpack.config.web-view.ts`
files are 29 lines long, and the shared region is the whole file: `// #region shared with
.../webpack/webpack.config.web-view.ts` on line 1, `// #endregion` on line 29. There is nowhere in
any of them to put an `optimization.minimizer` block that is not a divergence from the template.

The `webpack.config.main.ts` precedent runs the other way. Those files are 94 lines and their shared
region is lines 11-47; the `CopyPlugin` `patterns` array the `LICENSE` entry was added to starts at
`:60`, outside it. So duplicating the main-config change was possible precisely because that file has
an unshared tail, and not duplicating the web-view change is what the file layout forces rather than
an oversight. That is what `TODO(PT-4477)` means when it says the fix belongs in
`paranext-multi-extension-template`.

The consequence you describe for the per-extension `package` zips is real, and PT-4477 is open
against it. We are tightening the TODO so the next reader does not have to re-derive the layout -
citing the boundary concretely (web-view region lines 1-29, main region ending at `:47`) rather than
leaving "shared regions end to end" as an assertion.

To be exact about what changed there: the TODO already said "shared regions end to end". What it did
not do was show the working, so it now cites both boundaries - the web-view region running line 1 to
line 29, and the main config's ending at `:47` with the copy patterns below it - which is what makes
the asymmetry checkable from the file rather than taken on trust.

---

## Finding 3 - the lexical-DB attribution files are verified by nothing

- Comment id: `3960661400`
- Thread: `PRRT_kwDOIyvJf86gWRbA`
- Path: `.erb/scripts/third-party-notices/static-assets.ts:265`
- Disposition: **TICKETED**

Accepted as a gap; not taken in this PR.

Everything you state about the current position is right. `notices-policy.json` marks both
`LICENSE.md` and `SOURCE.md` `notTracked: true`, which exempts them from the hash pin here and from
reproduction; `download-db.ts:42` fetches them with no checksum and re-fetches on every install; and
`render.ts:582`'s section asserts unconditionally that they ship. The claim is not false today - they
do ship - but nothing would notice if they stopped.

It is the same gap as your round-3 conversation item 3 (the static-asset inventory seeing only
notice-SHAPED filenames): both need the packed trees inventoried by CONTENT rather than by filename,
and the presence assertion you suggest is build-dependent, so where it lives - `packaging.test.ts`
after the production extension build, or its own leg of the packaging job - is a design question
rather than a one-line fix.

One Dev Task covers both: **PT-4560**, "Inventory the packed static-asset trees by content, not by
filename" - https://paratextstudio.atlassian.net/browse/PT-4560. This PR adds the `TODO(PT-4560)` in
`static-assets.ts` that round 3 asked for, so the ticket is reachable from the code rather than only
from a review thread.

---

## Finding 4 - `@testing-library/react@16.2.0` disclosed as redistributed software

- Comment id: `3960661407`
- Thread: `PRRT_kwDOIyvJf86gWRbF`
- Path: `.erb/scripts/third-party-notices/shipping-set.ts:1458`
- Disposition: **FIXED**

Accepted, and it is live exactly where you say: the table row at `THIRD-PARTY-NOTICES.md:2741`, the
full reproduced text as section 11 at `:3214`, and the lock row at `THIRD-PARTY-NOTICES.lock.json:794`.

Worth spelling out why this one is safe to fix rather than just widening the regex. The comment at
`shipping-set.ts:445` says narrowing `findPrebuiltSources` REMOVES rows from the notices document,
and that is the direction this pipeline refuses to take on a guess. This is not a guess.
`footnote-editor.test-harness.tsx` is imported by five files, all `*.test.tsx` in the same directory,
and by nothing else - `footnote-editor.stories.tsx` and `footnote-editor.fixtures.ts` name it in
prose only, and `footnote-editor.fixtures.ts` exists specifically so the Storybook story can share
the fixtures WITHOUT pulling in `@testing-library/react`. Its own docstring says the name is
intentionally outside the `*.{test,spec}.*` glob so Vitest does not collect it. So it reaches no
bundle, and the row is a claim about redistribution that is not true.

Both filters are widened - `findPrebuiltSources` at `:1458` and the sibling filter at `:449` - so the
omission guard stops corroborating the false row off the same file rather than catching it. The
artifact regenerates rather than being hand-edited: the table row, the reproduced license section and
the lock row all go, produced by the full pipeline on Linux.

Regenerated and checked: `@testing-library/react` appears zero times in either artifact now. The lock
loses its entry, the npm count goes 222 to 221 and the MIT count 193 to 192, license text section 11
goes with the renumbering that follows it, and nothing else in the document moved for this change.

---

## Finding 5 - `packedExtensionNames` reads `extensions/src`

- Comment id: `3960661417`
- Thread: `PRRT_kwDOIyvJf86gWRbO`
- Path: `.erb/scripts/third-party-notices/static-assets.ts:149`
- Disposition: **FIXED**

Accepted. `electron-builder.json5:90` packs `./extensions/dist/`, so reading `extensions/src`
answered "is this folder in git", which is not what the two gated prose sections' docstrings claim
they are asserting. `packedExtensionNames` reads `extensions/dist` now. Its only caller is
`main.ts:828` on the full-report path, which already requires a completed build, so the read is
answerable there.

One thing the move introduced that we caught reviewing our own change, since it is the failure mode
this pipeline exists to refuse. Reading `dist` makes "no extensions" a REACHABLE answer, which
reading `src` never was - and it fails open: an empty set drops every gated prose section from the
document AND from the lock written beside it in the same run, so the two agree with each other and
the byte-compare has nothing to catch. A missing `extensions/dist` therefore throws, naming the build
step, rather than reading as "this build packs no extensions". Two tests cover it, and the guard is
mutation-checked - restore the `return []` and the second one fails.

`packedStaticTrees` (`:118`) reads `extensions/src` too and you did not flag it. It deliberately
stays there, and the docstring now says why, because the two functions ask opposite questions. That
one is a COMMITTED-content gate: every file it finds is hash-pinned in `notices-policy.json` by its
repo-relative source path and reproduced verbatim from there by `staticAssetNoticeTexts`, so a `dist`
path would pin build output no reviewer reads and no clone holds - and `dist` is empty until
something builds it, so a gate reading it would pass by finding nothing, which is silence on the
exact question it exists to refuse a build over. `packedExtensionNames` moves because it asks "did
this build carry it", which is the question `dist` is the right answer to.

---

## Finding 6 - `lib/`-only first-party test in the two leaf scans

- Comment id: `3960661426`
- Thread: `PRRT_kwDOIyvJf86gWRbX`
- Path: `.erb/scripts/third-party-notices/shipping-set.ts:1397`
- Disposition: **FIXED**

Accepted, with one correction to the finding. The comment at `:1390` claims parity with
`collectPrebuiltLibLeaves` ("the same two guards `collectPrebuiltLibLeaves` applies"), not with
`importedPackages`. The two leaf scans do match each other; what neither matches is
`isFirstPartyWorkspace` (`:373`), which is the predicate that actually answers the question - follow
the symlink, and ask whether the real directory is inside the repository but outside any
`node_modules`. So the comment is accurate and the code is still wrong, and the fix is the same
either way.

Both sites (`:1397` and `:1598`) call `isFirstPartyWorkspace` now. The mechanism holds as you
describe it: `node_modules/platform-scripture` is a symlink to `extensions/src/platform-scripture`,
and with the extensions stamped `AGPL-3.0-or-later` by this PR a single sibling-extension `@import`
would put this repository's own code through the copyleft gate and hard-block the generator.

---

## Finding 8 - `.github/assets/release-body.md` still advertises the removed downloads

- Comment id: `3960661431`
- Thread: `PRRT_kwDOIyvJf86gWRbc`
- Path: `.github/workflows/publish.yml:249`
- Disposition: **FIXED**

Accepted. It is `bodyFile:` for a draft release that now attaches nothing, so "Download the `.exe`",
"Download the `.dmg`", "Install from the Snap Store" and the snapcraft badge were advertising assets
that are not there - on the first thing anyone reading a release sees, and in direct contradiction of
`adr-core-does-not-distribute-a-binary` and LICENSING.md's "The distributed application" section.

`release-body.md` is rewritten the way `README.md`'s Users section was rewritten in this PR: it points
at `paranext/paratext-10-studio` and drops the download instructions and the badge.

---

## Finding 10 - the module-allowlist guard is a source scan

- Comment id: `3960661438`
- Thread: `PRRT_kwDOIyvJf86gWRbh`
- Path: `src/extension-host/services/extension.service.module-allowlist.test.ts:78`
- Disposition: **PARTIAL**

Split verdict.

**Taking the web-view half.** `global-this-web-view.model.ts`'s map is extracted into a `*.data.ts`
so `readWebViewModuleSpecifiers` compares a VALUE instead of matching
`/moduleMap\.set\('([^']+)'/g` over source text. Your point about the zero-matches guard is exactly
why: it throws only when NO `.set()` call survives, so one remaining call satisfies it while the rest
of the map moves out from under it. This is the same treatment the extension-host half got in round 3
(`extension-interface-modules.data.ts`), and it is contained.

**Declining the resolver half.** `extension.service.ts` cannot be imported from a test: it creates
directories at module scope, and installing the `Module.prototype.require` shim is a side effect of
`activateExtensions`, which in the same function deletes `globalThis.eval`/`Function` and replaces
`fetch`/`XMLHttpRequest`. That is why the shim dispatches from `EXTENSION_INTERFACE_MODULE_SPECIFIERS`
in a module that imports nothing, and why the test compares that value - the seam was moved into the
data rather than opened in the service. Exporting and calling the resolver means giving that module a
seam it does not have, and we do not think this PR is where that happens.

On `not.toMatch(/moduleName === /)`: you are right that `startsWith`, `includes`, `switch` and `==`
all defeat it, and we are not claiming otherwise. It is a cheap tripwire over one spelling, not a
behavioral test. The load-bearing assertion in that block is the one above it -
`toContain('EXTENSION_INTERFACE_MODULES[moduleName]')` - which is the one you mutation-verified in
round 3 with `moduleName === 'fs'`. The web-view extraction is the part of your suggestion that buys
real falsifiability, so that is the part being taken.

The module is `src/renderer/data/web-view-modules.data.ts`, exporting
`WEB_VIEW_MODULE_SPECIFIERS` as a `const` tuple and importing nothing. It went one step further than
your suggestion: the map in `global-this-web-view.model.ts` is typed as a `Record` over that union,
so a module supplied with no specifier listed, or a specifier listed with no module supplied, is a
compile error rather than a silent widening. `webViewRequire`'s body is unchanged and the lookup is
still a `Map`, so `constructor` and `toString` still resolve to nothing.

---

## Finding 11 - the policy templates clear the gates they were written to trip

- Comment id: `3960661448`
- Thread: `PRRT_kwDOIyvJf86gWRbn`
- Path: `.erb/scripts/third-party-notices/policy.ts:274`
- Disposition: **FIXED**

Accepted on all three counts, and the comment is being corrected with them.

`versionIndependent` (`policy.ts:901`) and `nonSpdx` (`:927`) are truthiness tests, and `loadPolicy`
does no type validation while `types.ts` declares both `boolean?` - so the template's
`'<true instead of "version" if it holds at any version>'` and
`'<true if "license" above is free text...>'` are non-empty strings that clear both gates. Both now
require `=== true` and reject a non-boolean explicitly, so a half-filled paste is refused with a
message that says which field and why.

The placeholder check is extended from `entry.reason` to `reviewer` and `note`, so
`reviewer: '<your email>'` no longer stands unchallenged as the recorded human determination.

And to `license`, which reviewing our own fix showed was the one that mattered most and the one we
had missed. An override supplying `note`, `nonSpdx: true` and `versionIndependent: true` satisfied
every other gate while `license` still read `<SPDX identifier, or a short free-text determination>` -
and `nonSpdx` is precisely what stops that value being parsed, so nothing downstream looked at it
again. The template's own wording would have travelled into the document and the lock as the terms a
shipped package is under. Both fields are pinned by tests now; there were none on this path before.

And the comment above the override template said that a reader pasting it "hits both". That was
false, and it was the sentence that made the template look safe, so it is rewritten to state what the
gates actually do now.

---

## Finding 12 - `exceptionRemedy` is wrong in both directions

- Comment id: `3960661457`
- Thread: `PRRT_kwDOIyvJf86gWRbw`
- Path: `.erb/scripts/third-party-notices/report.ts:86`
- Disposition: **FIXED**

Accepted in both directions, and the comment at `report.ts:75` goes with them.

That comment asserts "`detected` is `best.spdxId`, and `best` is only ever a file at or above the
confidence threshold ... Nothing weaker reaches this test." `policy.ts:1250` sets
`detected: objectingFile ? objectingFile.spdxId : best?.spdxId`, and `objectingFile` comes from
`objectingUnusableFile`'s `unusableDisallowed` (`:678`), which is by construction a file NOT in
`usable` - a below-threshold match. So the premise the whole function rests on is false, and the
false-refusal branch follows from it directly: a 97% copyleft match is told a reviewed exception
cannot clear the block and pointed at an `elections` entry `classify` never reaches, because `:1302`
returns on `reconciliationBlocked` first. `policy.test.ts:1678` already asserts an exception DOES
clear that case, so the tool and the test disagree today.

The false-offer direction is the same bug read the other way. `exceptionRemedy` decides from
`v.detected`; `withException` clears from `usableDisallowed`. A block resting on a usable disallowed
file whose `detected` is admissible therefore gets a hash-filled, paste-ready template for a bound
that can never accept it - and this is the one instrument that unblocks a stopped build, in front of
a reader who by construction has no prior context.

`exceptionRemedy` is now bounded by the same `usableDisallowed` fact `withException` uses, so the
remedy and the gate cannot disagree about what an exception may clear.

This could not be confined to `report.ts`, which is worth saying because it makes the fix bigger than
the finding. `ReportRow` carries no way to tell "the detected id came from an above-threshold file"
from "it came from the below-threshold objecting file", and case (a) is not recoverable from
`confidence` either, since the blocking fact there is a SECOND usable file. So the fact is recorded
where it is established: `usableDisallowedId` and `usableDisallowedFile` on the verdict, computed
once in `classify` and read by both `withException` and the remedy. `buildLock` picks its fields
explicitly, so the lock is unchanged.

Both directions are pinned by new tests - "offers the exception for a copyleft match BELOW the
confidence threshold" for the false refusal, and "withholds the exception when a bundled extra
carries the identification" for the false offer.

One follow-on this fix created, found reviewing our own change rather than by you. Opening the
below-threshold case means the template is now printed there, and the template filled `spdx` from
`v.detected` - which in exactly that case is the objecting file's id, inadmissible by definition. So
the reader would have been handed a hash-filled entry `applyException` refuses on the one field it
checks: a worse outcome than the withheld template we opened the case up to avoid. `detected` now has
to be admissible to lead, and falls back to `admissibleSpdx` - which answers with an operand the
policy accepts, or with a placeholder, and a placeholder is the honest answer for a text nobody has
identified. Pinned by a third test and mutation-checked.

---

## Finding 13 - the shim invariant is vacuous

- Comment id: `3960661464`
- Thread: `PRRT_kwDOIyvJf86gWRb0`
- Path: `.erb/scripts/third-party-notices/derived-invariants.test.ts:364`
- Disposition: **FIXED**

Accepted. `System.Net.WebSockets` is absent from `ParanextDataProvider.csproj` entirely - it survives
only in the comment at `:68` - so `matching` is `[]` for that shim and `forEach` asserts nothing. The
test now asserts each id in `SHIMS` is absent from the derived closure, which is the property
LICENSING.md actually records, rather than iterating whatever the csproj happens to declare.

On the PR body: you are right that "kept" is the wrong word for `System.Net.Http`. The csproj ADDS
that reference at `:71` with `ExcludeAssets="all"`, deliberately, so `SIL.Core`'s transitive pull
does not resolve the netstandard1.6 assembly into the restore assets file even though publish
discards it.

Checked against `main` rather than against the PR's own history, and you are right in the stronger
sense: there was no `System.Net.Http` reference before this branch at all. The diff removes
`System.Net.WebSockets` 4.3.0 and adds `System.Net.Http` 4.3.4 with `ExcludeAssets="all"`. "Kept" was
written relative to an earlier revision of this PR, where the reference and its comment already
existed; against the base branch it is simply the wrong word. The body now says what the diff does in
both directions - removes the `System.Net.WebSockets` 4.3.0 reference outright, adds an
`ExcludeAssets="all"` reference for `System.Net.Http` 4.3.4 that was not there before - and keeps the
reasoning underneath it. It is already updated on the PR.

---

## Finding 14 - the ICU paragraph is unconditional prose citing a gated section

- Comment id: `3960661468`
- Thread: `PRRT_kwDOIyvJf86gWRb4`
- Path: `.erb/scripts/third-party-notices/render.ts:784`
- Disposition: **FIXED**

Accepted, with the fix one step narrower than the suggestion. Gating the whole paragraph would have
suppressed a claim that is true unconditionally: the Windows half rests on
`Microsoft.ICU.ICU4C.Runtime`, which is a real row in the NuGet table and the target of a "(see
below)" reference two paragraphs up, so it does not depend on `copiedPlatformLibraries` at all.

The paragraph is split on the fact each half rests on. The Windows sentence stays unconditional; the
Linux/macOS sentence - the one that says the libraries are copied off the build machine and points at
"Native libraries copied from the build machine" - is gated on that table being non-empty, so it
cannot outlive the heading `pushCopiedPlatformLibrarySection` (`:662`) suppresses. Verified both
ways: the golden fixture has an empty table and drops it, the real document has a non-empty one and
keeps it. Same class as round-2 finding 23.

---

## Finding 15 - `copiedPlatformLibraries` has no staleness check

- Comment id: `3960661476`
- Thread: `PRRT_kwDOIyvJf86gWRb9`
- Path: `.erb/scripts/third-party-notices/report.ts:318`
- Disposition: **FIXED**

Accepted. `stalePolicyEntries` covers elections, exceptions, overrides, copyrightNotices,
licenseTexts and unbundledDependencies, and `snapStagePackages` and `staticAssetNotices` carry their
own - `copiedPlatformLibraries` was the only table with neither.

It needed more than the same shape, though, because there is nothing to difference it against: the
table is keyed by library rather than by `ecosystem:name`, so no verdict list answers "is this entry
still live". The check now derives the live set from the build itself -
`copiedPlatformLibraryStems()` reads the csproj's absolute `<Content Include>` globs and yields
`['libicu']` - and `stalePolicyEntries` takes that as a third input. So deleting the `libicu*` copy
steps now makes the entry report as stale, which is the property the finding asked for.

Having the live set made the OTHER direction closeable, so it is closed in the same change.
Staleness is the harmless half - an entry describing a library that stopped shipping is a claim too
many. The half with a consequence is a copy rule with no entry: add an absolute
`<Content Include="/usr/lib/.../libfoo*.so">` today and that library reaches every installer
undisclosed, belonging to neither package graph and visible to nothing else in this pipeline.
`assertCopiedPlatformLibrariesRecorded` now refuses it before the artifact is composed, beside the
other whole-set assertions. That was not in your finding; it is the direction your finding made
reachable.

---

## Finding 16 - `addCopiedPlatformLibraryTexts` silently drops a text-less identifier

- Comment id: `3960661485`
- Thread: `PRRT_kwDOIyvJf86gWRcF`
- Path: `.erb/scripts/third-party-notices/render.ts:1069`
- Disposition: **FIXED**

Accepted, and the docstring is corrected with the code. `if (!text) return;` drops the identifier
while the section this feeds states the text is reproduced below, and the guard the docstring cites
(`main.ts` refusing an identifier not on `allowed`) checks `policy.allowed`, not corpus membership -
which is the fact `canonicalText` actually needs. So the docstring's "the corpus holds a text for
every one that reaches here" is not established by the guard it names.

It throws at the drop site rather than extending the guard, and the message names the remedy
(add the identifier to `allowed` and re-run the corpus build, or record terms the corpus holds). The
docstring no longer cites `policy.allowed` as though it established corpus membership.

---

## Finding 17 - the exception template records one operand of an `AND`

- Comment id: `3960661486`
- Thread: `PRRT_kwDOIyvJf86gWRcG`
- Path: `.erb/scripts/third-party-notices/report.ts:117`
- Disposition: **FIXED**

Accepted, and `conjunctionBlocked` does set `detected` - `policy.ts:425` spreads `common`, and
`common` (`:1249`) carries it. So the chain closes as you wrote it: a `(MIT AND Zlib)` package with
an MIT-identified file reaches `report.ts:117`, `v.detected || admissibleSpdx(...)` short-circuits on
the left, and the generated template records `"spdx": "MIT"`.

The rest follows without help. `applyException` accepts a single admissible id, `render.ts:419` then
computes `compound = false`, and the Zlib text is reproduced nowhere. `admissibleSpdx`'s
keep-the-conjunction-whole path (`report.ts:46`, the `return declaredField` for a declaration with a
conjunction) exists precisely so the template records every operand, and short-circuiting past it
made that path unreachable in the one case it was written for. The hand-written `npm:pako` entry is
the case it is modelled on.

`exceptionRemedy` now prefers `admissibleSpdx` when the declaration is a conjunction, so `detected`
no longer wins over a declaration that names more terms than it does.

---

## Finding 18 - `packageOfSpecifier` cannot tell a builtin from an installed package

- Comment id: `3960661494`
- Thread: `PRRT_kwDOIyvJf86gWRcM`
- Path: `.erb/scripts/third-party-notices/shipping-set.ts:1266`
- Disposition: **DECLINED**

Mechanism confirmed. `packageOfSpecifier` returns `undefined` for any name in `builtinModules` before
any resolution is attempted, and `buffer`, `events`, `punycode` and `string_decoder` are all
installed in this tree - `string_decoder` ships and has a lock row reached through the module graph.
A bare `import ... from 'buffer'` in a `lib/*` source would be discarded there and never recorded in
`unresolvedStylesheetSpecifiers`, at exit 0. That is the shape you describe, and it is the blind spot
`collectPrebuiltLibLeaves` exists to close.

Declining anyway, and this is a cost decision rather than a disagreement. No import of that shape
exists in the tree, and the fix inverts the order of `packageOfSpecifier`'s two tests - resolve
first, discard only on no result - in the path that decides which rows the legal document carries.
Changing resolution order there to close a defect with no trigger is more risk than the defect
currently carries.

Not ticketing it either, for the same reason: a ticket sitting open against a case nobody can reach
would be worse documentation than this thread. If a first-party source ever imports a
builtin-shadowing package by its bare name, this is where to look.

---

## Finding 19 - `packageDirOf`'s walk-up loop

- Comment id: `3960661500`
- Thread: `PRRT_kwDOIyvJf86gWRcQ`
- Path: `.erb/scripts/third-party-notices/shipping-set.ts:1080`
- Disposition: **FIXED**

Accepted, and pulled forward rather than ticketed because it is a deletion. `packageDirOf` returns
the boundary whenever the boundary carries a manifest, so the loop below it can only ever return a
resolution-scoped sub-manifest strictly inside the boundary - `terser/dist` as `dist@1.0.0` - which
is exactly the case the check above it exists to prevent.

The loop goes, and the "kept for the case the boundary itself cannot answer - a directory taken off
disk by a yalc link, a pruned tree" rationale goes with it rather than staying in the comment as
justification for code that is not there.

---

## Finding 20 - `isDevLinked` matches any `.yalc` path segment

- Comment id: `3960661502`
- Thread: `PRRT_kwDOIyvJf86gWRcS`
- Path: `.erb/scripts/third-party-notices/shipping-set.ts:935`
- Disposition: **DECLINED**

Mechanism confirmed. `DEV_LINK = /(^|[\\/])\.yalc([\\/]|$)/` (`:598`) is tested against the whole
real path, so `.yalc/@scope/pkg/node_modules/dep` reads as dev-linked, `lockKeyOf` produces a string
that is not a lockfile key, `byPath` misses, and the fallback to `byName` records the ROOT's
`dep@1.0.0` with `fromLock: true` - wrong version, wrong license, real directory never handed to
licensee, at exit 0.

Declining on the same basis as 18. `.yalc/@eten-tech-foundation/scripture-utilities` exists here but
carries no nested `node_modules`, so nothing in the tree reaches the case, and the fix changes
lock-key resolution - which lock entry describes which directory - to close it. Same trade, same
reasoning, and the same choice not to leave a ticket open against an unreachable case.

---

## Finding 21 - abandoned redirect hop keeps its `fail` listener

- Comment id: `3960661506`
- Thread: `PRRT_kwDOIyvJf86gWRcW`
- Path: `extensions/src/platform-lexical-tools/lib/download-db.ts:231`
- Disposition: **FIXED** (finding accepted; suggested fix modified)

The finding is right and the suggested fix is not - it would reintroduce the crash the listener
exists to prevent.

`response.off('error', fail)` on its own leaves the drained hop-1 response with no `error` listener at
all, which is precisely the state the comment at `:222-228` describes: `pipe` does not forward a
readable's error to the writable, so a connection dropped on a response nothing is listening to is
raised by Node as an unhandled error and takes `postinstall` down mid-way through the sibling fetches
`Promise.allSettled` is still awaiting. And the redirect branch is the reachable path for that rather
than an error path - GitHub raw and LFS 302-redirect on every real download - so removing the
listener there hits the common case, not a corner.

So the listener is SWAPPED rather than removed: `off('error', fail)`, then attach a log-and-swallow
handler, before following the redirect. The abandoned hop keeps an error listener, a late reset on
the drained socket is logged instead of closing hop 2's write stream, unlinking its staging file and
rejecting a promise that has already moved on.

`fetchRemoteChecksum` carries the swap too. It has the identical shape - `response.on('error',
reject)`, then `response.resume()` on the redirect branch with the listener never removed - and you
only named `downloadFile`, which is the same split you caught in round 2 and the reason we went
looking. Its consequence is different rather than milder: there is no `settled` flag there at all, so
a late reset on the abandoned hop rejects the fetch outright while the hop that replaced it is still
delivering, and a failed checksum fetch is not a degraded download, it is `runDownload` hard-failing
an `npm install`.

Testing it meant exporting it, which is worth flagging as a design change rather than slipping past:
it was reachable only through `DEFAULT_DEPS`, so its network behaviour could be described only by
mocking the thing under test. `downloadFile` is exported for that exact reason and this is its
sibling on the same path, so the export follows the file's own precedent rather than inventing one.

A test covers it, and rewriting it is how we learned something worth passing on. `download-db.download-file.test.ts` already had "rejects rather than crashing when a redirect hop drops its connection", which pinned the OLD contract - it asserted the whole download rejects when the abandoned hop resets. That is the behaviour the finding says is wrong, so the fix broke it. It is replaced with "finishes the download when the hop it abandoned drops its connection afterwards": two scripted hops, hop 0 redirects and then emits a late error, hop 1 delivers a good body, and the assertion is that the file lands intact. Mutation-checked - put `fail` back on the abandoned response and the new test fails.

Why that break was not caught is worth flagging on its own, because it is a live CI hole rather than a fact about this change. `npm test` is `npm run test:core -- --run && npm run test --workspaces --if-present -- --run`. The workspace half DOES cover `extensions/src`, so these tests are in CI in principle - but it is behind a `&&`. `test:core` intermittently exits 1 on an unhandled rejection unrelated to any of this ("Timeout reached when waiting for `web-view.service-shard.platformDockLayout` to settle"), and when it does, the entire workspace pass never runs. Every extension suite is skipped, silently, and the job's failure names only the flake.

That is exactly what happened on the run that reported this branch green: `test:core` flaked, the `&&` short-circuited, and the broken `downloadFile` test was never reached. Running the two halves separately catches it - `test:core` at 271 files / 4290 tests, then the workspace pass including `platform-lexical-tools`' 57 - but that is a thing someone has to know to do, which is the problem. Worth its own ticket: a flaky test that silently disables a whole tier of the suite is a different problem from a flaky test.

---

## Finding 22 - the canonical-text credit line is wrong two ways

- Comment id: `3960661510`
- Thread: `PRRT_kwDOIyvJf86gWRcY`
- Path: `.erb/scripts/third-party-notices/render.ts:133`
- Disposition: **FIXED**

Both accepted, both live.

**(a)** `canonicalTextCredit` picks its wording from `inspected` alone -
`MISSING_COPYRIGHT_NOTICE[inspected ? ecosystem : 'uninspected']` - and the `npm` string ends "and
its license files state none". Nothing in that expression knows whether there were any license files
to state anything. `rc-new-window@0.1.13` is the live case: `THIRD-PARTY-NOTICES.md:7867` says its
license files state none, while `:2635` lists it among the packages that ship no license file of
their own. The document reports what non-existent files say. The wording now takes `hasText`, so a
package with no files says that instead.

**(b)** The notice is interpolated into the credit line unescaped while `cell()` escapes table cells,
so the same holder string is safe in the table and not in the credit. `:8012` rendering
`<julian@juliangruber.com>` as an autolink is cosmetic; an `<Acme>`-shaped holder being parsed as raw
HTML and dropping the attribution out of the rendered document is not. The notice is escaped on this
path now.

Both are in the attribution line, which is the part with legal weight, so they regenerate into the
committed artifact along with the finding 4 change.

In the regenerated document that line now reads "no copyright notice - an npm manifest has no field
for one, and it bundles no license file to carry one", which agrees with `:2635` instead of
contradicting it, and the `isarray@1.0.0` holder is escaped as `\<julian@juliangruber.com\>`. No
other credit line moved.

---

## Finding 23 - bare `catch` in `vendored-text.ts`

- Comment id: `3960661515`
- Thread: `PRRT_kwDOIyvJf86gWRcc`
- Path: `.erb/scripts/third-party-notices/vendored-text.ts:54`
- Disposition: **FIXED**

Accepted. The bare `catch` turns any read failure into "that file is not in `<dir>`", so EACCES or
EISDIR is reported as absence and the message names a remedy that will not help. Narrowed to
`codeOf(error) === 'ENOENT'` with a rethrow otherwise - the round-2 finding 16 ruling applied to the
site it was missed on.

---

## Finding 24 - canonical SPDX texts skip `normalizeText`

- Comment id: `3960661521`
- Thread: `PRRT_kwDOIyvJf86gWRcf`
- Path: `.erb/scripts/third-party-notices/render.ts:378`
- Disposition: **FIXED**

Accepted. `canonicalText` (`corpus.ts:57`) returns `entry.licenseText` raw - hash-checked, not
normalized - and `render.ts:378` and `:1070` were the only two writes putting a reproduced text into
the document without `normalizeText`. Its own docstring says the read and write normalisations must
not drift because the artifact is byte-compared, and a CRLF text in a future corpus would surface as
a permanent spurious diff a long way from its cause. Both writes are wrapped.

Worth saying that this produced no change to the document, which is the result that confirms it: the
corpus texts are already normalized, so the wrap is a guard against a future one that is not, not a
correction of anything live.

---

## Finding 25 - pin `spdx-license-list`

- Comment id: `3960661522`
- Thread: `PRRT_kwDOIyvJf86gWRcg`
- Path: `package.json:276`
- Disposition: **FIXED**

Accepted, pinned to `"6.12.0"`. Caret is the house convention here - 8 of 138 devDependencies are
exact-pinned - but `corpus.ts:103` treats a version change as a build-stopping event, and the
`Gemfile` pins `licensee` exactly for the identical reason and spends a paragraph explaining it. A
dependency whose version a build refuses to tolerate should not be declared as a range.

---

## Finding 26 - reword `%about_error_couldNotOpenTermsOfService%`

- Comment id: `3960661530`
- Thread: `PRRT_kwDOIyvJf86gWRcn`
- Path: `src/main/main.ts:361`
- Disposition: **DECLINED**

Premise accepted: on a stock Windows machine with no `.md` handler the successful-reveal path does
produce an Explorer window and an error dialog together, and that is the common shape of this failure
rather than an edge case.

Declining the reword anyway. `shell.showItemInFolder` returns `void`, so `openTermsOfService` never
learns whether the reveal happened, and the docstring at `main.ts:349` names the case where both
calls fail - snap confinement, whose sandbox does not reach `org.freedesktop.FileManager1`. A message
reading "...so it was shown in your file manager instead" would then be a false statement in exactly
the situation where the user most needs an accurate one. The current string ("The Terms of Service
could not be opened. The document is installed beside the application as TERMS-OF-SERVICE.md.") makes
no claim about the reveal and tells the user where the file is, which stays true in both cases.

A hedged form ("it may have been shown in your file manager") would be accurate, but it reads as the
software not knowing what it just did, and it is a worse sentence than the one that simply names the
path. If Electron ever gives `showItemInFolder` a result, this is worth revisiting.

---

## Finding 27 - public TSDoc omits that the command rejects

- Comment id: `3960661538`
- Thread: `PRRT_kwDOIyvJf86gWRcs`
- Path: `src/declarations/papi-shared-types.ts:130`
- Disposition: **FIXED**

Accepted. `main.ts:351` states the throw in caps internally and the public surface said nothing about
it, which is the doc extension authors actually read and the one the Code Style Guide requires
failure modes on. The TSDoc for `platform.openTermsOfService` now documents that it rejects when the
open failed, even where the reveal was attempted.

`npm run build:types` was re-run and `lib/papi-dts/papi.d.ts` carries it; the generated diff is those
doc lines and nothing else. The wording names the awkward part of the contract rather than hiding it -
the throw includes the case where the reveal was attempted, because `shell.showItemInFolder` returns
`void` and cannot report whether it worked.

---

## Finding 28 - `TERMS-OF-SERVICE.md` spelled in three places

- Comment id: `3960661547`
- Thread: `PRRT_kwDOIyvJf86gWRcy`
- Path: `src/main/main.ts:338`
- Disposition: **FIXED**

Accepted. The name is spelled at `main.ts:338`, in `electron-builder.json5`'s `extraResources`, and
in `release/app/package.json`'s `SEE LICENSE IN`, with nothing relating them - and because
`resolveLicenseDisplay` discards the filename when mapping to the display string,
`about-dialog.data.test.ts:18` pins `SEE LICENSE IN EULA.txt` to the display text and would pass
through a rename that left the About dialog opening a file the installer does not pack. One derived-
invariant assertion now ties the three spellings together, using the pattern already in that file.

---

## Finding 29 - the duplicated copy-pattern comment in ten files

- Comment id: `3960661556`
- Thread: `PRRT_kwDOIyvJf86gWRc5`
- Path: `extensions/src/platform-scripture/webpack/webpack.config.main.ts:78`
- Disposition: **PARTIAL**

Accepted on the duplication, with a correction on the second half.

The `toType: 'file'` rationale is stated twice in consecutive paragraphs in each of the ten
`extensions/src/*/webpack/webpack.config.main.ts` files - both outside the shared region, which ends
at `:47` - so the two merge into one.

But the second half is not wrong in its own context, and what it needs is scoping rather than
correcting. A raw `copy-webpack-plugin` pattern with `toType: 'file'` and no `to` DOES default to the
output directory, which webpack then tries to open as a file. `webpack.util.ts:190` omits `to` and is
nevertheless correct because it is not a raw pattern: `getCopyFilePatternsForExtension` (`:247`)
synthesises `to` from `internalFilePathFrom` before the pattern ever reaches the plugin. So that is a
different code path rather than a counterexample to the statement.

Your practical worry stands either way - a reader who carries the sentence from the per-extension
config into the util path would add a redundant `to` - and naming which context the EISDIR
consequence applies to is what prevents that. The merged comment says so.

---

## Finding 30 - `clean.ts` wiping the webpack caches on every `npm run package`

- Comment id: `3960661560`
- Thread: `PRRT_kwDOIyvJf86gWRc9`
- Path: `.erb/scripts/clean.ts:42`
- Disposition: **DECLINED** (answering with a measurement)

Your call to us, and we would rather not settle it on reasoning alone.

The facts are as you state them. `package` runs `clean.ts` first, its glob removes every
`node_modules/.cache/webpack-*` including each extension bundle's per-mode directory, and the only
notices check on that path is `--verify-document`, which `main.ts:848` describes as two committed
files and a sha256 - no module manifests, no Ruby, no dotnet, no network. `packaging.test.ts:106`
says the same thing from the other side: the caches on the `package` path are cold by construction,
and that is NOT why `--verify-document` was chosen there (the reason is that `package` also runs from
a patched Paratext 10 Studio clone whose npm graph genuinely differs). So the forced cold build is a
side effect of a cache clear whose original justification - the shipping-set half refusing to answer
from a warm cache - does not apply on this path.

What we are not doing is deciding it from that argument. We will measure the delta - `npm run
package` with the glob and without, from warm and cold - and answer with the number. If the cost is
material it becomes a ticket to move the cache clear into the documented regeneration recipe, where
the property is actually needed; if it is in the noise it stays and this thread records why.

**Measured, and the cost is material.** Methodology first, so you can argue with the number rather
than take it: the glob's entire cost is in `build` + `build:extensions:production`, because
`clean.ts` removes `dist/`, `extensions/dist/` and `.notices` unconditionally either way - the only
thing the glob changes is whether webpack's filesystem cache survives. `electron-builder` is excluded
deliberately; it is unaffected by the cache, so including it would pad both sides with identical
constant time and make the delta read smaller than it is.

| Run | What was cleared | Wall clock |
| --- | --- | --- |
| A | `clean.ts` as it is today - `dist/` + webpack caches | **133s** |
| B | `dist/` only, caches kept | **24s** |
| B2 | repeat of B, to check the warm figure is stable | **18s** |

So the glob costs about **110 seconds on every invocation**, and a warm packaging build is roughly
**6x** faster than a cold one. That is not in the noise, and it is paid by every developer running
`npm run package` locally and by every downstream `package-core` in Paratext 10 Studio - for a check
that reads no build output.

Taking your suggested fix, as its own change rather than in this PR: the cache clear moves into the
documented regeneration recipe, where the cold-cache property is actually needed, and
`packaging.test.ts:106`'s comment moves with it. It is a behaviour change to the build entry point
every downstream repository calls, and it wants its own diff and its own CI run rather than riding
along on a relicensing branch.

PT-4572, with the measurement and the methodology written into it:
https://paratextstudio.atlassian.net/browse/PT-4572
