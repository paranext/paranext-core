# PR #2726 — Katherine's review round: verified triage and hand-off

> **Frozen record — pinned to `3e8624cd641befe37e86a5b34d684fd34a4bac85`.** Every line number below
> was read at that commit, which was the head of `e2e-tooling-fixes` on 2026-08-31 and is also the
> commit Katherine reviewed. If the branch has moved, re-check citations before acting on them.
> Follow the current files, not this document, wherever they disagree.

|                   |                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **PR**            | [#2726 — Make the isolated e2e suite runnable, and stop it failing silently](https://github.com/paranext/paranext-core/pull/2726)     |
| **Author**        | Rolf Heij (`rolfheij-sil`)                                                                                                            |
| **Reviewer**      | Katherine Jensen (`katherinejensen00`), submitted 2026-08-28                                                                          |
| **Triage run by** | TJ Couch (`tjcouch-sil`), 2026-08-31, on Rolf's behalf                                                                                |
| **Method**        | The `/process-pr-feedback` skill (from PR [#2659](https://github.com/paranext/paranext-core/pull/2659), not yet on `main`), steps 0–4 |
| **State**         | Stopped at the skill's first hard stop (gate 4). **Nothing implemented, pushed, or posted.**                                          |

---

## 1. The headline

**Katherine's review holds up.** Seventeen of her findings were independently verified against the
code at the reviewed commit — all five blockers, plus findings 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19,
22, 24, 27, 29 and 30. **Seventeen confirmed, zero refuted.**

Two of those turn on Playwright's own internals rather than on this repo, and both check out against
the installed source:

- **Finding 9** — in `playwright/lib/matchers/expect.js`, `pollMatcher`'s
  `const value = await poll.generator();` sits _outside_ the `try`/`catch` that follows it; only the
  matcher call is inside. `playwright-core/lib/utils/isomorphic/timeoutRunner.js`'s
  `pollAgainstDeadline` has no catch of its own either. So a throwing generator aborts the poll on
  attempt 1, exactly as she says.
- **Finding 12** — `playwright-core/lib/utils/isomorphic/time.js` sets
  `DEFAULT_PLAYWRIGHT_TIMEOUT = 3e4`, and `playwright-core/lib/client/browser.js` applies
  `_defaultContextTimeout` only inside `newContext`, which a page from `_electron.launch()` never
  passes through.

The practical consequence: **treat her findings as true unless you have specific evidence otherwise.**
The nine not independently reproduced here (11, 17, 18, 20, 21, 23, 25, 26, 28) plus the nine minors
were read and nothing contradicted the code — but they were not separately driven, so they carry a
slightly weaker warrant than the seventeen above.

She also pre-emptively **disproved five findings of her own** and listed them so nobody re-litigates
them. Those were taken at face value and not re-checked; that is the point of her listing them.

---

## 2. Two things the branch-state check turned up that are not in her review

### 2.1 The branch conflicts with `main`, so no CI has run on it

`e2e-tooling-fixes` is **52 ahead, 3 behind** `main`, status `diverged`, `mergeable: CONFLICTING`
(stable across re-queries, so not GitHub's lazy `UNKNOWN`).

The three commits `main` gained:

| SHA           | What                                                                |
| ------------- | ------------------------------------------------------------------- |
| `790d8d6e2e8` | `fix(docs)`: unbreak Publish documentation                          |
| `bc1b47fc7a6` | **PT-4187: Standard View — first-pass port to Paratext 10 (#2565)** |
| `c54d76de9ef` | PT-4346: show books from open resources (#2721)                     |

PT-4187 edited the same e2e harness this PR rewrites. **Twelve files conflict**, all under
`e2e-tests/`:

```
e2e-tests/CLAUDE.md
e2e-tests/fixtures/cdp.fixture.ts
e2e-tests/fixtures/isolated.fixture.ts
e2e-tests/playwright.config.ts
e2e-tests/run-isolated.mjs
e2e-tests/tests/isolated/README.md
e2e-tests/tests/isolated/first-run-wizard.spec.ts
e2e-tests/tests/isolated/first-run/first-run.page.ts
e2e-tests/tests/isolated/first-run/first-run.spec.ts
e2e-tests/tests/isolated/scroll-groups/scroll-group-sync.spec.ts
e2e-tests/tests/isolated/title-bar/title-bar-narrow-width.spec.ts
e2e-tests/tests/navigation-history/navigation-history.spec.ts
```

`fixtures/helpers.ts` and `fixtures/comment-test-helpers.ts` — where most of the blockers live —
auto-merge cleanly.

**A conflicted PR silently stops CI.** GitHub cannot compute a merge ref, so no `pull_request`
workflow runs at all. "No checks reported" on this PR is _not_ "checks passed".

### 2.2 Nothing has moved under the reviewer

Katherine reviewed at `3e8624cd641`, which is still the branch head. Every inline thread's
`original_commit_id` is that same SHA, none are `isOutdated`, and none are resolved. So her line
citations still resolve, and no reply needs to say "that moved."

---

## 3. The five blockers, verified

All five are in the **new crash-recovery machinery this PR adds** — not in pre-existing code. That is
what makes them worth gating on: the safety net is currently the most dangerous thing in the diff.

### Blocker 1 — `restoreLeakedSettings` can delete the developer's whole settings file

_Thread: `e2e-tests/fixtures/helpers.ts` line 919. Root comment `3884587418`._

`restoreLeakedSettings` in `e2e-tests/fixtures/helpers.ts` ends with:

```ts
if (backup.existed) fs.writeFileSync(settingsPath(), backup.contents ?? '');
else fs.rmSync(settingsPath(), { force: true });
```

On a checkout with no `dev-appdata/data/settings.json`, the first `preConfigureSettings` writes a
backup recording `{"existed":false}`. Kill that run before its `afterAll` and the backup survives.
The developer then uses the app for days and it writes their real settings — locale, registration
details. The next run's `globalSetup` reads `existed:false` and **deletes the whole file**, then
deletes the backup. There is no second recovery path, and global setup even logs the developer's own
keys as "settings it had left behind."

**Katherine's suggested direction:** reconcile against the keys actually pinned, rather than assuming
the file is wholly test residue.

### Blocker 2 — a zero-byte or truncated backup routes straight into blocker 1

_Thread: `e2e-tests/fixtures/helpers.ts` line 880. Root comment `3884587424`._

`preConfigureSettings` writes the backup with a bare `fs.writeFileSync`, which truncates before
writing, and only overwrites `settings.json` on the _following_ statement. So an interrupt inside that
window leaves a **0-byte backup with the real `settings.json` still intact** — and `readSettingsBackup`'s
legacy-format branch maps `raw === ''` to `{ existed: false }`, which is blocker 1's delete.

A _partially_ written backup is worse: `JSON.parse` throws, the same legacy branch treats the partial
wrapper JSON as file contents, and that garbage is written into `settings.json` verbatim.

**Katherine's suggested direction:** write to a temp file and `rename`, and treat an unparsable backup
as "no usable backup" rather than as legacy contents.

### Blocker 3 — an empty leftover backup dir wipes app-global state and reports nothing

_Thread: `e2e-tests/fixtures/helpers.ts` line 844. Root comment `3884587430`._

`restoreAppGlobalState` deletes every live key _before_ anything looks at what the backup holds:

```ts
if (!fs.existsSync(backupDir)) return undefined;
storedKeyNames(liveDir).forEach((key) => fs.rmSync(path.join(liveDir, key), { force: true }));
const recovered = storedKeyNames(backupDir);
...
return recovered.length > 0 ? recovered : undefined;
```

On a checkout where `dev-appdata/local-storage/main` does not exist yet, the first
`pinAppGlobalState()` does `mkdirSync(backupDir)` and copies zero files — an **empty backup dir**.
Kill the run and it persists. The developer accumulates theme and scroll-group state for weeks. Next
run: `existsSync(backupDir)` is true → every live key deleted → `recovered` is `[]` → nothing copied
back → returns `undefined`, so `global-setup.ts`'s `if (recoveredKeys !== undefined)` prints **nothing
at all**. Silent destruction.

**Katherine's suggested direction:** read the backup contents before deleting live keys, and/or write
a sentinel so "pinned an empty store" is distinguishable from "no backup".

### Blocker 4 — both destructive restores are gated only on port 8876 being free

_Thread: `e2e-tests/global-setup.ts` line 143. Root comment `3884587431`._

In `globalSetup`, `restoreLeakedSettings()` runs at `:141` and `restoreAppGlobalState()` at `:155`.
**The singleton-lock scan — this file's own proxy for "an instance is here" — runs at `:162`, after
both restores have already happened.** That ordering is confirmed and is the part Katherine said she
would act on regardless of her timing hypotheses.

Her two scenarios for why a free port is not evidence that nobody owns those files, both reasoned
rather than staged (she flags this herself):

- **(a)** The developer's app is _starting_ — Electron up, WebSocket not yet bound. The fixtures allow
  up to 120 s for that bind, so `isPortInUse` returns false and both restores overwrite
  `settings.json` and the localStorage dir underneath a live app that has already read them.
- **(b)** An isolated run launches one Electron per test and spends seconds between launches with 8876
  unbound, so a second run started in another worktree passes the port check and destroys the first
  run's live pin _and_ its backups mid-flight.

**This is design question 1 in §6** — the fix is not a one-liner.

### Blocker 5 — the destructive-spec count is four, not two, and the fourth has no warning

_Thread: `e2e-tests/tests/manage-books/README.md` line 29. Root comment `3884587438`._

`e2e-tests/tests/manage-books/` holds four specs. `grep -rn DESTRUCTIVE` over that directory returns
three: `manage-books-commands`, `manage-books-journey`, `manage-books-functional-WP-001`.

**`manage-books-functional-WP-002.spec.ts` has no banner and writes real project data.** Its own
comments say the `createBooks` command "writes USFM stub files to disk that PERSIST across
`./.erb/scripts/refresh.sh` restarts", and its recovery instructions `rm` files under
`~/.platform.bible/projects/Paratext 9 Projects/RH2` and `/ROT` and restore `Settings.xml` from
`.BAK`. Its own skip guard tells you to "Delete the stub files (and restore Settings.xml from .BAK)
before re-running."

So **"the count is two, not three" is wrong in four places**:

| Where                                       | What it says                                            |
| ------------------------------------------- | ------------------------------------------------------- |
| The PR body                                 | "The count is two, not three"                           |
| `e2e-tests/CLAUDE.md:22-24`                 | "two of its specs mutate real project data"             |
| `e2e-tests/tests/manage-books/README.md:29` | "Two specs here write to whatever real projects…"       |
| `e2e-tests/playwright-cdp.config.ts:18-19`  | "two of its specs mutate real projects with no restore" |

The README additionally clears the **wrong file** as the harmless third: it names
`manage-books-commands.spec.ts` (which genuinely only drives non-mutating paths), while the actual
uncounted destructive spec is WP-002.

The directory-wide `testIgnore` means no data loss is reachable today — but this documentation is the
gate for the per-spec re-enablement it explicitly invites, so it needs to be right. **WP-002 should
also get the `⚠ DESTRUCTIVE` header the other three carry.**

---

## 4. Findings 6–30: status

Verified independently at `3e8624cd641`:

| #   | Sev  | Finding                                                                  | Verified detail                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --- | ---- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 6   | High | `storedKeyNames` returns directories                                     | `fs.readdirSync(dir)` is unfiltered; `copyFileSync` throws EISDIR _after_ `mkdirSync(backupDir)`, and the `rmSync` is non-recursive. **Latent** — the polyfill writes one flat file per key, so no subdirectory exists today.                                                                                                                                                                                                                                                                                      |
| 7   | High | `pinAppGlobalState`'s restore is unconditional                           | It returns `() => { restoreAppGlobalState(); }` with no `createdBackup` guard, unlike `preConfigureSettings`. `teardownElectronApp` early-returns on `preserveUserDataDir`, so a relaunch chain can leave a later un-pinned launch's teardown doing the restore.                                                                                                                                                                                                                                                   |
| 8   | High | Adding the registered user downgrades permissions                        | Five callers pass `[]`: `comments-tab.spec.ts:203-206` (four projects) and `verse-navigation-shortcuts.spec.ts:39`. With `readCurrentParatextUserName()` non-empty, `addUsersToProject` writes `<Role>TeamMember</Role>` with `TermsList` and `Progress` `Granted="false"`, replacing ParatextData's "no file → always administrator". **Live behaviour change, machine-dependent.** See design question 2.                                                                                                        |
| 9   | High | `expect.poll` doesn't retry a throwing generator                         | Confirmed against installed Playwright (see §1). One transient PAPI rejection aborts `assertInterfaceMode` on attempt 1; since it runs in the `mainPage` fixture, every test in the suite then fails at setup.                                                                                                                                                                                                                                                                                                     |
| 12  | High | The re-click's inherited 30 s equals the loop's own deadline             | Confirmed against installed Playwright (see §1).                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 13  | High | A 1920×1080 screenshot floor no declared window guarantees               | `DEFAULT_WINDOW_SIZE` is 1280×800 (`helpers.ts`); `MIN_SCREENSHOT_WIDTH`/`HEIGHT` are 1920/1080 and `windowSize` defaults to `DEFAULT_WINDOW_SIZE` (`cdp.fixture.ts`); the `page.screenshot` wrapper calls `assertFullHdScreenshot`. `grep windowSize` over `tests/enhanced-resources` and `tests/markers-checklist` returns nothing. **Latent** — those suites have never run.                                                                                                                                    |
| 14  | High | The poll race survives in the spec this PR rewrote                       | `navigation-history.spec.ts:146` and `multi-window/per-window-ui.spec.ts:304` both call `waitForAtLeastOneProjectMetadata`, then open a _specific_ project on the very next line. The targeted `waitForProjects` exists in `find.fixture.ts` and is already used by `find.spec.ts` and `replace.spec.ts`.                                                                                                                                                                                                          |
| 15  | High | `find.spec.ts` falls back where its sibling hard-fails                   | `find.spec.ts` ends its chain `?? projects[0]`; `replace.spec.ts:187` hard-throws for the same situation with a comment explaining why.                                                                                                                                                                                                                                                                                                                                                                            |
| 16  | High | The README says `test:e2e:isolated all` can't pass, for a removed reason | `README.md:462-463` still says the `title-bar` subset "attaches to a running app over CDP"; `tests/isolated/title-bar/` now holds only `title-bar-narrow-width.spec.ts`, which imports `isolated.fixture`. `:467-469` repeats it for `test:e2e:all`. The PR's own Verification section reports five clean `all` runs.                                                                                                                                                                                              |
| 19  | Med  | Every line citation in the data-loss warning is wrong                    | In `playwright-cdp.config.ts`: "Replace entire books (:507, :530)" — the click is at `manage-books-journey.spec.ts:541`. Rotation pool "(:161)" is at `:172` and reads `['zzz7','wgPIDGIN','zzz6','MP1','RH2','ROT']` — the comment's list omits `zzz6`. "`WP-001.spec.ts:394` deletes GEN" — `:394` is the _Cancel_ comment; the delete click is at `:422`.                                                                                                                                                       |
| 22  | Med  | The unit test named for the empty-store guard doesn't test it            | `app-global-state.test.ts`'s "leaves an absent store absent" asserts only `readKey(SCR_REFS_KEY) === undefined`, already true from `beforeEach`. `grep existsSync` in that file hits only `BACKUP_DIR` and the read helper — never `LIVE_DIR`. **This is the guard blocker 3 lives in**, and the PR body cites these tests as mutation-checked.                                                                                                                                                                    |
| 24  | Med  | `process.env.CI` is a string, so `CI=false` still sweeps                 | `global-teardown.ts` is `if (process.env.CI)`. `CI=false` and `CI=0` are truthy strings and still run the machine-wide `npm run stop`.                                                                                                                                                                                                                                                                                                                                                                             |
| 27  | Med  | The Replace All assertion matches only the plural toast                  | `replace.spec.ts:384` asserts `/replaced \d+ occurrences/i` with no optional `s`; `extensions/src/platform-scripture/contributions/localizedStrings.json:502` defines `%webView_find_replacedOneOccurrence%` = "Replaced 1 occurrence". Widen to `/replaced \d+ occurrences?/i`.                                                                                                                                                                                                                                   |
| 30  | Med  | The `tests/attached/` convention was never promoted to the standards     | `grep -rn "tests/attached" .context/standards/ .claude/` returns nothing. `.context/standards/Testing-Guide.md:1211` still reads "Create E2E tests in: `e2e-tests/tests/{feature}/`". See design question 6.                                                                                                                                                                                                                                                                                                       |
| 10  | High | The first-run-gate recovery can't fire in the case its docblock names    | In `src/renderer/components/first-run/first-run-overlay.component.tsx`, `ContinueWithoutSetupButton` is mounted only at `:187` (inside `status.kind === 'loading'`) and `:218` (inside `status.kind === 'error'`). The `wizard` branch at `:230` instead forwards `allowContinueWithoutRegistration`, which `startWizard` never sets. `REGISTRATION_SLOW_REVEAL_MS` resolves to `REGISTRATION_RESOLVE_TIMEOUT_MS` = `15_000` (`src/renderer/services/resolve-registration-validity.ts:11`). See design question 4. |
| 29  | Med  | `typecheck:e2e` mid-chain masks every workspace typecheck                | `package.json:106` — `typecheck:core && typecheck:erb && typecheck:e2e && typecheck --workspaces`. `&&` short-circuits, so one e2e error hides `platform-bible-react`, `platform-bible-utils` and `papi-dts`. It passes today only because two files are excluded in `e2e-tests/tsconfig.json`, whose own comment calls their errors "real API misuse … those lines throw if they ever execute", with no ticket behind "Remove each entry as its file is fixed."                                                   |

**Read but not independently reproduced:** 11, 17, 18, 20, 21, 23, 25, 26, 28, and the nine minors.
Nothing in them contradicted the code as read. Given 17/17 on the checked sample, the prior is that
they hold — but if any one of them is going to be argued with, re-verify it first.

**Katherine's own suggested gate:** "1–5 before merge. 6–8 are cheap and in the same files. The rest
can follow."

---

## 5. Open decisions

These are the four that were put to TJ at the skill's gate 4 and are now handed to Rolf.

### Decision 1 — scope of the fix round

Which set gets fixed before this merges?

- **A.** Blockers 1–5 only.
- **B.** 1–8 — Katherine's own suggested gate.
- **C.** 1–16 (everything she filed High or above).
- **D.** All 30, plus the nine minors and the ~40 lines of comment trimming she identified.

**Recommendation: B.** Findings 6–8 sit in the same two functions as blockers 1–3, so covering them
costs almost nothing extra, and finding 8 is a _live_ behaviour change affecting five existing suites
rather than a latent hazard.

### Decision 2 — when to rebase onto `main`

Every fix is otherwise sized against a tree that is about to change, and four of the twelve
conflicting files are specs this PR rewrote.

- **A.** Rebase onto current `main` first, then fix — fixes are written against what will actually
  merge, and CI can run again.
- **B.** Fix first on the current base, rebase after.

**Recommendation: A.** Resolving the Standard View conflicts inside `first-run.spec.ts` and
`scroll-group-sync.spec.ts` needs someone who knows what both sides intended, and doing it first means
the fixes and the verification runs both happen against the real target. It also restores CI, which
has been unable to run on this PR since the conflict appeared.

**Rebase caution:** the conflict rule for a restack is that the base's lines win, and only the
branch's own insertion is the branch's. In a rebase the `<<<<<<< HEAD` side _is_ the base, and
`git show REBASE_HEAD -- <file>` marks the branch's own lines with `+`. Save each conflict hunk before
resolving it.

### Decision 3 — were there other feedback surfaces?

All three GitHub surfaces were collected: one review body (`5055711338`), five inline threads, one
conversation comment (`5458659084`). Reviewable-native "no related file" discussions are invisible to
every API, so the accurate statement is _none were reported_, not _there are none_.

**Rolf: did any feedback on this PR arrive off-GitHub** — a document, a DM, Discord — that should be
folded into this round? If so it should become a new anchored review thread rather than being answered
in kind, so the next reader of the code can see it.

### Decision 4 — who replies to Katherine, and when

No replies have been drafted or posted. The five inline threads and the conversation comment are all
unanswered. Whoever picks this up should reply **after** the fixes land, citing the commit each fix
landed in, and should not resolve Katherine's threads — that is hers to do.

Reply endpoints, for reference:

- Inline thread → `POST repos/paranext/paranext-core/pulls/2726/comments/<root id>/replies`
  (root ids in §3; it rejects a reply-to-a-reply).
- The conversation comment and the review body →
  `POST repos/paranext/paranext-core/issues/2726/comments`, quoting enough to anchor it.

The review body itself is a pointer at the inline comments plus a summary, so it needs no answer of
its own.

---

## 6. The six questions that need real design input

These are the ones where the fix is a judgment call, not a mechanical edit. **These are the questions
this hand-off most wants answered** — the rest is largely typing.

### Q1. What actually proves "nobody owns these files"? (blocker 4, finding 24)

A free port 8876 is not evidence. An app mid-startup has not bound yet; an isolated run spends seconds
between launches with the port free, so a second run in another worktree sails through the check and
destroys the first run's live pin and its backups mid-flight.

Katherine suggests a **run-scoped pid file** — and notes the signal already half-exists: `global-setup`
writes `.dev-server.pid` and `launchElectronApp` captures `appPid`. The same mechanism would let
finding 24's `process.env.CI` branch be removed entirely and restore local self-healing.

_Open:_ what is the unit of ownership — a run, a worktree, a machine? What happens when the owner
crashes without cleaning up (the exact case this machinery exists for)? Does the restore become
opt-in rather than automatic?

### Q2. Should the current Paratext user be injected into `ProjectUserAccess.xml` at all? (finding 8)

Five suites deliberately pass no users, relying on ParatextData's "if no project users file, always
administrator". They now get a file granting `TeamMember` with `TermsList` and `Progress` explicitly
denied.

_Open:_ gate the write on `users.length > 0`, or make the current-user injection opt-in? The first
restores the old behaviour for those five callers but leaves the `comment-assignment` problem this
change was made to fix; the second needs each caller to opt in deliberately. This changes what those
five suites are actually testing, so it wants an intentional answer.

### Q3. Three fixture options use two names with opposite meanings — and one name with both (finding 26)

`interfaceMode` (in `find.fixture.ts`) _applies_ a mode and is worker-scoped; `requiredInterfaceMode`
(in `isolated.fixture.ts` and `cdp.fixture.ts`) only _asserts_ and is test-scoped. `windowSize` is
sharper still: the same name in all four fixtures, but it _applies_ in `isolated.fixture`,
`find.fixture` and `comment.fixture`, and only _asserts_ in `cdp.fixture`.

The consequence: **moving a spec between `tests/isolated/` and `tests/attached/` silently converts a
request into a claim**, with no compile-time or runtime signal.

_Open:_ is a rename worth the churn across the specs that use these options, and what is the naming
rule — `applyX` / `requireX`? A shared type that makes the two non-interchangeable?

### Q4. The first-run-gate recovery can't fire in the case its own docblock names (finding 10)

The docblock says the probe "reads as invalid on a CI machine with no real Paratext registration."
But `invalid` routes through `src/renderer/services/first-run.reducer.ts` → `{action:'startWizard'}`
→ the `wizard` branch in `src/renderer/components/first-run/first-run-overlay.component.tsx`, which
mounts **no** `ContinueWithoutSetupButton` — **verified: both escape hatches are inside the `loading`
(`:187`) and `error` (`:218`) branches only.** The wizard's own button is gated on
`allowContinueWithoutRegistration`, which `startWizard` never sets.

Katherine's own guidance: the two states it _does_ cover (`unknown`→`error`, and a slow resolve) are
real, so **fix the stated mechanism and add the `wizard` case rather than rewriting the helper.**

She also flags a second effect: the hatch appears only after `REGISTRATION_SLOW_REVEAL_MS`, which
resolves to `REGISTRATION_RESOLVE_TIMEOUT_MS` = `15_000` (verified in
`src/renderer/services/resolve-registration-validity.ts`),
so with the budget under 15 s the recovery branch cannot win — and clamped to the 1000 ms floor,
`not.toBeVisible({ timeout: 1000 })` can now reject during the gate's normal `loading` flash, turning
a previously-passing path into a hard failure.

_Open:_ this needs someone who knows the first-run flow's intended states. It is also the finding most
likely to interact with the real fix Rolf already identified in the PR body as belonging in
`resolveInternal()` and "a candidate for its own ticket, not this branch."

### Q5. Two `enhanced-resources` files are quarantined from typecheck with no ticket (finding 29)

Their own comment in `e2e-tests/tsconfig.json` calls their errors "real API misuse … those lines throw
if they ever execute" — `FrameLocator` has no `.evaluate()`, and both pass `isResourceShownByDefault`
where the type declares `isInTextCollection`. Deciding which side is stale needs the
`enhanced-resources` suite actually running, which needs real Marble resources and is in no CI job.

_Open:_ file a ticket for the un-quarantining, and separately decide whether `typecheck:e2e` should
move to the end of the `&&` chain (or the chain become non-short-circuiting) so an e2e error stops
hiding three whole workspaces from CI.

### Q6. The `tests/attached/` convention exists only in `e2e-tests/CLAUDE.md` (finding 30)

**Verified:** `.context/standards/Testing-Guide.md:1211` still reads "Create E2E tests in:
`e2e-tests/tests/{feature}/`", and `grep -rn "tests/attached" .context/standards/ .claude/` returns
nothing. Katherine adds that the guide's tree has no `tests/attached/`, its fixture table still labels
`cdp.fixture` "**Default for all per-feature E2E tests**", and
`tests/_example/example-feature-render.spec.ts` plus all three `tests/smoke/*.spec.ts` headers say the
same.

_Open:_ promoting this is a standards edit, and per this repo's own
`.claude/rules/agent-authoring-link-dont-paraphrase.md` the standards file is what agents read and
enforce on the next feature. Worth doing in this PR or a follow-up — but it should be a deliberate
choice, since the PR is already large.

---

## 7. What was deliberately not done

- **Nothing was implemented.** No code changed, on any branch.
- **Nothing was pushed to `e2e-tooling-fixes`.** That branch belongs to Rolf; this triage ran as
  `tjcouch-sil`, and rewriting someone else's branch is not a default anyone should take.
- **Nothing was posted to the PR.** No replies drafted, no threads resolved.
- **No Jira ticket was created.** Q5 (and arguably the `resolveInternal()` fix Rolf already flagged)
  wants one, but that is the team's to file.
- **The rebase onto `main` was not attempted** — see decision 2.
- **Katherine's five self-disproved findings were not re-checked**, by design.

---

## 8. Picking this up in a fresh chat

Everything needed is in this document; the working notes it was written from are in a gitignored
`.review/2726-2026-08-31/` directory on TJ's machine and do not travel with this branch.

A useful prompt shape:

> Read `docs/plans/2026-08-31-pr-2726-review-handoff.md`. It is a verified triage of Katherine's
> review on PR #2726, stopped at a decision gate. I want to answer decisions 1–4 in §5 and design
> questions Q1–Q6 in §6, then implement. Start by re-checking that the branch head is still
> `3e8624cd641…` — if it has moved, re-verify the line citations before trusting them.

If the `/process-pr-feedback` skill has landed on `main` by then, running it over PR 2726 will redo
steps 0–3 against whatever the current state is and stop at its own gate 4 — this document is
effectively the output of one such run, dated 2026-08-31.

One caveat worth carrying forward: this PR's verification claims rest on local runs, because the
conflict has kept CI from running at all. Whatever set of fixes gets chosen, the rebase in decision 2
is what makes a green CI result possible again.
