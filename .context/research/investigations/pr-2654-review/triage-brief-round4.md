# Triage Brief: PR #2654 - review round 4 ("max-effort pass")

- Repository: paranext/paranext-core
- Reviewed against: `61858f6e2ba` (= current HEAD, unchanged since)
- Triage date: 2026-09-08
- Open threads: 28 (findings 1-6, 8, 10-25, 27-30; 7 and 9 deliberately not posted)
- Raw data: `/tmp/claude-1000/.../scratchpad/triage-2654/{raw-comments,raw-conversations,raw-threads,open-comments}.json`

Findings 19-30 carry the reviewer's own `_Lower-confidence batch_` marker.

## Verification result

Every finding's mechanism was re-derived against the tree. 24 of 28 hold as stated.
4 need a reply that moves the conclusion: **2** (refuted), **10** (partly stale),
**21** (mechanism right, suggested fix wrong), **26** (remedy would misstate a real case).

---

## Group A - live-wrong in a committed or published artifact (fix in this PR)

### A1. Finding 4 - `@testing-library/react@16.2.0` is disclosed as redistributed software
- Confirmed: `THIRD-PARTY-NOTICES.md:2741` (table row), `:3214` (full license text, section 11),
  `THIRD-PARTY-NOTICES.lock.json:794`.
- Cause: `findPrebuiltSources` (`shipping-set.ts:1458`) filters `/\.(?:test|spec|stories)\./`, which
  does not match `footnote-editor.test-harness.tsx` - the only `*.test-harness.*` file in the tree,
  imported only by `*.test.tsx`. The sibling filter at `:449` excludes `.test-utils?.` and
  `__mocks__` but not `.test-harness.`, so the omission guard corroborates the false row.
- Action: widen both filters. Note the tension the comment at `:445` names - narrowing the shipping
  set REMOVES rows - so the commit message must record that this file is provably test-only.
- Side effect: regenerates `THIRD-PARTY-NOTICES.md` + `.lock.json` (Linux, full pipeline).

### A2. Finding 8 - `.github/assets/release-body.md` still advertises the removed downloads
- Confirmed: file unchanged in this PR; still says "Download the `.exe`", "Download the `.dmg`",
  "Install from the Snap Store" + snapcraft badge. It is `bodyFile:` for the draft release at
  `publish.yml:249`, which now attaches no artifacts.
- Directly contradicts `adr-core-does-not-distribute-a-binary` and LICENSING.md:195.
- Action: rewrite it the way `README.md`'s Users section was rewritten - point at
  `paranext/paratext-10-studio`.

### A3. Finding 22 - the canonical-text credit line is wrong two ways, both live
- (a) Confirmed: `canonicalTextCredit` (`render.ts:133`) picks wording from `inspected` alone with no
  `hasText` input. `THIRD-PARTY-NOTICES.md:7867` says `rc-new-window@0.1.13` "license files state
  none" while `:2635` lists it among packages that ship no license file at all.
- (b) Confirmed: the notice is interpolated into Markdown unescaped. `:8012` renders
  `<julian@juliangruber.com>` as an autolink; an `<Acme>`-shaped holder would be eaten as raw HTML.
  `cell()` escapes table cells; this path does not.
- Action: pass `hasText` into the wording choice; escape the notice.

---

## Group B - gates that fail open on the case they were written for (fix in this PR)

### B1. Finding 1 - `statesTerms` uses an extension allowlist
- Confirmed by execution: `COPYING.LESSER`, `LICENSE.GPL`, `LICENSE.MIT`, `NOTICE.rtf` all return
  `false` from `static-assets.ts:65`, because `NOTICE_DOCUMENT` + `path.extname()` rejects any
  extension not on the allowlist. `COPYING.LESSER` is the standard LGPL filename.
- `package-files.ts:77/83` (`isLicenseTextFileName` / `isNoticeFileName`) answer correctly with a
  denylist + stem match; `isLicenseTextFileName('COPYING.LESSER')` is `true`.
- Action: reuse those two predicates in `statesTerms`.
- Pair with: round-3 conversation item 3 (static-asset inventory sees only notice-SHAPED files) -
  there is still no `TODO` anywhere in `.erb/scripts/third-party-notices/`. Add one naming an open
  PT ticket in the same commit.

### B2. Finding 11 - the policy templates clear the three gates they were written to trip
- Confirmed: `policy.ts:901` (`!override.version && !override.versionIndependent`) and `:927`
  (`!recorded.ok && !override.nonSpdx`) are truthiness tests. The template at `report.ts:274`
  supplies non-empty placeholder STRINGS for both, which are truthy, so a half-filled paste clears
  both. `loadPolicy` does no type validation; `types.ts` declares both `boolean?`.
- Confirmed: `PLACEHOLDER_REASON` is applied to `entry.reason` only, so `reviewer: "<your email>"`
  stands as the recorded human determination.
- The comment above the template ("A reader pasting the template hits both") is false.
- Action: require `=== true` on both flags and reject a non-boolean explicitly; extend the
  placeholder check to `reviewer` and `note`; correct the comment.

### B3. Finding 12 - `exceptionRemedy` is wrong in both directions
- Confirmed: `policy.ts:1250` sets `detected: objectingFile ? objectingFile.spdxId : best?.spdxId`,
  and `objectingFile` comes from `unusableDisallowed` (`:678`) - a BELOW-threshold match. So the
  comment at `report.ts:75` ("nothing weaker reaches this test") is false.
- (a) False offer: a package whose block rests on `usableDisallowed` but whose `detected` is
  admissible gets a hash-filled paste-ready template `withException` (`:831`) can never accept.
- (b) False refusal: a below-threshold copyleft match is told an exception cannot clear the block and
  is pointed at an `elections` entry `classify` never reaches (`:1302` returns first) - while
  `policy.test.ts:1678` asserts an exception DOES clear that case.
- Action: bound `exceptionRemedy` by the same `usableDisallowed` fact `withException` uses.

### B4. Finding 17 - the exception template records one operand of an `AND`
- Confirmed: `report.ts:117` is `v.detected || admissibleSpdx(...)`; `admissibleSpdx` returns the
  whole `declaredField` for a conjunction (`:46`), and `conjunctionBlocked` (`policy.ts:425`) spreads
  `common`, which carries `detected`. So a `(MIT AND Zlib)` package with an MIT-identified file gets
  `"spdx": "MIT"`, `applyException` accepts it, `render.ts:419` computes `compound = false`, and the
  Zlib text is reproduced nowhere - the outcome the hand-written `npm:pako` entry exists to prevent.
- Action: prefer `admissibleSpdx` when the declaration is a conjunction.

### B5. Finding 13 - the shim invariant is vacuous
- Confirmed: `System.Net.WebSockets` is absent from `ParanextDataProvider.csproj` (only named in the
  comment at `:68`), so `matching` is `[]` at `derived-invariants.test.ts:364` and `forEach` asserts
  nothing.
- Action: assert each id in `SHIMS` is absent from the derived closure rather than iterating whatever
  happens to be declared. Also check the PR body's "kept" wording against `csproj:71`, which ADDS the
  `System.Net.Http` reference with `ExcludeAssets="all"`.

### B6. Finding 15 - `copiedPlatformLibraries` is the only policy table with no staleness check
- Confirmed: `stalePolicyEntries` (`report.ts:318`) covers elections, exceptions, overrides,
  copyrightNotices, licenseTexts and unbundledDependencies; `snapStagePackages` and
  `staticAssetNotices` carry their own. `copiedPlatformLibraries` has neither.
- Action: add the reverse set difference. Same shape as round-2 finding 18.

### B7. Finding 16 - `addCopiedPlatformLibraryTexts` silently drops a text-less identifier
- Confirmed: `render.ts:1069` is `if (!text) return;`, and the docstring's cited guard checks
  `policy.allowed`, not corpus membership - which is what `canonicalText` needs.
- Action: throw, or check corpus membership in the guard the docstring cites.

### B8. Finding 14 - the ICU paragraph is unconditional prose citing a gated section
- Confirmed: `render.ts:784` states ICU redistribution unconditionally and cross-references
  "Native libraries copied from the build machine", which `pushCopiedPlatformLibrarySection:662`
  suppresses when the table is empty.
- Action: gate it on `copiedPlatformLibraries` being non-empty. Same class as round-2 finding 23.

---

## Group C - latent defects with cheap, contained fixes (fix in this PR)

### C1. Finding 6 - `lib/`-only first-party test in the two leaf scans
- Confirmed: `shipping-set.ts:1397` and `:1598` use `!containedPath(libReal, realPathOf(dir))`, while
  `importedPackages` uses `isFirstPartyWorkspace` (`:373`). `node_modules/platform-scripture` is a
  symlink to `extensions/src/platform-scripture` (verified on disk), and this PR stamps extensions
  `AGPL-3.0-or-later`, which is on the `copyleft` list - so one sibling-extension `@import` would
  hard-block the generator on this repo's own code. No such import exists today.
- Reply correction: the comment at `:1390` claims parity with `collectPrebuiltLibLeaves`, not with
  `importedPackages` as the finding states. The fix is the same either way.
- Action: call `isFirstPartyWorkspace` in both places.

### C2. Finding 5 - `packedExtensionNames` reads `extensions/src`
- Confirmed: `static-assets.ts:149` reads `extensions/src`; `electron-builder.json5:90` packs
  `./extensions/dist/`. Its only caller is `main.ts:828`, on the full-report path, which already
  requires a completed build - so reading `dist` is safe there.
- Action: read `extensions/dist`. (`packedStaticTrees:118` reads `src` too and was not flagged;
  decide deliberately whether it moves with it.)

### C3. Finding 18 - `packageOfSpecifier` cannot tell a Node builtin from an installed package
- Confirmed: `shipping-set.ts:1266` returns `undefined` for any `builtinModules` name, and `buffer`,
  `events`, `punycode` and `string_decoder` are all installed here (`string_decoder` ships and has a
  lock row via the module graph). A bare `import ... from 'buffer'` in a `lib/*` source would be
  discarded AND never recorded in `unresolvedStylesheetSpecifiers`, at exit 0.
- Action: resolve first; discard only when resolution finds no installed package.

### C4. Finding 23 - bare `catch` in `vendored-text.ts:54`
- Confirmed: any read failure (EACCES, EISDIR) is reported as "that file is not in `<dir>`". The
  round-2 finding 16 ruling was applied to `package-files.ts:readTextFile` but not here.
- Action: narrow with `codeOf(error) === 'ENOENT'`, rethrow otherwise.

### C5. Finding 3 - the lexical-DB attribution files are verified by nothing
- Confirmed: `notices-policy.json` marks both `LICENSE.md` and `SOURCE.md` `notTracked: true` (no
  hash, no reproduction); `download-db.ts:42` fetches them with no checksum and re-fetches every
  install; `packaging.test.ts` mentions neither. `render.ts:582` asserts unconditionally that both
  ship. The single CC BY-SA 4.0 obligation the section discharges is verified nowhere.
- Action: assert both exist under the built `extensions/dist/.../lexical-db/` in `packaging.test.ts`
  (build-dependent, so decide whether it belongs there or in the packaging CI leg).

### C6. Finding 21 - abandoned redirect hop keeps its `fail` listener
- Confirmed: `download-db.ts:231` attaches `response.on('error', fail)` and the redirect branch
  drains rather than destroys (`response.resume()`), so a late reset runs `fail` with
  `settled === false`, closing hop 2's stream, unlinking its staging file and rejecting.
- **The suggested fix is wrong.** `response.off('error', fail)` leaves the drained response with no
  error listener, which is exactly the unhandled-`error` crash the listener's own comment
  (`:222-228`) says it exists to prevent. Swap the listener instead: `off(fail)` then attach a
  log-and-swallow handler before following the redirect.

### C7. Finding 19 - `packageDirOf`'s walk-up loop
- Confirmed: `shipping-set.ts:1080` returns the boundary when it has a manifest, so the loop can only
  return a resolution-scoped sub-manifest strictly inside the boundary (`terser/dist` →
  `dist@1.0.0`) - the exact case the check above it exists to prevent.
- Action: delete the loop, and move the "kept for a pruned tree" rationale out of the comment.

### C8. Finding 20 - `isDevLinked` matches any `.yalc` path segment
- Confirmed: `DEV_LINK = /(^|[\\/])\.yalc([\\/]|$)/` (`:598`) tests the whole real path, so
  `.yalc/@scope/pkg/node_modules/dep` reads as dev-linked, misses `byPath`, and falls back to
  `byName` - recording the ROOT's `dep@1.0.0` with `fromLock: true`. Only `.yalc/@eten-tech-foundation`
  exists here today and carries no nested `node_modules`, so it is latent.
- Action: treat a path under a yalc link's own `node_modules` as a normal installed package.

### C9. Finding 24 - canonical SPDX texts skip `normalizeText`
- Confirmed: `canonicalText` (`corpus.ts:57`) returns `entry.licenseText` raw (hash-checked, not
  normalized); `render.ts:378` and `:1070` write it straight through. Every other reproduced text is
  normalized on both read and write, and `normalizeText`'s docstring says the two must not drift.
- Action: wrap both writes.

### C10. Finding 25 - pin `spdx-license-list`
- Confirmed: `package.json:276` is `"^6.12.0"`; `corpus.ts:103` hard-fails on any version change.
  Caret is the house convention (8 of 138 devDependencies are exact-pinned), but `Gemfile` pins
  `licensee` exactly for the identical reason.
- Action: pin `"6.12.0"`.

### C11. Findings 27 / 28 - the two documentation invariants
- 27 confirmed: `papi-shared-types.ts:130` documents `platform.openTermsOfService` with no failure
  mode, while `main.ts:351` states the throw in caps. The Code Style Guide requires failure modes on
  the API surface. Action: add the line, re-run `npm run build:types`.
- 28 confirmed: `TERMS-OF-SERVICE.md` is spelled in `main.ts:338`, `electron-builder.json5:112` and
  `release/app/package.json:7`, with nothing tying them together; `about-dialog.data.test.ts:18` pins
  `SEE LICENSE IN EULA.txt` → the display string, so a rename passes every test. Action: one
  derived-invariant assertion.

### C12. Finding 29 - the duplicated copy-pattern comment in ten files
- Confirmed: the `toType: 'file'` rationale is stated TWICE in each of the ten
  `extensions/src/*/webpack/webpack.config.main.ts`, in consecutive paragraphs, outside the shared
  region (which ends at `:47`).
- Partial pushback: the second half is not wrong in its own context. A raw
  `copy-webpack-plugin` pattern with no `to` does default to the output directory. `webpack.util.ts:190`
  is correct because `getCopyFilePatternsForExtension` (`:247`) SYNTHESISES `to` - a different code
  path, not a counterexample.
- Action: merge the two paragraphs into one and say which context the EISDIR consequence applies to.

---

## Group D - reply, don't change

### D1. Finding 2 - the terser fix reaching only the aggregate web-view config
- **Refuted.** All ten `extensions/src/*/webpack/webpack.config.web-view.ts` files are 29 lines and
  are shared regions END TO END (`#region` at line 1, `#endregion` at line 29). The main-config
  change the finding cites as precedent landed OUTSIDE its shared region (which ends at `:47`).
  So `TODO(PT-4477)`'s stated reason - the fix belongs in `paranext-multi-extension-template` - is
  exactly what the file layout forces, and this is a decision, not an oversight.
- Optional: make the TODO say "end to end" so the next reader does not re-derive it.

### D2. Finding 10 - the module-allowlist guard
- Partly stale: the value assertion is not "a hand-maintained copy of itself" by accident - the
  docstring at `:34-40` states the reasoning, and TJ mutation-verified the dispatch test himself in
  round 3 (`moduleName === 'fs'` fails it).
- The new substance holds: `not.toMatch(/moduleName === /)` is a spelling check that `startsWith`,
  `includes`, `switch` and `==` all defeat; and `readWebViewModuleSpecifiers` throws only on ZERO
  matches, so one surviving `.set()` satisfies it.
- Decision needed: extracting the web-view map into a `*.data.ts` so it can be asserted as a value is
  the same treatment already applied to the extension-host half and is contained. Exporting and
  calling the require resolver is a larger change against a module the docstring says has no seam.

### D3. Finding 26 - reword `%about_error_couldNotOpenTermsOfService%`
- The premise holds: on stock Windows with no `.md` handler the success path shows both an Explorer
  window and an error dialog.
- But `shell.showItemInFolder` returns `void`, and the docstring at `main.ts:349` names the case where
  both fail (snap confinement, no `org.freedesktop.FileManager1`). A message that asserts the file
  manager opened would then be false. Any reword has to be hedged, or decline.

### D4. Finding 30 - `clean.ts` wiping the webpack caches on every `npm run package`
- Confirmed: `package` runs `clean.ts` (which globs `node_modules/.cache/webpack-*`) and then only
  `--verify-document`, which `main.ts:848` documents as "two committed files and a sha256 - no module
  manifests". Every local and downstream `npm run package` is a forced cold build of five graphs.
- Genuinely a trade the reviewer defers to us. Decide with a measurement, not an argument.

---

## Found during triage, not raised by the reviewer

1. **`publish.yml:266` still uploads Windows and macOS installers to S3** under
   `inputs.uploadReleaseAssets`, into `vars.AWS_S3_RELEASE_BUCKET_NAME`. LICENSING.md:195 says
   "nothing is published to an app store or attached to a public release" - true as written, but the
   S3 path is a distribution channel the ADR does not mention. Decide whether it is in scope, and
   whether the bucket is public.
2. **`electron-builder.json5:74` still sets `linux: { target: ['snap'] }`** - the snap is still built
   on every release run, now published nowhere. Intentional per the `publish.yml` comment ("so a
   broken Linux packaging path surfaces"), but worth one sentence somewhere.
3. **No `TODO` exists anywhere in `.erb/scripts/third-party-notices/`** - round 3's conversation item
   3 asked for one naming an open ticket for the static-asset inventory gap. Still outstanding, and
   it is the same blind-spot family as finding 1.

---

# Agreed plan (2026-09-08)

Scope decision: Group A + Group B + the cheap Group C items + the three items found during triage.
Finding 10 is taken for the web-view half only.

## In this PR

| # | Change | Files |
| --- | --- | --- |
| 4 | Widen the test-file filters to cover `.test-harness.`; regenerate the notices + lock | `shipping-set.ts:449,1458`, `THIRD-PARTY-NOTICES.md`, `.lock.json` |
| 8 | Rewrite the release body to point at `paratext-10-studio` | `.github/assets/release-body.md` |
| 22 | Pass `hasText` into the wording choice; escape the notice for Markdown | `render.ts:133` |
| 1 | Reuse `isLicenseTextFileName` / `isNoticeFileName` in `statesTerms` | `static-assets.ts:65`, `package-files.ts` |
| 11 | `=== true` on both flags, reject non-booleans, extend the placeholder check to `reviewer`/`note`, correct the template comment | `policy.ts:901,927`, `report.ts:274` |
| 12 | Bound `exceptionRemedy` by `usableDisallowed`; correct the false comment at `:75` | `report.ts:86` |
| 17 | Prefer `admissibleSpdx` when the declaration is a conjunction | `report.ts:117` |
| 13 | Assert each `SHIMS` id is absent from the derived closure | `derived-invariants.test.ts:364` |
| 15 | Add the reverse set difference for `copiedPlatformLibraries` | `report.ts:318` |
| 16 | Throw, or check corpus membership in the cited guard | `render.ts:1069` |
| 14 | Gate the ICU paragraph on `copiedPlatformLibraries` being non-empty | `render.ts:784` |
| 5 | Read `extensions/dist`; decide `packedStaticTrees` deliberately | `static-assets.ts:118,149` |
| 6 | Call `isFirstPartyWorkspace` in both leaf scans | `shipping-set.ts:1397,1598` |
| 19 | Delete the walk-up loop; move the rationale out of the comment | `shipping-set.ts:1080` |
| 21 | `off(fail)` + attach a log-and-swallow handler before following the redirect | `download-db.ts:231` |
| 23 | Narrow to `ENOENT`, rethrow otherwise | `vendored-text.ts:54` |
| 24 | Wrap both canonical-text writes in `normalizeText` | `render.ts:378,1070` |
| 25 | Pin `"spdx-license-list": "6.12.0"` | `package.json:276` |
| 27 | Document the failure mode; re-run `npm run build:types` | `papi-shared-types.ts:130`, `lib/papi-dts/papi.d.ts` |
| 28 | One derived-invariant assertion tying the three spellings together | `derived-invariants.test.ts` |
| 29 | Merge the two paragraphs; scope the EISDIR consequence to its context | 10x `webpack.config.main.ts` |
| 10 | Extract the web-view module map into a `*.data.ts` and assert it as a value | `global-this-web-view.model.ts`, `extension.service.module-allowlist.test.ts` |
| T1 | Add the missing `TODO(PT-4560)` for the static-asset inventory blind spot | `static-assets.ts` |
| T2 | One sentence on why `linux.target` still builds a snap nothing publishes | `electron-builder.json5:74` or the ADR |
| T3 | One sentence in the ADR naming the S3 channel - the bucket is NOT public, so LICENSING.md:195 stands as written and only the ADR's silence needs closing | `adr-core-does-not-distribute-a-binary` |

Pulled forward rather than ticketed: 19 and 21 are both cheaper than the ticket that would defer
them (a deletion, and a two-line listener swap).

Deliberately NOT taken and NOT ticketed: 18 and 20. Both are latent with no trigger in the tree today,
and there is a limit to how much work latent issues earn.

## Ticketed, not fixed here

- **PT-4560** (3 + round-3 item 3) - one Dev Task, created 2026-09-08, 🆕 Triage, unparented. Both are the same gap: the static-asset inventory sees only
  notice-SHAPED files, and the lexical-DB attribution files are pinned, reproduced and asserted by
  nothing. Closing either properly needs a recorded inventory of the packed trees' CONTENTS, and the
  presence assertion is build-dependent, so where it lives is a design question rather than a fix.
  T1 above is the `TODO(PT-4560)` that points at it.
  https://paratextstudio.atlassian.net/browse/PT-4560

## Reply only, no change

- **2** - refuted: the ten web-view configs are shared regions end to end (lines 1-29); the main-config
  precedent landed outside its region (ends at `:47`). Tighten `TODO(PT-4477)`'s wording to say so.
- **18** - `packageOfSpecifier` cannot tell a Node builtin from an installed package of the same name.
  Mechanism confirmed, but there is no import of that shape in the tree and the fix changes resolution
  order in the path that decides which rows the legal document carries. Deliberately not taken: a
  latent defect with no trigger today does not earn a change to that path, nor a ticket that would sit
  open against it.
- **20** - `isDevLinked` matches any `.yalc` segment. Same disposition and the same reason: nothing in
  the tree has a nested `node_modules` under a yalc link, and the fix touches lock-key resolution.
- **26** - `shell.showItemInFolder` returns `void` and both calls fail together under snap confinement,
  so a message asserting the reveal succeeded would be false in a case the docstring already names.
- **30** - his call to us; answer with a measured `npm run package` delta rather than an argument. If
  the cold-cache cost is material it becomes a ticket, not a change made on reasoning.

---

# Reconciliation (2026-09-08, after implementation)

Replies were drafted in parallel with the implementation, so each `FIXED` claim was checked against
the diff that actually landed. Nine drafts described something other than what was built.

| # | Draft said | Actually built | Reply corrected |
| --- | --- | --- | --- |
| 1 | Delegates to the two `package-files.ts` predicates instead of the local one | They are an ADDITIONAL accepting branch - a straight swap would have dropped `ATTRIBUTION.md`, `SOURCE.md`, `CREDITS`, `AUTHORS`, `COPYRIGHT`, including the live `quick-verse` entry the module exists for. `rtf` added to `NOTICE_DOCUMENT` separately | yes |
| 2 | We are tightening the TODO to say "shared regions end to end" | It already said that. The edit made instead cites both boundaries (web-view 1-29, main ending `:47`) | yes |
| 5 | `packedExtensionNames` reads `dist` (+ open question on `packedStaticTrees`) | Confirmed; `packedStaticTrees` deliberately stays on `src` - it is a committed-content gate whose finds are hash-pinned by source path, and `dist` is empty until built so it would pass by finding nothing | yes |
| 13 | "You are right that 'kept' is the wrong word" (+ VERIFY the body was corrected) | Body NOT yet corrected. Checked against `main`: the diff REMOVES `System.Net.WebSockets` and ADDS `System.Net.Http ... ExcludeAssets="all"`, so "kept" was written relative to an earlier revision of this PR | yes - now says the body is being corrected |
| 14 | Paragraph gated on `copiedPlatformLibraries` being non-empty | SPLIT instead: the Windows half rests on a real NuGet row and is the target of a "(see below)" reference, so gating it wholesale would have suppressed a true claim. Only the Linux/macOS sentence is gated | yes |
| 15 | Reverse set difference, same shape as round-2 finding 18 | Not available - the table is keyed by library, not `ecosystem:name`. Needed `copiedPlatformLibraryStems()` reading the csproj's absolute `<Content Include>` globs, plus a third parameter to `stalePolicyEntries` | yes |
| 16 | (VERIFY which remedy) | Throws at the drop site, with the remedy in the message; docstring no longer cites `policy.allowed` as establishing corpus membership | yes |
| 21 | (VERIFY listener shape + test) | Swap landed. **It also broke an existing test** - see below | yes |
| 24 | Both writes wrapped | Confirmed, and produced NO document change, which is the result that confirms it | yes |

## What reconciliation caught that neither agent did

**The finding-21 fix broke `download-db.download-file.test.ts` and nothing reported it.** The test
"rejects rather than crashing when a redirect hop drops its connection" pinned the OLD contract - the
whole download rejecting when the abandoned hop resets - which is exactly what the finding says is
wrong. It now fails with "promise resolved undefined instead of rejecting".

It was invisible because **the root `npm test` does not cover `extensions/src/**`**:
`vitest.config.ts`'s `include` lists `src/`, `.erb/`, `tools/`, `e2e-tests/` and `extensions/lib/`,
and `test.yml` runs only that root `npm test`. So `platform-lexical-tools`' own 55 tests - including
every `downloadFile` test rounds 2 and 3 added - run in no CI leg.

Replaced with "finishes the download when the hop it abandoned drops its connection afterwards":
hop 0 redirects then emits a late error, hop 1 delivers a good body, the file lands intact.
Mutation-checked - restoring `fail` on the abandoned response fails it. Full suite 55/55.

## Resolved after reconciliation

1. **`fetchRemoteChecksum` carries the swap too.** Confirmed the identical shape, and the
   consequence is not milder as first assumed - that promise has no `settled` flag, so a late reset
   on the abandoned hop rejects the fetch outright while its replacement is still delivering, and a
   failed checksum fetch hard-fails `npm install` rather than degrading a download. Testing it
   required exporting it (it was reachable only through `DEFAULT_DEPS`); `downloadFile` is exported
   for the same reason, so the export follows the file's precedent. Two new tests, mutation-checked.
   `platform-lexical-tools` suite 57/57.
2. **Finding 13's PR-body wording is fixed on the PR.** The body now states both directions - the
   branch REMOVES the `System.Net.WebSockets` 4.3.0 reference and ADDS an `ExcludeAssets="all"`
   reference for `System.Net.Http` 4.3.4 that was not there before. Round-tripped and diffed before
   posting; the only delta beyond the intended paragraph is a trailing newline GitHub appends.
3. **Finding 30 measured, accepted, and ticketed as PT-4572.** cold 133s / warm 24s and 18s, so the
   glob costs ~110s and ~6x on every invocation - material, so by the reply's own terms it becomes a
   change rather than a decline. Filed rather than fixed here because it alters the build entry point
   every downstream repository calls.
   Methodology: Methodology: the glob's entire cost is in `build` +
   `build:extensions:production`, because `clean.ts` removes `dist/`, `extensions/dist/` and
   `.notices` unconditionally either way - the only thing the glob changes is whether webpack's
   filesystem cache survives. electron-builder is excluded deliberately; including it would dilute
   the delta with constant time and answer a different question. Cold run, then two warm runs to
   check the warm number is stable.

---

# Pre-commit review (2026-09-08)

An independent `/code-review high` pass over the round-4 diff, plus a manual pass over the
behaviour-changing gates. **Four defects found, all introduced by our own round-4 changes** - which
is the point: each would have come back as a round-5 finding.

| Where | Defect | Fix |
| --- | --- | --- |
| `static-assets.ts` `packedExtensionNames` | Accepting finding 5 made "no extensions" a REACHABLE answer, and `return []` fails OPEN - an empty set drops every gated prose section from the document AND from the lock written in the same run, so the two agree and the byte-compare has nothing to catch. Reading `extensions/src` could never return empty. | Throws, naming the build step. 2 tests, mutation-checked. |
| `report.ts` exception template | Our finding-12 fix opened the below-threshold case, where `v.detected` is the objecting file's INADMISSIBLE id - so the template filled `spdx` with the one value `applyException` always refuses. Handing the reader a paste-ready entry the gate rejects is worse than the withheld template we opened the case to avoid. | `detected` must be admissible to lead; falls back to `admissibleSpdx`. Test + mutation check. |
| `main.ts` copied platform libraries | Finding 15 added the harmless direction (entry with no copy rule). The direction with a consequence was left open: a new absolute `<Content Include>` rule with no policy entry ships a native library undisclosed, every gate green. Our own change is what made it closeable. | `assertCopiedPlatformLibrariesRecorded`, beside the other whole-set assertions. 2 tests. |
| `policy.ts` override placeholders | Our finding-11 fix swept `reason`/`reviewer`/`note` but not `license` - and `nonSpdx: true` is exactly what stops that value being parsed, so the template's own wording would reach the document and lock as a shipped package's terms. There were no tests on this path at all. | Sweep covers `license`; 2 tests, mutation-checked. |

Regenerated the notices from a cold cache afterwards: **the artifact diff is unchanged**, confirming
all four are gate hardening rather than output changes. `verify:third-party-notices` and
`:document` both pass.

## Corrected: the CI coverage claim

An earlier note here said the root `npm test` does not cover `extensions/src`. **That was wrong.**
`npm test` is `npm run test:core -- --run && npm run test --workspaces --if-present -- --run`, and
the workspace half does run every extension suite.

The real mechanism is worse. `test:core` intermittently exits 1 on an unhandled rejection
(`web-view.service-shard.platformDockLayout`) with every test passing - it fired on two of three full
runs here - and the `&&` then skips the entire workspace tier silently, reporting only the flake.
That is how the `downloadFile` test this branch broke stayed invisible. Worth its own ticket.

## Verification at the end of the review

- `npm run typecheck` - 0 on all four legs
- `npm run lint` - exit 0, one pre-existing warning in an untouched file
- `dotnet test c-sharp-tests/` - 1725 passed, 0 failed
- `test:core` - 271 files, 4290 tests passed; workspace pass green, including `platform-lexical-tools` 57
- Two pre-existing flakes, both in untouched code: the unhandled rejection above, and
  `platform-bible-react`'s `marketplace.stories.tsx > Extension More Info` (15s timeout once, 360ms
  on re-run)
- Notices regenerate from a cold cache; both verifications pass
