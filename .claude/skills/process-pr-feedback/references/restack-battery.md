# Restack battery — rebasing a stack and proving it faithful

Used by **P6 — Integrate**, whenever a fix lands below the top of a branch stack. Run the full
battery at the top of the stack before anything is force-pushed. Nothing here is optional
because the failures it catches are invisible in per-commit review.

> *Provenance: the session-memory reference `rebase-verification-battery` (2026-06-12), which
> caught a real defect on its first outing, plus the working practice from the 2026-08 restack
> rounds (counts first, backup tags, stack-order pushes).*

---

## Before touching anything

1. **`git fetch origin` first.** "On a branch" is not a state you can read from
   `git branch --show-current` alone. Establish ahead/behind for every branch in the stack:

   ```bash
   git rev-list --count origin/<branch>..<branch>   # ahead
   git rev-list --count <branch>..origin/<branch>   # behind
   git rev-parse origin/<branch>                    # remote tip — the force-with-lease expectation
   ```

   Do this for the whole stack **first**, and write the numbers down. They are the expectations
   every later check is measured against. Discovering the counts after the rebase means having
   nothing to compare to.

   Record that **remote** tip SHA per branch, not just the counts. It is the value the push at
   the end needs, and it has to be read here, before anything else fetches — that is the whole
   point of pinning the lease.

2. **Tag every branch tip before rewriting it.**

   ```bash
   git tag backup/<branch>-$(date +%Y%m%d-%H%M%S) <branch>
   ```

   Backup tags are the cheapest possible insurance and the only way to run the `range-diff`
   checks below. They are local; delete them once the stack is pushed and verified.

3. **Confirm each PR's actual base.** A stacked PR's base is the branch below it, not `main`.
   `gh pr view <n> --json baseRefName`. Rebasing a stacked branch onto `main` instead of its
   real base produces a conflict storm and a wrong diff.

4. **Record each PR's approval state**, alongside the counts:

   ```bash
   gh pr view <n> --json reviewDecision,reviews --jq \
     '{decision: .reviewDecision, approvers: [.reviews[] | select(.state=="APPROVED") | .author.login] | unique}'
   ```

   This is the "before" half of the check under *Force-pushing*, and like the counts it is
   worthless if it is read afterwards. Write down the decision and the list of approvers per
   branch.

   `reviews` is every review ever left, so a reviewer who requested changes and later approved
   appears twice and the list can name someone whose current stance is not approval. That is
   harmless for detecting a *dismissal* — the before/after comparison is like-for-like — but use
   `latestReviews` instead if you want the list to mean "who approves right now".

## Rebase, don't merge

Rebase the stack bottom-up, each branch `--onto` the new tip of the one below:

```bash
git rebase --onto <new-base-tip> <old-base-tip> <branch>
```

Merging a base into a branch to "catch it up" creates divergence that snowballs up the stack.
Needing a merge fallback is a symptom that the stack is already polluted — treat it as a
mistake to avoid, not a normal move.

**Conflict-resolution staging hazards.** Stage **specific paths**. Never `git add -A` or
directory-wide adds mid-rebase; check `git status` for unexpected `A` entries before every
`git rebase --continue`. Never blanket `--continue || --skip` in a loop: `--skip` silently
drops real commits, and an untracked-file collision or a hook failure looks exactly like an
empty commit.

## The battery

Run it at the top of the stack, before anything is force-pushed. It is a script, not a block to
retype — the checks it runs are exactly the ones whose failure is invisible in per-commit review,
and an empty stdout from a mistyped redirect looks identical to a passing set-difference.

```bash
<skill-dir>/scripts/restack_battery.sh \
  "$PACKET" <old-base> <old-tip> <new-base> <new-tip> [repo-root]
```

The output directory is the first argument and is created up front; `A.txt`, `N.txt` and the
set-difference files are written there and kept with the run as evidence. Take `<old-tip>` from a
backup tag made before the rebase.

`A` = the old range's changed files, `N` = the new range's. What each check is for:

1. **Commit accounting.** `git cherry <new-tip> <old-tip> <old-base>` marks each old commit `-`
   when an equivalent patch exists at the new tip and `+` when none does. Every `+` must be
   confirmed an intentional drop — compare `git show <sha> | git patch-id --stable` against the new
   range, and expect a benign `+` whenever the new base touched a file that commit also touched,
   because re-contextualised hunks change the patch-id without changing the content.

   Compare against the new **tip**, not the new base. The base contains none of the branch's own
   commits by construction, so `git cherry <new-base> …` marks every commit `+` whether it
   survived or not, and the only commit-accounting check in the battery can never fail.

2. **`N \ A` — content the new branch carries that the old never did.** Must be empty, or every
   entry a documented deviation. *This is the check that caught 33 untracked proof PNGs swept into
   a replayed commit by a broad `git add` during conflict resolution.*

3. **`A \ N` — content no longer carried.** Every entry must be either already-upstream
   (blob-identical on the new base) or a documented deletion.

4. **Byte-identity.** For files in `A ∩ N` **that the new base did not touch**, the blob at the old
   tip must equal the blob at the new tip. That filter is computed by the script, not left as a
   predicate in the prose: a file the new base changed is *expected* to differ, so folding it in
   with the rest makes the check unreadable and folding it out by eye makes it unreliable.

5. **Conflict markers.** The grep covers `<<<<<<< `, `>>>>>>> `, `=======` **and `|||||||`** — the
   diff3/zdiff3 base marker. Under `merge.conflictStyle=diff3` or `zdiff3` a conflicted file can
   retain only the `|||||||` line, so a pattern without it passes a check whose entire purpose is
   to catch conflicted files.

6. **Surgery isolation.** After editing one mid-history commit (`rebase -i`, `edit`, amend),
   `git range-diff <base> <pre-surgery-tip> <new-tip>` must show `!` on the edited commit and
   **only** on it. Read the range-diff rather than skimming it — it is the one check that shows
   what actually changed in a replay.

**Locale pinning is not cosmetic.** `LC_ALL=C` goes on the `comm` calls as well as the `sort`
calls. `comm --help` states that "comparisons honor the rules specified by `LC_COLLATE`", so it is
not the byte-wise comparator it is often assumed to be; pinning only the sorts leaves the two
disagreeing under a locale that ignores punctuation in ordering, and the result is a false-empty
difference — precisely the check this battery exists for. The script pins both.

**Packet paths rather than `/tmp/A.txt`**: fixed temp names collide when two restacks run at once,
and the files are evidence worth keeping with the run.

**Assert on positive output.** `ls a b` exit codes and a pipeline's `$?` (which is the last
command's) are useless as verification. Every check above must produce output you read.

## Force-pushing

Only after the battery passes, and only after the G2 approval that covers pushing.

- `--force-with-lease=<branch>:<the remote tip SHA step 1 recorded>`, never bare `--force` — and never
  bare `--force-with-lease` either. With no expected value the lease is checked against the
  remote-tracking ref, so any `git fetch` between step 1 and the push (routine across a run that
  spans two human gates) advances that ref to a collaborator's commit, the lease then matches,
  and the push destroys their work silently. Naming the recorded SHA is what makes the lease
  mean what the line claims.
- **Stack order, bottom first**, one branch per command, checking the result before the next.
  A batched compound push whose output garbles has produced non-existent objects and broken
  branches; re-derive every SHA from a fresh command at the moment you use it rather than
  trusting one printed earlier in the session.
- **Never rename a remote branch** as part of a restack. Renaming a branch that is the head of
  an open PR **auto-closes that PR** — and a closed PR loses its review threads from view. If a
  rename is genuinely needed: push the new name first, retarget the PR onto it
  (`gh pr edit` had no `--head` flag as of 2026-08 — re-check before relying on that — so in
  practice open the rename as a deliberate, separate operation and re-check the PR state after
  each step), and only then
  delete the old remote branch. Verify with `gh pr view <n> --json state,headRefName` before and
  after. Some setups have a dedicated `pr-safe-branch-rename` skill for this; it is not part of
  this repo, so do not assume it is available.
- After pushing, re-check `git rev-list --count origin/<branch>..<branch>` for every branch — it
  must be `0`, and the count must match the expectation recorded in step 1.
- **Re-check the approval state, immediately after each branch's push.** A force-push can
  **dismiss reviewer approvals**: repositories configured to dismiss stale approvals on new
  commits drop every approving review when the head moves, and a restack moves every head by
  construction. Nothing announces it — the push succeeds, the battery passes, and the PR quietly
  goes from `APPROVED` to `REVIEW_REQUIRED` as a side effect of a rebase done for unrelated
  reasons. Compare against step 4's recorded decision and approver list:

  ```bash
  gh pr view <n> --json reviewDecision,reviews --jq \
    '{decision: .reviewDecision, approvers: [.reviews[] | select(.state=="APPROVED") | .author.login] | unique}'
  ```

  If an approval was dismissed: **re-request review from exactly the reviewers who had approved**
  (`gh pr edit <n> --add-reviewer <login>`) and report it in the same breath as the push result.
  Both silences are costly — the reviewer sees an approval they gave apparently thrown away, and
  the author sees a PR that looks ready to merge and is not. Whether a given repo dismisses is a
  branch-protection rule or ruleset — **per base branch, not per repo** — so check the state
  rather than reasoning about the config, and check it for **every** branch in the stack rather
  than generalising from the first: a wrong assumption either way is silent. Dismissal is also
  processed asynchronously, so a clean "after" read taken immediately is suggestive, not proof;
  if the stack matters, re-read once more at the end of the push sequence.

## Reporting

The G2 presentation includes the battery results, not a claim that it was run: the counts before
and after, the `N \ A` and `A \ N` sets (ideally empty), the range-diff verdict, and the approval
state recorded in step 4. "Restack verified" without those numbers is not a result.

The pushes themselves happen after G2, so the approval **re-check** belongs to the push report:
per branch, the decision before and after, and — if any approval was dismissed — who it was
re-requested from. That one goes to the user proactively; it is not an implementation detail,
because the person whose approval vanished is going to notice.
