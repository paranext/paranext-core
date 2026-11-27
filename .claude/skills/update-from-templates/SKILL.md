---
name: update-from-templates
description: "Bring the extension templates' latest changes into paranext-core's extensions/ or into an extension repo built from the multi-extension template (paratext-bible-internal-extensions, paratext-assistant, paratext-bible-extensions, ...) with `npm run update-from-templates`. Covers the run loop, telling a forward pull from one applied backwards, conflict resolution rules, the lockfile, verification gotchas and the merge-commit PR. Use whenever a template PR has merged and a repo needs its changes, or when asked to apply or check template updates."
allowed-tools: Bash, Read, Edit, Write, Grep, Glob
---

# Update From Templates

Two templates feed every extension repo:

- `paranext-multi-extension-template`: repo-level scaffolding (root `package.json`, webpack config, `lib/` scripts, CI).
- `paranext-extension-template`: one extension's scaffolding, as used in each `src/<extension>` folder.

`npm run update-from-templates` brings their `main` into the repo so that git records the changes as coming from the templates. That record is what lets the next update apply cleanly, so **the PR must be merged with a merge commit whose body is empty, never squashed** (see `.context/standards/Git-Guide.md` § "Template Updates Exception"). The body matters as much as the merge method: a merge commit whose body lists the branch's commits carries their `git-subtree-dir` / `git-subtree-split` lines, and the next update then takes the whole repository as an extension's template base and can reset the extension to the template with no conflict to warn anyone. paranext/paratext-bible-extensions#122's merge commit (`3321e9c`) did this (PT-5115); step 6 says how to merge safely.

## What the script does

1. Refuses to start with uncommitted changes.
2. Repo level:
   - **paranext-core:** `extensions/` is a squashed subtree of the multi-extension template: `git subtree pull --prefix extensions … --squash`. The script exists only in `extensions/package.json`, so run it from `extensions/` (`cd extensions && npm run update-from-templates`).
   - **extension repos:** the repo root is the multi-extension template's history: `git merge paranext-multi-extension-template/main --allow-unrelated-histories`.
3. Each extension folder: `git subtree pull --prefix <folder> paranext-extension-template main --squash`, one at a time. A folder that was never added as a subtree is skipped with a "never added" warning (expected for core's `c-sharp-provider-test` and `evil`; NOT expected for any template-based extension). A template-based extension that reports it was usually renamed, or its subtree commits were lost, and it gets no template changes until it is re-linked: stop and ask the user, then re-link it as paranext-multi-extension-template's README, "Re-linking an extension to the template", describes (repos that have taken that README in a template update have the section, and a warning that names the folder path to use). Workspaces without a `manifest.json` (helper packages, for example scripture-forge-platform-extensions' `src/messages` and `src/sf-pdp`) are not extensions: the script skips them without a warning, so check their dependencies yourself (the loop's step 4, "Lockfile").
4. Resolves only conflicts in unused workspace `package-lock.json` files (deletes them). Any other conflict stops the script; resolve, commit, and run it again until everything reports up to date.
5. A formatting and identity pass over the repo root and each template-based extension. Its messages (`Updated README.md …`, `Updated manifest.json …`, `Updated package.json …`, `Types file … not found, skipping rename operation`) are normal even when they change nothing: a clean `git status` is what counts. Commit anything it does change. In paranext-core the pass also stamps core's license over the template's MIT, on `extensions/` and on every extension (`stampExtensionsRootLicense` and `stampExtensionLicense` in `extensions/lib/git.util.ts`; message `Set license to …`), unless the extension sets `"licenseIsDeliberate": true` (see `LICENSING.md`).

Some conflicts are expected on every update and are not a sign of trouble: the root `package-lock.json` (whenever the template's lockfile changed; take the current branch's side, see the loop's step 2), and each extension's `volta` block on a Node.js bump where the repo uses `volta.extends`.

**Known script bugs:**

- **The exit code means nothing** (until PT-5114 is fixed). It is 0 after an ordinary stop on conflicts, and non-zero after the crash below. Read its output and `git status`, never the exit code.
- **It crashes when `package.json` itself conflicts** (until PT-5102 is fixed; extension repos only, since in core a subtree pull can't conflict the root `package.json`): the lockfile auto-resolver `JSON.parse`s the conflicted root `package.json` ("Expected double-quoted property name"). The merge is left in progress with the conflicts marked; resolve by hand as below.
- **While a `package.json` Volta reads has conflict markers (in core too), Volta refuses to run any `node` or `npm` command inside the repo** ("Could not parse project manifest"), including the helper and any resolution script of your own. Run them with the working directory outside the repo, passing the repo's path.

The script also `git rm`s each extension's `package-lock.json` when the template side adds one; these are not tracked on `main`, so the net change to tracked files is nothing. Confirm with `git diff --name-status origin/main` if unsure.

## Setup

- **Where to run this:** the skill exists only in paranext-core, so start the session in a paranext-core checkout. For an extension repo, give the session access to it (for example `claude --add-dir <repo>`).
- **Fetch, then branch a fresh worktree from `origin/main`**, not a stale main checkout (count incoming commits against `origin/main`, never a local `main`). Name the branch after the work's ticket (for example `pt-1234-template-update`); if none was given, use the ticket in the incoming template commits' titles, or ask. Stop the branch tracking `main`, so a later push goes to its own branch:

  ```bash
  git -C <repo> fetch origin
  git -C <repo> worktree add --no-track -b <branch> <worktree path> origin/main
  # push later with: git push -u origin <branch>
  ```

- **Which core it builds against:** an extension repo installs core from `../paranext-core`, so it is the folder named `paranext-core` beside the worktree that counts, whatever other core checkouts sit nearby. It can be on any branch: what counts is that its `lib/` matches core `main` (`git -C ../paranext-core diff origin/main -- lib` is empty). The libraries' built `dist/` is committed, so that check covers the build too.
- **Install under the repo's current pin** so the script can run:
  - **Extension repos:** `volta run --node <volta.node from package.json> npm ci --ignore-scripts`. Their script needs only `tsx`.
  - **paranext-core:** core's normal install, `npm ci` without `--ignore-scripts` (or work in a core checkout that is already installed). Core's script imports `platform-bible-utils`, which needs the dev packages that core's `preinstall` stages; skipping scripts leaves them out, and the script fails before fetching anything.

  The pin may change during the update (for example when the template moves Node.js); from then on use the new one. The script does not need a reinstall when the pin changes: the loop's step 4 reinstalls under the new pin (and in extension repos, step 5's `npm ci` does again before verifying). In a core worktree whose folder isn't named `paranext-core`, that reinstall writes the folder's name into `package-lock.json`'s root `name` (core's root `package.json` deliberately has none); revert that hunk before committing.
- **Check both template remotes exist:** `git remote` must list `paranext-multi-extension-template` and `paranext-extension-template`. The `postinstall` hook that adds them (`lib/add-remotes.ts`; in core, `extensions/lib/add-remotes.ts`) does not run under `--ignore-scripts`, so a fresh clone has neither. Add them with `npx tsx lib/add-remotes.ts` (in core, from `extensions/`), or by hand as `extensions/README.md`'s "Adding remotes manually" describes. A worktree of a clone that already has them shares them.
- **Use the skill's helper from the core checkout that holds this skill** (its absolute path), not a path relative to the extension repo: `node <core>/.claude/skills/update-from-templates/scripts/conflict-sides.mjs`.

### 0. How far behind is the repo, and what is coming in?

Before running anything, list the template commits the repo will receive from both templates:

```bash
git -C <worktree> fetch paranext-multi-extension-template main
git -C <worktree> fetch paranext-extension-template main

# Multi-extension template, extension repos (the root merges it):
git -C <worktree> log --oneline HEAD..paranext-multi-extension-template/main
# Multi-extension template, paranext-core (extensions/ is a subtree): from its last sync
git -C <worktree> log -1 --format=%b --grep='^git-subtree-dir: extensions/*$' HEAD   # git-subtree-split: <sha>
git -C <worktree> log --oneline <that sha>..paranext-multi-extension-template/main

# Extension template, for each extension folder: from that folder's last sync
git -C <worktree> log -1 --format=%b --grep='^git-subtree-dir: <folder>/*$' HEAD     # git-subtree-split: <sha>
git -C <worktree> log --oneline <that sha>..paranext-extension-template/main
```

The extension template is the one subtree-pulled into every extension folder, so a React or Tailwind bump in an extension's `package.json` arrives through it, not through the multi-extension template.

**Then check every folder's newest sync record, before running the script.** `git subtree pull --squash` takes its merge base from the newest commit whose message carries `git-subtree-dir: <folder>` and `git-subtree-split:` lines. For core's `extensions/` and every extension folder:

```bash
git -C <worktree> log -1 --format='%h %p | %s' --grep='^git-subtree-dir: <folder>/*$' HEAD
```

Each must be a real squash commit: subject `Squashed '<folder>/' content from commit …` (no parent; the folder's add, or a re-link) or `Squashed '<folder>/' changes from … ..…` (one parent; an update). Anything else is a bad commit: typically a squash-merged PR, or a merge commit whose body listed the branch's commits (paranext/paratext-bible-extensions#122, `3321e9c`, for both its extensions). A pull from it uses the whole repository as the template's content for that folder: it can merge with no conflicts at all while resetting the folder to the template (deleting its own files), so the direction checks in step 1 would never run. **If any folder's newest record is a bad commit, stop and ask the user; don't run the script.** The fix is to re-anchor the folder first, as the post-merge check in step 6 describes; record the case on PT-5115.

That check can't see damage an earlier update already did: that update wrote its own normal-looking record on top. If an extension's own files have gone missing or been reset to the template's, list all its records (drop the `-1`) and look for a bad commit with `changes from` records above it; then look at the folder's history since that commit (`git log --stat <bad commit>..HEAD -- <folder>`) to see whether one of those updates did it. Recovering means undoing those updates, newest first, then re-anchoring with the bad commit's own `git-subtree-split:` (or the newest `Squashed` record older than it), never a newer record, which would skip the undone updates' template changes for good; paranext/paranext-multi-extension-template's README, "Re-linking an extension to the template", has the steps. A bad commit far down the list is not on its own a problem: paranext-core's `extensions/src/hello-rock3` still lists #1634's `4c021221dbe` under seven normal updates, and needs nothing.

A repo several template changes behind can receive big upgrades (React 19, Tailwind 4, a new shadcn baseline) on top of the change that prompted the update. Those can need migrating the repo's own extension code (step 5's leftover-convention checks). If nothing coming in needs the repo's own code migrated (for example only version bumps), report what is coming in and carry on. Otherwise tell the user what is coming before going ahead, and agree whether follow-on fixes to the repo's own code belong on this branch.

While waiting for that answer, the template merges themselves can go ahead: they don't depend on it.

For each breaking template change coming in, its migration checklist for extension code is announced in the Discord [`#platform-changes`](https://discord.com/channels/1064938364597436416/1136038164818034849) forum, not in the template PR. Work through it against the repo's own code before calling the update done. The one known so far:

- **React 19, Tailwind 4 and the new shadcn baseline** (multi-extension template #91; announced 2026-05-13 in ["Upgrade to React 19, Tailwind 4, and new shadcn baseline"](https://discord.com/channels/1064938364597436416/1503904008782483536)). Its checklist, summarised:
  - Tailwind classes: `tw-` → `tw:`, with the prefix moved in front of any variant (`hover:tw-px-3` → `tw:hover:px-3`), and Tailwind 4's renamed utilities (for example `flex-shrink-0` → `shrink-0`; see the [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide)).
  - CSS variables in the extension's own CSS: `hsl(var(--x))` → `var(--x)` (the template update already converts the Tailwind classes; the old form is believed to still work, but change it anyway); `--sidebar-background` → `--sidebar`.
  - shadcn components: `Badge` renders a `<span>` (a `ref` typed `Ref<HTMLDivElement>` becomes `Ref<HTMLSpanElement>`; code relying on its block layout needs its own wrapper or `tw:block` / `tw:inline-block`); `Select` no longer has sizes `lg` and `icon`; the resizable components' API changed (`direction` and `onLayout` kept); `Input` now has a `dark:` background, so matching light and dark colours needs `tw:dark:bg-…` classes too; `selectTriggerVariants` is gone.
  - React 19 (see the [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)); a dependency that bundles its own older React breaks.

Read the full post (Discord needs a signed-in browser; if you cannot reach it, ask the user). It attaches the checklist as raw Markdown (`upgrading-react-tailwind-shadcn.md`), and a later reply attaches the prompt TJ used to have AI make these changes after a manual template update (`update-shadcn-prompt.md`). For a breaking change not listed here, ask the user for its announcement, and add its checklist and link here afterwards.

## The loop

For each run of the script:

### 1. Before resolving anything: did the pull go the right way?

Sometimes a pull's conflicts look applied in the wrong direction: the template's changes show up as removals, or the repo's own edits get undone. **Never hand-resolve a pull like that.** Abort it (`git merge --abort`, or `git reset --hard <commit before the run>`), run the script again, and record what happened (see "Record what you see"). **If the re-run looks backwards too, stop:** don't resolve it, record the case on PT-5115, and ask the user how to go on.

Check these:

- **Root merge (extension repos).** The repo-level step is a plain `git merge`, so list what it brings in: `git log --oneline HEAD..MERGE_HEAD` should be the template commits found in step 0, and `git merge-base HEAD MERGE_HEAD` the template commit the repo last merged.

- **Merge base (deterministic; subtree pulls).** Step 0 checked every folder's newest sync record before the run; if a conflicted pull still looks backwards, check its folder again. While the pull's merge is in progress, `HEAD` is still the commit from before the pull, so the same command finds the base it used:

  ```bash
  git log -1 --format='%h %p | %s' --grep='^git-subtree-dir: <prefix>/*$' HEAD
  ```

  If it is not a real squash commit (see step 0), the merge base is wrong. A re-run searches from the same `HEAD`, so it finds the same commit and the same merge base: don't expect a re-run to help, and stop as above.

- **Each side's changes (judgment).** For every conflicted file, compare what the template changed since the merge base with what the repo changed:

  ```bash
  node <core>/.claude/skills/update-from-templates/scripts/conflict-sides.mjs <repo dir> <out file>
  ```

  Put `<out file>` outside the repo (an absolute path beside the worktree): a relative path resolves against the working directory, and a report left inside the repo is an untracked file, which makes the script refuse its next run.

  A forward pull's template side ADDS the template's recent changes (for example a new Node.js version, a new dependency, a new script). If the template side instead removes things the template itself added, the pull is backwards. The helper says when a side deleted the file or the merge base has no copy of it, and stops with an error rather than write a partial report.

### 2. Resolve a forward pull

- **Keep the repo's identity and layout:** `name`, `version`, `license`, `description`, `types`; its `lib/` paths (core: `../lib/…` and `../../../lib/…`; extension repos: `../paranext-core/lib/…` and `../../../paranext-core/lib/…`); and `volta.extends` where the repo uses it instead of `volta.node`.
- **Take the template's version bumps and additions** that sit next to the repo's own lines (the usual cause of a conflict).
- **Scripts:** keep the repo's own script bodies (for example a custom `build`) and add the template's new scripts beside them (for example `prebuild`, which npm runs before `build`). If the repo keeps its scripts in alphabetical order, put the additions in sorted position, and don't duplicate a template context line that the repo already has.
- **An `overrides` block the template adds to an extension's `package.json` does nothing there** (npm reads `overrides` only from the root). Take it anyway, for template parity, and say so in the PR so a reviewer doesn't query it.
- **Lockfiles:** take the current branch's side (`git checkout --ours -- package-lock.json`) and reconcile later (step 4).
- **paranext-core only, where core deliberately differs from the templates:**
  - `extensions/package.json`: no `prebuild` / `prebuild:production`. npm runs `prebuild` automatically inside core's root build, which already mints the third-party-notices build ID once (`.erb/scripts/notices-build-id.ts`). Each extension's own `package.json` keeps the template's `prebuild`: core never runs an extension's own npm build.
  - `extensions/webpack/`: keep core's notices plugin import from `.erb/configs`, its webpack cache directories, and its Tailwind prebuild loader; leave out Sass `style: 'expanded'` (core feeds web views prebuilt Tailwind).
  - `tailwind.config.ts` (root and each extension): keep core's blockquote settings, which match `lib/platform-bible-react/tailwind.config.ts`.
  - `license` fields and `LICENSE` files under `extensions/`: keep core's AGPL side of any conflict. The formatting pass (step 5 of "What the script does") re-stamps them after every run, and it stops with an error if the repo root's `LICENSE` is not the AGPL text.
  - Template-only files that arrive (`extensions/webpack/emit-shipped-modules-plugin.ts`, `notices-build-id.ts`, `.github/` workflows) can stay: core does not use them, and keeping them stops them coming back as additions on every pull.
- Anything the template changes that alters behaviour and merged without a conflict still needs a decision: list it in the PR (step 6).

Commit with `git commit --no-edit`, then run the script again. Keep git's own merge message on these commits, with no added attribution trailer: it is part of the template history. Commits you write yourself on the branch (the lockfile, follow-on fixes) follow the repo's normal commit conventions. A template-update branch keeps all its commits; never squash or amend them into one.

### 3. Until it is up to date

Repeat until every pull reports `Already up to date` / `Subtree is already at commit …` and `git status` is clean. Only the expected folders may report "never added"; for any other, see item 3 of "What the script does".

### 4. Lockfile

Reinstall under the repo's pinned Node.js, not whatever Volta picks for the folder:

- **Extension repos:** `--ignore-scripts`:

  ```bash
  volta run --node <volta.node from package.json> npm i --ignore-scripts
  ```

- **paranext-core:** plain `npm i` (under the same pin), as in Setup. Core's install scripts apply `patches/`, fetch Electron and build what step 5's checks rely on, so skipping them can leave `node_modules` unpatched or unbuilt.

Read the lockfile diff: it should hold only what the `package.json` changes declare (for example a new `@types/node` and its `undici-types`, or a dependency declared per extension). For a large update, compare the lockfile's `packages` maps before and after (added, removed and version-changed top-level packages) rather than reading the raw diff, and match each change to a `package.json` change. A Node.js or npm major change can also add or restore optional platform packages no `package.json` names (`fsevents`, `@esbuild/*`, `@swc/core-*`); check the template's own lockfile before treating one as unexplained. Transitive version bumps pulled up by a new or updated dependency (for example `postcss`, `browserslist`, `caniuse-lite` after `@tailwindcss/postcss` arrives) are expected too: confirm they come from such a dependency (`npm ls <package>`), but don't chase each one further.

Then run `npm ls --all` and fix any `invalid` entry. A version-2 lockfile (one with a legacy `dependencies` tree) can keep a stale nested copy after a range changes; remove its entry from the lockfile's `packages` and `dependencies` sections and from `node_modules/.package-lock.json`, delete the nested folder, and run `npm i --ignore-scripts` again.

**Workspaces the script doesn't touch** (helper packages without a `manifest.json`) keep their old dependency ranges. Move any dependency the template just moved there too (`@types/node`, ESLint plugins): a range left behind gets its own nested copy, and two copies of an ESLint plugin break `npm run lint` ("couldn't determine the plugin … uniquely"). Then check every pin agrees:

```bash
git grep -nE '"node": "|"@types/node"|"extends"' -- '*package.json'
```

Every extension should either pin the same `volta.node` as the root or use `volta.extends`; one with neither is a defect to fix.

### 5. Verify

Under the repo's pinned Node.js, judge each command by its exit code (and, for chained scripts, check the log shows every step ran):

- **Set up a control first: before blaming the update for a failure, run the same check on `origin/main`.** A control can also show that something looking broken on the branch was already broken on `main` (platform-bible-sample-extensions' `verse-ref-view` had no Tailwind utilities before the update, because its SCSS used `@import './tailwind.css'`, which Sass leaves as a plain CSS import; `@use` is the fix). Use a second worktree beside the first (for example `<repo>-main-control`), installed under `main`'s Node.js pin. Some repos have tests that fail on `main` too, for example tests that time out only under the full suite (they pass alone) or date tests that fail outside a UTC-like time zone (run them with `TZ=UTC`); the control shows which.
- **paranext-core:** `npm run typecheck`, `npm run lint`, `npm run format:check` (CI runs it), `npm test` (the root runs every workspace's tests, extensions included), `npm run build:extensions`. After a Playwright upgrade, `platform-bible-react`'s browser tests need `npx playwright install chromium-headless-shell` first.
- **extension repos:** `npm ci`, `npm run lint`, `npm run format:check` (CI runs it), `npm run build`, `npm run build:production` (some template changes affect production builds only), and `npm test` where the repo has a test script (some have none; record that rather than a failure). Check whether the root `npm test` covers each extension: in paratext-assistant it does not, so also run `npm test` inside `src/checking-assistant`.
  - **Type-check:** webpack compiles with SWC, which does not type-check, and lint and build do not run `tsc`. Run the repo's `typecheck` script, or `npx tsc --noEmit -p <tsconfig>` for each extension's `tsconfig.json` (the root one is optional; it can report many unrelated errors), on the branch and on the control. Compare the `error TS` lines, not the exit code (under `volta run` on Windows `tsc` can exit 126 after printing errors): only errors new on the branch count.
- **Conventions the build does not check** (skip this when only version bumps came in). A template upgrade can change conventions the repo's own code must follow, and lint and build can pass while the result is broken. After a Tailwind 3 → 4 upgrade, for example, classes use the `tw:` prefix, not `tw-`; leftover `tw-` classes and `@apply tw-…` lines silently generate no CSS.
  - **Search** the repo's own extension code (`.tsx`, `.ts`, `.scss`, `.css`) for the old forms.
  - **Check the new forms generate CSS** without reading `dist/`: compile the extension's Tailwind entry stylesheet with its own PostCSS setup and `@tailwindcss/postcss` in a scratch folder, check every class you migrated gets a rule, and include a made-up class as a negative control.
  - **Look at the result in Platform.Bible** where you can (no login needed): `npm start` in the extension repo starts `../paranext-core` with the extension loaded.
  - **Stop the app** afterwards: close it and end the process tree `npm start` began (on Windows `taskkill //T //F //PID <pid>`), then check ports 8876 and 1212 are free. Don't run core's `npm stop` without asking: it kills every webpack, esbuild and Vite process on the machine, including other sessions'.
- **Build output (`dist/`) is not readable from a session started in a paranext-core checkout:** core's `.claude/settings.json` denies `Read(**/dist/**)`, and that also covers an extension repo the session works in. To check what a build generated, ask the user to copy the files somewhere readable with a `!` command (in Git Bash, so write Windows paths with forward slashes), check the copies, and delete them afterwards.
- **Never remove a control worktree with `git worktree remove` alone:** on Windows it follows the `file:` links in `node_modules` into the core checkout and deletes its files. See step 7 for the safe order.
- npm 11 may warn that some packages' install scripts are not in an `allowScripts` list (`@swc/core`, `esbuild`, …). Builds still work; note it in the PR if it appears.

### 6. PR

Draft the PR body even when asked to stop before pushing; it is where the decisions are recorded. Save it outside the repo, beside the worktree (for example `<workspace>/<repo>-pr-body.md`), and say where; delete the draft once the PR holds it. Link Jira keys to `https://paratextstudio.atlassian.net/browse/<KEY>`.

**Title:** follow the repo's previous template-update PR (`gh pr list -R <owner>/<repo> --state merged --search "template" --limit 5`; not every repo is under `paranext`); otherwise `<TICKET>: Update from the templates (<what came in>)`.

**Body:**

- Open with a GitHub alert, so the person merging cannot miss it. If auto-merge is on, say so in the same alert, since an approval then merges the PR:

  ```markdown
  > [!IMPORTANT]
  > **Merge with a merge commit and an empty commit body, not squash.** The template merges and squashed subtree commits on this branch are the record `npm run update-from-templates` uses to find its merge base next time. A squash merge loses them, and a merge commit whose body lists this branch's commits copies their subtree lines, which makes the next update reset extensions to the template. Clear the body in GitHub's merge dialog (or `gh pr merge <n> --merge --body ""`). Auto-merge (merge commit, empty body) is on, so an approval merges it.
  ```

- A `### Why review this` section naming the ticket and the work it belongs to.
- **Template commits pulled:** each template's range, with the template PRs that came in.
- **Run record:** starting commit, and per folder the merge base, the range pulled, forward or backwards, and the conflicting files (see "Record what you see").
- **Decisions:** what you kept from the repo, what you took from the template, and every behaviour change, each with its reason.
- **Verification:** a branch-versus-control table, honest about pre-existing failures and the control that shows they are pre-existing.
- Refer to template and core PRs with their full repo prefix (`paranext/paranext-multi-extension-template#91`, `paranext/paranext-core#1622`): a bare `#91` links to the extension repo's own #91.
- Put package names in backticks (`` `@sillsdev/scripture` ``), including ones copied from template PR titles: GitHub can read a bare `@org/name` as a team mention.
- End with the AI-assistance line `CLAUDE.md`'s "Git & PR Conventions" asks for.

**Reviewers:** none designated unless asked. GitHub still adds the repo's CODEOWNERS as reviewers; that is expected, so leave them.

**Auto-merge:** turning it on means an approval merges the PR, so ask the user first, unless they already asked for it. Only where GitHub holds the PR for a review; never assume which repos those are, check. Visibility is `gh repo view <owner>/<repo> --json visibility`; the deciding test is `gh pr view <n> -R <owner>/<repo> --json reviewDecision,mergeStateStatus`: `reviewDecision` is `REVIEW_REQUIRED` only when the branch's rules require an approving review, and `mergeStateStatus` is then `BLOCKED`. `BLOCKED` on its own is not enough, since pending CI also blocks. Reading the protection rule itself needs admin rights on the repo (the API returns 404 or 403 without them), so rely on `reviewDecision`. Where `reviewDecision` is not `REVIEW_REQUIRED`, a mergeable PR merges the moment auto-merge is on. Where it is safe: `gh pr merge <n> --auto --merge --body "" --match-head-commit <full sha>`, then add the auto-merge note to the banner. Always pass `--body ""`: without it GitHub fills the merge commit's body with the branch's commit messages, subtree lines included, whatever the repo's default (that is how paranext/paratext-bible-extensions#122 went wrong). Read it back: `gh pr view <n> -R <owner>/<repo> --json autoMergeRequest` must show `"commitBody": ""`. Elsewhere, merge by hand after approval: `gh pr merge <n> --merge --body ""`, or a merge commit in GitHub's dialog with its body cleared. The merge-state test needs the PR to exist, so on a stop-before-push run leave the auto-merge sentence out of the drafted banner and say the decision is still open.

**After it merges,** check the merge commit carries no subtree lines: `git log -1 --format=%B <merge commit> | grep -c git-subtree` must print `0`. If it doesn't, the next update will use that commit as its base: re-anchor each listed folder before then, with one marker commit per folder recording the template commit it really synced to (as paranext/paratext-bible-extensions#123 did), and record the case on PT-5115.

### 7. Clean up

After the PR is up. If you were asked to stop before pushing, leave the control worktree and your logs in place, and list them in your report so they can be cleaned up after the PR:

- **Remove the control worktree, `node_modules` first:** delete its `node_modules` with Node.js (`node -e "require('fs').rmSync('<control>/node_modules',{recursive:true,force:true})"`), check the core checkout's `git status` is unchanged, then `git worktree remove --force <control>` (`--force` is needed because the control holds untracked build output, and is safe once `node_modules` is gone), and check core's `git status` again.
- Delete any helper scripts and run logs you made outside the repo.
- Keep the branch's worktree until the PR has merged, for review fixes.

## Record what you see

For every run, and above all for every pull that looked backwards or a sync record step 0 stopped on, record: repo, starting commit, template commits pulled, per-folder outcome (clean / forward conflicts / looked backwards), the merge-base check result, the conflicting files, what looked reversed, and whether a re-run fixed it. Put it in the PR description, and record every backwards case on PT-5115 so the cause can be found.
