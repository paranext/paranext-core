# Triage Brief: PR #2654

## Metadata

- Repository: paranext/paranext-core
- PR: #2654 — "Relicense source to AGPL-3.0-or-later"
- Branch: `chore/relicense-agpl` (head at triage time: `9fbcaf58342`)
- Triage date: 2026-09-01
- Reviewer: @tjcouch-sil (single `COMMENTED` review, 2026-08-31, 8 inline findings)
- Themes: 7
- No-action comments: 0
- **Reviewer's stated priority order**: findings **1, 2, 3, 4** first, then **5-8**. TJ adds that
  "everything below is a few lines to fix except #4" — so Theme 4 is the only one carrying real
  design work, and the other six are small. Theme numbering below does NOT follow this order
  (Theme 4 merges findings 4 and 6); see the sequencing table under "Confirmed Themes".
- Triage mode: collaborative (user confirmed each theme; eight judgment calls answered explicitly)
- **Scope decision**: TJ's 8 findings **plus** the four small PR-body items he never answered (the
  aria string, the About-dialog relationship text, the `build-corpus-index.ts` write-path test, and
  the `git.util.ts:387` guard). Explicitly **out of scope**: the non-CLA blame sweep and the
  `platform.openTermsOfService` design/installer verification — see "Flagged for humans" at the end.

## Raw Feedback Source

Raw comment data is stored in the JSON files saved during triage:

- Inline: `raw-comments.json`
- Conversation: `raw-conversations.json`
- Threads: `raw-threads.json`

Saved under
`/tmp/claude-1000/-home-lyonsm-src-paranext-core/ecebb5b8-7d5f-487d-aee8-64c6151cb17d/scratchpad/triage-2654/`.

These JSON files are the **authoritative source** for full reviewer text. A follow-up revision pass
should read from them rather than from the summaries below. Every finding is also readable on the PR
itself at `https://github.com/paranext/paranext-core/pull/2654#discussion_r<id>`.

All 8 threads were **unresolved** at triage time, all anchored on the head commit `9fbcaf58342` —
none is stale, and none was resolved during triage (every one is actionable).

### Review preamble (conversation-level, no action)

TJ's review body lists four things he checked and deliberately did **not** raise, so they are not
re-derived later:

- The `#region` split in `webpack.config.web-view.ts` leaving `export default configWebView;`
  outside a shared region — forced by interleaving core-only config into the object literal, and it
  matches `webpack.config.main.ts:92`. Correct as-is. (This closes the PR body's "Template
  propagation" open question.)
- `overrides` applying unreviewed across versions — already closed by the
  `version` / `versionIndependent` gate in `applyOverride`.
- `nuget-license` living in the root `.config/dotnet-tools.json` — deliberate, documented at
  `nuget-set.ts:527`, CI cache key hashes the right manifest. (This closes the PR body's
  "`nuget-license` is restored on every `npm ci`" smaller item.)
- The 17 duplicated AGPL copies — justified, **but** he suggests `LICENSING.md` say so in one
  sentence to save the next reader the analysis. _(Carried as Theme 4, action item 4.)_

### Comment Index

#### Comment 1 — finding 1

- **Author**: @tjcouch-sil
- **File**: `extensions/src/platform-lexical-tools/lib/download-db.ts:257`
- **GitHub ID**: 3898657962 · **Thread ID**: `PRRT_kwDOIyvJf86d4wnZ`
- **Summary**: `response.on('error', fail)` is registered after the three early-return branches it
  was written to protect, so the redirect hop — which every real download takes — has no error
  listener; plus no redirect hop limit and a `settled`-timing hazard.
- **Inspected**: `handleResponse` opens at `:207`; early returns at `:209` (3xx + `location`),
  `:217` (404), `:222` (non-200); the listener sits at `:257`. `fail` (`:186`) sets `settled = true`
  itself. The `finish` handler guards on `settled` (`:266`) but assigns it only after `fs.rename`
  resolves (`:280`). Recursive `https.get` at `:213` has no hop counter. **All claims verified.**

#### Comment 2 — finding 2

- **Author**: @tjcouch-sil
- **File**: `.erb/scripts/clean.ts:42`
- **GitHub ID**: 3898657969 · **Thread ID**: `PRRT_kwDOIyvJf86d4wnf`
- **Summary**: `path.join` produces backslashes, which glob consumes as escapes, so the
  `webpack-*` cache glob deletes nothing on Windows and exits 0.
- **Inspected**: `:42` uses `path.join`; `:48` calls `rimrafSync(pattern, { glob: true })` with no
  `windowsPathsNoEscape`. Lockfile confirms `rimraf@6.1.3` → `glob@13.0.6`. `clean.test.ts`
  exercises only `--print` (`:53-56`). **Verified.**

#### Comment 3 — finding 3

- **Author**: @tjcouch-sil
- **File**: `extensions/webpack/webpack.config.web-view.ts:101`
- **GitHub ID**: 3898657976 · **Thread ID**: `PRRT_kwDOIyvJf86d4wnl`
- **Summary**: the explicit `optimization.minimizer` array silently drops webpack's default
  `compress: { passes: 2 }`; separately, `terser-webpack-plugin` is imported here but declared only
  in the root manifest.
- **Inspected**: installed `webpack@5.105.2`, `lib/config/defaults.js:1863-1878` — default minimizer
  is `new TerserPlugin({ terserOptions: { compress: { passes: 2 } } })`, applied through `A()`
  (only when `optimization.minimizer` is `undefined`). Config at `:97-104` supplies an explicit
  array with no `'...'` spread. `extensions/package.json` has no `terser-webpack-plugin` in either
  section; root has `^5.3.11` in `devDependencies`. **Both claims verified.**

#### Comment 4 — finding 4

- **Author**: @tjcouch-sil
- **File**: `.erb/scripts/third-party-notices/shipping-set.ts:233`
- **GitHub ID**: 3898657987 · **Thread ID**: `PRRT_kwDOIyvJf86d4wnu`
- **Summary**: `missingDirectDependencies` reads `dependencies` only, so it cannot see the 22
  packages that ship from `devDependencies` — including `react-reverse-portal`, this PR's own
  worked example. Coverage is 46/218 = 21.1%.
- **Inspected**: `readDirectDependencies` (`:227-239`) reads `manifest.dependencies` only at `:233`;
  the docstring rationale at `:220` is "`devDependencies` are not distributed". Spot-verified the
  worked example: `react-reverse-portal@^2.2.0` is declared **only** as a `devDependency` of
  `extensions/src/platform-scripture-editor/package.json`, and it **does** carry a row in
  `THIRD-PARTY-NOTICES.lock.json` (`Apache-2.0`, confidence 100). So it ships and the cross-check
  structurally cannot reach it. **Verified.** The derivation itself is sound; only the cross-check
  is blind.

#### Comment 5 — finding 5

- **Author**: @tjcouch-sil
- **File**: `.erb/scripts/third-party-notices/policy.ts:228`
- **GitHub ID**: 3898657993 · **Thread ID**: `PRRT_kwDOIyvJf86d4wnx`
- **Summary**: exceptions keyed on `name@version` turn every routine patch bump of 16 packages into
  a hard build failure, and `textSha256` already delivers the stated design goal on its own.
- **Inspected**: `applyException` (`:220`) matches
  ``(policy.exceptions || []).find((e) => e.package === `${key}@${version}`)`` at `:228`.
  `notices-policy.json` holds exactly **16** exceptions, all keyed `npm:<name>@<version>`, and
  **every one carries a `textSha256`**, checked separately downstream. The list includes movers:
  `lodash@4.18.1`, `yjs@13.6.30`, `lucide-react@1.8.0`, `jszip@3.10.1`, `jsonpath-plus@10.3.0`.
  **Verified, count exact.**

#### Comment 6 — finding 6

- **Author**: @tjcouch-sil
- **File**: `.erb/scripts/third-party-notices/shipping-set.ts:205`
- **GitHub ID**: 3898657999 · **Thread ID**: `PRRT_kwDOIyvJf86d4wnz`
- **Summary**: `firstPartyManifests` hardcodes `['extensions/src', 'lib']`; adding a workspace glob
  to the root manifest silently narrows the cross-check with no warning. Low priority,
  forward-looking only.
- **Inspected**: `firstPartyManifests` (`:205-215`) iterates the literal `['extensions/src', 'lib']`
  at `:207`; root `package.json` `workspaces` is `["lib/*", "extensions", "extensions/src/*"]`.
  Equivalent today. Docstring at `:202` asserts the list is "deliberately the same breadth as
  `productionStylesheetRoots`" — an invariant two hand-maintained lists have to agree about.
  **Verified: correct today, unmaintained by construction.**

#### Comment 7 — finding 7

- **Author**: @tjcouch-sil
- **File**: `extensions/lib/git.util.ts:397`
- **GitHub ID**: 3898658001 · **Thread ID**: `PRRT_kwDOIyvJf86d4wn1`
- **Summary**: `JSON.stringify(parsed, undefined, 2)` reprints the whole manifest in
  `JSON.stringify`'s formatting, not Prettier's; the two disagree on short arrays, so a template
  merge could leave the tree failing `format:check`. Latent today — TJ round-tripped all 11
  extension manifests and every one comes back byte-identical. Plus a minor readability note.
- **Inspected**: the function is `stampLicenseInJson` (`:371-399`), not `stampExtensionLicense` as
  the comment names it — the mechanism described is the right one. `:397` writes
  `` `${JSON.stringify(stamped, undefined, 2)}\n` ``. The duplicated placement TJ's postscript names
  is real: the `Object.entries` loop inserts `license` after `version` at `:392-393`, then `:395`
  catches the case where no `version` key exists. **Verified.**

#### Comment 8 — finding 8

- **Author**: @tjcouch-sil
- **File**: `src/renderer/components/dialogs/about-dialog.component.tsx:74`
- **GitHub ID**: 3898658006 · **Thread ID**: `PRRT_kwDOIyvJf86d4wn3`
- **Summary**: a pre-existing render-phase mutation of the shared `release/app/package.json` module
  object now feeds the license display this PR adds. No live defect; the pattern React disallows.
- **Inspected**: `:74` is `if (appInfo.version) packageInfo.version = appInfo.version;`, outside any
  effect and unmemoized. `packageInfo` is then read at `:84` (`resolveLicenseDisplay`), `:119`
  (`description`), `:120` (`versionLabelFormat`) and spread at `:125` into
  `formatReplacementStringToArray`. **Verified**, including TJ's "no live defect" framing — the
  assignment is idempotent and the renderer holds its own module instance.

---

## Sequencing (from the reviewer's stated priority)

| Order | Finding | Theme                                            | Effort                                  |
| ----- | ------- | ------------------------------------------------ | --------------------------------------- |
| 1st   | 1       | Theme 1 — `downloadFile` error handling          | a few lines                             |
| 2nd   | 2       | Theme 2 — `clean.ts` Windows glob                | a few lines                             |
| 3rd   | 3       | Theme 3 — web-view terser config                 | a few lines                             |
| 4th   | 4       | Theme 4 — npm cross-check reach (finding 4 half) | **the only real design work**           |
| then  | 5       | Theme 5 — policy exception keying                | a few lines + data migration            |
| then  | 6       | Theme 4 — workspace roots (finding 6 half)       | a few lines; TJ marks it "low priority" |
| then  | 7       | Theme 6 — manifest reserialization               | a few lines                             |
| then  | 8       | Theme 7 — About dialog `useMemo`                 | a few lines                             |

Finding 6 rides in Theme 4 because it touches the same function family, but TJ ranked it in the
back half and called it low priority — it does not need to gate the finding-4 work.

## Confirmed Themes

### Theme 1: `downloadFile` error handling and settle semantics

- **Confirmed by**: user on 2026-09-01
- **PR Comments**: #3898657962 · **Thread ID**: `PRRT_kwDOIyvJf86d4wnZ`
- **Affected files**: `extensions/src/platform-lexical-tools/lib/download-db.ts` (`:167-292`)
- **Inspection findings**: see Comment 1 above — all four sub-claims verified.
- **Action Items**:
  1. (`download-db.ts`, top of `handleResponse` at `:207`): move `response.on('error', fail)` from
     `:257` to the first statement of `handleResponse`, before the branch chain. Rationale to
     preserve: GitHub raw and LFS 302-redirect on _every_ real download, so the first response of
     every fetch takes the `:209` branch and today gets no `'error'` listener at all — which is
     exactly the unhandled `ERR_UNHANDLED_ERROR` that takes `postinstall` down mid-`allSettled`.
     Update the existing comment block (currently at `:252-256`) to travel with the listener.
  2. (`download-db.ts` `:209`, `:217`, `:222`): drain **and destroy** the responses being
     abandoned. TJ's prose asks for both — the redirect response today "is never drained, and is
     never destroyed" — while his code sketch shows only `response.resume()`. Call
     `response.resume()` on each of the three abandoned-response branches so the socket drains and
     can be reused; for the two terminal failure branches (`:217` 404, `:222` non-200) nothing is
     reusing the socket, so `response.destroy()` is the more direct answer. Pick per branch rather
     than applying `resume()` uniformly, and say which you chose in the thread reply.
  3. (`download-db.ts` `:213`): add a redirect hop counter capped around 5, threaded through
     `handleResponse`. Today a redirect loop recurses unbounded and leaks an undrained socket per
     hop, so `npm install` hangs silently instead of failing. ~4 lines.
  4. (`download-db.ts` `:261-285`): fix the `settled` window. **User decision — do NOT apply TJ's
     suggestion verbatim.** TJ proposes setting `settled = true` immediately after the guard at the
     top of the `finish` handler; that would make a later `close` or `rename` error a no-op in
     `fail`, leaving the promise permanently unsettled and hanging `npm install`. Instead: set
     `settled = true` at the top of `finish` **and** have the `close` and `rename` error handlers
     (`:271-274`, `:276-279`) call `reject(closeError)` / `reject(renameError)` directly rather than
     going through `fail`. This keeps the staging file from being removed after a complete body
     while still guaranteeing the promise settles on every path. Add a test for the
     close/rename-error path.
- **User Notes**: "Reject directly from close/rename" — chosen over TJ's verbatim fix and over a
  separate body-complete flag. Worth a reply on the thread explaining the divergence, since TJ's
  stated fix would introduce a hang.

### Theme 2: `clean.ts` cache glob is a Windows no-op

- **Confirmed by**: user on 2026-09-01
- **PR Comments**: #3898657969 · **Thread ID**: `PRRT_kwDOIyvJf86d4wnf`
- **Affected files**: `.erb/scripts/clean.ts` (`:42`, `:48`), `.erb/scripts/clean.test.ts`
- **Inspection findings**: see Comment 2 above.
- **Action Items**:
  1. (`clean.ts:48`): keep `path.join` and pass the flag through —
     `rimrafSync(pattern, { glob: { windowsPathsNoEscape: true } })`.
     **TJ's first option (`path.posix.join`) does not work and must not be used**: `webpack.paths.ts:3`
     builds `rootPath` with `path.join(__dirname, '../..')`, so on Windows the prefix already
     contains backslashes and `path.posix.join` only controls the separators it inserts — glob still
     consumes the prefix's `\` as escapes. Verified during planning; say so in the thread reply.
     Consequence to record: today `npm run package` on Windows leaves every `webpack-*` cache
     directory warm, and `EmitShippedModulesPlugin`'s `isWarmFilesystemCache` then flags what this
     script's docstring calls "this script's job" to have prevented.
  2. (`clean.test.ts`): the existing test only exercises `--print`, which is why this was invisible.
     Extend it — at minimum assert the emitted glob pattern contains no backslash separator; better,
     exercise the removal path against a temp tree.
- **User Notes**: None

### Theme 3: web-view terser configuration

- **Confirmed by**: user on 2026-09-01
- **PR Comments**: #3898657976 · **Thread ID**: `PRRT_kwDOIyvJf86d4wnl`
- **Affected files**: `extensions/webpack/webpack.config.web-view.ts` (`:97-104`),
  `extensions/package.json`
- **Inspection findings**: see Comment 3 above — verified against installed `webpack@5.105.2`.
- **Action Items**:
  1. (`webpack.config.web-view.ts:99-102`): carry webpack's default forward explicitly —
     ```ts
     new TerserPlugin({
       extractComments: false,
       terserOptions: {
         format: { comments: 'some' },
         compress: { passes: 2 },
       },
     }),
     ```
     The `extractComments: false` / `format.comments: 'some'` fix for the dangling `.LICENSE.txt`
     pointer is correct and stays; without `compress: { passes: 2 }` it silently downgrades every
     production extension web-view bundle to single-pass minification, and those bundles are inlined
     into each extension's `main.js` and ship in every installer.
  2. (`extensions/package.json` `devDependencies`): declare `terser-webpack-plugin` (match the root
     manifest's `^5.3.11`). **Propagation decided: declare it here AND upstream it to
     `paranext-multi-extension-template`.** `extensions/` is a whole subtree of that template
     (`update-from-templates.ts:72`), so this file is entirely on the merge surface and cannot be
     kept core-only. Upstreaming is the coherent answer rather than a concession: one of the failure
     cases below is a build of `extensions/` outside this monorepo, which is precisely the template.
     A one-line addition the template lacks merges cleanly on the next subtree pull. It is imported by this config but resolves purely through npm workspace
     hoisting today; any install that nests it instead, or any build of `extensions/` outside this
     monorepo — including the `paranext-multi-extension-template` subtree this file is synced with —
     fails at config-load time, and `concurrently --kill-others-on-fail` turns that into a failed
     `npm run build`. One line; also removes the reason the `TODO(PT-4477)` at `:92-96` cites for
     not fixing the per-extension configs.
- **User Notes**: None. **Note for the revision pass**: `webpack.config.web-view.ts` is a shared
  template region — check whether either change needs to propagate to
  `paranext-multi-extension-template`.

### Theme 4: the npm cross-check's reach, and the claim made for it

- **Confirmed by**: user on 2026-09-01
- **PR Comments**: #3898657987, #3898657999 · **Thread IDs**: `PRRT_kwDOIyvJf86d4wnu`,
  `PRRT_kwDOIyvJf86d4wnz`
- **Affected files**: `.erb/scripts/third-party-notices/shipping-set.ts` (`:198-239`,
  `:241-288`), its tests, the notices README, `LICENSING.md`, the PR body
- **Inspection findings**: see Comments 4 and 6 above. The derivation is sound — only the
  cross-check is blind, and the blind spot is systematic: the Code Style Guide amended by this same
  PR is what routes bundled dependencies into `devDependencies`.
- **Action Items**:

  1. **(Option 2 — the real second source.)** Add a source-import scan: walk first-party source
     (`src/`, `extensions/src/`, `lib/`) for bare import specifiers, resolve each to an installed
     package name, and require every resolved name to be present in the shipping set. This is
     genuinely independent of webpack's module manifests — which is the property
     `missingDirectDependencies` was built for and does not have — and covers precisely the 22
     packages that ship from `devDependencies` today.

     **Acceptance criterion — the 22 packages TJ measured on this head.** The new check must cover
     every one of these; they are declared as a `devDependency` by a first-party manifest _and_
     carry a row in the shipping set, with no second source:

     ```
     @eten-tech-foundation/platform-editor      @lexical/table               react-reverse-portal
     @eten-tech-foundation/scripture-utilities  @usersnap/browser            shadcn
     @fontsource-variable/ibm-plex-sans         @xmldom/xmldom               source-map-support
     @lexical/headless                          css-loader                   tailwindcss
     @lexical/html                              electron-devtools-installer  tailwindcss-scoped-preflight
     @lexical/react                             electron-log                 tslib
     @lexical/rich-text                         lexical                      tw-animate-css
     ```

     Re-measure before implementing (the head may have moved) and pin the result in a test, so the
     22 are a checked set rather than a number in a review comment. Note that several are
     stylesheet-only (`@fontsource-variable/ibm-plex-sans`, `tailwindcss`, `tw-animate-css`,
     `tailwindcss-scoped-preflight`) and will not be reached by a bare-import scan at all — those
     need the stylesheet leaf scan's specifier list as their second source, or the diff-based gate
     in item 2 as their only cover. Do not assume option 2 alone covers all 22.

     **Decision: feed the existing stylesheet leaf scan in as a third source.** `collectShippedPackages`
     already resolves bare `@import`/`@use`/`url()` and Tailwind v4 `@plugin`/`@source`/`@config`
     specifiers, and already returns `unresolvedStylesheetSpecifiers` alongside `packages`. Reuse
     that resolved specifier list in the cross-check rather than duplicating resolution logic, so
     all 22 are covered by a real second source and none falls back to the diff gate alone.

  2. **(Option 1 — the cheap backstop.)** Add a diff-based gate alongside it: flag any name newly
     appearing in a first-party `dependencies` _or_ `devDependencies` that is absent from the
     shipping set **and** absent from the previous `THIRD-PARTY-NOTICES.lock.json`. That is the
     exact signature of the omission failure, it fires only on change, and it needs no exemption
     table. Keep it for anything the import scan cannot statically resolve.
     - Explicitly **not** doing Option 3 (routing all ~141 build-only devDependencies through
       `unbundledDependencies`): high friction, low legal signal, and it only moves coverage from
       21.1% to 25.7%.
  3. (`shipping-set.ts:205-215`): derive `firstPartyManifests`' roots from the root
     `package.json`'s `workspaces` field rather than the hardcoded `['extensions/src', 'lib']`, so
     the docstring's stated invariant at `:202` — "deliberately the same breadth as
     `productionStylesheetRoots`" — is self-maintaining rather than two hand-maintained lists that
     have to agree. **Verified: `productionStylesheetRoots` (`:1077-1087`) does carry the same two
     roots independently**, via `childSourceRoots(extensions/src)` and `childSourceRoots(lib)`
     alongside a fixed six-entry core list. TJ asks for _both_ to be derived from `workspaces`, so
     fix the pair together — deriving only `firstPartyManifests` leaves the invariant exactly as
     hand-maintained as it is today, just in one place instead of two.
     - **Fallback TJ explicitly offers**, if changing the code is not wanted: leave both literals and
       add a comment at each site recording the coupling to the root `workspaces` field. He marks
       this finding low priority and says the comment is an acceptable resolution.
  4. **Correct the overstated claim** wherever it appears — the PR body's "Open decisions" section,
     the notices README, and any docstring asserting it (notably `missingDirectDependencies`'
     docstring at `:241-270` and the `devDependencies` rationale at `:220`, which is false for this
     repo even after the fix). The accurate and achievable claim is **"every direct declaration
     that ships is cross-checked"** — not that a package cannot ship without getting a row. Record
     the bound honestly: **162 of the 218 rows are transitive** and reachable by no
     manifest-reading approach at all; the byte-comparison against the committed document is what
     guards the transitive majority, and it catches _regressions_ rather than _omissions_.
     4b. **Reconcile with the Code Style Guide amendment this same PR makes.** TJ's causal point is
     that the blind spot is systematic, not incidental: the guide amended by this PR is what routes
     bundled dependencies into `devDependencies` in the first place, so the convention actively
     produces the packages the cross-check cannot see. This intersects the PR body's own open
     decision — the `@xmldom/xmldom` case, where moving a declaration to `devDependencies` marked
     its lockfile entry `"dev": true` and made the derivation attribute the bundled module paths to
     a nested 0.9.10 copy rather than the root 0.8.13 one webpack actually bundles. Decide the two
     together: either the derivation ignores the `dev` flag, or the convention carries a documented
     exception. Record the outcome in the Code Style Guide next to the amendment, so the next
     person following the documented convention does not hit the same trap.
  5. (`LICENSING.md`): add the one sentence TJ asks for in his review preamble explaining why the
     17 duplicated AGPL copies exist — a subtree split or standalone `npm pack` has to carry the
     text. Saves the next reader the analysis he had to do.

- **User Notes**: "Options 1 + 2 both" — the source-import scan as the real second source, plus the
  diff-based gate as a cheap backstop.

### Theme 5: policy exceptions keyed by version rather than by license text

- **Confirmed by**: user on 2026-09-01
- **PR Comments**: #3898657993 · **Thread ID**: `PRRT_kwDOIyvJf86d4wnx`
- **Affected files**: `.erb/scripts/third-party-notices/policy.ts` (`:196-228` and the
  `stalePolicyEntries` path), `.erb/scripts/third-party-notices/notices-policy.json` (16 entries),
  `.erb/scripts/third-party-notices/policy.test.ts`,
  `.erb/scripts/third-party-notices/types.ts`, `report.ts`'s exception template
- **Inspection findings**: see Comment 5 above — 16 entries, all version-keyed, all carrying
  `textSha256`.
- **Action Items**:
  1. (`policy.ts:228`): change the exception lookup from
     `` e.package === `${key}@${version}` `` to a match on `ecosystem:name` (i.e. `key` alone).
     `textSha256` becomes the real pin — `applyException` already blocks separately when the hash
     differs ("The license text changed since it was reviewed"), which is precisely the stated
     design goal in `exceptionsNote`: "the block returns the moment the package changes its license
     text". The version pin adds only one behavior on top: firing on every version bump even when
     the license text is byte-identical, which is the common case, across 16 packages that move.
  2. (`notices-policy.json`): re-key all 16 entries from `npm:<name>@<version>` to `npm:<name>`, and
     **retain `version` as a separate recorded-provenance field** — "the version this determination
     was read against". Do not drop the information; move it out of the key. Update `types.ts` for
     the shape change.
  3. (`policy.ts`, `stalePolicyEntries`): confirm it still reports entries matching nothing after
     the re-key, and adjust if it matched on the composite key.
  4. (`policy.ts` docstring at `:196-219`, and `exceptionsNote`): update the prose — it currently
     says exceptions "are pinned to name@version AND the exact text hash". After this change the
     hash is the gate and the version is provenance. Record the counter-argument TJ raises and the
     decision against it: a new version could add or relocate a license file in a way the recorded
     hash does not cover; the recurring certain cost across 16 packages was judged worse than that
     uncertain case.
  5. (`policy.test.ts`): add a case pinning the new semantics — same name, bumped version,
     byte-identical text passes; same name, changed text blocks.
- **User Notes**: "Re-key to ecosystem:name" — chosen over keeping the version pin, and over the
  middle option of additionally recording the license _file-set_ to catch relocation.

### Theme 6: manifest reserialization can leave the tree failing `format:check`

- **Confirmed by**: user on 2026-09-01
- **PR Comments**: #3898658001 · **Thread ID**: `PRRT_kwDOIyvJf86d4wn1`
- **Affected files**: `extensions/lib/git.util.ts` (`stampLicenseInJson`, `:371-399`)
- **Inspection findings**: see Comment 7 above. Latent, not live — TJ round-tripped all 11 extension
  manifests and every one is byte-identical today, because none currently has a single-line array.
  The root `package.json` does differ, but this function never touches it.
- **Action Items**:
  1. (`git.util.ts:397`): **run the serialized result through Prettier before writing**, rather than
     writing `JSON.stringify`'s formatting directly. The two disagree on short arrays — Prettier
     keeps `"commands": ["dotnet-csharpier"]` inline where `JSON.stringify` always expands it across
     three lines — so where they disagree, `update-from-templates` produces a tree that fails
     `npm run format:check`, surfacing far from here as a formatting failure in an unrelated CI step
     after a template merge. Use the repo's own Prettier config so the output matches what
     `format:check` expects.
  2. (`git.util.ts:389-395`): collapse the two mechanisms that make one placement decision. The
     `Object.entries` loop inserts `license` right after `version` when it was absent (`:392-393`),
     then `:395` catches the case where no `version` key exists. A single append after the loop is
     easier to follow.
  3. Add or extend a test covering a manifest containing a short array, so the tripwire stays
     disarmed rather than re-arming the day an extension manifest gains one.
- **User Notes**: "Run through Prettier" — chosen over editing the `license` field in place against
  the original text, and over leaving it with a comment.

### Theme 7: render-phase mutation feeding the license display

- **Confirmed by**: user on 2026-09-01
- **PR Comments**: #3898658006 · **Thread ID**: `PRRT_kwDOIyvJf86d4wn3`
- **Affected files**: `src/renderer/components/dialogs/about-dialog.component.tsx` (`:74`, `:84`,
  `:119`, `:120`, `:124-126`), and its test
- **Inspection findings**: see Comment 8 above. No live defect — within the renderer bundle the only
  importers of `release/app/package.json` are this component and its test (`app.service-host.ts`
  imports it in the _main_ process, a separate module instance), and the assignment is idempotent so
  it cannot loop. What changed is what reads the mutated object: this PR routes the license-display
  decision through it.
- **Action Items**:
  1. (`about-dialog.component.tsx:74`): replace the render-phase mutation with a derived value —
     ```ts
     const displayInfo = useMemo(
       () => ({ ...packageInfo, version: appInfo.version || packageInfo.version }),
       [appInfo.version],
     );
     ```
     and read `displayInfo` in place of `packageInfo` at `:84` (`resolveLicenseDisplay`), `:119`
     (`description`), `:120` (`versionLabelFormat`) and `:125` (the spread into
     `formatReplacementStringToArray`).
  2. **Preserve the purpose, which is legitimate**: `APP_VERSION` appends SemVer build metadata
     (`app.service-host.ts:17`), so the dialog shows
     `Version: 0.6.0-alpha.0+github.20260831142233.18234567890` rather than a bare
     `Version: 0.6.0-alpha.0` — the difference between a bug report you can pin to a build and one
     you cannot. The refactor must keep that rendering; assert it in the test.
  3. Rationale to record in the PR body rather than in a code comment: mutating a module object
     outside the component during render is the pattern React explicitly disallows, and StrictMode
     double-rendering and concurrent features are the usual way to get bitten by it. Decoupling the
     legal display path from a shared mutated module object is the point, in a file this PR is
     already rewriting.
- **User Notes**: None

---

## No-Action Comments

None. All 8 inline comments carry concrete actionable content; no threads were resolved during
triage.

---

## Cross-cutting notes for the revision pass

- **Comment discipline.** Per `.claude/rules/code-quality/forward-facing-comments.md`, none of these
  fixes should leave a comment narrating the review. Several action items above name rationale worth
  preserving — keep it as forward-facing constraint/gotcha prose (why the listener must be first;
  why the version pin was dropped; why `compress: { passes: 2 }` is restated), never as
  "the review found" or a finding number. The change narrative belongs in the commit message.
- **Reply before resolving.** Every one of these 8 threads stays unresolved until its fix is
  committed and the thread is replied to. Theme 1 in particular needs a reply explaining the
  divergence from TJ's stated fix.
- **Verification gate.** Themes 3, 4, 5 and 6 all touch the notices pipeline or the extensions
  build. Per `CLAUDE.md`, run `npm run typecheck && npm run lint && npm test && dotnet test
c-sharp-tests/`, and additionally regenerate and re-verify the notices
  (`npm run build` → `npm run build:extensions:production` → `npm run verify:third-party-notices`)
  against a **cold** webpack cache — Theme 5's re-key and Theme 4's new gate both change what the
  pipeline admits, and Theme 3 changes the extension bundles the manifests are derived from.
- **Architecture decisions — decided: no new entry.** Theme 4's claim correction and Theme 5's
  re-key are treated as refinements within the existing `adr-notices-derived-from-what-ships`
  entry's scope, not as new decisions. Do **not** append to
  `.context/standards/Architecture-Decisions.md`. The corrections land in the standards and the
  notices README instead (Theme 4 item 4), which is where `CLAUDE.md`'s promotion step puts the
  current rule. Note the log is append-only, so the existing entry is not edited to soften its
  claim either — the accurate scope is stated in the standards that agents actually read.
- **Template propagation — resolved.** The intent was to keep both Theme 3
  changes core-only, outside any shared region. **Verified for change 1**: the `optimization` block
  sits at `:97-104` and the file's second `#endregion` is at `:48`, so the terser config is already
  outside both shared regions. Adding `compress: { passes: 2 }` there owes no propagation — nothing
  to do. **Not available for change 2**: `extensions/` is a whole git subtree of
  `paranext-multi-extension-template` (`update-from-templates.ts:72` runs
  `git subtree pull --prefix ${subtreeRootFolder}`), which is why `extensions/package.json` carries
  no `#region` markers at all — a subtree file is wholly shared, not partly. There is no "outside
  the region" for a `devDependencies` entry in it. **Resolved: declare it here and upstream the same
  one-line addition to `paranext-multi-extension-template`.** That is also what TJ's own reasoning
  asks for, since a build of `extensions/` outside this monorepo — the template itself — is one of
  the failure cases he names.

---

## Flagged for humans (explicitly out of the implementation plan)

Two of the PR body's open decisions cannot be closed by a code change and are NOT part of this
revision. They need a person before the PR merges:

1. **The non-CLA blame sweep.** The PR body's own framing: the claim that
   `src/main/main.ts` and `src/main/services/data-protection.service-host.ts` carry the _only_ lines
   `git blame` attributed to contributors who have not signed CLAs "underpins the whole relicense,
   no test can verify it, and it is invisible in the diff." TJ's review did not confirm it. Two
   things need a human answer: whether the sweep was exhaustive, and whether overwriting a line —
   which changes surface blame while original authorship remains in history — is the _agreed_
   remedy rather than merely the executed one. This is a legal question, not a code one.
2. **`platform.openTermsOfService` design and packaged-build verification.** No design discussion
   has happened, and its packaged behaviour is reasoned from `electron-builder.json5` plus existing
   tests rather than run against a real installer. Out of scope by decision; worth a real installer
   run before release rather than before merge.
