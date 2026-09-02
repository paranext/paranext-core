# Implementation Plan: PR #2654 review revision

Consumes `triage-brief-2654.md`. Ordered by TJ's stated priority (findings 1, 2, 3, 4 first, then
5-8), with the four in-scope PR-body items folded in at Step 8.

**Branch**: `chore/relicense-agpl` (baseline `9fbcaf58342`). The local tree is on `main` — check out
the branch and re-confirm the head before starting; every line number below was verified against
`9fbcaf58342` and must be re-checked if it moved.

**Correction carried in from planning**: TJ's first suggested fix for finding 2 (`path.posix.join`)
does **not** work. `webpack.paths.ts:3` builds `rootPath` with `path.join(__dirname, '../..')`, so on
Windows the prefix already contains backslashes; `path.posix.join` only controls separators it
inserts. His second option is the correct one. See Step 2.

---

## Step 0 — Baseline

1. `git checkout chore/relicense-agpl && git pull --ff-only`
2. Record a green baseline before touching anything, so a later failure is attributable:
   `npm run typecheck && npm run lint && npm test && dotnet test c-sharp-tests/`
3. Re-measure the finding-4 numbers on the current head (see Step 4.0) — TJ's 218/22/162 figures are
   from `9fbcaf58342` and the plan's acceptance test pins whatever is true now.

---

## Step 1 — Finding 1: `downloadFile` error handling _(priority 1)_

**File**: `extensions/src/platform-lexical-tools/lib/download-db.ts`
**Test**: `extensions/src/platform-lexical-tools/lib/download-db.download-file.test.ts` (exists)

1. **Extract the staging-file cleanup** so both `fail` and the post-body error paths can use it
   without double-settling:

   ```ts
   const discardStaged = (onDone: () => void) =>
     fs.rm(staged, { force: true }, (removeError) => {
       if (removeError)
         console.warn(`Could not remove the partial download at ${staged}: ${removeError.message}`);
       onDone();
     });
   ```

   Rewrite `fail` (`:186-202`) to use it.

2. **Hoist the response error listener.** Make `response.on('error', fail)` the first statement of
   `handleResponse` (`:207`), before the branch chain. Move the explanatory comment with it and
   rewrite it forward-facing — state the constraint ("every response needs its own listener before
   any branch can return; `pipe` does not forward a readable's error"), not the change history.

3. **Drain or destroy every abandoned response**, per branch:

   - `:209` redirect — `response.resume()` before recursing (socket is reused for the next hop)
   - `:217` 404 — `response.destroy()` before `fail(...)`
   - `:222` non-200 — `response.destroy()` before `fail(...)`

4. **Bound the redirect chain.** Add `const MAX_REDIRECTS = 5;` and thread a hop count:

   ```ts
   const handleResponse = (response: any, hops = 0) => {
     ...
     if (isRedirect) {
       if (hops >= MAX_REDIRECTS) { response.destroy(); fail(new Error(`Too many redirects (${MAX_REDIRECTS}) downloading ${url}`)); return; }
       response.resume();
       https.get(response.headers.location, (res) => handleResponse(res, hops + 1)).on('error', fail);
       return;
     }
   ```

   Note the wrapper — `https.get(url, handleResponse)` passes only the response, so the callback must
   close over the incremented count. Update the top-level call at `:290`.

5. **Fix the settle semantics** (the decided divergence from TJ's suggestion). In the `finish`
   handler (`:261`), set `settled = true` immediately after the `if (settled) return;` guard, and
   have the close and rename error paths `reject` **directly** rather than calling `fail`:
   ```ts
   file.on('finish', () => {
     if (settled) return;
     // Past this point the staging file holds a complete body, so a later failure must reject
     // without re-entering `fail`, whose teardown assumes an incomplete download.
     settled = true;
     file?.close((closeError) => {
       if (closeError) {
         discardStaged(() => reject(closeError));
         return;
       }
       fs.rename(staged, destination, (renameError) => {
         if (renameError) {
           discardStaged(() => reject(renameError));
           return;
         }
         console.log('Download complete.');
         resolve();
       });
     });
   });
   ```
   This guarantees exactly one settle on every path. TJ's literal suggestion (set `settled` and keep
   routing through `fail`) would make close/rename errors a silent no-op and hang `npm install`.

**Tests to add**: a 302 hop whose response emits `'error'` (must reject, not throw unhandled); a
redirect loop (must reject at the cap, not hang); a rename failure after a complete body (must
reject exactly once and leave no staging file).

---

## Step 2 — Finding 2: `clean.ts` Windows glob _(priority 2)_

**Files**: `.erb/scripts/clean.ts`, `.erb/scripts/clean.test.ts`

1. `:48` — pass the flag through, **keeping `path.join`**:
   ```ts
   globsToRemove.forEach((pattern) =>
     rimrafSync(pattern, { glob: { windowsPathsNoEscape: true } }),
   );
   ```
   Do **not** use `path.posix.join` (TJ's first option): `rootPath` already carries backslashes on
   Windows, so it leaves the escape problem in the prefix. Add a short forward-facing comment saying
   why the flag is required — the pattern is built with platform separators and glob would otherwise
   read `\` as an escape.
2. `clean.test.ts` — the existing test only exercises `--print`, which is why this was invisible.
   Add a case that runs the removal path against a temp tree containing `webpack-a` and `webpack-b`
   cache directories and asserts both are gone. If a full spawn is impractical, at minimum assert
   `rimrafSync` is invoked with `windowsPathsNoEscape` set.

---

## Step 3 — Finding 3: web-view terser config _(priority 3)_

**Files**: `extensions/webpack/webpack.config.web-view.ts`, `extensions/package.json`

1. `:99-102` — carry webpack's default forward:
   ```ts
   new TerserPlugin({
     extractComments: false,
     terserOptions: { format: { comments: 'some' }, compress: { passes: 2 } },
   }),
   ```
   Comment the `compress` line as restating webpack's own default, which an explicit `minimizer`
   array replaces rather than extends (`webpack/lib/config/defaults.js:1863-1878`). **No propagation
   owed** — the `optimization` block sits at `:97-104`, outside both shared regions (second
   `#endregion` is at `:48`).
2. `extensions/package.json` `devDependencies` — add `"terser-webpack-plugin": "^5.3.11"` (matches
   root). Run `npm install` to update the lockfile.
3. **Upstream follow-up**: `extensions/` is a whole subtree of `paranext-multi-extension-template`
   (`update-from-templates.ts:72`), so this file is on the merge surface. Make the same one-line
   addition upstream. Track it as a follow-up issue if it can't land in the same cycle; note it in
   the PR body either way.
4. Remove the now-stale clause in the `TODO(PT-4477)` comment at `:96` that cites the missing
   declaration as a reason not to fix the per-extension configs. Keep the TODO itself.

---

## Step 4 — Finding 4 + 6: the npm cross-check _(priority 4 — the only real design work)_

**Files**: `.erb/scripts/third-party-notices/shipping-set.ts`, `shipping-set.test.ts`, `main.ts`,
`README.md`, `LICENSING.md`, the PR body

### 4.0 Re-measure first

Reproduce TJ's table on the current head before writing code, and keep the output — it is the
acceptance criterion. Expect ~218 npm rows, ~46/218 current coverage, and 22 packages declared only
as `devDependencies` that carry a row.

### 4.1 Derive the roots from `workspaces` (finding 6)

Add `workspaceRoots(repo)` reading the root `package.json` `workspaces` field
(`["lib/*", "extensions", "extensions/src/*"]`) and expanding the globs to existing directories.
Feed it into **both** `firstPartyManifests` (`:205-215`) and `productionStylesheetRoots`
(`:1077-1087`) — both carry the same two literals independently today, and fixing only one leaves
the invariant just as hand-maintained. Update the `:202` docstring to say the breadth is now
_derived_ rather than _agreed by hand_.

### 4.2 Cross-check A — the source-import scan (TJ's option 2)

`shipping-set.ts` already imports `typescript`, so use the TS AST rather than a regex. Add
`importedPackageSpecifiers(repo)`: walk first-party source under the derived roots plus `src/`,
collect bare specifiers from `import`/`export ... from`/`require()`/dynamic `import()`, discard
relative paths, path-alias prefixes (`@main/`, `@renderer/`, `@shared/`, `@node/`,
`@extension-host/`) and `builtinModules`, and reduce each to a package name (handling `@scope/name`
and subpath imports). Then assert every resolved name appears in the shipping set.

### 4.3 Cross-check A' — feed in the stylesheet leaf scan _(decided)_

Four of the 22 (`@fontsource-variable/ibm-plex-sans`, `tailwindcss`, `tw-animate-css`,
`tailwindcss-scoped-preflight`) are reached only through stylesheet `@import`s and no TS scan can
see them. `collectShippedPackages` already resolves those specifiers and already surfaces
`unresolvedStylesheetSpecifiers`. Expose the **resolved** stylesheet specifier list too, and union it
into cross-check A's corpus. Do not duplicate the resolution logic.

### 4.4 Cross-check B — the diff-based gate (TJ's option 1)

Add `newlyDeclaredMissingPackages`: names appearing in any first-party `dependencies` **or**
`devDependencies` that are absent from the derived shipping set **and** absent from the previous
`THIRD-PARTY-NOTICES.lock.json`. Fires only on change, needs no exemption table, and backstops
anything A/A' cannot statically resolve. Keep `readDirectDependencies` and
`missingDirectDependencies` as they are — they remain the runtime-declaration guard; these are
additions, not replacements.

### 4.5 Tests

In `shipping-set.test.ts`, pin the re-measured 22-package set so it is a checked set rather than a
number in a review comment. Add a fixture proving a package bundled from `devDependencies` with no
row fails cross-check A, and one proving a newly-declared unbundled package fails cross-check B.

### 4.6 Correct the claim (this is half the finding)

- `missingDirectDependencies` docstring (`:241-270`) and the `devDependencies` rationale at `:220` —
  the latter's "`devDependencies` are not distributed" is simply false for this repo.
- `.erb/scripts/third-party-notices/README.md` — restate as **"every direct declaration that ships
  is cross-checked"**, and record the honest bound: **162 of 218 rows are transitive** and reachable
  by no manifest-reading approach; the byte-comparison against the committed document is what guards
  the transitive majority, and it catches _regressions_ rather than _omissions_.
- The PR body's "Open decisions" section — replace the completeness question with the answer.
- **No new ADR entry** (decided). The log is append-only and `adr-notices-derived-from-what-ships`
  is not edited to soften its claim; the accurate scope lives in the standards agents read.

### 4.7 Reconcile the `devDependencies` convention

Close the PR body's `@xmldom/xmldom` open decision alongside this: either the derivation ignores the
lockfile `dev` flag, or the Code Style Guide convention carries a documented exception. Record the
outcome next to the guide's amendment, so the next person following the convention doesn't hit the
same nested-version trap.

### 4.8 `LICENSING.md`

Add the one sentence TJ asks for in his review preamble: why the 17 duplicated AGPL copies exist (a
subtree split or standalone `npm pack` has to carry the text).

---

## Step 5 — Finding 5: re-key policy exceptions _(priority 5)_

**Files**: `policy.ts`, `notices-policy.json`, `types.ts`, `policy.test.ts`, `report.ts` template

1. `policy.ts:228` — match on `e.package === key` (`ecosystem:name`) instead of `` `${key}@${version}` ``.
2. `notices-policy.json` — re-key all 16 entries from `npm:<name>@<version>` to `npm:<name>`, moving
   the version into a new `version` field as recorded provenance ("the version this determination
   was read against"). Do not lose the information.
3. `types.ts` — update the exception shape; `report.ts` — update the emitted template.
4. `stalePolicyEntries` — confirm it still reports entries matching nothing after the re-key.
5. Docstring `:196-219` and `exceptionsNote` — they currently say exceptions are "pinned to
   name@version AND the exact text hash". After this, the hash is the gate and the version is
   provenance. Record the weighed counter-argument: a new version could add or relocate a license
   file the recorded hash doesn't cover; the certain recurring cost across 16 packages was judged
   worse than that uncertain case.
6. `policy.test.ts` — same name + bumped version + byte-identical text **passes**; same name +
   changed text **blocks**.

---

## Step 6 — Finding 7: manifest reserialization _(priority 7)_

**Files**: `extensions/lib/git.util.ts`, `extensions/lib/git.util.test.ts` (exists)

1. `:397` — run the serialized manifest through Prettier (repo config) before writing, so the output
   matches what `format:check` expects. `JSON.stringify` always expands short arrays where Prettier
   keeps them inline.
2. `:389-395` — collapse the two mechanisms that make one placement decision into a single append
   after the loop.
3. Test a manifest containing a short array (e.g. `"commands": ["dotnet-csharpier"]`) round-trips
   `format:check`-clean, so the tripwire stays disarmed.

---

## Step 7 — Finding 8: About dialog render-phase mutation _(priority 8)_

**File**: `src/renderer/components/dialogs/about-dialog.component.tsx`

1. Replace `:74` with a derived value:
   ```ts
   const displayInfo = useMemo(
     () => ({ ...packageInfo, version: appInfo.version || packageInfo.version }),
     [appInfo.version],
   );
   ```
2. Read `displayInfo` at `:84`, `:119`, `:120` and `:125`.
3. Assert in test that the SemVer build metadata still renders (`app.service-host.ts:17` appends it;
   losing it is the difference between a bug report you can pin to a build and one you can't).

---

## Step 8 — In-scope PR-body items

1. **aria string** — `%ariaLabel_opensInBrowser%` reads "Opens externally in a browser window"
   (`assets/localization/en.json:10`) but the command opens the OS default Markdown application. Add
   a new key with accurate wording, use it on the Terms of Service link, and supply the `es.json`
   translation (that file carries the existing key). Update
   `src/stories/keyboard-shortcuts.data.ts` only if a shortcut changed — it does not here.
2. **About dialog relationship text** — the dialog reads "About Platform.Bible" above "License:
   Paratext Terms of Service" with nothing explaining the relationship. Add a localized line.
3. **`build-corpus-index.ts` write-path test** — currently untested (`corpus-texts.test.ts` covers
   the texts, not the write path). Bounded risk, but cheap to cover.
4. **`git.util.ts:387` guard** — cannot reject given its single caller at `:542`. Either remove it or
   give it a reachable caller; do not leave dead defensive code.

---

## Step 9 — Verification

Cold-cache, reproducing CI's sequence:

```
npm run typecheck && npm run lint && npm test && dotnet test c-sharp-tests/
rm -rf .notices node_modules/.cache/webpack-*
npm run build && npm run build:extensions:production && npm run verify:third-party-notices
```

Steps 3, 4, 5 and 6 all change what the pipeline admits or what the bundles contain, so
`THIRD-PARTY-NOTICES.md` and `.lock.json` must be regenerated and the diff reviewed deliberately —
a byte-identical result is the expected outcome for Steps 5-6 and a _changed_ result for Step 3
(extension bundles change), which is exactly the signal worth reading.

**Comment discipline**: before treating any step as done, re-read every comment added or changed and
apply the strip-the-PR-context test (`.claude/rules/code-quality/forward-facing-comments.md`). None
of these fixes should leave a comment naming a finding number or narrating the review; the rationale
worth keeping is the forward-facing constraint, and the change narrative belongs in the commit
message.

---

## Step 10 — Close the loop

1. Reply on each of the 8 threads with what was done. **Thread `PRRT_kwDOIyvJf86d4wnZ` (finding 1)
   needs the divergence explained** — TJ's literal `settled` fix would hang `npm install`, and Step
   1.5 does something different. **Thread `PRRT_kwDOIyvJf86d4wnf` (finding 2) too** — his
   `path.posix.join` option doesn't fix Windows, and Step 2 uses his second option instead.
2. Resolve each thread only after its fix is committed.
3. Update the PR body: corrected completeness claim, the two closed open decisions, the resolved
   `devDependencies` convention question, and the upstream template follow-up.

## Out of scope — needs a person, not a commit

- **The non-CLA blame sweep.** Underpins the whole relicense, no test can verify it, invisible in the
  diff, and TJ did not confirm it. Needs an exhaustiveness check and a legal call on whether
  overwriting a line is the _agreed_ remedy or merely the executed one.
- **`platform.openTermsOfService`** design discussion and verification against a real installer.
  Before release, not before merge.
